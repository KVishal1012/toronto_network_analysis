/** Private investigations retain evidence copies; imagery and credentials are never stored. */
export type Viewpoint={name:string;lon:number;lat:number;height:number;heading:number;pitch:number;roll:number};
export const PRESETS:Viewpoint[]=[
 {name:'CN Tower / waterfront',lon:-79.389,lat:43.637,height:650,heading:0,pitch:-35,roll:0},
 {name:'City Hall',lon:-79.384,lat:43.648,height:430,heading:0,pitch:-40,roll:0},
 {name:'Distillery District',lon:-79.359,lat:43.647,height:350,heading:0,pitch:-40,roll:0},
];
export function validView(v:Viewpoint):boolean{return typeof v.name==='string'&&v.name.length>0&&v.name.length<=100&&[v.lon,v.lat,v.height,v.heading,v.pitch,v.roll].every(Number.isFinite)&&v.lon>=-81&&v.lon<=-78&&v.lat>=43&&v.lat<=45.5&&v.height>=20&&v.height<=100000&&v.pitch>=-90&&v.pitch<=90;}
export function radiusComparison(results:{radius:number;ids:string[];coverage:boolean}[]){
 if(results.length!==3||results.some((r,i)=>r.radius!==[400,800,1600][i]||!r.coverage||new Set(r.ids).size!==r.ids.length))throw new Error('Complete, unique results at all three radii are required.');
 for(let i=1;i<results.length;i++)if(results[i-1].ids.some(id=>!results[i].ids.includes(id)))throw new Error('Nested-radius invariant failed.');
 return results.map((r,i)=>({radius:r.radius,records:r.ids.length,added:i?r.ids.length-results[i-1].ids.length:0}));
}
export type Investigation={id:string;name:string;note:string;saved_at:string;location:{lon:number;lat:number};snapshot_id:string|null;view:Viewpoint|null;evidence:unknown};
function open():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open('aster-private-investigations',1);r.onupgradeneeded=()=>r.result.createObjectStore('items',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(new Error('Local investigation storage unavailable. Export your evidence instead.'));});}
export async function investigations(action:'list'|'put'|'delete',value?:Investigation|string):Promise<Investigation[]>{
 const db=await open();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('items',action==='list'?'readonly':'readwrite'),s=tx.objectStore('items');let rows:Investigation[]=[];
 if(action==='put')s.put(value);if(action==='delete')s.delete(value as string);const request=s.getAll();request.onsuccess=()=>{rows=request.result;};tx.oncomplete=()=>resolve(rows.sort((a,b)=>b.saved_at.localeCompare(a.saved_at)));tx.onerror=()=>reject(new Error('Could not save local investigation. Export before closing.'));tx.onabort=()=>reject(new Error('Local save aborted.'));});}finally{db.close();}
}
