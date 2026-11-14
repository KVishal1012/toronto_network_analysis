import unittest
import struct
import tempfile
import sqlite3
from pathlib import Path
from unittest.mock import patch
import shapefile
from shapely.geometry import Point
from pyproj import Transformer
from server import terrain
import numpy as np
from shapely.geometry import Polygon
from server.components import geometry, viewport, inspect, metadata, DB, connect, digest
from server.terrain_mesh import interpolate, mesh

class ComponentTerrainTests(unittest.TestCase):
    def test_geopackage_envelope(self):
        p=Polygon([(0,0),(1,0),(0,1)])
        for envelope,size in enumerate((0,32,48,48,64)):
            blob=b'GP'+bytes([0,1|(envelope<<1)])+struct.pack('<i',4326)+bytes(size)+p.wkb
            self.assertTrue(geometry(blob).equals(p))
        with self.assertRaises(ValueError):geometry(b'bad data')

    def test_plane_interpolation(self):
        xy=np.array([[0,0],[10,0],[0,10]])
        self.assertAlmostEqual(float(interpolate(xy,[100,120,130],np.array([2,3]))),113)

    def test_validation(self):
        with self.assertRaises(ValueError):viewport('-79.4,43.6,-79.3,43.7','injected')
        with self.assertRaises(ValueError):mesh(float('nan'),43.65)
        with self.assertRaises(ValueError):mesh(spacing=3)

    @unittest.skipUnless(DB.exists(),'Real package not installed')
    def test_installed_package_and_provenance(self):
        m=metadata();self.assertEqual(digest(DB),m['checksums'][DB.name])
        with connect() as con:
            row=con.execute("SELECT StructureID FROM structures WHERE GeometryStatus LIKE '%repair%' LIMIT 1").fetchone()
            if not row:row=con.execute('SELECT StructureID FROM structures LIMIT 1').fetchone()
            conflict=con.execute('SELECT StructureID FROM conflict_review LIMIT 1').fetchone()[0]
        item=inspect(row[0]);self.assertEqual(len(item['source_records']),item['component']['source_record_count'])
        self.assertFalse(item['verification']['height_validation']['placement_allowed'])
        if item['component']['GeometryStatus']=='repaired_make_valid':
            self.assertEqual(len(item['geometry_repairs']),1)
            self.assertIn('make_valid',item['geometry_repairs'][0]['method'])
        self.assertEqual(inspect(conflict,'conflict_review')['component']['OutputLayer'],'conflict_review')

    def test_gap_is_not_filled(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);db=root/'terrain.sqlite'
            cx,cy=Transformer.from_crs(4326,2952,always_xy=True).transform(-79.38,43.65)
            cx=round(cx/40)*40;cy=round(cy/40)*40
            rings=[[(cx-100,cy-100,100),(cx-20,cy-100,100),(cx-100,cy+100,100)],[(cx+20,cy-100,200),(cx+100,cy-100,200),(cx+100,cy+100,200)]]
            with shapefile.Writer(str(root/'2023_TIN'),shapeType=15) as writer:
                writer.field('id','N')
                for i,ring in enumerate(rings):writer.polyz([ring+[ring[0]]]);writer.record(i)
            with sqlite3.connect(db) as con:
                con.execute('CREATE VIRTUAL TABLE bounds USING rtree(id,west,east,south,north)')
                for i,r in enumerate(rings):con.execute('INSERT INTO bounds VALUES(?,?,?,?,?)',(i,min(p[0] for p in r),max(p[0] for p in r),min(p[1] for p in r),max(p[1] for p in r)))
            mesh.cache_clear()
            with patch.object(terrain,'ROOT',root),patch.object(terrain,'DB',db):
                data=mesh(spacing=20)
            vertices=np.array(data['positions']).reshape(-1,3)
            self.assertGreater(data['missing_grid_nodes'],0)
            self.assertGreater(len(data['indices']),0)
            for face in np.array(data['indices']).reshape(-1,3):
                self.assertFalse(Polygon(vertices[face,:2]).covers(Point(0,0)))
                self.assertEqual(len(set(vertices[face,2])),1)
            mesh.cache_clear()

    @unittest.skipUnless(terrain.DB.exists(),'Real terrain not installed')
    def test_real_native_and_nested_lods(self):
        native=mesh(spacing=0);coarse=mesh(spacing=40);fine=mesh(spacing=20)
        self.assertTrue(all(np.isfinite(native['positions'])))
        with shapefile.Reader(str(terrain.ROOT/'2023_TIN.shp')) as reader:
            first=reader.shape(native['source_rows'][0])
        self.assertEqual(native['positions'][2:9:3],list(first.z[:3]))
        # Every shared grid node must interpolate identically, without arbitrary offset.
        def nodes(m):return {(x,y):z for x,y,z in np.array(m['positions']).reshape(-1,3)}
        a,b=nodes(coarse),nodes(fine)
        for k in a.keys()&b.keys():self.assertAlmostEqual(a[k],b[k],places=8)
        self.assertEqual(native['vertical_datum'],'CGVD2013')
        self.assertFalse(native['height_placement_allowed'])
        self.assertEqual(len(native['indices'])//3,len(native['source_rows']))

if __name__=='__main__':unittest.main()
