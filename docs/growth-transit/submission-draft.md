# Toronto Open Data Awards — Submission Draft (Not Submitted)

**Project:** ASTER — Toronto Housing, Transit & 3D Explorer  
**Category:** Open Data Applications (Grassroots / self-funded)  
**Civic question:** When thousands of new homes are proposed in a Toronto neighbourhood, how close are they to frequent TTC service—and what is missing from the City's records?

## Summary

Toronto residents and community groups regularly debate housing growth and transit readiness, but official City datasets live in separate portals with incompatible formats, dates, and definitions. Proposed homes are easy to confuse with built housing, nearby bus stops can look "served" even when rush-hour or weekend frequency is low, and incomplete or unlocated records are usually dropped without explanation.

**ASTER** brings together City of Toronto Development Pipeline records, scheduled TTC timetables, neighbourhood and Community Council boundaries, offline Toronto street maps, 3D building massing, and optional 2024 energy/water baselines in a free, browser-based screening tool.

Across all **2,391** City Development Pipeline records (**1,281** geolocatable proposals across **601** areas in all 4 Community Councils), ASTER surfaces clear city-wide patterns:
- **31,938** of **603,846** unbuilt proposed homes sit beyond **400 m** (straight-line) of frequent weekday morning TTC service (4+ scheduled departures/hour in each hour of the 7–9 AM window), spanning North York (`12,090`), Toronto & East York (`9,019`), Etobicoke York (`7,793`), and Scarborough (`3,036`).
- At **800 m**, proposed homes beyond frequent TTC service more than triple from **386** on weekday mornings (North York) to **1,229** on Saturday midday (`1,012` in North York and `217` in Etobicoke York).
- Every excluded record is accounted for explicitly (**535** unresolved locations, **499** missing/zero structured residential units, **76** shared-address distinct IDs) so residents can verify any street or project number.

Residents can search any street, neighbourhood, or project number, test `400 m` / `800 m` / `1,600 m` rings across morning, evening, and Saturday timetables, add local context (sidewalks, crossings, bus crowding), and export a clean **Print / Save as PDF** community brief, a reproducible **JSON** package, or a hash-pinned shareable URL. Optional views let users inspect Downtown (`City Hall`) and Midtown (`Yonge–Eglinton`) proposals in **3D** against 2025 City building massing, or attach **2024 Energy & Water** baselines (`2,451` Toronto-wide Ontario EWRB properties and `247` City municipal facilities) as clearly scoped baseline context.

## Quality & honest limits

All calculations are independently cross-checked against raw City and TTC open datasets, and automated browser + visual PDF checks against the shipped build (`57c21b7d...`) verify WCAG 2.1 AA contrast, keyboard navigation, mobile layout (`390×844`), and clean print/PDF output.

**Honest limitations disclosed upfront:**
- **Information density:** ASTER prioritizes source traceability and explicit exclusions over a stripped-down UI, so the interface remains information-heavy (optional Energy & Water baselines start collapsed by default).
- **Bounded 3D scope & geometry-only scenarios:** `#view=3d` covers two bounded 600 × 600 m examples (`Downtown · City Hall` and `Midtown · Yonge–Eglinton`), not all of Toronto, and replacement boxes describe geometric changes (height, footprint area, 3D volume with collision checks) rather than validated traffic, shadow, zoning, or energy consequences.
- **Transit & pipeline limits:** Straight-line distance does not measure walking safety, crowding, or vehicle capacity; departure spacing within each hour is not assessed; and pipeline proposals do not guarantee future construction.
- **Unverified human gates:** Actual human screen-reader testing (VoiceOver/NVDA) and independent community impact/participant sessions have not yet been completed and remain explicitly disclosed as unverified (`blocked` in `release-report.json`); no claim of measured adoption or policy outcome is made.

## 90-second demonstration

1. Open `/` on **All Toronto** showing `1,281` screened proposals across all four Community Councils on the offline Toronto street map.
2. Click **Scarborough 400 m** or **North York 800 m**, then switch between weekday morning and Saturday midday to show how frequent-service coverage shifts.
3. Open **Methodology, data completeness & limitations** to show the `535` unresolved addresses and `499` missing-unit records kept transparent.
4. Select two areas, add a local community question, and preview **Print / Save as PDF** + the reproducible share link.
5. Open **Toronto 3D ↗** (`#view=3d`) to inspect Downtown (`City Hall`) and Midtown (`Yonge–Eglinton`) 2025 massing and proposal pins linked back to transit tables.

*Before submitting: confirm GitHub Pages is live at `https://kvishal1012.github.io/toronto_network_analysis/`, complete resident walkthroughs / VoiceOver check, and review all form fields.*
