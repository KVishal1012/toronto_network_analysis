from copy import deepcopy
from io import StringIO
from pathlib import Path
from unittest.mock import patch
import json
import unittest

import networkx as nx

from src.topology import (
    load_reviewed_crossing_groups,
    split_reviewed_crossings,
)


class TopologyTests(unittest.TestCase):
    def test_split_does_not_modify_input_graph(self) -> None:
        """Splitting returns a new graph and leaves the source unchanged."""
        graph = nx.MultiDiGraph(crs="EPSG:26917")
        graph.add_node(
            100,
            x=500.0,
            y=500.0,
            endpoint_spread_m=0.2,
        )

        # Two roads incorrectly share source node 100.
        segments = [
            (1, 100, 11),
            (100, 2, 12),
            (3, 100, 21),
            (100, 4, 22),
        ]

        for start, end, segment_id in segments:
            graph.add_edge(
                start,
                end,
                key=segment_id,
                source_centerline_id=segment_id,
                length_m=50.0,
            )

        groups = {
            100: {
                "bridge": {11, 12},
                "road_below": {21, 22},
            }
        }

        # Independent snapshot: changes to graph cannot alter this copy.
        before = deepcopy(graph)

        result = split_reviewed_crossings(graph, groups)

        self.assertIsNot(result, graph)
        self.assertTrue(nx.utils.graphs_equal(graph, before))

        # Confirm a split actually occurred in the returned graph.
        self.assertIn(100, graph)
        self.assertNotIn(100, result)
        self.assertIn((100, "bridge"), result)
        self.assertIn((100, "road_below"), result)

    def test_split_preserves_roads_and_blocks_level_switches(self) -> None:
        """Keep each road connected without allowing transfers between levels."""
        graph = nx.MultiDiGraph()

        segments = [
            (1, 100, 11),
            (100, 2, 12),
            (3, 100, 21),
            (100, 4, 22),
        ]

        for start, end, segment_id in segments:
            graph.add_edge(
                start,
                end,
                key=segment_id,
                source_centerline_id=segment_id,
            )

        groups = {
            100: {
                "bridge": {11, 12},
                "road_below": {21, 22},
            }
        }

        # Demonstrate the false transfers before correction.
        self.assertTrue(nx.has_path(graph, 1, 4))
        self.assertTrue(nx.has_path(graph, 3, 2))

        result = split_reviewed_crossings(graph, groups)

        # Each road must remain continuous through its own split node.
        self.assertTrue(
            nx.is_path(result, [1, (100, "bridge"), 2])
        )
        self.assertTrue(
            nx.is_path(result, [3, (100, "road_below"), 4])
        )

        # This isolated fixture has no legitimate alternative connections.
        self.assertFalse(nx.has_path(result, 1, 4))
        self.assertFalse(nx.has_path(result, 3, 2))
    def test_split_preserves_directed_keyed_edges(self) -> None:
        """Preserve directions, parallel edges, keys and all edge attributes."""
        graph = nx.MultiDiGraph()

        # One-way bridge, including two parallel segments.
        # The road below has edges in both directions.
        segments = [
            (1, 100, 11, "bridge"),
            (1, 100, 13, "bridge"),
            (100, 2, 12, "bridge"),
            (3, 100, 21, "road_below"),
            (100, 3, 21, "road_below"),
            (100, 4, 22, "road_below"),
            (4, 100, 22, "road_below"),
        ]

        expected = {}

        for start, end, segment_id, road_group in segments:
            # Deliberately different from the numeric source ID.
            key = f"segment-{segment_id}"
            attributes = {
                "source_centerline_id": segment_id,
                "length_m": float(segment_id),
                "street_label": road_group,
            }

            graph.add_edge(start, end, key=key, **attributes)

            new_start = (100, road_group) if start == 100 else start
            new_end = (100, road_group) if end == 100 else end
            expected[new_start, new_end, key] = attributes

        result = split_reviewed_crossings(
            graph,
            {
                100: {
                    "bridge": {11, 12, 13},
                    "road_below": {21, 22},
                }
            },
        )

        actual = {
            (start, end, key): dict(attributes)
            for start, end, key, attributes
            in result.edges(keys=True, data=True)
        }

        self.assertEqual(actual, expected)
        self.assertEqual(result.number_of_edges(), 7)

    def test_invalid_assignments_are_rejected(self) -> None:
        """Reject missing, overlapping and unrelated segment assignments."""
        graph = nx.MultiDiGraph()
        graph.add_edge(1, 100, key=11, source_centerline_id=11)
        graph.add_edge(100, 2, key=21, source_centerline_id=21)

        before = deepcopy(graph)

        invalid_cases = {
            "missing_segment": {
                "bridge": {11},
            },
            "overlapping_segment": {
                "bridge": {11},
                "road_below": {11, 21},
            },
            "unrelated_segment": {
                "bridge": {11},
                "road_below": {21, 99},
            },
        }

        for label, road_groups in invalid_cases.items():
            with self.subTest(case=label):
                with self.assertRaisesRegex(
                    ValueError,
                    "Invalid assignments for 100",
                ):
                    split_reviewed_crossings(
                        graph,
                        {100: road_groups},
                    )

                self.assertTrue(
                    nx.utils.graphs_equal(graph, before)
                )
    def test_segment_between_two_reviewed_crossings(self) -> None:
        """Remap both endpoints of a segment shared by reviewed crossings."""
        graph = nx.MultiDiGraph()

        segments = [
            (1, 100, 11),
            (100, 200, 12),  # Connects two reviewed crossings.
            (200, 2, 13),
            (3, 100, 21),
            (100, 4, 22),
            (5, 200, 31),
            (200, 6, 32),
        ]

        for start, end, segment_id in segments:
            graph.add_edge(
                start,
                end,
                key=segment_id,
                source_centerline_id=segment_id,
            )

        result = split_reviewed_crossings(
            graph,
            {
                100: {
                    "bridge": {11, 12},
                    "road_below": {21, 22},
                },
                200: {
                    "bridge": {12, 13},
                    "road_below": {31, 32},
                },
            },
        )

        self.assertTrue(
            result.has_edge(
                (100, "bridge"),
                (200, "bridge"),
                key=12,
            )
        )
        self.assertTrue(
            nx.is_path(
                result,
                [1, (100, "bridge"), (200, "bridge"), 2],
            )
        )
        self.assertTrue(
            nx.is_path(result, [3, (100, "road_below"), 4])
        )
        self.assertTrue(
            nx.is_path(result, [5, (200, "road_below"), 6])
        )

        self.assertNotIn(100, result)
        self.assertNotIn(200, result)
        self.assertEqual(
            result.number_of_edges(),
            graph.number_of_edges(),
        )
        self.assertEqual(
            result.number_of_nodes(),
            graph.number_of_nodes() + 2,
        )

    def test_load_saved_crossing_register(self) -> None:
        """Load the versioned register without losing endpoint assignments."""
        project_root = Path(__file__).resolve().parents[1]
        groups = load_reviewed_crossing_groups(
            project_root / "config" / "reviewed_crossings.v1.json"
        )

        self.assertEqual(len(groups), 6)
        self.assertEqual(
            sum(len(roads) for roads in groups.values()),
            12,
        )

        segments = [
            segment
            for roads in groups.values()
            for ids in roads.values()
            for segment in ids
        ]

        self.assertEqual(len(segments), 25)
        self.assertEqual(len(set(segments)), 24)
        self.assertTrue(
            all(
                isinstance(ids, set)
                for roads in groups.values()
                for ids in roads.values()
            )
        )

        # The same segment may be assigned at two different endpoints.
        self.assertIn(1141001, groups[13462475]["viaduct"])
        self.assertIn(1141001, groups[13462471]["viaduct"])

    def test_loader_rejects_duplicate_segment_assignments(self) -> None:
        """Reject duplicates within a group and overlaps between groups."""
        cases = {
            "within_group": {
                "bridge": [11, 11],
                "road_below": [21],
            },
            "across_groups": {
                "bridge": [11],
                "road_below": [11, 21],
            },
        }

        for label, roads in cases.items():
            with self.subTest(case=label):
                register = {
                    "schema_version": 1,
                    "review_status": "reviewed_prototype",
                    "crossings": [
                        {
                            "intersection_id": 100,
                            "road_groups": roads,
                        }
                    ],
                }

                # Supply an in-memory file; don't alter the real register.
                with patch(
                    "pathlib.Path.open",
                    return_value=StringIO(json.dumps(register)),
                ):
                    with self.assertRaisesRegex(
                        ValueError,
                        "duplicate or overlapping segment IDs",
                    ):
                        load_reviewed_crossing_groups("unused.json")


if __name__ == "__main__":
    unittest.main()
