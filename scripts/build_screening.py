"""Reproducible proposal-point/TTC screening. No walking or capacity inference."""
from __future__ import annotations
import argparse,csv,gzip,hashlib,io,json,math,re,sys
from collections import Counter,defaultdict
from datetime import date,timedelta
from pathlib import Path
from zipfile import ZipFile
from pyproj import Transformer
from shapely.geometry import Point,shape,box,mapping
from shapely.ops import transform
from shapely.strtree import STRtree
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.audit_site_history import read_object
from scripts.build_transport import build as build_transport
from scripts.site_history import digest
ROOT=Path(__file__).resolve().parents[1]
METRIC=Transformer.from_crs(4326,26917,always_xy=True).transform
DISPLAY=Transformer.from_crs(26917,4326,always_xy=True).transform
PERIODS={'morning':(7,9),'evening':(16,18),'saturday':(12,14)}


def units(value: object) -> int|None:
    """Accept nonnegative whole structured counts; missing never becomes zero."""
    text=str(value).strip()
    if not re.fullmatch(r'(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.0+)?',text):return None
    return int(float(text.replace(',','')))


def group_projects(rows: list[dict]) -> list[dict]:
    groups=defaultdict(list)
    for row in rows:
        number=' '.join(str(row.get('number') or '').upper().split())
        groups[number or 'missing:'+row['id']].append(row)
    result=[]
    for number,items in sorted(groups.items()):
        signatures={json.dumps([r['label'].strip().upper(),r.get('lon'),r.get('lat'),r.get('original_status',r['status']),r.get('units'),r.get('description'),r.get('source_url')],sort_keys=True) for r in items}
        reason=None
        if number.startswith('missing:'):reason='missing_publisher_identifier'
        elif len(signatures)>1:reason='conflicting_identifier_group'
        elif items[0].get('xy') is None:reason='unresolved_location'
        elif items[0].get('units') is None:reason='unknown_units'
        elif items[0]['units']==0:reason='no_reported_housing_units'
        elif items[0].get('original_status',items[0]['status']) not in ('Under Review','Active','Built'):reason='unreviewed_stage'
        result.append({**items[0],'number':number,'record_ids':sorted(r['id'] for r in items),'reason':reason,'duplicates_collapsed':len(items)-1 if len(signatures)==1 else 0,
                       'locations':[{'lon':r.get('lon'),'lat':r.get('lat')} for r in items]})
    # Separate application numbers can describe stages of the same proposal.
    # Shared exact locations/addresses are evidence of ambiguity, never proof of a merge.
    shared=defaultdict(set)
    for g in result:
        if g.get('lon') is not None:
            shared[('point',g['lon'],g['lat'])].add(g['number'])
        shared[('address',' '.join(g['label'].upper().split()))].add(g['number'])
    for g in result:
        keys=[('address',' '.join(g['label'].upper().split()))]
        if g.get('lon') is not None:keys.append(('point',g['lon'],g['lat']))
        if g['reason'] is None and any(len(shared[k])>1 for k in keys):
            g['reason']='shared_location_distinct_identifiers'
    return result


def active_services(calendars: list[dict], exceptions: list[dict], day: date) -> set[str]:
    key=day.strftime('%Y%m%d');weekday=day.strftime('%A').lower()
    result={r['service_id'] for r in calendars if r['start_date']<=key<=r['end_date'] and r[weekday]=='1'}
    for r in exceptions:
        if r['date']==key:
            if r['exception_type']=='1':result.add(r['service_id'])
            else:result.discard(r['service_id'])
    return result


def period_dates(start: str,end: str,as_of: str) -> dict[str,str]:
    first=date.fromisoformat(start[:4]+'-'+start[4:6]+'-'+start[6:]);last=date.fromisoformat(end[:4]+'-'+end[4:6]+'-'+end[6:])
    anchor=max(first,min(date.fromisoformat(as_of),last));days=[first+timedelta(days=i) for i in range((last-first).days+1)]
    def choose(saturday: bool) -> str:
        candidates=[d for d in days if (d.weekday()==5 if saturday else d.weekday()<5)]
        if not candidates:raise ValueError('Feed lacks required representative day')
        return min(candidates,key=lambda d:(abs((d-anchor).days),d<anchor,d)).isoformat()
    return {'morning':choose(False),'evening':choose(False),'saturday':choose(True)}


