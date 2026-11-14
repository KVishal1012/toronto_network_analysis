import React,{lazy,Suspense,useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import './planning/growth.css';
function ExplorerUnavailable(){return <main className="growth"><h1>Address explorer unavailable in this package</h1><p>This older explorer link depends on datasets that are not qualified for this submission package. Its original snapshot has not been replaced or reinterpreted.</p><p>The local source archives remain intact. The public candidate currently includes only reviewed Growth &amp; Transit screening data.</p><a href="./">Open Growth &amp; Transit Priorities</a></main>;}
const Studio=lazy(()=>import('./sandbox/ArchitecturalViewer'));
const Growth=lazy(()=>import('./planning/GrowthPriorities'));
function App(){
 const route=()=>{const p=new URLSearchParams(location.hash.slice(1));return p.has('explorer')||(!p.has('analysis')&&p.has('snapshot'));};
 const [explorer,setExplorer]=useState(route);
 const [studio,setStudio]=useState(()=>new URLSearchParams(location.hash.slice(1)).get('view')==='3d');
 useEffect(()=>{const change=()=>{setExplorer(route());setStudio(new URLSearchParams(location.hash.slice(1)).get('view')==='3d');};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change);},[]);
 return <Suspense fallback={<p role="status">Opening ASTER…</p>}>{studio?<Studio/>:explorer?<ExplorerUnavailable/>:<Growth/>}</Suspense>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
