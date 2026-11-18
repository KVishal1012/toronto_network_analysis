import {useEffect,useRef,useState} from 'react';
import * as ml from 'maplibre-gl';
import worker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import type {createEnergyProvider,FacilitySummary} from './energy';

ml.setWorkerUrl(worker);
export default function EnergyFacilityMap({facilities,selected,onSelect,provider}:{facilities:FacilitySummary[];selected?:string;onSelect:(id:string)=>void;provider:ReturnType<typeof createEnergyProvider>}){
 const host=useRef<HTMLDivElement>(null);
 const [error,setError]=useState('');
 useEffect(()=>{
  if(!host.current)return;
  let live=true;let map:ml.Map|undefined;
  provider.geography().then(geometry=>{
   if(!live||!host.current)return;
   map=new ml.Map({container:host.current,style:{version:8,sources:{regions:{type:'geojson',data:geometry}},layers:[{id:'background',type:'background',paint:{'background-color':'#edf2ed'}},{id:'study-areas',type:'line',source:'regions',paint:{'line-color':'#58756c','line-width':2}}]},center:[-79.4,43.69],zoom:11,attributionControl:false});
   map.addControl(new ml.NavigationControl({showCompass:false}));
   map.on('error',()=>setError('Map could not render. Use the facility list below.'));
   const bounds=new ml.LngLatBounds();
   for(const f of facilities){
    const isSel=f.id===selected;
    const button=document.createElement('button');button.type='button';button.className='energy-map-marker';button.setAttribute('aria-label',f.name+', '+f.address);button.setAttribute('aria-pressed',String(isSel));button.style.zIndex=isSel?'10':'1';button.onclick=()=>onSelect(f.id);
    new ml.Marker({element:button,anchor:'center'}).setLngLat(f.location).addTo(map);bounds.extend(f.location);
   }
   if(facilities.length)map.fitBounds(bounds,{padding:38,maxZoom:15,duration:0});
  }).catch(e=>{if(live)setError(String(e));});
  return()=>{live=false;map?.remove();};
 },[provider,facilities,selected,onSelect]);
 return <figure><div ref={host} className="energy-map" role="region" aria-label="Municipal facility address locations and ASTER study boundaries"/>{error&&<p role="status">{error}</p>}<figcaption>Address points and ASTER study boundaries, north up. No street or walking-route map. The list below provides the same selection controls. Contains information licensed under the Open Government Licence – Toronto.</figcaption></figure>;
}
