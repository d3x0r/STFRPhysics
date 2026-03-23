# The Homogeneous Propagation Framework: Binary Pulsar Orbital Decay from Wigner Accumulation and Gravitational Transport Stretch

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929); *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition* (DOI: 10.5281/zenodo.19155341); *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response* (DOI: 10.5281/zenodo.19155407)

## Abstract

The homogeneous propagation framework has shown that familiar special-relativistic and weak-field gravitational structures can be recovered from a propagation-first starting point. The present paper applies that framework to the orbital decay of the binary pulsar PSR B1913+16. The central claim is that the observed rate of orbital period decrease can be accounted for by a combination of Wigner steering accumulation and gravitational transport stretch, without requiring a separate gravitational radiation calculation.

The key physical ingredient is the displacement framework's treatment of gravity as a stretch of the transport-supporting structure. At any point in the orbit, each star sits in the companion's displacement field, where the local transport is stretched by an amount corresponding to the escape velocity at that separation. The effective transport velocity $\beta_{\mathrm{eff}}$ therefore combines kinematic orbital motion and gravitational displacement in quadrature: $\beta_{\mathrm{eff}}^2 = \beta_{\mathrm{orb}}^2 + \beta_{\mathrm{esc}}^2$.

The Wigner steering remainder, which scales as $\beta_{\mathrm{orb}}^2$ per radian of velocity rotation, extracts energy from the orbit at a rate governed by the full effective transport state $\beta_{\mathrm{eff}}$. The resulting orbit integral is

$$\dot{P} = -\oint \beta_{\mathrm{orb}}^2 \; \beta_{\mathrm{eff}}^3 \; |d\varphi_{\mathrm{vel}}|,$$

with no additional numerical prefactor. For PSR B1913+16, this predicts $\dot{P} = -2.56 \times 10^{-12}$, compared to the observed $\dot{P}_{\mathrm{obs}} = -2.42 \times 10^{-12}$. The agreement is within 5.5%, with no free parameters.

**Keywords:** binary pulsar, orbital decay, Wigner rotation, gravitational transport stretch, displacement framework, PSR B1913+16

## 1. Introduction

The binary pulsar PSR B1913+16, discovered by Hulse and Taylor in 1974, remains one of the most precisely characterized relativistic systems. Its orbital period decreases at a rate consistent with the general-relativistic prediction for gravitational wave emission to within 0.2%. That agreement is widely regarded as indirect confirmation of gravitational radiation.

The present paper asks whether the same observed decay rate can be recovered within the displacement framework developed in this series. The mechanism proposed here is not gravitational wave emission in the general-relativistic sense, but energy extraction through Wigner steering accumulation, where the coupling between steering and energy loss is governed by the full effective transport state, including the gravitational displacement of the transport-supporting structure.

This paper incorporates a structural clarification of the displacement framework that bears on the calculation. In the displacement picture, mass displaces the transport-supporting connection structure, and the local transport is thereby stretched. The physical content of that stretch is that the displaced transport at radius $r$ from a mass resembles transport moving at the escape velocity $v_{\mathrm{esc}} = \sqrt{2GM/r}$. The gravitational acceleration then follows from the gradient of the resulting cumulative displacement, recovering the Newtonian limit. The present calculation uses this transport-stretch picture directly: each star in the binary moves through transport already stretched by the companion's displacement field.

The paper proceeds as follows. Section 2 reviews the system parameters. Section 3 recapitulates the Wigner steering remainder. Section 4 introduces the effective transport velocity combining kinematic and gravitational contributions. Section 5 presents the orbit integral and the resulting prediction. Section 6 discusses the structure of the result. Section 7 concludes.

## 2. System Parameters

The binary pulsar PSR B1913+16 consists of two neutron stars with well-determined masses $m_1 = 1.4398 \pm 0.0002 \, M_\odot$ and $m_2 = 1.3886 \pm 0.0002 \, M_\odot$. The orbital parameters relevant to the present calculation are:

$$
\begin{aligned}
M &= m_1 + m_2 = 2.8284 \, M_\odot, \\
e &= 0.6171334, \\
P_{\mathrm{orb}} &= 7.751939 \; \mathrm{hr} = 27907 \; \mathrm{s}, \\
a &= 1.950 \times 10^9 \; \mathrm{m}.
\end{aligned}
$$

