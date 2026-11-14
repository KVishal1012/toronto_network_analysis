"""City road-restriction XML snapshots: reported events, never verified passability."""
import xml.etree.ElementTree as ET
import hashlib
import json
import math
import ssl
from datetime import datetime, timezone
from threading import Lock
from urllib.request import Request, urlopen
import certifi
from shapely.geometry import shape
from server.store import DATA
from server.engine import iso_now

URL='https://secure.toronto.ca/opendata/cart/road_restrictions/v3?format=xml&stream=n'
DIRECTORY=DATA/'roads'
LOCK=Lock()


def timestamp(value: str) -> float | None:
    """City epoch milliseconds; invalid timestamps remain unknown."""
    try:
        number=float(value)/1000
        return number if math.isfinite(number) and 0 < number < 4102444800 else None
    except (ValueError,TypeError):return None


def parse(payload: bytes) -> tuple[list,list,int]:
    """Validate coordinates, retain source attributes and explicitly label point fallbacks."""
    if b'<!DOCTYPE' in payload.upper() or b'<!ENTITY' in payload.upper():raise ValueError('XML entities are not accepted')
    root=ET.fromstring(payload)
    if root.tag!='Closures' or any(e.tag!='Closure' for e in root):raise ValueError('Unexpected XML schema')
    reader=[]
    for item in root:
        row={e.tag:e.text or '' for e in item}
        if len(row)!=len(item):raise ValueError('Duplicate XML fields')
        row['ID']=row.pop('Id','')
        if not {'Latitude','Longitude','StartTime','EndTime','LastUpdated','GeoPolyline'}.issubset(row):raise ValueError('Missing road restriction fields')
        reader.append(row)
    features=[];rejected=[];seen=set();count=0
    for row in reader:
        count+=1
        try:
            identity=row['ID']
            if not identity or identity in seen:raise ValueError('Missing/duplicate ID')
            seen.add(identity)
            lon,lat=float(row['Longitude']),float(row['Latitude'])
            if not (-80<lon<-78 and 43<lat<45):raise ValueError('Invalid Toronto coordinate')
            geometry={'type':'Point','coordinates':[lon,lat]};method='Source representative point; extent unavailable'
            try:
                coords=json.loads('['+row['GeoPolyline']+']')
                if len(coords)<2 or not all(len(c)==2 and -80<c[0]<-78 and 43<c[1]<45 for c in coords):raise ValueError('Invalid polyline')
                candidate={'type':'LineString','coordinates':coords}
                if not shape(candidate).is_valid:raise ValueError('Invalid polyline geometry')
                geometry=candidate;method='Source GeoPolyline (longitude, latitude)'
            except (ValueError,TypeError,KeyError):pass
            features.append({'type':'Feature','id':identity,'geometry':geometry,'properties':{**row,'geometry_method':method,'start_epoch':timestamp(row['StartTime']),'end_epoch':timestamp(row['EndTime']),'updated_epoch':timestamp(row['LastUpdated'])}})
        except (ValueError,TypeError,KeyError) as exc:rejected.append({'row':count,'id':row.get('ID'),'reason':str(exc)})
    return features,rejected,count


def acquire() -> dict:
    """Archive each acquisition and atomically publish failure or successful observation."""
    with LOCK:
        DIRECTORY.mkdir(parents=True,exist_ok=True)
        receipt={'name':'Road Restrictions','page':'https://open.toronto.ca/dataset/road-restrictions/','url':URL,'checked_at':iso_now(),'status':'unavailable','retrieved_at':None,'sha256':None,'limitation':'City-reported restrictions. Date window is not proof a closure is active now; work schedules, directions, impact and description must be checked. No routing or passability guarantee.'}
        features=[]
        try:
            with urlopen(Request(URL,headers={'User-Agent':'ASTER-Toronto-Local/0.1'}),context=ssl.create_default_context(cafile=certifi.where()),timeout=30) as response:payload=response.read(25_000_001)
            if len(payload)>25_000_000:raise ValueError('XML exceeds acquisition bound')
            digest=hashlib.sha256(payload).hexdigest();(DIRECTORY/(digest+'.xml')).write_bytes(payload)
            receipt.update(sha256=digest,transport='Official XML v3; JSON and CSV rejected due to invalid source serialization')
            features,rejected,count=parse(payload)
            receipt.update(status='available',retrieved_at=iso_now(),sha256=digest,records_in=count,records_out=len(features),rejected=rejected,point_fallbacks=sum(f['geometry']['type']=='Point' for f in features))
        except (OSError,ValueError,TypeError,ET.ParseError) as exc:receipt['error']=str(exc)
        bundle={'type':'FeatureCollection','features':features,'receipt':receipt}
        encoded=json.dumps(bundle,allow_nan=False).encode();digest=hashlib.sha256(encoded).hexdigest()
        (DIRECTORY/(digest+'.json')).write_bytes(encoded)
        pending=DIRECTORY/'latest.tmp';pending.write_bytes(encoded);pending.replace(DIRECTORY/'latest.json')
        return receipt


def present(bundle: dict, now: float | None=None) -> dict:
    """Re-evaluate age and broad date windows on every read, not just acquisition."""
    now=now if now is not None else datetime.now(timezone.utc).timestamp()
    r=bundle['receipt'];r['freshness']='unavailable'
    if r['status']=='available':
        age=now-datetime.fromisoformat(r['retrieved_at']).timestamp()
        r['freshness']='fresh' if -60<=age<=300 else 'stale'
    for f in bundle['features']:
        p=f['properties'];start,end=p['start_epoch'],p['end_epoch']
        p['date_window']='unknown'
        if p.get('Expired')=='1' or (end is not None and end<now):p['date_window']='ended / source expired'
        elif start is not None and start>now:p['date_window']='future'
        elif start is not None and end is not None and start<=now<=end:p['date_window']='within date window; check schedule'
    return bundle


def read() -> dict:
    """Return latest independent road snapshot; failed refresh never masquerades as current."""
    path=DIRECTORY/'latest.json'
    if not path.exists():return {'type':'FeatureCollection','features':[],'receipt':{'name':'Road Restrictions','status':'unavailable','freshness':'unavailable','error':'No acquisition yet'}}
    return present(json.loads(path.read_text(encoding='utf-8')))
