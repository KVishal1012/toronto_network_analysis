# Toronto Street Intelligence

Toronto Street Intelligence turns the City of Toronto Centreline dataset into a validated, direction-aware street graph for civic network analysis.

The current Phase 1 foundation answers a narrow technical question:

> Can Toronto Centreline features be filtered into a defensible drivable-street population and converted into a reproducible graph without hiding topology or data-quality issues?

This phase does not claim to measure walkability or pedestrian accessibility. Those require separate feature definitions and additional evidence.

## Product direction

The product direction is the **Toronto Network Resilience Atlas**: explore connections with few alternatives, run reviewed disruption experiments and inspect the evidence behind the results. The Viaduct is the first validation case, not the entire product. See the [updated scope](docs/PRODUCT_SCOPE.md), [Atlas evidence workflow](docs/atlas.md) and [scoped Viaduct review](docs/scenarios/viaduct_don_crossing.md). On 2026-10-08 the project owner approved the hypothetical selected corridor, including selected approaches and access-road uncertainty. Exact physical/operational limits and citywide routing remain unvalidated. A public Atlas interface and cross-corridor ranking are not yet delivered.

## Foundation status

Scenario preparation and the approval-gated runner are documented in [scenario engine notes](docs/scenario_engine.md). The first local four-condition experiment completed on 2026-10-09 using all 8,190 frozen pairs. Its [Atlas evidence entry and preliminary results](docs/atlas.md#first-local-experiment--2026-10-09) retain source/approval/population provenance and per-pair outcomes. This is not route validation, a citywide ranking or public-release approval.

Implemented:

- Centreline schema standardization
- explicit drivable-feature selection
- text-placeholder normalization
- geometry, identifier, and CRS validation
- EPSG:26917 metric edge lengths
- direction-aware `NetworkX` multigraph construction
- preservation of parallel edges and self-loops
- cleaning and topology QA summaries
- synthetic unit tests
- an executed full-data validation notebook

Current full-source result:

| Metric | Value |
|---|---:|
| Source Centreline features | 64,671 |
| Retained drivable segments | 49,571 |
| Graph nodes | 35,953 |
| Directed graph edges | 93,144 |
| Weakly connected components | 49 |
| Nodes in largest component | 99.54% |
| One-way source segments | 5,953 |
| Self-loop source segments | 92 |
| Retained source length | 6,388.516 km |

These values come from the local Centreline export currently in `data/raw/Centreline`. Dataset acquisition metadata and automated download provenance are still required before public release.

## Project Structure

```text
toronto_street_intelligence/
├── data/                  # local source and derived data; excluded from Git
├── notebooks/
│   ├── 01_centerline_cleanup_and_eda.ipynb
│   └── 02_network_graph.ipynb
├── src/
│   ├── cleaning.py        # source validation and street-edge preparation
│   └── network.py         # graph construction and topology reporting
├── tests/
│   ├── test_cleaning.py
│   └── test_network.py
└── requirements-lite.txt
```

## Run the Foundation

Create a fresh Python environment and install the focused dependency set:

```bash
python -m venv .venv
.venv/bin/python -m pip install -r requirements-lite.txt
```

Run the tests:

```bash
.venv/bin/python -m unittest discover -s tests -v
```

Execute the network notebook from the project root:

```bash
.venv/bin/python -m nbconvert \
  --execute \
  --to notebook \
  --inplace notebooks/02_network_graph.ipynb
```

## Phase 1 Street Definition

Included feature types are declared in `src/cleaning.py`:

- Access Road
- Collector and Collector Ramp
- Expressway and Expressway Ramp
- Laneway
- Local
- Major Arterial and Major Arterial Ramp
- Minor Arterial and Minor Arterial Ramp
- Other and Other Ramp

Trails, walkways, rivers, railways, shorelines, hydro lines, ferry routes, busways, pending features, and geostatistical lines are excluded. Future pedestrian and cycling graphs must define and validate their own populations.

## Next Milestones

1. Add an official Toronto Open Data acquisition script, resource identifier, access date, checksum, and licence attribution.
2. Keep the approved hypothetical corridor distinct from unverified physical closure limits and unresolved access-road connections.
3. Run the implemented approval-gated, fixed-population baseline/reviewed and open/closed comparisons after source and population verification.
4. Export versioned results and provenance, retaining unresolved topology and disconnected-population warnings.
5. Deliver one accessible guided scenario with inspectable evidence, then obtain user feedback. See the product scope for release gates.

## Experimental Code

The existing GeoAI Portfolio Generator under `app/` and `src/portfolio_generator.py` is not part of the Toronto street-network pipeline. It should be separated before this repository is published.
