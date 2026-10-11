"""Run one approved Atlas experiment and export a new local evidence entry."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from src.atlas import export_atlas_entry


def main() -> None:
    """Thin command-line adapter; reusable workflow lives in src.atlas."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--scenario', required=True, type=Path)
    parser.add_argument('--population', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    try:
        entry = export_atlas_entry(args.scenario, args.population, ROOT, args.output)
    except (ValueError, OSError) as exc:
        parser.exit(1, f'Atlas export refused: {exc}\n')
    print(f'Saved local evidence: {args.output}')
    for name, case in entry['cases'].items():
        print(f'{name}: {case["summary"]["counts"]}')
    print('Not a citywide ranking, route certification or public-release approval.')


if __name__ == '__main__':
    main()
