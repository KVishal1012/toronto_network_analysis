# Hypothetical Viaduct corridor closure — exact model boundary

**Status: approved by the project owner on 2026-10-08 for a local hypothetical Centreline-corridor experiment only.** The specification is enabled for the approval-gated runner; this is not approval of physical bridge-deck boundaries or a City closure plan. Prepared 2026-10-03 from the hash-pinned local Centreline snapshot. Source acquisition date and vintage remain unknown. No impact run is implied by this approval.

## Scoped model approval (2026-10-08)

The project owner accepted the narrower scenario in chat: **"i agree on that narrower scenario"**. The accepted scope is hypothetical removal of the existing ten selected Centreline segments, including their selected approach portions, between nodes 13462661 and 13462430. No source IDs, endpoints, crossing assignments, protected roads or comparison-population rules changed.

During the QGIS review, the user reported Bayview and both DVP carriageways remaining blue/open, with no direct turn to the orange corridor at those crossings. The user also questioned the approach extensions and the curved access road south of the eastern boundary. The supplied screenshots dated 2026-10-08 show Playter Gardens Trl (30096670) north of the corridor classified as Trail, excluded from the driving graph and closure; that feature does not identify the southern access road.

**Unresolved limitation:** no nearby-feature line visibly follows the southern curved access road in the supplied view. Its connection, elevation and representation remain unresolved. No connection is inferred, added or certified from the aerial image. This uncertainty is accepted for the bounded model experiment and must accompany results; investigate further before making claims about access to that property or real-world closure effects.

This is a local scope attestation, not an independent engineering review, legal-route certification, City authorization or approval to publish operational advice. The six-crossing register is still a prototype. Results must describe shortest-distance/reachability changes in a structural OD sample, not traffic, travel time, congestion or population-weighted accessibility. Historical QGIS exports may still say NOT APPROVED; those labels predate this scoped approval and are not operational closure approvals.

## Boundary

Remove only the following ten source segments, in both modelled directions: **525.249 metres, 20 directed arcs**. West endpoint **13462661**; east endpoint **13462430**. Preserve every node and every nonselected edge. Street labels are descriptive evidence, never a removal selector.

Coordinates are EPSG:26917 metres: west (631659.739, 4837036.173), east (632163.908, 4837183.282). Full coordinates, lengths and file hashes are in the [specification](../../config/scenarios/viaduct_don_crossing.v1.json).

| Order west–east | Source segment | From ID | To ID | Length m |
|---:|---:|---:|---:|---:|
| 1 | 1141214 | 13462661 | 13462592 | 166.922 |
| 2 | 30003678 | 13462592 | 30003677 | 23.718 |
| 3 | 30003679 | 30003677 | 13462572 | 16.939 |
| 4 | 1141117 | 13462572 | 13462540 | 71.725 |
| 5 | 30003617 | 13462540 | 30003616 | 57.297 |
| 6 | 30003618 | 30003616 | 13462482 | 73.893 |
| 7 | 1141008 | 13462482 | 13462475 | 16.110 |
| 8 | 1141001 | 13462475 | 13462471 | 11.343 |
| 9 | 30096652 | 13462471 | 30096651 | 41.505 |
| 10 | 30096653 | 30096651 | 13462430 | 45.796 |

All ten are valid LineStrings labelled Prince Edward Viaduct and marked Not One-Way. They form one unbranched chain of eleven source nodes, with zero adjacent endpoint coordinate gap in the local snapshot. A diagnostic geometry plot was inspected; this confirms source geometry arrangement, not real-world transfer permissions or exact physical deck limits.

The City's [Viaduct history](https://www.toronto.ca/explore-enjoy/history-art-culture/online-exhibits/web-exhibits/web-exhibits-architecture-infrastructure/bridging-the-don-the-prince-edward-viaduct/) distinguishes Don, Rosedale and Bloor sections. This candidate covers the Don-crossing model corridor, not all sections. The selected chain may include approaches: an independent boundary review is required before calling it an exact bridge-deck closure.

## Crossing connections and protected segments

At 13462592, the reviewed viaduct group is separate from Bayview. At 13462475 and 13462471 it is separate from each DVP carriageway. The register represents these as (intersection ID, road group) graph nodes; raw shared intersection IDs must not be treated as transfers.

The following incident segments remain open, including the Bloor, Danforth and Cambridge approaches and the roads below the deck:

| Source segment | Street | From ID | To ID |
|---:|---|---:|---:|
| 3841911 | Danforth Ave | 13462430 | 13462393 |
| 1141139 | Bayview Ave | 13462592 | 13462245 |
| 30096668 | Cambridge Ave | 13462430 | 30096667 |
| 1141437 | DVP | 13462862 | 13462471 |
| 30057486 | Bayview Ave | 30057484 | 13462592 |
| 11462316 | Bloor St E | 13462709 | 13462661 |
| 60024037 | DVP | 30003563 | 13462475 |
| 60024103 | DVP | 13462475 | 13461517 |
| 60024132 | DVP | 13462471 | 13461194 |

The reviewed corridor has bidirectional continuity and each internal deck node has exactly two unique neighbours. A scratch-copy removal check removed exactly 20 arcs, preserved all nodes, and left every nonselected keyed edge and its attributes unchanged. No repository graph or source data was changed. These are local prototype checks, not citywide route certification.

## Important counting rule

Removing this full corridor isolates **nine internal deck vertices** in the reviewed graph. Do not present these as nine isolated communities or destinations. Keep them in raw graph QA, but exclude closure-interior vertices consistently from the fixed shared origin–destination population. Also exclude replaced crossing IDs when comparing shared original nodes. Report all exclusions and freeze the population before running any case.

Compare baseline/open, baseline/closed, reviewed/open and reviewed/closed. The baseline may retain false cross-level connections and is diagnostic only. Never truncate the closed graph to its new largest component. Report newly unreachable pairs separately from extra length among pairs reachable in both conditions; disclose already-unreachable pairs. Longer model paths are not travel-time or congestion estimates.

## Remaining validation and release limits

- Independent physical-boundary evidence is still required before calling this an exact bridge-deck or operational closure. The current approval accepts the selected approaches only as hypothetical model limits.
- Broader grade-separated connections and turn permissions remain unvalidated; the six-entry register is not a complete citywide routing model.
- Record original data acquisition metadata and licence attribution before public release. Fail closed if the snapshot, expected IDs, endpoints, lengths or crossing-register hash differ; re-review a new source version.
- Use the approval-gated runner and exact frozen population; see [engine notes](../scenario_engine.md). Source verification and tests do not remove the limitations of this scoped approval.

The City's [Bridge Structures layer metadata](https://gis.toronto.ca/arcgis/rest/services/cot_geospatial24/FeatureServer/3) describes point features. It may help corroborate asset identity, but does not establish deck boundaries or road-level connectivity. No bridge-asset record was successfully retrieved or joined for this review.
