"""Import City 2025 massing; read declared CRS, never infer from filename."""
from __future__ import annotations
import argparse
import hashlib
import json
import logging
import math
from collections import Counter
from pathlib import Path
import time
import zipfile

import duckdb
import shapefile
from pyproj import CRS, Transformer
from shapely.geometry import shape, mapping
from shapely.ops import transform

from server.engine import iso_now
from server.store import DATA

URL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/387b2e3b-2a76-4199-8b3b-0b7d22e2ec10/resource/667237d6-4d3c-4cf3-8cb7-e91c48d59375/download/3dmassingshapefile_2025_wgs84.zip'


def import_buildings(archive: Path) -> dict:
    """Validate every footprint and height, write a deterministic viewport store."""
    DATA.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    archive_target = DATA / 'raw' / f'{digest}.zip'
    archive_target.parent.mkdir(exist_ok=True)
    if not archive_target.exists():
        import shutil
        shutil.copyfile(archive, archive_target)
    z = zipfile.ZipFile(archive)
    name = next(n for n in z.namelist() if n.endswith('.shp'))
    stem = name[:-4]
    crs_wkt = z.read(stem+'.prj').decode('utf-8')
    source_crs = CRS.from_wkt(crs_wkt)
    if source_crs.to_epsg() != 3857:
        raise ValueError('Unexpected source CRS; review before transforming')
    transformer = Transformer.from_crs(source_crs, 'EPSG:4326', always_xy=True)
    reader = shapefile.Reader(shp=z.open(name), shx=z.open(stem+'.shx'), dbf=z.open(stem+'.dbf'))
    reasons, source_counts = Counter(), Counter()
    processed = DATA/'buildings.ndjson'
    rejected_path = DATA/'building-rejections.ndjson'
    accepted = 0
    started = time.monotonic()
    with processed.open('w',encoding='utf-8') as out, rejected_path.open('w',encoding='utf-8') as rejected:
        for index, record in enumerate(reader.iterShapeRecords()):
            attrs = record.record.as_dict()
            height = attrs.get('AVG_HEIGHT')
            reason = None
            if not isinstance(height, (int,float)) or not math.isfinite(height) or height <= 0:
                reason = 'Missing, nonfinite, zero or negative AVG_HEIGHT'
            if not reason:
                geometry = shape(record.shape.__geo_interface__)
                if geometry.is_empty or not geometry.is_valid or geometry.geom_type not in ('Polygon','MultiPolygon'):
                    reason = 'Invalid or empty footprint; no silent repair'
            if not reason:
                geometry = transform(transformer.transform, geometry)
                west,south,east,north = geometry.bounds
                if not (-80 < west <= east < -78 and 43 < south <= north < 45):
                    reason = 'Footprint outside Toronto coordinate envelope'
            if reason:
                reasons[reason]+=1
                rejected.write(json.dumps({'source_row':index,'reason':reason})+'\n')
                continue
            source = attrs.get('HEIGHT_SRC') or 'Not specified by source'
            source_counts[source]+=1
            item={'id':f'2025-{index}', 'west':west,'south':south,'east':east,'north':north,
                'height_m':height,'height_source':source,'building_source':attrs.get('BLDG_SRC'),
                'geometry_json':json.dumps(mapping(geometry),separators=(',',':'))}
            out.write(json.dumps(item,separators=(',',':'),allow_nan=False)+'\n')
            accepted+=1
    target=DATA/'buildings.next.duckdb'
    if target.exists():target.unlink()
    with duckdb.connect(str(target)) as con:
        con.execute('CREATE TABLE buildings AS SELECT * FROM read_ndjson_auto(?) ORDER BY west, south, id',[str(processed)])
        actual=con.execute('SELECT count(*) FROM buildings').fetchone()[0]
        assert actual==accepted
    target.replace(DATA/'buildings.duckdb')
    processed.unlink()
    manifest={'id':'toronto-massing-2025','name':'Toronto 3D massing · 2025','publisher':'City of Toronto / City Planning',
        'page':'https://open.toronto.ca/dataset/3d-massing/','url':URL,'sha256':digest,'retrieved_at':iso_now(),
        'vintage':'2025','status':'reference','source_crs':'EPSG:3857 (from .prj; archive filename is misleading)',
        'storage_crs':'EPSG:4326','height_field':'AVG_HEIGHT','height_unit':'metres',
        'height_method':'Uniform extrusion using source AVG_HEIGHT. No fallback heights, no vertical exaggeration.',
        'ground_method':'Flat reference ground; SURF_ELEV and HEIGHT_MSL are not used as terrain.',
        'records_in':len(reader),'records_out':accepted,'rejected_count':sum(reasons.values()),'rejection_reasons':dict(reasons),
        'height_sources':dict(source_counts),'duration_seconds':round(time.monotonic()-started,2),
        'limitation':'2025 illustrative context model, not current surveyed buildings. Heights include LiDAR-derived, site-plan and other source methods. Roof shapes and terrain are not reconstructed. City requires user verification for legal or official use.',
        'licence':'Open Government Licence – Toronto; additional City Planning illustrative-use notice applies.'}
    assert manifest['records_in']==accepted+manifest['rejected_count']
    (DATA/'buildings-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
    print(json.dumps(manifest,indent=2))
    return manifest


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('archive',type=Path)
    args=parser.parse_args();logging.basicConfig(level=logging.ERROR)
    import_buildings(args.archive)
