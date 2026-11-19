import {lazy,Suspense,useEffect,useMemo,useState} from 'react';
import {
  createScreeningProvider,
  distanceBreakdown,
  describeHourlyDepartures,
  formatFeedDate,
  matchesAreaSearch,
  metrics,
  outcomeReasonLabels,
  parseScreeningLink,
  periodLabels,
  periodPlainLabels,
  periods,
  shareHash,
  shortlist,
  safeSource,
  stagePlainLabels,
  type AreaEvidence,
  type AreaSummary,
  type Filters,
  type Outcome,
  type Period,
  type ScreeningManifest,
} from './screening';
import './growth.css';
import demos from './regional-demos.json';
import BriefExtras from './BriefExtras';
import {regionNames,regionShortNames,submissionRegions} from './regions';
import {cellNeighbourhoods,cellsWith3dView} from './toronto-context';
import {parseEnergyPins,withEnergyPins} from './energy-links';
import type {EnergyBrief} from './energy';

const AreaMap=lazy(()=>import('./AreaMap'));
const EnergyPanel=lazy(()=>import('./EnergyPanel'));
const display=(n:number)=>n.toLocaleString();
const outsideKeywords=[
  'mississauga',
  'vaughan',
  'markham',
  'brampton',
  'richmond hill',
  'oakville',
  'pickering',
  'ajax',
  'whitby',
  'oshawa',
  'burlington',
  'milton',
  'newmarket',
  'aurora',
];

