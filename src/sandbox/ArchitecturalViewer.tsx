import {useEffect,useMemo,useRef,useState} from 'react';
import Scene,{type CameraCommand} from './Scene';
import Map3DScene,{type Basemap3DMode} from './Map3DScene';
import type {View3dRegion} from '../planning/toronto-context';
import {initialVolume,nearestEditableBuilding,validStartingVolume,validateReplacement,consequences,type Replacement} from './replacement';
import type {Plot} from './model';
import {proposals3d,type Proposal3D} from './proposals-3d';
import views from './architectural.json';
import './architectural.css';

type DimKey='x'|'z'|'width'|'depth'|'height'|'rotation';
type DraftText=Record<DimKey,string>;
type StageFilter='all'|'unbuilt'|'Built';
type ViewMode3D='map-vector'|'map-osm'|'map-satellite'|'cad';

const DIMENSION_FIELDS:readonly {key:DimKey;label:string;hint:string;min:number;max:number;step:string}[]=[
 {key:'x',label:'Position East / West (m from centre)',hint:'+ moves east, − moves west (within ±300 m)',min:-300,max:300,step:'0.5'},
 {key:'z',label:'Position South / North (m from centre)',hint:'+ moves south, − moves north (within ±300 m)',min:-300,max:300,step:'0.5'},
 {key:'width',label:'Width — East–West (m)',hint:'2 to 150 m',min:2,max:150,step:'0.5'},
 {key:'depth',label:'Depth — North–South (m)',hint:'2 to 150 m',min:2,max:150,step:'0.5'},
 {key:'height',label:'Height (m)',hint:'1 to 400 m',min:1,max:400,step:'0.5'},
 {key:'rotation',label:'Rotation (degrees)',hint:'0° to 359° clockwise',min:0,max:359,step:'1'}
];

const CAMERA_LABELS:Record<CameraCommand,string>={
 'orbit-left':'Rotated 3D view left.',
 'orbit-right':'Rotated 3D view right.',
 'tilt-up':'Raised 3D camera to a higher angle.',
 'tilt-down':'Lowered 3D camera closer to street angle.',
 'zoom-in':'Zoomed in on 3D view.',
 'zoom-out':'Zoomed out on 3D view.',
 'reset':'Reset 3D camera to default view.'
};

function approxStoreys(metres:number){
 return Math.max(1,Math.round(metres/3));
}

function explainHeightSource(source:string){
 const norm=source.trim().toLowerCase();
 if(norm==='lidar-derived')return 'aerial laser scanning';
 if(norm==='3d model')return 'existing City 3D model';
 if(norm==='site plan')return 'submitted site-plan drawings';
 return 'published City records';
}

function safeSource(url:string){
 try{
  const u=new URL(url);
  return u.protocol==='https:'||u.protocol==='http:'?u.href:undefined;
 }catch{
  return undefined;
 }
}

function plotToText(p:Plot):DraftText{
 return {
  x:String(p.x),
  z:String(p.z),
  width:String(p.width),
  depth:String(p.depth),
  height:String(p.height),
  rotation:String(p.rotation)
 };
}

function getBackHash(){
 const q=new URLSearchParams(location.hash.slice(1));
 q.delete('view');
 q.delete('model_region');
 q.delete('proposal');
 q.delete('cell');
 return q.toString();
}

