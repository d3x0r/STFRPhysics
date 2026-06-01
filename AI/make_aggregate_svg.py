"""Aggregate plot: distribution of fit quality across SPARC + MW + M31."""
import json
import math
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse_presets import load_presets, load_rotmod
from galaxy_lib import compute_galaxy, fit_quality

DATA_DIR = os.environ.get('GALAXY_DATA_DIR', '.')
presets = load_presets(os.path.join(DATA_DIR, 'galaxy_presets.mjs'))
rotmod = load_rotmod(os.path.join(DATA_DIR, 'rotmod_ltg_data.mjs'))
rotmod_by_name = {g['name']: g for g in rotmod}

# Compute stats
stats = []
for name in presets:
    if name not in rotmod_by_name: continue
    try:
        results, rMax = compute_galaxy(name, presets[name], rotmod_by_name[name])
        #print( name, results, rMax );
        q = fit_quality(results)
        v_obs_mean = sum(r['v_obs'] for r in results) / max(len(results), 1)
        if q['rms']/ max(1, v_obs_mean) > 8 : print( name );
        stats.append({
            'name': name, 'amp': presets[name]['amp'],
            'rms_rel': q['rms'] / max(1, v_obs_mean),
            'rms_abs': q['rms'],
            'v_obs_max': max(r['v_obs'] for r in results),
            'high_amp': presets[name]['amp'] > 500,
        })
    except Exception as e:
        print( e )
        pass

# Make histogram SVG of rms_rel
def make_histogram_svg():




    width, height = 720, 460
    margin = {'l': 70, 'r': 30, 't': 60, 'b': 60}
    pw = width - margin['l'] - margin['r']
    ph = height - margin['t'] - margin['b']
    
    # Bin into 0-30% in 1% bins

    max_pct = 10.0
    bin_w = 0.25
    nbins = int(max_pct / bin_w)
    bins = [0] * nbins
    bins_low = [0] * nbins
    bins_high = [0] * nbins
    overflow = 0
    overflow_low = 0
    overflow_high = 0
    for s in stats:
        pct = s['rms_rel'] * 100
        if pct >= max_pct:
            overflow += 1
            if s['high_amp']:
                overflow_high += 1
            else:
                overflow_low += 1
            print('overflow', s['name'], pct)
            continue
        b = max(0, min(int(pct / bin_w), nbins - 1))
        if pct > 5:
            print(s['name'], b, pct)
        bins[b] += 1
        if s['high_amp']:
            bins_high[b] += 1
        else:
            bins_low[b] += 1
    max_count = max(bins + [overflow, 1])
    def x_px_pct(pct): return margin['l'] + pct / max_pct * pw
    def x_px_bin(b): return margin['l'] + b / nbins * pw
    def y_px(c): return margin['t'] + (1 - c / (max_count * 1.10)) * ph

  
    max_count = max(bins)
    
    def x_px(b): return margin['l'] + b / 30 * pw
    def y_px(c): return margin['t'] + (1 - c / (max_count * 1.10)) * ph
    
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}" font-family="sans-serif" font-size="12">']
    svg.append('<style>')
    svg.append('  .ax { stroke: #333; stroke-width: 1; fill: none; }')
    svg.append('  .grid { stroke: #ddd; stroke-width: 0.5; }')
    svg.append('  .lbl { fill: #333; }')
    svg.append('  .title { fill: #111; font-size: 17px; font-weight: 600; }')
    svg.append('  .subtitle { fill: #555; font-size: 12px; }')
    svg.append('  .bar-low { fill: #2a72c4; }')
    svg.append('  .bar-high { fill: #c47a2a; }')
    svg.append('  .ref { stroke: #b00; stroke-width: 1.4; stroke-dasharray: 4,3; fill: none; }')
    svg.append('  .reflbl { fill: #b00; font-size: 11px; font-weight: 600; }')
    svg.append('</style>')


    
    svg.append(f'<text x="{width/2}" y="26" text-anchor="middle" class="title">Framework fit quality across {len(stats)} galaxies (SPARC + Milky Way + M31)</text>')
    svg.append(f'<text x="{width/2}" y="44" text-anchor="middle" class="subtitle">Distribution of relative RMS, zoomed 0–10% with 0.25% bins</text>')
#    svg.append(f'<text x="{width/2}" y="44" text-anchor="middle" class="subtitle">Distribution of relative RMS (RMS / mean V_obs) per galaxy, no dark-matter halo</text>')
    
    # Axes
    for i in range(6):
        c = int(max_count * i / 5)
        y = y_px(c)
        svg.append(f'<line x1="{margin["l"]}" y1="{y}" x2="{width-margin["r"]}" y2="{y}" class="grid"/>')
        svg.append(f'<text x="{margin["l"]-6}" y="{y+4}" text-anchor="end" class="lbl">{c}</text>')

    for pct in range(0, int(max_pct) + 1, 1):
        x = x_px_pct(pct)
        svg.append(f'<line x1="{x}" y1="{margin["t"]}" x2="{x}" y2="{height-margin["b"]}" class="grid"/>')
        svg.append(f'<text x="{x}" y="{height-margin["b"]+16}" text-anchor="middle" class="lbl">{pct}%</text>')

