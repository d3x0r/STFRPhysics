// Standalone galaxy SVG generator with MOND/RAR velocity curve,
// photometric baryonic profile and Newtonian-equivalent MOND phantom mass profile diagnostics.
//
// Usage:
//   import { generateGalaxySvg } from './galaxy_svg_with_photometric_profile.mjs';
//   import { GALAXY_PRESETS } from './galaxy_presets.mjs';
//   import { ROTMOD_GALAXIES } from './rotmod_ltg_data.mjs';
//   const svg = generateGalaxySvg('NGC3198', { presets: GALAXY_PRESETS, rotmod: ROTMOD_GALAXIES });

const G_ASTRO = 4.301e-6; // kpc * (km/s)^2 / Msun
const M_PER_KPC = 3.0856775814913673e19;
const ACC_UNIT_M_S2 = 1e6 / M_PER_KPC; // 1 (km/s)^2/kpc in m/s^2
const DEFAULT_G_DAGGER_M_S2 = 1.2e-10; // common MOND/RAR acceleration scale

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function enforceStructure(P) {
  const Q = { ...P };
//	return Q;
  Q.r1 = clamp(P.r1, 0.02, 0.180);
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

  const cosTh = new Float64Array(NA);
  const sinTh = new Float64Array(NA);
  for (let a = 0; a < NA; a++) {
    const th = (a + 0.5) / NA * 2 * Math.PI;
    cosTh[a] = Math.cos(th);
    sinTh[a] = Math.sin(th);
  }

  const rr = new Float64Array(NR);
  const den = new Float64Array(NR);
  const d2 = new Float64Array(NR);
  const dr = max_r / NR;
  for (let i = 0; i < NR; i++) {
    rr[i] = (i + 0.5) / NR * max_r;
    den[i] = rho(rr[i], P);
    d2[i] = sup * den[i] * den[i];
  }

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
        avg += Math.sqrt(1 + d2[j] / (dx * dx + dy * dy + soft2)) - 1;
      }
      total += (avg / NA) * den[j] * rr[j] * dr * 2 * Math.PI;
    }
    sig[i] = total;
  }

  const kernel = [1, 4, 7, 10, 7, 4, 1];
  const ksum = kernel.reduce((a, b) => a + b, 0);
  const sm = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    let acc = 0;
    for (let k = 0; k < kernel.length; k++) {
      const j = Math.min(N - 1, Math.max(0, i + k - 3));
      acc += sig[j] * kernel[k];
    }
    sm[i] = acc / ksum;
  }

  const grad = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    const i0 = Math.max(0, i - 2);
    const i1 = Math.min(N - 1, i + 2);
    grad[i] = (sm[i1] - sm[i0]) / Math.max(xs[i1] - xs[i0], 1e-9);
  }
	//console.log( P, JSON.stringify( grad, null, '\t' ) );
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

function signedSquare(v) {
  return v * Math.abs(v);
}

function vBarSquared(row, opts = {}) {
  const yDisk = opts.diskML ?? opts.upsilonDisk ?? 0.5;
  const yBul = opts.bulgeML ?? opts.upsilonBulge ?? 0.7;
  const v2 = signedSquare(row.vGas || 0)
    + yDisk * signedSquare(row.vDisk || 0)
    + yBul * signedSquare(row.vBul || 0);
  return Math.max(0, v2);
}

function mondVelocity(row, opts = {}) {
  const gDagger = (opts.gDaggerM_s2 ?? DEFAULT_G_DAGGER_M_S2) / ACC_UNIT_M_S2;
  const r = Math.max(row.r || 0, 1e-9);
  const vb2 = vBarSquared(row, opts);
  if (vb2 <= 0) return 0;
  const gBar = vb2 / r;
  const denom = 1 - Math.exp(-Math.sqrt(Math.max(gBar / gDagger, 0)));
  const gMond = denom > 1e-12 ? gBar / denom : Math.sqrt(gBar * gDagger);
  return Math.sqrt(Math.max(gMond * r, 0));
}

function baryonicMassEnclosed(row, opts = {}) {
  const r = Math.max(row.r || 0, 0);
  return vBarSquared(row, opts) * r / G_ASTRO;
}

function mondEffectiveMassEnclosed(row, opts = {}) {
  const r = Math.max(row.r || 0, 0);
  const vm = mondVelocity(row, opts);
  return (vm * vm) * r / G_ASTRO;
}

