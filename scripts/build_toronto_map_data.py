#!/usr/bin/env python3
"""Generate compact, rights-reviewed city-wide offline Toronto Open Data cartography for ASTER."""

from __future__ import annotations

import csv
import gzip
import io
import json
import math
import re
import zipfile
from collections import defaultdict
from pathlib import Path

from pyproj import Transformer
from shapely.geometry import LineString, Polygon, box, mapping, shape
from shapely.ops import linemerge, unary_union
from shapely.strtree import STRtree

ROOT = Path('/Users/koushikannamalai/Documents/ChatGPT/AI TWIN')
OUT_MAP = ROOT / 'src/planning/toronto-map-data.ts'
OUT_CTX = ROOT / 'src/planning/toronto-context.ts'
OUT_DETAIL_DIR = ROOT / 'src/planning/map-detail'

BBOX = (-79.645, 43.575, -79.110, 43.860)
WATER_BBOX = (-79.645, 43.550, -79.100, 43.800)
CLIP_BOX = box(*BBOX)

SCREENING_VERSION = 'db9180012cb408a03d97'

DOWNTOWN_NAMES = {
    'Annex', 'Bay-Cloverhill', 'Cabbagetown-South St.James Town', 'Church-Wellesley',
    'Harbourfront-CityPlace', 'Kensington-Chinatown', 'Moss Park', 'North St.James Town',
    'Regent Park', 'St Lawrence-East Bayfront-The Islands', 'University', 'Wellington Place',
    'Yonge-Bay Corridor',
}
MIDTOWN_NAMES = {
    'Casa Loma', 'Forest Hill North', 'Forest Hill South',
    'Lawrence Park North', 'Lawrence Park South', 'Mount Pleasant East', 'North Toronto',
    'Rosedale-Moore Park', 'South Eglinton-Davisville', 'Yonge-Eglinton', 'Yonge-St.Clair',
}


def round_coords(obj, decimals: int = 5):
    if isinstance(obj, float):
        return round(obj, decimals)
    if isinstance(obj, list):
        return [round_coords(x, decimals) for x in obj]
    if isinstance(obj, tuple):
        return [round_coords(x, decimals) for x in obj]
    return obj


def clean_title(text: str) -> str:
    if not text or text == 'None':
        return ''
    t = re.sub(r'\s+', ' ', text.strip())
    if t.isupper():
        t = t.title()
        t = re.sub(r"(['’])([A-Z])\b", lambda m: m.group(1) + m.group(2).lower(), t)
        t = re.sub(r'\bMt\b', 'Mt.', t)
    return t


def poly_features_from_geom(geom, properties: dict, decimals: int = 4) -> list[dict]:
    polys = [geom] if geom.geom_type == 'Polygon' else [g for g in geom.geoms if g.geom_type == 'Polygon']
    out = []
    for p in polys:
        if p.is_empty:
            continue
        out.append({
            'type': 'Feature',
            'geometry': {'type': 'Polygon', 'coordinates': round_coords(mapping(p)['coordinates'], decimals)},
            'properties': properties,
        })
    return out


def build_water(neighbourhood_features: list[dict]) -> dict:
    land_polys = [shape(f['geometry']).buffer(0.00004) for f in neighbourhood_features]
    land = unary_union(land_polys).buffer(-0.00002).buffer(0)
    water = box(*WATER_BBOX).difference(land).simplify(0.00026, preserve_topology=True)

    features = []
    geoms = [water] if water.geom_type == 'Polygon' else list(water.geoms)
    for g in geoms:
        if g.geom_type == 'Polygon' and g.area >= 8e-6:
            features.append({
                'type': 'Feature',
                'geometry': {'type': 'Polygon', 'coordinates': round_coords(mapping(g)['coordinates'], 4)},
                'properties': {'name': 'Lake Ontario & Toronto Harbour'},
            })
    return {'type': 'FeatureCollection', 'features': features}


