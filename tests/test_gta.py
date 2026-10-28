"""GTA acquisition, provenance, geometry and atomic refresh regressions."""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from scripts.acquire_gta import reconcile, validate_attributes
from scripts.build_gta import checked_geometry
from scripts.refresh_gta import refresh
from scripts.publish_gta_r2 import inventory, archive_inventory


class GTAContracts(unittest.TestCase):
    def test_inventory_rejects_omissions_duplicates_and_replacements(self):
        row = lambda value: {'properties': {'OID': value}}
        reconcile([1, 2], [row(2), row(1)], 'OID')
        for values in ([1], [1, 1], [1, 3]):
            with self.assertRaises(ValueError):
                reconcile([1, 2], [row(value) for value in values], 'OID')

    def test_all_row_attribute_types_and_geometry_field(self):
        fields = {'OID': {'type': 'esriFieldTypeOID'}, 'STATUS': {'type': 'esriFieldTypeString'}, 'SHAPE': {'type': 'esriFieldTypeGeometry'}}
        validate_attributes([{'properties': {'OID': 1, 'STATUS': None}}], fields)
        for row in ({'OID': True, 'STATUS': 'Issued'}, {'OID': 2, 'STATUS': 3}, {'OID': 2}):
            with self.assertRaises(ValueError):
                validate_attributes([{'properties': {'OID': 1, 'STATUS': 'Approved'}}, {'properties': row}], fields)

    def test_invalid_geometry_is_not_silently_repaired(self):
        bowtie = {'type': 'Polygon', 'coordinates': [[[-79.8,43.7],[-79.7,43.8],[-79.8,43.8],[-79.7,43.7],[-79.8,43.7]]]}
        with self.assertRaises(ValueError):
            checked_geometry({'geometry': bowtie})

    def test_raw_archive_excludes_arbitrary_private_files(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / 'private-notes.txt').write_text('private')
            self.assertEqual(archive_inventory(root), {})

    def test_unvalidated_manifest_cannot_reach_storage(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder); target = root / ('a'*20); target.mkdir()
            (target/'manifest.json').write_text(json.dumps({'id':'a'*20,'assets':{},'validation':{}}))
            with self.assertRaises(ValueError):
                inventory(root)

    def test_failed_brampton_retains_receipt_while_other_sources_advance(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); output=root/'planning'; output.mkdir(); data=root/'raw'; data.mkdir()
            old='a'*20; new='b'*20
            (output/old).mkdir(); (output/old/'manifest.json').write_text(json.dumps({'id':old}))
            (output/'latest.json').write_text(json.dumps({'id':old,'status':'ok'}))
            saved=b'{"last":"verified"}'; (data/'brampton-opa.json').write_bytes(saved)
            def acquire(key, config, directory):
                if key=='brampton-opa':
                    (directory/'brampton-opa.json').write_text('bad')
                    raise ValueError('Feed failed')
            with patch('scripts.refresh_gta.acquire', side_effect=acquire), patch('scripts.refresh_gta.acquire_toronto'), \
                 patch('scripts.refresh_gta.load_receipt', return_value=({}, {'features':[]})), \
                 patch('scripts.refresh_gta.build_toronto', return_value={'id':new}), \
                 patch('scripts.refresh_gta.build', return_value={'id':new}) as compose:
                self.assertEqual(refresh(output,data),1)
                self.assertEqual(compose.call_args.kwargs['toronto_id'],new)
            self.assertEqual((data/'brampton-opa.json').read_bytes(),saved)
            health=json.loads((output/'latest.json').read_text())
            self.assertEqual(health['id'],new)
            self.assertEqual(health['sources']['brampton-opa']['status'],'delayed')

    def test_composition_failure_preserves_old_pointer(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); old='c'*20; (root/old).mkdir()
            (root/old/'manifest.json').write_text(json.dumps({'id':old}))
            (root/'latest.json').write_text(json.dumps({'id':old,'status':'ok'}))
            data=root/'raw';data.mkdir()
            with patch('scripts.refresh_gta.acquire', side_effect=ValueError('offline')), \
                 patch('scripts.refresh_gta.acquire_toronto',side_effect=ValueError('offline')), \
                 patch('scripts.refresh_gta.build',side_effect=ValueError('not usable')):
                self.assertEqual(refresh(root,data),1)
            self.assertEqual(json.loads((root/'latest.json').read_text())['id'],old)

    def test_first_failure_removes_unverified_receipt_and_retains_history(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); old='d'*20; new='e'*20; (root/old).mkdir()
            (root/old/'manifest.json').write_text(json.dumps({'id':old}))
            (root/'latest.json').write_text(json.dumps({'id':old,'status':'ok'}))
            data=root/'raw';data.mkdir()
            def failed(key, config, directory):
                (directory/(key+'.json')).write_text('unverified')
                raise ValueError('incomplete first acquisition')
            with patch('scripts.refresh_gta.acquire',side_effect=failed), patch('scripts.refresh_gta.build',return_value={'id':new}):
                self.assertEqual(refresh(root,data,['milton-address']),1)
            self.assertFalse((data/'milton-address.json').exists())
            self.assertTrue((root/old/'manifest.json').exists())
            health=json.loads((root/'latest.json').read_text())
            self.assertEqual(health['sources']['milton-address']['status'],'delayed')

    def test_blocked_source_cannot_be_explicitly_refreshed(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder); old='f'*20; (root/old).mkdir()
            (root/old/'manifest.json').write_text(json.dumps({'id':old}))
            (root/'latest.json').write_text(json.dumps({'id':old}))
            with self.assertRaisesRegex(ValueError,'blocked'):
                refresh(root,root,['york-applications'])
