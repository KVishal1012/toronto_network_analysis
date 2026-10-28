import test from 'node:test';
import assert from 'node:assert/strict';
import gateway from '../deploy/gta-data/worker.mjs';
import {containsDisk,project} from '../src/planning/spatial.ts';

test('static gateway rejects mutation, traversal and private archives without bucket reads', async()=>{
 let calls=0;const env={PLANNING:{get:async()=>{calls++;return null;}}};
 for(const path of ['receipts/private.json','objects/secret','../raw.json','latest.json/extra'])assert.equal((await gateway.fetch(new Request('https://data.test/'+path),env)).status,404);
 assert.equal((await gateway.fetch(new Request('https://data.test/latest.json',{method:'POST'}),env)).status,405);
 assert.equal(calls,0);
});
test('static gzip is not decompressed twice; immutable files cached and health is not',async()=>{
 let calls=0;const env={PLANNING:{get:async()=>{calls++;return {body:'bytes',httpEtag:'"abc"'};}}};
 const data=await gateway.fetch(new Request('https://data.test/objects/'+'a'.repeat(64)+'.json.gz'),env);
 assert.equal(data.headers.get('Content-Encoding'),null);assert.match(data.headers.get('Cache-Control'),/immutable/);
 const latest=await gateway.fetch(new Request('https://data.test/latest.json'),env);
 assert.equal(latest.headers.get('Cache-Control'),'no-store');assert.equal(calls,2);
});
test('coverage disk detects holes, edges and locations outside the GTA envelope',()=>{
 const outer=[[0,0],[10,0],[10,10],[0,10],[0,0]],hole=[[4,4],[6,4],[6,6],[4,6],[4,4]];
 const geometry={type:'Polygon',coordinates:[outer,hole]};
 assert.equal(containsDisk([2,2],1,geometry),true);
 assert.equal(containsDisk([2,2],3,geometry),false);
 assert.equal(containsDisk([5,5],.1,geometry),false);
 assert.equal(project(-80.2,44.4).length,2);
 assert.throws(()=>project(-82,44));
});
