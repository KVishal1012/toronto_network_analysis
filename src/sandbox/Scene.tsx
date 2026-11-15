import {useEffect,useRef,useState,type MutableRefObject} from 'react';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import downtown from './downtown.json';
import {SIZE,type Plot} from './model';
import type {Proposal3D} from './proposals-3d';
import type {StudyRegion} from '../planning/toronto-context';
import {localNamedRoads} from '../planning/toronto-map-data';

const CELL=20;
export type CameraCommand='orbit-left'|'orbit-right'|'tilt-up'|'tilt-down'|'zoom-in'|'zoom-out'|'reset';

function createGroundMapTexture(
  extentM:number,
  roads:typeof downtown.roads,
  refId:string,
  refName:string,
  maxAnisotropy:number
):T.CanvasTexture|null{
  if(typeof document==='undefined')return null;
  const SIZE_PX=2048;
  const canvas=document.createElement('canvas');
  canvas.width=SIZE_PX;
  canvas.height=SIZE_PX;
  const ctx=canvas.getContext('2d');
  if(!ctx)return null;

  const toPx=(x:number)=>(x+extentM/2)/extentM*SIZE_PX;
  const toPy=(z:number)=>(z+extentM/2)/extentM*SIZE_PX;

  // Base warm urban block tone
  ctx.fillStyle='#ebe7de';
  ctx.fillRect(0,0,SIZE_PX,SIZE_PX);

  // Subtle 50 m metric ground grid
  ctx.strokeStyle='#ded9cc';
  ctx.lineWidth=1.5;
  for(let m=-extentM/2;m<=extentM/2;m+=50){
    const p=toPx(m);
    ctx.beginPath();
    ctx.moveTo(p,0);
    ctx.lineTo(p,SIZE_PX);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,p);
    ctx.lineTo(SIZE_PX,p);
    ctx.stroke();
  }

  // Draw road casings then inner road beds from local reference geometry
  const drawRoadPass=(stroke:string,width:number)=>{
    ctx.strokeStyle=stroke;
    ctx.lineWidth=width;
    ctx.lineCap='round';
    ctx.lineJoin='round';
    for(const road of roads){
      const lines=road.type==='LineString'?[road.coordinates]:road.coordinates;
      for(const line of lines as number[][][]){
        if(line.length<2)continue;
        ctx.beginPath();
        ctx.moveTo(toPx(line[0][0]),toPy(line[0][1]));
        for(let i=1;i<line.length;i++)ctx.lineTo(toPx(line[i][0]),toPy(line[i][1]));
        ctx.stroke();
      }
    }
  };
  drawRoadPass('#c2beb1',24);
  drawRoadPass('#ffffff',18);

  // Dashed centerlines
  ctx.save();
  ctx.setLineDash([14,14]);
  drawRoadPass('#d9d4c7',2);
  ctx.restore();

  // Named Toronto street labels along localNamedRoads
  const inferredRegion:StudyRegion=
    refId.toLowerCase().includes('midtown')||refName.toLowerCase().includes('midtown')||refName.toLowerCase().includes('eglinton')
      ?'midtown'
      :'downtown';
  const namedSegments=localNamedRoads[inferredRegion]||[];
  const placed:Array<{x:number;y:number}>=[];
  ctx.font='700 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign='center';
  ctx.textBaseline='middle';

  for(const seg of namedSegments){
    if(seg.points.length<2)continue;
    let bestLen=0;
    let bestA=seg.points[0];
    let bestB=seg.points[1];
    for(let i=0;i<seg.points.length-1;i++){
      const [ax,az]=seg.points[i];
      const [bx,bz]=seg.points[i+1];
      const len=Math.hypot(bx-ax,bz-az);
      if(len>bestLen){
        bestLen=len;
        bestA=seg.points[i];
        bestB=seg.points[i+1];
      }
    }
    if(bestLen<45)continue;
    const mx=toPx((bestA[0]+bestB[0])/2);
    const my=toPy((bestA[1]+bestB[1])/2);
    if(mx<70||mx>SIZE_PX-70||my<70||my>SIZE_PX-70)continue;
    if(placed.some(p=>Math.hypot(p.x-mx,p.y-my)<130))continue;
    placed.push({x:mx,y:my});

    let ang=Math.atan2(toPy(bestB[1])-toPy(bestA[1]),toPx(bestB[0])-toPx(bestA[0]));
    if(ang>Math.PI/2)ang-=Math.PI;
    if(ang<-Math.PI/2)ang+=Math.PI;

    ctx.save();
    ctx.translate(mx,my);
    ctx.rotate(ang);
    ctx.lineWidth=6;
    ctx.strokeStyle='rgba(255,255,255,0.95)';
    ctx.strokeText(seg.name,0,0);
    ctx.fillStyle='#243b37';
    ctx.fillText(seg.name,0,0);
    ctx.restore();
  }

  // Crisp edge trim so slab borders never smear
  ctx.strokeStyle='#c9c4b6';
  ctx.lineWidth=4;
  ctx.strokeRect(0,0,SIZE_PX,SIZE_PX);

  const tex=new T.CanvasTexture(canvas);
  tex.colorSpace=T.SRGBColorSpace;
  tex.anisotropy=Math.min(8,Math.max(1,maxAnisotropy));
  return tex;
}
export default function Scene({plots,selected,onCell,onBaseline,onSelectVolume,running,night,reset,capture,cameraControl,onCameraAction,reference=downtown,viewerOnly=false,highlight='',conflict='',hiddenSourceIds=[],proposals=[],selectedProposal=null,showProposals=true,onSelectProposal}:{plots:Plot[];selected:string|null;onCell:(x:number,z:number)=>void;onBaseline:(text:string)=>void;onSelectVolume?:(id:string)=>void;running:boolean;night:boolean;reset:number;capture?:MutableRefObject<(()=>string)|null>;cameraControl?:MutableRefObject<((cmd:CameraCommand)=>void)|null>;onCameraAction?:(cmd:CameraCommand)=>void;reference?:typeof downtown;viewerOnly?:boolean;highlight?:string;conflict?:string;hiddenSourceIds?:string[];proposals?:Proposal3D[];selectedProposal?:string|null;showProposals?:boolean;onSelectProposal?:(proposalNumber:string)=>void}){
 const host=useRef<HTMLDivElement>(null),live=useRef({onCell,onBaseline,onSelectVolume,onSelectProposal,running,onCameraAction}),objects=useRef<T.Group|null>(null),proposalGroupRef=useRef<T.Group|null>(null),sceneRef=useRef<T.Scene|null>(null),cameraRef=useRef<T.PerspectiveCamera|null>(null),controlsRef=useRef<OrbitControls|null>(null),sunRef=useRef<T.DirectionalLight|null>(null),[error,setError]=useState(''),[ready,setReady]=useState(false);
 live.current={onCell,onBaseline,onSelectVolume,onSelectProposal,running,onCameraAction};
 useEffect(()=>{
  const el=host.current!;let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});}catch{setError('3D graphics are unavailable in this browser. You can still inspect and compare all buildings using the recorded building list.');return;}
  const scale=reference.extent_m/320;const scene=new T.Scene();sceneRef.current=scene;scene.background=new T.Color('#edf0ee');scene.fog=new T.Fog('#edf0ee',420*scale,1200*scale);
  const camera=new T.PerspectiveCamera(40,1,.1,1800);camera.position.set(280*scale,290*scale,340*scale);cameraRef.current=camera;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;el.appendChild(renderer.domElement);if(capture)capture.current=()=>{renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');};
  renderer.domElement.tabIndex=0;
  renderer.domElement.setAttribute('role','application');
  renderer.domElement.setAttribute('aria-label','3D neighbourhood model. Mouse: drag to rotate, right-drag to pan, scroll to zoom, click a building to inspect. Keyboard: arrow keys to rotate and tilt, plus and minus to zoom, 0 to reset view.');
  const controls=new OrbitControls(camera,renderer.domElement);controlsRef.current=controls;controls.enableDamping=true;controls.maxPolarAngle=Math.PI/2.15;controls.minDistance=25;controls.maxDistance=750*scale;controls.target.set(0,0,0);
  const adjustCamera=(cmd:CameraCommand)=>{
   if(cmd==='reset'){camera.position.set(280*scale,290*scale,340*scale);controls.target.set(0,0,0);controls.update();return;}
   const offset=camera.position.clone().sub(controls.target);
   const spherical=new T.Spherical().setFromVector3(offset);
   const orbitStep=Math.PI/12,tiltStep=Math.PI/18;
   if(cmd==='orbit-left')spherical.theta+=orbitStep;
   else if(cmd==='orbit-right')spherical.theta-=orbitStep;
   else if(cmd==='tilt-up')spherical.phi=Math.max(.15,spherical.phi-tiltStep);
   else if(cmd==='tilt-down')spherical.phi=Math.min(Math.PI/2.15,spherical.phi+tiltStep);
   else if(cmd==='zoom-in')spherical.radius=Math.max(controls.minDistance,spherical.radius*.8);
   else if(cmd==='zoom-out')spherical.radius=Math.min(controls.maxDistance,spherical.radius*1.25);
   offset.setFromSpherical(spherical);
   camera.position.copy(controls.target).add(offset);
   controls.update();
  };
  if(cameraControl)cameraControl.current=adjustCamera;
  const onKey=(e:KeyboardEvent)=>{
   let cmd:CameraCommand|null=null;
   if(e.key==='ArrowLeft')cmd='orbit-left';
   else if(e.key==='ArrowRight')cmd='orbit-right';
   else if(e.key==='ArrowUp')cmd='tilt-up';
   else if(e.key==='ArrowDown')cmd='tilt-down';
   else if(e.key==='+'||e.key==='=')cmd='zoom-in';
   else if(e.key==='-'||e.key==='_')cmd='zoom-out';
   else if(e.key==='0'||e.key==='Home'||e.key==='r'||e.key==='R')cmd='reset';
   if(cmd){e.preventDefault();adjustCamera(cmd);live.current.onCameraAction?.(cmd);}
  };
  renderer.domElement.addEventListener('keydown',onKey);
  scene.add(new T.HemisphereLight(0xffffff,0x547651,2));const sun=new T.DirectionalLight(0xffeac6,3);sun.position.set(-140,260,140);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-220,right:220,top:220,bottom:-220,near:1,far:750});scene.add(sun);sunRef.current=sun;
  const groundTex=viewerOnly?createGroundMapTexture(reference.extent_m,reference.roads,reference.id,reference.name,renderer.capabilities.getMaxAnisotropy()):null;
  const ground=new T.Mesh(new T.BoxGeometry(reference.extent_m,2,reference.extent_m),new T.MeshStandardMaterial(groundTex?{map:groundTex,roughness:.92}:{color:viewerOnly?0xe4e7e2:0xb8c4b6,roughness:.95}));ground.position.y=-1;ground.receiveShadow=true;scene.add(ground);
  const grid=new T.GridHelper(320,SIZE,0x71966b,0x82a77b);grid.position.y=.03;if(!viewerOnly)scene.add(grid);
  const referenceGroup=new T.Group();scene.add(referenceGroup);
  for(const b of reference.buildings){const polys=b.geometry.type==='Polygon'?[b.geometry.coordinates]:b.geometry.coordinates;
   for(const rings of polys as number[][][][]){const outer=rings[0];if(!outer)continue;const shape=new T.Shape(outer.map(([x,z])=>new T.Vector2(x,-z)));for(const ring of rings.slice(1))shape.holes.push(new T.Path(ring.map(([x,z])=>new T.Vector2(x,-z))));const mesh=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:b.height,bevelEnabled:false}),new T.MeshStandardMaterial({color:viewerOnly?0xc6cdd0:0x9aaeb1,roughness:.8}));mesh.userData.sourceId=b.id;mesh.rotation.x=-Math.PI/2;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.baseline=`Recorded massing ${b.id}: ${b.height.toFixed(1)} m; height source ${b.height_source}. 2025 context, not verified current conditions.`;referenceGroup.add(mesh);}}
  for(const road of reference.roads){const lines=road.type==='LineString'?[road.coordinates]:road.coordinates;for(const line of lines as number[][][]){const geometry=new T.BufferGeometry().setFromPoints(line.map(([x,z])=>new T.Vector3(x,.2,z)));referenceGroup.add(new T.Line(geometry,new T.LineBasicMaterial({color:0xffffff})));}}
  const group=new T.Group();objects.current=group;scene.add(group);
  const proposalGroup=new T.Group();proposalGroupRef.current=proposalGroup;scene.add(proposalGroup);
  const ray=new T.Raycaster(),mouse=new T.Vector2();let down=[0,0];
  const isObjectVisible=(obj:T.Object3D|null)=>{for(let cur=obj;cur;cur=cur.parent)if(!cur.visible)return false;return true;};
  const start=(e:PointerEvent)=>{down=[e.clientX,e.clientY];};
  const end=(e:PointerEvent)=>{if(e.button!==0||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const b=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);ray.setFromCamera(mouse,camera);const hits=ray.intersectObjects([...proposalGroup.children,...group.children,...referenceGroup.children],true);const visibleHits=hits.filter(h=>isObjectVisible(h.object));if(visibleHits.length){hits.splice(0,hits.length,...visibleHits);let po:T.Object3D|null=hits[0].object;while(po&&!po.userData.proposalNumber)po=po.parent;if(po?.userData.proposalNumber){live.current.onSelectProposal?.(po.userData.proposalNumber as string);return;}if(hits[0].object.userData.baseline){live.current.onBaseline(hits[0].object.userData.baseline);return;}let o:T.Object3D|null=hits[0].object;while(o&&!o.userData.plot)o=o.parent;if(o?.userData.plot){const p=o.userData.plot as Plot;if(live.current.onSelectVolume)live.current.onSelectVolume(p.id);else live.current.onCell((p.x+150)/20,(p.z+150)/20);return;}}
   const hit=ray.intersectObject(ground)[0];if(hit){const x=Math.floor((hit.point.x+160)/CELL),z=Math.floor((hit.point.z+160)/CELL);if(x>=0&&x<SIZE&&z>=0&&z<SIZE)live.current.onCell(x,z);}};
  renderer.domElement.addEventListener('pointerdown',start);renderer.domElement.addEventListener('pointerup',end);
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(el);
  let frame=0;const animate=()=>{frame=requestAnimationFrame(animate);
   controls.update();renderer.render(scene,camera);
  };frame=requestAnimationFrame(animate);setReady(true);
  return()=>{cancelAnimationFrame(frame);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',start);renderer.domElement.removeEventListener('pointerup',end);renderer.domElement.removeEventListener('keydown',onKey);scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});groundTex?.dispose();grid.geometry.dispose();(grid.material as T.Material).dispose();renderer.dispose();el.removeChild(renderer.domElement);objects.current=null;proposalGroupRef.current=null;sceneRef.current=null;setReady(false);if(capture)capture.current=null;if(cameraControl)cameraControl.current=null;};
 },[reference.id]);
 useEffect(()=>{const group=objects.current;if(!group)return;
  for(const old of [...group.children]){old.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});group.remove(old);}
  const box=(g:T.Group,w:number,h:number,d:number,color:number,x=0,y=0,z=0)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshStandardMaterial({color,roughness:.75}));m.position.set(x,y+h/2,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;};
  for(const p of plots){const g=new T.Group();g.position.set(p.x,0,p.z);g.rotation.y=p.rotation*Math.PI/180;g.userData.plot=p;
   box(g,p.width,p.height,p.depth,0xd69a3b);
   if(p.id===selected){const ring=new T.Mesh(new T.BoxGeometry(p.width+.2,.12,p.depth+.2),new T.MeshBasicMaterial({color:0xffce64,wireframe:true}));ring.position.y=.4;g.add(ring);}group.add(g);
  }
 },[plots,selected,ready]);
 useEffect(()=>{const group=proposalGroupRef.current;if(!group)return;
  for(const old of [...group.children]){old.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});group.remove(old);}
  group.visible=showProposals;
  if(!showProposals||!proposals.length)return;
  const buildingHeights=new Map(reference.buildings.map(b=>[b.id,b.height]));
  for(const p of proposals){
   const isSelected=p.number===selectedProposal;
   const isBuilt=p.stage==='Built';
   const recordedH=buildingHeights.get(p.nearestBuildingId)??0;
   const isReplaced=hiddenSourceIds.includes(p.nearestBuildingId);
   const baseH=isReplaced&&plots.length?Math.max(plots[0].height,recordedH):recordedH;
   const headY=Math.max(baseH+34,isSelected?108:92);
   const stemH=Math.max(8,headY-baseH);
   const color=isSelected?0xe6196b:isBuilt?0x9b4d74:0xd6336c;
   const emissive=isSelected?0x6e002d:0x36081a;
   const pin=new T.Group();
   pin.position.set(p.x,0,p.z);
   pin.userData.proposalNumber=p.number;
   const collar=new T.Mesh(new T.CylinderGeometry(isSelected?7.5:5.2,isSelected?7.5:5.2,1.2,24),new T.MeshStandardMaterial({color,emissive,roughness:.55}));
   collar.position.y=baseH+0.6;
   pin.add(collar);
   const stem=new T.Mesh(new T.CylinderGeometry(isSelected?1.5:0.9,isSelected?1.5:0.9,stemH,12),new T.MeshStandardMaterial({color,emissive,roughness:.5}));
   stem.position.y=baseH+stemH/2;
   stem.castShadow=true;
   pin.add(stem);
   const head=new T.Mesh(new T.OctahedronGeometry(isSelected?9:6.2,0),new T.MeshStandardMaterial({color,emissive,roughness:.35}));
   head.position.y=headY;
   head.castShadow=true;
   pin.add(head);
   if(isSelected){
    const halo=new T.Mesh(new T.TorusGeometry(12.5,1.1,12,32),new T.MeshStandardMaterial({color:0xffd43b,emissive:0x7a5f00,roughness:.3}));
    halo.rotation.x=Math.PI/2;
    halo.position.y=headY;
    pin.add(halo);
    const roofHalo=new T.Mesh(new T.TorusGeometry(9.5,0.8,10,32),new T.MeshStandardMaterial({color:0xffd43b,emissive:0x7a5f00,roughness:.3}));
    roofHalo.rotation.x=Math.PI/2;
    roofHalo.position.y=baseH+1.1;
    pin.add(roofHalo);
   }
   const hitTarget=new T.Mesh(new T.CylinderGeometry(8.5,8.5,headY+14,10),new T.MeshBasicMaterial({colorWrite:false,depthWrite:false,transparent:true,opacity:0}));
   hitTarget.position.y=(headY+14)/2;
   pin.add(hitTarget);
   group.add(pin);
  }
 },[proposals,selectedProposal,showProposals,hiddenSourceIds,plots,reference,ready]);
 useEffect(()=>{sceneRef.current?.traverse(o=>{if(o.userData.sourceId)o.visible=!hiddenSourceIds.includes(o.userData.sourceId);});},[hiddenSourceIds,ready]);
 useEffect(()=>{sceneRef.current?.traverse(o=>{if(o instanceof T.Mesh&&o.userData.sourceId)(o.material as T.MeshStandardMaterial).color.set(o.userData.sourceId===conflict?0xc13c32:o.userData.sourceId===highlight?(viewerOnly?0x1b6d75:0x4c8491):viewerOnly?0xc6cdd0:0x9aaeb1);});},[highlight,conflict,ready,viewerOnly]);
 useEffect(()=>{if(!sceneRef.current)return;sceneRef.current.background=new T.Color(night?'#142c39':viewerOnly?'#edf0ee':'#dbe7e5');sceneRef.current.fog=new T.Fog(night?'#142c39':viewerOnly?'#edf0ee':'#dbe7e5',420*reference.extent_m/320,1200*reference.extent_m/320);if(sunRef.current)sunRef.current.intensity=night?.35:3;},[night,ready]);
 useEffect(()=>{if(!cameraRef.current||!controlsRef.current)return;cameraRef.current.position.set(280*reference.extent_m/320,290*reference.extent_m/320,340*reference.extent_m/320);controlsRef.current.target.set(0,0,0);controlsRef.current.update();},[reset]);
 return <div className="scene" ref={host}>{error&&<p role="alert" className="graphics-error">{error}</p>}</div>;
}
