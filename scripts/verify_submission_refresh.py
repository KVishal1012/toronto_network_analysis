"""Validate staged refreshes without replacing the accepted planning pointer."""
import json,shutil,sys,hashlib
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.acquire_planning import download
from scripts.build_planning import build
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'data/submission-refresh/planning-2026-11-13'
a=json.loads((source/'acquisition.json').read_text())
checks=[]
for key,s in a['sources'].items():
 path,digest=download(s['url'],source)
 if digest!=s['sha256']:raise ValueError('Source changed during reread: '+key)
 checks.append({'source':key,'sha256':digest,'stable_reread':True})
# Retain older auxiliary sources only for the builder; they are excluded from submission assets.
old=json.loads((ROOT/'data/planning-source/acquisition.json').read_text())
for key in ('zoning','heights'):
 s=old['sources'][key];shutil.copy2(ROOT/'data/planning-source'/s['path'],source/s['path']);a['sources'][key]=s
(source/'acquisition.json').write_text(json.dumps(a,indent=2))
(source/'stable-reread.json').write_text(json.dumps(checks,indent=2))
m=build(source,ROOT/'public/planning',False,activate=False)
(source/'candidate.json').write_text(json.dumps({'id':m['id'],'activated':False},indent=2))
print(m['id'])
