"""Acquire audited ArcGIS layers with immutable receipts and complete ID accounting."""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode, urlsplit

ROOT = Path(__file__).resolve().parents[1]


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def encoded(value: object) -> bytes:
    return json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':'), allow_nan=False).encode()


def archive(directory: Path, content: bytes) -> str:
    """Retain exact response bytes under their content digest."""
    digest = hashlib.sha256(content).hexdigest()
    directory.mkdir(parents=True, exist_ok=True)
    target = directory / digest
    if target.exists() and target.read_bytes() != content:
        raise ValueError('Archive collision')
    if not target.exists():
        target.write_bytes(content)
    return digest


def fetch(url: str, directory: Path, body: str | None = None) -> tuple[dict, str]:
    """Fetch HTTPS metadata or data; transport and ArcGIS errors fail closed."""
    if urlsplit(url).scheme != 'https':
        raise ValueError('HTTPS required')
    content = subprocess.check_output(['curl', '--fail', '--silent', '--show-error', '--location',
        '--proto', '=https', '--proto-redir', '=https', '--max-time', '120', '--retry', '2', *(['--data-raw', body] if body else []), url])
    digest = archive(directory, content)
    result = json.loads(content)
    if 'error' in result:
        raise ValueError(f'ArcGIS error: {result["error"]}')
    return result, digest


def schema(layer: dict) -> dict:
    """Contract includes field types/domains, geometry and declared CRS."""
    sr = layer.get('extent', {}).get('spatialReference', {})
    return {'fields': {f['name']: {'type': f['type'], 'domain': f.get('domain')} for f in layer['fields']},
            'oid': layer.get('objectIdField') or next(f['name'] for f in layer['fields'] if f['type'] == 'esriFieldTypeOID'),
            'crs': sr.get('latestWkid', sr.get('wkid')), 'geometry': layer.get('geometryType')}


def reconcile(expected: list, features: list, oid: str) -> None:
    """Reject duplicates, omissions and unexpected IDs, even when counts match."""
    actual = [f['properties'].get(oid) for f in features]
    if len(actual) != len(set(actual)) or set(actual) != set(expected):
        raise ValueError('Incomplete or duplicate ArcGIS feature inventory')


