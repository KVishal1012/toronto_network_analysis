"""Record the bounded, field-limited November submission rights review.
Run only after reviewing publisher notices and the actual derived field set.
"""
import json,hashlib,gzip,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def review():
 prior=json.loads((ROOT/'docs/growth-transit/package-rights-contract.json').read_text())
 evidence=prior['evidence_files'];datasets=prior['datasets']
 def add(p):
  item={'path':p.relative_to(ROOT).as_posix(),'sha256':sha(p)}
  if item not in evidence:evidence.append(item)
  return item
 latest=json.loads((ROOT/'public/screening/latest.json').read_text())['id'];folder=ROOT/'public/screening'/latest;m=json.loads((folder/'manifest.json').read_text())
 source=ROOT/'data/submission-refresh/planning-2026-11-13';a=json.loads((source/'acquisition.json').read_text())
 for key in ('projects','applications','addresses','neighbourhoods','streets'):
  s=a['sources'][key];page=source/s['licence_evidence_sha256'];cat=source/s['metadata_sha256'];metadata=json.loads(cat.read_text())['result'];assert metadata['license_id']=='open-government-licence-toronto';assert 'Open Government Licence' in page.read_text()
  datasets.append({'dataset':key,'decision':'Reviewed field-limited derivatives only','licence':'Open Government Licence – Toronto','source_sha256':s['sha256'],'retrieved_at':s['retrieved_at'],'page':s['page'],'evidence':[add(page),add(cat)]})
 ttc=ROOT/'data/transport-source/20261113T225930149203Z'
 for name,h in m['transit_source']['evidence'].items():assert add(ttc/name)['sha256']==h
 datasets.append({'dataset':'TTC refreshed GTFS','decision':'Route-direction/hourly departures and stop-distance evidence','page':m['transit_source']['page'],'source_sha256':m['transit_source']['sha256'],'evidence':[add(ttc/n) for n in m['transit_source']['evidence']]})
 rights=ROOT/'data/submission-refresh/rights-2026-11-13';catalogue=json.loads((rights/'massing-catalogue.json').read_text())['result'];assert catalogue['license_id']=='open-government-licence-toronto';assert 'illustrative purposes only' in catalogue['notes'];assert 'MUST BE VERIFIED BY THE USER FOR LEGAL OR OFFICIAL USE' in catalogue['notes']
 baseline=ROOT/'src/sandbox/downtown.json';b=json.loads(baseline.read_text());raw=ROOT/'data/raw'/(b['building_source']['sha256']+'.zip');assert sha(raw)==b['building_source']['sha256'];assert any(r['url']==b['building_source']['url'] for r in catalogue['resources'])
 datasets.append({'dataset':'Toronto 2025 context massing','decision':'Bounded 58-feature derivative for informational/illustrative exploration and hypothetical design only','page':b['building_source']['page'],'source_sha256':b['building_source']['sha256'],'notice':'City Planning disclaims precision/fitness; user verification is required for legal or official use. No parcel ownership or MPAC data is included.','evidence':[add(rights/n) for n in ('massing-catalogue.json','massing-page.html','licence.html')],'baseline':b['id'],'derived_sha256':sha(baseline)})
 flags=[]
 for p in folder.glob('areas/*.gz'):
  data=json.loads(gzip.decompress(p.read_bytes()))
  for r in data['projects']:
   if re.search(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\b\d{3}[-.]\d{3}[-.]\d{4}\b',r.get('description') or ''):flags.append(r['number'])
 if flags:raise ValueError('Description contact-pattern review required: '+str(flags))
 prior.update({'reviewed_on':'2026-11-13','scope':'Integrated Downtown/Midtown explorer and bounded Downtown modelling; source archives and local twin are excluded.','datasets':datasets,'evidence_files':evidence,'studio':{'source_path':'src/sandbox/downtown.json','sha256':sha(baseline),'baseline':b['id'],'feature_count':len(b['buildings']),'street_count':len(b['roads']),'status':'qualified_for_illustrative_use'},'description_review':'No email or phone patterns in shipped refreshed proposal descriptions; raw contact/owner attributes excluded.'})
 prior['versions'][latest]={p.relative_to(folder).as_posix():sha(p) for p in sorted(folder.rglob('*')) if p.is_file()}
 prior['controls']=[x for x in prior['controls'] if 'Legacy snapshots' not in x]+['Only reviewed planning screening versions and bounded source-height massing ship; existing source buildings are read-only.','Retain illustrative-use and legal/official verification notice in 3D UI and exports.']
 (ROOT/'docs/growth-transit/package-rights-contract.json').write_text(json.dumps(prior,indent=2)+'\n')
 return {'analysis':latest,'baseline':b['id'],'description_flags':flags,'status':'qualified_for_illustrative_use'}
if __name__=='__main__':print(json.dumps(review()))
