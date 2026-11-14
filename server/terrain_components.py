"""Drape footprint boundaries onto the displayed terrain, never infer building heights."""
from functools import lru_cache
import numpy as np
from pyproj import Transformer
from shapely import STRtree, polygons
from shapely.geometry import shape, box
from shapely.ops import transform
from server import components
from server.terrain_mesh import mesh, interpolate

@lru_cache(maxsize=6)
def scene(lon,lat,spacing):
    surface=mesh(lon,lat,spacing)
    vertices=np.asarray(surface['positions']).reshape(-1,3)
    faces=np.asarray(surface['indices']).reshape(-1,3)
    triangles=vertices[faces];xy=triangles[:,:,:2];surfaces=polygons(xy);tree=STRtree(surfaces)
    cx,cy,_=surface['origin_m'];w,s,e,n=surface['extent_m']
    bounds=Transformer.from_crs(2952,4326,always_xy=True).transform_bounds(w,s,e,n)
    data=components.viewport(','.join(map(str,bounds)))
    if data['metadata']['status']!='verified':raise ValueError('Verified components unavailable')
    project=Transformer.from_crs(4326,2952,always_xy=True)
    def local(x,y,z=None):
        a,b=project.transform(x,y);return np.asarray(a)-cx,np.asarray(b)-cy
    window=box(w-cx,s-cy,e-cx,n-cy)
    outlines=[];omitted=0
    for feature in data['features']:
        boundary=transform(local,shape(feature['geometry'])).boundary.intersection(window)
        segments=[]
        for index in sorted(tree.query(boundary,predicate='intersects')):
            cut=boundary.intersection(surfaces[index])
            parts=list(cut.geoms) if hasattr(cut,'geoms') else [cut]
            for part in parts:
                if part.geom_type!='LineString' or part.is_empty:continue
                coords=np.asarray(part.coords)[:,:2];heights=interpolate(xy[index],triangles[index,:,2],coords)
                for j in range(len(coords)-1):
                    segments.extend([float(coords[j,0]),float(coords[j,1]),float(heights[j]),float(coords[j+1,0]),float(coords[j+1,1]),float(heights[j+1])])
        if segments:outlines.append({'id':feature['properties']['StructureID'],'segments':segments,'repair':feature['properties']['GeometryStatus']})
        else:omitted+=1
    return {**surface,'outlines':outlines,'component_receipt':{'package_sha256':components.metadata()['checksums'][components.DB.name],'returned':len(outlines),'without_visible_segments':omitted,'truncated':data['metadata']['truncated'],'placement':'Derived footprint boundaries on displayed terrain; no roof elevation or measured building base. Segments outside source coverage are omitted.','conflicts_included':False}}
