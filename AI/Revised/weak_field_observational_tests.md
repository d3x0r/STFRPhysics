# The Homogeneous Propagation Framework: Weak-Field Observational Tests

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929); *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition* (DOI: 10.5281/zenodo.19155341); *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response* (DOI: 10.5281/zenodo.19155407)

## Abstract

This paper relates the homogeneous propagation framework's adopted exterior transport closure to weak-field observables. The exponential lapse and isotropic spatial coefficient give the Newtonian limit, the usual leading clock comparisons, Mercury's 42.99 arcseconds per century, optical-cost coefficient two, and the leading geodetic-spin precession. These results follow from the postulated closure and have been checked by orbit, ray and spin integration. The static displacement map remains a separate near-source construction. The scalar radiation integral contains both trace-free quadrupole and varying-trace terms; its relation to detector polarization and binary power still requires dynamical energy and response laws. Agreement in an observable limit does not by itself identify the underlying mechanism.

**Keywords:** displacement framework, weak-field tests, clock transport, gravitational redshift, optical delay, perihelion advance, radiation, gyroscope transport

## 1. Field Definitions and Observable Conventions

The adopted exterior closure is

\[
ds^2=-e^{-2\Sigma}c^2dt^2+B(dr^2+r^2d\Omega^2),\qquad
B=1+2\Sigma,\quad\Sigma=\frac{GM}{c^2r},\quad N=e^{-\Sigma}.
\]

Here \(r\) is isotropic radius, \(d\ell=\sqrt B\,dr\), and
\(r\sqrt B\) is circumferential radius. Radial proper velocity
\(U=d\ell/d\tau\), \(\gamma=\sqrt{1+U^2/c^2}\), and conserved
\(e=N\gamma\) give

\[
\frac{dU}{d\tau}=c^2\gamma^2\Sigma_{,\ell},\qquad
U_{\rm esc}=c\sqrt{e^{2\Sigma}-1}.
\]

The radial sign is outward positive. The bounded velocity \(v=U/\gamma\)
uses static local distance and time; the metric-coordinate derivative is
\(dr/dt=Nv/\sqrt B\). First-order clock comparisons use
\(N=1-\Sigma+O(\Sigma^2)\).

The fixed-displacement map \(\rho=\sqrt{r_{\rm ref}^2+d^2}\) and depth
\(\delta=(\rho-r_{\rm ref})\) remain the near-source construction. Their
reference radius and compressed ruler must not be identified with the
exterior metric coordinates above. The older position-only body-clock law
and its impulse/steering orbit are superseded for exterior motion. The
[closure checkpoint](WIP/proper_velocity_gravity/metric-closure-checkpoint.md)
and [direct verification](WIP/proper_velocity_gravity/closure-observable-results.md)
record the adopted equations, numerical results, and the deposited-paper
erratum draft.

## 2. Scope of the Observational Results

| Observable | Calculation supplied here | Additional requirements |
|---|---|---|
| Clock transport and stationary redshift | First-order rate differences with stated clock calibration | Actual trajectories, environmental corrections and endpoint conventions for data comparison |
| Delay and deflection | Direct rays: optical coefficient 2; bending and round-trip logarithmic coefficients 4 | Endpoint motion and actual observing geometry |
| Perihelion advance | Closure geodesic: 42.99 arcseconds/century for Mercury | Full many-body dynamics for an ephemeris prediction |
| Lunar ranging | External response and finite-body sampling | Comparable-source dynamics, self-energy response and optical timing |
| Scalar radiation | Conditional quadrupole power integral including its trace | Field-energy normalization, source evolution and detector coupling |
| Gyroscope drift | Direct static-metric spin transport: about 6.6 arcseconds/year at GP-B altitude | Mission geometry and a rotating-source sector for frame dragging |

These calculations test different parts of the framework. A common Newtonian limit does not fix every post-Newtonian coefficient. Equally, a shared clock or light-propagation formula does not establish equivalence of the underlying displacement and spacetime mechanisms.

