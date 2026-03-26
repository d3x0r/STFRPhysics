# The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929)

## Abstract

The homogeneous propagation framework recovers the familiar special-relativistic endpoint structure from a propagation-first construction. The present paper develops one consequence of that result: noncollinear composition. The endpoint translational state remains recoverable through proper-velocity composition, but the endpoint alone does not exhaust the noncollinear case. When one component of motion is established first and a perpendicular component is then acquired, the transition proceeds through an ordered buildup with changing total speed, and the associated transport contribution accumulates across that buildup. The paper derives the accumulated remainder $W$ and identifies two physically distinct regimes: co-moving acceleration, in which the transverse impulse is generated within the moving frame, and external-field acceleration, in which the transverse impulse is delivered by the transport structure. The co-moving remainder has a low-speed coefficient $v\,v_\perp/c^2$, while the external-field remainder recovers the standard Thomas coefficient $v\,v_\perp/(2c^2)$. The difference is not a fitting choice but a consequence of which frame's clock rate governs the impulse delivery. The external-field case applies to storage rings, gravitational orbits, and all other situations in which the deflecting agent belongs to the lab or transport frame, and it recovers the standard weak-field phenomenology without requiring a separate accommodation in the three-contribution precession budget.

**Keywords:** homogeneous propagation, noncollinear composition, Wigner rotation, Thomas precession, proper velocity, steering remainder, transport accumulation, co-moving acceleration, external-field acceleration

## 1. Introduction

The preceding paper recovered contraction, timing structure, and the one-dimensional moving-frame map from a propagation-first starting point, while briefly noting proper-velocity endpoint composition and a transport-induced rotational remainder under noncollinear composition. The present paper develops that noncollinear remainder directly.

The endpoint translational state is not in question. In the present framework, the natural composition variable is proper velocity: the endpoint physical speed is obtained by ordinary addition in proper-velocity space followed by inversion back to physical velocity. The endpoint is commutative and associative, and as an endpoint it is order-independent. What the endpoint map does not capture is the intermediate structure of the transition when one velocity component is already established and a perpendicular component is then acquired. The composition passes through a path of intermediate total speeds, and the same propagation structure that recovers the Lorentz simultaneity term places that term inside the moving-frame transport structure. Once that structure is treated as part of the composition process, the noncollinear case carries more than the endpoint alone.

A further distinction, developed for the first time in the present version, is that the accumulated remainder depends on whether the transverse impulse originates within the moving frame or is delivered by an external field belonging to the transport structure. These two cases correspond to different physical situations and yield different quantitative results, a point that resolves the earlier factor-of-two discrepancy with standard Thomas precession.

## 2. Co-Moving Accumulated Remainder

Let $v$ be the established longitudinal speed, and let the transverse component be acquired through intermediate values $u\in[0,v_\perp]$. At each stage, the total speed is

$$
v_{\mathrm{tot}}(u)=\sqrt{v^2+u^2},
$$

so the buildup passes through a continuum of states with different total speed and therefore different rate structure. The same incremental transverse addition does not contribute in the same way at every stage, because the denominator governing the transport accumulation changes with the evolving total speed.

Consider an increment $du$ in the transverse component. It contributes an incremental turning relative to the established longitudinal component $v$. The increment is angular in character because each added transverse element is accumulated relative to that established direction. The contribution scales with $v$, while the evolving total-state constraint enters through the denominator:

$$
c^2-v_{\mathrm{tot}}(u)^2=c^2-v^2-u^2.
$$

The incremental contribution to the accumulated remainder is therefore

$$
dW_{\mathrm{co}}=\frac{v}{c^2-v^2-u^2}\,du.
$$

The buildup accumulates against a continuously tightening denominator as the total speed rises. The full remainder is

$$
W_{\mathrm{co}}=\int_0^{v_\perp}\frac{v}{c^2-v^2-u^2}\,du.
$$

Evaluating the integral gives