def build_parks(council_geoms: dict[str, object]) -> tuple[dict, dict[str, list[dict]]]:
    raw = json.loads((ROOT / 'data/reference/green-spaces.json').read_text())
    major_features = []
    detail_parks: dict[str, list[dict]] = defaultdict(list)

    for f in raw.get('features', []):
        geom = shape(f['geometry']).buffer(0)
        if not geom.intersects(CLIP_BOX):
            continue
        clipped = geom.intersection(CLIP_BOX).simplify(0.00022, preserve_topology=True)
        if clipped.is_empty:
            continue
        name = clean_title(f.get('properties', {}).get('AREA_NAME') or 'Park')
        polys = [clipped] if clipped.geom_type == 'Polygon' else [g for g in clipped.geoms if g.geom_type == 'Polygon']
        for p in polys:
            if p.area < 2.2e-6:
                continue
            feat = {
                'type': 'Feature',
                'geometry': {'type': 'Polygon', 'coordinates': round_coords(mapping(p)['coordinates'], 4)},
                'properties': {'name': name},
            }
            if p.area >= 1.0e-5:
                major_features.append(feat)
            else:
                for rid, rgeom in council_geoms.items():
                    if rgeom.intersects(p):
                        detail_parks[rid].append(feat)
    return {'type': 'FeatureCollection', 'features': major_features}, detail_parks


