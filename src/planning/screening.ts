export type Period='morning'|'evening'|'saturday';
export type Filters={region:string;stage:string;radius:number;period:Period;minimum:number;onlyGaps:boolean};
export type ScreeningProject={number:string;label:string;units:number;stage:string;regions:string[];distances:Record<Period,number|null>};
export type AreaSummary={id:string;label:string;regions:string[];centre?:[number,number];neighbourhood?:string;projects:ScreeningProject[]};
export type StopEvidence={id:string;name:string;distance_m:number;services?:{route:string;route_name:string;direction:string;hourly_departures:number[]}[]};
export type AreaEvidence=Omit<AreaSummary,'projects'>&{geometry:GeoJSON.Geometry;projects:(ScreeningProject&{lon:number;lat:number;source_url:string;record_ids:string[];description:string;geometry_origin:string;nearest_stop:StopEvidence|null;service:Record<Period,StopEvidence|null>;supporting_applications:{id:string;label:string;status:string}[]})[]};
export type ScreeningManifest={id:string;schema:number;boundary_version:string;study_areas?:{id:string;label:string;members:unknown[]}[];boundary_sources?:{page:string;retrieved_at:string}[];planning_snapshot:string;transit_snapshot:string;as_of:string;dates:Record<Period,string>;feed:{feed_start_date:string;feed_end_date:string;feed_version:string};regions:{id:string;label:string}[];assets:Record<string,string>;accounting:{input_records:number;accounted_records:number;group_count:number;outcomes:Record<string,number>;regional:Record<string,Record<string,number>>;unassigned_groups:number};planning_sources:Record<string,{page:string;retrieved_at:string}>;transit_source:{page:string;retrieved_at:string};method:string;limitations:string[];attribution:string;licence_url:string};
export type Outcome={number:string;record_ids:string[];label:string;regions:string[];reason:string;duplicates_collapsed:number;raw_units:string|null;source_url:string};
export const periods:Period[]=['morning','evening','saturday'];
export const periodLabels:Record<Period,string>={morning:'Weekday morning · 07–09',evening:'Weekday evening · 16–18',saturday:'Saturday · 12–14'};
export const periodPlainLabels:Record<Period,string>={morning:'Weekday morning rush (7:00–9:00 AM)',evening:'Weekday evening rush (4:00–6:00 PM)',saturday:'Saturday midday (12:00–2:00 PM)'};
export const stagePlainLabels:Record<string,string>={all:'Under Review + Active (unbuilt proposals)','Under Review':'Under Review',Active:'Active (in City pipeline — not necessarily under construction)',Built:'Built (completed)'};
export const outcomeReasonLabels:Record<string,{title:string;detail:string}>={
  included:{title:'Included in screening',detail:'Verified location, reported housing units, and inside screened Toronto boundaries.'},
  outside_study_areas:{title:'Outside screened Toronto boundaries',detail:'Located outside the screened Toronto boundaries.'},
  unresolved_location:{title:'Location could not be verified',detail:'Excluded from distance checks because no reliable street coordinate could be resolved.'},
  no_reported_housing_units:{title:'No structured housing unit count',detail:'The City record’s structured residential unit field is empty or zero.'},
  shared_location_distinct_identifiers:{title:'Shared address with another application ID',detail:'Separated to avoid mixing or double-counting distinct applications at one address.'},
};
export function formatFeedDate(value:string){return /^\d{8}$/.test(value)?`${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6,8)}`:value;}
export function matchesAreaSearch(area:AreaSummary,rawQuery:string,neighbourhood=area.neighbourhood||''){
  const tokens=rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if(!tokens.length)return true;
  const normNeighbourhood=neighbourhood.replace(/[-.]/g,' ');
  const compactNeighbourhood=neighbourhood.replace(/[.]/g,'');
  const haystack=[
    area.id,
    area.label,
    neighbourhood,
    normNeighbourhood,
    compactNeighbourhood,
    ...area.projects.flatMap(p=>[p.label,p.number]),
  ].join(' ').toLowerCase();
  return tokens.every(token=>haystack.includes(token));
}
export function describeHourlyDepartures(hourly:number[]){
  if(!hourly.length)return 'No hourly departure data';
  const min=Math.min(...hourly),max=Math.max(...hourly);
  const countText=min===max?`${min} scheduled departures/hr`:`${min}–${max} scheduled departures/hr`;
  return `${countText}; counts do not establish even spacing`;
}
const VALID_REGIONS=['all-toronto','toronto-east-york','north-york','etobicoke-york','scarborough','downtown','midtown'];
export function parseScreeningLink(hash:string){const q=new URLSearchParams(hash.replace(/^#/,''));return {version:q.get('analysis')||undefined,areas:(q.get('areas')||'').split(',').filter(x=>/^\d+_\d+$/.test(x)).slice(0,2),filters:{region:VALID_REGIONS.includes(q.get('region')||'')?q.get('region')!:'all-toronto',stage:['Under Review','Active','Built','all'].includes(q.get('stage')||'')?q.get('stage')!:'all',radius:[400,800,1600].includes(Number(q.get('radius')))?Number(q.get('radius')):800,period:periods.includes(q.get('period') as Period)?q.get('period') as Period:'morning',minimum:Math.max(0,Math.min(1000000,Number(q.get('minimum'))||0)),onlyGaps:q.get('gaps')==='1'} as Filters};}
export function selectedProjects(area:AreaSummary,f:Filters){return area.projects.filter(p=>p.regions.includes(f.region)&&(f.stage==='all'?p.stage!=='Built':p.stage===f.stage));}
export function metrics(area:AreaSummary,f:Filters){const projects=selectedProjects(area,f);const lacking=projects.filter(p=>p.distances[f.period]===null||p.distances[f.period]!>f.radius);return {projects:projects.length,units:projects.reduce((s,p)=>s+p.units,0),lacking:lacking.length,lackingUnits:lacking.reduce((s,p)=>s+p.units,0)};}
/** Display both sides of the threshold; unavailable distances never become a measured "beyond" distance. */
export function distanceBreakdown(area:AreaSummary,f:Filters){
 const result=metrics(area,f);
 const noStopUnits=selectedProjects(area,f).filter(p=>p.distances[f.period]===null).reduce((sum,p)=>sum+p.units,0);
 return {...result,withinUnits:result.units-result.lackingUnits,beyondUnits:result.lackingUnits-noStopUnits,noStopUnits};
}
export function shortlist(areas:AreaSummary[],f:Filters){return areas.map(a=>({area:a,...metrics(a,f)})).filter(a=>a.projects>0&&a.units>=f.minimum&&(!f.onlyGaps||a.lacking>0)).sort((a,b)=>(f.onlyGaps?b.lackingUnits-a.lackingUnits:b.units-a.units)||a.area.id.localeCompare(b.area.id));}
export function shareHash(m:ScreeningManifest,f:Filters,areas:string[]){return '#'+new URLSearchParams({analysis:m.id,snapshot:m.planning_snapshot,transit:m.transit_snapshot,region:f.region,stage:f.stage,radius:String(f.radius),period:f.period,minimum:String(f.minimum),gaps:f.onlyGaps?'1':'0',areas:areas.join(',')});}
export function safeSource(url:string|undefined){try{const u=new URL(url||'');return ['https:','http:'].includes(u.protocol)?u.href:undefined;}catch{return undefined;}}
export function createScreeningProvider(){
 const base=new URL('planning/screening/',new URL(import.meta.env.BASE_URL,document.baseURI));let manifest:ScreeningManifest;const cache=new Map<string,Promise<unknown>>();
 async function get(path:string){const r=await fetch(new URL(path,base),{cache:path==='latest.json'||path==='withdrawn.json'?'no-store':'default'});if(!r.ok)throw new Error('Screening data unavailable. Please retry; the address explorer is unavailable in this submission package.');return r;}
 async function asset<T>(name:string):Promise<T>{if(!manifest.assets[name])throw new Error('Unknown analysis asset');const key=manifest.id+'/'+name;if(!cache.has(key))cache.set(key,(async()=>{const response=await get(key+'.json.gz');const compressed=new Uint8Array(await response.arrayBuffer());const bytes=compressed[0]===0x1f&&compressed[1]===0x8b?new Uint8Array(await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):compressed;const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==manifest.assets[name])throw new Error('Analysis checksum mismatch');return JSON.parse(new TextDecoder().decode(bytes));})().catch(e=>{cache.delete(key);throw e;}));return cache.get(key) as Promise<T>;}
 return {async init(id?:string){if(id&&!/^[a-f0-9]{20}$/.test(id))throw new Error('Invalid analysis version');const version=id||(await(await get('latest.json')).json()).id;const withdrawn=await(await get('withdrawn.json')).json();if(withdrawn[version])throw new Error(withdrawn[version]);manifest=await(await get(version+'/manifest.json')).json();if(manifest.id!==version||manifest.schema!==1)throw new Error('Unsupported analysis version');return manifest;},region:(id:string)=>{if(!VALID_REGIONS.includes(id))throw new Error('Region outside this submission');return asset<AreaSummary[]>('regions/'+id);},area:(id:string)=>asset<AreaEvidence>('areas/'+id),outcomes:()=>asset<Outcome[]>('outcomes')};
}
