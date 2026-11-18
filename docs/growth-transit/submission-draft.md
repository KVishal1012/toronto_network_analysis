# Toronto Open Data Awards — Submission Draft (Not Submitted)

**Project:** ASTER — Toronto Housing, Transit & 3D Explorer  
**Category:** Open Data Applications (Grassroots / self-funded)  
**Civic question:** Which areas across Toronto with recorded housing proposals deserve closer investigation of nearby scheduled TTC service?

ASTER helps Toronto residents and community groups compare proposed housing quantities and scheduled TTC proximity across **All Toronto**, the **4 Community Councils** (`Toronto & East York`, `North York`, `Etobicoke York`, `Scarborough`), and focus views (`Downtown`, `Midtown`). Using a plain-language 3-step guide, street/neighbourhood/project-number search, offline City of Toronto vector maps (streets, 158 neighbourhoods, parks, Lake Ontario, TTC Lines 1/2/4/5 and 92 stations), and plain-English transit frequency takeaways (`4+ scheduled departures/hour`, roughly every 15 minutes or better), users can test distance (`400 m`, `800 m`, `1,600 m`) and time-period assumptions, inspect excluded or unresolved records (`499` no/zero units, `76` shared address IDs, `535` unresolved locations), and print/save a PDF or export a hash-pinned JSON community brief.

The contribution is a reproducible, rights-reviewed comparison of planning evidence (`1,281` included proposals across `601` areas out of `2,391` City records) with scheduled TTC service and 2024 energy baselines (`1,614` Ontario multifamily reporting records and `158` Downtown municipal facilities), with missing data and uncertainty kept explicit. It does not establish future population, construction, transit capacity, walking routes, or service deficits.

**Evidence of usefulness:** `148` Python unit tests, `38` Node unit tests, `42` independent computational source rereads (`audit_screening.py`), and automated Playwright, Print/PDF, mobile (`390×844`), and WCAG 2.1 AA contrast/landmark/keyboard checks pass on build `dc259eb321d25ebe54d5fc53cc310397f5f554b362199cef89a76c36e4d05dbc` (screening `db9180012cb408a03d97`). Dedicated human screen-reader evaluation (`VoiceOver`/`NVDA`), genuine resident participant sessions, and owner publication sign-off remain separate human steps; do not claim resident adoption, institutional use, or policy outcomes without actual evidence.

## 90-second demonstration

1. Open `/` on **All Toronto** at `800 m` in the weekday morning rush (`7–9 AM`) showing `1,281` screened proposals across all four Community Councils on the offline Toronto street map.
2. Switch to **Scarborough** (or search `Kingston` / `Etobicoke`) and compare `400 m` / `800 m` / `1,600 m` and morning/evening/Saturday results, noting explicit within-vs-beyond counts.
3. Open **Coverage & exclusions** (`535` unresolved locations, `499` missing/zero units) and explain what the analysis cannot assess (sidewalks, crowding, bus/train capacity).
4. Enter a local community question, show **Print / Save as PDF** + reproducible hash-pinned JSON export, and open `#view=3d` (`City Hall` / `Yonge–Eglinton` **3D Street Map**) to inspect recorded 2025 buildings, coral proposal towers, and collision-checked replacement boxes.

Before submission: verify the live GitHub Pages URL (`https://kvishal1012.github.io/toronto_network_analysis/`), complete any optional VoiceOver/resident walkthroughs, and review the competition form before submitting.
