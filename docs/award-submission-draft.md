# Toronto Open Data Awards 2026 — Submission Draft (Not Submitted)

**Submission portal:** https://ca.mar.medallia.com/2026-open-data-awards  
**Official call & criteria:** https://open.toronto.ca/toronto-open-data-awards-2026-call-for-submissions/  
**Deadline:** December 4, 2026  

- **Project:** ASTER — Toronto Housing, Transit & 3D Explorer  
- **Track:** Grassroots (independent / self-funded)  
- **Recommended Category:** **Open Data Applications** *(Note: if submitting without logged resident engagement before Dec 4, **Open Data Analysis** is also a direct rubric fit for ASTER's research question, multi-dataset analysis, and city-wide findings.)*  
- **Public URL (live, free, no account):** https://kvishal1012.github.io/toronto_network_analysis/  
- **Source code:** https://github.com/KVishal1012/toronto_network_analysis (branch `codex/aster-toronto-explorer`, OSI **MIT License**)  
- **Verified build:** `4c928fed35bc46b49484b0b5b67347c066c6ae5afcaa06ff8e524ce76f469ed9` (screening `741b4221e6cb9ab5a524`, TTC GTFS `S1000544` valid through `2026-12-19`)  
- **Student eligibility:** Not claimed  

---

## 1. Clear Civic Problem & Research Question

Toronto residents, tenant associations, and neighbourhood groups are regularly asked to comment on major housing proposals, yet the City's public records live across separate portals with incompatible formats, revision dates, and definitions. Proposed homes in the Development Pipeline are easy to confuse with approved or built construction, nearby bus stops can look "well served" on a map even when rush-hour or weekend frequency is thin, and hundreds of incomplete or unmapped City records quietly disappear from most public summaries.

**Civic question:** *When thousands of new homes are proposed in a Toronto neighbourhood, how close are they to frequent TTC service—and what is missing from the City's records?*

ASTER puts that answer directly in residents' hands in a free, browser-based, offline-safe civic screening tool with no account, paywall, or GIS software required.

---

## 2. Analysis, New Insights & Creative Use of Open Data

ASTER combines **8+ official City of Toronto and Ontario open datasets** (Development Pipeline, Development Applications, One Address Repository, TTC Merged GTFS Routes & Schedules, Toronto Centreline, Green Spaces, 158 Neighbourhoods, 4 Community Council Boundaries, 2025 3D Building Massing, and 2024 Energy & Water Reporting/Municipal Meter baselines) into a reproducible, zero-backend static web application.

Across all **2,391** City Development Pipeline records (**1,281** geolocatable proposals with reported housing units across **601** 500 m EPSG:26917 grid areas in all four Community Councils), ASTER surfaces concrete city-wide insights:

- **The 5-minute walk gap is city-wide, not just downtown:** Out of **603,846** unbuilt proposed homes in the mapped pipeline, **31,938** sit more than **400 m** (straight-line) from a TTC stop with frequent weekday morning service (`≥ 4` scheduled departures in each hour of the 7–9 AM window at one stop on one route-direction)—spanning **12,090** in North York, **9,019** in Toronto & East York, **7,793** in Etobicoke York, and **3,036** in Scarborough (including **1,337** proposed homes near `260 BRIMLEY RD`).
- **Weekend service changes the picture sharply:** At **800 m**, **386** unbuilt proposed homes sit beyond frequent weekday morning service (all in North York, near `2779 YONGE ST`, `2425 BAYVIEW AVE`, and `2706 BAYVIEW AVE`). On **Saturday midday (12–2 PM)**, that number more than triples to **1,229** proposed homes across North York (`1,012`) and Etobicoke York (`217`, including `240 MARKLAND DR`).
- **Missing City data is kept visible, never silently dropped:** ASTER accounts for 100% of the **2,391** source rows—explicitly surfacing **535** proposals with unresolved locations, **499** with missing or zero structured residential units, and **76** shared-address distinct IDs—so any resident can search a street or project number and see *why* it is excluded.
- **Independent computational verification:** `42` source-reread audit cases (`audit_screening.py`) and `12` independent energy-baseline checks verify exact structured unit counts, TTC GTFS distances, and cohort medians directly against raw City and Ontario files.

---

## 3. Quality of Design & Civic Utility

- **Interactive offline-first Toronto map (`/`):** Renders Toronto Centreline streets, 158 neighbourhoods, parks, southern Lake Ontario shoreline, and TTC Lines 1/2/4/5 with 92 stations directly in the browser (with optional OSM/Satellite tiles). Quick-example pills (**Scarborough 400 m**, **North York 800 m**, **Downtown 800 m**, **Midtown 800 m**) let residents test real findings in one click.
- **Sensitivity comparison & meeting-ready PDF brief:** Users can compare two areas across **400 m**, **800 m**, and **1,600 m** rings and three dated timetable windows (weekday morning, weekday evening, Saturday midday), add local observations (sidewalk barriers, crossings, bus crowding), and export a formatted **Print / Save as PDF** community brief (with geographic locator map, proposal table, and City AIC source URLs), a reproducible **JSON** package, or a hash-pinned shareable URL.
- **Interactive 3D context (`/#view=3d`) & optional 2024 energy/water baselines:** Residents can jump from Downtown (`City Hall`, 307 buildings, 3 proposals) and Midtown (`Yonge–Eglinton`, 516 buildings, 19 proposals) records into a **3D Street Map** (`MapLibre`) or **3D Massing Studio** (`Three.js`), inspect recorded 2025 heights, and test a collision-checked geometric replacement box (including a dependable one-click editable example and clear recovery when overlapping multi-part massing prevents replacement). On the main page, an optional collapsed **Energy & Water** section lets users attach 2024 Toronto-wide Ontario EWRB benchmarks (`2,451` properties across 35 cohorts, including `1,614` Multifamily Housing records with water intensity, energy, and GHG quartiles) or `247` City municipal facility meter baselines directly to a brief.

---

## 4. Accessibility

- **Verified automatically on shipped build `4c928fed...`:**
  - WCAG 2.1 AA colour contrast (`0` violations across `/` and `/#view=3d`), semantic landmarks (`header`, `nav`, `main`, sequential headings, skip-to-content links), ARIA live-region status announcements, and full keyboard navigation (including keyboard-accessible 3D camera controls).
  - Mobile-responsive layout verified at `390×844` with `0 px` horizontal overflow on both `/` and `/#view=3d`.
  - Clean `@media print` stylesheet producing a visually inspected 7-page community brief PDF (`0` overflow).
- **Pending human check (disclosed candidly):** Dedicated human screen-reader evaluation (macOS VoiceOver / NVDA) has not yet been completed and remains explicitly `blocked` in `docs/growth-transit/release-report.json`.

---

## 5. Contributions to the Open Source Community

- **Standard OSI MIT License:** All original ASTER application, spatial-screening, packaging, and verification code is openly licensed under the verbatim **MIT License** (root `LICENSE`, `package.json`), with clear separation from **Open Government Licence – Toronto** and **Open Government Licence – Ontario** data terms.
- **Reusable civic-data engineering pattern:** The repository (`https://github.com/KVishal1012/toronto_network_analysis`, branch `codex/aster-toronto-explorer`) publishes the complete reproducible pipeline:
  - Deterministic Python acquisition, validation, and EPSG:26917 spatial screening scripts (`scripts/`).
  - Automated rights/boundary isolation checks (`scripts/check_public_boundary.py`) and build-bound qualification reports (`scripts/qualify_screening.py`).
  - Full automated test suite (`148` Python unit tests, `37` active submission Node unit tests, and Playwright E2E/accessibility/print verification in `scripts/verify_aster.mjs`) that other civic-tech builders can fork and adapt for any municipality with GTFS + planning open data.

---

## 6. Proof of Use, Impact & User Engagement

- **Current honest status:** As a newly built grassroots project completed in November 2026, ASTER does not yet claim measured policy impact or wide resident adoption (`participants` remains explicitly `blocked` in `docs/growth-transit/release-report.json`).
- **Before submitting on Dec 4 (fill in once completed):**
  - *[ ] Log 3–5 Toronto resident / urbanist walkthroughs (from X outreach or community contacts), noting neighbourhoods tested and 1–2 concrete improvements made from their feedback.*
  - *[ ] Log 5-minute macOS VoiceOver walkthrough notes and update `screen-reader.json`.*

---

## 7. Open Datasets Used

All datasets are tracked with SHA-256 receipts under the **Open Government Licence – Toronto** (or **Open Government Licence – Ontario** for EWRB):
- City of Toronto Development Pipeline & Development Applications
- City of Toronto Address Points (Municipal Toronto One Address Repository)
- TTC Merged GTFS Routes and Schedules (`S1000544`, `2026-11-01` to `2026-12-19`)
- Toronto Centreline (streets & rail), Green Spaces, Neighbourhoods (158), and Community Council Boundaries (4)
- City of Toronto 3D Massing (2025 snapshot)
- City of Toronto Municipal Building Energy Consumption & Ontario Energy and Water Reporting and Benchmarking (2024)

---

## 8. Explicit Limitations & Honest Scope

- **Information-heavy interface:** Because ASTER keeps methodology, source dates, and excluded records inspectable alongside maps and comparisons, the main page is denser than a simplified consumer map (Energy & Water starts collapsed by default to keep the primary flow focused).
- **Bounded 3D coverage:** While 2D housing and TTC screening covers all 158 Toronto neighbourhoods, `#view=3d` covers two bounded 600 × 600 m examples (`Downtown · City Hall` and `Midtown · Yonge–Eglinton`).
- **Geometry-only 3D replacements:** The 3D "what-if" box checks footprint collisions and compares height, ground area, and 3D volume only—it does not model validated traffic, transit crowding, shadows, wind, zoning, or energy/water consequences.
- **Straight-line screening & pipeline uncertainty:** Straight-line proximity does not measure sidewalk safety, crossings, crowding, or vehicle capacity; departure spacing within each hour is not assessed; and Development Pipeline records reflect structured City fields rather than confirmed built homes.
- **Unverified human gates:** Dedicated human screen-reader testing (VoiceOver/NVDA) and independent community impact/participant sessions remain unverified until logged.

---

## 9. 90-Second Demonstration Script

1. Open `/` on **All Toronto** and show the offline Toronto street map with `1,281` screened proposals across all four Community Councils.
2. Click **Scarborough 400 m** (or **North York 800 m**) and toggle between weekday morning and Saturday midday to show how frequent-service coverage shifts across outer-borough corridors.
3. Open **Methodology, data completeness & limitations** to show how `535` unresolved addresses and `499` missing-unit records are kept visible rather than silently dropped.
4. Select two areas, add a local community question, and preview **Print / Save as PDF** and the hash-pinned shareable link.
5. Click **Toronto 3D ↗** into `#view=3d` (`City Hall` or `Yonge–Eglinton`), inspect a proposal pin (`483 BAY ST` or `191 DUNDAS ST W`), and show both the Page 1 transit link and the collision-checked `Try editable example` workflow.
