"""Explicitly reviewed corrections to street-network connectivity."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import networkx as nx


def split_reviewed_crossings(
    graph: nx.MultiDiGraph,
    groups: dict[int, dict[str, set[int]]],
) -> nx.MultiDiGraph:
    """Separate reviewed road groups at shared source intersection IDs.

    Args:
        graph: Directed street multigraph. Each edge must contain
            a ``source_centerline_id`` attribute.
        groups: Intersection IDs mapped to named road groups and their
            assigned source segment IDs.

    Returns:
        A graph copy with reviewed intersections replaced by tuple nodes:
        ``(source_intersection_id, road_group)``.
        Edge keys, directions, and attributes are preserved.

    Raises:
        ValueError: If assignments overlap or do not cover exactly
            the source segments incident to a reviewed intersection.

    Notes:
        Group assignments must be reviewed beforehand. This function
        does not infer road levels or establish legal turn permissions.
        The input graph is not modified.
    """
    endpoint_map: dict[tuple[int, int], tuple[int, str]] = {}

    # Validate every assignment before changing the graph copy.
    for node_id, road_groups in groups.items():
        assigned = [
            segment_id
            for segment_ids in road_groups.values()
            for segment_id in segment_ids
        ]

        # A two-way segment appears as two directed edges but needs
        # only one source-segment assignment at this intersection.
        incident = {
            data["source_centerline_id"]
            for edges in (
                graph.in_edges(node_id, data=True),
                graph.out_edges(node_id, data=True),
            )
            for _, _, data in edges
        }

        if (
            len(assigned) != len(set(assigned))
            or set(assigned) != incident
        ):
            raise ValueError(f"Invalid assignments for {node_id}")

        for road_group, segment_ids in road_groups.items():
            for segment_id in segment_ids:
                endpoint_map[node_id, segment_id] = (
                    node_id,
                    road_group,
                )

    result = graph.copy()

    for node_id, road_groups in groups.items():
        attributes = dict(graph.nodes[node_id])

        # These QA measurements describe the original source node,
        # not the individual road groups created below.
        for name in ("endpoint_observations", "endpoint_spread_m"):
            if name in attributes:
                attributes["source_" + name] = attributes.pop(name)

        result.remove_node(node_id)

        for road_group in road_groups:
            result.add_node(
                (node_id, road_group),
                **attributes,
                source_intersection_id=node_id,
                road_group=road_group,
            )

    # Remap both endpoints where necessary. This also handles a segment
    # whose start and end belong to two different reviewed crossings.
    for start, end, key, attributes in graph.edges(
        keys=True,
        data=True,
    ):
        if start in groups or end in groups:
            source_id = attributes["source_centerline_id"]

            result.add_edge(
                endpoint_map.get((start, source_id), start),
                endpoint_map.get((end, source_id), end),
                key=key,
                **attributes,
            )

    return result


def _unique_json_keys(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    """Reject duplicate JSON keys instead of silently overwriting values."""
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON key: {key}")
        result[key] = value
    return result


def load_reviewed_crossing_groups(
    path: str | Path,
) -> dict[int, dict[str, set[int]]]:
    """Load validated assignments; graph membership is checked by the splitter.

    Raises:
        ValueError: If JSON or assignment structure is invalid.
        OSError: If the file cannot be read.
    """
    with Path(path).open(encoding="utf-8") as stream:
        register = json.load(stream, object_pairs_hook=_unique_json_keys)

    if not isinstance(register, dict):
        raise ValueError("Register must be a JSON object.")

    version = register.get("schema_version")
    if type(version) is not int or version != 1:
        raise ValueError("Unsupported schema_version; expected integer 1.")

    if register.get("review_status") != "reviewed_prototype":
        raise ValueError("Expected review_status='reviewed_prototype'.")

    crossings = register.get("crossings")
    if not isinstance(crossings, list) or not crossings:
        raise ValueError("crossings must be a nonempty list.")

    result = {}

    for crossing in crossings:
        if not isinstance(crossing, dict):
            raise ValueError("Each crossing must be an object.")

        node_id = crossing.get("intersection_id")
        if type(node_id) is not int or node_id <= 0:
            raise ValueError("intersection_id must be a positive integer.")
        if node_id in result:
            raise ValueError(f"Duplicate intersection_id: {node_id}")

        groups = crossing.get("road_groups")
        if not isinstance(groups, dict) or len(groups) < 2:
            raise ValueError(f"{node_id}: expected at least two road groups.")

        converted = {}
        assigned = set()

        for name, segment_ids in groups.items():
            if not isinstance(name, str) or not name.strip():
                raise ValueError(f"{node_id}: road-group names cannot be blank.")

            if not isinstance(segment_ids, list) or not segment_ids:
                raise ValueError(f"{node_id}/{name}: expected a nonempty list.")

            if any(type(s) is not int or s <= 0 for s in segment_ids):
                raise ValueError(
                    f"{node_id}/{name}: IDs must be positive integers."
                )

            ids = set(segment_ids)
            if len(ids) != len(segment_ids) or assigned.intersection(ids):
                raise ValueError(
                    f"{node_id}: duplicate or overlapping segment IDs."
                )

            converted[name] = ids
            assigned.update(ids)

        result[node_id] = converted

    return result
