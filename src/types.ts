import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
export type Summary = {station_count:number|null;current_status_count:number;unknown_status_count:number;available_bikes:number|null;reported_bikes:number|null;empty_stations:number;status_complete:boolean};
export type Neighbourhood = Feature<Polygon|MultiPolygon,Summary & {id:string;name:string;area_km2:number;bbox:[number,number,number,number]}>;
export type Station = {id:string;name:string;lon:number;lat:number;capacity:number|null;neighbourhood_id:string|null;bikes:number|null;docks:number|null;reported_at:number|null;current_usable:boolean;freshness:string;category:'unknown'|'offline'|'empty'|'available';installed:boolean|null;renting:boolean|null;returning:boolean|null;ambiguous_boundary:boolean};
export type Source = {id:string;name:string;publisher:string;page:string;url?:string;status:string;freshness:string;retrieved_at:string|null;checked_at:string;observed_at:number|null;source_modified_at?:string;sha256:string|null;records?:number;error?:string;licence:string;duration_ms:number};
export type WorldState = {id:string;created_at:string;evaluated_at:string;mode:string;boundaries:FeatureCollection<Polygon|MultiPolygon,Neighbourhood['properties']>;stations:Station[];sources:Source[];summary:Summary;accounting:{stations_in:number;stations_out:number;stations_rejected:{id:string;reason:string}[];outside_boundary_ids:string[];ambiguous_boundary_ids:string[];locations_without_status_ids:string[];status_without_location_ids:string[]};method:Record<string,string|number>};
export type Scenario = {id:string;review_status:string;actuation:false;mode:string;baseline_state_id:string;evaluated_at:string;station_ids:string[];decision:string;removed_station_count:number;removed_available_bikes:number|null;assumption:string;limitation:string;reason:string;observed_state_modified:boolean};
export type Snapshot = {id:string;created_at:string};
export type RankingRow={id:string;name:string;station_count:number;available_bikes:number;current_status_count:number;bikes_per_station:number;rank:number;station_ids:string[]};
export type Ranking={state_id:string;evaluated_at:string;status:string;rows:RankingRow[];excluded:{id:string;name:string;reason:string}[];formula:string;method:string;limitation:string;sources:Source[]};
export type UpdateHealth={enabled:boolean;running:boolean;interval_seconds:number;next_in_seconds:number|null;last_completed_at:string|null;last_error:string|null;last_state_id:string|null;runs:number;degraded_runs:number;scope:string};
export type ScenarioReview={reviewer:string;note:string;reviewed_at:string;meaning:string};
export type BuildingMeta = {id:string;name:string;status:string;vintage:string;page:string;url:string;sha256:string;retrieved_at:string;records_in:number;records_out:number;rejected_count:number;limitation:string;height_method:string;ground_method:string;source_crs:string;licence:string};
export const fmt = (v:number|null|undefined, digits=0) => v == null ? 'Unavailable' : v.toLocaleString('en-CA',{maximumFractionDigits:digits});
export const date = (v:string|number|null|undefined) => v == null ? 'Not reported' : new Date(typeof v==='number'?v*1000:v).toLocaleString('en-CA',{timeZone:'America/Toronto',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
export async function api<T>(path:string, body?:unknown):Promise<T> {
  const response=await fetch(`/api/${path}`,body===undefined?{cache:'no-store',signal:AbortSignal.timeout(10000)}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)});
  const text=await response.text();
  let data;try{data=JSON.parse(text);}catch{throw new Error('The local API did not return a valid response. Check that the server is running.');}
  if(!response.ok) throw new Error(data.error||'Request failed');
  return data as T;
}
export function download(name:string,value:unknown) {
  const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
