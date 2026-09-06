# Toronto Street Intelligence

Toronto Street Intelligence turns the City of Toronto Centreline dataset into a validated, direction-aware street graph for civic network analysis.

The current Phase 1 foundation answers a narrow technical question:

> Can Toronto Centreline features be filtered into a defensible drivable-street population and converted into a reproducible graph without hiding topology or data-quality issues?

This phase does not claim to measure walkability or pedestrian accessibility. Those require separate feature definitions and additional evidence.

## Current Status

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
2. Spatially inspect the 48 smaller graph components, 92 self-loops, and the one intersection ID with endpoint spread over one metre.
3. Export versioned graph-ready GeoParquet tables and a machine-readable QA report.
4. Add neighbourhood boundaries and compute carefully defined connectivity metrics.
5. Build public maps and an accessible explorer from precomputed outputs.

## Experimental Code

The existing GeoAI Portfolio Generator under `app/` and `src/portfolio_generator.py` is not part of the Toronto street-network pipeline. It should be separated before this repository is published.
