# GTA local preview — implementation and validation

Updated 2026-10-26; new source acquisitions below were made October 25. Local preview only: http://127.0.0.1:5175/. No publication, cloud provisioning, new schedule, publisher outreach or award submission. Public distribution checkout remains unchanged.

## Actual coverage

All 25 GTA municipalities have separate application, regional-review and address qualification outcomes. These are not claims of complete planning coverage. Toronto evidence and historical snapshots remain available.

- Planning: Toronto retained; Brampton OPA/ZBA/subdivision retained; Milton development records added. Regional reviews are a separate view, currently unavailable because York failed identifier reconciliation.
- Address search: Toronto, Brampton, Milton, Oshawa, Pickering and all nine York municipalities (14 total). York regional addresses are the primary source where a municipal address source is not qualified. Unsupported municipalities retain map/municipality selection.

| New source | Complete input | Accepted/searchable | Location exclusions |
|---|---:|---:|---:|
| brampton-address | 253,798 | 253,784 | 14 |
| york-address | 431,863 | 431,853 | 10 |
| milton-address | 46,438 | 46,317 | 121 |
| milton-applications | 374 | 374 | 3 |
| oshawa-address | 64,226 | 64,226 | 0 |
| pickering-address | 42,767 | 42,756 | 11 |

Milton application accepted count includes three unlocated records. They retain attributes and reasons and are excluded from spatial calculations. Address exclusions are not reassigned to a nearby municipality. Original raw archives remain local.

## Reproducibility and product behavior

- Registry-driven adapters in `scripts/gta_adapters.json`; frozen schemas, licence metadata and referenced-licence hashes in `scripts/gta_contracts.json`. Acquisition checks complete ID inventory, per-page membership, counts, schemas and stable content across two reads for new sources.
- Immutable source receipts and aggregate snapshots, exact selection geometry in EPSG:26917 and display in EPSG:4326. Source attributes and publisher statuses are preserved. No cross-publisher address/proximity deduplication.
- Address indexes are municipality-scoped, sorted by normalized label or street, with 250-row shards. Original labels and unit variants remain distinct; selection is explicit. One primary source per municipality is enforced.
- Address evidence includes source ID, source snapshot, retrieval time, original attributes and limitations. Address selection changes only the query location.
- Regional reviews have a separate kind/view. Unknown status precedence displays “Status interpretation unresolved”; no municipal approval/construction inference.
- Per-source refresh failures restore prior receipts; first-time failure removes unverified pointers. Composition advances atomically only after validation. Historical links remain pinned; unavailable assets are not substituted.

## Local verification

Active snapshot: `9c1ddedb5903af67d1d6`. Live partial refresh of Milton applications completed successfully at `2026-10-25T11:49:05.209129+00:00`. Other source retrieval dates are recorded separately; this was not a full-source refresh.

- 68 Python tests pass, including duplicate/omitted IDs, unknown CRS, blocked rights, geometry, unit variants, conflicting statuses, bounded shards, independent failures and first-acquisition rollback.
- 13 JavaScript tests and the production build pass. A repeat composition produced the identical snapshot ID. Worker tests exercise real packaged evidence, address search, publisher scope and legacy Toronto links without a local API.
- Headless Chromium desktop/mobile verification now runs independently of the lock-screen restriction. The first pass found a mobile coverage badge overflow, now fixed. Toronto historical address evidence explicitly discloses missing original attributes and refers to its source snapshot. Match counts are announced to assistive technology. Final browser run results are recorded below; no human comprehension results are claimed.
- Build warning remains for the large MapLibre chunk. Address and evidence assets load independently of that optional map.

## Commands

```sh
.venv/bin/python scripts/refresh_gta.py --sources milton-applications
.venv/bin/python scripts/build_gta.py --activate
npm run build:public
.venv/bin/python -m http.server 5175 --bind 127.0.0.1 --directory dist-public
```

Refresh is manual; no new schedule has been activated. `build_gta.py` without `--activate` verifies a composition without moving the selected snapshot.

## Unfinished qualification

[Layer-by-layer evidence matrix](gta-qualification-matrix.json) and [source qualification report](gta-source-qualification.md) document candidate and blocked sources. Complete exports and terms remain unqualified for other municipal candidates; therefore the full requested qualification milestone is not yet complete.

York regional reviews remain blocked. ESRI_OID is duplicated and changes across reads. Two complete ordered attribute exports returned 5,470 distinct OBJECTIDs consistently, but a complete geometry acquisition contract using that key is not yet qualified. 244 records disagree between the status fields; no precedence was invented. See the unsent York clarification draft.

Mississauga planning retains its rights block. Address terms separately permit distribution with downstream agreement requirements; full address export and delivery compliance remain unresolved. [Exact-resource clarification draft](mississauga-clarification-draft.md) is prepared and unsent.

Remaining work: qualify the York alternate-key geometry export and publisher status semantics, obtain separate Mississauga answers, continue remaining candidate exports/licences, and collect optional real comprehension responses. Nothing has been published or sent.

## Final browser and performance verification — October 26 continuation

Local URL: `http://127.0.0.1:5175/`; snapshot `9c1ddedb5903af67d1d6`. Installed Playwright 1.62.1 / headless Chromium; Browser plugin unavailable. The local server was restarted after the interrupted run. Tests use real packaged data, not fixtures.

- Desktop 1440×900, mobile 390×900 and narrow 320×900: correct title, meaningful page content, no framework overlay or JavaScript exceptions. Desktop has WebGL ReadPixels performance warnings; mobile has no console warnings.
- Address input does not change location until a match is selected. Tab/Enter selects a match; evidence receives focus; Escape closes and returns focus to the opener. Toronto, Milton, Brampton, Markham, Oshawa and Pickering address flows were exercised; new-source original attributes were present. Historical Toronto attributes are explicitly unavailable rather than shown as an empty section.
- Selected-record evidence, JSON and CSV downloads, source snapshot IDs, snapshot-pinned reload, 25-row coverage directory, regional-review unavailable state and disabled Mississauga address search passed.
- Mobile coverage badge no longer widens the document: measured page width equals 390 and 320 px respectively. Address-match counts now use a live status region. This is a keyboard/semantic smoke check, not a formal WCAG or screen-reader audit.
- Three cold Chromium runs at 390×844, 1.6 Mbit/s downstream, 150 ms latency, 4× CPU slowdown: snapshot readiness 12.37–12.41 s; address results 14.33–14.58 s from navigation; search action to results 2.30–2.32 s. Optional map code was not fetched. These are local emulation measurements, not physical-device or production-host benchmarks. Startup remains slow; the current manifest alone is 1,319,707 uncompressed bytes.
- Build and 68 Python / 13 JavaScript tests pass. Public packaging retains 12 historical/current snapshots, 12,788 objects and 825,731,854 compressed data bytes against the existing 850 MB budget. Further growth needs a storage/publication-budget decision; nothing was deployed.

Temporary screenshots/scripts/logs: `/tmp/aster-1440-address.png`, `/tmp/aster-390-overview.png`, `/tmp/aster-320-overview.png`, `/tmp/aster-qa.cjs`, `/tmp/aster-qa-result.json`, `/tmp/aster-perf.cjs`, `/tmp/aster-perf.json`. They are local QA evidence, not source data or participant results.

Human approval-versus-construction comprehension remains unmeasured. The separate self-guided feedback protocol defines questions and scoring without claiming participants or results.
