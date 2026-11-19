import {corners,overlap,inside,type Plot} from './model';
export type Building={id:string;height:number;height_source:string;geometry:{type:string;coordinates:unknown}};
export type Reference={id:string;extent_m:number;buildings:Building[]};
export type Replacement={schema:1;baseline:string;removed:string;volume:Plot};
type XY=[number,number];
export function polygons(b:Building):XY[][][]{return (b.geometry.type==='Polygon'?[b.geometry.coordinates]:b.geometry.coordinates) as XY[][][];}
export function footprintArea(b:Building){const ringArea=(r:XY[])=>Math.abs(r.reduce((s,p,i)=>{const q=r[(i+1)%r.length];return s+p[0]*q[1]-q[0]*p[1];},0)/2);return polygons(b).reduce((a,r)=>a+ringArea(r[0])-r.slice(1).reduce((s,h)=>s+ringArea(h),0),0);}
export function initialVolume(b:Building):Plot{const vertices=polygons(b).flatMap(p=>p[0]);const xs=vertices.map(p=>p[0]),zs=vertices.map(p=>p[1]);const width=Math.min(150,Math.max(2,Math.max(...xs)-Math.min(...xs))),depth=Math.min(150,Math.max(2,Math.max(...zs)-Math.min(...zs)));return {id:'replacement-volume',kind:'volume',x:Math.round((Math.min(...xs)+Math.max(...xs))*50)/100,z:Math.round((Math.min(...zs)+Math.max(...zs))*50)/100,width:Math.round(width*100)/100,depth:Math.round(depth*100)/100,height:Math.round(Math.min(400,b.height)*100)/100,rotation:0};}
export function validateReplacement(ref:Reference,value:unknown):Replacement{
 const r=value as Replacement,p=r?.volume;
 if(!r||r.schema!==1||r.baseline!==ref.id||!ref.buildings.some(b=>b.id===r.removed)||!p||p.kind!=='volume'||![p.x,p.z,p.width,p.depth,p.height,p.rotation].every(Number.isFinite)||p.width<2||p.width>150||p.depth<2||p.depth>150||p.height<1||p.height>400||p.rotation<0||p.rotation>=360)throw Error('Invalid replacement or incompatible source version.');
 const rect=corners(p);if(rect.some(([x,z])=>Math.abs(x)>ref.extent_m/2||Math.abs(z)>ref.extent_m/2))throw Error('Replacement crosses the local study boundary.');
 const conflict=ref.buildings.find(b=>b.id!==r.removed&&polygons(b).some(poly=>overlap(rect,poly)));
 if(conflict)throw Error(`Replacement footprint intersects source feature ${conflict.id}. Adjust size, position or rotation.`);
 return {schema:1,baseline:ref.id,removed:r.removed,volume:{id:'replacement-volume',kind:'volume',x:p.x,z:p.z,width:p.width,depth:p.depth,height:p.height,rotation:p.rotation}};
}
export function consequences(ref:Reference,r:Replacement){const original=ref.buildings.find(b=>b.id===r.removed)!;const area=footprintArea(original),next=r.volume.width*r.volume.depth;return {oldHeight:original.height,newHeight:r.volume.height,heightChange:r.volume.height-original.height,oldArea:area,newArea:next,areaChange:next-area,oldVolume:area*original.height,newVolume:next*r.volume.height,volumeChange:next*r.volume.height-area*original.height};}

/** Find a collision-free initial envelope near the selected footprint; never move to a different site silently. */
export function validStartingVolume(ref:Reference,b:Building):Plot|null{
 const initial=initialVolume(b),polys=polygons(b);const vertices=polys.flatMap(p=>p[0]);const xs=vertices.map(p=>p[0]),zs=vertices.map(p=>p[1]);
 const candidates=[{x:initial.x,z:initial.z}];for(const fx of [.25,.5,.75])for(const fz of [.25,.5,.75])candidates.push({x:Math.min(...xs)+(Math.max(...xs)-Math.min(...xs))*fx,z:Math.min(...zs)+(Math.max(...zs)-Math.min(...zs))*fz});
 for(const factor of [.9,.7,.5,.25,.1])for(const pos of candidates){const p={...initial,x:Math.round(pos.x*100)/100,z:Math.round(pos.z*100)/100,width:Math.max(2,Math.floor(initial.width*factor*100)/100),depth:Math.max(2,Math.floor(initial.depth*factor*100)/100)};if(!polys.some(poly=>corners(p).every(c=>inside(c,poly[0])&&!poly.slice(1).some(h=>inside(c,h)))))continue;try{return validateReplacement(ref,{schema:1,baseline:ref.id,removed:b.id,volume:p}).volume;}catch{}}
 return null;
}

/** Find a verified collision-free editable building for recovery or demonstration, never switching silently. */
export function nearestEditableBuilding(ref:Reference,near?:Building):{building:Building;volume:Plot;distance_m:number}|null{
 const origin=near?initialVolume(near):null;
 const ranked=ref.buildings
  .filter(b=>!near||b.id!==near.id)
  .map(b=>{
   const c=initialVolume(b);
   const dist=origin?Math.hypot(c.x-origin.x,c.z-origin.z):0;
   return {b,dist,area:footprintArea(b)};
  })
  .sort((a,b)=>origin?a.dist-b.dist:b.area-a.area);
 for(const item of ranked){
  const volume=validStartingVolume(ref,item.b);
  if(volume)return {building:item.b,volume,distance_m:Math.round(item.dist)};
 }
 return null;
}