## 3. Hafele–Keating: Direct Clock Transport

### 3.1 Gravitational and kinematic rate terms

Under the clock calibration of §1 and the low-speed kinematic expansion, the rate of a clock moving with speed \(v\) in a declared reference convention is

\[
\frac{d\tau}{dt}=1-\Sigma-\frac{v^2}{2c^2}
+O(\Sigma^2,\Sigma v^2/c^2,v^4/c^4).
\]

For aircraft and ground histories, their elapsed-time difference at this order is

\[
\Delta\tau=\int_0^T\left[\Sigma_g(t)-\Sigma_a(t)
+\frac{v_g(t)^2-v_a(t)^2}{2c^2}\right]dt.
\]

For fixed altitude \(h\) and Earth radius \(R\), the gravitational term is

\[
\Sigma_g-\Sigma_a=\frac{GM_\oplus}{c^2}
\left(\frac1R-\frac1{R+h}\right)\simeq\frac{gh}{c^2}.
\]

The higher clock gains time through this term. In an Earth-centred inertial calculation, surface rotation enters both clock velocities; aircraft motion changes the kinematic contribution according to direction. Actual elapsed differences require the time-dependent flight histories. No numerical flight-data fit is supplied here. Equality of these leading rate terms with a conventional calculation establishes equality at that approximation, not a separate derivation of the clock calibration from displacement dynamics.

### 3.2 Uniform background velocity and closed paths

To isolate a constant background velocity \(\mathbf V_0\), write both trajectories in the same inertial coordinate convention as \(\mathbf V_i=\mathbf V_0+\mathbf u_i\). The cross-term contribution to the clock difference is

\[
-\frac{\mathbf V_0}{c^2}\cdot
\int_0^T(\mathbf u_a-\mathbf u_g)dt
=-\frac{\mathbf V_0}{c^2}\cdot
[\Delta\mathbf x_a-\Delta\mathbf x_g].
\]

It vanishes when the two clocks start together and reunite in that convention. The remaining squared-speed terms still contain the rotation of the Earth and the two distinct trajectories. A rotating ground velocity is not a constant vector that can be removed by this argument. For time-dependent background motion, integration also contains its time derivative. Open paths require an explicit endpoint clock comparison and synchronization rule; the algebraic cross term alone does not define a measurable preferred-frame anomaly.

## 4. Pound–Rebka: Stationary Endpoint Redshift

Let an emitter be at \(r_1\) and receiver at \(r_2>r_1\). In a static transport description conserving the chosen coordinate phase rate along the ray, the received frequency relative to the emitter's locally measured frequency obeys

\[
\frac{f_{\rm rec}}{f_{\rm emit}}=\frac{N(r_1)}{N(r_2)}
\simeq1-[\Sigma(r_1)-\Sigma(r_2)].
\]

The signed upward frequency change is therefore negative. Its positive redshift magnitude is

\[
z\equiv\frac{f_{\rm emit}-f_{\rm rec}}{f_{\rm emit}}
\simeq\frac{GM_\oplus}{c^2}\left(\frac1{r_1}-\frac1{r_2}\right)
\simeq\frac{gh}{c^2}.
\]

For illustrative inputs \(g=9.827\) m/s², \(h=22.57\) m and \(c=299792458\) m/s, this is approximately \(2.468\times10^{-15}\). The expression is an endpoint comparison under the stated clock and phase-transport assumptions. It does not require adding a separate in-flight frequency-loss term. The measured endpoint relation alone does not distinguish between models that assign the same phase and rate ratios.

## 5. Shapiro Delay and Coordinate Path Cost

Local propagation at \(c\) is compatible with an excess coordinate travel time. To calculate that excess, define the *full* weak coordinate optical cost by

\[
n_{\rm coord}(r)=1+\kappa_{\rm opt}\Sigma(r)+O(\Sigma^2).
\]

