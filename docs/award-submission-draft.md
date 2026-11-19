# Toronto Open Data Awards 2026 — Submission Draft (Not Submitted)

**Project:** ASTER — Toronto Housing, Transit & 3D Explorer  
**Category:** Open Data Applications  
**Public URL (live):** https://kvishal1012.github.io/toronto_network_analysis/  
**Source code:** https://github.com/KVishal1012/toronto_network_analysis (MIT License; see repository `LICENSE`)  
**Active branch:** `codex/aster-toronto-explorer` (static site pushed to `gh-pages`)  
**Funding:** Grassroots / self-funded  
**Student eligibility:** Not claimed  

---

## The civic problem

Every week, Toronto residents, tenant associations, and neighbourhood groups are asked to weigh in on major housing proposals—yet the City's public records are scattered across separate portals with different formats, dates, and definitions. Proposed homes in the Development Pipeline are easy to confuse with approved or built housing, nearby bus stops can look "well served" on a map even when weekend or rush-hour service is thin, and hundreds of incomplete or unmapped records quietly disappear from most public summaries.

Residents shouldn't need GIS software or a data analyst to ask a straightforward question about their own street: **if thousands of new homes are proposed here, how close are they to frequent TTC service—and what is missing from the City's records?**

---

## What ASTER reveals across Toronto

ASTER brings together official City of Toronto housing proposals, scheduled TTC timetables, neighbourhood boundaries, 3D building massing, and 2024 energy and water baselines in a free, offline-safe civic screening tool that anyone can run in their browser—with no account or backend required.

Across all **2,391** City Development Pipeline records (**1,281** geolocatable proposals with reported housing units across **601** areas in all 4 Community Councils), ASTER surfaces concrete patterns that residents rarely see in one place:

- **The 5-minute walk gap is city-wide, not just downtown:** Out of **603,846** unbuilt proposed homes in the mapped pipeline, **31,938** sit more than **400 m** (straight-line) from a TTC stop with frequent weekday morning service (4+ scheduled departures per hour in each hour of the 7–9 AM window)—including **12,090** in North York, **9,019** in Toronto & East York, **7,793** in Etobicoke York, and **3,036** in Scarborough (such as **1,337** proposed homes near `260 BRIMLEY RD`).
- **Weekend service changes the picture sharply:** At **800 m**, **386** unbuilt proposed homes sit beyond frequent weekday morning service (concentrated in North York near `2779 YONGE ST`, `2425 BAYVIEW AVE`, and `2706 BAYVIEW AVE`). On **Saturday midday (12–2 PM)**, that number more than triples to **1,229** proposed homes across North York (`1,012`) and Etobicoke York (`217`, including `240 MARKLAND DR`).
- **Missing City data is shown, never hidden:** Rather than silently dropping incomplete rows, ASTER accounts for every excluded record—**535** proposals with unresolved locations, **499** with missing or zero structured residential units, and **76** shared-address distinct IDs—so residents can look up a specific street or project number and see *why* it is not mapped.

---

## What residents can do with ASTER

1. **Screen any Toronto neighbourhood in seconds (`/`):**
   - Explore **All Toronto**, any of the **4 Community Councils** (`Toronto & East York`, `North York`, `Etobicoke York`, `Scarborough`), or focus views (`Downtown`, `Midtown`) on an interactive offline-first Toronto street map (City Centreline roads, 158 neighbourhoods, Green Spaces, Lake Ontario shoreline, and TTC Lines 1/2/4/5 with 92 stations).
   - Search by street, neighbourhood, or City project number, test **400 m**, **800 m**, and **1,600 m** straight-line rings across **weekday morning (7–9 AM)**, **weekday evening (4–6 PM)**, and **Saturday midday (12–2 PM)**, and compare two areas side by side.
