"""Create a bounded local Toronto reference; never publish through public packaging."""
import json,gzip,hashlib
from pathlib import Path
import duckdb
from pyproj import Transformer
from shapely.geometry import shape,box,mapping
from shapely.ops import transform
ROOT=Path(__file__).resolve().parents[1]
def build():
 project=Transformer.from_crs(4326,26917,always_xy=True).transform
 inverse=Transformer.from_crs(26917,4326,always_xy=True).transform
 cx,cy=project(-79.38395,43.65343);extent=160;study=box(cx-extent,cy-extent,cx+extent,cy+extent)
 bounds=transform(inverse,study).bounds;w,s,e,n=bounds
 local=lambda x,y,z=None:(x-cx,cy-y)
 c=duckdb.connect(str(ROOT/'data/buildings.duckdb'),read_only=True)
 rows=c.execute('select id,height_m,height_source,geometry_json from buildings where east>=? and west<=? and north>=? and south<=? order by id',[w,e,s,n]).fetchall();c.close()
 buildings=[];occupied=set()
 for id,h,method,raw in rows:
  geom=transform(project,shape(json.loads(raw))).intersection(study)
  if geom.is_empty or geom.geom_type not in ('Polygon','MultiPolygon'):continue
  for x in range(16):
   for z in range(16):
    cell=box(cx-160+x*20,cy+160-(z+1)*20,cx-160+(x+1)*20,cy+160-z*20)
    if geom.intersection(cell).area>.01:occupied.add(f'{x},{z}')
  buildings.append({'id':id,'height':h,'height_source':method,'geometry':mapping(transform(local,geom))})
 candidate=ROOT/'data/submission-refresh/planning-2026-11-13/candidate.json'
 snapshot=json.loads(candidate.read_text())['id'] if candidate.exists() else '8be473c10eda27b1f37b'
 pm=json.loads((ROOT/'public/planning'/snapshot/'manifest.json').read_text());h=pm['assets']['context.json'];roads=json.loads(gzip.decompress((ROOT/f'public/planning/objects/{h}.json.gz').read_bytes()));lines=[]
 for f in roads['features']:
  geom=transform(project,shape(f['geometry'])).intersection(study)
  if not geom.is_empty and geom.geom_type in ('LineString','MultiLineString'):lines.append(mapping(transform(local,geom)))
 source=json.loads((ROOT/'data/buildings-manifest.json').read_text())
 data={'id':'pending','name':'Downtown Toronto · City Hall','centre':[-79.38395,43.65343],'extent_m':320,'crs':'EPSG:26917','buildings':buildings,'roads':lines,'occupied_cells':sorted(occupied),'building_source':source,'street_source':pm['sources']['streets'],'limitation':'2025 source-height massing on flat ground; not current surveyed buildings or photorealistic reconstruction. Clipped at study edge. Source IDs are snapshot references, not established building identities.'}
 identity={k:v for k,v in data.items() if k!='id'}
 data['id']=hashlib.sha256(json.dumps(identity,sort_keys=True,separators=(',',':')).encode()).hexdigest()
 (ROOT/'src/sandbox/downtown.json').write_text(json.dumps(data,separators=(',',':'))+'\n')
 print(json.dumps({'buildings':len(buildings),'street_segments':len(lines),'occupied_cells':len(occupied)}))
if __name__=='__main__':build()
