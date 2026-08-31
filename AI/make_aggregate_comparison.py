"""Aggregate framework / MOND / Newtonian comparison metrics.

Reads galaxy_presets.mjs and rotmod_ltg_data.mjs using the existing
parse_presets.py and galaxy_lib.py helpers, then writes CSV/JSON summaries and
small SVG summary plots.

Outputs, by default:
  galaxy_svgs/_aggregate_model_comparison.csv
  galaxy_svgs/_aggregate_model_comparison.json
  galaxy_svgs/_aggregate_edge_bounded.svg
  galaxy_svgs/_aggregate_framework_vs_mond.svg

Usage:
  python make_aggregate_comparison.py

Optional environment variables:
  GALAXY_DATA_DIR=/path/to/files     directory containing .mjs inputs
  GALAXY_OUT_DIR=/path/to/output     output directory
  MOND_DISK_ML=0.5                   disk mass-to-light value
  MOND_BULGE_ML=0.7                  bulge mass-to-light value
  MOND_GDAGGER=1.2e-10               m/s^2
"""
import csv
import json
import math
import os
import sys
from statistics import median

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from parse_presets import load_presets, load_rotmod
from galaxy_lib import compute_galaxy, fit_quality, shape_n_np, get_rmax, total_mass_msun, menc_norm_numeric, G_KPC_KMS2_PER_MSUN

M_PER_KPC = 3.0856775814913673e19
ACC_UNIT_M_S2 = 1e6 / M_PER_KPC  # 1 (km/s)^2/kpc in m/s^2
DEFAULT_G_DAGGER_M_S2 = 1.2e-10

DATA_DIR = os.environ.get('GALAXY_DATA_DIR', '.')
OUT_DIR = os.environ.get('GALAXY_OUT_DIR', './galaxy_svgs')
DISK_ML = float(os.environ.get('MOND_DISK_ML', '0.5'))
BULGE_ML = float(os.environ.get('MOND_BULGE_ML', '0.7'))
G_DAGGER_M_S2 = float(os.environ.get('MOND_GDAGGER', str(DEFAULT_G_DAGGER_M_S2)))


def signed_square(v):
    return v * abs(v)


def mond_settings_for(name, preset, rotmod_entry):
    src = {}
    src.update(rotmod_entry.get('preset', {}))
    src.update(preset)
    return {
        'disk_ml': float(src.get('disk_ml', src.get('diskML', DISK_ML))),
        'bulge_ml': float(src.get('bulge_ml', src.get('bulgeML', BULGE_ML))),
        'g_dagger_m_s2': float(src.get('g_dagger_m_s2', src.get('gDagger', G_DAGGER_M_S2))),
    }

def vbar_squared(row, disk_ml, bulge_ml):
    v2 = (
        signed_square(row.get('vGas', 0.0))
        + disk_ml * signed_square(row.get('vDisk', 0.0))
        + bulge_ml * signed_square(row.get('vBul', 0.0))
    )
    return max(0.0, v2)

def mond_velocity(row, disk_ml, bulge_ml, g_dagger_m_s2):
    r = max(float(row.get('r', 0.0)), 1e-12)
    vb2 = vbar_squared(row, disk_ml, bulge_ml)
    if vb2 <= 0:
        return None
    g_dagger = g_dagger_m_s2 / ACC_UNIT_M_S2
    g_bar = vb2 / r
    denom = 1.0 - math.exp(-math.sqrt(max(g_bar / g_dagger, 0.0)))
    if denom > 1e-12:
        g_mond = g_bar / denom
    else:
        g_mond = math.sqrt(max(g_bar * g_dagger, 0.0))
    return math.sqrt(max(g_mond * r, 0.0))

#def vbar_squared(row, disk_ml=DISK_ML, bulge_ml=BULGE_ML):
#    v2 = (
#        signed_square(row.get('vGas', 0.0))
#        + disk_ml * signed_square(row.get('vDisk', 0.0))
#        + bulge_ml * signed_square(row.get('vBul', 0.0))
#    )
#    return max(0.0, v2)

#def mond_velocity(row, g_dagger_m_s2=G_DAGGER_M_S2):
#    r = max(float(row.get('r', 0.0)), 1e-12)
#    vb2 = vbar_squared(row)
#    if vb2 <= 0:
#        return None
#    g_dagger = g_dagger_m_s2 / ACC_UNIT_M_S2  # convert to (km/s)^2/kpc
#    g_bar = vb2 / r
#    denom = 1.0 - math.exp(-math.sqrt(max(g_bar / g_dagger, 0.0)))
#    if denom > 1e-12:
#        g_mond = g_bar / denom
#    else:
#        g_mond = math.sqrt(max(g_bar * g_dagger, 0.0))
#    return math.sqrt(max(g_mond * r, 0.0))


def has_mond_components(rotmod_entry):
    # M31 / MilkyWay in this project may have brightness-like rows but zero
    # gas/disk/bulge velocity components, so their MOND velocity comparison is
    # incomplete and should be flagged, not counted as a MOND failure.
    for row in rotmod_entry.get('rows', []):
        if abs(row.get('vGas', 0.0)) > 0 or abs(row.get('vDisk', 0.0)) > 0 or abs(row.get('vBul', 0.0)) > 0:
            return True
    return False

def enclosed_mass_msun(p, r_max, r_phys):
    newton_amp = float(p.get("newtonAmp", 0.0) or 0.0)
    if newton_amp <= 0 or r_max <= 0:
        return None
    x = float(r_phys) / float(r_max)
    m_norm = menc_norm_numeric(p, x_max=x)
    return (newton_amp * newton_amp * m_norm * float(r_max)) / G_KPC_KMS2_PER_MSUN

def baryonic_component_masses_at_row(row, disk_ml, bulge_ml):
    r = max(float(row.get('r', 0.0)), 0.0)
    if r <= 0:
        return {
            'm_bary_outer_msun': None,
            'm_gas_outer_msun': None,
            'm_disk_outer_msun': None,
            'm_bulge_outer_msun': None,
        }
    gas = signed_square(row.get('vGas', 0.0)) * r / G_KPC_KMS2_PER_MSUN
    disk = disk_ml * signed_square(row.get('vDisk', 0.0)) * r / G_KPC_KMS2_PER_MSUN
    bulge = bulge_ml * signed_square(row.get('vBul', 0.0)) * r / G_KPC_KMS2_PER_MSUN
    return {
        'm_bary_outer_msun': max(0.0, gas + disk + bulge),
        'm_gas_outer_msun': max(0.0, gas),
        'm_disk_outer_msun': max(0.0, disk),
        'm_bulge_outer_msun': max(0.0, bulge),
    }

