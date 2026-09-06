from __future__ import annotations

from dataclasses import dataclass
from typing import List


@dataclass(frozen=True)
class PortfolioInput:
    project_idea: str
    city: str
    data_source: str
    objective: str


@dataclass(frozen=True)
class PortfolioPlan:
    title: str
    positioning: str
    summary: str
    audiences: List[str]
    project_structure: List[str]
    workflow: List[str]
    dataset_ideas: List[str]
    visuals: List[str]
    readme_outline: List[str]
    post_ideas: List[str]
    build_stack: List[str]


def _normalized_blob(prompt: PortfolioInput) -> str:
    return " ".join(
        [
            prompt.project_idea.lower(),
            prompt.city.lower(),
            prompt.data_source.lower(),
            prompt.objective.lower(),
        ]
    )


def _focus_tags(prompt: PortfolioInput) -> List[str]:
    blob = _normalized_blob(prompt)
    tags: List[str] = []

    keyword_groups = {
        "mobility": ["mobility", "walk", "bike", "pedestrian", "transit", "commute", "access"],
        "climate": ["climate", "heat", "flood", "resilience", "tree", "storm", "emission"],
        "growth": ["development", "growth", "real estate", "zoning", "site selection", "investment"],
        "equity": ["equity", "justice", "underserved", "gap", "inclusion", "vulnerability"],
        "vision": ["imagery", "satellite", "raster", "segmentation", "detection", "remote sensing"],
        "operations": ["routing", "delivery", "response", "operations", "maintenance", "inspection"],
    }

    for tag, terms in keyword_groups.items():
        if any(term in blob for term in terms):
            tags.append(tag)

    if not tags:
        tags.append("exploration")

    return tags


def _title_case(text: str) -> str:
    return " ".join(part.capitalize() for part in text.split())


def _make_title(prompt: PortfolioInput, tags: List[str]) -> str:
    city = _title_case(prompt.city.strip()) or "Urban"
    lead = prompt.project_idea.strip() or "GeoAI Portfolio Generator"

    if "vision" in tags:
        suffix = "Remote Sensing Blueprint"
    elif "mobility" in tags:
        suffix = "Urban Mobility Blueprint"
    elif "climate" in tags:
        suffix = "Climate Intelligence Blueprint"
    elif "growth" in tags:
        suffix = "Spatial Strategy Blueprint"
    else:
        suffix = "GeoAI Portfolio Blueprint"

    return f"{lead}: {city} {suffix}"


def _audiences(tags: List[str], city: str) -> List[str]:
    audience_map = {
        "mobility": [
            f"{city} transportation planners",
            "active mobility advocates",
            "urban analytics teams",
        ],
        "climate": [
            f"{city} resilience teams",
            "environmental analysts",
            "climate risk consultants",
        ],
        "growth": [
            "site selection analysts",
            "economic development teams",
            "real estate strategy groups",
        ],
        "equity": [
            "public sector policy teams",
            "community researchers",
            "impact-focused nonprofits",
        ],
        "vision": [
            "remote sensing practitioners",
            "computer vision builders",
            "geospatial ML hiring managers",
        ],
        "operations": [
            "logistics operators",
            "field operations managers",
            "smart city teams",
        ],
        "exploration": [
            "GeoAI creators",
            "GIS analysts building a public portfolio",
            "technical storytelling audiences",
        ],
    }

    selected: List[str] = []
    for tag in tags:
        for audience in audience_map.get(tag, []):
            if audience not in selected:
                selected.append(audience)
    return selected[:4]


def _project_structure(tags: List[str]) -> List[str]:
    structure = [
        "data/raw: source exports, metadata notes, and licensing references",
        "data/processed: cleaned features, enriched joins, and model-ready tables",
        "notebooks: EDA, feature tests, and narrative experiments",
        "src/data_pipeline.py: ingestion, validation, and spatial joins",
        "src/feature_engineering.py: derived indicators and target variables",
        "src/modeling.py: scoring, ranking, or baseline ML workflows",
        "app/: interactive map, filters, and scenario controls",
        "outputs/: final maps, charts, GIFs, and social-ready assets",
        "README.md: story arc, results, visuals, and reproduction steps",
    ]

    if "vision" in tags:
        structure.insert(5, "src/raster_pipeline.py: tiling, inference, and post-processing")
    if "operations" in tags:
        structure.insert(6, "src/scenario_runner.py: route comparisons and operational what-ifs")

    return structure


