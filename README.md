# ASTER — Greater Toronto Area

The product scope now includes all 25 GTA municipalities. The published planning beta currently integrates Toronto. See [the GTA scope and source qualification record](docs/gta-expansion-scope.md); additional coverage must pass its own source audit before publication.

## Two editions

**ASTER Public** is the free planning explorer. **ASTER Lab** is the private, local research project for broader urban intelligence and digital twin work. They have separate entry points and build commands; the public build cannot open Lab through a URL parameter.

- Public preview: `npm run build:public`, then `npm run preview:public` → http://127.0.0.1:5175/.
- Private local app: `npm run start:private` → http://127.0.0.1:5173/. Automatic source acquisition starts paused.
- Full scope, boundaries and ambition: [edition plan](docs/product-editions.md).

## Neighbourhood Planning Explorer (public beta)

The default interface now explores official Toronto projects, applications and zoning independently of Bike Share. Run `npm run build:public` for the API-free distribution, then `python3 -m http.server 5174 --directory dist-public`. Open `http://127.0.0.1:5174/`. The existing local research workspace remains at `http://127.0.0.1:5173/?workspace=research`.

Source acquisition: `.venv/bin/python scripts/acquire_planning.py`; validation/build: `.venv/bin/python scripts/build_planning.py`. See `docs/planning-release.md` for qualified counts and limitations, and `docs/award-submission-draft.md` for the unsubmitted award draft.

## Earlier research foundation

A working local urban digital twin **foundation**, with a 3D reference city model, observed Bike Share snapshots, deterministic spatial analysis, source receipts and isolated inventory scenarios. ASTRA is the evidence workspace. It uses calculations and templates, not a language model.

## Run

Open **http://127.0.0.1:5173** while the servers are running. Opening `index.html` as a file will not run the application.

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.lock.txt
npm ci
sh scripts/start.sh
```

The UI binds to 127.0.0.1:5173; the Python API binds to 127.0.0.1:8042. Source acquisition starts automatically and repeats every two minutes while the local API process is running. Use **Pause updates** to suspend it; an in-flight run finishes. **Refresh sources** reacquires all sources manually. Internet access is needed for acquisition and contextual map tiles. Both services are local only; this is not a public production deployment.

To recreate the building store, download `3DMassingShapefile_2025_WGS84.zip` from the [City 3D Massing dataset](https://open.toronto.ca/dataset/3d-massing/) and run:

```sh
.venv/bin/python -m scripts.import_buildings /path/to/3dmassingshapefile_2025_wgs84.zip
```

The current workspace already contains the downloaded and validated data in `data/`. Raw datasets, local snapshots and dependencies are ignored by Git. The image-generated design concept is a visual reference only; it is never used as map data.

## Explore

- **Imagery / Map:** real Esri satellite/aerial mosaic or OpenStreetMap context. Acquisition dates vary and are not resolved here. Tilting imagery does not create textured buildings.
- **Photorealistic 3D:** separate Google Maps + Cesium viewer; see credential setup below.
- **Rank:** compare current rentable bikes per mapped station. Inspect numerator, denominator, exact shared ranks, excluded neighbourhoods and source receipts. **Map availability** draws a fixed-bin choropleth, with unavailable values gray.
- **3D / 2D:** switch dimensional views. Drag to pan, use the compass or right-drag to rotate/tilt; scroll to zoom. **View waterfront** resets the 3D camera.
- **Buildings:** click a volume to inspect source AVG_HEIGHT, method and source row. Uniform extrusions use actual source values at 1× scale on flat ground. The 2025 model is separate from time-varying observations.
- **Neighbourhoods:** search by official name or ID, or select a map polygon. Inspect projected area and matched station records. Current inventory is unavailable if any required report fails validation.
- **Scenario:** select stations and evaluate a hypothetical simultaneous outage. The result is static inventory subtraction; no demand, routing or causal forecast is implied. Missing/stale data returns VERIFY; complete required station evidence returns ASK. Neither executes an action. Evaluations and named local review records go to separate append-only tables. Review is refused if the baseline is stale or superseded. Reviewer identity is self-declared, not authenticated. Export the scenario and review evidence before switching snapshots.
- **Explain / Sources:** inspect methods, source timestamps, SHA-256 receipts, limitations and the evidence export.
- **Replay:** choose an actual stored snapshot and pin it; **Follow latest** resumes following new acquisitions. Freshness is evaluated at read time, so old observations are never displayed as current.

## Evidence and limitations

| Layer | Source | Meaning |
|---|---|---|
| Neighbourhoods | [City of Toronto](https://open.toronto.ca/dataset/neighbourhoods/) | 158 social planning polygons in the retrieved reference snapshot; not a legal/cadastral boundary |
| Station locations/status | [City catalog](https://open.toronto.ca/dataset/bike-share-toronto/) → operator GBFS v1 | 1,066 station locations in the September 8 validation snapshot; subsequent counts vary; operator-reported, not independently field-verified |
| 3D buildings | [City 2025 massing](https://open.toronto.ca/dataset/3d-massing/) | 428,184 input footprints; 428,167 accepted; 17 invalid geometries quarantined |
| Context basemap | [OpenStreetMap](https://www.openstreetmap.org/copyright) | Third-party cartographic context, not an analytical measurement layer |

The City's massing metadata explicitly describes an **illustrative** model and requires user verification for legal/official use. Source heights include LiDAR-derived (metadata references 2015 LiDAR), site plans and other methods. A 2025 release does not imply every building was surveyed in 2025. Source AVG_HEIGHT is used without inventing missing heights; roof detail, terrain and vertical datum reconstruction are not implemented.

The archive filename says WGS84, but its `.prj` and coordinate magnitudes identify **EPSG:3857**. The importer transforms geometry from the declared CRS to EPSG:4326. Neighbourhood measurements use EPSG:26917; neither Web Mercator area nor angular degrees are used as metric measurements.

Weather, traffic, flood depth, population exposure, predicted demand and real-world action adapters are **not connected**. This is not a complete operational or predictive city twin, and no state-of-the-art performance claim has been evaluated. Source provenance prevents invented records; it cannot guarantee that a publisher's data is error-free.

## Architecture

```text
City boundaries + operator station feeds
  → raw response archive (SHA-256)
  → CRS / geometry / ID / count validation
  → deterministic Shapely spatial joins + PROJ measurements
  → immutable application snapshots in DuckDB
  → local API → React / MapLibre → ASTRA
                            ↘ isolated scenario → ASK / VERIFY