def service_index(source: Path,manifest: dict,as_of: str) -> tuple[dict,dict,dict]:
    """Preserve trip, route-direction and stop identity until two-hour screening."""
    z=ZipFile(source/'merged.zip')
    def rows(name: str) -> list[dict]:
        return list(csv.DictReader(io.TextIOWrapper(z.open(name),encoding='utf-8-sig'))) if name in z.namelist() else []
    trips={r['trip_id']:r for r in rows('trips.txt')};stops={r['stop_id']:r for r in rows('stops.txt')};routes={r['route_id']:r for r in rows('routes.txt')}
    calendars=rows('calendar.txt');exceptions=rows('calendar_dates.txt');dates=period_dates(manifest['feed']['feed_start_date'],manifest['feed']['feed_end_date'],as_of)
    services={p:[active_services(calendars,exceptions,date.fromisoformat(d)-timedelta(days=i)) for i in range(3)] for p,d in dates.items()}
    events={p:defaultdict(lambda:defaultdict(set)) for p in PERIODS};counts=Counter()
    for r in rows('stop_times.txt'):
        if r.get('pickup_type','') not in ('','0') or not r.get('departure_time'):continue
        trip=trips[r['trip_id']];direction=trip.get('direction_id','')
        if direction not in ('0','1'):counts['missing_direction_rows']+=1;continue
        h=int(r['departure_time'].split(':')[0]);offset=h//24
        if offset>2:raise ValueError('Unsupported originating service day')
        for period,(a,b) in PERIODS.items():
            if a<=h%24<b and trip['service_id'] in services[period][offset]:
                key=(r['stop_id'],trip['route_id'],direction)
                events[period][key][h%24].add((r['trip_id'],offset))
    output={}
    for period,groups in events.items():
        a,b=PERIODS[period];by_stop=defaultdict(list)
        for (sid,rid,direction),hours in groups.items():
            stop=stops[sid]
            if stop.get('location_type','') not in ('','0'):continue
            hourly=[len(hours[h]) for h in range(a,b)]
            if min(hourly)>=4:by_stop[sid].append({'route':rid,'route_name':routes[rid]['route_short_name'],'direction':direction,'hourly_departures':hourly})
        output[period]=[{'id':sid,'name':stops[sid]['stop_name'],'xy':list(METRIC(float(stops[sid]['stop_lon']),float(stops[sid]['stop_lat']))),'services':sorted(s,key=lambda r:(r['route'],r['direction']))} for sid,s in sorted(by_stop.items())]
    boarding=[{'id':sid,'name':s['stop_name'],'xy':list(METRIC(float(s['stop_lon']),float(s['stop_lat'])))} for sid,s in sorted(stops.items()) if s.get('location_type','') in ('','0')]
    return output,dates,{'counts':dict(counts),'boarding':boarding}


def nearest(point: Point,rows: list[dict],tree: STRtree|None) -> dict|None:
    if tree is None:return None
    # query_nearest includes ties; deterministic ID tie-break keeps builds reproducible.
    indices=tree.query_nearest(point,all_matches=True)
    row=min((rows[int(i)] for i in indices),key=lambda r:r['id'])
    return {k:v for k,v in row.items() if k!='xy'}|{'distance_m':round(point.distance(Point(row['xy'])),3)}


