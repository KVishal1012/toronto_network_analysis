"""Local metric terrain meshes. CGVD2013 Z is never treated as ellipsoid height."""
from functools import lru_cache
import math
import sqlite3
import numpy as np
import shapefile
from pyproj import Transformer
from shapely import STRtree, polygons, points, union_all, covered_by
from server import terrain


def interpolate(xy,z,q):
    """Barycentric interpolation; caller establishes source-triangle containment."""
    a,b,c=xy
    denominator=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
    u=((b[1]-c[1])*(q[...,0]-c[0])+(c[0]-b[0])*(q[...,1]-c[1]))/denominator
    v=((c[1]-a[1])*(q[...,0]-c[0])+(a[0]-c[0])*(q[...,1]-c[1]))/denominator
    return u*z[0]+v*z[1]+(1-u-v)*z[2]

@lru_cache(maxsize=9)
def mesh(lon=-79.38,lat=43.65,spacing=20):
    if not (math.isfinite(lon) and math.isfinite(lat) and -79.65<=lon<=-79.1 and 43.58<=lat<=43.86):raise ValueError('Toronto centre required')
    if spacing not in (0,10,20,40):raise ValueError('LOD must be native, 10, 20 or 40 metres')
    cx,cy=Transformer.from_crs(4326,2952,always_xy=True).transform(lon,lat)
    # All LODs share this globally aligned extent and source data; no height normalization.
    cx=round(cx/40)*40;cy=round(cy/40)*40
    w,s,e,n=cx-400,cy-400,cx+400,cy+400
    with sqlite3.connect(f'file:{terrain.DB}?mode=ro',uri=True) as con:
        ids=con.execute('SELECT id FROM bounds WHERE east>=? AND west<=? AND north>=? AND south<=? ORDER BY id LIMIT 150001',(w,e,s,n)).fetchall()
    if len(ids)>150000:raise ValueError('Source density exceeds mesh budget; choose another centre')
    if not ids:raise ValueError('No source terrain at this centre')
    with shapefile.Reader(str(terrain.ROOT/'2023_TIN.shp')) as reader:
        source=[reader.shape(i[0]) for i in ids]
    xy=np.asarray([v.points[:3] for v in source]);z=np.asarray([v.z[:3] for v in source])
    if spacing==0:
        vertices=np.column_stack((xy[:,:,0].ravel()-cx,xy[:,:,1].ravel()-cy,z.ravel()))
        indices=np.arange(len(vertices)).reshape(-1,3)
        gap_note='Original complete intersecting triangles; boundary may extend outside the 800 m window. Source gaps remain open.'
        missing=None
    else:
        surfaces=polygons(xy);tree=STRtree(surfaces)
        gx,gy=np.meshgrid(np.arange(w,e+1,spacing),np.arange(s,n+1,spacing))
        q=np.column_stack((gx.ravel(),gy.ravel()));heights=np.full(len(q),np.nan)
        hits=tree.query(points(q),predicate='intersects')
        # Stable source order at shared edges; no extrapolation or missing-as-zero.
        order=np.lexsort((hits[1],hits[0]));hits=hits[:,order]
        for node,triangle in zip(*hits):
            if np.isnan(heights[node]):heights[node]=interpolate(xy[triangle],z[triangle],q[node])
        width=gx.shape[1];faces=[]
        for row in range(width-1):
            for col in range(width-1):
                a=row*width+col;b=a+1;c=a+width;d=c+1
                faces.extend(((a,b,c),(b,d,c)))
        indices=np.asarray(faces);valid=np.all(np.isfinite(heights[indices]),axis=1)
        indices=indices[valid]
        # Full face coverage check prevents bridging even narrow source holes.
        coverage=union_all(surfaces)
        indices=indices[covered_by(polygons(q[indices]),coverage)]
        used=np.unique(indices);remap=np.full(len(q),-1,dtype=int);remap[used]=np.arange(len(used))
        vertices=np.column_stack((q[used,0]-cx,q[used,1]-cy,heights[used]));indices=remap[indices]
        missing=int(np.sum(~np.isfinite(heights)))
        gap_note='Piecewise-linear source TIN resampling. Faces crossing source gaps are omitted; coarse LOD can enlarge visible gaps. No extrapolation.'
    return {'positions':vertices.ravel().tolist(),'indices':indices.ravel().tolist(),'origin_m':[cx,cy,0],'horizontal_crs':'EPSG:2952','vertical_datum':'CGVD2013','vertical_units':'metres','spacing_m':spacing,'extent_m':[w,s,e,n],'source_triangle_count':len(ids),'rendered_triangles':len(indices),'missing_grid_nodes':missing,'source_rows':[i[0] for i in ids],'gap_policy':gap_note,'source_sha256':terrain.metadata().get('sha256'),'height_placement_allowed':False,'observation_year':2023}