$$
W_{\mathrm{co}}(v,v_\perp)=\frac{v}{\sqrt{c^2-v^2}}\operatorname{arctanh}\!\left(\frac{v_\perp}{\sqrt{c^2-v^2}}\right).
$$

The extra term appears because the ordered acquisition of the second component samples different total speeds on the way to the endpoint, and the transport contribution must be integrated across the entire buildup. The remainder belongs to the process by which the endpoint is reached, not to the endpoint itself.

The effect is nonuniform. Early in the buildup, the denominator is larger and the accumulation is gentler. Later, as the total speed rises and $c^2-v_{\mathrm{tot}}^2$ narrows, the same incremental transverse addition contributes more. As $v_\perp\to\sqrt{c^2-v^2}$, the arctanh argument approaches unity and the remainder diverges, reflecting the non-finite character of the buildup at the light-speed boundary.

The low-speed form is instructive. To first order,

$$
W_{\mathrm{co}}\approx\frac{v\,v_\perp}{c^2}.
$$

This is the co-moving remainder: the accumulated steering when the transverse impulse is generated within the moving frame, so that the entire transaction occurs at the local clock rate of the accelerated system.

## 3. External-Field Remainder

The co-moving integral applies when the source of the transverse impulse rides with the accelerated object — a thruster, an internal engine, any mechanism whose energy is drawn from within the moving frame. In that case, the impulse is delivered at the co-moving clock rate, and the full denominator tightening of Section 2 applies.

A physically distinct situation arises when the transverse impulse is delivered by an external agent belonging to the transport structure or lab frame: a magnetic field in a storage ring, the gravitational field of a central body, or any deflecting mechanism that exists in and is clocked by the frame through which the object moves.

### 3.1 The frame mismatch

The key difference is the clock rate at which the transverse impulse is delivered. In the co-moving case, each increment $du$ is a proper-frame event, and the full inertial cost at the evolving total speed enters the denominator. The co-moving integrand is $v/(c^2-v^2-u^2) = v\gamma_{\mathrm{tot}}^2/c^2$, where $\gamma_{\mathrm{tot}} = 1/\sqrt{1-(v^2+u^2)/c^2}$.

In the external-field case, the deflecting agent operates at the lab-frame clock rate, not at the moving object's internal clock rate. The accumulated steering per unit of transverse acquisition is reduced by a factor of $1/(\gamma_{\mathrm{tot}}+1)$ relative to the co-moving case. This factor has a direct algebraic origin: the co-moving integrand carries a factor of $\gamma_{\mathrm{tot}}^2-1 = (\gamma_{\mathrm{tot}}-1)(\gamma_{\mathrm{tot}}+1)$ per unit angle of orbit, while the external-field observable is governed by $\gamma_{\mathrm{tot}}-1$ alone — the excess of the dilation factor over unity, which is the standard Thomas object. The ratio between the two is $\gamma_{\mathrm{tot}}+1$, which equals 2 at low speed and grows with increasing total speed.

### 3.2 The external-field integral

When the steering is accumulated with respect to the lab-frame observable, the co-moving integrand is reduced by $1/(\gamma_{\mathrm{tot}}+1)$. Writing $\gamma_{\mathrm{tot}} = c/\sqrt{c^2-v^2-u^2}$, the factor becomes

$$
\frac{1}{\gamma_{\mathrm{tot}}+1} = \frac{\sqrt{c^2-v^2-u^2}}{c+\sqrt{c^2-v^2-u^2}}.
$$

The external-field integrand is therefore

$$
dW_{\mathrm{ext}} = \frac{v}{c^2-v^2-u^2}\cdot\frac{\sqrt{c^2-v^2-u^2}}{c+\sqrt{c^2-v^2-u^2}}\;du = \frac{v}{\left(c+\sqrt{c^2-v^2-u^2}\right)\sqrt{c^2-v^2-u^2}}\;du.
$$

Let $a = \sqrt{c^2-v^2}$. The substitution $u = a\sin\theta$ reduces the integral to

