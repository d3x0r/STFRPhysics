"""Combined single-panel: velocity on left axis, mass (ρ raw + Σ smoothed) on right axis, both normalized."""
import math
import sys
import os
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse_presets import load_presets, load_rotmod
from galaxy_lib import compute_galaxy, fit_quality, build_field_cache_np, shape_fw_np, shape_n_np, rho_arr

DATA_DIR = os.environ.get('GALAXY_DATA_DIR', '.')
presets = load_presets(os.path.join(DATA_DIR, 'galaxy_presets.mjs'))
rotmod = load_rotmod(os.path.join(DATA_DIR, 'rotmod_ltg_data.mjs'))
rotmod_by_name = {g['name']: g for g in rotmod}

G_ASTRO = 4.301e-6

def make_svg(name, width=720, height=420):
    if name not in presets or name not in rotmod_by_name:
        return None
    results, rMax = compute_galaxy(name, presets[name], rotmod_by_name[name])
    q = fit_quality(results)
    v_obs_mean = sum(r['v_obs'] for r in results) / max(len(results), 1)
    rel_rms = q['rms'] / max(1, v_obs_mean)
    P = presets[name]
    
    # Plot ranges
    rs = [r['r'] for r in results]
    vs_all = []
    for r in results:
        vs_all.extend([r['v_obs'] + r['err_v'], r['v_obs'] - r['err_v'], r['v_fw']])
        if r['v_n']: vs_all.append(r['v_n'])
    # X range follows the mass profile extent: rMax * r5 * 1.05
    rmax_plot = rMax * P['r5'] * 1.05
    vmax = max(vs_all) * 1.10
    vmin = 0
    # Mass curves scaled so their peak sits at MASS_PEAK_FRAC of the panel height
    MASS_PEAK_FRAC = 2/3
    
    # Layout: more space on right for the mass legend
    margin = {'l': 70, 'r': 85, 't': 55, 'b': 55}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    
    def x_px(r): return margin['l'] + r / rmax_plot * pw
    def y_v(v): return margin['t'] + (1 - (v - vmin) / (vmax - vmin)) * ph
    
    # Mass profile data
    cache = build_field_cache_np(P)
    Ngrid = 220
    rs_grid = np.linspace(0, rmax_plot, Ngrid)
    xs_grid = rs_grid / rMax
    rho_vals = rho_arr(xs_grid, P)
    
    def sig_at(x):
        if x <= 0: return cache['sig'][0]
        if x >= cache['xmax']: return cache['sig'][-1]
        f = x / cache['xmax'] * (cache['N'] - 1)
        i = int(f); t = f - i
        return cache['sig'][i] * (1 - t) + cache['sig'][i+1] * t
    sig_vals = np.array([sig_at(x) for x in xs_grid])
    
    # Convert ρ peak to M☉/pc² (right axis label uses physical units when newtonAmp present)
    rho_peak = float(rho_vals.max()) if rho_vals.max() > 0 else 1.0
    sig_peak = float(sig_vals.max()) if sig_vals.max() > 0 else 1.0
    has_phys = bool(P.get('newtonAmp', 0))
    if has_phys:
        rho_to_msun_pc2 = P['newtonAmp']**2 / (G_ASTRO * rMax) / 1e6
        rho_peak_msun = rho_peak * rho_to_msun_pc2
    else:
        rho_peak_msun = None
    
    # Normalize for plotting; both peak at MASS_PEAK_FRAC fraction of panel
    rho_norm = rho_vals / rho_peak * MASS_PEAK_FRAC
    sig_norm = sig_vals / sig_peak * MASS_PEAK_FRAC
    
    def y_mass(frac): return margin['t'] + (1 - frac) * ph  # 0..1 maps to bottom..top
    
    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">')
    svg.append('<style>')
    svg.append('  .ax { stroke: #333; stroke-width: 1; fill: none; }')
    svg.append('  .grid { stroke: #ddd; stroke-width: 0.5; fill: none; }')
    svg.append('  .lbl { fill: #333; }')
    svg.append('  .lbl-l { fill: #0066cc; }')
    svg.append('  .lbl-r { fill: #b03030; }')
    svg.append('  .obs { fill: #222; }')
    svg.append('  .err { stroke: #555; stroke-width: 0.8; fill: none; }')
    svg.append('  .fw { stroke: #0066cc; stroke-width: 2.2; fill: none; }')
    svg.append('  .nt { stroke: #cc6600; stroke-width: 1.6; fill: none; stroke-dasharray: 5,3; }')
    svg.append('  .rho { stroke: #b03030; stroke-width: 2.0; fill: none; }')
    svg.append('  .sig { stroke: #b03030; stroke-width: 1.6; fill: none; stroke-dasharray: 4,2; opacity: 0.85; }')
    svg.append('  .title { fill: #111; font-size: 16px; font-weight: 600; }')
    svg.append('  .subtitle { fill: #555; font-size: 11px; }')
    svg.append('  .legend { font-size: 11px; }')
    svg.append('</style>')
    
    # Title
    svg.append(f'<text x="{width/2}" y="22" text-anchor="middle" class="title">{name}</text>')
    sub = f'rMax={rMax:.1f} kpc, N={q["N"]}, RMS={q["rms"]:.1f} km/s ({rel_rms*100:.1f}%), amp={P["amp"]:.0f}'
    svg.append(f'<text x="{width/2}" y="38" text-anchor="middle" class="subtitle">{sub}</text>')
    
    # Left axis (velocity)
    for i in range(6):
        v = vmin + (vmax - vmin) * i / 5
        y = y_v(v)
        svg.append(f'<line x1="{margin["l"]}" y1="{y}" x2="{width-margin["r"]}" y2="{y}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-6}" y="{y+4}" text-anchor="end" class="lbl-l">{v:.0f}</text>')
    
    # Right axis (normalized mass) — ticks 0..1 with 1 at the curve peak (MASS_PEAK_FRAC of panel)
    for i in range(6):
        frac_val = i / 5  # 0..1 in mass units
        y = y_mass(frac_val * MASS_PEAK_FRAC)
        svg.append(f'<text x="{width-margin["r"]+6}" y="{y+4}" text-anchor="start" class="lbl-r">{frac_val:.1f}</text>')
    
    # X ticks
    n_xt = 6
    for i in range(n_xt+1):
        r = rmax_plot * i / n_xt
        x = x_px(r)
        svg.append(f'<line x1="{x}" y1="{margin["t"]}" x2="{x}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<text x="{x}" y="{height-margin["b"]+16}" text-anchor="middle" class="lbl">{r:.1f}</text>')
    
    # Axis labels
    svg.append(f'<text x="{margin["l"] + pw/2}" y="{height-12}" text-anchor="middle" class="lbl">radius (kpc)</text>')
    svg.append(f'<text x="16" y="{margin["t"] + ph/2}" text-anchor="middle" class="lbl-l" transform="rotate(-90, 16, {margin["t"] + ph/2})">velocity (km/s)</text>')
    svg.append(f'<text x="{width-16}" y="{margin["t"] + ph/2}" text-anchor="middle" class="lbl-r" transform="rotate(-90, {width-16}, {margin["t"] + ph/2})">mass profile (normalized to peak)</text>')
    
    # Axis box
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    
    # === Mass curves (drawn first so velocity curves overlay) ===
    rho_pts = [(x_px(r), y_mass(rho_norm[i])) for i, r in enumerate(rs_grid)]
    rho_path = 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x,y in rho_pts)
    svg.append(f'<path d="{rho_path}" class="rho"/>')
    
    sig_pts = [(x_px(r), y_mass(sig_norm[i])) for i, r in enumerate(rs_grid)]
    sig_path = 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x,y in sig_pts)
    svg.append(f'<path d="{sig_path}" class="sig"/>')
    
    # === Velocity curves ===
    if results[0]['v_n'] is not None:
        nt_pts = []
        for i in range(1, 101):
            r = rmax_plot * i / 100
            x = r / rMax
            v_n = P.get('newtonAmp', 0) * shape_n_np(x, P)
            nt_pts.append((x_px(r), y_v(v_n)))
        nt_path = 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x,y in nt_pts)
        svg.append(f'<path d="{nt_path}" class="nt"/>')
    
    fw_pts = []
    for i in range(1, 121):
        r = rmax_plot * i / 120
        x = r / rMax
        v_fw = P['amp'] * shape_fw_np(x, cache)
        fw_pts.append((x_px(r), y_v(v_fw)))
    fw_path = 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x,y in fw_pts)
    svg.append(f'<path d="{fw_path}" class="fw"/>')
    
    for r in results:
        cx = x_px(r['r']); cy = y_v(r['v_obs'])
        y_top = y_v(r['v_obs'] + r['err_v']); y_bot = y_v(r['v_obs'] - r['err_v'])
        svg.append(f'<line x1="{cx}" y1="{y_top}" x2="{cx}" y2="{y_bot}" class="err"/>')
        svg.append(f'<line x1="{cx-3}" y1="{y_top}" x2="{cx+3}" y2="{y_top}" class="err"/>')
        svg.append(f'<line x1="{cx-3}" y1="{y_bot}" x2="{cx+3}" y2="{y_bot}" class="err"/>')
        svg.append(f'<circle cx="{cx}" cy="{cy}" r="2.5" class="obs"/>')
    
    # === Left legend (velocity) ===
    lx = margin['l'] + 12; ly = margin['t'] + 14
    svg.append('<g class="legend">')
    svg.append(f'<line x1="{lx}" y1="{ly}" x2="{lx+24}" y2="{ly}" class="fw"/>')
    svg.append(f'<text x="{lx+30}" y="{ly+4}" class="lbl-l">framework fit</text>')
    if results[0]['v_n'] is not None:
        svg.append(f'<line x1="{lx}" y1="{ly+18}" x2="{lx+24}" y2="{ly+18}" class="nt"/>')
        svg.append(f'<text x="{lx+30}" y="{ly+22}" class="lbl-l">Newtonian (no halo)</text>')
    svg.append(f'<circle cx="{lx+12}" cy="{ly+36}" r="2.5" class="obs"/>')
    svg.append(f'<text x="{lx+30}" y="{ly+40}" class="lbl">observed V±err</text>')
    svg.append('</g>')
    
    # === Right legend (mass) — top-right of plot area ===
    rlx = width - margin['r'] - 175; rly = margin['t'] + 14
    svg.append('<g class="legend">')
    svg.append(f'<line x1="{rlx}" y1="{rly}" x2="{rlx+24}" y2="{rly}" class="rho"/>')
    svg.append(f'<text x="{rlx+30}" y="{rly+4}" class="lbl-r">ρ(r) raw</text>')
    svg.append(f'<line x1="{rlx}" y1="{rly+18}" x2="{rlx+24}" y2="{rly+18}" class="sig"/>')
    svg.append(f'<text x="{rlx+30}" y="{rly+22}" class="lbl-r">Σ(r) smoothed</text>')
    # Peak values footer
    if has_phys:
        svg.append(f'<text x="{rlx}" y="{rly+44}" class="lbl-r">ρ peak: {rho_peak_msun:.0f} M☉/pc²</text>')
    else:
        svg.append(f'<text x="{rlx}" y="{rly+44}" class="lbl-r">ρ peak: {rho_peak:.2f} (raw)</text>')
    svg.append('</g>')
    
    svg.append('</svg>')
    return '\n'.join(svg)


if __name__ == '__main__':
    # Render a handful of representative galaxies as a demo. To render all 177, use make_all_svgs_v3.py.
    samples = ['NGC3198', 'NGC2403', 'DDO154', 'MilkyWay', 'NGC2841', 'IC2574', 'UGC02885', 'F583-1']
    outdir = os.environ.get('GALAXY_OUT_DIR', './galaxy_svgs')
    os.makedirs(outdir, exist_ok=True)
    for name in samples:
        svg = make_svg(name)
        if svg:
            with open(f'{outdir}/{name}.svg', 'w') as f:
                f.write(svg)
            print(f"  wrote {outdir}/{name}.svg")
