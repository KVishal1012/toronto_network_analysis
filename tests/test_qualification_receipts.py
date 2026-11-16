"""A previous or changed PDF cannot satisfy a candidate's saved-output gate."""
import hashlib
import tempfile
import unittest
from pathlib import Path
from scripts.qualify_screening import verified_saved_pdf


class QualificationReceiptTests(unittest.TestCase):
    def test_exact_artifact_and_build_required(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);file=root/'data/growth-qualification/candidate/review.pdf'
            file.parent.mkdir(parents=True);file.write_bytes(b'%PDF-test-fixture')
            receipt={'build_id':'candidate','pdf':{'path':file.relative_to(root).as_posix(),'passed':True,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()}}
            self.assertTrue(verified_saved_pdf(root,'candidate',receipt))
            self.assertFalse(verified_saved_pdf(root,'another-build',receipt))
            file.write_bytes(b'changed')
            self.assertFalse(verified_saved_pdf(root,'candidate',receipt))

    def test_missing_or_outside_artifacts_do_not_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);outside=root/'unrelated.pdf';outside.write_bytes(b'%PDF-test-fixture')
            receipt={'build_id':'candidate','pdf':{'path':'unrelated.pdf','passed':True,'sha256':hashlib.sha256(outside.read_bytes()).hexdigest()}}
            self.assertFalse(verified_saved_pdf(root,'candidate',receipt))
            self.assertFalse(verified_saved_pdf(root,'candidate',{'build_id':'candidate'}))
