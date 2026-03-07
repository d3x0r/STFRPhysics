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

A displaced medium cell now spans more or less coordinate space depending on direction (tangentially stretched by $D$, radially compressed by $1/D$). However, the physical meter — the rod — co-expands or co-compresses with the displacement in every direction. This is the same rod co-expansion argument that resolves gravitational redshift.

**Tangential direction:** The cell is stretched by $D$, covering $D$ times more coordinate length and encountering $D$ times more $F \cdot H$. But a tangential physical meter is also stretched by $D$. The meter is longer in coordinate terms by the same factor as the extra $F \cdot H$ it encounters. Light crosses one physical meter at $C$, encountering the same total $F \cdot H$ per physical meter as it would far from mass.

**Radial direction:** The cell is compressed by $1/D$, covering less coordinate length and encountering less $F \cdot H$. But a radial physical meter is also compressed by $1/D$. The meter is shorter in coordinate terms by the same factor as the reduced $F \cdot H$. Light crosses one physical meter at $C$, again encountering the same total $F \cdot H$ per physical meter.

In both directions, the coordinate-space changes to the medium and the coordinate-space changes to the rod cancel exactly. **Light travels at $C$ in physical space in all directions.** There is no anisotropic speed of light — not in physical space, and not in coordinate space either, because the coordinate distance light must traverse per physical meter is rescaled by exactly the factor that the $F \cdot H$ per coordinate meter is rescaled.

**The speed of light is $C$, everywhere, in every direction, in every frame.** What changes near a mass is not the speed of light but the rate of clocks — because clocks are physical objects whose oscillations are mediated by the same vacuum impedance. The cumulative displacement $\Sigma(r)$ determines how much slower clocks run, and this is what produces all observable time-dependent gravitational effects (Shapiro delay, gravitational redshift as a clock-rate difference, etc.).

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

### Dimensional Note: Mass as Surface Area

Mass (kg) relates directly to the surface area of the displacement sphere. The surface area of a sphere of radius $d$ is $4\pi d^2$, so the displacement radius $d$ is a proper length (meters) obtained from $d = \sqrt{d^2}$. The proper units on the speed of light are $m/\sqrt{F \cdot H}$, so:

$$C^2 = \frac{d^2}{F \cdot H}$$

This says the specific energy of the vacuum ($C^2 = J/kg = m^2/s^2 = m^2/(F \cdot H)$) is the displacement area per unit of $F \cdot H$ — a direct relationship between the displacement geometry and the vacuum propagation constant.

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

### Mechanism: Pure Time Dilation

The Shapiro delay is entirely a clock-rate effect. Light travels at $C$ in physical space in all directions — it does not slow down near a mass (see Section 3). The delay arises because the distant observer's clock runs faster than clocks near the mass. A signal passing through the region near a mass takes longer as measured by distant clocks, not because the signal is slower, but because distant clocks accumulate more ticks while the signal traverses the slow-time region.

This is the same mechanism as gravitational redshift (Section 3 of the Briefing Document): not something happening to the light, but a difference in clock rates between the region the signal traverses and the region where the measurement is made.

### Derivation

For a signal passing a mass at closest approach $b$, the cumulative displacement at distance $r$ is $\Sigma(r) = d^2/(2r)$. The time dilation experienced along the path, integrated over the one-way trajectory:

$$\Delta t_{\text{one-way}} = \frac{1}{C}\int_{-L}^{L} \Sigma(r)\, dz = \frac{d^2}{2C}\int_{-L}^{L} \frac{dz}{\sqrt{b^2 + z^2}}$$

$$= \frac{d^2}{2C}\ln\left(\frac{2L}{b}\right) \quad \text{for } L \gg b$$

With $d^2 = 2GM/C^2$:

$$\Delta t_{\text{one-way}} = \frac{GM}{C^3}\ln\left(\frac{4L_1 L_2}{b^2}\right)$$

(using separate distances $L_1$, $L_2$ to the two endpoints).

### Round Trip

The Shapiro delay is measured as a round trip — signal emitted, reflected off a planet or transponder, and received back. The delay accumulates on both legs:

$$\Delta t_{\text{round trip}} = 2 \times \frac{GM}{C^3}\ln\left(\frac{4L_1 L_2}{b^2}\right) = \frac{2GM}{C^3}\ln\left(\frac{4L_1 L_2}{b^2}\right)$$

**Note on the coefficient:** With $d^2 = 2GM/C^2$ as derived from matching Newtonian gravity, the round-trip result gives $2GM/C^3$. The mass-to-displacement-surface-area relationship (see Dimensional Note in Section 5) contributes an additional factor of 2 — whether carried explicitly as $d^2 = 4GM/C^2$ or absorbed into $G$. The full round-trip Shapiro delay is:

$$\Delta t_{\text{round trip}} = \frac{4GM}{C^3}\ln\left(\frac{4L_1 L_2}{b^2}\right)$$

This matches GR exactly. The delay is purely time dilation, with no geometric or propagation-speed contribution.

### Independence from Light Deflection

Shapiro delay and light deflection are independent effects. The delay is purely time dilation — it does not depend on the path bending. The deflection is purely geometric ray-tracing through displaced connection space — it does not contribute meaningful extra path length (the angular deviation is tiny). Neither effect contributes to the other.

---

## 8. Light Deflection

### Mechanism: Pure Ray-Tracing Through Displaced Connection Space

Light deflection is entirely a geometric effect. Light travels at $C$ in all directions in physical space (Section 3), and the Shapiro delay is a separate clock-rate effect that does not bend the path (Section 7). The bending comes from the displacement of connection space itself: the physical geometry is curved by the displacement, and light follows a straight path through that curved geometry. The straight physical-space path maps to a curved coordinate-space path.

This is analogous to the Eddington experiment setup: the star's light follows a geodesic through the displaced connection space around the Sun. The observer at a finite distance projects the arriving ray backward as if it were straight in flat space, placing the star at a different apparent angular position.

The observer does not register that the path returns to a straight line at infinity. The deflected path arrives at the observer, and the observer projects it back out as if it were straight, placing the source at a displaced angular position.

