"""Rights reviews must not silently carry forward to a different package."""
import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from scripts.twin_rights_register import apply_review
from scripts.qualify_twin_candidate import inventory
from scripts.site_history import digest


class RightsReviewTests(unittest.TestCase):
    def test_review_is_bound_to_assets_and_evidence(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            (root/'docs/site-history').mkdir(parents=True)
            package=root/'dist-twin-review';package.mkdir()
            asset=package/'index.html';asset.write_text('reviewed')
            evidence=root/'licence.txt';evidence.write_text('licence evidence')
            review={'build_id':digest(inventory(package)),
                    'evidence_files':[{'path':'licence.txt','sha256':hashlib.sha256(evidence.read_bytes()).hexdigest()}],
                    'sources':[{'source':'parcels','source_hash':'abc','status':'qualified_for_reviewed_use','conditions':['Attribution required.']}]}
            (root/'docs/site-history/rights-adjudication.json').write_text(json.dumps(review))
            def rows(source_hash='abc'):
                return [{'source':'parcels','source_hash':source_hash,'redistribution_status':'pending_asset_review'}]
            self.assertTrue(apply_review(root,rows())['qualified'])
            self.assertFalse(apply_review(root,rows('changed'))['qualified'])
            asset.write_text('changed')
            self.assertFalse(apply_review(root,rows())['qualified'])
            asset.write_text('reviewed');evidence.write_text('changed licence')
            self.assertFalse(apply_review(root,rows())['qualified'])

    def test_absent_review_does_not_pass(self):
        with tempfile.TemporaryDirectory() as tmp:
            self.assertFalse(apply_review(Path(tmp),[])['qualified'])


if __name__=='__main__':unittest.main()
