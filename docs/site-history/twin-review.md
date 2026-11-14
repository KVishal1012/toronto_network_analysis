# Local site-twin review

Run `npm run build:twin-review`, then `npm run preview:twin-review`. Open http://127.0.0.1:5177/.

This separate build exports the local registry into `dist-twin-review`. It does not change the public release or use the private Lab. The exporter requires the existing registry, planning snapshot and source context assets; it does not acquire or refresh sources.

## Implemented

- All 136,710 provisional parcel-reference sites, with overlaps retained across Downtown, Midtown and North York Community Council.
- Region selection, candidate planning-address/site-ID search, keyboard-accessible site list and selectable parcel geometry.
- Source references, retrieval dates, original planning descriptions/statuses and explicitly candidate associations.
- Baseline observation timeline; comparison disabled until qualified temporal evidence exists.
- Browser-local saved sites and notes, removal, version-pinned local links and JSON evidence exports. Personal notes are excluded from evidence exports.
- Map and geometry loaded on demand; geometry tiles and site shards avoid downloading the full registry at startup. Mobile map starts disabled.

## Verification on 2026-11-01

Build passed. Four provider tests and two export reconciliation tests passed. Export checks account for 136,710 unique sites and 11,177 candidate associations, reconcile regional indices and require source receipts. Existing registry/history tests passed during implementation.

Browser checks covered all three regions, explicit site selection, map selection, keyboard Enter, evidence expansion, baseline messaging, saved notes across reload, bookmark removal, JSON export, and pinned-link reload. Desktop 1440×1000 and mobile 390×844 layouts were inspected; mobile had no horizontal overflow. Browser console showed no errors during these checks. This is not a complete accessibility audit or physical-device performance benchmark.

## Remaining release gates

All planning associations remain candidates; zero are confirmed. Planning address labels are search aids, not verified parcel addresses. The registry has one parcel observation, so the interface cannot show physical change or qualified two-date comparison. Human identity adjudication, qualified temporal observations and the five-person comprehension check remain outstanding. Public release remains a separate decision.

The existing public explorer retains transportation and practical energy guidance. These are not yet embedded in this local review interface.
