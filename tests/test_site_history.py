"""Identity, comparison, boundary and release-gate regression cases."""
import copy
import unittest
from scripts.site_history import association, compare_observations, new_site, release_gate, index_records, history, save_registry
from scripts.audit_site_history import normalized_name, union_geometry

EVIDENCE=[{'source':'publisher','reference':'receipt-1','reviewer':'test-reviewer'}]

class SiteHistoryTests(unittest.TestCase):
    def test_registry_versions_are_persistent_and_immutable(self):
        import tempfile,json
        from pathlib import Path
        with tempfile.TemporaryDirectory() as folder:
            registry={'version':1,'sites':{}}
            first=save_registry(registry,Path(folder))
            self.assertEqual(first,save_registry(registry,Path(folder)))
            new_site(registry,'Reviewed site',EVIDENCE)
            second=save_registry(registry,Path(folder))
            self.assertNotEqual(first,second)
            self.assertEqual(json.loads((Path(folder)/(first+'.json')).read_text())['sites'],{})

    def test_site_identity_is_not_a_geometry_or_row_number(self):
        registry={'version':1,'sites':{}}
        a=new_site(registry,'Same address',EVIDENCE)
        b=new_site(registry,'Same address',EVIDENCE)
        self.assertNotEqual(a['id'],b['id'])
        a['structures']=['snapshot-a:row-7','snapshot-b:row-91']
        self.assertEqual(registry['sites'][a['id']]['id'],a['id'])

    def test_split_merge_lineage_allocates_new_identity(self):
        registry={'version':1,'sites':{}}
        parent=new_site(registry,'Parent',EVIDENCE)
        children=[new_site(registry,'Child',EVIDENCE,parents=[parent['id']]) for _ in range(2)]
        merged=new_site(registry,'Merged',EVIDENCE,parents=[c['id'] for c in children])
        self.assertEqual(len(merged['predecessors']),2)
        self.assertEqual(len(registry['sites']),4)
        with self.assertRaises(ValueError):new_site(registry,'Unknown parent',EVIDENCE,parents=['missing'])

    def test_unreviewed_identity_fails(self):
        with self.assertRaises(ValueError):new_site({'version':0,'sites':{}},'A',[{'source':'x','reference':'y'}])

    def test_proximity_and_address_cannot_confirm(self):
        for method in ['proximity','address-agreement']:
            with self.assertRaises(ValueError):association('s','r','confirmed',method,EVIDENCE)
            self.assertEqual(association('s','r','candidate',method,EVIDENCE)['state'],'candidate')

    def test_multiple_candidates_not_collapsed(self):
        rows=[association(s,'r','candidate','address-agreement',EVIDENCE) for s in ['one','two']]
        self.assertEqual(len({r['site_id'] for r in rows}),2)

    def test_provenance_required(self):
        with self.assertRaises(ValueError):association('s','r','confirmed','reviewed-site-assertion',[])
        self.assertEqual(association('s','r','confirmed','reviewed-site-assertion',EVIDENCE)['state'],'confirmed')

    def observations(self):
        a={'source':'applications','raw_sha256':'aaa','retrieved_at':'2026-01-01T00:00:00Z','complete':True,'identity_qualified':True,'records':{'A':{'STATUS':'Review','DATE_SUBMITTED':'2025-12-01'},'B':{'STATUS':'Active'}}}
        b=copy.deepcopy(a);b.update(raw_sha256='bbb',retrieved_at='2026-02-01T00:00:00Z')
        return a,b

    def test_repackaging_does_not_create_event(self):
        a,b=self.observations();b['raw_sha256']=a['raw_sha256']
        self.assertEqual(compare_observations(a,b),{'state':'unchanged','changes':[]})

    def test_reordered_rows_do_not_create_event(self):
        a,b=self.observations();b['records']=dict(reversed(list(b['records'].items())))
        self.assertEqual(compare_observations(a,b)['changes'],[])

    def test_changed_first_seen_and_absent_have_receipts(self):
        a,b=self.observations();b['records']['A']['STATUS']='Approved';del b['records']['B'];b['records']['C']={'STATUS':'Review'}
        result=compare_observations(a,b)
        self.assertEqual({c['kind'] for c in result['changes']},{'publisher_fields_changed','absent_from_complete_export','first_observed'})
        self.assertTrue(all(len(c['observations'])==2 for c in result['changes']))
        self.assertNotIn('construction',str(result))

    def test_missing_field_is_not_null(self):
        a,b=self.observations();b['records']['A']['NEW']=None
        self.assertIn('NEW',compare_observations(a,b)['changes'][0]['fields'])

    def test_incomplete_export_blocks_disappearance(self):
        a,b=self.observations();b['complete']=False;b['records']={}
        self.assertEqual(compare_observations(a,b)['state'],'unavailable')

    def test_row_identity_does_not_support_history(self):
        a,b=self.observations();a['identity_qualified']=False
        self.assertEqual(compare_observations(a,b)['changes'],[])

    def test_duplicate_publisher_ids_are_not_overwritten(self):
        with self.assertRaises(ValueError):index_records([{'id':'x'},{'id':'x'}],'id')
        with self.assertRaises(ValueError):index_records([{'other':'x'}],'id')

    def test_single_observation_and_repackaging_are_baseline_only(self):
        a,b=self.observations();b['raw_sha256']=a['raw_sha256']
        self.assertEqual(history([a,b])['state'],'baseline_only')
        self.assertEqual(history([])['state'],'unavailable')

    def test_overlapping_regions_keep_membership(self):
        from shapely.geometry import shape, Point
        g={'type':'Polygon','coordinates':[[[-79.5,43.5],[-79.4,43.5],[-79.4,43.6],[-79.5,43.6],[-79.5,43.5]]]}
        regions=[union_geometry([{'geometry':g}]),union_geometry([{'geometry':g}])]
        self.assertEqual(sum(shape(r).intersects(Point(-79.45,43.55)) for r in regions),2)

    def test_wrong_source_or_reverse_date_fails(self):
        a,b=self.observations()
        with self.assertRaises(ValueError):compare_observations(b,a)
        b['source']='other'
        with self.assertRaises(ValueError):compare_observations(a,b)

    def test_boundaries_typography_not_fuzzy_matching(self):
        self.assertEqual(normalized_name('North St. James Town'),normalized_name('North St.James Town'))
        self.assertNotEqual(normalized_name('North Toronto'),normalized_name('North York'))

    def test_invalid_boundary_not_repaired(self):
        g={'type':'Polygon','coordinates':[[[-79,43.5],[-79.1,43.6],[-79,43.6],[-79.1,43.5],[-79,43.5]]]}
        with self.assertRaises(ValueError):union_geometry([{'geometry':g}])

    def test_human_gate_cannot_pass_with_repeated_participant(self):
        checks=dict.fromkeys(['boundaries','rights','accounting','site_identity','matching_review','history','browser_qa','public_isolation'],True)
        people=[{'participant_id':'same','passed':True,'evidence_reference':'session'}]*5
        self.assertFalse(release_gate(checks,people)['ready'])
        people=[{'participant_id':str(i),'passed':True,'evidence_reference':'session'} for i in range(5)]
        self.assertTrue(release_gate(checks,people)['ready'])
        checks['site_identity']=False
        self.assertFalse(release_gate(checks,people)['ready'])

if __name__=='__main__':unittest.main()
