"""Reproduce one investigation per region from pinned screening assets."""
import gzip
import json
from pathlib import Path
from urllib.parse import urlencode

ROOT = Path(__file__).resolve().parents[1]


def build() -> list[dict]:
    base = ROOT/'public/screening'
    version = json.loads((base/'latest.json').read_text())['id']
    m = json.loads((base/version/'manifest.json').read_text())
    demos = []
    for region in ('downtown', 'midtown'):
        areas = json.loads(gzip.decompress((base/version/'regions'/f'{region}.json.gz').read_bytes()))
        def eligible(a):
            return [p for p in a['projects'] if region in p['regions'] and p['stage'] != 'Built']
        def units(a, radius, period):
            return sum(p['units'] for p in eligible(a) if p['distances'][period] is None or p['distances'][period] > radius)
        candidates = [a for a in areas if any(p['distances']['morning'] is None or p['distances']['morning'] > 800 for p in eligible(a))]
        candidates.sort(key=lambda a: (-units(a,800,'morning'), a['id']))
        selected = candidates[:1]
        if region == 'north-york':
            sensitive = [a for a in candidates if len({units(a,800,p) for p in ('morning','evening','saturday')}) > 1]
            selected = sensitive[:1] or selected
        q = {'analysis':version,'snapshot':m['planning_snapshot'],'transit':m['transit_snapshot'],'region':region,'stage':'all','radius':800,'period':'morning','minimum':0,'gaps':1,'areas':','.join(a['id'] for a in selected)}
        demo = {'region':region,'analysis':version,'title':{'downtown':'When the shortlist is empty','midtown':'Check whether a finding survives a different threshold','north-york':'Compare service periods before drawing a conclusion'}[region], 'link':'#'+urlencode(q),'candidate_areas':len(candidates),'dates':m['dates'],'selected':[],'accounting':m['accounting']['regional'][region], 'question':'Which areas warrant closer investigation of nearby scheduled transit?','interpretation':'No candidates under these settings does not demonstrate adequate service.' if not candidates else 'These are investigation candidates, not proven service deficits.'}
        for a in selected:
            raw=json.loads(gzip.decompress((base/version/'areas'/f"{a['id']}.json.gz").read_bytes()))
            demo['selected'].append({'id':a['id'],'label':a['label'],'sensitivity':{p:{str(r):units(a,r,p) for r in (400,800,1600)} for p in ('morning','evening','saturday')},'projects':[{'number':p['number'],'units':p['units'],'stage':p['stage'],'source_url':p['source_url'],'record_ids':p['record_ids'],'service':p['service']} for p in raw['projects'] if region in p['regions'] and p['stage']!='Built']})
        demos.append(demo)
    (ROOT/'docs/growth-transit/regional-demonstrations.json').write_text(json.dumps(demos,indent=2)+'\n',encoding='utf-8')
    lines=['# Three reproducible regional investigations','',f'Pinned analysis: `{version}`. These are developer demonstrations, not evidence of community impact.','', 'Open the local public preview and append each hash below. Keep stage = Under Review + Active, minimum = 0, morning = 07–09, threshold = 800 metres. Dates are explicit in the interface.','']
    for d in demos:
        lines += [f"## {d['region']}: {d['title']}",'',f"Expected default result: **{d['candidate_areas']} candidate areas**. {d['interpretation']}",'',f"[Reproduce locally](http://127.0.0.1:5178/{d['link']})",'']
        if not d['selected']:lines+=['1. Confirm the empty shortlist message.','2. Uncheck the candidates-only filter to inspect included proposals.','3. Try 400 metres and another period. Explain why a zero-result screening cannot answer questions about capacity, safety or walking routes.','']
        for a in d['selected']:
            lines += [f"Selected area `{a['id']}`, near {a['label']}.",'','| Period | 400 m | 800 m | 1,600 m |','|---|---:|---:|---:|']
            for p,v in a['sensitivity'].items():lines.append(f"| {p} ({d['dates'][p]}) | {v['400']} | {v['800']} | {v['1600']} |")
            lines += ['','Values are reported proposed units in included records outside the selected service threshold.','', '1. Open the selected area and check its publisher references and structured quantities.','2. Compare all three periods and distances. Note any change before writing your interpretation.','3. Prepare a brief asking what walking-connection and capacity evidence is needed. Do not infer construction or a confirmed service deficit.','']
    lines+=['## Evidence and limitations','','`regional-demonstrations.json` records publisher references, quantities, qualifying stop evidence, dates and source URLs. Excluded and unresolved records remain accessible in the interface. Descriptions can reflect different revisions from structured quantities; do not substitute prose totals. Regions overlap and their totals must not be added. The planning snapshot and timetable are dated independently.']
    (ROOT/'docs/growth-transit/regional-demonstrations.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    (ROOT/'src/planning/regional-demos.json').write_text(json.dumps([{k:d[k] for k in ('region','title','link','candidate_areas','interpretation','analysis')} for d in demos],indent=2)+'\n',encoding='utf-8')
    return demos

if __name__ == '__main__':
    print(json.dumps([{'region':d['region'],'candidates':d['candidate_areas']} for d in build()]))
