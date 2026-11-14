# Downtown & Midtown integrated candidate

Implemented on November 13, 2026. This is a local release candidate. Publication and competition submission remain separate owner decisions.

## Data

- Fresh complete Pipeline, Applications, Address Points, Neighbourhoods and Centreline exports were acquired in `data/submission-refresh/planning-2026-11-13`. All five matched a second full read. The inactive planning candidate is `8269765c8521a43294ae`; the older general explorer pointer was preserved.
- TTC was downloaded twice in `data/transport-source/20261113T225930149203Z`. The feed bytes match the earlier qualified timetable; the refresh does not invent a new source observation. The new analysis uses explicit November 13/14 service dates and refreshed planning inputs.
- Screening `6ed092c988ad9326e279` accounts for 2,391 records; 368 included groups across Downtown/Midtown. Regions overlap; regional totals cannot be summed. Unknown and outside-area cases remain accounted for.
- The fresh complete neighbourhood export matches the boundary baseline byte-for-byte. The boundary review publishes constituent names and the retained version.
- The City Hall 3D reference contains 58 source massing features and 12 refreshed street segments. Coordinates are projected to EPSG:26917; heights use AVG_HEIGHT; terrain stays flat. Its content-derived baseline includes geometry, source hashes, heights and extent.
- Rights review covers actual screening derivatives and bounded massing. City metadata specifies informational/illustrative use and verification for legal/official use. The interface and exports retain this notice. Source archive hash and resource URL were verified. No parcel ownership, raw contact fields, copied PDFs or private Lab assets ship.

## Product

The public entry lazily opens Explore or Downtown 3D. The map and Three.js chunks load only when requested. Region options and demonstrations are Downtown/Midtown only; an old North York link produces an explanation instead of changing its meaning. Previously qualified two-region-compatible analysis links retain their assets.

Explore has optional investigation screening, a searchable area/address-label list, an on-demand 2D cell-marker map and two selected areas across regions. Each comparison preserves its own membership and source evidence. Source geometry does not establish proposal/building identity.

The 3D editor provides one hypothetical-volume tool with metric position, width, depth, height and arbitrary-degree rotation. Full rotated footprints are checked against massing (including polygon holes), each other and the study edge. Existing massing stays read-only. Metric model schema 3 rejects unsupported older files without relocating them; old storage keys remain intact. New saves have a separate key. There is no activity simulation.

A captured 3D view and scenario are attached to the brief through browser-session storage. Printable/JSON briefs include hypothetical labels and dimensions, sources, source dates, assumptions and analysis pins. The portable scenario file reproduces edits; the ordinary link does not include them. A schematic location map is included in the brief; it is explicitly not a street/walking map.

## Verification and remaining gates

- Twelve independent computational checks (six per region) reconcile structured housing quantities and source GTFS stop distances. These are developer checks, not participant evidence.
- Model tests cover holes, edges, rotated collisions, boundaries, incompatible baseline versions, invalid input and save serialization.
- Recruitment pack now includes 3D interpretation, scenario editing/restoration and combined brief production. Nothing was sent. Five genuine sessions are still required for the planned usability claim.
- Full assistive-technology review and native print/PDF output inspection remain outstanding unless documented in the build-specific browser receipt. No developer or AI review substitutes for participants.

## Reproduce

1. `npx tsc -b`
2. `.venv/bin/python -m unittest tests.test_screening tests.test_transport tests.test_submission_package`
3. `node --experimental-strip-types --test tests/screening.test.mjs tests/transport.test.mjs tests/sandbox.test.mjs`
4. `npm run build:public`
5. `.venv/bin/python scripts/qualify_screening.py`
6. Serve `dist-public` on localhost and open `/`. Use `#view=3d` for the integrated studio.

Source qualification is pinned in `package-rights-contract.json`; new data requires a fresh review. Rebuilding scenarios never updates source observations. Future regional expansion requires new coverage, rights, analytical cases and interface checks.

## Architectural viewer revision

The public 3D entry now displays read-only geometric Toronto, following the user choice of source footprints/heights with an architectural appearance. It provides two 600-metre local views, City Hall (307 massing features) and Yonge–Eglinton (516), with 2025 source heights, recorded-street references, orbit/pan/zoom, reset and keyboard-accessible source inspection/highlighting. These are bounded views, not complete 3D coverage of Downtown/Midtown. No sandbox controls or hypothetical attachments appear in the public workflow. The earlier scenario editor remains local source code. Both derived views use the already-reviewed massing archive and Centreline data; their bytes and coverage IDs are separately pinned in the rights contract. Tests verify all 823 displayed heights/methods against the source store and bounded valid geometry.

## Single-feature replacement scenario

The architectural viewer now supports a hypothetical replacement of one selected source massing feature. The recorded source is preserved; scenario rendering hides only the selected source mesh and displays a proposed rectangular envelope. Controls set metric position, footprint dimensions, height and rotation. Full rotated footprints are checked against the remaining massing and study bounds. Calculated consequences are height, footprint area and approximate extrusion volume; polygon holes are included in source area. Roads, parcel permissions and structural feasibility are not evaluated. Source-feature identity is not a verified whole-building identity.

Local saves pin the view content ID and removed source feature. Restore-original and reference/proposal toggles are available. The comparison export contains provenance, geometry effects and explicit unmodelled categories. Sunlight/shadow duration, wind, energy/emissions, traffic/transit demand, costs and feasibility remain unevaluated and have no numeric predictions. Rendered shadows are illustrative lighting. These additional models require appropriate inputs and validation; the requested full physical simulation is incomplete.
