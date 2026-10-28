"""Compose immutable GTA snapshots without rewriting existing Toronto evidence."""
from __future__ import annotations

import argparse
import gzip
import hashlib
import json
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from shapely.geometry import mapping, shape
from shapely.ops import transform, unary_union
from pyproj import Transformer

from scripts.acquire_gta import encoded, now, validate_attributes
from scripts.build_planning import publish_latest, tiles
from scripts.gta_adapters import planning_rows, address_rows, detail_chunks, address_indexes

ROOT = Path(__file__).resolve().parents[1]
METRIC = Transformer.from_crs(4326, 26917, always_xy=True)
DISPLAY = Transformer.from_crs(26917, 4326, always_xy=True)
KINDS = ('projects', 'applications', 'regional_reviews', 'zoning', 'heights')


def load_receipt(directory: Path, key: str, contract: dict) -> tuple[dict, dict]:
    """Verify the content and reviewed contract before a composition uses it."""
    receipt = json.loads((directory / f'{key}.json').read_text(encoding='utf-8'))
    if receipt['contract_sha256'] != hashlib.sha256(encoded(contract)).hexdigest():
        raise ValueError('Acquisition contract mismatch')
    if not receipt.get('validation') or not all(receipt['validation'].values()):
        raise ValueError('Unvalidated acquisition')
    for digest in [receipt['sha256'], receipt['item_sha256'], receipt['layer_sha256'], receipt['final_layer_sha256'],
                   *[q['sha256'] for q in receipt['queries']], *[e['sha256'] for e in contract.get('licence_documents', [])]]:
        if hashlib.sha256((directory / digest).read_bytes()).hexdigest() != digest:
            raise ValueError('Source receipt checksum mismatch')
    data = json.loads((directory / receipt['sha256']).read_bytes())
    if len(data['features']) != receipt['expected_records']:
        raise ValueError('Source count mismatch')
    validate_attributes(data['features'], contract['schema']['fields'])
    ids = [f['properties'][contract['schema']['oid']] for f in data['features']]
    if len(ids) != len(set(ids)):
        raise ValueError('Duplicate source identities')
    return receipt, data


def checked_geometry(feature: dict):
    """Reject missing, invalid or out-of-envelope source polygons without repair."""
    geometry = shape(feature.get('geometry') or {})
    if geometry.is_empty or not geometry.is_valid or geometry.geom_type not in ('Polygon', 'MultiPolygon'):
        raise ValueError('Missing, invalid or unsupported polygon')
    w, s, e, n = geometry.bounds
    if not (-81 < w <= e < -78 and 43 < s <= n < 45.5):
        raise ValueError('Coordinates outside GTA validation envelope')
    return geometry