### Total Deflection

The ray-tracing through the displacement geometry gives the full deflection:

$$\alpha_{\text{total}} = \frac{2d^2}{b} = \frac{4GM}{C^2 b}$$

This matches the GR prediction and the observed value (1.75 arcsec at the solar limb).

### Independence from Shapiro Delay

Light deflection and Shapiro delay are independent effects arising from different aspects of the displacement:

- **Shapiro delay** is a time dilation effect: clocks near the mass run slower, so a distant observer measures more elapsed time for the signal transit. The path itself is irrelevant.
- **Light deflection** is a geometric effect: the displacement of connection space curves the physical geometry, and light follows geodesics through that geometry. The clock rates are irrelevant.

The two effects do not mix. Deflection adds no meaningful delay (the angular deviation is tiny, so the path length difference is negligible). Time dilation does not bend the path.

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

## 14. Spinning Black Holes and Polar Jet Emission

### Rindler Coordinates and Horizon Critique

Rindler coordinates describe the reference frame of a uniformly accelerating observer in flat spacetime. The standard derivation produces a horizon behind the observer — a boundary beyond which signals can never reach the observer. This horizon is the foundation for the Unruh effect (an accelerating observer sees thermal radiation) and, through the equivalence principle, for Hawking radiation (a black hole horizon emits thermal radiation at a temperature inversely proportional to mass).

However, the Rindler horizon depends on freezing the observer at a single event — a fixed point in spacetime. If the observer's time is allowed to advance (as it must for any physical observer), their past light cone sweeps forward and intersects the accelerating traveler's worldline at every point. The horizon is a coordinate artifact, not a physical boundary.

In STFR, all time moves together regardless of how clocks count it. An observer near a black hole experiences extreme time dilation — events take much longer from their perspective — but they are never frozen at time zero. Their clock still ticks, slowly, and signals from behind can still arrive, slowly. There is no moment at which information is permanently inaccessible; there is only a region where the time dilation is so extreme that communication becomes arbitrarily slow.

Since the Unruh effect depends on the Rindler horizon being real, and the Hawking radiation derivation depends on the same mathematical structure applied to a black hole, both predictions rest on a coordinate artifact. The STFR framework predicts a different mechanism for black hole energy emission: polar jets driven by the spin of the black hole.

### The Displacement Picture of a Black Hole

A black hole in STFR is an extreme displacement of connection space — the displacement parameter $d$ is large enough that $\Sigma(r)$ produces time dilation approaching (but never reaching) zero internal time. The mass resides on or near the displacement surface, not at a central singularity. Connection space inside the displacement is extremely stressed but not torn — the LC network is deformed to its limits but remains continuous.

A spinning black hole has angular momentum. The matter on the displacement surface is physically rotating, carrying linear velocity $V(\phi) = r(\phi)\omega\cos\phi$ at latitude $\phi$.

### Equilibrium Surface: Equal Time Dilation at All Latitudes

For a self-gravitating spinning body in equilibrium, every point on the surface must have the same total effective potential — gravitational plus rotational. If they differed, material would flow from high potential to low potential until equilibrium was restored. This is the same physics that makes the Earth oblate.

In STFR, since gravitational time dilation and velocity time dilation are the same mechanism (both increase the effective rate of encounter with vacuum medium), the equilibrium condition is:

$$\Gamma_{\text{total}}(\phi) = \text{constant for all } \phi$$

where $\Gamma_{\text{total}}$ combines two contributions:

$$\Gamma_{\text{grav}}(\phi): \text{from cumulative displacement } \Sigma(r(\phi))$$

$$\Gamma_{\text{vel}}(\phi) = \frac{\sqrt{C^2 - V(\phi)^2}}{C}$$

At the equator ($\phi = 0$): $r$ is largest (oblate bulge), $\Sigma$ is smallest (weakest gravitational dilation), $V$ is largest (strongest velocity dilation).

At the poles ($\phi = \pi/2$): $r$ is smallest (oblate compression), $\Sigma$ is largest (strongest gravitational dilation), $V = 0$ (no velocity dilation).

The equilibrium surface shape $r(\phi)$ is the oblate figure that satisfies $\Gamma_{\text{total}} = \text{const}$ at every latitude.

### Qualitative Difference: Equator vs. Poles

Although $\Gamma_{\text{total}}$ is the same everywhere on the surface, the *character* of the time dilation differs fundamentally between equator and poles. This distinction is critical for understanding particle behavior.

**At the equator:** The time dilation is dominated by linear velocity. An electron (or any LC excitation pattern) at the equator is a highly boosted particle — its overlapping phase states are stretched out along the direction of travel. The pattern's internal cycling is almost frozen, but the freezing is directional: the pattern's entire internal time budget is committed to maintaining coherence along the velocity vector. The particle is stable but locked into its trajectory. It cannot reorganize because it has no spare internal time in any direction other than its direction of motion.

**At the poles:** The time dilation is dominated by gravitational depth. An LC excitation pattern at the pole has almost no linear velocity. Its internal cycling is equally slow in every direction — the slowness is isotropic. The pattern is not stretched along any preferred axis. This means polar matter retains the ability to interact laterally, recombine, and form new configurations. The particles are slow, but they are slow symmetrically, which is qualitatively different from being slow because all internal time is consumed by linear motion.

The physical distinction: linear velocity imposes a directional structure on the LC pattern (momentum), while gravitational depth imposes an isotropic slowdown (time dilation without preferred direction). The same total $\Gamma$ produces very different internal conditions depending on how it is composed.

### Polar Accumulation

Matter on the displacement surface can migrate toward the poles through dissipative processes. Any interaction that causes a particle to lose angular momentum — radiation from acceleration as particles follow the curved surface, collisions between particles, interaction with the displacement gradient — results in poleward drift.

As matter moves from equator toward the poles:

1. Its linear velocity decreases ($V = r\omega\cos\phi \to 0$)
2. It sinks deeper into the gravitational displacement (increasing $\Sigma$)
3. The velocity component of time dilation converts to gravitational time dilation
4. Its LC pattern transitions from a linearly stretched, boosted configuration to a compact, isotropic, deeply dilated configuration