def _workflow(prompt: PortfolioInput, tags: List[str]) -> List[str]:
    city = prompt.city.strip() or "the target city"
    source = prompt.data_source.strip() or "the chosen data source"
    objective = prompt.objective.strip()

    steps = [
        f"Frame the problem in one sentence: use {source} to support {objective.lower()} in {city}.",
        f"Collect a base geography for {city} and align every layer to a single projected CRS.",
        f"Audit {source} for coverage, recency, nulls, geometry issues, and licensing constraints.",
        "Define 3 to 5 measurable indicators that turn the idea into a repeatable scoring workflow.",
        "Create a baseline map first, then add comparative layers that explain why hotspots emerge.",
    ]

    if "mobility" in tags:
        steps.extend(
            [
                "Build a network-aware accessibility layer using travel time, distance, or service area logic.",
                "Rank corridors or neighborhoods by opportunity gaps and explain tradeoffs spatially.",
            ]
        )
    if "climate" in tags:
        steps.extend(
            [
                "Add exposure and vulnerability layers so the final score reflects both hazard and impact.",
                "Compare current-state and intervention scenarios to show resilience gains.",
            ]
        )
    if "vision" in tags:
        steps.extend(
            [
                "Generate training or validation samples from imagery and record label quality assumptions.",
                "Turn model output into vector summaries that are easier to explain in a portfolio piece.",
            ]
        )
    if "growth" in tags:
        steps.extend(
            [
                "Translate the analysis into a shortlist of candidate zones with explicit selection criteria.",
                "Summarize why top-ranked locations win using a decision matrix and annotated map callouts.",
            ]
        )

    return steps[:8]


def _dataset_ideas(prompt: PortfolioInput, tags: List[str]) -> List[str]:
    city = prompt.city.strip() or "the target city"
    source = prompt.data_source.strip()

    ideas = [
        f"{source}: primary dataset and the anchor of the project story",
        f"{city} open data portal layers: boundaries, zoning, permits, assets, or service requests",
        "OpenStreetMap extracts: roads, buildings, amenities, and land use context",
        "Census or demographic layers: population, income, age, and housing context",
    ]

    if "mobility" in tags:
        ideas.extend(
            [
                "GTFS feeds or transit stop layers for accessibility and service frequency analysis",
                "Crash, collision, or traffic count datasets for safety-weighted mobility scoring",
            ]
        )
    if "climate" in tags:
        ideas.extend(
            [
                "Land surface temperature, floodplain, canopy, or impervious surface layers",
                "Weather station or climate normals data for temporal context",
            ]
        )
    if "vision" in tags:
        ideas.extend(
            [
                "Sentinel-2, Landsat, NAIP, or local orthophotos for imagery-derived features",
                "Building footprints or parcel polygons for object aggregation after inference",
            ]
        )
    if "growth" in tags:
        ideas.extend(
            [
                "POI, foot traffic, permit, or business registry data for demand proxies",
                "Parcel sales, property assessment, or vacancy data for market signals",
            ]
        )
    if "operations" in tags:
        ideas.extend(
            [
                "Travel time matrices, curb rules, depot locations, or service territories",
                "Incident logs or work order histories for operational demand forecasting",
            ]
        )

    return ideas[:6]


def _visuals(prompt: PortfolioInput, tags: List[str]) -> List[str]:
    city = prompt.city.strip() or "the study area"

    visuals = [
        f"Hero map: the key opportunity or risk score across {city}",
        "Before/after or baseline/intervention comparison map",
        "Small-multiple neighborhood callouts with one sentence insight each",
        "Simple workflow diagram from raw data to final ranked output",
    ]

    if "mobility" in tags:
        visuals.append("Isochrone or network catchment map for access within 10, 15, and 30 minutes")
    if "climate" in tags:
        visuals.append("Bivariate map pairing hazard exposure with social vulnerability")
    if "vision" in tags:
        visuals.append("Image tile gallery showing source imagery, model output, and cleaned polygons")
    if "growth" in tags:
        visuals.append("Ranked shortlist dashboard with weighted criteria bars for top candidate sites")

    return visuals[:5]


def _readme_outline(prompt: PortfolioInput) -> List[str]:
    return [
        f"Project title and one-line hook tied to {prompt.city.strip() or 'the city'}",
        "Why this problem matters and who benefits from the analysis",
        "Data sources, licenses, and what each layer contributes",
        "Method overview with a short pipeline diagram",
        "Key maps, rankings, and what the results show",
        "Limitations, assumptions, and what a version 2 would add",
        "How to run the project locally",
        "Links to portfolio post, notebook, and interactive demo",
    ]


