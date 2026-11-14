import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import PlanningExplorer from './planning/PlanningExplorer';
import 'maplibre-gl/dist/maplibre-gl.css';
const research=import.meta.env.MODE==='private'||(import.meta.env.MODE!=='public'&&new URLSearchParams(location.search).get('workspace')==='research');
const ResearchApp=research?lazy(async()=>{await import('./styles.css');return import('./App');}):null;
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{ResearchApp?<Suspense fallback={<p>Opening local research workspace…</p>}><ResearchApp/></Suspense>:<PlanningExplorer/>}</React.StrictMode>);
