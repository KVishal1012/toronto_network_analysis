"""Inventory shipped and derived source rights without treating metadata as approval."""
import json
import hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]


def apply_review(root: Path, rows: list[dict]) -> dict:
    """Accept a rights decision only for its exact source bytes and candidate package."""
    path=root/'docs/site-history/rights-adjudication.json'
    if not path.exists():return {'qualified':False,'reason':'No asset review receipt.'}
    review=json.loads(path.read_text())
    if not review.get('evidence_files') or not review.get('sources'):
        return {'qualified':False,'reason':'Incomplete rights review receipt.'}
    from scripts.qualify_twin_candidate import inventory
    from scripts.site_history import digest
    if review.get('build_id')!=digest(inventory(root/'dist-twin-review')):
        return {'qualified':False,'reason':'Candidate changed since rights review.'}
    for item in review.get('evidence_files',[]):
        p=root/item['path']
        if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=item['sha256']:
            return {'qualified':False,'reason':'Missing or changed rights evidence.'}
    decisions={d['source']:d for d in review.get('sources',[])}
    for row in rows:
        if row['source']=='application_documents':continue
        decision=decisions.get(row['source'],{})
        if decision.get('source_hash')==row.get('source_hash') and decision.get('status')=='qualified_for_reviewed_use':
            row['redistribution_status']='qualified_for_reviewed_use'
            row['review_reference']='rights-adjudication.json'
            row['conditions']=decision['conditions']
    return {'qualified':all(r['redistribution_status'] in {'qualified_for_reviewed_use','not_applicable'} for r in rows),
            'reference':'rights-adjudication.json','reviewed_at':review.get('reviewed_at')}


def register(root: Path=ROOT) -> dict:
    receipt=json.loads((root/'docs/site-history/parcel-registry-report.json').read_text())['receipt']
    manifest=json.loads((root/'public/planning'/receipt['planning_snapshot']/'manifest.json').read_text())
    boundaries=json.loads((root/'docs/site-history/boundaries.json').read_text())
    rows=[]
    for key in ('applications','projects','addresses','streets'):
        source=manifest['sources'][key]
        rows.append({'source':key,'url':source['page'],'source_hash':source['sha256'],
                     'licence':source['licence'],'licence_evidence_hash':source.get('licence_evidence_sha256'),
                     'retrieved_at':source['retrieved_at'],'use':'derived locations' if key=='addresses' else 'display selected attributes/geometry',
                     'redistribution_status':'pending_asset_review','attribution':'Contains information licensed under the Open Government Licence – Toronto.',
                     'exclusions':'No contact fields, ownership assertions, City endorsement or survey claims.'})
    rows.append({'source':'parcels','url':receipt['source'],'source_hash':receipt['parcel_sha256'],
                 'licence':receipt['licence'],'licence_evidence_hash':receipt['licence_sha256'],
                 'use':'provisional reference geometry','redistribution_status':'pending_asset_review',
                 'attribution':receipt['attribution'],'exclusions':receipt['use_limit']})
    for source in boundaries['sources']:
        rows.append({'source':source['page'].rstrip('/').split('/')[-1],'url':source['page'],
                     'source_hash':source['geometry_sha256'],'licence':source['licence'],
                     'licence_evidence_hash':source['catalogue_sha256'],'use':'study-area definition',
                     'redistribution_status':'pending_asset_review','attribution':receipt['attribution'],
                     'exclusions':'ASTER study areas are not official district definitions.'})
    rows.append({'source':'application_documents','use':'publisher links only','redistribution_status':'not_applicable',
                 'exclusions':'Do not package report PDFs, site-plan images or third-party illustrations without separate rights evidence.'})
    review=apply_review(root,rows)
    result={'sources':rows,'public_redistribution_qualified':review['qualified'],'local_review_only':True,
            'review':review,'note':'Qualification covers only the exact reviewed package and uses. It does not authorize publication or establish site identity.'}
    (root/'docs/site-history/source-rights.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    return result

if __name__=='__main__':register()
