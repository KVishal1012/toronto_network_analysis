# Downtown Toronto Neighbourhood Studio

Local scenario editor with a 320 × 320 metre reference centred on City Hall (-79.38395, 43.65343). Run `npm run build:sandbox` and serve `dist-sandbox`, then open `/sandbox.html`.

The fictional starter has been removed. `scripts/build_downtown_studio.py` reads the local City 2025 massing store and archived street context. Coordinates are transformed from EPSG:4326 to EPSG:26917, clipped to the study boundary, and expressed relative to the study origin. 58 source massing features and 12 street segments are included. Heights use source AVG_HEIGHT without invented fallback heights. Geometry may be clipped at the edge. Terrain and photorealistic roofs are not reconstructed; this is dated illustrative context, not current surveyed conditions.

Existing reference buildings are read-only and clickable for their source ID, height and height method. User-created objects remain proposed edits. Grid plots intersecting reference building footprints are rejected. Open space is not a claim of development rights or suitability; roads, public space and planning constraints still need assessment.

Scenario schema 2 pins the Downtown baseline ID. Schema 1 fictional files are rejected rather than silently relocated. Browser storage uses a new key, preserving old saved work. No fictional roads or buildings are relabelled as Toronto. Vehicle animation only operates on user-created road tiles and is not a model of actual Toronto traffic.

Source metadata, vintage, retrieval dates, hashes and limitations are stored in `src/sandbox/downtown.json`. This local review includes massing whose public redistribution qualification is separate from the screening package. No public deployment is authorized or performed.

Tests: `node --experimental-strip-types --test tests/sandbox.test.mjs`. Build: `npm run build:sandbox`.
