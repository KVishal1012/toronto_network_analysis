import {useEffect,useId,useMemo,useRef,useState} from 'react';
import {torontoStreetsGeoJSON,ttcSubwayStations} from './toronto-map-data';
import {areaAnchor,fitBriefMap,geometryPath,scaleBar,streetLabel,visibleGeometry} from './brief-map';
import type {AreaEvidence} from './screening';

const colours=['#175b58','#65408b'];
type LabelBox={x:number;y:number;w:number;h:number};
function overlaps(a:LabelBox,b:LabelBox){return a.x<b.x+b.w+8&&a.x+a.w+8>b.x&&a.y<b.y+b.h+5&&a.y+a.h+5>b.y;}

/** Print-safe source street geometry; no tiles, network basemap or WebGL required. */
export default function BriefMap({areas}:{areas:AreaEvidence[]}){
 const host=useRef<HTMLDivElement>(null);
 const [width,setWidth]=useState(880);
 const [requestedFocus,setFocus]=useState('all');
 const focus=areas.some(a=>a.id===requestedFocus)?requestedFocus:'all';
 const shown=focus==='all'?areas:areas.filter(a=>a.id===focus);
 const id=useId().replaceAll(':','');
 useEffect(()=>{if(!host.current)return;const observer=new ResizeObserver(entries=>{const w=Math.round(entries[0].contentRect.width);if(w>=240)setWidth(w);});observer.observe(host.current);return()=>observer.disconnect();},[]);
 const geometryKey=JSON.stringify(shown.map(a=>[a.id,a.geometry]));
 const frame=useMemo(()=>fitBriefMap(shown.map(a=>a.geometry),width,width<500?420:470),[geometryKey,width]);
 const bar=scaleBar(frame);
 const roads=useMemo(()=>torontoStreetsGeoJSON.features.filter(f=>f.geometry&&visibleGeometry(f.geometry,frame)).map(f=>({path:geometryPath(f.geometry,frame),cls:String(f.properties?.cls||'local'),name:String(f.properties?.name||''),label:streetLabel(f.geometry,frame)})),[frame]);
 const stations=ttcSubwayStations.map(s=>({...s,point:frame.point(s.lon,s.lat)})).filter(s=>s.point[0]>26&&s.point[0]<width-95&&s.point[1]>28&&s.point[1]<frame.height-52);
 const occupied:LabelBox[]=shown.map(a=>{const [x,y]=areaAnchor(a.geometry,frame);return {x:x-20,y:y-20,w:40,h:40};});
 const names=new Set<string>();
 const selectedAddresses=shown.flatMap(a=>a.projects.map(p=>p.label)).join(' ').toUpperCase();
 const stationLabels=stations.filter(s=>{const [x,y]=s.point;const box={x:x+11,y:y-9,w:s.name.length*6.5,h:18};if(occupied.some(b=>overlaps(b,box)))return false;occupied.push(box);return true;});
 const labels=roads.filter((r):r is typeof r&{label:NonNullable<typeof r.label>}=>!!r.label&&!!r.name).map(r=>({...r,...r.label}))
  .sort((a,b)=>Number(selectedAddresses.includes(b.name.toUpperCase()))-Number(selectedAddresses.includes(a.name.toUpperCase()))||Number(a.cls==='local')-Number(b.cls==='local')||b.length-a.length)
  .filter(l=>{if(names.has(l.name))return false;const [x,y]=l.point;const radians=l.angle*Math.PI/180;const length=l.name.length*6;const w=Math.abs(Math.cos(radians))*length+Math.abs(Math.sin(radians))*14,h=Math.abs(Math.sin(radians))*length+Math.abs(Math.cos(radians))*14;const box={x:x-w/2,y:y-h/2,w,h};if(occupied.some(b=>overlaps(b,box)))return false;occupied.push(box);names.add(l.name);return true;}).slice(0,width<500?9:20);
 return <div ref={host} className="g-brief-map">
  {areas.length>1&&<div className="g-actions g-no-print" aria-label="Brief map extent"><button type="button" aria-pressed={focus==='all'} onClick={()=>setFocus('all')}>Show both areas</button>{areas.map((a,i)=><button type="button" key={a.id} aria-pressed={focus===a.id} onClick={()=>setFocus(a.id)}>Focus area {i+1}</button>)}</div>}
  <figure>
   <svg viewBox={`0 0 ${width} ${frame.height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} className="g-brief-map-svg">
    <title id={`${id}-title`}>Toronto street map of your selected analysis {shown.length===1?'area':'areas'}</title>
    <desc id={`${id}-desc`}>{shown.map(a=>`Area ${areas.indexOf(a)+1}: ${a.neighbourhood?`${a.neighbourhood}, `:''}near ${a.label}; ${a.projects.length} included proposal records.`).join(' ')} City street geometry, recorded proposal points, selected 500-metre analysis cells and nearby TTC subway station locations. Grid north is up; this map does not show walking routes or service capacity.</desc>
    <defs><clipPath id={`${id}-clip`}><rect x="1" y="1" width={width-2} height={frame.height-2} rx="8"/></clipPath></defs>
    <g clipPath={`url(#${id}-clip)`}>
     <rect width={width} height={frame.height} fill="#f2f1eb"/>
     {roads.map((r,i)=><path key={i} d={r.path} fill="none" stroke="#c4c6bf" strokeWidth={r.cls==='local'?5:8} strokeLinejoin="round" strokeLinecap="round"/>)}
     {roads.map((r,i)=><path key={i} d={r.path} fill="none" stroke="#fff" strokeWidth={r.cls==='local'?3:5} strokeLinejoin="round" strokeLinecap="round"/>)}
     {shown.map(a=><path key={a.id} d={geometryPath(a.geometry,frame)} fill={colours[areas.indexOf(a)]} fillOpacity=".13" stroke={colours[areas.indexOf(a)]} strokeWidth="2.5" strokeDasharray={areas.indexOf(a)===1?'8 4':undefined} fillRule="evenodd"/>)}
     {labels.map(l=><text key={l.name} x={l.point[0]} y={l.point[1]} transform={`rotate(${l.angle} ${l.point[0]} ${l.point[1]})`} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="550" fill="#414d49" stroke="#f7f7f3" strokeWidth="3" paintOrder="stroke">{l.name}</text>)}
     {stations.map(s=><g key={s.name} transform={`translate(${s.point[0]},${s.point[1]})`}><title>{s.name} · TTC subway station</title><rect x="-7" y="-8" width="14" height="16" rx="2" fill="#fff" stroke="#334e66" strokeWidth="2"/><text textAnchor="middle" dominantBaseline="central" fill="#334e66" fontSize="10" fontWeight="800">T</text></g>)}
     {stationLabels.map(s=><text key={s.name} x={s.point[0]+11} y={s.point[1]+4} fontSize="12" fontWeight="650" fill="#233f55" stroke="#f7f7f3" strokeWidth="3" paintOrder="stroke">{s.name}</text>)}
     {shown.flatMap(a=>a.projects.map(p=>{const [x,y]=frame.point(p.lon,p.lat);return <circle key={a.id+p.number} cx={x} cy={y} r="4.5" fill="#b04424" stroke="white" strokeWidth="1.5"><title>{p.label} · {p.number} · {p.stage}</title></circle>;}))}
     {shown.map(a=>{const [x,y]=areaAnchor(a.geometry,frame);return <g key={a.id} transform={`translate(${x},${y})`}><circle r="14" fill={colours[areas.indexOf(a)]} stroke="white" strokeWidth="2"/><text textAnchor="middle" dominantBaseline="central" fill="white" fontSize="14" fontWeight="800">{areas.indexOf(a)+1}</text></g>;})}
     <g transform={`translate(${width-28},28)`}><rect x="-19" y="-22" width="38" height="58" rx="4" fill="white" fillOpacity=".94"/><path d="M0 13V-7M-5 0L0-8L5 0" fill="none" stroke="#173a35" strokeWidth="2"/><text y="29" textAnchor="middle" fontSize="10" fill="#173a35">N</text></g>
     <g transform={`translate(22,${frame.height-25})`}><rect x="-8" y="-22" width={bar.pixels+24} height="39" fill="white" fillOpacity=".94" rx="4"/><path d={`M0 -5V3H${bar.pixels}V-5`} fill="none" stroke="#173a35" strokeWidth="2"/><text x={bar.pixels/2} y="-9" textAnchor="middle" fontSize="11" fill="#173a35">{bar.label}</text></g>
    </g>
    <rect x="1" y="1" width={width-2} height={frame.height-2} rx="8" fill="none" stroke="#a9b9ad"/>
   </svg>
   <figcaption>
    <div className="g-brief-map-legend" aria-label="Map legend"><span><i className="g-map-key-area"/>Selected 500 m area</span><span><i className="g-map-key-proposal"/>Recorded proposal point</span><span><b className="g-map-key-transit">T</b>TTC subway station</span></div>
    <ol className="g-brief-map-area-key">{areas.map((a,i)=><li key={a.id}><strong style={{color:colours[i]}}>Area {i+1}: {a.neighbourhood?`${a.neighbourhood} · `:''}Near {a.label}</strong> · {a.projects.length} included proposal {a.projects.length===1?'record':'records'}. <span className="g-hint">Analysis cell {a.id}.</span></li>)}</ol>
    <p className="g-hint">City street geometry and recorded proposal points from your selected evidence. Only subway stations are shown here; bus/streetcar stops and scheduled service are in the timetable evidence. A 500 m analysis cell is not a property boundary. Proximity does not establish walking access or service capacity. {focus!=='all'&&`Map focused on area ${areas.findIndex(a=>a.id===focus)+1}; both areas remain in your brief.`}</p>
    <p className="g-hint">Source map: Toronto Centreline (retrieved 22 Oct 2026); TTC GTFS station locations (retrieved 13 Nov 2026). Proposal snapshot and dates are listed in the brief’s source evidence. Projection: NAD83 / UTM zone 17N; grid north up. Contains information licensed under the <a href="https://open.toronto.ca/open-data-licence/">Open Government Licence – Toronto</a>.</p>
   </figcaption>
  </figure>
 </div>;
}
