"""Atlas metric semantics, evidence snapshots and fail-closed file exports."""
from copy import deepcopy
from dataclasses import replace
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from src.atlas import export_atlas_entry, summarize_comparison, _payload_digest, _write_new_json
from src.scenario_io import read_json
from src.scenarios import ClosureComparison, PairImpact

ROOT = Path(__file__).resolve().parents[1]


def comparison() -> ClosureComparison:
    """Four hand-calculated outcomes, with one undefined route in each state."""
    return ClosureComparison((
        PairImpact(1, 2, 'already_unreachable', None, None, None),
        PairImpact(1, 3, 'newly_unreachable', 10.0, None, None),
        PairImpact(1, 4, 'longer', 10.0, 25.0, 15.0),
        PairImpact(1, 5, 'unchanged', 20.0, 20.0, 0.0),
    ), (10,), 2, 2, 3, 1, 2)


class AtlasTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.folder = Path(self.temp.name)
        self.spec = read_json(ROOT / 'config/scenarios/viaduct_don_crossing.v1.json')
        self.scenario = self.folder / 'scenario.json'
        self.scenario.write_text(json.dumps(self.spec), encoding='utf-8')
        self.population = self.folder / 'population.json'
        self.population.write_text(json.dumps({'pairs': [[1, d] for d in range(2, 6)]}), encoding='utf-8')
        self.output = self.folder / 'entry.v1.json'
        self.result = replace(comparison(), removed_source_ids=tuple(self.spec['source_centerline_ids']),
                              removed_directed_edges=self.spec['audit']['selected_directed_arcs'])

    def export(self) -> dict:
        return export_atlas_entry(self.scenario, self.population, ROOT, self.output)

    def test_denominators_and_undefined_distances(self) -> None:
        summary = summarize_comparison(comparison())
        self.assertEqual(summary['counts']['total_pairs'], 4)
        self.assertEqual(summary['reachable_open_pairs'], 3)
        self.assertEqual(summary['affected_pairs'], 2)
        self.assertAlmostEqual(summary['affected_pct_of_reachable_open'], 200 / 3)
        self.assertEqual(summary['reachable_both_pairs'], 2)
        self.assertEqual(summary['longer_pairs_extra_distance_m'],
                         {'denominator_pairs': 1, 'median': 15.0, 'maximum': 15.0})

    def test_no_reachable_pairs_and_no_longer_pairs_use_null(self) -> None:
        base = comparison()
        summary = summarize_comparison(replace(base, pairs=base.pairs[:1]))
        self.assertIsNone(summary['affected_pct_of_reachable_open'])
        self.assertIsNone(summary['newly_unreachable_pct_of_reachable_open'])
        self.assertIsNone(summary['longer_pairs_extra_distance_m']['median'])
        unchanged = summarize_comparison(replace(base, pairs=base.pairs[3:]))
        self.assertEqual(unchanged['affected_pct_of_reachable_open'], 0)
        self.assertIsNone(unchanged['longer_pairs_extra_distance_m']['maximum'])

    def test_invalid_results_rejected(self) -> None:
        base = comparison()
        with self.assertRaises(ValueError):
            summarize_comparison(replace(base, pairs=()))
        for pair in [replace(base.pairs[2], extra_length_m=float('nan')),
                     replace(base.pairs[2], closed_length_m=float('inf')),
                     replace(base.pairs[2], extra_length_m=2),
                     replace(base.pairs[2], closed_length_m=5),
                     replace(base.pairs[0], closed_length_m=1),
                     replace(base.pairs[3], status='unknown')]:
            with self.subTest(pair=pair), self.assertRaises(ValueError):
                summarize_comparison(replace(base, pairs=(pair,)))

    def test_export_roundtrip_integrity_and_unchanged_inputs(self) -> None:
        before = self.scenario.read_bytes(), self.population.read_bytes()
        with patch('src.atlas.run_saved_scenario', return_value={'baseline': self.result, 'reviewed': self.result}) as runner:
            entry = self.export()
        runner.assert_called_once_with(self.scenario, self.population, ROOT)
        self.assertEqual(read_json(self.output), entry)
        self.assertEqual(before, (self.scenario.read_bytes(), self.population.read_bytes()))
        content = deepcopy(entry)
        digest = content.pop('entry_sha256')
        self.assertEqual(digest, _payload_digest(content))
        self.assertFalse(entry['public_release_ready'])
        self.assertFalse(entry['cross_scenario_ranking_ready'])
        self.assertEqual(entry['scenario_snapshot']['boundary_approval'], self.spec['boundary_approval'])
        self.assertIsNone(entry['cases']['reviewed']['pairs'][1]['closed_length_m'])

    def test_existing_output_refused_before_running(self) -> None:
        self.output.write_text('keep', encoding='utf-8')
        with patch('src.atlas.run_saved_scenario') as runner, self.assertRaises(FileExistsError):
            self.export()
        runner.assert_not_called()
        self.assertEqual(self.output.read_text(encoding='utf-8'), 'keep')

    def test_disabled_approval_refused_before_running(self) -> None:
        self.spec['enabled'] = False
        self.scenario.write_text(json.dumps(self.spec), encoding='utf-8')
        with patch('src.atlas.run_saved_scenario') as runner, self.assertRaises(ValueError):
            self.export()
        runner.assert_not_called()
        self.assertFalse(self.output.exists())

    def test_runner_failures_leave_no_artifact(self) -> None:
        with patch('src.atlas.run_saved_scenario', side_effect=ValueError('Source mismatch')):
            with self.assertRaises(ValueError):
                self.export()
        self.assertFalse(self.output.exists())

    def test_reordered_pairs_or_wrong_removal_refused(self) -> None:
        for invalid in [replace(self.result, pairs=tuple(reversed(self.result.pairs))),
                        replace(self.result, removed_directed_edges=999)]:
            with patch('src.atlas.run_saved_scenario', return_value={'baseline': self.result, 'reviewed': invalid}):
                with self.assertRaises(ValueError):
                    self.export()
            self.assertFalse(self.output.exists())

    def test_changed_input_during_run_refused(self) -> None:
        def mutate(*args: object) -> dict:
            self.population.write_text('{}', encoding='utf-8')
            return {'baseline': self.result, 'reviewed': self.result}
        with patch('src.atlas.run_saved_scenario', side_effect=mutate), self.assertRaises(ValueError):
            self.export()
        self.assertFalse(self.output.exists())

    def test_atomic_writer_refuses_replacement_and_nonfinite_json(self) -> None:
        _write_new_json({'ok': True}, self.output)
        with self.assertRaises(FileExistsError):
            _write_new_json({'replace': True}, self.output)
        self.assertEqual(read_json(self.output), {'ok': True})
        self.assertEqual(list(self.folder.glob('.atlas-*.tmp')), [])
        with self.assertRaises(ValueError):
            _write_new_json({'bad': float('nan')}, self.folder / 'bad.json')
        self.assertFalse((self.folder / 'bad.json').exists())


if __name__ == '__main__':
    unittest.main()
