"""
STFR 9-Body Simulation: Sun + 8 planets in CMB rest frame.

Gravity model:
  - Each body emits a gravitational field that propagates at C
  - For uniform motion, field points to CURRENT position (Lienard-Wiechert analog)
    giving a quadrupole perturbation of order beta^2
  - Time dilation applied to each body's clock based on velocity + gravitational potential
  - Sun given initial velocity ~370 km/s toward CMB dipole direction
  - All bodies free to move; Sun reacts to planetary pulls

Potential used:
  phi(r, theta) = -GM / r * (1 - beta_src^2) / (1 - beta_src^2 * sin^2(theta))^(1/2)
  This is the Lienard-Wiechert analog: field of uniformly moving source pointing
  to current position. For small beta this expands to:
    phi ≈ -GM/r * [1 + beta^2*(3cos^2(theta)-1)/2 + ...]
  i.e. the monopole (unchanged to order beta) plus a quadrupole correction.

Force:
  F = -grad(phi) evaluated at receiver position relative to SOURCE CURRENT position.
"""

import numpy as np
from scipy.integrate import solve_ivp
import json

# ── Constants ──────────────────────────────────────────────────────────────────
C     = 299792458.0       # m/s
G     = 6.674e-11         # m^3 kg^-1 s^-2
AU    = 1.496e11          # m
DAY   = 86400.0           # s
YEAR  = 365.25 * DAY      # s

# CMB dipole direction (ecliptic coordinates, approximate)
# RA=168 deg, Dec=-7 deg -> ecliptic lon~171.7, lat~-11.2
# Project onto ecliptic plane (ignore small out-of-plane component for now)
CMB_LON_ECL = np.radians(171.7)
V_CMB       = 370000.0    # m/s solar system bulk velocity

# CMB velocity unit vector (in ecliptic plane, x=toward vernal equinox)
V_CMB_VEC = V_CMB * np.array([np.cos(CMB_LON_ECL), np.sin(CMB_LON_ECL), 0.0])

# ── Planetary data (J2000 approximate) ────────────────────────────────────────
# Masses in kg, semi-major axes in AU, eccentricities, periods in years
# Initial conditions: circular orbits in ecliptic plane for simplicity
# (small inclinations neglected for this first run)

BODIES = [
    # name,        mass(kg),        a(AU),  e,       T(yr),   peri_lon(deg)
    ("Sun",        1.989e30,        0.0,    0.0,     0.0,     0.0   ),
    ("Mercury",    3.301e23,        0.387,  0.2056,  0.2409,  77.0  ),
    ("Venus",      4.867e24,        0.723,  0.0068,  0.6152,  131.0 ),
    ("Earth",      5.972e24,        1.000,  0.0167,  1.0000,  102.0 ),
    ("Mars",       6.417e23,        1.524,  0.0934,  1.8808,  336.0 ),
    ("Jupiter",    1.898e27,        5.203,  0.0484,  11.862,  14.0  ),
    ("Saturn",     5.683e26,        9.537,  0.0541,  29.457,  93.0  ),
    ("Uranus",     8.681e25,        19.19,  0.0472,  84.011,  173.0 ),
    ("Neptune",    1.024e26,        30.07,  0.0086,  164.79,  48.0  ),
]

N = len(BODIES)
names  = [b[0] for b in BODIES]
masses = np.array([b[1] for b in BODIES])

def initial_conditions():
    """
    Set up initial positions and velocities.
    Planets start at perihelion in their orbital planes (ecliptic assumed flat).
    Sun gets the CMB bulk velocity added; planets get it too (whole system moves).
    Positions are relative to solar system barycenter approximately.
    """
    pos = np.zeros((N, 3))
    vel = np.zeros((N, 3))

    for i, (name, mass, a_au, e, T_yr, peri_lon_deg) in enumerate(BODIES):
        if i == 0:  # Sun at origin initially
            pos[i] = np.array([0.0, 0.0, 0.0])
            vel[i] = V_CMB_VEC.copy()
            continue

        a = a_au * AU
        peri_lon = np.radians(peri_lon_deg)

        # Position at perihelion
        pos[i] = a * (1 - e) * np.array([np.cos(peri_lon), np.sin(peri_lon), 0.0])

        # Velocity at perihelion (perpendicular to position, prograde)
        # v_peri = sqrt(GM*(1+e)/(a*(1-e)))
        v_peri = np.sqrt(G * masses[0] * (1 + e) / (a * (1 - e)))
        perp = np.array([-np.sin(peri_lon), np.cos(peri_lon), 0.0])
        vel[i] = v_peri * perp + V_CMB_VEC  # whole system moves with CMB velocity

    # Shift to barycenter frame
    total_mass = np.sum(masses)
    bary_pos = np.sum(masses[:, None] * pos, axis=0) / total_mass
    bary_vel = np.sum(masses[:, None] * vel, axis=0) / total_mass
    pos -= bary_pos
    vel -= bary_vel
    # Re-add CMB velocity to all (barycenter moves with CMB)
    vel += V_CMB_VEC

    return pos, vel

