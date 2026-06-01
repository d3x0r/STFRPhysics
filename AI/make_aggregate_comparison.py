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
from galaxy_lib import compute_galaxy, fit_quality, shape_n_np, get_rmax

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
        'r4': r4,
        'r5': r5,
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


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    presets = load_presets(os.path.join(DATA_DIR, 'galaxy_presets.mjs'))
    rotmod = load_rotmod(os.path.join(DATA_DIR, 'rotmod_ltg_data.mjs'))
    rotmod_by_name = {g['name']: g for g in rotmod}

    rows_out = []
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
        except Exception as e:
            print( e )
            skipped.append((name, str(e)))


    fieldnames = [
        'name','N','rMax_kpc','amp','newtonAmp',
        'rms_fw','rel_rms_fw','sigma_rms_fw','chi2nu_fw','max_sigma_fw','frac_fw_within_1sigma','frac_fw_within_2sigma','frac_fw_within_3sigma',
        'rms_mond','rel_rms_mond','sigma_rms_mond','chi2nu_mond','max_sigma_mond','frac_mond_within_1sigma','frac_mond_within_2sigma','frac_mond_within_3sigma',
        'rms_newton','rel_rms_newton','sigma_rms_newton','chi2nu_newton','max_sigma_newton',
        'delta_sigma_mond_minus_fw','winner_by_sigma',
        'r4','r5','edge_width_pct','outer_extension_pct','edge_bounded_1pct','edge_bounded_5pct','edge_bounded_10pct',
        'has_mond_components','has_bulge_component',
        'remap_on','remap_delta','remap_rc','n_remapped','max_remap_kpc',
        'mond_disk_ml','mond_bulge_ml','mond_g_dagger_m_s2',
    ]
    csv_path = os.path.join(OUT_DIR, '_aggregate_model_comparison.csv')
    with open(csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows_out:
            w.writerow({k: fmt(r.get(k), 5 if 'frac' in k or 'rel' in k else 3) for k in fieldnames})

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
        'skipped': skipped,
    }
    json_path = os.path.join(OUT_DIR, '_aggregate_model_comparison.json')
    with open(json_path, 'w') as f:
        json.dump(payload, f, indent=2)

    svg_hist_edge(rows_out, os.path.join(OUT_DIR, '_aggregate_edge_bounded.svg'))
    svg_fw_vs_mond(rows_out, os.path.join(OUT_DIR, '_aggregate_framework_vs_mond.svg'))

    print(f'Wrote {len(rows_out)} galaxy rows')
    print(f'CSV:  {csv_path}')
    print(f'JSON: {json_path}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_edge_bounded.svg")}')
    print(f'SVG:  {os.path.join(OUT_DIR, "_aggregate_framework_vs_mond.svg")}')
    if skipped:
        print(f'Skipped {len(skipped)} entries')


if __name__ == '__main__':
    main()
