"""Low-level, hypothetical closure experiments; no scenario approval or file I/O.

These primitives do not load/enable candidate specifications. A future runner must
verify boundary approval, source hashes, endpoints and the frozen OD population.
"""
from __future__ import annotations

from collections.abc import Hashable, Iterable
from copy import deepcopy
from dataclasses import dataclass
from math import isfinite
from numbers import Integral, Real

import networkx as nx
from pyproj import CRS
from pyproj.exceptions import CRSError

MAX_OD_PAIRS = 100_000
MAX_ORIGINS = 100
Node = Hashable


@dataclass(frozen=True)
class PairImpact:
    """Lengths in metres; None means unreachable, never zero or infinity."""

    origin: Node
    destination: Node
    status: str
    open_length_m: float | None
    closed_length_m: float | None
    extra_length_m: float | None


@dataclass(frozen=True)
class ClosureComparison:
    """Fixed-denominator results; isolates are graph vertices, not people."""

    pairs: tuple[PairImpact, ...]
    removed_source_ids: tuple[int, ...]
    removed_directed_edges: int
    open_weak_components: int
    closed_weak_components: int
    open_isolates: int
    closed_isolates: int

    @property
    def counts(self) -> dict[str, int]:
        """Return exhaustive categories with the original pair denominator."""
        result = dict.fromkeys(
            ('already_unreachable', 'newly_unreachable', 'longer', 'unchanged'), 0
        )
        for pair in self.pairs:
            result[pair.status] += 1
        result['total_pairs'] = len(self.pairs)
        return result


def _ids(values: Iterable[int], name: str, *, allow_empty: bool = False) -> tuple[int, ...]:
    """Validate unique, positive integer IDs, excluding booleans."""
    result = tuple(values)
    if (not result and not allow_empty) or any(
        isinstance(v, bool) or not isinstance(v, Integral) or v <= 0 for v in result
    ):
        raise ValueError(f'{name} must contain positive integer IDs.')
    if len(set(result)) != len(result):
        raise ValueError(f'{name} contains duplicate IDs.')
    return tuple(int(v) for v in result)


def _validate_graph(graph: nx.MultiDiGraph) -> set[int]:
    """Reject ambiguous units, unknown source IDs and invalid edge costs."""
    if not isinstance(graph, nx.MultiDiGraph) or not graph:
        raise ValueError('Expected a nonempty directed MultiDiGraph.')
    try:
        crs = CRS.from_user_input(graph.graph.get('crs'))
    except (CRSError, TypeError) as exc:
        raise ValueError('Graph requires a projected metre CRS.') from exc
    if not crs.is_projected or len(crs.axis_info) < 2 or any(
        axis.unit_conversion_factor != 1 for axis in crs.axis_info[:2]
    ):
        raise ValueError('Graph requires a projected metre CRS.')
    source_ids = set()
    for _, _, data in graph.edges(data=True):
        source_id = _ids([data.get('source_centerline_id')], 'edge source ID')[0]
        value = data.get('length_m')
        if isinstance(value, bool) or not isinstance(value, Real) or not isfinite(value) or value <= 0:
            raise ValueError(f'Segment {source_id}: length_m must be finite and positive.')
        source_ids.add(source_id)
    return source_ids


def remove_source_segments(
    graph: nx.MultiDiGraph,
    source_ids: Iterable[int],
    *,
    protected_source_ids: Iterable[int] = (),
) -> nx.MultiDiGraph:
    """Return an independent graph with all arcs for exactly these IDs removed.

    Preserves nodes, other keyed edges and attributes, including nested metadata.
    Rejects absent/duplicate IDs and overlapping or absent protected IDs before
    copying. O(V+E) time and memory. No street-name or nearest-geometry matching.

    Raises:
        ValueError: If the graph, weights or requested IDs are invalid.
    """
    selected = set(_ids(source_ids, 'source_ids'))
    protected = set(_ids(protected_source_ids, 'protected_source_ids', allow_empty=True))
    present = _validate_graph(graph)
    if selected & protected:
        raise ValueError('Selected and protected source IDs overlap.')
    if (selected | protected) - present:
        raise ValueError(f'Source IDs absent from graph: {sorted((selected | protected) - present)}')
    result = deepcopy(graph)
    # Exact triples are essential: (u, v) alone could remove a parallel road.
    result.remove_edges_from([
        (u, v, key) for u, v, key, data in graph.edges(keys=True, data=True)
        if data['source_centerline_id'] in selected
    ])
    return result


