"""Validate a complete parcel export and build a local, versioned candidate registry.

Not a public release. COMMON/CONDO parcels are provisional parcel-reference sites,
not verified development sites or ownership records. No spatial match is confirmed.
"""
from __future__ import annotations
import hashlib
import json
import sqlite3
import uuid
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import sys
from shapely import normalize, to_wkb, prepare
from shapely.geometry import shape, Point, mapping
from shapely.strtree import STRtree
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.audit_site_history import read_object
from scripts.site_history import digest

ROOT=Path(__file__).resolve().parents[1]
ALLOWED={'COMMON','CONDO'}
KNOWN=ALLOWED|{'CORRIDOR','RESERVE'}


def file_hash(path: Path) -> str:
    """Hash a file in bounded chunks."""
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):h.update(chunk)
    return h.hexdigest()


def fingerprint(geometry: object, kind: str) -> str:
    """Exact normalized geometry/type signature for continuity, never a site ID."""
    return hashlib.sha256(kind.encode()+to_wkb(normalize(geometry),output_dimension=2)).hexdigest()


def continuity(current: list[dict], previous: list[dict]) -> tuple[list[dict],list[dict]]:
    """Reuse exact identities; quarantine overlapping edits as possible lineage.

    A geometry edit allocates a new provisional ID. Overlap edges propose lineage
    only; splits/merges are not accepted from a geometric threshold alone.
    """
    old={r['fingerprint']:r for r in previous}
    if len(old)!=len(previous):raise ValueError('Previous registry has duplicate signatures')
    geometries=[shape(r['geometry']) for r in previous]
    tree=STRtree(geometries)
    current_keys={r['fingerprint'] for r in current}
    edges=[]
    for row in current:
        prior=old.get(row['fingerprint'])
        row['site_id']=prior['site_id'] if prior else 'site-'+str(uuid.uuid4())
        row['identity_state']='provisional_parcel_reference'
        if prior:continue
        g=shape(row['geometry'])
        for i in tree.query(g,predicate='intersects'):
            p=previous[int(i)]
            # Shared edges are not change evidence; unchanged neighbours are not parents.
            if p['fingerprint'] not in current_keys and g.intersection(geometries[int(i)]).area>0:
                edges.append({'predecessor':p['site_id'],'successor':row['site_id'],'state':'candidate','reason':'positive-area overlap after geometry/type change; requires review'})
    outgoing=Counter(e['predecessor'] for e in edges);incoming=Counter(e['successor'] for e in edges)
    for e in edges:
        e['kind']='possible_complex_change' if outgoing[e['predecessor']]>1 and incoming[e['successor']]>1 else 'possible_split' if outgoing[e['predecessor']]>1 else 'possible_merge' if incoming[e['successor']]>1 else 'possible_boundary_or_type_change'
    return current,edges


def candidates(point: Point | None, tree: STRtree, rows: list[dict]) -> tuple[list[str],str]:
    """Return all intersected provisional sites, including edge/overlap ambiguity."""
    if point is None:return [],'unlocated'
    ids=sorted(rows[int(i)]['site_id'] for i in tree.query(point,predicate='intersects'))
    return ids,'multiple_parcels' if len(ids)>1 else 'single_parcel_spatial_candidate' if ids else 'no_eligible_parcel'


def connect(path: Path) -> sqlite3.Connection:
    """Create append-only observation tables with immutable internal site IDs."""
    db=sqlite3.connect(path)
    db.execute('PRAGMA foreign_keys=ON')
    db.executescript('''
    CREATE TABLE IF NOT EXISTS versions(id TEXT PRIMARY KEY,created_at TEXT NOT NULL,receipt TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sites(id TEXT PRIMARY KEY,created_version TEXT NOT NULL REFERENCES versions(id));
    CREATE TABLE IF NOT EXISTS observations(version TEXT REFERENCES versions(id),site_id TEXT REFERENCES sites(id),fingerprint TEXT NOT NULL,payload TEXT NOT NULL,PRIMARY KEY(version,site_id),UNIQUE(version,fingerprint));
    CREATE TABLE IF NOT EXISTS lineage(version TEXT REFERENCES versions(id),predecessor TEXT REFERENCES sites(id),successor TEXT REFERENCES sites(id),payload TEXT NOT NULL,PRIMARY KEY(version,predecessor,successor));
    CREATE TABLE IF NOT EXISTS matches(version TEXT REFERENCES versions(id),source TEXT,record_id TEXT,payload TEXT NOT NULL,PRIMARY KEY(version,source,record_id));
    CREATE TABLE IF NOT EXISTS reviews(version TEXT REFERENCES versions(id),review_id TEXT,payload TEXT NOT NULL,PRIMARY KEY(version,review_id));
    ''')
    return db


