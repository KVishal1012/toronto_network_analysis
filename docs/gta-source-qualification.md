# GTA source qualification — local expansion

Checked 2026-10-24–25. All 25 municipalities have layer-level outcomes. **Candidate is unfinished qualification, not integrated coverage.** Searches were bounded; no suitable source found does not prove that none exists. Sources pass independently.

| Region | Municipality | Applications | Regional reviews | Addresses |
|---|---|---|---|---|
| Durham | Ajax | candidate | no_suitable_source_found | candidate |
| Durham | Brock | candidate | no_suitable_source_found | candidate |
| Durham | Clarington | candidate | no_suitable_source_found | candidate |
| Durham | Oshawa | candidate | no_suitable_source_found | qualified |
| Durham | Pickering | candidate | no_suitable_source_found | qualified |
| Durham | Scugog | candidate | no_suitable_source_found | candidate |
| Durham | Uxbridge | candidate | no_suitable_source_found | candidate |
| Durham | Whitby | candidate | no_suitable_source_found | blocked_rights |
| Halton | Burlington | candidate | no_suitable_source_found | candidate |
| Halton | Halton Hills | candidate | no_suitable_source_found | candidate |
| Halton | Milton | qualified | no_suitable_source_found | qualified |
| Halton | Oakville | candidate | no_suitable_source_found | candidate |
| Peel | Brampton | qualified | no_suitable_source_found | qualified |
| Peel | Caledon | candidate | no_suitable_source_found | candidate |
| Peel | Mississauga | blocked_rights | no_suitable_source_found | candidate |
| Toronto | Toronto | integrated | no_suitable_source_found | integrated |
| York | Aurora | candidate | blocked_technical | qualified |
| York | East Gwillimbury | candidate | blocked_technical | qualified |
| York | Georgina | candidate | blocked_technical | qualified |
| York | King | candidate | blocked_technical | qualified |
| York | Markham | candidate | blocked_technical | qualified |
| York | Newmarket | candidate | blocked_technical | qualified |
| York | Richmond Hill | candidate | blocked_technical | qualified |
| York | Vaughan | candidate | blocked_technical | qualified |
| York | Whitchurch-Stouffville | candidate | blocked_technical | qualified |

Detailed reasons, official links and metadata checksums: [qualification matrix](gta-qualification-matrix.json). Complete acquisition receipts remain in `data/gta-source/<source>.json`; SHA-addressed raw responses are retained locally. The published-preview manifest carries per-source receipt references and exclusions.

## Outstanding gates

- York regional reviews: 5,470 inventory entries, 5,469 unique ESRI_OID values. The duplicate value changes between requests (5414 in the earlier audit, 2965 and 5436 on October 25). A two-pass ordered attribute export recovered 5,470 distinct OBJECTID values with identical non-ESRI attributes, identifying a possible acquisition path, but complete geometry export under an alternate-key contract is not implemented or qualified. 244 records disagree between APPL_STATUS and Application_Status__c. Precedence remains undocumented. Licence permission passed independently.
- Mississauga planning: item-specific restrictions remain unresolved; no acquisition or redistribution. Address terms are different and require downstream agreement; no address integration yet.
- Other candidates: municipal route/item discovery has been audited, but complete export, licence applicability and schema qualification remain unfinished. They are explicitly unavailable in the product.
- No outreach, public publication, new schedule, resident test or complete GTA coverage is claimed.

## October 25 acquisition / October 26 continuation

- Oshawa: 64,226 address features acquired twice with complete ID/count/schema reconciliation. Item-linked Open Government Licence 2.0 permits redistribution with attribution. Original fields retained; a display label is assembled from civic number, suffix and street.
- Pickering: 42,767 address features acquired twice with complete ID/count/schema reconciliation. Item-linked Open Data Licence 1.0 reviewed. Original LABEL2 and units retained. Geometry acceptance is recorded in the composed snapshot.
- Ajax, Brock and Caledon: rechecked identified items have empty licence metadata. They remain candidates pending evidence that appropriate redistribution terms apply to the exact resource. Public accessibility alone does not qualify them.
- Aurora: the previously linked item is a basemap, not an application inventory, and lists restricted classes of users. It is rejected as an application source; the separate municipal planning route remains a candidate.
- Mississauga: item restriction and address terms rechecked; PDF hash unchanged. Revised unsent draft separately asks about planning permission and downstream address agreement, automatic loading/caching, exports and history.

Raw responses and hashes: `data/gta-audit/2026-10-25/`; acquisition receipts: `data/gta-source/oshawa-address.json` and `data/gta-source/pickering-address.json`. These are dated checks, not a claim of a new full-source refresh on October 26. Other candidate municipalities still need complete export and rights qualification.
