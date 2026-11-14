import {useEffect,useRef,useState} from 'react';
import * as maplibregl from 'maplibre-gl';
import type {GeoJSONSource,Map as LibreMap} from 'maplibre-gl';
import type {FeatureCollection,Point} from 'geojson';
import {LocateFixed,Search,X,Box} from 'lucide-react';
import {api,date,fmt,type WorldState,type Scenario,type Ranking,type BuildingMeta} from './types';
import {ComponentLayers} from './ComponentLayers';
import {OperationalLayers} from './OperationalLayers';
import {ReferenceLayers} from './ReferenceLayers';
import {IMAGERY} from './basemaps';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
maplibregl.setWorkerUrl(workerUrl);

type Props={onTerrain:(center:[number,number])=>void;world:WorldState;selected:string|null;onSelect:(id:string)=>void;onStation:(id:string)=>void;showBoundaries:boolean;showStations:boolean;scenario:Scenario|null;threeD:boolean;setThreeD:(value:boolean)=>void;showBuildings:boolean;setShowBuildings:(value:boolean)=>void;buildingMeta:BuildingMeta|null;ranking:Ranking|null;rankMap:boolean};
export function CityMap({onTerrain,world,selected,onSelect,onStation,showBoundaries,showStations,scenario,threeD,setThreeD,showBuildings,setShowBuildings,buildingMeta,ranking,rankMap}:Props){
  const container=useRef<HTMLDivElement>(null), map=useRef<LibreMap|null>(null);
  const [ready,setReady]=useState(false),[query,setQuery]=useState(''),[mapError,setMapError]=useState('');
  const [buildingStatus,setBuildingStatus]=useState('Loading 2025 massing…'),[building,setBuilding]=useState<{height_m:number;height_source:string;building_source:string;id:string}|null>(null);
  const [selectTerrain,setSelectTerrain]=useState(false);const terrainPick=useRef(false);terrainPick.current=selectTerrain;
  const terrainHandler=useRef(onTerrain);terrainHandler.current=onTerrain;
  const [imagery,setImagery]=useState(true);
  const [hypothetical,setHypothetical]=useState(true);
  const removed=hypothetical?(scenario?.station_ids||[]):[];
  useEffect(()=>{setHypothetical(true);},[scenario?.id]);
  const mode=useRef(threeD);mode.current=threeD;
  const handlers=useRef({onSelect,onStation});handlers.current={onSelect,onStation};
  const latest=useRef(world);latest.current=world;
  useEffect(()=>{
    if(!container.current) return;
    let m:LibreMap;
    try {
      m=new maplibregl.Map({container:container.current,center:[-79.38,43.715],zoom:10.25,minZoom:8,maxZoom:18,attributionControl:false,
        style:{version:8,sources:{basemap:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,maxzoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},imagery:{type:'raster',tiles:[IMAGERY.tile_url],tileSize:256,maxzoom:19,attribution:`Imagery © <a href="${IMAGERY.metadata_url}" target="_blank" rel="noreferrer">${IMAGERY.attribution}</a>`}},layers:[{id:'background',type:'background',paint:{'background-color':'#edf1f1'}},{id:'basemap',type:'raster',source:'basemap',layout:{visibility:'none'},paint:{'raster-opacity':0.8,'raster-saturation':-0.85}},{id:'imagery',type:'raster',source:'imagery',paint:{'raster-opacity':1,'raster-saturation':0}}]}});
    } catch {setMapError('WebGL is unavailable. Use neighbourhood search to inspect all source data.');return;}
    map.current=m;
    m.addControl(new maplibregl.NavigationControl({showCompass:true,visualizePitch:true}),'bottom-right');
    m.addControl(new maplibregl.ScaleControl({unit:'metric'}),'bottom-right');
    m.addControl(new maplibregl.AttributionControl({compact:false}),'bottom-right');
    m.on('error',()=>setMapError('Some map tiles could not load. This area may have incomplete imagery; switch to Map if needed.'));
    m.on('load',()=>{
      m.addSource('neighbourhoods',{type:'geojson',data:latest.current.boundaries,promoteId:'id'});
      m.addLayer({id:'areas',type:'fill',source:'neighbourhoods',paint:{'fill-color':'#0b8b94','fill-opacity':0.035}});
      m.addSource('ranking',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      m.addLayer({id:'availability-ranking',type:'fill',source:'ranking',layout:{visibility:'none'},paint:{'fill-color':['case',['==',['get','bikes_per_station'],null],'#b6bdc6',['step',['get','bikes_per_station'],'#ffffcc',2,'#c2e699',5,'#78c679',10,'#238443']],'fill-opacity':0.8}});
      m.addLayer({id:'boundaries',type:'line',source:'neighbourhoods',paint:{'line-color':'#168990','line-width':1,'line-opacity':0.65}});
      m.addLayer({id:'selection',type:'fill',source:'neighbourhoods',filter:['==','id',''],paint:{'fill-color':'#137f86','fill-opacity':0.2}});
      m.addLayer({id:'selection-line',type:'line',source:'neighbourhoods',filter:['==','id',''],paint:{'line-color':'#075b65','line-width':2}});
      m.addSource('buildings',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      m.addLayer({id:'buildings-3d',type:'fill-extrusion',source:'buildings',paint:{'fill-extrusion-height':['get','height_m'],'fill-extrusion-base':0,'fill-extrusion-color':'#c7d6dc','fill-extrusion-opacity':0.94,'fill-extrusion-vertical-gradient':true}});
      m.setLight({anchor:'viewport',color:'#ffffff',intensity:0.45,position:[1.15,210,35]});
      m.addSource('stations',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      m.addLayer({id:'stations',type:'circle',source:'stations',paint:{'circle-color':['match',['get','category'],'removed','#ae55a2','available','#088e94','empty','#bd7123','offline','#34475f','#98a4b1'],'circle-radius':['interpolate',['linear'],['zoom'],9,2.5,13,5,17,8],'circle-stroke-width':1,'circle-stroke-color':'#ffffff','circle-opacity':0.94}});
      m.on('click',e=>{
        if(terrainPick.current){terrainHandler.current([e.lngLat.lng,e.lngLat.lat]);return;}
        const operations=['component-structures','component-conflict_review','road-lines','road-points','terrain-tin'].filter(id=>m.getLayer(id));
        if(operations.length&&m.queryRenderedFeatures(e.point,{layers:operations}).length)return;
        const stations=m.queryRenderedFeatures(e.point,{layers:['stations']});
        if(stations[0]){handlers.current.onStation(String(stations[0].properties.id));return;}
        const buildings=m.queryRenderedFeatures(e.point,{layers:['buildings-3d']});
        if(buildings[0]){const p=buildings[0].properties;setBuilding({height_m:p.height_m,height_source:p.height_source,building_source:p.building_source,id:p.id});return;}
        const referenceIds=['reference-green-spaces','reference-cycling-network'].filter(id=>m.getLayer(id));
        if(referenceIds.length&&m.queryRenderedFeatures(e.point,{layers:referenceIds}).length)return;
        const areas=m.queryRenderedFeatures(e.point,{layers:['areas','availability-ranking']});
        if(areas[0]) handlers.current.onSelect(String(areas[0].properties.id));
      });
      m.on('mousemove',e=>{m.getCanvas().style.cursor=m.queryRenderedFeatures(e.point,{layers:['stations','areas','buildings-3d']}).length?'pointer':'';});
      if(mode.current)m.jumpTo({center:[-79.388,43.6415],zoom:container.current && container.current.clientWidth<600?15:15.6,pitch:42,bearing:-15});
      else m.fitBounds([-79.64,43.58,-79.12,43.86],{padding:{top:85,bottom:35,left:25,right:25},duration:0});
      setReady(true);
    });
    const observer=new ResizeObserver(()=>m.resize());observer.observe(container.current);
    return()=>{observer.disconnect();m.remove();map.current=null;};
  },[]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    let request=0,disposed=false;
    async function loadBuildings(){
      if(!m||!threeD||!showBuildings)return;
      const token=++request;
      if(m.getZoom()<13.5){(m.getSource('buildings') as GeoJSONSource).setData({type:'FeatureCollection',features:[]});setBuildingStatus('Zoom closer to load 2025 buildings');return;}
      setBuildingStatus('Loading source geometry…');
      try{
        const b=m.getBounds();
        const data=await api<FeatureCollection & {metadata:{status:string;returned?:number;truncated?:boolean}}>('buildings?bbox='+[b.getWest(),b.getSouth(),b.getEast(),b.getNorth()].join(','));
        if(disposed||token!==request)return;
        (m.getSource('buildings') as GeoJSONSource).setData(data);
        setBuildingStatus(data.metadata.status==='zoom_required'?'Zoom closer to load 2025 buildings':data.metadata.status==='unavailable'?'Building source unavailable':`${fmt(data.metadata.returned)} massing footprints${data.metadata.truncated?' · limit reached; zoom closer':''}`);
      }catch{if(!disposed&&token===request){(m.getSource('buildings') as GeoJSONSource).setData({type:'FeatureCollection',features:[]});setBuildingStatus('Building source unavailable');}}
    }
    m.setLayoutProperty('buildings-3d','visibility',threeD&&showBuildings?'visible':'none');
    if(threeD&&showBuildings){void loadBuildings();m.on('moveend',loadBuildings);}
    else setBuilding(null);
    return()=>{disposed=true;m.off('moveend',loadBuildings);};
  },[threeD,showBuildings,ready]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    if(rankMap){m.fitBounds([-79.64,43.58,-79.12,43.86],{padding:35,pitch:0,bearing:0,duration:600});return;}
    if(threeD)m.easeTo({pitch:showBuildings?58:42,bearing:-15,duration:650});
    else {m.easeTo({pitch:0,bearing:0,duration:650});setBuilding(null);}
  },[threeD,showBuildings,ready,rankMap]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    m.setLayoutProperty('basemap','visibility',imagery?'none':'visible');
    m.setLayoutProperty('imagery','visibility',imagery?'visible':'none');
    m.setPaintProperty('boundaries','line-color',imagery?'#8ae5dc':'#168990');
    setMapError('');
  },[imagery,ready]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    (m.getSource('neighbourhoods') as GeoJSONSource).setData(world.boundaries);
    const points:FeatureCollection<Point>={type:'FeatureCollection',features:world.stations.map(s=>({type:'Feature',geometry:{type:'Point',coordinates:[s.lon,s.lat]},properties:{id:s.id,category:removed.includes(s.id)?'removed':s.category}}))};
    (m.getSource('stations') as GeoJSONSource).setData(points);
  },[world,ready,removed]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    for(const id of ['areas','boundaries','selection','selection-line'])m.setLayoutProperty(id,'visibility',showBoundaries?'visible':'none');
    m.setLayoutProperty('stations','visibility',showStations?'visible':'none');
  },[showBoundaries,showStations,ready]);
  useEffect(()=>{
    const m=map.current;if(!ready||!m)return;
    for(const id of ['selection','selection-line'])m.setFilter(id,['==','id',selected||'']);
    const area=latest.current.boundaries.features.find(f=>f.properties.id===selected);
    if(area)m.fitBounds(area.properties.bbox,{padding:65,maxZoom:14,duration:700});
  },[selected,ready]);
  useEffect(()=>{
    const m=map.current;if(!m||!ready)return;
    const rows=new Map(ranking?.rows.map(r=>[r.id,r])||[]);
    (m.getSource('ranking') as GeoJSONSource).setData({...world.boundaries,features:world.boundaries.features.map(f=>({...f,properties:{...f.properties,bikes_per_station:rows.get(f.properties.id)?.bikes_per_station??null}}))});
    m.setLayoutProperty('availability-ranking','visibility',rankMap?'visible':'none');
  },[ranking,rankMap,world,ready]);
  useEffect(()=>{if(rankMap){setImagery(false);setThreeD(false);map.current?.fitBounds([-79.64,43.58,-79.12,43.86],{padding:35,duration:600});}},[rankMap]);
  const matches=query.trim()?world.boundaries.features.filter(f=>f.properties.name.toLowerCase().includes(query.toLowerCase())||f.properties.id===query).slice(0,8):[];
  return <section className={`map-stage ${imagery?'imagery-view':''}`} aria-label="Toronto world-state map">
    <div className="map-canvas" ref={container}/>{ready&&map.current&&<><ReferenceLayers map={map.current}/><ComponentLayers map={map.current}/><OperationalLayers map={map.current}/></>}
    <button className="terrain-map-select" aria-pressed={selectTerrain} onClick={()=>setSelectTerrain(!selectTerrain)}>{selectTerrain?'Click the map to open terrain · cancel':'Choose terrain location'}</button>
    <div className="map-search"><Search size={19}/><input aria-label="Search neighbourhoods" placeholder="Search neighbourhoods…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')}><X size={16}/></button>}
      {query&&<div className="search-results">{matches.length?matches.map(f=><button key={f.properties.id} onClick={()=>{onSelect(f.properties.id);setQuery('');}}>{f.properties.name}<small>#{f.properties.id}</small></button>):<p>No matching neighbourhoods.</p>}</div>}
    </div>
    <div className="view-mode" aria-label="Map display"><div><button aria-pressed={imagery} onClick={()=>setImagery(true)}>Imagery</button><button aria-pressed={!imagery} onClick={()=>setImagery(false)}>Map</button></div><div><button aria-pressed={!threeD} onClick={()=>setThreeD(false)}>2D</button><button aria-pressed={threeD} onClick={()=>setThreeD(true)}><Box size={14}/>3D</button></div></div>
    {!rankMap&&<div className="massing-note"><strong>{imagery?'TORONTO / AERIAL IMAGERY':'TORONTO / SOURCE MAP'}</strong><span>{imagery?'Real imagery · Esri World Imagery':'OpenStreetMap cartographic context'}</span><small>{imagery?'Capture dates vary · not live':'Reference map · not a live observation'}</small>{imagery&&<small>{threeD?'Tilted flat imagery · not textured 3D':'Top-down photographic imagery'}</small>}<label className="massing-toggle"><input type="checkbox" checked={showBuildings} onChange={e=>{setShowBuildings(e.target.checked);if(e.target.checked)setThreeD(true);}}/>Overlay 2025 building model</label>{threeD&&showBuildings&&<small>{buildingStatus} · source heights, no textures</small>}<button onClick={()=>map.current?.flyTo({center:[-79.388,43.6415],zoom:container.current&&container.current.clientWidth<600?15:15.6,pitch:threeD?(showBuildings?58:42):0,bearing:threeD?-15:0,duration:900})}>View waterfront ↗</button></div>}
    {threeD&&showBuildings&&building&&<div className="building-detail"><button aria-label="Close building evidence" onClick={()=>setBuilding(null)}><X size={14}/></button><strong>{fmt(building.height_m,1)} m</strong><span>Source AVG_HEIGHT · {building.height_source}</span><small>City 2025 model · {building.id}</small><small>Building source: {building.building_source||'Not reported'}</small><small>Model release: 2025 · individual survey date unavailable</small><small>Retrieved: {date(buildingMeta?.retrieved_at)}</small><small>Unknown: roof form, textures, ground elevation, present-day height. Flat base; no independent survey.</small><a href={buildingMeta?.page||'https://open.toronto.ca/dataset/3d-massing/'} target="_blank" rel="noreferrer">City source & metadata ↗</a><details><summary>Archive receipt</summary><code>{buildingMeta?.sha256||'Unavailable'}</code></details></div>}
    <button className="reset-map" title="Reset Toronto view" aria-label="Reset Toronto view" onClick={()=>map.current?.fitBounds([-79.64,43.58,-79.12,43.86],{padding:35,duration:600})}><LocateFixed size={20}/></button>
    {mapError&&<div className="map-warning" role="status">{mapError}</div>}
    {scenario&&<div className="simulation-comparison" aria-label="3D simulation comparison"><strong>{hypothetical?'HYPOTHETICAL OUTAGE':'OBSERVED BASELINE'}</strong><div><button aria-pressed={!hypothetical} onClick={()=>setHypothetical(false)}>Observed</button><button aria-pressed={hypothetical} onClick={()=>setHypothetical(true)}>Hypothetical</button><button onClick={()=>{const points=world.stations.filter(s=>scenario.station_ids.includes(s.id));if(points.length)map.current?.fitBounds([Math.min(...points.map(s=>s.lon)),Math.min(...points.map(s=>s.lat)),Math.max(...points.map(s=>s.lon)),Math.max(...points.map(s=>s.lat))],{padding:100,maxZoom:16,pitch:58,bearing:-15,duration:800});}}>Focus outages</button></div><span>{scenario.removed_station_count} selected station{scenario.removed_station_count===1?'':'s'} · {fmt(scenario.removed_available_bikes)} reported rentable bikes {hypothetical?'removed hypothetically':'in selected stations'}</span><small>Purple = hypothetical closure; teal = available; amber = empty; slate = not renting; gray = unknown/stale. Symbol size is not inventory. Baseline {scenario.baseline_state_id.slice(0,8)} · {date(scenario.evaluated_at)}. Static subtraction, no movement forecast.</small></div>}
    {rankMap&&<div className="rank-legend"><b>Rentable bikes / station</b><span><i style={{background:'#ffffcc'}}/>0–&lt;2 <i style={{background:'#c2e699'}}/>2–&lt;5 <i style={{background:'#78c679'}}/>5–&lt;10 <i style={{background:'#238443'}}/>10+</span><span><i style={{background:'#b6bdc6'}}/>Unavailable / no denominator</span><small>Fixed display bins, not service targets · evaluated {date(ranking?.evaluated_at)}</small></div>}
    {(!scenario&&!rankMap&&(showBoundaries||showStations))&&<div className="map-legend">{showBoundaries&&<span><i className="line"/>Neighbourhood boundary</span>}{showStations&&<><span><i className="dot teal"/>Bikes available <i className="dot amber"/>Empty</span><span><i className="dot slate"/>Not renting <i className="dot gray"/>Unknown / stale</span><small>Operator-reported stock · no demand estimate</small></>}{removed.length>0&&<span><i className="dot purple"/>Hypothetical outage</span>}</div>}
  </section>;
}
