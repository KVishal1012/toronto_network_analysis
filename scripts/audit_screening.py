"""Independent sample verification from source stop times and planning attributes."""
from __future__ import annotations
import argparse,csv,gzip,io,json,math
from collections import defaultdict
from datetime import date,timedelta
from pathlib import Path
from zipfile import ZipFile
from pyproj import Transformer
ROOT=Path(__file__).resolve().parents[1]


def audit(source: Path) -> dict:
    base=ROOT/'public/screening';version=json.loads((base/'latest.json').read_text())['id'];folder=base/version;m=json.loads((folder/'manifest.json').read_text())
    def read(name):return json.loads(gzip.decompress((folder/(name+'.json.gz')).read_bytes()))
    all_areas=[read(k) for k in m['assets'] if k.startswith('areas/')];outcomes=read('outcomes');chosen=[];used=set()
    for region in m['regions']:
        rid=region['id'];pool=[p for a in all_areas for p in a['projects'] if rid in p['regions'] and p['stage']!='Built' and p['number'] not in used]
        for label,key in [('near-threshold',lambda p:abs((p['service']['morning'] or {'distance_m':1e9})['distance_m']-800)),('nearest',lambda p:(p['service']['morning'] or {'distance_m':1e9})['distance_m']),('furthest',lambda p:-(p['service']['morning'] or {'distance_m':1e9})['distance_m']),('near-400',lambda p:abs((p['service']['morning'] or {'distance_m':1e9})['distance_m']-400)),('near-1600',lambda p:abs((p['service']['morning'] or {'distance_m':1e9})['distance_m']-1600))]:
            row=min((p for p in pool if p['number'] not in used),key=key);used.add(row['number']);chosen.append({'region':rid,'case':label,'project':row})
        row=next(o for o in outcomes if rid in o['regions'] and o['reason']=='no_reported_housing_units');chosen.append({'region':rid,'case':'excluded-zero-units','outcome':row})
    z=ZipFile(source/'merged.zip')
    def rows(name):return list(csv.DictReader(io.TextIOWrapper(z.open(name),encoding='utf-8-sig'))) if name in z.namelist() else []
    trips={r['trip_id']:r for r in rows('trips.txt')};stops={r['stop_id']:r for r in rows('stops.txt')};cal=rows('calendar.txt');exceptions=rows('calendar_dates.txt');week=['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    active={}
    for period,d in m['dates'].items():
        for offset in range(3):
            day=date.fromisoformat(d)-timedelta(days=offset);key=day.strftime('%Y%m%d')
            ids={r['service_id'] for r in cal if r[week[day.weekday()]]=='1' and r['start_date']<=key<=r['end_date']}
            for r in exceptions:
                if r['date']==key:
                    if r['exception_type']=='1':ids.add(r['service_id'])
                    else:ids.discard(r['service_id'])
            active[(period,offset)]=ids
    observed=defaultdict(set)
    for r in rows('stop_times.txt'):
        if not r['departure_time'] or r.get('pickup_type','') not in ('','0'):continue
        t=trips[r['trip_id']]
        if t.get('direction_id') not in ('0','1') or stops[r['stop_id']].get('location_type','') not in ('','0'):continue
        h=int(r['departure_time'].split(':')[0]);offset=h//24
        for period,(start,end) in m['periods'].items():
            if start<=h%24<end and t['service_id'] in active.get((period,offset),set()):observed[(period,r['stop_id'],t['route_id'],t['direction_id'],h%24)].add((r['trip_id'],offset))
    eligible=defaultdict(set)
    for period,sid,rid,direction,h in observed:
        start,end=m['periods'][period]
        if all(len(observed.get((period,sid,rid,direction,k),set()))>=4 for k in range(start,end)):eligible[period].add(sid)
    projection=Transformer.from_crs(4326,26917,always_xy=True)
    xy={sid:projection.transform(float(s['stop_lon']),float(s['stop_lat'])) for sid,s in stops.items() if s.get('location_type','') in ('','0')}
    planning=ROOT/'public/planning';pm=json.loads((planning/m['planning_snapshot']/'manifest.json').read_text());cache={}
    def object_read(name):
        if name not in cache:cache[name]=json.loads(gzip.decompress((planning/'objects'/(pm['assets'][name]+'.json.gz')).read_bytes()))
        return cache[name]
    index={r['id']:r for r in object_read('projects.json')};results=[]
    for case in chosen:
        p=case.get('project');o=case.get('outcome');record=(p or o)['record_ids'][0];raw=object_read(index[record]['detail'])[record]['attributes'];checks={}
        if p:
            checks['structured_units']=int(float(raw['Proposed Residential Units'].replace(',','')))==p['units']
            x,y=projection.transform(p['lon'],p['lat'])
            for period in m['periods']:
                distances=[(math.hypot(x-xy[s][0],y-xy[s][1]),s) for s in eligible[period]]
                expected=min(distances) if distances else None;actual=p['service'][period]
                checks[period]=((expected is None and actual is None) or (expected is not None and actual is not None and abs(expected[0]-actual['distance_m'])<=.001 and expected[1]==actual['id']))
        else:checks['excluded_zero_units']=float(raw['Proposed Residential Units'].replace(',',''))==0
        results.append({'region':case['region'],'case':case['case'],'publisher_number':(p or o)['number'],'record_ids':(p or o)['record_ids'],'checks':checks,'passed':all(checks.values())})
    report={'analysis':version,'planning_snapshot':m['planning_snapshot'],'transit_snapshot':m['transit_snapshot'],'reviewer_type':'independent computational source reread; not participant testing','cases':results,'passed':len(results)==12 and all(r['passed'] for r in results),'limitations':'Purposeful sample, not a statistical accuracy estimate. No observed service, walking or capacity validation.'}
    dest=ROOT/'docs/growth-transit';dest.mkdir(parents=True,exist_ok=True);(dest/'source-audit.json').write_text(json.dumps(report,indent=2));return report

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);a=p.parse_args();r=audit(a.source);print(json.dumps(r,indent=2));raise SystemExit(0 if r['passed'] else 1)
