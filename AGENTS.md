# AGENTS.md

## Project Overview

This is a geospatial analytics project focused on Toronto street centerline data.

## Coding Guidelines

- Use GeoPandas for all geometry operations
- Use Polars for tabular analysis and performance
- Avoid using Pandas unless necessary for compatibility
- Keep functions modular and reusable
- Use type hints where possible

## Data Rules

- Geometry must always remain in GeoPandas
- CRS should be metric (EPSG:26917 or UTM equivalent)
- Address ranges must be validated before use
- Intersection IDs define graph connectivity

## Key Modules

- cleaning.py → data cleanup and validation
- network.py → graph creation
- geocoder.py → address interpolation
- walkability.py → scoring metrics

## Expected Outputs

- Cleaned GeoDataFrame
- Feature-engineered dataset
- Graph-ready edge list
- QA reports

## Style

- Clear variable names
- No hardcoding file paths
- Use functions instead of scripts