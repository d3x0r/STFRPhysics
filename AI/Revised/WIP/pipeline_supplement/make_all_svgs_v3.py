"""Generate all 176 galaxies in the combined single-panel format + gallery index."""
import sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse_presets import load_presets, load_rotmod
from galaxy_lib import compute_galaxy, fit_quality
from make_svgs_v3 import make_svg

DATA_DIR = os.environ.get('GALAXY_DATA_DIR', '.')
presets = load_presets(os.path.join(DATA_DIR, 'galaxy_presets.mjs'))
rotmod = load_rotmod(os.path.join(DATA_DIR, 'rotmod_ltg_data.mjs'))
rotmod_by_name = {g['name']: g for g in rotmod}

outdir = os.environ.get('GALAXY_OUT_DIR', './galaxy_svgs')
os.makedirs(outdir, exist_ok=True)

t0 = time.time()
all_galaxies = []

# Quick total-mass helper (framework's Newtonian-equivalent total mass)
import math as _math
import numpy as _np
from galaxy_lib import rho_arr as _rho_arr
def _total_mass(P, rMax):
    if not P.get('newtonAmp'): return None
    G_ASTRO = 4.301e-6
    N = 600
    r5 = P['r5']
    xs = (_np.arange(N) + 0.5) / N * r5
    rho_vals = _rho_arr(xs, P)
    m_enc_norm = 2 * _math.pi * (rho_vals * xs * (r5/N)).sum()
    return P['newtonAmp']**2 * m_enc_norm * rMax / G_ASTRO

for name in sorted(presets.keys()):
    if name not in rotmod_by_name: continue
    try:
        results, rMax = compute_galaxy(name, presets[name], rotmod_by_name[name])
        q = fit_quality(results)
        v_obs_mean = sum(r['v_obs'] for r in results) / max(len(results), 1)
        rel = q['rms'] / max(1, v_obs_mean)
        svg = make_svg(name)
        safe = name.replace('/', '_')
        with open(f'{outdir}/{safe}.svg', 'w') as f:
            f.write(svg)
        m_total = _total_mass(presets[name], rMax)
        all_galaxies.append({
            'name': name, 'safe': safe, 'amp': presets[name]['amp'], 'rMax': rMax,
            'rms_abs': q['rms'], 'rms_rel': rel, 'N': q['N'],
            'v_obs_max': max(r['v_obs'] for r in results),
            'mass_total': m_total if m_total else 0,
            'high_amp': presets[name]['amp'] > 500,
        })
    except Exception as e:
        print(f"FAIL {name}: {e}")

print(f"Generated {len(all_galaxies)} SVGs in {time.time()-t0:.1f}s")

