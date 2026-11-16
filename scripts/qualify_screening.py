"""Build-bound submission report. Never inherit another package's rights approval."""
import gzip,hashlib,json
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from scripts.check_public_boundary import check
from scripts.site_history import digest
ROOT=Path(__file__).resolve().parents[1]


def verified_saved_pdf(root: Path, build: str, receipt: dict) -> bool:
    """Bind a reviewed PDF to this candidate and reject changed or escaped artifacts."""
    pdf=receipt.get('pdf',{})
    path=(root/pdf.get('path','')).resolve()
    return (receipt.get('build_id')==build and pdf.get('passed') is True
            and path.is_relative_to((root/'data/growth-qualification'/build).resolve())
            and path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest()==pdf.get('sha256'))


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
    energy_contract_path=ROOT/'docs/energy/rights-contract.json'
    energy_contract=json.loads(energy_contract_path.read_text()) if release.get('energy',{}).get('available') else None
    if energy_contract:
        validate_contract(package/'planning/energy',energy_contract,ROOT)
        allowed_data.update({'energy/'+v+'/'+name for v,entries in energy_contract['versions'].items() for name in entries})
        allowed_data.add('energy/latest.json')
        if release['energy']['rights_contract_sha256']!=hashlib.sha256(energy_contract_path.read_bytes()).hexdigest():raise ValueError('Energy rights receipt mismatch')
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
    gates={'accounting':{'status':'passed' if m['accounting']['input_records']==m['accounting']['accounted_records'] else 'blocked','evidence':m['accounting']},'source_sample':{'status':'passed' if audit.get('analysis')==version and audit.get('passed') else 'blocked','evidence':'source-audit.json'},'public_isolation':{'status':'passed','evidence':'check_public_boundary against dist-public'},'browser':{'status':'passed' if browser.get('build_id')==build and browser.get('passed') is True else 'blocked','evidence':str(browser_path.relative_to(ROOT))},'rights':{'status':'passed' if rights_passed else 'blocked','evidence':'submission-rights-register.json','reason':'Reviewed screening, energy derivatives and bounded illustrative massing; legacy explorer datasets excluded.' if rights_passed else 'Package differs from reviewed allowlist.'},'participants':{'status':'blocked','reason':'No genuine participant sessions supplied; user impact not yet validated.'},'publication':{'status':'blocked','reason':'Owner review and separate publication approval required.'}}
    # Functional browser review and actual assistive-technology testing are separate gates.
    pdf_passed=verified_saved_pdf(ROOT,build,browser)
    gates['pdf']={'status':'passed' if pdf_passed else 'blocked','evidence':str(browser_path.relative_to(ROOT)),
                  'reason':'Saved PDF inspected and artifact hash verified.' if pdf_passed else 'No verified saved PDF for this build.'}
    reader_path=browser_path.parent/'screen-reader.json'
    reader=json.loads(reader_path.read_text()) if reader_path.exists() else {}
    gates['screen_reader']={'status':'passed' if reader.get('build_id')==build and reader.get('passed') is True and reader.get('actual_session') is True else 'blocked',
                           'evidence':str(reader_path.relative_to(ROOT)),
                           'reason':'Actual screen-reader session is required; functional browser and PDF checks do not satisfy it.'}
    dest=ROOT/'docs/growth-transit';dest.mkdir(exist_ok=True)
    (dest/'submission-rights-register.json').write_text(json.dumps({'build_id':build,'screening_source_evidence':evidence,'datasets':contract['datasets'],'licence_url':contract['licence_url'],'permitted_use':contract['permitted_use'],'attribution':contract['attribution'],'exemptions':contract['exemptions'],'studio':contract.get('studio'),'energy':energy_contract,'controls':contract['controls'],'evidence_files':contract['evidence_files'],'excluded_legacy_snapshots':release.get('legacy_snapshots_excluded',[]),'disabled_features':release.get('disabled_features',[]),'note':'Package-specific review. Source archives remain intact; no blanket qualification of legacy records.'},indent=2))
    energy_review_path=ROOT/'docs/energy/analytical-review.json'
    energy_review=json.loads(energy_review_path.read_text()) if energy_review_path.exists() else {}
    energy_version=json.loads((package/'planning/energy/latest.json').read_text())['id'] if energy_contract else None
    gates['energy_analysis']={'status':'passed' if energy_version and energy_review.get('version')==energy_version and energy_review.get('passed') else 'blocked' if energy_version else 'not-applicable','evidence':'docs/energy/analytical-review.json'}
    gates['energy_rights']={'status':'passed' if energy_contract else 'not-applicable','evidence':'docs/energy/rights-contract.json'}
    result={'build_id':build,'analysis':version,'energy':energy_version,'release_ready':False,'gates':gates,'package_file_count':len(files)}
    (dest/'release-report.json').write_text(json.dumps(result,indent=2));return result

if __name__=='__main__':print(json.dumps(qualify(),indent=2))
