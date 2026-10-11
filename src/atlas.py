"""Local Atlas evidence exports, using the existing approval-gated runner.

One entry is one experiment, not a citywide ranking or a publication approval.
No source graph, scenario approval or frozen population is changed here.
"""
from __future__ import annotations

from dataclasses import asdict
from datetime import datetime, timezone
import hashlib
import json
from math import isclose, isfinite
import os
from pathlib import Path
import platform
from statistics import median
from tempfile import NamedTemporaryFile
from typing import Any

from .scenario_io import load_scenario, read_json, run_saved_scenario
from .scenarios import ClosureComparison

DISTANCE_TOLERANCE_M = 1e-8
ENGINE_FILES = ('cleaning.py', 'network.py', 'topology.py', 'scenarios.py', 'scenario_io.py')


def summarize_comparison(comparison: ClosureComparison) -> dict[str, Any]:
    """Summarize a fixed population with explicit, non-population denominators.

    Null medians mean no longer reachable pairs; unreachable routes never enter
    distance statistics. O(P) validation and O(P log P) worst-case median work.

    Raises:
        ValueError: Empty, non-finite or internally inconsistent pair results.
    """
    if not comparison.pairs:
        raise ValueError('Cannot summarize an empty comparison.')
    for pair in comparison.pairs:
        old, new, extra = pair.open_length_m, pair.closed_length_m, pair.extra_length_m
        if any(v is not None and (isinstance(v, bool) or not isinstance(v, (int, float))
                                 or not isfinite(v) or v < 0) for v in (old, new, extra)):
            raise ValueError('Distances must be nonnegative finite numbers or null.')
        if old is None:
            valid = new is None and extra is None and pair.status == 'already_unreachable'
        elif new is None:
            valid = extra is None and pair.status == 'newly_unreachable'
        else:
            delta = new - old
            status = 'longer' if delta > DISTANCE_TOLERANCE_M else 'unchanged'
            valid = (delta >= -DISTANCE_TOLERANCE_M and extra is not None
                     and isclose(extra, max(0, delta), rel_tol=0, abs_tol=DISTANCE_TOLERANCE_M)
                     and pair.status == status)
        if not valid:
            raise ValueError('Pair status and distances disagree.')
    counts = comparison.counts
    reachable_open = counts['total_pairs'] - counts['already_unreachable']
    affected = counts['longer'] + counts['newly_unreachable']
    extra_lengths = [p.extra_length_m for p in comparison.pairs if p.status == 'longer']
    return {
        'counts': counts,
        'reachable_open_pairs': reachable_open,
        'reachable_both_pairs': counts['longer'] + counts['unchanged'],
        'affected_pairs': affected,
        'affected_pct_of_reachable_open': 100 * affected / reachable_open if reachable_open else None,
        'newly_unreachable_pct_of_reachable_open': (
            100 * counts['newly_unreachable'] / reachable_open if reachable_open else None
        ),
        'longer_pairs_extra_distance_m': {
            'denominator_pairs': len(extra_lengths),
            'median': median(extra_lengths) if extra_lengths else None,
            'maximum': max(extra_lengths) if extra_lengths else None,
        },
        'graph_qa_not_people': {
            name: getattr(comparison, name) for name in (
                'removed_directed_edges', 'open_weak_components', 'closed_weak_components',
                'open_isolates', 'closed_isolates',
            )
        },
    }


def _file_digest(path: Path) -> str:
    """Hash exact file bytes without loading large sources into memory."""
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def _payload_digest(payload: dict[str, Any]) -> str:
    """Hash canonical JSON; NaN/Infinity are never valid evidence values."""
    content = json.dumps(payload, sort_keys=True, separators=(',', ':'), allow_nan=False)
    return hashlib.sha256(content.encode('utf-8')).hexdigest()


