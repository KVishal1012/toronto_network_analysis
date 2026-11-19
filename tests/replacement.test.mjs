import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {stripTypeScriptTypes} from 'node:module';
const baseline=JSON.parse(fs.readFileSync(new URL('../src/sandbox/downtown.json',import.meta.url)));
const model=stripTypeScriptTypes(fs.readFileSync(new URL('../src/sandbox/model.ts',import.meta.url),'utf8').replace("import downtown from './downtown.json';",`const downtown=${JSON.stringify(baseline)};`));const url='data:text/javascript;base64,'+Buffer.from(model).toString('base64');
const raw=stripTypeScriptTypes(fs.readFileSync(new URL('../src/sandbox/replacement.ts',import.meta.url),'utf8')).replace("'./model'",JSON.stringify(url));const {validateReplacement,footprintArea,consequences,validStartingVolume,nearestEditableBuilding}=await import('data:text/javascript;base64,'+Buffer.from(raw).toString('base64'));
const building=(id,x,height=20)=>({id,height,height_source:'test fixture',geometry:{type:'Polygon',coordinates:[[[x-5,-5],[x+5,-5],[x+5,5],[x-5,5],[x-5,-5]]]}});
const ref={id:'pinned-test-fixture',extent_m:100,buildings:[building('a',0),building('b',30)]};const replacement={schema:1,baseline:ref.id,removed:'a',volume:{id:'r',kind:'volume',x:0,z:0,width:8,depth:8,height:40,rotation:0}};
test('removed source is excluded from conflicts; remaining context preserved',()=>{assert.equal(validateReplacement(ref,replacement).removed,'a');assert.equal(ref.buildings.length,2);assert.throws(()=>validateReplacement(ref,{...replacement,volume:{...replacement.volume,x:30}}),/intersects/);});
test('comparison uses source footprint including holes and source heights',()=>{const r=validateReplacement(ref,replacement),m=consequences(ref,r);assert.equal(m.oldArea,100);assert.equal(m.newArea,64);assert.equal(m.volumeChange,560);assert.equal(m.heightChange,20);const b=building('h',0);b.geometry.coordinates.push([[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]]);assert.equal(footprintArea(b),96);});
test('baseline mismatch, invalid dimensions and rotated boundary fail',()=>{assert.throws(()=>validateReplacement(ref,{...replacement,baseline:'other'}));assert.throws(()=>validateReplacement(ref,{...replacement,removed:'missing'}));assert.throws(()=>validateReplacement(ref,{...replacement,volume:{...replacement.volume,height:Infinity}}));assert.throws(()=>validateReplacement(ref,{...replacement,volume:{...replacement.volume,x:48,z:48,rotation:45}}),/boundary/);});
test('exported replacement round trip keeps identity and dimensions',()=>{const first=validateReplacement(ref,replacement);assert.deepEqual(validateReplacement(ref,JSON.parse(JSON.stringify(first))),first);});

test('starting box is valid when the original bounding envelope hits a neighbour',()=>{
 const b=building('a',0);const obstacle=building('b',8);
 const context={id:'fixture-fit',extent_m:100,buildings:[b,obstacle]};
 const fitted=validStartingVolume(context,b);assert.ok(fitted);assert.doesNotThrow(()=>validateReplacement(context,{schema:1,baseline:context.id,removed:'a',volume:fitted}));
});
test('no safe starter is returned for a source footprint entirely occupied by another feature',()=>{
 const b=building('a',0);assert.equal(validStartingVolume({id:'fixture-covered',extent_m:100,buildings:[b,building('b',0)]},b),null);
});
test('nearestEditableBuilding recovers from a blocked feature without weakening collision checks',()=>{
 const blocked=building('a',0);const overlapper=building('b',0);const freeNear=building('c',20);const freeFar=building('d',40);
 const context={id:'fixture-recovery',extent_m:100,buildings:[blocked,overlapper,freeFar,freeNear]};
 assert.equal(validStartingVolume(context,blocked),null);
 const recovery=nearestEditableBuilding(context,blocked);
 assert.ok(recovery);
 assert.equal(recovery.building.id,'c');
 assert.equal(recovery.distance_m,20);
 assert.doesNotThrow(()=>validateReplacement(context,{schema:1,baseline:context.id,removed:recovery.building.id,volume:recovery.volume}));
});
test('Downtown and Midtown 3D views both provide dependable editable proposal examples',()=>{
 const views=JSON.parse(fs.readFileSync(new URL('../src/sandbox/architectural.json',import.meta.url)));
 const propSrc=fs.readFileSync(new URL('../src/sandbox/proposals-3d.ts',import.meta.url),'utf8');
 const proposals=JSON.parse(propSrc.split('export const proposals3d: Proposal3D[] = ')[1].trim().replace(/;$/,''));
 for(const view of views){
  const editableProp=proposals.filter(p=>p.region===view.region).find(p=>{
   const b=view.buildings.find(x=>x.id===p.nearestBuildingId);
   return b&&validStartingVolume(view,b)!==null;
  });
  assert.ok(editableProp,`Expected a dependable editable proposal in ${view.region}`);
  const b=view.buildings.find(x=>x.id===editableProp.nearestBuildingId);
  const start=validStartingVolume(view,b);
  assert.ok(start);
  assert.doesNotThrow(()=>validateReplacement(view,{schema:1,baseline:view.id,removed:b.id,volume:start}));
 }
});
