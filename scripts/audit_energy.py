"""Independent source reread checks; deliberately does not import the energy builder."""
from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import math
import re
import statistics
from collections import defaultdict
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parents[1]


def audit(source: Path, root: Path = ROOT) -> dict:
    """Check twelve cases directly against XLSX cells and immutable output assets."""
    base = root / 'public/energy'
    version = json.loads((base/'latest.json').read_text())['id']
    directory = base/version
    manifest = json.loads((directory/'manifest.json').read_text())
    receipt = json.loads((source/'acquisition.json').read_text())
    def asset(name: str) -> object:
        raw = gzip.decompress((directory/(name+'.json.gz')).read_bytes())
        assert hashlib.sha256(raw).hexdigest() == manifest['assets'][name]
        return json.loads(raw)
    def rows(key: str, sheet: str | None) -> list[dict]:
        s = receipt['sources'][key]
        raw = (source/s['path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest() == manifest['sources'][key]['sha256']
        with (source/s['path']).open('rb') as stream:
            book = load_workbook(stream, read_only=True, data_only=True)
            try:
                ws = book[sheet] if sheet else book.worksheets[0]
                records = list(ws.values)
                return [dict(zip(records[0], row)) | {'row': i} for i, row in enumerate(records[1:], 2) if any(v is not None for v in row)]
            finally:
                book.close()
    ontology = rows('ontario', None)
    properties = {r['row']: r for r in rows('toronto', 'Properties')}
    meters = rows('toronto', 'Meter Entries')
    meter_rows = {r['row']: r for r in meters}
    cohorts = asset('cohorts')
    source_by_row = {r['row']: r for r in ontology}
    aliases = {'TORONTO', 'CITY OF TORONTO', 'NORTH YORK', 'SCARBOROUGH', 'ETOBICOKE', 'EAST YORK', 'YORK'}
    cases = []
    for property_type, key in [('Multifamily Housing','site_eui'), ('Multifamily Housing','water'),
                               ('Office','ghg'), ('Office','wn_site_eui')]:
        c = next(c for c in cohorts if c['property_type'] == property_type)
        field = manifest['metrics'][key]['field']
        source_values = []
        source_records = [r for r in ontology if r['PrimPropTypCalc'] == property_type and str(r['City']).upper().strip() in aliases and re.fullmatch(r'\d{6}', str(r['EWRB_ID']))]
        for row in source_records:
            value = row[field]
            if isinstance(value, (int,float)) and math.isfinite(value) and value >= 0 and not (key == 'water' and value == 0):
                source_values.append(value)
        displayed = c['metrics'][key]
        assert len(source_values) == displayed['valid']
        assert statistics.median(source_values) == displayed['distribution']['median']
        assert len(source_records) == displayed['reporting_records']
        exported = asset('cohorts/'+c['id'])
        for r in exported:
            assert str(source_by_row[r['row']]['EWRB_ID']) == r['id']
            assert r['property_type'] == property_type and 'location' not in r
        cases.append({'case': property_type+' / '+key, 'outcome': 'passed', 'cohort': c['id'],
                      'source_field': field, 'source_records': len(source_records), 'valid_values': len(source_values),
                      'median': displayed['distribution']['median']})
    small = next(c for c in cohorts if c['metrics']['site_eui']['valid'] < 10)
    assert small['metrics']['site_eui']['distribution'] is None
    cases.append({'case': 'Small cohort suppression', 'cohort': small['id'], 'outcome': 'passed'})
    source_missing = [r['row'] for r in ontology if not re.fullmatch(r'\d{6}', str(r['EWRB_ID']))]
    outcomes = json.loads((root/'data/energy-review'/version/'outcomes.json').read_text())
    assert set(source_missing) == {o['row'] for o in outcomes['ontario'] if o['outcome'] == 'missing_identifier'}
    cases.append({'case': 'Missing Ontario identifiers excluded', 'source_rows': source_missing, 'outcome': 'passed'})
    used = set()
    for region in ('downtown','midtown'):
        for f in [f for f in asset('regions/'+region) if f['id'] not in used][:2]:
            used.add(f['id'])
            evidence = asset('facilities/'+f['id'])
            source_property = properties[f['row']]
            assert str(source_property['Portfolio Manager ID']) == f['publisher_id']
            assert source_property['Street Address'] == f['address']
            assert f['building_relationship'] is None
            for reading in evidence['readings']:
                row = meter_rows[reading['row']]
                assert str(row['Meter Consumption ID']) == reading['id']
                assert str(row['Portfolio Manager ID']) == evidence['publisher_id']
                assert reading['usage'] == row['Usage/Quantity']
                assert reading['start'] == row['Start Date'].date().isoformat()
                assert reading['end'] == row['End Date'].date().isoformat()
            for meter in evidence['meters']:
                selected = [r for r in evidence['readings'] if r['meter_id'] == meter['meter_id']]
                assert math.fsum(meter_rows[r['row']]['Usage/Quantity'] for r in selected) == meter['reported_sum']
                assert meter['annual_total'] is None
            cases.append({'case': region+' municipal source-cell check', 'facility': f['id'], 'name': f['name'],
                          'property_row': f['row'], 'meter_rows': [r['row'] for r in evidence['readings']], 'outcome': 'passed'})
    ambiguous = next(o for o in outcomes['properties'] if o['outcome'] == 'ambiguous_address')
    address = properties[ambiguous['row']]['Street Address'].upper().strip()
    pb = root/'public/planning'; pm = json.loads((pb/manifest['inputs']['address_snapshot']/'manifest.json').read_text())
    points = set()
    for logical, sha in pm['assets'].items():
        if logical.startswith('addresses/'):
            raw = gzip.decompress((pb/'objects'/(sha+'.json.gz')).read_bytes())
            assert hashlib.sha256(raw).hexdigest() == sha
            for point in json.loads(raw):
                if point['label'].upper().strip() == address:
                    points.add((point['lon'], point['lat']))
    assert len(points) > 1
    cases.append({'case': 'Ambiguous facility address remains excluded', 'property_row': ambiguous['row'], 'candidate_points': len(points), 'outcome': 'passed'})
    rejected = next(o for o in outcomes['meters'] if o['outcome'] == 'overlap_or_meter_identity_conflict')
    r = meter_rows[rejected['row']]
    matches = [q for q in meters if q['row'] != r['row'] and q['Portfolio Manager Meter ID'] == r['Portfolio Manager Meter ID'] and
               q['Start Date'] < r['End Date'] and r['Start Date'] < q['End Date']]
    assert matches
    cases.append({'case': 'Overlapping readings quarantined', 'meter_row': r['row'], 'conflicting_rows': [q['row'] for q in matches], 'outcome': 'passed'})
    assert len(cases) == 12
    result = {'version': version, 'reviewer_type': 'Independent calculation path; AI-assisted developer review, not participant evidence',
              'passed': True, 'cases': cases, 'manifest_sha256': hashlib.sha256((directory/'manifest.json').read_bytes()).hexdigest(),
              'source_hashes': {k:s['sha256'] for k,s in manifest['sources'].items()}}
    (root/'docs/energy/analytical-review.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    args = parser.parse_args()
    result = audit(args.source)
    print(json.dumps({'version': result['version'], 'passed': result['passed'], 'cases': len(result['cases'])}))
