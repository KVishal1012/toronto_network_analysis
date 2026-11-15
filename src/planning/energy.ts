/** Reported evidence only. No footprint join, extrapolation or energy model. */
export type EnergyMetric={field:string;label:string;unit:string;weather_normalized:boolean};
export type EnergySource={page:string;sha256:string;resource_id:string;retrieved_at:string;year:number;licence:string;licence_url:string;attribution:string};
export type EnergyManifest={id:string;schema:number;year:number;assets:Record<string,string>;sources:Record<'ontario'|'toronto',EnergySource>;metrics:Record<string,EnergyMetric>;minimum_cohort:number;limitations:string[];baseline_only:boolean;annual_totals_enabled:boolean;facility_counts:Record<string,number>;inputs:{boundary_version:string;address_snapshot:string};accounting:Record<string,{input:number;accounted:number;outcomes:Record<string,number>}>};
export type EnergyStatistics={reporting_records:number;valid:number;missing:number;flagged:number;quality_checker_not_run:number;distribution:{q1:number;median:number;q3:number}|null};
export type EnergyCohort={id:string;property_type:string;year:number;scope:string;metrics:Record<string,EnergyStatistics>};
export type EnergyMember={id:string;row:number;year:number;city:string;postal_prefix:string|null;property_type:string;metrics:Record<string,number|null>;flags:Record<string,string[]>;quality_checker:string;quality_checker_date:string|null};
export type FacilitySummary={id:string;publisher_id:string;row:number;name:string;address:string;property_type:string;location:[number,number];regions:string[];address_point_ids:string[];identity_state:string;building_relationship:null;excluded_meter_rows:number};
export type EnergyReading={id:string;row:number;property_id:string;meter_id:string;fuel:string;unit:string;start:string;end:string;usage:number;estimated:boolean};
export type EnergyMeter={meter_id:string;fuel:string;unit:string;reported_sum:number;start:string;end:string;entries:number;estimated_entries:number;gaps:number;annual_total:null};
export type FacilityEvidence=FacilitySummary&{meters:EnergyMeter[];readings:EnergyReading[]};
export type EnergyBrief={snapshot:string;year:number;sources:EnergyManifest['sources'];limitations:string[];cohort?:{summary:EnergyCohort;metric:string;definition:EnergyMetric;records:EnergyMember[]};facility?:FacilityEvidence};

export function createEnergyProvider(base=new URL('planning/energy/',new URL(import.meta.env.BASE_URL,document.baseURI))){
 let manifest:EnergyManifest;
 const cache=new Map<string,Promise<unknown>>();
 async function json(path:string){const r=await fetch(new URL(path,base),{cache:path==='latest.json'?'no-store':'default'});if(!r.ok)throw new Error('Qualified energy snapshot unavailable. Housing and transit remain available.');return r.json();}
 async function asset<T>(name:string):Promise<T>{
  if(!manifest||!Object.hasOwn(manifest.assets,name))throw new Error('Evidence is not present in this pinned energy snapshot.');
  const path=manifest.id+'/'+name;
  if(!cache.has(path))cache.set(path,(async()=>{
   const r=await fetch(new URL(path+'.json.gz',base));if(!r.ok)throw new Error('Energy evidence could not be loaded.');
   const packed=new Uint8Array(await r.arrayBuffer());
   const raw=packed[0]===31&&packed[1]===139?new Uint8Array(await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()):packed;
   const sha=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',raw)),b=>b.toString(16).padStart(2,'0')).join('');
   if(sha!==manifest.assets[name])throw new Error('Energy evidence checksum mismatch.');
   return JSON.parse(new TextDecoder().decode(raw));
  })().catch(e=>{cache.delete(path);throw e;}));
  return cache.get(path) as Promise<T>;
 }
 return {async init(id?:string){const version=id||(await json('latest.json')).id;if(!/^[a-f0-9]{20}$/.test(version))throw new Error('Invalid energy snapshot.');const m=await json(version+'/manifest.json') as EnergyManifest;if(m.id!==version||m.schema!==1)throw new Error('Unsupported energy snapshot.');manifest=m;return m;},cohorts:()=>asset<EnergyCohort[]>('cohorts'),members:(id:string)=>asset<EnergyMember[]>('cohorts/'+id),region:(id:string)=>asset<FacilitySummary[]>('regions/'+id),facility:(id:string)=>asset<FacilityEvidence>('facilities/'+id),geography:()=>asset<GeoJSON.FeatureCollection>('geography')};
}