The orbit is highly eccentric. At periastron the separation is $r_p = a(1-e) = 7.47 \times 10^8$ m and the relative orbital velocity reaches $v_p = 902$ km/s, giving $\beta_{\mathrm{orb}} = 3.01 \times 10^{-3}$. At apastron the separation is $r_a = a(1+e) = 3.15 \times 10^9$ m and the velocity drops to $v_a = 214$ km/s.

The symmetric mass ratio is $\eta = m_1 m_2 / M^2 = 0.2499$, which is 99.97% of the equal-mass value $1/4$. Mass-ratio corrections are therefore negligible for the present system.

The observed intrinsic orbital period derivative, corrected for kinematic effects, is

$$
\dot{P}_{\mathrm{obs}} = -2.423 \times 10^{-12}.
\tag{2.1}
$$

## 3. Wigner Steering Accumulation

The earlier paper in this series derived the accumulated rotational remainder $W$ associated with ordered noncollinear velocity acquisition. For a body whose velocity direction changes continuously, the differential Wigner accumulation at leading order is

$$
dW = \beta_{\mathrm{orb}}^2 \; |d\varphi_{\mathrm{vel}}|,
\tag{3.1}
$$

where $\varphi_{\mathrm{vel}}$ is the direction of the velocity vector in an inertial frame. This is a purely kinematic quantity: it depends on how the orbital velocity changes direction, not on the gravitational field directly.

For the relative orbit, the velocity components as functions of the true anomaly $\theta$ are

$$
v_r = \frac{GM}{h} \, e \sin\theta, \qquad v_t = \frac{GM}{h} \, (1 + e\cos\theta),
\tag{3.2}
$$

where $h = \sqrt{GMa(1-e^2)}$ is the specific angular momentum. The velocity direction in the inertial frame is $\varphi_{\mathrm{vel}} = \arctan(v_r/v_t) + \theta$. The per-orbit Wigner remainder is

$$
W_{\mathrm{orbit}} = \oint \beta_{\mathrm{orb}}^2 \; |d\varphi_{\mathrm{vel}}| = 3.856 \times 10^{-5} \; \mathrm{rad}.
\tag{3.3}
$$

This steering remainder is the angular tax per orbit associated with the continuously changing velocity direction. The eccentricity concentrates most of the accumulation near periastron, where both the speed and the rate of directional change are largest.

## 4. Gravitational Transport Stretch and the Effective Transport Velocity

The displacement framework treats gravity as a physical stretch of the transport-supporting connection structure. At radius $r$ from a mass $M$, the transport space is stretched by an amount corresponding to the local escape velocity: the displaced transport resembles transport moving at $\beta_{\mathrm{esc}} = v_{\mathrm{esc}}/c = \sqrt{2GM/(rc^2)}$.

This means that a body orbiting a companion sits in transport that is already stretched gravitationally. The total transport state experienced by the body combines its kinematic orbital velocity with the gravitational transport stretch. Because these are independent contributions to the transport cost, they combine in quadrature:

$$
\beta_{\mathrm{eff}}^2 = \beta_{\mathrm{orb}}^2 + \beta_{\mathrm{esc}}^2.
\tag{4.1}
$$

For a Keplerian orbit, $v^2 = GM(2/r - 1/a)$ and $v_{\mathrm{esc}}^2 = 2GM/r$, so

$$
\beta_{\mathrm{eff}}^2 = \frac{GM}{c^2}\left(\frac{2}{r} - \frac{1}{a}\right) + \frac{2GM}{rc^2} = \frac{GM}{c^2}\left(\frac{4}{r} - \frac{1}{a}\right).
\tag{4.2}
$$

A useful identity follows: since $\beta_{\mathrm{esc}}^2 - \beta_{\mathrm{orb}}^2 = GM/(ac^2)$ is constant around the orbit, the gravitational transport stretch always exceeds the kinematic velocity, with the excess determined by the orbital compactness.

At periastron, $\beta_{\mathrm{orb}} = 3.01 \times 10^{-3}$ and $\beta_{\mathrm{esc}} = 3.35 \times 10^{-3}$, giving $\beta_{\mathrm{eff}} = 4.50 \times 10^{-3}$. At apastron, $\beta_{\mathrm{orb}} = 7.12 \times 10^{-4}$ and $\beta_{\mathrm{esc}} = 1.63 \times 10^{-3}$, giving $\beta_{\mathrm{eff}} = 1.78 \times 10^{-3}$. The gravitational contribution is comparable to the kinematic contribution throughout the orbit, and dominates at apastron.

For a circular orbit, the virial theorem gives $v_{\mathrm{orb}}^2 = GM/a$ and $v_{\mathrm{esc}}^2 = 2GM/a$, so

