"""Build field-limited, reconciled reported-energy evidence. No energy predictions."""
from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import math
import re
import statistics
import sys
from collections import Counter, defaultdict
from datetime import date, datetime
from pathlib import Path
from typing import Any

from openpyxl import load_workbook
from shapely.geometry import Point, shape

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.audit_site_history import read_object

ROOT = Path(__file__).resolve().parents[1]
METHOD = 'reported-energy-v1'
TORONTO_ALIASES = {'TORONTO', 'CITY OF TORONTO', 'NORTH YORK', 'SCARBOROUGH', 'ETOBICOKE',
                   'EAST YORK', 'YORK'}
MINIMUM_COHORT = 10
METRICS = {
    'site_eui': ('Site_EUI1', 'Site energy intensity', 'GJ/m²/year', False),
    'source_eui': ('Source_EUI1', 'Source energy intensity', 'GJ/m²/year', False),
    'wn_site_eui': ('WN_Site_EUI1', 'Weather-normalized site energy intensity', 'GJ/m²/year', True),
    'wn_source_eui': ('WN_Source_EUI1', 'Weather-normalized source energy intensity', 'GJ/m²/year', True),
    'electricity': ('WN_Sit_Elc_Int1', 'Weather-normalized electricity intensity', 'GJ/m²/year', True),
    'gas': ('WN_Sit_Gas_Int1', 'Weather-normalized natural gas intensity', 'GJ/m²/year', True),
    'water': ('All_Water_Int1', 'Reported water intensity', 'm³/m²/year', False),
    'ghg': ('GHG_Emiss_Int1', 'Publisher-calculated emissions intensity', 'kgCO₂e/m²/year', False),
}
FUELS = {
    ('Electric - Grid', 'kWh (thousand Watt-hours)'): ('Electricity', 'kWh'),
    ('Natural Gas', 'cm (cubic meters)'): ('Natural gas', 'm³'),
    ('District Steam', 'kLbs. (thousand pounds)'): ('District steam', 'thousand lb'),
    ('District Chilled Water - Other', 'ton hours'): ('District chilled water', 'ton·h'),
}
LIMITATIONS = [
    '2024 reported evidence; not current metered use or independently audited performance.',
    'Ontario comparisons cover reporting properties across Toronto, not the selected Downtown/Midtown area or building.',
    'EWRB IDs can cover multiple structures. Coarse postal areas do not establish a building relationship.',
    'Reporting coverage is incomplete and not a representative sample. Differences can reflect use and operating conditions.',
    'Municipal facility addresses do not establish identity with a selected 3D footprint.',
    'The Toronto readme describes an older annual schema, not the 2024 meter interval convention. Annual totals are withheld.',
    'No energy forecast, savings estimate, energy rating, utility-bill prediction or replacement-building simulation.',
]


def canonical(value: Any) -> bytes:
    """Encode deterministic JSON without non-finite values."""
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False,
                      allow_nan=False).encode('utf-8')


def digest(value: Any) -> str:
    """Hash structured content deterministically."""
    return hashlib.sha256(canonical(value)).hexdigest()


def text(value: Any) -> str:
    """Normalize whitespace while retaining source wording."""
    return ' '.join(str(value).split()) if value is not None else ''


def number(value: Any) -> float | None:
    """Parse an explicit, finite, nonnegative source number; never fill nulls."""
    if value is None or isinstance(value, bool):
        return None
    try:
        result = float(str(value).strip().replace(',', ''))
    except (ValueError, TypeError):
        return None
    return result if math.isfinite(result) and result >= 0 else None


def identifier(value: Any) -> str:
    """Accept a numeric publisher identifier, never a row-derived entity ID."""
    raw = text(value)
    return raw.removesuffix('.0') if re.fullmatch(r'\d+(?:\.0)?', raw) else ''


def iso(value: Any) -> str | None:
    """Use parsed workbook dates or explicit ISO dates, never infer serial dates."""
    if isinstance(value, (datetime, date)):
        return value.date().isoformat() if isinstance(value, datetime) else value.isoformat()
    try:
        return date.fromisoformat(text(value)).isoformat()
    except ValueError:
        return None


