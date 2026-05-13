# Galaxy Rotation Curve Pipeline — Supplementary Code

Python pipeline that reproduces the figures and statistics in
*Galaxy Rotation Curves Without Dark Matter: The Displacement Framework Applied to 177 Galaxies*
(Buckeyne 2026, Zenodo DOI 10.5281/zenodo.20131281).

## Files

- **`parse_presets.py`** — Loads `galaxy_presets.mjs` (the fitted occupancy parameters)
  and `rotmod_ltg_data.mjs` (the SPARC rotation-curve data + MW + M31) into Python
  objects. The .mjs files use JavaScript object literal syntax with some unquoted
  keys and inline comments; this module handles the parsing.

- **`galaxy_lib.py`** — The forward model. Implements:
  - `enforce_structure(P)` — non-mutating clamp+ordering enforcement for the radius
    parameters, matching the simulator's `enforceStructure()` exactly.
  - `rho_arr(x, P)` — piecewise-linear occupancy density.
  - `build_field_cache_np(P)` — softened-kernel displacement integral with smoothing.
  - `shape_fw_np(x, cache)`, `shape_n_np(x, P)` — framework and Newtonian velocity shapes.
  - `compute_galaxy(name, preset, rotmod_entry)`, `fit_quality(results)` — per-galaxy
    fit evaluation.

- **`make_svgs_v3.py`** — Single-galaxy SVG generator. Exports `make_svg(name)` which
  produces the combined velocity-and-mass-profile plot for a given galaxy.
  Running this script directly renders an 8-galaxy demo set.

- **`make_all_svgs_v3.py`** — Batch-generate all 177 galaxy SVGs plus the gallery
  `index.html` (sortable / filterable). Takes ~30 seconds on a typical desktop.

- **`make_aggregate_svg.py`** — Generate the aggregate RMS distribution histogram
  (Figure 1 in the paper).

## Usage

Place `galaxy_presets.mjs` and `rotmod_ltg_data.mjs` alongside the scripts (or set
the environment variable `GALAXY_DATA_DIR` to wherever they live). Then:

```bash
# Full 177-galaxy gallery (writes to ./galaxy_svgs/)
python3 make_all_svgs_v3.py

# Aggregate distribution figure (writes to ./galaxy_svgs/_aggregate_rms_distribution.svg)
python3 make_aggregate_svg.py

# Just an 8-galaxy demo set (writes to ./galaxy_svgs/)
python3 make_svgs_v3.py
```

To send output elsewhere, set `GALAXY_OUT_DIR`:

```bash
GALAXY_OUT_DIR=./my_figs python3 make_all_svgs_v3.py
```

A JavaScript equivalent of the SVG generator (`galaxy_svg.mjs`) is also available
separately, producing pixel-identical output to this Python pipeline within rounding;
suitable for browser or Node deployment alongside an interactive viewer.

## Dependencies

- Python 3.8+
- NumPy

That's it. The pipeline produces standalone SVG output — no matplotlib, no
external font resources, no other dependencies.