$$
W_{\mathrm{ext}} = \int_0^{\theta_{\max}}\frac{v}{c+a\cos\theta}\;d\theta,
$$

where $\theta_{\max} = \arcsin(v_\perp/a)$. This is a standard form. Evaluating it gives

$$
W_{\mathrm{ext}}(v,v_\perp) = 2\arctan\!\left(\sqrt{\frac{c-a}{c+a}}\;\tan\frac{\theta_{\max}}{2}\right),
$$

with $a = \sqrt{c^2-v^2}$ and $\theta_{\max} = \arcsin\!\bigl(v_\perp/\sqrt{c^2-v^2}\bigr)$.

### 3.3 Low-speed comparison

To leading order in $v/c$ and $v_\perp/c$, the factor $1/(\gamma_{\mathrm{tot}}+1)\to 1/2$, so

$$
W_{\mathrm{ext}} \approx \frac{1}{2}\cdot\frac{v\,v_\perp}{c^2} = \frac{v\,v_\perp}{2c^2}.
$$

This is the standard Thomas precession coefficient.

The factor of two between the co-moving and external-field remainders is not a fitting parameter. It arises because the co-moving integrand carries $\gamma_{\mathrm{tot}}^2\beta_{\mathrm{tot}}^2 = (\gamma_{\mathrm{tot}}-1)(\gamma_{\mathrm{tot}}+1)$ per unit angle, while the external-field observable is governed by $\gamma_{\mathrm{tot}}-1$ alone. The ratio is $\gamma_{\mathrm{tot}}+1$, which equals 2 at low speed and grows monotonically with total speed.

### 3.4 Summary of the two cases

| Regime | Impulse source | Correction factor | Low-speed limit |
|---|---|---|---|
| Co-moving | Thruster / internal | 1 (full co-moving integrand) | $v\,v_\perp/c^2$ |
| External field | Lab magnet / gravity | $1/(\gamma_{\mathrm{tot}}+1)\to 1/2$ | $v\,v_\perp/(2c^2)$ |

At relativistic speeds the two cases diverge further: their ratio is $\gamma_{\mathrm{tot}}+1$, which grows without bound as the total speed approaches $c$.

## 4. Relation to Wigner Rotation

The standard relativistic comparison point is Wigner rotation: the composition of two non-parallel Lorentz boosts is not itself a pure boost but carries an associated rotation. In what follows, $W_{\mathrm{co}}$ denotes the co-moving accumulated remainder, $W_{\mathrm{ext}}$ denotes the external-field remainder, and $W_{SR}$ denotes the standard relativistic rotation angle.

Both $W_{\mathrm{co}}$ and $W_{\mathrm{ext}}$ belong to the noncollinear composition problem, and both vanish in the collinear limit. The standard Wigner rotation $W_{SR}$ is derived from the decomposition of composed Lorentz boosts, a construction that does not distinguish between internally generated and externally applied transverse acquisition. The present framework makes that distinction explicit.

The external-field remainder $W_{\mathrm{ext}}$ recovers the standard Thomas/Wigner coefficient at leading order. The co-moving remainder $W_{\mathrm{co}}$ is the additional result that arises when the framework's propagation-based construction is applied to the case of internal acceleration, a situation that the standard Lorentz-composition approach does not separate from the external case.

## 5. Relation to Thomas Precession

Thomas precession is the continuous-motion comparison most closely related to the present discussion. In the standard treatment, Thomas precession arises in the context of an orbiting charged particle deflected by an external electromagnetic field — precisely the external-field regime of Section 3. The leading-order Thomas angle is

$$
\theta_T \approx \frac{v\,v_\perp}{2c^2},
$$

and this matches $W_{\mathrm{ext}}$ at leading order, as it should. The external-field integral is the correct comparison object for storage rings, gravitational orbits, and all other situations in which the deflecting agent belongs to the lab frame.

