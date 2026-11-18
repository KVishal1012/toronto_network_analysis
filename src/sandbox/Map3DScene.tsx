import {useEffect,useMemo,useRef,useState,type MutableRefObject} from 'react';
import * as ml from 'maplibre-gl';
import worker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import {corners,type Plot} from './model';
import type {CameraCommand} from './Scene';
import type {Proposal3D} from './proposals-3d';
import type {View3dRegion} from '../planning/toronto-context';
import {
  architecturalBuildingsToWgs84,
  localMetersToLngLat,
  regionProjections,
  torontoParksGeoJSON,
  torontoStreetLabels,
  torontoStreetsGeoJSON,
  torontoWaterGeoJSON,
  ttcSubwayLinesGeoJSON,
  ttcSubwayStations,
} from '../planning/toronto-map-data';

ml.setWorkerUrl(worker);

export type Basemap3DMode='vector'|'osm'|'satellite';

export interface ArchitecturalSceneView{
  id:string;
  name:string;
  extent_m:number;
  buildings:Array<{
    id:string;
    height:number;
    height_source:string;
    geometry:{type:string;coordinates:unknown};
  }>;
}

function createStreetMarker(name:string,angle:number,cls:string){
  const el=document.createElement('div');
  el.className=`a-map-dom-label a-map-street-label is-${cls}`;
  el.setAttribute('aria-hidden','true');
  el.textContent=name;
  el.style.transform=`rotate(${angle}deg)`;
  return el;
}

function createStationMarker(name:string,lines:string[]){
  const el=document.createElement('div');
  el.className='a-map-dom-label a-map-station-label';
  el.setAttribute('aria-hidden','true');
  const dotColor=lines.includes('2')&&!lines.includes('1')
    ?'#16803c'
    :lines.includes('5')&&!lines.includes('1')
      ?'#d97724'
      :'#d49000';
  const dot=document.createElement('span');
  dot.className='a-map-station-dot';
  dot.style.background=dotColor;
  const label=document.createElement('span');
  label.textContent=name;
  el.append(dot,label);
  return el;
}

function proposalUnitsLabel(units:number){
  if(units>=1000)return `${(units/1000).toFixed(1).replace(/\.0$/,'')}k`;
  return `${units}`;
}