def _post_ideas(prompt: PortfolioInput, tags: List[str]) -> List[str]:
    city = prompt.city.strip() or "this city"
    idea = prompt.project_idea.strip()

    posts = [
        f"Build in public: how I turned '{idea}' into a GeoAI portfolio project for {city}",
        f"Data breakdown: the best open datasets I found for mapping {city}",
        "Workflow post: from messy geospatial layers to a clean ranking system",
        "Carousel thread: 5 map design choices that made the story clearer",
    ]

    if "vision" in tags:
        posts.append("Behind the scenes: where computer vision helped and where manual QA still mattered")
    elif "mobility" in tags:
        posts.append("What accessibility maps miss until you add network logic and neighborhood context")
    elif "climate" in tags:
        posts.append("How to make climate risk maps feel actionable instead of purely descriptive")
    else:
        posts.append("How I package geospatial side projects so they work as portfolio assets, not just notebooks")

    return posts[:5]


def _build_stack(prompt: PortfolioInput, tags: List[str]) -> List[str]:
    source = prompt.data_source.lower()
    stack = [
        "Python",
        "GeoPandas",
        "Shapely",
        "Folium or Kepler.gl for interactive maps",
        "Streamlit for the project showcase app",
    ]

    if "vision" in tags or "satellite" in source or "imagery" in source:
        stack.extend(["Rasterio", "Xarray", "PyTorch or segmentation models"])
    if "mobility" in tags:
        stack.extend(["OSMnx", "NetworkX", "GTFS utilities"])
    if "climate" in tags:
        stack.extend(["Raster analytics", "scenario scoring tables"])
    if "growth" in tags:
        stack.extend(["Polars", "multi-criteria ranking"])

    deduped: List[str] = []
    for tool in stack:
        if tool not in deduped:
            deduped.append(tool)
    return deduped


def generate_portfolio_plan(prompt: PortfolioInput) -> PortfolioPlan:
    tags = _focus_tags(prompt)
    title = _make_title(prompt, tags)
    city = prompt.city.strip() or "the target city"

    positioning = (
        "A creator-first GeoAI builder that converts a rough spatial project idea into a publishable "
        "portfolio blueprint with technical depth and content angles."
    )
    summary = (
        f"This concept uses {prompt.data_source.strip()} to tackle '{prompt.objective.strip()}' in {city}, "
        f"then packages the work as a project that is useful for analysts, legible to non-technical viewers, "
        "and easy to turn into GitHub and social content."
    )

    return PortfolioPlan(
        title=title,
        positioning=positioning,
        summary=summary,
        audiences=_audiences(tags, city),
        project_structure=_project_structure(tags),
        workflow=_workflow(prompt, tags),
        dataset_ideas=_dataset_ideas(prompt, tags),
        visuals=_visuals(prompt, tags),
        readme_outline=_readme_outline(prompt),
        post_ideas=_post_ideas(prompt, tags),
        build_stack=_build_stack(prompt, tags),
    )


def plan_to_markdown(plan: PortfolioPlan, prompt: PortfolioInput) -> str:
    sections = [
        f"# {plan.title}",
        "",
        "## Positioning",
        plan.positioning,
        "",
        "## Prompt",
        f"- Project idea: {prompt.project_idea}",
        f"- City: {prompt.city}",
        f"- Data source: {prompt.data_source}",
        f"- Objective: {prompt.objective}",
        "",
        "## Summary",
        plan.summary,
        "",
        "## Recommended Build Stack",
    ]

    sections.extend(f"- {item}" for item in plan.build_stack)
    sections.extend(["", "## Target Audiences"])
    sections.extend(f"- {item}" for item in plan.audiences)
    sections.extend(["", "## Project Structure"])
    sections.extend(f"- {item}" for item in plan.project_structure)
    sections.extend(["", "## Workflow"])
    sections.extend(f"- {item}" for item in plan.workflow)
    sections.extend(["", "## Dataset Ideas"])
    sections.extend(f"- {item}" for item in plan.dataset_ideas)
    sections.extend(["", "## Visual Ideas"])
    sections.extend(f"- {item}" for item in plan.visuals)
    sections.extend(["", "## GitHub README Outline"])
    sections.extend(f"- {item}" for item in plan.readme_outline)
    sections.extend(["", "## Post Ideas"])
    sections.extend(f"- {item}" for item in plan.post_ideas)

    return "\n".join(sections)
