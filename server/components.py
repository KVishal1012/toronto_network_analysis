"""Read-only, source-scoped component identity and separately inspectable conflicts."""
import csv
import hashlib
import json
import math
import shutil
import sqlite3
from pathlib import Path
from shapely import from_wkb
from shapely.geometry import mapping
from pyproj import CRS
from server.store import DATA
from server.engine import iso_now

ROOT=DATA/'components'
DB=ROOT/'toronto_citywide_internal.gpkg'
LAYERS=('structures','conflict_review')

def digest(path):
    with Path(path).open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()

def geometry(blob):
    if blob[:2]!=b'GP':raise ValueError('Not GeoPackage geometry')
    envelope=(blob[3]>>1)&7
    if envelope>4:raise ValueError('Invalid GeoPackage envelope')
    return from_wkb(blob[8+(0,32,48,48,64)[envelope]:])

def connect():
    con=sqlite3.connect(f'file:{DB}?mode=ro',uri=True);con.row_factory=sqlite3.Row;return con

def ingest(source,qualification):
    source=Path(source);qualification=Path(qualification)
    manifest=json.loads((source/'manifest.json').read_text())
    verified={}
    for name,expected in manifest['files'].items():
        if Path(name).name!=name:raise ValueError('Unexpected source filename')
        actual=digest(source/name)
        if actual!=expected:raise ValueError(f'Checksum mismatch: {name}')
        verified[name]=actual
    original=Path(manifest['original_source']).parent
    original_hashes={}
    for name,expected in manifest['source_members_sha256'].items():
        actual=digest(original/name)
        if actual!=expected:raise ValueError(f'Original member checksum mismatch: {name}')
        original_hashes[name]=actual
    if not CRS.from_wkt((original/'3DMassingShapefile_2025_WGS84.prj').read_text()).equals(CRS.from_epsg(3857),ignore_axis_order=True):raise ValueError('Original source CRS mismatch')
    with sqlite3.connect(f"file:{source/'toronto_citywide_internal.gpkg'}?mode=ro",uri=True) as con:
        if con.execute('PRAGMA integrity_check').fetchone()[0]!='ok':raise ValueError('SQLite integrity failed')
        for name,srs in con.execute('SELECT table_name,srs_id FROM gpkg_geometry_columns'):
            if srs!=4326:raise ValueError(f'Unexpected CRS: {name}')
        wkt=con.execute('SELECT definition FROM gpkg_spatial_ref_sys WHERE srs_id=4326').fetchone()[0]
        if not CRS.from_wkt(wkt).equals(CRS.from_epsg(4326),ignore_axis_order=True):raise ValueError('CRS definition mismatch')
        counts={name:con.execute(f'SELECT count(*) FROM {name}').fetchone()[0] for name in (*LAYERS,'source_provenance','geometry_quarantine','geometry_before','geometry_after')}
        if counts!={'structures':427029,'conflict_review':74,'source_provenance':428184,'geometry_quarantine':0,'geometry_before':17,'geometry_after':17}:raise ValueError('Source package counts changed')
        distinct=con.execute('SELECT count(DISTINCT source_fid) FROM source_provenance').fetchone()[0]
        unmatched=con.execute('''SELECT count(*) FROM source_provenance p LEFT JOIN structures s ON p.StructureID=s.StructureID AND p.OutputLayer='structures' LEFT JOIN conflict_review c ON p.StructureID=c.StructureID AND p.OutputLayer='conflict_review' WHERE s.fid IS NULL AND c.fid IS NULL''').fetchone()[0]
        if distinct!=counts['source_provenance'] or unmatched:raise ValueError('Provenance partition failed')
        sums=sum(con.execute(f'SELECT sum(source_record_count) FROM {name}').fetchone()[0] for name in LAYERS)
        if sums!=distinct:raise ValueError('Source record accounting failed')
    q=json.loads(qualification.read_text())
    if q['parent_geopackage_sha256']!=verified['toronto_citywide_internal.gpkg']:raise ValueError('Qualification applies to different package')
    for item in q['evidence']:
        if digest(qualification.parent/item['path'])!=item['sha256']:raise ValueError('Qualification evidence mismatch')
    ROOT.mkdir(exist_ok=True)
    for name in (*manifest['files'],'manifest.json'):shutil.copy2(source/name,ROOT/name)
    shutil.copy2(qualification,ROOT/'component_qualification.json')
    for item in q['evidence']:shutil.copy2(qualification.parent/item['path'],ROOT/item['path'])
    report={'status':'verified','verified_at':iso_now(),'checksums':verified,'verified_original_members':original_hashes,'counts':counts,'crs':'EPSG:4326','source_crs':'EPSG:3857','provenance_unique_records':distinct,'exact_repeats_collapsed':distinct-counts['structures']-counts['conflict_review'],'manifest':manifest,'qualification':q,'height_validation':{'placement_allowed':False,'units':'metres, per user-supplied publisher response','evidence_basis':'User-supplied publisher-response transcription and accompanying workbook; not independently authenticated email','fields':{'MIN_HEIGHT':'Lowest vertical distance above ground per supplied response; zero meaning unresolved; raw value retained','MAX_HEIGHT':'Maximum roof height per workbook; exact operational semantics unverified','AVG_HEIGHT':'Workbook says maximum average height; aggregation definition unresolved','HEIGHT_MSL':'Height above mean sea level per workbook; precise vertical datum unknown','SURF_ELEV':'Actual field name; workbook SURV_ELEV describes closest known ground point; field-name correspondence and datum unresolved'},'building_vertical_datum':None,'terrain_vertical_datum':'CGVD2013','reason':'Building height semantics and vertical datum are unresolved; no ground alignment or height subtraction is justified. MIN_HEIGHT zero-to-null is a pipeline assumption; raw values are retained. AVG_HEIGHT is not a verified roof height. SURF_ELEV and documented SURV_ELEV differ. 2015 refers to the height-source LiDAR, not every footprint date.'}}
    (ROOT/'verification.json').write_text(json.dumps(report,indent=2));return report

