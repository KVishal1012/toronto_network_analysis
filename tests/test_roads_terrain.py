import csv,io,unittest
from datetime import datetime,timezone
from server.roads import parse,present,timestamp
from server.terrain import viewport

class RoadsTerrainTests(unittest.TestCase):
    def payload(self,coords='[-79.4,43.7],[-79.41,43.71]'):
        return ('<Closures><Closure><Id>a</Id><Latitude>43.7</Latitude><Longitude>-79.4</Longitude><StartTime>1000000</StartTime><EndTime>2000000</EndTime><LastUpdated>1500000</LastUpdated><GeoPolyline>'+coords+'</GeoPolyline></Closure></Closures>').encode()
    def test_source_geometry_and_point_fallback(self):
        f,r,n=parse(self.payload());self.assertEqual((len(f),len(r),n),(1,0,1));self.assertEqual(f[0]['geometry']['type'],'LineString')
        f,_,_=parse(self.payload('invalid'));self.assertEqual(f[0]['geometry']['type'],'Point');self.assertIn('extent unavailable',f[0]['properties']['geometry_method'])
    def test_age_and_date_window_do_not_claim_active(self):
        f,_,_=parse(self.payload());bundle={'features':f,'receipt':{'status':'available','retrieved_at':datetime.fromtimestamp(1500,timezone.utc).isoformat()}}
        x=present(bundle,1600);self.assertEqual(x['receipt']['freshness'],'fresh');self.assertEqual(x['features'][0]['properties']['date_window'],'within date window; check schedule')
        x=present(bundle,2100);self.assertEqual(x['receipt']['freshness'],'stale');self.assertEqual(x['features'][0]['properties']['date_window'],'ended / source expired')
    def test_unknown_times_and_crs_bounds(self):
        self.assertIsNone(timestamp('nan'));self.assertIsNone(timestamp(''))
        with self.assertRaises(ValueError):viewport('43,-79,44,-78')
        with self.assertRaises(ValueError):parse(b'<Unexpected/>')
