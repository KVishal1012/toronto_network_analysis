"""Fail-closed identity and record comparison primitives for the public site twin.

Geometry and address agreement are candidate evidence only. Registry documents
are local review artifacts until the release gate passes.
"""
from __future__ import annotations

import hashlib
import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any


def digest(value: Any) -> str:
    """Hash canonical JSON without silently serializing unsupported values."""
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False, allow_nan=False).encode()).hexdigest()


def new_site(registry: dict, label: str, evidence: list[dict], *, parents: list[str] | None = None) -> dict:
    """Allocate an internal identity after a reviewed site assertion.

    Parents record splits/merges; neither geometry hashes nor row numbers are IDs.
    The caller persists the returned versioned registry as an immutable artifact.
    """
    if not label.strip() or not evidence or any(not e.get('source') or not e.get('reference') or not e.get('reviewer') for e in evidence):
        raise ValueError('A site requires a label and reviewed source references')
    parents = sorted(set(parents or []))
    if any(p not in registry['sites'] for p in parents):
        raise ValueError('Unknown predecessor site')
    site_id = 'site-' + str(uuid.uuid4())
    site = {'id': site_id, 'label': label, 'predecessors': parents, 'evidence': evidence, 'addresses': [], 'structures': []}
    registry['sites'][site_id] = site
    registry['version'] += 1
    return site


def association(site_id: str | None, record: str, state: str, method: str, evidence: list[dict]) -> dict:
    """Validate a provenance-bearing association without promoting proximity."""
    if state not in {'confirmed', 'candidate', 'rejected', 'unresolved'} or not record:
        raise ValueError('Invalid association')
    if state != 'unresolved' and not site_id:
        raise ValueError('Resolved association requires a site')
    if not evidence or any(not e.get('source') or not e.get('reference') for e in evidence):
        raise ValueError('Association requires source evidence')
    if state == 'confirmed' and (method not in {'publisher-site-reference', 'reviewed-site-assertion'} or any(not e.get('reviewer') for e in evidence)):
        raise ValueError('Confirmation requires reviewed identity evidence; spatial/address agreement is insufficient')
    return {'site_id': site_id, 'record': record, 'state': state, 'method': method, 'evidence': evidence}


def compare_observations(before: dict, after: dict) -> dict:
    """Compare complete source observations with qualified persistent record keys.

    Input records are keyed by qualified publisher identity, never export row IDs.
    Fields are original publisher fields, not UI-normalized statuses or distances.
    """
    if before['source'] != after['source']:
        raise ValueError('Cannot compare different sources')
    if observation_time(before) >= observation_time(after):
        raise ValueError('Comparison dates must increase')
    if not before.get('complete') or not after.get('complete'):
        return {'state': 'unavailable', 'reason': 'Incomplete export', 'changes': []}
    if not before.get('identity_qualified') or not after.get('identity_qualified'):
        return {'state': 'unavailable', 'reason': 'Record identity is not qualified', 'changes': []}
    if before['raw_sha256'] == after['raw_sha256']:
        return {'state': 'unchanged', 'changes': []}
    old, new = before['records'], after['records']
    changes = []
    for key in sorted(old.keys() | new.keys()):
        if key not in old:
            change = {'kind': 'first_observed', 'record': key, 'after': new[key]}
        elif key not in new:
            change = {'kind': 'absent_from_complete_export', 'record': key, 'before': old[key]}
        else:
            fields = {f: {'before': old[key].get(f), 'after': new[key].get(f)} for f in sorted(old[key].keys() | new[key].keys()) if (f in old[key]) != (f in new[key]) or old[key].get(f) != new[key].get(f)}
            if not fields:
                continue
            change = {'kind': 'publisher_fields_changed', 'record': key, 'fields': fields}
        change['observations'] = [{k: obs[k] for k in ('source', 'raw_sha256', 'retrieved_at')} for obs in (before, after)]
        changes.append(change)
    return {'state': 'compared' if changes else 'unchanged', 'changes': changes}


