# Candidate browser checks — 3 November 2026

Build: `2fdead66e3fd6ef03e3c7caa2237ac25213b52fe4847382d1ece259af36f3045`.

The final desktop startup at 1440×1000 requested HTML, CSS, entry JS, latest/manifest metadata and the Downtown index. The localhost request log at 18:37:37–18:37:44 showed no map bundle, geometry tiles, street geometry or site evidence shards. No site was selected automatically. Search for `483 Bay` returned one result. Enter selected it and displayed five candidate records. The project evidence disclosure showed original publisher status, description, reference and dates. Baseline comparison remained disabled.

At 390×844, search worked, document width equalled viewport width (390px), map remained off, and reload restored the pinned site. No warning/error console entries were returned. This is an emulated viewport check, not a physical-device benchmark or complete accessibility audit.

The Export button produced `site-2827a0e4-1dbd-4f98-a5b9-3d11dccbb96c-evidence (1).json`. The downloaded JSON was parsed: local-review flag true, five records, adjudication-reference fields present, no personal note. Map loading began only after explicit Show map activation.

An earlier test attempt found the preview server stopped; it was restarted before these checks. The source was also corrected so desktop does not open the map automatically and the skip-to-evidence link does not overwrite snapshot parameters.
