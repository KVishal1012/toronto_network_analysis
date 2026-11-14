"""Bounded source TIN access, preserving CGVD2013 elevations without datum substitution."""
import json
import math
import sqlite3
from pathlib import Path
import shapefile
from pyproj import CRS,Transformer
from server.store import DATA
from server.engine import iso_now

ROOT=DATA/'terrain-original'
DB=DATA/'terrain.sqlite'
MANIFEST=DATA/'terrain-manifest.json'
PAGE='https://open.toronto.ca/dataset/triangular-irregular-network-tin/'


def process() -> dict:
    """Validate and index original PolygonZ records; never infer a DEM or repair triangles."""
    crs=CRS.from_wkt((ROOT/'2023_TIN.prj').read_text())
    if not crs.equals(CRS.from_epsg(2952),ignore_axis_order=True):raise ValueError('Source CRS does not match EPSG:2952')
    reader=shapefile.Reader(str(ROOT/'2023_TIN.shp'))
    if reader.shapeType!=15:raise ValueError('Expected PolygonZ source')
    pending=DB.with_suffix('.tmp');pending.unlink(missing_ok=True)
    con=sqlite3.connect(pending);con.execute('CREATE VIRTUAL TABLE bounds USING rtree(id,west,east,south,north)')
    batch=[];accepted=0;rejected=0;minimum=math.inf;maximum=-math.inf;samples=[]
    with (DATA/'terrain-rejected.jsonl').open('w') as rejected_file:
        for i,s in enumerate(reader.iterShapes()):
            valid=(len(s.points)==4 and len(s.parts)==1 and s.points[0]==s.points[-1] and len(s.z)==4 and all(math.isfinite(z) and -100<z<1000 for z in s.z))
            if valid:
                a,b,c=s.points[:3];valid=abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))>0
            if not valid:
                rejected+=1;rejected_file.write(json.dumps({'row':i,'reason':'Not a nondegenerate closed triangle with finite plausible elevations'})+'\n');continue
            west,south,east,north=s.bbox
            if not (280000<=west<=east<=350000 and 4800000<=south<=north<=4870000):raise ValueError('Unexpected source extent')
            batch.append((i,west,east,south,north));accepted+=1;minimum=min(minimum,*s.z);maximum=max(maximum,*s.z)
            if len(samples)<3:samples.append({'row':i,'xy':s.points[:3],'z':list(s.z[:3])})
            if len(batch)==10000:
                con.executemany('INSERT INTO bounds VALUES (?,?,?,?,?)',batch);batch=[]
            if (i+1)%500000==0:print(f'Indexed {i+1:,} source polygons',flush=True)
        con.executemany('INSERT INTO bounds VALUES (?,?,?,?,?)',batch);con.commit();con.close()
    pending.replace(DB)
    source=json.loads((DATA/'terrain-source-receipt.json').read_text())
    receipt={**source,'name':'Toronto 2023 LiDAR-derived TIN','page':PAGE,'status':'reference','processed_at':iso_now(),'records_in':reader.numRecords,'records_out':accepted,'rejected_count':rejected,'min_vertex_elevation_m':minimum,'max_vertex_elevation_m':maximum,'horizontal_crs':'EPSG:2952','vertical_datum':'CGVD2013','vertical_units':'metres','source_resolution_m':2.5,'samples':samples,'limitation':'Source 2023 bare-earth TIN. Viewport display is an elevation-coloured reference mesh, not a flood model. No ellipsoid-height conversion, building alignment, hydrologic conditioning, or new elevation interpolation performed.'}
    MANIFEST.write_text(json.dumps(receipt));return receipt


def metadata() -> dict:
    """Return processed terrain provenance."""
    return json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {'status':'unavailable','error':'Terrain processing has not completed'}


def viewport(bbox: str) -> dict:
    """Query bounded native-CRS triangle candidates and transform XY only for map display."""
    values=[float(v) for v in bbox.split(',')]
    if len(values)!=4 or not all(math.isfinite(v) for v in values):raise ValueError('Four finite bounds required')
    w,s,e,n=values
    if not (-80<w<e<-78 and 43<s<n<45):raise ValueError('Bounds must be in the Toronto region')
    meta=metadata();result={'type':'FeatureCollection','features':[],'receipt':meta}
    if meta['status']!='reference':return result
    if e-w>0.025 or n-s>0.02:result['receipt']={**meta,'status':'zoom_required'};return result
    to_native=Transformer.from_crs(4326,2952,always_xy=True);to_geo=Transformer.from_crs(2952,4326,always_xy=True)
    west,south,east,north=to_native.transform_bounds(w,s,e,n,densify_pts=21)
    with sqlite3.connect(f'file:{DB}?mode=ro',uri=True) as con:rows=con.execute('SELECT id FROM bounds WHERE east>=? AND west<=? AND north>=? AND south<=? ORDER BY id LIMIT 4001',(west,east,south,north)).fetchall()
    reader=shapefile.Reader(str(ROOT/'2023_TIN.shp'))
    for (i,) in rows[:4000]:
        item=reader.shapeRecord(i);xy=item.shape.points;z=item.shape.z
        # Preserve source vertex heights as attributes; GeoJSON is strictly XY to avoid implying ellipsoid heights.
        coords=[list(to_geo.transform(x,y)) for x,y in xy];p=item.record.as_dict()
        result['features'].append({'type':'Feature','id':i,'properties':{**p,'source_row':i,'vertex_elevations_cgvd2013_m':list(z),'display_elevation_m':sum(z[:3])/3},'geometry':{'type':'Polygon','coordinates':[coords]}})
    reader.close();result['receipt']={**meta,'returned':len(result['features']),'truncated':len(rows)>4000};return result

if __name__=='__main__':print(json.dumps(process()))