def release_gate(checks: dict[str, bool], participants: list[dict]) -> dict:
    """Require every technical gate and five distinct successful human checks."""
    required = {'boundaries', 'rights', 'accounting', 'site_identity', 'matching_review', 'history', 'browser_qa', 'public_isolation'}
    blockers = sorted(k for k in required if checks.get(k) is not True)
    def valid_session(p: dict) -> bool:
        try:
            datetime.fromisoformat(p.get('date', ''))
        except (TypeError, ValueError):
            return False
        return (p.get('human_participant') is True and p.get('passed') is True
                and all(isinstance(p.get(k), str) and p[k].strip()
                        for k in ('participant_id', 'tested_build', 'evidence_reference'))
                and isinstance(p.get('task_results'), list) and len(p['task_results']) == 5
                and all(isinstance(t, dict) and t.get('passed') is True
                        and isinstance(t.get('response'), str) and t['response'].strip()
                        for t in p['task_results']))
    valid = {p['participant_id'] for p in participants if valid_session(p)}
    builds = {p.get('tested_build') for p in participants if valid_session(p)}
    if len(valid) < 5 or len(builds) != 1 or any(not valid_session(p) for p in participants):
        blockers.append('five_person_comprehension')
    return {'ready': not blockers, 'blockers': blockers}


def index_records(records: list[dict], identity_field: str) -> dict[str, dict]:
    """Reject missing/duplicate publisher identities instead of overwriting rows."""
    indexed = {}
    for row in records:
        value = row.get(identity_field)
        if value is None or str(value).strip() == '':
            raise ValueError('Missing publisher identity')
        key = str(value)
        if key in indexed:
            raise ValueError('Duplicate publisher identity requires adjudication')
        indexed[key] = row
    return indexed


def history(observations: list[dict]) -> dict:
    """Keep packaging copies out of a timeline; expose baseline-only explicitly."""
    if len({obs['source'] for obs in observations}) > 1:
        raise ValueError('History requires one source')
    distinct = []
    for obs in sorted(observations, key=observation_time):
        if not distinct or distinct[-1]['raw_sha256'] != obs['raw_sha256']:
            distinct.append(obs)
    if len(distinct) < 2:
        return {'state': 'baseline_only' if distinct else 'unavailable', 'comparisons': []}
    comparisons = [compare_observations(a,b) for a,b in zip(distinct,distinct[1:])]
    return {'state': 'unavailable' if any(c['state']=='unavailable' for c in comparisons) else 'available', 'comparisons': comparisons}


def save_registry(registry: dict, directory: Path) -> str:
    """Persist an immutable version by content hash; never replace prior versions."""
    from pathlib import Path
    if not isinstance(registry.get('version'), int) or registry['version'] < 1 or not isinstance(registry.get('sites'), dict):
        raise ValueError('Invalid registry envelope')
    for key, site in registry['sites'].items():
        if key != site.get('id') or any(p not in registry['sites'] for p in site.get('predecessors', [])):
            raise ValueError('Invalid site identity or lineage')
    identifier = digest(registry)
    directory = Path(directory)
    directory.mkdir(parents=True, exist_ok=True)
    target = directory / f'{identifier}.json'
    raw = json.dumps(registry, sort_keys=True, separators=(',', ':'), ensure_ascii=False, allow_nan=False)
    try:
        with target.open('x', encoding='utf-8') as handle:
            handle.write(raw)
    except FileExistsError:
        if target.read_text(encoding='utf-8') != raw:
            raise ValueError('Existing registry version does not match its content hash')
    return identifier


def observation_time(observation: dict) -> datetime:
    """Require timezone-aware receipt times before ordering observations."""
    value = datetime.fromisoformat(observation['retrieved_at'].replace('Z', '+00:00'))
    if value.tzinfo is None:
        raise ValueError('Observation time requires a timezone')
    return value
