#!/usr/bin/env python3
"""Generate compact, rights-reviewed offline Toronto Open Data cartography for ASTER."""

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
from shapely.geometry import LineString, MultiLineString, Polygon, box, mapping, shape
from shapely.ops import linemerge, unary_union

ROOT = Path('/Users/koushikannamalai/Documents/ChatGPT/AI TWIN')
OUT = ROOT / 'src/planning/toronto-map-data.ts'

BBOX = (-79.435, 43.630, -79.345, 43.735)
WATER_BBOX = (-79.445, 43.612, -79.335, 43.658)
CLIP_BOX = box(*BBOX)


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
        for abbr in ('Ttc', 'Tmu', 'St.', 'Mt.'):
            pass
        t = re.sub(r'\bMt\b', 'Mt.', t)
    return t


def build_water(neighbourhood_features: list[dict]) -> dict:
    land_polys = [shape(f['geometry']).buffer(0.00003) for f in neighbourhood_features]
    land = unary_union(land_polys).buffer(-0.00002).buffer(0)
    water = box(*WATER_BBOX).difference(land).simplify(0.00014, preserve_topology=True)

    features = []
    geoms = [water] if water.geom_type == 'Polygon' else list(water.geoms)
    for g in geoms:
        if g.geom_type == 'Polygon' and g.area >= 3e-6:
            features.append({
                'type': 'Feature',
                'geometry': {'type': 'Polygon', 'coordinates': round_coords(mapping(g)['coordinates'])},
                'properties': {'name': 'Lake Ontario & Toronto Harbour'},
            })
    return {'type': 'FeatureCollection', 'features': features}


def build_parks() -> dict:
    raw = json.loads((ROOT / 'data/reference/green-spaces.json').read_text())
    features = []
    for f in raw.get('features', []):
        geom = shape(f['geometry']).buffer(0)
        if not geom.intersects(CLIP_BOX):
            continue
        clipped = geom.intersection(CLIP_BOX).simplify(0.00016, preserve_topology=True)
        if clipped.is_empty:
            continue
        name = clean_title(f.get('properties', {}).get('AREA_NAME') or 'Park')
        polys = [clipped] if clipped.geom_type == 'Polygon' else [g for g in clipped.geoms if g.geom_type == 'Polygon']
        for p in polys:
            if p.area < 1.2e-6:
                continue
            features.append({
                'type': 'Feature',
                'geometry': {'type': 'Polygon', 'coordinates': round_coords(mapping(p)['coordinates'], 4)},
                'properties': {'name': name},
            })
    return {'type': 'FeatureCollection', 'features': features}