export default function GrowthPriorities(){
 const [compact,setCompact]=useState(()=>window.matchMedia('(max-width:640px)').matches);
 useEffect(()=>{const media=window.matchMedia('(max-width:640px)');const update=()=>setCompact(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
  useEffect(()=>{document.title='ASTER — Toronto Housing & Transit Priorities';},[]);
  const [initial]=useState(()=>parseScreeningLink(location.hash));
  const [originalPins]=useState(()=>new URLSearchParams(location.hash.slice(1)));
  const [energyPins,setEnergyPins]=useState(()=>parseEnergyPins(location.hash));
  const [showEnergy,setShowEnergy]=useState(()=>new URLSearchParams(location.hash.slice(1)).has('energy'));
  const [energyBrief,setEnergyBrief]=useState<EnergyBrief|null>(null);
  const [provider]=useState(createScreeningProvider);
  const [manifest,setManifest]=useState<ScreeningManifest|null>(null);
  const [filters,setFilters]=useState<Filters>(initial.filters);
  const [areas,setAreas]=useState<AreaSummary[]>([]);
  const [otherAreas,setOtherAreas]=useState<Record<string,AreaSummary[]>>({});
  const [selected,setSelected]=useState<string[]>(initial.areas);
  const [evidence,setEvidence]=useState<Record<string,AreaEvidence>>({});
  const [outcomes,setOutcomes]=useState<Outcome[]|null>(null);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const [notice,setNotice]=useState('');
  const [conclusion,setConclusion]=useState('');
  const [limit,setLimit]=useState(12);
  const [retry,setRetry]=useState(0);
  const [search,setSearch]=useState('');
  const [showMap,setShowMap]=useState(()=>!window.matchMedia('(max-width:640px)').matches);

  const otherRegion=filters.region==='all-toronto'?null:'all-toronto';

  useEffect(()=>{
    const onHashChange=()=>{
      const q=new URLSearchParams(location.hash.slice(1));
      if(q.get('view')==='3d'||q.has('explorer'))return;
      if(!q.has('region')&&!q.has('areas')&&!q.has('analysis'))return;
      const next=parseScreeningLink(location.hash);
      setFilters(next.filters);
      setSelected(next.areas);
      setEnergyPins(parseEnergyPins(location.hash));
      if(q.has('energy'))setShowEnergy(true);
    };
    window.addEventListener('hashchange',onHashChange);
    return()=>window.removeEventListener('hashchange',onHashChange);
  },[]);

  useEffect(()=>{
    let live=true;
    setError('');
    provider
      .init(initial.version)
      .then(m=>{
        const originalRegion=originalPins.get('region');
        if(originalRegion&&!m.regions.some(r=>r.id===originalRegion)){
          throw new Error(`Region "${originalRegion}" is not available in this snapshot. Your original link has not been reinterpreted. Open the home page to choose an available Toronto study region.`);
        }
        if(
          (originalPins.get('snapshot')&&originalPins.get('snapshot')!==m.planning_snapshot)||
          (originalPins.get('transit')&&originalPins.get('transit')!==m.transit_snapshot)
        ){
          throw new Error('Pinned source versions do not match this analysis. Open the original analysis link.');
        }
        if(live)setManifest(m);
      })
      .catch(e=>{
        if(live){
          setError(String(e));
          setLoading(false);
        }
      });
    return()=>{live=false;};
  },[provider,retry,initial.version,originalPins]);

  useEffect(()=>{
    if(!manifest)return;
    let live=true;
    setLoading(true);
    setAreas([]);
    setLimit(12);
    setError('');
    provider
      .region(filters.region)
      .then(a=>{
        if(live)setAreas(a);
      })
      .catch(e=>{
        if(live)setError(String(e));
      })
      .finally(()=>{
        if(live)setLoading(false);
      });
    return()=>{live=false;};
  },[provider,manifest,filters.region,retry]);

  useEffect(()=>{
    if(!manifest)return;
    let live=true;
    Promise.all(selected.map(id=>provider.area(id)))
      .then(rows=>{
        if(live)setEvidence(Object.fromEntries(rows.map(r=>[r.id,r])));
      })
      .catch(e=>{
        if(live)setError(String(e));
      });
    return()=>{live=false;};
  },[provider,manifest,selected]);

  useEffect(()=>{
    if(manifest)history.replaceState(null,'',withEnergyPins(shareHash(manifest,filters,selected),energyPins));
  },[manifest,filters,selected,energyPins]);

  const enrichedAreas=useMemo(
    ()=>areas.map(a=>({...a,neighbourhood:cellNeighbourhoods[a.id]})),
    [areas]
  );

  const searchMatches=useMemo(
    ()=>enrichedAreas.filter(a=>matchesAreaSearch(a,search)),
    [enrichedAreas,search]
  );
  const results=useMemo(()=>shortlist(searchMatches,filters),[searchMatches,filters]);
  const unfilteredSearchResults=useMemo(
    ()=>search.trim()?shortlist(searchMatches,{...filters,onlyGaps:false,stage:'all',minimum:0}):[],
    [searchMatches,filters,search]
  );

  // When a search has 0 matches in the active region, lazily inspect the other region and outcomes for helpful guidance.
  useEffect(()=>{
    const q=search.trim();
    if(!manifest||q.length<2||searchMatches.length>0)return;
    let live=true;
    if(otherRegion&&!otherAreas[otherRegion]){
      provider
        .region(otherRegion)
        .then(rows=>{
          if(live)setOtherAreas(prev=>({...prev,[otherRegion]:rows}));
        })
        .catch(()=>{});
    }
    if(q.length>=3&&!outcomes){
      provider
        .outcomes()
        .then(rows=>{
          if(live)setOutcomes(rows);
        })
        .catch(()=>{});
    }
    return()=>{live=false;};
  },[manifest,search,searchMatches.length,otherRegion,otherAreas,outcomes,provider]);

  const otherRegionMatches=useMemo(()=>{
    const q=search.trim();
    if(!q||!otherRegion||searchMatches.length>0)return[];
    return (otherAreas[otherRegion]||[]).filter(a=>matchesAreaSearch(a,q,cellNeighbourhoods[a.id]));
  },[otherAreas,otherRegion,search,searchMatches.length]);

  const neighbourhoodHint=useMemo(()=>{
    const q=search.trim().toLowerCase();
    if(q.length<3||!manifest?.study_areas||searchMatches.length>0)return null;
    for(const sa of manifest.study_areas){
      for(const member of sa.members){
        const name=typeof member==='string'?member:(member as {AREA_NAME?:string}).AREA_NAME||'';
        if(name&&name.toLowerCase().includes(q)){
          return {regionId:sa.id,name};
        }
      }
    }
    return null;
  },[manifest,search,searchMatches.length]);

  const outcomeMatches=useMemo(()=>{
    const q=search.trim().toLowerCase();
    if(q.length<3||!outcomes||searchMatches.length>0)return[];
    const tokens=q.split(/\s+/).filter(Boolean);
    return outcomes
      .filter(o=>o.reason!=='included')
      .filter(o=>{
        const hay=`${o.label} ${o.number} ${o.reason.replaceAll('_',' ')}`.toLowerCase();
        return tokens.every(t=>hay.includes(t));
      })
      .slice(0,5);
  },[outcomes,search,searchMatches.length]);

  const outsideTermMatch=useMemo(()=>{
    const q=search.trim().toLowerCase();
    if(q.length<3||searchMatches.length>0)return false;
    return outsideKeywords.some(k=>q.includes(k));
  },[search,searchMatches.length]);

  const patch=(value:Partial<Filters>)=>{
    setFilters(f=>({...f,...value}));
    setLimit(12);
  };

  const toggle=(id:string,label?:string)=>{
    setSelected(ids=>{
      if(ids.includes(id)){
        const next=ids.filter(x=>x!==id);
        setNotice(`Removed ${label?`Near ${label}`:id} from comparison (${next.length}/2 selected).`);
        return next;
      }
      if(ids.length<2){
        const next=[...ids,id];
        setNotice(`Added ${label?`Near ${label}`:id} to comparison (${next.length}/2 selected).`);
        return next;
      }
      setNotice('You can compare up to two areas at once. Remove one selected area to add another.');
      return ids;
    });
  };

  function openDemo(d:{region:string;link:string;analysis?:string}){
    const parsed=parseScreeningLink(d.link);
    if(manifest&&(!d.analysis||d.analysis===manifest.id)){
      setFilters(parsed.filters);
      setSelected(parsed.areas);
      setSearch('');
      setLimit(12);
      setNotice(`Loaded ${regionShortNames[parsed.filters.region]||parsed.filters.region} example.`);
      document.getElementById('growth-results')?.scrollIntoView({behavior:'smooth'});
    }else{
      location.hash=d.link;
      location.reload();
    }
  }

  async function share(){
    try{
      await navigator.clipboard.writeText(location.href);
      setNotice('Reproducible link copied to your clipboard.');
    }catch{
      setNotice('Copy the reproducible link directly from your browser address bar.');
    }
  }

  async function loadOutcomes(){
    try{
      setOutcomes(await provider.outcomes());
    }catch(e){
      setError(String(e));
    }
  }

  function exportBrief(){
    if(!manifest)return;
    const payload={
      title:'ASTER community investigation brief',
      manifest,
      filters,
      areas:selected.map(id=>evidence[id]).filter(Boolean),
      user_conclusion:conclusion,
      energy_evidence:energyBrief,
      link:location.href,
      limitations:manifest.limitations,
    };
    const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
    const a=document.createElement('a');
    a.href=url;
    a.download=`aster-community-brief-${manifest.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice('Exported evidence and brief as JSON.');
  }

  function build3dHash(opts?:{modelRegion?:string;cell?:string;proposal?:string}){
    const baseHash=manifest?withEnergyPins(shareHash(manifest,filters,selected),energyPins):location.hash;
    const q=new URLSearchParams(baseHash.replace(/^#/,''));
    q.set('view','3d');
    q.set('model_region',opts?.modelRegion||(filters.region==='midtown'?'midtown':'downtown'));
    if(opts?.cell)q.set('cell',opts.cell);
    if(opts?.proposal)q.set('proposal',opts.proposal);
    return '#'+q.toString();
  }

  const selectedRows=selected
    .map(id=>evidence[id])
    .filter(Boolean)
    .map(a=>({...a,neighbourhood:a.neighbourhood||cellNeighbourhoods[a.id]}));
  const energyReady=energyPins.include.length===0||!!(energyBrief&&energyBrief.snapshot===energyPins.snapshot&&(!energyPins.include.includes('cohort')||(energyBrief.cohort?.summary.id===energyPins.cohort&&energyBrief.cohort?.metric===energyPins.metric))&&(!energyPins.include.includes('facility')||energyBrief.facility?.id===energyPins.facility));
  const complete=selected.length>0&&selectedRows.length===selected.length&&energyReady;
  const expired=manifest
    ?new Date().toLocaleDateString('en-CA',{timeZone:'America/Toronto'}).replaceAll('-','')>manifest.feed.feed_end_date
    :false;

  const view3dHash=useMemo(
    ()=>build3dHash(),
    [manifest,filters,selected,energyPins]
  );

  const stageSummary=stagePlainLabels[filters.stage]||filters.stage;
  const activeRegionLabel=regionShortNames[filters.region]||filters.region;

  return (
    <div className="growth">
      <a
        className="g-skip g-no-print"
        href="#main-content"
        onClick={e=>{
          e.preventDefault();
          const target=document.getElementById('growth-results')||document.getElementById('main-content');
          target?.focus();
          target?.scrollIntoView();
        }}
      >
        Skip to investigation results
      </a>

      <header className="g-header g-no-print">
        <a
          href="./"
          className="g-brand"
          onClick={e=>{
            e.preventDefault();
            location.hash='';
            location.reload();
          }}
        >
          ASTER<span>HOUSING &amp; TRANSIT</span>
        </a>
        <nav className="g-nav" aria-label="Primary navigation">
          <a
            href="#how-it-works"
            onClick={e=>{
              e.preventDefault();
              const el=document.getElementById('how-it-works') as HTMLDetailsElement|null;
              if(el){
                el.open=true;
                el.scrollIntoView({behavior:'smooth'});
              }
            }}
          >
            How it works
          </a>
          <a
            href="#growth-results"
            onClick={e=>{
              e.preventDefault();
              const el=document.getElementById('growth-results');
              el?.scrollIntoView({behavior:'smooth'});
              el?.focus();
            }}
          >
            Explore areas
          </a>
          <a
            href="#energy-evidence"
            onClick={e=>{
              e.preventDefault();
              setShowEnergy(true);
              const el=document.getElementById('energy-panel-container');
              el?.scrollIntoView({behavior:'smooth'});
              el?.focus({preventScroll:true});
            }}
          >
            Energy &amp; Water
          </a>
          <a
            href="#community-brief"
            onClick={e=>{
              e.preventDefault();
              const el=document.getElementById('community-brief');
              el?.scrollIntoView({behavior:'smooth'});
              el?.focus();
            }}
          >
            Prepare a brief ↓
          </a>
          <a href={view3dHash}>Toronto 3D ↗</a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="g-hero g-no-print">
          <p className="g-eyebrow">TORONTO OPEN DATA · CITY-WIDE TORONTO</p>
          <h1>See how proposed housing lines up with frequent TTC service.</h1>
          <p className="g-hero-lead">
            Compare City of Toronto development proposals against scheduled TTC bus, streetcar, and subway timetables,
            then build a community brief.
          </p>

          <div className="g-top-utility">
            <details id="how-it-works" className="g-how-bar">
              <summary>
                <span className="g-chevron" aria-hidden="true">▾</span>
                <span>How it works in 3 steps</span>
              </summary>
              <ol className="g-steps-compact">
                <li>
                  <strong>1. Set transit rules:</strong> Choose All Toronto, a Community Council, or Downtown/Midtown,
                  a walking ring (400 m, 800 m, or 1.6 km), and rush hour or Saturday midday.
                </li>
                <li>
                  <strong>2. Search &amp; select:</strong> Search by street, neighbourhood, or project number (or open
                  the map) and pick up to 2 areas.
                </li>
                <li>
                  <strong>3. Review &amp; share:</strong> Check nearest frequent TTC stops and hourly departures, add
                  local notes, and print PDF or export JSON.
                </li>
              </ol>
            </details>

            <div className="g-examples-inline" aria-label="Quick examples">
              <span className="g-examples-label">Try example:</span>
              <a
                href={manifest?shareHash(manifest,{region:'scarborough',stage:'all',radius:400,period:'morning',minimum:0,onlyGaps:true},['1282_9685']):'#region=scarborough&radius=400&gaps=1'}
                className="g-example-pill"
                onClick={e=>{
                  e.preventDefault();
                  openDemo({
                    region:'scarborough',
                    link:manifest?shareHash(manifest,{region:'scarborough',stage:'all',radius:400,period:'morning',minimum:0,onlyGaps:true},['1282_9685']):'#region=scarborough&radius=400&gaps=1',
                    analysis:manifest?.id,
                  });
                }}
              >
                Scarborough 400 m
              </a>
              <a
                href={manifest?shareHash(manifest,{region:'north-york',stage:'all',radius:800,period:'morning',minimum:0,onlyGaps:true},['1257_9683','1260_9688']):'#region=north-york&radius=800&gaps=1'}
                className="g-example-pill"
                onClick={e=>{
                  e.preventDefault();
                  openDemo({
                    region:'north-york',
                    link:manifest?shareHash(manifest,{region:'north-york',stage:'all',radius:800,period:'morning',minimum:0,onlyGaps:true},['1257_9683','1260_9688']):'#region=north-york&radius=800&gaps=1',
                    analysis:manifest?.id,
                  });
                }}
              >
                North York 800 m
              </a>
              {demos
                .filter(d=>(submissionRegions as readonly string[]).includes(d.region))
                .map(d=>{
                  const label=d.region==='downtown'?'Downtown 800 m':'Midtown 800 m';
                  return (
                    <a
                      key={d.region}
                      href={d.link}
                      className="g-example-pill"
                      onClick={e=>{
                        e.preventDefault();
                        openDemo(d);
                      }}
                    >
                      {label}
                    </a>
                  );
                })}
            </div>
          </div>
        </section>

        {error&&(
          <div role="alert" className="g-warning g-no-print">
            {error}{' '}
            <button type="button" onClick={()=>setRetry(x=>x+1)}>
              Retry
            </button>
          </div>
        )}

        {manifest&&(
          <>
            <section id="g-controls" className="g-controls g-no-print" aria-labelledby="g-controls-title">
              <h2 id="g-controls-title" className="g-sr-only">
                Study region, search, and transit filters
              </h2>

              <div className="g-controls-top">
                <div className="g-region-wrap">
                  <span className="g-field-label" id="g-region-label">
                    Study region
                  </span>
                  <div className="g-regions" role="group" aria-labelledby="g-region-label">
                    {manifest.regions
                      .filter(r=>(submissionRegions as readonly string[]).includes(r.id))
                      .map(r=>(
                        <button
                          type="button"
                          key={r.id}
                          aria-pressed={filters.region===r.id}
                          onClick={()=>{
                            patch({region:r.id});
                            setSearch('');
                          }}
                        >
                          {regionShortNames[r.id]||regionNames[r.id]||r.label}
                        </button>
                      ))}
                  </div>
                </div>

                <div className="g-search-field">
                  <label htmlFor="g-search">Search street, neighbourhood, or project #</label>
                  <div className="g-search-input-wrap">
                    <input
                      id="g-search"
                      type="search"
                      value={search}
                      onChange={e=>setSearch(e.target.value)}
                      placeholder={`Search ${activeRegionLabel} (e.g. Moss Park, Annex, Yonge St, 25 120999)`}
                    />
                    {search&&(
                      <button
                        type="button"
                        className="g-btn-secondary"
                        onClick={()=>setSearch('')}
                        aria-label="Clear search query"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  aria-expanded={showMap}
                  onClick={()=>setShowMap(v=>!v)}
                  className="g-map-toggle"
                >
                  {showMap?'Hide area map':'Show area map'}
                </button>
              </div>

              <details className="g-advanced-filters" open={!compact}><summary>Transit and proposal filters</summary><div className="g-filter-row">
                <label htmlFor="filter-stage">
                  Proposal stage
                  <select
                    id="filter-stage"
                    value={filters.stage}
                    onChange={e=>patch({stage:e.target.value})}
                  >
                    <option value="all">Under Review + Active (unbuilt)</option>
                    <option value="Under Review">Under Review only</option>
                    <option value="Active">Active only (City pipeline)</option>
                    <option value="Built">Built (completed)</option>
                  </select>
                </label>

                <label htmlFor="filter-radius">
                  Distance to frequent TTC
                  <select
                    id="filter-radius"
                    value={filters.radius}
                    onChange={e=>patch({radius:Number(e.target.value)})}
                  >
                    {[400,800,1600].map(r=>(
                      <option key={r} value={r}>
                        {r===1600?'1,600 m (1.6 km · straight line)':`${r} m (straight line)`}
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor="filter-period">
                  Time of day
                  <select
                    id="filter-period"
                    value={filters.period}
                    onChange={e=>patch({period:e.target.value as Period})}
                  >
                    {periods.map(p=>(
                      <option value={p} key={p}>
                        {periodPlainLabels[p]}
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor="filter-minimum">
                  Min proposed homes
                  <input
                    id="filter-minimum"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="1000000"
                    value={filters.minimum}
                    onChange={e=>patch({minimum:Math.max(0,Math.min(1000000,Number(e.target.value)||0))})}
                  />
                </label>
              </div>

              </details><div className="g-controls-bottom">
                <label className="g-check" htmlFor="filter-only-gaps">
                  <input
                    id="filter-only-gaps"
                    type="checkbox"
                    checked={filters.onlyGaps}
                    onChange={e=>patch({onlyGaps:e.target.checked})}
                  />
                  <span>
                    Only show areas with proposals <strong>beyond {filters.radius} m</strong> of frequent TTC (≥4
                    departures/hr)
                  </span>
                </label>
                <p className={expired?'g-warning g-date':'g-date'}>
                  {expired?'Historical TTC snapshot · ':'TTC timetable · '}
                  {manifest.dates[filters.period]} · {periodLabels[filters.period]} · Feed{' '}
                  {formatFeedDate(manifest.feed.feed_start_date)}–{formatFeedDate(manifest.feed.feed_end_date)}
                </p>
              </div>

            </section>

            <div className={showMap?'g-explorer-split has-map':'g-explorer-split'}>
              {showMap&&(
                <Suspense fallback={<p role="status">Loading interactive map…</p>}>
                  <AreaMap
                    areas={results.map(r=>r.area)}
                    selected={selected}
                    onSelect={id=>{
                      const area=enrichedAreas.find(a=>a.id===id);
                      toggle(id,area?.label);
                    }}
                    region={filters.region}
                    filters={filters}
                  />
                </Suspense>
              )}

            <section id="growth-results" className="g-results g-no-print" tabIndex={-1} aria-labelledby="g-results-title">
              <p className="g-eyebrow">01 · EXPLORE AREAS</p>
              <div className="g-section-heading">
                <h2 id="g-results-title">
                  {filters.onlyGaps
                    ?`Areas beyond ${filters.radius} m of frequent TTC`
                    :`Included areas in ${activeRegionLabel}`}
                </h2>
                <p className="g-status-pill" role="status" aria-live="polite">
                  {loading
                    ?'Loading regional summary…'
                    :`${results.length} ${results.length===1?'area':'areas'} shown · ${selected.length}/2 selected`}
                </p>
              </div>

              {!loading&&!results.length&&(
                <div className="g-empty" role="status">
                  {search.trim()?(
                    <>
                      <p>
                        <strong>No areas shown for “{search.trim()}” under your current filters.</strong>
                      </p>
                      {searchMatches.length>0&&unfilteredSearchResults.length>0&&(
                        <div className="g-search-recovery">
                          <p>
                            Good news: <strong>{searchMatches.length}</strong>{' '}
                            {searchMatches.length===1?'area matches':'areas match'} “{search.trim()}” in{' '}
                            {activeRegionLabel}, but{' '}
                            {filters.onlyGaps
                              ?`all matching proposals are within ${filters.radius} m of frequent TTC service (or hidden by stage/unit filters).`
                              :'they are hidden by your current stage or minimum-units filters.'}
                          </p>
                          <button
                            type="button"
                            onClick={()=>{
                              patch({onlyGaps:false,minimum:0,stage:'all'});
                              setNotice(`Showing all ${unfilteredSearchResults.length} areas matching "${search.trim()}" in ${activeRegionLabel}.`);
                            }}
                          >
                            Show all matching areas in {activeRegionLabel}
                          </button>
                        </div>
                      )}
                      {searchMatches.length===0&&otherRegion&&otherRegionMatches.length>0&&(
                        <div className="g-search-recovery">
                          <p>
                            Found <strong>{otherRegionMatches.length}</strong> matching{' '}
                            {otherRegionMatches.length===1?'area':'areas'} in{' '}
                            <strong>{regionShortNames[otherRegion]}</strong>.
                          </p>
                          <button
                            type="button"
                            onClick={()=>{
                              patch({region:otherRegion});
                              setNotice(`Switched to ${regionShortNames[otherRegion]}.`);
                            }}
                          >
                            Switch to {regionShortNames[otherRegion]}
                          </button>
                        </div>
                      )}
                      {searchMatches.length===0&&otherRegionMatches.length===0&&neighbourhoodHint&&(
                        <div className="g-search-recovery">
                          <p>
                            <strong>{neighbourhoodHint.name}</strong> is inside the{' '}
                            <strong>{regionShortNames[neighbourhoodHint.regionId]}</strong> study area. No cells in{' '}
                            {activeRegionLabel} matched that query directly; try switching regions or searching a
                            street name or project number.
                          </p>
                          {neighbourhoodHint.regionId!==filters.region&&(
                            <button
                              type="button"
                              onClick={()=>{
                                patch({region:neighbourhoodHint.regionId});
                                setNotice(`Switched to ${regionShortNames[neighbourhoodHint.regionId]}.`);
                              }}
                            >
                              Switch to {regionShortNames[neighbourhoodHint.regionId]}
                            </button>
                          )}
                        </div>
                      )}
                      {searchMatches.length===0&&outsideTermMatch&&(
                        <p>
                          <strong>Outside City of Toronto coverage:</strong> This release covers all 158 City of
                          Toronto neighbourhoods across the 4 Community Councils, not neighbouring GTA municipalities.
                        </p>
                      )}
                      {searchMatches.length===0&&outcomeMatches.length>0&&(
                        <div className="g-outcome-hits">
                          <p>
                            <strong>Found in City pipeline accounting (not mapped in active cells):</strong>
                          </p>
                          <ul>
                            {outcomeMatches.map(o=>(
                              <li key={o.number}>
                                <strong>{o.label}</strong> ({o.number}) —{' '}
                                {outcomeReasonLabels[o.reason]?.title||o.reason.replaceAll('_',' ')}
                                {o.raw_units?` · ${o.raw_units} raw units`:''}.{' '}
                                <span className="g-hint">{outcomeReasonLabels[o.reason]?.detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ):(
                    <>
                      <p>
                        <strong>No areas match these filters.</strong> Every included proposal in {activeRegionLabel}{' '}
                        under these settings is within {filters.radius} m of a stop with 4+ scheduled departures/hour
                        (which does not measure capacity or crowding).
                      </p>
                      {filters.onlyGaps&&(
                        <button
                          type="button"
                          onClick={()=>{
                            patch({onlyGaps:false});
                            setNotice(`Showing all areas with included proposals in ${activeRegionLabel}.`);
                          }}
                        >
                          Show all areas in {activeRegionLabel}
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="g-cards">
                {results.slice(0,limit).map(({area,projects,units,lackingUnits,lacking})=>{
                  const isSelected=selected.includes(area.id);
                  const withinUnits=units-lackingUnits;
                  const neighbourhood=area.neighbourhood||cellNeighbourhoods[area.id]||'Toronto';
                  const view3d=cellsWith3dView[area.id];
                  const sampleStreets=area.projects.slice(0,2).map(p=>p.label).join(', ');
                  const extraCount=area.projects.length-2;
                  return (
                    <article key={area.id} className={isSelected?'g-card-selected':undefined}>
                      <div className="g-card-top">
                        <span className={`g-badge ${lacking>0?'g-badge-beyond':'g-badge-within'}`}>
                          <span aria-hidden="true">{lacking>0?'▲':'✓'}</span>{' '}
                          {lacking>0
                            ?`Beyond ${filters.radius} m frequent TTC`
                            :`Within ${filters.radius} m frequent TTC`}
                        </span>
                      </div>
                      <p className="g-card-eyebrow">
                        {neighbourhood}
                      </p>
                      <h3>Near {area.label}</h3>
                      <p className="g-big">{display(filters.onlyGaps?lackingUnits:units)}</p>
                      <p className="g-big-label">
                        {filters.onlyGaps
                          ?`proposed homes beyond ${filters.radius} m`
                          :'proposed homes in area'}
                      </p>
                      <p className="g-card-split">
                        {display(withinUnits)} within {filters.radius} m · {display(lackingUnits)} beyond · {projects}{' '}
                        {projects===1?'proposal':'proposals'}
                      </p>
                      <p className="g-card-streets">
                        Includes: {sampleStreets}
                        {extraCount>0?` (+${extraCount} more)`:''}
                      </p>
                      <div className="g-card-actions">
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          aria-label={
                            isSelected
                              ?`Remove Near ${area.label} (${neighbourhood}, cell ${area.id}) from comparison`
                              :`Compare Near ${area.label} (${neighbourhood}, cell ${area.id})`
                          }
                          onClick={()=>toggle(area.id,area.label)}
                        >
                          {isSelected?'Selected ✓':'Compare area'}
                        </button>
                        {view3d&&(
                          <a
                            className="g-card-3d"
                            href={build3dHash({modelRegion:view3d.region,cell:area.id})}
                            aria-label={`View Near ${area.label} (${neighbourhood}, cell ${area.id}) in 3D model`}
                          >
                            View in 3D model ↗
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              {results.length>limit&&(
                <button type="button" onClick={()=>setLimit(n=>n+12)}>
                  Show more areas ({limit} of {results.length} shown)
                </button>
              )}
            </section>
            </div>

            <section className="g-methodology g-no-print" aria-labelledby="g-methodology-title">
              <h2 id="g-methodology-title" className="g-sr-only">
                Methodology, data completeness, and limitations
              </h2>
              <details id="methodology-drawer">
                <summary>
                  <span className="g-summary-title">
                    <span className="g-chevron" aria-hidden="true">▾</span>
                    <span>Methodology, data completeness &amp; limitations</span>
                  </span>
                  <span className="g-summary-meta">
                    {display(manifest.accounting.regional[filters.region]?.included||0)} matched groups in{' '}
                    {activeRegionLabel} · {display(manifest.accounting.input_records)} City records reviewed
                  </span>
                </summary>
                <div className="g-methodology-body">
                  <p>
                    <strong>How screening works:</strong> {manifest.method} “Frequent TTC service” means at least 4
                    scheduled departures in each hour of the selected 2-hour window (departure spacing is not assessed)
                    at one stop on one route-direction. Cards are ordered by proposed homes—there is no overall ranking
                    score.
                  </p>
                  <p>
                    <strong>Key limitations:</strong> Proximity is straight-line distance, not sidewalk safety,
                    crossings, hills, or room on board. Proposals may change or remain unbuilt, and unit counts reflect
                    City structured fields rather than confirmed final dwellings.
                  </p>
                  <ul>
                    {manifest.limitations.map(l=>(
                      <li key={l}>{l}</li>
                    ))}
                  </ul>

                  <p>
                    <strong>Completeness &amp; exclusions ({activeRegionLabel}):</strong> All{' '}
                    {display(manifest.accounting.input_records)} City source rows are accounted for. Because Community
                    Council and focus views can overlap across shared neighbourhood boundaries, do not add regional
                    counts together.
                  </p>
                  <ul>
                    {Object.entries(manifest.accounting.regional[filters.region]||{}).map(([k,v])=>(
                      <li key={k}>
                        {outcomeReasonLabels[k]?.title||k.replaceAll('_',' ')}: {display(v)} groups
                      </li>
                    ))}
                    <li>
                      City-wide unassigned records: {display(manifest.accounting.unassigned_groups)} (
                      {display(manifest.accounting.outcomes.outside_study_areas||0)} outside study areas,{' '}
                      {display(manifest.accounting.outcomes.unresolved_location||0)} unresolved addresses)
                    </li>
                  </ul>
                  <button type="button" onClick={loadOutcomes}>
                    {outcomes?'Excluded records loaded below':'Inspect excluded and unresolved records'}
                  </button>
                  {outcomes&&(
                    <div className="g-outcomes">
                      {outcomes
                        .filter(o=>o.reason!=='included'&&(o.regions.includes(filters.region)||!o.regions.length))
                        .slice(0,120)
                        .map(o=>(
                          <details key={o.number}>
                            <summary>
                              {o.label} · {outcomeReasonLabels[o.reason]?.title||o.reason.replaceAll('_',' ')}
                            </summary>
                            <p>
                              City project ref: {o.number}. Source rows: {o.record_ids.join(', ')}. Reported units:{' '}
                              {o.raw_units||'Unavailable'}.
                            </p>
                            {safeSource(o.source_url)&&(
                              <a href={safeSource(o.source_url)} target="_blank" rel="noreferrer">
                                Open City record ↗
                              </a>
                            )}
                          </details>
                        ))}
                      <p className="g-hint">
                        Showing first 120 matching excluded/outside records. Use Search above to look up a specific
                        street or project number.
                      </p>
                    </div>
                  )}

                  <p>
                    <strong>Study-area boundaries ({manifest.boundary_version}):</strong>
                  </p>
                  {manifest.study_areas?.map(r=>(
                    <p key={r.id}>
                      <strong>{r.label}:</strong>{' '}
                      {r.members
                        .map(x=>(typeof x==='string'?x:(x as {AREA_NAME?:string}).AREA_NAME||'Unnamed area'))
                        .join(', ')}
                    </p>
                  ))}

                  <p>
                    <strong>Official open data sources:</strong> Analysis {manifest.id} · planning{' '}
                    {manifest.planning_snapshot} · transit {manifest.transit_snapshot}
                  </p>
                  <ul>
                    {Object.entries(manifest.planning_sources).map(([k,s])=>(
                      <li key={k}>
                        <a href={s.page} target="_blank" rel="noreferrer">
                          {k} ↗
                        </a>{' '}
                        (retrieved {s.retrieved_at})
                      </li>
                    ))}
                    <li>
                      <a href={manifest.transit_source.page} target="_blank" rel="noreferrer">
                        TTC GTFS timetable ↗
                      </a>{' '}
                      (retrieved {manifest.transit_source.retrieved_at})
                    </li>
                    {manifest.boundary_sources?.map(s=>(
                      <li key={s.page}>
                        <a href={s.page} target="_blank" rel="noreferrer">
                          Boundary source ↗
                        </a>{' '}
                        (retrieved {s.retrieved_at})
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </section>

            <header className="g-print-header" aria-hidden="true">
              <p className="g-eyebrow">ASTER · COMMUNITY INVESTIGATION BRIEF</p>
              <h2>Housing Proposals &amp; Scheduled TTC Service</h2>
              <p>
                <strong>Study area:</strong> {regionNames[filters.region]||activeRegionLabel} ·{' '}
                <strong>Stage:</strong> {stageSummary} · <strong>Distance ring:</strong> {filters.radius} m
                (straight line) · <strong>Period:</strong> {periodPlainLabels[filters.period]} (
                {manifest.dates[filters.period]})
              </p>
              <p>
                <strong>Frequent service rule:</strong> ≥ 4 scheduled departures in each hour at one stop on one
                route-direction (departure spacing is not assessed). Proximity is straight-line distance, not walking
                route or vehicle capacity.
              </p>
              <p>
                Analysis {manifest.id} · Planning snapshot {manifest.planning_snapshot} · TTC snapshot{' '}
                {manifest.transit_snapshot}
              </p>
            </header>

            <section className="g-compare" aria-labelledby="g-compare-title">
              <p className="g-eyebrow g-no-print">02 · COMPARE &amp; UNDERSTAND</p>
              <h2 id="g-compare-title">Compare &amp; understand your selected areas</h2>
              {!selected.length?(
                <p className="g-compare-empty">
                  Select up to two areas above to compare proposed homes within vs. beyond frequent TTC across all
                  three distance rings (400 m, 800 m, 1.6 km) and time periods.
                </p>
              ):(
                <>
                  {!complete&&<p role="status">Loading selected evidence…</p>}
                  <div className="g-comparisons">
                    {selectedRows.map(area=>{
                      const effectiveRegion=area.regions.includes(filters.region)?filters.region:area.regions[0];
                      const summaryLike:AreaSummary={
                        ...area,
                        projects:area.projects.map(p=>({
                          ...p,
                          distances:Object.fromEntries(
                            periods.map(k=>[k,p.service[k]?.distance_m??null])
                          ) as Record<Period,number|null>,
                        })),
                      };
                      const currentMetrics=distanceBreakdown(summaryLike,{...filters,region:effectiveRegion});
                      const matchingProjects=area.projects.filter(
                        p=>
                          p.regions.includes(effectiveRegion)&&
                          (filters.stage==='all'?p.stage!=='Built':p.stage===filters.stage)
                      );
                      const distances=matchingProjects.flatMap(p=>periods.map(period=>p.service[period]?.distance_m??null));
                      const allWithin400=distances.length>0&&distances.every(d=>d!==null&&d<=400);
                      const farthest=distances.length&&distances.every(d=>d!==null)?Math.max(...distances as number[]):null;
                      const neighbourhood=area.neighbourhood||cellNeighbourhoods[area.id];
                      const view3d=cellsWith3dView[area.id];
                      const regionLabelList=area.regions
                        .filter(r=>submissionRegions.includes(r as 'downtown'|'midtown'))
                        .map(r=>regionShortNames[r]||r)
                        .join(' / ');

                      return (
                        <article key={area.id}>
                          <div className="g-comparison-summary">
                          <div className="g-compare-head">
                            <div>
                              <p className="g-card-eyebrow">
                                {neighbourhood?`${neighbourhood} · `:''}Cell {area.id} · {regionLabelList}
                              </p>
                              <h3>Near {area.label}</h3>
                            </div>
                            <div className="g-compare-actions g-no-print">
                              {view3d&&(
                                <a
                                  className="g-card-3d"
                                  href={build3dHash({modelRegion:view3d.region,cell:area.id})}
                                  aria-label={`View Near ${area.label} (${neighbourhood||area.id}) in 3D model`}
                                >
                                  View in 3D model ↗
                                </a>
                              )}
                              <button
                                type="button"
                                className="g-btn-secondary"
                                onClick={()=>toggle(area.id,area.label)}
                                aria-label={`Remove Near ${area.label} (cell ${area.id}) from comparison`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="g-takeaway">
                            <strong>
                              Summary ({periodPlainLabels[filters.period]}, {filters.radius} m):
                            </strong>{' '}
                            {currentMetrics.projects===0?(
                              <>No included proposal records match the selected stage in this area.</>
                            ):currentMetrics.noStopUnits>0?(
                              <>{display(currentMetrics.withinUnits)} reported proposed units within {filters.radius} m;{' '}
                                {display(currentMetrics.beyondUnits)} beyond {filters.radius} m;{' '}
                                {display(currentMetrics.noStopUnits)} with no qualifying stop in the feed. No-stop records do not have a measured distance.</>
                            ):currentMetrics.lackingUnits>0?(
                              <>
                                <strong>{display(currentMetrics.lackingUnits)}</strong> of{' '}
                                <strong>{display(currentMetrics.units)}</strong> proposed homes ({currentMetrics.lacking} of{' '}
                                {currentMetrics.projects} {currentMetrics.projects===1?'proposal':'proposals'}) are{' '}
                                <strong>beyond {filters.radius} m</strong> of a TTC stop with 4+ scheduled
                                departures/hour (departure spacing is not assessed).
                              </>
                            ):(
                              <>
                                All <strong>{display(currentMetrics.units)}</strong> proposed homes (
                                {currentMetrics.projects} {currentMetrics.projects===1?'proposal':'proposals'}) sit{' '}
                                <strong>within {filters.radius} m</strong> of a TTC stop with 4+ scheduled
                                departures/hour.
                              </>
                            )}
                          </div>

                          <div
                            className="g-table-wrap"
                            tabIndex={0}
                            role="region"
                            aria-label={`Distance sensitivity table for Near ${area.label}`}
                          >
                            <table>
                              <caption>
                                Reported proposed units within / beyond each TTC distance threshold ({stageSummary})
                              </caption>
                              <thead>
                                <tr>
                                  <th scope="col">Time period</th>
                                  {[400,800,1600].map(r=>(
                                    <th scope="col" key={r}>
                                      {r===1600?'1,600 m':`${r} m`}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {periods.map(period=>(
                                  <tr key={period}>
                                    <th scope="row">
                                      {periodLabels[period]}
                                      <small>{manifest.dates[period]}</small>
                                    </th>
                                    {[400,800,1600].map(radius=>{
                                      const counts=distanceBreakdown(summaryLike,{...filters,region:effectiveRegion,period,radius});
                                      return <td key={radius} className="g-distance-counts">
                                        {counts.projects===0?<span>No included records</span>:<>
                                          <span className="g-distance-within"><strong>{display(counts.withinUnits)}</strong> within</span>
                                          <span className="g-distance-beyond"><strong>{display(counts.beyondUnits)}</strong> beyond</span>
                                          {counts.noStopUnits>0&&<span className="g-distance-unavailable">{display(counts.noStopUnits)} with no qualifying stop in the feed</span>}
                                        </>}
                                      </td>;
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <p className="g-distance-explanation">
                            {matchingProjects.length===0?'No included proposal records match the selected stage in this area.':allWithin400?<>
                              <strong>All {display(currentMetrics.units)} reported proposed units are within 400 m in all three dated periods.</strong>{' '}
                              Zero beyond means no included units fall outside the threshold; it does not mean there are no housing proposals.
                            </>:<>Each cell shows both sides of the distance threshold. Counts refer to reported proposed units in the included records.</>}
                            {farthest!==null&&<> The farthest included proposal point is about {Math.round(farthest)} m from a qualifying stop, taking the largest distance across these periods.</>}{' '}
                            Distances are straight-line. This does not establish safe walking access or sufficient service capacity.
                          </p>
                          </div>

                          <div className="g-no-print">
                            {matchingProjects.map(p=>(
                              <details key={p.number}>
                                <summary>
                                  {p.label} · {display(p.units)} proposed homes · {p.stage}
                                </summary>
                                <p>{p.description||'No description supplied by publisher.'}</p>
                                <p>
                                  City ref: <strong>{p.number}</strong> · Coordinates: {p.geometry_origin}
                                </p>
                                <p>
                                  <strong>Nearest TTC stop (any frequency):</strong>{' '}
                                  {p.nearest_stop
                                    ?`${p.nearest_stop.name} (${Math.round(p.nearest_stop.distance_m)} m)`
                                    :'Unavailable'}
                                </p>
                                {periods.map(period=>{
                                  const s=p.service[period];
                                  const within=s&&s.distance_m<=filters.radius;
                                  return (
                                    <p key={period}>
                                      <strong>{periodLabels[period]}:</strong>{' '}
                                      {s?(
                                        <>
                                          {within?'Within':'Beyond'} {filters.radius} m — {s.name} (
                                          {Math.round(s.distance_m)} m).{' '}
                                          {s.services
                                            ?.map(
                                              r=>
                                                `Route ${r.route_name} (dir ${r.direction}): ${describeHourlyDepartures(
                                                  r.hourly_departures
                                                )}`
                                            )
                                            .join('; ')}
                                        </>
                                      ):(
                                        'No TTC stop meeting 4+ departures/hr found in this window.'
                                      )}
                                    </p>
                                  );
                                })}
                                <div className="g-proposal-links">
                                  {safeSource(p.source_url)&&(
                                    <a href={safeSource(p.source_url)} target="_blank" rel="noreferrer">
                                      Open City of Toronto record ↗
                                    </a>
                                  )}
                                  {view3d&&(
                                    <a
                                      className="g-card-3d"
                                      href={build3dHash({
                                        modelRegion:view3d.region,
                                        cell:area.id,
                                        proposal:p.number,
                                      })}
                                    >
                                      View in 3D model ↗
                                    </a>
                                  )}
                                </div>
                              </details>
                            ))}
                          </div>

                          <div className="g-print-proposals">
                            <h4>Included proposals in this cell ({matchingProjects.length})</h4>
                            {matchingProjects.map(p=>{
                              const s=p.service[filters.period];
                              return (
                                <div key={p.number} className="g-print-proposal-item">
                                  <p>
                                    <strong>{p.label}</strong> · {display(p.units)} proposed homes · {p.stage} · Ref{' '}
                                    {p.number}
                                  </p>
                                  <p>
                                    Nearest stop (any):{' '}
                                    {p.nearest_stop
                                      ?`${p.nearest_stop.name} (${Math.round(p.nearest_stop.distance_m)} m)`
                                      :'Unavailable'}
                                    {' · '}
                                    Nearest frequent stop ({periodLabels[filters.period]}):{' '}
                                    {s
                                      ?`${s.name} (${Math.round(s.distance_m)} m) — ${s.services
                                          ?.map(
                                            r=>
                                              `Route ${r.route_name}, direction ${r.direction}: ${describeHourlyDepartures(
                                                r.hourly_departures
                                              )}`
                                          )
                                          .join('; ')}`
                                      :'No qualifying stop in feed window'}
                                  </p>
                                  {p.source_url&&<p className="g-print-url">Source: {p.source_url}</p>}
                                </div>
                              );
                            })}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            <div id="energy-panel-container" tabIndex={-1}>
              <Suspense fallback={<p role="status">Opening energy &amp; water evidence…</p>}>
                <EnergyPanel
                  region={filters.region}
                  pins={energyPins}
                  controlsVisible={showEnergy}
                  onToggleControls={()=>setShowEnergy(x=>!x)}
                  onPins={setEnergyPins}
                  onBrief={setEnergyBrief}
                />
              </Suspense>
            </div>

            <section className="g-brief" id="community-brief" tabIndex={-1} aria-labelledby="g-brief-title">
              <p className="g-eyebrow g-no-print">04 · PREPARE A COMMUNITY BRIEF</p>
              <h2 id="g-brief-title" className="g-no-print">
                Prepare a community brief
              </h2>
              <p className="g-no-print">
                Add your local context or questions below, then print/save a PDF or export JSON. Everything runs locally
                in your browser.
              </p>

              <BriefExtras areas={selectedRows} filters={filters} view3dHash={view3dHash}/>

              <div className="g-print-context">
                <h3>Your community interpretation &amp; questions</h3>
                <p style={{whiteSpace:'pre-wrap'}}>
                  {conclusion.trim()||'No written interpretation or questions were entered before printing.'}
                </p>

                <h3>Methodology, study-area scope &amp; data limitations</h3>
                <p>{manifest.method}</p>
                <p>
                  <strong>Study-area boundaries ({manifest.boundary_version}):</strong>{' '}
                  {manifest.study_areas
                    ?.map(
                      r=>
                        `${r.label}: ${r.members
                          .map(x=>(typeof x==='string'?x:(x as {AREA_NAME?:string}).AREA_NAME||'Unnamed area'))
                          .join(', ')}`
                    )
                    .join(' | ')}
                </p>
                <ul>
                  {manifest.limitations.map(l=>(
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <h3>Official source provenance</h3>
                <p>
                  Planning snapshot {manifest.planning_snapshot}; TTC timetable snapshot {manifest.transit_snapshot};
                  analysis {manifest.id}.
                </p>
                {Object.entries(manifest.planning_sources).map(([k,s])=>(
                  <p key={k} className="g-print-url">
                    {k}: {s.page} (retrieved {s.retrieved_at})
                  </p>
                ))}
                <p className="g-print-url">
                  TTC GTFS: {manifest.transit_source.page} (retrieved {manifest.transit_source.retrieved_at})
                </p>
                {manifest.boundary_sources?.map(s=>(
                  <p key={s.page} className="g-print-url">
                    Boundary source: {s.page} (retrieved {s.retrieved_at})
                  </p>
                ))}
              </div>

              <div className="g-no-print">
                <label htmlFor="brief-conclusion">
                  Your interpretation and questions
                  <textarea
                    id="brief-conclusion"
                    value={conclusion}
                    onChange={e=>setConclusion(e.target.value)}
                    placeholder="Note local walking conditions, bus crowding, or questions for your councillor or planner…"
                  />
                </label>
                <p className="g-hint">
                  Notes stay on your device unless you print/save PDF or export JSON. Shared links keep filters and
                  selected areas.
                </p>
                <div className="g-actions">
                  <button type="button" disabled={!complete} onClick={()=>window.print()}>
                    Print / Save as PDF
                  </button>
                  <button type="button" disabled={!complete} onClick={exportBrief}>
                    Export evidence &amp; brief (JSON)
                  </button>
                  <button type="button" onClick={share}>
                    Copy reproducible link
                  </button>
                </div>
                {!complete&&(
                  <p className="g-hint">{!energyReady?'Wait for the selected energy evidence to load, or deselect it, before printing or exporting.':'Select at least one area above to enable Print/PDF and JSON export.'}</p>
                )}
              </div>

              <p role="status" aria-live="polite" className="g-live-notice">
                {notice}
              </p>
              <p className="g-print-link">Reproduce this exact view: {location.href}</p>
            </section>
          </>
        )}

        {!manifest&&!error&&(
          <p role="status" aria-live="polite">
            Opening the screening snapshot…
          </p>
        )}
      </main>

      <footer>
        <p>
          Advisory open-data screening tool — not an official City of Toronto ranking or endorsement.{' '}
          {manifest?.attribution}{' '}
          {manifest?.licence_url&&(
            <a href={manifest.licence_url} target="_blank" rel="noreferrer">
              Open Data Licence ↗
            </a>
          )}
        </p>
      </footer>
    </div>
  );
}