def read_sheet(path: Path, sheet: str | None, required: set[str]) -> tuple[list[dict], dict]:
    """Read all nonempty rows with source row references and reject schema drift."""
    with path.open('rb') as stream:
        book = load_workbook(stream, read_only=True, data_only=True)
        try:
            ws = book[sheet] if sheet else book.worksheets[0]
            iterator = ws.iter_rows(values_only=True)
            headers = [text(v) for v in next(iterator)]
            if len(headers) != len(set(headers)) or not required.issubset(headers):
                raise ValueError('Energy schema changed: ' + ws.title)
            rows, blanks = [], 0
            for row_number, values in enumerate(iterator, 2):
                if not any(v is not None for v in values):
                    blanks += 1
                    continue
                rows.append(dict(zip(headers, values)) | {'_row': row_number})
            if not rows:
                raise ValueError('Empty energy sheet')
            return rows, {'sheet': ws.title, 'headers': headers, 'rows': len(rows), 'blank_rows': blanks}
        finally:
            book.close()


def group_rows(rows: list[dict], key: str) -> tuple[list[dict], list[dict]]:
    """Collapse identical duplicate IDs; exclude entire conflicting groups."""
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        groups[identifier(row.get(key)) or 'missing:' + str(row['_row'])].append(row)
    accepted, outcomes = [], []
    for uid, values in sorted(groups.items()):
        signatures = {digest({k: str(v) if isinstance(v, (date, datetime)) else v
                              for k, v in r.items() if k != '_row'}) for r in values}
        reason = ('missing_identifier' if uid.startswith('missing:') else
                  'conflicting_identifier' if len(signatures) > 1 else 'accepted')
        if reason == 'accepted':
            accepted.append(values[0])
        for i, row in enumerate(values):
            outcomes.append({'row': row['_row'], 'id': uid,
                             'outcome': 'duplicate' if reason == 'accepted' and i else reason})
    return accepted, outcomes


def percentile(values: list[float], fraction: float) -> float:
    """Linear interpolated quantile, equivalent to sorted index (n-1)*p."""
    ordered = sorted(values)
    index = (len(ordered) - 1) * fraction
    a, b = math.floor(index), math.ceil(index)
    return ordered[a] + (ordered[b] - ordered[a]) * (index - a)


def cohort_metric(records: list[dict], key: str) -> dict:
    """Summarize valid values without weights; show flags and small cohorts."""
    values = [r['metrics'][key] for r in records if r['metrics'][key] is not None]
    flags = sum(bool(r['flags'][key]) for r in records)
    result = {'reporting_records': len(records), 'valid': len(values),
              'missing': len(records) - len(values), 'flagged': flags,
              'quality_checker_not_run': sum(r['quality_checker'] != 'Yes' for r in records),
              'distribution': None}
    if len(values) >= MINIMUM_COHORT:
        result['distribution'] = {'q1': percentile(values, .25), 'median': statistics.median(values),
                                  'q3': percentile(values, .75)}
    return result


def ontario(rows: list[dict], year: int) -> tuple[list[dict], dict[str, list[dict]], list[dict]]:
    """Build Toronto-wide property-type cohorts without fabricating point locations."""
    accepted, outcomes = group_rows(rows, 'EWRB_ID')
    outcomes_by_row = {r['row']: r for r in outcomes}
    members: dict[str, list[dict]] = defaultdict(list)
    for row in accepted:
        reason = ('invalid_identifier' if not re.fullmatch(r'\d{6}', identifier(row['EWRB_ID'])) else
                  'outside_toronto_or_unresolved_city' if text(row['City']).upper() not in TORONTO_ALIASES
                  else 'unknown_property_type' if not text(row['PrimPropTypCalc']) else 'included')
        outcomes_by_row[row['_row']]['outcome'] = reason
        if reason != 'included':
            continue
        metrics, flags = {}, {}
        for key, (field, _, _, _) in METRICS.items():
            value = number(row.get(field))
            flag = []
            if value is None:
                flag.append('missing_or_invalid')
            elif key == 'water' and value == 0:
                value = None
                flag.append('publisher_zero_or_nonreport_ambiguous')
            elif value == 0:
                flag.append('reported_zero_retained')
            metrics[key], flags[key] = value, flag
        property_type = text(row['PrimPropTypCalc'])
        cid = 'cohort-' + digest(property_type)[:12]
        postal = text(row['Postal_Code']).upper().replace(' ', '')
        members[cid].append({'id': identifier(row['EWRB_ID']), 'row': row['_row'], 'year': year,
                             'city': text(row['City']), 'postal_prefix': postal if re.fullmatch(r'[A-Z]\d[A-Z]', postal) else None,
                             'property_type': property_type, 'metrics': metrics, 'flags': flags,
                             'quality_checker': text(row.get('Data_Qual_Check')) or 'Unknown',
                             'quality_checker_date': iso(row.get('Data_Qual_Date'))})
    cohorts = [{'id': cid, 'property_type': records[0]['property_type'], 'year': year,
                'scope': 'Toronto-wide reporting properties',
                'metrics': {key: cohort_metric(records, key) for key in METRICS}}
               for cid, records in sorted(members.items(), key=lambda item: item[1][0]['property_type'])]
    return cohorts, members, outcomes