At the poles, these compact patterns accumulate. They sit at the deepest point of the gravitational displacement with minimal linear motion. Their LC structures can interact with each other — they have no preferred direction locking them into a trajectory. The local mass density grows as material continues to arrive from lower latitudes.

### Emission Threshold and Jet Formation

As mass accumulates at the poles, the local displacement increases. The matter's own connection space displacement adds to the black hole's displacement at that location. There is a threshold: when the accumulated polar mass creates enough additional displacement that its own displacement extends beyond the black hole's displacement surface, that matter is no longer gravitationally bound.

The pole is the point on the oblate surface closest to the center — the displacement surface has the smallest radius there. This means the pole is where the accumulated displacement most easily breaches the surface.

Once the displacement of the accumulated polar mass extends outside the black hole's gravitational displacement, the matter is launched outward along the polar axis. The gravitational potential energy converts to kinetic energy — just as escape velocity relates to time dilation (Section 6). The emitted particles are relativistic because they were deep in an extreme gravitational displacement, and the conversion of that potential to kinetic energy produces velocities approaching $C$.

The emission is collimated along the spin axis because:

1. The accumulation occurs at the poles (where linear velocity vanishes)
2. The displacement surface is closest to the center at the poles (easiest breach point)
3. The symmetry of the oblate displacement focuses the emission axially
4. Once emitted, the particles travel through the least displaced region (along the axis), where the displacement gradient does not deflect them sideways

The result is two relativistic jets, one from each pole, aligned with the spin axis.

### Energy Source and Spin-Down

The energy powering the jets comes from the rotational kinetic energy of the black hole. As matter migrates poleward and is ejected, it carries away angular momentum. The black hole spins down over time. The jet power is therefore related to the spin rate: faster-spinning black holes produce more powerful jets, and the jet activity decreases as the black hole loses angular momentum.

This is consistent with observations: AGN jet power correlates with estimated black hole spin, and jet activity appears to be episodic, consistent with cycles of spin-up (from accretion of angular momentum) and spin-down (from jet emission).

### Comparison to Hawking Radiation

| Property | Hawking Radiation | STFR Polar Emission |
|----------|------------------|---------------------|
| Geometry | Uniform, from entire horizon surface | Collimated, from poles along spin axis |
| Spectrum | Thermal (blackbody at $T = \hbar C^3/(8\pi G M k_B)$) | Relativistic particles |
| Energy source | Vacuum fluctuations at horizon | Rotational kinetic energy |
| Dependence | Temperature $\propto 1/M$ (hotter for smaller BH) | Power $\propto$ spin rate |
| Requires | Quantum fields on curved spacetime; real horizon | Displacement geometry; spinning mass; no horizon needed |
| Observational status | Never observed | Relativistic jets observed at all scales with sufficient spin |

### Time Dilation as Spin Budget

A foundational reinterpretation: time dilation is not about "time" in the abstract — it is about spin capacity. All clocks are fundamentally rotational or oscillatory: atomic clocks count oscillations, LC circuits cycle, electrons precess. What we call "time" is counting spin cycles.

The invariant is:

$$\sqrt{S^2 + V^2} = C$$

where $S$ is spin capacity (the rate at which internal oscillatory/rotational processes can occur) and $V$ is linear velocity. The total budget is $C$. As $V$ increases, $S$ decreases — not because "time slows down" metaphysically, but because less of the $C$ budget is available for rotational motion.

This is directly the $\Gamma$ factor: $S = \sqrt{C^2 - V^2}$ and $\Gamma = S/C$.

**Critical consequence for black hole physics:** Linear velocity and spin are independent motions. Newtonian mechanics groups them as "motion," but in STFR they compete for the same $C$ budget. A particle with $V \approx C$ has $S \approx 0$ — it cannot spin, oscillate, or sustain internal LC cycling. A particle with $V = 0$ deep in a gravitational field has $S = C(1 - \Sigma)$ — reduced by gravity, but the reduction is isotropic and the spin capacity that remains is fully available in every direction.

This distinction is what drives the polar jet mechanism.

### Equilibrium Surface Shape

The equilibrium condition requires equal spin capacity $S_0$ at every latitude on the displacement surface:

$$S(\phi)^2 = C^2\left(1 - \frac{d^2}{2r(\phi)}\right)^2 - r(\phi)^2\omega^2\cos^2\phi = S_0^2$$

Writing $\sigma(\phi) = d^2/(2r(\phi))$ for the local cumulative displacement:

$$C^2(1 - \sigma)^2 - r^2\omega^2\cos^2\phi = S_0^2$$

At the pole ($\phi = \pi/2$, $\cos\phi = 0$):

$$S_0 = C(1 - \sigma_p) = C\left(1 - \frac{d^2}{2r_p}\right)$$

Setting the general latitude equal to the pole:

$$C^2(1-\sigma)^2 - r^2\omega^2\cos^2\phi = C^2(1-\sigma_p)^2$$

Expanding and factoring:

$$C^2(\sigma_p - \sigma)(2 - \sigma - \sigma_p) = r^2\omega^2\cos^2\phi$$

Substituting $\sigma = d^2/(2r)$:

$$\frac{C^2 d^2}{2}\left(\frac{1}{r_p} - \frac{1}{r}\right)\left(2 - \frac{d^2}{2r} - \frac{d^2}{2r_p}\right) = r^2\omega^2\cos^2\phi$$

This is exact and implicit in $r(\phi)$. It is a cubic in $1/r$ for each $\phi$, solvable numerically for any given $(d, r_p, \omega, \phi)$.

### Maximum Spin Limit

In the weak-field limit at the equator ($\sigma_e \ll 1$, $r_e \gg d^2/2$), the equilibrium equation reduces to:

$$C^2 \approx r_e^2\omega^2$$

$$r_e\omega = C$$

The equatorial surface velocity equals $C$. This is the absolute spin limit — $V = C$ consumes the entire budget, leaving $S = 0$. No matter at the equator can sustain any internal oscillation.