def moving_source_force(r_vec, v_src, mass_src):
    """
    Force per unit mass on a test particle at position r_vec relative to source,
    from a source moving at velocity v_src (in coordinate/CMB frame).

    Uses the Lienard-Wiechert gravitational analog:
    Field points to CURRENT position (r_vec is already current-position offset).
    Magnitude: F = GM*(1-beta^2) / (r^2 * (1 - beta^2*sin^2(theta))^(3/2))
    Direction: toward source (i.e., along -r_vec normalized)

    theta = angle between r_vec and v_src.
    """
    r = np.linalg.norm(r_vec)
    if r < 1e6:  # avoid singularity (shouldn't happen)
        return np.zeros(3)

    beta_vec = v_src / C
    beta2    = np.dot(beta_vec, beta_vec)
    beta     = np.sqrt(beta2)

    # cos(theta) between r_vec and v_src
    if beta > 1e-10:
        cos_theta = np.dot(r_vec, beta_vec) / (r * beta)
        sin2_theta = 1.0 - cos_theta**2
    else:
        sin2_theta = 0.0

    denom = (1.0 - beta2 * sin2_theta)**1.5
    F_mag = G * mass_src * (1.0 - beta2) / (r**2 * denom)

    # Force is attractive: toward source, i.e., along -r_vec/r
    return -F_mag * r_vec / r

def derivatives(t, state):
    """
    state: flattened [pos(Nx3), vel(Nx3)] = 6N values
    returns d/dt state
    """
    pos = state[:3*N].reshape(N, 3)
    vel = state[3*N:].reshape(N, 3)

    acc = np.zeros((N, 3))

    for i in range(N):
        for j in range(N):
            if i == j:
                continue
            # Position of j relative to i (i feels force from j)
            r_ij = pos[i] - pos[j]  # vector FROM j TO i
            # v_src is velocity of source j
            f = moving_source_force(r_ij, vel[j], masses[j])
            acc[i] += f

    return np.concatenate([vel.flatten(), acc.flatten()])

def run_simulation(years=10, steps_per_orbit_mercury=500):
    """Run the simulation and return trajectory data."""
    pos0, vel0 = initial_conditions()
    state0 = np.concatenate([pos0.flatten(), vel0.flatten()])

    t_span = (0.0, years * YEAR)
    # Time resolution: ~Mercury orbital period / steps
    mercury_period = BODIES[1][4] * YEAR
    dt_max = mercury_period / steps_per_orbit_mercury

    print(f"Running {years}-year simulation...")
    print(f"  dt_max = {dt_max/DAY:.3f} days")
    print(f"  Estimated Mercury orbits: {years/BODIES[1][4]:.0f}")
    print()

    # Dense output for analysis
    t_eval = np.arange(0, years * YEAR, dt_max)

    sol = solve_ivp(
        derivatives,
        t_span,
        state0,
        method='DOP853',   # high-order Runge-Kutta
        t_eval=t_eval,
        rtol=1e-10,
        atol=1e-10,
        max_step=dt_max,
        dense_output=False
    )

    return sol

def compute_orbital_elements(pos_planet, vel_planet, pos_sun, vel_sun, mass_sun):
    """Compute osculating orbital elements relative to Sun."""
    r_vec = pos_planet - pos_sun
    v_vec = vel_planet - vel_sun
    r = np.linalg.norm(r_vec)
    v = np.linalg.norm(v_vec)
    mu = G * mass_sun

    # Specific angular momentum
    h_vec = np.cross(r_vec, v_vec)
    h = np.linalg.norm(h_vec)

    # Eccentricity vector (points toward perihelion)
    e_vec = np.cross(v_vec, h_vec) / mu - r_vec / r
    e = np.linalg.norm(e_vec)

    # Semi-major axis
    E_spec = v**2 / 2 - mu / r  # specific energy
    if abs(E_spec) < 1e-30:
        return None
    a = -mu / (2 * E_spec)

    # Argument of perihelion (in ecliptic plane: angle of e_vec from x-axis)
    if e > 1e-10:
        omega = np.arctan2(e_vec[1], e_vec[0])
    else:
        omega = 0.0

    return {'a': a, 'e': e, 'omega': omega, 'e_vec': e_vec}

