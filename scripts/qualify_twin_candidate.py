"""Produce immutable review decisions and build-bound qualification artifacts.

An unresolved outcome completes evidence triage, not site identity qualification.
"""
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
import hashlib
import gzip
import json
import sqlite3
import re
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.site_history import digest, release_gate
from scripts.audit_twin_release import audit
ROOT=Path(__file__).resolve().parents[1]


def inventory(folder: Path) -> dict:
    return {p.relative_to(folder).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(folder.rglob('*')) if p.is_file() and p.name!='qualification.json'}


def adjudications(root: Path=ROOT) -> dict:
    """Retain every diagnostic case as an explicit, source-bound unresolved decision."""
    with sqlite3.connect(f"file:{root/'data/site-registry/registry.sqlite'}?mode=ro",uri=True) as db:
        version=db.execute('select id from versions order by rowid desc limit 1').fetchone()[0]
        rows=[json.loads(r[0]) for r in db.execute('select payload from reviews where version=? order by review_id',(version,))]
    cases=[]
    document_path=root/'data/site-document-review/receipts.json'
    documents=json.loads(document_path.read_text()) if document_path.exists() else []
    document_by_number={'14 116571 STE 20 OZ':'downtown-front-draper', '25 251661 NNY 08 OZ':'north-york-lawrence-heights'}
    for r in rows:
        if not r['id'].startswith(('publisher-number:','no-containment:')):continue
        cases.append({'case_id':r['id'],'registry_version':version,'reviewer_type':'ai_evidence_triage',
                      'decision':'unresolved','identity_established':False,'reason':r['reason'],
                      'records':r.get('records',[r.get('record_id')]),'source':r['source'],
                      'candidate_site_ids':r.get('candidate_site_ids',[]),'evidence':r['evidence'],
                      'required_evidence':'Authoritative site plan or explicit parcel reference reconciled to the current parcel observation.',
                      'document_review_complete':False,
                      'supplementary_context':[d for d in documents if d.get('retrieval_succeeded') and d.get('sha256') and document_by_number.get(r.get('publisher_number'))==d.get('document')]})
    result={'registry_version':version,'cases':cases,'confirmed':0,'review_scope':'All diagnostic evidence evaluated; authoritative document adjudication remains incomplete.'}
    result['adjudication_version']=digest(result)
    folder=root/'data/site-adjudications';folder.mkdir(exist_ok=True)
    target=folder/(result['adjudication_version']+'.json')
    raw=json.dumps(result,sort_keys=True,indent=2)
    if target.exists() and target.read_text()!=raw:raise ValueError('Immutable adjudication collision')
    if not target.exists():target.write_text(raw,encoding='utf-8')
    (folder/'latest.json').write_text(json.dumps({'version':result['adjudication_version']}),encoding='utf-8')
    return result


def candidate_isolation(folder: Path) -> list[str]:
    errors=[]
    for p in folder.rglob('*'):
        if not p.is_file():continue
        name=p.relative_to(folder).as_posix()
        allowed=(name in {'index.html','twin-review.html','.vite/manifest.json','qualification.json','twin/latest.json'}
                 or re.fullmatch(r'assets/[^/]+\.(js|css)',name)
                 or re.fullmatch(r'twin/[a-f0-9]{64}/(manifest\.json|(streets|boundaries)\.json\.gz|sites/[a-f0-9]{2}\.json\.gz|regions/(downtown|midtown|north-york)\.json\.gz|tiles/-?\d+_-?\d+\.json\.gz)',name))
        if not allowed:errors.append(name)
        if p.suffix in {'.sqlite','.pdf','.env'}:errors.append(name)
        if p.suffix=='.js' and any(x in p.read_text() for x in ('VITE_GOOGLE_MAPS_API_KEY','TerrainScene','Opening local research workspace')):errors.append(name)
    manifest=folder/'.vite/manifest.json'
    if not manifest.exists():errors.append('missing Vite module manifest')
    else:
        for key,entry in json.loads(manifest.read_text()).items():
            src=entry.get('src',key)
            if not (src=='twin-review.html' or src.startswith(('src/twin-review/','_'))):errors.append('module:'+src)
    return errors


