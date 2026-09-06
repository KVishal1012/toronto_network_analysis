from __future__ import annotations

import unittest

import geopandas as gpd
from shapely.geometry import LineString

from src.network import build_street_graph, summarize_network


class NetworkTests(unittest.TestCase):
    def setUp(self) -> None:
        self.edges = gpd.GeoDataFrame(
            {
                "centerline_id": [1, 2, 3],
                "from_intersection_id": [10, 11, 12],
                "to_intersection_id": [11, 12, 13],
                "oneway_desc": [
                    "Not One-Way",
                    "Follow-Digitization",
                    "Against-Digitization",
                ],
                "length_m": [100.0, 50.0, 25.0],
                "street_label": ["A", "B", "C"],
                "feature_desc": ["Local", "Local", "Local"],
            },
            geometry=[
                LineString([(0, 0), (100, 0)]),
                LineString([(100, 0), (150, 0)]),
                LineString([(150, 0), (175, 0)]),
            ],
            crs="EPSG:26917",
        )

    def test_graph_respects_one_way_direction(self) -> None:
        graph = build_street_graph(self.edges)

        self.assertTrue(graph.has_edge(10, 11, key=1))
        self.assertTrue(graph.has_edge(11, 10, key=1))
        self.assertTrue(graph.has_edge(11, 12, key=2))
        self.assertFalse(graph.has_edge(12, 11, key=2))
        self.assertTrue(graph.has_edge(13, 12, key=3))
        self.assertFalse(graph.has_edge(12, 13, key=3))

    def test_summary_does_not_double_count_two_way_length(self) -> None:
        report = summarize_network(build_street_graph(self.edges))

        self.assertEqual(report.nodes, 4)
        self.assertEqual(report.directed_edges, 4)
        self.assertEqual(report.source_segments, 3)
        self.assertEqual(report.one_way_source_segments, 2)
        self.assertAlmostEqual(report.total_source_length_km, 0.175)
        self.assertEqual(report.largest_component_pct, 100.0)

    def test_against_digitization_self_loop_is_retained_once(self) -> None:
        loop = self.edges.iloc[[2]].copy()
        loop["to_intersection_id"] = loop["from_intersection_id"]
        loop["geometry"] = [LineString([(150, 0), (160, 10), (150, 0)])]

        graph = build_street_graph(loop)
        report = summarize_network(graph)

        self.assertEqual(report.source_segments, 1)
        self.assertEqual(report.directed_edges, 1)
        self.assertEqual(report.self_loop_source_segments, 1)

    def test_unknown_one_way_description_fails_closed(self) -> None:
        unknown = self.edges.iloc[[0]].copy()
        unknown["oneway_desc"] = "Unknown"

        with self.assertRaisesRegex(ValueError, "unknown one-way descriptions"):
            build_street_graph(unknown)


if __name__ == "__main__":
    unittest.main()
