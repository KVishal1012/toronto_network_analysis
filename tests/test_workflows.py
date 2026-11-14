"""Synthetic contract tests; no fixtures are written to the product store."""
import copy
import json
import tempfile
import time
import unittest
from pathlib import Path
from unittest.mock import patch
from test_engine import fixtures, NOW
from server.engine import build_state, present_state, scenario
from server.ranking import rank_availability
from server import store
from server.updates import Updates


class RankingTests(unittest.TestCase):
    def test_denominator_zero_and_offline(self) -> None:
        args=fixtures()
        args[2]['data']['stations'][0]['is_renting']=0
        state=present_state(build_state(*args),NOW)
        ranked=rank_availability(state)
        self.assertEqual(ranked['rows'][0]['available_bikes'],3)
        self.assertEqual(ranked['rows'][0]['bikes_per_station'],1.5)
        self.assertEqual(ranked['excluded'][0]['reason'],'No stations; ratio undefined')

    def test_missing_stale_future_and_rejected_are_not_zero(self) -> None:
        for mode in ['missing','stale','future','invalid_location']:
            args=fixtures()
            if mode=='missing': args[2]['data']['stations'][0]['num_bikes_available']=None
            if mode=='stale': args[2]['last_updated']=NOW-301
            if mode=='future': args[1]['last_updated']=NOW+61
            if mode=='invalid_location': args[1]['data']['stations'][0]['lat']=None
            with self.subTest(mode=mode):
                self.assertEqual(rank_availability(present_state(build_state(*args),NOW))['rows'],[])

    def test_equal_ratios_share_rank_and_inputs_unchanged(self) -> None:
        args=fixtures();args[1]['data']['stations'][1]['lon']=-79.35
        state=present_state(build_state(*args),NOW);before=copy.deepcopy(state)
        rows=rank_availability(state)['rows']
        self.assertEqual([r['rank'] for r in rows],[1,1])
        self.assertEqual([r['id'] for r in rows],['001','002'])
        self.assertEqual(state,before)


class UpdateTests(unittest.TestCase):
    def test_acquisition_failure_and_pause_are_visible(self) -> None:
        updates=Updates()
        with patch('server.updates.refresh',side_effect=OSError('offline')):
            with self.assertRaises(OSError):updates.run_once()
        self.assertFalse(updates.status()['running'])
        self.assertIsNotNone(updates.status()['last_error'])
        self.assertIsNone(updates.status()['last_completed_at'])
        self.assertFalse(updates.configure(False)['enabled'])
        with self.assertRaises(ValueError): updates.configure('true')

    def test_throttle_no_overlapping_ingestion(self) -> None:
        updates=Updates()
        with patch('server.updates.refresh',return_value={'id':'real-test','sources':[]}) as call:
            updates.run_once()
            with self.assertRaises(ValueError): updates.run_once()
            self.assertEqual(call.call_count,1)
        updates.lock.acquire()
        try:
            with self.assertRaises(ValueError): updates.run_once()
        finally: updates.lock.release()


class ReviewTests(unittest.TestCase):
    def test_review_is_separate_and_stale_review_rejected(self) -> None:
        args=fixtures();now=int(time.time())
        args[1]['last_updated']=args[2]['last_updated']=now
        for row in args[2]['data']['stations']:row['last_reported']=now
        for receipt in args[3]:receipt['observed_at']=now
        stored=build_state(*args)
        with tempfile.TemporaryDirectory() as directory,patch.object(store,'DATA',Path(directory)):
            with store.connect() as con:
                con.execute('INSERT INTO snapshots VALUES (?, ?, ?)',[stored['id'],stored['created_at'],json.dumps(stored)])
            evaluated=store.save_scenario(scenario(present_state(stored),['a']))
            review=store.review_scenario(evaluated['id'],'Test reviewer','Checked inventory-only assumptions.')
            self.assertFalse(review['actuation'])
            with store.connect() as con:
                self.assertEqual(json.loads(con.execute('SELECT payload FROM snapshots').fetchone()[0]),stored)
                self.assertEqual(con.execute('SELECT count(*) FROM scenario_reviews').fetchone()[0],1)
            with patch('server.store.read_state',return_value=present_state(stored,now+301)):
                with self.assertRaises(ValueError):store.review_scenario(evaluated['id'],'Test reviewer','Stale baseline must fail.')
            with self.assertRaises(ValueError):store.review_scenario(evaluated['id'],'','No reviewer must fail.')


if __name__=='__main__':unittest.main()
