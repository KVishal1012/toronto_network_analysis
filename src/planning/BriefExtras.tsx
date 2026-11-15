import {lazy,Suspense} from 'react';
import {selectedProjects,type AreaEvidence,type Filters} from './screening';
const BriefMap=lazy(()=>import('./BriefMap'));

export function readScenarioAttachment(){
  try{
    const x=JSON.parse(sessionStorage.getItem('aster-brief-scenario')||'null');
    if(x&&x.scenario?.schema===3&&typeof x.image==='string'&&x.image.startsWith('data:image/png;base64,')&&x.image.length<8000000)return x;
  }catch{}
  return null;
}

export default function BriefExtras({areas,filters,view3dHash}:{areas:AreaEvidence[];filters:Filters;view3dHash?:string}){
  const mapAreas=areas.map(a=>{const region=a.regions.includes(filters.region)?filters.region:a.regions[0];const included=new Set(selectedProjects(a,{...filters,region}).map(p=>p.number));return {...a,projects:a.projects.filter(p=>included.has(p.number))};});
  const attachment=readScenarioAttachment();
  const targetHash=view3dHash||(()=>{
    const q=new URLSearchParams(location.hash.slice(1));
    q.set('view','3d');
    return '#'+q.toString();
  })();

  return (
    <section className="brief-extras" aria-labelledby="brief-extras-title">
      <div className="brief-extras-head">
        <div>
          <h3 id="brief-extras-title">Where are the selected areas?</h3>
          <p className="g-hint">
            Locate your selected areas on Toronto’s streets, alongside their included proposal records and nearby TTC subway stations.
          </p>
        </div>
        <a className="g-button-link g-no-print" href={targetHash}>
          Open Toronto 3D explorer ↗
        </a>
      </div>
      {areas.length>0?<Suspense fallback={<p role="status">Loading the selected-area street map…</p>}><BriefMap areas={mapAreas}/></Suspense>:<p className="g-hint">Select an area above to add its street map to your brief.</p>}
      {attachment&&(
        <figure className="g-schematic-figure">
          <img src={attachment.image} alt="Attached 3D architectural scenario snapshot" style={{maxWidth:'100%',border:'1px solid #cbd4cb',borderRadius:6}}/>
          <figcaption className="g-hint">Attached 3D snapshot from this browser session (illustrative source massing).</figcaption>
        </figure>
      )}
    </section>
  );
}
