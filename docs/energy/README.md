# Reported energy evidence

The public explorer has two independent, optional evidence views:

* Ontario EWRB 2024: Toronto-wide, calculated-property-type intensity comparisons. The source supplies coarse postal prefixes, not street addresses. An EWRB ID may cover multiple structures. No EWRB-to-3D building join is made.
* Toronto municipal facilities 2024: exact-address matches to the qualified municipal address snapshot, clipped to the existing Downtown/Midtown ASTER study areas. Facilities, meters and source building footprints remain separate entities. All 1,731 properties and 36,663 meter rows are processed before regional filtering.

## Reproduce

Requires Python 3.12, the pinned `requirements.txt`, and existing qualified planning/address and boundary inputs.

```sh
npm run acquire:energy -- --year 2024 --directory data/energy-source/NEW-RUN
npm run build:energy -- --source data/energy-source/NEW-RUN --address-snapshot 8269765c8521a43294ae
.venv/bin/python scripts/audit_energy.py --source data/energy-source/NEW-RUN
npm run test:energy
npm run build:public
.venv/bin/python scripts/qualify_screening.py
```

Acquisition resolves exact resources through the official catalogues, performs two complete matching downloads, parses every worksheet, and records failures without changing the active baseline. There is no independently published worksheet count endpoint; manifests explicitly record that limitation. Counts are verified against the acquired worksheets and reconciled through processing.

Raw XLSX files, supporting documents, complete row outcomes and refresh receipts stay under ignored `data/`. Public output is field-limited JSON under ignored `public/energy/`; build packaging copies only byte-allowlisted assets into `dist-public/planning/energy/`. No reporter contacts, costs, free-text certifications, meter names or document copies ship. Shared links pin the energy snapshot, metric, cohort, facility and selected brief attachments. Existing qualified versions are retained. Identical source content does not create a new observation or history event.

## Interpretation and quality rules

Ontario uses the publisher's calculated property type, with explicit Toronto municipality aliases listed in the manifest. No FSA-to-neighbourhood assignment is inferred. Intensities stay in publisher units, with annual-period labels; site/source and weather-normalized/non-normalized variables stay separate. Invalid or negative values remain missing. A reported water zero is unknown because the dictionary says zero and non-reporting cannot be distinguished. Other reported zeros remain visible and flagged. Values are not trimmed as outliers.

Cohorts use unweighted medians and linearly interpolated quartiles at sorted index `(n-1)*p`; distributions require ten valid values. Missing and flagged counts overlap. A Data Quality Checker run is not certification or independent verification. Reporting properties are not a representative sample. These comparisons do not measure Downtown/Midtown or the user's selected building.

The City's 2024 workbook uses property, property-ID and meter-entry sheets, while its current readme describes an older annual format. Interval inclusivity is therefore unqualified and all annual totals are disabled. Cards show the sum of accepted entries separately for each meter/fuel/unit and their actual source date labels. They never extrapolate gaps or add different units. Conflicting consumption IDs, meter identity conflicts and overlapping intervals are quarantined. Adjacent endpoint labels are allowed as separate source entries without claiming verified non-overlapping annual consumption. The source's `Average Influent Flow` records are rates rather than energy; they are excluded from energy totals. Unknown units and negative consumption are excluded. Estimation flags remain visible.

Exact address agreement establishes a facility location only. Ambiguous coordinates are excluded; no nearest-building assignment or address abbreviation guessing is used. Study-area overlaps are retained. Energy effects of hypothetical replacement buildings remain unmodelled.

## Review artifacts and release limits

* `coverage.json`: every worksheet's input/outcome accounting and municipal coverage.
* `rights-contract.json`: exact file allowlist, supporting source rights, hashes and attribution. This is an AI-assisted source review, not a legal opinion or publisher endorsement.
* `analytical-review.json`: twelve independent source-reread cases (six Ontario, six municipal), including small cohorts, missing IDs, ambiguous addresses and overlapping readings.
* The build-bound release report and focused browser receipt identify the candidate actually checked. A prior browser receipt does not pass a changed build.

Participant sessions and civic impact remain unvalidated; this work does not satisfy those release gates. Publication is a separate owner decision.

## Participant evaluation supplement

Without coaching, ask a participant to open Energy, choose a property type and metric, inspect a municipal facility, include one source in a community brief and explain what it supports. Record completion, time and their own words. Ask: “Does this comparison tell us the energy use of the building you selected in 3D?” and “What period and coverage do these facility readings represent?” Preserve misunderstandings and retest corrected wording; do not substitute generated answers for real sessions.

Sources: [Ontario EWRB](https://data.ontario.ca/dataset/energy-and-water-usage-of-large-buildings-in-ontario), [Ontario disclosure rules](https://www.ontario.ca/document/guide-energy-and-water-reporting/how-ewrb-uses-building-data), [Toronto municipal energy](https://open.toronto.ca/dataset/annual-energy-consumption/).
