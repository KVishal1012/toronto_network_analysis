# Identity and source-rights review — 4 November 2026

Candidate: `2fdead66e3fd6ef03e3c7caa2237ac25213b52fe4847382d1ece259af36f3045`.
Scope: the local twin candidate, not the separate public explorer, transit, energy or private Lab. No deployment performed.

## Rights decision

The seven official catalogues were retrieved and checked: Development Applications, Development Pipeline, One Address Repository, Toronto Centreline, Property Boundaries, Neighbourhoods and Community Council Boundaries. Each declares `open-government-licence-toronto`. The City's licence permits adapting and redistributing licensed information subject to attribution and exemptions. Dataset limitations reviewed do not introduce an additional redistribution prohibition.

Qualification is limited to this package's selected planning attributes, derived address locations, reference geometry and study-area boundaries. The export omits dedicated owner/contact fields. A scan of all 11,177 unique exported planning records found no email, phone or labelled-contact patterns in descriptions; pattern screening cannot prove absence of every form of personal information. Street features contain geometry with empty properties. Parcel references contain snapshot hash, OBJECTID and PARCELID; these are not asserted to establish ownership or persistent publisher identity.

Attribution is included in the map and registry receipt exposed through Coverage, sources & method; the receipt and licence URL are included in evidence exports. Applicant drawings, PDFs and third-party illustrations remain excluded. Official symbols and endorsement claims are not authorised. These findings qualify the reviewed data uses, not the product's factual identity claims.

`rights-adjudication.json` records source hashes, conditions, exact candidate digest and hashes of the downloaded evidence. `source-rights.json` consumes it. A different build, different source hash, missing evidence or changed evidence invalidates qualification. Evidence is retained under `data/source-rights-review/2026-11-04/`; failed network/TLS attempts are retained separately. Downloads succeeded using system curl with certificate validation enabled.

Official licence: https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-licence/

## Midtown identity finding

Retrieved the previously unavailable City report dated 15 September 2008 for application `08 152941 STE 22 OZ`. Reviewed pages 1, 3, 14 and 22, including a rendered visual inspection of the site plan on page 14. The report associates the Duplex/Berwick address range with the historical proposal. Its drawing is marked not to scale. The application sheet supplies a partial lot/plan description and historical area, not a crosswalk to current parcel IDs.

Historical proposal area: 4,749 m². The two currently associated parcels measure approximately 294.31 and 4,200.40 m² in EPSG:26917. Neither area agreement nor disagreement establishes identity; these measurements are diagnostic only. All 18 source records in the conflict group retain their candidate associations. No parcel merge, confirmation, or construction claim was made.

Decision: **unresolved current parcel identity**. Required evidence: an authoritative legal parcel crosswalk or georeferenced survey/site plan, including intervening parcel changes. A content-versioned document adjudication preserves the predecessor review reference; its receipt is indexed by `authoritative-identity-review.json`. Existing packaged adjudication references remain intact. This new review artifact is local and has not been inserted into the unchanged candidate package.

Official report: https://www.toronto.ca/legdocs/mmis/2008/te/bgrd/backgroundfile-15714.pdf

## Remaining gates

This focused review does not complete authoritative document review of all 1,368 conflict cases. Downtown and North York's earlier findings also remain proposal-context support rather than established current parcel identity. Identity and comprehensive matching review remain blocked. Five genuine participant sessions remain outstanding. Baseline-only history remains acceptable; the successful unchanged parcel refresh did not create an observation change.

Six targeted qualification/rights tests passed, including rejection of changed packages, source hashes and licence evidence. No UI or packaged assets changed in this review, so the existing build-bound browser receipt remains applicable. Consult `candidate-qualification.json` for regenerated gate results.
