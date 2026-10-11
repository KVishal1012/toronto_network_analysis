# Scenario engine foundation

Status: low-level library, approval-gated runner, verified source preparation,
frozen OD artifact and synthetic tests. The first approved local Viaduct four-case
run and evidence export completed on 2026-10-09 through the [Atlas workflow](atlas.md).
There is no public dashboard, route certification or citywide ranking yet.

`src/scenarios.py` provides:

- `remove_source_segments`: removes all directed arcs for explicit source IDs
  from a deep copy; retains every node and every other keyed edge/attribute.
  Protected IDs must be present and must not overlap the removal list.
- `compare_closure`: computes directed shortest-length paths for supplied OD
  pairs before/after removal. Categories are already unreachable, newly
  unreachable, longer and unchanged. Missing paths use `None`, not zero. Extra
  length is defined only when both paths exist. Pair order and denominator stay
  fixed; raw component/isolate counts never represent people.
- `compare_topology_cases`: applies the same explicit closure and exact shared
  OD list to baseline and reviewed graphs, yielding four conditions. It rejects
  OD nodes missing from either graph rather than silently dropping them.

Inputs must be directed multigraphs with a projected metre CRS, positive finite
`length_m` on every edge and positive integer `source_centerline_id` attributes.
OD pairs must be unique, non-self tuples. This bounded prototype allows at most
100 origins and 100,000 pairs, with two searches per origin per topology.

No graph simplification, post-closure largest-component selection, name-based
removal, inferred crossing transfers, traffic modelling or travel-time estimates
occur. Floating differences below 1e-8 metres are treated as unchanged.

## Approval boundary

These are generic research primitives, not a scenario activation mechanism.
They neither read nor enable scenario specifications. The project owner approved
the Viaduct specification on 2026-10-08 for a hypothetical selected-Centreline
corridor experiment only, accepting the documented southern access-road uncertainty.
Exact physical bridge-deck and operational closure limits remain unapproved.
Use the gated workflow below rather than passing IDs directly to the primitives.

Use `src/scenario_io.py` for file-backed workflows, not the primitives directly:

- `load_scenario` refuses disabled/unapproved specifications. Approval requires
  reviewer, ISO review date, boundary description, evidence references/findings,
  and `definition_sha256(spec)`. The digest covers every definition field except
  enabled/status/boundary_approval. Changing the definition invalidates review.
- `prepare_scenario` may inspect candidates but never removes edges or computes
  paths. It verifies all five shapefile checksums and the crossing-register hash,
  reconstructs both open graphs, checks segment endpoints/coordinates/directions,
  lengths, incident/protected segment coverage and reviewed crossing assignments.
  Version one supports an internally unbranched, bidirectional corridor only.
- `freeze_population` excludes corridor-interior vertices, replaced crossing IDs,
  nonshared original nodes and optional explicit exclusions with reasons. It uses
  deterministic SHA-256 ranks over original node IDs, with separate origin and
  destination selections. No reachability or post-closure filtering is performed.
- `save_population` refuses overwrite. Its JSON contains exact ordered pairs,
  exclusion reasons, seed, eligibility digest, source-definition binding, code
  hashes and dependency versions. It is a structural sample, not observed trips.
- `run_saved_scenario` checks approval first, rebuilds verified graphs, regenerates
  the population and demands exact manifest equality before invoking the four
  conditions. No bypass flag exists. Results are returned in memory, not published.
  `src.atlas.export_atlas_entry` wraps this runner to save a new, versioned local
  evidence entry without replacing old exports or approving public release.

Approval is an explicit local review attestation, not proof of the reviewer's
identity or City authorization. Evidence quality still needs human review.
Source acquisition date/vintage remain unresolved for the current candidate;
hash verification is snapshot consistency, not freshness or public-release approval.

## Saved preparation (2026-10-03)

The local candidate passed source/geometry/crossing checks while remaining disabled.
The artifact is `data/processed/scenario_preparation/viaduct_don_crossing.population.v1.json`:
35,941 eligible original nodes, 12 excluded original IDs (overlapping reasons),
32 origins, 256 destinations, seed 42, and 8,190 pairs after excluding two self-pairs.
The nine corridor-interior and six reviewed crossing IDs overlap at three IDs.
All four eventual conditions will use this exact pair list. No closure was run.

Regenerate to a NEW output path from the repository root:

```sh
python -B scripts/prepare_scenario.py \
  --scenario config/scenarios/viaduct_don_crossing.v1.json \
  --output data/processed/scenario_preparation/viaduct_don_crossing.population.v2.json
```

Derived data is excluded from Git; retain the artifact with your evidence exports.
Changes to source/config/code/dependency bindings require a new preparation. Do not
silently overwrite the old one. Changing only approval controls preserves its binding.

On 2026-10-08, the owner's explicit scoped approval replaced the temporary
candidate-disabled test with checks for a definition-bound, narrowly scoped
approval. Synthetic runner tests continue to reject disabled, unapproved,
missing-evidence and stale-definition cases. Only approval controls and review
documentation changed; the saved definition and OD population are not reselected.
Approval enables a local model experiment, not publication or operational use.

### Scoped-approval verification (2026-10-08)

The enabled specification passed `load_scenario`; real local source hashes,
geometry, protected-segment coverage and crossing assignments passed
`prepare_scenario`. Regenerating the population in memory matched the entire
saved v1 manifest exactly (8,190 pairs, including provenance bindings). Definition
SHA-256 remains `7c6dcb8317d14e33fcb40af2e842d894973a13eb7d0b75dabadc857e3eb7792c`.
All 35 tests passed. This verification did not execute the real closure or
shortest-path comparison and did not overwrite the population artifact.

## Verification

From the repository root, using the project's Python environment:

```sh
python -B -m unittest discover -s tests -p 'test_scenarios.py' -v
python -B -m unittest discover -s tests -p 'test_scenario_io.py' -v
python -B -m unittest discover -s tests -v
```

Tests use hand-calculated toy networks, including parallel same-name roads,
one-way edges, self-loops, tuple crossing nodes, protected lower roads, missing
weights, invalid units, immutable inputs and retained disconnected vertices.

Implementation reference: [NetworkX weighted path lengths](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.shortest_paths.weighted.single_source_dijkstra_path_length.html).
The library validates weights explicitly because NetworkX otherwise defaults a
missing weight to one. Neither library success nor these tests certify legal
driving routes or the unresolved citywide topology.
