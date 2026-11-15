"""Fail-closed packaging of the explicitly reviewed screening release only."""
from __future__ import annotations
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def validate_contract(source: Path, contract: dict, evidence_root: Path) -> None:
    """Require exact reviewed bytes and licence evidence; new versions need review."""
    for item in contract['evidence_files']:
        if hashlib.sha256((evidence_root/item['path']).read_bytes()).hexdigest() != item['sha256']:
            raise ValueError('Rights evidence changed: '+item['path'])
    for version, expected in contract['versions'].items():
        actual = {p.relative_to(source/version).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
                  for p in (source/version).rglob('*') if p.is_file()}
        if actual != expected:
            raise ValueError('Unreviewed screening contents: '+version)
    if json.loads((source/'latest.json').read_text())['id'] not in contract['versions']:
        raise ValueError('Latest analysis has no rights review')


def package(source: Path, destination: Path) -> dict:
    """Replace generated data with a reviewed subset; never modify source archives."""
    from scripts.package_screening import package_screening
    contract = json.loads((ROOT/'docs/growth-transit/package-rights-contract.json').read_text())
    screening = source.parent/'screening'
    validate_contract(screening, contract, ROOT)
    studio=contract['studio']
    if hashlib.sha256((ROOT/studio['source_path']).read_bytes()).hexdigest()!=studio['sha256'] or studio['status']!='qualified_for_illustrative_use':
        raise ValueError('Unreviewed 3D baseline')
    architectural=studio['architectural']
    if hashlib.sha256((ROOT/architectural['source_path']).read_bytes()).hexdigest()!=architectural['sha256'] or architectural['status']!='qualified_for_illustrative_use':
        raise ValueError('Unreviewed architectural views')
    output = destination/'planning'
    # This directory is generated build output, not the immutable source store.
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)
    # package_screening validates raw checksums as well as these compressed hashes.
    report = package_screening(screening, output/'screening', allowed_versions=set(contract['versions']))
    from scripts.package_energy import package_energy
    energy = package_energy(source.parent/'energy', output/'energy', ROOT)
    excluded = []
    for path in sorted(source.glob('*/manifest.json')):
        m = json.loads(path.read_text())
        excluded.append({'snapshot': m['id'], 'sources': list(m.get('sources', {})),
                         'reason': 'Legacy full-record assets are outside the reviewed field-limited submission. No blanket redistribution approval.'})
    result = {'edition': 'housing-transit-3d', 'screening': report, 'energy': energy, 'legacy_snapshots_excluded': excluded,
              'disabled_features': ['legacy address explorer', 'legacy map and full application details', 'standalone transport explorer', 'energy guidance via legacy explorer'],
              'rights_contract_sha256': hashlib.sha256((ROOT/'docs/growth-transit/package-rights-contract.json').read_bytes()).hexdigest(),
              'raw_private_files_included': False}
    (destination/'release-validation.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
    (destination/'.nojekyll').touch()
    return result
