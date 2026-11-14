"""Contract tests use tiny synthetic fixtures only; fixtures never enter product data."""
import copy
import hashlib
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from server.engine import build_state, count, freshness, present_state, scenario, unique_rows, validate_boundaries
from server import store

NOW = 1788895000


def fixtures() -> tuple[dict, dict, dict, list]:
    """Return explicitly synthetic adjacent polygons and station readings."""
    features = []
    for ident, left, right in [('001', -79.5, -79.4), ('002', -79.4, -79.3)]:
        features.append({'type':'Feature','properties':{'AREA_SHORT_CODE':ident,'AREA_NAME':'Test '+ident},
            'geometry':{'type':'Polygon','coordinates':[[[left,43.6],[right,43.6],[right,43.7],[left,43.7],[left,43.6]]]}})
    boundaries={'type':'FeatureCollection','crs':{'properties':{'name':'EPSG:4326'}},'features':features}
    info={'last_updated':NOW,'data':{'stations':[
        {'station_id':'a','name':'Fixture A','lon':-79.45,'lat':43.65,'capacity':10},
        {'station_id':'b','name':'Shared boundary','lon':-79.4,'lat':43.65,'capacity':10},
        {'station_id':'c','name':'Outside','lon':-79.2,'lat':43.65,'capacity':10}]}}
    status={'last_updated':NOW,'data':{'stations':[{'station_id':i,'num_bikes_available':3,'num_docks_available':7,'last_reported':NOW,
        'is_installed':1,'is_renting':1,'is_returning':1} for i in ['a','b','c']]}}
    receipts=[{'id':i,'status':'available','observed_at':NOW} for i in ['neighbourhoods','station_information','station_status']]
    return boundaries,info,status,receipts


class EngineTests(unittest.TestCase):
    def test_freshness_edges(self) -> None:
        for value,expected in [(NOW-300,'fresh'),(NOW-301,'stale'),(NOW+60,'fresh'),(NOW+61,'future'),(0,'unknown'),(None,'unknown'),(float('nan'),'unknown')]:
            with self.subTest(value=value): self.assertEqual(freshness(value,NOW),expected)

    def test_no_coercion_to_zero(self) -> None:
        for value in [None,-1,True,1.5,float('nan'),'3']:
            self.assertIsNone(count(value))
        self.assertEqual(count(0),0)

    def test_unique_ids(self) -> None:
        with self.assertRaises(ValueError): unique_rows([{'id':1},{'id':'1'}],'id')
        with self.assertRaises(ValueError): unique_rows([{}],'id')

    def test_boundary_and_outside_accounting(self) -> None:
        state=present_state(build_state(*fixtures()),NOW)
        self.assertEqual(state['accounting']['ambiguous_boundary_ids'],['b'])
        self.assertEqual(state['accounting']['outside_boundary_ids'],['c'])
        self.assertEqual(state['summary']['station_count'],2)
        self.assertEqual(state['summary']['available_bikes'],6)
        self.assertEqual(state['stations'][1]['neighbourhood_id'],'001')

    def test_geometry_and_crs_rejection(self) -> None:
        b,*_=fixtures();b.pop('crs')
        with self.assertRaises(ValueError):validate_boundaries(b)
        b,*_=fixtures();b['features'][0]['geometry']['coordinates']=[[]]
        with self.assertRaises(ValueError):validate_boundaries(b)

    def test_area_is_metric(self) -> None:
        b,*_=fixtures();features,_=validate_boundaries(b)
        self.assertGreater(features[0]['properties']['area_km2'],80)
        self.assertLess(features[0]['properties']['area_km2'],100)

    def test_stale_feed_invalidates_recent_station(self) -> None:
        args=fixtures();args[2]['last_updated']=NOW-301
        state=present_state(build_state(*args),NOW)
        self.assertIsNone(state['summary']['available_bikes'])
        self.assertEqual(scenario(state,['a'])['decision'],'VERIFY')

    def test_stale_location_feed_blocks_spatial_inventory(self) -> None:
        args=fixtures();args[1]['last_updated']=NOW-301
        state=present_state(build_state(*args),NOW)
        self.assertIsNone(state['summary']['available_bikes'])

    def test_individual_report_missing_and_stale(self) -> None:
        for field,value in [('last_reported',NOW-301),('num_bikes_available',None),('is_renting',None)]:
            args=fixtures();args[2]['data']['stations'][0][field]=value
            state=present_state(build_state(*args),NOW)
            self.assertIsNone(state['summary']['available_bikes'])
            self.assertEqual(state['summary']['unknown_status_count'],1)

    def test_offline_stock_not_rentable(self) -> None:
        args=fixtures();args[2]['data']['stations'][0]['is_renting']=0
        state=present_state(build_state(*args),NOW)
        self.assertEqual(state['summary']['available_bikes'],3)
        self.assertEqual(state['stations'][0]['category'],'offline')

    def test_missing_source_and_actual_zero_differ(self) -> None:
        state=present_state(build_state(None,None,None,[]),NOW)
        self.assertIsNone(state['summary']['available_bikes'])
        self.assertIsNone(state['summary']['station_count'])
        args=fixtures();args[2]['data']['stations'][0]['num_bikes_available']=0
        state=present_state(build_state(*args),NOW)
        self.assertEqual(state['stations'][0]['category'],'empty')

    def test_invalid_location_is_accounted_for(self) -> None:
        args=fixtures();args[1]['data']['stations'][0]['lon']=float('nan')
        state=build_state(*args)
        self.assertEqual(state['accounting']['stations_in'],3)
        self.assertEqual(state['accounting']['stations_out'],2)
        self.assertEqual(len(state['accounting']['stations_rejected']),1)

    def test_scenario_is_isolated_and_bounded(self) -> None:
        state=present_state(build_state(*fixtures()),NOW);before=copy.deepcopy(state)
        result=scenario(state,['a'])
        self.assertEqual(result['decision'],'ASK')
        self.assertEqual(result['removed_available_bikes'],3)
        self.assertEqual(state,before)
        for ids in [[],['a','a'],['missing'],['c']]:
            with self.assertRaises(ValueError):scenario(state,ids)

    def test_freshness_ages_without_new_ingestion(self) -> None:
        stored=build_state(*fixtures())
        self.assertEqual(present_state(stored,NOW)['summary']['available_bikes'],6)
        self.assertIsNone(present_state(stored,NOW+301)['summary']['available_bikes'])


class StoreTests(unittest.TestCase):
    def test_ledger_history_and_parameterized_lookup(self) -> None:
        with tempfile.TemporaryDirectory() as directory, patch.object(store,'DATA',Path(directory)):
            s=build_state(*fixtures())
            with store.connect() as con:
                con.execute('INSERT INTO snapshots VALUES (?, ?, ?)',[s['id'],s['created_at'],json.dumps(s)])
            self.assertEqual(store.history()[0]['id'],s['id'])
            self.assertEqual(store.read_state(s['id'])['id'],s['id'])
            self.assertIsNone(store.read_state("' OR 1=1 --"))

    def test_source_failure_is_unavailable(self) -> None:
        with patch.object(store,'fetch',side_effect=OSError('offline')):
            value,receipt=store.acquire(store.SOURCES[1])
        self.assertIsNone(value)
        self.assertEqual(receipt['status'],'unavailable')
        self.assertIsNone(receipt['retrieved_at'])
        self.assertIsNone(receipt['sha256'])


if __name__=='__main__':unittest.main()
