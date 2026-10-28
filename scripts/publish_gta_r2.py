"""Audit and upload static planning objects to R2; dry run unless --publish is supplied."""
from __future__ import annotations
import argparse
import gzip
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STORAGE_LIMIT = 50_000_000_000
UPLOAD_LIMIT = 50_000  # A daily check cannot be allowed to create unbounded operations.


def inventory(source: Path) -> dict[str, Path]:
    """Validate every historical manifest and public content hash before upload."""
    files = {}
    for path in source.glob('*/manifest.json'):
        manifest = json.loads(path.read_text(encoding='utf-8'))
        if not re.fullmatch('[a-f0-9]{20}', path.parent.name) or manifest['id'] != path.parent.name:
            raise ValueError('Invalid snapshot identity')
        if not manifest.get('validation') or not all(manifest['validation'].values()):
            raise ValueError('Unvalidated snapshot')
        files[f'{path.parent.name}/manifest.json'] = path
        for digest in manifest['assets'].values():
            if not re.fullmatch('[a-f0-9]{64}', digest):
                raise ValueError('Invalid asset digest')
            key = f'objects/{digest}.json.gz'
            if key not in files:
                obj = source / key
                if hashlib.sha256(gzip.decompress(obj.read_bytes())).hexdigest() != digest:
                    raise ValueError('Asset checksum mismatch')
                files[key] = obj
    latest = json.loads((source / 'latest.json').read_text(encoding='utf-8'))
    if f'{latest["id"]}/manifest.json' not in files:
        raise ValueError('Latest snapshot unavailable')
    files['latest.json'] = source / 'latest.json'
    return files


def archive_inventory(source: Path) -> dict[str, Path]:
    """Only retain checksummed raw response blobs and known acquisition pointers."""
    files = {}
    if not source.exists():
        return files
    for path in source.iterdir():
        if path.is_file() and re.fullmatch('[a-f0-9]{64}', path.name):
            if hashlib.sha256(path.read_bytes()).hexdigest() != path.name:
                raise ValueError('Raw archive checksum mismatch')
            files['objects/' + path.name] = path
    for name in ('boundaries.json', 'brampton-opa.json', 'acquisition.json'):
        if (source / name).exists():
            # Content-address the receipts too; no raw evidence is served publicly.
            path = source / name
            files['receipts/' + hashlib.sha256(path.read_bytes()).hexdigest() + '.json'] = path
    return files


def aws(endpoint: str, *args: str) -> dict:
    """Use the installed AWS CLI; secrets remain in its environment/profile."""
    result = subprocess.check_output(['aws', '--endpoint-url', endpoint, '--region', 'auto',
        's3api', *args, '--output', 'json'], env={**os.environ, 'AWS_PAGER': ''})
    return json.loads(result or b'{}')


def publish(source: Path, raw: Path, execute: bool) -> dict:
    files = inventory(source)
    archives = archive_inventory(raw)
    archives.update(archive_inventory(ROOT / 'data/planning-source'))
    local_bytes = sum(p.stat().st_size for p in [*files.values(), *archives.values()])
    if local_bytes > STORAGE_LIMIT:
        raise ValueError('50 GB budget ceiling exceeded; history is retained and publication blocked')
    report = {'public_objects': len(files), 'private_archive_objects': len(archives), 'bytes': local_bytes, 'published': False}
    if not execute:
        return report
    account = os.environ.get('CLOUDFLARE_ACCOUNT_ID', '')
    if not re.fullmatch('[a-f0-9]{32}', account):
        raise ValueError('Set CLOUDFLARE_ACCOUNT_ID and configure AWS credentials for R2 before publishing')
    endpoint = f'https://{account}.r2.cloudflarestorage.com'
    jobs, total = [], 0
    for bucket, objects in [('aster-planning-public', files), ('aster-planning-archive', archives)]:
        existing = {r['Key']: r['Size'] for r in aws(endpoint, 'list-objects-v2', '--bucket', bucket).get('Contents', [])}
        total += sum(existing.values())
        for key, path in objects.items():
            size = path.stat().st_size
            if key != 'latest.json' and key in existing:
                if existing[key] != size:
                    raise ValueError('Immutable remote object size conflict')
                expected = hashlib.sha256(path.read_bytes()).hexdigest()
                if aws(endpoint, 'head-object', '--bucket', bucket, '--key', key).get('Metadata', {}).get('sha256') != expected:
                    raise ValueError('Immutable remote object checksum conflict')
                continue
            total += size - existing.get(key, 0)
            jobs.append((bucket, key, path))
    if total > STORAGE_LIMIT or len(jobs) > UPLOAD_LIMIT:
        raise ValueError('Storage or operation ceiling exceeded; publication blocked without deleting history')
    # All archives/objects first, manifests next, latest pointer last.
    jobs.sort(key=lambda job: (job[1] == 'latest.json', job[1].endswith('/manifest.json'), job[1]))
    for bucket, key, path in jobs:
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        aws(endpoint, 'put-object', '--bucket', bucket, '--key', key, '--body', str(path),
            '--metadata', f'sha256={digest}', '--content-type', 'application/octet-stream' if key.endswith('.gz') else 'application/json')
        if aws(endpoint, 'head-object', '--bucket', bucket, '--key', key).get('Metadata', {}).get('sha256') != digest:
            raise ValueError('Remote verification failed; publication stopped')
    report.update(published=True, uploaded_objects=len(jobs), remote_bytes=total)
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=ROOT / 'public/planning')
    parser.add_argument('--archive', type=Path, default=ROOT / 'data/gta-source')
    parser.add_argument('--publish', action='store_true')
    args = parser.parse_args()
    print(json.dumps(publish(args.source, args.archive, args.publish)))
