import hashlib
import json
import tempfile
import unittest
from pathlib import Path
from scripts.package_submission import validate_contract

class SubmissionRightsTests(unittest.TestCase):
    def test_exact_allowlist_rejects_changed_and_extra_assets(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);source=root/'screening';v=source/'v';v.mkdir(parents=True)
            (v/'manifest.json').write_text('{}');(source/'latest.json').write_text('{"id":"v"}')
            c={'evidence_files':[],'versions':{'v':{'manifest.json':hashlib.sha256(b'{}').hexdigest()}}}
            validate_contract(source,c,root)
            (v/'private.json').write_text('{}')
            with self.assertRaisesRegex(ValueError,'Unreviewed'):validate_contract(source,c,root)
            (v/'private.json').unlink();(v/'manifest.json').write_text('{"changed":true}')
            with self.assertRaisesRegex(ValueError,'Unreviewed'):validate_contract(source,c,root)
    def test_unreviewed_latest_and_changed_licence_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'latest.json').write_text('{"id":"new"}')
            c={'evidence_files':[],'versions':{}}
            with self.assertRaisesRegex(ValueError,'no rights review'):validate_contract(root,c,root)
            (root/'licence').write_text('changed');c['evidence_files']=[{'path':'licence','sha256':'0'*64}]
            with self.assertRaisesRegex(ValueError,'Rights evidence changed'):validate_contract(root,c,root)