function mondPhantomMassEnclosed(row, opts = {}) {
  return Math.max(0, mondEffectiveMassEnclosed(row, opts) - baryonicMassEnclosed(row, opts));
}


function localAnnulusProfiles(results) {
  // Convert cumulative equivalent masses M(<r) into a local radial profile.
  // This is intentionally a visual comparison profile, not a MOND source law:
  // it approximates annular surface density by subtracting the previous enclosed
  // value and dividing by the annulus area.
  const rows = [...results].sort((a, b) => a.r - b.r);
  let prevR = 0;
  let prevBar = 0;
  let prevPh = 0;
  const out = [];
  for (const row of rows) {
    const r = Math.max(row.r || 0, 0);
    const area = Math.PI * Math.max(r * r - prevR * prevR, 1e-12);
    const dBar = (row.m_bar || 0) - prevBar;
    const dPh = (row.m_ph || 0) - prevPh;
    out.push({
      r,
      mbarSurf: Math.max(0, dBar / area),
      mphSurf: Math.max(0, dPh / area),
    });
    prevR = r;
    prevBar = row.m_bar || 0;
    prevPh = row.m_ph || 0;
  }

  // Light 3-point smoothing keeps the comparison readable without changing the
  // fact that this is a local annulus profile rather than cumulative mass.
  return out.map((row, i) => {
    const a = out[Math.max(0, i - 1)];
    const b = row;
    const c = out[Math.min(out.length - 1, i + 1)];
    return {
      r: row.r,
      mbarSurf: (a.mbarSurf + 2 * b.mbarSurf + c.mbarSurf) / 4,
      mphSurf: (a.mphSurf + 2 * b.mphSurf + c.mphSurf) / 4,
    };
  });
}


function photometricBaryonicProfile(rows, opts = {}) {
  const yDisk = opts.diskML ?? opts.upsilonDisk ?? 0.5;
  const yBul = opts.bulgeML ?? opts.upsilonBulge ?? 0.7;
  return [...rows]
    .sort((a, b) => a.r - b.r)
    .map(row => ({
      r: row.r,
      phot: Math.max(0, yDisk * (row.sbDisk || 0) + yBul * (row.sbBul || 0)),
    }));
}

function computeMetrics(results, field, k = 0, P ) {
  let sum2 = 0;
  let sig2 = 0;
  let rel2 = 0;
  let maxSig = 0;
  let n = 0;

	//console.log( "and results to check?", results.length );
  for (const r of results) {
    const model = r[field];
    if (model == null || !Number.isFinite(model)) continue;
    const obs = r.v_obs;
	 const err = Math.max(r.err_v || 0, 1e-9);
    const e = model - obs;
    sum2 += e * e;
    sig2 += (e / err) * (e / err);
    rel2 += obs !== 0 ? (e / obs) * (e / obs) : 0;
    maxSig = Math.max(maxSig, Math.abs(e / err));
    n++;
  }
  const dof = Math.max(1, n - k);
  return {
    n,
    rms: Math.sqrt(sum2 / Math.max(1, n)),
    relRms: Math.sqrt(rel2 / Math.max(1, n)),
    sigmaRms: Math.sqrt(sig2 / Math.max(1, n)),
    chi2nu: sig2 / dof,
    maxSigma: maxSig,
  };
}

