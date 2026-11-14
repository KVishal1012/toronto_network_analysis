"""Explicitly acquired City reference layers, independent of observed mobility state."""
from __future__ import annotations
import hashlib
import json
from pathlib import Path
from shapely.geometry import shape
from server.store import DATA, CATALOG, fetch
from server.engine import iso_now

LAYERS = {
    'green-spaces': {'name': 'Green Spaces', 'resource': 'Green Spaces - 4326.geojson', 'types': ['Polygon', 'MultiPolygon'], 'limitation': 'Generalized, non-exhaustive reference polygons. Public access and ownership are not guaranteed. No vegetation health or live park condition is measured.'},
    'cycling-network': {'name': 'Cycling Network', 'resource': 'cycling-network - 4326.geojson', 'types': ['LineString', 'MultiLineString'], 'limitation': 'Reference cycling infrastructure, not current closures, safe routing or traffic conditions. Pre-2001 installations are recorded as 2001 by the source.'},
}
DIRECTORY = DATA / 'reference'


def validate(raw: dict, key: str) -> tuple[list, list]:
    """Reject unsupported CRS and quarantine invalid geometries without repairs."""
    crs = raw.get('crs', {}).get('properties', {}).get('name')
    if crs != 'urn:ogc:def:crs:OGC:1.3:CRS84':
        raise ValueError(f'Unverified coordinate system: {crs}')
    if raw.get('type') != 'FeatureCollection' or not isinstance(raw.get('features'), list):
        raise ValueError('Expected a GeoJSON FeatureCollection')
    accepted, rejected, seen = [], [], set()
    for index, f in enumerate(raw['features']):
        try:
            p = f['properties']
            identity = p.get('_id')
            if identity is None or str(identity) in seen:
                raise ValueError('Missing or duplicate source _id')
            seen.add(str(identity))
            g = shape(f['geometry'])
            if g.geom_type not in LAYERS[key]['types'] or g.is_empty or not g.is_valid:
                raise ValueError('Empty, invalid or unexpected geometry')
            west, south, east, north = g.bounds
            if not (-80 < west <= east < -78 and 43 < south <= north < 45):
                raise ValueError('Coordinates outside Toronto-region validation envelope')
            accepted.append({'type': 'Feature', 'id': str(identity), 'geometry': f['geometry'], 'properties': p})
        except (ValueError, KeyError, TypeError) as exc:
            rejected.append({'row': index, 'reason': str(exc)})
    return sorted(accepted, key=lambda f: f['id']), rejected


def acquire(key: str) -> dict:
    """Archive fixed catalogue resources and atomically publish a verified snapshot."""
    spec = LAYERS[key]
    receipt = {'id': key, 'name': spec['name'], 'page': f'https://open.toronto.ca/dataset/{key}/', 'status': 'unavailable', 'checked_at': iso_now(), 'limitation': spec['limitation'], 'publisher': 'City of Toronto'}
    try:
        metadata, meta_hash = fetch(CATALOG + key)
        package = metadata['result']
        r = next(r for r in package['resources'] if r['name'] == spec['resource'])
        raw, digest = fetch(r['url'])
        features, rejected = validate(raw, key)
        if not features:
            raise ValueError('No valid reference features')
        receipt.update(status='reference', retrieved_at=iso_now(), source_modified_at=r.get('last_modified'), refresh_rate=package.get('refresh_rate'), licence=package.get('license_title') or package.get('license_id') or 'Not specified in catalogue metadata', url=r['url'], sha256=digest, metadata_sha256=meta_hash, crs='OGC:CRS84 (longitude, latitude)', records_in=len(raw['features']), records_out=len(features), rejected=rejected, observation_date=None)
        bundle = {'type': 'FeatureCollection', 'features': features, 'receipt': receipt}
    except (OSError, ValueError, KeyError, TypeError, StopIteration) as exc:
        receipt['error'] = str(exc)
        bundle = {'type': 'FeatureCollection', 'features': [], 'receipt': receipt}
    DIRECTORY.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(bundle, allow_nan=False).encode('utf-8')
    archive = DIRECTORY / (hashlib.sha256(payload).hexdigest() + '.json')
    archive.write_bytes(payload)
    pending = DIRECTORY / (key + '.tmp')
    pending.write_bytes(payload)
    pending.replace(DIRECTORY / (key + '.json'))
    return receipt


def layer(key: str) -> dict:
    """Read only allowlisted snapshots; no URL or path supplied by clients."""
    if key not in LAYERS:
        raise ValueError('Unknown reference layer')
    path = DIRECTORY / (key + '.json')
    if path.exists():
        return json.loads(path.read_text(encoding='utf-8'))
    return {'type': 'FeatureCollection', 'features': [], 'receipt': {'id': key, 'name': LAYERS[key]['name'], 'status': 'unavailable', 'limitation': LAYERS[key]['limitation'], 'page': f'https://open.toronto.ca/dataset/{key}/', 'error': 'Not acquired; run python -m server.reference'}}


def inventory() -> list:
    """List receipts without exposing geometry in the metadata response."""
    return [layer(key)['receipt'] for key in LAYERS]


if __name__ == '__main__':
    for key in LAYERS:
        print(json.dumps(acquire(key)))
