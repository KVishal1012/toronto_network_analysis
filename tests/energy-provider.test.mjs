import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {createEnergyProvider} from '../src/planning/energy.ts';

const version='a'.repeat(20);
const base=new URL('https://example.test/planning/energy/');
const raw=Buffer.from('[]');
const manifest={id:version,schema:1,assets:{cohorts:createHash('sha256').update(raw).digest('hex')}};
function stub(t,handler){const original=globalThis.fetch;globalThis.fetch=handler;t.after(()=>{globalThis.fetch=original;});}

test('pinned provider verifies compressed content without fetching latest',async t=>{
 const requests=[];stub(t,async url=>{requests.push(String(url));return String(url).endsWith('/manifest.json')?Response.json(manifest):new Response(gzipSync(raw));});
 const p=createEnergyProvider(base);await p.init(version);assert.deepEqual(await p.cohorts(),[]);
 assert.equal(requests.some(r=>r.endsWith('/latest.json')),false);
});
test('corrupt evidence is rejected before display',async t=>{
 stub(t,async url=>String(url).endsWith('/manifest.json')?Response.json(manifest):new Response(gzipSync(Buffer.from('[1]'))));
 const p=createEnergyProvider(base);await p.init(version);await assert.rejects(p.cohorts(),/checksum mismatch/);
});
test('invalid version and missing manifest assets do not trigger fallback requests',async t=>{
 let requests=0;stub(t,async()=>{requests++;return Response.json(manifest);});const p=createEnergyProvider(base);
 await assert.rejects(p.init('../../invalid'),/Invalid energy snapshot/);assert.equal(requests,0);
 await p.init(version);await assert.rejects(p.facility('toronto-unknown'),/not present/);assert.equal(requests,1);
});
test('transient failure can retry without retaining a rejected promise',async t=>{
 let attempts=0;stub(t,async url=>{if(String(url).endsWith('/manifest.json'))return Response.json(manifest);attempts++;return attempts===1?new Response('',{status:503}):new Response(gzipSync(raw));});
 const p=createEnergyProvider(base);await p.init(version);await assert.rejects(p.cohorts(),/could not be loaded/);assert.deepEqual(await p.cohorts(),[]);assert.equal(attempts,2);
});
