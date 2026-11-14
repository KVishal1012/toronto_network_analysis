"""Validated observations, reproducible spatial joins, and isolated scenarios."""
from __future__ import annotations

import copy
import hashlib
import json
import math
from datetime import datetime, timezone
from typing import Any

from pyproj import Transformer
from shapely.geometry import Point, shape
from shapely.ops import transform
from shapely.strtree import STRtree

MAX_STATUS_AGE_SECONDS = 300
MAX_FUTURE_SKEW_SECONDS = 60
TRANSFORM = Transformer.from_crs("EPSG:4326", "EPSG:26917", always_xy=True)


def iso_now() -> str:
    """Return an explicit UTC transaction timestamp."""
    return datetime.now(timezone.utc).isoformat()


def epoch(value: Any) -> float | None:
    """Accept finite positive epoch seconds only; zero means unavailable."""
    if isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and value > 0:
        return float(value)
    return None


def freshness(value: Any, now: float) -> str:
    """Classify timestamp validity independently of retrieval success."""
    t = epoch(value)
    if t is None:
        return "unknown"
    if t > now + MAX_FUTURE_SKEW_SECONDS:
        return "future"
    return "fresh" if now - t <= MAX_STATUS_AGE_SECONDS else "stale"


def count(value: Any) -> int | None:
    """Never coerce absent, fractional, boolean or negative stock to zero."""
    return value if type(value) is int and value >= 0 else None


def flag(value: Any) -> bool | None:
    """Read GBFS v1 availability flags without inventing defaults."""
    return bool(value) if type(value) in (int, bool) and value in (0, 1) else None


def unique_rows(rows: list[dict], key: str) -> dict[str, dict]:
    """Reject absent and duplicate identifiers rather than silently overwrite."""
    result = {}
    for row in rows:
        value = row.get(key)
        if value is None or str(value) == "" or str(value) in result:
            raise ValueError(f"Missing or duplicate {key}")
        result[str(value)] = row
    return result


def validate_boundaries(raw: dict) -> tuple[list[dict], list]:
    """Validate source CRS, unique IDs and unmodified polygons; reject bad input."""
    crs = raw.get("crs", {}).get("properties", {}).get("name", "")
    if crs not in ("urn:ogc:def:crs:OGC:1.3:CRS84", "urn:ogc:def:crs:EPSG::4326", "EPSG:4326"):
        raise ValueError("Boundary source CRS is absent or unsupported")
    if raw.get("type") != "FeatureCollection" or not raw.get("features"):
        raise ValueError("Empty or invalid boundary FeatureCollection")
    features, geometries, seen = [], [], set()
    for f in raw["features"]:
        p = f["properties"]
        identifier = str(p["AREA_SHORT_CODE"])
        geom = shape(f["geometry"])
        if identifier in seen or not p.get("AREA_NAME"):
            raise ValueError("Duplicate neighbourhood ID or missing name")
        if geom.is_empty or not geom.is_valid or geom.geom_type not in ("Polygon", "MultiPolygon"):
            raise ValueError(f"Invalid neighbourhood geometry: {identifier}; no silent repair")
        west, south, east, north = geom.bounds
        if not (-80 < west <= east < -78 and 43 < south <= north < 45):
            raise ValueError("Boundary coordinate extent is inconsistent with Toronto")
        seen.add(identifier)
        geometries.append(geom)
        features.append({"type": "Feature", "id": identifier, "geometry": f["geometry"], "properties": {
            "id": identifier, "name": p["AREA_NAME"], "area_km2": transform(TRANSFORM.transform, geom).area / 1e6,
            "bbox": list(geom.bounds), "source": "neighbourhoods",
        }})
    return features, geometries