The co-moving remainder $W_{\mathrm{co}}$ applies to a different physical scenario: self-propelled noncollinear acceleration in which the impulse is generated within the moving system. That situation does not arise in the standard Thomas/Wigner context, which implicitly treats the transverse acquisition as externally imposed. The factor-of-two difference between $W_{\mathrm{co}}$ and $\theta_T$ is therefore not a conflict but a distinction between two physical situations that the standard formalism does not separate.

## 6. Physical Interpretation

### 6.1 Why the two cases differ

The physical content of the distinction is the clock rate at which the transverse impulse is delivered.

In the co-moving case, the accelerating mechanism (a thruster, an internal engine) is part of the moving system. Its operation is governed by the local clock rate of the accelerated frame. The energy conversion, the force application, and the resulting velocity change all occur at the internal rate. The co-moving observer experiences the full buildup, and the co-moving integral captures the full transport-structure accumulation.

In the external-field case, the deflecting agent (a magnetic field, a gravitational field) belongs to the transport structure. It operates at the lab-frame clock rate. From the lab's perspective, the moving object's internal processes — including its response to the applied force — run slower by the dilation factor. The transverse velocity change per unit of lab time is reduced accordingly. The accumulated steering, as observed by lab-frame instruments, is correspondingly softened.

The distinction is analogous to the difference between proper time and coordinate time in other contexts within the framework. The co-moving integral accumulates the full $(\gamma-1)(\gamma+1)$ per unit angle; the external-field observable sees only $(\gamma-1)$. At low speed, $\gamma+1\approx 2$, so the co-moving result is twice the external-field result. At high speed, the separation grows as $\gamma+1$.

### 6.2 Heading and spin

In the co-moving case, the heading follows the changing velocity direction throughout the buildup. The accumulated remainder is attached to the steering of the velocity vector itself, and the internal frame (spin axis, gyroscope orientation) follows that steering. There is no gap between heading and spin.

In the external-field case, the lab observes the spin axis precessing relative to the orbital motion. The deficit between the full orbital rotation and the observed spin rotation is the Thomas precession — the spin undershoots the orbit. This deficit arises because the external field delivers the deflecting impulse at the lab clock rate while the spin axis responds at the co-moving clock rate, and the two do not match.

### 6.3 Observational implications

The external-field regime is the one relevant to precision measurements:

- **Storage rings and g−2 experiments.** The electron or muon is deflected by external magnetic fields. The Thomas precession enters the BMT spin-precession equation through the $(\gamma-1)$ coefficient for circular motion, which is the integrated form of the external-field reduction factor $1/(\gamma+1)\to 1/2$ at low speed. Because the external-field integral recovers the standard Thomas coefficient directly, the framework's predictions for g−2 baseline precession are consistent with the precision measurements at Brookhaven and Fermilab.

- **Gravitational orbits and geodetic precession.** A satellite orbiting a central body is deflected by the gravitational displacement field, which belongs to the transport structure. The Thomas-like kinematic contribution to geodetic precession enters at the standard coefficient.

- **Gravity Probe B.** The geodetic precession of 6.59 arcsec/yr follows from the effective coordinate-level line element as a single integrated result, the same way Mercury's precession does. The interpretive decomposition of the total $\alpha = 3$ coefficient is $\alpha_1 = 1$ (retardation mismatch), $\alpha_2 = 1/2$ (external-field kinematic steering at the standard Thomas coefficient), and $\alpha_3 = 3/2$ (displacement geometry). Earlier versions of the companion notes listed the co-moving $W_{\mathrm{co}}$ and "time dilation of internal oscillations" as separate contributions; these are one effect, correctly captured by $W_{\mathrm{ext}}$, which already incorporates the dilation mismatch through the $1/(\gamma_{\mathrm{tot}}+1)$ factor. The corrected $1 + 1/2 + 3/2 = 3$ decomposition matches the standard GR post-Newtonian breakdown.