def build_streets_and_labels(arch_views: list[dict], region_geoms: dict[str, object]):
    raw = json.loads((ROOT / 'data/planning-source/786db8e402cfa1102474c01f2d1b3b3287f091d8e0574e9ce3405dc62bb1af47').read_text())
    cls_map = {
        'Expressway': 'expressway',
        'Expressway Ramp': 'expressway',
        'Major Arterial': 'major',
        'Major Arterial Ramp': 'major',
        'Minor Arterial': 'minor',
        'Collector': 'collector',
        'Collector Ramp': 'collector',
        'Major Railway': 'rail',
        'Local': 'local',
    }

    dt_box = box(-79.3895, 43.6495, -79.3785, 43.6575)
    mt_box = box(-79.4040, 43.7020, -79.3930, 43.7105)
    win3d_union = unary_union([dt_box, mt_box]).buffer(0.0012)

    grouped: dict[tuple[str, str], list[LineString]] = defaultdict(list)

    for f in raw.get('features', []):
        props = f.get('properties', {})
        fcode = props.get('FEATURE_CODE_DESC')
        cls = cls_map.get(fcode)
        if not cls:
            continue
        geom = shape(f['geometry'])
        if not geom.intersects(CLIP_BOX):
            continue
        if cls == 'local' and not geom.intersects(win3d_union):
            continue
        name = (props.get('LINEAR_NAME_FULL') or '').strip()
        if not name or name == 'None':
            name = ''
        lines = [geom] if geom.geom_type == 'LineString' else [g for g in geom.geoms if g.geom_type == 'LineString']
        for ln in lines:
            c = ln.intersection(CLIP_BOX)
            if c.is_empty:
                continue
            if c.geom_type == 'LineString':
                grouped[(name, cls)].append(c)
            elif c.geom_type == 'MultiLineString':
                grouped[(name, cls)].extend(c.geoms)

    base_features = []
    detail_streets: dict[str, list[dict]] = defaultdict(list)
    merged_named: list[tuple[str, str, LineString]] = []

    for (name, cls), parts in grouped.items():
        merged = linemerge(parts)
        tol = 0.00024 if cls in ('minor', 'collector', 'local') else 0.00020
        merged = merged.simplify(tol, preserve_topology=True)
        lines = [merged] if merged.geom_type == 'LineString' else [g for g in merged.geoms if g.geom_type == 'LineString']
        for ln in lines:
            if cls == 'local' and ln.length < 0.00045:
                continue
            if not name and cls == 'local':
                continue
            coords = round_coords(list(ln.coords), 4)
            if len(coords) < 2:
                continue
            feat = {
                'type': 'Feature',
                'geometry': {'type': 'LineString', 'coordinates': coords},
                'properties': {'name': name, 'cls': cls},
            }
            if cls in ('expressway', 'major', 'rail') or ln.intersects(win3d_union):
                base_features.append(feat)
            else:
                for rid, rgeom in region_geoms.items():
                    if rid == 'all-toronto':
                        continue
                    if rgeom.intersects(ln):
                        detail_streets[rid].append(feat)
            if name and cls in ('expressway', 'major', 'minor', 'collector', 'local'):
                merged_named.append((name, cls, ln))

    priority_streets = {
        'Gardiner Expy', 'Don Valley Pkwy', 'Highway 401', 'Highway 427', 'Highway 409', 'Allen Rd',
        'Yonge St', 'Bay St', 'University Ave', 'Spadina Ave', 'Bathurst St',
        'Avenue Rd', 'Jarvis St', 'Parliament St', 'Mount Pleasant Rd', 'Bayview Ave', 'Leslie St', 'Don Mills Rd',
        'Queen St W', 'Queen St E', 'King St W', 'King St E', 'Dundas St W', 'Dundas St E',
        'College St', 'Carlton St', 'Wellesley St W', 'Wellesley St E', 'Bloor St W', 'Bloor St E', 'Danforth Ave',
        'Front St W', 'Front St E', 'Lake Shore Blvd W', 'Lake Shore Blvd E',
        'Adelaide St W', 'Richmond St W', 'St Clair Ave W', 'St Clair Ave E',
        'Davisville Ave', 'Eglinton Ave W', 'Eglinton Ave E', 'Lawrence Ave W', 'Lawrence Ave E',
        'Sheppard Ave W', 'Sheppard Ave E', 'Finch Ave W', 'Finch Ave E', 'Steeles Ave W', 'Steeles Ave E',
        'Kingston Rd', 'Victoria Park Ave', 'Warden Ave', 'Kennedy Rd', 'Midland Ave', 'Brimley Rd', 'McCowan Rd',
        'Markham Rd', 'Neilson Rd', 'Morningside Ave', 'Kipling Ave', 'Islington Ave', 'Royal York Rd',
        'Jane St', 'Keele St', 'Dufferin St', 'Weston Rd', 'Albion Rd', 'Rexdale Blvd', 'Dixon Rd',
        'Broadway Ave', 'Roehampton Ave', 'Redpath Ave', 'Dunfield Ave', 'Holly St',
        'Soudan Ave', 'Erskine Ave', 'Keewatin Ave', 'Orchard View Blvd',
        'Armoury St', 'Chestnut St', 'Elizabeth St', 'Hagerman St', 'Albert St', 'Temperance St',
        'St Patrick St', 'Simcoe St', 'McCaul St', 'Beverley St', 'Church St', 'Victoria St',
        'Bremner Blvd', 'Harbour St', 'Queens Quay W', 'Queens Quay E',
    }
    placed_pts: list[tuple[float, float, str]] = []
    street_labels = []

    def min_dist_ok(lon: float, lat: float, name: str, min_deg: float) -> bool:
        for px, py, pn in placed_pts:
            d = math.hypot(lon - px, lat - py)
            if pn == name and d < 0.020:
                return False
            if d < min_deg:
                return False
        return True

    rank_cls = {'expressway': 0, 'major': 1, 'minor': 2, 'collector': 3, 'local': 4}
    candidates = [
        item for item in merged_named
        if item[0] in priority_streets and (item[2].length > 0.0025 or item[1] in ('collector', 'local'))
    ]
    candidates.sort(key=lambda x: (rank_cls.get(x[1], 5), -x[2].length))

    for name, cls, ln in candidates:
        in_3d = ln.intersects(dt_box) or ln.intersects(mt_box)
        if not in_3d and cls not in ('expressway', 'major'):
            continue
        samples = [0.5] if ln.length < 0.018 else [0.22, 0.5, 0.78]
        for frac in samples:
            pt = ln.interpolate(frac, normalized=True)
            lon, lat = pt.x, pt.y
            min_deg = 0.0022 if in_3d else 0.0085
            if not min_dist_ok(lon, lat, name, min_deg):
                continue
            p1 = ln.interpolate(max(0.0, frac - 0.03), normalized=True)
            p2 = ln.interpolate(min(1.0, frac + 0.03), normalized=True)
            dx = (p2.x - p1.x) * math.cos(math.radians(lat))
            dy = -(p2.y - p1.y)
            ang = math.degrees(math.atan2(dy, dx))
            if ang > 90:
                ang -= 180
            if ang < -90:
                ang += 180
            placed_pts.append((lon, lat, name))
            street_labels.append({
                'name': name,
                'lon': round(lon, 5),
                'lat': round(lat, 5),
                'angle': round(ang, 1),
                'cls': cls,
                'in3d': bool(in_3d),
            })

    t_fwd = Transformer.from_crs(4326, 26917, always_xy=True)
    local_named_roads: dict[str, list[dict]] = {}
    for v in arch_views:
        cx, cy = v['centre']
        e0, n0 = t_fwd.transform(cx, cy)
        half = v['extent_m'] / 2.0 + 30.0
        win_box = box(-half, -half, half, half)
        v_roads = []
        approx_box = box(cx - 0.006, cy - 0.005, cx + 0.006, cy + 0.005)
        for name, cls, ln in merged_named:
            if not ln.intersects(approx_box):
                continue
            pts_local = []
            for lon, lat in ln.coords:
                e, n = t_fwd.transform(lon, lat)
                pts_local.append((round(e - e0, 2), round(n0 - n, 2)))
            local_ln = LineString(pts_local).intersection(win_box)
            if local_ln.is_empty:
                continue
            sub_lines = [local_ln] if local_ln.geom_type == 'LineString' else [g for g in local_ln.geoms if g.geom_type == 'LineString']
            for sl in sub_lines:
                if sl.length < 18:
                    continue
                v_roads.append({
                    'name': name,
                    'cls': cls,
                    'points': [[round(px, 1), round(pz, 1)] for px, pz in sl.coords],
                })
        local_named_roads[v['region']] = v_roads

    return {'type': 'FeatureCollection', 'features': base_features}, detail_streets, street_labels, local_named_roads


