# Private Lab investigation workflow

Implemented October 27, 2026. Local private edition only; no deployment or publishing.

## Use

Open `http://127.0.0.1:5173/`, select **Photorealistic 3D**, then **Load Google 3D**. Google usage is charged under the configured account. The independent evidence tools also work without loading Google.

1. Choose CN Tower/waterfront, City Hall or Distillery District. These are explicit preset camera positions and investigation anchors, not geocoding results. Reset returns to the initial preset; zoom/rotate/look-down controls move the camera. Name and save a viewpoint to browser local storage.
2. Load source buildings in the small bounding box around the investigation anchor. The component list is the keyboard-accessible alternative to selecting blue overlay features. A selected component sets the query anchor to its first source footprint vertex. This is neither a centroid nor a geocoded street address. Footprints are draped for visual context; alignment, height and identity correspondence to Google's mesh are not verified.
3. Inspect original component fields, original-record mappings, repair evidence, verification receipt and explicit missing information. The existing independent source package supplies these records; Google tiles are not analysed or extracted.
4. Run **Applications within 800 m**. The existing worker computes source-feature intersection with a projected radius in EPSG:26917 against a pinned snapshot. Nearby applications are proximity candidates only. No building/application match, distinct-project total or construction status is inferred. First 30 results appear; export retains the complete result set.
5. Add a name and analyst notes, then save the investigation locally. IndexedDB stores the location, evidence copies, source receipts, retrieval information, snapshot ID, optional camera and save timestamp. Reloading does not update stored evidence. Viewpoints use localStorage. Export JSON for backup; browser storage is local to this origin/profile and can be cleared. Camera reopening does not change the investigation anchor. No Google tiles, screenshots, keys or mesh data are stored in these collections.

## First evaluated calculation

Question: how do returned application-record counts change as the search radius expands from 400 to 800 to 1,600 metres?

The deterministic scenario uses the same location, source snapshot, dataset and filters. It rejects unavailable coverage, duplicate returned identities and violations of nested record membership. It reports raw counts and increments, preserving source coverage notes. These are source-record counts, not counts of buildings, unique projects or predicted development. Missing source coverage cannot establish absence.

This is study-area sensitivity, not a physical/predictive simulation. A construction, flood or mobility prediction model has not been added. Such a model still needs a specific outcome, suitable observations, validation against independent outcomes and a documented intended use.

## Validation and limitations

- Unit regressions cover camera bounds, missing/duplicate scenario records, nested-membership failures, and raw-gzip versus already decoded HTTP responses.
- Private development exposed a shared reader defect: Vite serves gzip objects with HTTP content encoding, so the browser decompresses before JavaScript sees the bytes. The worker now checks the received bytes before decompressing. Both raw static hosting and HTTP-decoded responses are tested.
- Browser workflow loaded 35 source components at the initial CN Tower anchor. Selecting the first component and comparing radii returned 269 / 712 / 1,553 records, with nested membership verified against snapshot `9c1ddedb5903af67d1d6`.
- Saving notes/evidence, reloading, exporting the unchanged snapshot reference, camera saving/restoration and live tile loading passed without JavaScript errors in desktop headless Chromium.
- Preset cameras disable collision avoidance because coarse parent tiles displaced the original camera. Users can enter geometry; Reset recovers. Heights are camera settings, not measured building heights.
- Stored evidence is an analyst collection, not an authenticated audit log. Notes are user-authored; source objects remain identifiable separately. Local storage failure is surfaced, and JSON export remains available.
- The public entry does not import Lab; its build boundary check remains required. The shared gzip decoder is a compatibility fix, not a public Lab feature.

Run: `npm run test:lab`, `npm run build:private`, `npm run build:public`, plus the planning/worker/GTA regression tests. Disable the new workflow by removing the EvidenceWorkspace from the private GoogleScene; public data snapshots remain unchanged.

Final checks: three source component identities were cross-checked against their inspection records; all retained original source-record mappings. Saved viewpoints survived page reload. The 390 px private controls had zero horizontal page overflow. The blue overlay was visually inspected on the textured CN Tower/waterfront scene. Four Lab tests, thirteen planning/worker/GTA tests, TypeScript and both edition builds passed; the public boundary check passed. Full screen-reader and physical-device GPU testing are not claimed.