export default function Map3DScene({
  region,
  view,
  basemapMode,
  highlight,
  conflict='',
  plots,
  hiddenSourceIds,
  proposals,
  selectedProposal,
  showProposals,
  onSelectBuilding,
  onSelectProposal,
  cameraControl,
  onCameraAction,
  reset,
}:{
  region:View3dRegion;
  view:ArchitecturalSceneView;
  basemapMode:Basemap3DMode;
  highlight:string;
  conflict?:string;
  plots:Plot[];
  hiddenSourceIds:string[];
  proposals:Proposal3D[];
  selectedProposal:string|null;
  showProposals:boolean;
  onSelectBuilding:(id:string)=>void;
  onSelectProposal:(proposalNumber:string)=>void;
  cameraControl?:MutableRefObject<((cmd:CameraCommand)=>void)|null>;
  onCameraAction?:(cmd:CameraCommand)=>void;
  reset:number;
}){
  const host=useRef<HTMLDivElement>(null);
  const mapRef=useRef<ml.Map|null>(null);
  const staticMarkers=useRef<ml.Marker[]>([]);
  const proposalMarkers=useRef<ml.Marker[]>([]);
  const live=useRef({onSelectBuilding,onSelectProposal,onCameraAction,basemapMode});
  live.current={onSelectBuilding,onSelectProposal,onCameraAction,basemapMode};

  const [ready,setReady]=useState(false);
  const [error,setError]=useState('');
  const [tileNotice,setTileNotice]=useState('');

  const buildingsGeoJSON=useMemo(
    ()=>architecturalBuildingsToWgs84(region,view.buildings),
    [region,view]
  );

  const windowBoundaryGeoJSON=useMemo<GeoJSON.FeatureCollection>(()=>{
    const half=view.extent_m/2;
    const nw=localMetersToLngLat(region,-half,-half);
    const ne=localMetersToLngLat(region,half,-half);
    const se=localMetersToLngLat(region,half,half);
    const sw=localMetersToLngLat(region,-half,half);
    return {
      type:'FeatureCollection',
      features:[
        {
          type:'Feature',
          geometry:{type:'Polygon',coordinates:[[nw,ne,se,sw,nw]]},
          properties:{name:view.name},
        },
      ],
    };
  },[region,view.extent_m,view.name]);

  const proposalsGeoJSON=useMemo<GeoJSON.FeatureCollection>(()=>{
    const features:GeoJSON.Feature[]=proposals.map(p=>{
      const r=11;
      const c0=localMetersToLngLat(region,p.x-r,p.z-r);
      const c1=localMetersToLngLat(region,p.x+r,p.z-r);
      const c2=localMetersToLngLat(region,p.x+r,p.z+r);
      const c3=localMetersToLngLat(region,p.x-r,p.z+r);
      const [lon,lat]=localMetersToLngLat(region,p.x,p.z);
      return {
        type:'Feature',
        geometry:{type:'Polygon',coordinates:[[c0,c1,c2,c3,c0]]},
        properties:{
          number:p.number,
          label:p.label,
          units:p.units,
          stage:p.stage,
          height:Math.max(18,Math.min(180,Math.round(18+Math.sqrt(Math.max(0,p.units))*2.2))),
          lon,
          lat,
        },
      };
    });
    return {type:'FeatureCollection',features};
  },[region,proposals]);

  const replacementGeoJSON=useMemo<GeoJSON.FeatureCollection>(()=>{
    const features:GeoJSON.Feature[]=plots.map(p=>{
      const pts=corners(p).map(([cx,cz])=>localMetersToLngLat(region,cx,cz));
      const ring=[...pts,pts[0]];
      return {
        type:'Feature',
        geometry:{type:'Polygon',coordinates:[ring]},
        properties:{
          id:p.id,
          height:p.height,
        },
      };
    });
    return {type:'FeatureCollection',features};
  },[region,plots]);

  useEffect(()=>{
    const container=host.current;
    if(!container)return;
    const proj=regionProjections[region];
    const [w,s,e,n]=proj.boundsWgs84;
    const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let m:ml.Map;
    try{
      m=new ml.Map({
        container,
        center:proj.centre,
        zoom:15.65,
        pitch:56,
        bearing:-18,
        minZoom:13.2,
        maxZoom:18.6,
        maxBounds:[
          [w-0.015,s-0.012],
          [e+0.015,n+0.012],
        ],
        attributionControl:false,
        dragRotate:true,
        pitchWithRotate:true,
        style:{
          version:8,
          sources:{
            'osm-raster':{
              type:'raster',
              tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize:256,
              maxzoom:19,
              attribution:'© OpenStreetMap contributors',
            },
            'satellite-raster':{
              type:'raster',
              tiles:[
                'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              ],
              tileSize:256,
              maxzoom:19,
              attribution:'Esri World Imagery',
            },
          },
          layers:[
            {id:'background',type:'background',paint:{'background-color':'#ebe7de'}},
            {id:'osm-tiles',type:'raster',source:'osm-raster',layout:{visibility:'none'}},
            {id:'satellite-tiles',type:'raster',source:'satellite-raster',layout:{visibility:'none'}},
          ],
        },
      });
    }catch{
      setError(
        'Interactive 3D map graphics are unavailable in this browser. You can still inspect all recorded buildings and proposals from the left panel.'
      );
      return;
    }

    mapRef.current=m;
    m.addControl(new ml.NavigationControl({visualizePitch:true,showCompass:true}),'top-right');

    const canvas=m.getCanvas();
    canvas.tabIndex=0;
    canvas.setAttribute('role','application');
    canvas.setAttribute(
      'aria-label',
      `Toronto 3D street map of ${view.name}. Drag to pan, right-drag to rotate and tilt, scroll to zoom, click any building or proposal tower to inspect. Keyboard: arrow keys to rotate and tilt, plus and minus to zoom, 0 to reset view.`
    );

    const adjustCamera=(cmd:CameraCommand)=>{
      const dur=reducedMotion()?0:240;
      if(cmd==='reset'){
        m.easeTo({
          center:proj.centre,
          zoom:15.65,
          pitch:56,
          bearing:-18,
          duration:reducedMotion()?0:420,
        });
        return;
      }
      if(cmd==='orbit-left')m.easeTo({bearing:m.getBearing()-22,duration:dur});
      else if(cmd==='orbit-right')m.easeTo({bearing:m.getBearing()+22,duration:dur});
      else if(cmd==='tilt-up')m.easeTo({pitch:Math.max(0,m.getPitch()-10),duration:dur});
      else if(cmd==='tilt-down')m.easeTo({pitch:Math.min(72,m.getPitch()+10),duration:dur});
      else if(cmd==='zoom-in')m.easeTo({zoom:Math.min(18.5,m.getZoom()+0.65),duration:dur});
      else if(cmd==='zoom-out')m.easeTo({zoom:Math.max(13.2,m.getZoom()-0.65),duration:dur});
    };
    if(cameraControl)cameraControl.current=adjustCamera;

    const onKey=(ev:KeyboardEvent)=>{
      let cmd:CameraCommand|null=null;
      if(ev.key==='ArrowLeft')cmd='orbit-left';
      else if(ev.key==='ArrowRight')cmd='orbit-right';
      else if(ev.key==='ArrowUp')cmd='tilt-up';
      else if(ev.key==='ArrowDown')cmd='tilt-down';
      else if(ev.key==='+'||ev.key==='=')cmd='zoom-in';
      else if(ev.key==='-'||ev.key==='_')cmd='zoom-out';
      else if(ev.key==='0'||ev.key==='Home'||ev.key==='r'||ev.key==='R')cmd='reset';
      if(cmd){
        ev.preventDefault();
        adjustCamera(cmd);
        live.current.onCameraAction?.(cmd);
      }
    };
    canvas.addEventListener('keydown',onKey);

    m.on('error',(ev:ml.ErrorEvent)=>{
      if(live.current.basemapMode==='vector')return;
      const err=ev?.error as {message?:string;status?:number}|undefined;
      if(err?.status||err?.message?.toLowerCase().includes('tile')||err?.message?.toLowerCase().includes('fetch')){
        setTileNotice(
          'External web tiles are unreachable right now. Switch back to 3D Street Map for offline City of Toronto vector streets.'
        );
      }
    });

    m.on('load',()=>{
      m.addSource('water',{type:'geojson',data:torontoWaterGeoJSON});
      m.addSource('parks',{type:'geojson',data:torontoParksGeoJSON});
      m.addSource('streets',{type:'geojson',data:torontoStreetsGeoJSON});
      m.addSource('subway-lines',{type:'geojson',data:ttcSubwayLinesGeoJSON});
      m.addSource('window-boundary',{type:'geojson',data:windowBoundaryGeoJSON});
      m.addSource('buildings',{type:'geojson',data:buildingsGeoJSON});
      m.addSource('proposals',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      m.addSource('replacement',{type:'geojson',data:{type:'FeatureCollection',features:[]}});

      m.addLayer({
        id:'water-fill',
        type:'fill',
        source:'water',
        paint:{'fill-color':'#c2dced','fill-opacity':0.95},
      });
      m.addLayer({
        id:'water-outline',
        type:'line',
        source:'water',
        paint:{'line-color':'#9abbd0','line-width':1.2},
      });
      m.addLayer({
        id:'parks-fill',
        type:'fill',
        source:'parks',
        paint:{'fill-color':'#d5e8ce','fill-opacity':0.9},
      });
      m.addLayer({
        id:'parks-outline',
        type:'line',
        source:'parks',
        paint:{'line-color':'#b1cca7','line-width':1},
      });

      m.addLayer({
        id:'streets-rail',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'rail'],
        paint:{'line-color':'#9a958c','line-width':1.4,'line-dasharray':[3,2]},
      });
      m.addLayer({
        id:'streets-local',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'local'],
        paint:{'line-color':'#ffffff','line-width':['interpolate',['linear'],['zoom'],13.5,1.2,15.5,2.8,17.5,5.5]},
      });
      m.addLayer({
        id:'streets-collector',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'collector'],
        paint:{'line-color':'#ffffff','line-width':['interpolate',['linear'],['zoom'],13.5,1.8,15.5,4,17.5,7.5]},
      });
      m.addLayer({
        id:'streets-minor-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'minor'],
        paint:{'line-color':'#c5c3b6','line-width':['interpolate',['linear'],['zoom'],13.5,3,15.5,6.2,17.5,11]},
      });
      m.addLayer({
        id:'streets-minor',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'minor'],
        paint:{'line-color':'#ffffff','line-width':['interpolate',['linear'],['zoom'],13.5,2,15.5,4.6,17.5,8.6]},
      });
      m.addLayer({
        id:'streets-major-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'major'],
        paint:{'line-color':'#b8b5a4','line-width':['interpolate',['linear'],['zoom'],13.5,4.5,15.5,8.5,17.5,15]},
      });
      m.addLayer({
        id:'streets-major',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'major'],
        paint:{'line-color':'#fff6da','line-width':['interpolate',['linear'],['zoom'],13.5,3,15.5,6.5,17.5,12]},
      });
      m.addLayer({
        id:'streets-expressway-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'expressway'],
        paint:{'line-color':'#b98e5d','line-width':['interpolate',['linear'],['zoom'],13.5,5,15.5,9.5,17.5,16]},
      });
      m.addLayer({
        id:'streets-expressway',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'expressway'],
        paint:{'line-color':'#f6d59c','line-width':['interpolate',['linear'],['zoom'],13.5,3.4,15.5,7.2,17.5,13]},
      });

      m.addLayer({
        id:'ttc-subway-lines',
        type:'line',
        source:'subway-lines',
        paint:{
          'line-color':['get','color'],
          'line-width':3.2,
          'line-dasharray':[2.5,1.5],
          'line-opacity':0.82,
        },
      });

      m.addLayer({
        id:'window-boundary-fill',
        type:'fill',
        source:'window-boundary',
        paint:{'fill-color':'#1b6d75','fill-opacity':0.04},
      });
      m.addLayer({
        id:'window-boundary-line',
        type:'line',
        source:'window-boundary',
        paint:{'line-color':'#25535c','line-width':2,'line-dasharray':[4,2],'line-opacity':0.85},
      });

      m.addLayer({
        id:'buildings-3d',
        type:'fill-extrusion',
        source:'buildings',
        paint:{
          'fill-extrusion-color':'#c6cdd0',
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.9,
        },
      });

      m.addLayer({
        id:'proposals-3d',
        type:'fill-extrusion',
        source:'proposals',
        paint:{
          'fill-extrusion-color':'#e05235',
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.86,
        },
      });

      m.addLayer({
        id:'replacement-3d',
        type:'fill-extrusion',
        source:'replacement',
        paint:{
          'fill-extrusion-color':'#d97706',
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.94,
        },
      });

      // Street labels and nearby TTC stations (decorative aria-hidden overlays)
      const nextStatic:ml.Marker[]=[];
      const [cLon,cLat]=proj.centre;
      for(const stLabel of torontoStreetLabels){
        if(!stLabel.in3d)continue;
        if(Math.abs(stLabel.lon-cLon)>0.014||Math.abs(stLabel.lat-cLat)>0.011)continue;
        nextStatic.push(
          new ml.Marker({element:createStreetMarker(stLabel.name,stLabel.angle,stLabel.cls),anchor:'center'})
            .setLngLat([stLabel.lon,stLabel.lat])
            .addTo(m)
        );
      }
      for(const station of ttcSubwayStations){
        if(Math.abs(station.lon-cLon)>0.0056||Math.abs(station.lat-cLat)>0.0046)continue;
        const stationOffset:[number,number]=station.name==='St Patrick'?[-14,18]:[0,0];
        nextStatic.push(
          new ml.Marker({element:createStationMarker(station.name,station.lines),anchor:'left',offset:stationOffset})
            .setLngLat([station.lon,station.lat])
            .addTo(m)
        );
      }
      staticMarkers.current=nextStatic;

      m.on('mouseenter','buildings-3d',()=>{m.getCanvas().style.cursor='pointer';});
      m.on('mouseleave','buildings-3d',()=>{m.getCanvas().style.cursor='';});
      m.on('mouseenter','proposals-3d',()=>{m.getCanvas().style.cursor='pointer';});
      m.on('mouseleave','proposals-3d',()=>{m.getCanvas().style.cursor='';});

      m.on('click','proposals-3d',(ev:ml.MapLayerMouseEvent)=>{
        const hit=ev.features?.[0];
        const num=hit?.properties?.number;
        if(num)live.current.onSelectProposal(String(num));
      });
      m.on('click','buildings-3d',(ev:ml.MapLayerMouseEvent)=>{
        const propHits=m.queryRenderedFeatures(ev.point,{layers:['proposals-3d']});
        if(propHits.length)return;
        const hit=ev.features?.[0];
        const id=hit?.properties?.id;
        if(id)live.current.onSelectBuilding(String(id));
      });

      setReady(true);
    });

    const resize=new ResizeObserver(()=>m.resize());
    resize.observe(container);

    return()=>{
      canvas.removeEventListener('keydown',onKey);
      staticMarkers.current.forEach(mk=>mk.remove());
      staticMarkers.current=[];
      proposalMarkers.current.forEach(mk=>mk.remove());
      proposalMarkers.current=[];
      resize.disconnect();
      m.remove();
      mapRef.current=null;
    };
  },[region,view.name,buildingsGeoJSON,windowBoundaryGeoJSON]);

  // Basemap mode sync (vector offline default vs OSM Tiles vs Satellite)
  useEffect(()=>{
    const m=mapRef.current;
    if(!ready||!m)return;
    setTileNotice('');
    m.setLayoutProperty('osm-tiles','visibility',basemapMode==='osm'?'visible':'none');
    m.setLayoutProperty('satellite-tiles','visibility',basemapMode==='satellite'?'visible':'none');
    const isVec=basemapMode==='vector';
    m.setPaintProperty('water-fill','fill-opacity',isVec?0.95:0.12);
    m.setPaintProperty('water-outline','line-opacity',isVec?1:0.25);
    m.setPaintProperty('parks-fill','fill-opacity',isVec?0.9:0.22);
    m.setPaintProperty('parks-outline','line-opacity',isVec?1:0.25);
    m.setPaintProperty('streets-local','line-opacity',isVec?1:0.18);
    m.setPaintProperty('streets-collector','line-opacity',isVec?1:0.22);
    m.setPaintProperty('streets-minor','line-opacity',isVec?1:0.25);
    m.setPaintProperty('streets-minor-casing','line-opacity',isVec?1:0.2);
    m.setPaintProperty('streets-major','line-opacity',isVec?1:0.35);
    m.setPaintProperty('streets-major-casing','line-opacity',isVec?1:0.25);
    m.setPaintProperty('streets-expressway','line-opacity',isVec?1:0.4);
    m.setPaintProperty('buildings-3d','fill-extrusion-opacity',isVec?0.92:0.8);
  },[ready,basemapMode]);

  // Highlight selected 2025 building & filter out replaced building
  useEffect(()=>{
    const m=mapRef.current;
    if(!ready||!m)return;
    m.setFilter(
      'buildings-3d',
      hiddenSourceIds.length?['!',['in',['get','id'],['literal',hiddenSourceIds]]]:['all']
    );
    m.setPaintProperty('buildings-3d','fill-extrusion-color',[
      'case',
      ['==',['get','id'],conflict||''],
      '#c13c32',
      ['==',['get','id'],highlight||''],
      '#1b6d75',
      '#c6cdd0',
    ]);
  },[ready,highlight,conflict,hiddenSourceIds]);

  // Replacement volume extrusion
  useEffect(()=>{
    const m=mapRef.current;
    if(!ready||!m)return;
    (m.getSource('replacement') as ml.GeoJSONSource|undefined)?.setData(replacementGeoJSON);
  },[ready,replacementGeoJSON]);

  // Housing proposal 3D extrusions & interactive pins
  useEffect(()=>{
    const m=mapRef.current;
    if(!ready||!m)return;
    (m.getSource('proposals') as ml.GeoJSONSource|undefined)?.setData(proposalsGeoJSON);
    m.setLayoutProperty('proposals-3d','visibility',showProposals?'visible':'none');
    m.setPaintProperty('proposals-3d','fill-extrusion-color',[
      'case',
      ['==',['get','number'],selectedProposal||''],
      '#9e1b10',
      '#e05235',
    ]);

    proposalMarkers.current.forEach(mk=>mk.remove());
    proposalMarkers.current=[];
    if(!showProposals)return;

    const nextPins:ml.Marker[]=[];
    const placedCoords:Array<{x:number;z:number}>=[];
    for(const p of proposals){
      const isSelected=p.number===selectedProposal;
      const btn=document.createElement('button');
      btn.type='button';
      btn.className=isSelected?'a-map-proposal-pin is-selected':'a-map-proposal-pin';
      btn.setAttribute('aria-pressed',isSelected?'true':'false');
      btn.setAttribute('aria-label',`Proposal ${p.label} — ${p.units.toLocaleString()} units (${p.stage})`);
      btn.title=`${p.label} · ${p.units.toLocaleString()} units (${p.stage})`;
      btn.textContent=isSelected?`${p.label.split(',')[0].slice(0,18)} · ${proposalUnitsLabel(p.units)}`:proposalUnitsLabel(p.units);
      btn.addEventListener('click',ev=>{
        ev.stopPropagation();
        live.current.onSelectProposal(p.number);
      });
      const nearCount=placedCoords.filter(prev=>Math.hypot(p.x-prev.x,p.z-prev.z)<65).length;
      placedCoords.push({x:p.x,z:p.z});
      const pinOffset:[number,number]=[0,-28*nearCount];
      const [lon,lat]=localMetersToLngLat(region,p.x,p.z);
      nextPins.push(new ml.Marker({element:btn,anchor:'bottom',offset:pinOffset}).setLngLat([lon,lat]).addTo(m));
    }
    proposalMarkers.current=nextPins;
  },[ready,region,proposalsGeoJSON,proposals,showProposals,selectedProposal]);

  // Reset trigger from parent button
  useEffect(()=>{
    const m=mapRef.current;
    if(!ready||!m||reset===0)return;
    const proj=regionProjections[region];
    m.easeTo({
      center:proj.centre,
      zoom:15.65,
      pitch:56,
      bearing:-18,
      duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:420,
    });
  },[ready,region,reset]);

  if(error){
    return (
      <div className="scene">
        <div className="graphics-error" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="scene a-map3d-wrap">
      {tileNotice&&(
        <p role="status" className="a-map3d-notice">
          {tileNotice}
        </p>
      )}
      <div ref={host} className="a-map3d-host"/>
    </div>
  );
}
