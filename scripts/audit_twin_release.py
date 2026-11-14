"""Read-only census of local twin evidence. Never promotes candidates."""
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
import json
import sqlite3
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.site_history import release_gate
from scripts.audit_site_history import read_object
from shapely.geometry import Point, shape

ROOT = Path(__file__).resolve().parents[1]


def audit(root: Path = ROOT) -> dict:
    """Reconcile every registry row and record explicit remaining release blockers."""
    with sqlite3.connect(f"file:{root/'data/site-registry/registry.sqlite'}?mode=ro", uri=True) as db:
        integrity = db.execute('PRAGMA integrity_check').fetchone()[0]
        version, raw = db.execute('SELECT id,receipt FROM versions ORDER BY rowid DESC LIMIT 1').fetchone()
        receipt = json.loads(raw)
        sites = {sid: json.loads(payload) for sid, payload in db.execute('SELECT site_id,payload FROM observations WHERE version=?', (version,))}
        matches = [json.loads(r[0]) for r in db.execute('SELECT payload FROM matches WHERE version=?', (version,))]
        reviews = [json.loads(r[0]) for r in db.execute('SELECT payload FROM reviews WHERE version=?', (version,))]
        observations = len({json.loads(r[0])['parcel_sha256'] for r in db.execute('SELECT receipt FROM versions')})
    errors = []
    planning_base = root/'public/planning'
    manifest = json.loads((planning_base/receipt['planning_snapshot']/'manifest.json').read_text())
    source_rows = {kind: {r['id']: r for r in read_object(planning_base, manifest, kind+'.json')} for kind in ('applications', 'projects')}
    geometries = {}
    keys = Counter((m['source'], m['record_id']) for m in matches)
    errors.extend(f'duplicate record: {k}' for k, n in keys.items() if n != 1)
    counts = defaultdict(Counter)
    groups = defaultdict(set)
    by_site = defaultdict(list)
    for m in matches:
        counts[m['source']][m['state']] += 1
        evidence = m.get('evidence', {})
        if not all(evidence.get(k) for k in ('planning_snapshot', 'planning_source_sha256', 'planning_retrieved_at', 'parcel_sha256')):
            errors.append(f'missing provenance: {m["record_id"]}')
        for sid in m['candidate_site_ids']:
            if sid not in sites:
                errors.append(f'missing site: {sid}')
            else:
                if sid not in geometries:
                    geometries[sid] = shape(sites[sid]['geometry'])
                source_row = source_rows[m['source']].get(m['record_id'])
                if source_row is None or source_row.get('lon') is None or source_row.get('lat') is None:
                    errors.append(f'candidate without source point: {m["record_id"]}')
                elif not geometries[sid].intersects(Point(source_row['lon'], source_row['lat'])):
                    errors.append(f'candidate point outside referenced parcel: {m["record_id"]}')
            by_site[sid].append(m)
            if m['publisher_number']:
                groups[(m['source'], m['publisher_number'].strip().upper())].add(sid)
    expected = json.loads((root/'docs/site-history/parcel-registry-report.json').read_text())
    for source, outcomes in counts.items():
        if sum(outcomes.values()) != expected['matching'][source]['input']:
            errors.append(f'unreconciled input: {source}')
    if sum(expected['parcel_accounting'].values()) != receipt['complete_export_count']:
        errors.append('unreconciled parcel export')
    if len(sites) != expected['provisional_sites']:
        errors.append('unreconciled registry')
    conflicts = [k for k, ids in groups.items() if len(ids) > 1]
    recorded = {r['id'] for r in reviews}
    missing_reviews = [k for k in conflicts if 'publisher-number:'+':'.join(k) not in recorded]
    sample = []
    for region in ('downtown', 'midtown', 'north-york'):
        eligible = [sid for sid in by_site if region in sites[sid]['regions']]
        for sid in sorted(eligible, key=lambda s: (-len(by_site[s]), s))[:3]:
            rows = by_site[sid]
            sample.append({'region': region, 'site_id': sid, 'records': len(rows), 'labels': sorted({r['label'] for r in rows}), 'publisher_numbers': sorted({r['publisher_number'] for r in rows if r['publisher_number']}), 'decision': 'retain_candidate', 'reason': 'Source points and address labels do not establish current parcel/site identity.'})
    isolation = subprocess.run([sys.executable, str(root/'scripts/check_public_boundary.py')], cwd=root, capture_output=True, text=True)
    checks = {'boundaries': True, 'rights': False, 'accounting': not errors and integrity == 'ok', 'site_identity': False, 'matching_review': False, 'history': False, 'browser_qa': False, 'public_isolation': isolation.returncode == 0}
    return {'reviewed_at': datetime.now(timezone.utc).isoformat(), 'reviewer': 'Codex evidence audit', 'human_review': False, 'version': version, 'sqlite_integrity': integrity, 'sites': len(sites), 'planning_rows': len(matches), 'outcomes': {k: dict(v) for k,v in counts.items()}, 'errors': errors, 'multi_site_publisher_groups': len(conflicts), 'groups_without_diagnostic_review': missing_reviews, 'distinct_parcel_observations': observations, 'risk_sample': sample, 'checks': checks, 'release': release_gate(checks, []), 'scope_note': 'Accounting is freshly checked. Other booleans remain false unless independently qualified; prior UI tests and source licences do not establish release readiness of the twin.'}


if __name__ == '__main__':
    report = audit()
    (ROOT/'docs/site-history/release-review.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k != 'risk_sample'}, indent=2))
    if report['errors']:
        raise SystemExit(1)
