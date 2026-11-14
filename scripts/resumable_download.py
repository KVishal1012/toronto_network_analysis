"""Bounded HTTPS downloads with validator-bound, range-checked checkpoints."""
from pathlib import Path
import json
import re
import subprocess


def transport(url: str, body: Path, headers: Path, *, head: bool = False,
              start: int | None = None, validator: str = '', http1: bool = False) -> int:
    args = ['curl', '--silent', '--show-error', '--location', '--proto', '=https',
            '--proto-redir', '=https', '--connect-timeout', '30', '--max-time', '180',
            '--dump-header', str(headers), '--output', str(body)]
    if head:
        args.append('--head')
    if http1:
        args.append('--http1.1')
    if start is not None:
        args += ['--range', f'{start}-{start + 8*1024*1024 - 1}', '--header', 'If-Range: '+validator]
    return subprocess.run(args+[url], check=False).returncode


def response(path: Path) -> tuple[int, dict]:
    blocks = re.split(r'\r?\n\r?\n', path.read_text(encoding='utf-8', errors='replace'))
    blocks = [b for b in blocks if b.startswith('HTTP/')]
    if not blocks:
        raise ValueError('Missing HTTP response')
    lines = blocks[-1].splitlines()
    return int(lines[0].split()[1]), {k.lower(): v.strip() for line in lines[1:] if ':' in line for k,v in [line.split(':',1)]}


def fetch(url: str, target: Path, *, request=transport, max_requests: int = 100) -> None:
    """Keep partial bytes only when validated against a stable resource identity."""
    if not url.startswith('https://'):
        raise ValueError('HTTPS required')
    target.parent.mkdir(parents=True, exist_ok=True)
    part = target.with_suffix(target.suffix+'.part')
    meta = target.with_suffix(target.suffix+'.resume.json')
    headers = target.with_suffix(target.suffix+'.headers')
    chunk = target.with_suffix(target.suffix+'.chunk')
    log = target.with_suffix(target.suffix+'.attempts.jsonl')
    failures = 0
    for attempt in range(max_requests):
        http1 = failures > 0
        code = request(url, chunk, headers, head=True, http1=http1)
        status, h = response(headers)
        if code or status != 200:
            raise ValueError('Resource metadata unavailable')
        etag = h.get('etag', '')
        validator = etag if etag and not etag.startswith('W/') else h.get('last-modified', '')
        total = int(h.get('content-length', '0'))
        ranged = h.get('accept-ranges', '').lower() == 'bytes' and bool(validator) and total > 0
        identity = {'url': url, 'validator': validator, 'size': total}
        prior = json.loads(meta.read_text()) if meta.exists() else None
        if prior != identity or not ranged:
            part.unlink(missing_ok=True)
        meta.write_text(json.dumps(identity), encoding='utf-8')
        offset = part.stat().st_size if part.exists() else 0
        if ranged and offset == total:
            part.replace(target)
            return
        if offset > total and ranged:
            part.unlink(); offset = 0
        code = request(url, chunk, headers, start=offset if ranged else None,
                       validator=validator, http1=http1)
        status, got = response(headers)
        size = chunk.stat().st_size if chunk.exists() else 0
        received_validator = got.get('etag') if etag and not etag.startswith('W/') else got.get('last-modified')
        consistent = not validator or received_validator == validator
        accepted = False
        if ranged and status == 206 and consistent:
            match = re.fullmatch(r'bytes (\d+)-(\d+)/(\d+)', got.get('content-range', ''))
            if match and int(match[1]) == offset and int(match[3]) == total and int(match[2]) < total and 0 < size <= int(match[2])-offset+1:
                with part.open('ab') as out, chunk.open('rb') as inp:
                    while data := inp.read(1024*1024):
                        out.write(data)
                accepted = True
        elif status == 200 and not code and consistent and size > 0 and (not total or size == total):
            # A server ignoring Range is acceptable only as a complete replacement.
            chunk.replace(part); accepted = True
        with log.open('a', encoding='utf-8') as out:
            out.write(json.dumps({'attempt': attempt+1, 'offset': offset, 'status': status, 'curl_exit': code, 'bytes': size, 'accepted': accepted, 'http1': http1})+'\n')
        if accepted and (not total or part.stat().st_size == total):
            part.replace(target)
            return
        if not accepted or code:
            failures += 1
            if not consistent or status == 200:
                part.unlink(missing_ok=True)
            if failures >= 3:
                raise ValueError('Download interrupted; safe checkpoint retained where available')
    raise ValueError('Download request budget exhausted; checkpoint retained')
