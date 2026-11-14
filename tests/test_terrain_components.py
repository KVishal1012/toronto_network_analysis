import unittest
import numpy as np
from shapely import STRtree,polygons
from shapely.geometry import Point
from server import terrain,components
from server.terrain_components import scene
from server.terrain_mesh import interpolate

@unittest.skipUnless(terrain.DB.exists() and components.DB.exists(),'Installed source packages required')
class TerrainComponentTests(unittest.TestCase):
    def test_outlines_match_display_surface_and_bounds(self):
        data=scene(-79.38,43.65,40)
        self.assertGreater(len(data['outlines']),0)
        vertices=np.array(data['positions']).reshape(-1,3)
        triangles=vertices[np.array(data['indices']).reshape(-1,3)]
        xy=triangles[:,:,:2];tree=STRtree(polygons(xy))
        for outline in data['outlines'][:20]:
            segments=np.array(outline['segments']).reshape(-1,2,3)
            self.assertTrue(np.all(np.abs(segments[:,:,:2])<=400.00001))
            for segment in segments:
                q=segment.mean(axis=0);hits=tree.query(Point(q[:2]).buffer(1e-7))
                self.assertTrue(any(abs(float(interpolate(xy[i],triangles[i,:,2],q[:2]))-q[2])<1e-6 for i in hits))
        self.assertFalse(data['height_placement_allowed'])
        self.assertFalse(data['component_receipt']['conflicts_included'])

    def test_invalid_selection_rejected(self):
        with self.assertRaises(ValueError):scene(-100,43,0)
        with self.assertRaises(ValueError):scene(-79.38,43.65,5)
