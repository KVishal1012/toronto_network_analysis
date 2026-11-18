import {lazy,Suspense,useEffect,useMemo,useState} from 'react';
import {createEnergyProvider,type EnergyBrief,type EnergyCohort,type EnergyManifest,type EnergyMember,type FacilityEvidence,type FacilitySummary} from './energy';
import type {EnergyPins} from './energy-links';
import './energy.css';

const FacilityMap=lazy(()=>import('./EnergyFacilityMap'));
const fmt=(value:number)=>value.toLocaleString('en-CA',{maximumFractionDigits:3});
const QUICK_METRICS:Array<{key:string;short:string}>=[
 {key:'site_eui',short:'Site energy (GJ/m²/yr)'},
 {key:'water',short:'Water intensity (m³/m²/yr)'},
 {key:'electricity',short:'Electricity (GJ/m²/yr)'},
 {key:'gas',short:'Natural gas (GJ/m²/yr)'},
 {key:'ghg',short:'GHG emissions (kgCO₂e/m²/yr)'},
];
type Props={region:string;pins:EnergyPins;controlsVisible:boolean;onToggleControls?:()=>void;onPins:(pins:EnergyPins)=>void;onBrief:(brief:EnergyBrief|null)=>void};

export default function EnergyPanel({region,pins,controlsVisible,onToggleControls,onPins,onBrief}:Props){
 const [provider]=useState(createEnergyProvider);
 const [manifest,setManifest]=useState<EnergyManifest|null>(null);
 const [cohorts,setCohorts]=useState<EnergyCohort[]>([]);
 const [facilities,setFacilities]=useState<FacilitySummary[]>([]);
 const [facilitiesLoading,setFacilitiesLoading]=useState(false);
 const [loadedFacility,setFacility]=useState<FacilityEvidence|null>(null);
 const [loadedMembers,setMembers]=useState<{id:string;records:EnergyMember[]}|null>(null);
 const defaultCohortId=(cohorts.find(x=>x.property_type==='Multifamily Housing')||cohorts[0])?.id;
 const activeCohortId=pins.cohort||defaultCohortId;
 const facility=loadedFacility?.id===pins.facility?loadedFacility:null;
 const members=loadedMembers&&loadedMembers.id===activeCohortId?loadedMembers.records:null;
 const [error,setError]=useState('');
 const [loading,setLoading]=useState(true);
 const [retry,setRetry]=useState(0);
 const [search,setSearch]=useState('');
 const [showMap,setShowMap]=useState(false);
 const [showReadings,setShowReadings]=useState(false);
 const [brief,setBrief]=useState<EnergyBrief|null>(null);
 const cohort=cohorts.find(c=>c.id===activeCohortId);
 const metric=manifest?.metrics[pins.metric];
 const stats=cohort?.metrics[pins.metric];
 const change=(patch:Partial<EnergyPins>)=>onPins({...pins,snapshot:pins.snapshot||manifest?.id,cohort:pins.cohort||activeCohortId,...patch});

 useEffect(()=>{let live=true;setError('');setLoading(true);provider.init(pins.snapshot).then(async m=>{
  const c=await provider.cohorts();if(!live)return;
  setManifest(m);setCohorts(c);
  if(pins.cohort&&!c.some(r=>r.id===pins.cohort))throw new Error('The linked property comparison is unavailable; it has not been substituted.');
  if(!m.metrics[pins.metric])throw new Error('The linked energy metric is unavailable.');
  const fallbackId=(c.find(x=>x.property_type==='Multifamily Housing')||c[0])?.id;
  if(pins.snapshot&&!pins.cohort&&fallbackId)onPins({...pins,snapshot:m.id,cohort:fallbackId});
 }).catch(e=>{if(live)setError(String(e));}).finally(()=>{if(live)setLoading(false);});return()=>{live=false;};},[provider,pins.snapshot,retry]);

 useEffect(()=>{
  if(!manifest||pins.tab!=='facilities')return;
  let live=true;setFacilities([]);setFacilitiesLoading(true);
  const hasDirectRegion=Object.hasOwn(manifest.assets,'regions/'+region);
  const loadFacilities=hasDirectRegion
   ?provider.region(region)
   :Promise.all(['downtown','midtown'].filter(r=>Object.hasOwn(manifest.assets,'regions/'+r)).map(r=>provider.region(r))).then(lists=>{
     const seen=new Set<string>();
     const merged:FacilitySummary[]=[];
     for(const list of lists)for(const item of list)if(!seen.has(item.id)){seen.add(item.id);merged.push(item);}
     return merged;
    });
  loadFacilities.then(rows=>{if(live)setFacilities(rows);}).catch(e=>{if(live)setError(String(e));}).finally(()=>{if(live)setFacilitiesLoading(false);});
  return()=>{live=false;};
 },[provider,manifest,region,pins.tab,retry]);
 useEffect(()=>{setFacility(null);setShowReadings(false);if(!manifest||!pins.facility)return;let live=true;provider.facility(pins.facility).then(f=>{if(live)setFacility(f);}).catch(e=>{if(live)setError(String(e));});return()=>{live=false;};},[provider,manifest,pins.facility,retry]);
 useEffect(()=>{setMembers(null);if(!manifest||!activeCohortId||!pins.include.includes('cohort'))return;let live=true;const id=activeCohortId;provider.members(id).then(rows=>{if(live)setMembers({id,records:rows});}).catch(e=>{if(live)setError(String(e));});return()=>{live=false;};},[provider,manifest,activeCohortId,pins.include.includes('cohort'),retry]);
 useEffect(()=>{
  const pending=(pins.include.includes('cohort')&&(!cohort||!metric||!members))||(pins.include.includes('facility')&&!facility);
  const next=manifest&&!error&&!pending&&pins.include.length?{snapshot:manifest.id,year:manifest.year,sources:manifest.sources,limitations:manifest.limitations,...(pins.include.includes('cohort')&&cohort&&metric&&members?{cohort:{summary:cohort,metric:pins.metric,definition:metric,records:members}}:{}),...(pins.include.includes('facility')&&facility?{facility}:{} )}:null;
  setBrief(next);onBrief(next);
 },[manifest,cohort,metric,members,facility,pins.metric,pins.include.join(','),error,onBrief]);
 const filtered=useMemo(()=>facilities.filter(f=>(f.name+' '+f.address).toLowerCase().includes(search.toLowerCase().trim())),[facilities,search]);
 function include(kind:string,checked:boolean){change({include:checked?[...new Set([...pins.include,kind])]:pins.include.filter(x=>x!==kind)});}

 return <section id="energy-evidence" className="g-energy" aria-labelledby="energy-title">
  <div className="g-no-print">
   <div className="energy-header-row">
    <div>
     <p className="g-eyebrow">03 · SUPPORTING CONTEXT · REPORTED ENERGY &amp; WATER</p>
     <h2 id="energy-title">Reported energy &amp; water evidence</h2>
    </div>
    {onToggleControls&&(
     <button type="button" className="energy-collapse-btn" aria-expanded={controlsVisible} onClick={onToggleControls}>
      {controlsVisible?'Hide energy & water controls':'Show energy & water controls'}
     </button>
    )}
   </div>
   <p>Compare Toronto-wide large-building energy and water intensities (2,451 Ontario EWRB properties) or inspect municipal facilities’ dated utility and chilled-water meter entries (247 City of Toronto facilities). These are separate sources with different coverage.</p>
   <div hidden={!controlsVisible}>
   {loading&&<p role="status">Loading qualified energy &amp; water evidence…</p>}
   {error&&<div role="alert" className="g-warning"><p>{error}</p><button type="button" onClick={()=>{setError('');setRetry(r=>r+1);}}>Retry energy &amp; water evidence</button></div>}
   {manifest&&!error&&!loading&&<>
    <p className="energy-baseline"><strong>{manifest.year} baseline only.</strong> No current meter readings, building rating or replacement-building energy/water prediction.</p>
    <div className="energy-tabs" role="group" aria-label="Energy and water evidence source">
     <button type="button" aria-pressed={pins.tab==='cohorts'} onClick={()=>change({tab:'cohorts'})}>Similar reporting properties (Energy &amp; Water)</button>
     <button type="button" aria-pressed={pins.tab==='facilities'} onClick={()=>change({tab:'facilities'})}>Municipal facilities (Utility &amp; Chilled-Water Meters)</button>
    </div>
    {pins.tab==='cohorts'?<>
     <h3>Toronto-wide property energy &amp; water comparisons</h3><p>Ontario publishes coarse postal areas across Toronto (Toronto, North York, Scarborough, Etobicoke, East York, and York), not street addresses. This comparison does not measure the selected study area or any building in the 3D view. Reporting properties may include several structures.</p>
     <div className="energy-quick-metrics" role="group" aria-label="Quick energy and water metric selector">
      <span className="energy-quick-label">Quick metric:</span>
      {QUICK_METRICS.filter(qm=>manifest.metrics[qm.key]).map(qm=>(
       <button key={qm.key} type="button" aria-pressed={pins.metric===qm.key} onClick={()=>change({metric:qm.key})}>
        {qm.short}
       </button>
      ))}
     </div>
     <div className="energy-controls"><label htmlFor="energy-cohort">Calculated property type<select id="energy-cohort" value={activeCohortId||''} onChange={e=>change({cohort:e.target.value})}>{cohorts.map(c=><option key={c.id} value={c.id}>{c.property_type}</option>)}</select></label>
     <label htmlFor="energy-metric">Reported energy or water metric<select id="energy-metric" value={pins.metric} onChange={e=>change({metric:e.target.value})}>{Object.entries(manifest.metrics).map(([key,m])=><option key={key} value={key}>{m.label} ({m.unit})</option>)}</select></label></div>
     {cohort&&stats&&metric&&<div aria-live="polite">
      <h4>{cohort.property_type} · {metric.label}</h4><p>{stats.reporting_records} reporting records · {stats.valid} valid values · {stats.missing} missing/invalid · {stats.flagged} flagged · {stats.quality_checker_not_run} with no reported checker run.</p>
      {stats.distribution?<table><caption>Unweighted distribution · {metric.unit} · reporting year {manifest.year}</caption><thead><tr><th scope="col">Lower quartile</th><th scope="col">Median</th><th scope="col">Upper quartile</th></tr></thead><tbody><tr><td>{fmt(stats.distribution.q1)}</td><td>{fmt(stats.distribution.median)}</td><td>{fmt(stats.distribution.q3)}</td></tr></tbody></table>:<p>No distribution: fewer than {manifest.minimum_cohort} valid values.</p>}
      <p className="g-hint">A non-random, owner-reported sample. Flagged and missing counts can overlap. Values are retained without outlier trimming. A checker run does not certify accuracy. Water zeros are excluded because the publisher cannot distinguish zero use from non-reporting. Weather-normalized energy is not climate-normalized.</p>
      <Source source={manifest.sources.ontario}/>
      <label className="g-check"><input type="checkbox" checked={pins.include.includes('cohort')} onChange={e=>include('cohort',e.target.checked)}/>Include this property comparison and its source records in my brief</label>
      {pins.include.includes('cohort')&&!members&&<p role="status">Loading underlying source records for the brief…</p>}
      {members&&<details><summary>Underlying reporting records ({members.length})</summary><p>Source rows refer to the original workbook. IDs are reporting-property references, not established building identities. All selected records are included in JSON export.</p><div className="energy-table-scroll"><table><caption>First 30 records · {metric.unit}</caption><thead><tr><th>ID / workbook row</th><th>Reported city / postal prefix</th><th>Value</th><th>Flags</th></tr></thead><tbody>{members.slice(0,30).map(r=><tr key={r.id}><td>{r.id} / {r.row}</td><td>{r.city} / {r.postal_prefix||'Unknown'}</td><td>{r.metrics[pins.metric]===null?'Unknown':fmt(r.metrics[pins.metric]!)}</td><td>{r.flags[pins.metric].join(', ')||'None'}</td></tr>)}</tbody></table></div></details>}
     </div>}
    </>:<>
     <h3>Municipal facilities in {region==='midtown'?'Midtown':region==='downtown'?'Downtown':'Downtown & Midtown qualified study areas'}</h3><p>City-owned/operated facilities only (electricity, natural gas, district steam, and district chilled water). Address locations do not establish a relationship with a 3D building. Private homes are outside this source’s coverage.{region!=='downtown'&&region!=='midtown'?' In this snapshot, municipal facility address reconciliation covers the 247 qualified facilities in Downtown (158) and Midtown (89); use Similar reporting properties above for city-wide Toronto energy and water comparisons.':''}</p>
     <label htmlFor="energy-facility-search">Find a facility by name or address<input id="energy-facility-search" value={search} onChange={e=>setSearch(e.target.value)} type="search"/></label>
     <p role="status">{facilitiesLoading?'Loading facility locations…':`${filtered.length} facilities shown.`}</p><button type="button" aria-expanded={showMap} onClick={()=>setShowMap(x=>!x)}>{showMap?'Hide':'Show'} facility location map</button>
     {showMap&&<Suspense fallback={<p role="status">Loading facility map…</p>}><FacilityMap facilities={filtered} selected={pins.facility} provider={provider} onSelect={id=>change({facility:id})}/></Suspense>}
     <ul className="energy-facility-list" aria-label="Municipal facilities">{filtered.map(f=><li key={f.id}><button type="button" aria-pressed={pins.facility===f.id} onClick={()=>change({facility:f.id})}>{f.name} · {f.address}</button></li>)}</ul>
     {!facilitiesLoading&&!filtered.length&&<p>No qualified facilities match this search. This does not establish that nearby buildings use no energy.</p>}
     {pins.facility&&!facility&&<p role="status">Loading selected facility evidence…</p>}
     {facility&&<article className="energy-facility" aria-labelledby="energy-facility-title"><h4 id="energy-facility-title">{facility.name}</h4><p>{facility.address} · {facility.property_type}</p><p>Facility ID {facility.publisher_id}; Properties sheet row {facility.row}. Address points: {facility.address_point_ids.join(', ')}. {facility.excluded_meter_rows} meter rows excluded or duplicated.</p>
      <p className="g-warning">No qualified reported energy evidence for a selected 3D building. This is facility-address evidence; the facility may include several structures.</p>
      {!facility.regions.includes(region)&&region!=='all-toronto'&&region!=='toronto-east-york'&&<p>This pinned facility belongs to the {facility.regions.join(' / ')} study area; it is retained from your link.</p>}
      <MeterTable facility={facility}/>
      <p className="g-hint">Sums of reported entries per meter, not verified annual totals. Adjacent date labels use the publisher’s interval labels; interval inclusivity is unqualified. No gap filling, cost estimate or inferred emissions. Estimated or incomplete entries remain labelled.</p>
      <Source source={manifest.sources.toronto}/>
      <button type="button" aria-expanded={showReadings} onClick={()=>setShowReadings(x=>!x)}>{showReadings?'Hide':'Inspect'} source readings</button>
      {showReadings&&<div className="energy-table-scroll"><table><caption>Meter Entries sheet · all accepted readings for this facility</caption><thead><tr><th>Consumption ID / row</th><th>Meter</th><th>Reported start–end</th><th>Usage</th><th>Estimated?</th></tr></thead><tbody>{facility.readings.map(r=><tr key={r.id}><td>{r.id} / {r.row}</td><td>{r.meter_id}</td><td>{r.start}–{r.end}</td><td>{fmt(r.usage)} {r.unit}</td><td>{r.estimated?'Yes / unknown':'No'}</td></tr>)}</tbody></table></div>}
      <label className="g-check"><input type="checkbox" checked={pins.include.includes('facility')} onChange={e=>include('facility',e.target.checked)}/>Include this facility evidence in my brief</label>
     </article>}
    </>}
    <details><summary>Coverage, reconciliation and limitations</summary><p>Snapshot {manifest.id}. Address snapshot {manifest.inputs.address_snapshot}. Boundary version {manifest.inputs.boundary_version}.</p><ul>{manifest.limitations.map(l=><li key={l}>{l}</li>)}</ul>{Object.entries(manifest.accounting).map(([key,a])=><div key={key}><h4>{key}: {a.accounted} / {a.input} accounted</h4><ul>{Object.entries(a.outcomes).map(([reason,n])=><li key={reason}>{reason.replaceAll('_',' ')}: {n}</li>)}</ul></div>)}</details>
   </>}
   </div>
  </div>
  {brief&&<section className="energy-brief" aria-labelledby="energy-brief-title"><h3 id="energy-brief-title">Energy &amp; water evidence included in your brief</h3><p>{brief.year} baseline · snapshot {brief.snapshot}. Reported evidence; no replacement-building energy or water prediction.</p>
   {brief.cohort&&<><h4>{brief.cohort.summary.property_type} · Toronto-wide reporting properties</h4><p>{brief.cohort.definition.label}: {brief.cohort.summary.metrics[brief.cohort.metric].distribution?`median ${fmt(brief.cohort.summary.metrics[brief.cohort.metric].distribution!.median)} ${brief.cohort.definition.unit}`:'Distribution unavailable (small cohort)'}. {brief.cohort.summary.metrics[brief.cohort.metric].valid} valid values. This does not measure a selected area or building.</p><Source source={brief.sources.ontario}/></>}
   {brief.facility&&<><h4>{brief.facility.name} · {brief.facility.address}</h4><MeterTable facility={brief.facility}/><p>Reported facility meter entries; annual coverage and a relationship with 3D buildings are unqualified.</p><Source source={brief.sources.toronto}/></>}
   <ul>{brief.limitations.map(l=><li key={l}>{l}</li>)}</ul>
  </section>}
 </section>;
}

function Source({source}:{source:EnergyManifest['sources']['ontario']}){return <div className="energy-source"><p><a href={source.page} target="_blank" rel="noreferrer">Official dataset ↗</a> · reporting year {source.year} · retrieved {source.retrieved_at.slice(0,10)}. {source.attribution} <a href={source.licence_url}>Licence</a></p><p className="energy-source-hash">Source SHA-256: {source.sha256}</p><p className="g-print-url">Source: {source.page}</p></div>;}
function MeterTable({facility}:{facility:FacilityEvidence}){return facility.meters.length?<div className="energy-table-scroll"><table><caption>Sum of accepted reported entries per meter, in original units</caption><thead><tr><th>Meter / fuel</th><th>Sum of entries</th><th>Reported date labels</th><th>Coverage notes</th></tr></thead><tbody>{facility.meters.map(m=><tr key={m.meter_id}><td>{m.meter_id} · {m.fuel}</td><td>{fmt(m.reported_sum)} {m.unit}</td><td>{m.start}–{m.end}</td><td>{m.entries} entries; {m.gaps} gaps; {m.estimated_entries} estimated/unknown; annual total withheld</td></tr>)}</tbody></table></div>:<p>No qualified consumption entries available for this facility.</p>;}
