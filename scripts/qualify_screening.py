"""Build-bound submission report. Never inherit another package's rights approval."""
import gzip,hashlib,json
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.check_public_boundary import check
from scripts.site_history import digest
ROOT=Path(__file__).resolve().parents[1]


def qualify() -> dict:
    package=ROOT/'dist-public';files={p.relative_to(package).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(package.rglob('*')) if p.is_file()};build=digest(files)
    base=package/'planning/screening';version=json.loads((base/'latest.json').read_text())['id'];m=json.loads((base/version/'manifest.json').read_text())
    audit=json.loads((ROOT/'docs/growth-transit/source-audit.json').read_text());check(package)
    from scripts.package_submission import validate_contract
    contract_path=ROOT/'docs/growth-transit/package-rights-contract.json'
    contract=json.loads(contract_path.read_text())
    validate_contract(base,contract,ROOT)
    release=json.loads((package/'release-validation.json').read_text())
    allowed_data={'screening/'+version+'/'+key for version,files in contract['versions'].items() for key in files}
    allowed_data.update({'screening/latest.json','screening/withdrawn.json'})
    actual_data={p.relative_to(package/'planning').as_posix() for p in (package/'planning').rglob('*') if p.is_file()}
    rights_passed=actual_data==allowed_data and release.get('edition')=='housing-transit-3d' and contract.get('studio',{}).get('status')=='qualified_for_illustrative_use' and release.get('rights_contract_sha256')==hashlib.sha256(contract_path.read_bytes()).hexdigest()
    sources={};contact_objects=[]
    for path in (package/'planning').glob('*/manifest.json'):
        pm=json.loads(path.read_text())
        for key,s in pm.get('sources',{}).items():
            identity=(key,s.get('sha256'));sources[str(identity)]={'source':key,'source_hash':s.get('sha256'),'page':s.get('page'),'licence':s.get('licence'),'status':'requires_package_specific_review','reason':'Legacy explorer asset included; screening-only rights review does not qualify it.'}
        for name,h in pm.get('assets',{}).items():
            if name.startswith('details/applications-'):
                raw=gzip.decompress((package/'planning/objects'/(h+'.json.gz')).read_bytes())
                if any(k in raw for k in (b'CONTACT_NAME',b'CONTACT_PHONE',b'CONTACT_EMAIL')):contact_objects.append(h)
    evidence={'planning':m['planning_sources'],'boundaries':m['boundary_sources'],'ttc':m['transit_source'],'derived':'ASTER grid, point proximity and scheduled frequency screening. No document images or PDFs.'}
    browser_path=ROOT/'data/growth-qualification'/build/'browser.json';browser=json.loads(browser_path.read_text()) if browser_path.exists() else {}
    gates={'accounting':{'status':'passed' if m['accounting']['input_records']==m['accounting']['accounted_records'] else 'blocked','evidence':m['accounting']},'source_sample':{'status':'passed' if audit.get('analysis')==version and audit.get('passed') else 'blocked','evidence':'source-audit.json'},'public_isolation':{'status':'passed','evidence':'check_public_boundary against dist-public'},'browser':{'status':'passed' if browser.get('build_id')==build and browser.get('passed') is True else 'blocked','evidence':str(browser_path.relative_to(ROOT))},'rights':{'status':'passed' if rights_passed else 'blocked','evidence':'submission-rights-register.json','reason':'Reviewed screening versions and bounded illustrative massing; legacy explorer datasets excluded.' if rights_passed else 'Package differs from reviewed allowlist.'},'participants':{'status':'blocked','reason':'No genuine participant sessions supplied; user impact not yet validated.'},'publication':{'status':'blocked','reason':'Owner review and separate publication approval required.'}}
    dest=ROOT/'docs/growth-transit';dest.mkdir(exist_ok=True)
    (dest/'submission-rights-register.json').write_text(json.dumps({'build_id':build,'screening_source_evidence':evidence,'datasets':contract['datasets'],'licence_url':contract['licence_url'],'permitted_use':contract['permitted_use'],'attribution':contract['attribution'],'exemptions':contract['exemptions'],'studio':contract.get('studio'),'controls':contract['controls'],'evidence_files':contract['evidence_files'],'excluded_legacy_snapshots':release.get('legacy_snapshots_excluded',[]),'disabled_features':release.get('disabled_features',[]),'note':'Package-specific review. Source archives remain intact; no blanket qualification of legacy records.'},indent=2))
    result={'build_id':build,'analysis':version,'release_ready':False,'gates':gates,'package_file_count':len(files)}
    (dest/'release-report.json').write_text(json.dumps(result,indent=2));return result

if __name__=='__main__':print(json.dumps(qualify(),indent=2))
