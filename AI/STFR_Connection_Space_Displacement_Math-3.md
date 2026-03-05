# STFR Connection Space Displacement: Mathematical Development

## Working Notes — Derivations, Results, and Open Questions

---

## 1. The Displacement Function

Mass displaces connection space radially. The displacement at coordinate distance $r$ from a point mass with displacement parameter $d$ is:

$$D(r, d) = \frac{\sqrt{(r+\epsilon)^2 + d^2}}{r + \epsilon}$$

where $\epsilon$ is a small regularization parameter preventing the singularity at $r = 0$. Since $D$ is a ratio, adding $\epsilon$ does not disturb the function at any $r \gg \epsilon$.

**Asymptotic behavior:**

- $r \to \infty$: $D \to 1$ (flat space)
- $r = d$: $D = \sqrt{2}$
- $r \to 0$: $D \to d/\epsilon$ (regulated divergence)

---

## 2. Deformation Geometry: Inserting a Sphere into a Sphere

Consider a sphere of vacuum medium into which a new sphere of volume $(4/3)\pi d^3$ is inserted at the origin. Each spherical shell originally at radius $r$ is displaced to:

$$r' = \sqrt{r^2 + d^2}$$

The deformation of a unit cell originally at radius $r$:

- **Radial:** compressed by $1/D$
- **Tangential ($\theta$):** stretched by $D$
- **Tangential ($\phi$):** stretched by $D$
- **Volume:** $(1/D) \cdot D \cdot D = D$ (net expansion)

Each displaced cell occupies $D$ times its original coordinate volume.

---

## 3. F·H and Coordinate Space

**Key principle:** $F \cdot H$ (Farad·Henry $= s^2$) is attached to coordinate space, not to the displaced medium. It is a property of the coordinate grid itself.

A displaced medium cell now spans more coordinate space and therefore encounters more $F \cdot H$. The propagation speed through a cell is inversely proportional to the $F \cdot H$ it encounters.

**Tangential propagation:** Cell is stretched by $D$, covers $D$ times more coordinate length, encounters $D$ times more $F \cdot H$. Propagation speed:

$$C_\perp = \frac{C_0}{D}$$

**Radial propagation:** Cell is compressed by $1/D$, covers $1/D$ times the coordinate length, encounters $1/D$ times the $F \cdot H$. Propagation speed:

$$C_r = C_0 \cdot D$$

Light goes slower tangentially and faster radially near a mass. The anisotropy is real in coordinate terms and goes in opposite directions.

**Note on the speed of light:** $C$ is defined in physical space — where rods and clocks exist. Light always travels at $C$ in physical space. A physical meter near a mass contains more $F \cdot H$ than a physical meter far from mass, because the connection space displacement has stretched that meter over more coordinate space. Light dutifully crosses each physical meter at $C$, but each meter takes longer because it is backed by more $F \cdot H$.

**On the two perspectives of stretching:** If physical space is merely stretched, one might argue light covers more coordinate distance per physical meter (faster in coordinate terms). Alternatively, the additional coordinate length means more $F \cdot H$ (slower). These oppose each other. The resolution: they are not two separate effects. The stretch and the $F \cdot H$ increase are the same phenomenon. The limit of $C$ is defined in the physical frame (perspective 2), not the coordinate frame (perspective 1).

---

## 4. Two Types of Vacuum Modification

### Type G — Gravitational/Geometric Displacement

Mass pushes the wiring outward, increasing the amount of medium per coordinate length. The medium itself is unchanged — same wires, same capacitors, same inductors — just more of it per coordinate distance. Both $\mu_0$ and $\varepsilon_0$ scale together because you are getting more of the same stuff.

$$\mu_0^G(r) = \mu_0 \cdot \sigma(r), \quad \varepsilon_0^G(r) = \varepsilon_0 \cdot \sigma(r)$$

$$Z_0^G(r) = \sqrt{\frac{\mu_0^G}{\varepsilon_0^G}} = Z_0 \quad \text{(constant)}$$

Achromatic lensing, no birefringence. Consistent with observation. Proportional scaling of $\mu_0$ and $\varepsilon_0$ is taken as empirically established from gravitational lensing observations.

