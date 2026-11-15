import test from 'node:test';
import assert from 'node:assert/strict';
import {parseEnergyPins,withEnergyPins} from '../src/planning/energy-links.ts';

test('energy pins retain planning filters and reproduce selections',()=>{
 const pins={snapshot:'a'.repeat(20),cohort:'cohort-'+'b'.repeat(12),metric:'water',facility:'toronto-123',tab:'facilities',include:['facility','cohort']};
 const hash=withEnergyPins('#analysis=abc&region=midtown&areas=1_2&radius=400',pins);
 assert.deepEqual(parseEnergyPins(hash),{...pins,include:['cohort','facility']});
 const q=new URLSearchParams(hash.slice(1));assert.equal(q.get('analysis'),'abc');assert.equal(q.get('areas'),'1_2');
});
test('old links have no implicit energy version or attachment',()=>{
 const pins=parseEnergyPins('#analysis=abc&snapshot=old');assert.equal(pins.snapshot,undefined);assert.deepEqual(pins.include,[]);
 assert.equal(withEnergyPins('#analysis=abc',pins),'#analysis=abc');
});
test('invalid explicit pins cannot silently select the latest snapshot',()=>{
 const pins=parseEnergyPins('#energy=../../x&energy_facility=../../secret&energy_metric=bad');
 assert.equal(pins.snapshot,'invalid');assert.equal(pins.facility,'invalid');assert.equal(pins.metric,'invalid');
});
