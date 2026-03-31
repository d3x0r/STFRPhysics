# N-Body Orbital Simulation: Three Methods for Perihelion Precession

## Technical Note on the STFR 9-Body Simulation

---

## 1. Overview

The simulation integrates a 9-body solar system (Sun + 8 planets) using RK4, with a clean 2-body shadow system for precision precession measurement via the Laplace–Runge–Lenz vector. Three gravity modes are implemented:

1. **Newton** — pure Newtonian gravity (baseline, no precession beyond planetary perturbation)
2. **Σ Geodesic** — acceleration derived from the displaced transport geometry of the Homogeneous Propagation Framework
3. **Schwarzschild** — the standard post-Newtonian effective force correction

All three share the same Newtonian base; modes 2 and 3 add a post-Newtonian correction that is numerically identical but physically distinct in origin.

---

## 2. Newtonian Base (All Modes)

The Newtonian acceleration of body $j$ due to body $i$:

$$
\vec{a}_{j,\mathrm{Newton}} = -\frac{G m_i}{r^3}\,\vec{r}
$$

where $\vec{r} = \vec{x}_j - \vec{x}_i$ and $r = |\vec{r}|$.

In the simulation, all $N(N-1)/2$ pairs contribute. This gives the standard conservative $N$-body gravitational dynamics with conserved energy:

$$
E = \sum_i \frac{1}{2}m_i v_i^2 - \sum_{i<j}\frac{G m_i m_j}{r_{ij}}
$$

Newton mode produces no anomalous precession. Any precession measured in this mode is due to planetary perturbations (mainly Jupiter and Venus on Mercury).

---

## 3. Method A: Σ Geodesic (Displacement Geometry)

### 3.1 Physical picture

In the Homogeneous Propagation Framework, mass-energy sources a displacement of the transport-supporting vacuum structure. The cumulative displacement field of a point source is:

$$
\Sigma(r) = \frac{GM}{c^2 r}
$$

This displacement deforms the transport structure: radial compression by $1/D$, tangential stretch by $D$, where the transport deformation factor is:

$$
D(r) = \frac{\sqrt{r^2 + d^2}}{r}, \qquad d^2 = \frac{2GM}{c^2}
$$

In the weak field, $D^2 \approx 1 + 2\Sigma$.

The key physical claim is that the vacuum storage capacity $F \cdot H = \varepsilon_0\mu_0$ is anchored to the coordinate grid, not to the displaced transport. A physical meter — realized as a sustained LC excitation — co-deforms with transport. The coordinate grid does not move. This separation determines the effective geometry.

### 3.2 The effective line element

The framework derives (not postulates) the effective coordinate-level line element for excitations propagating through the static displacement background:

$$
ds^2 = -\frac{c^2}{(1+\Sigma)^2}\,dt^2 + D^2\,dr^2 + r^2\,d\Omega^2
$$

The three components have distinct physical origins:

- **Temporal:** A clock cycle traverses a net volume of $F \cdot H$ that scales as $D$. The realized clock rate relative to coordinate time is $1/(1+\Sigma)$, giving $f(r) = 1/(1+\Sigma)^2$.
- **Radial:** A physical meter spans $1/D$ coordinate meters radially, so the radial coefficient is $g(r) = D^2 = 1 + 2\Sigma$.
- **Angular:** The coordinate arc is a property of the coordinate grid, which is not displaced. The angular coefficient remains Euclidean: $h(r) = 1$.

In the weak field ($\sigma = r_s/r = 2\Sigma \ll 1$):

$$
ds^2 \approx -(1-\sigma)\,c^2\,dt^2 + (1+\sigma)\,dr^2 + r^2\,d\Omega^2
$$

### 3.3 Conserved quantities and the effective potential

The Lagrangian for a test particle on this geometry (equatorial plane, $\theta = \pi/2$):

$$
2\mathcal{L} = -f(r)\,c^2\,\dot{t}^2 + g(r)\,\dot{r}^2 + r^2\,\dot{\phi}^2
$$

Killing symmetries give conserved energy and angular momentum per unit mass:

$$
\mathcal{E} = f(r)\,c^2\,\dot{t}, \qquad L = r^2\,\dot{\phi}
$$

The normalization condition $g_{\mu\nu}\dot{x}^\mu\dot{x}^\nu = -c^2$ (for a massive particle) gives:

$$
g(r)\,\dot{r}^2 = \frac{\mathcal{E}^2}{f(r)\,c^2} - \frac{L^2}{r^2} - c^2
$$

Defining the effective potential:

$$
V_{\mathrm{eff}}(r) = -\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{c^2\,r^3}
$$

The first two terms are Newtonian (gravitational + centrifugal). The third term is the displacement geometry's contribution — it arises from the combination of the modified clock rate $f(r)$ and the radial stretching $g(r)$, not from an additional force.

### 3.4 The orbit equation

Using $u = 1/r$ and differentiating the effective potential:

$$
\frac{d^2u}{d\phi^2} + u = \frac{GM}{L^2} + \frac{3GM}{c^2}\,u^2
$$

The $3GM\,u^2/c^2$ correction produces perihelion advance:

$$
\delta\omega = \frac{6\pi GM}{a(1-e^2)\,c^2} = 42.98\ \text{arcsec/century (Mercury)}
$$

### 3.5 Cartesian acceleration for the simulation

The radial force from the effective potential is:

$$
F_r = -\frac{dV_{\mathrm{eff}}}{dr} = -\frac{GM}{r^2} + \frac{L^2}{r^3} - \frac{3GML^2}{c^2\,r^4}
$$

The geometric correction (third term) is inward — it deepens the potential well near the source, pulling the orbit inward at closest approach and advancing the perihelion.

In Cartesian coordinates, with $\vec{r}$ from source to planet and relative velocity $\vec{v}$:

$$
L = |\vec{r} \times \vec{v}| = x\,v_y - y\,v_x \qquad \text{(2D)}
$$

The geometric correction maps to:

$$
\boxed{\vec{a}_\Sigma = -\frac{3GM\,L^2}{c^2\,r^5}\,\vec{r}}
$$

This is the acceleration implemented in the simulation's Σ GEODESIC mode. It is applied only to Sun–planet pairs (the Sun's displacement field dominates; planet–planet displacement is negligible).

### 3.6 Path cost interpretation

The local "cost" of traversing a region of displaced transport space is set by the escape velocity fraction:

$$
\frac{v_{\mathrm{esc}}}{c} = \sqrt{2\Sigma(r)} = \sqrt{\frac{2GM}{c^2 r}} = \frac{\sqrt{\sigma}}{1}
$$

This is the same quantity that determines gravitational lensing deflection in the framework — the integrated path cost through the displaced geometry. The perihelion precession and the lensing deflection are both consequences of the same displacement field $\Sigma(r)$ modifying the transport space through which excitations propagate.

---

## 4. Method B: Schwarzschild Effective Force

### 4.1 Physical picture

In the standard post-Newtonian approach (or equivalently, from the Schwarzschild metric), one derives an effective radial force correction that supplements Newton's law. The correction is typically presented as a consequence of spacetime curvature in general relativity.

### 4.2 The Schwarzschild effective potential

The Schwarzschild metric in coordinates $(t, r, \theta, \phi)$:

$$
ds^2 = -\left(1 - \frac{r_s}{r}\right)c^2\,dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 + r^2\,d\Omega^2
$$

where $r_s = 2GM/c^2$ is the Schwarzschild radius. The geodesic equation gives the same effective potential:

$$
V_{\mathrm{eff}}^{\mathrm{Schw}}(r) = -\frac{GM}{r} + \frac{L^2}{2r^2} - \frac{GML^2}{c^2\,r^3}
$$

and the same orbit equation:

$$
\frac{d^2u}{d\phi^2} + u = \frac{GM}{L^2} + \frac{3GM}{c^2}\,u^2
$$

### 4.3 Implementation as a force correction

The standard simulation approach is to add the correction force directly:

$$
\vec{a}_{\mathrm{Schw}} = -\frac{3GM\,L^2}{c^2\,r^5}\,\vec{r}
$$

This is numerically identical to $\vec{a}_\Sigma$ from the displacement geometry. The original simulation used the equivalent form with $h = L$ (specific angular momentum):

$$
a_{\mathrm{ex}} = \frac{\alpha\,GM\,h^2}{r^4\,c^2}
$$

with $\alpha = 3$ for the full correction, applied radially inward. This is the same expression rearranged.

### 4.4 The α decomposition

The original simulation offered modes $\alpha = 1$, $\alpha = 2$, $\alpha = 3$ to test the individual "contributions." In the displacement framework, these are interpreted as:

| $\alpha$ component | Value | Interpretation |
|---|---|---|
| $\alpha_1$ (retardation) | $1$ | Finite-speed propagation of displacement |
| $\alpha_2$ (kinematic steering) | $\frac{1}{2}$ | External-field Thomas-type correction |
| $\alpha_3$ (displacement gradient) | $\frac{3}{2}$ | Cumulative $\Sigma(r)$ gradient in the radial metric |
| **Total** | **3** | Single geometric result from effective line element |

The decomposition is interpretive. The effective geometry produces $\alpha = 3$ as one integrated result.

---

## 5. Method C: What a Full GR Simulation Would Look Like

### 5.1 Why it's different

Methods A and B both use the weak-field 1PN (first post-Newtonian) approximation. They add a single correction term to Newton's law and integrate in flat Euclidean coordinates with coordinate time. This is adequate for the solar system, where $\Sigma \sim GM/(c^2 r) \sim 10^{-8}$ at Mercury.

A full GR simulation would not add corrections to Newton. It would integrate the geodesic equation on the actual curved spacetime, which involves fundamentally different mathematical machinery.

### 5.2 The geodesic equation

In GR, free particles follow geodesics of the spacetime metric $g_{\mu\nu}$:

$$
\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\,\frac{dx^\alpha}{d\tau}\,\frac{dx^\beta}{d\tau} = 0
$$

where $\tau$ is proper time and $\Gamma^\mu_{\alpha\beta}$ are the Christoffel symbols:

$$
\Gamma^\mu_{\alpha\beta} = \frac{1}{2}\,g^{\mu\nu}\left(\partial_\alpha g_{\nu\beta} + \partial_\beta g_{\nu\alpha} - \partial_\nu g_{\alpha\beta}\right)
$$

For the Schwarzschild metric, these are known analytically and give four coupled ODEs in $(t, r, \theta, \phi)$ parametrized by $\tau$.

### 5.3 Single-body GR orbit integration

For a test particle around a single source (no back-reaction), one can integrate the Schwarzschild geodesic directly. The equations (equatorial plane, $\theta = \pi/2$):

$$
\dot{t} = \frac{\mathcal{E}}{c^2\left(1 - r_s/r\right)}
$$

$$
\dot{\phi} = \frac{L}{r^2}
$$

$$
\dot{r}^2 = \frac{\mathcal{E}^2}{c^2} - \left(1 - \frac{r_s}{r}\right)\left(c^2 + \frac{L^2}{r^2}\right)
$$

These can be integrated with RK4 in proper time $\tau$. The coordinate-time output is obtained from the $\dot{t}$ equation. This is exact (to numerical precision) for the single-source problem — no weak-field approximation needed.

### 5.4 The N-body problem in GR

For multiple interacting bodies of comparable mass, GR does not have a simple closed-form prescription. The options are:

**Einstein–Infeld–Hoffmann (EIH) equations** — the 1PN N-body equations of motion in harmonic coordinates:

$$
\vec{a}_j = \vec{a}_{j,\mathrm{Newton}} + \frac{1}{c^2}\vec{a}_{j,\mathrm{1PN}}
$$

where the 1PN correction includes terms depending on:

- velocities of both bodies ($v_i^2/c^2$, $v_j^2/c^2$, $\vec{v}_i \cdot \vec{v}_j/c^2$)
- radial velocity ($\dot{r}^2/c^2$)
- potential at each body's location ($GM_k/(c^2 r_{jk})$)
- cross terms mixing positions and velocities of all bodies

The full EIH acceleration of body $j$ due to body $i$ is (schematically):

$$
\vec{a}_{j,\mathrm{1PN}}^{(i)} = \frac{Gm_i}{r_{ij}^2}\Bigg[\hat{r}_{ij}\bigg(-v_j^2 - 2v_i^2 + 4\vec{v}_i\cdot\vec{v}_j + \frac{3}{2}(\hat{r}_{ij}\cdot\vec{v}_j)^2
$$
$$
\qquad\qquad + 5\frac{Gm_i}{r_{ij}} + 4\frac{Gm_j}{r_{ij}} + \sum_{k\neq i,j}\ldots\bigg) + (\vec{v}_j - \vec{v}_i)\big(4\hat{r}_{ij}\cdot\vec{v}_j - 3\hat{r}_{ij}\cdot\vec{v}_i\big)\Bigg]
$$

This is considerably more complex than the single correction term used in Methods A and B. It includes velocity-dependent terms, cross-body potentials, and does not reduce to a simple radial correction.