def _write_new_json(payload: dict[str, Any], output: Path) -> None:
    """Publish a complete local JSON atomically, never replacing an old artifact.

    A same-directory hard link supplies exclusive creation. If the filesystem
    does not support it, fail without a partial output instead of overwriting.
    """
    content = json.dumps(payload, indent=2, allow_nan=False) + '\n'
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with NamedTemporaryFile(mode='w', encoding='utf-8', dir=output.parent,
                                prefix='.atlas-', suffix='.tmp', delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.link(temporary, output)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def export_atlas_entry(
    scenario_path: str | Path, population_path: str | Path,
    repository: str | Path, output_path: str | Path,
) -> dict[str, Any]:
    """Run an approved four-condition experiment and save its local evidence.

    Args:
        scenario_path: Enabled, definition-bound scenario specification.
        population_path: Exact previously frozen OD manifest.
        repository: Checkout containing the source files and executing modules.
        output_path: New versioned JSON path; overwrite is forbidden.

    Returns:
        The complete evidence entry, including summaries and per-pair results.

    Raises:
        ValueError: Approval, provenance, population or result validation fails.
        FileExistsError: The chosen output already exists.
        OSError: Source reads or atomic output creation fail.
    """
    root = Path(repository).resolve()
    if Path(__file__).resolve().parents[1] != root:
        raise ValueError('Repository must match the executing Atlas checkout.')
    scenario_path, population_path = Path(scenario_path), Path(population_path)
    output = Path(output_path)
    if output.exists() or output.is_symlink():
        raise FileExistsError(f'Choose a new versioned output: {output}')
    tracked = {'scenario': scenario_path, 'population': population_path,
               'atlas_exporter': Path(__file__)}
    tracked.update({f'engine/{name}': root / 'src' / name for name in ENGINE_FILES})
    before = {name: _file_digest(path) for name, path in tracked.items()}
    spec = load_scenario(scenario_path)
    population = read_json(population_path)
    # This runner verifies all pinned sources and the entire frozen manifest.
    comparisons = run_saved_scenario(scenario_path, population_path, root)
    if set(comparisons) != {'baseline', 'reviewed'}:
        raise ValueError('Expected baseline and reviewed open/closed comparisons.')
    cases = {}
    for name, comparison in comparisons.items():
        if [[p.origin, p.destination] for p in comparison.pairs] != population['pairs']:
            raise ValueError('Results changed the frozen pair order or population.')
        if (list(comparison.removed_source_ids) != spec['source_centerline_ids']
                or comparison.removed_directed_edges != spec['audit']['selected_directed_arcs']):
            raise ValueError('Results disagree with the approved removal definition.')
        cases[name] = {'summary': summarize_comparison(comparison),
                       'pairs': [asdict(pair) for pair in comparison.pairs]}
    if any(_file_digest(path) != before[name] for name, path in tracked.items()):
        raise ValueError('Input or executing code changed during run; export refused.')
    payload = {
        'schema_version': 1, 'product': 'Toronto Network Resilience Atlas',
        'scenario_id': spec['scenario_id'],
        'generated_at_utc': datetime.now(timezone.utc).isoformat(),
        'evidence_status': 'local_model_experiment_not_route_validated',
        'public_release_ready': False, 'cross_scenario_ranking_ready': False,
        'cost': {'attribute': 'length_m', 'units': 'metres', 'direction_aware': True},
        'interpretation': 'Structural OD sample; not people, traffic, travel time or legal route advice.',
        'limitations': [
            'Baseline topology is diagnostic; the reviewed prototype is not citywide validated.',
            'No example-route external validation or sampling sensitivity study is included.',
            'Different scenario populations must not be silently compared or ranked.',
            *spec['boundary_approval'].get('limitations', []),
        ],
        'provenance': {'input_and_code_sha256': before, 'python': platform.python_version()},
        'scenario_snapshot': spec, 'population_snapshot': population, 'cases': cases,
    }
    payload['entry_sha256'] = _payload_digest(payload)
    _write_new_json(payload, output)
    return payload