def build_ttc_subway() -> tuple[dict, list[dict]]:
    z = zipfile.ZipFile(ROOT / 'data/transport-source/20261113T225930149203Z/merged.zip')
    trips = list(csv.DictReader(io.TextIOWrapper(z.open('trips.txt'))))
    shapes_pts: dict[str, list[tuple[int, float, float]]] = defaultdict(list)
    with z.open('shapes.txt') as f:
        for row in csv.DictReader(io.TextIOWrapper(f)):
            shapes_pts[row['shape_id']].append((
                int(row['shape_pt_sequence']),
                float(row['shape_pt_lon']),
                float(row['shape_pt_lat']),
            ))

    target_routes = {
        '1': ('Line 1 Yonge–University', '#e5a000'),
        '2': ('Line 2 Bloor–Danforth', '#16803c'),
        '4': ('Line 4 Sheppard', '#a855f7'),
        '5': ('Line 5 Eglinton', '#d97724'),
    }
    route_shapes: dict[str, set[str]] = defaultdict(set)
    for t in trips:
        if t['route_id'] in target_routes and t.get('shape_id'):
            route_shapes[t['route_id']].add(t['shape_id'])

    line_features = []
    for rid, (rname, color) in target_routes.items():
        best_sid = max(route_shapes[rid], key=lambda sid: len(shapes_pts.get(sid, [])), default=None)
        if not best_sid:
            continue
        pts = sorted(shapes_pts[best_sid], key=lambda x: x[0])
        ln = LineString([(lon, lat) for _, lon, lat in pts]).intersection(CLIP_BOX)
        if ln.is_empty:
            continue
        ln = ln.simplify(0.00012, preserve_topology=True)
        sub = [ln] if ln.geom_type == 'LineString' else [g for g in ln.geoms if g.geom_type == 'LineString']
        for sl in sub:
            line_features.append({
                'type': 'Feature',
                'geometry': {'type': 'LineString', 'coordinates': round_coords(list(sl.coords), 4)},
                'properties': {'route': rid, 'name': rname, 'color': color},
            })

    stops = list(csv.DictReader(io.TextIOWrapper(z.open('stops.txt'))))
    parents_in_bbox: dict[str, dict] = {}
    child_to_parent: dict[str, str] = {}
    for s in stops:
        if s.get('location_type') == '1':
            lon, lat = float(s['stop_lon']), float(s['stop_lat'])
            if BBOX[0] <= lon <= BBOX[2] and BBOX[1] <= lat <= BBOX[3]:
                parents_in_bbox[s['stop_id']] = {
                    'name': s['stop_name'].strip(),
                    'lon': round(lon, 5),
                    'lat': round(lat, 5),
                    'lines': set(),
                }
        elif s.get('parent_station'):
            child_to_parent[s['stop_id']] = s['parent_station']

    trip_route = {t['trip_id']: t['route_id'] for t in trips if t['route_id'] in target_routes}
    with z.open('stop_times.txt') as f:
        for row in csv.DictReader(io.TextIOWrapper(f)):
            rid = trip_route.get(row['trip_id'])
            if not rid:
                continue
            pid = child_to_parent.get(row['stop_id']) or row['stop_id']
            if pid in parents_in_bbox:
                parents_in_bbox[pid]['lines'].add(rid)

    station_list = []
    for info in parents_in_bbox.values():
        lines_sorted = sorted(info['lines'])
        if not lines_sorted:
            continue
        station_list.append({
            'name': info['name'],
            'lon': info['lon'],
            'lat': info['lat'],
            'lines': lines_sorted,
        })
    station_list.sort(key=lambda s: s['name'])
    return {'type': 'FeatureCollection', 'features': line_features}, station_list