def validate_attributes(features: list, fields: dict) -> None:
    """Check every supplied value against the frozen ArcGIS field contract."""
    fields = {key: value for key, value in fields.items() if value['type'] != 'esriFieldTypeGeometry'}
    for feature in features:
        values = feature['properties']
        if set(values) != set(fields):
            raise ValueError('Feature fields disagree with reviewed schema')
        for key, value in values.items():
            if value is None:
                continue
            kind = fields[key]['type']
            if kind in ('esriFieldTypeString', 'esriFieldTypeGUID', 'esriFieldTypeGlobalID'):
                valid = isinstance(value, str)
            elif kind in ('esriFieldTypeOID', 'esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'esriFieldTypeDate'):
                valid = isinstance(value, int) and not isinstance(value, bool)
            elif kind in ('esriFieldTypeDouble', 'esriFieldTypeSingle'):
                valid = isinstance(value, (int, float)) and not isinstance(value, bool)
            else:
                raise ValueError(f'Unreviewed field type: {kind}')
            if not valid:
                raise ValueError(f'Invalid attribute type: {key}')


def acquire(key: str, config: dict, directory: Path) -> dict:
    """Validate an explicit source contract before downloading feature batches."""
    if not config.get('acquisition_enabled', True):
        raise ValueError('Source acquisition blocked by qualification contract')
    if config['schema']['crs'] not in (4326, 3857, 26917):
        raise ValueError('Unreviewed source CRS')
    receipts = []
    for evidence in config.get('licence_documents', []):
        content = subprocess.check_output(['curl', '--fail', '--silent', '--show-error', '--location', '--proto', '=https', '--proto-redir', '=https', '--max-time', '120', evidence['url']])
        if archive(directory, content) != evidence['sha256']:
            raise ValueError('Licence document changed; review required')
    item_url = f'https://www.arcgis.com/sharing/rest/content/items/{config["item_id"]}?f=json'
    item, item_sha = fetch(item_url, directory)
    if item.get('owner') != config['owner'] or item.get('access') != 'public':
        raise ValueError('Publisher or access changed')
    if item.get('licenseInfo') != config['licence_metadata'] or item.get('url', '').lower() != config['item_url'].lower():
        raise ValueError('Source identity or licence changed; review required')
    endpoint = config['url']
    layer, layer_sha = fetch(endpoint + '?f=json', directory)
    if schema(layer) != config['schema']:
        raise ValueError('Source schema, geometry or CRS changed; review required')
    def query(parameters: dict) -> dict:
        url = endpoint + '/query?' + urlencode(parameters)
        use_post = len(url) > 1800
        request_url = endpoint + '/query' if use_post else url
        body = urlencode(parameters) if use_post else None
        result, digest = fetch(request_url, directory, body)
        receipts.append({'url': request_url, 'method': 'POST' if use_post else 'GET', 'parameters': parameters, 'sha256': digest})
        return result
    params = {'where': config.get('where', '1=1'), 'f': 'json'}
    ids = query({**params, 'returnIdsOnly': 'true'}).get('objectIds')
    if not isinstance(ids, list) or not ids or len(ids) != len(set(ids)):
        raise ValueError('Missing, empty or duplicate source inventory')
    if query({**params, 'returnCountOnly': 'true'})['count'] != len(ids):
        raise ValueError('Count query disagrees with ID inventory')
    features = []
    verification_batches = []
    size = min(int(config.get('batch_size', 100)), int(layer.get('maxRecordCount', 100)))
    for start in range(0, len(ids), size):
        batch = sorted(ids)[start:start + size]
        response = query({'objectIds': ','.join(map(str, batch)), 'outFields': '*',
                          'returnGeometry': 'true', 'outSR': 4326, 'f': 'geojson'})
        if response.get('type') != 'FeatureCollection' or response.get('exceededTransferLimit') or response.get('properties', {}).get('exceededTransferLimit'):
            raise ValueError('Incomplete GeoJSON response')
        rows = response['features']
        reconcile(batch, rows, config['schema']['oid'])
        validate_attributes(rows, config['schema']['fields'])
        features.extend(rows)
        verification_batches.append((batch, hashlib.sha256(encoded(sorted(rows, key=lambda f: f['properties'][config['schema']['oid']]))).hexdigest()))
    reconcile(ids, features, config['schema']['oid'])
    # Services without an edit timestamp need a second complete read, not merely stable IDs.
    if config.get('verify_content_twice'):
        for batch, digest in verification_batches:
            repeated = query({'objectIds': ','.join(map(str, batch)), 'outFields': '*', 'returnGeometry': 'true', 'outSR': 4326, 'f': 'geojson'})
            reconcile(batch, repeated.get('features', []), config['schema']['oid'])
            if hashlib.sha256(encoded(sorted(repeated['features'], key=lambda f: f['properties'][config['schema']['oid']]))).hexdigest() != digest:
                raise ValueError('Source attributes or geometry changed during acquisition')
    after = query({**params, 'returnIdsOnly': 'true'}).get('objectIds', [])
    final_layer, final_sha = fetch(endpoint + '?f=json', directory)
    if set(after) != set(ids) or schema(final_layer) != schema(layer) or final_layer.get('editingInfo') != layer.get('editingInfo'):
        raise ValueError('Source changed during acquisition; retry later')
    features.sort(key=lambda f: f['properties'][config['schema']['oid']])
    data_sha = archive(directory, encoded({'type': 'FeatureCollection', 'features': features}))
    receipt = {'key': key, 'sha256': data_sha, 'retrieved_at': now(), 'expected_records': len(ids),
               'item_sha256': item_sha, 'layer_sha256': layer_sha, 'final_layer_sha256': final_sha,
               'contract_sha256': hashlib.sha256(encoded(config)).hexdigest(),
               'source_crs': config['schema']['crs'], 'output_crs': 4326,
               'source_modified_at': layer.get('editingInfo', {}).get('lastEditDate'),
               'licence_documents': config.get('licence_documents', []), 'queries': receipts, 'validation': {'identity': True, 'schema': True, 'ids': True, 'counts': True, 'stable_read': True}}
    target = directory / f'{key}.json'
    temporary = target.with_suffix('.tmp')
    temporary.write_bytes(encoded(receipt))
    temporary.replace(target)
    return receipt


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True)
    parser.add_argument('--directory', type=Path, default=ROOT / 'data/gta-source')
    args = parser.parse_args()
    configs = json.loads((ROOT / 'scripts/gta_contracts.json').read_text(encoding='utf-8'))
    receipt = acquire(args.source, configs[args.source], args.directory)
    print(json.dumps({k: receipt[k] for k in ('key', 'sha256', 'expected_records', 'retrieved_at')}))
