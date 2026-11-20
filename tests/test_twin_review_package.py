"""Integration verification of the locally generated twin review package."""
import gzip,json,sqlite3,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
@unittest.skipUnless((ROOT/'dist-twin-review/twin/latest.json').exists() and (ROOT/'data/site-registry/registry.sqlite').exists(),'Local twin review package not built')
class TwinPackageTests(unittest.TestCase):
 def test_registry_identities_and_candidate_labels_survive_export(self):
  root=ROOT/'dist-twin-review/twin';version=json.loads((root/'latest.json').read_text())['version'];folder=root/version
  manifest=json.loads((folder/'manifest.json').read_text());self.assertTrue(manifest['local_review_only']);self.assertFalse(manifest['release_ready'])
  ids=set();links=0
  for path in (folder/'sites').glob('*.json.gz'):
   data=json.loads(gzip.decompress(path.read_bytes()))
   for key,site in data.items():
    self.assertEqual(site['id'],key);self.assertEqual(site['version'],version);self.assertEqual(site['history_state'],'baseline_only');self.assertNotIn('note',site)
    for record in site['records']:
     self.assertEqual(record['association'],'candidate');self.assertTrue(record['source_sha256']);self.assertTrue(record['retrieved_at']);links+=1
    ids.update(data)
  with sqlite3.connect(f'file:{ROOT}/data/site-registry/registry.sqlite?mode=ro',uri=True) as db:
   expected={row[0] for row in db.execute('select site_id from observations where version=?',(version,))}
  self.assertEqual(ids,expected);self.assertEqual(len(ids),manifest['site_count']);self.assertEqual(links,11177)
 def test_regional_indices_reconcile_and_have_no_geometry(self):
  root=ROOT/'dist-twin-review/twin';version=json.loads((root/'latest.json').read_text())['version'];folder=root/version
  manifest=json.loads((folder/'manifest.json').read_text())
  for region in manifest['regions']:
   rows=json.loads(gzip.decompress((folder/'regions'/(region['id']+'.json.gz')).read_bytes()))
   self.assertEqual(len(rows),region['count']);self.assertTrue(all(region['id'] in r['regions'] and 'geometry' not in r for r in rows))
if __name__=='__main__':unittest.main()
