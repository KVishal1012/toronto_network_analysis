"""Cleaning and validation for Toronto Centreline street segments."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Collection

import geopandas as gpd
import pandas as pd


TARGET_CRS = "EPSG:26917"

COLUMN_MAP = {
    "_id1": "source_row_id",
    "CENTREL2": "centerline_id",
    "LINEAR_3": "linear_name_id",
    "LINEAR_4": "street_name_full",
    "LINEAR_5": "street_name_full_legal",
    "ADDRESS6": "address_l",
    "ADDRESS7": "address_r",
    "PARITY_8": "parity_l",
    "PARITY_9": "parity_r",
    "LO_NUM_10": "lo_num_l",
    "HI_NUM_11": "hi_num_l",
    "LO_NUM_12": "lo_num_r",
    "HI_NUM_13": "hi_num_r",
    "BEGIN_A14": "begin_addr_point_id_l",
    "END_ADD15": "end_addr_point_id_l",
    "BEGIN_A16": "begin_addr_point_id_r",
    "END_ADD17": "end_addr_point_id_r",
    "BEGIN_A18": "begin_addr_l",
    "END_ADD19": "end_addr_l",
    "BEGIN_A20": "begin_addr_r",
    "END_ADD21": "end_addr_r",
    "LOW_NUM22": "low_num_odd",
    "HIGH_NU23": "high_num_odd",
    "LOW_NUM24": "low_num_even",
    "HIGH_NU25": "high_num_even",
    "LINEAR_26": "street_name",
    "LINEAR_27": "street_type",
    "LINEAR_28": "street_direction",
    "LINEAR_29": "street_name_desc",
    "LINEAR_30": "street_label",
    "FROM_IN31": "from_intersection_id",
    "TO_INTE32": "to_intersection_id",
    "ONEWAY_33": "oneway_code",
    "ONEWAY_34": "oneway_desc",
    "FEATURE35": "feature_code",
    "FEATURE36": "feature_desc",
    "JURISDI37": "jurisdiction",
    "CENTREL38": "centerline_status",
    "OBJECTI39": "objectid",
    "MI_PRIN40": "mi_prinx",
}

REQUIRED_COLUMNS = frozenset(
    {
        "centerline_id",
        "street_label",
        "from_intersection_id",
        "to_intersection_id",
        "oneway_desc",
        "feature_desc",
        "geometry",
    }
)

# Phase 1 models streets usable by motor vehicles. Other transport modes will
# receive separate, documented inclusion rules rather than being mixed here.
DRIVABLE_STREET_FEATURES = frozenset(
    {
        "Access Road",
        "Collector",
        "Collector Ramp",
        "Expressway",
        "Expressway Ramp",
        "Laneway",
        "Local",
        "Major Arterial",
        "Major Arterial Ramp",
        "Minor Arterial",
        "Minor Arterial Ramp",
        "Other",
        "Other Ramp",
    }
)

MISSING_TEXT_TOKENS = frozenset({"", "none", "null", "nan"})


@dataclass(frozen=True)
class CleaningReport:
    """Headline QA values for a prepared edge table."""

    source_rows: int
    retained_rows: int
    excluded_rows: int
    target_crs: str
    invalid_geometry_rows: int
    duplicate_centerline_ids: int
    missing_from_intersection_ids: int
    missing_to_intersection_ids: int
    self_loop_segments: int
    left_address_range_coverage_pct: float
    right_address_range_coverage_pct: float
    total_length_km: float


def load_centerline(path: str | Path) -> gpd.GeoDataFrame:
    """Load a Centreline vector file without applying hidden repairs."""

    source_path = Path(path)
    if not source_path.exists():
        raise FileNotFoundError(f"Centreline source does not exist: {source_path}")

    centerline = gpd.read_file(source_path)
    if centerline.crs is None:
        raise ValueError("Centreline source has no CRS; refusing to guess one.")
    return centerline


def _normalize_text_value(value: object) -> object:
    if not isinstance(value, str):
        return value
    stripped = value.strip()
    return pd.NA if stripped.casefold() in MISSING_TEXT_TOKENS else stripped


def standardize_centerline(centerline: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """Normalize field names and explicit text placeholders."""

    standardized = centerline.rename(columns=COLUMN_MAP).copy()
    missing_columns = sorted(REQUIRED_COLUMNS.difference(standardized.columns))
    if missing_columns:
        raise ValueError(f"Centreline source is missing required columns: {missing_columns}")

    text_columns = standardized.select_dtypes(include=["object", "string"]).columns
    for column in text_columns:
        standardized[column] = standardized[column].map(_normalize_text_value)

    return standardized


def validate_centerline(centerline: gpd.GeoDataFrame) -> None:
    """Fail closed on conditions that would invalidate graph construction."""

    if centerline.crs is None:
        raise ValueError("Centreline data has no CRS.")
    if centerline.geometry.isna().any():
        raise ValueError("Centreline data contains null geometry.")
    if centerline.geometry.is_empty.any():
        raise ValueError("Centreline data contains empty geometry.")
    if (~centerline.geometry.is_valid).any():
        raise ValueError("Centreline data contains invalid geometry.")
    if centerline["centerline_id"].isna().any():
        raise ValueError("Centreline data contains missing centerline IDs.")
    if centerline["centerline_id"].duplicated().any():
        raise ValueError("Centreline data contains duplicate centerline IDs.")
    if centerline[["from_intersection_id", "to_intersection_id"]].isna().any().any():
        raise ValueError("Centreline data contains missing intersection IDs.")


def select_street_features(
    centerline: gpd.GeoDataFrame,
    included_features: Collection[str] = DRIVABLE_STREET_FEATURES,
) -> gpd.GeoDataFrame:
    """Select an explicit feature population for the Phase 1 street graph."""

    if not included_features:
        raise ValueError("At least one included feature type is required.")

    selected = centerline.loc[centerline["feature_desc"].isin(included_features)].copy()
    if selected.empty:
        raise ValueError("No Centreline rows matched the requested feature types.")
    return selected


def _coverage_pct(frame: gpd.GeoDataFrame, columns: list[str]) -> float:
    if not set(columns).issubset(frame.columns) or frame.empty:
        return 0.0
    return round(float(frame[columns].notna().all(axis=1).mean() * 100), 2)


def prepare_street_edges(
    source: str | Path | gpd.GeoDataFrame,
    *,
    included_features: Collection[str] = DRIVABLE_STREET_FEATURES,
    target_crs: str | int = TARGET_CRS,
) -> tuple[gpd.GeoDataFrame, CleaningReport]:
    """Load, standardize, validate, filter, and project graph-ready edges."""

    raw = load_centerline(source) if isinstance(source, (str, Path)) else source.copy()
    source_rows = len(raw)
    standardized = standardize_centerline(raw)
    validate_centerline(standardized)

    selected = select_street_features(standardized, included_features)
    selected = selected.to_crs(target_crs)
    if selected.crs is None or selected.crs.is_geographic:
        raise ValueError("Target CRS must be projected so edge lengths are metric.")

    selected["length_m"] = selected.geometry.length
    if (selected["length_m"] <= 0).any():
        raise ValueError("Selected street population contains non-positive lengths.")

    report = CleaningReport(
        source_rows=source_rows,
        retained_rows=len(selected),
        excluded_rows=source_rows - len(selected),
        target_crs=selected.crs.to_string(),
        invalid_geometry_rows=int((~selected.geometry.is_valid).sum()),
        duplicate_centerline_ids=int(selected["centerline_id"].duplicated().sum()),
        missing_from_intersection_ids=int(selected["from_intersection_id"].isna().sum()),
        missing_to_intersection_ids=int(selected["to_intersection_id"].isna().sum()),
        self_loop_segments=int(
            (selected["from_intersection_id"] == selected["to_intersection_id"]).sum()
        ),
        left_address_range_coverage_pct=_coverage_pct(selected, ["lo_num_l", "hi_num_l"]),
        right_address_range_coverage_pct=_coverage_pct(selected, ["lo_num_r", "hi_num_r"]),
        total_length_km=round(float(selected["length_m"].sum() / 1_000), 2),
    )
    return selected.reset_index(drop=True), report