City 2025 massing ZIP → validated reference DuckDB → bounded viewport API → 3D context
```

DuckDB is used for local analytical storage and bounded SQL reads; Shapely performs the spatial join. DuckDB Spatial and PostGIS are **not** claimed to be installed. Each snapshot records retrieval and observation times, source hashes, method version and row accounting. A refresh appends a new state. Upstream failures are stored explicitly, and older snapshots remain available through replay.

Freshness policy: both operator feeds and each station report must be at most 300 seconds old; future skew above 60 seconds is rejected. Missing counts/flags remain unknown. All required station reports must pass before a neighbourhood total is called current. A zero is shown only when supported. These are application thresholds, not an official operator SLA. UI freshness rechecks every 15 seconds. Source acquisition runs every 120 seconds after the preceding run completes, without overlap or catch-up bursts. Automatic runs reuse verified archived reference boundary bytes for up to 24 hours, preserving their original retrieval timestamp. Failed live feeds are not replaced with cached successes. A failed state read clears current results rather than leaving stale freshness badges visible.

Building queries return at most 6,000 candidate footprints per viewport and disclose truncation; zoom closer for complete coverage. Building IDs identify source rows within the fixed archive, not stable cadastral identifiers. No public tile scraping or offline basemap download is implemented.

## Verify

```sh
npm test
npm run build
```

See `docs/data-validation.json`, `docs/buildings-validation.json` and `docs/verification.md` for the validation receipts and browser checks. Synthetic unit fixtures are confined to tests and never enter product data.

## Operation and recovery

- Local evidence workflows require no cloud credentials. The optional Google 3D view requires your own billing-enabled project and restricted browser key.
- Set `ASTER_AUTO_REFRESH=0` before starting the API to default to paused. The UI pause setting lasts for the running API process; it is not an OS scheduler. No notifications or external actions are sent.
- `/api/updates` exposes polling state, completed runs, degraded runs, elapsed time and latest error. Failed runs also appear in the local server log.
- Snapshots and raw receipts are retained without automatic deletion; the history selector shows the latest 50. Monitor local disk growth during sustained operation.
- Snapshot ledger: `data/world.duckdb`; raw response archive: `data/raw/`; buildings: `data/buildings.duckdb`; building rejection IDs: `data/building-rejections.ndjson`.
- Copy the `data/` directory while the servers are stopped to back up or restore this local installation. Raw archives are required for reproducibility. Runtime source failures are logged and exposed in the source ledger.
- Stop the services with Ctrl+C in their terminal. The startup script stops its API child on exit.
- Public deployment requires an authenticated serving stack, explicit origin/host controls, workload testing, retention rules, an appropriate basemap service, and review of upstream redistribution terms. The current threaded Python HTTP server is for local use.

## Next evidence gates

1. Add official weather station observations with measured location, timestamp, units and gaps; do not assign a station reading uniformly to the city.
2. Add validated street-network topology and disruption observations before routing or accessibility claims.
3. Add event-held-out model evaluation and calibration before flood, traffic or demand predictions.
4. Benchmark representative repeated joins and concurrent reads before selecting PostGIS for a hosted deployment; compare identical row counts, CRS, join cardinality and measured outputs first.
5. Model and verify real outcomes before adding any action adapter. No autonomous action is implied by the present interface.

## Google photorealistic 3D setup

1. In your own Google Cloud project, enable billing and **Map Tiles API**. Check quotas and budget controls yourself; this app does not set a spending cap.
2. Create a browser API key restricted to Map Tiles API and `http://127.0.0.1:5173/*` (add other origins only when needed). Browser keys are visible to the browser, so referrer and API restrictions matter.
3. Copy `.env.example` to `.env.local`, enter `VITE_GOOGLE_MAPS_API_KEY` locally, then restart Vite. Do not commit or paste the key into chat.
4. Open **Photorealistic 3D → Load Google 3D**. No request is sent to Google before that click. Key configuration is not evidence of successful access; check the actual scene and attribution.

