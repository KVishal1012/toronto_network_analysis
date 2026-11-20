# ASTER — Open Data Sources & Provenance

This document records the official open datasets utilized by **ASTER — Toronto Housing, Transit & 3D Explorer**, along with their respective licensing and provenance details.

All source datasets are acquired from authoritative municipal and provincial portals and evaluated under the **Open Government Licence – Toronto** and **Open Government Licence – Ontario**.

---

## 1. Municipal Development & Planning Records

- **City of Toronto Development Pipeline:**
  - **Portal:** [Open Data Toronto — Development Pipeline](https://open.toronto.ca/dataset/development-pipeline/)
  - **Usage:** Identifies active development proposals, proposed residential unit counts, application categories, and target ward boundaries.
  - **Handling:** Every record from the source is accounted for. Proposals without resolved coordinates (535 records) or missing structured unit numbers (499 records) are preserved and surfaced explicitly to ensure complete transparency.

- **City of Toronto Development Applications:**
  - **Portal:** [Open Data Toronto — Development Applications](https://open.toronto.ca/dataset/development-applications/)
  - **Usage:** Provides authoritative City Application Information Centre (AIC) reference links, application submission dates, and status codes.

- **Toronto One Address Repository (OAR):**
  - **Portal:** [Open Data Toronto — Address Points - Municipal Toronto One Address Repository](https://open.toronto.ca/dataset/address-points-municipal-toronto-one-address-repository/)
  - **Usage:** Canonical municipal address database used to map application addresses to verified spatial coordinates (EPSG:26917 / WGS84).

---

## 2. Transit Schedules & Service Baseline

- **TTC Merged GTFS Transit Routes & Schedules:**
  - **Source:** [Open Data Toronto — TTC Routes and Schedules](https://open.toronto.ca/dataset/merged-gtfs-transit-schedules/)
  - **Snapshot:** Verified GTFS snapshot `S1000544`.
  - **Usage:** Evaluates scheduled departures per hour per stop across weekday morning (7–9 AM), weekday evening (4–6 PM), and Saturday midday (12–2 PM) timetables to assess frequent transit availability (`≥ 4` scheduled departures per direction per hour).

---

## 3. Spatial Boundaries & Basemaps

- **Toronto Centreline (Roads & Rail):**
  - **Portal:** [Open Data Toronto — Toronto Centreline](https://open.toronto.ca/dataset/toronto-centreline-tcl/)
  - **Usage:** Renders local street and rail centerlines for offline-safe browser navigation.

- **Toronto Neighbourhoods (158 Polygons):**
  - **Portal:** [Open Data Toronto — Neighbourhoods](https://open.toronto.ca/dataset/neighbourhoods/)
  - **Usage:** Provides social planning boundaries for community-level summaries across Toronto.

- **Community Council Boundaries (4 Areas):**
  - **Portal:** [Open Data Toronto — Community Councils](https://open.toronto.ca/dataset/community-councils/)
  - **Usage:** Groups screening results across Toronto & East York, North York, Etobicoke York, and Scarborough.

- **Green Spaces:**
  - **Portal:** [Open Data Toronto — Green Spaces](https://open.toronto.ca/dataset/green-spaces/)
  - **Usage:** Provides park and open-space context.

---

## 4. 3D Massing & Building Heights

- **City of Toronto 3D Building Massing (2025 Snapshot):**
  - **Portal:** [Open Data Toronto — 3D Massing](https://open.toronto.ca/dataset/3d-massing/)
  - **Usage:** Provides 3D building heights (`AVG_HEIGHT`) and footprints for the Downtown and Midtown 3D massing views.

---

## 5. Building Energy & Water Benchmarks

- **Ontario Energy and Water Reporting and Benchmarking (EWRB):**
  - **Portal:** [Ontario Data Catalogue — EWRB](https://data.ontario.ca/dataset/energy-and-water-reporting-and-benchmarking)
  - **Usage:** Surfaces 2024 building energy use intensity, greenhouse gas emissions, and water consumption across 35 property use cohorts (including 1,614 Multifamily housing records).

- **City of Toronto Municipal Facility Energy Consumption:**
  - **Portal:** [Open Data Toronto — Energy Consumption](https://open.toronto.ca/dataset/energy-consumption/)
  - **Usage:** Provides municipal meter baselines for public facilities.
