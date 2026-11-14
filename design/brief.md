# ASTER Toronto design brief

The built-in image tool generated `concept.png` before implementation. It was a design reference, not a dataset. The brief requested a complete 1536×1024 desktop workspace: white header and left layer rail, pale blue-gray Toronto map, teal boundaries/station points, a right ASTRA evidence inspector, and a bottom source ledger. Controls and copy were to remain code-native. No invented statistics or 3D towers were allowed.

Type: DM Sans with system fallbacks. Tokens: white surface, `#10253e` ink, `#64748b` muted text, `#dce4e9` borders, `#0a8992` analytical teal, `#eb592b` active accent. Structure: 72px desktop header; 238–265px layer rail; 300–360px inspector; flexible map canvas. Components: layer toggle, map search, evidence tab, source row, status tag, metric pair, station row, provenance detail, primary and secondary actions.

The user subsequently requested 3D. That changes the map surface and adds a 2D/3D switch, independently sourced 2025 building massing, a source-height popup and camera controls. Real source data takes precedence over illustrated map shapes and mockup copy. See `docs/verification.md` for the fidelity and copy-diff ledger.

Generated-image method: built-in imagegen; no CLI fallback. Concept image retained only in this design directory. Production map and building geometry are programmatic renderings of actual external geospatial sources.
