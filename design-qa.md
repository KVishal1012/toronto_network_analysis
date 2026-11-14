# Neighbourhood Brief design QA

Date: 2026-10-31
final result: passed

This result covers visual implementation of selected design 2 and the listed verified flows. It is not a release, complete accessibility audit, or source freshness certification.

## Reference and evidence

Reference: `/Users/koushikannamalai/.codex/generated_images/01a1730d-7515-7721-931c-a5e78a9d2246/exec-78d353bd-1ed0-4ed4-b5db-462509ad84b7.png`.

- Combined reference/render: `/tmp/aster-brief-resumed-comparison.jpg`. Both normalized to 1425 × 1013; 100 Queen St W, 800 m, October 29 at 08:00, three records per section.
- Desktop render: `/tmp/aster-brief-resumed-desktop.jpg`. Requested viewport 1440 × 1024; captured content 1425 × 1013.
- Mobile render: `/tmp/aster-brief-mobile-resumed.jpg`, requested viewport 390 × 844.
- Expired timetable: `/tmp/aster-brief-expired.jpg`.
- Earlier mobile evidence dialog: `/tmp/aster-brief-mobile-evidence.jpg`.

## Visual review and iterations

Typography: retained clear heading/body hierarchy, strong address heading and readable publisher status labels. Existing font stack retained.

Spacing/layout: slim header, horizontal desktop search, optional map, two columns and three-record overview match the selected direction. Mobile stacks the sections. First iteration had excessive whitespace and only two visible transit rows; spacing was reduced and the overview limited to three rows. Remaining extra space above planning rows and additional scrolling for notes are P3 polish.

Colours: warm light background, teal actions, subtle separators. Stale-data warning remains visible. Status is expressed in text without relying on colour.

Assets: text wordmark and existing Lucide line icons; no raster or decorative assets required.

Copy: actual source records replace illustrative mockup values. Publisher status, retrieval dates, approval-versus-construction warning, straight-line-distance limitation, timetable dates and scheduled-versus-live limitation remain. These add density compared with the reference intentionally.

No outstanding P0/P1/P2 visual issues identified. This is a design adaptation, not a pixel-identical reproduction.

## Verified checks

- Public TypeScript/Vite build, packaging and public isolation checks passed.
- 18 relevant JavaScript tests passed (planning, worker, startup/GTA and transportation).
- Desktop search, explicit address selection with ArrowDown/Enter, planning evidence dialog and Escape close.
- Expand planning overview and return; source-stop disclosure with keyboard.
- Planning CSV download; transport hour change and shared pin reload retaining selected hour.
- Map show/hide control exercised; full cartographic visual review not included.
- Mobile at 390 and 320 widths checked for overflow in the implementation pass. Fresh 390-width check: viewport 390, document content width 375; no horizontal overflow.
- November 1 pinned date correctly displays out-of-timetable warning and Count unavailable for each route, rather than zero departures.
- Fresh browser error/warning log empty.

## Outstanding verification and data limits

- Direct native date editing remains unverified: automation filled November 1 in the input, but app state stayed October 29 even after Tab. The out-of-range calculation was separately verified via a reloaded pinned URL. Retest with ordinary manual date selection before release; this report does not claim the date editor passed.
- No physical-device, screen-reader or participant comprehension study performed.
- Current TTC feed ends October 31, 2026. November service requires a newly qualified feed. Planning observations remain visibly marked delayed.
- Local preview only. No commit or deployment performed.