def build(root: Path=ROOT) -> dict:
    """Validate citywide inputs, register study-area parcels and account every record."""
    src=root/'data/site-history-source';out=root/'data/site-registry';out.mkdir(exist_ok=True)
    docs=root/'docs/site-history';base=root/'public/planning'
    raw_hash=file_hash(src/'parcels.geojson')
    if raw_hash!=file_hash(src/'parcels-reread.geojson'):raise ValueError('Parcel reread differs; reacquire a stable observation')
    cat=json.loads((src/'property-catalogue-current.json').read_text())['result']
    if cat['license_title']!='open-government-licence-toronto':raise ValueError('Unqualified licence')
    expected=json.loads((src/'parcel-count.json').read_text())['result']['total']
    if expected!=json.loads((src/'parcel-count-reread.json').read_text())['result']['total']:raise ValueError('Publisher count changed during acquisition')
    data=json.loads((src/'parcels.geojson').read_text())
    if data.get('crs',{}).get('properties',{}).get('name') not in {'urn:ogc:def:crs:OGC:1.3:CRS84','urn:ogc:def:crs:EPSG::4326'}:raise ValueError('Unqualified CRS')
    if len(data['features'])!=expected:raise ValueError('Export count does not match publisher count')
    boundaries=json.loads((docs/'boundaries.json').read_text())
    regions={r['id']:shape(r['geometry']) for r in boundaries['regions']}
    for g in regions.values():prepare(g)
    tally=Counter();types=Counter();seen_ids=set();seen_parcel_ids=Counter();grouped={};unknown_types=set()
    with (out/'parcel-validation.ndjson').open('w',encoding='utf-8') as log:
        for index,f in enumerate(data['features']):
            attrs=f['properties'];kind=attrs.get('FEATURE_TYPE');types[kind]+=1
            source_id=str(attrs.get('OBJECTID',''));seen_parcel_ids[str(attrs.get('PARCELID'))]+=1
            if not source_id or source_id in seen_ids:raise ValueError('Missing or duplicated export OBJECTID')
            seen_ids.add(source_id)
            g=shape(f['geometry']) if f.get('geometry') else None
            memberships=[];key=None
            if kind not in KNOWN:outcome='unknown_feature_type';unknown_types.add(kind)
            elif g is None or g.is_empty or g.geom_type not in {'Polygon','MultiPolygon'} or not g.is_valid:outcome='invalid_geometry'
            elif not (-80<g.bounds[0]<=g.bounds[2]<-78 and 43<g.bounds[1]<=g.bounds[3]<45):outcome='outside_crs_envelope'
            else:
                memberships=[rid for rid,area in regions.items() if area.intersects(g)]
                if kind not in ALLOWED:outcome='excluded_'+kind.lower()
                elif not memberships:outcome='outside_study_areas'
                else:
                    key=fingerprint(g,kind)
                    outcome='duplicate_geometry' if key in grouped else 'eligible'
                    if key not in grouped:grouped[key]={'fingerprint':key,'geometry':mapping(g),'feature_type':kind,'regions':memberships,'source_references':[],'addresses':[],'structures':[]}
                    grouped[key]['source_references'].append({'snapshot_sha256':raw_hash,'OBJECTID':source_id,'PARCELID':attrs.get('PARCELID')})
            tally[outcome]+=1
            log.write(json.dumps({'row':index,'OBJECTID':source_id,'PARCELID':attrs.get('PARCELID'),'feature_type':kind,'regions':memberships,'outcome':outcome,'fingerprint':key})+'\n')
    del data
    if unknown_types:raise ValueError('Unknown parcel feature types; review validation log')
    assert sum(tally.values())==expected
    latest=json.loads((base/'latest.json').read_text())['id'];manifest=json.loads((base/latest/'manifest.json').read_text())
    version=digest({'schema':1,'parcels':raw_hash,'boundary':boundaries['version'],'planning':latest,'method':'exact-geometry-continuity-point-candidates-v1'})
    receipt={'version':version,'parcel_sha256':raw_hash,'catalogue_sha256':file_hash(src/'property-catalogue-current.json'),'count_receipt_sha256':file_hash(src/'parcel-count.json'),'licence_sha256':file_hash(src/'parcel-licence.html'),'acquisition':json.loads((src/'parcel-acquisition.json').read_text()),'source':'https://open.toronto.ca/dataset/property-boundaries/','boundary_version':boundaries['version'],'planning_snapshot':latest,'complete_export_count':expected,'stable_reread':True,'crs':'EPSG:4326','licence':'Open Government Licence – Toronto','attribution':'Contains information licensed under the Open Government Licence – Toronto.','use_limit':'General planning reference only; not a survey, ownership record, or verified development site.'}
    db=connect(out/'registry.sqlite')
    prior_version=db.execute('SELECT id FROM versions ORDER BY rowid DESC LIMIT 1').fetchone()
    same=db.execute('SELECT 1 FROM versions WHERE id=?',(version,)).fetchone()
    previous=[json.loads(r[0]) for r in db.execute('SELECT payload FROM observations WHERE version=?',(version if same else prior_version[0] if prior_version else '',))]
    rows,edges=continuity(sorted(grouped.values(),key=lambda x:x['fingerprint']),previous)
    if same:edges=[json.loads(r[0]) for r in db.execute('SELECT payload FROM lineage WHERE version=?',(version,))]
    tree=STRtree([shape(r['geometry']) for r in rows]);source_counts={};regional={rid:Counter() for rid in regions};reviews=[];matches=[]
    for row in rows:
        for rid in row['regions']:regional[rid]['provisional_sites']+=1
    for kind in ['projects','applications']:
        features=read_object(base,manifest,kind+'.json');counts=Counter();seen=set()
        for row in features:
            if row['id'] in seen:raise ValueError('Duplicate planning export row identity')
            seen.add(row['id']);counts['input']+=1
            point=Point(row['lon'],row['lat']) if row.get('lon') is not None and row.get('lat') is not None else None
            memberships=[rid for rid,g in regions.items() if point is not None and g.intersects(point)]
            ids,reason=candidates(point,tree,rows)
            # Parcels crossing the study border remain eligible even if the point is just outside.
            state='candidate' if ids else 'unresolved'
            if point is not None and not memberships and not ids:state='excluded';reason='outside_study_areas'
            counts[state]+=1;counts[reason]+=1
            match={'record_id':row['id'],'publisher_number':row.get('number'),'label':row['label'],'source':kind,'state':state,'candidate_site_ids':ids,'reason':reason,'regions':memberships,'evidence':{'planning_snapshot':latest,'planning_source_sha256':manifest['sources'][kind]['sha256'],'planning_retrieved_at':manifest['sources'][kind]['retrieved_at'],'geometry_origin':row['geometry_origin'],'parcel_sha256':raw_hash},'method':'point-intersects-provisional-parcel; not site confirmation'}
            matches.append(match)
            for rid in memberships:regional[rid][kind+'_'+state]+=1
            if reason in {'multiple_parcels','unlocated','no_eligible_parcel'}:
                reviews.append({'id':kind+':'+row['id'],'record_id':row['id'],'source':kind,'reason':reason,'candidate_site_ids':ids,'decision':'unresolved','review_note':'Spatial evidence does not resolve this case; retain every candidate and request explicit source/site evidence.'})
        assert counts['input']==counts['candidate']+counts['unresolved']+counts['excluded']
        source_counts[kind]=dict(counts)
    active={r['site_id'] for r in rows};absent=[r['site_id'] for r in previous if r['site_id'] not in active]
    report={'receipt':receipt,'parcel_accounting':dict(tally),'feature_types':dict(types),'duplicate_PARCELID_values':sum(n>1 for n in seen_parcel_ids.values()),'provisional_sites':len(rows),'confirmed_sites':0,'lineage_candidates':len(edges),'absent_from_current_export':absent,'matching':source_counts,'regions':{k:dict(v) for k,v in regional.items()},'review_queue':len(reviews),'confirmed_matches':0,'release_ready':False,'limitations':['Provisional parcel references are not established development sites.','All spatial associations remain candidates, including single-parcel hits.','Unlocated records remain globally unresolved; no region membership was fabricated.','Geometry changes allocate new provisional IDs and candidate lineage; no automatic split/merge adjudication.']}
    with db:
        if not same:
            db.execute('INSERT INTO versions VALUES(?,?,?)',(version,datetime.now(timezone.utc).isoformat(),json.dumps(receipt)))
            for row in rows:
                db.execute('INSERT OR IGNORE INTO sites VALUES(?,?)',(row['site_id'],version))
                db.execute('INSERT INTO observations VALUES(?,?,?,?)',(version,row['site_id'],row['fingerprint'],json.dumps(row)))
            for e in edges:db.execute('INSERT INTO lineage VALUES(?,?,?,?)',(version,e['predecessor'],e['successor'],json.dumps(e)))
            for m in matches:db.execute('INSERT INTO matches VALUES(?,?,?,?)',(version,m['source'],m['record_id'],json.dumps(m)))
            for r in reviews:db.execute('INSERT INTO reviews VALUES(?,?,?)',(version,r['id'],json.dumps(r)))
    db.close()
    for name,items in [('matches',matches),('review-queue',reviews),('lineage-candidates',edges)]:
        with (out/(name+'.ndjson')).open('w',encoding='utf-8') as f:
            for item in items:f.write(json.dumps(item)+'\n')
    (docs/'parcel-registry-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    return report

if __name__=='__main__':
    result=build();print(json.dumps({k:v for k,v in result.items() if k not in ['receipt','absent_from_current_export']},indent=2))
