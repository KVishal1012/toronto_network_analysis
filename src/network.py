"""Network construction for cleaned Toronto Centreline street segments."""

from __future__ import annotations

from dataclasses import dataclass

import geopandas as gpd
import networkx as nx
import numpy as np
from shapely import reverse
from shapely.geometry import Point


EDGE_COLUMNS = frozenset(
    {
        "centerline_id",
        "from_intersection_id",
        "to_intersection_id",
        "oneway_desc",
        "length_m",
        "geometry",
    }
)

ONEWAY_FOLLOW = "Follow-Digitization"
ONEWAY_AGAINST = "Against-Digitization"
TWO_WAY = "Not One-Way"
VALID_ONEWAY_DESCRIPTIONS = frozenset({ONEWAY_FOLLOW, ONEWAY_AGAINST, TWO_WAY})


@dataclass(frozen=True)
class NetworkReport:
    """Headline topology values for a directed street graph."""

    nodes: int
    directed_edges: int
    source_segments: int
    weakly_connected_components: int
    largest_component_nodes: int
    largest_component_pct: float
    self_loop_source_segments: int
    one_way_source_segments: int
    total_source_length_km: float
    node_ids_with_endpoint_spread_over_1m: int


def _validate_edges(edges: gpd.GeoDataFrame) -> None:
    missing_columns = sorted(EDGE_COLUMNS.difference(edges.columns))
    if missing_columns:
        raise ValueError(f"Street edges are missing required columns: {missing_columns}")
    if edges.crs is None or edges.crs.is_geographic:
        raise ValueError("Street edges must use a projected CRS.")
    unexpected_geometry_types = sorted(set(edges.geom_type).difference({"LineString"}))
    if unexpected_geometry_types:
        raise ValueError(
            "Street edges must contain LineString geometry only; found: "
            f"{unexpected_geometry_types}"
        )
    if edges["centerline_id"].duplicated().any():
        raise ValueError("Street edge centerline IDs must be unique.")

    observed_directions = set(edges["oneway_desc"].dropna().unique())
    unknown_directions = sorted(observed_directions.difference(VALID_ONEWAY_DESCRIPTIONS))
    if edges["oneway_desc"].isna().any() or unknown_directions:
        raise ValueError(
            "Street edges contain missing or unknown one-way descriptions: "
            f"{unknown_directions}"
        )


def derive_node_geometries(edges: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """Create one representative point per intersection ID from edge endpoints."""

    _validate_edges(edges)
    endpoint_coordinates: dict[int, list[tuple[float, float]]] = {}

    for row in edges[
        ["from_intersection_id", "to_intersection_id", "geometry"]
    ].itertuples(index=False):
        coordinates = list(row.geometry.coords)
        endpoint_coordinates.setdefault(row.from_intersection_id, []).append(coordinates[0])
        endpoint_coordinates.setdefault(row.to_intersection_id, []).append(coordinates[-1])

    records: list[dict[str, object]] = []
    for intersection_id, coordinates in endpoint_coordinates.items():
        array = np.asarray(coordinates, dtype=float)
        representative = np.median(array, axis=0)
        distances = np.sqrt(((array - representative) ** 2).sum(axis=1))
        records.append(
            {
                "intersection_id": intersection_id,
                "endpoint_observations": len(coordinates),
                "endpoint_spread_m": float(distances.max(initial=0.0)),
                "geometry": Point(float(representative[0]), float(representative[1])),
            }
        )

    return gpd.GeoDataFrame(records, geometry="geometry", crs=edges.crs).set_index(
        "intersection_id"
    )


def _edge_attributes(row: object, *, travel_direction: str) -> dict[str, object]:
    attributes = row._asdict()
    attributes.pop("from_intersection_id")
    attributes.pop("to_intersection_id")
    attributes["source_centerline_id"] = attributes.pop("centerline_id")
    attributes["travel_direction"] = travel_direction
    return attributes


def build_street_graph(edges: gpd.GeoDataFrame) -> nx.MultiDiGraph:
    """Build a directed multigraph while preserving one-way restrictions."""

    _validate_edges(edges)
    graph = nx.MultiDiGraph(crs=edges.crs.to_string())

    for row in edges.itertuples(index=False):
        source_id = row.centerline_id
        start = row.from_intersection_id
        end = row.to_intersection_id
        direction = row.oneway_desc

        if direction in {TWO_WAY, ONEWAY_FOLLOW}:
            graph.add_edge(
                start,
                end,
                key=source_id,
                **_edge_attributes(row, travel_direction="digitized"),
            )

        if direction == TWO_WAY and start != end:
            reverse_attributes = _edge_attributes(row, travel_direction="reverse")
            reverse_attributes["geometry"] = reverse(reverse_attributes["geometry"])
            graph.add_edge(end, start, key=source_id, **reverse_attributes)

        if direction == ONEWAY_AGAINST:
            reverse_attributes = _edge_attributes(row, travel_direction="reverse")
            reverse_attributes["geometry"] = reverse(reverse_attributes["geometry"])
            graph.add_edge(end, start, key=source_id, **reverse_attributes)

    nodes = derive_node_geometries(edges)
    for intersection_id, node in nodes.iterrows():
        graph.add_node(
            intersection_id,
            x=float(node.geometry.x),
            y=float(node.geometry.y),
            endpoint_observations=int(node.endpoint_observations),
            endpoint_spread_m=float(node.endpoint_spread_m),
        )

    return graph


def summarize_network(graph: nx.MultiDiGraph) -> NetworkReport:
    """Summarize topology without double-counting bidirectional segments."""

    if graph.number_of_nodes() == 0:
        raise ValueError("Cannot summarize an empty graph.")

    components = sorted(nx.weakly_connected_components(graph), key=len, reverse=True)
    source_lengths: dict[int, float] = {}
    source_directions: dict[int, str] = {}
    self_loop_sources: set[int] = set()

    for start, end, attributes in graph.edges(data=True):
        source_id = attributes["source_centerline_id"]
        source_lengths[source_id] = float(attributes["length_m"])
        source_directions[source_id] = str(attributes["oneway_desc"])
        if start == end:
            self_loop_sources.add(source_id)

    spread_count = sum(
        float(attributes.get("endpoint_spread_m", 0.0)) > 1.0
        for _, attributes in graph.nodes(data=True)
    )
    largest_nodes = len(components[0])

    return NetworkReport(
        nodes=graph.number_of_nodes(),
        directed_edges=graph.number_of_edges(),
        source_segments=len(source_lengths),
        weakly_connected_components=len(components),
        largest_component_nodes=largest_nodes,
        largest_component_pct=round(largest_nodes / graph.number_of_nodes() * 100, 2),
        self_loop_source_segments=len(self_loop_sources),
        one_way_source_segments=sum(
            direction != TWO_WAY for direction in source_directions.values()
        ),
        total_source_length_km=round(sum(source_lengths.values()) / 1_000, 3),
        node_ids_with_endpoint_spread_over_1m=int(spread_count),
    )
