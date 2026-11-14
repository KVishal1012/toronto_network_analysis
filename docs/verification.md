# Verification / 2026-09-08

## Executed checks

- 19 Python unit/contract tests passed. Includes CRS rejection, metric-area bounds, point-on-boundary handling, outside/rejected accounting, missing/zero distinction, feed and station freshness, future timestamps, offline stock, immutable scenarios, parameterized DuckDB reads, failure receipts, building viewport limits and unchanged source heights.
- TypeScript check and Vite production build passed. MapLibre is a large client library; Vite reports the bundle-size advisory. No runtime failure is implied, and no performance/SLA claim is made.
- npm dependency audit returned zero known vulnerabilities after updating Vite to 7.3.6. This is a point-in-time dependency result, not a complete security assessment.
- In-app Browser used directly; no external Playwright fallback. Desktop viewport 1536 × 1024 and responsive viewport 390 × 844 checked. Mobile document width equals viewport width: no page-wide horizontal overflow. Ledger tables scroll inside their container.
- Neighbourhood search selected Annex from the actual source; the rendered 25 station locations and 2.79 km² matched computed values. Rosedale-Moore Park and High Park North were checked against the saved analytical output. These are snapshot results, not timeless current statistics.
- Both 2D and 3D controls were exercised. The default desktop 3D viewport returned 3,618 source footprints without truncation at verification time. Building row `2025-354570` showed 240 m (UI rounded from source 239.97), with source method `3D Model`.
- Three building records were independently checked against the archived shapefile (rows 0, 136423 and 354570). Height and height-source strings match; source-coordinate transformation falls within each stored WGS84 bounding box. Archive SHA-256 verified.
- Snapshot replay was exercised: switching to the 15:15 snapshot displayed stale operator feeds; switching back restored the latest saved snapshot. Historical freshness is measured at the time of viewing.
- Live refresh was exercised in the UI and appended a new successful snapshot. An earlier real timeout remains in the ledger as failed acquisition evidence, not a fabricated successful state.
- UI scenario on Dalton Rd / Bloor St W, baseline `711e09e1b9eefa48`, removed one station reporting 3 bikes and returned 3 bikes removed, ASK, and the explicit static-inventory limitation. Observed state is not modified.
- Sources view displays building archive provenance, accepted/rejected counts, original dataset link, height method and limitations. Evidence export control exercised.
- Browser error log inspection returned no errors for the final 3D page.

## Visual review

Concept: `design/concept.png`, generated with the built-in image generation tool. Actual desktop and mobile renders: `design/desktop-3d.png`, `design/mobile-3d.png`, captured through the In-app Browser screenshot API. Concept and final renders inspected with `view_image`. A full-page screenshot backend scaling artifact was replaced with correctly scaled viewport captures.

| Comparison point | Result / deliberate deviation |
|---|---|
| Layout | Header, layer rail, map canvas, ASTRA inspector and lower evidence ledger retain the concept structure. Mobile stacks map and inspector. |
| Typography | Explicit DM Sans control/body type, quiet metadata, stronger ASTRA and location headings. Compact ledger requires vertical scrolling at some viewport heights. |
| Palette | White surfaces, ink text, teal analytical geography, orange selected tabs, gray reference buildings. |
| Map imagery | Concept illustration was replaced entirely by actual source geometry. User-requested 3D supersedes the initial flat-map concept. No generated imagery enters analytical data. |
| Controls | Added functional 2D/3D switch, compass/tilt, source refresh, snapshot replay, building evidence and isolated outage workflow. |
| Copy | Original ASTER/TORONTO, City layers, ASTRA, Investigate/Scenario/Explain and State ledger structure preserved. Above-fold copy differences are intentional factual updates: unavailable building heights replaced by 2025 source massing; live evidence statuses replace concept placeholders; social planning extent replaces the concept's overbroad official-boundary label. |
| Accuracy cues | 2025 vintage, source AVG_HEIGHT, flat-ground assumption and illustrative status appear directly on the 3D map. Missing traffic/weather remain unavailable. |

The implemented shell was visually verified against the concept, with the user-requested 3D change and evidence-driven copy deviations listed above. No remaining material visual mismatch was identified in the checked workflows. This is not a claim of pixel identity with the initial 2D mockup.

## Material fixes made during verification

1. Replaced missing default Python trust roots with certifi-backed TLS verification; TLS checks were never disabled.
2. Patched the Vite dependency advisory.
3. Removed DuckDB history's implicit pytz dependency by formatting UTC timestamps inside SQL.
4. Replaced a basemap endpoint returning provider API-key watermarks with attributed OpenStreetMap tiles.
5. Corrected the default 3D camera so the starting desktop viewport does not hit the building feature cap.
6. Guarded freshness responses from a prior snapshot so they cannot overwrite a newer selected state after effect cleanup.

## Limits still in effect

Local foundation only. No independent field survey, model validation, production load test, hosted authentication, real-world actuation, roof reconstruction or terrain model. City massing is approximate and its height provenance varies. Station circles are cartographic overlays at source coordinates, not claims that a station sits on a building roof. 3D context has its own fixed archive provenance and is not represented as a live Bike Share observation. Building responses cap at 6,000 records and explicitly disclose truncation.

The desktop and mobile UI tests were interactive checks; the repository does not claim a full automated browser regression suite. CI configuration was added but no remote CI run was dispatched.
