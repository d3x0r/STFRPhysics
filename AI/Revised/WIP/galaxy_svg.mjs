// Standalone galaxy SVG generator.
// Usage:
//   import { generateGalaxySvg } from './galaxy_svg.mjs';
//   import { GALAXY_PRESETS } from './galaxy_presets.mjs';
//   import { ROTMOD_GALAXIES } from './rotmod_ltg_data.mjs';
//   const svg = generateGalaxySvg('NGC3198', { presets: GALAXY_PRESETS, rotmod: ROTMOD_GALAXIES });
//
// Produces an SVG string matching the framework's gradient-fit visualization:
// velocity curve (framework + Newtonian baseline + observed V±err) on the left axis,
// mass profile (ρ raw piecewise-linear + Σ smoothed cumulative displacement) on the right axis.

const G_ASTRO = 4.301e-6; // kpc * (km/s)^2 / Msun

// --- Core math (ports of galaxy_lib.py) ---

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function enforceStructure(P) {
  // Mirror the simulator's enforceStructure(): hard radius clamps + monotonic ordering.
  // Returns a new object; does not mutate P.
  const Q = { ...P };
  Q.r1 = clamp(P.r1, 0.020, 0.180);
  Q.r2 = clamp(Math.max(Q.r1 + 0.012, P.r2), 0.050, 0.320);
  Q.r3 = clamp(Math.max(Q.r2 + 0.018, P.r3), 0.090, 0.700);
  Q.r4 = clamp(Math.max(Q.r3 + 0.040, P.r4), 0.650, 1.800);
  Q.r5 = clamp(Math.max(Q.r4 + 0.010, P.r5), 0.700, 2.200);
  return Q;
}

function rho(x, P) {
  P = enforceStructure(P);
  const { r1, r2, r3, r4, r5, rho0, rho1, rho2, rho3, rho4 } = P;
  if (x <= r1) return r1 > 0 ? rho0 + (rho1 - rho0) * (x / r1) : rho0;
  if (x <= r2) return r2 > r1 ? rho1 + (rho2 - rho1) * ((x - r1) / (r2 - r1)) : rho1;
  if (x <= r3) return r3 > r2 ? rho2 + (rho3 - rho2) * ((x - r2) / (r3 - r2)) : rho2;
  if (x <= r4) return r4 > r3 ? rho3 + (rho4 - rho3) * ((x - r3) / (r4 - r3)) : rho3;
  if (x <= r5) return r5 > r4 ? rho4 * (1 - (x - r4) / (r5 - r4)) : rho4;
  return 0;
}

function buildFieldCache(P, opts = {}) {
  const N = opts.N || 380;
  const NR = opts.NR || 168;
  const NA = opts.NA || 96;
  const xmax = Math.max(2.35, P.r5 * 1.15);
  const max_r = Math.max(P.r5, 0.05);
  const sup = P.support;
  const soft = Math.max(0.012, P.eps * 1.75, (max_r / NR) * 1.6);
  const soft2 = soft * soft;

  // Precompute angular grid
  const cosTh = new Float64Array(NA);
  const sinTh = new Float64Array(NA);
  for (let a = 0; a < NA; a++) {
    const th = (a + 0.5) / NA * 2 * Math.PI;
    cosTh[a] = Math.cos(th);
    sinTh[a] = Math.sin(th);
  }
  // Radial source samples
  const rr = new Float64Array(NR);
  const den = new Float64Array(NR);
  const d2 = new Float64Array(NR);
  const dr = max_r / NR;
  for (let i = 0; i < NR; i++) {
    rr[i] = (i + 0.5) / NR * max_r;
    den[i] = rho(rr[i], P);
    d2[i] = sup * den[i] * den[i];
  }

  // Build σ at N cache points
  const xs = new Float64Array(N);
  const sig = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1) * xmax;
    xs[i] = x;
    let total = 0;
    for (let j = 0; j < NR; j++) {
      if (den[j] <= 0) continue;
      let avg = 0;
      for (let a = 0; a < NA; a++) {
        const dx = x - rr[j] * cosTh[a];
        const dy = rr[j] * sinTh[a];
        avg += Math.sqrt(1 + d2[j] / (dx*dx + dy*dy + soft2)) - 1;
      }
      total += (avg / NA) * den[j] * rr[j] * dr * 2 * Math.PI;
    }
    sig[i] = total;
  }

  // Smooth with kernel [1,4,7,10,7,4,1]
  const kernel = [1, 4, 7, 10, 7, 4, 1];
  const ksum = kernel.reduce((a,b) => a+b, 0);
  const sm = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    let acc = 0;
    for (let k = 0; k < kernel.length; k++) {
      const j = Math.min(N - 1, Math.max(0, i + k - 3));
      acc += sig[j] * kernel[k];
    }
    sm[i] = acc / ksum;
  }

  // Gradient via 5-point central
  const grad = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const i0 = Math.max(0, i - 2);
    const i1 = Math.min(N - 1, i + 2);
    grad[i] = (sm[i1] - sm[i0]) / Math.max(xs[i1] - xs[i0], 1e-9);
  }

  return { xs, sig: sm, grad, xmax, N };
}