def metadata():
    p=ROOT/'verification.json'
    return json.loads(p.read_text()) if p.exists() else {'status':'unavailable'}

def viewport(bbox,layer='structures'):
    if layer not in LAYERS:raise ValueError('Unknown component layer')
    values=list(map(float,bbox.split(',')))
    if len(values)!=4 or not all(map(math.isfinite,values)):raise ValueError('Four finite bounds required')
    w,s,e,n=values
    if not (-80<w<e<-78 and 43<s<n<45):raise ValueError('Toronto bounds required')
    result={'type':'FeatureCollection','features':[],'metadata':{'status':'verified','layer':layer}}
    if not DB.exists():result['metadata']['status']='unavailable';return result
    if e-w>.16 or n-s>.12:result['metadata']['status']='zoom_required';return result
    with connect() as con:
        rows=con.execute(f'SELECT s.* FROM {layer} s JOIN rtree_{layer}_geom r ON s.fid=r.id WHERE r.maxx>=? AND r.minx<=? AND r.maxy>=? AND r.miny<=? ORDER BY s.fid LIMIT 6001',(w,e,s,n)).fetchall()
    for row in rows[:6000]:
        p=dict(row);g=geometry(p.pop('geom'))
        result['features'].append({'type':'Feature','id':p['fid'],'geometry':mapping(g),'properties':p})
    result['metadata'].update(returned=len(result['features']),truncated=len(rows)>6000)
    return result

def inspect(identity,layer='structures'):
    if layer not in LAYERS:raise ValueError('Unknown component layer')
    with connect() as con:
        row=con.execute(f'SELECT * FROM {layer} WHERE StructureID=?',(identity,)).fetchone()
        if row is None:raise ValueError('Component not found')
        p=dict(row);p.pop('geom')
        variants=[dict(r) for r in con.execute('SELECT StructureID,AVG_HEIGHT,MIN_HEIGHT_RAW,MAX_HEIGHT FROM conflict_review WHERE duplicate_group=? ORDER BY StructureID',(p['duplicate_group'],))] if layer=='conflict_review' else []
        provenance=[dict(r) for r in con.execute('SELECT * FROM source_provenance WHERE StructureID=? ORDER BY source_fid',(identity,))]
    with (ROOT/'geometry_changes.csv').open() as f:
        repairs=[{k:v for k,v in r.items() if not k.endswith('wkb_hex')} for r in csv.DictReader(f) if r['StructureID']==identity]
    return {'component':p,'geometry_repairs':repairs,'conflict_variants':variants,'source_records':provenance,'verification':metadata(),'missing':['Persistent whole-building identity','Per-record observation date','Verified height semantics and vertical datum','Ground-aligned 3D building height','Roof textures']}


def conflict_index():
    with connect() as con:
        rows=con.execute('SELECT StructureID,duplicate_group,geom FROM conflict_review ORDER BY duplicate_group,StructureID').fetchall()
    return [{'id':r['StructureID'],'group':r['duplicate_group'],'center':list(geometry(r['geom']).representative_point().coords)[0]} for r in rows]
