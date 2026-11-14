import test from 'node:test';
import assert from 'node:assert/strict';
import {sitePath,tileKeys,uniqueFeatures,safeLink} from '../src/twin-review/data.ts';
test('pins reject traversal and malformed identities',()=>{assert.throws(()=>sitePath('../x','site-a'));assert.throws(()=>sitePath('a'.repeat(64),'../secret'));assert.equal(sitePath('a'.repeat(64),'site-12345678-1234-1234-1234-123456789abc'),'a'.repeat(64)+'/sites/12.json.gz');});
test('world and invalid extents never create an unbounded tile loop',()=>{assert.deepEqual(tileKeys([-180,-90,180,90],new Set()),[]);assert.deepEqual(tileKeys([NaN,0,1,1],new Set()),[]);assert.deepEqual(tileKeys([-79.4,43.6,-79.399,43.601],new Set(['-7941_4360','-7940_4360'])),['-7941_4360','-7940_4360'].filter(k=>Number(k.split('_')[0])>=Math.floor(-79.4*100)));});
test('overlapping tile payloads keep one feature per persistent site',()=>{const f={type:'Feature',geometry:{type:'Point',coordinates:[0,0]},properties:{id:'site-1'}};assert.equal(uniqueFeatures([{type:'FeatureCollection',features:[f]},{type:'FeatureCollection',features:[f]}]).features.length,1);});
test('publisher links reject script and local file schemes',()=>{assert.equal(safeLink('javascript:alert(1)'),undefined);assert.equal(safeLink('file:///tmp/a'),undefined);assert.equal(safeLink('https://toronto.ca/'),'https://toronto.ca/');});
