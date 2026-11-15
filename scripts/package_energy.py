"""Package only exact rights-reviewed energy bytes; raw workbooks never ship."""
from __future__ import annotations

import gzip
import hashlib
import json
import re
import shutil
from pathlib import Path

from scripts.package_submission import validate_contract


def package_energy(source: Path, destination: Path, root: Path) -> dict:
    """Validate the source and evidence allowlist before copying generated assets."""
    contract_path = root / 'docs/energy/rights-contract.json'
    if not contract_path.exists() or not (source / 'latest.json').exists():
        return {'available': False, 'reason': 'No qualified energy package'}
    contract = json.loads(contract_path.read_text(encoding='utf-8'))
    if contract.get('status') != 'qualified_field_limited_derivatives':
        return {'available': False, 'reason': 'Energy rights not qualified'}
    validate_contract(source, contract, root)
    total = 0
    for version in contract['versions']:
        if not re.fullmatch(r'[a-f0-9]{20}', version):
            raise ValueError('Invalid energy version')
        directory = source / version
        manifest = json.loads((directory / 'manifest.json').read_text(encoding='utf-8'))
        if manifest['id'] != version or manifest['schema'] != 1:
            raise ValueError('Invalid energy manifest')
        if any(a['input'] != a['accounted'] for a in manifest['accounting'].values()):
            raise ValueError('Unreconciled energy records')
        allowed = {'manifest.json'}
        for name, expected in manifest['assets'].items():
            if not re.fullmatch(r'(cohorts|geography|cohorts/cohort-[a-f0-9]{12}|regions/(downtown|midtown)|facilities/toronto-\d+)', name):
                raise ValueError('Invalid energy asset path')
            logical = name + '.json.gz'
            raw = gzip.decompress((directory / logical).read_bytes())
            if hashlib.sha256(raw).hexdigest() != expected:
                raise ValueError('Energy checksum mismatch')
            allowed.add(logical)
        if set(contract['versions'][version]) != allowed:
            raise ValueError('Unexpected energy contents')
        for name in sorted(allowed):
            src, dest = directory / name, destination / version / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            total += src.stat().st_size
    if total > 15_000_000:
        raise ValueError('Energy evidence exceeds 15 MB publication budget')
    shutil.copy2(source / 'latest.json', destination / 'latest.json')
    return {'available': True, 'versions': sorted(contract['versions']), 'bytes': total,
            'rights_contract_sha256': hashlib.sha256(contract_path.read_bytes()).hexdigest()}
