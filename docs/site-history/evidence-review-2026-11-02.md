# Evidence and release review — 2 November 2026

Reviewer: Codex (AI-assisted source review, not a human participant study).

## Completed checks

A fresh read-only census of registry version `596988ecb5a60aae4562d708f8e20d42b88c736d2364b04482dce3a08252ba90` reconciled 136,710 sites and all 29,039 planning rows. SQLite integrity passed. No missing association receipts, dangling site references, duplicate source/record keys or unexplained count differences were found by this census. All 1,325 publisher-number groups spanning multiple parcels have diagnostic review entries. An independent geometric check also verified that every candidate source point intersects its referenced parcel. This checks the recorded spatial method, accounting and provenance presence, not the identity of the development site.

Run `python scripts/audit_twin_release.py` with the project virtual environment to regenerate `release-review.json`. Its risk sample selects the three highest-record-count sites per region; it is not a random accuracy estimate. Region overlap is retained. Zero confirmed matches means there is no confirmed sample to validate, not that match accuracy is perfect.

31 Python tests and four frontend provider tests passed. The existing public build's isolation check passed. No UI change or public deployment was made in this review. Earlier browser tests remain historical evidence; complete release browser QA is still pending.

## Source investigations

### Downtown: parcel labelled 1 Draper Street

Site `site-3ab0d88c-beff-4fef-918b-d6343300168d` has 113 source rows across 11 address labels. The City's [2 May 2014 preliminary report](https://www.toronto.ca/legdocs/mmis/2014/te/bgrd/backgroundfile-69159.pdf), application `14 116571 STE 20 OZ`, explicitly describes a multi-address proposal including Front, Wellington, Spadina and Draper. This supports interpreting the address group as a proposal spanning several addresses. It does not prove every linked application or exact equivalence with the 2026 parcel polygon. Decision: retain candidates; do not collapse all records into one application or confirm the entire site.

### Midtown: parcel labelled 191 Duplex Avenue

Site `site-6b019b61-5b7e-42eb-bff0-d3c55d3eabd9` has 33 rows across 17 labels. Local source records repeat application `08 152941 STE 22 OZ` and describe townhouses on Duplex with an apartment building on Berwick. A third-party mirror surfaced a related City report, but the official historical agenda endpoint could not be retrieved in this review. The mirror was not used to confirm identity. Decision: retain candidates; obtain the authoritative report and reconcile its site plan with the current polygon.

### North York: parcel labelled 1 Dorney Court

Site `site-b791cbce-3dca-48b0-87d6-963c02c60722` has 88 rows across Bagot/Dorney address labels. The City's [2026.PH28.5 agenda record](https://secure.toronto.ca/council/agenda-item.do?item=2026.PH28.5) identifies related application `25 251661 NNY 08 OZ` as covering Lawrence Heights Phase 2. This corroborates the proposal-level relationship in the local records. It does not establish that the complete present parcel equals that phase boundary, or that demolition has occurred. Decision: retain candidates pending polygon/site-plan comparison.

## Gate decisions

- Accounting: passed for the existing snapshot, with no unexplained omissions in the census.
- Public isolation: passed for the existing public package; the twin remains a separate local artifact.
- Boundaries: retained previously qualified baseline; no new boundary definition claimed.
- Rights: the City Property Boundaries catalogue still links its Open Government Licence. Parcel-source permission does not by itself complete rights qualification for every source and document in a future release.
- Identity and matching: blocked. Diagnostic reviews and the three focused source investigations do not adjudicate every conflict or establish permanent development-site identity.
- History: one distinct parcel observation in the current registry. A fresh acquisition is checked separately; unchanged raw data must not create an event.
- Browser release QA: pending on the eventual qualified release build; earlier local interaction checks are not a complete accessibility assessment.
- Comprehension: zero participant sessions. AI review cannot supply five people's actual responses.

The release checker now requires dated, same-build human-participant receipts containing all five task responses, instead of accepting five IDs with a pass flag. It rejects missing fields, simulated participants and mixed builds. This is validation of submitted receipts, not independent verification of human attendance.

## Remaining dependency

Qualified identity requires source site/parcel references or defensible site-plan-to-parcel adjudication with provenance. Existing points and shared application numbers cannot supply that missing evidence automatically. Keep the current baseline-only local interface until those assertions and temporal evidence are qualified. Do not convert unresolved cases into confirmations to satisfy the release counter.

## Fresh parcel acquisition result

Two network-enabled attempts to acquire a new complete parcel export failed on 2 November: HTTP/2 ended with curl error 92; HTTP/1.1 retry ended with curl error 18 and 84,253,049 bytes still expected. The acquisition wrapper discarded both incomplete staging directories. No new receipt or registry version was created and the baseline was not replaced. Current catalogue metadata was readable and still declared `open-government-licence-toronto`; its GeoJSON resource advertised 313,411,449 bytes and last_modified `2026-10-03T03:58:39.864332`. Metadata alone does not prove unchanged data, completeness, or a second observation. Temporal acquisition is blocked by incomplete transfers as well as the outstanding identity qualification.
