"""Audit all study-area inputs; emit local artifacts, never publish a twin.

Run: .venv/bin/python scripts/audit_site_history.py
Requires downloaded City catalogue/GeoJSON files in data/site-history-source.
Invalid geometry is quarantined, not silently repaired.
"""
from __future__ import annotations
import gzip
import hashlib
import json
from pathlib import Path
import sys
import unicodedata
import re
from collections import Counter
import duckdb
from shapely.geometry import shape, mapping, Point
from shapely.ops import unary_union
from shapely import normalize, to_wkb
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.site_history import digest, release_gate

ROOT = Path(__file__).resolve().parents[1]
AREAS = {
 'downtown': ['Bay-Cloverhill','Yonge-Bay Corridor','Church-Wellesley','North St. James Town','Cabbagetown-South St. James Town','Moss Park','Regent Park','St. Lawrence-East Bayfront-The Islands','Harbourfront-CityPlace','Wellington Place','Kensington-Chinatown','University','Annex'],
 'midtown': ['Yonge-Eglinton','Mount Pleasant East','South Eglinton-Davisville','North Toronto','Yonge-St. Clair','Rosedale-Moore Park','Casa Loma','Forest Hill North','Forest Hill South','Lawrence Park North','Lawrence Park South']}


def normalized_name(value: str) -> str:
    """Normalize typography only; never fuzzy-match an administrative name."""
    return re.sub(r'[\s.]', '', unicodedata.normalize('NFKC', value)).casefold()


def read_object(base: Path, manifest: dict, logical: str) -> object:
    """Read a hash-verified public object."""
    expected = manifest['assets'][logical]
    raw = gzip.decompress((base/'objects'/f'{expected}.json.gz').read_bytes())
    if hashlib.sha256(raw).hexdigest() != expected:
        raise ValueError(f'Checksum mismatch: {logical}')
    return json.loads(raw)


def resolve_regions(neighbourhoods: dict, councils: dict) -> list[dict]:
    """Resolve every requested name uniquely, then union valid WGS84 polygons."""
    regions = []
    for document in (neighbourhoods, councils):
        crs = document.get('crs', {}).get('properties', {}).get('name', '')
        if crs not in {'urn:ogc:def:crs:OGC:1.3:CRS84', 'urn:ogc:def:crs:EPSG::4326'}:
            raise ValueError('Explicit WGS84 CRS required')
    for region_id, names in AREAS.items():
        members = []
        for name in names:
            found = [f for f in neighbourhoods['features'] if normalized_name(f['properties']['AREA_NAME']) == normalized_name(name)]
            if len(found) != 1:
                raise ValueError(f'{region_id}: missing or ambiguous neighbourhood {name}')
            members.append(found[0])
        regions.append({'id': region_id, 'label': region_id.title()+' — ASTER study area', 'members': [f['properties'] for f in members], 'geometry': union_geometry(members)})
    found = [f for f in councils['features'] if f['properties']['AREA_NAME'] == 'North York Community Council']
    if len(found) != 1:
        raise ValueError('North York Community Council must resolve uniquely')
    regions.append({'id':'north-york', 'label':'North York Community Council', 'members':[found[0]['properties']], 'geometry':union_geometry(found)})
    return regions


def union_geometry(features: list[dict]) -> dict:
    """Union validated polygons; preserve overlap between different regions."""
    geometries = [shape(f['geometry']) for f in features]
    for g in geometries:
        if g.is_empty or not g.is_valid or g.geom_type not in {'Polygon','MultiPolygon'}:
            raise ValueError('Boundary geometry requires review')
        w,s,e,n=g.bounds
        if not (-80<w<=e<-78 and 43<s<=n<45):
            raise ValueError('Boundary outside Toronto WGS84 envelope')
    return mapping(unary_union(geometries))