#    for b in range(0, 31, 5):
#        x = x_px(b)
#        svg.append(f'<line x1="{x}" y1="{margin["t"]}" x2="{x}" y2="{height-margin["b"]}" class="grid"/>')
#        svg.append(f'<text x="{x}" y="{height-margin["b"]+16}" text-anchor="middle" class="lbl">{b}%</text>')
    
    svg.append(f'<text x="{margin["l"]+pw/2}" y="{height-12}" text-anchor="middle" class="lbl">relative RMS (RMS / &lt;V_obs&gt;), zoomed 0–10%</text>')
    svg.append(f'<text x="18" y="{margin["t"]+ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90, 18, {margin["t"]+ph/2})">number of galaxies</text>')
    
    # Stacked bars
    bw = pw / nbins
    for b in range(nbins):
        h_low = (bins_low[b] / (max_count * 1.10)) * ph
        h_high = (bins_high[b] / (max_count * 1.10)) * ph
        y0 = margin['t'] + ph - h_low
        x0 = margin['l'] + b * bw
        if bins_low[b] > 0:
            svg.append(f'<rect x="{x0+0.5}" y="{y0}" width="{max(0.5,bw-1)}" height="{h_low}" class="bar-low"/>')
        if bins_high[b] > 0:
            svg.append(f'<rect x="{x0+0.5}" y="{y0-h_high}" width="{max(0.5,bw-1)}" height="{h_high}" class="bar-high"/>') 

   
    # Median reference line
    rels = sorted([s['rms_rel']*100 for s in stats])
    median = rels[len(rels)//2]
    mx = x_px_pct(median)
    svg.append(f'<line x1="{mx}" y1="{margin["t"]}" x2="{mx}" y2="{height-margin["b"]}" class="ref"/>')
    svg.append(f'<text x="{mx+5}" y="{margin["t"]+12}" class="reflbl">median = {median:.1f}%</text>')

    #sorted_stats = sorted(stats, key=lambda s: -s['rms_rel'])
    #for s in sorted_stats[:10]:
    #    print(f"{s['name']}: rel_rms={s['rms_rel']*100:.2f}%, amp={s['amp']}")
    
    # Axis box
    svg.append(f'<rect x="{margin["l"]}" y="{margin["t"]}" width="{pw}" height="{ph}" class="ax"/>')
    
    # Legend
    lx = margin['l'] + pw - 200
    ly = margin['t'] + 12
    svg.append(f'<rect x="{lx}" y="{ly}" width="12" height="12" class="bar-low"/>')
    svg.append(f'<text x="{lx+18}" y="{ly+10}" class="lbl">amp &lt; 500 (n={sum(1 for s in stats if not s["high_amp"])})</text>')
    svg.append(f'<rect x="{lx}" y="{ly+18}" width="12" height="12" class="bar-high"/>')
    svg.append(f'<text x="{lx+18}" y="{ly+28}" class="lbl">amp &gt; 500 (n={sum(1 for s in stats if s["high_amp"])})</text>')
    
    # Bottom-right stats annotations
    nx, ny = margin['l'] + 12, margin['t'] + 12
    svg.append(f'<text x="{nx}" y="{ny+10}" class="lbl">N = {len(stats)} galaxies</text>')

    rng1 = 0.01
    rng2 = 0.02
    rng3 = 0.05

    p5  = sum(1 for s in stats if s['rms_rel'] < rng1)
    p10 = sum(1 for s in stats if s['rms_rel'] < rng2)
    p20 = sum(1 for s in stats if s['rms_rel'] < rng3)

    svg.append(f'<text x="{nx}" y="{ny+28}" class="lbl">&lt;{rng1*100:.0f}%:  {p5}/{len(stats)} ({100*p5/len(stats):.0f}%)</text>')
    svg.append(f'<text x="{nx}" y="{ny+44}" class="lbl">&lt;{rng2*100:.0f}%: {p10}/{len(stats)} ({100*p10/len(stats):.0f}%)</text>')
    svg.append(f'<text x="{nx}" y="{ny+60}" class="lbl">&lt;{rng3*100:.0f}%: {p20}/{len(stats)} ({100*p20/len(stats):.0f}%)</text>')
    svg.append(f'<text x="{nx}" y="{ny+76}" class="lbl">&gt;10%: {overflow}/{len(stats)}</text>')
    
    svg.append('</svg>')
    #print( '\n'.join(svg) )
    return '\n'.join(svg)

with open(os.path.join(os.environ.get('GALAXY_OUT_DIR', './galaxy_svgs'), '_aggregate_rms_distribution.svg'), 'w') as f:
    f.write(make_histogram_svg())
print(f"Wrote aggregate histogram")