The adopted closure fixes \(\kappa_{\rm opt}=2\), since
\(n_{\rm coord}=\sqrt B/N=e^\Sigma\sqrt{1+2\Sigma}\). Direct ray
integration verifies both delay and bending in the linked results. The cost must include the relevant path geometry, storage and time convention exactly once. A local stretch already represented in \(n_{\rm coord}\) must not be added again as another delay.

Along an unperturbed weak ray with impact parameter \(b\), \(r(z)=\sqrt{b^2+z^2}\). For endpoints at longitudinal distances \(L_1,L_2>0\),

\[
\Delta t_{\rm one}=\frac{\kappa_{\rm opt}GM}{c^3}
\left[\operatorname{asinh}(L_1/b)+\operatorname{asinh}(L_2/b)\right].
\]

For \(L_1,L_2\gg b\),

\[
\Delta t_{\rm one}\simeq\frac{\kappa_{\rm opt}GM}{c^3}
\ln\frac{4L_1L_2}{b^2}.
\]

A reciprocal round trip with effectively stationary endpoints doubles this quantity. Thus an optical cost with coefficient two gives a one-way coefficient \(2GM/c^3\) and a round-trip coefficient \(4GM/c^3\). Counting the return leg supplies only that doubling; it cannot also determine the optical-cost coefficient. Moving endpoints require separate outbound and inbound paths.

## 6. Mercury Perihelion: Adopted Exterior Closure

The coordinate-time geodesic through first post-Newtonian order is

\[
\ddot{\mathbf r}=-\frac{GM}{r^3}\mathbf r+
\frac{GM}{c^2r^3}\left[
\left(\frac{4GM}{r}-v^2\right)\mathbf r+
4(\mathbf r\cdot\mathbf v)\mathbf v\right].
\]

It gives \(\Delta\varpi=6\pi GM/[c^2a(1-e^2)]\). With the stated
paper constants, exact Binet integration yields 42.9886 arcseconds per
century using 87.969 days per orbit. The updated simulation's two-body
shadow yields 42.9927 using its measured period, consistent with the
42.992706 leading Kepler-period prediction. Halving its timestep changes
the result by less than 0.00005 arcseconds/century. No independent
\(3GML^2\) force term is inserted in the closure mode.

The earlier impulse-plus-steering response gave approximately one third
of this value and is retained as a historical calculation in checkpoint 7.
It is not an additional contribution to this geodesic. The printed deposited
metric \(f=(1+\Sigma)^{-2},g=1+2\Sigma,h=1\) gives 21.49, not 42.99;
the erratum draft addresses that separate error. The current nine-body
simulation combines Newtonian planetary gravity with the solar test-mass
1PN correction. The shadow is isolated from planetary perturbations.

## 7. Light Deflection and PPN Comparison

### 7.1 Deflection from the same optical cost

For the isotropic coordinate optical cost in §5, the first-order magnitude of transverse bending is

\[
\alpha=\frac{\kappa_{\rm opt}GM}{c^2b}
\left[\frac{L_1}{\sqrt{L_1^2+b^2}}+
\frac{L_2}{\sqrt{L_2^2+b^2}}\right]
\longrightarrow\frac{2\kappa_{\rm opt}GM}{c^2b}.
\]

The integral follows from \(|\partial_b\Sigma|=GMb/[c^2(b^2+z^2)^{3/2}]\). Delay and bending must use the same optical description. Merely recovering local propagation speed or a spatial shell map does not separately fix \(\kappa_{\rm opt}\). Tensor storage and direction-dependent transport require the corresponding ray equation rather than this scalar-index specialization.

### 7.2 What a PPN identification means

In the adopted static isotropic metric,
\(f=1-2\Sigma+2\Sigma^2+\cdots\) and \(B=1+2\Sigma\) give
\(\beta_{\rm PPN}=\gamma_{\rm PPN}=1\). Thus the optical coefficient
\(1+\gamma_{\rm PPN}\) is two, and the perihelion coefficient
\((2+2\gamma_{\rm PPN}-\beta_{\rm PPN})/3\) is one relative to the
usual leading result. These are identifications of the stated exterior
expansion, not an identification of microscopic mechanisms or a complete
many-body PPN theory.

