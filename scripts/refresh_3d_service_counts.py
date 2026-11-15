"""Regenerate 3D timetable descriptions from pinned per-hour route-direction evidence."""
import json,gzip,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'src/sandbox/proposals-3d.ts';text=p.read_text();offset=text.index('export const proposals3d: Proposal3D[] = ')+len('export const proposals3d: Proposal3D[] = ');records=json.JSONDecoder().raw_decode(text[offset:])[0]
source={r['number']:r for f in (ROOT/'public/screening/6ed092c988ad9326e279/areas').glob('*.json.gz') for r in json.loads(gzip.decompress(f.read_bytes()))['projects']}
windows={'morning':['07:00–08:00','08:00–09:00'],'evening':['16:00–17:00','17:00–18:00'],'saturday':['12:00–13:00','13:00–14:00']}
for record in records:
 for period,summary in record['serviceSummary'].items():
  if summary is None:continue
  stop=source[record['number']]['service'][period];services=stop['services'];summary['hourlyEvidence']=services
  summary['status']='; '.join(f"Route {s['route_name']}, direction {s['direction']}: "+', '.join(f"{hour}: {count} scheduled departures" for hour,count in zip(windows[period],s['hourly_departures'])) for s in services)+f" at {stop['name']} ({round(stop['distance_m'])} m). Counts do not establish even spacing."
text=text[:offset]+json.dumps(records,indent=2,ensure_ascii=False)+';\n';text=text.replace('  status: string;','  status: string;\n  hourlyEvidence?: {route:string;route_name:string;direction:string;hourly_departures:number[]}[];');p.write_text(text)