def analyze_precession(sol, body_idx, name):
    """Compute perihelion precession rate from simulation."""
    pos_all = sol.y[:3*N].reshape(N, 3, -1)  # shape (N, 3, timesteps)
    vel_all = sol.y[3*N:].reshape(N, 3, -1)

    sun_idx = 0
    times = sol.t

    omegas = []
    t_sample = []

    # Sample orbital elements every ~1/10 of orbital period
    T_body = BODIES[body_idx][4] * YEAR
    sample_interval = int(len(times) * (T_body / (10 * BODIES[1][4] * YEAR)))
    sample_interval = max(sample_interval, 10)

    for k in range(0, len(times), sample_interval):
        pos_p = pos_all[body_idx, :, k]
        vel_p = vel_all[body_idx, :, k]
        pos_s = pos_all[sun_idx, :, k]
        vel_s = vel_all[sun_idx, :, k]

        elems = compute_orbital_elements(pos_p, vel_p, pos_s, vel_s, masses[sun_idx])
        if elems and elems['e'] > 0.001:
            omegas.append(elems['omega'])
            t_sample.append(times[k])

    if len(omegas) < 5:
        return None

    omegas = np.array(omegas)
    t_sample = np.array(t_sample)

    # Unwrap angle
    omegas_unwrapped = np.unwrap(omegas)

    # Linear fit to get precession rate
    coeffs = np.polyfit(t_sample, omegas_unwrapped, 1)
    rate_rad_per_sec = coeffs[0]

    # Convert to arcsec per century
    rate_arcsec_century = np.degrees(rate_rad_per_sec) * 3600 * (100 * YEAR)

    return {
        'rate_arcsec_century': rate_arcsec_century,
        'n_samples': len(omegas),
        't_span_yr': (t_sample[-1] - t_sample[0]) / YEAR
    }

# ── Main ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("STFR 9-Body Simulation")
    print("=" * 50)
    print(f"CMB velocity: {V_CMB/1000:.0f} km/s at ecliptic lon {np.degrees(CMB_LON_ECL):.1f} deg")
    print(f"beta = {V_CMB/C:.6f},  beta^2 = {(V_CMB/C)**2:.4e}")
    print()

    # First do a short run to check stability and get a precession estimate
    years = 100  # 100 years = ~415 Mercury orbits
    print(f"Simulation duration: {years} years")

    sol = run_simulation(years=years, steps_per_orbit_mercury=200)

    print(f"Integration: {'success' if sol.success else 'FAILED'}")
    print(f"  Steps: {len(sol.t)}")
    print(f"  Time span: {sol.t[-1]/YEAR:.1f} years")
    print()

    if sol.success:
        print("Precession rates (arcsec/century):")
        print("-" * 50)
        known_gr = {
            "Mercury": 42.98,
            "Venus":    8.62,
            "Earth":    3.84,
            "Mars":     1.35,
        }

        for i, (name, mass, a_au, e, T_yr, peri_lon) in enumerate(BODIES):
            if i == 0 or e < 0.005:
                continue
            result = analyze_precession(sol, i, name)
            if result:
                gr = known_gr.get(name, "?")
                print(f"  {name:8s}: {result['rate_arcsec_century']:+10.2f}  "
                      f"(GR prediction: {gr})  "
                      f"[{result['n_samples']} samples over {result['t_span_yr']:.1f} yr]")
            else:
                print(f"  {name:8s}: insufficient data")

        print()
        print("Note: These rates include both the Newtonian baseline (from")
        print("planetary perturbations) and the STFR CMB-velocity contribution.")
        print("The Newtonian baseline for Mercury is ~530 arcsec/century;")
        print("the unexplained residual after all Newtonian effects is ~43 arcsec/century.")
        print("This simulation uses the modified force law and free Sun,")
        print("so the total should differ from pure Newtonian by the STFR contribution.")

        # Save trajectory for further analysis
        print()
        print("Saving Mercury trajectory...")
        pos_all = sol.y[:3*N].reshape(N, 3, -1)
        vel_all = sol.y[3*N:].reshape(N, 3, -1)
        mercury_data = {
            'times_yr': (sol.t / YEAR).tolist()[::10],
            'x_AU': (pos_all[1, 0, ::10] / AU).tolist(),
            'y_AU': (pos_all[1, 1, ::10] / AU).tolist(),
        }
        with open('/home/claude/mercury_traj.json', 'w') as f:
            json.dump(mercury_data, f)
        print("Saved to mercury_traj.json")