def build_state(boundaries: dict | None, info: dict | None, status: dict | None, receipts: list[dict]) -> dict:
    """Join GBFS points to source polygons with explicit boundary/outside accounting.

    STRtree limits candidate polygons; a point on a shared boundary is assigned
    to the lowest neighbourhood ID and counted as ambiguous. No snapping.
    """
    features, geometries = validate_boundaries(boundaries) if boundaries else ([], [])
    tree = STRtree(geometries)
    stations = unique_rows(info["data"]["stations"], "station_id") if info else {}
    statuses = unique_rows(status["data"]["stations"], "station_id") if status else {}
    rejected, outside, ambiguous, normalized = [], [], [], []
    for identifier, row in sorted(stations.items()):
        lon, lat = row.get("lon"), row.get("lat")
        if (type(lon) not in (int, float) or type(lat) not in (int, float)
                or not math.isfinite(lon) or not math.isfinite(lat)
                or not -180 <= lon <= 180 or not -90 <= lat <= 90 or not row.get("name")):
            rejected.append({"id": identifier, "reason": "Invalid coordinates or missing station name"})
            continue
        point = Point(lon, lat)
        matches = [int(i) for i in tree.query(point) if geometries[i].covers(point)]
        matches.sort(key=lambda i: features[i]["properties"]["id"])
        neighbourhood_id = features[matches[0]]["properties"]["id"] if matches else None
        if not matches:
            outside.append(identifier)
        if len(matches) > 1:
            ambiguous.append(identifier)
        s = statuses.get(identifier, {})
        normalized.append({"id": identifier, "name": row["name"], "lon": lon, "lat": lat,
            "capacity": count(row.get("capacity")), "neighbourhood_id": neighbourhood_id,
            "bikes": count(s.get("num_bikes_available")), "docks": count(s.get("num_docks_available")),
            "installed": flag(s.get("is_installed")), "renting": flag(s.get("is_renting")),
            "returning": flag(s.get("is_returning")), "reported_at": epoch(s.get("last_reported")),
            "has_status": bool(s), "ambiguous_boundary": len(matches) > 1})
    created = iso_now()
    state = {"id": "", "created_at": created, "mode": "observed_snapshot", "schema_version": 1,
        "boundaries": {"type": "FeatureCollection", "features": features}, "stations": normalized,
        "sources": receipts, "status_updated_at": epoch(status.get("last_updated")) if status else None,
        "info_updated_at": epoch(info.get("last_updated")) if info else None,
        "accounting": {"boundaries_in": len(boundaries["features"]) if boundaries else 0,
            "boundaries_out": len(features), "stations_in": len(stations), "stations_out": len(normalized),
            "stations_rejected": rejected, "outside_boundary_ids": outside, "ambiguous_boundary_ids": ambiguous,
            "status_without_location_ids": sorted(set(statuses) - set(stations)),
            "locations_without_status_ids": sorted(set(stations) - set(statuses))},
        "method": {"analysis_crs": "EPSG:26917", "display_crs": "EPSG:3857", "storage_crs": "EPSG:4326 / longitude, latitude",
            "spatial_join": "Polygon covers point; shared boundary assigned to lowest lexicographic neighbourhood ID; no snapping",
            "status_max_age_seconds": MAX_STATUS_AGE_SECONDS, "future_skew_seconds": MAX_FUTURE_SKEW_SECONDS,
            "area": "Full-resolution source polygon transformed with pyproj to EPSG:26917; area / 1,000,000",
            "intelligence": "Deterministic calculation and templates; no language model or predictive model",
            "actuation": "Disabled; no external action adapters"}}
    state["id"] = hashlib.sha256(json.dumps(state, sort_keys=True).encode()).hexdigest()[:16]
    return state


