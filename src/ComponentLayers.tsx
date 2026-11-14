import {useEffect,useRef,useState} from 'react';
import type {Map,GeoJSONSource} from 'maplibre-gl';
import type {FeatureCollection} from 'geojson';
import {api} from './types';
type Evidence={geometry_repairs:Record<string,unknown>[];conflict_variants:{StructureID:string;AVG_HEIGHT:number|null;MIN_HEIGHT_RAW:number|null;MAX_HEIGHT:number|null}[];component:Record<string,unknown>;source_records:Record<string,unknown>[];missing:string[];verification:{checksums:Record<string,string>;height_validation:{reason:string;fields:Record<string,string>};manifest:{source_url:string;source_as_of:string|null}}};
export function ComponentLayers({map}:{map:Map}){
 const [enabled,setEnabled]=useState(true),[conflicts,setConflicts]=useState(false),[status,setStatus]=useState(''),[evidence,setEvidence]=useState<Evidence|null>(null),[error,setError]=useState('');
 const version=useRef(0);
 const [reviewList,setReviewList]=useState<{id:string;group:string;center:[number,number]}[]>([]);
 async function review(id:string){const token=++version.current;setEvidence(null);setError('Loading conflict evidence…');setConflicts(true);const item=reviewList.find(v=>v.id===id);if(item)map.flyTo({center:item.center,zoom:17});try{const d=await api<Evidence>('components/inspect?layer=conflict_review&id='+encodeURIComponent(id));if(token===version.current){setEvidence(d);setError('');}}catch{if(token===version.current)setError('Conflict evidence unavailable');}}
 async function browseConflicts(){try{setReviewList(await api<typeof reviewList>('components/conflicts'));setConflicts(true);}catch{setError('Conflict index unavailable');}}

 useEffect(()=>{
  for(const name of ['structures','conflict_review']){
   map.addSource('component-'+name,{type:'geojson',data:{type:'FeatureCollection',features:[]}});
   map.addLayer({id:'component-'+name,type:'fill',source:'component-'+name,paint:{'fill-color':name==='structures'?'#74ded3':'#ee79c3','fill-opacity':0.35,'fill-outline-color':name==='structures'?'#b6fff3':'#fface0'}});
  }
  const click=async(e:{point:{x:number;y:number}})=>{
   const hit=map.queryRenderedFeatures([e.point.x,e.point.y],{layers:['component-conflict_review','component-structures']})[0];if(!hit)return;
   const token=++version.current;setEvidence(null);setError('Loading component evidence…');
   try{const data=await api<Evidence>('components/inspect?layer='+hit.layer.id.replace('component-','')+'&id='+encodeURIComponent(hit.properties.StructureID));if(token===version.current){setEvidence(data);setError('');}}catch{if(token===version.current)setError('Component evidence unavailable');}
  };
  map.on('click',click);return()=>{version.current++;map.off('click',click);if(!map.getStyle())return;for(const name of ['structures','conflict_review']){map.removeLayer('component-'+name);map.removeSource('component-'+name);}};
 },[map]);
 useEffect(()=>{
  let generation=0,disposed=false;
  const load=async()=>{
   const token=++generation;const b=map.getBounds();const bbox=[b.getWest(),b.getSouth(),b.getEast(),b.getNorth()].join(',');
   const notes:string[]=[];
   for(const [name,visible] of [['structures',enabled],['conflict_review',conflicts]] as const){
    map.setLayoutProperty('component-'+name,'visibility',visible?'visible':'none');if(!visible)continue;
    if(map.getZoom()<13){(map.getSource('component-'+name) as GeoJSONSource).setData({type:'FeatureCollection',features:[]});notes.push('Zoom closer for components');continue;}
    try{const data=await api<FeatureCollection&{metadata:{status:string;returned?:number;truncated?:boolean}}>('components?layer='+name+'&bbox='+bbox);if(disposed||token!==generation)return;(map.getSource('component-'+name) as GeoJSONSource).setData(data);notes.push(`${name==='structures'?'Main':'Conflicts'}: ${data.metadata.returned??data.metadata.status}${data.metadata.truncated?' · clipped count, zoom closer':''}`);}catch{if(disposed||token!==generation)return;(map.getSource('component-'+name) as GeoJSONSource).setData({type:'FeatureCollection',features:[]});notes.push('Component source unavailable');}
   }if(!disposed&&token===generation)setStatus(notes.join(' · '));
  };void load();map.on('moveend',load);return()=>{disposed=true;map.off('moveend',load);};
 },[map,enabled,conflicts]);
 return <><details className="component-controls"><summary>Verified components · teal</summary><label><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>Main · 427,029</label><label><input type="checkbox" checked={conflicts} onChange={e=>setConflicts(e.target.checked)}/>Conflict review · 74 variants</label><small>Teal = main · pink = unresolved. Flat footprints; height alignment unverified.</small><small>{status}</small><button onClick={browseConflicts}>Browse all conflict variants</button>{reviewList.length>0&&<select aria-label="Conflict variant" defaultValue="" onChange={e=>void review(e.target.value)}><option value="" disabled>Select a conflict variant</option>{reviewList.map((v,i)=><option value={v.id} key={v.id}>Group {Math.floor(i/2)+1} · variant {i%2+1} · {v.id.slice(-8)}</option>)}</select>}</details>{(evidence||error)&&<section className="component-evidence" aria-label="Component evidence"><button onClick={()=>{version.current++;setEvidence(null);setError('');}}>Close evidence</button>{error&&<p>{error}</p>}{evidence&&<><h3>Component identity</h3><code>{String(evidence.component.StructureID)}</code><p>Source-scoped component; not a persistent whole-building ID.</p><dl>{['OutputLayer','SourceRecordID','representative_fid','source_record_count','GeometryStatus','DuplicateStatus','PostRepairCoincidentXY','ZRemoved','MinHeightStatus','MIN_HEIGHT_RAW'].map(k=><div key={k}><dt>{k}</dt><dd>{String(evidence.component[k]??'Not reported')}</dd></div>)}</dl><>{evidence.conflict_variants.length>0&&<div><h4>Unresolved coincident variants</h4>{evidence.conflict_variants.map(v=><button key={v.StructureID} onClick={()=>void review(v.StructureID)}>{v.StructureID.slice(-12)} · raw AVG_HEIGHT {v.AVG_HEIGHT??"unknown"} m</button>)}<p>No variant selected as ground truth; no averaging.</p></div>}</><details><summary>Geometry repair audit ({evidence.geometry_repairs.length})</summary>{evidence.geometry_repairs.length?<pre>{JSON.stringify(evidence.geometry_repairs,null,2)}</pre>:<p>No repair recorded for this component.</p>}<p>Before/after geometry is preserved in the imported GeoPackage. Repair areas are measured in EPSG:26917 square metres.</p></details><h4>Height validation · placement blocked</h4><p>{evidence.verification.height_validation.reason}</p><details><summary>What each height field measures</summary><dl>{Object.entries(evidence.verification.height_validation.fields).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p>Evidence: user-supplied publisher response and workbook; precise vertical datum unconfirmed.</p></details><h4>Missing information</h4><ul>{evidence.missing.map(x=><li key={x}>{x}</li>)}</ul><details open><summary>Original source records ({evidence.source_records.length})</summary><pre>{JSON.stringify(evidence.source_records,null,2)}</pre></details><details><summary>All retained attributes and repair flags</summary><pre>{JSON.stringify(evidence.component,null,2)}</pre></details><details><summary>Verified package checksum</summary><code>{evidence.verification.checksums['toronto_citywide_internal.gpkg']}</code></details><a href={evidence.verification.manifest.source_url} target="_blank" rel="noreferrer">City source and metadata ↗</a></>}</section>}</>;
}
