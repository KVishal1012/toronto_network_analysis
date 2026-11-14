# Three reproducible regional investigations

Pinned analysis: `6ed092c988ad9326e279`. These are developer demonstrations, not evidence of community impact.

Open the local public preview and append each hash below. Keep stage = Under Review + Active, minimum = 0, morning = 07–09, threshold = 800 metres. Dates are explicit in the interface.

## downtown: When the shortlist is empty

Expected default result: **0 candidate areas**. No candidates under these settings does not demonstrate adequate service.

[Reproduce locally](http://127.0.0.1:5178/#analysis=6ed092c988ad9326e279&snapshot=8269765c8521a43294ae&transit=051a87c14d446d5ca49c&region=downtown&stage=all&radius=800&period=morning&minimum=0&gaps=1&areas=)

1. Confirm the empty shortlist message.
2. Uncheck the candidates-only filter to inspect included proposals.
3. Try 400 metres and another period. Explain why a zero-result screening cannot answer questions about capacity, safety or walking routes.

## midtown: Check whether a finding survives a different threshold

Expected default result: **1 candidate areas**. These are investigation candidates, not proven service deficits.

[Reproduce locally](http://127.0.0.1:5178/#analysis=6ed092c988ad9326e279&snapshot=8269765c8521a43294ae&transit=051a87c14d446d5ca49c&region=midtown&stage=all&radius=800&period=morning&minimum=0&gaps=1&areas=1257_9683)

Selected area `1257_9683`, near 2779 YONGE ST.

| Period | 400 m | 800 m | 1,600 m |
|---|---:|---:|---:|
| morning (2026-11-13) | 202 | 202 | 0 |
| evening (2026-11-13) | 202 | 202 | 0 |
| saturday (2026-11-14) | 202 | 202 | 0 |

Values are reported proposed units in included records outside the selected service threshold.

1. Open the selected area and check its publisher references and structured quantities.
2. Compare all three periods and distances. Note any change before writing your interpretation.
3. Prepare a brief asking what walking-connection and capacity evidence is needed. Do not infer construction or a confirmed service deficit.

## Evidence and limitations

`regional-demonstrations.json` records publisher references, quantities, qualifying stop evidence, dates and source URLs. Excluded and unresolved records remain accessible in the interface. Descriptions can reflect different revisions from structured quantities; do not substitute prose totals. Regions overlap and their totals must not be added. The planning snapshot and timetable are dated independently.
