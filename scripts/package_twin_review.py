"""Export only explicit registry/evidence fields for a LOCAL twin review build.

Never called by package_public or prepare_distribution. No private Lab files,
notes, credentials or raw databases are copied into this build.
"""
from __future__ import annotations
import gzip,json,sqlite3,math,shutil
from collections import defaultdict
from pathlib import Path
import sys
from shapely.geometry import shape
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.audit_site_history import read_object
ROOT=Path(__file__).resolve().parents[1]


def write_gzip(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_bytes(gzip.compress(json.dumps(value,separators=(',',':'),ensure_ascii=False,allow_nan=False).encode(),mtime=0))


def package(root: Path=ROOT) -> dict:
    from scripts.qualify_twin_candidate import adjudications
    decisions=adjudications(root)
    decision_refs=defaultdict(list)
    for case in decisions['cases']:
        for record in case['records']:
            decision_refs[(case['source'],record)].append({'version':decisions['adjudication_version'],'case_id':case['case_id'],'decision':case['decision'],'reviewer_type':case['reviewer_type']})
    dest=root/'dist-twin-review';base=root/'public/planning'
    db=sqlite3.connect(f"file:{root/'data/site-registry/registry.sqlite'}?mode=ro",uri=True)
    versions=db.execute('SELECT id,receipt FROM versions ORDER BY rowid').fetchall()
    boundaries=json.loads((root/'docs/site-history/boundaries.json').read_text())
    report=[]
    for version,raw in versions:
        receipt=json.loads(raw);folder=dest/'twin'/version
        manifest=json.loads((base/receipt['planning_snapshot']/'manifest.json').read_text())
        details={};records={}
        for kind in ['projects','applications']:
            for row in read_object(base,manifest,kind+'.json'):
                path=row.get('detail');detail={}
                if path:
                    if path not in details:details[path]=read_object(base,manifest,path)
                    detail=details[path].get(row['id'],{})
                attrs=detail.get('attributes',{})
                records[(kind,row['id'])]={'id':row['id'],'source':kind,'label':row['label'],'number':row.get('number'),'status':row.get('original_status',row['status']),'description':detail.get('description'),'url':detail.get('official_url'),'publisher':'City of Toronto','retrieved_at':manifest['sources'][kind]['retrieved_at'],'source_page':manifest['sources'][kind]['page'],'source_sha256':manifest['sources'][kind]['sha256'],'event_date':attrs.get('DATE_SUBMITTED') or attrs.get('Date Received'),'geometry_origin':row['geometry_origin']}
        linked=defaultdict(list);reviewed=defaultdict(list)
        for (raw,) in db.execute('SELECT payload FROM reviews WHERE version=?',(version,)):
            r=json.loads(raw)
            for record in r.get('records',[]):reviewed[(r['source'],record)].append(r.get('reason','Association requires review'))
        for (raw,) in db.execute('SELECT payload FROM matches WHERE version=?',(version,)):
            m=json.loads(raw)
            for sid in m['candidate_site_ids']:
                linked[sid].append({**records[(m['source'],m['record_id'])],'adjudications':decision_refs[(m['source'],m['record_id'])],'association':m['state'],'association_reason':m['reason'],'review_notes':reviewed[(m['source'],m['record_id'])]})
        shards=defaultdict(dict);indices=defaultdict(list);tiles=defaultdict(list);total=0
        for (raw,) in db.execute('SELECT payload FROM observations WHERE version=? ORDER BY site_id',(version,)):
            row=json.loads(raw);g=shape(row['geometry']);p=g.representative_point();sid=row['site_id'];source_ref=row['source_references'][0]
            links=linked[sid];labels=sorted({r['label'] for r in links});label=labels[0] if labels else 'Parcel '+str(source_ref['PARCELID'])
            item={'id':sid,'label':label,'labels':labels,'centre':[p.x,p.y],'record_count':len(links),'regions':row['regions'],'feature_type':row['feature_type']}
            evidence={**item,'geometry':row['geometry'],'source_references':row['source_references'],'records':links,'identity_state':row['identity_state'],'version':version,'geometry_retrieved_at':receipt['acquisition']['retrieved_at'],'history_state':'baseline_only','history_note':'Only one qualified parcel observation is available. Planning source observations are not confirmed physical changes.'}
            shards[sid[5:7]][sid]=evidence
            for region in row['regions']:indices[region].append(item)
            w,s,e,n=g.bounds
            feature={'type':'Feature','geometry':row['geometry'],'properties':{'id':sid,'records':len(links)}}
            for x in range(math.floor(w*100),math.floor(e*100)+1):
                for y in range(math.floor(s*100),math.floor(n*100)+1):tiles[f'{x}_{y}'].append(feature)
            total+=1
        for prefix,rows in shards.items():write_gzip(folder/'sites'/f'{prefix}.json.gz',rows)
        for region,rows in indices.items():write_gzip(folder/'regions'/f'{region}.json.gz',sorted(rows,key=lambda r:(-r['record_count'],r['label'],r['id'])))
        for key,features in tiles.items():write_gzip(folder/'tiles'/f'{key}.json.gz',{'type':'FeatureCollection','features':features})
        write_gzip(folder/'boundaries.json.gz',{'type':'FeatureCollection','features':[{'type':'Feature','geometry':r['geometry'],'properties':{'id':r['id'],'label':r['label']}} for r in boundaries['regions']]})
        write_gzip(folder/'streets.json.gz',read_object(base,manifest,'context.json'))
        meta={'version':version,'local_review_only':True,'release_ready':False,'site_count':total,'receipt':receipt,'regions':[{'id':r['id'],'label':r['label'],'count':len(indices[r['id']])} for r in boundaries['regions']],'tile_keys':sorted(tiles),'observations':[{'version':version,'retrieved_at':receipt['acquisition']['retrieved_at']}]}
        (folder/'manifest.json').write_text(json.dumps(meta),encoding='utf-8');report.append({'version':version,'sites':total,'tiles':len(tiles)})
    db.close();(dest/'twin/latest.json').write_text(json.dumps({'version':versions[-1][0]}))
    shutil.copy2(dest/'twin-review.html',dest/'index.html')
    return {'local_review_only':True,'versions':report}

if __name__=='__main__':print(json.dumps(package()))