def qualify(root: Path=ROOT) -> dict:
    folder=root/'dist-twin-review';files=inventory(folder);build=digest(files)
    review=adjudications(root);census=audit(root)
    iso=candidate_isolation(folder)
    from scripts.twin_rights_register import register
    rights=register(root)
    histories=[]
    for path in (folder/'twin').glob('*/sites/*.json.gz'):
        histories.extend(s.get('history_state') for s in json.loads(gzip.decompress(path.read_bytes())).values())
    baseline_ok=bool(histories) and set(histories)=={'baseline_only'} and census['distinct_parcel_observations']==1
    boundaries=json.loads((root/'docs/site-history/boundaries.json').read_text())
    registry_receipt=json.loads((root/'docs/site-history/parcel-registry-report.json').read_text())['receipt']
    boundaries_ok=boundaries['version']==registry_receipt['boundary_version'] and boundaries.get('overlaps_preserved') is True and len(boundaries.get('regions',[]))==3
    documents_complete=bool(review['cases']) and all(c['document_review_complete'] for c in review['cases'])
    gates={
        'boundaries':{'status':'passed' if boundaries_ok else 'blocked','evidence':{'boundary_version':boundaries['version'],'registry_boundary_version':registry_receipt['boundary_version']}},
        'accounting':{'status':'passed' if not census['errors'] else 'blocked','evidence':'release-review.json','details':census['errors']},
        'matching_review':{'status':'passed' if documents_complete else 'blocked','evidence':review['adjudication_version'],'details':'Diagnostic triage complete; document/site-plan adjudication incomplete.'},
        'site_identity':{'status':'blocked','evidence':review['adjudication_version'],'details':'No established development-site identities; public site pages disabled.'},
        'history':{'status':'passed' if baseline_ok else 'blocked','evidence':{'site_history_states':dict(Counter(histories)),'distinct_registry_observations':census['distinct_parcel_observations']},'details':'Only baseline observations are exposed; comparisons are disabled.'},
        'public_isolation':{'status':'passed' if not iso else 'blocked','evidence':files,'details':iso},
        'rights':{'status':'passed' if rights['public_redistribution_qualified'] else 'blocked','evidence':'source-rights.json','details':rights['review']},
        'browser_qa':{'status':'blocked','evidence':None,'details':'Awaiting browser receipt for this build.'},
        'five_person_comprehension':{'status':'blocked','evidence':None,'details':'Awaiting five genuine participant sessions for this build.'}}
    for name in ('browser_qa','five_person_comprehension'):
        path=root/'data/twin-qualification'/build/(name+'.json')
        if not path.exists():continue
        receipt=json.loads(path.read_text())
        if receipt.get('build_id')!=build:continue
        if name=='five_person_comprehension':
            participants=receipt.get('participants',[])
            passed=all(p.get('tested_build')==build for p in participants) and release_gate(dict.fromkeys(['boundaries','rights','accounting','site_identity','matching_review','history','browser_qa','public_isolation'],True),participants)['ready']
        else:
            tasks=receipt.get('checks',{})
            required=('desktop_search','mobile_search','explicit_selection','keyboard','evidence','baseline','export','pinned_reload','lazy_startup','no_console_errors')
            passed=all(tasks.get(k) is True for k in required) and bool(receipt.get('evidence_reference'))
        gates[name]={'status':'passed' if passed else 'blocked','evidence':str(path.relative_to(root))}
    result={'build_id':build,'registry_version':review['registry_version'],'adjudication_version':review['adjudication_version'],
            'local_review_only':True,'release_ready':all(g['status']=='passed' for g in gates.values()),
            'gates':gates,'case_count':len(review['cases']),'case_outcomes':dict(Counter(c['decision'] for c in review['cases']))}
    (root/'docs/site-history/candidate-qualification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    (folder/'qualification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    return result

if __name__=='__main__':
    result=qualify();print(json.dumps({k:v for k,v in result.items() if k!='gates'},indent=2))
