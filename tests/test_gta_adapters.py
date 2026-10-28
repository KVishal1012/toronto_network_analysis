"""Source-scoped address and regional-review normalization regressions."""
import unittest
from shapely.geometry import Point, box, mapping
from scripts.gta_adapters import address_rows, planning_rows, address_indexes, METRIC
from scripts.acquire_gta import acquire

class AdapterTests(unittest.TestCase):
    def setUp(self):
        self.x,self.y=METRIC.transform(-79.5,43.8)
        self.m=[{'id':'a','name':'Town','metric':mapping(box(self.x-100,self.y-100,self.x+100,self.y+100))}]
        self.a={'jurisdiction_ids':['a'],'label_field':'label','street_fields':['street'],'unit_field':'unit','notes':'Scope'}
        self.c={'schema':{'oid':'oid'}}
    def feature(self,oid=1,geometry=True):
        return {'properties':{'oid':oid,'label':' 12 Main St ','street':'Main St','unit':str(oid)},'geometry':mapping(Point(-79.5,43.8)) if geometry else None}
    def test_unit_variants_preserved_and_original_label_unchanged(self):
        rows,excluded=address_rows('s',{'features':[self.feature(1),self.feature(2)]},self.a,self.c,self.m)
        self.assertFalse(excluded);self.assertEqual(len(rows),2)
        self.assertEqual(rows[0]['label'],' 12 Main St ');self.assertEqual(rows[0]['search_label'],'12 MAIN ST')
        self.assertNotEqual(rows[0]['unit'],rows[1]['unit'])
    def test_missing_geometry_excluded_without_relocation(self):
        rows,excluded=address_rows('s',{'features':[self.feature(),self.feature(2,False)]},self.a,self.c,self.m)
        self.assertEqual(len(rows),1);self.assertEqual(excluded[0]['id'],'s:2')
    def test_boundary_address_not_assigned(self):
        self.m[0]['metric']=mapping(box(self.x,self.y,self.x+100,self.y+100))
        with self.assertRaisesRegex(ValueError,'No usable'):address_rows('s',{'features':[self.feature()]},self.a,self.c,self.m)
    def test_multiple_primaries_block(self):
        with self.assertRaisesRegex(ValueError,'Multiple address primaries'):
            address_indexes([{'jurisdiction_id':'a','source_key':'s'},{'jurisdiction_id':'a','source_key':'t'}],self.m,lambda *a:None)
    def test_status_conflict_is_not_resolved_by_preference(self):
        a={**self.a,'kind':'regional_reviews','scope':'regional review','status_unresolved':True,'status_fields':['old','new'],'label_fields':['label']}
        f=self.feature();f['properties'].update(old='Approved',new='In Progress')
        rows,_=planning_rows('r',{'features':[f]},a,self.c,self.m)
        self.assertEqual(rows[0]['original_status'],'Status interpretation unresolved');self.assertEqual(rows[0]['status'],'Unknown')
        self.assertEqual(rows[0]['source_status_fields'],{'old':'Approved','new':'In Progress'})
    def test_rights_block_precedes_network(self):
        with self.assertRaisesRegex(ValueError,'blocked'):acquire('s',{'acquisition_enabled':False},None)
    def test_unknown_crs_precedes_network(self):
        with self.assertRaisesRegex(ValueError,'CRS'):acquire('s',{'schema':{'crs':None}},None)
    def test_address_shards_are_bounded(self):
        rows=[{'id':str(i),'source_key':'s','jurisdiction_id':'a','search_label':str(i).zfill(4),'street':'MAIN'} for i in range(601)]
        assets={};route=address_indexes(rows,self.m,lambda k,v:assets.update({k:v}))
        self.assertEqual(route['a']['count'],601)
        self.assertTrue(all(len(v)<=250 for k,v in assets.items() if isinstance(v,list)))

    def test_composed_civic_label_keeps_suffix_unit_and_attributes(self):
        a={**self.a,'number_field':'number','number_suffix_field':'suffix'}
        del a['label_field']
        f=self.feature();f['properties'].update(number=12,suffix='A')
        rows,_=address_rows('s',{'features':[f]},a,self.c,self.m)
        self.assertEqual(rows[0]['label'],'12A Main St')
        self.assertEqual(rows[0]['unit'],'1')
        self.assertEqual(rows[0]['attributes'],f['properties'])
        f['properties']['number']=None
        with self.assertRaisesRegex(ValueError,'No usable'):
            address_rows('s',{'features':[f]},a,self.c,self.m)
