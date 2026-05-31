"""Vectorized framework velocity computation."""
import math
import numpy as np


def enforce_structure(P):
    """Match the simulator's enforceStructure(): clamp + monotonic ordering.
    Returns a new dict with corrected radii; does not mutate P.
    Hard clamps:
      r1 in [0.020, 0.180]
      r2 in [0.050, 0.320], and >= r1 + 0.012
      r3 in [0.090, 0.700], and >= r2 + 0.018
      r4 in [0.650, 1.800], and >= r3 + 0.040
      r5 in [0.700, 2.200], and >= r4 + 0.010
    """
    def clamp(v, lo, hi):
        return max(lo, min(hi, v))
    Q = dict(P)
    Q['r1'] = clamp(P['r1'], 0.020, 0.180)
    Q['r2'] = clamp(max(Q['r1'] + 0.012, P['r2']), 0.050, 0.320)
    Q['r3'] = clamp(max(Q['r2'] + 0.018, P['r3']), 0.090, 0.700)
    Q['r4'] = clamp(max(Q['r3'] + 0.040, P['r4']), 0.650, 1.800)
    Q['r5'] = clamp(max(Q['r4'] + 0.010, P['r5']), 0.700, 2.200)
    return Q

def rho_arr(x_arr, P):
    """Piecewise-linear occupancy density, vectorized."""
    P = enforce_structure(P)
    r1, r2, r3, r4, r5 = P['r1'], P['r2'], P['r3'], P['r4'], P['r5']
    rho0, rho1, rho2, rho3, rho4 = P['rho0'], P['rho1'], P['rho2'], P['rho3'], P['rho4']
    x = np.asarray(x_arr)
    out = np.zeros_like(x, dtype=float)
    # Segment 1: 0 to r1
    m = x <= r1
    if r1 > 0:
        out[m] = rho0 + (rho1 - rho0) * (x[m] / r1)
    # Segment 2: r1 to r2
    m = (x > r1) & (x <= r2)
    if r2 > r1:
        out[m] = rho1 + (rho2 - rho1) * ((x[m] - r1) / (r2 - r1))
    # Segment 3: r2 to r3
    m = (x > r2) & (x <= r3)
    if r3 > r2:
        out[m] = rho2 + (rho3 - rho2) * ((x[m] - r2) / (r3 - r2))
    # Segment 4: r3 to r4
    m = (x > r3) & (x <= r4)
    if r4 > r3:
        out[m] = rho3 + (rho4 - rho3) * ((x[m] - r3) / (r4 - r3))
    # Segment 5: r4 to r5 (declining to zero)
    m = (x > r4) & (x <= r5)
    if r5 > r4:
        out[m] = rho4 * (1 - (x[m] - r4) / (r5 - r4))
    # x > r5: already zero
    return out

