# ASTER — Toronto Housing, Transit & 3D Explorer

[![Live Public Application](https://img.shields.io/badge/Live%20App-kvishal1012.github.io-173a35?style=flat-square)](https://kvishal1012.github.io/toronto_network_analysis/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](LICENSE)
[![Open Data: City of Toronto](https://img.shields.io/badge/Open%20Data-City%20of%20Toronto-blue?style=flat-square)](https://open.toronto.ca/)

An open-source, zero-backend civic web application that evaluates proposed housing across Toronto against scheduled TTC transit service, provides interactive 3D massing context, and accounts for 100% of City public records.

🌐 **Live Application:** [https://kvishal1012.github.io/toronto_network_analysis/](https://kvishal1012.github.io/toronto_network_analysis/)  
Free to use, runs entirely in the browser, and requires no account or GIS software.

---

## The Civic Question

When thousands of new homes are proposed in a Toronto neighbourhood, how close are they to frequent TTC service—and what is missing from public records?

City of Toronto public records are spread across multiple portals, formats, and revision dates. Proposed homes in the Development Pipeline are often conflated with approved construction, nearby transit stops look well-served even when rush-hour or weekend frequency is thin, and hundreds of incomplete or unmapped applications quietly disappear from public summaries.

ASTER provides residents, community groups, and planners with an independent, transparent screening tool to inspect any proposal, compare transit access, and export meeting-ready community briefs.

---

## Key Features

- **City-Wide Screening (158 Neighbourhoods):** Evaluates all **2,391** City Development Pipeline records across all 4 Community Councils against scheduled TTC morning rush-hour and Saturday midday service.
- **Walkability Rings:** Compare proximity across **400 m** (5-minute walk), **800 m** (10-minute walk), and **1,600 m** thresholds.
- **No Hidden Exclusions:** Every single record is accounted for. The tool explicitly surfaces **535** unlocated proposals and **499** proposals with missing unit counts so residents can search a street and see exactly why an application is flagged.
- **Meeting-Ready Briefs:** Export a formatted **Print / Save as PDF** community summary with locator maps, proposal tables, and direct City Application Information Centre (AIC) links.
- **Interactive 3D Context (`/#view=3d`):** Inspect recorded 2025 building heights in Downtown (City Hall) and Midtown (Yonge–Eglinton) and test collision-checked geometric replacement boxes.
- **Energy & Water Benchmarks:** Compare proposed buildings against 2024 Ontario EWRB benchmarks (2,451 properties across 35 cohorts) and municipal facility meter baselines.

---

## Open Datasets Used

All data is acquired and processed under the **Open Government Licence – Toronto** and **Open Government Licence – Ontario**:

| Dataset | Publisher | Purpose |
| :--- | :--- | :--- |
| **Development Pipeline** | City of Toronto | Proposed residential units and application details |
| **Development Applications** | City of Toronto | Application dates, statuses, and AIC links |
| **Address Points (OAR)** | City of Toronto | Geocoding addresses to EPSG:26917 coordinates |
| **Merged GTFS Transit Schedules** | Toronto Transit Commission (TTC) | Stop locations, route directions, and scheduled departures |
| **Toronto Centreline & Boundaries** | City of Toronto | Street centerlines, 158 neighbourhoods, and 4 Community Councils |
| **3D Building Massing** | City of Toronto | 2025 building heights and footprints for 3D context |
| **Energy & Water Reporting (EWRB)** | Ontario Ministry of Energy | 2024 property energy use, GHG, and water intensity benchmarks |

---

## Local Development

ASTER is built with **TypeScript**, **React**, **Vite**, and **MapLibre GL**.

### Prerequisites
- Node.js 22+
- Python 3.12+ (for data packaging scripts)

### Installation & Run

```sh
# Clone the repository
git clone https://github.com/KVishal1012/toronto_network_analysis.git
cd toronto_network_analysis

# Switch to the project branch
git checkout aster-toronto-explorer

# Install dependencies
npm ci
python3 -m venv .venv
.venv/bin/pip install -r requirements.lock.txt

# Build and preview the public app
npm run build:public
npm run preview:public
```

Open [http://127.0.0.1:5175/](http://127.0.0.1:5175/) in your browser.

### Automated Tests

```sh
# Run Python unit tests
npm test

# Run spatial and export tests
npm run test:planning

# Run worker tests
npm run test:worker
```

---

## License

This project is licensed under the [MIT License](LICENSE).  
Underlying municipal datasets remain under their respective Open Government Licences.