The maximum spin condition gives:

$$r_{e,\text{max}} = \frac{C}{\omega}$$

For any spin below maximum, $r_e < C/\omega$ and some spin capacity remains at the equator.

### The Polar Cap: Where Reorganization Occurs

Although $S_0$ is the same everywhere on the surface, the *composition* of the $C$ budget varies. At latitude $\phi$, the linear velocity is $V(\phi) = r(\phi)\omega\cos\phi$ and the spin capacity is $S_0$. The ratio:

$$\frac{V(\phi)}{S_0} = \frac{r(\phi)\omega\cos\phi}{S_0}$$

measures how much of the local physics is dominated by linear motion versus available spin. At the equator this ratio is large (linear motion dominates); at the pole it is zero (pure spin).

An LC excitation pattern with $V/S_0 \gg 1$ is enormously elongated in the direction of travel — its momentum structure dominates over its oscillatory structure. Adjacent patterns at the equator are all streaming in the same direction at nearly $C$ and cannot interact laterally. At $V/S_0 \ll 1$, patterns are compact, symmetric, and can interact with neighbors in any direction — allowing reorganization, combination, and formation of stable displacement bubbles.

The critical latitude $\phi_c$ where $V = S_0$ (linear and spin contributions equal) defines the polar cap boundary:

$$r(\phi_c)\omega\cos\phi_c = S_0$$

Near the pole, $r(\phi) \approx r_p$ and $\cos\phi \approx (\pi/2 - \phi)$. The angular radius of the polar cap is:

$$\delta\phi = \frac{\pi}{2} - \phi_c \approx \frac{S_0}{r_p\omega} = \frac{C(1 - d^2/(2r_p))}{r_p\omega}$$

### Spin Rate and Jet Formation

At maximum spin ($r_e\omega = C$, $\sigma_p \to 1$): $S_0 \to 0$ and $\delta\phi \to 0$. The polar cap vanishes — even polar matter has no spin capacity for reorganization. No jets.

At zero spin ($\omega = 0$): No velocity asymmetry between equator and poles. No preferential polar accumulation. No jets.

The jet mechanism requires intermediate spin — fast enough that the equator-pole asymmetry drives poleward migration, slow enough that the polar cap retains meaningful spin capacity.

The polar cap solid angle:

$$\Omega_{\text{cap}} \approx \pi(\delta\phi)^2 = \frac{\pi S_0^2}{r_p^2\omega^2}$$

Jet power scales roughly as:

$$P_{\text{jet}} \propto \Omega_{\text{cap}} \times F_{\text{migration}} \times E_{\text{escape}}$$

where $F_{\text{migration}}$ is the poleward mass flux (increases with spin asymmetry, i.e., with $\omega$) and $E_{\text{escape}}$ is the energy per emitted particle (related to the gravitational potential at the pole, roughly $MC^2 \cdot \Sigma(r_p)$).

The competition between increasing migration flux and decreasing cap area with spin rate produces a peak in jet power at some optimal $\omega$. Determining this optimum requires a specific model for the dissipative migration, which is not yet developed.

### Jet Collimation

The jet half-angle is set by two effects:

**1. Polar cap geometry:** Particles emitted from latitude $\phi$ near the pole have a transverse velocity component from the surface curvature. The geometric half-angle is approximately:

$$\theta_{\text{jet}} \approx \delta\phi = \frac{S_0}{r_p\omega}$$

For fast-spinning black holes this gives a narrow jet, consistent with observed AGN jet opening angles of a few degrees or less.

**2. Displacement waveguide:** The oblate displacement geometry provides natural collimation. The displacement falls off faster along the polar axis than in the equatorial plane. A particle escaping with any transverse velocity component moves into a region of stronger displacement gradient, which deflects it back toward the axis. The displacement geometry acts as a focusing waveguide.

These two effects combine to produce tightly collimated jets whose opening angle decreases with increasing spin — again consistent with observations that more powerful jets tend to be more collimated.

### Emission Velocity

Particles emitted from the pole escape from a region of extreme gravitational displacement. The escape velocity from radius $r_p$ in the displacement field:

$$v_{\text{esc}} = \sqrt{2C^2\Sigma(r_p)} = \sqrt{\frac{C^2 d^2}{r_p}} = C\sqrt{\frac{d^2}{r_p}}$$

For $r_p \approx d^2/2$ (near-Schwarzschild pole): $v_{\text{esc}} = C\sqrt{2} > C$, which means the classical escape velocity exceeds $C$ — equivalent to saying the pole is inside the classical event horizon radius.

However, the emission mechanism is not classical escape. The accumulated polar mass creates its own displacement that breaches the surface — the displacement composition (Section 9) means the polar mass's own connection space footprint extends outside the black hole's displacement. The emitted particles are launched by the displacement geometry itself, not by achieving classical escape velocity. The actual emission velocity depends on the energy conversion during the displacement breach, and is expected to be a large fraction of $C$, consistent with observed jet velocities of $0.99C$ and above.

### Polar Feeding Mechanisms

Two hypotheses for how material reaches the poles, which are not mutually exclusive:

**Hypothesis 1 — Vacancy Refill:** Matter already exists at the poles from the formation process. When a jet emission event occurs, it creates a vacancy — a localized deficit of mass/displacement at the pole. The equilibrium surface is now perturbed: less mass at the pole means less displacement, which means the equal-$\Gamma$ condition is locally violated. Matter from adjacent latitudes shifts poleward to restore equilibrium, creating a vacancy at slightly lower latitude, which is in turn filled from further away. The jet is self-sustaining: each emission event triggers the conditions for the next. No dissipative migration mechanism is needed — the driving force is simply relaxation toward the equilibrium configuration.

**Hypothesis 2 — Centrifugal Sorting:** In a spinning system, denser material migrates outward (toward the equator) and less dense material migrates inward (toward the axis). On the displacement surface, "denser" means more displacement per unit area — heavier particles, stable nuclei. "Less dense" means lighter particles — electrons, positrons, partially formed displacement bubbles, photon-like excitations.