def component_split_metrics(rotmod_entry, disk_ml, bulge_ml, fitted_outer_msun):
    rows = list(rotmod_entry.get('rows', []))
    if not rows:
        return {}
    outer = max(rows, key=lambda r: float(r.get('r', 0.0)))
    masses = baryonic_component_masses_at_row(outer, disk_ml, bulge_ml)
    bary = masses.get('m_bary_outer_msun')
    gas = masses.get('m_gas_outer_msun')
    disk = masses.get('m_disk_outer_msun')
    bulge = masses.get('m_bulge_outer_msun')
    compact = (disk or 0.0) + (bulge or 0.0)
    sb_disk_vals = [float(r.get('sbDisk', 0.0) or 0.0) for r in rows]
    sb_bul_vals = [float(r.get('sbBul', 0.0) or 0.0) for r in rows]
    sb_total_vals = [d + b for d, b in zip(sb_disk_vals, sb_bul_vals)]
    return {
        **masses,
        'fit_to_bary_outer_ratio': (fitted_outer_msun / bary) if fitted_outer_msun and bary and bary > 0 else None,
        'gas_outer_frac': (gas / bary) if bary and bary > 0 else None,
        'disk_outer_frac': (disk / bary) if bary and bary > 0 else None,
        'bulge_outer_frac': (bulge / bary) if bary and bary > 0 else None,
        'compact_outer_frac': (compact / bary) if bary and bary > 0 else None,
        'compact_to_gas_outer_ratio': (compact / gas) if gas and gas > 0 else None,
        'sb_disk_peak': max(sb_disk_vals) if sb_disk_vals else None,
        'sb_bulge_peak': max(sb_bul_vals) if sb_bul_vals else None,
        'sb_total_peak': max(sb_total_vals) if sb_total_vals else None,
        'sb_total_median': median(sb_total_vals) if sb_total_vals else None,
        'outer_vgas': float(outer.get('vGas', 0.0) or 0.0),
        'outer_vdisk': float(outer.get('vDisk', 0.0) or 0.0),
        'outer_vbulge': float(outer.get('vBul', 0.0) or 0.0),
    }

def safe_log10(v):
    return math.log10(v) if v is not None and v > 0 and math.isfinite(v) else None

def radial_component_rows(name, preset, rotmod_entry, rmax, disk_ml, bulge_ml):
    out = []
    for row in rotmod_entry.get('rows', []):
        r = float(row.get('r', 0.0) or 0.0)
        if r <= 0:
            continue
        fitted = enclosed_mass_msun(preset, rmax, r)
        bary = baryonic_component_masses_at_row(row, disk_ml, bulge_ml)
        mb = bary.get('m_bary_outer_msun')
        mg = bary.get('m_gas_outer_msun')
        md = bary.get('m_disk_outer_msun')
        mbul = bary.get('m_bulge_outer_msun')
        compact = (md or 0.0) + (mbul or 0.0)
        out.append({
            'name': name,
            'r_kpc': r,
            'x_obs': r / rmax if rmax else None,
            'm_fit_msun': fitted,
            'm_bary_msun': mb,
            'm_gas_msun': mg,
            'm_disk_msun': md,
            'm_bulge_msun': mbul,
            'fit_to_bary_ratio': (fitted / mb) if fitted and mb and mb > 0 else None,
            'gas_frac': (mg / mb) if mb and mb > 0 else None,
            'disk_frac': (md / mb) if mb and mb > 0 else None,
            'bulge_frac': (mbul / mb) if mb and mb > 0 else None,
            'compact_frac': (compact / mb) if mb and mb > 0 else None,
            'sb_disk': float(row.get('sbDisk', 0.0) or 0.0),
            'sb_bulge': float(row.get('sbBul', 0.0) or 0.0),
            'v_obs': float(row.get('vObs', 0.0) or 0.0),
            'v_gas': float(row.get('vGas', 0.0) or 0.0),
            'v_disk': float(row.get('vDisk', 0.0) or 0.0),
            'v_bulge': float(row.get('vBul', 0.0) or 0.0),
        })
    return out

def median_or_none(vals):
    vals = [v for v in vals if v is not None and isinstance(v, (int, float)) and math.isfinite(v)]
    return median(vals) if vals else None

def radial_bin_summary(radial_rows, n_bins=12):
    bins = []
    for i in range(n_bins):
        lo = i / n_bins
        hi = (i + 1) / n_bins
        subset = [
            r for r in radial_rows
            if r.get('x_obs') is not None
            and lo <= r['x_obs'] < (hi if i < n_bins - 1 else hi + 1e-9)
            and r.get('fit_to_bary_ratio') is not None
        ]
        bins.append({
            'x_lo': lo,
            'x_hi': hi,
            'x_mid': 0.5 * (lo + hi),
            'n': len(subset),
            'median_fit_to_bary_ratio': median_or_none([r.get('fit_to_bary_ratio') for r in subset]),
            'median_gas_frac': median_or_none([r.get('gas_frac') for r in subset]),
            'median_compact_frac': median_or_none([r.get('compact_frac') for r in subset]),
            'median_sb_total': median_or_none([(r.get('sb_disk') or 0.0) + (r.get('sb_bulge') or 0.0) for r in subset]),
        })
    return bins

def has_bulge_component(rotmod_entry):
    return any(abs(row.get('vBul', 0.0)) > 0 or abs(row.get('sbBul', 0.0)) > 0 for row in rotmod_entry.get('rows', []))


def model_metrics(results, field, k=0):
    sum2 = 0.0
    rel2 = 0.0
    sig2 = 0.0
    max_sig = 0.0
    n = 0
    n_within_1sigma = 0
    n_within_2sigma = 0
    n_within_3sigma = 0
    for r in results:
        model = r.get(field)
        if model is None or not math.isfinite(model):
            continue
        obs = float(r['v_obs'])
        err = max(float(r.get('err_v', 0.0)), 1e-9)
        e = model - obs
        z = abs(e / err)
        sum2 += e * e
        rel2 += (e / obs) ** 2 if obs != 0 else 0.0
        sig2 += z * z
        max_sig = max(max_sig, z)
        n_within_1sigma += int(z <= 1.0)
        n_within_2sigma += int(z <= 2.0)
        n_within_3sigma += int(z <= 3.0)
        n += 1
    if n == 0:
        return {
            'n': 0, 'rms': None, 'rel_rms': None, 'sigma_rms': None,
            'chi2nu': None, 'max_sigma': None,
            'frac_within_1sigma': None, 'frac_within_2sigma': None,
            'frac_within_3sigma': None,
        }
    dof = max(1, n - k)
    return {
        'n': n,
        'rms': math.sqrt(sum2 / n),
        'rel_rms': math.sqrt(rel2 / n),
        'sigma_rms': math.sqrt(sig2 / n),
        'chi2nu': sig2 / dof,
        'max_sigma': max_sig,
        'frac_within_1sigma': n_within_1sigma / n,
        'frac_within_2sigma': n_within_2sigma / n,
        'frac_within_3sigma': n_within_3sigma / n,
    }