The co-moving regime would be relevant to a different class of experiments: precision gyroscope measurements on a self-propelled spacecraft performing deliberate noncollinear thrust maneuvers in flat space, far from gravitational sources. In that case, the framework predicts a steering remainder at twice the Thomas coefficient. This is a concrete distinguishing prediction, although the required measurement precision at accessible speeds is beyond current technology.

## 7. Observational Context

The noncollinear remainder developed here belongs to a framework whose weak-field consequences are quantitatively developed in the companion papers. The effective coordinate-level line element derived from the displacement postulate produces the weak-field orbit equation with a $3GM\,u^2/c^2$ correction, giving a total coefficient $\alpha = 3$. That total is the primary result, confirmed by numerical integration (9-body RK4 simulation, $43.3 \pm 0.3$ arcsec/century for Mercury [6]).

The interpretive decomposition of $\alpha = 3$ is: $\alpha_1 = 1$ (retardation mismatch), $\alpha_2 = 1/2$ (external-field kinematic steering, matching standard Thomas), $\alpha_3 = 3/2$ (displacement geometry). This decomposition applies identically to Mercury perihelion advance, Gravity Probe B geodetic precession, and lunar geodetic precession. In each case the deflecting agent is gravitational — an external field belonging to the transport structure — so the external-field coefficient $W_{\mathrm{ext}}$ is the appropriate kinematic contribution.

The frame-drag branch of Gravity Probe B is assigned to the rotating-source displacement field [6]. Lunar laser ranging consistency checks extend the same displacement structure to the Earth-Moon-Sun system. These comparisons are developed in full in the companion observational paper.

## 8. Conclusion

Noncollinear composition in the homogeneous propagation framework carries an accumulated remainder beyond the endpoint translational state. The endpoint remains recoverable and order-independent, but the ordered acquisition of a perpendicular velocity component proceeds through intermediate total speeds, and the transport contribution accumulates across that buildup.

The present revision identifies two physically distinct regimes. When the transverse impulse is generated within the moving frame (co-moving acceleration), the full co-moving integral applies and the low-speed coefficient is $v\,v_\perp/c^2$. When the transverse impulse is delivered by the transport structure (external-field acceleration), the lab-frame clock rate softens the accumulation and the low-speed coefficient is $v\,v_\perp/(2c^2)$, recovering the standard Thomas precession. The difference is a direct consequence of which frame's clock rate governs the impulse delivery, not a fitting parameter.

The external-field case is the one relevant to storage rings, gravitational orbits, and Gravity Probe B, and it recovers the standard weak-field phenomenology. The interpretive decomposition of the geodetic/precession coefficient $\alpha = 3$ becomes $1 + 1/2 + 3/2$ (retardation, external-field steering, displacement geometry), matching the standard GR post-Newtonian breakdown and correcting an earlier double-count in which the co-moving remainder and a separate "time dilation" term were listed as independent contributions. The co-moving case applies to internally propelled noncollinear acceleration and constitutes a concrete distinguishing prediction of the framework, measurable in principle through precision gyroscope experiments on self-propelled spacecraft.

## References

[1] Wolfgang Rindler, *Introduction to Special Relativity*, 2nd ed. Oxford: Clarendon Press / Oxford University Press, 1991.

[2] John David Jackson, *Classical Electrodynamics*, 3rd ed. New York: Wiley, 1998.

[3] Mark J. Semon and Jonathan R. Taylor, "Relativistic velocity space, Wigner rotation, and Thomas precession," *American Journal of Physics* **72**(7), 943–960 (2004). https://doi.org/10.1119/1.1652040

[4] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[5] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[6] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[7] C. M. Will, "The Confrontation between General Relativity and Experiment," *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4

[8] C. W. F. Everitt et al., "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity," *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[9] V. Bargmann, L. Michel, and V. L. Telegdi, "Precession of the Polarization of Particles Moving in a Homogeneous Electromagnetic Field," *Physical Review Letters* **2**, 435 (1959). https://doi.org/10.1103/PhysRevLett.2.435
