import test from 'node:test';import assert from 'node:assert/strict';
// Pure calculations are extracted without bundler-only provider imports.
import fs from 'node:fs';import {stripTypeScriptTypes} from 'node:module';
const source=fs.readFileSync(new URL('../src/planning/screening.ts',import.meta.url),'utf8').split('export function createScreeningProvider')[0];
const mod=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
const f={region:'downtown',stage:'all',radius:800,period:'morning',minimum:0,onlyGaps:true};
const area={id:'1_2',label:'Example',regions:['downtown','midtown'],projects:[{number:'a',units:100,stage:'Active',regions:['downtown','midtown'],distances:{morning:800,evening:900,saturday:null}},{number:'b',units:200,stage:'Built',regions:['downtown'],distances:{morning:900,evening:900,saturday:900}}]};
test('boundary equality is within threshold; Built excluded by default',()=>{assert.equal(mod.shortlist([area],f).length,0);assert.equal(mod.metrics(area,f).units,100);});
test('period sensitivity is explicit',()=>{assert.equal(mod.shortlist([area],{...f,period:'evening'})[0].lackingUnits,100);});
test('overlap is filtered without duplicate units',()=>{assert.equal(mod.metrics(area,{...f,region:'midtown'}).units,100);});
test('pins restore complete filter state',()=>{const m={id:'a'.repeat(20),planning_snapshot:'b',transit_snapshot:'c'};const hash=mod.shareHash(m,f,['1_2']);const p=mod.parseScreeningLink(hash);assert.deepEqual(p.filters,f);assert.deepEqual(p.areas,['1_2']);});

// Check generated demonstration receipts against the application's calculations.
import {gunzipSync} from 'node:zlib';
test('all regional demonstrations reproduce the shipped shortlist and sensitivity',()=>{
 const demos=JSON.parse(fs.readFileSync(new URL('../docs/growth-transit/regional-demonstrations.json',import.meta.url),'utf8'));
 for(const d of demos){
  const base=new URL(`../public/screening/${d.analysis}/`,import.meta.url);
  const areas=JSON.parse(gunzipSync(fs.readFileSync(new URL(`regions/${d.region}.json.gz`,base))));
  const parsed=mod.parseScreeningLink(d.link);
  assert.equal(mod.shortlist(areas,parsed.filters).length,d.candidate_areas);
  for(const a of d.selected){
   const source=areas.find(x=>x.id===a.id);assert.ok(source);
   for(const [period,values] of Object.entries(a.sensitivity))for(const [radius,units] of Object.entries(values)){
    assert.equal(mod.metrics(source,{...parsed.filters,period,radius:Number(radius)}).lackingUnits,units);
   }
  }
 }
});

test('citizen search matches grid ID, street label, and project number tokens',()=>{
 const sample={
  id:'1257_9683',
  label:'2779 YONGE ST',
  regions:['midtown'],
  projects:[
   {number:'25 120999 NNY 08 OZ',label:'2704 YONGE ST',units:202,stage:'Active',regions:['midtown'],distances:{morning:873.666,evening:873.666,saturday:873.666}},
  ],
 };
 assert.equal(mod.matchesAreaSearch(sample,''),true);
 assert.equal(mod.matchesAreaSearch(sample,'2704 yonge'),true);
 assert.equal(mod.matchesAreaSearch(sample,'120999'),true);
 assert.equal(mod.matchesAreaSearch(sample,'1257_9683'),true);
 assert.equal(mod.matchesAreaSearch(sample,'yonge 120999'),true);
 assert.equal(mod.matchesAreaSearch(sample,'spadina'),false);
 assert.equal(mod.matchesAreaSearch(sample,'Yonge-Eglinton','Yonge-Eglinton'),true);
 assert.equal(mod.matchesAreaSearch(sample,'yonge eglinton','Yonge-Eglinton'),true);
 assert.equal(mod.matchesAreaSearch({...sample,neighbourhood:'Moss Park'},'moss park'),true);
 assert.equal(mod.matchesAreaSearch(sample,'st clair','Yonge-St.Clair'),true);
 assert.equal(mod.matchesAreaSearch(sample,'annex','Moss Park'),false);
});

test('plain-language helpers format feed dates, departures, and exclusion reasons honestly',()=>{
 assert.equal(mod.formatFeedDate('20261105'),'2026-11-05');
 assert.equal(mod.formatFeedDate('2026-11-05'),'2026-11-05');
 assert.equal(mod.describeHourlyDepartures([4,4]),'4 scheduled departures/hr; counts do not establish even spacing');
 assert.equal(mod.describeHourlyDepartures([9,10]),'9–10 scheduled departures/hr; counts do not establish even spacing');
 assert.equal(mod.outcomeReasonLabels.outside_study_areas.title,'Outside Downtown & Midtown study areas');
});
