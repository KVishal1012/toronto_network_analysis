# Product scope — Toronto Network Resilience Atlas

Status: product direction selected by the project owner on 2026-10-09. This
supersedes the one-scenario product scope. Implementation and release gates
remain open; the Viaduct is the first validation case, not the entire product.

## Purpose

An evidence-backed street-network resilience product for Toronto: **which
connections have few effective alternatives, what changes when they become
unavailable, and how trustworthy is the result?**

The Atlas serves civic researchers, GIS analysts and urban-data practitioners.
It will support reusable exploration, reviewed scenario creation, comparable
experiments and evidence exports. The initial local experiment is the
owner-approved hypothetical Prince Edward Viaduct Centreline corridor, not a
certified physical bridge closure. No public Atlas interface exists yet.

## First-release experience

1. Explore streets and a catalogue of reviewed disruption experiments.
2. Select exact source segments, preview retained connections, and save a draft.
3. Validate and explicitly approve the model scope before running; unsupported
   selections stay blocked with an explanation, not a guessed result.
4. Compare open/closed results for original and reviewed network topology.
5. Inspect newly unreachable OD pairs and additional distance separately;
   raw graph components and isolates are QA, not affected communities.
6. Compare compatible experiments and inspect example alternative model paths.
7. Inspect source snapshots, corrections, uncertainties, population and sensitivity.
8. Export results and reproducibility evidence.

The differentiator is a useful resilience question paired with inspectable
network-quality evidence. The Quality Inspector initially means evidence flags
and correction history, not a separate full editing product.

## Metrics and comparison contract

- Keep already-unreachable, newly-unreachable, longer and unchanged pairs separate.
- Show affected-pair percentage against pairs reachable in the corresponding open
  graph, with that denominator visible; also retain the entire frozen pair count.
- Report median and maximum extra distance among longer, still-reachable pairs.
  An empty group has null metrics, not fabricated zero-distance routes.
- Do not create a single resilience score in the first slice.
- Before ranking multiple corridors, define a shared benchmark population and
  common exclusions across the whole candidate set, test sample sensitivity,
  and reconcile differences in closure length/extent. Per-scenario populations
  may support separate case studies but not an automatic leaderboard.
- A small effect in a citywide sample does not prove low local dependence; use
  separately labelled local diagnostic populations when appropriate.

## Model and claims

- Use positive metric lengths, explicit road inclusion rules and direction-aware graphs for the scenario. An undirected structural analysis must be separately labelled; it is not a legal driving route.
- Preserve the baseline as a diagnostic comparison, not ground truth. Six reviewed crossings do not validate the whole city.
- Freeze a shared origin–destination population before comparing the four cases. Record exclusions, sampling seed and denominator. Never select a new largest component after closure.
- Separate raw graph isolates from meaningful accessibility outcomes. Interior vertices of a removed corridor are not isolated residents or neighbourhoods.
- Additional Toronto Open Data sources are admitted only when they answer a defined question or resolve a validation gap. Record licence, source identifier, acquisition time, vintage, checksum and join limitations.
- Report missing evidence and uncertainty explicitly. Centrality is not traffic volume, safety, travel time or causal impact.

## Out of scope for release one

Unvalidated unrestricted citywide routing; congestion or traffic forecasts;
safety rankings; pedestrian/cycling accessibility without mode-specific networks;
legal turn-by-turn navigation; TTC disruption modelling; real-time operations;
and GeoAI claims without an implemented, evaluated AI method.

## Delivery sequence and release gates

1. **Evidence foundation:** run the approved Viaduct case and export a versioned,
   reusable entry with full per-pair results and provenance. No new approval is
   inferred for another corridor. See [Atlas workflow](atlas.md).
2. **Validation cases:** inspect routes and add several differently structured,
   separately reviewed cases. Generalize the current unbranched, two-way corridor
   validator before supporting one-way, branching or arbitrary selections.
3. **Comparable benchmark:** freeze a common population for the reviewed candidate
   set and evaluate sampling and topology sensitivity before publishing rankings.
4. **Usable product:** build map exploration, scenario catalogue, bounded draft
   creation, review/validation feedback, results comparison and evidence downloads.
5. **Release:** verify fresh end-to-end runs, accessible/error/loading states,
   intended-user feedback, source freshness/licensing and methodology. Publish
   reviewed examples separately from exploratory user scenarios.

Acceptance requires a usable public product and reproducible evidence, not merely a notebook or an attractive map. Award eligibility and submission requirements must be checked separately against the current official rules.

## First validation case

See [the scoped review](scenarios/viaduct_don_crossing.md) and
[the approved model specification](../config/scenarios/viaduct_don_crossing.v1.json).
Approval is for the selected hypothetical corridor only; exact physical closure
limits, the southern access-road connection and citywide topology remain unresolved.
