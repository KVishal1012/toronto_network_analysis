# Parcel baseline, persistent registry and planning candidate review

Status: local baseline implemented; not published. Sites remain provisional parcel references, not verified development sites.

## Acquisition and geometry validation

The complete current City GeoJSON export contains **498,477 features**, matching the publisher datastore count. A second complete download has the same SHA-256. The publisher count was also read again. Both OBJECTID and PARCELID are unique in this export; neither is used as a permanent site ID or assumed stable across updates.

Validation checks explicit WGS84 CRS, Toronto coordinate envelope, Polygon/MultiPolygon type, geometry validity, source-ID uniqueness, feature-type vocabulary and complete count reconciliation. No invalid geometry is silently repaired.

| Outcome | Source features |
|---|---:|
| Eligible provisional parcel references | 136,710 |
| Outside the three study areas | 358,766 |
| Excluded reserve parcels | 2,983 |
| Invalid geometries quarantined | 18 |
| Total | 498,477 |

COMMON and CONDO parcels are eligible; reserve/corridor parcels are excluded from the residential/development-site baseline. The source contains no CORRIDOR rows in this observation. Invalid features remain in the validation log; their geography is not silently counted as outside the study area. No duplicate normalized geometry/type pairs occurred among eligible parcels.

## Redistribution review

The [City Property Boundaries catalogue](https://open.toronto.ca/dataset/property-boundaries/) declares the [Open Government Licence – Toronto](https://open.toronto.ca/open-data-licence/). The licence permits adaptation and redistribution with attribution, subject to its exclusions and non-endorsement condition. The data are general planning reference information, not survey or ownership evidence. This review covers this City parcel dataset, not every upstream planning/building source.

Attribution to retain: **Contains information licensed under the Open Government Licence – Toronto.** Link to the licence and preserve the dataset source, retrieval date, hash and general-planning limitation. Do not imply City endorsement. Raw catalogue, licence HTML, count responses, two complete exports and acquisition metadata are preserved under ignored `data/site-history-source/`.

## Persistent registry

`data/site-registry/registry.sqlite` contains version receipts, internal site IDs, parcel observations, candidate lineage, planning associations and review records. UUIDs are allocated independently of publisher row IDs. Original OBJECTID/PARCELID values and export hashes remain source references.

Exact normalized geometry/type continuity reuses an existing internal ID. A changed boundary or parcel type allocates a new provisional ID and records positive-area overlaps as possible boundary changes, splits, merges or complex changes. Shared edges do not create lineage. These links require review; geometry alone never confirms succession. Previous observations remain available, and absence from a later export does not imply demolition. Duplicate geometry rows, if encountered, retain all source references within one provisional geometry/type group.

The baseline has **136,710 IDs**. A complete rerun preserved all IDs, created no extra version, and passed SQLite integrity checks. Split, merge, boundary-change, reorder and overlap behavior is covered by synthetic regression tests; no second real parcel observation exists yet to validate longitudinal behavior.

## Planning matching and review

All **29,039 planning rows** were processed against the eligible parcel geometry, with explicit outcomes:

| Source | Candidate rows | Unresolved rows | Outside-study exclusions | Total |
|---|---:|---:|---:|---:|
| Applications | 10,317 | 7,168 | 9,163 | 26,648 |
| Projects | 860 | 545 | 986 | 2,391 |

**Zero confirmed matches.** A single point-in-parcel hit remains a candidate. No buffers or nearest-parcel assignments are used to create associations. Unlocated rows remain unresolved globally, not assigned to guessed regions. Each association retains the original geometry origin and planning/parcel snapshot references.

Regional candidate counts (overlaps preserved; do not sum as unique totals):

| Region | Provisional parcels | Application candidate rows | Project candidate rows |
|---|---:|---:|---:|
| Downtown | 18,236 | 3,441 | 296 |
| Midtown | 29,685 | 1,805 | 166 |
| North York Community Council | 105,802 | 5,682 | 458 |

The evidence-limited computational review examined every located no-containment case (**43**) and identified **1,325 publisher-number groups** associated with multiple parcels. These can represent multi-parcel proposals or inconsistent locations; no merge, rejection or confirmation was fabricated. Near-parcel distances for the 43 cases are diagnostic only, measured in EPSG:26917 metres. The review has **1,368 unresolved diagnostic cases**. Including the original missing-location/no-match queue, the database contains **9,081 review entries**; these are review tasks, not unique planning records.

No document-by-document human/site adjudication has occurred. All source-linked cases are in `match-review.json`. It explicitly distinguishes computational review from human review and retains reasons for abstention. A confirmed association still requires explicit publisher/site evidence or a reviewed assertion with provenance. This registry does not yet satisfy the public twin identity/matching release gates.

## Files and reproduction

- `scripts/acquire_site_parcels.py`: staged HTTPS acquisition, stable reread, publisher count and licence receipts. The acquisition wrapper was added for future refreshes; this baseline was acquired with the equivalent recorded curl requests.
- `scripts/build_site_registry.py`: complete validation, provisional registry versions, lineage candidates and all-row planning matching.
- `scripts/review_site_matches.py`: no-containment diagnostics and cross-parcel publisher-number review.
- `parcel-registry-report.json`: acquisition hashes, counts, regional results and limitations.
- `match-review.json`: source-linked unresolved review cases.
- `data/site-registry/parcel-validation.ndjson`: every parcel’s outcome.
- `data/site-registry/matches.ndjson`, `review-queue.ndjson`, `lineage-candidates.ndjson`: local detailed outputs. The SQLite reviews table additionally includes the diagnostic review pass.

Run in order:

```sh
.venv/bin/python scripts/acquire_site_parcels.py
.venv/bin/python scripts/build_site_registry.py
.venv/bin/python scripts/review_site_matches.py
.venv/bin/python -m unittest tests.test_site_history tests.test_site_registry -q
```

No public assets, interface, deployment or Git commit were changed by this work. Qualification of temporal continuity, adjudication of site links, interface QA and the five-person comprehension test remain release gates.