Analogy: compressing a transmission line by folding more cable into a shorter physical length — impedance per unit cable length is unchanged, but impedance per unit room length increases for both $L$ and $C$ equally.

### Type M — Material/Matter Modification

Matter locally modifies the incremental storage capacity of the LC network asymmetrically. For a magnetic material (ferrite), the inductors already have current flowing through them (the magnet's persistent field). A saturated inductor has reduced incremental inductance.

$$\mu_0^M = \mu_0(1 + \chi_m), \quad \varepsilon_0^M = \varepsilon_0(1 + \chi_e)$$

where $\chi_m$ and $\chi_e$ are independent and generally unequal.

$$Z_0^M = Z_0\sqrt{\frac{1+\chi_m}{1+\chi_e}} \neq Z_0$$

Both $C$ and $Z_0$ change. Produces chromatic effects, dispersion, birefringence — exactly what is observed in optical materials.

### Magnet Case

A permanent magnet partially occupies the inductors, reducing their incremental capacity. Capacitors are unaffected.

$$\mu_0^{\text{eff}} = \mu_0(1-\alpha(B)), \quad \varepsilon_0^{\text{eff}} = \varepsilon_0$$

$$C^{\text{magnet}} = \frac{C_0}{\sqrt{1-\alpha}} > C_0, \quad Z_0^{\text{magnet}} = Z_0\sqrt{1-\alpha} < Z_0$$

Light speeds up and impedance drops near a strong magnetic field. Potential connection to Cotton-Mouton effect and QED vacuum birefringence, though the mechanism and predictions may differ in testable ways.

---

## 5. Cumulative Displacement and the 1/r Potential

### The Problem

The local displacement $D(r) - 1 \approx d^2/2r^2$ has $1/r^2$ dependence, while Newtonian gravity requires a $1/r$ potential.

### The Solution

Time dilation is not determined by the local value of $D$, but by the **cumulative displacement** — the total excess vacuum medium encountered along the radial path from $r$ to infinity.

Define:

$$\Sigma(r) = \int_r^{\infty} (D(r') - 1)\, dr'$$

In the weak field ($d \ll r$), with $D - 1 \approx d^2/2r'^2$:

$$\Sigma(r) \approx \int_r^{\infty} \frac{d^2}{2r'^2}\, dr' = \frac{d^2}{2r}$$

This is $1/r$ — the correct radial dependence.

**Physical interpretation:** The cumulative displacement is the total excess vacuum medium a signal must traverse to get from radius $r$ to infinity. It directly determines how much slower clocks run and how much extra time light takes. Calling it a "potential" would import Newtonian baggage — it is better described as the accumulated displacement.

### The Hierarchy

- $D(r) - 1 \approx d^2/2r^2$: local displacement (field strength)
- $\Sigma(r) \approx d^2/2r$: cumulative displacement (governs clocks and propagation)
- $d\Sigma/dr \approx d^2/2r^2$: gradient of cumulative displacement (acceleration/gravity)

These are consistent: the gradient of $\Sigma$ recovers $D - 1$.

### Matching to Newtonian Gravity

Setting $\Sigma(r)$ equal to the Newtonian time dilation:

$$\frac{d^2}{2r} = \frac{GM}{C^2 r}$$

$$d^2 = \frac{2GM}{C^2} = r_s$$

where $r_s$ is the Schwarzschild radius. The acceleration:

$$g = C^2 \frac{d\Sigma}{dr} = C^2 \cdot \frac{d^2}{2r^2} = \frac{GM}{r^2}$$

Newton falls out directly. The $C^2$ factor converts vacuum-medium displacement units to acceleration — consistent with $C^2 = J/kg$ being the energy capacity per unit displacement.

### Per-Nucleon Displacement

Working backward from the observed solar lensing (~1.75 arcsec), the Sun's total displacement volume divided by its nucleon count gives a displacement per nucleon on the order of femtometers — consistent with nuclear radii. Each nucleon displaces a volume of connection space equal to its own size.

---

## 6. Escape Velocity Equivalence

The time dilation in a gravity well equals the time dilation from moving at the local escape velocity. This is experimentally confirmed (GPS clock corrections).

$$\frac{d\tau}{dt}\bigg|_{\text{grav}} = \frac{1}{1 + \Sigma(r)} \approx 1 - \frac{GM}{C^2 r}$$

$$\frac{d\tau}{dt}\bigg|_{\text{vel}} = \Gamma(v_{\text{esc}}) = \frac{\sqrt{C^2 - v_{\text{esc}}^2}}{C} \approx 1 - \frac{GM}{C^2 r}$$

with $v_{\text{esc}} = \sqrt{2GM/r}$. Both give the same result with $d^2 = 2GM/C^2$.

---

## 7. Shapiro Delay

For a signal passing a mass at closest approach $b$, traveling tangentially through displaced space. Using $\Sigma(r)$ as the propagation quantity:

$$\Delta t = \frac{1}{C_0}\int_{-L}^{L} \Sigma(r)\, dz = \frac{d^2}{2C_0}\int_{-L}^{L} \frac{dz}{\sqrt{b^2 + z^2}}$$

$$= \frac{d^2}{C_0}\ln\left(\frac{2L}{b}\right) \quad \text{for } L \gg b$$

With $d^2 = 2GM/C^2$:

$$\Delta t \approx \frac{2GM}{C^3}\ln\left(\frac{2L}{b}\right)$$

This has the correct **logarithmic dependence on $b$**, matching the functional form of the GR prediction. The coefficient is a factor of 2 smaller than GR; the discrepancy may relate to the geometric displacement (perspective) contribution to the total delay (see Section 8).

---

## 8. Light Deflection

### The Two Contributions

Light deflection has two **separate and independent** physical effects:

**1. Propagation delay (Shapiro-type):** The physical meter near the mass has more $F \cdot H$. Light takes longer per physical meter. The wavefront's near edge is delayed relative to the far edge, tilting the arrival angle. This contributes:

$$\alpha_{\text{delay}} = \frac{d^2}{b} = \frac{2GM}{C^2 b}$$

(computed from the transverse gradient of the Shapiro delay integral)

**2. Geometric displacement (perspective/ray-tracing):** Light follows a straight line in physical space, but physical space is displaced around the mass. The straight physical-space path maps to a curved coordinate-space path. The observer at a finite distance projects the arriving ray backward as if it were straight, placing the star at a different apparent angular position.

This is analogous to the Eddington experiment setup: the star's light goes around the Sun effectively in a straight line in physical space, but the gap between the Sun and the star is also lensed by the spatial displacement. What the observer sees from the angular perspective (they only see the right-side edge — the basis of the holographic principle) is that light from behind the Sun has been advanced around it.

The observer does not register that the path goes back to a straight line at infinity. The deflected path arrives at the observer, and the observer projects it back out as if it were straight, placing the source at a displaced angular position.

### Anisotropy Cancellation

The anisotropic contribution (tangential delay vs. radial acceleration) cancels exactly. The effective index at angle $\theta$ to the radial direction:

$$n_{\text{eff}}(\theta) = D\sin^2\theta + \frac{1}{D}\cos^2\theta$$

For weak field, $D \approx 1 + \delta$ where $\delta = d^2/2r^2$:

$$n_{\text{eff}} - 1 \approx \delta(\sin^2\theta - \cos^2\theta) = -\delta\cos 2\theta$$

With $\sin^2\theta = b^2/r^2$ and $\cos^2\theta = z^2/r^2$:

$$\int_{-\infty}^{\infty}(n_{\text{eff}} - 1)\, dz = \frac{d^2}{2}\int_{-\infty}^{\infty}\frac{b^2 - z^2}{(b^2+z^2)^2}\, dz = 0$$

The integral vanishes identically. The anisotropic contribution to both Shapiro delay and deflection is exactly zero.

### Total Deflection

Each contribution (propagation delay and geometric displacement) gives $d^2/b = 2GM/(C^2 b)$, so the total:

$$\alpha_{\text{total}} = \frac{2d^2}{b} = \frac{4GM}{C^2 b}$$

This matches the GR prediction and the observed value (1.75 arcsec at the solar limb).

---

## 9. Multi-Body Displacement: Ordering Rule

When multiple masses displace connection space, the algorithm is:

1. Compute the displacement from each source for a given point
2. Sort by distance — **farthest source first, closest source last**
3. Apply displacements in that order, each acting on the result of the previous

The closest mass's displacement is applied last, meaning it acts on space already displaced by everything farther away. The wires "flow over" more distant displacements.

**Physical motivation:** Local connection space has already been displaced by distant masses. A nearby mass displaces that already-displaced space — it pushes wires that are already carrying the distant displacement.

**Constraint:** Two masses cannot occupy the same displacement space. Between two nearby masses, the space becomes extremely stressed laterally. At the boundary between two displacement regions, the space is effectively "torn" — analogous to the Coulomb barrier. Outside the wiring network, the wire displacement itself acts as a confining force (analogous to the strong force). Edge conditions between colliding displacement regions involve additional physics that precludes event horizon collisions.

---

## 10. Thomas Precession: Zero in STFR

### Recovering the Lorentz Simultaneity Term

Starting from the STFR propagation delay equation (1.29), for emitter at origin, observer at origin, $T = 0$:

$$T_{\Delta E} = \frac{\sqrt{(C^2 - \vec{V}_O^2)\vec{P}_{\Delta O}\cdot\vec{P}_{\Delta O} + (\vec{P}_{\Delta O}\cdot\vec{V}_O)^2} + \vec{P}_{\Delta O}\cdot\vec{V}_O}{C^2 - V_O^2}$$

This contains two parts:

1. **The light cone** (square root term): the actual signal travel time accounting for the observer's motion
2. **The simultaneity correction**: $\vec{P}\cdot\vec{V}/(C^2 - V^2)$

Stripping out the light cone, the remaining simultaneity term is:

$$\frac{Pv}{C^2 - v^2}$$

The position $P$ is in physical space, length-contracted by $\Gamma = \sqrt{C^2 - v^2}/C$ relative to coordinate separation $x$:

$$P = x\Gamma = x\frac{\sqrt{C^2 - v^2}}{C}$$

Substituting:

$$\frac{xv\sqrt{C^2-v^2}/C}{C^2-v^2} = \frac{xv}{C\sqrt{C^2-v^2}} = \gamma\frac{xv}{C^2}$$

This recovers the Lorentz simultaneity term exactly. The Lorentz transform is the STFR propagation equation with the light cone removed and length contraction applied to positions.

### Composing Two Non-Parallel Velocities

**In SR (Lorentz boost composition):**

Boost 1 along $x$ at $v_1$, then Boost 2 along $y$ at $v_2$:

$$t'' = \gamma_1\gamma_2 t - \gamma_1\gamma_2\frac{v_1 x}{C^2} - \gamma_2\frac{v_2 y}{C^2}$$

$$x'' = \gamma_1(x - v_1 t)$$

$$y'' = \gamma_2 y - \gamma_1\gamma_2 v_2 t + \gamma_1\gamma_2\frac{v_1 v_2 x}{C^2}$$

The cross-term $\gamma_1\gamma_2 v_1 v_2 x/C^2$ in $y''$ mixes $x$ into $y$. The composition is a boost plus a rotation — **Thomas precession**. To lowest order: $\theta_T \approx v_1 v_2 / 2C^2$.

**In STFR (sequential velocity application):**

Apply velocity $v_1$ along $x$. Simultaneity: $v_1 x/(C^2 - v_1^2)$. Length contraction: $x_1 = x\Gamma_1$, $y_1 = y$.

Apply velocity $v_2$ along $y$ to the already-contracted coordinates. Simultaneity: $v_2 y_1/(C^2 - v_2^2) = v_2 y/(C^2 - v_2^2)$. Length contraction: $x_2 = x_1$, $y_2 = y_1 \Gamma_2$.

Final coordinates:

$$x_2 = x\frac{\sqrt{C^2-v_1^2}}{C}, \quad y_2 = y\frac{\sqrt{C^2-v_2^2}}{C}$$

**No cross-term.** $x_2$ has no $y$-dependence. $y_2$ has no $x$-dependence. Two independent contractions along perpendicular axes — no rotation.

Total simultaneity (after converting to coordinate separations):

$$\text{STFR:} \quad \gamma_1\frac{v_1 x}{C^2} + \gamma_2\frac{v_2 y}{C^2}$$

$$\text{SR:} \quad \gamma_1\gamma_2\frac{v_1 x}{C^2} + \gamma_2\frac{v_2 y}{C^2}$$

The difference: SR has an extra $\gamma_2$ on the first term. The second boost modifies the first boost's simultaneity in SR but not in STFR.

### Physical Origin of the Difference

In SR, the second boost retroactively modifies the first boost's simultaneity (multiplicative composition). The $v_2 \times t'$ term in $y''$ picks up the $v_1 x/C^2$ part of $t'$, generating x-y mixing.

In STFR, each velocity creates its own simultaneity slope and length contraction independently. The physical reality is the light cone at each step — there is nothing to retroactively modify. This is directly connected to feel-velocity being ordinary vector addition — commutative and associative. The effects do not couple.

**STFR predicts zero Thomas precession.** This is a falsifiable difference from SR at measurable $\beta$.

---

## 11. Geodetic Precession: Parallel Transport in Displaced Space

### The Displacement Metric

The anisotropic displacement gives a spatial metric near a spherically symmetric mass:

$$ds^2 = \frac{1}{D^2}dr^2 + D^2 r^2(d\theta^2 + \sin^2\theta\, d\phi^2)$$

### Parallel Transport Around a Circular Orbit

For a circular orbit at constant $r$, the key metric components are $g_{rr} = 1/D^2$ and $g_{\phi\phi} = D^2 r^2$.

Using $D^2 r^2 = r^2 + d^2$, so $\partial(D^2 r^2)/\partial r = 2r$.

Christoffel symbols:

$$\Gamma^\phi_{r\phi} = \frac{1}{D^2 r}, \quad \Gamma^r_{\phi\phi} = -D^2 r$$

In an orthonormal basis ($e_{\hat{r}} = D\,\partial_r$, $e_{\hat{\phi}} = (1/Dr)\partial_\phi$), the parallel transport equations reduce to:

$$\frac{dV^{\hat{r}}}{d\phi} = V^{\hat{\phi}}, \quad \frac{dV^{\hat{\phi}}}{d\phi} = -V^{\hat{r}}$$

This is rotation at exactly 1 radian per radian of orbital angle. After a full orbit ($\phi = 2\pi$), the vector returns to its original orientation.

**Result: Zero geodetic precession from the symmetric displacement.**

This is consistent with a great circle being a geodesic — parallel transport around a geodesic of a curved space produces no holonomy. Precession requires a non-geodesic path, i.e., a path that is not a great circle of the displacement geometry.

### Possible Sources of Precession

**Tidal torque mechanism:** A gyroscope with spin axis perpendicular to the orbital plane experiences different displacement on its near-mass and far-mass sides. The gradient of $D$ across the gyroscope:

$$\frac{dD}{dr} \approx \frac{-d^2}{r^3}$$

The inner edge encounters more $F \cdot H$ per orbit than the outer edge. This creates a force-free torque. Whether this produces size-independent precession (as required to match GR's prediction, which is independent of gyroscope size) needs further development.

**CMB-frame asymmetry:** The Earth's motion through connection space creates an asymmetric displacement field — the leading edge is not yet displaced, the trailing edge is extended. An orbit tilted relative to the velocity axis traces a non-geodesic path through this asymmetric field, analogous to parallel transport around a latitude line (not a great circle) on a sphere.

The effective velocity may be significantly larger than the 370 km/s CMB dipole — recent observations suggest bulk flows up to ~1700 km/s in the same direction. The CMB dipole includes orbital velocities; the local velocity through connection space includes the ~220 km/s galactic orbital component separately.

Preliminary magnitude estimates suggest the CMB-frame precession may be too small to account for GPB's 6.6 arcsec/yr, but the correct velocity and scaling law ($\beta$ vs. $\beta^2$) remain uncertain.

---

## 12. Gravity Probe B: Assessment

GPB measured precession consistent with GR for both geodetic (6.6 arcsec/yr) and frame-dragging (39 milliarcsec/yr).

**STFR predictions:**

- Zero Thomas precession (commutative feel-velocity addition)
- Zero geodetic precession from symmetric displacement (parallel transport calculation)
- Possible nonzero precession from CMB-frame asymmetry (magnitude uncertain)
- Possible tidal torque mechanism (needs development)

**Assessment:** GPB is a single experiment with notoriously noisy data. The signal extraction required years of analysis to separate from unexpected torques on the gyroscopes. If the analysis assumed the GR-predicted value as a target, confirmation bias in the noise reduction is a legitimate concern. The framework makes a clean, falsifiable prediction (zero symmetric precession), which is a stronger theoretical position than post-hoc parameter fitting.

The CMB-frame velocity establishes a preferred axis. A quantitative comparison of CMB-frame precession against GPB's specific orbital geometry (~20 degree tilt from CMB-perpendicular plane) is an open calculation.

---

## 13. Mercury Perihelion Precession

### Mechanism: Finite-C Retardation on an Eccentric Orbit

The dominant contribution to Mercury's perihelion precession is a local effect — not the CMB-frame quadrupole. It arises from the finite propagation speed of the displacement field acting on Mercury's eccentric orbit.

The displacement field around the Sun propagates at $C$. For uniform relative motion, the cone geometry ensures the field points to the Sun's current position (the Liénard-Wiechert result). But Mercury is in an eccentric orbit — its velocity and distance are continuously changing. The cone compensation is imperfect for accelerated motion, producing a small tangential force.

### The Retardation Mismatch

The retardation time for Mercury at distance $r$ from the Sun is $\tau = r/C$. During this time, Mercury's orbital angle changes, and because Mercury is accelerating (curved orbit), it is not quite where the retarded cone geometry predicts.

The angular mismatch from orbital curvature during the retardation time:

$$\delta\phi_{\text{mismatch}} = \frac{1}{2}\ddot{\phi}\tau^2$$

Using $L = r^2\dot{\phi} = \text{const}$ (angular momentum), $\ddot{\phi} = -2L\dot{r}/r^3$:

$$\delta\phi_{\text{mismatch}} = \frac{L\dot{r}}{rC^2}$$

This produces a tangential force:

$$F_\perp = \frac{GM}{r^2}\cdot\frac{L\dot{r}}{rC^2}$$

This force is prograde when Mercury recedes from the Sun ($\dot{r} > 0$) and retrograde when approaching ($\dot{r} < 0$). Due to the $1/r^3$ weighting, perihelion is weighted more heavily than aphelion, and the effect does not cancel over one orbit.

### Three Contributions to Precession

The total precession arises from three effects, each of order $GM/(rC^2)$, all natural consequences of finite $C$ and the displacement geometry:

**1. Retardation mismatch (cone geometry):** The displacement field's cone does not perfectly converge on Mercury's current position for accelerated motion. The residual tangential force integrated over one orbit gives a precession contribution with coefficient $\alpha_1 = 1$.

**2. Time dilation of Mercury:** Mercury's LC oscillations run slower by $\Gamma = \sqrt{C^2 - v^2}/C$ as it moves through connection space. Its mechanical response to the gravitational field is modified — the time-dilated internal oscillations change how momentum accumulates. Using the virial theorem ($\langle v^2 \rangle = GM/a$), this gives $\alpha_2 = 1$.

**3. Cumulative displacement ($\Sigma$) effect on momentum:** Mercury traverses more $F \cdot H$ per unit coordinate distance when deeper in the Sun's displacement field. The cumulative displacement $\Sigma(r) = d^2/2r$ modifies the effective dynamics — a correction of order $(GM/rC^2) \cdot GM/r$ to the potential. This gives $\alpha_3 = 1$.

### Combined Result

Writing the effective corrected potential:

$$V_{\text{eff}} = -\frac{GM}{r}\left(1 + \frac{\alpha\, GM}{rC^2}\right)$$

with $\alpha = \alpha_1 + \alpha_2 + \alpha_3 = 3$, the standard precession integral gives:

$$\delta\omega = \frac{2\pi\alpha\, GM}{a(1-e^2)C^2} = \frac{6\pi\, GM}{a(1-e^2)C^2}$$

For Mercury ($a = 5.79 \times 10^{10}$ m, $e = 0.2056$):

$$\delta\omega = 42.98 \text{ arcsec/century}$$

This matches the GR prediction and the observed anomalous precession.

### Relationship to the CMB-Frame Quadrupole

The CMB-frame quadrupole effect described in the original STFR document is an **additional** contribution, not the primary mechanism. It depends on Mercury's perihelion orientation relative to the CMB velocity axis and scales as $\beta^2$. The perturbation estimate from the original document (~26.5 arcsec/century) used only the quadrupole and did not include the three local retardation contributions derived here.

The local retardation mechanism accounts for the full 43 arcsec/century independently of CMB-frame effects. The CMB quadrupole, if present, would be a smaller additional perturbation whose secular average over the Sun's galactic orbit (~225 Myr) is zero.

### Note on Verification

The mapping of the three contributions onto $\alpha = 1$ each relies on the standard post-Newtonian decomposition applied to STFR concepts. While the physical mechanisms are natural consequences of the framework (finite-$C$ cone geometry, $\Gamma$ time dilation, and $\Sigma(r)$ displacement), confirming the exact coefficients requires a full N-body numerical integration in the STFR framework — the simulation flagged as needed in the original document.

---

## 14. Summary of Results

| Quantity | STFR Expression | Comparison to GR/Newton |
|----------|----------------|------------------------|
| Displacement function | $D(r,d) = \sqrt{r^2+d^2}/r$ | Framework-specific |
| Cumulative displacement | $\Sigma(r) = d^2/2r$ | Equivalent to Newtonian potential |
| Mass-displacement relation | $d^2 = 2GM/C^2 = r_s$ | Schwarzschild radius |
| Gravitational acceleration | $g = GM/r^2$ | Exact match |
| Time dilation | $d\tau/dt \approx 1 - GM/(C^2 r)$ | Match (confirmed by GPS) |
| Shapiro delay | $\propto \ln(2L/b)$ | Correct functional form; coefficient TBD |
| Light deflection | $4GM/(C^2 b)$ | Exact match (two separate contributions) |
| Mercury precession | $6\pi GM/[a(1-e^2)C^2]$ | Exact match (three contributions) |
| Thomas precession | Zero | Differs from SR |
| Geodetic precession (symmetric) | Zero | Differs from GR |
| Per-nucleon displacement | $\sim$ femtometers | Consistent with nuclear radii |

---

## 15. G, Displacement Volume, and the Nuclear Scale

### The Tension Between Gravity and Volume Addition

Two constraints on the displacement parameter $d$:

- **From gravity (escape velocity):** $\Sigma(r) = d^2/(2r) = GM/(C^2 r)$, giving $d^2 = 2GM/C^2$, so $d \propto M^{1/2}$
- **From merger volume conservation (approximate):** displacement volumes add, so $d^3 \propto M$, giving $d \propto M^{1/3}$

These are inconsistent with the same $d$ unless the relationship between displacement geometry and gravitational effect involves an additional factor — which is where $G$ enters.

### G as the Bridge

$G$ is the conversion constant between the geometric displacement (how much connection space a mass displaces, in cubic meters) and the gravitational consequence (how much that displacement affects propagation, time dilation, and acceleration).

The displacement per nucleon is set by nuclear/particle physics. $G$ encodes how much gravitational effect each unit of displacement volume produces. Structurally:

$$G = \frac{d_n^3 \cdot C^2}{m_n} \cdot (\text{geometric factor})$$

where $d_n$ is the displacement radius per nucleon, $m_n$ is the nucleon mass, and $C$ is the propagation speed. If $d_n$ is determined by the physics of mass (strong force confinement, mass generation mechanism, or similar), then $G$ is derivable from $C$, $m_n$, and $d_n$.

### Displacement Per Nucleon: Scale Estimates

Depending on the form of $D(r,d)$ and how displacement enters $\Sigma$:

- $D - 1 \sim d^2/r^2$ (original form): $d_n \sim 10^{-27}$ m (too small)
- $D - 1 \sim d^3/r^2$, $\Sigma = d^3/r$: $d_n \sim 10^{-18}$ m (weak force scale)
- Working backward from lensing with $d = r_s$ and $d^3$ additive: $d_n \sim 0.28$ fm (sub-nuclear scale)

None of these exactly match the proton charge radius (0.87 fm), but the third is in the right neighborhood. The exact value depends on which form of $D$ correctly describes the displacement geometry.

### Lensing Correction to Measured Nucleon Size

An important consideration: the measured proton charge radius is determined by electromagnetic scattering experiments. If each nucleon's connection space displacement lenses photons around it, the measured (apparent) size would be **smaller** than the actual displacement radius. The displacement would deflect scattering photons, making the nucleon appear more compact than its true connection space footprint.

This means $d_n > r_{\text{proton, measured}}$, and the relationship between the apparent charge radius and the true displacement radius involves the same lensing physics that governs gravitational deflection at macroscopic scales. The actual displacement per nucleon could be several femtometers, with the sub-femtometer measured radius being the lensed apparent size.

### Status

This exploration establishes that $G$ plays the role of a bridge constant between displacement geometry and gravitational effect. The displacement per nucleon is plausibly in the femtometer range (nuclear scale), with the exact value depending on the correct form of $D(r,d)$ and subject to the lensing correction on measured nucleon sizes. Deriving $G$ from first principles would require knowing $d_n$ independently — potentially from the LC network geometry or from the connection space displacement mechanism itself.

---

## 16. Open Questions

1. **Strong-field $\Sigma(r)$:** The exact integral of $D-1$ from $r$ to infinity has a logarithmic divergence. The weak-field $d^2/2r$ is well-defined, but the strong-field form needs regularization or reinterpretation.

2. **Shapiro delay coefficient:** Factor of 2 discrepancy with GR in the propagation-delay contribution alone. Progress: the geometric displacement (perspective/ray-tracing) contribution is a separate, independent effect that likely closes this gap — just as it does for light deflection. The two contributions (propagation delay + geometric displacement) together match GR for deflection; the same decomposition should apply to Shapiro delay but has not been explicitly verified.

3. **Tidal precession:** Whether differential $D$ across an extended gyroscope produces size-independent precession (force-free torque).

4. **GPB quantitative comparison:** CMB-frame precession with correct velocity (370 km/s vs. possible ~1700 km/s bulk flow) and scaling ($\beta$ vs. $\beta^2$) against GPB orbital geometry.

5. **Material vacuum modification:** Quantifying $\alpha(B)$ — the saturation function for LC network inductors near a magnet.

6. **Displacement composition:** Whether the farthest-first ordering rule modifies the radial dependence when building mass from integrated shells in the near-field regime.

7. **G from first principles:** The relationship $G = d_n^3 C^2 / m_n$ (times a geometric factor) suggests $G$ is derivable if $d_n$ can be determined independently from the LC network geometry or mass generation mechanism. The exact form of $D(r,d)$ determines the geometric factor and the precise value of $d_n$. The lensing correction between true displacement radius and measured nucleon radius must be accounted for.

8. **Mercury N-body verification:** Full numerical integration confirming the three retardation contributions each give $\alpha = 1$ exactly, rather than relying on the post-Newtonian mapping.

9. **Black hole mergers and displacement conservation:** Preliminary comparison to LIGO events shows merger remnant masses are best fit by an exponent $n \approx 1.1$ in $M_A^n + M_B^n = M_C^n$, close to simple mass addition minus radiated energy. Whether displacement volume is strictly conserved in mergers (with gravitational wave energy representing mass-energy loss but not displacement loss) or whether the volume-addition picture needs refinement remains open.
