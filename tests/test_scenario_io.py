"""Approval, source and population gates on synthetic data only."""
from copy import deepcopy
import hashlib
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

import geopandas as gpd
from shapely.geometry import LineString

from src.scenario_io import (definition_sha256, freeze_population, load_scenario,
                             prepare_scenario, read_json, run_saved_scenario, save_population)


class ScenarioIOTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        points = {1: (0, 0), 2: (1, 0), 3: (2, 0), 4: (1, -1),
                  5: (1, 1), 6: (-1, 0), 7: (3, 0)}
        records = []
        for sid, a, b in [(10, 1, 2), (11, 2, 3), (12, 4, 2),
                          (13, 2, 5), (20, 6, 1), (21, 3, 7)]:
            records.append(dict(centerline_id=sid, from_intersection_id=a,
                                to_intersection_id=b, length_m=1.0,
                                oneway_desc='Not One-Way', street_label='synthetic',
                                geometry=LineString([points[a], points[b]])))
        self.edges = gpd.GeoDataFrame(records, crs='EPSG:26917')
        source_hashes = {}
        for suffix in ('shp', 'shx', 'dbf', 'prj', 'cpg'):
            name = f'streets.{suffix}'
            (self.root / name).write_text('synthetic pinned fixture', encoding='utf-8')
            source_hashes[name] = hashlib.sha256((self.root / name).read_bytes()).hexdigest()
        register = {'schema_version': 1, 'review_status': 'reviewed_prototype',
                    'crossings': [{'intersection_id': 2, 'road_groups': {'deck': [10, 11], 'lower': [12, 13]}}]}
        self.register = self.root / 'crossings.json'
        self.register.write_text(json.dumps(register), encoding='utf-8')
        self.spec = dict(schema_version=1, scenario_id='synthetic', enabled=False,
                         status='candidate_unvalidated', boundary_approval=None,
                         operation='remove_all_directed_arcs_matching_explicit_source_centerline_ids',
                         source_centerline_ids=[10, 11], protected_source_centerline_ids=[12, 13, 20, 21],
                         west_boundary_intersection_id=1, east_boundary_intersection_id=3,
                         reviewed_deck_group_by_intersection={'2': 'deck'},
                         geometry_crs='EPSG:26917', reviewed_crossings_path='crossings.json',
                         audit=dict(chain_node_ids_west_to_east=[1, 2, 3], selected_source_segments=2,
                                    selected_directed_arcs=4, total_length_m=2.0,
                                    source_sha256=source_hashes,
                                    register_sha256=hashlib.sha256(self.register.read_bytes()).hexdigest(),
                                    segments=[], retained_incident_segments=[]))
        for record in records:
            if record['centerline_id'] in [10, 11]:
                item = {k: record[k] for k in ('centerline_id', 'from_intersection_id', 'to_intersection_id', 'length_m', 'oneway_desc')}
                item.update(start_xy_m=list(record['geometry'].coords[0]), end_xy_m=list(record['geometry'].coords[-1]))
                self.spec['audit']['segments'].append(item)
            else:
                self.spec['audit']['retained_incident_segments'].append({k: record[k] for k in ('centerline_id', 'from_intersection_id', 'to_intersection_id', 'street_label')})
        self.path = self.root / 'scenario.json'
        self.write_spec()
        # Mock the geospatial reader only; hashes, graph builder and splitter run.
        self.reader = patch('src.scenario_io.prepare_street_edges', return_value=(self.edges, None))
        self.reader.start()
        self.addCleanup(self.reader.stop)

    def write_spec(self) -> None:
        self.path.write_text(json.dumps(self.spec), encoding='utf-8')

    def approve_synthetic_fixture(self) -> None:
        self.spec.update(enabled=True, status='approved', boundary_approval={
            'reviewer': 'Synthetic test only', 'reviewed_at': '2026-10-03',
            'boundary_description': 'Toy chain 1 to 3',
            'evidence': [{'reference': 'synthetic fixture', 'finding': 'Known toy topology'}],
            'definition_sha256': definition_sha256(self.spec)})
        self.write_spec()

    def test_disabled_or_unapproved_never_reaches_graph_preparation(self) -> None:
        for enabled, status in [(False, 'candidate_unvalidated'), (True, 'candidate_unvalidated'), (False, 'approved')]:
            self.spec.update(enabled=enabled, status=status)
            self.write_spec()
            with patch('src.scenario_io.prepare_scenario') as prepare:
                with self.assertRaises(ValueError):
                    run_saved_scenario(self.path, self.root / 'missing.json', self.root)
                prepare.assert_not_called()

    def test_approval_required_and_bound_to_definition(self) -> None:
        self.spec.update(enabled=True, status='approved')
        self.write_spec()
        with self.assertRaises(ValueError):
            load_scenario(self.path)
        self.approve_synthetic_fixture()
        self.assertTrue(load_scenario(self.path)['enabled'])
        self.spec['scenario_id'] = 'changed'
        self.write_spec()
        with self.assertRaisesRegex(ValueError, 'stale'):
            load_scenario(self.path)

    def test_bad_approval_evidence(self) -> None:
        self.approve_synthetic_fixture()
        for field, value in [('reviewer', ''), ('reviewed_at', 'not-a-date'), ('evidence', [])]:
            original = deepcopy(self.spec)
            self.spec['boundary_approval'][field] = value
            self.write_spec()
            with self.assertRaises(ValueError):
                load_scenario(self.path)
            self.spec = original

    def test_duplicate_keys_and_nonfinite_json(self) -> None:
        for text in ['{"enabled":false,"enabled":true}', '{"x":NaN}', '[]']:
            self.path.write_text(text, encoding='utf-8')
            with self.assertRaises(ValueError):
                read_json(self.path)

    def test_hash_and_path_escape_rejected(self) -> None:
        (self.root / 'streets.dbf').write_text('changed', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'checksum'):
            prepare_scenario(self.path, self.root)
        self.spec['audit']['source_sha256'] = {'../escape.shp': 'a'*64}
        self.write_spec()
        with self.assertRaises(ValueError):
            prepare_scenario(self.path, self.root)

    def test_register_hash_change_rejected(self) -> None:
        self.register.write_text('{}', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'checksum'):
            prepare_scenario(self.path, self.root)

    def test_geometry_direction_and_endpoint_checks(self) -> None:
        for field, value in [('length_m', 99), ('oneway_desc', 'Follow-Digitization'),
                             ('from_intersection_id', 99), ('start_xy_m', [99, 0])]:
            original = deepcopy(self.spec)
            self.spec['audit']['segments'][0][field] = value
            self.write_spec()
            with self.assertRaises(ValueError):
                prepare_scenario(self.path, self.root)
            self.spec = original

    def test_crossing_and_protected_coverage_checks(self) -> None:
        self.spec['reviewed_deck_group_by_intersection']['2'] = 'lower'
        self.write_spec()
        with self.assertRaisesRegex(ValueError, 'assignments'):
            prepare_scenario(self.path, self.root)
        self.spec['reviewed_deck_group_by_intersection']['2'] = 'deck'
        self.spec['protected_source_centerline_ids'].pop()
        self.write_spec()
        with self.assertRaisesRegex(ValueError, 'coverage'):
            prepare_scenario(self.path, self.root)

    def test_candidate_preparation_and_frozen_population_roundtrip(self) -> None:
        prepared = prepare_scenario(self.path, self.root)
        one = freeze_population(prepared, origin_count=2, destination_count=3, additional_exclusions={7: 'test boundary'})
        two = freeze_population(prepared, origin_count=2, destination_count=3, additional_exclusions={7: 'test boundary'})
        self.assertEqual(one, two)
        exclusions = {r['node_id']: r['reasons'] for r in one['excluded_nodes']}
        self.assertIn('closure_interior_vertex', exclusions[2])
        self.assertIn('replaced_crossing_id', exclusions[2])
        self.assertIn(7, exclusions)
        self.assertTrue(all(2 not in p and 7 not in p and p[0] != p[1] for p in one['pairs']))
        out = self.root / 'population.json'
        save_population(one, out)
        self.assertEqual(read_json(out), one)
        with self.assertRaises(FileExistsError):
            save_population(one, out)

    def test_population_dimensions_fail_closed(self) -> None:
        prepared = prepare_scenario(self.path, self.root)
        for kwargs in [dict(origin_count=101), dict(origin_count=True), dict(origin_count=1, destination_count=999), dict(seed=True), dict(additional_exclusions={999: 'bad'})]:
            with self.subTest(kwargs=kwargs), self.assertRaises(ValueError):
                freeze_population(prepared, **kwargs)

    def test_approved_synthetic_run_and_tampered_population(self) -> None:
        population = freeze_population(prepare_scenario(self.path, self.root), origin_count=3, destination_count=4)
        out = self.root / 'population.json'
        save_population(population, out)
        self.approve_synthetic_fixture()
        result = run_saved_scenario(self.path, out, self.root)
        self.assertEqual(set(result), {'baseline', 'reviewed'})
        self.assertEqual([(p.origin, p.destination) for p in result['baseline'].pairs],
                         [(p.origin, p.destination) for p in result['reviewed'].pairs])
        for field, value in [('pairs_sha256', 'bad'), ('pairs', [[1, 99]]), ('bindings', {})]:
            altered = deepcopy(population)
            altered[field] = value
            out.write_text(json.dumps(altered), encoding='utf-8')
            with patch('src.scenario_io.compare_topology_cases') as compare:
                with self.assertRaises(ValueError):
                    run_saved_scenario(self.path, out, self.root)
                compare.assert_not_called()


if __name__ == '__main__':
    unittest.main()
