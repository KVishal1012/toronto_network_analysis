"""Source-scoped planning and address adapters; never infer publisher semantics."""
from __future__ import annotations
import hashlib
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from typing import Callable
from pyproj import Transformer
from shapely.geometry import mapping, shape
from shapely.prepared import prep
from shapely.ops import transform

METRIC = Transformer.from_crs(4326, 26917, always_xy=True)


def normalize(value: str) -> str:
    """Normalize search text only; retain the publisher's original label."""
    return re.sub(r'\s+', ' ', value.strip()).upper()


def geometry(feature: dict, point: bool = False):
    """Reject unsupported or invalid locations without repairs or CRS guessing."""
    raw = feature.get('geometry')
    if not isinstance(raw, dict) or not raw.get('type'):
        raise ValueError('Missing geometry')
    try:
        g = shape(raw)
    except (ValueError, TypeError, KeyError, AttributeError, IndexError) as error:
        raise ValueError('Malformed geometry') from error
    allowed = ('Point',) if point else ('Point', 'Polygon', 'MultiPolygon')
    if g.is_empty or not g.is_valid or g.geom_type not in allowed:
        raise ValueError('Missing, invalid or unsupported geometry')
    w, s, e, n = g.bounds
    if not (-81 < w <= e < -78 and 43 < s <= n < 45.5):
        raise ValueError('Coordinates outside GTA validation envelope')
    return g


def jurisdiction(properties: dict, adapter: dict, municipalities: list[dict]) -> str | None:
    """Use an explicitly contracted municipal field; never nearest-boundary assignment."""
    ids = adapter['jurisdiction_ids']
    if len(ids) == 1:
        return ids[0]
    name = normalize(str(properties.get(adapter.get('municipality_field', ''), '')))
    name = adapter.get('municipality_aliases', {}).get(name, name)
    matches = [m['id'] for m in municipalities if m['id'] in ids and normalize(m['name']) == name]
    return matches[0] if len(matches) == 1 else None


def planning_rows(key: str, data: dict, adapter: dict, contract: dict, municipalities: list[dict]) -> tuple[list, list]:
    """Preserve source records, field conflicts and unlocated evidence separately."""
    rows, exclusions = [], []
    for feature in data['features']:
        p = feature['properties']; oid = str(p[contract['schema']['oid']])
        unresolved = adapter.get('status_unresolved', False)
        status_fields = adapter.get('status_fields', [])
        original = 'Status interpretation unresolved' if unresolved else str(p.get(status_fields[0]) or '') if status_fields else ''
        row = {'id': f'{key}:{oid}', 'source_key': key, 'source_id': oid, 'kind': adapter['kind'],
               'jurisdiction_id': jurisdiction(p, adapter, municipalities), 'source_scope': adapter['scope'],
               'label': next((str(p[f]) for f in adapter['label_fields'] if p.get(f)), oid),
               'number': p.get(adapter.get('number_field')), 'original_status': original, 'status': 'Unknown',
               'status_definition': 'Regional review is not municipal approval. Field precedence is undocumented.' if unresolved else 'Publisher wording retained; construction and cross-municipality stage equivalence are not inferred.',
               'source_status_fields': {f:p.get(f) for f in status_fields},
               'geometry_origin': 'unlocated', 'missing': None, 'repairs': [],
               'description': p.get(adapter.get('description_field')), 'attributes': dict(p),
               'source_dates': {f:datetime.fromtimestamp(p[f]/1000, timezone.utc).isoformat() if p.get(f) is not None else None for f in adapter.get('date_fields',[])},
               'limitations': [adapter['notes'], 'Source record identity is snapshot-scoped. No cross-publisher merging.']}
        try:
            g = geometry(feature); metric = transform(METRIC.transform, g)
            if not row['jurisdiction_id']:
                raise ValueError('Municipality attribute missing or ambiguous')
            area = next(m for m in municipalities if m['id'] == row['jurisdiction_id'])
            if not metric.intersects(shape(area['metric'])):
                raise ValueError('Geometry does not intersect its supplied municipality')
            row.update(geometry=mapping(g), metric=mapping(metric), geometry_origin='source point' if g.geom_type=='Point' else 'source polygon')
        except (ValueError, TypeError, KeyError) as error:
            row['missing'] = str(error)
            exclusions.append({'source':key,'id':row['id'],'reason':str(error)})
        rows.append(row)
    if not any(r.get('metric') for r in rows):
        raise ValueError(f'No usable planning geometry: {key}')
    return rows, exclusions


