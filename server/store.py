"""Local DuckDB snapshot ledger and content-addressed source archive."""
from __future__ import annotations

import hashlib
import json
import logging
import ssl
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from threading import RLock
from urllib.request import Request, urlopen

import duckdb
import certifi

from server.engine import build_state, iso_now, present_state, validate_boundaries

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
LOCK = RLock()
CATALOG = "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id="
GBFS = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/"
SOURCES = [
    {"id": "neighbourhoods", "name": "Toronto neighbourhoods", "publisher": "City of Toronto",
     "page": "https://open.toronto.ca/dataset/neighbourhoods/", "kind": "Reference boundaries"},
    {"id": "station_information", "name": "Bike Share station locations", "publisher": "Bike Share Toronto / Toronto Parking Authority",
     "page": "https://open.toronto.ca/dataset/bike-share-toronto/", "kind": "Operator snapshot", "url": GBFS + "station_information"},
    {"id": "station_status", "name": "Bike Share station status", "publisher": "Bike Share Toronto / Toronto Parking Authority",
     "page": "https://open.toronto.ca/dataset/bike-share-toronto/", "kind": "Operator snapshot", "url": GBFS + "station_status"},
]


def fetch(url: str) -> tuple[dict, str]:
    """Archive exact response bytes before parsing; fixed upstream URLs only."""
    with urlopen(Request(url, headers={"User-Agent": "ASTER-Toronto-Local/0.1"}), timeout=30,
                 context=ssl.create_default_context(cafile=certifi.where())) as response:
        payload = response.read(25_000_001)
    if len(payload) > 25_000_000:
        raise ValueError("Source exceeds the 25 MB acquisition limit")
    digest = hashlib.sha256(payload).hexdigest()
    directory = DATA / "raw"
    directory.mkdir(parents=True, exist_ok=True)
    (directory / f"{digest}.json").write_bytes(payload)
    return json.loads(payload), digest


def acquire(source: dict) -> tuple[dict | None, dict]:
    """Acquire one source and expose all errors; do not substitute old data."""
    receipt = {**source, "status": "unavailable", "retrieved_at": None,
               "checked_at": iso_now(), "observed_at": None, "sha256": None,
               "licence": "Toronto portal displays Open Government Licence – Toronto; CKAN metadata says notspecified. Operator terms require separate review before redistribution."}
    started = time.monotonic()
    try:
        if source["id"] == "neighbourhoods":
            metadata, meta_hash = fetch(CATALOG + "neighbourhoods")
            resources = metadata["result"]["resources"]
            resource = next(r for r in resources if r["name"] == "Neighbourhoods - 4326.geojson")
            receipt.update(url=resource["url"], source_modified_at=resource.get("last_modified"), metadata_sha256=meta_hash)
        raw, digest = fetch(receipt["url"])
        if source["id"] == "neighbourhoods":
            validate_boundaries(raw)
            records = len(raw["features"])
        else:
            from server.engine import unique_rows
            rows = raw["data"]["stations"]
            if not isinstance(rows, list):
                raise ValueError("GBFS stations is not a list")
            unique_rows(rows, "station_id")
            records = len(rows)
        receipt.update(status="available", retrieved_at=iso_now(), observed_at=raw.get("last_updated"),
                       sha256=digest, records=records)
        return raw, receipt
    except (OSError, ValueError, KeyError, StopIteration, TypeError) as exc:
        receipt["error"] = f"{type(exc).__name__}: {exc}"
        logging.warning("source_failed %s", json.dumps(receipt))
        return None, receipt
    finally:
        receipt["duration_ms"] = round((time.monotonic() - started) * 1000)


def connect() -> duckdb.DuckDBPyConnection:
    """Open ledger; callers serialize writes with LOCK."""
    DATA.mkdir(parents=True, exist_ok=True)
    con = duckdb.connect(str(DATA / "world.duckdb"))
    con.execute("SET TimeZone='UTC'")
    con.execute("CREATE TABLE IF NOT EXISTS snapshots (id VARCHAR PRIMARY KEY, created_at TIMESTAMPTZ NOT NULL, payload JSON NOT NULL)")
    return con


