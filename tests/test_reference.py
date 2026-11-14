"""Reference-layer contracts use synthetic fixtures, never substituted in the map."""
import unittest
from server.reference import validate, layer

class ReferenceTests(unittest.TestCase):
    def fixture(self):
        return {'type':'FeatureCollection','crs':{'properties':{'name':'urn:ogc:def:crs:OGC:1.3:CRS84'}},'features':[{'type':'Feature','properties':{'_id':1},'geometry':{'type':'LineString','coordinates':[[-79.4,43.6],[-79.3,43.7]]}}]}
    def test_crs_required(self):
        raw=self.fixture();raw.pop('crs')
        with self.assertRaises(ValueError):validate(raw,'cycling-network')
    def test_rejected_accounting(self):
        raw=self.fixture();raw['features'] += [raw['features'][0],{'properties':{'_id':2},'geometry':{'type':'Point','coordinates':[-79.4,43.6]}}]
        good,bad=validate(raw,'cycling-network')
        self.assertEqual((len(good),len(bad)),(1,2))
        self.assertEqual(good[0]['geometry'],raw['features'][0]['geometry'])
    def test_axis_order_and_allowlist(self):
        raw=self.fixture();raw['features'][0]['geometry']['coordinates']=[[43.6,-79.4],[43.7,-79.3]]
        self.assertEqual(len(validate(raw,'cycling-network')[1]),1)
        with self.assertRaises(ValueError):layer('../world')
