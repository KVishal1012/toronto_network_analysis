"""Acquire complete energy workbooks and rights evidence without replacing baselines."""
from __future__ import annotations

import argparse
import hashlib
import json
import logging
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
from zipfile import BadZipFile
from xml.etree.ElementTree import ParseError

from openpyxl import load_workbook
from openpyxl.utils.exceptions import InvalidFileException

ROOT = Path(__file__).resolve().parents[1]
CATALOGUES = {
    'ontario': 'https://data.ontario.ca/api/3/action/package_show?id=energy-and-water-usage-of-large-buildings-in-ontario',
    'toronto': 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=annual-energy-consumption',
}
PAGES = {
    'ontario': 'https://data.ontario.ca/dataset/energy-and-water-usage-of-large-buildings-in-ontario',
    'toronto': 'https://open.toronto.ca/dataset/annual-energy-consumption/',
}
LICENCES = {
    'ontario': 'https://www.ontario.ca/page/open-government-licence-ontario',
    'toronto': 'https://open.toronto.ca/open-data-licence/',
}
HOSTS = {'data.ontario.ca', 'www.ontario.ca', 'open.toronto.ca', 'www.toronto.ca',
         'ckan0.cf.opendata.inter.prod-toronto.ca'}


def stamp() -> str:
    """Return a UTC retrieval timestamp."""
    return datetime.now(timezone.utc).isoformat()


def fetch(url: str, directory: Path) -> dict:
    """Archive a successful HTTPS response; failures never activate a snapshot."""
    if urlparse(url).scheme != 'https' or urlparse(url).hostname not in HOSTS:
        raise ValueError('Energy source host requires review: ' + url)
    with tempfile.NamedTemporaryFile(dir=directory, suffix='.partial', delete=False) as f:
        stage = Path(f.name)
    try:
        subprocess.run([
            'curl', '--fail', '--silent', '--show-error', '--location', '--proto', '=https',
            '--proto-redir', '=https', '--connect-timeout', '20', '--max-time', '180',
            '--retry', '2', '--output', str(stage), url,
        ], check=True, capture_output=True, text=True)
        if not stage.stat().st_size:
            raise ValueError('Empty response: ' + url)
        sha = hashlib.sha256(stage.read_bytes()).hexdigest()
        target = directory / sha
        stage.replace(target)
        return {'url': url, 'sha256': sha, 'path': sha, 'bytes': target.stat().st_size,
                'retrieved_at': stamp()}
    finally:
        stage.unlink(missing_ok=True)


def workbook_counts(path: Path) -> dict[str, int]:
    """Parse every worksheet fully; ZIP/worksheet truncation fails acquisition."""
    with path.open('rb') as stream:
        book = load_workbook(stream, read_only=True, data_only=True)
        try:
            return {s.title: sum(any(v is not None for v in row) for row in s.iter_rows(values_only=True))
                    for s in book.worksheets}
        finally:
            book.close()


def acquire(directory: Path, year: int) -> dict:
    """Discover exact year resources, acquire twice and record schema/rights evidence."""
    directory.mkdir(parents=True, exist_ok=False)
    receipt: dict = {'schema': 1, 'year': year, 'started_at': stamp(), 'sources': {}, 'failures': []}
    def save() -> None:
        (directory / 'acquisition.json').write_text(json.dumps(receipt, indent=2), encoding='utf-8')
    save()
    try:
        for source, catalogue_url in CATALOGUES.items():
            logging.info('Acquiring %s energy evidence', source)
            metadata = fetch(catalogue_url, directory)
            payload = json.loads((directory / metadata['path']).read_text(encoding='utf-8'))
            if not payload.get('success'):
                raise ValueError('Catalogue failed: ' + source)
            package = payload['result']
            resources = package['resources']
            if source == 'ontario':
                chosen = [r for r in resources if r['name'] == str(year)
                          and 'energie' not in r['url'].lower()]
                auxiliary = [r for r in resources if r['name'] == 'Data Dictionary']
            else:
                chosen = [r for r in resources if r['name'] == f'annual-energy-consumption-data-{year}.xlsx']
                auxiliary = [r for r in resources if r['name'] == 'annual-energy-consumption-readme']
            if len(chosen) != 1 or len(auxiliary) != 1:
                raise ValueError('Missing/ambiguous year or dictionary: ' + source)
            resource = chosen[0]
            first = fetch(resource['url'], directory)
            counts = workbook_counts(directory / first['path'])
            second = fetch(resource['url'], directory)
            if first['sha256'] != second['sha256'] or counts != workbook_counts(directory / second['path']):
                raise ValueError('Unstable workbook reread: ' + source)
            if min(counts.values()) < 2:
                raise ValueError('Empty worksheet requires review: ' + source)
            support = fetch(auxiliary[0]['url'], directory)
            workbook_counts(directory / support['path'])
            evidence = {}
            for name, url in [('dataset_page', PAGES[source]), ('licence', LICENCES[source])]:
                try:
                    evidence[name] = fetch(url, directory)
                except (subprocess.CalledProcessError, ValueError) as exc:
                    receipt['failures'].append({'source': source, 'step': name, 'url': url,
                                                'error': str(exc), 'at': stamp()})
            receipt['sources'][source] = {
                **first, 'resource_id': resource['id'], 'year': year, 'page': PAGES[source],
                'metadata': metadata, 'dictionary': support, 'evidence': evidence,
                'api_licence': package.get('license_id'), 'notes': package.get('notes'),
                'source_modified_at': resource.get('last_modified'), 'sheet_nonempty_rows': counts,
                'stable_reread': True, 'second_retrieved_at': second['retrieved_at'],
                'publisher_count_available': False,
            }
            save()
        receipt['complete'] = True
    except (subprocess.CalledProcessError, ValueError, OSError, KeyError, BadZipFile,
            ParseError, InvalidFileException, EOFError) as exc:
        receipt['failures'].append({'step': 'acquisition', 'error': str(exc), 'at': stamp()})
        save()
        raise
    receipt['finished_at'] = stamp()
    save()
    return receipt


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--year', type=int, default=2024)
    parser.add_argument('--directory', type=Path, default=ROOT / 'data/energy-source' /
                        datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ'))
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO)
    result = acquire(args.directory, args.year)
    print(json.dumps({'directory': str(args.directory), 'complete': result['complete'],
                      'failures': result['failures'],
                      'counts': {k: v['sheet_nonempty_rows'] for k, v in result['sources'].items()}}))
