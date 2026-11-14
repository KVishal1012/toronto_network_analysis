import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import * as ml from 'maplibre-gl';
import worker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import architecturalViews from '../sandbox/architectural.json';
import {metrics,type AreaSummary,type Filters} from './screening';
import {
  cellFootprints,
  cellNeighbourhoods,
  cellsWith3dView,
  studyAreaBoundaries,
  torontoNeighbourhoods,
  type StudyRegion,
} from './toronto-context';
import {
  architecturalBuildingsToWgs84,
  torontoParksGeoJSON,
  torontoProposalPins,
  torontoStreetLabels,
  torontoStreetsGeoJSON,
  torontoWaterGeoJSON,
  ttcSubwayLinesGeoJSON,
  ttcSubwayStations,
  type ProposalMapPin,
} from './toronto-map-data';

ml.setWorkerUrl(worker);

type BasemapMode='vector'|'osm'|'satellite';

interface PlottedArea{
  area:AreaSummary;
  neighbourhood:string;
  metrics:{projects:number;units:number;lacking:number;lackingUnits:number};
  withinUnits:number;
  radius:number;
  view3d:{region:StudyRegion;viewName:string}|undefined;
}

const KEY_STATIONS=new Set([
  'Union',
  'King',
  'Queen',
  'TMU',
  'College',
  'Wellesley',
  'Bloor-Yonge',
  'St George',
  'Spadina',
  'Museum',
  "Queen's Park",
  'St Patrick',
  'Osgoode',
  'St Andrew',
  'Rosedale',
  'Summerhill',
  'St Clair',
  'St Clair West',
  'Davisville',
  'Eglinton',
  'Lawrence',
  'Avenue',
  'Chaplin',
  'Mount Pleasant',
  'Bay',
  'Sherbourne',
  'Broadview',
]);

function getActiveRegion(region:string):StudyRegion{
  return region==='midtown'?'midtown':'downtown';
}

function markerRadius(units:number){
  return Math.round((5+Math.min(6,Math.sqrt(Math.max(1,units)/350)*1.7))*10)/10;
}

function createNeighbourhoodLabel(name:string){
  const el=document.createElement('div');
  el.className='g-map-dom-label g-map-nb-label';
  el.setAttribute('aria-hidden','true');
  el.textContent=name;
  return el;
}

function createStreetLabel(name:string,angle:number,cls:string){
  const el=document.createElement('div');
  el.className=`g-map-dom-label g-map-street-label is-${cls}`;
  el.setAttribute('aria-hidden','true');
  el.textContent=name;
  el.style.transform=`rotate(${angle}deg)`;
  return el;
}

function createStationLabel(name:string,lines:string[]){
  const el=document.createElement('div');
  el.className='g-map-dom-label g-map-station-label';
  el.setAttribute('aria-hidden','true');
  const dotColor=lines.includes('2')&&!lines.includes('1')
    ?'#16803c'
    :lines.includes('5')&&!lines.includes('1')
      ?'#d97724'
      :'#d49000';
  const dot=document.createElement('span');
  dot.className='g-map-station-dot';
  dot.style.background=dotColor;
  const text=document.createElement('span');
  text.textContent=name;
  el.append(dot,text);
  return el;
}

function extendBoundsFromCoords(bounds:ml.LngLatBounds,coords:[number,number][]){
  for(const pt of coords)bounds.extend(pt);
}

