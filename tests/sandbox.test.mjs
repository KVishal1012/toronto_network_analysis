import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const downtown=JSON.parse(fs.readFileSync(new URL('../src/sandbox/downtown.json',import.meta.url)));
const source=fs.readFileSync(new URL('../src/sandbox/model.ts',import.meta.url),'utf8').replace("import downtown from './downtown.json';",`const downtown=${JSON.stringify(downtown)};`);
const {starter,put,validate,corners,overlap}=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
const free=[];for(let x=-150;x<=150;x+=20)for(let z=-150;z<=150;z+=20){const p={id:'a',kind:'volume',x,z,rotation:0,height:12,width:4,depth:4};try{put(starter(),p);free.push(p);}catch{}}
test('Downtown baseline is content-derived and design round trips',()=>{assert.match(downtown.id,/^[a-f0-9]{64}$/);assert.equal(starter().plots.length,0);const s=put(starter(),free[0]);assert.deepEqual(validate(JSON.parse(JSON.stringify(s))),s);assert.throws(()=>validate({...s,baseline:'other'}));});
test('metric placement, movement and duplicate identities',()=>{const s=put(starter(),free[0]);assert.equal(put(s,{...free[1],id:'a'}).plots.length,1);assert.throws(()=>put(s,{...free[0],id:'b'}),/overlap/);assert.throws(()=>validate({...s,plots:[free[0],free[0]]}));});
test('rotated boundary and source massing collisions rejected',()=>{assert.throws(()=>put(starter(),{...free[0],x:157,z:157,width:10,depth:10,rotation:45}),/boundary/);const b=downtown.buildings[0];const poly=b.geometry.type==='Polygon'?b.geometry.coordinates:b.geometry.coordinates[0];const [x,z]=poly[0][0];assert.throws(()=>put(starter(),{...free[0],x,z}),/massing|boundary/);});
test('collision checks include holes, edge touches and rotated footprints',()=>{const poly=[[[0,0],[20,0],[20,20],[0,20],[0,0]],[[5,5],[15,5],[15,15],[5,15],[5,5]]];assert.equal(overlap([[7,7],[9,7],[9,9],[7,9]],poly),false);assert.equal(overlap([[4,4],[6,4],[6,6],[4,6]],poly),true);assert.equal(overlap([[-2,2],[0,2],[0,4],[-2,4]],poly),true);const r=corners({...free[0],x:10,z:10,width:6,depth:6,rotation:45});assert.equal(overlap(r,poly),false);});
test('legacy files and nonfinite dimensions fail without relocation',()=>{assert.throws(()=>validate({schema:2,baseline:'downtown-city-hall-320m-v1',name:'old',plots:[]}));for(const patch of [{height:0},{rotation:360},{depth:NaN},{kind:'road'}])assert.throws(()=>put(starter(),{...free[0],...patch}));});
