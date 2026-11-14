"""Package only hash-verified immutable screening assets, preserving pinned versions."""
import gzip,hashlib,json,re,shutil
from pathlib import Path


def package_screening(source: Path,destination: Path, allowed_versions: set[str] | None = None) -> dict:
    if not (source/'latest.json').exists():return {'available':False}
    latest=json.loads((source/'latest.json').read_text());ids=[];total=0
    withdrawn=json.loads((source/'withdrawn.json').read_text()) if (source/'withdrawn.json').exists() else {}
    for path in sorted(source.glob('*/manifest.json')):
        m=json.loads(path.read_text());version=m['id']
        if version in withdrawn or (allowed_versions is not None and version not in allowed_versions):continue
        if not re.fullmatch('[a-f0-9]{20}',version) or path.parent.name!=version:raise ValueError('Invalid screening identity')
        if m['accounting']['input_records']!=m['accounting']['accounted_records']:raise ValueError('Unreconciled screening records')
        dest=destination/version;dest.mkdir(parents=True,exist_ok=True)
        for key,expected in m['assets'].items():
            if not re.fullmatch(r'(outcomes|regions/(downtown|midtown|north-york)|areas/\d+_\d+)',key):raise ValueError('Invalid screening asset')
            src=path.parent/(key+'.json.gz');raw=gzip.decompress(src.read_bytes())
            if hashlib.sha256(raw).hexdigest()!=expected:raise ValueError('Screening checksum mismatch')
            target=dest/(key+'.json.gz');target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,target);total+=src.stat().st_size
        shutil.copy2(path,dest/'manifest.json');ids.append(version)
    if latest['id'] not in ids:raise ValueError('Missing latest screening version')
    if total>30_000_000:raise ValueError('Screening data exceeds 30 MB publication budget')
    shutil.copy2(source/'latest.json',destination/'latest.json')
    (destination/'withdrawn.json').write_text(json.dumps(withdrawn),encoding='utf-8')
    return {'available':True,'versions':ids,'bytes':total}