def address_index(root: Path, snapshot: str) -> dict[str, list[dict]]:
    """Use hash-verified qualified address shards; no fuzzy geocoder or proximity join."""
    base = root / 'public/planning'
    manifest = json.loads((base / snapshot / 'manifest.json').read_text(encoding='utf-8'))
    index: dict[str, list[dict]] = defaultdict(list)
    for logical in sorted(manifest['assets']):
        if re.fullmatch(r'addresses/[a-f0-9]{2}\.json', logical):
            for r in read_object(base, manifest, logical):
                index[text(r['label']).upper()].append(r)
    if not index:
        raise ValueError('Qualified address snapshot unavailable')
    return index


def meter_evidence(rows: list[dict]) -> tuple[list[dict], list[dict]]:
    """Validate consumption identity, units and interval conflicts before any sum."""
    accepted, outcomes = group_rows(rows, 'Meter Consumption ID')
    lookup = {r['row']: r for r in outcomes}
    entries: list[dict] = []
    for row in accepted:
        start, end, usage = iso(row['Start Date']), iso(row['End Date']), number(row['Usage/Quantity'])
        uid, meter = identifier(row['Portfolio Manager ID']), identifier(row['Portfolio Manager Meter ID'])
        pair = (text(row['Meter Type']), text(row['Usage Units']))
        reason = ('missing_property_or_meter_id' if not uid or not meter else
                  'invalid_interval' if not start or not end or start >= end else
                  'invalid_usage' if usage is None else
                  'nonenergy_or_unqualified_units' if pair not in FUELS else 'included')
        lookup[row['_row']]['outcome'] = reason
        if reason != 'included':
            continue
        fuel, unit = FUELS[pair]
        entries.append({'id': identifier(row['Meter Consumption ID']), 'row': row['_row'],
                        'property_id': uid, 'meter_id': meter, 'fuel': fuel, 'unit': unit,
                        'start': start, 'end': end, 'usage': usage,
                        'estimated': text(row['Estimation?']) != 'No'})
    groups: dict[str, list[dict]] = defaultdict(list)
    for r in entries:
        groups[r['meter_id']].append(r)
    rejected = set()
    for readings in groups.values():
        identities = {(r['property_id'], r['fuel'], r['unit']) for r in readings}
        if len(identities) > 1:
            rejected.update(r['id'] for r in readings)
            continue
        ordered = sorted(readings, key=lambda r: (r['start'], r['end'], r['id']))
        # All conflicting intervals are quarantined, including containment chains.
        active: list[dict] = []
        for r in ordered:
            active = [a for a in active if a['end'] > r['start']]
            if active:
                rejected.add(r['id'])
                rejected.update(a['id'] for a in active)
            active.append(r)
    for r in entries:
        if r['id'] in rejected:
            lookup[r['row']]['outcome'] = 'overlap_or_meter_identity_conflict'
    return [r for r in entries if r['id'] not in rejected], outcomes


