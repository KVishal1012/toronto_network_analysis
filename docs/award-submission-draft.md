# Toronto Open Data Awards — draft, not submitted

**Project:** ASTER — Neighbourhood Planning Explorer
**Target scope:** Greater Toronto Area, all 25 municipalities — owner decision October 23, 2026.
**Implemented public coverage:** Toronto. GTA source qualification has started; do not describe the published app as having complete GTA planning coverage.
**Category:** Open Data Applications
**Public URL:** https://kvishal1012.github.io/aster-neighbourhood-explorer/
**Source code:** https://github.com/KVishal1012/aster-neighbourhood-explorer
**Review branch:** codex/planning-explorer
**Demonstration and screenshots:** https://github.com/KVishal1012/aster-neighbourhood-explorer/blob/main/DEMO.md
**Funding:** Grassroots / self-funded — confirmed by the owner on October 22, 2026.
**Student eligibility:** not claimed.

## Civic problem

Residents encounter separate planning datasets with different record meanings, dates and coverage. Applications can be mistaken for projects, and an approval can be mistaken for completed construction.

## Application

ASTER combines guided location search, deterministic proximity queries, a map and an accessible results list. Project/application records stay separate; every selected record exposes original attributes, source dates and location limitations. Optional illustrative buildings provide context without inventing proposed development geometry.

## Open data

Toronto Development Pipeline, Development Applications, Zoning By-law, Municipal Address Points, neighbourhoods, Toronto Centreline and 2025 building massing. Data receipts and exclusions are inspectable; no vendor imagery credentials are necessary.

## Evidence of usefulness

Developer verification is documented in VALIDATION.md. The owner chose an alternative to recruiting five residents: documented task walkthroughs and an optional self-guided feedback route. No resident test sessions have occurred. No claim of resident adoption, measured civic impact or accuracy beyond source limitations is made. This evidence is weaker than independent resident testing and should be stated candidly in the submission.

## Technical release evidence — October 23, 2026

- Published commit: `207351b11634d09fe32c9cb265fd95da0aeb4248`, retained on `codex/planning-explorer` and deployed from `main`.
- [Final branch validation passed](https://github.com/KVishal1012/aster-neighbourhood-explorer/actions/runs/40052150730).
- [Public Pages deployment passed](https://github.com/KVishal1012/aster-neighbourhood-explorer/actions/runs/40052260266).
- [Actual scheduled source refresh passed](https://github.com/KVishal1012/aster-neighbourhood-explorer/actions/runs/39970160855); five published snapshots remain available.
- Hosted mobile viewport verification: list-first results, source evidence and snapshot-pinned query restored without creating a map canvas until requested. Formal screen-reader testing and physical-device CPU evaluation remain unverified.

## Demonstration script (about 90 seconds)

1. Search 100 Queen St W and choose its municipal address point.
2. Choose 800 m and Under Review; explain straight-line distance and publisher status.
3. Open a project and show its original attributes, source date and official link.
4. Switch to zoning and explain why mapped attributes are not legal entitlement.
5. Switch back to Projects, enable Browse unlocated records and show the explicit missing-location reason.
6. Copy a snapshot-pinned link and export evidence.

Before submission: verify the public URL, document developer checks and any optional public feedback actually received, confirm applicant details and review the final form. Deadline verified from the City announcement: December 4, 2026. Do not automatically submit.
