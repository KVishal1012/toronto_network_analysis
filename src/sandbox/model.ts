import downtown from './downtown.json';
export type Kind='volume';
export type Plot={id:string;kind:Kind;x:number;z:number;rotation:number;height:number;width:number;depth:number};
export type Scenario={schema:3;baseline:string;name:string;plots:Plot[]};
export const kinds:Kind[]=['volume'];
export const labels:Record<Kind,string>={volume:'Hypothetical volume'};
export const SIZE=16;
type XY=[number,number];
export function corners(p:Plot):XY[]{const angle=p.rotation*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);return [[-1,-1],[1,-1],[1,1],[-1,1]].map(([a,b])=>{const x=a*p.width/2,z=b*p.depth/2;return [p.x+x*c-z*s,p.z+x*s+z*c];});}
const cross=(a:XY,b:XY,c:XY)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
function on(a:XY,b:XY,p:XY){return Math.abs(cross(a,b,p))<1e-7&&p[0]>=Math.min(a[0],b[0])-1e-7&&p[0]<=Math.max(a[0],b[0])+1e-7&&p[1]>=Math.min(a[1],b[1])-1e-7&&p[1]<=Math.max(a[1],b[1])+1e-7;}
function intersects(a:XY,b:XY,c:XY,d:XY){const x=cross(a,b,c),y=cross(a,b,d),z=cross(c,d,a),w=cross(c,d,b);return x*y<0&&z*w<0||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b);}
export function inside(p:XY,ring:XY[]){let result=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[j],b=ring[i];if(on(a,b,p))return true;if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])result=!result;}return result;}
export function overlap(rect:XY[],polygon:XY[][]){if(rect.some(p=>inside(p,polygon[0])&&!polygon.slice(1).some(h=>inside(p,h))))return true;if(polygon[0].some(p=>inside(p,rect)))return true;return polygon.some(r=>r.some((a,i)=>rect.some((c,j)=>intersects(a,r[(i+1)%r.length],c,rect[(j+1)%rect.length]))));}
export function validate(value:unknown):Scenario{
 const s=value as Scenario;if(!s||s.schema!==3||s.baseline!==downtown.id||typeof s.name!=='string'||s.name.length>100||!Array.isArray(s.plots)||s.plots.length>100)throw Error('Incompatible design: use a schema 3 file pinned to this Downtown baseline. Older designs remain in their original storage.');
 const ids=new Set<string>();const accepted:Plot[]=[];
 for(const p of s.plots){if(!p||p.kind!=='volume'||typeof p.id!=='string'||p.id.length>100||ids.has(p.id)||![p.x,p.z,p.rotation,p.height,p.width,p.depth].every(Number.isFinite)||p.height<1||p.height>200||p.width<2||p.width>100||p.depth<2||p.depth>100||p.rotation<0||p.rotation>=360)throw Error('Invalid volume dimensions or identity.');const rect=corners(p);if(rect.some(([x,z])=>Math.abs(x)>160||Math.abs(z)>160))throw Error('The rotated footprint crosses the study boundary.');
  for(const b of downtown.buildings){const polys=b.geometry.type==='Polygon'?[b.geometry.coordinates]:b.geometry.coordinates;for(const rings of polys as XY[][][])if(overlap(rect,rings))throw Error('The footprint intersects recorded massing.');}
  for(const other of accepted)if(overlap(rect,[corners(other)]))throw Error('Proposed volumes overlap.');ids.add(p.id);accepted.push({id:p.id,kind:'volume',x:p.x,z:p.z,rotation:p.rotation,height:p.height,width:p.width,depth:p.depth});
 }
 return {schema:3,baseline:downtown.id,name:s.name,plots:accepted};
}
export function put(s:Scenario,p:Plot):Scenario{return validate({...s,plots:[...s.plots.filter(q=>q.id!==p.id),p]});}
export function starter():Scenario{return {schema:3,baseline:downtown.id,name:'Downtown Toronto design',plots:[]};}