At the extreme conditions on the displacement surface, not all matter exists as stable heavy nuclei. Some fraction consists of lighter structures. These lighter structures are centrifugally sorted toward the spin axis, while heavier structures migrate toward the equator. This is directly analogous to air forming a tube along the spin axis of a spinning fluid ball in microgravity, while denser debris migrates outward.

**Composition prediction:** If centrifugal sorting is active, the polar emission should be preferentially lighter particles — electron-positron pairs, high-energy photons — rather than baryonic matter. This matches observations: many AGN jets are inferred to be primarily leptonic (electron-positron) rather than baryonic, particularly in the inner jet near the base.

**Combined picture:** Centrifugal sorting continuously concentrates lighter material at the poles. Emission events create vacancies. Relaxation fills the vacancies preferentially with more light material sorted from nearby latitudes. The jet is both centrifugally fed and self-sustaining through the vacancy-refill cycle.

### Jet Variability Timescale

The vacancy-refill model predicts a characteristic timescale: the relaxation time for the equilibrium surface to readjust after a polar emission event. Connection space changes propagate at $C$, and the relevant distance is from adjacent latitudes to the pole (roughly $r_p \cdot \delta\phi$):

$$\tau_{\text{refill}} \sim \frac{r_p \cdot \delta\phi}{C}$$

Using $r_p = \rho_p \cdot d^2/2$ and $\delta\phi = (1 - 1/\rho_p)/(\alpha\rho_p)$:

$$\tau_{\text{refill}} \sim \frac{d^2(1 - 1/\rho_p)}{2\alpha C}$$

With $d^2 = 2GM/C^2$:

$$\tau_{\text{refill}} \sim \frac{GM(1-1/\rho_p)}{\alpha C^3}$$

**Supermassive black hole (M87, $M \approx 6.5 \times 10^9 M_\odot$):**
- $GM/C^3 \approx 3.2 \times 10^4$ s
- With $\rho_p \approx 1.15$, $\alpha \approx 0.07$:
- $\tau \approx 3.2 \times 10^4 \times 0.13 / 0.07 \approx 6 \times 10^4$ s $\approx 17$ hours

M87's jet shows variability on timescales of days to weeks in radio, shorter in gamma rays. The ~17-hour refill timescale is consistent as a minimum variability timescale — individual emission events could involve larger accumulations requiring multiples of $\tau$.

**Stellar-mass black hole (microquasar, $M \approx 10 M_\odot$):**
- $GM/C^3 \approx 5 \times 10^{-5}$ s
- With $\rho_p \approx 1.1$, $\alpha \approx 0.1$:
- $\tau \approx 5 \times 10^{-5} \times 0.09 / 0.1 \approx 4.5 \times 10^{-5}$ s $\approx 0.05$ ms

Sub-millisecond variability — consistent with the millisecond-scale rapid variability observed in microquasars and X-ray binaries with jets.

**Gamma-ray bursts ($M \approx 3 M_\odot$, newly forming compact object):**
- $GM/C^3 \approx 1.5 \times 10^{-5}$ s
- With $\rho_p \approx 1.001$, $\alpha \approx 0.3$:
- $\tau \approx 1.5 \times 10^{-5} \times 0.001 / 0.3 \approx 5 \times 10^{-8}$ s $\approx 50$ ns

The extremely short refill time for GRB-scale objects means the jet can be effectively continuous on any observable timescale — consistent with the sustained gamma-ray emission observed in long GRBs (seconds to minutes of continuous output).

### Displacement Breach Threshold (Estimate)

From the multi-body displacement rules (Section 9), the accumulated polar mass $m_p$ has its own displacement parameter $d_p^2 = 2Gm_p/C^2$. This displacement sits at the pole of the black hole's surface at radius $r_p$. The breach occurs when the polar mass's own displacement extends beyond the black hole's displacement boundary.

In dimensionless terms, the black hole's surface at the pole is at $\rho_p$, with headroom $(\rho_p - 1)$ above the Schwarzschild scale. The polar mass breaches when its own displacement scale is comparable to this headroom:

$$\frac{d_p^2}{d^2} \sim \frac{\rho_p - 1}{\rho_p}$$

$$\frac{m_p}{M} \sim \frac{\rho_p - 1}{\rho_p}$$

For $\rho_p = 1.1$: the critical polar mass is $\sim 9\%$ of the black hole mass. For $\rho_p = 1.01$: $\sim 1\%$. For $\rho_p = 1.001$: $\sim 0.1\%$.

Deeper poles (closer to Schwarzschild) require less accumulated mass to breach — consistent with deeper poles producing more frequent, lower-mass emission events rather than rare catastrophic ones. This is qualitatively consistent with the continuous jet picture for extreme objects (GRBs) versus episodic jet activity in less extreme AGN.

### Optimal Spin Rate (Qualitative)

Jet power scales as the product of three factors: polar cap solid angle ($\propto \delta\phi^2 \propto 1/\alpha^2$ at fixed $\rho_p$), migration driving (increases with $\alpha$ but vanishes at $\alpha = 0$), and energy per emitted particle ($\propto \gamma_{\text{jet}}$, independent of $\alpha$ at fixed $\rho_p$).

The migration driving depends on the mechanism. For vacancy refill, the driving force is the equilibrium perturbation — stronger for larger cap (slower spin). For centrifugal sorting, the sorting rate increases with $\omega^2$ (faster spin). These compete differently:

- **Vacancy-dominated feeding:** Jet power $\propto \delta\phi^2 \times f(\delta\phi)$ where $f$ increases with cap size. Power peaks at moderate $\alpha$ where the cap is large enough to accumulate meaningful mass but the asymmetry is strong enough to maintain polar character.
- **Sorting-dominated feeding:** Jet power $\propto \delta\phi^2 \times \alpha^2$, giving power roughly independent of $\alpha$. The jet opening angle narrows with spin but the total power is approximately constant.

Without a specific migration model, the optimal spin remains qualitative. The prediction is that jet power should be a weak function of spin while collimation is a strong function — faster spin produces tighter jets at roughly similar total power. This is broadly consistent with observations.

### Centrifugal Sorting Rate (Estimate)

