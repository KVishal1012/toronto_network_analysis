# Toronto Open Data Awards 2026 — Submission Draft (Not Submitted)

**Project:** ASTER — Toronto Housing, Transit & 3D Explorer  
**Category:** Open Data Applications  
**Public URL (once GitHub Pages is enabled on `gh-pages`):** https://kvishal1012.github.io/toronto_network_analysis/  
**Source code:** https://github.com/KVishal1012/toronto_network_analysis  
**Active branch:** `codex/aster-toronto-explorer` (static site pushed to `gh-pages`)  
**Funding:** Grassroots / self-funded  
**Student eligibility:** Not claimed  

---

## Civic problem

Toronto residents, tenant associations, and neighbourhood groups regularly hear claims about housing growth and transit readiness, yet the City's open datasets live in separate portals with incompatible formats, revision dates, and definitions. Proposed units in the Development Pipeline can be confused with completed construction, nearby bus stops can look "served" on a map even when weekend or rush-hour departure counts are low, and missing or unlocated records are often silently dropped from totals.

## What ASTER does

ASTER brings together City of Toronto housing proposals, scheduled TTC timetables, neighbourhood context, 3D building massing, and reported 2024 energy and water baselines in a transparent, offline-safe civic screening tool:

1. **City-wide Housing & Transit Priorities (`/`):**
   - Screens **all 2,391** City Development Pipeline records across **All Toronto**, the **4 Community Councils** (`Toronto & East York`, `North York`, `Etobicoke York`, `Scarborough`), and focus views (`Downtown`, `Midtown`) — covering **1,281** geolocatable proposals with reported housing units across **601** 500 m grid areas.
   - Checks every included proposal against **scheduled TTC departures** (`>= 4 scheduled departures/hour` in each hour of the 2-hour window at one stop on one route-direction; departure spacing is not assessed and may vary) across **weekday morning (7–9 AM)**, **weekday evening (4–6 PM)**, and **Saturday midday (12–2 PM)** at **400 m**, **800 m**, and **1,600 m** straight-line rings.
   - Displays every excluded record explicitly (`499` missing/zero structured residential units, `76` shared-address distinct IDs, `535` unresolved locations) so nothing is hidden or coerced to zero.
   - Renders an **offline-first interactive Toronto street map** (City Centreline roads, 158 neighbourhoods, Green Spaces, Lake Ontario shoreline, TTC Lines 1/2/4/5 and 92 stations, plus optional OSM/Satellite basemaps), accessible area comparison cards, a geographic SVG brief map, and **Print / Save as PDF** + pinned **JSON export** for community meetings and council deputations.

2. **Toronto 3D Building & Proposal Explorer (`/#view=3d`):**
   - Overlays real Downtown (`City Hall`, 307 2025 buildings, 3 proposals) and Midtown (`Yonge–Eglinton`, 565 2025 buildings, 19 proposals) Development Pipeline sites directly onto an extruded **3D Street Map** (`MapLibre`), with an optional **3D Massing Studio** (`Three.js`).
   - Lets citizens inspect recorded 2025 heights (`~3 m/storey` illustrative estimate), jump directly between 3D sites and Page 1 transit tables, and test a collision-checked single-building hypothetical box without claiming wind, shadow, traffic, or construction approval.

3. **Inline 2024 Energy & Water Evidence (`/`):**
   - Integrates **2,451** Toronto-wide Ontario Energy and Water Reporting and Benchmarking (`EWRB`) property records across 35 building cohorts (including **1,614** Multifamily Housing records) with one-click quartile distributions for **Reported water intensity (`m³/m²/year`)**, **Site & source energy (`GJ/m²/year`)**, **Electricity**, **Natural gas**, and **GHG emissions (`kgCO₂e/m²/year`)**, alongside **247** City of Toronto municipal facilities (`158` Downtown, `89` Midtown; `3,055` utility and district chilled-water meter entries) as explicitly scoped 2024 baseline context that can be attached directly to the community brief (never fabricated as future building predictions).

## Open datasets used

All datasets are licensed under the **Open Government Licence – Toronto** (or Ontario Open Data for Energy benchmarking) and tracked with SHA-256 receipts:
- City of Toronto Development Pipeline & Development Applications
- TTC Merged GTFS Routes and Schedules
- Toronto Centreline (streets & rail), Green Spaces, Neighbourhoods (158), Community Council Boundaries (4)
- City of Toronto 3D Massing (2025 snapshot)
- City of Toronto Municipal Building Energy Consumption & Ontario Energy and Water Reporting and Benchmarking (2024)

## Verification & honest limitations

- **Automated verification (Build `caed001c9a3babef92bc848c2b3ab82a51d1513dff4b9f8d4f15ffbb224b4f68`, screening `741b4221e6cb9ab5a524`):**
  - `148` Python unit tests and `39` Node unit tests passing.
  - `42` independent computational source rereads (`audit_screening.py`) verifying exact unit counts and TTC GTFS distances across all 7 regions.
  - Automated Playwright + Chromium checks (`verify_aster.mjs`) confirming WCAG 2.1 AA contrast (`0` violations), keyboard navigation, `390×844` mobile zero overflow, clean `@media print` PDFs, and strict public boundary isolation (`check_public_boundary.py`).
- **What remains candidly unverified:**
  - Dedicated human screen-reader testing (VoiceOver/NVDA) and independent citizen participant sessions have not yet been logged; no claim of measured civic adoption or policy impact is made.
  - Straight-line proximity does not measure sidewalk safety, crossings, crowding, or bus/train capacity; reported unit counts reflect City structured fields rather than confirmed built homes.

## 90-second demonstration script

1. Open `/` on **All Toronto** and show the city-wide street map with `1,281` screened proposals across `601` areas (from `Near 300 BOROUGH DR` in Scarborough to `Near 6464 YONGE ST` in North York).
2. Filter to **Scarborough** and search `Kingston` to show how any resident can inspect their corridor's `400 m` / `800 m` / `1,600 m` TTC frequency and excluded records.
3. Select two areas, add a local community question, and show the **Print / Save as PDF** brief and reproducible hash-pinned JSON export.
4. Click **View in 3D ↗** into `#view=3d` (`City Hall` or `Yonge–Eglinton`), inspect a proposal pin (`483 BAY ST` or `2180 YONGE ST`), and show its 3D context and Page 1 transit link.

---

*Before submitting: confirm GitHub Pages is live at `https://kvishal1012.github.io/toronto_network_analysis/`, complete optional VoiceOver/participant walkthrough notes if desired, and review all form fields. Competition deadline: December 4, 2026.*
