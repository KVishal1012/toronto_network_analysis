import {useEffect,useRef,useState,type MutableRefObject} from 'react';
import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import downtown from './downtown.json';
import {SIZE,type Plot} from './model';
const CELL=20,OFFSET=(SIZE-1)*CELL/2;
export default function Scene({plots,selected,onCell,onBaseline,onSelectVolume,running,night,reset,capture,reference=downtown,viewerOnly=false,highlight='',hiddenSourceIds=[]}:{plots:Plot[];selected:string|null;onCell:(x:number,z:number)=>void;onBaseline:(text:string)=>void;onSelectVolume?:(id:string)=>void;running:boolean;night:boolean;reset:number;capture?:MutableRefObject<(()=>string)|null>;reference?:typeof downtown;viewerOnly?:boolean;highlight?:string;hiddenSourceIds?:string[]}){
 const host=useRef<HTMLDivElement>(null),live=useRef({onCell,onBaseline,onSelectVolume,running}),objects=useRef<T.Group|null>(null),sceneRef=useRef<T.Scene|null>(null),cameraRef=useRef<T.PerspectiveCamera|null>(null),controlsRef=useRef<OrbitControls|null>(null),roads=useRef<Plot[]>([]),sunRef=useRef<T.DirectionalLight|null>(null),[error,setError]=useState(''),[ready,setReady]=useState(false);
 live.current={onCell,onBaseline,onSelectVolume,running};roads.current=[];
 useEffect(()=>{
  const el=host.current!;let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});}catch{setError('3D graphics are unavailable in this browser. The recorded building list remains available for source inspection.');return;}
  const scale=reference.extent_m/320;const scene=new T.Scene();sceneRef.current=scene;scene.background=new T.Color('#edf0ee');scene.fog=new T.Fog('#edf0ee',420*scale,1200*scale);
  const camera=new T.PerspectiveCamera(40,1,.1,1800);camera.position.set(280*scale,290*scale,340*scale);cameraRef.current=camera;
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;el.appendChild(renderer.domElement);if(capture)capture.current=()=>{renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');};
  renderer.domElement.setAttribute('aria-label','3D neighbourhood. Drag to orbit, right-drag to pan, scroll to zoom. Use the recorded building list for keyboard selection.');
  const controls=new OrbitControls(camera,renderer.domElement);controlsRef.current=controls;controls.enableDamping=true;controls.maxPolarAngle=Math.PI/2.15;controls.minDistance=25;controls.maxDistance=750*scale;controls.target.set(0,0,0);
  scene.add(new T.HemisphereLight(0xffffff,0x547651,2));const sun=new T.DirectionalLight(0xffeac6,3);sun.position.set(-140,260,140);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-220,right:220,top:220,bottom:-220,near:1,far:750});scene.add(sun);sunRef.current=sun;
  const ground=new T.Mesh(new T.BoxGeometry(reference.extent_m,2,reference.extent_m),new T.MeshStandardMaterial({color:viewerOnly?0xe4e7e2:0xb8c4b6,roughness:.95}));ground.position.y=-1;ground.receiveShadow=true;scene.add(ground);
  const grid=new T.GridHelper(320,SIZE,0x71966b,0x82a77b);grid.position.y=.03;if(!viewerOnly)scene.add(grid);
  const referenceGroup=new T.Group();scene.add(referenceGroup);
  for(const b of reference.buildings){const polys=b.geometry.type==='Polygon'?[b.geometry.coordinates]:b.geometry.coordinates;
   for(const rings of polys as number[][][][]){const outer=rings[0];if(!outer)continue;const shape=new T.Shape(outer.map(([x,z])=>new T.Vector2(x,-z)));for(const ring of rings.slice(1))shape.holes.push(new T.Path(ring.map(([x,z])=>new T.Vector2(x,-z))));const mesh=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:b.height,bevelEnabled:false}),new T.MeshStandardMaterial({color:viewerOnly?0xc6cdd0:0x9aaeb1,roughness:.8}));mesh.userData.sourceId=b.id;mesh.rotation.x=-Math.PI/2;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.baseline=`Recorded massing ${b.id}: ${b.height.toFixed(1)} m; height source ${b.height_source}. 2025 context, not verified current conditions.`;referenceGroup.add(mesh);}}
  for(const road of reference.roads){const lines=road.type==='LineString'?[road.coordinates]:road.coordinates;for(const line of lines as number[][][]){const geometry=new T.BufferGeometry().setFromPoints(line.map(([x,z])=>new T.Vector3(x,.2,z)));referenceGroup.add(new T.Line(geometry,new T.LineBasicMaterial({color:0xffffff})));}}
  const group=new T.Group();objects.current=group;scene.add(group);
  const ray=new T.Raycaster(),mouse=new T.Vector2();let down=[0,0];
  const start=(e:PointerEvent)=>{down=[e.clientX,e.clientY];};
  const end=(e:PointerEvent)=>{if(e.button!==0||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const b=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);ray.setFromCamera(mouse,camera);const hits=ray.intersectObjects([...group.children,...referenceGroup.children],true);const visibleHits=hits.filter(h=>h.object.visible);if(visibleHits.length){hits.splice(0,hits.length,...visibleHits);if(hits[0].object.userData.baseline){live.current.onBaseline(hits[0].object.userData.baseline);return;}let o:T.Object3D|null=hits[0].object;while(o&&!o.userData.plot)o=o.parent;if(o?.userData.plot){const p=o.userData.plot as Plot;if(live.current.onSelectVolume)live.current.onSelectVolume(p.id);else live.current.onCell((p.x+150)/20,(p.z+150)/20);return;}}
   const hit=ray.intersectObject(ground)[0];if(hit){const x=Math.floor((hit.point.x+160)/CELL),z=Math.floor((hit.point.z+160)/CELL);if(x>=0&&x<SIZE&&z>=0&&z<SIZE)live.current.onCell(x,z);}};
  renderer.domElement.addEventListener('pointerdown',start);renderer.domElement.addEventListener('pointerup',end);
  const resize=new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(el);
  let frame=0,last=performance.now(),time=0;const animate=(now:number)=>{frame=requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.1);last=now;if(live.current.running)time+=dt;
   controls.update();renderer.render(scene,camera);
  };frame=requestAnimationFrame(animate);setReady(true);
  return()=>{cancelAnimationFrame(frame);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',start);renderer.domElement.removeEventListener('pointerup',end);scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});grid.geometry.dispose();(grid.material as T.Material).dispose();renderer.dispose();el.removeChild(renderer.domElement);objects.current=null;sceneRef.current=null;setReady(false);if(capture)capture.current=null;};
 },[reference.id]);
 useEffect(()=>{const group=objects.current;if(!group)return;
  for(const old of [...group.children]){old.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});group.remove(old);}
  const box=(g:T.Group,w:number,h:number,d:number,color:number,x=0,y=0,z=0)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshStandardMaterial({color,roughness:.75}));m.position.set(x,y+h/2,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m;};
  for(const p of plots){const g=new T.Group();g.position.set(p.x,0,p.z);g.rotation.y=p.rotation*Math.PI/180;g.userData.plot=p;
   box(g,p.width,p.height,p.depth,0xd69a3b);
   if(p.id===selected){const ring=new T.Mesh(new T.BoxGeometry(p.width+.2,.12,p.depth+.2),new T.MeshBasicMaterial({color:0xffce64,wireframe:true}));ring.position.y=.4;g.add(ring);}group.add(g);
  }
 },[plots,selected,ready]);
 useEffect(()=>{sceneRef.current?.traverse(o=>{if(o.userData.sourceId)o.visible=!hiddenSourceIds.includes(o.userData.sourceId);});},[hiddenSourceIds,ready]);
 useEffect(()=>{sceneRef.current?.traverse(o=>{if(o instanceof T.Mesh&&o.userData.sourceId)(o.material as T.MeshStandardMaterial).color.set(o.userData.sourceId===highlight?0x4c8491:viewerOnly?0xc6cdd0:0x9aaeb1);});},[highlight,ready]);
 useEffect(()=>{if(!sceneRef.current)return;sceneRef.current.background=new T.Color(night?'#142c39':viewerOnly?'#edf0ee':'#dbe7e5');sceneRef.current.fog=new T.Fog(night?'#142c39':viewerOnly?'#edf0ee':'#dbe7e5',420*reference.extent_m/320,1200*reference.extent_m/320);if(sunRef.current)sunRef.current.intensity=night?.35:3;},[night,ready]);
 useEffect(()=>{cameraRef.current?.position.set(280*reference.extent_m/320,290*reference.extent_m/320,340*reference.extent_m/320);controlsRef.current?.target.set(0,0,0);},[reset]);
 return <div className="scene" ref={host}>{error&&<p role="alert" className="graphics-error">{error}</p>}</div>;
}