def build_field_cache_np(P, N=380, NR=168, NA=96):
    """Vectorized field computation."""
    xmax = max(2.35, P['r5'] * 1.15)
    max_r = max(P['r5'], 0.05)
    sup = P['support']
    soft = max(0.012, P['eps'] * 1.75, max_r / NR * 1.6)
    soft2 = soft * soft
    
    xs = np.linspace(0, xmax, N)
    # Source radial samples
    rr = (np.arange(NR) + 0.5) / NR * max_r  # shape (NR,)
    dr = max_r / NR
    den = rho_arr(rr, P)  # shape (NR,)
    d2 = sup * den * den  # shape (NR,)
    
    # Azimuth angles
    th = (np.arange(NA) + 0.5) / NA * 2 * math.pi  # shape (NA,)
    cos_th = np.cos(th)
    sin_th = np.sin(th)
    
    # For each x in xs, integrate over rr and th
    # shape (N, NR, NA): dx = x[i] - rr[j]*cos_th[k]; dy = rr[j]*sin_th[k]
    sig = np.zeros(N)
    # Precompute: rr*cos_th and rr*sin_th (broadcasts to NR,NA)
    rr_cos = rr[:, None] * cos_th[None, :]  # (NR, NA)
    rr_sin = rr[:, None] * sin_th[None, :]  # (NR, NA)
    
    # Process xs in batch
    for i, x in enumerate(xs):
        dx = x - rr_cos  # (NR, NA)
        dy = rr_sin       # (NR, NA), since dy = -rr*sin doesn't matter (squared)
        denom = dx*dx + dy*dy + soft2  # (NR, NA)
        # avg over azimuth
        with np.errstate(invalid='ignore'):
            kern = np.sqrt(1 + d2[:, None] / denom) - 1  # (NR, NA)
        avg = kern.mean(axis=1)  # (NR,)
        # active mask
        active = den > 0
        sig[i] = (avg[active] * den[active] * rr[active] * dr * 2 * math.pi).sum()
    
    # Smooth with kernel [1,4,7,10,7,4,1]
    kernel = np.array([1, 4, 7, 10, 7, 4, 1], dtype=float)
    kernel /= kernel.sum()
    sm = np.zeros(N)
    pad = len(kernel) // 2
    sig_padded = np.concatenate([np.full(pad, sig[0]), sig, np.full(pad, sig[-1])])
    for i in range(N):
        sm[i] = (sig_padded[i:i+len(kernel)] * kernel).sum()
    
    # Gradient via central differences (i-2 to i+2 like the JS)
    grad = np.zeros(N)
    for i in range(N):
        i0 = max(0, i - 2)
        i1 = min(N - 1, i + 2)
        grad[i] = (sm[i1] - sm[i0]) / max(xs[i1] - xs[i0], 1e-9)
    
    return {'xs': xs, 'sig': sm, 'grad': grad, 'xmax': xmax, 'N': N}

def interp_np(arr, x, cache):
    if x <= 0: return arr[0]
    if x >= cache['xmax']: return arr[-1]
    f = x / cache['xmax'] * (cache['N'] - 1)
    i = int(f)
    t = f - i
    return arr[i] * (1 - t) + arr[i + 1] * t

def shape_fw_np(x, cache):
    g = interp_np(cache['grad'], x, cache)
    return math.sqrt(max(x * max(0, -g), 0))

def m_enc_np(x, P, N=120):
    rr = (np.arange(N) + 0.5) / N * x
    return 2 * math.pi * (rho_arr(rr, P) * rr * (x / N)).sum()

def shape_n_np(x, P):
    return math.sqrt(max(m_enc_np(x, P) / max(x, 1e-4), 0))

def get_rmax(name, preset, rotmod_entry):
    # rMax always comes from the rotmod data; any rMax field on the preset is leftover
    # from before the data sources were split out.
    return rotmod_entry['preset']['rMax']

def compute_galaxy(name, preset, rotmod_entry):
    rMax = get_rmax(name, preset, rotmod_entry)
    cache = build_field_cache_np(preset)
    amp = preset['amp']
    newton_amp = preset.get('newtonAmp', 0)
    results = []
    for row in rotmod_entry['rows']:
        x = row['r'] / rMax
        v_fw = amp * shape_fw_np(x, cache)
        v_n = newton_amp * shape_n_np(x, preset) if newton_amp else None
        results.append({
            'r': row['r'], 'x': x, 'v_obs': row['vObs'], 'err_v': row['errV'],
            'v_fw': v_fw, 'v_n': v_n, 'v_gas': row['vGas'], 'v_disk': row['vDisk'],
            'sb_disk': row['sbDisk'],
        })
    return results, rMax

def fit_quality(results):
    chi2 = 0; rms_sum = 0; N = 0
    import math
    for r in results:
        e = r['v_fw'] - r['v_obs']
        rms_sum += e * e
        w = 1 / max(r['err_v'], 0.1) ** 2
        chi2 += e * e * w
        N += 1
    return {'chi2_per_n': chi2 / max(N, 1), 'rms': math.sqrt(rms_sum / max(N, 1)), 'N': N}