function resolveHashTarget(hash:string){
 const q=new URLSearchParams(hash.replace(/^#/,''));
 const proposalParam=q.get('proposal')?.trim()||'';
 const cellParam=q.get('cell')?.trim()||'';
 const areasParam=(q.get('areas')||'').split(',').map(s=>s.trim()).filter(Boolean);
 const regionParam=q.get('model_region')||q.get('region')||'';

 let matchedProposal:Proposal3D|undefined;
 if(proposalParam){
  const lower=proposalParam.toLowerCase();
  matchedProposal=proposals3d.find(p=>p.number===proposalParam)
   ||proposals3d.find(p=>p.number.toLowerCase()===lower||p.label.toLowerCase()===lower);
 }
 if(!matchedProposal&&cellParam){
  const cellMatches=proposals3d.filter(p=>p.cellId===cellParam);
  matchedProposal=cellMatches.find(p=>p.stage!=='Built')||cellMatches[0];
 }
 if(!matchedProposal&&!regionParam&&areasParam.length){
  for(const areaId of areasParam){
   const areaMatches=proposals3d.filter(p=>p.cellId===areaId);
   if(areaMatches.length){
    matchedProposal=areaMatches.find(p=>p.stage!=='Built')||areaMatches[0];
    break;
   }
  }
 }

 const resolvedRegion:'downtown'|'midtown'=matchedProposal
  ?matchedProposal.region
  :(regionParam==='midtown'||cellParam.startsWith('1257_')||cellParam.startsWith('1258_'))
   ?'midtown'
   :'downtown';

 return {
  region:resolvedRegion,
  proposalNumber:matchedProposal?.number||'',
  buildingId:matchedProposal?.nearestBuildingId||'',
  cellId:cellParam&&proposals3d.some(p=>p.cellId===cellParam&&p.region===resolvedRegion)?cellParam:'',
  matchedProposal
 };
}

function stageBadgeClass(stage:string){
 if(stage==='Active')return 'a-stage-badge is-active';
 if(stage==='Under Review')return 'a-stage-badge is-review';
 return 'a-stage-badge is-built';
}

export default function ArchitecturalViewer(){
 useEffect(()=>{document.title='ASTER — Toronto 3D Building & Proposal Explorer';},[]);
 const initialTarget=useMemo(()=>resolveHashTarget(location.hash),[]);
 const [region,setRegion]=useState<'downtown'|'midtown'>(initialTarget.region);
 const [selected,setSelected]=useState(initialTarget.buildingId);
 const [selectedProposal,setSelectedProposal]=useState(initialTarget.proposalNumber);
 const [cellFilter,setCellFilter]=useState(initialTarget.cellId);
 const [onlyCellProposals,setOnlyCellProposals]=useState(false);
 const [showProposals,setShowProposals]=useState(true);
 const [viewMode,setViewMode]=useState<ViewMode3D>('map-vector');
 const [stageFilter,setStageFilter]=useState<StageFilter>('all');
 const [search,setSearch]=useState('');
 const [reset,setReset]=useState(0);
 const [limit,setLimit]=useState(10);
 const [draft,setDraft]=useState<Plot|null>(null);
 const [draftText,setDraftText]=useState<DraftText|null>(null);
 const [scenario,setScenario]=useState<Replacement|null>(null);
 const [original,setOriginal]=useState(false);
 const [message,setMessage]=useState('');
 const [isError,setIsError]=useState(false);
 const [conflict,setConflict]=useState('');
 const [blockedRecovery,setBlockedRecovery]=useState<{blockedId:string;conflictId:string;nearest:{buildingId:string;distance_m:number}|null}|null>(null);
 const [announcement,setAnnouncement]=useState(()=>
  initialTarget.matchedProposal
   ?`Highlighted proposal ${initialTarget.matchedProposal.label}: ${initialTarget.matchedProposal.units.toLocaleString()} units, ${initialTarget.matchedProposal.stage}.`
   :''
 );

 const mainRef=useRef<HTMLElement>(null);
 const editorHeadingRef=useRef<HTMLHeadingElement>(null);
 const cameraControlRef=useRef<((cmd:CameraCommand)=>void)|null>(null);

 useEffect(()=>{
  const onHashChange=()=>{
   const next=resolveHashTarget(location.hash);
   if(next.region!==region){
    setRegion(next.region);
    setDraft(null);
    setDraftText(null);
    setScenario(null);
    setOriginal(false);
    setMessage('');
    setIsError(false);
    setSearch('');
    setLimit(30);
    setStageFilter('all');
    setOnlyCellProposals(false);
   }
   setCellFilter(next.cellId);
   if(next.proposalNumber){
    setSelectedProposal(next.proposalNumber);
    setSelected(next.buildingId);
    setShowProposals(true);
    if(next.matchedProposal){
     setAnnouncement(`Selected proposal ${next.matchedProposal.label}: ${next.matchedProposal.units.toLocaleString()} units, ${next.matchedProposal.stage}.`);
    }
   }else if(next.region!==region){
    setSelectedProposal('');
    setSelected('');
   }
  };
  window.addEventListener('hashchange',onHashChange);
  return()=>window.removeEventListener('hashchange',onHashChange);
 },[region]);

 const view=views.find(v=>v.region===region)!;
 const selectedCells=(new URLSearchParams(location.hash.slice(1)).get('areas')||'').split(',').filter(Boolean);
 const outsideCells=selectedCells.filter(id=>!proposals3d.some(p=>p.cellId===id));
 const regionProposals=useMemo(()=>proposals3d.filter(p=>p.region===region),[region]);
 const visibleProposals=useMemo(()=>regionProposals.filter(p=>{
  if(onlyCellProposals&&cellFilter&&p.cellId!==cellFilter)return false;
  if(stageFilter==='unbuilt')return p.stage!=='Built';
  if(stageFilter==='Built')return p.stage==='Built';
  return true;
 }),[regionProposals,onlyCellProposals,cellFilter,stageFilter]);
 const unbuiltCount=useMemo(()=>regionProposals.filter(p=>p.stage!=='Built').length,[regionProposals]);
 const builtCount=regionProposals.length-unbuiltCount;

 const activeProposal=useMemo(()=>regionProposals.find(p=>p.number===selectedProposal)||null,[regionProposals,selectedProposal]);
 const demoEditableExample=useMemo(()=>{
  const editableProposal=regionProposals.find(p=>{
   const b=view.buildings.find(item=>item.id===p.nearestBuildingId);
   return b&&validStartingVolume(view,b)!==null;
  });
  if(editableProposal){
   return {proposal:editableProposal,buildingId:editableProposal.nearestBuildingId,label:editableProposal.label};
  }
  const fallback=nearestEditableBuilding(view);
  return fallback?{proposal:null,buildingId:fallback.building.id,label:`building ${fallback.building.id}`}:null;
 },[view,regionProposals]);
 const building=view.buildings.find(b=>b.id===selected);
 const filtered=view.buildings.filter(b=>!search||b.id.toLowerCase().includes(search.toLowerCase())||b.height_source.toLowerCase().includes(search.toLowerCase())||explainHeightSource(b.height_source).toLowerCase().includes(search.toLowerCase()));
 const effects=scenario?consequences(view,scenario):null;
 const backHash=getBackHash();
 const backHref=backHash?`#${backHash}`:'./';

 function announceStatus(text:string,error=false){
  setMessage(text);
  setIsError(error);
  setAnnouncement(text);
 }

 function updateHashParams(updates:Record<string,string|null>){
  const q=new URLSearchParams(location.hash.slice(1));
  for(const [k,v] of Object.entries(updates)){
   if(v===null||v==='')q.delete(k);
   else q.set(k,v);
  }
  history.replaceState(null,'','#'+q.toString());
 }

 function selectBuilding(id:string){
  setSelected(id);
  if(activeProposal&&activeProposal.nearestBuildingId!==id){
   setSelectedProposal('');
   updateHashParams({proposal:null});
  }
  if(draft&&!scenario){
   setDraft(null);
   setDraftText(null);
   setMessage('');
   setIsError(false);
  }
  const b=view.buildings.find(item=>item.id===id);
  if(b){
   setAnnouncement(`Selected building ${b.id}: ${b.height.toFixed(1)} metres, roughly ${approxStoreys(b.height)} storeys estimated, from ${explainHeightSource(b.height_source)}.`);
  }
 }

 function selectProposal(p:Proposal3D){
  setSelectedProposal(p.number);
  setSelected(p.nearestBuildingId);
  setShowProposals(true);
  if(draft&&!scenario&&draft.id&&selected!==p.nearestBuildingId){
   setDraft(null);
   setDraftText(null);
   setMessage('');
   setIsError(false);
  }
  updateHashParams({model_region:p.region,proposal:p.number,cell:p.cellId});
  setAnnouncement(`Selected proposal ${p.label}, ${p.units.toLocaleString()} proposed units, ${p.stage}. Closest 2025 building ${p.nearestBuildingId} highlighted.`);
 }

 function selectProposalByNumber(proposalNumber:string){
  const found=regionProposals.find(p=>p.number===proposalNumber);
  if(found)selectProposal(found);
 }

 function changeRegion(next:'downtown'|'midtown'){
  setRegion(next);
  setSelected('');
  setSelectedProposal('');
  setCellFilter('');
  setOnlyCellProposals(false);
  setStageFilter('all');
  setDraft(null);
  setDraftText(null);
  setScenario(null);
  setOriginal(false);
  setMessage('');
  setIsError(false);
  setConflict('');
  setBlockedRecovery(null);
  setSearch('');
  setLimit(10);
  updateHashParams({model_region:next,proposal:null,cell:null});
  const nextView=views.find(v=>v.region===next);
  const count=proposals3d.filter(p=>p.region===next).length;
  if(nextView){
   setAnnouncement(`Switched 3D view to ${nextView.name}, showing ${nextView.buildings.length} recorded 2025 buildings and ${count} housing proposals.`);
  }
 }

 function runCamera(cmd:CameraCommand){
  if(cmd==='reset'){
   setReset(n=>n+1);
  }else{
   cameraControlRef.current?.(cmd);
  }
  setAnnouncement(CAMERA_LABELS[cmd]);
 }

 function openReplacementForBuilding(targetBuildingId:string,contextLabel?:string){
  const target=view.buildings.find(b=>b.id===targetBuildingId);
  if(!target)return;
  setSelected(target.id);
  const fitted=validStartingVolume(view,target);
  if(!fitted){
   setDraft(null);setDraftText(null);setScenario(null);setOriginal(false);
   let conflictId='';try{validateReplacement(view,{schema:1,baseline:view.id,removed:target.id,volume:initialVolume(target)});}catch(e){const text=e instanceof Error?e.message:String(e);conflictId=view.buildings.find(b=>text.includes(`source feature ${b.id}.`))?.id||'';}
   const nearest=nearestEditableBuilding(view,target);
   setConflict(conflictId);
   setBlockedRecovery({blockedId:target.id,conflictId,nearest:nearest?{buildingId:nearest.building.id,distance_m:nearest.distance_m}:null});
   announceStatus('No collision-free starting box fits this source feature because it overlaps adjacent recorded massing components. '+(conflictId?`Conflicting feature ${conflictId} is highlighted red. `:'')+'No invalid replacement has been applied. Use a recovery option below to switch to a verified editable site.',true);return;
  }
  const nextDraft=fitted;setConflict('');setBlockedRecovery(null);
  setDraft(nextDraft);
  setDraftText(plotToText(nextDraft));
  setScenario(null);
  setOriginal(false);
  announceStatus(`Started with a collision-free box (it may be smaller than the existing footprint). Editing a hypothetical box for building ${target.id}${contextLabel?` at ${contextLabel}`:''}. Adjust dimensions below, then select Apply replacement to 3D view.`);
  requestAnimationFrame(()=>{
   editorHeadingRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'});
   editorHeadingRef.current?.focus();
  });
 }

 function openEditableExample(){
  if(!demoEditableExample)return;
  if(demoEditableExample.proposal){
   selectProposal(demoEditableExample.proposal);
   openReplacementForBuilding(demoEditableExample.buildingId,demoEditableExample.label);
  }else{
   openReplacementForBuilding(demoEditableExample.buildingId);
  }
 }

 function begin(){
  if(!building)return;
  openReplacementForBuilding(building.id);
 }

 function testReplacementAtSite(p:Proposal3D){
  setSelectedProposal(p.number);
  openReplacementForBuilding(p.nearestBuildingId,p.label);
 }

 function updateDimension(key:DimKey,raw:string){
  if(!draft||!draftText)return;
  setDraftText({...draftText,[key]:raw});
  const num=Number(raw);
  if(raw.trim()!==''&&Number.isFinite(num)){
   setDraft({...draft,[key]:num});
  }
 }

 function apply(){
  if(!draftText||!building)return;
  const parsed:Plot={
   id:'replacement-volume',
   kind:'volume',
   x:Number(draftText.x),
   z:Number(draftText.z),
   width:Number(draftText.width),
   depth:Number(draftText.depth),
   height:Number(draftText.height),
   rotation:Number(draftText.rotation)
  };
  if(Object.values(draftText).some(v=>v.trim()==='')||![parsed.x,parsed.z,parsed.width,parsed.depth,parsed.height,parsed.rotation].every(Number.isFinite)){
   announceStatus('Please enter a valid number for all six building dimensions.',true);
   return;
  }
  if(parsed.width<2||parsed.width>150||parsed.depth<2||parsed.depth>150){
   announceStatus('Width and depth must each be between 2 and 150 metres.',true);
   return;
  }
  if(parsed.height<1||parsed.height>400){
   announceStatus('Height must be between 1 and 400 metres.',true);
   return;
  }
  if(parsed.rotation<0||parsed.rotation>=360){
   announceStatus('Rotation must be between 0 and 359 degrees.',true);
   return;
  }
  try{
   const next=validateReplacement(view,{schema:1,baseline:view.id,removed:building.id,volume:parsed});
   setDraft(next.volume);
   setDraftText(plotToText(next.volume));
   setScenario(next);
   setOriginal(false);setConflict('');
   announceStatus('Replacement applied to the 3D view. Footprint check passed against nearby 2025 buildings.');
  }catch(e){
   const text=e instanceof Error?e.message:String(e);setConflict(view.buildings.find(b=>text.includes(`source feature ${b.id}.`))?.id||'');announceStatus(text+(text.includes('intersects')?' The conflicting building is highlighted red. Reduce width/depth, adjust rotation, or use Fit a valid starting box.':''),true);
  }
 }

 function save(){
  if(!scenario)return;
  try{
   localStorage.setItem('aster-replacement-'+view.region,JSON.stringify(scenario));
   announceStatus('Replacement saved in this browser for this neighbourhood view.');
  }catch{
   announceStatus('Browser storage is unavailable here. Use Export comparison (JSON) instead.',true);
  }
 }

 function load(){
  try{
   const raw=localStorage.getItem('aster-replacement-'+view.region);
   if(!raw)throw Error('No saved replacement found for this neighbourhood view.');
   const next=validateReplacement(view,JSON.parse(raw));
   setScenario(next);
   setDraft(next.volume);
   setDraftText(plotToText(next.volume));
   setSelected(next.removed);
   setOriginal(false);
   announceStatus(`Restored your saved replacement for building ${next.removed}.`);
  }catch(e){
   announceStatus(e instanceof Error?e.message:String(e),true);
  }
 }

 function exportScenario(){
  if(!scenario)return;
  const payload={scenario,geometryEffects:effects,relatedProposal:activeProposal,unmodelled:['sunlight/shadow duration','wind','energy','traffic/demand','transit capacity','construction feasibility','cost','planning permission'],source:view.building_source,limitation:view.limitation};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  const a=document.createElement('a');
  a.href=url;
  a.download='aster-building-replacement.json';
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  announceStatus('Exported comparison file (aster-building-replacement.json).');
 }

 function restoreOriginal(){
  setScenario(null);
  setDraft(null);
  setDraftText(null);
  setOriginal(false);
  setConflict('');
  setBlockedRecovery(null);
  announceStatus('Original 2025 building restored in the 3D view.');
 }

 function back(){
  const nextHash=getBackHash();
  location.hash=nextHash;
 }

 const parsedDraftHeight=draftText&&draftText.height.trim()!==''&&Number.isFinite(Number(draftText.height))?Number(draftText.height):draft?.height??0;
 const activeProposalSourceHref=activeProposal?safeSource(activeProposal.sourceUrl):undefined;

 return (
  <div className="architecture">
   <a className="a-skip" href="#a-main-view" onClick={e=>{e.preventDefault();mainRef.current?.focus();}}>Skip to 3D view and controls</a>
   <header>
    <a className="a-brand" href={backHref} onClick={e=>{e.preventDefault();back();}}>ASTER <span>HOUSING &amp; TRANSIT</span></a>
    <strong>Toronto · 3D Building &amp; Proposal Explorer</strong>
    <button type="button" className="a-back-btn" onClick={back}>← Back to planning &amp; transit</button>
   </header>
   <div className="a-topbar">
    <div className="a-topbar-copy">
     <p className="a-eyebrow">TORONTO 2025 3D MASSING · HOUSING PIPELINE</p>
     <h1>Explore Toronto buildings &amp; proposals in 3D.</h1>
    </div>
    <div className="a-regions" role="group" aria-label="3D neighbourhood study area">
     <button type="button" aria-pressed={region==='downtown'} onClick={()=>changeRegion('downtown')}>Downtown · City Hall</button>
     <button type="button" aria-pressed={region==='midtown'} onClick={()=>changeRegion('midtown')}>Midtown · Yonge–Eglinton</button>
    </div>
   </div>
   <div className="a-workspace">
    <aside aria-label="Neighbourhood area, housing proposals, and recorded buildings">
     <p>Inspect real City housing proposals alongside recorded 2025 building footprints around City Hall or Yonge–Eglinton, then test what a replacement massing might look like.</p>
     <section className="a-guide" aria-labelledby="a-guide-heading">
      <h2 id="a-guide-heading">What you can do here</h2>
      <ol>
       <li>Pick <strong>City Hall</strong> or <strong>Yonge–Eglinton</strong> above.</li>
       <li>Select any <strong>red proposal pin</strong> or <strong>2025 building</strong> to check height and TTC service.</li>
       <li>Click <strong>Test 3D replacement at this site</strong> or compare transit on Page 1.</li>
      </ol>
     </section>
     <dl className="a-facts">
      <dt>Area shown</dt>
      <dd>600 × 600 m local neighbourhood</dd>
      <dt>Housing proposals in view</dt>
      <dd>{regionProposals.length} ({unbuiltCount} unbuilt · {builtCount} built)</dd>
      <dt>Recorded 2025 buildings</dt>
      <dd>{view.buildings.length}</dd>
     </dl>

     <section className="a-proposals-panel" aria-labelledby="a-proposals-heading">
      <h2 id="a-proposals-heading">Housing Proposals in this 600 m View</h2>
      <div className="a-proposals-controls">
       <label className="a-checkbox-label" htmlFor="a-show-proposals">
        <input
         id="a-show-proposals"
         type="checkbox"
         checked={showProposals}
         onChange={e=>{
          const checked=e.target.checked;
          setShowProposals(checked);
          setAnnouncement(checked?`Showing ${visibleProposals.length} proposal pins on the 3D model.`:'Hidden proposal pins on the 3D model.');
         }}
        />
        <span>Show proposal pins on 3D model</span>
       </label>
       <div className="a-proposal-filters" role="group" aria-label="Filter housing proposals by stage">
        <button type="button" aria-pressed={stageFilter==='all'} onClick={()=>setStageFilter('all')}>All ({regionProposals.length})</button>
        <button type="button" aria-pressed={stageFilter==='unbuilt'} onClick={()=>setStageFilter('unbuilt')}>Unbuilt ({unbuiltCount})</button>
        <button type="button" aria-pressed={stageFilter==='Built'} onClick={()=>setStageFilter('Built')}>Built ({builtCount})</button>
       </div>
       {cellFilter&&(
        <div className="a-cell-banner">
         <span>Linked area cell: <code>{cellFilter}</code></span>
         <button type="button" aria-pressed={onlyCellProposals} onClick={()=>setOnlyCellProposals(v=>!v)}>
          {onlyCellProposals?'Show all in 600 m view':'Only this cell'}
         </button>
        </div>
       )}
      </div>
      <p className="a-count">Showing {visibleProposals.length} of {regionProposals.length} pipeline proposals in {view.name}.</p>
      <ul className="a-proposal-list" aria-label="Housing proposals in this 600 m view">
       {visibleProposals.map(p=>{
        const inLinkedCell=cellFilter&&p.cellId===cellFilter;
        return (
         <li key={p.number}>
          <button
           type="button"
           aria-pressed={selectedProposal===p.number}
           aria-label={`${p.label}, ${p.units.toLocaleString()} units, ${p.stage}, application ${p.number}, nearest TTC stop ${p.nearestStop.name} at ${Math.round(p.nearestStop.distance_m)} metres`}
           onClick={()=>selectProposal(p)}
          >
           <span className="a-proposal-row-title">{p.label} · {p.units.toLocaleString()} units · {p.stage}</span>
           <span className="a-proposal-row-meta">
            App {p.number} · {p.nearestStop.name} ({Math.round(p.nearestStop.distance_m)} m){inLinkedCell?' · Linked cell':''}
           </span>
          </button>
         </li>
        );
       })}
      </ul>
      {visibleProposals.length===0&&(
       <p className="a-hint">No proposals match the current filter. Choose &ldquo;All&rdquo; above to see every proposal in this 600 m view.</p>
      )}
     </section>

     <section className="a-buildings-panel" aria-labelledby="a-buildings-heading">
      <h2 id="a-buildings-heading">Recorded 2025 buildings</h2>
      <div className="a-search-group">
       <label htmlFor="a-building-search">Find a building record</label>
       <input id="a-building-search" type="search" value={search} onChange={e=>{setSearch(e.target.value);setLimit(30);}} placeholder="Record ID or method (e.g. Lidar)"/>
       <p className="a-count">Showing {Math.min(limit,filtered.length)} of {filtered.length} recorded buildings{search?` matching "${search}"`:''}.</p>
      </div>
      <ul className="a-list" aria-label="Recorded 2025 buildings">
       {filtered.slice(0,limit).map(b=>{
        const storeys=approxStoreys(b.height);
        return (
         <li key={b.id}>
          <button
           type="button"
           aria-pressed={selected===b.id}
           aria-label={`Building record ${b.id}, ${b.height.toFixed(1)} metres, roughly ${storeys} storeys estimated, ${b.height_source}`}
           onClick={()=>selectBuilding(b.id)}
          >
           {b.id}
           <span>{b.height.toFixed(1)} m (~{storeys} storeys est.) · {b.height_source}</span>
          </button>
         </li>
        );
       })}
      </ul>
      {filtered.length===0&&<p className="a-hint">No building records match &ldquo;{search}&rdquo;. Clear the search box to see all {view.buildings.length} buildings.</p>}
      {filtered.length>limit&&<button type="button" className="a-more-btn" onClick={()=>setLimit(n=>n+30)}>Show more buildings ({filtered.length-limit} remaining)</button>}
     </section>
    </aside>

    <main id="a-main-view" tabIndex={-1} ref={mainRef}>
     <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
     <section className="a-world" aria-labelledby="a-view-heading">
      <div className="a-world-heading">
       <div>
        <h2 id="a-view-heading">{view.name}</h2>
        <p className="a-world-sub">600 × 600 m local neighbourhood · {view.buildings.length} recorded 2025 buildings · {regionProposals.length} housing proposals</p>
       </div>
       <div className="a-world-actions">
        <div className="a-view-modes" role="group" aria-label="3D basemap and rendering mode">
         <button
          type="button"
          className="a-mode-btn"
          aria-pressed={viewMode==='map-vector'}
          onClick={()=>{setViewMode('map-vector');setAnnouncement('Switched to interactive 3D Toronto Street Map.');}}
         >
          3D Street Map
         </button>
         <button
          type="button"
          className="a-mode-btn"
          aria-pressed={viewMode==='map-osm'}
          onClick={()=>{setViewMode('map-osm');setAnnouncement('Switched to OpenStreetMap 3D tiles overlay.');}}
         >
          OSM Tiles
         </button>
         <button
          type="button"
          className="a-mode-btn"
          aria-pressed={viewMode==='map-satellite'}
          onClick={()=>{setViewMode('map-satellite');setAnnouncement('Switched to aerial satellite 3D overlay.');}}
         >
          Satellite
         </button>
         <button
          type="button"
          className="a-mode-btn"
          aria-pressed={viewMode==='cad'}
          onClick={()=>{setViewMode('cad');setAnnouncement('Switched to offline 3D Massing Studio.');}}
         >
          3D Massing Studio
         </button>
        </div>
        <button type="button" className="a-mode-btn" onClick={()=>runCamera('reset')}>Reset camera</button>
       </div>
      </div>
      {outsideCells.length>0&&<div className="a-coverage-notice" role="note"><strong>Selected analysis area outside available 3D coverage</strong><p>{outsideCells.join(', ')} cannot be displayed in this 3D model. You are viewing {view.name}, a separate 600 × 600 m example. Your original area selection is preserved.</p><button type="button" onClick={back}>Return to selected areas</button><p>Available example views: <button type="button" onClick={()=>changeRegion('downtown')}>City Hall example</button> <button type="button" onClick={()=>changeRegion('midtown')}>Yonge–Eglinton example</button></p></div>}{viewMode==='cad'?(
       <Scene
        key={view.id}
        reference={view}
        viewerOnly
        highlight={selected}
        conflict={conflict}
        plots={scenario&&!original?[scenario.volume]:[]}
        selected={scenario&&!original?scenario.volume.id:null}
        hiddenSourceIds={scenario&&!original?[scenario.removed]:[]}
        proposals={visibleProposals}
        selectedProposal={selectedProposal||null}
        showProposals={showProposals}
        onSelectProposal={selectProposalByNumber}
        onCell={()=>{}}
        onBaseline={text=>selectBuilding(text.split(':')[0].replace('Recorded massing ',''))}
        cameraControl={cameraControlRef}
        onCameraAction={cmd=>setAnnouncement(CAMERA_LABELS[cmd])}
        running={false}
        night={false}
        reset={reset}
       />
      ):(
       <Map3DScene
        key={view.id}
        region={region as View3dRegion}
        view={view}
        basemapMode={(viewMode==='map-osm'?'osm':viewMode==='map-satellite'?'satellite':'vector') as Basemap3DMode}
        highlight={selected}
        conflict={conflict}
        plots={scenario&&!original?[scenario.volume]:[]}
        hiddenSourceIds={scenario&&!original?[scenario.removed]:[]}
        proposals={visibleProposals}
        selectedProposal={selectedProposal||null}
        showProposals={showProposals}
        onSelectBuilding={selectBuilding}
        onSelectProposal={selectProposalByNumber}
        cameraControl={cameraControlRef}
        onCameraAction={cmd=>setAnnouncement(CAMERA_LABELS[cmd])}
        reset={reset}
       />
      )}
      <div className="a-camera-bar" role="toolbar" aria-label="Keyboard-accessible 3D camera controls">
       <button type="button" onClick={()=>runCamera('orbit-left')} aria-label="Rotate 3D view left">⟲ Rotate left</button>
       <button type="button" onClick={()=>runCamera('orbit-right')} aria-label="Rotate 3D view right">⟳ Rotate right</button>
       <button type="button" onClick={()=>runCamera('tilt-up')} aria-label="Raise camera angle">↑ Higher angle</button>
       <button type="button" onClick={()=>runCamera('tilt-down')} aria-label="Lower camera angle">↓ Lower angle</button>
       <button type="button" onClick={()=>runCamera('zoom-in')} aria-label="Zoom in on 3D view">+ Zoom in</button>
       <button type="button" onClick={()=>runCamera('zoom-out')} aria-label="Zoom out on 3D view">− Zoom out</button>
      </div>
      <p className="a-navigation"><strong>Controls:</strong> {viewMode==='cad'?'Drag to rotate · Right-drag to pan':'Drag to pan · Right-drag to rotate and tilt'} · Scroll to zoom · Click a red pin or building to inspect. <strong>Keyboard:</strong> use the camera buttons above, or focus the 3D view and press Arrow keys, + / −, and 0 to reset. North is toward the back at reset.</p>
      <ul className="a-legend" aria-label="3D view colour key">
       <li><span className="a-swatch a-swatch-baseline" aria-hidden="true"/>Recorded 2025 building</li>
       <li><span className="a-swatch a-swatch-selected" aria-hidden="true"/>Selected building footprint</li>
       <li><span className="a-swatch a-swatch-proposal" aria-hidden="true"/>Housing proposal pin</li>
       <li><span className="a-swatch a-swatch-proposal-selected" aria-hidden="true"/>Selected proposal pin</li>
       <li><span className="a-swatch a-swatch-replacement" aria-hidden="true"/>Your hypothetical box</li>
       <li><span className="a-swatch a-swatch-road" aria-hidden="true"/>Street centrelines</li>
      </ul>
     </section>

     <section className="a-inspection" aria-labelledby="a-inspect-heading">
      {activeProposal?(
       <>
        <div className="a-inspect-header">
         <div>
          <p className="a-eyebrow">DEVELOPMENT PIPELINE PROPOSAL</p>
          <h2 id="a-inspect-heading">{activeProposal.label}</h2>
         </div>
         <span className={stageBadgeClass(activeProposal.stage)}>{activeProposal.stage}</span>
        </div>
        <p className="a-metric-lead">
         <strong>{activeProposal.units.toLocaleString()} proposed residential units</strong> · Application <code>{activeProposal.number}</code> · Screening cell <code>{activeProposal.cellId}</code>
        </p>
        <dl className="a-proposal-facts">
         <div>
          <dt>Nearest TTC stop</dt>
          <dd>{activeProposal.nearestStop.name} ({Math.round(activeProposal.nearestStop.distance_m)} m straight-line)</dd>
         </div>
         <div>
          <dt>Closest 2025 building footprint</dt>
          <dd>
           <code>{activeProposal.nearestBuildingId}</code>
           {building?` · ${building.height.toFixed(1)} m (~${approxStoreys(building.height)} storeys est.) · ${explainHeightSource(building.height_source)}`:''}
           {' · '}
           {activeProposal.nearestBuildingDistM===0?'proposal pin sits inside footprint':`${activeProposal.nearestBuildingDistM.toFixed(1)} m away`}
          </dd>
         </div>
         <div>
          <dt>Weekday morning (07–09)</dt>
          <dd>{activeProposal.serviceSummary.morning?.status??'No frequent TTC stop recorded within screening range'}</dd>
         </div>
         <div>
          <dt>Weekday evening (16–18)</dt>
          <dd>{activeProposal.serviceSummary.evening?.status??'No frequent TTC stop recorded within screening range'}</dd>
         </div>
         <div>
          <dt>Saturday midday (12–14)</dt>
          <dd>{activeProposal.serviceSummary.saturday?.status??'No frequent TTC stop recorded within screening range'}</dd>
         </div>
        </dl>
        <div className="a-proposal-actions">
         <button type="button" className="a-primary-btn" onClick={()=>testReplacementAtSite(activeProposal)}>Test 3D replacement at this site</button>
         <a className="a-link-btn" href={`#region=${activeProposal.region}&areas=${activeProposal.cellId}`}>Compare transit for this area on Page 1</a>
         {activeProposalSourceHref&&(
          <a className="a-link-btn" href={activeProposalSourceHref} target="_blank" rel="noreferrer">View City application record ↗</a>
         )}
        </div>
       </>
      ):building?(
       <>
        <h2 id="a-inspect-heading">Selected building: {building.id}</h2>
        <p className="a-metric-lead"><strong>Recorded height: {building.height.toFixed(2)} m</strong> (~{approxStoreys(building.height)} storeys est.)</p>
        <p>Measurement source: <strong>{building.height_source}</strong> ({explainHeightSource(building.height_source)}) · 2025 City massing snapshot.</p>
        <p><strong>Energy evidence unavailable for this footprint.</strong> Municipal facility records and Toronto-wide reporting-property comparisons do not establish this building’s use or predict a replacement’s performance.</p>
        <button type="button" className="a-primary-btn" onClick={begin}>What if this building were taller or wider?</button>
       </>
      ):(
       <>
        <h2 id="a-inspect-heading">Select a proposal or building to inspect</h2>
        <p>Click any red proposal pin or 2025 building in the 3D view above, or pick one from the sidebar lists to inspect nearby TTC service and test a replacement box.</p>
       </>
      )}
     </section>

     <section className="a-replacement" aria-labelledby="a-replace-heading">
      <h2 id="a-replace-heading">Test a &ldquo;what-if&rdquo; building replacement</h2>
      <p>Replace the selected 2025 building with a simple rectangular box to compare height, footprint area, and 3D volume while nearby 2025 buildings remain as recorded.</p>
      {!draft&&demoEditableExample&&(
       <div className="a-demo-row">
        <button type="button" className="a-primary-btn" onClick={openEditableExample}>
         Try editable example: {demoEditableExample.label}
        </button>
        <span className="a-demo-hint">Starts with a verified collision-free footprint in {view.name}.</span>
       </div>
      )}
      {draft&&draftText&&(
       <div className="a-editor">
        <h3 ref={editorHeadingRef} tabIndex={-1}>Adjust your hypothetical building box{building?` (replacing ${building.id})`:''}</h3>
        <div className="a-dimensions">
         {DIMENSION_FIELDS.map(f=>(
          <div className="a-field" key={f.key}>
           <label htmlFor={`a-dim-${f.key}`}>{f.label}</label>
           <input
            id={`a-dim-${f.key}`}
            type="number"
            min={f.min}
            max={f.max}
            step={f.step}
            value={draftText[f.key]}
            aria-describedby={`a-dim-hint-${f.key}`}
            onChange={e=>updateDimension(f.key,e.target.value)}
           />
           <small id={`a-dim-hint-${f.key}`}>
            {f.key==='height'?`${f.hint} (~${approxStoreys(Math.max(1,parsedDraftHeight))} storeys est.)`:f.hint}
           </small>
          </div>
         ))}
        </div>
        <button type="button" className="a-primary-btn" onClick={apply}>Apply replacement to 3D view</button>
       </div>
      )}
      {draft&&<button type="button" onClick={()=>{if(!building)return;const fitted=validStartingVolume(view,building);if(fitted){setDraft(fitted);setDraftText(plotToText(fitted));setConflict('');announceStatus('A collision-free starting box is ready. Review dimensions, then apply.');}else announceStatus('No collision-free starting box found in this footprint. Select another source feature or adjust manually.',true);}}>Fit a valid starting box</button>}<div className="a-scenario-actions">
       <button type="button" disabled={!scenario} aria-pressed={original} onClick={()=>{const next=!original;setOriginal(next);setAnnouncement(next?'Showing original 2025 building for comparison.':'Showing your hypothetical replacement box.');}}>
        {original?'Show my replacement':'Compare with original 2025 building'}
       </button>
       <button type="button" disabled={!scenario} onClick={save}>Save in browser</button>
       <button type="button" onClick={load}>Load saved</button>
       <button type="button" disabled={!scenario} onClick={exportScenario}>Export comparison (JSON)</button>
       <button type="button" disabled={!draft&&!scenario} onClick={restoreOriginal}>Reset to original</button>
      </div>
      {message&&<p className={`a-message${isError?' is-error':''}`}>{message}</p>}
      {blockedRecovery&&(
       <div className="a-recovery-box" role="region" aria-label="Replacement recovery options">
        <p>
         <strong>Why replacement could not start for {blockedRecovery.blockedId}:</strong> City 3D massing records
         complex podium/tower buildings as overlapping parts, so removing one component leaves overlapping geometry
         {blockedRecovery.conflictId?` (${blockedRecovery.conflictId} highlighted red)`:''}. Collision checks stay active—choose a verified editable site to continue:
        </p>
        <div className="a-recovery-actions">
         {blockedRecovery.nearest&&(
          <button
           type="button"
           className="a-primary-btn"
           onClick={()=>{
            setSelectedProposal('');
            updateHashParams({proposal:null});
            openReplacementForBuilding(blockedRecovery.nearest!.buildingId);
           }}
          >
           Switch to nearest editable building ({blockedRecovery.nearest.buildingId}, ~{blockedRecovery.nearest.distance_m} m away)
          </button>
         )}
         {demoEditableExample&&demoEditableExample.buildingId!==blockedRecovery.nearest?.buildingId&&(
          <button type="button" onClick={openEditableExample}>
           Open editable example ({demoEditableExample.label})
          </button>
         )}
         <button type="button" onClick={()=>{setBlockedRecovery(null);setConflict('');setMessage('');setIsError(false);}}>
          Dismiss
         </button>
        </div>
       </div>
      )}
      {effects&&(
       <>
        <div className="a-table-wrap">
         <table>
          <caption>Comparison: recorded 2025 building vs. your hypothetical box</caption>
          <thead>
           <tr>
            <th scope="col">Measure</th>
            <th scope="col">Recorded 2025</th>
            <th scope="col">Your box</th>
            <th scope="col">Difference</th>
           </tr>
          </thead>
          <tbody>
           {([
            ['Height (m)',effects.oldHeight,effects.newHeight],
            ['Ground footprint (m²)',effects.oldArea,effects.newArea],
            ['3D box volume (m³)',effects.oldVolume,effects.newVolume]
           ] as const).map(([label,a,b])=>{
            const diff=b-a;
            return (
             <tr key={label}>
              <th scope="row">{label}</th>
              <td>{a.toFixed(1)}</td>
              <td>{b.toFixed(1)}</td>
              <td>{diff>0?'+':''}{diff.toFixed(1)}</td>
             </tr>
            );
           })}
          </tbody>
         </table>
        </div>
        <p className="a-conflict-ok"><strong>Overlap check passed:</strong> your box fits inside the 600 × 600 m area without intersecting nearby 2025 building footprints (zoning, streets, and approvals are not assessed).</p>
       </>
      )}
     </section>

     <details className="a-sources">
      <summary>Coverage, data sources, and model scope</summary>
      <h3>What this 3D model measures and what it omits</h3>
      <ul>
       <li><strong>2025 building massing only:</strong> Recorded buildings come from outer footprints and average heights (<code>AVG_HEIGHT</code>); roof shapes, façades, ground slope, and internal wings are not modelled. Snapshot IDs may represent one wing of a larger complex.</li>
       <li><strong>Illustrative storey estimates:</strong> Storey figures use a rough ~3 m/storey rule of thumb and are not actual floor counts. Hypothetical box volume is not usable floor area or housing yield.</li>
       <li><strong>Proposal pipeline data:</strong> Development Pipeline entries reflect City-reported residential unit counts at the screening snapshot date; proposals are not completed homes and may change or never be built.</li>
       <li><strong>Transit proximity:</strong> Stop distances are straight-line metres to TTC stops; frequent service flags stops with at least 4 scheduled departures per hour in the screening window, without modelling walking routes, crowding, or reliability.</li>
       <li><strong>Unmodelled factors:</strong> Sunlight/shadow duration, wind and pedestrian comfort, energy/emissions, traffic and transit demand, construction cost, property lines, zoning, and planning permission are not calculated. The shaded 3D view uses illustrative lighting, not a solar study.</li>
       <li><strong>Reported energy evidence:</strong> No qualified energy-to-building relationship is established for these source footprints. The housing explorer offers separate Toronto-wide reporting-property comparisons and municipal facility records; neither predicts energy use for a replacement building.</li>
      </ul>
      <h3>Sources and coordinates</h3>
      <p>{view.limitation}</p>
      <p>Study centre: {view.centre.join(', ')} · Metric coordinates: EPSG:26917 · Features crossing the 600 × 600 m study edge are clipped.</p>
      <p><a href={view.building_source.page} target="_blank" rel="noreferrer">City of Toronto 3D massing</a> · Retrieved {view.building_source.retrieved_at} · source SHA256 <code>{view.building_source.sha256}</code></p>
      <p><a href={view.street_source.page} target="_blank" rel="noreferrer">Toronto Centreline</a> · Retrieved {view.street_source.retrieved_at}</p>
      <p>Housing proposals &amp; transit schedule linkage derived from City of Toronto Development Applications / One Address Repository and TTC GTFS Schedule (Open Government Licence – Toronto). Informational and illustrative use only; verify for legal or official use. The City of Toronto does not endorse ASTER.</p>
     </details>
    </main>
   </div>
  </div>
 );
}
