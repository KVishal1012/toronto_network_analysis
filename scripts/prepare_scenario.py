"""Verify open inputs and save a frozen OD population; never run a closure."""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from src.scenario_io import freeze_population, prepare_scenario, save_population


def main() -> None:
    """Prepare candidate evidence without approving or executing the scenario."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--scenario', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--seed', type=int, default=42)
    parser.add_argument('--origins', type=int, default=32)
    parser.add_argument('--destinations', type=int, default=256)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('Output already exists; choose a new versioned artifact path.')
    prepared = prepare_scenario(args.scenario, ROOT)
    population = freeze_population(prepared, seed=args.seed, origin_count=args.origins,
                                   destination_count=args.destinations)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    save_population(population, args.output)
    print(f'Verified sources; saved {population["pair_count"]} fixed pairs to {args.output}')
    print(f'Eligible original nodes: {population["eligible_count"]}; excluded: {len(population["excluded_nodes"])}')
    print('No closure executed. Boundary approval and enabled status were not changed.')


if __name__ == '__main__':
    main()
