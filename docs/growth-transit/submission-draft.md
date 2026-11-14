# Toronto Open Data Awards — draft, not submitted

**Project:** ASTER — Housing & Transit Explorer
**Category:** Open Data Applications; grassroots/self-funded subject to owner reconfirmation.
**Civic question:** Which areas with recorded housing proposals deserve closer investigation of nearby scheduled transit service?

ASTER helps residents and community groups compare proposal quantities and scheduled TTC proximity in Downtown and Midtown using a plain-language 3-step guide, street and City project-number search (with transparent explanations for excluded or outside-area addresses), and plain-English transit frequency takeaways (`4+ scheduled departures/hour`, roughly every 15 minutes or better). Users choose a region, test distance and time assumptions, inspect exclusions and source evidence, and print/save a PDF or export a JSON brief containing their own investigation question. The product uses explicit rules instead of an opaque neighbourhood score.

The contribution is a reproducible comparison of planning evidence with scheduled service, with missing data and uncertainty visible. It does not establish future population, construction, transit capacity, walking routes or a service deficit. Numerical findings are pinned to specific source snapshots and dates.

**Evidence of usefulness:** developer tests, an independent computational source reread, and automated headless browser, Print/PDF, and WCAG accessibility checks are available. User impact is not yet validated with independent residents. Do not claim resident adoption, institutional use, improved service or policy outcomes without actual evidence.

## 90-second demonstration

1. Open Downtown at 800 m in the morning using the 3-step guide. Show the honest empty shortlist and explain that it does not prove adequate transit.
2. Switch to Midtown (or use the Midtown quick example) and search by street or project number to compare two candidate areas across Downtown and Midtown. Explain that quantities are reported proposed units, not future homes or new riders.
3. Compare 400/800/1600 m and morning/evening/Saturday results, noting the plain-language within-vs-beyond frequent-TTC summary. Open a planning record and its scheduled-service evidence.
4. Show excluded/unlocated records (and how searching an outside area like North York explains coverage limits honestly) and explain what the analysis cannot assess.
5. Enter a concrete question about walking connections or capacity. Print/save a PDF or export a source-linked JSON community brief, then reload its pinned link.

Before submission: obtain owner approval to publish, verify the actual public URL, optionally complete 3–5 resident walkthrough sessions, then review and submit the form separately. Do not represent the localhost candidate as publicly deployed.

Current candidate also includes the **Downtown (City Hall) and Midtown (Yonge–Eglinton) Architectural 3D viewer** (`#view=3d`) with 2025 source massing, plain-language metre and illustrative `~3 m/storey` context, keyboard-accessible camera controls, single-building hypothetical replacement with footprint overlap checks, and JSON comparison export. Recorded source massing stays read-only, with no sunlight, wind, construction, or traffic simulation claims. Automated browser, Print/PDF, and WCAG contrast/landmark/label/keyboard checks pass; dedicated human screen-reader evaluation and actual resident participant sessions remain the next step.