export default function AreaMap({
  areas,
  selected,
  onSelect,
  region,
  filters,
}:{
  areas:AreaSummary[];
  selected:string[];
  onSelect:(id:string)=>void;
  region:string;
  filters?:Filters;
}){
  const host=useRef<HTMLDivElement>(null);
  const map=useRef<ml.Map|null>(null);
  const markers=useRef<ml.Marker[]>([]);
  const callback=useRef(onSelect);
  callback.current=onSelect;

  const [ready,setReady]=useState(false);
  const [error,setError]=useState('');
  const [tileNotice,setTileNotice]=useState('');
  const [inspectedId,setInspectedId]=useState<string|null>(null);
  const [inspectedPin,setInspectedPin]=useState<ProposalMapPin|null>(null);
  const [basemap,setBasemap]=useState<BasemapMode>('vector');
  const [tilt3d,setTilt3d]=useState(false);

  const activeRegion=getActiveRegion(region);
  const effectiveFilters=useMemo<Filters>(
    ()=>filters??{region:activeRegion,stage:'all',radius:800,period:'morning',minimum:0,onlyGaps:false},
    [filters,activeRegion]
  );

  const allBuildingsGeoJSON=useMemo<GeoJSON.FeatureCollection>(()=>{
    const dt=architecturalViews.find(v=>v.region==='downtown');
    const mt=architecturalViews.find(v=>v.region==='midtown');
    return {
      type:'FeatureCollection',
      features:[
        ...(dt?architecturalBuildingsToWgs84('downtown',dt.buildings).features:[]),
        ...(mt?architecturalBuildingsToWgs84('midtown',mt.buildings).features:[]),
      ],
    };
  },[]);

  const plotted=useMemo<PlottedArea[]>(
    ()=>
      areas
        .filter(a=>a.centre)
        .map(area=>{
          const m=metrics(area,effectiveFilters);
          return {
            area,
            neighbourhood:cellNeighbourhoods[area.id]||'Toronto study area',
            metrics:m,
            withinUnits:Math.max(0,m.units-m.lackingUnits),
            radius:markerRadius(m.units),
            view3d:cellsWith3dView[area.id],
          };
        }),
    [areas,effectiveFilters]
  );

  const plottedById=useMemo(
    ()=>new Map(plotted.map(item=>[item.area.id,item])),
    [plotted]
  );

  const matchingPins=useMemo(
    ()=>
      torontoProposalPins.filter(pin=>{
        if(!plottedById.has(pin.cellId))return false;
        if(!pin.regions.includes(activeRegion))return false;
        if(effectiveFilters.stage==='all')return pin.stage!=='Built';
        return pin.stage===effectiveFilters.stage;
      }),
    [plottedById,activeRegion,effectiveFilters.stage]
  );

  const areasKey=useMemo(
    ()=>plotted.map(p=>p.area.id).join(','),
    [plotted]
  );

  const beyondCount=useMemo(()=>plotted.filter(p=>p.metrics.lacking>0).length,[plotted]);
  const withinCount=plotted.length-beyondCount;

  useEffect(()=>{
    if(inspectedId&&plottedById.has(inspectedId))return;
    const firstSelected=selected.find(id=>plottedById.has(id));
    setInspectedId(firstSelected??null);
    setInspectedPin(null);
  },[inspectedId,plottedById,selected]);

  const inspected=inspectedId?plottedById.get(inspectedId)??null:null;

  const fitAll=useCallback(()=>{
    const m=map.current;
    if(!m)return;
    const bounds=new ml.LngLatBounds();
    if(plotted.length){
      for(const item of plotted){
        const footprint=cellFootprints[item.area.id];
        if(footprint?.length)extendBoundsFromCoords(bounds,footprint);
        else if(item.area.centre)bounds.extend(item.area.centre);
      }
      m.fitBounds(bounds,{padding:34,maxZoom:14.2,duration:0});
      return;
    }
    const boundary=studyAreaBoundaries[activeRegion].geometry.coordinates[0] as [number,number][];
    extendBoundsFromCoords(bounds,boundary);
    m.fitBounds(bounds,{padding:28,maxZoom:13.8,duration:0});
  },[plotted,activeRegion]);

  const fitAllRef=useRef(fitAll);
  fitAllRef.current=fitAll;

  // Initialize MapLibre with full local Toronto Open Data cartography (streets, parks, water, subway, buildings)
  // plus optional OSM / Satellite tile layers that load only when chosen by the user.
  useEffect(()=>{
    if(!host.current)return;
    let m:ml.Map;
    try{
      m=new ml.Map({
        container:host.current,
        attributionControl:false,
        style:{
          version:8,
          sources:{
            'osm-raster':{
              type:'raster',
              tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize:256,
              maxzoom:19,
            },
            'satellite-raster':{
              type:'raster',
              tiles:['https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
              tileSize:256,
              maxzoom:19,
            },
          },
          layers:[
            {id:'background',type:'background',paint:{'background-color':'#e7ece8'}},
            {
              id:'osm-tiles',
              type:'raster',
              source:'osm-raster',
              layout:{visibility:'none'},
              paint:{'raster-opacity':0.92},
            },
            {
              id:'satellite-tiles',
              type:'raster',
              source:'satellite-raster',
              layout:{visibility:'none'},
              paint:{'raster-opacity':0.95},
            },
          ],
        },
        center:[-79.386,43.656],
        zoom:12.6,
        pitch:0,
      });
    }catch{
      setError('Interactive map unavailable in this browser. Use the accessible area cards or keyboard list.');
      return;
    }
    map.current=m;
    m.addControl(new ml.NavigationControl({visualizePitch:true}),'top-right');
    m.addControl(new ml.ScaleControl({unit:'metric'}),'bottom-left');

    const emptyCollection:GeoJSON.FeatureCollection={type:'FeatureCollection',features:[]};

    m.on('error',()=>{
      if(basemap!=='vector'){
        setTileNotice('External basemap tiles could not load (offline or blocked); offline Toronto Open Data streets remain visible.');
      }
    });

    m.on('load',()=>{
      m.addSource('neighbourhoods',{type:'geojson',data:emptyCollection});
      m.addSource('study-boundary',{type:'geojson',data:emptyCollection});
      m.addSource('water',{type:'geojson',data:torontoWaterGeoJSON});
      m.addSource('parks',{type:'geojson',data:torontoParksGeoJSON});
      m.addSource('streets',{type:'geojson',data:torontoStreetsGeoJSON});
      m.addSource('subway-lines',{type:'geojson',data:ttcSubwayLinesGeoJSON});
      m.addSource('subway-stations',{
        type:'geojson',
        data:{
          type:'FeatureCollection',
          features:ttcSubwayStations.map(s=>({
            type:'Feature',
            geometry:{type:'Point',coordinates:[s.lon,s.lat]},
            properties:{name:s.name,lines:s.lines.join(',')},
          })),
        },
      });
      m.addSource('buildings',{type:'geojson',data:allBuildingsGeoJSON});
      m.addSource('cell-polys',{type:'geojson',data:emptyCollection});
      m.addSource('proposal-pins',{type:'geojson',data:emptyCollection});
      m.addSource('areas',{type:'geojson',data:emptyCollection});

      // Neighbourhood land fills
      m.addLayer({
        id:'nb-adjacent-fill',
        type:'fill',
        source:'neighbourhoods',
        filter:['==',['get','active'],false],
        paint:{'fill-color':'#eaeee8','fill-opacity':0.65},
      });
      m.addLayer({
        id:'nb-active-fill',
        type:'fill',
        source:'neighbourhoods',
        filter:['==',['get','active'],true],
        paint:{'fill-color':'#f6f4ec','fill-opacity':0.95},
      });

      // Parks and green spaces
      m.addLayer({
        id:'parks-fill',
        type:'fill',
        source:'parks',
        paint:{'fill-color':'#cde3cd','fill-opacity':0.85},
      });
      m.addLayer({
        id:'parks-line',
        type:'line',
        source:'parks',
        paint:{'line-color':'#8ab58e','line-width':0.75},
      });

      // Lake Ontario & Toronto Harbour
      m.addLayer({
        id:'water-fill',
        type:'fill',
        source:'water',
        paint:{'fill-color':'#b9d8e8','fill-opacity':0.95},
      });
      m.addLayer({
        id:'water-line',
        type:'line',
        source:'water',
        paint:{'line-color':'#7ba9c4','line-width':1.1},
      });

      // Neighbourhood boundaries
      m.addLayer({
        id:'nb-adjacent-line',
        type:'line',
        source:'neighbourhoods',
        filter:['==',['get','active'],false],
        paint:{'line-color':'#a9b6ae','line-width':1,'line-dasharray':[3,2]},
      });
      m.addLayer({
        id:'nb-active-line',
        type:'line',
        source:'neighbourhoods',
        filter:['==',['get','active'],true],
        paint:{'line-color':'#89a096','line-width':1.1},
      });

      // Rail corridors & Toronto street network (with realistic road hierarchy & casings)
      m.addLayer({
        id:'streets-rail',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'rail'],
        paint:{'line-color':'#9aa3a8','line-width':1.1,'line-dasharray':[4,3]},
      });
      m.addLayer({
        id:'streets-local',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'local'],
        paint:{
          'line-color':'#d5dad6',
          'line-width':['interpolate',['linear'],['zoom'],11.5,0.4,13,0.9,15.5,2.2],
        },
      });
      m.addLayer({
        id:'streets-collector',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'collector'],
        paint:{
          'line-color':'#ffffff',
          'line-width':['interpolate',['linear'],['zoom'],11.5,0.9,13.5,1.8,16,4],
        },
      });
      m.addLayer({
        id:'streets-minor-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'minor'],
        paint:{
          'line-color':'#c2c9c4',
          'line-width':['interpolate',['linear'],['zoom'],11,1.6,13.5,3,16,6.5],
        },
      });
      m.addLayer({
        id:'streets-minor',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'minor'],
        paint:{
          'line-color':'#ffffff',
          'line-width':['interpolate',['linear'],['zoom'],11,1,13.5,2.1,16,5],
        },
      });
      m.addLayer({
        id:'streets-major-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'major'],
        paint:{
          'line-color':'#b6b5a7',
          'line-width':['interpolate',['linear'],['zoom'],11,2.6,13.5,4.4,16,8.5],
        },
      });
      m.addLayer({
        id:'streets-major',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'major'],
        paint:{
          'line-color':'#fff7dc',
          'line-width':['interpolate',['linear'],['zoom'],11,1.7,13.5,3.2,16,6.6],
        },
      });
      m.addLayer({
        id:'streets-expressway-casing',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'expressway'],
        paint:{
          'line-color':'#b98e5d',
          'line-width':['interpolate',['linear'],['zoom'],11,3.5,14,6.5],
        },
      });
      m.addLayer({
        id:'streets-expressway',
        type:'line',
        source:'streets',
        filter:['==',['get','cls'],'expressway'],
        paint:{
          'line-color':'#f6d59c',
          'line-width':['interpolate',['linear'],['zoom'],11,2.2,14,4.5],
        },
      });

      // TTC rapid transit corridors (Line 1, Line 2, Line 5)
      m.addLayer({
        id:'ttc-subway-lines',
        type:'line',
        source:'subway-lines',
        paint:{
          'line-color':['get','color'],
          'line-width':['interpolate',['linear'],['zoom'],11,2,14,3.2],
          'line-opacity':0.75,
        },
      });

      // 2025 architectural building extrusions in City Hall & Yonge–Eglinton windows
      m.addLayer({
        id:'buildings-3d',
        type:'fill-extrusion',
        source:'buildings',
        paint:{
          'fill-extrusion-color':'#c5cfd2',
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.75,
        },
      });

      // Active study region boundary
      m.addLayer({
        id:'study-boundary-line',
        type:'line',
        source:'study-boundary',
        paint:{'line-color':'#1d4d42','line-width':2,'line-dasharray':[4,2],'line-opacity':0.6},
      });

      // 500 m screening cells (light wash + clear outlines)
      m.addLayer({
        id:'cell-polys-fill',
        type:'fill',
        source:'cell-polys',
        paint:{
          'fill-color':[
            'case',
            ['get','selected'],
            '#c7e6a0',
            ['>',['get','lacking'],0],
            '#d97724',
            '#125b4c',
          ],
          'fill-opacity':[
            'case',
            ['get','selected'],
            0.28,
            ['get','inspected'],
            0.19,
            0.05,
          ],
        },
      });
      m.addLayer({
        id:'cell-polys-line',
        type:'line',
        source:'cell-polys',
        paint:{
          'line-color':[
            'case',
            ['get','selected'],
            '#9b4f00',
            ['get','inspected'],
            '#173a35',
            ['>',['get','lacking'],0],
            '#b55d12',
            '#3a6e61',
          ],
          'line-width':['case',['any',['get','selected'],['get','inspected']],2.2,0.8],
          'line-opacity':['case',['any',['get','selected'],['get','inspected']],0.95,0.45],
        },
      });

      // TTC Subway stations
      m.addLayer({
        id:'ttc-stations',
        type:'circle',
        source:'subway-stations',
        paint:{
          'circle-radius':['interpolate',['linear'],['zoom'],11,2.8,14,4.8],
          'circle-color':'#ffffff',
          'circle-stroke-color':'#1c3135',
          'circle-stroke-width':1.8,
        },
      });

      // Individual Development Pipeline proposal sites at exact street addresses
      m.addLayer({
        id:'proposal-points',
        type:'circle',
        source:'proposal-pins',
        paint:{
          'circle-radius':[
            'interpolate',
            ['linear'],
            ['get','units'],
            20,3.8,
            400,6.2,
            1500,8.5,
          ],
          'circle-color':['case',['get','beyond'], '#c25e0b','#0e6b58'],
          'circle-stroke-color':'#ffffff',
          'circle-stroke-width':1.5,
          'circle-opacity':0.92,
        },
      });

      // Selected & inspected cell highlight rings
      m.addLayer({
        id:'area-selected-halo',
        type:'circle',
        source:'areas',
        filter:['==',['get','selected'],true],
        paint:{
          'circle-radius':['+',['get','radius'],5],
          'circle-color':'rgba(155, 79, 0, 0.16)',
          'circle-stroke-color':'#9b4f00',
          'circle-stroke-width':2.4,
        },
      });
      m.addLayer({
        id:'area-inspected-halo',
        type:'circle',
        source:'areas',
        filter:['all',['==',['get','inspected'],true],['!=',['get','selected'],true]],
        paint:{
          'circle-radius':['+',['get','radius'],4],
          'circle-color':'rgba(23, 58, 53, 0.12)',
          'circle-stroke-color':'#173a35',
          'circle-stroke-width':1.8,
        },
      });

      m.on('mousemove',e=>{
        const pinHit=m.queryRenderedFeatures(e.point,{layers:['proposal-points']})[0];
        if(pinHit?.properties?.cellId){
          m.getCanvas().style.cursor='pointer';
          const p=pinHit.properties;
          setInspectedId(String(p.cellId));
          setInspectedPin({
            number:String(p.number||''),
            label:String(p.label||''),
            units:Number(p.units||0),
            stage:String(p.stage||''),
            cellId:String(p.cellId),
            regions:[],
            lon:e.lngLat.lng,
            lat:e.lngLat.lat,
            distances:{morning:null,evening:null,saturday:null},
          });
          return;
        }
        const hit=m.queryRenderedFeatures(e.point,{layers:['cell-polys-fill']})[0];
        const id=hit?.properties?.id;
        if(id){
          m.getCanvas().style.cursor='pointer';
          setInspectedPin(null);
          setInspectedId(prev=>(prev===String(id)?prev:String(id)));
        }else{
          m.getCanvas().style.cursor='';
        }
      });

      m.on('click',e=>{
        const pinHit=m.queryRenderedFeatures(e.point,{layers:['proposal-points']})[0];
        if(pinHit?.properties?.cellId){
          const cellId=String(pinHit.properties.cellId);
          setInspectedId(cellId);
          setInspectedPin({
            number:String(pinHit.properties.number||''),
            label:String(pinHit.properties.label||''),
            units:Number(pinHit.properties.units||0),
            stage:String(pinHit.properties.stage||''),
            cellId,
            regions:[],
            lon:e.lngLat.lng,
            lat:e.lngLat.lat,
            distances:{morning:null,evening:null,saturday:null},
          });
          callback.current(cellId);
          return;
        }
        const hit=m.queryRenderedFeatures(e.point,{layers:['cell-polys-fill']})[0];
        const id=hit?.properties?.id;
        if(id){
          const cellId=String(id);
          setInspectedPin(null);
          setInspectedId(cellId);
          callback.current(cellId);
        }
      });

      setReady(true);
    });

    const resize=new ResizeObserver(()=>m.resize());
    resize.observe(host.current);
    return()=>{
      markers.current.forEach(marker=>marker.remove());
      markers.current=[];
      resize.disconnect();
      m.remove();
      map.current=null;
    };
  },[allBuildingsGeoJSON]);

  // Toggle basemap style & 3D tilt cleanly
  useEffect(()=>{
    const m=map.current;
    if(!ready||!m)return;
    setTileNotice('');
    m.setLayoutProperty('osm-tiles','visibility',basemap==='osm'?'visible':'none');
    m.setLayoutProperty('satellite-tiles','visibility',basemap==='satellite'?'visible':'none');
    const isVector=basemap==='vector';
    m.setPaintProperty('nb-active-fill','fill-opacity',isVector?0.95:0.06);
    m.setPaintProperty('nb-adjacent-fill','fill-opacity',isVector?0.65:0.04);
    m.setPaintProperty('parks-fill','fill-opacity',isVector?0.85:0.25);
    m.setPaintProperty('water-fill','fill-opacity',isVector?0.95:0.15);
    m.setPaintProperty('streets-local','line-opacity',isVector?1:0.2);
    m.setPaintProperty('streets-collector','line-opacity',isVector?1:0.25);
    m.setPaintProperty('streets-minor','line-opacity',isVector?1:0.3);
    m.setPaintProperty('streets-major','line-opacity',isVector?1:0.35);
    m.setPaintProperty('streets-major-casing','line-opacity',isVector?1:0.25);
    m.setPaintProperty('streets-minor-casing','line-opacity',isVector?1:0.2);
  },[ready,basemap]);

  useEffect(()=>{
    const m=map.current;
    if(!ready||!m)return;
    m.easeTo({
      pitch:tilt3d?52:0,
      bearing:tilt3d?-15:0,
      duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:450,
    });
  },[ready,tilt3d]);

  // Sync 24 Toronto neighbourhoods, study boundaries, and DOM street / station / neighbourhood labels
  useEffect(()=>{
    const m=map.current;
    if(!ready||!m)return;

    const nbSource=m.getSource('neighbourhoods') as ml.GeoJSONSource|undefined;
    if(nbSource){
      nbSource.setData({
        type:'FeatureCollection',
        features:torontoNeighbourhoods.map(f=>({
          ...f,
          properties:{...f.properties,active:f.properties.region===activeRegion},
        })),
      });
    }

    const boundarySource=m.getSource('study-boundary') as ml.GeoJSONSource|undefined;
    if(boundarySource){
      boundarySource.setData({
        type:'FeatureCollection',
        features:[studyAreaBoundaries[activeRegion]],
      });
    }

    markers.current.forEach(marker=>marker.remove());
    const nextMarkers:ml.Marker[]=[];

    // Neighbourhood labels for active study region
    for(const f of torontoNeighbourhoods){
      if(f.properties.region!==activeRegion)continue;
      nextMarkers.push(
        new ml.Marker({element:createNeighbourhoodLabel(f.properties.name),anchor:'center'})
          .setLngLat(f.properties.centroid)
          .addTo(m)
      );
    }

    // Major Toronto street name labels in active latitude corridor
    const latMin=activeRegion==='midtown'?43.672:43.628;
    const latMax=activeRegion==='midtown'?43.735:43.680;
    for(const s of torontoStreetLabels){
      if(s.cls==='local')continue;
      if(s.lat<latMin||s.lat>latMax)continue;
      nextMarkers.push(
        new ml.Marker({element:createStreetLabel(s.name,s.angle,s.cls),anchor:'center'})
          .setLngLat([s.lon,s.lat])
          .addTo(m)
      );
    }

    // Key TTC subway/LRT station badges
    for(const st of ttcSubwayStations){
      if(st.lat<latMin||st.lat>latMax)continue;
      if(!KEY_STATIONS.has(st.name))continue;
      nextMarkers.push(
        new ml.Marker({element:createStationLabel(st.name,st.lines),anchor:'left'})
          .setLngLat([st.lon,st.lat])
          .addTo(m)
      );
    }

    markers.current=nextMarkers;
  },[ready,activeRegion]);

  // Sync 500 m cell polygons, centroids, and exact proposal street points
  useEffect(()=>{
    const m=map.current;
    if(!ready||!m)return;

    const polyFeatures:GeoJSON.Feature[]=[];
    const pointFeatures:GeoJSON.Feature[]=[];

    for(const item of plotted){
      const id=item.area.id;
      const isSelected=selected.includes(id);
      const isInspected=id===inspectedId;
      const props={
        id,
        label:item.area.label,
        neighbourhood:item.neighbourhood,
        units:item.metrics.units,
        lacking:item.metrics.lacking,
        lackingUnits:item.metrics.lackingUnits,
        projects:item.metrics.projects,
        radius:item.radius,
        selected:isSelected,
        inspected:isInspected,
      };

      const ring=cellFootprints[id];
      if(ring?.length){
        polyFeatures.push({
          type:'Feature',
          geometry:{type:'Polygon',coordinates:[ring]},
          properties:props,
        });
      }
      pointFeatures.push({
        type:'Feature',
        geometry:{type:'Point',coordinates:item.area.centre!},
        properties:props,
      });
    }

    const pinFeatures:GeoJSON.Feature[]=matchingPins.map(pin=>{
      const d=pin.distances[effectiveFilters.period];
      const beyond=d===null||d>effectiveFilters.radius;
      return {
        type:'Feature',
        geometry:{type:'Point',coordinates:[pin.lon,pin.lat]},
        properties:{
          number:pin.number,
          label:pin.label,
          units:pin.units,
          stage:pin.stage,
          cellId:pin.cellId,
          beyond,
        },
      };
    });

    (m.getSource('cell-polys') as ml.GeoJSONSource|undefined)?.setData({
      type:'FeatureCollection',
      features:polyFeatures,
    });
    (m.getSource('areas') as ml.GeoJSONSource|undefined)?.setData({
      type:'FeatureCollection',
      features:pointFeatures,
    });
    (m.getSource('proposal-pins') as ml.GeoJSONSource|undefined)?.setData({
      type:'FeatureCollection',
      features:pinFeatures,
    });
  },[ready,plotted,matchingPins,selected,inspectedId,effectiveFilters]);

  useEffect(()=>{
    if(!ready||!map.current)return;
    fitAllRef.current();
  },[ready,activeRegion,areasKey]);

  const regionName=activeRegion==='midtown'?'Midtown Toronto':'Downtown Toronto';

  return (
    <section className="g-map-section g-no-print" aria-label="Interactive Toronto housing and transit map">
      <div className="g-map-toolbar">
        <div className="g-map-mode-group" role="group" aria-label="Map style">
          <button
            type="button"
            className="g-btn-compact"
            aria-pressed={basemap==='vector'}
            onClick={()=>setBasemap('vector')}
          >
            Toronto Street Map
          </button>
          <button
            type="button"
            className="g-btn-compact"
            aria-pressed={basemap==='osm'}
            onClick={()=>setBasemap('osm')}
          >
            OSM Tiles
          </button>
          <button
            type="button"
            className="g-btn-compact"
            aria-pressed={basemap==='satellite'}
            onClick={()=>setBasemap('satellite')}
          >
            Satellite
          </button>
        </div>
        <div className="g-map-view-actions">
          <button
            type="button"
            className="g-btn-compact"
            aria-pressed={tilt3d}
            onClick={()=>setTilt3d(v=>!v)}
          >
            {tilt3d?'2D Top-Down':'3D Tilt'}
          </button>
          <button
            type="button"
            className="g-btn-compact"
            onClick={fitAll}
            disabled={!ready}
            aria-label="Reset map zoom to fit all shown areas"
          >
            Reset view
          </button>
        </div>
      </div>

      <div className="g-map-legend" aria-label="Map legend">
        <span>
          <i className="g-dot" style={{background:'#0e6b58',boxShadow:'0 0 0 1px #0e6b58'}} aria-hidden="true"/> Proposal within {effectiveFilters.radius} m TTC ({withinCount} areas)
        </span>
        <span>
          <i className="g-dot" style={{background:'#c25e0b',boxShadow:'0 0 0 1px #c25e0b'}} aria-hidden="true"/> Beyond {effectiveFilters.radius} m ({beyondCount} areas)
        </span>
        <span>
          <i
            className="g-dot"
            style={{background:'#fff',border:'2px solid #1c3135',boxShadow:'none'}}
            aria-hidden="true"
          />{' '}
          TTC station · Line 1/2/5
        </span>
      </div>

      {tileNotice&&<p role="status" className="g-map-tile-note">{tileNotice}</p>}
      {error&&<p role="alert" className="g-warning">{error}</p>}

      <div
        ref={host}
        className="g-map-canvas"
        aria-label={`Interactive Toronto street map of ${regionName} showing streets, parks, Lake Ontario, TTC subway lines, 2025 buildings, ${matchingPins.length} housing proposal sites, and ${plotted.length} areas. Use the area cards or accessible list below to select up to 2 areas.`}
      />

      <div className="g-map-inspect-card" role="region" aria-label="Inspected map area details">
        {inspected?(
          <>
            <div className="g-map-inspect-text">
              <div className="g-map-inspect-meta">
                <span>
                  {inspected.neighbourhood} · Cell {inspected.area.id}
                </span>
                <span className={`g-badge ${inspected.metrics.lacking>0?'g-badge-beyond':'g-badge-within'}`}>
                  <span aria-hidden="true">{inspected.metrics.lacking>0?'▲':'✓'}</span>{' '}
                  {inspected.metrics.lacking>0
                    ?`Beyond ${effectiveFilters.radius} m`
                    :`Within ${effectiveFilters.radius} m TTC`}
                </span>
              </div>
              <div className="g-map-inspect-title">
                {inspectedPin
                  ?`${inspectedPin.label} (${inspectedPin.units.toLocaleString()} units · ${inspectedPin.stage})`
                  :`Near ${inspected.area.label}`}
              </div>
              <div className="g-map-inspect-sub">
                Area total: {inspected.metrics.units.toLocaleString()} proposed homes across {inspected.metrics.projects}{' '}
                {inspected.metrics.projects===1?'proposal':'proposals'} ({inspected.withinUnits.toLocaleString()} within{' '}
                {effectiveFilters.radius} m)
              </div>
            </div>
            <div className="g-map-inspect-actions">
              {inspected.view3d&&(
                <a
                  className="g-card-3d"
                  href={`#view=3d&model_region=${inspected.view3d.region}&cell=${inspected.area.id}${inspectedPin?`&proposal=${encodeURIComponent(inspectedPin.number)}`:''}`}
                >
                  View in 3D ↗
                </a>
              )}
              <button
                type="button"
                aria-pressed={selected.includes(inspected.area.id)}
                onClick={()=>onSelect(inspected.area.id)}
              >
                {selected.includes(inspected.area.id)?'Selected (Remove)':'Compare area'}
              </button>
            </div>
          </>
        ):(
          <p className="g-hint" style={{margin:0}}>
            Hover or click any proposal dot or street block on the Toronto map to inspect and select up to 2 areas ({matchingPins.length} proposals plotted in {regionName}).
          </p>
        )}
      </div>

      <span className="g-sr-only" role="status" aria-live="polite">
        {inspected
          ?`Inspecting ${inspected.neighbourhood}, Near ${inspected.area.label}, cell ${inspected.area.id}: ${inspected.metrics.units} proposed homes, ${inspected.withinUnits} within ${effectiveFilters.radius} metres and ${inspected.metrics.lackingUnits} beyond ${effectiveFilters.radius} metres across ${inspected.metrics.projects} ${inspected.metrics.projects===1?'proposal':'proposals'}.`
          :''}
      </span>

      <small className="g-hint">
        Toronto Centreline, Green Spaces, 3D Massing &amp; TTC GTFS (Open Government Licence – Toronto). Switch to OSM Tiles or Satellite for web basemaps.
      </small>

      <details className="g-map-list">
        <summary>Keyboard &amp; screen-reader area selector ({plotted.length} areas on map)</summary>
        {!plotted.length?(
          <p className="g-hint">No matching areas to select under current filters.</p>
        ):(
          <ul className="g-map-items">
            {plotted.map(item=>{
              const isSel=selected.includes(item.area.id);
              return (
                <li
                  key={item.area.id}
                  onMouseEnter={()=>{setInspectedPin(null);setInspectedId(item.area.id);}}
                  onFocus={()=>{setInspectedPin(null);setInspectedId(item.area.id);}}
                >
                  <span style={{minWidth:0}}>
                    <span style={{display:'block',fontSize:'12px',color:'#45605a'}}>
                      {item.neighbourhood} · cell {item.area.id}
                    </span>
                    <strong>Near {item.area.label}</strong>{' '}
                    <small>
                      ({item.metrics.units.toLocaleString()} homes: {item.withinUnits.toLocaleString()} within /{' '}
                      {item.metrics.lackingUnits.toLocaleString()} beyond {effectiveFilters.radius} m ·{' '}
                      {item.metrics.projects} {item.metrics.projects===1?'proposal':'proposals'})
                    </small>
                  </span>
                  <button
                    type="button"
                    aria-pressed={isSel}
                    aria-label={
                      isSel
                        ?`Remove Near ${item.area.label} (${item.neighbourhood}) from comparison`
                        :`Compare Near ${item.area.label} (${item.neighbourhood})`
                    }
                    onClick={()=>{
                      setInspectedPin(null);
                      setInspectedId(item.area.id);
                      onSelect(item.area.id);
                    }}
                  >
                    {isSel?'Remove':'Compare'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </details>
    </section>
  );
}
