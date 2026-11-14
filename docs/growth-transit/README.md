# ASTER — Growth & Transit Priorities

Public, accountless community planning screening. The decision is which areas with recorded housing proposals warrant closer investigation of nearby scheduled TTC service. It is not a demand model, route recommendation, pedestrian-access assessment or validated city twin.

## Reproduce locally

1. `.venv/bin/python scripts/acquire_transport.py` archives two matching complete TTC exports and official licence evidence. The catalogue now explicitly declares Toronto's licence; both that identifier and the prior `notspecified` contract are handled with explicit page evidence.
2. `.venv/bin/python scripts/build_screening.py --source data/transport-source/20261105T133936926310Z --as-of 2026-11-05`
3. `.venv/bin/python scripts/audit_screening.py --source data/transport-source/20261105T133936926310Z`
4. `.venv/bin/python -m unittest tests.test_screening tests.test_transport`
5. `node --experimental-strip-types --test tests/screening.test.mjs`
6. `npm run build:public` and `python3 -m http.server 5178 --bind 127.0.0.1 --directory dist-public`

No automatic deployment. Source acquisition and analysis are offline build steps; users download only static results. Legacy planning/transport explorer routes display an unavailable-feature notice in the submission package; local source archives remain intact. analysis links pin both source snapshots and the analysis version. Brief text is not included in share links.

## Method

Use structured Development Pipeline units, not description extraction. Publisher identifiers group records; conflicting groups and missing identifiers are unresolved, exact duplicates collapse, unknown counts stay unknown. Different identifiers sharing an exact address or point are excluded pending adjudication rather than added together. Exact municipal-address geocoding is a representative point, not a parcel identity. Separate application records supply context and add no units. Include only Under Review and Active by default; Built is available explicitly as historical context.

Grid cells are 500 metres in EPSG:26917 with origin at coordinate zero and floor division (boundary points enter the cell to their east/north). Region membership uses the proposal point and preserves overlaps. A single proposal enters one cell. Regional totals cannot be summed without deduplication. Distances are from each proposal's address point, never from grid centres.

For each route-direction/boarding-stop and selected service date, count distinct scheduled trips in each hour of 07–09, 16–18 or Saturday 12–14. A stop qualifies only if one route-direction reaches four departures in each hour. Do not sum adjacent stops or opposing directions. Missing directions do not qualify. Calendar exceptions and originating days for after-midnight times are honoured. Nearest-stop ties use deterministic stop IDs. Distances are stored to millimetres; displayed whole metres do not determine thresholds.

The default shortlist includes areas with at least one included proposal beyond 800 m from qualifying scheduled service. Rank by reported units in those included proposals, not a composite score. All other included units remain in the evidence. A zero-result screen does not establish adequate transit service.

## Limitations and release

The retained planning snapshot is dated; the timetable was refreshed November 5 and covers November 1–December 19, 2026. Show source dates separately rather than claiming contemporaneous city conditions. Updated timetable/builds produce new pinned versions; prior assets remain available. Expired feeds remain historical.

The submission distribution now excludes all legacy explorer snapshots, raw transit archives and their dependent features. Its package-specific rights contract covers only the exact reviewed screening derivatives, with evidence hashes, attribution and exemptions. New or changed assets fail packaging until reviewed. Qualification of the earlier local twin does not qualify this package. Participant sessions, physical-device testing, full screen-reader testing and real civic impact are not established by unit tests or source rereads.

## Local candidate verification

Analysis `c3974580fac92a5523a8` accounts for all 2,391 source rows, with 648 included groups across the union of the study areas. Regional totals overlap. A repeat build from pinned inputs reproduced all 250 analysis files byte-for-byte; see `determinism-review.json`. Twelve independent computational source rereads (four per region) are recorded in `source-audit.json`; these are developer validation, not participant evidence.

The exact public package is identified in `release-report.json`. `browser-review.json` records the desktop/mobile comparison, evidence, pinned-link reload and actual JSON download checks. The print action was attempted but its preview/output could not be verified; full screen-reader and final legacy address-flow checks remain outstanding. The overall interface gate therefore remains blocked.

The candidate is local review software, not an approved submission. The package-specific rights gate passes by excluding unqualified legacy assets. Complete remaining interface checks and five actual participant sessions before claiming those gates passed. Recruitment wording and blank, build-identified response forms are in `participant-pack/`; no responses have been fabricated. The old analysis `67403485ec5b0ee2fe3e` is withdrawn because different publisher identifiers sharing an address could be counted together; the corrected analysis excludes those groups pending adjudication.

## November 7 update

The brief now explains its purpose and includes a clearly labelled example question. Three pinned regional demonstrations are available in the UI and in `regional-demonstrations.md`, with source records and sensitivity values in the JSON receipt. `build_regional_demos.py` reproduces them; the JavaScript test checks their results against the actual frontend calculations.

`npm run build:public` now uses `package_submission.py`. It packages only the 250 reviewed analysis files plus pointers, and excludes 14 legacy snapshots and standalone transport assets. Old explorer links show an explicit unavailable notice. The address explorer, its map/details, standalone transit and energy guidance are unavailable in this submission edition; their local code and source archives are preserved. The older general-purpose packaging function remains available for local archival use, but is not the public build entry.
