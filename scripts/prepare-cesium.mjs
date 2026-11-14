import {cp, mkdir} from 'node:fs/promises';
const base = new URL('../node_modules/cesium/Build/Cesium/', import.meta.url);
const target = new URL('../public/cesium/', import.meta.url);
await mkdir(target, {recursive:true});
for (const folder of ['Assets','Workers','ThirdParty','Widgets']) {
  await cp(new URL(folder, base), new URL(folder, target), {recursive:true});
}
