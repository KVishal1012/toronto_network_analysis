# ASTER editions

Decision: October 26, 2026. One project with two explicit editions. The private edition stays local on the owner's Mac. This is a product/build separation, not a new public deployment or hosted authentication system.

| | ASTER Public | ASTER Lab |
|---|---|---|
| Purpose | Free public understanding of neighbourhood planning and transportation evidence | Owner's ambitious urban intelligence and digital twin research |
| Audience | Anyone, without an account | Owner, on this Mac |
| Default experience | Planning explorer | Research workspace |
| Current capabilities | Qualified address search, planning records, TTC stop proximity and hourly schedules, source evidence, coverage, exports and pinned snapshots | Existing local world state, replay, scenarios, terrain, illustrative buildings and optional credentialed 3D |
| Data | Only qualified redistributable records and explicit coverage limitations | Local source archives, local databases, experiments and separately permitted inputs |
| Model claims | No invented status, construction or predictions | Experimental results remain labelled and measured; private does not mean validated |
| Distribution | Static public build plus a dedicated allowlisted release repository | Local files and loopback-bound API; never upload the whole workspace |
| Cost promise | Free access for users; hosting and data delivery still have operating limits | Local compute; optional external services may incur costs |

## Run the editions

Public local preview:

```sh
npm run build:public
npm run preview:public
```

Open http://127.0.0.1:5175/. The public entry imports only the planning explorer. Adding `?workspace=research` cannot open the private app in this build. Every public build runs a module/file boundary check. The current public preview contains the expanded GTA snapshot; it has not been published by this change.

Private local workspace:

```sh
npm run start:private
```

Open http://127.0.0.1:5173/. This starts the local API at 127.0.0.1:8042 and opens ASTER Lab by default. Automatic source acquisition starts paused; refresh/resume remains an explicit UI action. If the API is already running, use `npm run dev:private` instead of starting a second API. Stop with Ctrl+C.

`npm run build:private` produces ignored `dist-private/` files for local use. A static build does not replace the private API. The local application is not an authenticated hosted service; do not expose its ports or upload its output. Local-only does not mean fully offline: map tiles and explicitly enabled provider features can make external requests.

The legacy default development command and `?workspace=research` route remain available for compatibility. The public production entry is separate from that development router.

## Private ambition, sequenced

1. **Evidence workbench:** manage source qualification, compare snapshots, investigate changes, and retain analyst notes with provenance. Existing archives/replay are the starting point; a unified analyst interface is future work.
2. **Question-to-evidence assistant:** answer bounded spatial questions with cited source records and reproducible computations. Require evaluations, abstention on missing data and traceable queries before use. Not implemented here.
3. **Urban systems research:** connect buildings, terrain, planning and infrastructure where source rights and topology support it. Distinguish measured observations, model outputs and hypothetical scenarios. Current terrain and building viewers are foundations, not a complete city model.
4. **Forecasting and scenario studies:** add models only after appropriate labels, held-out evaluation, uncertainty and domain review. Flood risk, construction prediction, routing and autonomous decisions are not current capabilities.

## Graduate a feature into the free edition

A private feature becomes a public candidate only after its data redistribution terms, complete acquisition, scope, failure handling, mobile performance, accessibility and user interpretation have been checked. Remove private notes, raw archives, credentials, private APIs and experimental claims. Build the public entry, pass the public boundary check, inspect the staged release, then obtain the owner's publication decision.

Keep public releases in the existing dedicated distribution workflow. Keep ASTER Lab, this roadmap, private drafts and local archives outside that allowlist. Changes here do not establish that the workspace's Git hosting is private, and no remote visibility was changed.

## Immediate priorities

- Public: reduce startup time, qualify remaining municipal sources, resolve York/Mississauga gates and collect actual comprehension feedback.
- Lab: strengthen the evidence workbench first, then implement and evaluate bounded spatial question answering before expanding model scope.

## Private workflow implementation — October 27

The first investigation workflow is now implemented: close-up presets, camera controls and saved views; independent component overlays and evidence; snapshot-pinned 800 m application queries; IndexedDB investigations and JSON exports; and a tested nested-radius sensitivity calculation. See [workflow and limitations](private-lab-workflow.md). Natural-language querying and physical/predictive models remain future work.

## Transportation and energy — October 29, 2026

Transportation belongs in ASTER Public: start with qualified TTC stop proximity, route associations and hourly scheduled-departure counts. Preserve feed dates, source identities and the distinction between scheduled and observed service. Load the module only when requested. Cycling, other agencies and network travel times require separate qualification.

Energy features are reserved for ASTER Lab on the owner's Mac: building energy profiles, benchmarking and retrofit experiments are outside the public edition. This scope decision does not establish data access or model validity.
