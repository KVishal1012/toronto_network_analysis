"""Bounded source-height architectural views for Downtown and Midtown."""
import json,gzip,hashlib,math
from pathlib import Path
import duckdb
from pyproj import Transformer
from shapely.geometry import shape,box,mapping
from shapely.ops import transform
ROOT=Path(__file__).resolve().parents[1]

def build():
 project=Transformer.from_crs(4326,26917,always_xy=True).transform;inverse=Transformer.from_crs(26917,4326,always_xy=True).transform
 candidate=json.loads((ROOT/'data/submission-refresh/planning-2026-11-13/candidate.json').read_text())['id'];pm=json.loads((ROOT/'public/planning'/candidate/'manifest.json').read_text());digest=pm['assets']['context.json'];roads=json.loads(gzip.decompress((ROOT/'public/planning/objects'/f'{digest}.json.gz').read_bytes()))
 source=json.loads((ROOT/'data/buildings-manifest.json').read_text());db=duckdb.connect(str(ROOT/'data/buildings.duckdb'),read_only=True);views=[]
 for region,name,lon,lat in [('downtown','Downtown · City Hall',-79.38395,43.65343),('midtown','Midtown · Yonge–Eglinton',-79.3985,43.7062)]:
  cx,cy=project(lon,lat);extent=600;study=box(cx-300,cy-300,cx+300,cy+300);w,s,e,n=transform(inverse,study).bounds;local=lambda x,y,z=None:(x-cx,cy-y);buildings=[]
  for id,h,method,raw in db.execute('select id,height_m,height_source,geometry_json from buildings where east>=? and west<=? and north>=? and south<=? order by id',[w,e,s,n]).fetchall():
   g=transform(project,shape(json.loads(raw))).intersection(study)
   if g.is_empty or g.geom_type not in ('Polygon','MultiPolygon'):continue
   if not g.is_valid or not math.isfinite(h) or h<=0:raise ValueError('Invalid bounded massing')
   buildings.append({'id':id,'height':h,'height_source':method,'geometry':mapping(transform(local,g))})
  lines=[]
  for f in roads['features']:
   g=transform(project,shape(f['geometry'])).intersection(study)
   if not g.is_empty and g.geom_type in ('LineString','MultiLineString'):lines.append(mapping(transform(local,g)))
  data={'id':'pending','region':region,'name':name,'centre':[lon,lat],'extent_m':extent,'crs':'EPSG:26917','buildings':buildings,'roads':lines,'occupied_cells':[],'building_source':source,'street_source':pm['sources']['streets'],'limitation':'2025 source footprint and AVG_HEIGHT massing on flat ground. Informational and illustrative; verification required for legal or official use. Roofs, façades and terrain are not reconstructed. Features are clipped at the study boundary; source IDs refer to snapshot rows.'}
  data['id']=hashlib.sha256(json.dumps({k:v for k,v in data.items() if k!='id'},sort_keys=True,separators=(',',':')).encode()).hexdigest();views.append(data)
 db.close();target=ROOT/'src/sandbox/architectural.json';target.write_text(json.dumps(views,separators=(',',':'))+'\n');return views

if __name__=='__main__':print(json.dumps([{'region':v['region'],'features':len(v['buildings']),'streets':len(v['roads'])} for v in build()]))
