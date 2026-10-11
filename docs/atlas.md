# Network Resilience Atlas — evidence foundation

The first implementation slice is a reusable local evidence export. It does not
yet deliver a map, catalogue, arbitrary closure support or a citywide ranking.

## Run one approved experiment

From the repository root with the existing project environment:

```sh
../.venv/bin/python -B scripts/export_atlas_entry.py \
  --scenario config/scenarios/viaduct_don_crossing.v1.json \
  --population data/processed/scenario_preparation/viaduct_don_crossing.population.v1.json \
  --output data/processed/atlas/viaduct_don_crossing.entry.v1.json
```

This executes the real baseline/open, baseline/closed, reviewed/open and
reviewed/closed path calculations. Choose a NEW output version for another run;
existing outputs are never overwritten. This command does not approve scenarios,
change source files, regenerate populations, change graphs on disk or publish.

`src.atlas.export_atlas_entry` delegates to the existing approval/source/population
gates. It validates returned pair order and removal counts, snapshots the approved
specification and population, and exports both per-pair results and summaries.
Input and executing module hashes are checked before/after computation. The full
entry has a canonical SHA-256 excluding its own `entry_sha256` field. Generation
timestamps differ between runs; compare cases and provenance for reproducibility,
not the whole-file digest. Hashes detect drift; they are not digital signatures.

A same-directory temporary file and exclusive hard link create a complete output
without overwriting. Unsupported filesystems fail rather than falling back to
unsafe replacement. A failure leaves no final result; the temporary file is removed.

## Reading results

- `cases.baseline`: diagnostic topology, not ground truth.
- `cases.reviewed`: six-crossing prototype, not citywide validated routing.
- Each contains `summary` and ordered `pairs`; each pair contains open and closed
  distance in metres, outcome status and extra distance where defined.
- Already-unreachable pairs remain in the export and total denominator.
- `affected_pct_of_reachable_open` counts longer plus newly unreachable pairs,
  divided by pairs reachable in that topology's open graph. A zero denominator
  gives null. Do not compare percentages without inspecting their denominators.
- `longer_pairs_extra_distance_m` excludes unchanged and unreachable pairs and
  explicitly reports its denominator. Its median/maximum are null when empty.
- Component/isolate changes are labelled `graph_qa_not_people`.
- `public_release_ready` and `cross_scenario_ranking_ready` are false. Neither
  export success nor a small sampled impact certifies real-world resilience.

The frozen sample is not observed journeys or a population-weighted estimate.
Route examples, external route checks and sample sensitivity remain next steps.
Different corridors need a common benchmark population and consistent exclusion
rules before they can appear in a comparative vulnerability ranking.

## First local experiment — 2026-10-09

Executed the command above on the approved unchanged v1 corridor and v1 frozen
population. Saved `data/processed/atlas/viaduct_don_crossing.entry.v1.json` (ignored
derived data; preserve it with local evidence exports). Canonical entry digest:
`bbbb7d651d66143d5d0844f63482a6e776a6a70d91dec87d9b78e02c0a9b5e0c`.

| Outcome | Baseline topology | Six-crossing reviewed topology |
|---|---:|---:|
| Total frozen pairs | 8,190 | 8,190 |
| Already unreachable | 256 | 256 |
| Newly unreachable | 0 | 0 |
| Longer after closure | 984 | 857 |
| Unchanged | 6,950 | 7,077 |
| Reachable-open denominator | 7,934 | 7,934 |
| Affected share of reachable-open pairs | 12.40% | 10.80% |
| Median extra distance among longer pairs | 480.28 m | 480.28 m |
| Maximum extra distance among longer pairs | 2,282.10 m | 2,180.28 m |

Each topology removed exactly 20 directed arcs. The reviewed closure isolates
nine internal graph vertices, which were excluded from the analysis population
before all four conditions. These are not nine isolated residents or communities.
Zero newly unreachable sampled pairs does not prove that all real journeys remain
possible. These are preliminary model results, not a citywide vulnerability ranking.

Verification: 45 unit tests passed. Independent JSON read-back checked canonical
integrity, exact current scenario/population snapshots, ordered OD identity,
category conservation and non-shortening distances. No external route validation
or sample sensitivity run has yet been completed. Next inspect representative
changed and unchanged routes, then design the comparable multi-corridor benchmark.

## Tests

```sh
../.venv/bin/python -B -m unittest discover -s tests -v
```

Atlas tests cover denominators, null distances, malformed results, pair/removal
agreement, approval blocking, upstream gate failure, input drift, output integrity
and overwrite refusal. Synthetic export tests mock only the upstream runner;
its source/population gates are covered separately in `test_scenario_io.py`.
