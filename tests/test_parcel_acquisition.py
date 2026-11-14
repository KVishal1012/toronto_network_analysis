import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from scripts.acquire_site_parcels import acquire

class AcquisitionTests(unittest.TestCase):
    def fixture(self):
        return {'type':'FeatureCollection','crs':{'properties':{'name':'urn:ogc:def:crs:EPSG::4326'}},'features':[{'type':'Feature','properties':{'OBJECTID':1,'PARCELID':2},'geometry':{'type':'Polygon','coordinates':[[[-79.4,43.6],[-79.3,43.6],[-79.3,43.7],[-79.4,43.6]]]}}]}
    def attempt(self,mode):
        with tempfile.TemporaryDirectory() as tmp:
            base=Path(tmp);raw=json.dumps(self.fixture());(base/'parcels.geojson').write_text(raw)
            def fetch(url,path):
                name=path.name
                if 'catalogue' in name:
                    value={'result':{'license_title':'open-government-licence-toronto','resources':[{'name':'Property Boundaries - 4326.geojson','url':'https://example.test/geo'},{'name':'Property Boundaries','datastore_active':True,'id':'id'}]}}
                elif 'count' in name:value={'result':{'total':2 if mode=='count' and 'reread' in name else 1}}
                elif 'licence' in name:path.write_text('licence');return
                else:
                    data=raw
                    if mode=='truncated':data=data[:20]
                    if mode=='different' and 'reread' in name:data+=' '
                    path.write_text(data);return
                path.write_text(json.dumps(value))
            with patch('scripts.acquire_site_parcels.fetch',fetch):
                if mode=='unchanged':
                    result=acquire(base/'observations');self.assertEqual(result['observation_state'],'unchanged')
                    self.assertTrue((base/'observations'/result['sha256']/'parcel-acquisition.json').exists())
                else:
                    with self.assertRaises((ValueError,json.JSONDecodeError)):acquire(base/'observations')
                    self.assertFalse((base/'observations/latest.json').exists())
            self.assertEqual((base/'parcels.geojson').read_text(),raw)
    def test_unchanged_is_not_new_event(self):self.attempt('unchanged')
    def test_unstable_count_blocks_publication(self):self.attempt('count')
    def test_unstable_reread_blocks_publication(self):self.attempt('different')
    def test_truncation_preserves_baseline(self):self.attempt('truncated')
if __name__=='__main__':unittest.main()