def present_state(stored: dict, now: float | None = None) -> dict:
    """Re-evaluate freshness on every read, including historical snapshots."""
    now = now if now is not None else datetime.now(timezone.utc).timestamp()
    state = copy.deepcopy(stored)
    state["evaluated_at"] = datetime.fromtimestamp(now, timezone.utc).isoformat()
    feed_fresh = freshness(state["status_updated_at"], now)
    info_fresh = freshness(state["info_updated_at"], now)
    source_available = {r["id"]: r["status"] == "available" for r in state["sources"]}
    for s in state["stations"]:
        s["freshness"] = freshness(s["reported_at"], now)
        valid = (s["bikes"] is not None and s["docks"] is not None
                 and all(s[k] is not None for k in ("installed", "renting", "returning")))
        s["current_usable"] = (valid and feed_fresh == "fresh" and info_fresh == "fresh"
            and s["freshness"] == "fresh" and source_available.get("station_status", False)
            and source_available.get("station_information", False))
        s["category"] = ("unknown" if not s["current_usable"] else "offline" if not s["installed"] or not s["renting"]
            else "empty" if s["bikes"] == 0 else "available")
    for f in state["boundaries"]["features"]:
        p = f["properties"]
        subset = [s for s in state["stations"] if s["neighbourhood_id"] == p["id"]]
        p.update(summarize(subset, source_available.get("station_information", False)))
    city = [s for s in state["stations"] if s["neighbourhood_id"] is not None]
    state["summary"] = summarize(city, source_available.get("station_information", False) and bool(state["boundaries"]["features"]))
    for r in state["sources"]:
        r["freshness"] = ("reference" if r["id"] == "neighbourhoods" else freshness(r.get("observed_at"), now)) if r["status"] == "available" else "unavailable"
    return state


def summarize(stations: list[dict], locations_available: bool) -> dict:
    """Return observed stock with a denominator; incomplete stock is null."""
    usable = [s for s in stations if s["current_usable"]]
    complete = locations_available and len(usable) == len(stations)
    return {"station_count": len(stations) if locations_available else None,
        "current_status_count": len(usable), "unknown_status_count": len(stations) - len(usable),
        "reported_bikes": sum(s["bikes"] for s in stations if s["bikes"] is not None) if stations and all(s["bikes"] is not None for s in stations) else None,
        "available_bikes": sum(s["bikes"] for s in usable if s["installed"] and s["renting"]) if complete else None,
        "empty_stations": sum(s["category"] == "empty" for s in usable), "status_complete": complete}


def scenario(state: dict, station_ids: list[str]) -> dict:
    """Compute a static outage counterfactual without modifying observed state."""
    if not station_ids or len(station_ids) > 100 or len(station_ids) != len(set(station_ids)):
        raise ValueError("Choose 1–100 distinct station IDs")
    index = {s["id"]: s for s in state["stations"]}
    if any(identifier not in index for identifier in station_ids):
        raise ValueError("Unknown station ID")
    chosen = [index[identifier] for identifier in station_ids]
    if any(s["neighbourhood_id"] is None for s in chosen):
        raise ValueError("Scenario requires stations inside the loaded Toronto neighbourhoods")
    ready = all(s["current_usable"] for s in chosen)
    return {"mode": "hypothetical", "baseline_state_id": state["id"], "station_ids": station_ids,
        "decision": "ASK" if ready else "VERIFY", "evaluated_at": state["evaluated_at"],
        "removed_station_count": len(chosen),
        "removed_available_bikes": sum(s["bikes"] for s in chosen if s["installed"] and s["renting"]) if ready else None,
        "affected_neighbourhood_ids": sorted({s["neighbourhood_id"] for s in chosen}),
        "assumption": "Selected stations become unavailable simultaneously; all other station stocks remain unchanged.",
        "limitation": "Static inventory subtraction only. Does not estimate trip demand, rerouting, travel time, weather effects or causal consequences.",
        "reason": "Human review required; no actuation is connected." if ready else "Missing, stale, invalid or future-dated observations prevent a current inventory estimate.",
        "sources": copy.deepcopy(state['sources']),
        "validation": {"station_count": len(chosen), "all_selected_reports_usable": ready,
                       "method": "Sum rentable inventory removed; selected IDs must be distinct, known and inside Toronto polygons"},
        "observed_state_modified": False}
