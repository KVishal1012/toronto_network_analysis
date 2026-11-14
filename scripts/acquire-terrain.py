"""Download fixed City TIN archive, verify size, extract allowlisted files, process."""
import hashlib,json,ssl,zipfile
from datetime import datetime,timezone
from urllib.request import urlopen
import certifi
from server.store import fetch,CATALOG,DATA
from server.terrain import process,ROOT

def main():
    metadata,meta_hash=fetch(CATALOG+'triangular-irregular-network-tin')
    resource=next(r for r in metadata['result']['resources'] if r['name']=='triangular-irregular-network')
    archive=DATA/'terrain-source.zip';receipt_path=DATA/'terrain-source-receipt.json'
    with urlopen(resource['url'],context=ssl.create_default_context(cafile=certifi.where()),timeout=60) as source,archive.with_suffix('.part').open('wb') as target:
        digest=hashlib.sha256();size=0
        while chunk:=source.read(1024*1024):
            size+=len(chunk)
            if size>250_000_000:raise ValueError('Archive exceeds 250 MB download bound')
            target.write(chunk);digest.update(chunk)
    if resource.get('size') and size!=resource['size']:raise ValueError('Archive length differs from catalogue metadata')
    archive.with_suffix('.part').replace(archive)
    receipt_path.write_text(json.dumps({'url':resource['url'],'sha256':digest.hexdigest(),'metadata_sha256':meta_hash,'source_modified_at':resource.get('last_modified'),'retrieved_at':datetime.now(timezone.utc).isoformat(),'bytes':size,'notes':metadata['result']['notes']}),encoding='utf-8')
    ROOT.mkdir(exist_ok=True)
    with zipfile.ZipFile(archive) as z:
        names=['2023_TIN'+suffix for suffix in ['.shp','.shx','.dbf','.prj','.cpg']]
        if sum(z.getinfo(n).file_size for n in names)>1_500_000_000:raise ValueError('Expanded archive too large')
        for name in names:z.extract(name,ROOT)
    print(json.dumps(process()))
if __name__=='__main__':main()