def facility_evidence(properties: list[dict], property_ids: list[dict], meter_rows: list[dict],
                      index: dict[str, list[dict]], regions: dict) -> tuple[list[dict], dict, dict]:
    """Locate municipal facilities separately from source buildings, retaining all outcomes."""
    accepted, outcomes = group_rows(properties, 'Portfolio Manager ID')
    _, id_outcomes = group_rows(property_ids, 'Portfolio Manager ID')
    entries, meter_outcomes = meter_evidence(meter_rows)
    meter_map = {r['_row']: r for r in meter_rows}
    excluded_by_property = Counter(identifier(meter_map[o['row']]['Portfolio Manager ID'])
                                   for o in meter_outcomes if o['outcome'] != 'included')
    by_property: dict[str, list[dict]] = defaultdict(list)
    for r in entries:
        by_property[r['property_id']].append(r)
    by_row = {r['row']: r for r in outcomes}
    statuses, facilities = {}, []
    for p in accepted:
        uid = identifier(p['Portfolio Manager ID'])
        candidates = index.get(text(p['Street Address']).upper(), [])
        coordinates = {(r['lon'], r['lat']) for r in candidates}
        reason = ('unresolved_address' if not candidates else
                  'ambiguous_address' if len(coordinates) != 1 else 'located')
        memberships: list[str] = []
        location = None
        if reason == 'located':
            lon, lat = next(iter(coordinates))
            if not (-80 < lon < -78 and 43 < lat < 45):
                raise ValueError('Invalid address CRS/envelope')
            memberships = sorted(k for k, g in regions.items() if g.covers(Point(lon, lat)))
            reason = 'included' if memberships else 'outside_study_areas'
            location = [lon, lat]
        by_row[p['_row']].update({'outcome': reason, 'regions': memberships})
        statuses[uid] = reason
        if reason != 'included':
            continue
        readings = sorted(by_property[uid], key=lambda r: (r['meter_id'], r['start'], r['id']))
        meters: dict[str, list[dict]] = defaultdict(list)
        for r in readings:
            meters[r['meter_id']].append(r)
        summaries = []
        for meter, rows in sorted(meters.items()):
            summaries.append({'meter_id': meter, 'fuel': rows[0]['fuel'], 'unit': rows[0]['unit'],
                              'reported_sum': math.fsum(r['usage'] for r in rows),
                              'start': min(r['start'] for r in rows), 'end': max(r['end'] for r in rows),
                              'entries': len(rows), 'estimated_entries': sum(r['estimated'] for r in rows),
                              'gaps': sum(a['end'] < b['start'] for a, b in zip(rows, rows[1:])),
                              'annual_total': None})
        facilities.append({'id': 'toronto-' + uid, 'publisher_id': uid, 'row': p['_row'],
                           'name': text(p['Property Name']), 'address': text(p['Street Address']),
                           'property_type': text(p['Property Type - Self-Selected']),
                           'location': location, 'regions': memberships,
                           'address_point_ids': sorted({r['id'] for r in candidates}),
                           'identity_state': 'facility_address_only', 'building_relationship': None,
                           'meters': summaries, 'readings': readings,
                           'excluded_meter_rows': excluded_by_property[uid]})
    for o in meter_outcomes:
        if o['outcome'] == 'included':
            uid = identifier(meter_map[o['row']]['Portfolio Manager ID'])
            o['outcome'] = 'included' if statuses.get(uid) == 'included' else 'facility_' + statuses.get(uid, 'unresolved_property')
    valid_property_ids = {identifier(p['Portfolio Manager ID']) for p in accepted}
    for o in id_outcomes:
        if o['outcome'] == 'accepted':
            o['outcome'] = 'linked_property' if o['id'] in valid_property_ids else 'unresolved_property'
    return facilities, {'properties': outcomes, 'property_ids': id_outcomes, 'meters': meter_outcomes}, statuses


def rights_review(source: Path, receipt: dict) -> dict:
    """Verify source-specific licence statements and required evidence bytes."""
    evidence = []
    sources = {}
    for key, item in receipt['sources'].items():
        for ref in [item, item['metadata'], item['dictionary'], *item['evidence'].values()]:
            path = source / ref['path']
            if hashlib.sha256(path.read_bytes()).hexdigest() != ref['sha256']:
                raise ValueError('Changed energy source/evidence bytes')
            evidence.append({'path': path.relative_to(ROOT).as_posix(), 'sha256': ref['sha256'], 'url': ref['url']})
        page = (source / item['evidence']['dataset_page']['path']).read_text(encoding='utf-8')
        licence = (source / item['evidence']['licence']['path']).read_text(encoding='utf-8')
        if key == 'ontario':
            valid = item['api_licence'] == 'OGL-ON-1.0' and 'Open Government Licence' in licence and 'distribute' in licence
        else:
            valid = ('open-data-licence' in page and 'Open Government Licence' in page
                     and 'Open Government Licence' in licence and 'distribute' in licence)
        if not valid:
            raise ValueError('Energy source rights require review: ' + key)
        sources[key] = {'page': item['page'], 'sha256': item['sha256'], 'resource_id': item['resource_id'],
                        'retrieved_at': item['retrieved_at'], 'year': item['year'],
                        'licence': 'Open Government Licence – ' + ('Ontario' if key == 'ontario' else 'Toronto'),
                        'licence_url': item['evidence']['licence']['url'],
                        'attribution': 'Contains information licensed under the Open Government Licence – ' +
                                       ('Ontario.' if key == 'ontario' else 'Toronto.'),
                        'redistribution': 'Field-limited derived data; no workbook, contact fields, costs, free-text certifications or document copies.'}
    return {'status': 'qualified_field_limited_derivatives', 'reviewer_type': 'AI-assisted source-specific review',
            'sources': sources, 'evidence_files': evidence,
            'exemptions': ['Personal information', 'Unlicensed third-party rights', 'Official logos and marks'],
            'non_endorsement': True}