Cesium 1.145.0 loads directly from the pinned npm dependency and serves its workers/assets locally. Google supplies the textured mesh including ground surfaces. The globe, Ion basemap, Ion terrain and geocoder are disabled. No Google imagery is downloaded into the evidence archive or used for GeoAI inference. Per-tile capture dates, surveyed heights and individual building identities are not inferred from the mesh. City reference building evidence remains in **World state**.

Provider documentation checked September 12, 2026: [Google setup](https://developers.google.com/maps/documentation/tile/get-api-key), [usage and billing](https://developers.google.com/maps/documentation/tile/usage-and-billing), [visualization and attribution policies](https://developers.google.com/maps/documentation/tile/policies), [Cesium integration](https://cesium.com/learn/cesiumjs-learn/cesiumjs-photorealistic-3d-tiles/). Live Google access, coverage and visual quality remain unverified until configured.

To disable Google rendering, clear the key and restart/rebuild. To roll back runtime state, stop the API and restore your `data/` backup; never merge scenario tables into snapshots.

### 3D station outage simulation

Open **3D simulation**, search for a neighbourhood, select stations, and choose **Simulate outage in 3D**. The map enables City building massing and source station locations. **Observed / Hypothetical** changes only the outage overlay; **Focus outages** frames the selected stations. Purple symbols indicate hypothetical closures, not measured impacts.

A completed evaluation pins its baseline snapshot while acquisition continues independently. **Follow latest** returns to observed updates and clears the scenario when the snapshot changes. Inventory subtraction is static: no rider trajectories, traffic, demand, or future consequences are predicted. Google textures and terrain remain separately credential-gated.

### Toronto Open Data reference layers

Open **Toronto Open Data layers** on the map to enable **Green Spaces** and **Cycling Network**. Click a feature for original attributes or use **Source & dates** to inspect provenance. Full source receipts also appear under **Sources**. These are reference snapshots independent of mobility replay, not live measurements or validated routing layers.

Acquire/update both with `.venv/bin/python -m server.reference`, then reload the browser. Acquisition records hashes and quarantine accounting; no API key is required. An acquisition failure is shown as unavailable, never replaced silently by an older success. Existing terrain remains flat; the catalogue TIN is documented for later processing.

### Road restrictions and LiDAR-derived terrain

Open **Road restrictions & terrain** on the map. Dashed orange lines (or representative points) show City-reported road events. Click for original description, directions, impact, work schedules, parsed time fields and date-window classification. Acquisition runs every two minutes while this API process is running; Pause/Resume applies to roads and Bike Share. Exact XML and timestamped success/failure snapshots are retained. Retrieval freshness is not verification that a road is closed. Road events are the latest independent snapshot, not historical Bike Share replay.

The **2023 terrain** control shows source TIN triangles coloured by mean vertex elevation in CGVD2013 metres. Zoom to a few blocks; requests over the viewport limit ask you to zoom closer, and any 4,000-triangle cap is disclosed. Click a triangle for source attributes and vertex elevations. This processes the LiDAR-derived City TIN; it does not yet drape buildings on a 3D terrain surface or convert orthometric elevations to ellipsoid heights.

Reproduce terrain acquisition and indexing from the repository root with `PYTHONPATH=. .venv/bin/python scripts/acquire-terrain.py` (188 MB download; approximately 1 GB expanded source plus index). If the original files already exist, `.venv/bin/python -m server.terrain` rebuilds the index. Three original-to-served vertex checks, source CRS validation and nondegenerate-triangle/elevation checks protect against coordinate and datum errors. No flood or routing model is inferred.

### Verified components and continuous terrain

The map now loads the verified `structures` layer (427,029 components), with `conflict_review` (74 variants, 37 groups) as a separate toggle. These are source-scoped components, not persistent whole-building IDs. Click a footprint for retained attributes, original record mapping, repair flags and unresolved height definitions. The old optional massing extrusion remains illustrative on a flat base; it is not aligned to the terrain.

Import from an existing local pipeline output without changing it:

```sh
PYTHONPATH=. .venv/bin/python scripts/import-components.py /path/to/citywide-internal-003 /path/to/component_qualification.json
```

The importer checks package file SHA-256 values, all eight original source members, original EPSG:3857 and prepared EPSG:4326 definitions, SQLite integrity, expected layer counts, unique original IDs and complete main/conflict provenance accounting. The original source member paths must exist. It preserves the GeoPackage unchanged under `data/components/`; verification and supplied publisher evidence are retained alongside it. The expected counts intentionally fail closed when the source changes.

**Terrain 3D** renders an 800 × 800 metre study area at Downtown, Don Valley or High Park. Native mode retains every intersecting original TIN face and elevation; edges can extend beyond the nominal window. Optional 10/20/40 m grids use barycentric interpolation inside the original TIN, and omit any output face not fully covered by source geometry. These grids are display approximations, not higher-resolution surveys. No source gap is filled. Levels share a globally aligned origin. Native mode is the reference for fine inspection; click for source row and elevation.

Horizontal coordinates remain local EPSG:2952 metres and vertical coordinates remain CGVD2013 metres. Three.js only translates XY to a local rendering origin; it does not reinterpret Z as ellipsoidal height. Vertical exaggeration is 1. Source Z is served at full precision; GPU rendering uses local Float32 coordinates. The viewer is a bounded continuous surface, not a citywide streaming terrain service.

Building placement is blocked. The supplied publisher-response transcription/workbook establish metres and component semantics, but do not establish the precise vertical datum or an unambiguous roof-height calculation. MIN_HEIGHT zero-to-null remains an upstream assumption, raw values are retained, and SURF_ELEV differs from workbook SURV_ELEV. Do not subtract it from CGVD2013 terrain, apply an arbitrary offset, or use AVG_HEIGHT as verified roof height. See `data/components/verification.json` for field-specific qualification and checksums.

### Select terrain from the map

In **World state**, click **Choose terrain location**, then click a point on the map. **Terrain 3D** opens an 800 m study area around that point (centre snapped to the existing 40 m grid). The map selection remains available alongside the three presets. Unsupported locations show an error rather than fabricated terrain.

Main component boundaries are projected from EPSG:4326 to local EPSG:2952, clipped to the study window, split at displayed terrain triangle boundaries and assigned barycentrically interpolated CGVD2013 elevations. Segments outside terrain coverage are omitted. Changing LOD resamples these traces onto that display mesh. Dark outlines denote components; amber denotes source geometry repairs. Outlines are drawn as an inspection overlay, not a physical building model; no building height field is used. Conflicts remain separately inspectable in World state.

Click an outline or use the component selector below the scene for source identity, original records, repair audit, missing information and verification/height definitions. Component count limits and omissions are disclosed. The scene API is `/api/terrain/scene?lon=...&lat=...&spacing=0` (also 10/20/40); six recent scenes are cached locally.
