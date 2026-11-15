import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {areaAnchor,coordinatePaths,fitBriefMap,geometryPath,scaleBar,streetLabel,visibleGeometry} from '../src/planning/brief-map.ts';

const square={type:'Polygon',coordinates:[[[-79.388,43.652],[-79.382,43.652],[-79.382,43.657],[-79.388,43.657],[-79.388,43.652]]]};
test('real geographic extent fits one area and keeps north above south',()=>{
 const frame=fitBriefMap([square],880,470);
 for(const [lon,lat] of square.coordinates[0]){const [x,y]=frame.point(lon,lat);assert.ok(x>10&&x<870&&y>10&&y<460);}
 assert.ok(frame.point(-79.385,43.657)[1]<frame.point(-79.385,43.652)[1]);
 assert.ok(frame.point(-79.382,43.654)[0]>frame.point(-79.388,43.654)[0]);
});
test('one metre has identical horizontal and vertical scale; scale bar uses metres',()=>{
 const f=fitBriefMap([square],335,420);const a=f.metricPoint(630000,4834000),b=f.metricPoint(630100,4834000),c=f.metricPoint(630000,4834100);
 assert.ok(Math.abs((b[0]-a[0])-(a[1]-c[1]))<1e-9);
 const bar=scaleBar(f);assert.ok(Math.abs(bar.pixels/f.scale-bar.metres)<1e-9);
});
test('polygon holes and multipolygons retain closed rings',()=>{
 const g={type:'MultiPolygon',coordinates:[[square.coordinates[0],square.coordinates[0].map(([x,y])=>[x+.0001,y+.0001])]]};
 const paths=coordinatePaths(g);assert.equal(paths.length,2);assert.ok(paths.every(p=>p.closed));
 assert.equal((geometryPath(g,fitBriefMap([square],880,470)).match(/Z/g)||[]).length,2);
});
test('cross-region selection fits both areas without discarding either geometry',()=>{
 const midtown={type:'Polygon',coordinates:[square.coordinates[0].map(([x,y])=>[x-.01,y+.05])]};
 const f=fitBriefMap([square,midtown],335,420);
 for(const g of [square,midtown]){const [x,y]=areaAnchor(g,f);assert.ok(x>=0&&x<=335&&y>=0&&y<=420);assert.ok(visibleGeometry(g,f));}
 assert.ok(!visibleGeometry({type:'LineString',coordinates:[[-79.7,43.9],[-79.71,43.91]]},f));
});
test('empty geometry cannot silently produce a fabricated map',()=>{
 assert.throws(()=>fitBriefMap([],880,470),/selected area geometry/);
});
test('road labels use the visible source segment even when its original endpoints lie outside the map',()=>{
 const f=fitBriefMap([square],880,470);const label=streetLabel({type:'LineString',coordinates:[[-79.42,43.654],[-79.35,43.654]]},f);
 assert.ok(label);assert.ok(label.point[0]>50&&label.point[0]<830&&label.point[1]>25&&label.point[1]<422);
 assert.ok(Math.abs(label.angle)<5);
});
test('pinned City Hall cell renders its actual 500-metre extent and includes all proposal points',()=>{
 const path=new URL('../public/screening/6ed092c988ad9326e279/areas/1260_9669.json.gz',import.meta.url);
 const area=JSON.parse(gunzipSync(fs.readFileSync(path)));const f=fitBriefMap([area.geometry],880,470);
 const coords=coordinatePaths(area.geometry)[0].points.map(([x,y])=>f.point(x,y));const width=Math.max(...coords.map(p=>p[0]))-Math.min(...coords.map(p=>p[0]));
 assert.ok(Math.abs(width/f.scale-500)<2);
 for(const p of area.projects){const [x,y]=f.point(p.lon,p.lat);assert.ok(x>=0&&x<=880&&y>=0&&y<=470);}
});
