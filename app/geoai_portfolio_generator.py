from __future__ import annotations

import sys
from pathlib import Path

import streamlit as st

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))

from src.portfolio_generator import PortfolioInput, generate_portfolio_plan, plan_to_markdown


st.set_page_config(
    page_title="GeoAI Portfolio Generator",
    layout="wide",
)


st.markdown(
    """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    :root {
        --paper: #f6f1e8;
        --ink: #17211f;
        --accent: #0f766e;
        --accent-soft: #d5efe8;
        --sand: #ead9be;
        --card: rgba(255, 252, 246, 0.88);
    }

    .stApp {
        background:
            radial-gradient(circle at top left, rgba(15, 118, 110, 0.18), transparent 32%),
            radial-gradient(circle at bottom right, rgba(175, 99, 49, 0.18), transparent 28%),
            linear-gradient(135deg, #f5efdf 0%, #f7f4ee 40%, #e8efe9 100%);
        color: var(--ink);
    }

    html, body, [class*="css"] {
        font-family: "Space Grotesk", sans-serif;
    }

    .mono {
        font-family: "IBM Plex Mono", monospace;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: #3b4b49;
    }

    .hero {
        background: linear-gradient(135deg, rgba(255, 252, 246, 0.92), rgba(224, 242, 236, 0.88));
        border: 1px solid rgba(23, 33, 31, 0.08);
        border-radius: 24px;
        padding: 1.6rem;
        box-shadow: 0 16px 40px rgba(23, 33, 31, 0.08);
        margin-bottom: 1rem;
    }

    .hero h1 {
        margin-bottom: 0.35rem;
        color: var(--ink);
    }

    .hero p {
        font-size: 1.02rem;
        max-width: 52rem;
    }

    .pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .pill {
        padding: 0.45rem 0.8rem;
        background: rgba(15, 118, 110, 0.11);
        border: 1px solid rgba(15, 118, 110, 0.18);
        border-radius: 999px;
        font-size: 0.92rem;
    }

    .section-card {
        background: var(--card);
        border: 1px solid rgba(23, 33, 31, 0.08);
        border-radius: 20px;
        padding: 1.1rem 1.2rem;
        box-shadow: 0 10px 30px rgba(23, 33, 31, 0.05);
        height: 100%;
    }

    .section-card h3 {
        margin-top: 0.1rem;
        margin-bottom: 0.7rem;
    }

    .stack {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 0.65rem;
    }

    .stack-item {
        background: #fffaf1;
        border: 1px solid rgba(23, 33, 31, 0.09);
        border-radius: 16px;
        padding: 0.85rem;
        min-height: 72px;
    }

    .stTextInput label, .stTextArea label {
        font-weight: 600;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    """
    <div class="hero">
        <div class="mono">Creator productivity tool for geospatial builders</div>
        <h1>GeoAI Portfolio Generator</h1>
        <p>
            Turn a rough GeoAI or GIS idea into a portfolio-ready project plan with structure,
            workflow, dataset leads, visual directions, a GitHub README outline, and post ideas.
        </p>
        <div class="pill-row">
            <div class="pill">Low data burden</div>
            <div class="pill">High usefulness</div>
            <div class="pill">Built for creators</div>
            <div class="pill">GeoAI / GIS focused</div>
        </div>
    </div>
    """,
    unsafe_allow_html=True,
)

with st.sidebar:
    st.markdown("### Project Brief")
    project_idea = st.text_input(
        "Project idea",
        value="Neighborhood heat resilience explorer",
        help="Name the concept the way you would pitch it on GitHub or LinkedIn.",
    )
    city = st.text_input("City", value="Toronto")
    data_source = st.text_input(
        "Primary data source",
        value="Toronto Open Data + Sentinel-2 imagery",
    )
    objective = st.text_area(
        "Objective",
        value="Find neighborhoods where heat exposure and low tree canopy overlap so interventions can be prioritized.",
        height=130,
    )
    generate = st.button("Generate Portfolio Blueprint", type="primary", use_container_width=True)

default_prompt = PortfolioInput(
    project_idea=project_idea,
    city=city,
    data_source=data_source,
    objective=objective,
)

if generate or all([project_idea, city, data_source, objective]):
    plan = generate_portfolio_plan(default_prompt)
    markdown_export = plan_to_markdown(plan, default_prompt)

    st.markdown(f"## {plan.title}")
    st.write(plan.summary)

    st.markdown("### Recommended Build Stack")
    st.markdown(
        "<div class='stack'>"
        + "".join(f"<div class='stack-item'><strong>{item}</strong></div>" for item in plan.build_stack)
        + "</div>",
        unsafe_allow_html=True,
    )

    row_one = st.columns(2)
    row_two = st.columns(2)
    row_three = st.columns(2)

    sections = [
        ("Target audience", plan.audiences),
        ("Project structure", plan.project_structure),
        ("Workflow", plan.workflow),
        ("Dataset ideas", plan.dataset_ideas),
        ("Visual directions", plan.visuals),
    ]
    columns = [row_one[0], row_one[1], row_two[0], row_two[1], row_three[0]]

    for (title, items), column in zip(sections, columns):
        with column:
            st.markdown(f"<div class='section-card'><h3>{title}</h3>", unsafe_allow_html=True)
            for item in items:
                st.markdown(f"- {item}")
            st.markdown("</div>", unsafe_allow_html=True)

    with row_three[1]:
        st.markdown("<div class='section-card'><h3>Creator packaging</h3>", unsafe_allow_html=True)
        st.markdown("**GitHub README outline**")
        for item in plan.readme_outline:
            st.markdown(f"- {item}")
        st.markdown("**Post ideas**")
        for item in plan.post_ideas:
            st.markdown(f"- {item}")
        st.markdown("</div>", unsafe_allow_html=True)

    st.markdown("### Markdown Export")
    st.download_button(
        label="Download blueprint as Markdown",
        data=markdown_export,
        file_name="geoai_portfolio_blueprint.md",
        mime="text/markdown",
    )
    st.code(markdown_export, language="markdown")
else:
    st.info("Fill in the brief to generate a portfolio blueprint.")