function interp(arr, x, cache) {
  if (x <= 0) return arr[0];
  if (x >= cache.xmax) return arr[cache.N - 1];
  const f = x / cache.xmax * (cache.N - 1);
  const i = Math.floor(f);
  const t = f - i;
  return arr[i] * (1 - t) + arr[i + 1] * t;
}

function shapeFW(x, cache) {
  const g = interp(cache.grad, x, cache);
  return Math.sqrt(Math.max(x * Math.max(0, -g), 0));
}

function mEnc(x, P, N = 120) {
  let m = 0;
  for (let i = 0; i < N; i++) {
    const r = (i + 0.5) / N * x;
    m += rho(r, P) * r * (x / N);
  }
  return 2 * Math.PI * m;
}

function shapeN(x, P) {
  return Math.sqrt(Math.max(mEnc(x, P) / Math.max(x, 1e-4), 0));
}

// --- SVG rendering ---

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

export function generateGalaxySvg(name, data, opts = {}) {
  const { presets, rotmod } = data;
  if (!presets[name]) throw new Error(`No preset for galaxy: ${name}`);
  // Shallow-clone so enforceStructure can normalize without mutating caller's preset
  const P = { ...presets[name] };
  const rotmodEntry = (Array.isArray(rotmod) ? rotmod : Object.values(rotmod)).find(g => g.name === name);
  if (!rotmodEntry) throw new Error(`No rotmod entry for galaxy: ${name}`);

  // Always use the rotmod rMax; any rMax field on the preset is leftover.
  const rMax = rotmodEntry.preset.rMax;
  const rows = rotmodEntry.rows;

  const width = opts.width || 890;
  const height = opts.height || 420;
  const massPeakFrac = opts.massPeakFrac || 2/3;
  const previewSize = 170;
  const previewPad = 18;

  // Cache field
  const cache = buildFieldCache(P);

  // Compute observed-fit results
  const results = rows.map(row => {
    const x = row.r / rMax;
    const v_fw = P.amp * shapeFW(x, cache);
    const v_n = P.newtonAmp ? P.newtonAmp * shapeN(x, P) : null;
    return { r: row.r, x, v_obs: row.vObs, err_v: row.errV, v_fw, v_n };
  });

  // Stats
  let rmsSum = 0;
  let vObsSum = 0;
  for (const r of results) {
    const e = r.v_fw - r.v_obs;
    rmsSum += e * e;
    vObsSum += r.v_obs;
  }
  const rms = Math.sqrt(rmsSum / Math.max(1, results.length));
  const vObsMean = vObsSum / Math.max(1, results.length);
  const relRms = rms / Math.max(1, vObsMean);

  // Plot ranges
  const rmaxPlot = rMax * P.r5 * 1.05;
  let vMax = 0;
  for (const r of results) {
    vMax = Math.max(vMax, r.v_obs + r.err_v, r.v_fw);
    if (r.v_n != null) vMax = Math.max(vMax, r.v_n);
  }
  vMax *= 1.10;

  // Geometry
  const margin = { l: 70, r: 85 + previewSize + previewPad, t: 55, b: 55 };
  const pw = width - margin.l - margin.r;
  const ph = height - margin.t - margin.b;

  const xPx = r => margin.l + r / rmaxPlot * pw;
  const yV = v => margin.t + (1 - v / vMax) * ph;
  const yMass = frac => margin.t + (1 - frac) * ph;

  // Mass profile sampling
  const Ngrid = 220;
  const massPts = [];
  let rhoPeak = 0, sigPeak = 0;
  for (let i = 0; i < Ngrid; i++) {
    const r = i / (Ngrid - 1) * rmaxPlot;
    const x = r / rMax;
    const rv = rho(x, P);
    const sv = interp(cache.sig, x, cache);
    rhoPeak = Math.max(rhoPeak, rv);
    sigPeak = Math.max(sigPeak, sv);
    massPts.push({ r, rho: rv, sig: sv });
  }
  if (rhoPeak === 0) rhoPeak = 1;
  if (sigPeak === 0) sigPeak = 1;

  // Physical surface density at peak (M☉/pc^2) if newtonAmp present
  let rhoPeakMsun = null;
  if (P.newtonAmp) {
    rhoPeakMsun = rhoPeak * (P.newtonAmp ** 2) / (G_ASTRO * rMax) / 1e6;
  }

  // Curve string helpers
  const pathFromPoints = pts => 'M ' + pts.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');

  const lines = [];
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="sans-serif" font-size="12">`);
  lines.push('<style>');
  lines.push('  .ax { stroke: #333; stroke-width: 1; fill: none; }');
  lines.push('  .grid { stroke: #ddd; stroke-width: 0.5; fill: none; }');
  lines.push('  .lbl { fill: #333; }');
  lines.push('  .lbl-l { fill: #0066cc; }');
  lines.push('  .lbl-r { fill: #b03030; }');
  lines.push('  .obs { fill: #222; }');
  lines.push('  .err { stroke: #555; stroke-width: 0.8; fill: none; }');
  lines.push('  .fw { stroke: #0066cc; stroke-width: 2.2; fill: none; }');
  lines.push('  .nt { stroke: #cc6600; stroke-width: 1.6; fill: none; stroke-dasharray: 5,3; }');
  lines.push('  .lbl-s { fill: #cc7000; }');
  lines.push('  .rho { stroke: #b03030; stroke-width: 2.0; fill: none; }');
  lines.push('  .sig { stroke: #cc7000; stroke-width: 1.8; fill: none; }');
  lines.push('  .title { fill: #111; font-size: 16px; font-weight: 600; }');
  lines.push('  .subtitle { fill: #555; font-size: 11px; }');
  lines.push('  .preview-bg { fill: #000; }');
  lines.push('  .preview-lbl { fill: #888; font-size: 10px; }');
  lines.push('  .legend { font-size: 11px; }');
  lines.push('</style>');

  // Title / subtitle — centered over the plot area only (preview sits to the right)
  const titleX = margin.l + pw / 2;
  lines.push(`<text x="${titleX}" y="22" text-anchor="middle" class="title">${esc(name)}</text>`);
  const sub = `rMax=${rMax.toFixed(1)} kpc, N=${results.length}, RMS=${rms.toFixed(1)} km/s (${(relRms*100).toFixed(1)}%), amp=${P.amp.toFixed(0)}`;
  lines.push(`<text x="${titleX}" y="38" text-anchor="middle" class="subtitle">${esc(sub)}</text>`);

  // Left axis (velocity)
  for (let i = 0; i <= 5; i++) {
    const v = vMax * i / 5;
    const y = yV(v);
    lines.push(`<line x1="${margin.l}" y1="${y.toFixed(1)}" x2="${width-margin.r}" y2="${y.toFixed(1)}" class="grid"/>`);
    lines.push(`<text x="${margin.l-6}" y="${(y+4).toFixed(1)}" text-anchor="end" class="lbl-l">${v.toFixed(0)}</text>`);
  }

  // Right axis (mass, normalized 0..1)
  for (let i = 0; i <= 5; i++) {
    const fracVal = i / 5;
    const y = yMass(fracVal * massPeakFrac);
    lines.push(`<text x="${width-margin.r+6}" y="${(y+4).toFixed(1)}" text-anchor="start" class="lbl-r">${fracVal.toFixed(1)}</text>`);
  }

  // X ticks
  for (let i = 0; i <= 6; i++) {
    const r = rmaxPlot * i / 6;
    const x = xPx(r);
    lines.push(`<line x1="${x.toFixed(1)}" y1="${margin.t}" x2="${x.toFixed(1)}" y2="${height-margin.b}" class="grid"/>`);
    lines.push(`<text x="${x.toFixed(1)}" y="${height-margin.b+16}" text-anchor="middle" class="lbl">${r.toFixed(1)}</text>`);
  }

  // Axis labels
  lines.push(`<text x="${margin.l + pw/2}" y="${height-12}" text-anchor="middle" class="lbl">radius (kpc)</text>`);
  lines.push(`<text x="16" y="${margin.t + ph/2}" text-anchor="middle" class="lbl-l" transform="rotate(-90, 16, ${margin.t + ph/2})">velocity (km/s)</text>`);
  lines.push(`<text x="${width-16}" y="${margin.t + ph/2}" text-anchor="middle" class="lbl-r" transform="rotate(-90, ${width-16}, ${margin.t + ph/2})">mass profile (normalized to peak)</text>`);

  // Plot area outline
  lines.push(`<rect x="${margin.l}" y="${margin.t}" width="${pw}" height="${ph}" class="ax"/>`);

  // Mass curves first (background)
  const rhoPath = pathFromPoints(massPts.map(p => [xPx(p.r), yMass(p.rho / rhoPeak * massPeakFrac)]));
  lines.push(`<path d="${rhoPath}" class="rho"/>`);
  const sigPath = pathFromPoints(massPts.map(p => [xPx(p.r), yMass(p.sig / sigPeak * massPeakFrac)]));
  lines.push(`<path d="${sigPath}" class="sig"/>`);

  // Newtonian baseline (if newtonAmp present)
  if (results[0].v_n != null) {
    const ntPts = [];
    for (let i = 1; i <= 100; i++) {
      const r = rmaxPlot * i / 100;
      const x = r / rMax;
      const vn = P.newtonAmp * shapeN(x, P);
      ntPts.push([xPx(r), yV(vn)]);
    }
    lines.push(`<path d="${pathFromPoints(ntPts)}" class="nt"/>`);
  }

  // Framework curve
  const fwPts = [];
  for (let i = 1; i <= 120; i++) {
    const r = rmaxPlot * i / 120;
    const x = r / rMax;
    const vfw = P.amp * shapeFW(x, cache);
    fwPts.push([xPx(r), yV(vfw)]);
  }
  lines.push(`<path d="${pathFromPoints(fwPts)}" class="fw"/>`);

  // Observed points with error bars
  for (const r of results) {
    const cx = xPx(r.r), cy = yV(r.v_obs);
    const yTop = yV(r.v_obs + r.err_v), yBot = yV(r.v_obs - r.err_v);
    lines.push(`<line x1="${cx.toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${cx.toFixed(2)}" y2="${yBot.toFixed(2)}" class="err"/>`);
    lines.push(`<line x1="${(cx-3).toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${(cx+3).toFixed(2)}" y2="${yTop.toFixed(2)}" class="err"/>`);
    lines.push(`<line x1="${(cx-3).toFixed(2)}" y1="${yBot.toFixed(2)}" x2="${(cx+3).toFixed(2)}" y2="${yBot.toFixed(2)}" class="err"/>`);
    lines.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.5" class="obs"/>`);
  }

  // Left legend (velocity)
  const lx = margin.l + 12, ly = margin.t + 14;
  lines.push('<g class="legend">');
  lines.push(`<line x1="${lx}" y1="${ly}" x2="${lx+24}" y2="${ly}" class="fw"/>`);
  lines.push(`<text x="${lx+30}" y="${ly+4}" class="lbl-l">framework fit</text>`);
  if (results[0].v_n != null) {
    lines.push(`<line x1="${lx}" y1="${ly+18}" x2="${lx+24}" y2="${ly+18}" class="nt"/>`);
    lines.push(`<text x="${lx+30}" y="${ly+22}" class="lbl-l">Newtonian (no halo)</text>`);
  }
  lines.push(`<circle cx="${lx+12}" cy="${ly+36}" r="2.5" class="obs"/>`);
  lines.push(`<text x="${lx+30}" y="${ly+40}" class="lbl">observed V±err</text>`);
  lines.push('</g>');

  // Right legend (mass)
  // Right legend (mass)
  const rlx = width - margin.r - 175, rly = margin.t + 14;
  lines.push('<g class="legend">');
  lines.push(`<line x1="${rlx}" y1="${rly}" x2="${rlx+24}" y2="${rly}" class="rho"/>`);
  lines.push(`<text x="${rlx+30}" y="${rly+4}" class="lbl-r">ρ(r) raw</text>`);
  lines.push(`<line x1="${rlx}" y1="${rly+18}" x2="${rlx+24}" y2="${rly+18}" class="sig"/>`);
  lines.push(`<text x="${rlx+30}" y="${rly+22}" class="lbl-s">Σ(r) cumulative</text>`);
  if (rhoPeakMsun != null) {
    lines.push(`<text x="${rlx}" y="${rly+44}" class="lbl-r">ρ peak: ${rhoPeakMsun.toFixed(0)} M☉/pc²</text>`);
  } else {
    lines.push(`<text x="${rlx}" y="${rly+44}" class="lbl-r">ρ peak: ${rhoPeak.toFixed(2)} (raw)</text>`);
  }
  lines.push('</g>');

  // === FACE-ON PREVIEW (right of main plot) ===
  // Black square + radial gradient sampled from rho(r). Brightness mapping is on an absolute
  // surface-density scale so galaxies are comparable across the sample:
  //   rho_phys >= 800 M☉/pc² → 100% (white, saturated)
  //   rho_phys = 100 M☉/pc² → 25%
  //   rho_phys = 0          → 0%   (black)
  // Linear interpolation in the two segments [0,100] and [100,800].
  const pxX = margin.l + pw + previewPad + 70;
  const pyY = margin.t;
  const pSize = previewSize;
  lines.push(`<rect x="${pxX}" y="${pyY}" width="${pSize}" height="${pSize}" class="preview-bg"/>`);

  function brightness(rhoMsunPc2) {
    if (rhoMsunPc2 <= 0) return 0.0;
    if (rhoMsunPc2 >= 800) return 1.0;
    if (rhoMsunPc2 <= 100) return 0.25 * rhoMsunPc2 / 100.0;
    return 0.25 + 0.75 * (rhoMsunPc2 - 100.0) / (800.0 - 100.0);
  }

  const hasPhys = rhoPeakMsun != null;
  const rhoToMsunPc2 = hasPhys ? (P.newtonAmp * P.newtonAmp) / (4.301e-6 * rMax) / 1e6 : 1.0;

  const Nstops = 32;
  const gid = `g_${name.replace(/[^A-Za-z0-9_]/g, '_')}`;
  const stops = [];
  for (let i = 0; i <= Nstops; i++) {
    const frac = i / Nstops;
    const xNorm = frac * P.r5;
    const rv = rho(xNorm, P);
    const rhoMsun = hasPhys ? rv * rhoToMsunPc2 : rv;
    const brightNorm = brightness(rhoMsun);
    const bright = Math.max(0, Math.min(255, Math.round(brightNorm * 255)));
    stops.push(`<stop offset="${frac.toFixed(4)}" stop-color="rgb(${bright},${bright},${bright})"/>`);
  }
  lines.push(`<defs><radialGradient id="${gid}" cx="0.5" cy="0.5" r="0.5">`);
  for (const s of stops) lines.push('  ' + s);
  lines.push('</radialGradient></defs>');
  const cxP = pxX + pSize/2;
  const cyP = pyY + pSize/2;
  const radiusP = pSize/2 - 4;
  lines.push(`<circle cx="${cxP}" cy="${cyP}" r="${radiusP}" fill="url(#${gid})"/>`);
  lines.push(`<text x="${cxP}" y="${pyY - 6}" text-anchor="middle" class="preview-lbl">face-on luminance from ρ(r)</text>`);
  lines.push(`<text x="${cxP}" y="${pyY + pSize + 14}" text-anchor="middle" class="preview-lbl">edge at r = ${(P.r5 * rMax).toFixed(1)} kpc</text>`);

  lines.push('</svg>');
  return lines.join('\n');
}

// Also export the math primitives so callers can compute fits without rendering
export { rho, buildFieldCache, shapeFW, shapeN, mEnc, interp };