def build_streets_and_labels(study_union, arch_views: list[dict]):
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

    study_buf = study_union.buffer(0.0005)
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
        if cls == 'local' and not geom.intersects(study_buf):
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

    features = []
    # Also retain merged geometries for smart label placement & local 3D road naming
    merged_named: list[tuple[str, str, LineString]] = []
    for (name, cls), parts in grouped.items():
        merged = linemerge(parts)
        tol = 0.00018 if cls == 'local' else 0.00010
        merged = merged.simplify(tol, preserve_topology=True)
        lines = [merged] if merged.geom_type == 'LineString' else [g for g in merged.geoms if g.geom_type == 'LineString']
        for ln in lines:
            if cls == 'local' and ln.length < 0.00045:
                continue
            if not name and cls == 'local':
                continue
            coords = round_coords(list(ln.coords), 4 if cls in ('local', 'rail') else 5)
            if len(coords) < 2:
                continue
            features.append({
                'type': 'Feature',
                'geometry': {'type': 'LineString', 'coordinates': coords},
                'properties': {'name': name, 'cls': cls},
            })
            if name and cls in ('expressway', 'major', 'minor', 'collector', 'local'):
                merged_named.append((name, cls, ln))

    # Build clean, non-overlapping street name labels for iconic arterials & 3D window streets
    priority_streets = {
        'Gardiner Expy', 'Yonge St', 'Bay St', 'University Ave', 'Spadina Ave', 'Bathurst St',
        'Avenue Rd', 'Jarvis St', 'Parliament St', 'Mount Pleasant Rd', 'Bayview Ave',
        'Queen St W', 'Queen St E', 'King St W', 'King St E', 'Dundas St W', 'Dundas St E',
        'College St', 'Carlton St', 'Wellesley St W', 'Wellesley St E', 'Bloor St W', 'Bloor St E',
        'Front St W', 'Front St E', 'Lake Shore Blvd W', 'Lake Shore Blvd E',
        'Adelaide St W', 'Richmond St W', 'St Clair Ave W', 'St Clair Ave E',
        'Davisville Ave', 'Eglinton Ave W', 'Eglinton Ave E', 'Lawrence Ave W', 'Lawrence Ave E',
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
            if pn == name and d < 0.011:
                return False
            if d < min_deg:
                return False
        return True

    # Sort longest important streets first so major labels win spacing
    rank_cls = {'expressway': 0, 'major': 1, 'minor': 2, 'collector': 3, 'local': 4}
    candidates = [
        item for item in merged_named
        if item[0] in priority_streets and (item[2].length > 0.0025 or item[1] in ('collector', 'local'))
    ]
    candidates.sort(key=lambda x: (rank_cls.get(x[1], 5), -x[2].length))

    dt_box = box(-79.3895, 43.6495, -79.3785, 43.6575)
    mt_box = box(-79.4040, 43.7020, -79.3930, 43.7105)

    for name, cls, ln in candidates:
        in_3d = ln.intersects(dt_box) or ln.intersects(mt_box)
        if not in_3d and cls in ('collector', 'local') and name not in priority_streets:
            continue
        samples = [0.5] if ln.length < 0.014 else [0.22, 0.5, 0.78]
        for frac in samples:
            pt = ln.interpolate(frac, normalized=True)
            lon, lat = pt.x, pt.y
            min_deg = 0.0022 if in_3d else 0.0042
            if not min_dist_ok(lon, lat, name, min_deg):
                continue
            # Estimate tangent angle in screen coordinates (x east, y south inverted)
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

    # Compute local (x, z) metres named roads inside each architectural 600x600m view for Three.js CanvasTexture
    t_fwd = Transformer.from_crs(4326, 26917, always_xy=True)
    local_named_roads: dict[str, list[dict]] = {}
    for v in arch_views:
        cx, cy = v['centre']
        e0, n0 = t_fwd.transform(cx, cy)
        half = v['extent_m'] / 2.0 + 30.0
        win_box = box(-half, -half, half, half)
        v_roads = []
        # Approx WGS84 bbox around view centre
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

    return {'type': 'FeatureCollection', 'features': features}, street_labels, local_named_roads


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

    target_routes = {'1': ('Line 1 Yonge–University', '#e5a000'), '2': ('Line 2 Bloor–Danforth', '#16803c'), '5': ('Line 5 Eglinton', '#d97724')}
    route_shapes: dict[str, set[str]] = defaultdict(set)
    for t in trips:
        if t['route_id'] in target_routes and t.get('shape_id'):
            route_shapes[t['route_id']].add(t['shape_id'])

    line_features = []
    for rid, (rname, color) in target_routes.items():
        # Pick the longest shape for this route
        best_sid = max(route_shapes[rid], key=lambda sid: len(shapes_pts.get(sid, [])), default=None)
        if not best_sid:
            continue
        pts = sorted(shapes_pts[best_sid], key=lambda x: x[0])
        ln = LineString([(lon, lat) for _, lon, lat in pts]).intersection(CLIP_BOX)
        if ln.is_empty:
            continue
        ln = ln.simplify(0.00008, preserve_topology=True)
        sub = [ln] if ln.geom_type == 'LineString' else [g for g in ln.geoms if g.geom_type == 'LineString']
        for sl in sub:
            line_features.append({
                'type': 'Feature',
                'geometry': {'type': 'LineString', 'coordinates': round_coords(list(sl.coords))},
                'properties': {'route': rid, 'name': rname, 'color': color},
            })

    # Collect parent stations + match to lines via child stop_times
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


def build_proposal_pins() -> list[dict]:
    areas_dir = ROOT / 'public/screening/6ed092c988ad9326e279/areas'
    pins = []
    for path in sorted(areas_dir.glob('*.json.gz')):
        data = json.loads(gzip.decompress(path.read_bytes()))
        cell_id = data['id']
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
    return pins


def build_arch_projections(arch_views: list[dict]) -> dict[str, dict]:
    t_fwd = Transformer.from_crs(4326, 26917, always_xy=True)
    t_inv = Transformer.from_crs(26917, 4326, always_xy=True)
    result = {}
    for v in arch_views:
        cx, cy = v['centre']
        e0, n0 = t_fwd.transform(cx, cy)
        # Finite-difference Jacobian over +/- 250 m for <2 cm accuracy across the 600 m window
        lon_e, lat_e = t_inv.transform(e0 + 250.0, n0)
        lon_w, lat_w = t_inv.transform(e0 - 250.0, n0)
        lon_n, lat_n = t_inv.transform(e0, n0 + 250.0)
        lon_s, lat_s = t_inv.transform(e0, n0 - 250.0)

        dlon_dx = (lon_e - lon_w) / 500.0
        dlat_dx = (lat_e - lat_w) / 500.0
        # Remember z = n0 - n, so +z moves South (towards n0 - 250)
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
    nb_raw = json.loads((ROOT / 'data/planning-source/b0cb58077f5b3a47e0e56a68913c6980cfaf39d37d7d020fd91b60650c480233').read_text())
    nb_features = nb_raw.get('features', [])
    arch_views = json.loads((ROOT / 'src/sandbox/architectural.json').read_text())

    # Union of active Downtown + Midtown neighbourhoods (24 neighbourhoods from toronto-context.ts)
    active_names = {
        'Annex', 'Bay-Cloverhill', 'Cabbagetown-South St.James Town', 'Church-Wellesley',
        'Harbourfront-CityPlace', 'Kensington-Chinatown', 'Moss Park', 'North St.James Town',
        'Regent Park', 'St Lawrence-East Bayfront-The Islands', 'University', 'Wellington Place',
        'Yonge-Bay Corridor', 'Casa Loma', 'Forest Hill North', 'Forest Hill South',
        'Lawrence Park North', 'Lawrence Park South', 'Mount Pleasant East', 'North Toronto',
        'Rosedale-Moore Park', 'South Eglinton-Davisville', 'Yonge-Eglinton', 'Yonge-St.Clair',
    }
    study_polys = [
        shape(f['geometry']).buffer(0)
        for f in nb_features
        if (f.get('properties', {}).get('AREA_NAME') or '').split(' (')[0].strip() in active_names
    ]
    study_union = unary_union(study_polys)

    water = build_water(nb_features)
    parks = build_parks()
    streets, street_labels, local_named_roads = build_streets_and_labels(study_union, arch_views)
    subway_lines, subway_stations = build_ttc_subway()
    proposal_pins = build_proposal_pins()
    arch_proj = build_arch_projections(arch_views)

    ts = f'''// Auto-generated from local licensed City of Toronto Open Data (Centreline, Green Spaces, Neighbourhoods, TTC GTFS, 3D Massing, Screening 6ed092c988ad9326e279).
// Offline-safe vector map layers for Downtown & Midtown Toronto.
import type {{ StudyRegion }} from './toronto-context';

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

export const localNamedRoads: Record<StudyRegion, LocalNamedRoad[]> = {json.dumps(local_named_roads, separators=(',', ':'))};

export const regionProjections: Record<StudyRegion, RegionLocalProjection> = {json.dumps(arch_proj, separators=(',', ':'))};

export function localMetersToLngLat(region: StudyRegion, x: number, z: number): [number, number] {{
  const p = regionProjections[region];
  return [
    p.centre[0] + x * p.dlonDx + z * p.dlonDz,
    p.centre[1] + x * p.dlatDx + z * p.dlatDz,
  ];
}}

export function localPolygonToWgs84(region: StudyRegion, coords: number[][][]): number[][][] {{
  return coords.map((ring) => ring.map(([x, z]) => localMetersToLngLat(region, x, z)));
}}

export function architecturalBuildingsToWgs84(
  region: StudyRegion,
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
    OUT.write_text(ts)
    print(f'Wrote {OUT} ({OUT.stat().st_size / 1024:.1f} KB)')
    print(f'Water polygons: {len(water["features"])}, Parks: {len(parks["features"])}')
    print(f'Streets: {len(streets["features"])}, Street labels: {len(street_labels)}')
    print(f'Subway lines: {len(subway_lines["features"])}, Stations: {len(subway_stations)}')
    print(f'Proposal pins: {len(proposal_pins)}')
    print(f'Local 3D named roads: downtown={len(local_named_roads["downtown"])}, midtown={len(local_named_roads["midtown"])}')


if __name__ == '__main__':
    main()