The centrifugal acceleration at latitude $\phi$ on the surface is:

$$a_c = r(\phi)\omega^2\cos\phi$$

The sorting timescale for a density contrast $\Delta\rho/\rho$ between heavy and light particles over a distance $\ell$ along the surface is:

$$\tau_{\text{sort}} \sim \sqrt{\frac{\ell}{a_c \cdot \Delta\rho/\rho}}$$

At the equator with $r_e\omega \sim C$ (near-maximum spin): $a_c \sim C\omega$. For $\ell \sim r_p\delta\phi$ (cap-scale distance) and $\Delta\rho/\rho \sim 1$ (electron vs. nucleon):

$$\tau_{\text{sort}} \sim \sqrt{\frac{r_p\delta\phi}{C\omega}} = \sqrt{\frac{S_0}{C\omega^2}}$$

Comparing to the refill timescale $\tau_{\text{refill}} \sim r_p\delta\phi/C = S_0/(C\omega)$:

$$\frac{\tau_{\text{sort}}}{\tau_{\text{refill}}} \sim \sqrt{\frac{C\omega}{S_0\omega^2}} = \sqrt{\frac{C}{S_0\omega}} = \frac{1}{\sqrt{\alpha}} \cdot \frac{1}{\sqrt{1-1/\rho_p}}$$

For $\alpha = 0.1$, $\rho_p = 1.1$: $\tau_{\text{sort}}/\tau_{\text{refill}} \sim 1/\sqrt{0.1 \times 0.09} \sim 10$. Sorting is slower than refill.

For $\alpha = 0.3$, $\rho_p = 1.01$: $\tau_{\text{sort}}/\tau_{\text{refill}} \sim 1/\sqrt{0.3 \times 0.01} \sim 18$. Still slower.

This suggests that for most parameter ranges, centrifugal sorting is slower than vacancy refill. The implication: the initial jet composition reflects whatever was at the poles during formation. Over time, centrifugal sorting enriches the polar regions with lighter particles, and the jet composition gradually shifts from mixed to predominantly leptonic. Long-lived AGN jets should be more leptonic than newly formed jets — a testable prediction.

### Nondimensionalized Equilibrium Equation

Setting the length scale to $d^2/2$ (Schwarzschild-scale radius):

$$\rho = \frac{2r}{d^2}, \quad \alpha = \frac{d^2\omega}{2C}$$

The equilibrium equation becomes purely dimensionless:

$$\left(\frac{1}{\rho_p} - \frac{1}{\rho}\right)\left(2 - \frac{1}{\rho} - \frac{1}{\rho_p}\right) = \alpha^2\rho^2\cos^2\phi$$

The free parameters are $\rho_p$ (polar radius in Schwarzschild units) and $\alpha$ (dimensionless spin).

### Slow Rotation Limit ($\alpha \ll 1$)

Expanding $\rho(\phi) = \rho_p + \delta\rho(\phi)$ to first order:

$$\delta\rho = \frac{\alpha^2\rho_p^4}{2(1-1/\rho_p)}\cos^2\phi$$

The oblateness (fractional equatorial bulge):

$$\frac{\delta\rho_e}{\rho_p} = \frac{\alpha^2\rho_p^3}{2(1-1/\rho_p)}$$

For $\rho_p \gg 1$ (weak gravity): oblateness $\approx \alpha^2\rho_p^3/2$, growing with the cube of the radius and the square of the spin.

For $\rho_p$ close to 1 (strong gravity, near Schwarzschild): the $(1 - 1/\rho_p)$ denominator diverges — the shape becomes extremely oblate. Even small spin produces large equatorial bulge because gravitational binding at the equator is barely sufficient.

### Maximum Spin and Oblateness Ratio

At maximum spin, the equatorial surface velocity equals $C$:

$$\rho_{e,\text{max}} = \frac{1}{\alpha}$$

The oblateness ratio:

$$\frac{\rho_e}{\rho_p} = \frac{1}{\alpha\rho_p}$$

| $\rho_p$ | $\alpha$ | $\rho_e/\rho_p$ | Shape |
|-----------|----------|------------------|-------|
| 1.01 | 0.1 | ~9.9 | Highly oblate |
| 1.01 | 0.01 | ~99 | Disk-like |
| 1.1 | 0.1 | ~9.1 | Highly oblate |
| 2.0 | 0.1 | ~5.0 | Moderately oblate |
| 10.0 | 0.1 | ~1.0 | Nearly spherical |

Near the Schwarzschild scale, even moderate spin produces extreme oblateness.

### Polar Cap Angular Radius

In dimensionless terms:

$$\delta\phi = \frac{1 - 1/\rho_p}{\alpha\rho_p}$$

| $\rho_p$ | $\alpha$ | $\delta\phi$ (rad) | $\delta\phi$ (degrees) |
|-----------|----------|---------------------|------------------------|
| 1.001 | 0.1 | 0.01 | 0.57° |
| 1.01 | 0.1 | 0.098 | 5.6° |
| 1.01 | 0.01 | 0.98 | 56° |
| 1.1 | 0.1 | 0.83 | 47° |
| 1.1 | 0.01 | 8.3 | — (entire surface) |

Faster spin and deeper gravitational wells (smaller $\rho_p$) produce narrower jets. Slower spin opens the cap until the entire surface qualifies and the mechanism loses its polar character.

### Jet Lorentz Factor

The gravitational potential at the pole determines the energy available for the emitted particles. The Lorentz factor of the jet scales as:

$$\gamma_{\text{jet}} \sim \frac{\rho_p}{\rho_p - 1} = \frac{1}{1 - 1/\rho_p}$$

| $\rho_p$ | $\gamma_{\text{jet}}$ | $v/C$ | Regime |
|-----------|-----------------------|-------|--------|
| 1.001 | ~1000 | 0.9999995 | Extreme (GRB-scale) |
| 1.01 | ~100 | 0.99995 | Powerful AGN |
| 1.1 | ~11 | 0.996 | Typical AGN |
| 1.5 | ~3 | 0.94 | Moderate jet |
| 2.0 | ~2 | 0.87 | Weak jet |

