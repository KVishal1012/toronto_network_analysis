import json
from pathlib import Path
import tempfile
import unittest
from scripts.qualify_twin_candidate import inventory,candidate_isolation
from scripts.site_history import digest

class CandidateTests(unittest.TestCase):
    def test_build_changes_with_asset(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp);(p/'index.html').write_text('one');a=digest(inventory(p))
            (p/'index.html').write_text('two');self.assertNotEqual(a,digest(inventory(p)))
            b=digest(inventory(p));(p/'qualification.json').write_text('{}');self.assertEqual(b,digest(inventory(p)))
    def test_actual_package_rejects_private_module(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp);(p/'.vite').mkdir();m=p/'.vite/manifest.json'
            m.write_text(json.dumps({'entry':{'src':'twin-review.html'}}));self.assertEqual(candidate_isolation(p),[])
            m.write_text(json.dumps({'entry':{'src':'src/lab/main.tsx'}}));self.assertTrue(candidate_isolation(p))
    def test_test_fixtures_cannot_ship(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp);(p/'fixtures.json').write_text('{}');self.assertIn('fixtures.json',candidate_isolation(p))
    def test_nested_unqualified_assets_cannot_ship(self):
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp);version='a'*64
            (p/'twin'/version).mkdir(parents=True)
            forbidden=p/'twin'/version/'fixtures.json'
            forbidden.write_text('{}')
            self.assertIn(str(forbidden.relative_to(p)),candidate_isolation(p))
            (p/'assets').mkdir();(p/'assets'/'report.pdf').write_bytes(b'example')
            self.assertIn('assets/report.pdf',candidate_isolation(p))
if __name__=='__main__':unittest.main()
