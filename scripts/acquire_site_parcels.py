"""Acquire current City parcel export and receipts using verified system HTTPS.

Downloads retain safe checkpoints. Accepted observations are immutable; existing
registry inputs are never replaced automatically.
"""
from __future__ import annotations
import json
import subprocess
from pathlib import Path
from datetime import datetime,timezone
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.build_site_registry import file_hash
ROOT=Path(__file__).resolve().parents[1]
CATALOGUE='https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=property-boundaries'
LICENCE='https://open.toronto.ca/open-data-licence/'


from scripts.resumable_download import fetch


def acquire(destination: Path) -> dict:
    """Verify a stable complete export before publishing local acquisition inputs."""
    destination.mkdir(parents=True,exist_ok=True)
    stage=destination/'.staging'
    stage.mkdir(exist_ok=True)
    fetch(CATALOGUE,stage/'property-catalogue-current.json')
    package=json.loads((stage/'property-catalogue-current.json').read_text())['result']
    if package['license_title']!='open-government-licence-toronto':raise ValueError('Licence changed')
    resources=package['resources'];geo=[r for r in resources if r['name']=='Property Boundaries - 4326.geojson'];tab=[r for r in resources if r['name']=='Property Boundaries' and r.get('datastore_active')]
    if len(geo)!=1 or len(tab)!=1:raise ValueError('Source resource selection requires review')
    count='https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?resource_id='+tab[0]['id']+'&limit=0'
    fetch(geo[0]['url'],stage/'parcels.geojson');fetch(count,stage/'parcel-count.json')
    fetch(geo[0]['url'],stage/'parcels-reread.geojson');fetch(count,stage/'parcel-count-reread.json');fetch(LICENCE,stage/'parcel-licence.html')
    if file_hash(stage/'parcels.geojson')!=file_hash(stage/'parcels-reread.geojson'):raise ValueError('Unstable export')
    total=json.loads((stage/'parcel-count.json').read_text())['result']['total']
    if total!=json.loads((stage/'parcel-count-reread.json').read_text())['result']['total']:raise ValueError('Publisher count changed')
    if len(json.loads((stage/'parcels.geojson').read_text())['features'])!=total:raise ValueError('Incomplete export')
    receipt={'retrieved_at':datetime.now(timezone.utc).isoformat(),'catalogue_url':CATALOGUE,'export_url':geo[0]['url'],'count_url':count,'licence_url':LICENCE,'sha256':file_hash(stage/'parcels.geojson'),'count':total}
    (stage/'parcel-acquisition.json').write_text(json.dumps(receipt,indent=2),encoding='utf-8')
    from shapely.geometry import shape
    data=json.loads((stage/'parcels.geojson').read_text())
    if data.get('crs',{}).get('properties',{}).get('name') not in {'urn:ogc:def:crs:OGC:1.3:CRS84','urn:ogc:def:crs:EPSG::4326'}:raise ValueError('Unqualified CRS')
    seen={k:set() for k in ('OBJECTID','PARCELID')};invalid=[]
    for index,feature in enumerate(data['features']):
        for key,values in seen.items():
            value=feature['properties'].get(key)
            if value is None or value in values:raise ValueError('Missing or duplicate source identifier')
            values.add(value)
        geometry=shape(feature['geometry']) if feature.get('geometry') else None
        if geometry is None or geometry.is_empty or geometry.geom_type not in {'Polygon','MultiPolygon'} or not geometry.is_valid:
            invalid.append(index);continue
        w,s,e,n=geometry.bounds
        if not (-80<w<=e<-78 and 43<s<=n<45):raise ValueError('Invalid coordinate envelope')
    receipt['invalid_geometry_rows']=invalid
    receipt['crs']='EPSG:4326'
    baseline=destination.parent/'parcel-acquisition.json'
    old=json.loads(baseline.read_text()) if baseline.exists() else {}
    baseline_file=destination.parent/'parcels.geojson'
    old_hash=old.get('sha256') or (file_hash(baseline_file) if baseline_file.exists() else None)
    receipt['observation_state']='unchanged' if receipt['sha256']==old_hash else 'new_content_requires_identity_review'
    (stage/'parcel-acquisition.json').write_text(json.dumps(receipt,indent=2),encoding='utf-8')
    immutable=destination/receipt['sha256']
    if not immutable.exists():
        stage.rename(immutable)
    else:
        # Preserve the original immutable observation and this refresh receipt.
        (destination/('refresh-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%f')+'.json')).write_text(json.dumps(receipt,indent=2),encoding='utf-8')
    pointer=destination/'latest.tmp'
    pointer.write_text(json.dumps({'sha256':receipt['sha256'],'observation_state':receipt['observation_state']}),encoding='utf-8')
    pointer.replace(destination/'latest.json')
    return receipt

if __name__=='__main__':print(json.dumps(acquire(ROOT/'data/site-history-source/observations'),indent=2))