def edge_geometry(preset):
    r4 = float(preset.get('r4', float('nan')))
    r5 = float(preset.get('r5', float('nan')))
    return {
        'r1': float(preset.get('r1', float('nan'))),
        'r2': float(preset.get('r2', float('nan'))),
        'r3': float(preset.get('r3', float('nan'))),
        'r4': r4,
        'r5': r5,
        'rho0': float(preset.get('rho0', float('nan'))),
        'rho1': float(preset.get('rho1', float('nan'))),
        'rho2': float(preset.get('rho2', float('nan'))),
        'rho3': float(preset.get('rho3', float('nan'))),
        'rho4': float(preset.get('rho4', float('nan'))),
        'edge_width_pct': 100.0 * max(0.0, r5 - r4),
        'outer_extension_pct': 100.0 * max(0.0, r5 - 1.0),
        'edge_bounded_1pct': bool(r5 <= 1.01),
        'edge_bounded_5pct': bool(r5 <= 1.05),
        'edge_bounded_10pct': bool(r5 <= 1.10),
    }


def winner_by_sigma(row):
    vals = []
    for key, label in [
        ('sigma_rms_fw', 'framework'),
        ('sigma_rms_mond', 'mond'),
        ('sigma_rms_newton', 'newtonian'),
    ]:
        val = row.get(key)
        if val is not None and math.isfinite(val):
            vals.append((val, label))
    return min(vals)[1] if vals else 'none'


def fmt(x, nd=3):
    if x is None:
        return ''
    if isinstance(x, bool):
        return '1' if x else '0'
    if isinstance(x, int):
        return str(x)
    if isinstance(x, float):
        if not math.isfinite(x):
            return ''
        return f'{x:.{nd}f}'
    return str(x)


def summarize(rows):
    def vals(key):
        return [r[key] for r in rows if r.get(key) is not None and isinstance(r.get(key), (int, float)) and math.isfinite(r[key])]
    out = {
        'n_galaxies': len(rows),
        'mond_available': sum(1 for r in rows if r.get('has_mond_components')),
    }
    for key in ['rel_rms_fw', 'sigma_rms_fw', 'rel_rms_mond', 'sigma_rms_mond', 'outer_extension_pct', 'edge_width_pct', 'r5']:
        v = vals(key)
        if v:
            out[f'median_{key}'] = median(v)
            out[f'min_{key}'] = min(v)
            out[f'max_{key}'] = max(v)
    for pct, key in [(1, 'edge_bounded_1pct'), (5, 'edge_bounded_5pct'), (10, 'edge_bounded_10pct')]:
        c = sum(1 for r in rows if r.get(key))
        out[f'n_cutoff_within_{pct}pct'] = c
        out[f'frac_cutoff_within_{pct}pct'] = c / max(1, len(rows))
    for label in ['framework', 'mond', 'newtonian']:
        out[f'winner_{label}'] = sum(1 for r in rows if r.get('winner_by_sigma') == label)
    return out


def svg_hist_edge(rows, path):
    """Write a zoomed outer-cutoff histogram over 0-5%.

    This version is intended for the current best-fit set where all outer
    cutoffs are expected to be <=5% past the last measured rotation point.
    Labels avoid raw '<' characters so the SVG remains XML-valid in browsers.
    """
    width, height = 820, 460
    margin = {'l': 70, 'r': 30, 't': 78, 'b': 66}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']

    # Zoomed buckets across the 0-5% regime. Keep overflow for sanity checks.
    bins = [
        ('0% or less', None, 0.0),
        ('0-0.5%', 0.0, 0.5),
        ('0.5-1%', 0.5, 1.0),
        ('1-2%', 1.0, 2.0),
        ('2-3%', 2.0, 3.0),
        ('3-4%', 3.0, 4.0),
        ('4-5%', 4.0, 5.0),
        ('over 5%', 5.0, None),
    ]
    counts = [0] * len(bins)
    for r in rows:
        ext = float(r.get('outer_extension_pct', 0.0))
        placed = False
        for i, (_label, lo, hi) in enumerate(bins):
            if lo is None and ext <= hi:
                counts[i] += 1; placed = True; break
            if hi is None and ext > lo:
                counts[i] += 1; placed = True; break
            if lo is not None and hi is not None and ext > lo and ext <= hi:
                counts[i] += 1; placed = True; break
        if not placed:
            counts[-1] += 1

    maxc = max(counts) if counts else 1
    maxc = max(maxc, 1)
    bw = pw / len(bins)

    def xml(s):
        return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def y(c):
        return margin['t'] + (1 - c / (maxc * 1.15)) * ph

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.bar{fill:#2a72c4}.overflow{fill:#c45a2a}.lbl{fill:#333}.title{font-size:17px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Outer cutoff distribution of fitted support profiles</text>')
    svg.append(f'<text x="{width/2}" y="48" text-anchor="middle" class="sub">zoomed 0-5% extension beyond the outermost measured rotation point</text>')
    svg.append(f'<text x="{width/2}" y="64" text-anchor="middle" class="sub">outer extension = 100 * max(0, r5 - 1)</text>')

    for i in range(6):
        c = int(round(maxc * i / 5))
        yy = y(c)
        svg.append(f'<line x1="{margin["l"]}" y1="{yy:.1f}" x2="{width-margin["r"]}" y2="{yy:.1f}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-8}" y="{yy+4:.1f}" text-anchor="end" class="lbl">{c}</text>')

    for i, ((lab, _lo, _hi), c) in enumerate(zip(bins, counts)):
        h = (c / (maxc * 1.15)) * ph
        x0 = margin['l'] + i * bw
        y0 = margin['t'] + ph - h
        cls = 'overflow' if lab == 'over 5%' and c > 0 else 'bar'
        svg.append(f'<rect x="{x0+8:.1f}" y="{y0:.1f}" width="{bw-16:.1f}" height="{h:.1f}" class="{cls}"/>')
        svg.append(f'<text x="{x0+bw/2:.1f}" y="{height-margin["b"]+18}" text-anchor="middle" class="lbl">{xml(lab)}</text>')
        svg.append(f'<text x="{x0+bw/2:.1f}" y="{y0-5:.1f}" text-anchor="middle" class="lbl">{c}</text>')

    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-14}" text-anchor="middle" class="lbl">support cutoff beyond observed edge</text>')
    svg.append(f'<text x="18" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90,18,{margin["t"]+ph/2})">number of galaxies</text>')
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))


