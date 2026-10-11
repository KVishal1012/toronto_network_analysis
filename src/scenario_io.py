"""Verified preparation, frozen OD populations and approval-gated execution.

Preparation is permitted for candidates and performs no closure/path analysis.
The runnable loader and runner have no approval override. Approval records are
local review attestations, not cryptographic identity or City authorization.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import date
import hashlib
from importlib.metadata import version
import json
from math import isclose, isfinite
from pathlib import Path
from typing import Any

import networkx as nx
from pyproj import CRS

from .cleaning import prepare_street_edges
from .network import build_street_graph
from .scenarios import MAX_OD_PAIRS, MAX_ORIGINS, ClosureComparison, compare_topology_cases
from .topology import load_reviewed_crossing_groups, split_reviewed_crossings

OPERATION = 'remove_all_directed_arcs_matching_explicit_source_centerline_ids'
TOLERANCE_M = 0.001


@dataclass
class PreparedScenario:
    """Verified source graphs, not an execution permission token."""

    spec: dict[str, Any]
    baseline: nx.MultiDiGraph
    reviewed: nx.MultiDiGraph
    bindings: dict[str, Any]
    replaced_ids: set[int]


def _unique_keys(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f'Duplicate JSON key: {key}')
        result[key] = value
    return result


def _reject_constant(value: str) -> None:
    raise ValueError(f'Non-finite JSON value: {value}')


def read_json(path: str | Path) -> dict[str, Any]:
    """Read an object, rejecting duplicate keys and nonstandard NaN/Infinity."""
    with Path(path).open(encoding='utf-8') as stream:
        value = json.load(stream, object_pairs_hook=_unique_keys, parse_constant=_reject_constant)
    if not isinstance(value, dict):
        raise ValueError('Expected a JSON object.')
    return value


def _digest(value: Any) -> str:
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':'),
                                    allow_nan=False).encode('utf-8')).hexdigest()


def definition_sha256(spec: dict[str, Any]) -> str:
    """Bind review to all definition fields except its three approval controls."""
    return _digest({k: v for k, v in spec.items()
                    if k not in {'enabled', 'status', 'boundary_approval'}})


def _ids(value: Any, label: str, *, empty: bool = False) -> list[int]:
    if not isinstance(value, list) or (not value and not empty) or any(
        type(v) is not int or v <= 0 for v in value
    ) or len(value) != len(set(value)):
        raise ValueError(f'{label}: expected unique positive integer IDs.')
    return value


def _schema(spec: dict[str, Any]) -> None:
    """Validate the supported corridor schema without authorizing execution."""
    if type(spec.get('schema_version')) is not int or spec['schema_version'] != 1:
        raise ValueError('Unsupported scenario schema_version.')
    if type(spec.get('enabled')) is not bool:
        raise ValueError('enabled must be a JSON boolean.')
    if spec.get('status') not in {'candidate_unvalidated', 'approved'}:
        raise ValueError('Unknown scenario status.')
    if not isinstance(spec.get('scenario_id'), str) or not spec['scenario_id'].strip():
        raise ValueError('scenario_id is required.')
    if spec.get('operation') != OPERATION:
        raise ValueError('Unsupported closure operation.')
    selected = _ids(spec.get('source_centerline_ids'), 'selected')
    protected = _ids(spec.get('protected_source_centerline_ids'), 'protected', empty=True)
    if set(selected) & set(protected):
        raise ValueError('Selected and protected IDs overlap.')
    audit = spec.get('audit')
    if not isinstance(audit, dict):
        raise ValueError('audit is required.')
    chain = _ids(audit.get('chain_node_ids_west_to_east'), 'chain')
    if len(chain) != len(selected) + 1 or spec.get('west_boundary_intersection_id') != chain[0] or spec.get('east_boundary_intersection_id') != chain[-1]:
        raise ValueError('Boundary/chain definition mismatch.')
    segments = audit.get('segments')
    if not isinstance(segments, list) or any(not isinstance(s, dict) for s in segments) or [s.get('centerline_id') for s in segments] != selected:
        raise ValueError('Selected segment audit/order mismatch.')
    for i, segment in enumerate(segments):
        if segment.get('from_intersection_id') != chain[i] or segment.get('to_intersection_id') != chain[i+1]:
            raise ValueError('Segment endpoints disagree with chain.')


def load_scenario(path: str | Path) -> dict[str, Any]:
    """Load only enabled, explicitly reviewed scenarios; no bypass argument.

    Raises:
        ValueError: Disabled/unapproved, malformed or stale review evidence.
    """
    spec = read_json(path)
    _schema(spec)
    if spec['enabled'] is not True or spec['status'] != 'approved':
        raise ValueError('Scenario is disabled or unapproved; execution refused.')
    approval = spec.get('boundary_approval')
    if not isinstance(approval, dict) or any(
        not isinstance(approval.get(k), str) or not approval[k].strip()
        for k in ('reviewer', 'reviewed_at', 'boundary_description')
    ):
        raise ValueError('Explicit boundary review metadata is required.')
    date.fromisoformat(approval['reviewed_at'])
    evidence = approval.get('evidence')
    if not isinstance(evidence, list) or not evidence or any(
        not isinstance(item, dict) or any(not isinstance(item.get(k), str) or not item[k].strip()
                                       for k in ('reference', 'finding')) for item in evidence
    ):
        raise ValueError('Boundary evidence references and findings are required.')
    if approval.get('definition_sha256') != definition_sha256(spec):
        raise ValueError('Approval is stale: scenario definition has changed.')
    return spec


def _safe_path(root: Path, name: Any) -> Path:
    if not isinstance(name, str) or not name or Path(name).is_absolute():
        raise ValueError('Source paths must be repository-relative.')
    result = (root / name).resolve()
    if not result.is_relative_to(root.resolve()):
        raise ValueError('Source path escapes repository.')
    return result


def _file_sha(path: Path) -> str:
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def _verify_hashes(spec: dict[str, Any], root: Path) -> Path:
    sources = spec['audit'].get('source_sha256')
    if not isinstance(sources, dict) or not sources:
        raise ValueError('Source checksums are required.')
    shapefiles = [name for name in sources if Path(name).suffix == '.shp']
    if len(shapefiles) != 1:
        raise ValueError('Exactly one pinned Centreline shapefile is required.')
    shapefile = Path(shapefiles[0])
    if any(str(shapefile.with_suffix(suffix)) not in sources for suffix in ('.shp', '.shx', '.dbf', '.prj', '.cpg')):
        raise ValueError('All five Centreline shapefile components must be pinned.')
    checks = dict(sources)
    checks[spec.get('reviewed_crossings_path')] = spec['audit'].get('register_sha256')
    for name, expected in checks.items():
        if not isinstance(expected, str) or len(expected) != 64 or _file_sha(_safe_path(root, name)) != expected:
            raise ValueError(f'Source checksum mismatch: {name}')
    return _safe_path(root, str(shapefile))


def _close(actual: Any, expected: Any) -> bool:
    return (type(expected) in (int, float) and isfinite(expected)
            and isclose(float(actual), expected, rel_tol=0, abs_tol=TOLERANCE_M))


def prepare_scenario(path: str | Path, repository: str | Path) -> PreparedScenario:
    """Verify candidate inputs and construct open graphs, without running closure.

    Builds graphs from the pinned source, never accepts an unverified caller graph.
    Checks hashes before and after reads, CRS, chain geometry, directions, complete
    incident segment sets and crossing groups. Missing files raise OSError.
    """
    root = Path(repository).resolve()
    spec = read_json(path)
    _schema(spec)
    source = _verify_hashes(spec, root)
    edges, _ = prepare_street_edges(source)
    if edges.crs != CRS.from_user_input(spec.get('geometry_crs')):
        raise ValueError('Geometry CRS differs from scenario specification.')
    selected = spec['source_centerline_ids']
    chain = spec['audit']['chain_node_ids_west_to_east']
    indexed = edges.set_index('centerline_id')
    if not set(selected + spec['protected_source_centerline_ids']) <= set(indexed.index):
        raise ValueError('Selected/protected segments missing from prepared street population.')
    for expected in spec['audit']['segments']:
        row = indexed.loc[expected['centerline_id']]
        if any(row[k] != expected[k] for k in ('from_intersection_id', 'to_intersection_id', 'oneway_desc')):
            raise ValueError('Source endpoints or one-way direction changed.')
        if not row.geometry.is_valid or row.geometry.geom_type != 'LineString' or not _close(row.length_m, expected.get('length_m')):
            raise ValueError('Segment geometry/length mismatch.')
        for actual, key in ((row.geometry.coords[0], 'start_xy_m'), (row.geometry.coords[-1], 'end_xy_m')):
            xy = expected.get(key)
            if not isinstance(xy, list) or len(xy) != 2 or not all(_close(a, b) for a, b in zip(actual, xy)):
                raise ValueError('Segment endpoint coordinate mismatch.')
    for left, right in zip(spec['audit']['segments'], spec['audit']['segments'][1:]):
        if not all(_close(a, b) for a, b in zip(left['end_xy_m'], right['start_xy_m'])):
            raise ValueError('Adjacent corridor geometries do not meet.')
    incident = edges[edges.from_intersection_id.isin(chain) | edges.to_intersection_id.isin(chain)]
    retained = spec['audit'].get('retained_incident_segments')
    if not isinstance(retained, list) or any(not isinstance(s, dict) for s in retained):
        raise ValueError('Retained segment audit is required.')
    retained_ids = _ids([s.get('centerline_id') for s in retained], 'retained audit', empty=True)
    if set(retained_ids) != set(spec['protected_source_centerline_ids']) or set(incident.centerline_id) != set(selected + retained_ids):
        raise ValueError('Protected/incident segment coverage mismatch.')
    for expected in retained:
        row = indexed.loc[expected['centerline_id']]
        if any(row[k] != expected.get(k) for k in ('from_intersection_id', 'to_intersection_id', 'street_label')):
            raise ValueError('Protected segment endpoint/label mismatch.')
    groups = load_reviewed_crossing_groups(_safe_path(root, spec['reviewed_crossings_path']))
    deck = spec.get('reviewed_deck_group_by_intersection')
    if not isinstance(deck, dict) or set(deck) != {str(n) for n in chain if n in groups}:
        raise ValueError('Reviewed corridor crossings mismatch.')
    for key, group in deck.items():
        node = int(key)
        incident_selected = {s['centerline_id'] for s in spec['audit']['segments']
                             if node in (s['from_intersection_id'], s['to_intersection_id'])}
        if not isinstance(group, str) or groups[node].get(group) != incident_selected:
            raise ValueError('Crossing road-group assignments mismatch.')
    baseline = build_street_graph(edges)
    reviewed = split_reviewed_crossings(baseline, groups)
    reviewed_chain = [(n, deck[str(n)]) if str(n) in deck else n for n in chain]
    # Supported v1 corridor is bidirectional and internally unbranched.
    if any(s['oneway_desc'] != 'Not One-Way' for s in spec['audit']['segments']):
        raise ValueError('This corridor schema currently requires two-way segments.')
    if not all(reviewed.has_edge(a, b) and reviewed.has_edge(b, a) for a, b in zip(reviewed_chain, reviewed_chain[1:])):
        raise ValueError('Reviewed corridor continuity failed.')
    if any(len(set(reviewed.predecessors(n)) | set(reviewed.successors(n))) != 2 for n in reviewed_chain[1:-1]):
        raise ValueError('Unexpected internal reviewed corridor branch.')
    audit = spec['audit']
    arc_count = sum(d['source_centerline_id'] in selected for _, _, d in baseline.edges(data=True))
    if audit.get('selected_source_segments') != len(selected) or audit.get('selected_directed_arcs') != arc_count or not _close(indexed.loc[selected].length_m.sum(), audit.get('total_length_m')):
        raise ValueError('Audited segment/arc counts or total length mismatch.')
    _verify_hashes(spec, root)
    code_files = ('cleaning.py', 'network.py', 'topology.py', 'scenarios.py', 'scenario_io.py')
    bindings = {'definition_sha256': definition_sha256(spec),
                'code_sha256': {name: _file_sha(Path(__file__).parent / name) for name in code_files},
                'dependencies': {name: version(name) for name in ('networkx', 'geopandas', 'shapely', 'pyproj')}}
    return PreparedScenario(spec, baseline, reviewed, bindings, set(groups))


def freeze_population(
    prepared: PreparedScenario, *, seed: int = 42, origin_count: int = 32,
    destination_count: int = 256, additional_exclusions: dict[int, str] | None = None,
) -> dict[str, Any]:
    """Create a deterministic structural sample; no reachability filtering.

    Uses SHA-256 ranks over sorted eligible original IDs. Records all exclusions.
    Not population/traffic weighted, and not a claim of representative journeys.
    """
    if type(seed) is not int or any(type(v) is not int or v <= 0 for v in (origin_count, destination_count)) or origin_count > MAX_ORIGINS or origin_count * destination_count > MAX_OD_PAIRS:
        raise ValueError('Invalid seed or bounded sample dimensions.')
    baseline, reviewed = prepared.baseline, prepared.reviewed
    interior = set(prepared.spec['audit']['chain_node_ids_west_to_east'][1:-1])
    extras = additional_exclusions or {}
    if not isinstance(extras, dict) or any(type(n) is not int or n not in baseline or not isinstance(reason, str) or not reason.strip() for n, reason in extras.items()):
        raise ValueError('Additional exclusions require existing original IDs and reasons.')
    excluded = []
    eligible = []
    for node in sorted(baseline):
        reasons = []
        if node in interior:
            reasons.append('closure_interior_vertex')
        if node in prepared.replaced_ids:
            reasons.append('replaced_crossing_id')
        if node not in reviewed:
            reasons.append('not_shared_between_topologies')
        if node in extras:
            reasons.append('explicit: ' + extras[node])
        if reasons:
            excluded.append({'node_id': int(node), 'reasons': reasons})
        else:
            eligible.append(int(node))
    if max(origin_count, destination_count) > len(eligible):
        raise ValueError('Requested sample exceeds eligible original nodes.')
    def choose(role: str, count: int) -> list[int]:
        return sorted(eligible, key=lambda n: (_digest([seed, role, n]), n))[:count]
    origins, destinations = choose('origin', origin_count), choose('destination', destination_count)
    pairs = [[o, d] for o in origins for d in destinations if o != d]
    if not pairs:
        raise ValueError('Sample contains no non-self OD pairs.')
    return {'schema_version': 1, 'scenario_id': prepared.spec['scenario_id'],
            'bindings': prepared.bindings, 'method': 'sha256_rank_original_nodes_v1',
            'seed': seed, 'origin_count': origin_count, 'destination_count': destination_count,
            'additional_exclusions': {str(k): v for k, v in sorted(extras.items())},
            'eligible_count': len(eligible), 'eligible_ids_sha256': _digest(eligible),
            'excluded_nodes': excluded, 'origins': origins, 'destinations': destinations,
            'self_pairs_excluded': len(origins) * len(destinations) - len(pairs),
            'pair_count': len(pairs), 'pairs': pairs, 'pairs_sha256': _digest(pairs),
            'interpretation': 'Structural node sample; not observed trips or population-weighted accessibility.'}


def save_population(population: dict[str, Any], path: str | Path) -> None:
    """Save without overwriting an existing artifact; validate on execution."""
    payload = json.dumps(population, indent=2, allow_nan=False) + '\n'
    with Path(path).open('x', encoding='utf-8') as stream:
        stream.write(payload)


def run_saved_scenario(
    scenario_path: str | Path, population_path: str | Path, repository: str | Path,
) -> dict[str, ClosureComparison]:
    """Run four conditions only after approval and full source/population checks.

    Rebuilds open graphs and regenerates the frozen sample for exact comparison.
    Does not save/publish results. Invalid inputs fail before path computation.
    """
    approved = load_scenario(scenario_path)
    prepared = prepare_scenario(scenario_path, repository)
    if prepared.spec != approved:
        raise ValueError('Scenario changed during preparation.')
    population = read_json(population_path)
    try:
        extras = {int(k): v for k, v in population['additional_exclusions'].items()}
        expected = freeze_population(prepared, seed=population['seed'], origin_count=population['origin_count'],
                                     destination_count=population['destination_count'], additional_exclusions=extras)
    except (KeyError, TypeError, AttributeError) as exc:
        raise ValueError('Invalid population manifest.') from exc
    if _digest(population) != _digest(expected):
        raise ValueError('Population or provenance mismatch; prepare a new artifact.')
    return compare_topology_cases(prepared.baseline, prepared.reviewed,
                                  approved['source_centerline_ids'],
                                  [tuple(pair) for pair in population['pairs']],
                                  protected_source_ids=approved['protected_source_centerline_ids'])
