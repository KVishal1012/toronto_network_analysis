import json,math,unittest
from pathlib import Path
import duckdb
from pyproj import Transformer
from shapely.geometry import shape
ROOT=Path(__file__).resolve().parents[1]
class ArchitecturalViewsTests(unittest.TestCase):
 @unittest.skipUnless((ROOT/'data/buildings.duckdb').exists(),'Local 3D buildings archive not installed')
 def test_all_displayed_heights_and_methods_match_source(self):
  views=json.loads((ROOT/'src/sandbox/architectural.json').read_text());self.assertEqual({v['region'] for v in views},{'downtown','midtown'})
  db=duckdb.connect(str(ROOT/'data/buildings.duckdb'),read_only=True)
  for v in views:
   self.assertEqual(v['extent_m'],600);self.assertRegex(v['id'],r'^[a-f0-9]{64}$')
   for b in v['buildings']:
    row=db.execute('select height_m,height_source from buildings where id=?',[b['id']]).fetchone();self.assertEqual(b['height'],row[0]);self.assertEqual(b['height_source'],row[1]);self.assertTrue(shape(b['geometry']).is_valid)
    bounds=shape(b['geometry']).bounds;self.assertTrue(all(abs(n)<=300.00001 for n in bounds))
  db.close()
 def test_coordinate_origin_and_north_orientation(self):
  project=Transformer.from_crs(4326,26917,always_xy=True)
  for v in json.loads((ROOT/'src/sandbox/architectural.json').read_text()):
   x,y=project.transform(*v['centre']);xx,yy=project.transform(v['centre'][0],v['centre'][1]+.001);self.assertGreater(yy-y,100);self.assertLess(y-yy,0)
if __name__=='__main__':unittest.main()