def svg_fw_vs_mond(rows, path):
    pts = [r for r in rows if r.get('sigma_rms_mond') is not None and r.get('sigma_rms_fw') is not None]
    width, height = 640, 640
    margin = {'l': 70, 'r': 30, 't': 70, 'b': 65}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    maxv = max([3.0] + [min(20.0, r['sigma_rms_fw']) for r in pts] + [min(20.0, r['sigma_rms_mond']) for r in pts])
    maxv = math.ceil(maxv)
    def x(v): return margin['l'] + min(v, maxv) / maxv * pw
    def y(v): return margin['t'] + (1 - min(v, maxv) / maxv) * ph
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.diag{stroke:#900;stroke-dasharray:5,4;fill:none}.pt{fill:#2a72c4;opacity:.72}.lbl{fill:#333}.title{font-size:17px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Framework vs MOND error-normalized RMS</text>')
    svg.append(f'<text x="{width/2}" y="48" text-anchor="middle" class="sub">below diagonal: framework closer within reported error bars</text>')
    for i in range(6):
        v = maxv * i / 5
        xx = x(v); yy = y(v)
        svg.append(f'<line x1="{xx:.1f}" y1="{margin["t"]}" x2="{xx:.1f}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<line x1="{margin["l"]}" y1="{yy:.1f}" x2="{width-margin["r"]}" y2="{yy:.1f}" class="grid"/>')
        svg.append(f'<text x="{xx:.1f}" y="{height-margin["b"]+18}" text-anchor="middle" class="lbl">{v:.1f}</text>')
        svg.append(f'<text x="{margin["l"]-8}" y="{yy+4:.1f}" text-anchor="end" class="lbl">{v:.1f}</text>')
    svg.append(f'<line x1="{x(0):.1f}" y1="{y(0):.1f}" x2="{x(maxv):.1f}" y2="{y(maxv):.1f}" class="diag"/>')
    for r in pts:
        svg.append(f'<circle cx="{x(r["sigma_rms_mond"]):.1f}" cy="{y(r["sigma_rms_fw"]):.1f}" r="3" class="pt"><title>{r["name"]}: FW {r["sigma_rms_fw"]:.2f}, MOND {r["sigma_rms_mond"]:.2f}</title></circle>')
    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-16}" text-anchor="middle" class="lbl">MOND/RAR RMS in sigma units</text>')
    svg.append(f'<text x="18" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90,18,{margin["t"]+ph/2})">framework RMS in sigma units</text>')
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))

def svg_component_split(rows, path):
    pts = [
        r for r in rows
        if r.get('gas_outer_frac') is not None
        and r.get('fit_to_bary_outer_ratio') is not None
        and math.isfinite(r.get('gas_outer_frac'))
        and math.isfinite(r.get('fit_to_bary_outer_ratio'))
    ]
    width, height = 760, 560
    margin = {'l': 78, 'r': 34, 't': 78, 'b': 72}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    max_ratio = max([p['fit_to_bary_outer_ratio'] for p in pts] + [2.0])
    max_ratio = min(max(2.0, max_ratio * 1.08), 8.0)

    def xml(s):
        return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def x(v):
        return margin['l'] + max(0.0, min(1.0, v)) * pw

    def y(v):
        return margin['t'] + (1.0 - min(max(v, 0.0), max_ratio) / max_ratio) * ph

    def color(compact_frac):
        t = max(0.0, min(1.0, compact_frac if compact_frac is not None else 0.0))
        # gas-rich blue through compact-rich red
        r = int(45 + 185 * t)
        g = int(110 - 40 * t)
        b = int(205 - 135 * t)
        return f'#{r:02x}{g:02x}{b:02x}'

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.ref{stroke:#8b0000;stroke-dasharray:5,4;fill:none}.pt{opacity:.78;stroke:#222;stroke-width:.35}.lbl{fill:#333}.title{font-size:17px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Recovered support mass vs SPARC component split</text>')
    svg.append(f'<text x="{width/2}" y="48" text-anchor="middle" class="sub">x = gas fraction at outer measured point, y = fitted enclosed support / baryonic enclosed mass</text>')
    svg.append(f'<text x="{width/2}" y="64" text-anchor="middle" class="sub">color shifts blue→red as compact disk+bulge fraction increases</text>')

    for i in range(6):
        gx = i / 5
        xx = x(gx)
        svg.append(f'<line x1="{xx:.1f}" y1="{margin["t"]}" x2="{xx:.1f}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<text x="{xx:.1f}" y="{height-margin["b"]+18}" text-anchor="middle" class="lbl">{gx:.1f}</text>')
    for i in range(6):
        rv = max_ratio * i / 5
        yy = y(rv)
        svg.append(f'<line x1="{margin["l"]}" y1="{yy:.1f}" x2="{width-margin["r"]}" y2="{yy:.1f}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-8}" y="{yy+4:.1f}" text-anchor="end" class="lbl">{rv:.1f}</text>')
    svg.append(f'<line x1="{margin["l"]}" y1="{y(1.0):.1f}" x2="{width-margin["r"]}" y2="{y(1.0):.1f}" class="ref"/>')
    svg.append(f'<text x="{margin["l"]+8}" y="{y(1.0)-6:.1f}" class="lbl">1:1 recovered/baryonic</text>')

    for r in pts:
        gx = r['gas_outer_frac']
        ratio = r['fit_to_bary_outer_ratio']
        compact = r.get('compact_outer_frac')
        rr = 3.2 + 4.0 * min(1.0, max(0.0, r.get('rel_rms_fw') or 0.0) / 0.08)
        svg.append(
            f'<circle cx="{x(gx):.1f}" cy="{y(ratio):.1f}" r="{rr:.1f}" fill="{color(compact)}" class="pt">'
            f'<title>{xml(r["name"])}: fit/bary={ratio:.3f}, gas={gx:.3f}, compact={compact if compact is not None else float("nan"):.3f}</title></circle>'
        )

    ratios = sorted(p['fit_to_bary_outer_ratio'] for p in pts)
    gas_fracs = sorted(p['gas_outer_frac'] for p in pts)
    med_ratio = ratios[len(ratios)//2] if ratios else None
    med_gas = gas_fracs[len(gas_fracs)//2] if gas_fracs else None
    if med_ratio is not None:
        svg.append(f'<text x="{margin["l"]+12}" y="{margin["t"]+18}" class="lbl">N = {len(pts)}</text>')
        svg.append(f'<text x="{margin["l"]+12}" y="{margin["t"]+34}" class="lbl">median fit/bary = {med_ratio:.2f}</text>')
        svg.append(f'<text x="{margin["l"]+12}" y="{margin["t"]+50}" class="lbl">median gas fraction = {med_gas:.2f}</text>')

    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-18}" text-anchor="middle" class="lbl">outer gas fraction: M_gas / (M_gas + M_disk + M_bulge)</text>')
    svg.append(f'<text x="20" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90,20,{margin["t"]+ph/2})">fit / baryonic mass at outer measured radius</text>')
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))