## 8. Lunar Laser Ranging: Finite Bodies and Source Consistency

Ranging combines source motion, acceleration of extended bodies, internal and gravitational self-energy response, and light propagation between moving endpoints. The selected point-test law is independent of the test mass. For a finite body's instantaneous mass distribution,

\[
\mathbf F=\int\mathbf a_s(\mathbf B+\boldsymbol\eta)\,dm.
\]

Defining the centre by \(\int\boldsymbol\eta\,dm=0\) and the normalized second moment \(S_{jk}=M_t^{-1}\int\eta_j\eta_k\,dm\),

\[
\frac{F_i}{M_t}=a_i(\mathbf B)+\tfrac12S_{jk}\partial_j\partial_k a_i(\mathbf B)+\cdots.
\]

Differential response across the body begins with \(\partial_j a_i\), while the leading mean correction for a centred distribution involves second derivatives. This supplies a definite finite-body input. It does not by itself prove equal response of bodies with different binding or gravitational self-energy, establish a zero Nordtvedt effect, or fix lunar geodetic precession. Those require a consistent source-composition and orientation-transport model [6].

Keeping \(G\) and the calibration parameters constant is an assumption of the calculations here, not a derived prediction about cosmological or environmental variation. A preferred-background signal likewise requires explicit source/clock/path coupling and an actual ranging observable; a background direction alone does not define an amplitude.

## 9. Gravitational Radiation and Detector Response

### 9.1 Field amplitude and local deformation

The static local map has

\[
E=D I+(D^{-1}-D)\mathbf n\mathbf n^{\mathsf T},\quad
E-I\simeq(D-1)(I-2\mathbf n\mathbf n^{\mathsf T}),\quad
D-1=\ell_0\Sigma/r.
\]

Its local deformation amplitude is distinct from accumulated depth. This static relation does not automatically convert a radiative scalar wave into a measured strain. A displacement wave, material endpoint motion and an optical phase response need a common dynamical coupling.

### 9.2 Conditional scalar power

Consider the weak scalar wave equation

\[
c^{-2}\partial_t^2\Sigma-\nabla^2\Sigma=4\pi G\varrho_m/c^2,
\]

where \(\varrho_m\) is mass-equivalent density. For an isolated slow source with the monopole and dipole radiation terms absent under the chosen conservation assumptions, let

\[
Q_{ij}=\int\varrho_m x_i x_j\,d^3x,\quad
\delta\Sigma=\frac{G}{2c^4R}n_i n_j\ddot Q_{ij},\quad
F=\frac{c^3}{4\pi G}(\partial_t\delta\Sigma)^2.
\]

Here \(R\) is observation distance and \(\mathbf n\) the observation direction. The amplitude and flux normalization are stated assumptions, not an energy law derived from the exact nonlinear static field. With \(T_{ij}=\dddot Q_{ij}\), angular integration gives

\[
\boxed{P_\Sigma=\frac G{60c^5}\left\langle(\operatorname{tr}T)^2+2T_{ij}T_{ij}\right\rangle.}
\]

Equivalently, using the trace-free tensor \(T^{\rm STF}_{ij}=T_{ij}-\delta_{ij}\operatorname{tr}T/3\),

\[
P_\Sigma=\frac G{30c^5}\langle T^{\rm STF}_{ij}T^{\rm STF}_{ij}\rangle
+\frac G{36c^5}\langle(\operatorname{tr}T)^2\rangle.
\]

For a Newtonian circular binary the quadrupole trace is constant. Eccentric motion can produce a nonzero trace contribution. Tensor component counting does not establish additional independent waves or multiply their total power: the field constraints and energy law must determine that count. A binary decay prediction also requires a consistent comparable-source trajectory and orbital-energy balance. The conditional scalar expression is therefore not a completed inspiral prediction.