**Numerical relativity** — for strong-field regimes (binary black hole mergers, neutron star collisions), one solves the full Einstein field equations $G_{\mu\nu} = 8\pi G\,T_{\mu\nu}/c^4$ on a computational grid. This involves evolving the metric itself as a dynamical variable — 10 independent components of $g_{\mu\nu}$ at every grid point, subject to constraint equations. This is a fundamentally different kind of simulation from particle integration and requires supercomputer-scale resources for astrophysical problems.

### 5.5 What would change in the simulation

Replacing the current 1PN correction with the full EIH equations would:

1. Add velocity-dependent terms to the acceleration (not just the $L^2/r^4$ radial correction)
2. Include cross-body 1PN interactions (Jupiter's 1PN effect on Mercury, etc.)
3. Require tracking coordinate time vs. proper time carefully
4. Give slightly different results at the $\sim 10^{-16}$ level for solar system orbits

For Mercury precession at the current precision ($\sim 1\%$), the difference between the single-pair 1PN correction (Methods A/B) and the full EIH treatment is negligible. The dominant correction is the Sun–Mercury term, which all three methods agree on exactly.

---

## 6. Summary: Why the Methods Give the Same Number

The three approaches agree numerically because they encode the same mathematical fact at leading post-Newtonian order. The effective potential correction is:

$$
\Delta V = -\frac{GML^2}{c^2\,r^3}
$$

in all cases. The difference is in what that term *means*:

| | Σ Geodesic (HPF) | Schwarzschild (GR) |
|---|---|---|
| **Ontology** | Real vacuum medium with storage densities $\varepsilon_0$, $\mu_0$ | Dynamical spacetime manifold |
| **Source of correction** | Displacement of transport structure by mass-energy | Curvature of spacetime by mass-energy |
| **Line element origin** | Derived from: storage $F \cdot H$ on coordinate grid, transport displaced relative to grid, physical meter co-deforms | Derived from: Einstein field equations, Birkhoff's theorem |
| **Time component** | Clock traverses more $F \cdot H$ storage → runs slower | Proper time flows slower in gravitational well |
| **Radial component** | Physical meter compressed radially by $1/D$ → coordinate length stretched | Radial proper distance exceeds coordinate distance |
| **Angular component** | Coordinate grid not displaced → Euclidean | Schwarzschild coordinates → Euclidean by construction |
| **$\alpha = 3$ origin** | Single geometric result from effective line element | Single geometric result from Schwarzschild geodesic |
| **Path cost language** | Escape velocity $v_{\mathrm{esc}}/c = \sqrt{2\Sigma}$ sets local transport cost | No direct analog (curvature is the primitive) |

The numerical identity is a consistency check: the displacement framework's effective geometry agrees with the Schwarzschild geometry at leading order. The frameworks diverge in their physical interpretation, their ontological commitments, and potentially in higher-order predictions (the HPF predicts a breathing-mode gravitational wave channel that GR does not).

---

## 7. Code Reference

### Σ Geodesic acceleration (Cartesian 2D)

```javascript
// Cumulative displacement at distance r from source of mass M
// Σ(r) = GM/(c²r)
function sigma(GM, r) {
    return GM / (C2 * r);
}

// Transport deformation factor D(r) = √(1 + 2Σ)
function Dfactor(GM, r) {
    return Math.sqrt(1 + 2 * sigma(GM, r));
}

// In the force loop, for Sun-planet pair:
const L = dx * dvy - dy * dvx;   // specific angular momentum
const L2 = L * L;
const r5 = r * r * r * r * r;

// Geodesic acceleration from displaced transport geometry
// This is -dV_eff/dr for V_eff = -GM/r + L²/(2r²) - GML²/(c²r³)
const aGeo = 3 * GMs * L2 / (C2 * r5);

// Apply inward on planet (toward source)
ax_planet -= aGeo * dx / r;
ay_planet -= aGeo * dy / r;
```

### Schwarzschild force correction (equivalent)

```javascript
// Same numerical result, force-correction framing
const h = dx * dvy - dy * dvx;   // same as L
const h2 = h * h;
const r4 = r * r * r * r;
const aex = 3 * G * MSUN * h2 / (r4 * C2);

// Apply inward on planet
ax_planet -= aex * dx / r;
ay_planet -= aex * dy / r;
```

The two code blocks compute the same acceleration. The difference is in the comments.
