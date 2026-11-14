# York regional review clarification — unsent

Prepared from October 25 evidence; reviewed October 26. No outreach sent.

Subject: Development review export identity and status field precedence

We are testing a planning explorer using your Active Development Application Boundaries resource, item `2ea061702aaa4d5fae39c1226525fd4e`. We present regional reviews separately from municipal applications and do not interpret regional review as municipal approval or construction.

The service count is 5,470, but returnIdsOnly gives 5,469 distinct ESRI_OID values. Duplicate ESRI_OID values change between requests. In one response ESRI_OID 2965 refers to distinct OBJECTIDs 29039 and 29041. Two ordered attribute reads returned 5,470 distinct OBJECTIDs with matching attributes when ESRI_OID was excluded.

Is OBJECTID an appropriate unique identity for a complete snapshot export? Is there a supported export endpoint or corrected OID field that guarantees all records, including multipart/joined records? Please clarify whether OBJECTID persists across updates or is only snapshot-scoped.

Separately, 244 records have different APPL_STATUS and Application_Status__c values. Which field governs the dashboard display, and what should consumers do when one is empty or the values conflict? Please provide the field definitions and precedence rule; we will retain both original values and mark interpretation unresolved until then.

We have retained exact request URLs and response hashes and can supply examples if useful.

Draft only. Not sent. Evidence: `data/gta-audit/2026-10-25/york-key-audit.json` and `followup.json`.
