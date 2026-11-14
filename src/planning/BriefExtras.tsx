import type {AreaEvidence} from './screening';

export function readScenarioAttachment(){
  try{
    const x=JSON.parse(sessionStorage.getItem('aster-brief-scenario')||'null');
    if(x&&x.scenario?.schema===3&&typeof x.image==='string'&&x.image.startsWith('data:image/png;base64,')&&x.image.length<8000000)return x;
  }catch{}
  return null;
}

export default function BriefExtras({areas,view3dHash}:{areas:AreaEvidence[];view3dHash?:string}){
  const points=areas
    .map(a=>{
      const p=a.projects[0];
      return p?{id:a.id,label:a.label,neighbourhood:a.neighbourhood,x:p.lon,y:p.lat}:null;
    })
    .filter((x):x is {id:string;label:string;neighbourhood:string|undefined;x:number;y:number}=>!!x);
  const minX=points.length?Math.min(...points.map(p=>p.x)):0;
  const maxX=points.length?Math.max(...points.map(p=>p.x)):0;
  const minY=points.length?Math.min(...points.map(p=>p.y)):0;
  const maxY=points.length?Math.max(...points.map(p=>p.y)):0;
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
          <h3 id="brief-extras-title">Brief orientation diagram</h3>
          <p className="g-hint">
            Relative locations of your selected 500 m areas (north up; not a street or walking-route map).
          </p>
        </div>
        <a className="g-button-link g-no-print" href={targetHash}>
          Open Toronto 3D explorer ↗
        </a>
      </div>
      {points.length>0&&(
        <figure className="g-schematic-figure">
          <svg
            viewBox="0 0 600 190"
            role="img"
            aria-labelledby="brief-svg-title brief-svg-desc"
            className="g-schematic-svg"
          >
            <title id="brief-svg-title">Schematic locations of selected analysis areas</title>
            <desc id="brief-svg-desc">
              {points.map((p,i)=>`Area ${i+1}: ${p.neighbourhood?`${p.neighbourhood}, `:''}Near ${p.label} (cell ${p.id})`).join('; ')}. North is up. Not a street or walking-route map.
            </desc>
            <rect x="1" y="1" width="598" height="188" rx="6" fill="#f4f7f4" stroke="#8aa399" strokeWidth="1.5"/>
            <g aria-hidden="true" transform="translate(558,28)">
              <path d="M0 18 L0 0 M-5 6 L0 0 L5 6" fill="none" stroke="#173a35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#173a35">N</text>
            </g>
            {points.map((p,i)=>{
              const cx=points.length===1?220:60+((p.x-minX)/(maxX-minX||1))*420;
              const cy=points.length===1?95:142-((p.y-minY)/(maxY-minY||1))*88;
              const alignEnd=cx>360;
              const labelX=alignEnd?cx-15:cx+15;
              return (
                <g key={p.id}>
                  <circle cx={cx} cy={cy} r="9" fill={i===0?'#173a35':'#8f4800'} stroke="#ffffff" strokeWidth="2"/>
                  <text
                    x={labelX}
                    y={cy+4}
                    textAnchor={alignEnd?'end':'start'}
                    fontSize="12"
                    fontWeight="650"
                    fill="#173a35"
                  >
                    {i+1}: Near {p.label} ({p.id})
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption className="g-hint">
            Schematic orientation only (straight-line positions, north up).
          </figcaption>
        </figure>
      )}
      {attachment&&(
        <figure className="g-schematic-figure">
          <img src={attachment.image} alt="Attached 3D architectural scenario snapshot" style={{maxWidth:'100%',border:'1px solid #cbd4cb',borderRadius:6}}/>
          <figcaption className="g-hint">Attached 3D snapshot from this browser session (illustrative source massing).</figcaption>
        </figure>
      )}
    </section>
  );
}