The jet Lorentz factor is directly determined by how close the polar radius is to the Schwarzschild scale. This is a clean, single-parameter prediction.

### Comparison to Observations

**M87 (supermassive, $M \approx 6.5 \times 10^9 M_\odot$):**
- $r_s \approx 2 \times 10^{13}$ m $\approx 130$ AU
- Observed jet half-opening angle: $\sim 5°$ near the base
- Observed jet Lorentz factor: $\gamma \approx 6$–$7$
- STFR match: $\rho_p \approx 1.15$–$1.17$ (giving $\gamma \approx 6$–$7$), $\alpha \approx 0.07$ (giving $\delta\phi \approx 5°$ at $\rho_p \approx 1.15$)

**Cygnus A (supermassive, powerful FR II radio galaxy):**
- Observed jet Lorentz factor: $\gamma \approx 3$–$5$
- Observed jet half-angle: $\sim 2°$–$3°$
- STFR match: $\rho_p \approx 1.2$–$1.3$, $\alpha \approx 0.05$

**GRS 1915+105 (stellar mass, microquasar):**
- Observed apparent superluminal motion, $\gamma \approx 2$–$5$
- STFR match: $\rho_p \approx 1.2$–$1.5$

**Gamma-ray bursts (collapsing stellar mass):**
- Observed $\gamma \approx 100$–$1000$
- STFR match: $\rho_p \approx 1.001$–$1.01$ (polar radius extremely close to Schwarzschild)

The pattern is consistent: more extreme gravitational compression at the pole ($\rho_p$ closer to 1) produces faster jets. GRBs, which involve newly forming or rapidly collapsing compact objects, have the most extreme $\rho_p$ and the fastest jets. Established AGN have less extreme $\rho_p$ and moderate jets.

### Prediction: Jet Power–Spin–Lorentz Factor Correlation

The framework predicts a three-way relationship:

1. **Spin rate $\alpha$** determines the polar cap size and the equator-pole asymmetry driving migration
2. **Polar depth $\rho_p$** determines the jet Lorentz factor and the energy per emitted particle
3. **Jet power** $\propto$ cap area $\times$ migration flux $\times$ energy/particle

For a given total mass, higher spin produces narrower, faster jets (smaller cap, deeper pole). This predicts that within a population of similar-mass black holes, jet Lorentz factor and collimation should correlate positively with spin — faster-spinning black holes produce tighter, faster jets. This is consistent with the observed Blandford-Znajek correlation between jet power and black hole spin, but the mechanism is entirely different (displacement geometry rather than magnetic field extraction).

---

## 15. Energy-Mass Equivalence: $E = MC^2$

### Derivation from Time Dilation

The STFR time dilation factor is:

$$\Gamma = \frac{\sqrt{C^2 - V^2}}{C}$$

A mass $M$ moving at velocity $V$ through connection space has its internal oscillations (LC cycling) slowed by $\Gamma$. The kinetic energy is the work done to accelerate the mass from rest to velocity $V$.

The relativistic momentum in STFR is:

$$p = \frac{MV}{\Gamma} = \frac{MVC}{\sqrt{C^2 - V^2}}$$

