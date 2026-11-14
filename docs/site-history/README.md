# Site-history twin: implementation and qualification status

## Release evidence review — 2 November 2026

See [evidence-review-2026-11-02.md](evidence-review-2026-11-02.md) and [release-review.json](release-review.json). The fresh census reconciles all registry/planning rows, records focused source investigations in each region, and keeps unresolved release gates explicit. Participant receipt validation now requires dated task responses from five actual people on the same build. No public release has been approved by these checks.

## Local site-twin review workspace

A separate local interface now supports parcel selection, candidate planning evidence, saved notes, evidence exports and version-pinned links across all three regions. See [twin-review.md](twin-review.md) for startup and verification. The earlier interface deferral below is superseded for local review only; public release remains blocked and history remains baseline only.

## Latest parcel-registry work

The parcel baseline and provisional registry have now been built. See [parcel-registry.md](parcel-registry.md) for current acquisition, counts, matching and review outcomes. The earlier audit below remains historical evidence; its statement that no parcel export was acquired is superseded by that report. Public release remains blocked.

## Original audit result

**Blocked for public site-history release. Existing explorer retained.** No site-history UI or public provider methods have been enabled. This is the implemented audit and identity/history foundation, not the completed twin product.

Implemented:
- Current City neighbourhood and Community Council source acquisition, preserved catalogues, content hashes, licence metadata and retrieval receipt under `data/site-history-source/`.
- All 24 requested Downtown/Midtown neighbourhood names resolve uniquely after documented punctuation/spacing normalization only. North York is the published **North York Community Council** area, not the former municipality.
- Versioned study-area boundaries, original constituent properties and explicit overlap preservation.
- Complete accounting of existing planning and massing inputs, including unlocated records, duplicate geometry flags and prior import rejections. Large row-level files remain under ignored `data/site-history-audit/`, outside the public package.
- Internal site ID allocation, immutable registry versions, reviewed identity requirements, separate structures/addresses and predecessor lineage. These primitives do not automatically establish site identity.
- Provenance-bearing candidate/confirmed/rejected/unresolved association validation. Spatial and address agreement cannot confirm a site.
- Snapshot comparison that rejects unqualified identities and incomplete exports; identical raw observations do not create history. First-observed, changed publisher fields and absent-from-complete-export events retain receipts.
- Technical and five-person comprehension release-gate evaluation, plus regression tests.

## Actual audit results

| Region | Located applications | Located project rows | Intersecting massing rows |
|---|---:|---:|---:|
| Downtown study area | 3,454 | 298 | 16,643 |
| Midtown study area | 1,806 | 166 | 26,596 |
| North York Community Council | 5,709 | 459 | 98,372 |

These are input rows, not distinct sites. Regions overlap; do not sum them as a unique total. Planning membership is based on existing point locations, not established site polygons.

Across the input exports: 26,648 application rows, 2,391 project rows and 428,184 massing inputs accounted for. Of the massing inputs, 428,167 were imported and 17 previously rejected. Rejected geometries remain unassigned to regions. There are 7,128 unlocated application rows and 542 unlocated project rows; they cannot be assumed outside the study area.

Project archives contain one distinct raw observation (baseline only). Application archives contain two; persistent record-key qualification is still required before comparison. Different package IDs are not evidence of different observations.

## Gates still unresolved

1. **Site identity:** existing massing rows identify illustrative components by export position. No qualified parcel/site source or reviewed site assertions currently establishes the persistent registry. All eligible rows remain explicitly unresolved; no site was invented.
2. **Rights:** boundary catalogue licence is verified. Intended-use qualification for the complete site/geometry feature remains open; existing massing metadata has an illustrative-use limitation.
3. **Matching review:** a complete census of inputs exists, but candidate generation against established sites and review cannot proceed until identity is established. Zero confirmed links is not comprehensive linking success.
4. **History:** qualify application record identities, inspect both distinct source observations and obtain a second distinct project observation when available. No physical-change inference is supported.
5. **Interface:** region/site map and list, evidence page, provider accessors, history comparison, exports and site pins remain deferred under the explicit fail-closed plan. Existing address/snapshot links remain untouched.
6. **User verification:** no participant sessions have occurred. See `comprehension-protocol.md`; automated tests cannot satisfy this gate.

The current explorer's isolation check passes. This does not qualify a future twin package; that gate remains false until the twin assets and interface are included and checked.

## Reproduce

```sh
.venv/bin/python scripts/audit_site_history.py
.venv/bin/python -m unittest tests.test_site_history -v
.venv/bin/python scripts/check_public_boundary.py
```

The audit reads existing input snapshots and downloaded City source files; it does not refresh them silently. Summary artifacts are `audit.json`, `boundaries.json`, `regions.geojson` and `snapshot-inventory.json`. Full accounting paths are recorded in `audit.json`. The release gate remains false regardless of successful audit execution.

## Next executable dependency

Qualify a persistent parcel/site identity source (including redistribution rights and a complete export), or create reviewed source-backed site assertions through an explicit review workflow. Preserve illustrative massing only as linked structure context. Then generate and adjudicate candidates across every region before implementing and enabling the public site-history view. No public release or commit was performed in this task.

## Alternative identity source checked

The [City Property Boundaries catalogue](https://open.toronto.ca/dataset/property-boundaries/) was retrieved directly from the City CKAN API during this task. It lists Open Government Licence – Toronto and explicitly says OBJECTID is not guaranteed to be consistent between updates. It is a candidate geometry baseline, not an automatic persistent site key. The complete parcel export has not been acquired or qualified. Source metadata is preserved in `data/site-history-source/property-catalogue.json`. Establishing internal site lineage from it would require a separately validated matching/review procedure; it cannot be substituted silently for qualified identity.