def build(source: Path, snapshot: str, root: Path = ROOT) -> dict:
    """Create an immutable version; activate only after full reconciliation and rights checks."""
    source = source.resolve()
    receipt = json.loads((source / 'acquisition.json').read_text(encoding='utf-8'))
    if not receipt.get('complete') or set(receipt['sources']) != {'ontario', 'toronto'}:
        raise ValueError('Incomplete acquisition; previous baseline retained')
    for s in receipt['sources'].values():
        if not s['stable_reread']:
            raise ValueError('Unstable source; previous baseline retained')
    rights = rights_review(source, receipt)
    planning_rights = json.loads((root / 'docs/growth-transit/package-rights-contract.json').read_text(encoding='utf-8'))
    rights['supporting_datasets'] = [d for d in planning_rights['datasets'] if d['dataset'] in ('addresses', 'neighbourhoods')]
    for d in rights['supporting_datasets']:
        rights['evidence_files'].extend(d['evidence'])
    year = receipt['year']
    osrc, tsrc = receipt['sources']['ontario'], receipt['sources']['toronto']
    orows, oschema = read_sheet(source / osrc['path'], None, {'EWRB_ID', 'City', 'PrimPropTypCalc', 'Postal_Code'} | {x[0] for x in METRICS.values()})
    props, pschema = read_sheet(source / tsrc['path'], 'Properties', {'Portfolio Manager ID', 'Property Name', 'Street Address', 'Property Type - Self-Selected'})
    ids, ischema = read_sheet(source / tsrc['path'], 'Property IDs', {'Portfolio Manager ID'})
    meters, mschema = read_sheet(source / tsrc['path'], 'Meter Entries', {'Portfolio Manager ID', 'Portfolio Manager Meter ID', 'Meter Consumption ID', 'Meter Type', 'Usage Units', 'Usage/Quantity', 'Start Date', 'End Date', 'Estimation?'})
    schemas = {'ontario': [oschema], 'toronto': [pschema, ischema, mschema]}
    for key, values in schemas.items():
        for s in values:
            if s['rows'] + 1 != receipt['sources'][key]['sheet_nonempty_rows'][s['sheet']]:
                raise ValueError('Worksheet count changed after acquisition')
    cohorts, members, oo = ontario(orows, year)
    boundaries = json.loads((root / 'docs/site-history/boundaries.json').read_text(encoding='utf-8'))
    if boundaries['crs'] != 'EPSG:4326':
        raise ValueError('Unsupported boundary CRS')
    regions = {r['id']: shape(r['geometry']) for r in boundaries['regions'] if r['id'] in ('downtown', 'midtown')}
    if set(regions) != {'downtown', 'midtown'} or any(not g.is_valid or g.is_empty for g in regions.values()):
        raise ValueError('Study boundaries unavailable/invalid')
    facilities, to, _ = facility_evidence(props, ids, meters, address_index(root, snapshot), regions)
    outcomes = {'ontario': oo, **to}
    accounting = {}
    for key, rows in outcomes.items():
        expected = {'ontario': len(orows), 'properties': len(props), 'property_ids': len(ids), 'meters': len(meters)}[key]
        counts = dict(sorted(Counter(r['outcome'] for r in rows).items()))
        if sum(counts.values()) != expected or len({r['row'] for r in rows}) != expected:
            raise ValueError('Unexplained energy omissions: ' + key)
        accounting[key] = {'input': expected, 'accounted': sum(counts.values()), 'outcomes': counts}
    inputs = {'source_hashes': {k: s['sha256'] for k, s in receipt['sources'].items()},
              'dictionary_hashes': {k: s['dictionary']['sha256'] for k, s in receipt['sources'].items()},
              'boundary_version': boundaries['version'], 'address_snapshot': snapshot, 'year': year,
              'method': METHOD, 'toronto_aliases': sorted(TORONTO_ALIASES),
              'derived_hash': digest({'cohorts': cohorts, 'members': members, 'facilities': facilities, 'outcomes': outcomes})}
    version = digest(inputs)[:20]
    base = root / 'public/energy'
    dest = base / version
    dest.mkdir(parents=True, exist_ok=True)
    assets = {}
    def put(name: str, value: Any) -> None:
        raw = canonical(value)
        assets[name] = hashlib.sha256(raw).hexdigest()
        target = dest / (name + '.json.gz')
        target.parent.mkdir(parents=True, exist_ok=True)
        packed = gzip.compress(raw, mtime=0)
        if target.exists() and target.read_bytes() != packed:
            raise ValueError('Immutable energy asset changed')
        target.write_bytes(packed)
    put('cohorts', cohorts)
    for cid, records in members.items():
        put('cohorts/' + cid, records)
    for rid in sorted(regions):
        put('regions/' + rid, [{k: v for k, v in f.items() if k not in ('readings', 'meters')} for f in facilities if rid in f['regions']])
    for f in facilities:
        put('facilities/' + f['id'], f)
    put('geography', {'type': 'FeatureCollection', 'features': [{'type': 'Feature', 'properties': {'id': rid},
                                                               'geometry': next(r['geometry'] for r in boundaries['regions'] if r['id'] == rid)} for rid in sorted(regions)]})
    manifest = {'id': version, 'schema': 1, 'inputs': inputs, 'year': year, 'sources': rights['sources'],
                'assets': assets, 'accounting': accounting, 'minimum_cohort': MINIMUM_COHORT,
                'metrics': {k: {'field': f, 'label': label, 'unit': unit, 'weather_normalized': wn} for k, (f, label, unit, wn) in METRICS.items()},
                'limitations': LIMITATIONS, 'baseline_only': True,
                'facility_counts': {rid: sum(rid in f['regions'] for f in facilities) for rid in regions},
                'schemas': schemas, 'annual_totals_enabled': False}
    path = dest / 'manifest.json'
    if path.exists():
        old = json.loads(path.read_text(encoding='utf-8'))
        # A successful identical refresh preserves the immutable observation and its original retrieval dates.
        if old['inputs'] != inputs or old['assets'] != assets:
            raise ValueError('Immutable manifest changed')
        manifest = old
    else:
        path.write_bytes(canonical(manifest))
    local = root / 'data/energy-review' / version
    local.mkdir(parents=True, exist_ok=True)
    (local / 'outcomes.json').write_bytes(canonical(outcomes))
    (local / 'refresh.json').write_bytes(canonical({'inputs': inputs, 'acquisition': receipt['finished_at'], 'version': version, 'creates_change_event': False}))
    files = {p.relative_to(dest).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(dest.rglob('*')) if p.is_file()}
    report = root / 'docs/energy'
    report.mkdir(exist_ok=True)
    previous_path = report / 'rights-contract.json'
    previous = json.loads(previous_path.read_text(encoding='utf-8')) if previous_path.exists() else {}
    for entry in previous.get('evidence_files', []):
        if entry not in rights['evidence_files']:
            rights['evidence_files'].append(entry)
    boundary_evidence = {'path': 'docs/site-history/boundaries.json', 'sha256': hashlib.sha256((root/'docs/site-history/boundaries.json').read_bytes()).hexdigest()}
    if boundary_evidence not in rights['evidence_files']:
        rights['evidence_files'].append(boundary_evidence)
    # Keep qualified prior snapshots so existing pinned links continue to resolve.
    versions = previous.get('versions', {}) | {version: files}
    rights.update({'versions': versions, 'method': METHOD, 'reviewed_inputs': inputs,
                   'schema': 1, 'fields_review': 'Explicit public schema only. Names/addresses identify municipal facilities, not reporters. No raw contact, certifications, costs, meter names or publisher documents shipped.'})
    (report / 'rights-contract.json').write_text(json.dumps(rights, indent=2), encoding='utf-8')
    (report / 'coverage.json').write_text(json.dumps({'version': version, 'accounting': accounting, 'facility_counts': manifest['facility_counts'], 'cohorts': len(cohorts), 'limitations': LIMITATIONS}, indent=2), encoding='utf-8')
    temporary = base / 'latest.tmp'
    temporary.write_bytes(canonical({'id': version}))
    temporary.replace(base / 'latest.json')
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--address-snapshot', required=True)
    args = parser.parse_args()
    result = build(args.source, args.address_snapshot)
    print(json.dumps({'id': result['id'], 'accounting': result['accounting'], 'facility_counts': result['facility_counts']}))