def build(source: Path,as_of: str,root: Path=ROOT, planning_snapshot: str|None=None) -> dict:
    transit=build_transport(source,root/'public/transport')
    base=root/'public/planning';snapshot=planning_snapshot or json.loads((base/'latest.json').read_text())['id'];pm=json.loads((base/snapshot/'manifest.json').read_text())
    boundaries_path=root/'docs/growth-transit/citywide-boundaries.json'
    if not boundaries_path.exists():
        boundaries_path=root/'docs/site-history/boundaries.json'
    boundaries=json.loads(boundaries_path.read_text());regions={r['id']:shape(r['geometry']) for r in boundaries['regions']}
    cache={};projects=[]
    for r in read_object(base,pm,'projects.json'):
        path=r['detail']
        if path not in cache:cache[path]=read_object(base,pm,path)
        detail=cache[path][r['id']];attrs=detail['attributes']
        projects.append({**r,'units':units(attrs.get('Proposed Residential Units')),'raw_units':attrs.get('Proposed Residential Units'),'source_url':detail.get('official_url'),'description':detail.get('description')})
    services,dates,meta=service_index(source,transit,as_of)
    trees={p:STRtree([Point(s['xy']) for s in rows]) if rows else None for p,rows in services.items()}
    boarding=meta.pop('boarding');boarding_tree=STRtree([Point(s['xy']) for s in boarding]) if boarding else None
    cells={};outcomes=[];qualified=[]
    for group in group_projects(projects):
        memberships=set()
        for loc in group['locations']:
            if loc['lon'] is not None:
                memberships.update(k for k,g in regions.items() if g.covers(Point(loc['lon'],loc['lat'])))
        reason=group['reason']
        if not memberships:reason=reason or 'outside_study_areas'
        outcome={'number':group['number'],'record_ids':group['record_ids'],'label':group['label'],'regions':sorted(memberships),'reason':reason or 'included','duplicates_collapsed':group['duplicates_collapsed'],'raw_units':group['raw_units'],'source_url':group['source_url']}
        outcomes.append(outcome)
        if reason:continue
        x,y=METRIC(group['lon'],group['lat']);cx,cy=math.floor(x/500),math.floor(y/500);cid=f'{cx}_{cy}'
        cell=cells.setdefault(cid,{'id':cid,'label':group['label'],'regions':[],'projects':[],'geometry':mapping(transform(DISPLAY,box(cx*500,cy*500,(cx+1)*500,(cy+1)*500)))})
        cell['regions']=sorted(set(cell['regions'])|memberships)
        point=Point(x,y)
        record={k:group[k] for k in ('number','label','units','raw_units','record_ids','source_url','description','geometry_origin')}
        record.update({'stage':group.get('original_status',group['status']),'lon':group['lon'],'lat':group['lat'],'regions':sorted(memberships),'nearest_stop':nearest(point,boarding,boarding_tree),'service':{p:nearest(point,rows,trees[p]) for p,rows in services.items()}})
        cell['projects'].append(record);qualified.append(record)
    # Applications provide evidence links only; never contribute quantity.
    applications=defaultdict(list)
    for r in read_object(base,pm,'applications.json'):
        applications[' '.join(str(r.get('number') or '').upper().split())].append({'id':r['id'],'label':r['label'],'status':r.get('original_status',r['status'])})
    for cell in cells.values():
        for p in cell['projects']:p['supporting_applications']=applications.get(p['number'],[])
    accounting={'input_records':len(projects),'group_count':len(outcomes),'accounted_records':sum(len(o['record_ids']) for o in outcomes),'outcomes':dict(Counter(o['reason'] for o in outcomes)),'regional':{rid:dict(Counter(o['reason'] for o in outcomes if rid in o['regions'])) for rid in regions},'unassigned_groups':sum(not o['regions'] for o in outcomes)}
    assert accounting['input_records']==accounting['accounted_records']
    source_info={'planning_snapshot':snapshot,'planning_sources':{k:pm['sources'][k] for k in ('projects','applications','addresses')},'transit_snapshot':transit['id'],'transit_source':transit['source'],'feed':transit['feed'],'boundary_version':boundaries['version'],'boundary_sources':boundaries['sources']}
    identity={'sources':source_info,'as_of':as_of,'dates':dates,'builder':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()};version=digest(identity)[:20]
    dest=root/'public/screening'/version;dest.mkdir(parents=True,exist_ok=True);assets={}
    def put(name: str,data: object) -> None:
        raw=json.dumps(data,sort_keys=True,separators=(',',':'),ensure_ascii=False,allow_nan=False).encode();path=dest/(name+'.json.gz');path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(gzip.compress(raw,mtime=0));assets[name]=hashlib.sha256(raw).hexdigest()
    summary=[]
    for cid,cell in sorted(cells.items()):
        cell['projects'].sort(key=lambda p:p['number']);put('areas/'+cid,cell)
        summary.append({'centre':list(shape(cell['geometry']).centroid.coords)[0],**{k:v for k,v in cell.items() if k not in ('geometry','projects')}}|{'projects':[{k:v for k,v in p.items() if k in ('number','label','units','stage','regions')}|{'distances':{period:(s['distance_m'] if s else None) for period,s in p['service'].items()}} for p in cell['projects']]})
    for rid in regions:put('regions/'+rid,[c for c in summary if rid in c['regions']])
    put('outcomes',outcomes)
    manifest={'id':version,'schema':1,**source_info,'as_of':as_of,'dates':dates,'periods':{p:list(v) for p,v in PERIODS.items()},'regions':[{'id':r['id'],'label':r['label']} for r in boundaries['regions'] if r['id'] in regions],'study_areas':[{k:r[k] for k in ('id','label','members') if k in r} for r in boundaries['regions'] if r['id'] in regions],'accounting':accounting,'service_accounting':meta,'assets':assets,'method':'500 m EPSG:26917 grid. Straight-line distance from each qualified proposal address point. At least four scheduled departures in each hour at one stop on one route-direction.','limitations':['Proposals are not completed homes. Reported units are not a forecast or a count of unique future homes.','Proximity is not walking access, service capacity, reliability or verified accessibility.','TTC only. No demand model or service-deficit claim.','Unlocated and conflicting groups are excluded from totals and remain visible in accounting.','User impact not yet validated.'],'attribution':'Contains information licensed under the Open Government Licence – Toronto.','licence_url':'https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-licence/'}
    (dest/'manifest.json').write_text(json.dumps(manifest,sort_keys=True),encoding='utf-8');(dest.parent/'latest.json').write_text(json.dumps({'id':version}),encoding='utf-8')
    return manifest


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--as-of',required=True);p.add_argument('--planning-snapshot');a=p.parse_args();m=build(a.source,a.as_of,planning_snapshot=a.planning_snapshot);print(json.dumps({'id':m['id'],'dates':m['dates'],'accounting':m['accounting']}))