(The $1/\Gamma$ factor appears because the mass's inertial resistance increases as its internal time slows — each unit of coordinate-time force produces less velocity change.)

The work-energy integral:

$$E_k = \int_0^V F\, dx = \int_0^V \frac{dp}{dt} \cdot V\, dt$$

Evaluating this integral with $p = MV/\Gamma$:

$$E_k = \frac{MC^2}{\Gamma} - MC^2 = MC^2\left(\frac{1}{\Gamma} - 1\right)$$

The total energy is:

$$E_{\text{total}} = \frac{MC^2}{\Gamma} = \frac{MC^3}{\sqrt{C^2 - V^2}}$$

At rest ($V = 0$, $\Gamma = 1$):

$$E_0 = MC^2$$

This is $E = MC^2$. The rest energy is the energy stored in the vacuum medium displacement itself — the energy required to displace connection space by the volume corresponding to mass $M$.

### Physical Interpretation

$C^2$ has units of $J/kg = m^2/s^2 = m^2/(F \cdot H)$. It is the specific energy of the vacuum: the energy stored per unit mass-equivalent of displacement.

- **Rest energy** ($MC^2$): The energy stored in the displacement existing at all. The LC network has been deformed from its ground state; $MC^2$ is the total energy of that deformation.
- **Kinetic energy** ($MC^2(1/\Gamma - 1)$): The additional energy stored in moving the displacement pattern through the LC medium. Moving through connection space increases the effective rate of encounter with vacuum medium, increasing the energy content.

The electron picture from the Briefing Document maps directly: an electron is a self-propagating LC excitation pattern. Its rest energy is the energy of the pattern itself — the charged capacitors, the current-carrying inductors. Its kinetic energy is the additional energy stored in the overlapping phase states that constitute momentum (the magnetic field that can only expand at $C$, creating a cascade of simultaneously active LC cycles in the direction of motion).

### Energy-Momentum Relation

The total energy and momentum combine as:

$$E^2 = (MC^2)^2 + (pC)^2$$

This follows directly from the expressions above. With $E = MC^2/\Gamma$ and $p = MV/\Gamma$:

$$E^2 - (pC)^2 = \frac{M^2C^4}{\Gamma^2} - \frac{M^2V^2C^2}{\Gamma^2} = \frac{M^2C^2(C^2 - V^2)}{\Gamma^2}$$

Since $\Gamma^2 = (C^2 - V^2)/C^2$:

$$E^2 - p^2C^2 = \frac{M^2C^2(C^2 - V^2) \cdot C^2}{C^2 - V^2} = M^2C^4$$

Therefore:

$$E^2 = (MC^2)^2 + (pC)^2$$

For a photon ($M = 0$): $E = pC$. The photon has no displacement of its own — it is a detached piece of field structure (Section on Bremsstrahlung in the Briefing Document). Its energy is entirely momentum, entirely the propagating disturbance in the LC network with no rest-frame displacement.

### Connection to Displacement Geometry

With $d^2$ as the displacement surface area and $C^2 = d^2/(F \cdot H)$:

$$E_0 = MC^2 = M \cdot \frac{d^2}{F \cdot H}$$

The rest energy is mass times the ratio of displacement area to the vacuum's temporal response ($F \cdot H = s^2$). This connects the energy content directly to the geometric size of the displacement in connection space: a larger displacement surface area (more mass) stores more energy, scaled by how quickly the vacuum medium responds ($F \cdot H$).

For a single nucleon, $E_0 = m_n C^2 \approx 939$ MeV is the energy stored in displacing a femtometer-scale sphere of connection space.

---

## 16. Summary of Results

| Quantity | STFR Expression | Comparison to GR/Newton |
|----------|----------------|------------------------|
| Displacement function | $D(r,d) = \sqrt{r^2+d^2}/r$ | Framework-specific |
| Cumulative displacement | $\Sigma(r) = d^2/2r$ | Equivalent to Newtonian potential |
| Mass-displacement relation | $d^2 = 2GM/C^2 = r_s$ | Schwarzschild radius |
| Gravitational acceleration | $g = GM/r^2$ | Exact match |
| Time dilation | $d\tau/dt \approx 1 - GM/(C^2 r)$ | Match (confirmed by GPS) |
| Shapiro delay | Pure time dilation; round trip $= \frac{4GM}{C^3}\ln(4L_1 L_2/b^2)$ | Exact match |
| Light deflection | $4GM/(C^2 b)$ | Exact match (pure ray-tracing through displacement) |
| Mercury precession | $6\pi GM/[a(1-e^2)C^2]$ | Exact match (three contributions) |
| Thomas precession | Zero | Differs from SR |
| Geodetic precession (symmetric) | Zero | Differs from GR |
| Per-nucleon displacement | $\sim$ femtometers | Consistent with nuclear radii |
| Rest energy | $E_0 = MC^2$ | Exact match; displacement energy interpretation |
| Energy-momentum | $E^2 = (MC^2)^2 + (pC)^2$ | Exact match |
| Black hole emission | Polar jets from spin-driven accumulation | Replaces Hawking radiation; matches observed jets |
| Hawking radiation | Not predicted (horizon is coordinate artifact) | Differs from QFT on curved spacetime |

---

## 17. G, Displacement Volume, and the Nuclear Scale

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

## 18. Open Questions

1. **Strong-field $\Sigma(r)$:** The exact integral of $D-1$ from $r$ to infinity has a logarithmic divergence. The weak-field $d^2/2r$ is well-defined, but the strong-field form needs regularization or reinterpretation.

2. **Shapiro delay coefficient — resolved:** The one-way time dilation integral gives $GM/C^3 \cdot \ln(4L_1 L_2/b^2)$; the round trip doubles this to $2GM/C^3 \cdot \ln(...)$. The mass-to-displacement-surface-area relationship contributes an additional factor of 2 (whether carried by $d^2 = 4GM/C^2$ explicitly or absorbed into $G$), giving the full $4GM/C^3 \cdot \ln(...)$ matching GR. The mechanism is purely time dilation. The propagation-delay and geometric-displacement "two contributions" model from earlier versions is superseded: Shapiro delay is purely time dilation, light deflection is purely ray-tracing, and they are independent.

3. **Tidal precession:** Whether differential $D$ across an extended gyroscope produces size-independent precession (force-free torque).

4. **GPB quantitative comparison:** CMB-frame precession with correct velocity (370 km/s vs. possible ~1700 km/s bulk flow) and scaling ($\beta$ vs. $\beta^2$) against GPB orbital geometry.

5. **Material vacuum modification:** Quantifying $\alpha(B)$ — the saturation function for LC network inductors near a magnet.

6. **Displacement composition:** Whether the farthest-first ordering rule modifies the radial dependence when building mass from integrated shells in the near-field regime.

7. **G from first principles:** The relationship $G = d_n^3 C^2 / m_n$ (times a geometric factor) suggests $G$ is derivable if $d_n$ can be determined independently from the LC network geometry or mass generation mechanism. The exact form of $D(r,d)$ determines the geometric factor and the precise value of $d_n$. The lensing correction between true displacement radius and measured nucleon radius must be accounted for.

8. **Mercury N-body verification:** Full numerical integration confirming the three retardation contributions each give $\alpha = 1$ exactly, rather than relying on the post-Newtonian mapping.

9. **Black hole mergers and displacement conservation:** Preliminary comparison to LIGO events shows merger remnant masses are best fit by an exponent $n \approx 1.1$ in $M_A^n + M_B^n = M_C^n$, close to simple mass addition minus radiated energy. Whether displacement volume is strictly conserved in mergers (with gravitational wave energy representing mass-energy loss but not displacement loss) or whether the volume-addition picture needs refinement remains open.

10. **Displacement topology and spin:** The displacement function for a point, $f(\vec{x}) = \sqrt{1 + |\vec{x}|^2} - |\vec{x}|$, produces a curve that lies inside the displacement bound. When plotted for a grid, this curve strongly resembles graphs of 3D rotations (R3 group) offset in a certain basis — but missing the interior portion. Taking the arctan of the displacement maps to angles inside the space and improves the match, but only completes half the curve. A second inner displacement — converging between two poles and returning to a linear grid at $r = 0$ — completes the topology. This suggests the displacement may have the structure of the R3 rotation group, with the spin axis corresponding to a physical coordinate direction in the displacement. If so, particle spin would be a geometric property of how the LC excitation pattern is structured within the displacement, not an abstract quantum number. This observation is preliminary and may border on numerology without further rigorous development.

11. **Polar jet numerical verification:** The equilibrium shape, jet Lorentz factor, collimation angle, and variability timescale estimates in Section 14 use approximate forms. Full numerical solutions of the implicit equilibrium equation, comparison against a larger sample of observed jets, and a specific dissipative migration model would strengthen the predictions. The testable prediction that long-lived AGN jets should be more leptonic than newly formed jets (from centrifugal sorting timescale) is observationally accessible.