### 9.3 Breathing and longitudinal response

For an initially resting local detector, extending the gradient response to a plane disturbance \(\psi=f(t-\mathbf n\cdot\mathbf x/v_w)\) gives

\[
\delta\ddot\xi_i=c^2\partial_i\partial_j\psi\,\xi_j
=\frac{c^2}{v_w^2}f''n_i n_j\xi_j.
\]

That specified coupling is longitudinal at this order. A direct material strain proportional to \(I-2\mathbf n\mathbf n^{\mathsf T}\) would instead contain equal transverse expansion and longitudinal compression. Such a strain is an additional material-following prescription unless derived from the same transport dynamics. It must not be added to a motion already converted through that map as another force.

A source trace contribution does not by itself identify a detector breathing polarization. The observable includes endpoint response, light travel and local oscillator phase. For a fixed chart and unperturbed stationary endpoints separated by \(L\mathbf p\),

\[
\delta T(t)=\frac{\mathbf p\cdot[\delta\mathbf x_B(t+L/c)-\delta\mathbf x_A(t)]}{c}
+\frac1c\int_0^L\delta n_{\mathbf p}(\mathbf x_A+s\mathbf p,t+s/c)\,ds.
\]

The full coordinate optical cost \(\delta n_{\mathbf p}\) includes each geometric contribution once. Round-trip phase requires both legs and the oscillator's transported phase. Equal changes of both detector arms can vanish in a differential measurement without the individual responses vanishing. No unique breathing amplitude follows before these couplings are fixed.

## 10. Gravity Probe B: Gyroscope and Reference Transport

The measured quantity is gyroscope orientation relative to a transported observational reference, rather than an orbital apsidal angle alone [5]. A calculation must evolve the trajectory, spin/orientation and guide-star signal in compatible conventions. A basis rotation is not automatically a translational steering impulse, and an orbit-precession coefficient does not alone determine gyroscope drift.

Parallel transport of the spin four-vector on the adopted metric now
supplies the static-source geodetic result:
\(\Delta\psi=3\pi GM/(c^2r)\) per circular orbit at leading order.
Direct integration at \(r=7020137\) m gives 6.620970 arcseconds/year.
This nominal 642 km circular-orbit benchmark is distinct from the
mission-specific prediction of 6.6061 arcseconds/year [5]. Spin norm and
orthogonality are preserved to better than \(10^{-12}\). A static spherical
metric does not supply Earth's frame-dragging contribution.

For a rotating source, a candidate current field is

\[
\mathbf A_D(\mathbf x,t)=\frac G{c^2}\int
\frac{\varrho_m(\mathbf x',t-R/c)\mathbf v(\mathbf x',t-R/c)}R\,d^3x'.
\]

This field has velocity units. Its part odd under source-spin reversal carries relevant handedness, but the coupling of the field or its curl to orientation must still be specified. The source's moment of inertia and the orbital projection enter after that coupling is defined; neither fixes its normalization. The geodetic result above follows from the static closure; this current integral alone still supplies no frame-dragging normalization.

## 11. Conclusions

The adopted exterior closure supplies the Newtonian limit, leading clock comparisons, the full leading Mercury advance, optical-cost coefficient two, and the leading geodetic-spin response. These have been checked by direct integrations using one metric. Many-body self-energy, radiation, frame dragging and material support require additional source and response equations. The fixed-displacement map and its bounded accumulated depth remain distinct from the exact strong-field continuation of the exterior metric.


## References

[1] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[2] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[3] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. https://doi.org/10.5281/zenodo.19155341

[4] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[5] C. W. F. Everitt et al., "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity," *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[6] J. G. Williams, S. G. Turyshev, and D. H. Boggs, "Lunar Laser Ranging Tests of the Equivalence Principle with the Earth and Moon," *International Journal of Modern Physics D* **18**(7), 1129–1175 (2009). https://doi.org/10.1142/S021827180901500X

[7] C. M. Will, "The Confrontation between General Relativity and Experiment," *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4
