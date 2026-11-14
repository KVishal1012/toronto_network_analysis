# ASTER — Greater Toronto Area planning scope

Owner decision, October 23, 2026: the product is for the **whole GTA**. This replaces the earlier Toronto-only launch scope and GTA-after-award sequencing. Toronto is the first integrated jurisdiction, not the final coverage boundary.

This document changes the product scope. It does not claim that the published Toronto application already contains planning records for the rest of the GTA.

## Geographic contract

Include Toronto and every lower-tier municipality in Durham, Halton, Peel and York: **25 municipalities**. Hamilton is outside this GTA contract and can be added later as a separate GTHA extension. First Nation/reserve territories must not be assigned municipal planning authority merely because they lie within the regional extent.

| Area | Municipalities |
|---|---|
| Toronto | Toronto |
| Durham | Ajax, Brock, Clarington, Oshawa, Pickering, Scugog, Uxbridge, Whitby |
| Halton | Burlington, Halton Hills, Milton, Oakville |
| Peel | Brampton, Caledon, Mississauga |
| York | Aurora, East Gwillimbury, Georgina, King, Markham, Newmarket, Richmond Hill, Vaughan, Whitchurch-Stouffville |

Scope basis: [Ontario Creates GTA map](https://www.ontariocreates.ca/uploads/gta_map.pdf). Municipality inventory independently checked against [Ontario's lower/single-tier boundary service](https://geohub.lio.gov.on.ca/datasets/municipal-boundary-lower-and-single-tier): 39 source rows represent 25 distinct municipalities, because mainland, islands and water can be separate records. The source count was reconciled with a separate count query. The complete receipt and source identifiers are in `scripts/gta_scope.json`. Only attributes were retrieved for this inventory; boundary geometry is not yet qualified.

## Resident experience

- Start with a GTA overview and municipality selector, with all 25 municipalities available in the coverage directory.
- Keep address matches municipality-scoped. Identical street names in different municipalities must never be merged or silently selected.
- Offer the same guided location, radius, map/list, evidence and export workflow wherever the corresponding layer is qualified.
- Search areas crossing municipal borders must query every intersecting qualified coverage area. Report uncovered portions explicitly; a municipal border must not clip a radius result silently.
- Display availability separately for applications, project pipelines, zoning, addresses and building context. Boundary coverage is not planning-record coverage.
- If a layer has not been integrated, show that reason and the verified official planning link. Do not show a numeric zero that implies no development exists.
- Show original municipal and regional statuses, their publisher and scope. Regional review status must not become a municipal approval, construction-start or completion claim.

## Data contracts

Replace source lookup by feature kind alone with source-scoped identity: `jurisdiction_id`, `source_key`, `source_record_id`, `record_kind`, `source_scope`, `original_status`, `geometry_provenance` and snapshot receipt. Retain original attributes, dates and exclusions. Never deduplicate different publishers' applications by proximity or address alone.

Each jurisdiction/layer has its own acquisition adapter, validated schema, rights evidence, geometry coverage and last-success timestamp. A regional snapshot manifest pins the exact per-source snapshots used in a query. Failed sources retain their last qualified data with a delayed notice; historical links never substitute newer evidence.

Preserve EPSG:4326 display and EPSG:26917 metric calculations for this extent. Keep original selection geometry separate from simplified display geometry. Geographic identifiers come from the official inventory; source-specific record identifiers remain publisher-scoped.

## Source qualification started

| Source | Verified evidence | Remaining gate |
|---|---|---|
| Toronto planning layers | Existing published, validated snapshot pipeline | Preserve behavior and historical links during provider refactor |
| Ontario municipal boundaries | Official item `64fb702e16204c3e88b528d9759f1174`; public; Open Government Licence – Ontario in item metadata; source EPSG:4269; 39 matching rows / 25 municipalities | Acquire full geometry; validate multipart records, source IDs and territory gaps before deriving map boundaries |
| York active development application boundaries | Official item `2ea061702aaa4d5fae39c1226525fd4e`; publisher YorkMunicipalGovt; source EPSG:26917; polygon schema inspected; official York page links the feed | Read and archive the referenced York licence; verify complete pagination, conflicting legacy/new status fields, duplicates and usable geometry |
| Mississauga planning | [Official planning-data page](https://www.mississauga.ca/our-organization/data-and-maps/city-planning-data/) and [open-data portal](https://data.mississauga.ca/) located | Resolve exact production export, dates, licence and schema; the portal warns that some dataset update dates are incorrect |
| Brampton planning | [Official planning page](https://www.brampton.ca/EN/Business/Planning-Development/Pages/welcome.aspx) and [GeoHub](https://geohub.brampton.ca/pages/data) located | Qualify the production dataset; a discoverable `mapsdev` service is not accepted as the production contract |
| Halton municipalities | [Halton planning page](https://www.halton.ca/the-region/supporting-land-use-planning/planning-applications/development-application-review) identifies local municipal planning routes | Audit Burlington, Halton Hills, Milton and Oakville individually |
| Durham municipalities | [Durham planning page](https://www.durham.ca/doing-business/planning-and-development/) identifies local application routes; [Envision Durham](https://www.durham.ca/doing-business/planning-and-development/envision-durham/) describes the change in regional planning responsibilities | Audit all eight local municipalities; do not assume regional records establish complete local application coverage |

York's feed is explicitly a **regional review** source. See its [official explanation](https://www.york.ca/newsroom/campaigns-projects/track-status-development-applications). This is useful evidence but does not replace the nine municipalities' planning systems.

## Implementation sequence

1. Qualify the boundary geometry and create a coverage matrix for all 25 municipalities and every layer.
2. Refactor the provider, evidence exporter and snapshot manifest for multiple jurisdictions; preserve existing Toronto links and tests.
3. Add independently qualified application adapters. Start with York's identified regional feed and the larger municipal feeds; continue the same audit across all 25 rather than treating remaining municipalities as out of scope.
4. Add municipality-scoped address search, zoning and illustrative buildings only where their source contracts pass.
5. Validate cross-border searches, duplicate names, different publisher statuses, partial coverage, source outages and history. Reassess static hosting/storage before expanding citywide geometry.
6. Publish with a precise coverage matrix. Describe a layer as GTA-wide only after every in-scope municipality is covered by a qualified source or its explicit source limitation is disclosed. The award draft reports implemented coverage, not target scope.

The earlier November 27 target is provisional under this larger scope. No unsupported GTA-wide planning completeness or award-readiness claim is authorized by changing the scope.
