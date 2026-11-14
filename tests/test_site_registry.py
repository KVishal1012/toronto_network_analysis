"""Parcel identity continuity and conservative spatial association tests."""
import unittest
from shapely.geometry import box, mapping, Point
from shapely.strtree import STRtree
from scripts.build_site_registry import continuity, fingerprint, candidates


def parcel(g, kind='COMMON'):
    return {'geometry':mapping(g),'fingerprint':fingerprint(g,kind),'feature_type':kind}

class RegistryTests(unittest.TestCase):
    def test_rerun_and_row_reorder_keep_internal_ids(self):
        a=parcel(box(0,0,1,1));b=parcel(box(2,0,3,1))
        first,_=continuity([a,b],[])
        second,edges=continuity([parcel(box(2,0,3,1)),parcel(box(0,0,1,1))],first)
        self.assertEqual({r['fingerprint']:r['site_id'] for r in first},{r['fingerprint']:r['site_id'] for r in second})
        self.assertEqual(edges,[])

    def test_geometry_change_does_not_silently_reuse_id(self):
        old,_=continuity([parcel(box(0,0,1,1))],[])
        new,edges=continuity([parcel(box(0,0,1.1,1))],old)
        self.assertNotEqual(new[0]['site_id'],old[0]['site_id'])
        self.assertEqual(edges[0]['kind'],'possible_boundary_or_type_change')
        self.assertEqual(edges[0]['state'],'candidate')

    def test_split_is_pending_review(self):
        old,_=continuity([parcel(box(0,0,2,1))],[])
        new,edges=continuity([parcel(box(0,0,1,1)),parcel(box(1,0,2,1))],old)
        self.assertEqual(len(edges),2)
        self.assertTrue(all(e['kind']=='possible_split' for e in edges))
        self.assertEqual(len({r['site_id'] for r in new}),2)

    def test_merge_is_pending_review(self):
        old,_=continuity([parcel(box(0,0,1,1)),parcel(box(1,0,2,1))],[])
        _,edges=continuity([parcel(box(0,0,2,1))],old)
        self.assertEqual(len(edges),2)
        self.assertTrue(all(e['kind']=='possible_merge' for e in edges))

    def test_shared_boundary_is_not_lineage(self):
        old,_=continuity([parcel(box(0,0,1,1))],[])
        _,edges=continuity([parcel(box(1,0,2,1))],old)
        self.assertEqual(edges,[])

    def test_boundary_hit_preserves_both_candidates(self):
        geometries=[box(0,0,1,1),box(1,0,2,1)]
        rows,_=continuity([parcel(g) for g in geometries],[])
        ids,reason=candidates(Point(1,.5),STRtree(geometries),rows)
        self.assertEqual(len(ids),2);self.assertEqual(reason,'multiple_parcels')

    def test_overlapping_condo_and_common_remain_ambiguous(self):
        g=box(0,0,1,1)
        rows,_=continuity([parcel(g),parcel(g,'CONDO')],[])
        self.assertNotEqual(rows[0]['site_id'],rows[1]['site_id'])
        self.assertEqual(candidates(Point(.5,.5),STRtree([g,g]),rows)[1],'multiple_parcels')

    def test_single_hit_is_not_confirmation_and_missing_is_not_zero(self):
        g=box(0,0,1,1);rows,_=continuity([parcel(g)],[]);tree=STRtree([g])
        self.assertEqual(candidates(Point(.5,.5),tree,rows)[1],'single_parcel_spatial_candidate')
        self.assertEqual(candidates(None,tree,rows),([],'unlocated'))
        self.assertEqual(candidates(Point(3,3),tree,rows),([],'no_eligible_parcel'))

    def test_duplicate_previous_signature_fails(self):
        old,_=continuity([parcel(box(0,0,1,1))],[])
        with self.assertRaises(ValueError):continuity([],old+old)

if __name__=='__main__':unittest.main()
