"""SVG plots: velocity + mass-profile overlay, with face-on galaxy preview on the right.
- Σ recolored solid orange (visually distinct from ρ red and framework-fit blue).
- Face-on preview: black square with circular radial gradient, brightness from ρ(r).
"""
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

def make_svg(name, width=890, height=420):
    """Two-area layout:
       Main panel (left ~680px): rotation curve + ρ + Σ overlay
       Preview (right ~170px):  black square with face-on radial luminance from ρ
    """
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
    rmax_plot = rMax * P['r5'] * 1.05
    vmax = max(vs_all) * 1.10
    vmin = 0
    MASS_PEAK_FRAC = 2/3
    
    # Geometry: main plot on left, preview square on right
    preview_size = 170   # square preview area on right
    preview_pad = 18     # gap between plot and preview
    main_margin_r = 85   # right axis labels still need room inside main plot
    
    margin = {'l': 70, 'r': main_margin_r + preview_size + preview_pad, 't': 55, 'b': 55}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    
    def x_px(r): return margin['l'] + r / rmax_plot * pw
    def y_v(v): return margin['t'] + (1 - v / vmax) * ph
    
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
    
    rho_peak = float(rho_vals.max()) if rho_vals.max() > 0 else 1.0
    sig_peak = float(sig_vals.max()) if sig_vals.max() > 0 else 1.0
    
    has_phys = bool(P.get('newtonAmp', 0))
    if has_phys:
        rho_to_msun_pc2 = P['newtonAmp']**2 / (G_ASTRO * rMax) / 1e6
        rho_peak_msun = rho_peak * rho_to_msun_pc2
    else:
        rho_peak_msun = None
    
    def y_mass(frac): return margin['t'] + (1 - frac) * ph
    
    svg = []
    svg.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">')
    svg.append('<style>')
    svg.append('  .ax { stroke: #333; stroke-width: 1; fill: none; }')
    svg.append('  .grid { stroke: #ddd; stroke-width: 0.5; fill: none; }')
    svg.append('  .lbl { fill: #333; }')
    svg.append('  .lbl-l { fill: #0066cc; }')
    svg.append('  .lbl-r { fill: #b03030; }')
    svg.append('  .lbl-s { fill: #cc7000; }')
    svg.append('  .obs { fill: #222; }')
    svg.append('  .err { stroke: #555; stroke-width: 0.8; fill: none; }')
    svg.append('  .fw { stroke: #0066cc; stroke-width: 2.2; fill: none; }')
    svg.append('  .nt { stroke: #cc6600; stroke-width: 1.6; fill: none; stroke-dasharray: 5,3; }')
    svg.append('  .rho { stroke: #b03030; stroke-width: 2.0; fill: none; }')
    svg.append('  .sig { stroke: #cc7000; stroke-width: 1.8; fill: none; }')
    svg.append('  .title { fill: #111; font-size: 16px; font-weight: 600; }')
    svg.append('  .subtitle { fill: #555; font-size: 11px; }')
    svg.append('  .legend { font-size: 11px; }')
    svg.append('  .preview-bg { fill: #000; }')
    svg.append('  .preview-lbl { fill: #888; font-size: 10px; }')
    svg.append('</style>')
    
    # Title
    svg.append(f'<text x="{margin["l"] + pw/2}" y="22" text-anchor="middle" class="title">{name}</text>')
    sub = f'rMax={rMax:.1f} kpc, N={q["N"]}, RMS={q["rms"]:.1f} km/s ({rel_rms*100:.1f}%), amp={P["amp"]:.0f}'
    svg.append(f'<text x="{margin["l"] + pw/2}" y="38" text-anchor="middle" class="subtitle">{sub}</text>')
    
    # === Main panel: axes ===
    for i in range(6):
        v = vmax * i / 5
        y = y_v(v)
        svg.append(f'<line x1="{margin["l"]}" y1="{y}" x2="{margin["l"]+pw}" y2="{y}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-6}" y="{y+4}" text-anchor="end" class="lbl-l">{v:.0f}</text>')
    
    # Right axis (mass) — ticks 0..1 with peak at MASS_PEAK_FRAC
    for i in range(6):
        frac_val = i / 5
        y = y_mass(frac_val * MASS_PEAK_FRAC)
        svg.append(f'<text x="{margin["l"]+pw+6}" y="{y+4}" text-anchor="start" class="lbl-r">{frac_val:.1f}</text>')
    
    for i in range(7):
        r = rmax_plot * i / 6
        x = x_px(r)
        svg.append(f'<line x1="{x}" y1="{margin["t"]}" x2="{x}" y2="{margin["t"]+ph}" class="grid"/>')
        svg.append(f'<text x="{x}" y="{margin["t"]+ph+16}" text-anchor="middle" class="lbl">{r:.1f}</text>')
    
    # Axis labels
    svg.append(f'<text x="{margin["l"] + pw/2}" y="{margin["t"]+ph+32}" text-anchor="middle" class="lbl">radius (kpc)</text>')
    svg.append(f'<text x="16" y="{margin["t"] + ph/2}" text-anchor="middle" class="lbl-l" transform="rotate(-90, 16, {margin["t"] + ph/2})">velocity (km/s)</text>')
    svg.append(f'<text x="{margin["l"]+pw+44}" y="{margin["t"] + ph/2}" text-anchor="middle" class="lbl-r" transform="rotate(-90, {margin["l"]+pw+44}, {margin["t"] + ph/2})">mass profile (normalized to peak)</text>')
    
    # Plot box
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    
    # === Mass curves (background) ===
    rho_norm = rho_vals / rho_peak * MASS_PEAK_FRAC
    sig_norm = sig_vals / sig_peak * MASS_PEAK_FRAC
    
    def path_pts(pts): return 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x,y in pts)
    
    rho_pts = [(x_px(r), y_mass(rho_norm[i])) for i, r in enumerate(rs_grid)]
    svg.append(f'<path d="{path_pts(rho_pts)}" class="rho"/>')
    sig_pts = [(x_px(r), y_mass(sig_norm[i])) for i, r in enumerate(rs_grid)]
    svg.append(f'<path d="{path_pts(sig_pts)}" class="sig"/>')
    
    # === Velocity curves ===
    if results[0]['v_n'] is not None:
        nt_pts = []
        for i in range(1, 101):
            r = rmax_plot * i / 100
            x = r / rMax
            v_n = P.get('newtonAmp', 0) * shape_n_np(x, P)
            nt_pts.append((x_px(r), y_v(v_n)))
        svg.append(f'<path d="{path_pts(nt_pts)}" class="nt"/>')
    
    fw_pts = []
    for i in range(1, 121):
        r = rmax_plot * i / 120
        x = r / rMax
        v_fw = P['amp'] * shape_fw_np(x, cache)
        fw_pts.append((x_px(r), y_v(v_fw)))
    svg.append(f'<path d="{path_pts(fw_pts)}" class="fw"/>')
    
    # Observed points
    for r in results:
        cx = x_px(r['r']); cy = y_v(r['v_obs'])
        y_top = y_v(r['v_obs'] + r['err_v']); y_bot = y_v(r['v_obs'] - r['err_v'])
        svg.append(f'<line x1="{cx}" y1="{y_top}" x2="{cx}" y2="{y_bot}" class="err"/>')
        svg.append(f'<line x1="{cx-3}" y1="{y_top}" x2="{cx+3}" y2="{y_top}" class="err"/>')
        svg.append(f'<line x1="{cx-3}" y1="{y_bot}" x2="{cx+3}" y2="{y_bot}" class="err"/>')
        svg.append(f'<circle cx="{cx}" cy="{cy}" r="2.5" class="obs"/>')
    
    # === Legends ===
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
    
    # Right legend (mass) — moved closer to right axis since preview is further right
    rlx = margin['l'] + pw - 145; rly = margin['t'] + 14
    svg.append('<g class="legend">')
    svg.append(f'<line x1="{rlx}" y1="{rly}" x2="{rlx+24}" y2="{rly}" class="rho"/>')
    svg.append(f'<text x="{rlx+30}" y="{rly+4}" class="lbl-r">ρ(r) raw</text>')
    svg.append(f'<line x1="{rlx}" y1="{rly+18}" x2="{rlx+24}" y2="{rly+18}" class="sig"/>')
    svg.append(f'<text x="{rlx+30}" y="{rly+22}" class="lbl-s">Σ(r) cumulative</text>')
    if rho_peak_msun is not None:
        svg.append(f'<text x="{rlx}" y="{rly+44}" class="lbl-r">ρ peak: {rho_peak_msun:.0f} M☉/pc²</text>')
    else:
        svg.append(f'<text x="{rlx}" y="{rly+44}" class="lbl-r">ρ peak: {rho_peak:.2f} (raw)</text>')
    svg.append('</g>')
    
    # === FACE-ON PREVIEW (right of main plot) ===
    # Square box with radial gradient. Brightness scale is absolute in M☉/pc² so that low-mass
    # galaxies look genuinely dim and high-mass galaxies look bright when viewed side-by-side:
    #   ρ_phys ≥ 800 M☉/pc² → 100% (white, saturated)
    #   ρ_phys = 100 M☉/pc² → 25%
    #   ρ_phys = 0          → 0%   (black)
    # Linear interpolation in the two segments [0,100] and [100,800].
    px_x = margin['l'] + pw + preview_pad + 70
    py_y = margin['t']
    psize = preview_size
    svg.append(f'<rect x="{px_x}" y="{py_y}" width="{psize}" height="{psize}" class="preview-bg"/>')
    
    def brightness(rho_phys_msun_pc2):
        """Map physical surface density (M☉/pc²) to grayscale brightness (0..1)."""
        if rho_phys_msun_pc2 <= 0: return 0.0
        if rho_phys_msun_pc2 >= 800: return 1.0
        if rho_phys_msun_pc2 <= 100:
            return 0.25 * rho_phys_msun_pc2 / 100.0
        # 100..800 maps to 25%..100%
        return 0.25 + 0.75 * (rho_phys_msun_pc2 - 100.0) / (800.0 - 100.0)
    
    Nstops = 32
    gid = f'g_{name.replace("-","_").replace("/","_").replace(".","_")}'
    stops = []
    for i in range(Nstops + 1):
        frac = i / Nstops
        x_norm = frac * P['r5']
        rv = float(rho_arr(np.array([x_norm]), P)[0])
        # Convert to physical surface density if newtonAmp is present, else use raw (very dim)
        if has_phys:
            rho_msun = rv * rho_to_msun_pc2
        else:
            rho_msun = rv  # raw units — will be very dim
        bright_norm = brightness(rho_msun)
        bright = max(0, min(255, int(bright_norm * 255)))
        stops.append(f'<stop offset="{frac:.4f}" stop-color="rgb({bright},{bright},{bright})"/>')
    
    svg.append(f'<defs><radialGradient id="{gid}" cx="0.5" cy="0.5" r="0.5">')
    for s in stops:
        svg.append('  ' + s)
    svg.append('</radialGradient></defs>')
    cx_p = px_x + psize/2; cy_p = py_y + psize/2
    radius_p = psize/2 - 4
    svg.append(f'<circle cx="{cx_p}" cy="{cy_p}" r="{radius_p}" fill="url(#{gid})"/>')
    
    svg.append(f'<text x="{px_x + psize/2}" y="{py_y - 6}" text-anchor="middle" class="preview-lbl">face-on luminance from ρ(r)</text>')
    svg.append(f'<text x="{px_x + psize/2}" y="{py_y + psize + 14}" text-anchor="middle" class="preview-lbl">edge at r = {P["r5"]*rMax:.1f} kpc</text>')
    
    svg.append('</svg>')
    return '\n'.join(svg)


if __name__ == '__main__':
    samples = ['NGC3198', 'NGC2403', 'DDO154', 'MilkyWay', 'NGC2841', 'IC2574', 'UGC02885', 'F583-1', 'M31', 'NGC2998']
    outdir = os.environ.get('GALAXY_OUT_DIR', './galaxy_svgs')
    os.makedirs(outdir, exist_ok=True)
    for name in samples:
        svg = make_svg(name)
        if svg:
            with open(f'{outdir}/{name}.svg', 'w') as f:
                f.write(svg)
            print(f"  wrote {outdir}/{name}.svg")
