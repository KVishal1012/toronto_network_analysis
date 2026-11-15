"""Regression tests for ingestion safeguards, evidence and publication boundaries."""
import gzip
import hashlib
import json
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from unittest.mock import patch

from openpyxl import Workbook
from shapely.geometry import box

from scripts.acquire_energy import acquire, workbook_counts
from scripts.build_energy import (METRICS, cohort_metric, facility_evidence, group_rows,
                                  meter_evidence, number, ontario, read_sheet)
from scripts.package_energy import package_energy


def reading(uid='1', start='2024-01-01', end='2024-02-01', **changes):
    return {'_row': 2, 'Portfolio Manager ID': '11', 'Portfolio Manager Meter ID': '22',
            'Meter Consumption ID': uid, 'Start Date': start, 'End Date': end,
            'Meter Type': 'Electric - Grid', 'Usage Units': 'kWh (thousand Watt-hours)',
            'Usage/Quantity': 100, 'Estimation?': 'No', **changes}


class EnergyTests(unittest.TestCase):
    def test_unknown_invalid_and_zero_numbers(self):
        for value in (None, '', 'Not Available', float('nan'), 'inf', -1, True):
            self.assertIsNone(number(value))
        self.assertEqual(number('1,234.5'), 1234.5)
        self.assertEqual(number(0), 0)

    def test_duplicate_and_conflicting_identifiers_are_accounted(self):
        rows = [{'_row': 2, 'id': 1, 'v': 5}, {'_row': 3, 'id': 1, 'v': 5},
                {'_row': 4, 'id': 2, 'v': 5}, {'_row': 5, 'id': 2, 'v': 6},
                {'_row': 6, 'id': None, 'v': 5}]
        accepted, outcomes = group_rows(rows, 'id')
        self.assertEqual(len(accepted), 1)
        self.assertEqual([o['outcome'] for o in outcomes].count('conflicting_identifier'), 2)
        self.assertEqual(len(outcomes), 5)

    def test_water_zeros_unknown_and_cohorts_not_spatial_building_matches(self):
        row = {'_row': 2, 'EWRB_ID': 123456, 'City': 'Toronto', 'Postal_Code': 'M5V',
               'PrimPropTypCalc': 'Office', **{m[0]: 0 for m in METRICS.values()}}
        cohorts, members, outcomes = ontario([row], 2024)
        record = next(iter(members.values()))[0]
        self.assertIsNone(record['metrics']['water'])
        self.assertEqual(record['metrics']['site_eui'], 0)
        self.assertNotIn('location', record)
        self.assertIsNone(cohorts[0]['metrics']['site_eui']['distribution'])
        self.assertEqual(outcomes[0]['outcome'], 'included')

    def test_quantiles_missing_values_and_minimum_sample(self):
        def records(values):
            return [{'metrics': {'x': v}, 'flags': {'x': []}, 'quality_checker': 'No'} for v in values]
        self.assertIsNone(cohort_metric(records(list(range(9))), 'x')['distribution'])
        stats = cohort_metric(records(list(range(10)) + [None]), 'x')
        self.assertEqual(stats['distribution'], {'q1': 2.25, 'median': 4.5, 'q3': 6.75})
        self.assertEqual(stats['missing'], 1)

    def test_all_overlapping_intervals_are_quarantined_including_containment(self):
        rows = [reading('1', end='2025-01-01'),
                reading('2', start='2024-02-01', end='2024-03-01', _row=3),
                reading('3', start='2024-05-01', end='2024-06-01', _row=4)]
        entries, outcomes = meter_evidence(rows)
        self.assertEqual(entries, [])
        self.assertTrue(all(o['outcome'] == 'overlap_or_meter_identity_conflict' for o in outcomes))

    def test_adjacent_leap_year_intervals_estimates_gaps_and_unknown_units(self):
        rows = [reading(), reading('2', start='2024-02-01', end='2024-03-01', _row=3, **{'Estimation?': 'Yes'}),
                reading('3', start='2024-04-01', end='2024-05-01', _row=4, **{'Usage Units': 'unknown'})]
        entries, outcomes = meter_evidence(rows)
        self.assertEqual(len(entries), 2)
        self.assertTrue(entries[1]['estimated'])
        self.assertEqual(outcomes[-1]['outcome'], 'nonenergy_or_unqualified_units')

    def test_invalid_dates_negative_usage_and_conflicting_meter_properties(self):
        rows = [reading(), reading('2', _row=3, **{'Portfolio Manager ID': '12'}),
                reading('3', start='bad', _row=4), reading('4', _row=5, **{'Usage/Quantity': -1})]
        entries, outcomes = meter_evidence(rows)
        self.assertFalse(entries)
        self.assertEqual({o['outcome'] for o in outcomes}, {'overlap_or_meter_identity_conflict', 'invalid_interval', 'invalid_usage'})

    def test_facility_identity_ambiguous_addresses_and_boundary_overlaps(self):
        props = [{'_row': 2, 'Portfolio Manager ID': '11', 'Property Name': 'Library',
                  'Street Address': '1 MAIN ST', 'Property Type - Self-Selected': 'Library'}]
        index = {'1 MAIN ST': [{'id': 'a', 'label': '1 MAIN ST', 'lon': -79.4, 'lat': 43.7}]}
        regions = {'downtown': box(-79.5, 43.6, -79.3, 43.8), 'midtown': box(-79.5, 43.6, -79.3, 43.8)}
        facilities, outcomes, _ = facility_evidence(props, props, [reading()], index, regions)
        self.assertEqual(facilities[0]['regions'], ['downtown', 'midtown'])
        self.assertIsNone(facilities[0]['building_relationship'])
        self.assertIsNone(facilities[0]['meters'][0]['annual_total'])
        index['1 MAIN ST'].append({'id': 'b', 'lon': -79.41, 'lat': 43.7})
        facilities, outcomes, _ = facility_evidence(props, props, [reading()], index, regions)
        self.assertFalse(facilities)
        self.assertEqual(outcomes['properties'][0]['outcome'], 'ambiguous_address')

    def test_schema_drift_and_truncated_workbooks_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'book.xlsx'
            book = Workbook(); book.active.append(['id']); book.active.append([1]); book.save(path)
            self.assertEqual(workbook_counts(path), {'Sheet': 2})
            with self.assertRaisesRegex(ValueError, 'schema'):
                read_sheet(path, None, {'required'})
            path.write_bytes(path.read_bytes()[:50])
            with self.assertRaises(Exception):
                workbook_counts(path)

    def test_failed_download_or_changed_reread_never_activates_baseline(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); baseline = root / 'latest.json'; baseline.write_text('{"id":"old"}')
            with patch('scripts.acquire_energy.fetch', side_effect=OSError('interrupted')):
                with self.assertRaises(OSError):
                    acquire(root / 'staging', 2024)
            receipt = json.loads((root / 'staging/acquisition.json').read_text())
            self.assertTrue(receipt['failures'])
            self.assertNotIn('complete', receipt)
            self.assertEqual(json.loads(baseline.read_text())['id'], 'old')
            def changed_fetch(url, directory):
                if 'package_show' in url:
                    payload = {'success': True, 'result': {'resources': [
                        {'name': '2024', 'url': 'https://data.ontario.ca/data.xlsx', 'id': 'source'},
                        {'name': 'Data Dictionary', 'url': 'https://data.ontario.ca/dict.xlsx', 'id': 'dictionary'}]}}
                    (directory/'metadata').write_text(json.dumps(payload))
                    return {'path': 'metadata'}
                changed_fetch.calls += 1
                return {'path': 'book', 'sha256': str(changed_fetch.calls)}
            changed_fetch.calls = 0
            with patch('scripts.acquire_energy.fetch', side_effect=changed_fetch), patch('scripts.acquire_energy.workbook_counts', return_value={'Sheet1': 12}):
                with self.assertRaisesRegex(ValueError, 'Unstable'):
                    acquire(root/'changed', 2024)
            self.assertNotIn('complete', json.loads((root/'changed/acquisition.json').read_text()))
            self.assertEqual(json.loads(baseline.read_text())['id'], 'old')

    def test_energy_packaging_rejects_unreviewed_bytes_and_excludes_workbooks(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp); source = root / 'source'; version = 'a' * 20
            d = source / version; d.mkdir(parents=True)
            payload = b'[]'; packed = gzip.compress(payload, mtime=0)
            (d/'cohorts.json.gz').write_bytes(packed)
            manifest = {'id': version, 'schema': 1, 'assets': {'cohorts': hashlib.sha256(payload).hexdigest()}, 'accounting': {'a': {'input': 1, 'accounted': 1}}}
            (d/'manifest.json').write_text(json.dumps(manifest)); (source/'latest.json').write_text(json.dumps({'id': version}))
            contract = {'status': 'qualified_field_limited_derivatives', 'evidence_files': [], 'versions': {version: {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in d.iterdir()}}}
            docs = root/'docs/energy'; docs.mkdir(parents=True); (docs/'rights-contract.json').write_text(json.dumps(contract))
            result = package_energy(source, root/'out', root)
            self.assertTrue(result['available'])
            self.assertFalse(list((root/'out').rglob('*.xlsx')))
            (d/'raw.xlsx').write_bytes(b'private')
            with self.assertRaisesRegex(ValueError, 'Unreviewed'):
                package_energy(source, root/'other', root)


if __name__ == '__main__':
    unittest.main()