def build_proposal_pins_and_cells(nb_shapes: list[tuple[str, object]]):
    areas_dir = ROOT / f'public/screening/{SCREENING_VERSION}/areas'
    pins = []
    cell_neighbourhoods: dict[str, str] = {}
    cell_footprints: dict[str, list[list[float]]] = {}
    t_inv = Transformer.from_crs(26917, 4326, always_xy=True)

    nb_tree = STRtree([g for _, g in nb_shapes])

    for path in sorted(areas_dir.glob('*.json.gz')):
        data = json.loads(gzip.decompress(path.read_bytes()))
        cell_id = data['id']
        cx, cy = (int(v) for v in cell_id.split('_'))
        x0, y0 = cx * 500, cy * 500
        ring = [
            list(t_inv.transform(x0, y0)),
            list(t_inv.transform(x0, y0 + 500)),
            list(t_inv.transform(x0 + 500, y0 + 500)),
            list(t_inv.transform(x0 + 500, y0)),
            list(t_inv.transform(x0, y0)),
        ]
        cell_footprints[cell_id] = round_coords(ring, 5)
        cell_center = shape(data['geometry']).centroid

        # Match cell centre to nearest/covering Toronto neighbourhood
        best_nb = 'Toronto'
        hits = nb_tree.query(cell_center)
        for idx in hits:
            name, geom = nb_shapes[int(idx)]
            if geom.covers(cell_center):
                best_nb = name
                break
        if best_nb == 'Toronto':
            best_nb = min(nb_shapes, key=lambda item: item[1].distance(cell_center))[0]
        cell_neighbourhoods[cell_id] = best_nb

        for p in data.get('projects', []):
            svc = p.get('service') or {}
            dists = {
                per: (round(svc[per]['distance_m'], 1) if svc.get(per) else None)
                for per in ('morning', 'evening', 'saturday')
            }
            pins.append({
                'number': p['number'],
                'label': p['label'],
                'units': p['units'],
                'stage': p['stage'],
                'cellId': cell_id,
                'regions': p['regions'],
                'lon': round(p['lon'], 5),
                'lat': round(p['lat'], 5),
                'distances': dists,
            })
    return pins, cell_neighbourhoods, cell_footprints