def run(root: Path = ROOT) -> dict:
    """Produce reproducible source inventory, boundaries and coverage accounting."""
    base=root/'public/planning'; source=root/'data/site-history-source'; out=root/'docs/site-history';out.mkdir(exist_ok=True)
    artifacts=root/'data/site-history-audit';artifacts.mkdir(exist_ok=True)
    latest=json.loads((base/'latest.json').read_text())['id']
    manifest=json.loads((base/latest/'manifest.json').read_text())
    regions=resolve_regions(json.loads((source/'neighbourhoods.geojson').read_text()),json.loads((source/'councils.geojson').read_text()))
    geoms={r['id']:shape(r['geometry']) for r in regions}
    boundary_receipts=[]
    for cat,geo,page in [('neighbourhood-catalogue.json','neighbourhoods.geojson','neighbourhoods'),('council-catalogue.json','councils.geojson','community-council-boundaries')]:
        catalogue=json.loads((source/cat).read_text())['result']
        if catalogue['license_title'] != 'open-government-licence-toronto':
            raise ValueError('Boundary licence requires review')
        boundary_receipts.append({'page':'https://open.toronto.ca/dataset/'+page+'/', 'catalogue_sha256':hashlib.sha256((source/cat).read_bytes()).hexdigest(),'geometry_sha256':hashlib.sha256((source/geo).read_bytes()).hexdigest(),'licence':catalogue['license_title'],'catalogue_modified':catalogue.get('metadata_modified'),'retrieved_at':json.loads((source/'acquisition.json').read_text())['retrieved_at']})
    boundaries={'version':digest({'regions':regions,'sources':boundary_receipts}), 'crs':'EPSG:4326','sources':boundary_receipts,'regions':regions,'overlaps_preserved':True}
    (out/'regions.geojson').write_text(json.dumps({'type':'FeatureCollection','features':[{'type':'Feature','properties':{k:v for k,v in r.items() if k!='geometry'},'geometry':r['geometry']} for r in regions]}))
    (out/'boundaries.json').write_text(json.dumps(boundaries,indent=2))
    inventory=[]
    for path in sorted(base.glob('*/manifest.json')):
        m=json.loads(path.read_text())
        inventory.append({'snapshot':m['id'],'packaged_at':m['created_at'],'validation':m.get('validation',{}),'sources':{k:{f:v.get(f) for f in ['sha256','retrieved_at','source_modified_at','page','licence','licence_basis','records_in','records_out']} for k,v in m['sources'].items() if k in ['applications','projects','neighbourhoods']},'buildings':m.get('buildings')})
    (out/'snapshot-inventory.json').write_text(json.dumps(inventory,indent=2))
    counts={r:{'planning':{},'massing':{'eligible':0,'duplicate_geometries':0,'unresolved_site_identity':0}} for r in geoms}
    with (artifacts/'planning-accounting.ndjson').open('w',encoding='utf-8') as handle:
        for kind in ['applications','projects']:
            rows=read_object(base,manifest,kind+'.json')
            tally=Counter()
            for row in rows:
                memberships=[]
                if row.get('lon') is None or row.get('lat') is None:
                    outcome='unlocated_region_unknown'
                else:
                    p=Point(row['lon'],row['lat'])
                    memberships=[rid for rid,g in geoms.items() if g.intersects(p)]
                    outcome='unresolved_site_identity' if memberships else 'outside_study_areas'
                tally[outcome]+=1
                for rid in memberships:
                    c=counts[rid]['planning'].setdefault(kind,{'eligible':0,'unresolved':0,'confirmed':0,'candidate':0})
                    c['eligible']+=1;c['unresolved']+=1
                handle.write(json.dumps({'snapshot':latest,'source':kind,'snapshot_record_id':row['id'],'publisher_number':row.get('number'),'regions':memberships,'outcome':outcome,'reason':'Point/address does not establish site identity' if memberships else outcome})+'\n')
            tally['input']=len(rows)
            assert tally['input']==sum(v for k,v in tally.items() if k!='input')
            counts.setdefault('source_totals',{})[kind]=dict(tally)
    seen=set();input_count=0;outside=0;invalid=0
    with duckdb.connect(str(root/'data/buildings.duckdb'),read_only=True) as db, (artifacts/'massing-accounting.ndjson').open('w',encoding='utf-8') as handle:
        cursor=db.execute('SELECT id, geometry_json FROM buildings ORDER BY id')
        while batch:=cursor.fetchmany(5000):
            for ref,raw in batch:
                input_count+=1;g=shape(json.loads(raw))
                if g.is_empty or not g.is_valid:
                    invalid+=1;handle.write(json.dumps({'source_row_reference':ref,'outcome':'invalid_geometry'})+'\n');continue
                memberships=[rid for rid,area in geoms.items() if area.intersects(g)]
                key=hashlib.sha256(to_wkb(normalize(g),output_dimension=2)).hexdigest()
                duplicate=key in seen;seen.add(key)
                if not memberships:outside+=1
                for rid in memberships:
                    c=counts[rid]['massing'];c['eligible']+=1;c['unresolved_site_identity']+=1;c['duplicate_geometries']+=int(duplicate)
                handle.write(json.dumps({'source_row_reference':ref,'geometry_fingerprint':key,'regions':memberships,'duplicate_geometry':duplicate,'outcome':'unresolved_site_identity' if memberships else 'outside_study_areas'})+'\n')
    bm=json.loads((root/'data/buildings-manifest.json').read_text())
    rejected=sum(1 for _ in (root/'data/building-rejections.ndjson').open())
    assert input_count==bm['records_out'] and input_count+rejected==bm['records_in']
    counts['source_totals']['massing']={'input':bm['records_in'],'imported':input_count,'prior_rejections_region_unknown':rejected,'invalid_imported_geometry':invalid,'outside_study_areas':outside,'eligible_rows_in_any_region':input_count-outside-invalid}
    observations={k:len({i['sources'][k]['sha256'] for i in inventory if k in i['sources']}) for k in ['projects','applications']}
    gate=release_gate({'boundaries':True,'accounting':True},[])
    report={'version':1,'accounting_artifacts':{'planning':'data/site-history-audit/planning-accounting.ndjson','massing':'data/site-history-audit/massing-accounting.ndjson'},'planning_snapshot':latest,'boundary_version':boundaries['version'],'counts':counts,'distinct_raw_observations':observations,'building_source':bm,'gate':gate,'limitations':['Region membership for planning uses its existing source/address-derived point, not a site boundary.','Unlocated records cannot be excluded from study areas and remain unresolved.','Massing components are not established sites or whole buildings.','No reviewed persistent site identities are available. No confirmation is inferred from proximity.','North York uses the published Community Council area, not the former municipality.']}
    (out/'audit.json').write_text(json.dumps(report,indent=2))
    return report

if __name__=='__main__':
    report=run();print(json.dumps({'gate':report['gate'],'counts':report['counts'],'distinct_raw_observations':report['distinct_raw_observations']},indent=2))