def _validate_pairs(graphs: tuple[nx.MultiDiGraph, ...], pairs: tuple[tuple[Node, Node], ...]) -> None:
    """Require a bounded, explicit, duplicate-free shared OD population."""
    if not pairs or len(pairs) > MAX_OD_PAIRS:
        raise ValueError(f'Provide 1–{MAX_OD_PAIRS} explicit OD pairs.')
    seen = set()
    origins = set()
    for pair in pairs:
        if not isinstance(pair, tuple) or len(pair) != 2:
            raise ValueError('Each OD pair must be an (origin, destination) tuple.')
        try:
            hash(pair)
        except TypeError as exc:
            raise ValueError('OD nodes must be hashable.') from exc
        if pair[0] == pair[1] or pair in seen:
            raise ValueError('Self-pairs and duplicate OD pairs are not allowed.')
        if any(node not in graph for graph in graphs for node in pair):
            raise ValueError(f'OD pair is not present in every input graph: {pair!r}')
        seen.add(pair)
        origins.add(pair[0])
    if len(origins) > MAX_ORIGINS:
        raise ValueError(f'This bounded prototype supports at most {MAX_ORIGINS} origins.')


def compare_closure(
    graph: nx.MultiDiGraph,
    source_ids: Iterable[int],
    od_pairs: Iterable[tuple[Node, Node]],
    *,
    protected_source_ids: Iterable[int] = (),
) -> ClosureComparison:
    """Compare directed length paths without dropping any disconnected nodes.

    Caller freezes and reviews OD exclusions before calling. Two Dijkstra runs
    per unique origin, not per pair: O(S * (V+E) log V), plus graph copy/QA.
    No travel-time, traffic, population or legal-turn claims are made.
    """
    pairs = tuple(od_pairs)
    _validate_pairs((graph,), pairs)
    selected = _ids(source_ids, 'source_ids')
    closed = remove_source_segments(graph, selected, protected_source_ids=protected_source_ids)
    by_origin: dict[Node, list[Node]] = {}
    for origin, destination in pairs:
        by_origin.setdefault(origin, []).append(destination)
    impacts = {}
    for origin, destinations in by_origin.items():
        before = nx.single_source_dijkstra_path_length(graph, origin, weight='length_m')
        after = nx.single_source_dijkstra_path_length(closed, origin, weight='length_m')
        for destination in destinations:
            old, new = before.get(destination), after.get(destination)
            if any(v is not None and not isfinite(v) for v in (old, new)):
                raise ValueError('Path-length overflow; cannot report finite distances.')
            extra = None
            if old is None:
                status = 'already_unreachable'
            elif new is None:
                status = 'newly_unreachable'
            else:
                extra = float(new - old)
                if extra < -1e-8:
                    raise RuntimeError('Removing edges unexpectedly shortened a path.')
                extra = max(0.0, extra)
                status = 'longer' if extra > 1e-8 else 'unchanged'
            impacts[origin, destination] = PairImpact(origin, destination, status, old, new, extra)
    return ClosureComparison(
        tuple(impacts[pair] for pair in pairs), selected,
        graph.number_of_edges() - closed.number_of_edges(),
        nx.number_weakly_connected_components(graph),
        nx.number_weakly_connected_components(closed),
        len(list(nx.isolates(graph))), len(list(nx.isolates(closed))),
    )


def compare_topology_cases(
    baseline: nx.MultiDiGraph,
    reviewed: nx.MultiDiGraph,
    source_ids: Iterable[int],
    od_pairs: Iterable[tuple[Node, Node]],
    *,
    protected_source_ids: Iterable[int] = (),
) -> dict[str, ClosureComparison]:
    """Run baseline/open-closed and reviewed/open-closed on identical OD pairs.

    This is a low-level experiment, not approval to run a disabled file scenario.
    Source snapshot/equivalence and reviewed population must be checked upstream.
    """
    pairs, selected, protected = tuple(od_pairs), tuple(source_ids), tuple(protected_source_ids)
    _validate_pairs((baseline, reviewed), pairs)
    return {
        name: compare_closure(graph, selected, pairs, protected_source_ids=protected)
        for name, graph in [('baseline', baseline), ('reviewed', reviewed)]
    }