def build_arch_projections(arch_views: list[dict]) -> dict[str, dict]:
    t_fwd = Transformer.from_crs(4326, 26917, always_xy=True)
    t_inv = Transformer.from_crs(26917, 4326, always_xy=True)
    result = {}
    for v in arch_views:
        cx, cy = v['centre']
        e0, n0 = t_fwd.transform(cx, cy)
        lon_e, lat_e = t_inv.transform(e0 + 250.0, n0)
        lon_w, lat_w = t_inv.transform(e0 - 250.0, n0)
        lon_n, lat_n = t_inv.transform(e0, n0 + 250.0)
        lon_s, lat_s = t_inv.transform(e0, n0 - 250.0)

        dlon_dx = (lon_e - lon_w) / 500.0
        dlat_dx = (lat_e - lat_w) / 500.0
        dlon_dz = (lon_s - lon_n) / 500.0
        dlat_dz = (lat_s - lat_n) / 500.0

        half = v['extent_m'] / 2.0
        sw = t_inv.transform(e0 - half, n0 - half)
        ne = t_inv.transform(e0 + half, n0 + half)
        result[v['region']] = {
            'centre': [cx, cy],
            'dlonDx': dlon_dx,
            'dlonDz': dlon_dz,
            'dlatDx': dlat_dx,
            'dlatDz': dlat_dz,
            'boundsWgs84': [round(sw[0], 5), round(sw[1], 5), round(ne[0], 5), round(ne[1], 5)],
        }
    return result