def svg_component_matrix(rows, path):
    panels = [
        ('gas_outer_frac', 'gas fraction', 0.0, 1.0, False),
        ('compact_outer_frac', 'compact fraction', 0.0, 1.0, False),
        ('compact_to_gas_outer_ratio', 'compact / gas', 0.0, 20.0, True),
        ('sb_total_peak', 'peak surface brightness', 0.0, None, True),
    ]
    pts = [
        r for r in rows
        if r.get('fit_to_bary_outer_ratio') is not None
        and math.isfinite(r.get('fit_to_bary_outer_ratio'))
    ]
    width, height = 980, 760
    margin = {'l': 72, 'r': 28, 't': 82, 'b': 64}
    gap = 52
    panel_w = (width - margin['l'] - margin['r'] - gap) / 2
    panel_h = (height - margin['t'] - margin['b'] - gap) / 2
    y_max = min(max([p['fit_to_bary_outer_ratio'] for p in pts] + [2.0]) * 1.08, 20.0)
    y_max = max(2.0, y_max)

    def xml(s):
        return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def point_color(r):
        t = max(0.0, min(1.0, r.get('compact_outer_frac') or 0.0))
        red = int(50 + 180 * t)
        green = int(120 - 30 * t)
        blue = int(210 - 145 * t)
        return f'#{red:02x}{green:02x}{blue:02x}'

    def x_value(r, key, log_axis):
        v = r.get(key)
        if v is None or not math.isfinite(v):
            return None
        if log_axis:
            if v <= 0:
                return None
            return math.log10(v)
        return v

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.ref{stroke:#8b0000;stroke-dasharray:5,4;fill:none}.pt{opacity:.72;stroke:#222;stroke-width:.3}.lbl{fill:#333}.title{font-size:18px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}.paneltitle{font-size:13px;font-weight:600;fill:#222}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Recovered mass ratio against SPARC component proxies</text>')
    svg.append(f'<text x="{width/2}" y="49" text-anchor="middle" class="sub">y = fitted enclosed support / SPARC baryonic enclosed mass at outer measured point</text>')
    svg.append(f'<text x="{width/2}" y="66" text-anchor="middle" class="sub">point color: compact disk+bulge fraction; log x-axis used where needed</text>')

    for pi, (key, label, xmin, xmax, log_axis) in enumerate(panels):
        col = pi % 2
        row = pi // 2
        ox = margin['l'] + col * (panel_w + gap)
        oy = margin['t'] + row * (panel_h + gap)
        panel_pts = []
        vals = []
        for r in pts:
            xv = x_value(r, key, log_axis)
            if xv is None:
                continue
            vals.append(xv)
            panel_pts.append((r, xv))
        if log_axis:
            if xmax is None:
                xmax_v = max(vals + [1.0])
                xmin_v = min(vals + [xmax_v / 1000])
            else:
                xmin_v = math.log10(max(1e-6, xmin if xmin > 0 else min(vals + [1e-3])))
                xmax_v = math.log10(max(xmax, 1e-6))
        else:
            xmin_v = xmin
            xmax_v = xmax
        if xmax is None and not log_axis:
            xmax_v = max(vals + [1.0])
            xmin_v = min(vals + [0.0])
        if not math.isfinite(xmin_v) or not math.isfinite(xmax_v) or abs(xmax_v - xmin_v) < 1e-12:
            xmin_v, xmax_v = 0.0, 1.0

        def x(v):
            return ox + (v - xmin_v) / (xmax_v - xmin_v) * panel_w

        def y(v):
            return oy + (1.0 - min(max(v, 0.0), y_max) / y_max) * panel_h

        svg.append(f'<text x="{ox+panel_w/2:.1f}" y="{oy-10:.1f}" text-anchor="middle" class="paneltitle">{xml(label)}</text>')
        for i in range(5):
            t = i / 4
            xx = ox + t * panel_w
            yy = oy + (1 - t) * panel_h
            svg.append(f'<line x1="{xx:.1f}" y1="{oy:.1f}" x2="{xx:.1f}" y2="{oy+panel_h:.1f}" class="grid"/>')
            svg.append(f'<line x1="{ox:.1f}" y1="{yy:.1f}" x2="{ox+panel_w:.1f}" y2="{yy:.1f}" class="grid"/>')
            ylab = y_max * t
            svg.append(f'<text x="{ox-7:.1f}" y="{yy+4:.1f}" text-anchor="end" class="lbl">{ylab:.1f}</text>')
        svg.append(f'<line x1="{ox:.1f}" y1="{y(1.0):.1f}" x2="{ox+panel_w:.1f}" y2="{y(1.0):.1f}" class="ref"/>')
        for r, xv in panel_pts:
            ratio = r['fit_to_bary_outer_ratio']
            svg.append(
                f'<circle cx="{x(xv):.1f}" cy="{y(ratio):.1f}" r="3.4" fill="{point_color(r)}" class="pt">'
                f'<title>{xml(r["name"])}: {xml(label)}={r.get(key):.4g}, fit/bary={ratio:.3f}</title></circle>'
            )
        svg.append(f'<rect x="{ox:.1f}" y="{oy:.1f}" width="{panel_w:.1f}" height="{panel_h:.1f}" class="ax"/>')
        axis_note = f'log10 {label}' if log_axis else label
        svg.append(f'<text x="{ox+panel_w/2:.1f}" y="{oy+panel_h+28:.1f}" text-anchor="middle" class="lbl">{xml(axis_note)}</text>')
        svg.append(f'<text x="{ox+6:.1f}" y="{oy+panel_h-8:.1f}" class="lbl">n={len(panel_pts)}</text>')

    svg.append(f'<text x="18" y="{margin["t"]+(2*panel_h+gap)/2:.1f}" text-anchor="middle" class="lbl" transform="rotate(-90,18,{margin["t"]+(2*panel_h+gap)/2:.1f})">fit / baryonic mass</text>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))

def svg_mass_comparison(rows, path):
    pts = [
        r for r in rows
        if r.get('m_bary_outer_msun') is not None
        and r.get('m_outer_msun') is not None
        and r.get('m_bary_outer_msun') > 0
        and r.get('m_outer_msun') > 0
    ]
    width, height = 720, 680
    margin = {'l': 82, 'r': 34, 't': 78, 'b': 76}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    logs_x = [math.log10(p['m_bary_outer_msun']) for p in pts]
    logs_y = [math.log10(p['m_outer_msun']) for p in pts]
    lo = math.floor(min(logs_x + logs_y + [7.0]))
    hi = math.ceil(max(logs_x + logs_y + [12.0]))

    def xml(s):
        return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def x(v):
        return margin['l'] + (math.log10(v) - lo) / (hi - lo) * pw

    def y(v):
        return margin['t'] + (1.0 - (math.log10(v) - lo) / (hi - lo)) * ph

    def color(r):
        t = max(0.0, min(1.0, r.get('gas_outer_frac') or 0.0))
        red = int(210 - 150 * t)
        green = int(78 + 80 * t)
        blue = int(62 + 150 * t)
        return f'#{red:02x}{green:02x}{blue:02x}'

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.diag{stroke:#8b0000;stroke-dasharray:5,4;fill:none}.pt{opacity:.75;stroke:#222;stroke-width:.35}.lbl{fill:#333}.title{font-size:17px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Fitted support mass vs SPARC baryonic mass</text>')
    svg.append(f'<text x="{width/2}" y="49" text-anchor="middle" class="sub">outer measured radius; x from gas+disk+bulge rotation components, y from fitted rho preset support</text>')
    svg.append(f'<text x="{width/2}" y="66" text-anchor="middle" class="sub">color: gas fraction, red=compact dominated and blue=gas dominated</text>')
    for e in range(lo, hi + 1):
        xv = margin['l'] + (e - lo) / (hi - lo) * pw
        yv = margin['t'] + (1 - (e - lo) / (hi - lo)) * ph
        svg.append(f'<line x1="{xv:.1f}" y1="{margin["t"]}" x2="{xv:.1f}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<line x1="{margin["l"]}" y1="{yv:.1f}" x2="{width-margin["r"]}" y2="{yv:.1f}" class="grid"/>')
        svg.append(f'<text x="{xv:.1f}" y="{height-margin["b"]+18}" text-anchor="middle" class="lbl">1e{e}</text>')
        svg.append(f'<text x="{margin["l"]-8}" y="{yv+4:.1f}" text-anchor="end" class="lbl">1e{e}</text>')
    svg.append(f'<line x1="{margin["l"]}" y1="{height-margin["b"]}" x2="{width-margin["r"]}" y2="{margin["t"]}" class="diag"/>')
    for r in pts:
        xb = r['m_bary_outer_msun']
        yf = r['m_outer_msun']
        ratio = r.get('fit_to_bary_outer_ratio')
        svg.append(
            f'<circle cx="{x(xb):.1f}" cy="{y(yf):.1f}" r="3.5" fill="{color(r)}" class="pt">'
            f'<title>{xml(r["name"])}: fit={yf:.3e}, bary={xb:.3e}, fit/bary={ratio if ratio is not None else float("nan"):.3f}</title></circle>'
        )
    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-18}" text-anchor="middle" class="lbl">SPARC baryonic mass inside outer point (M_sun)</text>')
    svg.append(f'<text x="20" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90,20,{margin["t"]+ph/2})">fitted support mass inside outer point (M_sun)</text>')
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))