def reference_boundary() -> tuple[dict | None, dict]:
    """Reuse archived reference bytes for up to a day, preserving retrieval time."""
    from datetime import datetime, timezone
    try:
        with LOCK, connect() as con:
            row = con.execute('SELECT payload FROM snapshots ORDER BY created_at DESC LIMIT 1').fetchone()
        if row:
            receipt = next(r for r in json.loads(row[0])['sources'] if r['id'] == 'neighbourhoods')
            age = (datetime.now(timezone.utc)-datetime.fromisoformat(receipt['retrieved_at'])).total_seconds()
            if receipt['status'] == 'available' and 0 <= age < 86400:
                raw = (DATA / 'raw' / (receipt['sha256']+'.json')).read_bytes()
                if hashlib.sha256(raw).hexdigest() == receipt['sha256']:
                    return json.loads(raw), {**receipt, 'reuse': 'Archived reference bytes; original retrieval time retained'}
    except (OSError, ValueError, KeyError, TypeError, StopIteration):
        logging.warning('reference_cache_unavailable; reacquiring authoritative boundary')
    return acquire(SOURCES[0])


def refresh(mobility_only: bool = False) -> dict:
    """Acquire independent sources, validate, and atomically append a new state."""
    with ThreadPoolExecutor(max_workers=3) as pool:
        boundary = pool.submit(reference_boundary if mobility_only else acquire, *([] if mobility_only else [SOURCES[0]]))
        feeds = [pool.submit(acquire, s) for s in SOURCES[1:]]
        acquired = [boundary.result(), *(f.result() for f in feeds)]
    state = build_state(*(r[0] for r in acquired), [r[1] for r in acquired])
    with LOCK:
        with connect() as con:
            con.execute("INSERT INTO snapshots VALUES (?, ?, ?)", [state["id"], state["created_at"], json.dumps(state, allow_nan=False)])
        logging.info("state_committed %s", json.dumps({"id": state["id"], "accounting": state["accounting"]}))
        return present_state(state)


def save_scenario(result: dict) -> dict:
    """Save hypothetical evidence in a separate append-only table."""
    import uuid
    result = {**result, 'id': uuid.uuid4().hex, 'review_status': 'pending', 'actuation': False}
    with LOCK, connect() as con:
        con.execute('CREATE TABLE IF NOT EXISTS scenarios (id VARCHAR PRIMARY KEY, payload JSON NOT NULL)')
        con.execute('INSERT INTO scenarios VALUES (?, ?)', [result['id'], json.dumps(result)])
    return result


def review_scenario(identifier: str, reviewer: str, note: str) -> dict:
    """Record local human review, never an authorization to actuate."""
    from server.engine import scenario
    import uuid
    if not isinstance(reviewer, str) or not 2 <= len(reviewer.strip()) <= 100:
        raise ValueError('Enter reviewer name (2–100 characters)')
    if not isinstance(note, str) or not 10 <= len(note.strip()) <= 2000:
        raise ValueError('Record review reasoning (10–2000 characters)')
    with LOCK, connect() as con:
        con.execute('CREATE TABLE IF NOT EXISTS scenarios (id VARCHAR PRIMARY KEY, payload JSON NOT NULL)')
        row = con.execute('SELECT payload FROM scenarios WHERE id = ?', [identifier]).fetchone()
        if not row:
            raise ValueError('Scenario does not exist')
        result = json.loads(row[0])
        baseline = read_state(result['baseline_state_id'])
        latest = read_state()
        if not baseline or not latest or latest['id'] != baseline['id'] or scenario(baseline, result['station_ids'])['decision'] != 'ASK':
            raise ValueError('Baseline is stale or superseded. Re-evaluate against the latest state before review.')
        review = {'id': uuid.uuid4().hex, 'scenario_id': identifier, 'reviewer': reviewer.strip(), 'note': note.strip(),
                  'reviewed_at': iso_now(), 'review_status': 'reviewed', 'actuation': False,
                  'meaning': 'Local scenario review only; identity self-declared; no external action authorized or executed.'}
        con.execute('CREATE TABLE IF NOT EXISTS scenario_reviews (id VARCHAR PRIMARY KEY, payload JSON NOT NULL)')
        con.execute('INSERT INTO scenario_reviews VALUES (?, ?)', [review['id'], json.dumps(review)])
        return review


def read_state(identifier: str | None = None) -> dict | None:
    """Read immutable snapshot payload using a parameterized query."""
    with LOCK, connect() as con:
        row = con.execute("SELECT payload FROM snapshots WHERE id = ?", [identifier]).fetchone() if identifier else con.execute("SELECT payload FROM snapshots ORDER BY created_at DESC LIMIT 1").fetchone()
    return present_state(json.loads(row[0])) if row else None


def history() -> list[dict]:
    """Return the most recent 50 locally observed states, never synthetic history."""
    with LOCK, connect() as con:
        rows = con.execute("SELECT id, strftime(created_at, '%Y-%m-%dT%H:%M:%S.%fZ') FROM snapshots ORDER BY created_at DESC LIMIT 50").fetchall()
    return [{"id": r[0], "created_at": r[1]} for r in rows]
