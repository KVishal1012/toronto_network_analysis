"""Bounded reads of independently versioned 2025 reference geometry."""
from __future__ import annotations
import json
import math
import duckdb
from server.store import DATA

LIMIT=6000


def metadata() -> dict:
    """Return the reference acquisition receipt, or an explicit unavailable state."""
    path=DATA/'buildings-manifest.json'
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {'status':'unavailable','error':'Import the official 3D massing archive first'}


def viewport(bbox: str) -> dict:
    """Return only intersecting viewport candidates, with truncation disclosed."""
    bounds=[float(v) for v in bbox.split(',')]
    if len(bounds)!=4 or not all(math.isfinite(v) for v in bounds):
        raise ValueError('bbox requires four finite coordinates')
    west,south,east,north=bounds
    if not (-180<=west<east<=180 and -90<=south<north<=90):
        raise ValueError('Invalid bounding box')
    meta=metadata()
    if meta['status']=='unavailable':return {'type':'FeatureCollection','features':[],'metadata':meta}
    if east-west>0.16 or north-south>0.12:
        return {'type':'FeatureCollection','features':[],'metadata':{'status':'zoom_required','message':'Zoom closer to load 3D buildings'}}
    with duckdb.connect(str(DATA/'buildings.duckdb'),read_only=True) as con:
        rows=con.execute('SELECT id, height_m, height_source, building_source, geometry_json FROM buildings WHERE east >= ? AND west <= ? AND north >= ? AND south <= ? ORDER BY id LIMIT ?', [west,east,south,north,LIMIT+1]).fetchall()
    return {'type':'FeatureCollection','features':[{'type':'Feature','id':r[0],
        'properties':{'id':r[0],'height_m':r[1],'height_source':r[2],'building_source':r[3],'vintage':'2025'},
        'geometry':json.loads(r[4])} for r in rows[:LIMIT]],
        'metadata':{'status':'reference','vintage':'2025','returned':min(len(rows),LIMIT),'truncated':len(rows)>LIMIT,
                    'height_field':'AVG_HEIGHT','source_sha256':meta['sha256']}}
