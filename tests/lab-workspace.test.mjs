import test from 'node:test';
import assert from 'node:assert/strict';
import {validView,PRESETS,radiusComparison} from '../src/lab/workspace.ts';
test('viewpoint validation rejects corrupt coordinates and preserves supported presets',()=>{assert.ok(PRESETS.every(validView));for(const v of [{...PRESETS[0],lon:NaN},{...PRESETS[0],height:-2},{...PRESETS[0],lat:0},{...PRESETS[0],pitch:-100}])assert.equal(validView(v),false);});
test('radius sensitivity validates nested record membership, not just counts',()=>{assert.deepEqual(radiusComparison([{radius:400,ids:['a'],coverage:true},{radius:800,ids:['a','b'],coverage:true},{radius:1600,ids:['a','b','c'],coverage:true}]).map(r=>r.added),[0,1,1]);assert.throws(()=>radiusComparison([{radius:400,ids:['a'],coverage:true},{radius:800,ids:['b','c'],coverage:true},{radius:1600,ids:['b','c','d'],coverage:true}]),/invariant/);});
test('unavailable coverage and duplicate identities cannot produce a scenario',()=>{for(const middle of [{radius:800,ids:[],coverage:false},{radius:800,ids:['a','a'],coverage:true}])assert.throws(()=>radiusComparison([{radius:400,ids:[],coverage:true},middle,{radius:1600,ids:['a'],coverage:true}]));assert.equal(radiusComparison([400,800,1600].map(radius=>({radius,ids:[],coverage:true})))[2].records,0);});

import {decodeJsonResponse} from '../src/planning/decode.ts';
import {gzipSync} from 'node:zlib';
test('snapshot reader accepts both raw gzip and browser-decoded HTTP bodies',async()=>{const value={id:'real-shape',rows:[1,2]};const text=JSON.stringify(value);assert.deepEqual(await decodeJsonResponse(new Response(gzipSync(text))),value);assert.deepEqual(await decodeJsonResponse(new Response(text,{headers:{'content-encoding':'gzip'}})),value);await assert.rejects(()=>decodeJsonResponse(new Response('')));await assert.rejects(()=>decodeJsonResponse(new Response('invalid')));});
