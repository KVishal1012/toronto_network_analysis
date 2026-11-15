/** Geographic map layout in the same metre projection as ASTER's analysis grid. */
import {project} from './spatial.ts';

export type MapGeometry={type:string;coordinates?:unknown};
export type Position=[number,number];
export type MapFrame={width:number;height:number;scale:number;left:number;top:number;point:(lon:number,lat:number)=>Position;metricPoint:(x:number,y:number)=>Position};

export function coordinatePaths(g:MapGeometry):{points:number[][];closed:boolean}[]{
 if(g.type==='LineString')return [{points:g.coordinates as number[][],closed:false}];
 if(g.type==='MultiLineString')return (g.coordinates as number[][][]).map(points=>({points,closed:false}));
 if(g.type==='Polygon')return (g.coordinates as number[][][]).map(points=>({points,closed:true}));
 if(g.type==='MultiPolygon')return (g.coordinates as number[][][][]).flatMap(p=>p.map(points=>({points,closed:true})));
 return [];
}

export function fitBriefMap(geometries:MapGeometry[],width:number,height:number):MapFrame{
 const points=geometries.flatMap(g=>coordinatePaths(g).flatMap(p=>p.points.map(([lon,lat])=>project(lon,lat))));
 if(!points.length||width<240||height<240)throw new Error('A map needs selected area geometry and a usable viewport.');
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const minX=Math.min(...xs)-260,maxX=Math.max(...xs)+260,minY=Math.min(...ys)-260,maxY=Math.max(...ys)+260;
 const scale=Math.min((width-40)/(maxX-minX),(height-64)/(maxY-minY));
 const left=(minX+maxX)/2-width/(2*scale),top=(minY+maxY)/2+height/(2*scale);
 const metricPoint=(x:number,y:number):Position=>[(x-left)*scale,(top-y)*scale];
 return {width,height,scale,left,top,metricPoint,point:(lon,lat)=>metricPoint(...project(lon,lat))};
}

export function geometryPath(g:MapGeometry,frame:MapFrame):string{
 return coordinatePaths(g).map(({points,closed})=>points.map(([lon,lat],i)=>{
  const [x,y]=frame.point(lon,lat);return `${i?'L':'M'}${x.toFixed(2)},${y.toFixed(2)}`;
 }).join(' ')+(closed?' Z':'')).join(' ');
}

export function visibleGeometry(g:MapGeometry,frame:MapFrame):boolean{
 const pts=coordinatePaths(g).flatMap(p=>p.points.map(([x,y])=>frame.point(x,y)));
 return pts.length>0&&Math.min(...pts.map(p=>p[0]))<frame.width&&Math.max(...pts.map(p=>p[0]))>0&&Math.min(...pts.map(p=>p[1]))<frame.height&&Math.max(...pts.map(p=>p[1]))>0;
}

export function scaleBar(frame:MapFrame):{metres:number;pixels:number;label:string}{
 const target=Math.min(frame.width*.24,130)/frame.scale;
 const metres=[25,50,100,200,500,1000,2000,5000,10000].filter(x=>x<=target).at(-1)||25;
 return {metres,pixels:metres*frame.scale,label:metres>=1000?`${metres/1000} km`:`${metres} m`};
}

export function areaAnchor(g:MapGeometry,frame:MapFrame):Position{
 const points=coordinatePaths(g).flatMap(p=>p.points.map(([lon,lat])=>project(lon,lat)));
 const x=(Math.min(...points.map(p=>p[0]))+Math.max(...points.map(p=>p[0])))/2;
 const y=(Math.min(...points.map(p=>p[1]))+Math.max(...points.map(p=>p[1])))/2;
 return frame.metricPoint(x,y);
}

export function streetLabel(g:MapGeometry,frame:MapFrame):{point:Position;angle:number;length:number}|null{
 const segments:{a:Position;b:Position;length:number}[]=[];
 // Clip source line segments to the visible frame before placing a road label.
 for(const {points} of coordinatePaths(g))for(let i=1;i<points.length;i++){
  const a=frame.point(points[i-1][0],points[i-1][1]),b=frame.point(points[i][0],points[i][1]);
  const dx=b[0]-a[0],dy=b[1]-a[1];let low=0,high=1,valid=true;
  const p=[-dx,dx,-dy,dy],q=[a[0]-55,frame.width-55-a[0],a[1]-25,frame.height-48-a[1]];
  for(let k=0;k<4;k++){if(p[k]===0){if(q[k]<0)valid=false;}else{const t=q[k]/p[k];if(p[k]<0)low=Math.max(low,t);else high=Math.min(high,t);}}
  if(!valid||low>high)continue;
  const length=Math.hypot(dx,dy)*(high-low);
  if(length>0)segments.push({a:[a[0]+dx*low,a[1]+dy*low],b:[a[0]+dx*high,a[1]+dy*high],length});
 }
 const length=segments.reduce((sum,s)=>sum+s.length,0);if(length<45)return null;
 let remaining=length/2;
 for(const s of segments){if(remaining>s.length){remaining-=s.length;continue;}const fraction=remaining/s.length,dx=s.b[0]-s.a[0],dy=s.b[1]-s.a[1];let angle=Math.atan2(dy,dx)*180/Math.PI;if(angle>90)angle-=180;if(angle< -90)angle+=180;return {point:[s.a[0]+dx*fraction,s.a[1]+dy*fraction],angle,length};}
 return null;
}
