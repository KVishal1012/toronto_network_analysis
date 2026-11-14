"""Verify and copy a qualified local component package without editing its source."""
import argparse
import json
from server.components import ingest
parser=argparse.ArgumentParser()
parser.add_argument('package',help='Directory containing manifest.json and the source GeoPackage')
parser.add_argument('qualification',help='component_qualification.json with adjacent evidence files')
args=parser.parse_args()
print(json.dumps(ingest(args.package,args.qualification),indent=2))
