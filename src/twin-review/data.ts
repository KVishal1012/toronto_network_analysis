import type {Geometry,FeatureCollection} from 'geojson';
export type SiteIndex={id:string;label:string;labels:string[];centre:[number,number];record_count:number;regions:string[];feature_type:string};
export type RecordEvidence={id:string;source:string;label:string;number?:string;status:string;description?:string;url?:string;source_page:string;publisher:string;retrieved_at:string;event_date?:string;geometry_origin:string;association:string;association_reason:string;adjudications?:{version:string;case_id:string;decision:string;reviewer_type:string}[];review_notes:string[]};
export type Site=SiteIndex&{geometry:Geometry;source_references:Record<string,unknown>[];records:RecordEvidence[];identity_state:string;version:string;geometry_retrieved_at:string;history_state:string;history_note:string};
export type Manifest={version:string;site_count:number;regions:{id:string;label:string;count:number}[];tile_keys:string[];observations:{version:string;retrieved_at:string}[];receipt:{planning_snapshot:string;parcel_sha256:string;acquisition:{retrieved_at:string};source:string;attribution:string;use_limit:string}};
const cache=new Map<string,Promise<unknown>>();
export async function read<T>(path:string):Promise<T>{
 if(!cache.has(path))cache.set(path,(async()=>{const r=await fetch(new URL('twin/'+path,document.baseURI));if(!r.ok)throw new Error('This observation or asset is unavailable. No newer data has been substituted.');if(path.endsWith('.gz'))return JSON.parse(await new Response(r.body!.pipeThrough(new DecompressionStream('gzip'))).text());return r.json();})().catch(e=>{cache.delete(path);throw e;}));
 return cache.get(path) as Promise<T>;
}
export function sitePath(version:string,id:string){if(!/^[a-f0-9]{64}$/.test(version)||!/^site-[a-f0-9-]{36}$/.test(id))throw new Error('Invalid site link');return `${version}/sites/${id.slice(5,7)}.json.gz`;}
export async function getSite(version:string,id:string){const result=await read<Record<string,Site>>(sitePath(version,id));if(!result[id])throw new Error('Site unavailable in this observation.');return result[id];}
export function tileKeys(bounds:number[],available:Set<string>){const [w,s,e,n]=bounds;if(!bounds.every(Number.isFinite)||e<w||n<s||(Math.floor(e*100)-Math.floor(w*100)+1)*(Math.floor(n*100)-Math.floor(s*100)+1)>100)return [];const keys=[];for(let x=Math.floor(w*100);x<=Math.floor(e*100);x++)for(let y=Math.floor(s*100);y<=Math.floor(n*100);y++){const key=`${x}_${y}`;if(available.has(key))keys.push(key);if(keys.length>30)return [];}return keys;}
export function uniqueFeatures(collections:FeatureCollection[]):FeatureCollection{const rows=new Map();for(const c of collections)for(const f of c.features)rows.set(f.properties?.id,f);return {type:'FeatureCollection',features:[...rows.values()]};}
export function safeLink(value?:string){try{const u=new URL(value||'');return ['https:','http:'].includes(u.protocol)?u.href:undefined;}catch{return undefined;}}