def svg_radial_component_profile(radial_rows, radial_bins, path):
    pts = [
        r for r in radial_rows
        if r.get('x_obs') is not None
        and r.get('fit_to_bary_ratio') is not None
        and math.isfinite(r.get('x_obs'))
        and math.isfinite(r.get('fit_to_bary_ratio'))
        and r.get('x_obs') >= 0
    ]
    width, height = 860, 560
    margin = {'l': 78, 'r': 34, 't': 78, 'b': 72}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    max_ratio = max([p['fit_to_bary_ratio'] for p in pts] + [2.0])
    max_ratio = min(max(2.0, max_ratio * 1.05), 20.0)

    def xml(s):
        return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    def x(v):
        return margin['l'] + max(0.0, min(1.0, v)) * pw

    def y(v):
        return margin['t'] + (1.0 - min(max(v, 0.0), max_ratio) / max_ratio) * ph

    def color(gas_frac):
        t = max(0.0, min(1.0, gas_frac if gas_frac is not None else 0.0))
        red = int(215 - 160 * t)
        green = int(80 + 85 * t)
        blue = int(60 + 155 * t)
        return f'#{red:02x}{green:02x}{blue:02x}'

    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>.ax{stroke:#333;fill:none}.grid{stroke:#ddd;stroke-width:.5}.ref{stroke:#8b0000;stroke-dasharray:5,4;fill:none}.pt{opacity:.32;stroke:none}.med{stroke:#111;stroke-width:2.4;fill:none}.medpt{fill:#111}.lbl{fill:#333}.title{font-size:17px;font-weight:600;fill:#111}.sub{font-size:12px;fill:#555}</style>')
    svg.append(f'<text x="{width/2}" y="28" text-anchor="middle" class="title">Radial support/baryonic mass ratio</text>')
    svg.append(f'<text x="{width/2}" y="49" text-anchor="middle" class="sub">each point is one rotation-curve radius; black line is median by normalized radius bin</text>')
    svg.append(f'<text x="{width/2}" y="66" text-anchor="middle" class="sub">color: local gas mass fraction, red=compact dominated and blue=gas dominated</text>')

    for i in range(6):
        xv = i / 5
        xx = x(xv)
        svg.append(f'<line x1="{xx:.1f}" y1="{margin["t"]}" x2="{xx:.1f}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<text x="{xx:.1f}" y="{height-margin["b"]+18}" text-anchor="middle" class="lbl">{xv:.1f}</text>')
    for i in range(6):
        rv = max_ratio * i / 5
        yy = y(rv)
        svg.append(f'<line x1="{margin["l"]}" y1="{yy:.1f}" x2="{width-margin["r"]}" y2="{yy:.1f}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-8}" y="{yy+4:.1f}" text-anchor="end" class="lbl">{rv:.1f}</text>')
    svg.append(f'<line x1="{margin["l"]}" y1="{y(1.0):.1f}" x2="{width-margin["r"]}" y2="{y(1.0):.1f}" class="ref"/>')

    for r in pts:
        ratio = r['fit_to_bary_ratio']
        gas = r.get('gas_frac')
        svg.append(
            f'<circle cx="{x(r["x_obs"]):.1f}" cy="{y(ratio):.1f}" r="2.1" fill="{color(gas)}" class="pt">'
            f'<title>{xml(r["name"])} r={r["r_kpc"]:.2f} kpc, x={r["x_obs"]:.3f}, fit/bary={ratio:.3f}, gas={gas if gas is not None else float("nan"):.3f}</title></circle>'
        )

    med_points = [b for b in radial_bins if b.get('median_fit_to_bary_ratio') is not None and b.get('n', 0) > 0]
    if med_points:
        med_path = []
        for i, b in enumerate(med_points):
            cmd = 'M' if i == 0 else 'L'
            med_path.append(f'{cmd}{x(b["x_mid"]):.1f},{y(b["median_fit_to_bary_ratio"]):.1f}')
        svg.append(f'<path d="{" ".join(med_path)}" class="med"/>')
        for b in med_points:
            svg.append(f'<circle cx="{x(b["x_mid"]):.1f}" cy="{y(b["median_fit_to_bary_ratio"]):.1f}" r="3.8" class="medpt"><title>x={b["x_mid"]:.2f}, median={b["median_fit_to_bary_ratio"]:.3f}, n={b["n"]}</title></circle>')

    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-18}" text-anchor="middle" class="lbl">normalized observed radius r / rMax</text>')
    svg.append(f'<text x="20" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90,20,{margin["t"]+ph/2})">fitted support mass / SPARC baryonic mass inside r</text>')
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    svg.append('</svg>')
    with open(path, 'w') as f:
        f.write('\n'.join(svg))


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    presets = load_presets(os.path.join(DATA_DIR, 'galaxy_presets.mjs'))
    rotmod = load_rotmod(os.path.join(DATA_DIR, 'rotmod_ltg_data.mjs'))
    rotmod_by_name = {g['name']: g for g in rotmod}

    rows_out = []
    radial_rows_out = []
    skipped = []
    for name, preset in presets.items():
        if name not in rotmod_by_name:
            skipped.append((name, 'no rotmod'))
            continue
        rot = rotmod_by_name[name]
        try:
            results, rmax = compute_galaxy(name, preset, rot)
            # Add MOND velocity to the same result rows.
            #print( rmax, preset );
            if preset.get('remapOn'):
                print(
                    name,
                    'rMax=', rmax,
                    'remap=', preset.get('remapDelta'), preset.get('remapRc'),
                    'n_remapped=', sum(1 for r in results if r.get('remapped')),
                    'max_kpc=', max([abs(r.get('r_eff', r['r']) - r['r']) for r in results] or [0.0]),
                    'first=', results[0].get('r'), results[0].get('r_eff'),
                    'vfw=', results[0].get('v_fw')
                )
            mond_ok = has_mond_components(rot)
            mond_cfg = mond_settings_for(name, preset, rot)

            for res, row in zip(results, rot['rows']):
                res['v_mond'] = mond_velocity(row, **mond_cfg) if mond_ok else None
            fw = model_metrics(results, 'v_fw', k=0)
            mond = model_metrics(results, 'v_mond', k=0) if mond_ok else model_metrics([], 'v_mond')
            newt = model_metrics(results, 'v_n', k=1)
            edge = edge_geometry(preset)

            row_out = {
                'name': name,
                'N': fw['n'],
                'rMax_kpc': rmax,
                'amp': preset.get('amp'),
                'newtonAmp': preset.get('newtonAmp'),
                'rms_fw': fw['rms'],
                'rel_rms_fw': fw['rel_rms'],
                'sigma_rms_fw': fw['sigma_rms'],
                'chi2nu_fw': fw['chi2nu'],
                'max_sigma_fw': fw['max_sigma'],
                'frac_fw_within_1sigma': fw['frac_within_1sigma'],
                'frac_fw_within_2sigma': fw['frac_within_2sigma'],
                'frac_fw_within_3sigma': fw['frac_within_3sigma'],
                'rms_mond': mond['rms'],
                'rel_rms_mond': mond['rel_rms'],
                'sigma_rms_mond': mond['sigma_rms'],
                'chi2nu_mond': mond['chi2nu'],
                'max_sigma_mond': mond['max_sigma'],
                'frac_mond_within_1sigma': mond['frac_within_1sigma'],
                'frac_mond_within_2sigma': mond['frac_within_2sigma'],
                'frac_mond_within_3sigma': mond['frac_within_3sigma'],
                'rms_newton': newt['rms'],
                'rel_rms_newton': newt['rel_rms'],
                'sigma_rms_newton': newt['sigma_rms'],
                'chi2nu_newton': newt['chi2nu'],
                'max_sigma_newton': newt['max_sigma'],
                'has_mond_components': mond_ok,
                'has_bulge_component': has_bulge_component(rot),
                **edge,
            }

            mass_total_msun = total_mass_msun(preset, rmax)
            row_out.update({
                "m_total_msun": mass_total_msun,
                "log10_m_total_msun": math.log10(mass_total_msun) if mass_total_msun and mass_total_msun > 0 else None,
            })

            r_outer = max(float(r["r"]) for r in rot["rows"])
            m_outer = enclosed_mass_msun(preset, rmax, r_outer)

            row_out.update({
                "m_outer_msun": m_outer,
                "m_outer_frac": (m_outer / mass_total_msun) if mass_total_msun and m_outer else None,
            })
            row_out.update(component_split_metrics(rot, mond_cfg['disk_ml'], mond_cfg['bulge_ml'], m_outer))
            m_bary_outer = row_out.get('m_bary_outer_msun')
            row_out.update({
                "m_total_to_bary_outer_ratio": (mass_total_msun / m_bary_outer) if mass_total_msun and m_bary_outer and m_bary_outer > 0 else None,
                "log10_m_outer_msun": safe_log10(m_outer),
                "log10_m_bary_outer_msun": safe_log10(m_bary_outer),
            })

            remap_on = bool(preset.get('remapOn') and preset.get('remapDelta', 0) > 0 and preset.get('remapRc', 0) > 0)
            n_remapped = sum(1 for r in results if r.get('remapped'))
            max_remap_kpc = max([abs(r.get('r_eff', r.get('r', 0)) - r.get('r', 0)) for r in results] or [0.0])
            row_out.update({
                'mond_disk_ml': mond_cfg['disk_ml'],
                'mond_bulge_ml': mond_cfg['bulge_ml'],
                'mond_g_dagger_m_s2': mond_cfg['g_dagger_m_s2'],
            })
            row_out.update({
                'remap_on': remap_on,
                'remap_delta': preset.get('remapDelta'),
                'remap_rc': preset.get('remapRc'),
                'n_remapped': n_remapped,
                'max_remap_kpc': max_remap_kpc,
            })

            row_out['delta_sigma_mond_minus_fw'] = (row_out['sigma_rms_mond'] - row_out['sigma_rms_fw']) if row_out['sigma_rms_mond'] is not None else None
            row_out['winner_by_sigma'] = winner_by_sigma(row_out)
            rows_out.append(row_out)
            radial_rows_out.extend(radial_component_rows(name, preset, rot, rmax, mond_cfg['disk_ml'], mond_cfg['bulge_ml']))
        except Exception as e:
            print( e )
            skipped.append((name, str(e)))


    fieldnames = [
        'name','N','rMax_kpc','amp','newtonAmp',
        'rms_fw','rel_rms_fw','sigma_rms_fw','chi2nu_fw','max_sigma_fw','frac_fw_within_1sigma','frac_fw_within_2sigma','frac_fw_within_3sigma',
        'rms_mond','rel_rms_mond','sigma_rms_mond','chi2nu_mond','max_sigma_mond','frac_mond_within_1sigma','frac_mond_within_2sigma','frac_mond_within_3sigma',
        'rms_newton','rel_rms_newton','sigma_rms_newton','chi2nu_newton','max_sigma_newton',
        'delta_sigma_mond_minus_fw','winner_by_sigma',
        'rho0','rho1','rho2','rho3','rho4','r1','r2','r3','r4','r5','edge_width_pct','outer_extension_pct','edge_bounded_1pct','edge_bounded_5pct','edge_bounded_10pct',
        'has_mond_components','has_bulge_component',
        "m_total_msun", "log10_m_total_msun",
        "m_outer_msun", "m_outer_frac",
        "m_bary_outer_msun", "m_gas_outer_msun", "m_disk_outer_msun", "m_bulge_outer_msun",
        "fit_to_bary_outer_ratio", "m_total_to_bary_outer_ratio", "log10_m_outer_msun", "log10_m_bary_outer_msun",
        "gas_outer_frac", "disk_outer_frac", "bulge_outer_frac", "compact_outer_frac", "compact_to_gas_outer_ratio",
        "sb_disk_peak", "sb_bulge_peak", "sb_total_peak", "sb_total_median",
        "outer_vgas", "outer_vdisk", "outer_vbulge",
        'remap_on','remap_delta','remap_rc','n_remapped','max_remap_kpc',
        'mond_disk_ml','mond_bulge_ml','mond_g_dagger_m_s2',
    ]
    csv_path = os.path.join(OUT_DIR, '_aggregate_model_comparison.csv')
    with open(csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows_out:
            w.writerow({k: fmt(r.get(k), 5 if 'frac' in k or 'rel' in k else 3) for k in fieldnames})

    radial_fieldnames = [
        'name','r_kpc','x_obs',
        'm_fit_msun','m_bary_msun','m_gas_msun','m_disk_msun','m_bulge_msun',
        'fit_to_bary_ratio',
        'gas_frac','disk_frac','bulge_frac','compact_frac',
        'sb_disk','sb_bulge',
        'v_obs','v_gas','v_disk','v_bulge',
    ]
    radial_csv_path = os.path.join(OUT_DIR, '_aggregate_radial_component_profile.csv')
    with open(radial_csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=radial_fieldnames)
        w.writeheader()
        for r in radial_rows_out:
            w.writerow({k: fmt(r.get(k), 5 if 'frac' in k or k == 'x_obs' else 3) for k in radial_fieldnames})

    radial_bins = radial_bin_summary(radial_rows_out)
    radial_bin_fieldnames = [
        'x_lo','x_hi','x_mid','n',
        'median_fit_to_bary_ratio','median_gas_frac','median_compact_frac','median_sb_total',
    ]
    radial_bins_csv_path = os.path.join(OUT_DIR, '_aggregate_radial_component_bins.csv')
    with open(radial_bins_csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=radial_bin_fieldnames)
        w.writeheader()
        for r in radial_bins:
            w.writerow({k: fmt(r.get(k), 5 if 'frac' in k or k.startswith('x_') else 3) for k in radial_bin_fieldnames})

    payload = {
        'settings': {
            'mond_mode': 'fixed_global_reference',
            'disk_ml': DISK_ML,
            'bulge_ml': BULGE_ML,
            'default_g_dagger_m_s2': G_DAGGER_M_S2,
            'g_dagger_m_s2': G_DAGGER_M_S2,
            'data_dir': DATA_DIR,
        },
        'summary': summarize(rows_out),
        'rows': rows_out,
        'radial_summary_bins': radial_bins,
        'skipped': skipped,
    }
    json_path = os.path.join(OUT_DIR, '_aggregate_model_comparison.json')
    with open(json_path, 'w') as f:
        json.dump(payload, f, indent=2)

    svg_hist_edge(rows_out, os.path.join(OUT_DIR, '_aggregate_edge_bounded.svg'))
    svg_fw_vs_mond(rows_out, os.path.join(OUT_DIR, '_aggregate_framework_vs_mond.svg'))
    svg_component_split(rows_out, os.path.join(OUT_DIR, '_aggregate_component_split.svg'))
    svg_component_matrix(rows_out, os.path.join(OUT_DIR, '_aggregate_component_matrix.svg'))
    svg_mass_comparison(rows_out, os.path.join(OUT_DIR, '_aggregate_mass_comparison.svg'))
    svg_radial_component_profile(radial_rows_out, radial_bins, os.path.join(OUT_DIR, '_aggregate_radial_component_profile.svg'))

    print(f'Wrote {len(rows_out)} galaxy rows')
    print(f'CSV:  {csv_path}')
    print(f'CSV:  {radial_csv_path}')
    print(f'CSV:  {radial_bins_csv_path}')
    print(f'JSON: {json_path}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_edge_bounded.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_framework_vs_mond.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_component_split.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_component_matrix.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_mass_comparison.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_radial_component_profile.svg")}')
    if skipped:
        print(f'Skipped {len(skipped)} entries')


if __name__ == '__main__':
    main()
