"""Evidence-limited review of parcel matches; never turn diagnostics into confirmation."""
from __future__ import annotations
from collections import defaultdict,Counter
import json
from pathlib import Path
import sqlite3
import sys
from shapely.geometry import shape,Point
from shapely.strtree import STRtree
from shapely.ops import transform
from pyproj import Transformer
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.audit_site_history import read_object
ROOT=Path(__file__).resolve().parents[1]


def review(root: Path=ROOT) -> dict:
    """Review every no-containment case and cross-site publisher-number conflict."""
    db=sqlite3.connect(root/'data/site-registry/registry.sqlite')
    version,raw=db.execute('SELECT id,receipt FROM versions ORDER BY rowid DESC LIMIT 1').fetchone();receipt=json.loads(raw)
    sites=[json.loads(r[0]) for r in db.execute('SELECT payload FROM observations WHERE version=?',(version,))]
    geometries=[shape(s['geometry']) for s in sites];tree=STRtree(geometries)
    matches=[json.loads(r[0]) for r in db.execute('SELECT payload FROM matches WHERE version=?',(version,))]
    base=root/'public/planning';manifest=json.loads((base/receipt['planning_snapshot']/'manifest.json').read_text())
    source_rows={kind:{r['id']:r for r in read_object(base,manifest,kind+'.json')} for kind in ['projects','applications']}
    metric=Transformer.from_crs('EPSG:4326','EPSG:26917',always_xy=True).transform
    reviews=[];groups=defaultdict(list)
    for m in matches:
        if m['publisher_number'] and m['state']=='candidate':groups[(m['source'],m['publisher_number'].strip().upper())].append(m)
        if m['reason']!='no_eligible_parcel':continue
        row=source_rows[m['source']][m['record_id']];p=Point(row['lon'],row['lat']);pm=transform(metric,p)
        nearby=[]
        # Broad geographic window used only to shortlist; all measured distances use metres.
        for i in tree.query(p.buffer(.002)):
            distance=pm.distance(transform(metric,geometries[int(i)]))
            if distance<=50:nearby.append({'site_id':sites[int(i)]['site_id'],'distance_m':round(distance,2)})
        reviews.append({'id':'no-containment:'+m['source']+':'+m['record_id'],'record_id':m['record_id'],'source':m['source'],'label':m['label'],'decision':'unresolved','reason':'No eligible parcel contains the recorded point; nearby geometry is not identity evidence.','nearby_parcels_within_50m':sorted(nearby,key=lambda x:(x['distance_m'],x['site_id'])),'distance_crs':'EPSG:26917','evidence':m['evidence'],'reviewer':'automated-spatial-evidence-review-v1','human_review':False})
    conflicts=0
    for (source,number),rows in sorted(groups.items()):
        ids=sorted({sid for r in rows for sid in r['candidate_site_ids']})
        if len(ids)<2:continue
        conflicts+=1
        reviews.append({'id':'publisher-number:'+source+':'+number,'source':source,'publisher_number':number,'records':[r['record_id'] for r in rows],'candidate_site_ids':ids,'decision':'unresolved','reason':'Same publisher application number is associated with multiple provisional parcels. Could be a multi-parcel proposal or conflicting locations; no collapse or confirmation.','evidence':[r['evidence'] for r in rows],'reviewer':'automated-spatial-evidence-review-v1','human_review':False})
    with db:
        for r in reviews:
            existing=db.execute('SELECT payload FROM reviews WHERE version=? AND review_id=?',(version,r['id'])).fetchone()
            raw=json.dumps(r,sort_keys=True)
            if existing and existing[0]!=raw:raise ValueError('Review output changed for identical registry version')
            if not existing:db.execute('INSERT INTO reviews VALUES(?,?,?)',(version,r['id'],raw))
    total=db.execute('SELECT count(*) FROM reviews WHERE version=?',(version,)).fetchone()[0];db.close()
    report={'version':version,'no_containment_cases_reviewed':sum(r['id'].startswith('no-containment:') for r in reviews),'multi_site_publisher_number_groups':conflicts,'total_review_queue_including_diagnostics':total,'new_confirmations':0,'new_rejections':0,'review_kind':'Computational evidence review; no human/site-document adjudication','decisions':dict(Counter(r['decision'] for r in reviews)),'cases':reviews}
    (root/'docs/site-history/match-review.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    return {k:v for k,v in report.items() if k!='cases'}

if __name__=='__main__':print(json.dumps(review(),indent=2))
