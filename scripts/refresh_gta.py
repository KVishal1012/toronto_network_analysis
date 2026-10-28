"""Refresh GTA sources independently, compose last-good snapshots, and expose failures."""
from __future__ import annotations
import json
import argparse
import gzip
import hashlib
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.acquire_gta import acquire, encoded, now
from scripts.acquire_planning import acquire as acquire_toronto
from scripts.build_planning import build as build_toronto
from scripts.build_gta import build, load_receipt, checked_geometry
from scripts.refresh_planning import record_failure
from scripts.gta_adapters import address_rows, planning_rows

ROOT = Path(__file__).resolve().parents[1]


def refresh(output: Path, directory: Path, selected_sources: list[str] | None = None) -> int:
    """A source outage retains its evidence while successful sources can advance."""
    configs = json.loads((ROOT / 'scripts/gta_contracts.json').read_text(encoding='utf-8'))
    before = json.loads((output / 'latest.json').read_text(encoding='utf-8'))
    old = json.loads((output / before['id'] / 'manifest.json').read_text(encoding='utf-8'))
    toronto_id = old.get('source_snapshots', {}).get('toronto', old['id'])
    adapters = json.loads((ROOT / 'scripts/gta_adapters.json').read_text(encoding='utf-8'))
    statuses = dict(before.get('sources', {}))
    enabled = ['toronto', *[k for k,c in configs.items() if c.get('acquisition_enabled', True) and (k not in adapters or adapters[k]['enabled'])]]
    requested = selected_sources or enabled
    if any(k not in enabled for k in requested):
        raise ValueError('Unknown or blocked source requested')
    municipalities = []
    if old.get('assets', {}).get('municipalities.json'):
        digest = old['assets']['municipalities.json']
        raw = gzip.decompress((output/'objects'/f'{digest}.json.gz').read_bytes())
        if hashlib.sha256(raw).hexdigest()!=digest: raise ValueError('Boundary asset checksum mismatch')
        municipalities = json.loads(raw)

    def run(key: str) -> str | None:
        if key == 'toronto':
            acquire_toronto(ROOT / 'data/planning-source')
            return build_toronto(ROOT / 'data/planning-source', output, activate=False)['id']
        pointer = directory / f'{key}.json'
        saved = pointer.read_bytes() if pointer.exists() else None
        try:
            acquire(key, configs[key], directory)
            _, data = load_receipt(directory, key, configs[key])
            if key == 'boundaries':
                for feature in data['features']:
                    checked_geometry(feature)
            elif key in adapters:
                adapter = adapters[key]
                (address_rows if adapter['kind']=='addresses' else planning_rows)(key, data, adapter, configs[key], municipalities)
        except Exception:
            if saved is not None:
                pointer.write_bytes(saved)
            else:
                pointer.unlink(missing_ok=True)
            raise
        return None
    with ThreadPoolExecutor(max_workers=2) as pool:
        jobs = {pool.submit(run, key): key for key in requested}
        for future in as_completed(jobs):
            key = jobs[future]
            try:
                result = future.result()
                if key == 'toronto':
                    toronto_id = result
                statuses[key] = {'status': 'ok', 'checked_at': now()}
            except Exception as error:
                logging.exception('Source %s failed', key)
                statuses[key] = {**statuses.get(key,{}), 'status': 'delayed', 'attempted_at': now(), 'error': str(error)[:300]}
    try:
        manifest = build(directory, output, activate=False, toronto_id=toronto_id)
        failed = [key for key, status in statuses.items() if status['status'] != 'ok']
        health = {'id': manifest['id'], 'checked_at': before.get('checked_at') if selected_sources else now(), 'last_partial_check': now(), 'status': 'delayed' if failed else 'ok', 'sources': statuses}
        if failed:
            health['error'] = 'Last verified evidence retained for: ' + ', '.join(failed)
        temporary = output / '.gta-latest.tmp'
        temporary.write_bytes(encoded(health)); temporary.replace(output / 'latest.json')
        return int(bool(failed))
    except Exception:
        logging.exception('Regional composition failed; original snapshot retained')
        record_failure(output, 'Regional composition failed; last verified snapshot retained.')
        return 1


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources', nargs='+', help='Refresh only these enabled sources; preserve the aggregate full-check timestamp')
    args = parser.parse_args()
    raise SystemExit(refresh(ROOT / 'public/planning', ROOT / 'data/gta-source', args.sources))