$$
\beta_{\mathrm{eff}}^2 = 3\beta_{\mathrm{circ}}^2, \qquad \beta_{\mathrm{eff}} = \sqrt{3}\;\beta_{\mathrm{circ}}.
\tag{4.3}
$$

The factor $\sqrt{3}$ is exact for circular orbits and arises from the virial relation between kinetic and potential energy.

## 5. The Orbit Integral

The Wigner steering remainder is a kinematic quantity: the orbit curves the velocity direction, and the accumulated remainder scales as $\beta_{\mathrm{orb}}^2$ per radian of velocity rotation. The rate at which this steering extracts energy from the orbit, however, depends on the full effective transport state. The coupling has two factors:

1. **Transport-enhanced acceleration** ($\beta_{\mathrm{eff}}^2$): the effective gravitational coupling is governed by the full transport state, including both kinematic and gravitational displacement contributions. A body in stretched transport experiences enhanced effective acceleration, with the enhancement scaling as $\beta_{\mathrm{eff}}^2$.

2. **Velocity factor** ($\beta_{\mathrm{eff}}$): the rate of energy extraction is proportional to the effective velocity through the power relation.

The orbit integral combining Wigner steering with the effective transport coupling is therefore

$$
I = \oint \beta_{\mathrm{orb}}^2 \; \beta_{\mathrm{eff}}^3 \; |d\varphi_{\mathrm{vel}}|,
\tag{5.1}
$$

and the predicted period derivative is

$$
\dot{P} = -I.
\tag{5.2}
$$

Numerical evaluation over the Keplerian orbit gives

$$
I = 2.557 \times 10^{-12}.
\tag{5.3}
$$

Comparing to the observed value:

$$
\frac{\dot{P}_{\mathrm{pred}}}{\dot{P}_{\mathrm{obs}}} = \frac{-2.557 \times 10^{-12}}{-2.423 \times 10^{-12}} = 1.055.
\tag{5.4}
$$

The prediction agrees with the observed orbital decay rate to within 5.5%, with no free parameters and no additional numerical prefactor. For reference, the general-relativistic prediction from the Peters (1964) quadrupole formula gives $\dot{P}_{\mathrm{GR}} = -2.403 \times 10^{-12}$, which agrees with the observed value to within 0.8%.

## 6. Structure of the Result

### 6.1 Why no prefactor

In the earlier version of this calculation, which used only the kinematic $\beta_{\mathrm{orb}}$ throughout the integrand, a prefactor $\alpha = 3$ was needed to reach the observed value. That prefactor was inherited from the Mercury perihelion treatment, where three contributions of order $\beta^2$ — retardation, kinematic time dilation, and cumulative displacement gradient — each contributed equally to the precession coefficient.

In the present formulation, two of those three contributions are no longer external corrections. The retardation and cumulative displacement effects are gravitational in origin, and they are now encoded directly in $\beta_{\mathrm{esc}}$, which enters $\beta_{\mathrm{eff}}$ inside the integral. The kinematic time-dilation contribution ($\alpha_2$) is likewise absorbed into the effective transport state through $\beta_{\mathrm{orb}}$. With all three contributions inside the integrand, no external prefactor remains.

### 6.2 Circular orbit structure

For a circular orbit, the integral reduces to

$$
I_{\mathrm{circ}} = \beta_{\mathrm{circ}}^2 \times (\sqrt{3}\;\beta_{\mathrm{circ}})^3 \times 2\pi = 3\sqrt{3} \times 2\pi \; \beta_{\mathrm{circ}}^5.
\tag{6.1}
$$

The factor $3\sqrt{3} \approx 5.196$ arises naturally from the virial relation $\beta_{\mathrm{eff}} = \sqrt{3}\;\beta_{\mathrm{circ}}$ and carries no free content: it is a geometric consequence of how kinetic and potential energy relate in a Keplerian orbit.

### 6.3 Eccentricity enhancement

The ratio of the eccentric orbit integral to the circular orbit integral is

$$
\frac{I(e)}{I(0)} = 11.66.
\tag{6.2}
$$

This should be compared with general relativity's eccentricity enhancement factor $f(e) = 11.86$ for $e = 0.617$. The two values agree to within 1.7%.

This near-agreement is notable because the two frameworks weight the orbit differently. The present integral concentrates energy loss at periastron through the combination of peaked $\beta_{\mathrm{orb}}^2$ and peaked $\beta_{\mathrm{eff}}^3$, while GR's quadrupole formula involves different geometric averages. That two different weighting schemes produce nearly the same eccentricity enhancement for this orbit suggests that the eccentric-orbit structure is more robust than the details of either derivation.

