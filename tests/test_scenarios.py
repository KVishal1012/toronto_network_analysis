"""Synthetic scenario checks and the explicitly approved model-scope contract."""
from copy import deepcopy
from pathlib import Path
import unittest

import networkx as nx

from src.scenarios import compare_closure, compare_topology_cases, remove_source_segments
from src.scenario_io import load_scenario


def fixture() -> nx.MultiDiGraph:
    """A short road, longer parallel road, one-way branch and existing island."""
    graph = nx.MultiDiGraph(crs='EPSG:26917', provenance={'tags': ['synthetic']})
    for u, v, source, length in [(1, 2, 10, 1), (2, 1, 10, 1),
                                  (1, 2, 11, 4), (2, 1, 11, 4),
                                  (2, 3, 12, 1), (3, 3, 13, 2)]:
        graph.add_edge(u, v, key=f'arc-{source}', source_centerline_id=source,
                       length_m=length, street_label='Same name', notes=['keep'])
    graph.add_node(99)
    return graph


class ScenarioTests(unittest.TestCase):
    def test_exact_removal_preserves_parallel_roads_and_all_nodes(self) -> None:
        graph = fixture()
        original = deepcopy(graph)
        closed = remove_source_segments(graph, [10], protected_source_ids=[11, 12])
        self.assertTrue(nx.utils.graphs_equal(graph, original))
        self.assertEqual(set(closed), set(graph))
        self.assertEqual(closed.number_of_edges(), graph.number_of_edges() - 2)
        for u, v, k, data in graph.edges(keys=True, data=True):
            if data['source_centerline_id'] != 10:
                self.assertEqual(closed[u][v][k], data)
        closed.graph['provenance']['tags'].append('changed')
        closed[1][2]['arc-11']['notes'].append('changed')
        self.assertTrue(nx.utils.graphs_equal(graph, original))

    def test_one_way_and_loop_removal(self) -> None:
        closed = remove_source_segments(fixture(), [12, 13])
        self.assertEqual(closed.number_of_edges(), 4)
        self.assertEqual(closed.degree(3), 0)

    def test_reject_invalid_ids_without_mutation(self) -> None:
        for selected, protected in [([], []), ([10, 10], []), ([True], []),
                                     ([0], []), (['10'], []), ([999], []),
                                     ([10], [10]), ([10], [999]), ([10], [11, 11])]:
            with self.subTest(selected=selected, protected=protected):
                graph = fixture()
                original = deepcopy(graph)
                with self.assertRaises(ValueError):
                    remove_source_segments(graph, selected, protected_source_ids=protected)
                self.assertTrue(nx.utils.graphs_equal(graph, original))

    def test_reject_invalid_costs(self) -> None:
        for value in [None, float('nan'), float('inf'), -1, 0, True, '1']:
            with self.subTest(value=value):
                graph = fixture()
                graph[1][2]['arc-11']['length_m'] = value
                with self.assertRaises(ValueError):
                    compare_closure(graph, [10], [(1, 2)])

    def test_reject_missing_metadata_and_nonmetric_graphs(self) -> None:
        for crs in [None, 'EPSG:4326', 'EPSG:2263', 'bad-crs']:
            graph = fixture()
            graph.graph['crs'] = crs
            with self.assertRaises(ValueError):
                remove_source_segments(graph, [10])
        graph = fixture()
        del graph[1][2]['arc-11']['source_centerline_id']
        with self.assertRaises(ValueError):
            remove_source_segments(graph, [10])
        with self.assertRaises(ValueError):
            remove_source_segments(nx.Graph(), [10])

    def test_hand_calculated_longer_and_already_unreachable(self) -> None:
        result = compare_closure(fixture(), [10], [(1, 3), (3, 1), (1, 99), (2, 3)])
        self.assertEqual((result.pairs[0].open_length_m, result.pairs[0].closed_length_m), (2, 5))
        self.assertEqual(result.pairs[0].extra_length_m, 3)
        self.assertEqual(result.counts, dict(longer=1, unchanged=1,
                         already_unreachable=2, newly_unreachable=0, total_pairs=4))
        self.assertIsNone(result.pairs[1].extra_length_m)

    def test_unreachable_pairs_are_not_dropped_or_given_zero_cost(self) -> None:
        result = compare_closure(fixture(), [10, 11], [(1, 3), (2, 1), (3, 1)])
        self.assertEqual(result.counts['newly_unreachable'], 2)
        self.assertEqual(result.counts['already_unreachable'], 1)
        self.assertIsNone(result.pairs[0].closed_length_m)
        self.assertIsNone(result.pairs[0].extra_length_m)
        self.assertEqual(result.open_weak_components, 2)
        self.assertEqual(result.closed_weak_components, 3)
        self.assertEqual((result.open_isolates, result.closed_isolates), (1, 2))

    def test_invalid_od_populations_fail(self) -> None:
        for pairs in [[], [(1, 1)], [(1, 3), (1, 3)], [(1, 999)], [[1, 3]], [([1], 3)]]:
            with self.subTest(pairs=pairs), self.assertRaises(ValueError):
                compare_closure(fixture(), [10], pairs)

    def test_shared_population_and_tuple_nodes(self) -> None:
        graph = nx.relabel_nodes(fixture(), {2: (2, 'deck')})
        result = compare_closure(graph, [10], [(1, (2, 'deck'))])
        self.assertEqual(result.pairs[0].extra_length_m, 3)
        with self.assertRaises(ValueError):
            compare_topology_cases(fixture(), graph, [10], [(1, 2)])
        cases = compare_topology_cases(fixture(), graph, [10], [(1, 3), (3, 1)])
        self.assertEqual(cases['baseline'].pairs, cases['reviewed'].pairs)

    def test_reviewed_crossing_cannot_transfer_between_levels(self) -> None:
        graph = nx.MultiDiGraph(crs='EPSG:26917')
        deck, lower = (5, 'deck'), (5, 'lower')
        for u, v, sid in [(1, deck, 10), (deck, 2, 11), (3, lower, 12), (lower, 4, 13)]:
            graph.add_edge(u, v, source_centerline_id=sid, length_m=1)
        result = compare_closure(graph, [10, 11], [(1, 2), (3, 4), (1, 4)], protected_source_ids=[12, 13])
        self.assertEqual([p.status for p in result.pairs], ['newly_unreachable', 'unchanged', 'already_unreachable'])

    def test_viaduct_approval_is_scoped_to_hypothetical_corridor(self) -> None:
        path = Path(__file__).resolve().parents[1] / 'config/scenarios/viaduct_don_crossing.v1.json'
        # Validates evidence and definition binding, without running any routes.
        spec = load_scenario(path)
        approval = spec['boundary_approval']
        self.assertEqual(approval['scope'], 'hypothetical_selected_centreline_corridor_only')
        self.assertTrue(approval['limitations'])
        self.assertIn('not independently approved', spec['boundary_warning'])
        self.assertEqual(spec['west_boundary_intersection_id'], 13462661)
        self.assertEqual(spec['east_boundary_intersection_id'], 13462430)
        self.assertEqual(spec['source_centerline_ids'], [1141214, 30003678, 30003679,
                         1141117, 30003617, 30003618, 1141008, 1141001, 30096652, 30096653])


if __name__ == '__main__':
    unittest.main()
