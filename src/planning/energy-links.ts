/** Small link contract; importing this never loads energy data or map code. */
export type EnergyPins={snapshot?:string;cohort?:string;metric:string;facility?:string;tab:'cohorts'|'facilities';include:string[]};
export function parseEnergyPins(hash:string):EnergyPins{
 const q=new URLSearchParams(hash.replace(/^#/,''));
 const optional=(key:string,pattern:RegExp)=>{if(!q.has(key))return undefined;const v=q.get(key)||'';return pattern.test(v)?v:'invalid';};
 return {snapshot:optional('energy',/^[a-f0-9]{20}$/),cohort:optional('energy_cohort',/^cohort-[a-f0-9]{12}$/),metric:optional('energy_metric',/^(site_eui|source_eui|wn_site_eui|wn_source_eui|electricity|gas|water|ghg)$/)||'site_eui',facility:optional('energy_facility',/^toronto-\d+$/),tab:q.get('energy_tab')==='facilities'?'facilities':'cohorts',include:(q.get('energy_include')||'').split(',').filter(x=>x==='cohort'||x==='facility')};
}
export function withEnergyPins(hash:string,pins:EnergyPins):string{
 const q=new URLSearchParams(hash.replace(/^#/,''));
 for(const key of [...q.keys()])if(key==='energy'||key.startsWith('energy_'))q.delete(key);
 if(pins.snapshot){
  q.set('energy',pins.snapshot);q.set('energy_tab',pins.tab);q.set('energy_metric',pins.metric);
  if(pins.cohort)q.set('energy_cohort',pins.cohort);
  if(pins.facility)q.set('energy_facility',pins.facility);
  if(pins.include.length)q.set('energy_include',[...new Set(pins.include)].sort().join(','));
 }
 return '#'+q.toString();
}
