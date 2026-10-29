import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {gunzipSync} from 'node:zlib';

test('light startup and municipal searches avoid boundaries; lazy queries retain pinned evidence and recover',async()=>{
 const root='dist-public/planning/';const health=JSON.parse(readFileSync(root+'latest.json'));
 const manifest=JSON.parse(readFileSync(root+health.id+'/manifest.json'));
 const read=k=>JSON.parse(gunzipSync(readFileSync(root+'objects/'+manifest.assets[k]+'.json.gz')));
 const originalFetch=globalThis.fetch,requests=[];let response,blocked=false;
 const boundary='objects/'+manifest.assets['municipalities.json']+'.json.gz';
 globalThis.self={postMessage:value=>response=value};
 globalThis.fetch=async url=>{const key=new URL(url).pathname.replace('/planning/','');requests.push(key);
  if(blocked&&key===boundary)return new Response('offline',{status:503});
  try{return new Response(readFileSync(root+key));}catch{return new Response('missing',{status:404});}};
 try{
  const file=readdirSync('dist-public/assets').find(f=>/^worker-.*\.js$/.test(f));
  await import(pathToFileURL(process.cwd()+'/dist-public/assets/'+file)+'?startup-test');
  const call=async(type,args)=>{await self.onmessage({data:{id:1,type,args}});assert.equal(response.error,undefined,response.error);return response.result;};
  const init=await call('init',{base:'https://example.test/planning/',id:manifest.id,lightweight:true});
  assert.deepEqual(requests,['latest.json',manifest.id+'/startup-v1.json.gz']);
  assert.equal(init.snapshot.id,manifest.id);assert.equal(init.municipalities.length,25);
  assert.ok(init.municipalities.every(m=>!m.geometry&&!m.metric));
  assert.ok(init.neighbourhoods.every(n=>!n.geometry));
  const toronto=init.municipalities.find(m=>m.name==='Toronto');
  const rows=await call('search',{query:'100 QUEEN',jurisdiction_id:toronto.id});assert.ok(rows.length>0);
  for(const [id,route] of Object.entries(manifest.address_search)){
   if(route.format)continue;
   const index=read(route.index),sample=read(index.search_label[0].path)[0];
   const found=await call('search',{query:sample.search_label,jurisdiction_id:id});
   assert.ok(found.some(r=>r.id===sample.id),id);assert.ok(found.every(r=>r.jurisdiction_id===id));
  }
  assert.ok(!requests.some(p=>p.includes('manifest.json')));
  assert.ok(!requests.includes(boundary));
  const original=await call('inspect',rows[0]);assert.ok(Number.isFinite(original.lon));
  const q={lon:original.lon,lat:original.lat,radius:800,kind:'projects',stage:'',jurisdiction_id:toronto.id};
  blocked=true;await self.onmessage({data:{id:2,type:'query',args:q}});assert.match(response.error,/Snapshot resource unavailable/);
  assert.ok((await call('search',{query:'100 QUEEN',jurisdiction_id:toronto.id})).length>0);
  blocked=false;const lazy=await call('query',q);assert.ok(lazy.rows.length>0);
  const full=await call('snapshot');assert.deepEqual(full,manifest);
  await call('init',{base:'https://example.test/planning/',id:manifest.id});
  assert.deepEqual(await call('query',q),lazy);
  const legacy=await call('init',{base:'https://example.test/planning/',id:manifest.source_snapshots.toronto,lightweight:true});
  assert.equal(legacy.snapshot.id,manifest.source_snapshots.toronto);
  assert.ok((await call('query',q)).rows.length>0);
 }finally{globalThis.fetch=originalFetch;delete globalThis.self;}
});
