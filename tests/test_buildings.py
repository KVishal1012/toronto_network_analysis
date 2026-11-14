"""Independent viewport accounting and source-height regression tests."""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import duckdb
from server import buildings


class BuildingTests(unittest.TestCase):
    def test_invalid_bbox_rejected(self) -> None:
        for value in ['','NaN,0,1,2','0,0,0,1','-181,0,1,2','1,2,3']:
            with self.subTest(value=value),self.assertRaises(ValueError):buildings.viewport(value)

    def test_unavailable_is_explicit(self) -> None:
        with tempfile.TemporaryDirectory() as directory,patch.object(buildings,'DATA',Path(directory)):
            self.assertEqual(buildings.viewport('-79.4,43.64,-79.38,43.66')['metadata']['status'],'unavailable')

    def test_source_height_preserved_and_bbox_filters(self) -> None:
        with tempfile.TemporaryDirectory() as directory,patch.object(buildings,'DATA',Path(directory)):
            root=Path(directory)
            (root/'buildings-manifest.json').write_text(json.dumps({'status':'reference','sha256':'test-fixture'}),encoding='utf-8')
            with duckdb.connect(str(root/'buildings.duckdb')) as con:
                con.execute('CREATE TABLE buildings(id VARCHAR, west DOUBLE, south DOUBLE, east DOUBLE, north DOUBLE, height_m DOUBLE, height_source VARCHAR, building_source VARCHAR, geometry_json VARCHAR)')
                con.execute('INSERT INTO buildings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', ['fixture',-79.39,43.65,-79.389,43.651,72.37,'Lidar-Derived','Site Plan',json.dumps({'type':'Polygon','coordinates':[[[-79.39,43.65],[-79.389,43.65],[-79.389,43.651],[-79.39,43.65]]]})])
            data=buildings.viewport('-79.4,43.64,-79.38,43.66')
            self.assertEqual(data['features'][0]['properties']['height_m'],72.37)
            self.assertEqual(data['metadata']['returned'],1)
            self.assertFalse(data['metadata']['truncated'])
            self.assertEqual(buildings.viewport('-79.5,43.7,-79.49,43.71')['features'],[])
            self.assertEqual(buildings.viewport('-80,43,-79,44')['metadata']['status'],'zoom_required')


if __name__=='__main__':unittest.main()
