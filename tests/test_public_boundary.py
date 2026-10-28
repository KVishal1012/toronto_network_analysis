"""Public packaging must reject research code and unrelated local files."""
import json
import tempfile
import unittest
from pathlib import Path
from scripts.check_public_boundary import check

class PublicBoundaryTests(unittest.TestCase):
    def fixture(self, root):
        (root/'.vite').mkdir()
        (root/'.vite/manifest.json').write_text(json.dumps({'index.html': {'src':'index.html'}}))
        (root/'assets').mkdir()
        (root/'assets/main.js').write_text('console.log("planning");')

    def test_private_module_is_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);self.fixture(root)
            (root/'.vite/manifest.json').write_text(json.dumps({'src/App.tsx':{'src':'src/App.tsx'}}))
            with self.assertRaisesRegex(ValueError,'Non-public module'):check(root)

    def test_private_files_are_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);self.fixture(root);(root/'.env.local').write_text('example')
            with self.assertRaisesRegex(ValueError,'Non-public file'):check(root)

    def test_private_bundle_marker_is_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);self.fixture(root)
            (root/'assets/main.js').write_text('const label="Photorealistic 3D";')
            with self.assertRaisesRegex(ValueError,'Private research marker'):check(root)