def address_rows(key: str, data: dict, adapter: dict, contract: dict, municipalities: list[dict]) -> tuple[list, list]:
    """Accept source points only with an unambiguous, spatially consistent municipality."""
    rows, exclusions = [], []
    areas = {m['id']:prep(shape(m['metric'])) for m in municipalities if m['id'] in adapter['jurisdiction_ids']}
    for feature in data['features']:
        p = feature['properties']; oid = str(p[contract['schema']['oid']]); id = f'{key}:{oid}'
        try:
            g = geometry(feature, point=True); metric = transform(METRIC.transform, g)
            municipality = jurisdiction(p, adapter, municipalities)
            if not municipality or not areas[municipality].contains(metric):
                raise ValueError('Address municipality missing, ambiguous, on boundary or inconsistent with geometry')
            street = ' '.join(str(p[f]) for f in adapter['street_fields'] if p.get(f))
            if adapter.get('label_field'):
                label = p.get(adapter['label_field'])
            else:
                number = p.get(adapter['number_field'])
                suffix = p.get(adapter.get('number_suffix_field')) or ''
                label = f'{number}{suffix} {street}' if number is not None else None
            if not isinstance(label,str) or not label.strip():
                raise ValueError('Missing address label')
            if not street:
                raise ValueError('Missing street name')
            rows.append({'id':id,'source_id':oid,'source_key':key,'jurisdiction_id':municipality,
                         'label':label,'street':normalize(street),'original_street':street,
                         'unit':p.get(adapter.get('unit_field')), 'search_label':normalize(label),
                         'lon':g.x,'lat':g.y,'xy':[metric.x,metric.y], 'geometry_origin':'source address point',
                         'attributes':p, 'limitations':[adapter['notes']]})
        except (ValueError, TypeError, KeyError) as error:
            exclusions.append({'source':key,'id':id,'reason':str(error)})
    if not rows:
        raise ValueError(f'No usable address points: {key}')
    return rows, exclusions


def detail_chunks(key: str, rows: list, put: Callable, size: int = 250) -> list:
    """Retain source attributes in separate details; keep query payloads small."""
    for start in range(0,len(rows),size):
        path = f'details/{key}-{start//size}.json'
        for row in rows[start:start+size]: row['detail'] = path
        put(path,{r['id']:r for r in rows[start:start+size]})
    return [{k:v for k,v in r.items() if k not in ('attributes','description','limitations','repairs')} for r in rows]


def address_indexes(rows: list, municipalities: list, put: Callable) -> dict:
    """Two sorted indexes permit prefix queries with bounded 250-row shard reads."""
    result = {}
    for m in municipalities:
        records = [r for r in rows if r['jurisdiction_id']==m['id']]
        if not records: continue
        if len({r['source_key'] for r in records}) != 1:
            raise ValueError('Multiple address primaries for ' + m['id'])
        index = {}
        for field in ('search_label','street'):
            ordered = sorted(records,key=lambda r:(r[field],r['id']))
            descriptors = []
            for start in range(0,len(ordered),250):
                chunk = ordered[start:start+250]
                path = f'address-search/{m["id"].replace(":","-")}/{field}-{start//250}.json'
                put(path,chunk)
                descriptors.append({'min':chunk[0][field],'max':chunk[-1][field],'path':path})
            index[field] = descriptors
        path = f'address-search/{m["id"].replace(":","-")}/index.json'
        put(path,index); result[m['id']] = {'index':path,'source_key':records[0]['source_key'],'count':len(records)}
    return result