2. **Bring evidence to a community meeting or council deputation:**
   - Add local notes (such as sidewalk barriers, crossings, or bus crowding that timetables don't capture), then click **Print / Save as PDF** for a clean formatted brief, **Export JSON** for a reproducible data package, or **Copy reproducible link** to share the exact filters and snapshot.
3. **Inspect 3D building context (`/#view=3d`) & optional 2024 energy/water baselines:**
   - Jump directly from Downtown (`City Hall`, 307 2025 buildings, 3 proposals) and Midtown (`Yonge–Eglinton`, 516 2025 buildings, 19 proposals) records into an interactive **3D Street Map** (`MapLibre`) or **3D Massing Studio** (`Three.js`) to inspect recorded 2025 heights, test a collision-checked geometric replacement box (with one-click recovery on overlapping massing parts), and jump back to transit tables.
   - Optionally expand **Reported energy & water evidence** on the main page to attach 2024 Toronto-wide Ontario EWRB building-cohort benchmarks (**2,451** properties across 35 types, including **1,614** Multifamily Housing records with water intensity, energy, and GHG quartiles) or **247** City of Toronto municipal facility meter baselines directly to a community brief—clearly scoped as 2024 baseline context, never fabricated as future building predictions.

---

## Open datasets used

All datasets are licensed under the **Open Government Licence – Toronto** (or Ontario Open Data for Energy benchmarking) and verified with SHA-256 receipts:
- City of Toronto Development Pipeline & Development Applications
- TTC Merged GTFS Routes and Schedules
- Toronto Centreline (streets & rail), Green Spaces, Neighbourhoods (158), and Community Council Boundaries (4)
- City of Toronto 3D Massing (2025 snapshot)
- City of Toronto Municipal Building Energy Consumption & Ontario Energy and Water Reporting and Benchmarking (2024)

---

## Quality, transparency & honest limits

- **Verified on the shipped package (`57c21b7d...`):** Every included count and TTC distance is independently audited against raw source files, and automated Playwright checks + visual 7-page PDF review verify WCAG 2.1 AA contrast, landmarks, keyboard navigation, zero horizontal overflow on mobile (`390×844`), and clean `@media print` output.
- **Explicit product & analytical limits:**
  - **Information-heavy interface:** Because ASTER keeps methodology, source dates, and excluded records inspectable alongside maps and comparisons, the main page is denser than a simplified consumer map (Energy & Water starts collapsed by default to keep the primary flow focused).
  - **Bounded 3D coverage:** While 2D housing and TTC screening covers all 158 Toronto neighbourhoods, `#view=3d` covers only two bounded 600 × 600 m examples (`Downtown · City Hall` and `Midtown · Yonge–Eglinton`).
  - **Geometry-only 3D replacements:** The 3D "what-if" box checks footprint collisions and compares height, ground area, and 3D volume only—it does not model validated traffic, transit crowding, shadows, wind, zoning, or energy/water consequences.
  - **Straight-line screening & pipeline uncertainty:** Straight-line proximity does not measure sidewalk safety, crossings, crowding, or vehicle capacity; departure spacing within each hour is not assessed; and Development Pipeline records reflect structured City fields rather than confirmed built homes.
- **Unverified human gates (disclosed candidly):** Dedicated human screen-reader testing (VoiceOver/NVDA) and independent resident participant sessions have not yet been completed (`screen_reader` and `participants` remain explicitly `blocked` in `docs/growth-transit/release-report.json`). No claim of measured community adoption or policy impact is made.

---

## 90-second demonstration script

1. Open `/` on **All Toronto** and show the city-wide offline street map with `1,281` screened proposals across all four Community Councils.
2. Click the **Scarborough 400 m** quick example (or **North York 800 m**) and toggle between weekday morning and Saturday midday to show how frequent-service coverage shifts across outer-borough corridors.
3. Open **Methodology, data completeness & limitations** to show how `535` unresolved addresses and `499` missing-unit records are kept visible rather than silently dropped.
4. Select two areas, type a local community question, and show **Print / Save as PDF** and the hash-pinned shareable link.
5. Click **Toronto 3D ↗** into `#view=3d` (`City Hall` or `Yonge–Eglinton`) to inspect real 2025 City massing and proposal pins linked back to transit tables.

---

*Competition deadline: December 4, 2026.*