# Gallery
all_galaxies.sort(key=lambda g: g['rms_rel'])
p5 = sum(1 for g in all_galaxies if g['rms_rel'] < 0.05)
p10 = sum(1 for g in all_galaxies if g['rms_rel'] < 0.10)
p20 = sum(1 for g in all_galaxies if g['rms_rel'] < 0.20)
med = sorted([g['rms_rel'] for g in all_galaxies])[len(all_galaxies)//2]
high = sum(1 for g in all_galaxies if g['high_amp'])

html = ['<!DOCTYPE html>',
'<html lang="en"><head><meta charset="utf-8">',
'<title>Galaxy rotation curve fits</title>',
'<style>',
'body { font-family: sans-serif; max-width: 99vw; margin: 0 auto; padding: 20px; background: #f5f5f5; color: #222; }',
'h1 { font-size: 22px; }',
'.summary { background: white; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px; }',
'.summary p { margin: 6px 0; }',
'.controls { background: white; padding: 12px 18px; border-radius: 6px; margin-bottom: 20px; position: sticky; top: 0; z-index: 10; }',
'.controls label { margin-right: 18px; font-size: 14px; }',
'.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(460px, 1fr)); gap: 16px; }',
'.tile { background: white; border-radius: 6px; padding: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }',
'.tile h3 { margin: 4px 0; font-size: 14px; display: flex; justify-content: space-between; align-items: baseline; }',
'.tile h3 .rel { font-weight: normal; font-family: monospace; }',
'.tile.good h3 .rel { color: #0a7a30; }',
'.tile.fair h3 .rel { color: #b08000; }',
'.tile.poor h3 .rel { color: #b03030; }',
'.tile object { width: 100%; height: auto; display: block; }',
'.tile .flag { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 11px; margin-left: 6px; background: #ddd; color: #555; }',
'.tile .flag.high { background: #f8d39a; color: #7a4400; }',
'.hidden { display: none; }',
'</style></head><body>',
f'<h1>Galaxy rotation curve fits — {len(all_galaxies)} galaxies (SPARC + Milky Way + M31)</h1>',
'<div class="summary">',
f'<p><strong>Median relative RMS:</strong> {med*100:.2f}% &nbsp; &nbsp; '
f'<strong>&lt;5%:</strong> {p5}/{len(all_galaxies)} ({100*p5/len(all_galaxies):.0f}%) &nbsp; &nbsp; '
f'<strong>&lt;10%:</strong> {p10}/{len(all_galaxies)} ({100*p10/len(all_galaxies):.0f}%) &nbsp; &nbsp; '
f'<strong>&lt;20%:</strong> {p20}/{len(all_galaxies)} ({100*p20/len(all_galaxies):.0f}%)</p>',
f'<p>All fits use the displacement framework with no dark-matter halo. The "high-amp" flag (amp &gt; 500, {high} galaxies) marks fits the author identified as less reliable.</p>',
'<p>Each plot shows the rotation curve (left axis, velocity in km/s) and the mass profile (right axis, normalized to peak): ρ(r) solid red is the raw piecewise-linear occupancy from the gradient-control sliders, Σ(r) dashed red is the smoothed cumulative displacement field that drives the velocity response.</p>',
'</div>',
'<div class="controls">',
'<label>Sort: <select id="sortby">',
'<option value="rms">by RMS (best to worst)</option>',
'<option value="rms_rev">by RMS (worst to best)</option>',
'<option value="name">by name</option>',
'<option value="mass">by total mass (heaviest first)</option>',
'<option value="vmax">by V_max (biggest first)</option>',
'</select></label>',
'<label>Filter: <select id="filter">',
'<option value="all">all</option>',
'<option value="excellent">excellent (&lt;5%)</option>',
'<option value="good">good (5–10%)</option>',
'<option value="fair">fair (10–20%)</option>',
'<option value="poor">poor (&gt;20%)</option>',
'<option value="highamp">high-amp flagged</option>',
'</select></label>',
'<span id="count" style="color:#666"></span>',
'</div>',
'<div class="grid" id="grid">']

for g in all_galaxies:
    cls = 'good' if g['rms_rel'] < 0.05 else ('fair' if g['rms_rel'] < 0.20 else 'poor')
    flag = '<span class="flag high">amp&gt;500</span>' if g['high_amp'] else ''
    html.append(
        f'<div class="tile {cls}" data-name="{g["name"]}" data-rel="{g["rms_rel"]:.5f}" '
        f'data-vmax="{g["v_obs_max"]:.0f}" data-mass="{g["mass_total"]:.3e}" data-highamp="{int(g["high_amp"])}">'
        f'<h3>{g["name"]}{flag} <span class="rel">{g["rms_rel"]*100:.2f}%</span></h3>'
        f'<object data="{g["safe"]}.svg" type="image/svg+xml"></object>'
        f'</div>')

html.extend([
'</div>',
'<script>',
'const grid = document.getElementById("grid");',
'const tiles = Array.from(grid.children);',
'const count = document.getElementById("count");',
'function update() {',
'  const sortby = document.getElementById("sortby").value;',
'  const filter = document.getElementById("filter").value;',
'  let visible = tiles.slice();',
'  if (filter === "excellent") visible = visible.filter(t => +t.dataset.rel < 0.05);',
'  else if (filter === "good") visible = visible.filter(t => { const r = +t.dataset.rel; return r >= 0.05 && r < 0.10; });',
'  else if (filter === "fair") visible = visible.filter(t => { const r = +t.dataset.rel; return r >= 0.10 && r < 0.20; });',
'  else if (filter === "poor") visible = visible.filter(t => +t.dataset.rel >= 0.20);',
'  else if (filter === "highamp") visible = visible.filter(t => +t.dataset.highamp === 1);',
'  if (sortby === "rms") visible.sort((a,b) => +a.dataset.rel - +b.dataset.rel);',
'  else if (sortby === "rms_rev") visible.sort((a,b) => +b.dataset.rel - +a.dataset.rel);',
'  else if (sortby === "name") visible.sort((a,b) => a.dataset.name.localeCompare(b.dataset.name));',
'  else if (sortby === "mass") visible.sort((a,b) => +b.dataset.mass - +a.dataset.mass);',
'  else if (sortby === "vmax") visible.sort((a,b) => +b.dataset.vmax - +a.dataset.vmax);',
'  tiles.forEach(t => t.classList.add("hidden"));',
'  visible.forEach(t => { t.classList.remove("hidden"); grid.appendChild(t); });',
'  count.textContent = `showing ${visible.length} of ${tiles.length}`;',
'}',
'document.getElementById("sortby").addEventListener("change", update);',
'document.getElementById("filter").addEventListener("change", update);',
'update();',
'</script>',
'</body></html>'])

with open(f'{outdir}/index.html', 'w') as f:
    f.write('\n'.join(html))
print(f"Wrote gallery: {outdir}/index.html")

# (Optional: zip up outdir externally with `zip -r gallery.zip ./galaxy_svgs/`)