function fmtMetric(m) {
  if (!m || !Number.isFinite(m.rms)) return 'n/a';
  return `${m.rms.toFixed(1)} km/s, ${(m.relRms * 100).toFixed(1)}%, ${m.sigmaRms.toFixed(2)}σ`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pathFromPoints(pts) {
  if (!pts || !pts.length) return '';
  return 'M ' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
}


export function generateGalaxySvg(name, data, opts = {}) {
  const { presets, rotmod } = data;
  if (!presets[name]) throw new Error(`No preset for galaxy: ${name}`);
  const P = { ...presets[name] };
  const rotmodEntry = (Array.isArray(rotmod) ? rotmod : Object.values(rotmod)).find(g => g.name === name);
  if (!rotmodEntry) throw new Error(`No rotmod entry for galaxy: ${name}`);

  //const rMax = rotmodEntry.preset.rMax;
  //const rows = rotmodEntry.rows;
  const rMax = P.rMax ?? rotmodEntry.preset.rMax;
  const rows = rotmodEntry.rows;


  const width = opts.width || 960;
  const height = opts.height || 450;
  const massPeakFrac = opts.massPeakFrac || 2 / 3;
  const previewSize = 170;
  const previewPad = 18;

  const cache = buildFieldCache(P);
  const mondOpts = opts.mond || opts;

const remapActive = !!(P.remapOn && P.remapDelta > 0 && P.remapRc > 0);

  const results = rows.map(row => {

    const x = row.r / rMax;
    function remapRadiusNorm(x,P){
      if(!P.remapOn || P.remapDelta<=0 || P.remapRc<=0 || x>=P.remapRc) return x;
      const t=1-x/P.remapRc;
      return x + P.remapDelta*t*t;
    }

    const x_eff = remapRadiusNorm(x, P);
    const r_eff = x_eff * rMax;

    const v_fw = P.amp * shapeFW(x_eff, cache);
    const v_n = P.newtonAmp ? P.newtonAmp * shapeN(x, P) : null;

    const v_mond = mondVelocity(row, mondOpts);
    const m_bar = baryonicMassEnclosed(row, mondOpts);
    const m_eff = mondEffectiveMassEnclosed(row, mondOpts);
    const m_ph = Math.max(0, m_eff - m_bar);
    return { r: row.r, r_eff, x, v_obs: row.vObs, err_v: row.errV, v_fw, v_n, v_mond, m_bar, m_eff, m_ph };
  });

  const fwK = opts.frameworkK ?? opts.kFramework ?? 0;
  const fwStats = computeMetrics(results, 'v_fw', fwK, P);
  const ntStats = computeMetrics(results, 'v_n', opts.newtonK ?? 1, null);
  const mondStats = computeMetrics(results, 'v_mond', opts.mondK ?? 0, null);

  const rmaxPlot = rMax * P.r5 * 1.05;
  let vMax = 0;
  for (const r of results) {
    vMax = Math.max(vMax, r.v_obs + r.err_v, r.v_fw);
    if (r.v_n != null) vMax = Math.max(vMax, r.v_n);
    if (r.v_mond != null) vMax = Math.max(vMax, r.v_mond);
  }
  vMax *= 1.10;

  const margin = { l: 70, r: 85 + previewSize + previewPad, t: 55, b: 55 };
  const pw = width - margin.l - margin.r;
  const ph = height - margin.t - margin.b;

  const xPx = r => margin.l + r / rmaxPlot * pw;
  const yV = v => margin.t + (1 - v / vMax) * ph;
  const yMass = frac => margin.t + (1 - frac) * ph;

  const Ngrid = 220;
  const massPts = [];
  let rhoPeak = 0;
  for (let i = 0; i < Ngrid; i++) {
    const r = i / (Ngrid - 1) * rmaxPlot;
    const x = r / rMax;
    const rv = rho(x, P);
    rhoPeak = Math.max(rhoPeak, rv);
    massPts.push({ r, rho: rv });
  }
  if (rhoPeak === 0) rhoPeak = 1;

  let rhoPeakMsun = null;
  if (P.newtonAmp) {
    rhoPeakMsun = rhoPeak * (P.newtonAmp ** 2) / (G_ASTRO * rMax) / 1e6;
  }

  const mondProfileRows = localAnnulusProfiles(results);
  const photRows = photometricBaryonicProfile(rows, mondOpts);
  const photPeak = Math.max(1e-12, ...photRows.map(r => r.phot || 0));
  const mBarPeak = Math.max(1e-12, ...mondProfileRows.map(r => r.mbarSurf || 0));
  const mPhPeak = Math.max(1e-12, ...mondProfileRows.map(r => r.mphSurf || 0));

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
  lines.push('  .mond { stroke: #7b2cbf; stroke-width: 1.8; fill: none; stroke-dasharray: 7,3; }');
  lines.push('  .lbl-p { fill: #cc7000; }');
  lines.push('  .lbl-m { fill: #7b2cbf; }');
  lines.push('  .rho { stroke: #b03030; stroke-width: 2.0; fill: none; }');
  lines.push('  .phot { stroke: #cc7000; stroke-width: 1.8; fill: none; }');
  lines.push('  .mbar { stroke: #8e44ad; stroke-width: 1.8; fill: none; opacity: 0.9; }');
  lines.push('  .mph { stroke: #c77dff; stroke-width: 1.6; fill: none; stroke-dasharray: 4,3; opacity: 0.95; }');
  lines.push('  .title { fill: #111; font-size: 16px; font-weight: 600; }');
  lines.push('  .subtitle { fill: #555; font-size: 11px; }');
  lines.push('  .preview-bg { fill: #000; }');
  lines.push('  .preview-lbl { fill: #888; font-size: 10px; }');
  lines.push('  .legend { font-size: 11px; }');
  lines.push('</style>');

  const titleX = margin.l + pw / 2;
  lines.push(`<text x="${titleX}" y="22" text-anchor="middle" class="title">${esc(name)}</text>`);
  const sub = `rMax=${rMax.toFixed(1)} kpc, N=${results.length}, FW=${fmtMetric(fwStats)}, MOND=${fmtMetric(mondStats)}, amp=${P.amp.toFixed(0)}`;
  lines.push(`<text x="${titleX}" y="38" text-anchor="middle" class="subtitle">${esc(sub)}</text>`);

  for (let i = 0; i <= 5; i++) {
    const v = vMax * i / 5;
    const y = yV(v);
    lines.push(`<line x1="${margin.l}" y1="${y.toFixed(1)}" x2="${width - margin.r}" y2="${y.toFixed(1)}" class="grid"/>`);
    lines.push(`<text x="${margin.l - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="lbl-l">${v.toFixed(0)}</text>`);
  }

  for (let i = 0; i <= 5; i++) {
    const fracVal = i / 5;
    const y = yMass(fracVal * massPeakFrac);
    lines.push(`<text x="${width - margin.r + 6}" y="${(y + 4).toFixed(1)}" text-anchor="start" class="lbl-r">${fracVal.toFixed(1)}</text>`);
  }

  for (let i = 0; i <= 6; i++) {
    const r = rmaxPlot * i / 6;
    const x = xPx(r);
    lines.push(`<line x1="${x.toFixed(1)}" y1="${margin.t}" x2="${x.toFixed(1)}" y2="${height - margin.b}" class="grid"/>`);
    lines.push(`<text x="${x.toFixed(1)}" y="${height - margin.b + 16}" text-anchor="middle" class="lbl">${r.toFixed(1)}</text>`);
  }

  lines.push(`<text x="${margin.l + pw / 2}" y="${height - 12}" text-anchor="middle" class="lbl">radius (kpc)</text>`);
  lines.push(`<text x="16" y="${margin.t + ph / 2}" text-anchor="middle" class="lbl-l" transform="rotate(-90, 16, ${margin.t + ph / 2})">velocity (km/s)</text>`);
  lines.push(`<text x="${width - (220 + 16)}" y="${margin.t + ph / 2}" text-anchor="middle" class="lbl-r" transform="rotate(-90, ${width - (220 + 16)}, ${margin.t + ph / 2})">profiles (normalized to peak)</text>`);
  lines.push(`<rect x="${margin.l}" y="${margin.t}" width="${pw}" height="${ph}" class="ax"/>`);

  const rhoPath = pathFromPoints(massPts.map(p => [xPx(p.r), yMass((p.rho / rhoPeak) * massPeakFrac)]));
  lines.push(`<path d="${rhoPath}" class="rho"/>`);
  const photPts = photRows.filter(r => Number.isFinite(r.phot)).map(r => [xPx(r.r), yMass((r.phot / photPeak) * massPeakFrac)]);
  if (photPts.length > 1 && photPeak > 1e-12) lines.push(`<path d="${pathFromPoints(photPts)}" class="phot"/>`);

  const mBarPts = mondProfileRows.filter(r => Number.isFinite(r.mbarSurf)).map(r => [xPx(r.r), yMass((r.mbarSurf / mBarPeak) * massPeakFrac)]);
  if (mBarPts.length > 1) lines.push(`<path d="${pathFromPoints(mBarPts)}" class="mbar"/>`);
  const mPhPts = mondProfileRows.filter(r => Number.isFinite(r.mphSurf)).map(r => [xPx(r.r), yMass((r.mphSurf / mPhPeak) * massPeakFrac)]);
  if (mPhPts.length > 1 && mPhPeak > 1e-10) lines.push(`<path d="${pathFromPoints(mPhPts)}" class="mph"/>`);

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

  const mondPts = results.filter(r => r.v_mond != null && Number.isFinite(r.v_mond)).map(r => [xPx(r.r), yV(r.v_mond)]);
  if (mondPts.length > 1) lines.push(`<path d="${pathFromPoints(mondPts)}" class="mond"/>`);

  const fwPts = [];
  for (let i = 1; i <= 120; i++) {
    const r = rmaxPlot * i / 120;
    const x = r / rMax;
    const x_eff = (P.remapOn && P.remapDelta > 0 && P.remapRc > 0 && x < P.remapRc)
      ? x + P.remapDelta * (1 - x / P.remapRc) ** 2
      : x;

    const vfw = P.amp * shapeFW(x_eff, cache);

    fwPts.push([xPx(r), yV(vfw)]);
  }

/*
console.log( "-----------------" );

for( let x = 0; x < 15; x++ ) {
	console.log(  JSON.stringify( fwPts[x], null, '\t' ) );
}
*/

  lines.push(`<path d="${pathFromPoints(fwPts)}" class="fw"/>`);

  for (const r of results) {
    const cx = xPx(r.r_eff), cy = yV(r.v_obs);
    const yTop = yV(r.v_obs + r.err_v), yBot = yV(Math.max(0, r.v_obs - r.err_v));
    lines.push(`<line x1="${cx.toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${cx.toFixed(2)}" y2="${yBot.toFixed(2)}" class="err"/>`);
    lines.push(`<line x1="${(cx - 3).toFixed(2)}" y1="${yTop.toFixed(2)}" x2="${(cx + 3).toFixed(2)}" y2="${yTop.toFixed(2)}" class="err"/>`);
    lines.push(`<line x1="${(cx - 3).toFixed(2)}" y1="${yBot.toFixed(2)}" x2="${(cx + 3).toFixed(2)}" y2="${yBot.toFixed(2)}" class="err"/>`);
    lines.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.5" class="obs"/>`);
  }

  const lx = margin.l + 12, ly = margin.t + 14;
  lines.push('<g class="legend">');
  lines.push(`<line x1="${lx}" y1="${ly}" x2="${lx + 24}" y2="${ly}" class="fw"/>`);
  lines.push(`<text x="${lx + 30}" y="${ly + 4}" class="lbl-l">framework: ${esc(fmtMetric(fwStats))}</text>`);
  let legY = ly + 18;
  if (results[0].v_n != null) {
    lines.push(`<line x1="${lx}" y1="${legY}" x2="${lx + 24}" y2="${legY}" class="nt"/>`);
    lines.push(`<text x="${lx + 30}" y="${legY + 4}" class="lbl-l">Newtonian: ${esc(fmtMetric(ntStats))}</text>`);
    legY += 18;
  }
  if (mondPts.length > 1) {
    lines.push(`<line x1="${lx}" y1="${legY}" x2="${lx + 24}" y2="${legY}" class="mond"/>`);
    lines.push(`<text x="${lx + 30}" y="${legY + 4}" class="lbl-m">MOND/RAR: ${esc(fmtMetric(mondStats))}</text>`);
    legY += 18;
  }
  lines.push(`<circle cx="${lx + 12}" cy="${legY}" r="2.5" class="obs"/>`);
  lines.push(`<text x="${lx + 30}" y="${legY + 4}" class="lbl">observed V±err</text>`);
  lines.push('</g>');

  const rlx = width - margin.r - 215, rly = margin.t + 14;
  lines.push('<g class="legend">');
  lines.push(`<line x1="${rlx}" y1="${rly}" x2="${rlx + 24}" y2="${rly}" class="rho"/>`);
  lines.push(`<text x="${rlx + 30}" y="${rly + 4}" class="lbl-r">ρ(r) raw</text>`);
  lines.push(`<line x1="${rlx}" y1="${rly + 18}" x2="${rlx + 24}" y2="${rly + 18}" class="phot"/>`);
  lines.push(`<text x="${rlx + 30}" y="${rly + 22}" class="lbl-p">photometric baryonic profile</text>`);
  lines.push(`<line x1="${rlx}" y1="${rly + 36}" x2="${rlx + 24}" y2="${rly + 36}" class="mbar"/>`);
  lines.push(`<text x="${rlx + 30}" y="${rly + 40}" class="lbl-m">MOND baryonic annulus</text>`);
  lines.push(`<line x1="${rlx}" y1="${rly + 54}" x2="${rlx + 24}" y2="${rly + 54}" class="mph"/>`);
  lines.push(`<text x="${rlx + 30}" y="${rly + 58}" class="lbl-m">MOND phantom annulus</text>`);
  if (rhoPeakMsun != null) {
    lines.push(`<text x="${rlx}" y="${rly + 78}" class="lbl-r">ρ peak: ${rhoPeakMsun.toFixed(0)} M☉/pc²</text>`);
  } else {
    lines.push(`<text x="${rlx}" y="${rly + 78}" class="lbl-r">ρ peak: ${rhoPeak.toFixed(2)} (raw)</text>`);
  }
  if (photPeak > 1e-12) {
    lines.push(`<text x="${rlx}" y="${rly + 94}" class="lbl-p">phot peak: ${photPeak.toFixed(2)} (arb.)</text>`);
  }
  if (mBarPeak > 1e-10) {
    lines.push(`<text x="${rlx}" y="${rly + 110}" class="lbl-m">Σbar peak: ${(mBarPeak / 1e6).toFixed(2)} M☉/pc²</text>`);
  }
  if (mPhPeak > 1e-10) {
    lines.push(`<text x="${rlx}" y="${rly + 126}" class="lbl-m">Σphantom peak: ${(mPhPeak / 1e6).toFixed(2)} M☉/pc²</text>`);
  }
  lines.push('</g>');

  const pxX = margin.l + pw + previewPad + 70;
  const pyY = margin.t;
  const pSize = previewSize;
  lines.push(`<rect x="${pxX}" y="${pyY}" width="${pSize}" height="${pSize}" class="preview-bg"/>`);

  function brightness(rhoMsunPc2) {
    if (P.newtonAmp < 50) {
      if (rhoMsunPc2 <= 0) return 0.0;
      if (rhoMsunPc2 >= 150) return 1.0;
      if (rhoMsunPc2 <= 10) return 0.25 * rhoMsunPc2 / 10.0;
      return 0.25 + 0.75 * (rhoMsunPc2 - 10.0) / (150.0 - 10.0);
    }
    if (rhoMsunPc2 <= 0) return 0.0;
    if (rhoMsunPc2 >= 800) return 1.0;
    if (rhoMsunPc2 <= 100) return 0.25 * rhoMsunPc2 / 100.0;
    return 0.25 + 0.75 * (rhoMsunPc2 - 100.0) / (800.0 - 100.0);
  }

  const hasPhys = rhoPeakMsun != null;
  const rhoToMsunPc2 = hasPhys ? (P.newtonAmp * P.newtonAmp) / G_ASTRO / rMax / 1e6 : 1.0;
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
    if (P.newtonAmp < 50) stops.push(`<stop offset="${frac.toFixed(4)}" stop-color="rgb(${bright},${Math.round(bright / 4)},${Math.round(bright / 4)})"/>`);
    else stops.push(`<stop offset="${frac.toFixed(4)}" stop-color="rgb(${bright},${bright},${bright})"/>`);
  }
  lines.push(`<defs><radialGradient id="${gid}" cx="0.5" cy="0.5" r="0.5">`);
  for (const s of stops) lines.push('  ' + s);
  lines.push('</radialGradient></defs>');
  const cxP = pxX + pSize / 2;
  const cyP = pyY + pSize / 2;
  const radiusP = pSize / 2 - 4;
  lines.push(`<circle cx="${cxP}" cy="${cyP}" r="${radiusP}" fill="url(#${gid})"/>`);
  lines.push(`<text x="${cxP}" y="${pyY - 6}" text-anchor="middle" class="preview-lbl">face-on luminance from ρ(r)</text>`);
  lines.push(`<text x="${cxP}" y="${pyY + pSize + 14}" text-anchor="middle" class="preview-lbl">edge at r = ${(P.r5 * rMax).toFixed(1)} kpc</text>`);

  lines.push('</svg>');
  return lines.join('\n');
}

export {
  rho,
  buildFieldCache,
  shapeFW,
  shapeN,
  mEnc,
  interp,
  mondVelocity,
  vBarSquared,
  baryonicMassEnclosed,
  mondEffectiveMassEnclosed,
  mondPhantomMassEnclosed,
  computeMetrics,
  localAnnulusProfiles,
  photometricBaryonicProfile,
};
