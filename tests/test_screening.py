import unittest
from datetime import date
from scripts.build_screening import units,group_projects,active_services,period_dates

class ScreeningTests(unittest.TestCase):
    def row(self,**kwargs):
        return {'id':'1','number':' 12 ABC ','label':'1 MAIN ST','lon':-79.4,'lat':43.6,'xy':[1,2],'status':'Active','units':100,**kwargs}
    def test_units(self):
        self.assertEqual(units('1,200'),1200)
        self.assertEqual(units('1200.0'),1200)
        for v in ('',None,'unknown','-1','12 apartments','1,2','1.5'):self.assertIsNone(units(v))
    def test_duplicates(self):
        groups=group_projects([self.row(),self.row(id='2',number='12 ABC')])
        self.assertEqual(len(groups),1);self.assertEqual(groups[0]['duplicates_collapsed'],1);self.assertIsNone(groups[0]['reason'])
    def test_conflicting_units(self):
        self.assertEqual(group_projects([self.row(),self.row(id='2',units=101)])[0]['reason'],'conflicting_identifier_group')
    def test_multi_address(self):
        self.assertEqual(group_projects([self.row(),self.row(id='2',label='3 MAIN ST')])[0]['reason'],'conflicting_identifier_group')
    def test_repeated_address_distinct_proposals(self):
        groups=group_projects([self.row(),self.row(id='2',number='OTHER')]);self.assertEqual(len(groups),2);self.assertTrue(all(g['reason']=='shared_location_distinct_identifiers' for g in groups))
    def test_unknown_is_not_zero(self):
        self.assertEqual(group_projects([self.row(units=None)])[0]['reason'],'unknown_units')
        self.assertEqual(group_projects([self.row(xy=None)])[0]['reason'],'unresolved_location')
    def test_exception_precedence(self):
        c=[{'service_id':'a','start_date':'20260101','end_date':'20261231','thursday':'1'}]
        e=[{'service_id':'a','date':'20261105','exception_type':'2'},{'service_id':'b','date':'20261105','exception_type':'1'}]
        self.assertEqual(active_services(c,e,date(2026,11,5)),{'b'})
    def test_expired_feed_uses_explicit_historical_dates(self):
        d=period_dates('20260930','20261031','20261105')
        self.assertEqual(d['morning'],'2026-10-30');self.assertEqual(d['saturday'],'2026-10-31')

if __name__=='__main__':unittest.main()

class TimetableTests(unittest.TestCase):
    def test_direction_repeated_stop_and_after_midnight(self):
        import csv,io,json,tempfile
        from pathlib import Path
        from zipfile import ZipFile
        from scripts.build_screening import service_index
        with tempfile.TemporaryDirectory() as tmp:
            p=Path(tmp)
            files={
              'stops.txt':[{'stop_id':'s','stop_name':'Stop','stop_lat':'43.65','stop_lon':'-79.38','location_type':'0'}],
              'routes.txt':[{'route_id':'r','route_short_name':'1'}],
              'calendar.txt':[{'service_id':'regular','start_date':'20261101','end_date':'20261130',**{d:'1' for d in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')}}],
              'trips.txt':[], 'stop_times.txt':[]}
            # Direction 0 has 4 distinct trips in both hours. Direction 1 has 3.
            for direction,count in [('0',4),('1',3)]:
                for hour in (7,8):
                    for i in range(count):
                        tid=f'{direction}-{hour}-{i}';files['trips.txt'].append({'trip_id':tid,'route_id':'r','service_id':'regular','direction_id':direction})
                        row={'trip_id':tid,'stop_id':'s','departure_time':f'{hour+24:02}:00:00','pickup_type':'0'}
                        files['stop_times.txt'].extend([row,row.copy()])
            with ZipFile(p/'merged.zip','w') as z:
                for name,rows in files.items():
                    stream=io.StringIO();writer=csv.DictWriter(stream,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows);z.writestr(name,stream.getvalue())
            result,_,_=service_index(p,{'feed':{'feed_start_date':'20261101','feed_end_date':'20261130'}},'2026-11-05')
            services=result['morning'][0]['services'];self.assertEqual(len(services),1);self.assertEqual(services[0]['direction'],'0');self.assertEqual(services[0]['hourly_departures'],[4,4])

class PackageTests(unittest.TestCase):
    def test_withdrawn_analysis_is_not_shipped(self):
        import tempfile,json,gzip,hashlib
        from pathlib import Path
        from scripts.package_screening import package_screening
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);source=root/'source';source.mkdir();dest=root/'dest'
            old='a'*20;new='b'*20
            for version in (old,new):
                d=source/version;d.mkdir();payload=b'[]';(d/'outcomes.json.gz').write_bytes(gzip.compress(payload))
                (d/'manifest.json').write_text(json.dumps({'id':version,'accounting':{'input_records':0,'accounted_records':0},'assets':{'outcomes':hashlib.sha256(payload).hexdigest()}}))
            (source/'latest.json').write_text(json.dumps({'id':new}));(source/'withdrawn.json').write_text(json.dumps({old:'Unsafe aggregation'}))
            package_screening(source,dest)
            self.assertFalse((dest/old).exists());self.assertTrue((dest/new).exists());self.assertIn(old,json.loads((dest/'withdrawn.json').read_text()))