def build(directory: Path, output: Path, activate: bool = False, toronto_id: str | None = None) -> dict:
    """Publish an aggregate only after every referenced source and object validates."""
    configs = json.loads((ROOT / 'scripts/gta_contracts.json').read_text(encoding='utf-8'))
    scope = json.loads((ROOT / 'scripts/gta_scope.json').read_text(encoding='utf-8'))
    registry = json.loads((ROOT / 'scripts/gta_source_registry.json').read_text(encoding='utf-8'))
    registered = {m['id']: m for m in registry['municipalities']}
    latest = json.loads((output / 'latest.json').read_text(encoding='utf-8'))
    base = json.loads((output / (toronto_id or latest['id']) / 'manifest.json').read_text(encoding='utf-8'))
    if base.get('source_snapshots'):
        base = json.loads((output / base['source_snapshots']['toronto'] / 'manifest.json').read_text(encoding='utf-8'))
    boundary_receipt, boundary = load_receipt(directory, 'boundaries', configs['boundaries'])
    adapters = json.loads((ROOT / 'scripts/gta_adapters.json').read_text(encoding='utf-8'))
    acquired = {key:load_receipt(directory,key,configs[key]) for key,adapter in adapters.items() if adapter['enabled'] and (directory/f'{key}.json').exists()}
    assets = dict(base['assets'])
    def read(name: str):
        raw = gzip.decompress((output / 'objects' / f'{assets[name]}.json.gz').read_bytes())
        if hashlib.sha256(raw).hexdigest() != assets[name]:
            raise ValueError('Public object checksum mismatch')
        return json.loads(raw)
    def put(name: str, data: object) -> None:
        raw = encoded(data)
        digest = hashlib.sha256(raw).hexdigest()
        target = output / 'objects' / f'{digest}.json.gz'
        target.parent.mkdir(exist_ok=True)
        if not target.exists():
            target.write_bytes(gzip.compress(raw, mtime=0))
        assets[name] = digest
    grouped = defaultdict(list)
    source_ids = defaultdict(list)
    expected = {m['id'] for m in scope['municipalities']}
    for feature in boundary['features']:
        municipality = 'ontario:' + str(feature['properties']['MUNID'])
        if municipality not in expected:
            raise ValueError('Unexpected municipality')
        grouped[municipality].append(transform(METRIC.transform, checked_geometry(feature)))
        source_ids[municipality].append(feature['properties']['OBJECTID'])
    if set(grouped) != expected or len(expected) != 25:
        raise ValueError('Incomplete GTA municipality geometry')
    municipalities = []
    for m in scope['municipalities']:
        metric = unary_union(grouped[m['id']])
        if not metric.is_valid:
            raise ValueError('Invalid dissolved municipal boundary')
        display = transform(DISPLAY.transform, metric.simplify(10, preserve_topology=True))
        centre = transform(DISPLAY.transform, metric.representative_point())
        municipality = {**m, **registered[m['id']], 'geometry_qualified': True, 'geometry': mapping(display), 'metric': mapping(metric),
                        'lon': centre.x, 'lat': centre.y, 'boundary_source_ids': source_ids[m['id']],
                        'layers': {k: [] for k in (*KINDS, 'addresses', 'buildings')}}
        if m['name'] == 'Toronto':
            municipality['layers'] = {k: ([k] if k!='regional_reviews' else []) for k in (*KINDS, 'addresses', 'buildings')}
        municipality['coverage_note'] = registered[m['id']].get('reason', 'Only the stated source scope is integrated.')
        municipality['qualification_layers'] = json.loads(json.dumps(registered[m['id']].get('qualification_layers', {})))
        municipalities.append(municipality)
    toronto = next(m['id'] for m in municipalities if m['name'] == 'Toronto')
    exclusions = read('exclusions.json')
    additions = defaultdict(list)
    extra_sources, source_refs, address_records = {}, {}, []
    for key, (receipt, data) in acquired.items():
        adapter = adapters[key]; config = configs[key]
        rows, rejected = (address_rows if adapter['kind']=='addresses' else planning_rows)(key, data, adapter, config, municipalities)
        exclusions.extend(rejected)
        receipt_id = hashlib.sha256(encoded(receipt)).hexdigest()
        for row in rows: row['source_snapshot_id'] = receipt_id
        compact = detail_chunks(key, rows, put, size=100 if key=='brampton-opa' else 250)
        if adapter['kind']=='addresses': address_records.extend(compact)
        else: additions[adapter['kind']].extend(compact)
        for municipality in municipalities:
            if municipality['id'] in adapter['jurisdiction_ids']:
                municipality['layers'][adapter['kind']].append(key)
                municipality['qualification_layers'].setdefault(adapter['kind'], {}).update(status='integrated', source_key=key)
        modified = receipt['source_modified_at']
        extra_sources[key] = {'key':key,'name':adapter['name'],'publisher':adapter['publisher'],
            'jurisdiction_ids':adapter['jurisdiction_ids'],'kind':adapter['kind'],'scope':adapter['scope'],
            'page':config['page'],'url':config['url'],'sha256':receipt['sha256'],'retrieved_at':receipt['retrieved_at'],
            'source_modified_at':datetime.fromtimestamp(modified/1000,timezone.utc).isoformat() if modified else None,
            'refresh_rate':adapter['refresh_rate'],'notes':adapter['notes'],'licence':adapter['licence'],
            'licence_basis':adapter['attribution']+'; '+adapter['licence']+'. Geometry transformed to EPSG:4326 for display and EPSG:26917 for calculation.',
            'records_in':len(data['features']),'records_out':len(rows),'schema':list(config['schema']['fields']),
            'geometry_rejected':len(rejected),'original_statuses':dict(Counter(r.get('original_status') or 'Not supplied' for r in rows)) if adapter['kind']!='addresses' else {},
            'receipt':{k:v for k,v in receipt.items() if k!='queries'}}
        receipt_path = f'source-snapshots/{key}/{receipt_id}.json'
        put(receipt_path, {'id':receipt_id,'source_key':key,'receipt':receipt,'records_in':len(data['features']),'records_out':len(rows),'exclusions':rejected})
        source_refs[key] = {'id':receipt_id,'asset':receipt_path,'raw_sha256':receipt['sha256']}
    address_search = address_indexes(address_records, municipalities, put)
    # Route to existing immutable shards without changing source rows or coordinates.
    search_buckets = defaultdict(dict)
    toronto_count = 0
    for logical in sorted(base['assets']):
        if not logical.startswith('addresses/'):
            continue
        for row in read(logical):
            toronto_count += 1
            match = {key:row[key] for key in ('id','label','street')}
            match['address_shard'] = logical
            for text in (row['label'], row['street']):
                prefix = ' '.join(text.upper().split())[:3]
                search_buckets[prefix][row['id']] = match
    if toronto_count != base['counts']['addresses']:
        raise ValueError('Toronto address routing count mismatch')
    directory = {}
    for prefix,entries in sorted(search_buckets.items()):
        path = 'address-search/toronto-matches/' + prefix.encode('utf-8').hex() + '.json'
        put(path, sorted(entries.values(), key=lambda row:(row['label'].upper(),row['id'])))
        directory[prefix] = path
    put('address-search/toronto-matches.json', directory)
    address_search[toronto] = {'index':'address-search/toronto-matches.json', 'source_key':'addresses',
                              'count':toronto_count, 'format':'legacy-address-matches'}
    source_statuses = {}
    tile_manifest = dict(base['tiles'])
    for kind in ('projects', 'applications', 'regional_reviews'):
        items = [{**r, 'source_key': kind, 'jurisdiction_id': toronto, 'source_scope': 'municipal project' if kind == 'projects' else 'municipal application'} for r in (read(f'{kind}.json') if kind!='regional_reviews' else [])]
        source_statuses[kind] = dict(Counter(r.get('original_status') or 'Not supplied' for r in items))
        items += additions[kind]
        cells, unlocated = defaultdict(list), []
        for row in items:
            if row.get('metric'):
                bounds = shape(row['metric']).bounds
            elif row.get('xy'):
                x, y = row['xy']; bounds = (x, y, x, y)
            else:
                unlocated.append(row)
                continue
            for cell in tiles(bounds):
                cells[cell].append(row)
        tile_manifest[kind] = sorted(cells)
        for cell, values in cells.items():
            put(f'{kind}/{cell}.json', values)
        put(f'unlocated/{kind}.json', unlocated)
    put('municipalities.json', municipalities)
    put('gta-coverage.json', mapping(unary_union([shape(m['metric']) for m in municipalities])))
    put('exclusions.json', exclusions)
    sources = {k: {**v, 'jurisdiction_id': toronto, 'kind': k, 'scope': 'municipal', 'original_statuses': source_statuses.get(k, {})} for k, v in base['sources'].items()}
    sources.update(extra_sources)
    sources['boundaries'] = {'key': 'boundaries', 'name': 'Ontario municipal boundaries — GTA subset',
        'publisher': 'Land Information Ontario', 'page': configs['boundaries']['page'], 'url': configs['boundaries']['url'],
        'sha256': boundary_receipt['sha256'], 'retrieved_at': boundary_receipt['retrieved_at'], 'source_modified_at': None,
        'refresh_rate': 'Checked daily; source observation dates vary', 'notes': '39 source parts dissolved into 25 municipal areas. Boundaries do not establish planning dataset coverage.',
        'licence': 'Open Government Licence – Ontario', 'licence_basis': configs['boundaries']['licence_metadata'],
        'records_in': len(boundary['features']), 'records_out': len(municipalities), 'schema': list(configs['boundaries']['schema']['fields'])}
    identity = {'builder': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), 'toronto': base['id'], 'boundaries': boundary_receipt['sha256'], **{key:source_refs[key]['id'] for key in acquired}, 'adapters':hashlib.sha256(encoded(adapters)).hexdigest(), 'adapter_code':hashlib.sha256((ROOT/'scripts/gta_adapters.py').read_bytes()).hexdigest(),
                'registry': hashlib.sha256(encoded(registry)).hexdigest(), 'contracts': hashlib.sha256(encoded(configs)).hexdigest(), 'scope': hashlib.sha256(encoded(scope)).hexdigest()}
    snapshot_id = hashlib.sha256(encoded(['gta-2.0', identity])).hexdigest()[:20]
    manifest = {**base, 'id': snapshot_id, 'version': 'gta-2.0', 'created_at': now(),
        'coverage': 'GTA phased coverage. Municipal applications, regional reviews and addresses are qualified independently; consult the coverage directory.',
        'sources': sources, 'source_snapshots': identity, 'source_refs':source_refs, 'address_search':address_search, 'assets': assets, 'tiles': tile_manifest,
        'regional': True, 'municipality_count': 25, 'exclusions': len(exclusions),
        'counts': {**base['counts'], **{kind:base['counts'].get(kind,0)+len(additions[kind]) for kind in ('applications','regional_reviews')}, 'addresses':base['counts'].get('addresses',0)+len(address_records)},
        'summaries':{**base['summaries'], 'regional_reviews':{'records':len(additions['regional_reviews']),'located':sum(bool(r.get('metric')) for r in additions['regional_reviews']),'unlocated':sum(not r.get('metric') for r in additions['regional_reviews']),'stages':{},'distinct_application_numbers':0}},
        'validation': {**base['validation'], 'municipalities': True, 'source_receipts': True, 'source_ids': True}}
    destination = output / snapshot_id
    destination.mkdir(exist_ok=True)
    path = destination / 'manifest.json'
    if path.exists():
        manifest = json.loads(path.read_text(encoding='utf-8'))
    else:
        temporary = path.with_suffix('.tmp')
        temporary.write_bytes(encoded(manifest)); temporary.replace(path)
    if activate:
        publish_latest(output, snapshot_id)
    return manifest


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT / 'data/gta-source')
    parser.add_argument('--output', type=Path, default=ROOT / 'public/planning')
    parser.add_argument('--activate', action='store_true', help='Advance local latest only after validation')
    args = parser.parse_args()
    result = build(args.source, args.output, args.activate)
    print(json.dumps({'snapshot': result['id'], 'coverage': result['coverage'], 'counts': result['counts']}))