### 6.4 The 5.5% residual

The prediction overshoots the observed value by 5.5%. Several possible sources can be identified:

1. **Mass-ratio dependence.** The present integral depends on the total mass $M$ through the orbital velocity and escape velocity, but not on the individual masses separately. General relativity's prediction depends on the chirp mass through the combination $m_1 m_2 / M^{1/3}$. For PSR B1913+16, the nearly equal masses make this distinction negligible, but a proper derivation from the retarded displacement map may introduce mass-ratio dependence that slightly modifies the integral.

2. **Quadrature combination.** The combination $\beta_{\mathrm{eff}}^2 = \beta_{\mathrm{orb}}^2 + \beta_{\mathrm{esc}}^2$ is the simplest form consistent with the two contributions being independent transport costs. The exact combination rule may involve corrections at higher order in $\beta$.

3. **Detailed coupling structure.** The decomposition into $\beta_{\mathrm{orb}}^2 \times \beta_{\mathrm{eff}}^3$ assumes that the Wigner steering is purely kinematic while the coupling is governed by the full effective transport. In detail, the gravitational displacement may also contribute to the steering (the orbit curves differently in displaced transport), which would modify the weighting.

### 6.5 Displacement interpretation of radiated energy

The Wigner steering remainder extracts energy from the orbit. In the displacement framework, that energy enters the transport-supporting structure as a propagating disturbance in the displacement field. The retarded displacement map developed in the companion dynamics paper provides the natural carrier: changes in the cumulative displacement $\Sigma(\mathbf{x},t)$ propagate at speed $c$, and the time-varying displacement sourced by the orbiting masses generates outward-propagating disturbances. These are the framework's analog of gravitational radiation.

The present paper establishes the rate of energy extraction from the orbit; the detailed description of the propagating disturbance belongs to the dynamical completion of the framework.

## 7. Conclusion

The binary pulsar PSR B1913+16 provides a stringent quantitative test for any framework that claims to recover weak-field relativistic phenomenology. The present paper shows that the displacement framework's prediction for the orbital period derivative agrees with the observed value to within 5.5%.

The key ingredient is the gravitational transport stretch: each star orbits through transport space already displaced by the companion's mass. The effective transport velocity $\beta_{\mathrm{eff}}$, combining kinematic and gravitational contributions in quadrature, governs the coupling between the Wigner steering remainder and the rate of energy extraction. The resulting formula,

$$
\dot{P} = -\oint \beta_{\mathrm{orb}}^2 \; \beta_{\mathrm{eff}}^3 \; |d\varphi_{\mathrm{vel}}|,
$$

uses no free parameters and no numerical prefactor. The eccentricity enhancement produced by this integral agrees with GR's enhancement factor to within 1.7%, and for circular orbits the integral reduces to $3\sqrt{3} \times 2\pi\;\beta^5$, where the factor $3\sqrt{3}$ follows from the virial theorem.

This result extends the framework's quantitative contact with observation from the solar-system regime into the strong-field binary pulsar domain, and establishes the gravitational transport stretch as an essential ingredient in the framework's account of relativistic orbital dynamics.

## References

[1] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[2] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[3] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. https://doi.org/10.5281/zenodo.19155341

[4] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[5] R. A. Hulse and J. H. Taylor, "Discovery of a pulsar in a binary system," *Astrophysical Journal* **195**, L51–L53 (1975).

[6] J. M. Weisberg, D. J. Nice, and J. H. Taylor, "Timing Measurements of the Relativistic Binary Pulsar PSR B1913+16," *Astrophysical Journal* **722**, 1030–1034 (2010). https://doi.org/10.1088/0004-637X/722/2/1030

[7] J. M. Weisberg and Y. Huang, "Relativistic Measurements from Timing the Binary Pulsar PSR B1913+16," *Astrophysical Journal* **829**, 55 (2016). https://doi.org/10.3847/0004-637X/829/1/55

[8] P. C. Peters, "Gravitational Radiation and the Motion of Two Point Masses," *Physical Review* **136**, B1224–B1232 (1964).

[9] P. C. Peters and J. Mathews, "Gravitational Radiation from Point Masses in a Keplerian Orbit," *Physical Review* **131**, 435–440 (1963).

[10] C. M. Will, "The Confrontation between General Relativity and Experiment," *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4
