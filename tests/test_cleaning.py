from __future__ import annotations

import unittest

import geopandas as gpd
import pandas as pd
from shapely.geometry import LineString

from src.cleaning import prepare_street_edges


class CleaningTests(unittest.TestCase):
    def setUp(self) -> None:
        self.centerline = gpd.GeoDataFrame(
            {
                "CENTREL2": [1, 2],
                "LINEAR_30": ["Main St", "River"],
                "FROM_IN31": [10, 20],
                "TO_INTE32": [11, 21],
                "ONEWAY_34": ["Not One-Way", "Not One-Way"],
                "FEATURE36": ["Local", "River"],
                "ADDRESS6": ["None", "None"],
                "LO_NUM_10": [1.0, float("nan")],
                "HI_NUM_11": [9.0, float("nan")],
                "LO_NUM_12": [2.0, float("nan")],
                "HI_NUM_13": [10.0, float("nan")],
            },
            geometry=[
                LineString([(0, 0), (100, 0)]),
                LineString([(0, 10), (100, 10)]),
            ],
            crs="EPSG:26917",
        )

    def test_preparation_filters_non_streets_and_reports_coverage(self) -> None:
        edges, report = prepare_street_edges(self.centerline, included_features={"Local"})

        self.assertEqual(len(edges), 1)
        self.assertEqual(edges.loc[0, "feature_desc"], "Local")
        self.assertTrue(pd.isna(edges.loc[0, "address_l"]))
        self.assertAlmostEqual(edges.loc[0, "length_m"], 100.0)
        self.assertEqual(report.source_rows, 2)
        self.assertEqual(report.excluded_rows, 1)
        self.assertEqual(report.left_address_range_coverage_pct, 100.0)

    def test_duplicate_centerline_ids_fail_closed(self) -> None:
        duplicated = pd.concat([self.centerline, self.centerline.iloc[[0]]], ignore_index=True)
        duplicated = gpd.GeoDataFrame(duplicated, geometry="geometry", crs=self.centerline.crs)

        with self.assertRaisesRegex(ValueError, "duplicate centerline IDs"):
            prepare_street_edges(duplicated, included_features={"Local"})


if __name__ == "__main__":
    unittest.main()