def main() -> None:
    nb_raw = json.loads((ROOT / 'data/site-history-source/neighbourhoods.geojson').read_text())
    nb_features = nb_raw.get('features', [])
    boundaries = json.loads((ROOT / 'docs/growth-transit/citywide-boundaries.json').read_text())
    region_geoms = {r['id']: shape(r['geometry']).buffer(0) for r in boundaries['regions']}
    council_ids = ('scarborough', 'toronto-east-york', 'north-york', 'etobicoke-york')
    council_geoms = {rid: region_geoms[rid] for rid in council_ids}
    arch_views = json.loads((ROOT / 'src/sandbox/architectural.json').read_text())

    # 1. Build 158 Toronto neighbourhoods + study area boundaries for toronto-context.ts
    nb_export = []
    nb_shapes: list[tuple[str, object]] = []
    for f in nb_features:
        props = f.get('properties', {})
        raw_name = (props.get('AREA_NAME') or '').split(' (')[0].strip()
        code = str(props.get('AREA_SHORT_CODE') or '').strip()
        geom = shape(f['geometry']).buffer(0)
        simp = geom.simplify(0.00022, preserve_topology=True)
        pt = geom.representative_point()
        council = next((cid for cid in council_ids if council_geoms[cid].covers(pt)), 'toronto-east-york')
        if raw_name in DOWNTOWN_NAMES:
            region = 'downtown'
        elif raw_name in MIDTOWN_NAMES:
            region = 'midtown'
        else:
            region = council
        nb_shapes.append((raw_name, geom))
        for feat in poly_features_from_geom(simp, {
            'name': raw_name,
            'region': region,
            'council': council,
            'code': code,
            'centroid': [round(pt.x, 5), round(pt.y, 5)],
        }, decimals=4):
            nb_export.append(feat)
    nb_export.sort(key=lambda item: item['properties']['name'])

    study_boundaries_export = {}
    for r in boundaries['regions']:
        rid = r['id']
        simp = shape(r['geometry']).buffer(0).simplify(0.00028, preserve_topology=True)
        # Keep MultiPolygon or Polygon cleanly
        study_boundaries_export[rid] = {
            'type': 'Feature',
            'geometry': round_coords(mapping(simp), 4),
            'properties': {'region': rid, 'label': r['label']},
        }

    # 2. Build map layers + detail chunks
    water = build_water(nb_features)
    parks, detail_parks = build_parks(council_geoms)
    streets, detail_streets, street_labels, local_named_roads = build_streets_and_labels(arch_views, region_geoms)
    subway_lines, subway_stations = build_ttc_subway()
    proposal_pins, cell_neighbourhoods, cell_footprints = build_proposal_pins_and_cells(nb_shapes)
    arch_proj = build_arch_projections(arch_views)

    cells_with_3d = {
        '1260_9669': {'region': 'downtown', 'viewName': 'City Hall'},
        '1257_9681': {'region': 'midtown', 'viewName': 'Yonge\u2013Eglinton'},
        '1258_9680': {'region': 'midtown', 'viewName': 'Yonge\u2013Eglinton'},
        '1258_9681': {'region': 'midtown', 'viewName': 'Yonge\u2013Eglinton'},
    }

    ctx_ts = f'''// Generated from City of Toronto Open Data (Neighbourhoods, Community Councils, and Screening {SCREENING_VERSION}).
// Geometries simplified for compact city-wide offline map rendering.

export type StudyRegion =
  | 'all-toronto'
  | 'toronto-east-york'
  | 'north-york'
  | 'etobicoke-york'
  | 'scarborough'
  | 'downtown'
  | 'midtown';

export type View3dRegion = 'downtown' | 'midtown';

export interface TorontoNeighbourhoodProps {{
  name: string;
  region: StudyRegion;
  council: StudyRegion;
  code: string;
  centroid: [number, number];
}}

export type TorontoNeighbourhoodFeature = GeoJSON.Feature<GeoJSON.Polygon, TorontoNeighbourhoodProps>;

export type StudyAreaBoundaryFeature = GeoJSON.Feature<GeoJSON.Geometry, {{ region: StudyRegion; label: string }}>;

export interface View3dInfo {{
  region: View3dRegion;
  viewName: string;
}}

export const torontoNeighbourhoods: TorontoNeighbourhoodFeature[] = {json.dumps(nb_export, separators=(',', ':'))};

export const studyAreaBoundaries: Record<StudyRegion, StudyAreaBoundaryFeature> = {json.dumps(study_boundaries_export, separators=(',', ':'))};

export const cellNeighbourhoods: Record<string, string> = {json.dumps(cell_neighbourhoods, separators=(',', ':'))};

export const cellFootprints: Record<string, [number, number][]> = {json.dumps(cell_footprints, separators=(',', ':'))};

export const cellsWith3dView: Record<string, View3dInfo> = {json.dumps(cells_with_3d, separators=(',', ':'))};
'''
    OUT_CTX.write_text(ctx_ts)

    map_ts = f'''// Auto-generated from local licensed City of Toronto Open Data (Centreline, Green Spaces, Neighbourhoods, TTC GTFS, 3D Massing, Screening {SCREENING_VERSION}).
// Offline-safe city-wide vector map layers for Toronto.
import type {{ View3dRegion }} from './toronto-context';

export interface StreetLabel {{
  name: string;
  lon: number;
  lat: number;
  angle: number;
  cls: string;
  in3d: boolean;
}}

export interface SubwayStation {{
  name: string;
  lon: number;
  lat: number;
  lines: string[];
}}

export interface ProposalMapPin {{
  number: string;
  label: string;
  units: number;
  stage: string;
  cellId: string;
  regions: string[];
  lon: number;
  lat: number;
  distances: Record<'morning' | 'evening' | 'saturday', number | null>;
}}

export interface LocalNamedRoad {{
  name: string;
  cls: string;
  points: [number, number][];
}}

export interface RegionLocalProjection {{
  centre: [number, number];
  dlonDx: number;
  dlonDz: number;
  dlatDx: number;
  dlatDz: number;
  boundsWgs84: [number, number, number, number];
}}

export const torontoWaterGeoJSON: GeoJSON.FeatureCollection = {json.dumps(water, separators=(',', ':'))};

export const torontoParksGeoJSON: GeoJSON.FeatureCollection = {json.dumps(parks, separators=(',', ':'))};

export const torontoStreetsGeoJSON: GeoJSON.FeatureCollection = {json.dumps(streets, separators=(',', ':'))};

export const torontoStreetLabels: StreetLabel[] = {json.dumps(street_labels, separators=(',', ':'))};

export const ttcSubwayLinesGeoJSON: GeoJSON.FeatureCollection = {json.dumps(subway_lines, separators=(',', ':'))};

export const ttcSubwayStations: SubwayStation[] = {json.dumps(subway_stations, separators=(',', ':'))};

export const torontoProposalPins: ProposalMapPin[] = {json.dumps(proposal_pins, separators=(',', ':'))};

export const localNamedRoads: Record<View3dRegion, LocalNamedRoad[]> = {json.dumps(local_named_roads, separators=(',', ':'))};

export const regionProjections: Record<View3dRegion, RegionLocalProjection> = {json.dumps(arch_proj, separators=(',', ':'))};

export function localMetersToLngLat(region: View3dRegion, x: number, z: number): [number, number] {{
  const p = regionProjections[region];
  return [
    p.centre[0] + x * p.dlonDx + z * p.dlonDz,
    p.centre[1] + x * p.dlatDx + z * p.dlatDz,
  ];
}}

export function localPolygonToWgs84(region: View3dRegion, coords: number[][][]): number[][][] {{
  return coords.map((ring) => ring.map(([x, z]) => localMetersToLngLat(region, x, z)));
}}

export function architecturalBuildingsToWgs84(
  region: View3dRegion,
  buildings: Array<{{ id: string; height: number; height_source: string; geometry: {{ type: string; coordinates: unknown }} }}>
): GeoJSON.FeatureCollection {{
  const features: GeoJSON.Feature[] = [];
  for (const b of buildings) {{
    if (b.geometry.type === 'Polygon') {{
      features.push({{
        type: 'Feature',
        id: b.id,
        geometry: {{
          type: 'Polygon',
          coordinates: localPolygonToWgs84(region, b.geometry.coordinates as number[][][]),
        }},
        properties: {{
          id: b.id,
          height: b.height,
          height_source: b.height_source,
        }},
      }});
    }} else if (b.geometry.type === 'MultiPolygon') {{
      const polys = b.geometry.coordinates as number[][][][];
      features.push({{
        type: 'Feature',
        id: b.id,
        geometry: {{
          type: 'MultiPolygon',
          coordinates: polys.map((poly) => localPolygonToWgs84(region, poly)),
        }},
        properties: {{
          id: b.id,
          height: b.height,
          height_source: b.height_source,
        }},
      }});
    }}
  }}
  return {{ type: 'FeatureCollection', features }};
}}
'''
    OUT_MAP.write_text(map_ts)

    OUT_DETAIL_DIR.mkdir(parents=True, exist_ok=True)
    for rid in ('downtown', 'midtown', 'toronto-east-york', 'north-york', 'etobicoke-york', 'scarborough'):
        s_fc = {'type': 'FeatureCollection', 'features': detail_streets.get(rid, [])}
        p_fc = {'type': 'FeatureCollection', 'features': detail_parks.get(rid, [])}
        chunk = (
            f"export const detailStreetsGeoJSON: GeoJSON.FeatureCollection = {json.dumps(s_fc, separators=(',', ':'))};\n"
            f"export const detailParksGeoJSON: GeoJSON.FeatureCollection = {json.dumps(p_fc, separators=(',', ':'))};\n"
        )
        p = OUT_DETAIL_DIR / f'{rid}.ts'
        p.write_text(chunk)
        print(f'Wrote detail {p.name}: {p.stat().st_size / 1024:.1f} KB ({len(s_fc["features"])} streets, {len(p_fc["features"])} parks)')

    print(f'Wrote {OUT_CTX.name}: {OUT_CTX.stat().st_size / 1024:.1f} KB ({len(nb_export)} neighbourhoods, {len(cell_footprints)} cells)')
    print(f'Wrote {OUT_MAP.name}: {OUT_MAP.stat().st_size / 1024:.1f} KB ({len(streets["features"])} base streets, {len(street_labels)} labels, {len(subway_stations)} TTC stations, {len(proposal_pins)} pins)')


if __name__ == '__main__':
    main()
