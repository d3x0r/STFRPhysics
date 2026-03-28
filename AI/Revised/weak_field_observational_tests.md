# The Homogeneous Propagation Framework: Weak-Field Observational Tests

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929); *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition* (DOI: 10.5281/zenodo.19155341); *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response* (DOI: 10.5281/zenodo.19155407)

## Abstract

The companion dynamics paper [4] develops the displacement framework's two-layer structure, derives the effective coordinate-level geometry from the displacement postulate, and recovers the weak-field orbit equation with the correct perihelion precession. The present paper collects the individual weak-field observational tests that follow from that framework, ordered by the level of machinery each requires. The Hafele-Keating direct clock-transport experiment and the Pound-Rebka gravitational redshift test the time-dilation structure alone. The Shapiro delay tests the cumulative displacement integrated along a signal path. Mercury perihelion advance engages the full effective coordinate geometry and its orbit equation. Light deflection and the PPN \(\gamma\) parameter follow structurally from the symmetric modification of \(\varepsilon_0\) and \(\mu_0\) by displacement, giving \(\gamma=1\) without fitting. Lunar laser ranging provides multi-body consistency checks. Gravitational radiation develops the tensor structure of displacement disturbances and identifies a breathing-mode channel as a concrete near-term observational distinction from general relativity. Gravity Probe B requires both the scalar displacement sector and the rotating-source vector response. Together, these tests show that the displacement framework's weak-field sector reaches the standard observational benchmarks without separately motivated correction terms.

**Keywords:** displacement framework, weak-field tests, Hafele-Keating, Pound-Rebka, Shapiro delay, Mercury precession, PPN parameters, light deflection, lunar laser ranging, gravitational radiation, Gravity Probe B, breathing mode

## 1. Introduction

The dynamics paper in this series [4] establishes the displacement framework at the level of causal structure: the retarded displacement map, the two-layer coupled architecture, and the effective coordinate-level geometry whose weak-field orbit equation recovers the standard perihelion precession as a single integrated result. That paper demonstrates the orbit structure but defers the detailed comparison with individual weak-field tests.

The present paper takes up those comparisons. The sections are ordered by the level of framework machinery each test requires. The earliest sections involve only the time-dilation structure: the cumulative displacement \(\Sigma\) and the transport-structure kinematic factor \(\lambda\). Later sections engage the full effective coordinate-level line element

\[
ds^2=-\frac{c^2}{(1+\Sigma)^2}\,dt^2+D^2\,dr^2+r^2\,d\Omega^2
\]

and its orbit equation, while the final section requires the rotating-source vector sector. The three-contribution structure identified in the dynamics paper — retardation mismatch, external-field kinematic steering, and cumulative displacement gradient — appears in the orbital tests as three aspects of the single geometric fact that the displacement modifies the time and radial components while leaving the angular sector Euclidean. The total coefficient \(\alpha=3\) is the primary result derived from the effective geometry; the decomposition into \(\alpha_1=1\), \(\alpha_2=1/2\), and \(\alpha_3=3/2\) is interpretive and matches the standard GR post-Newtonian breakdown.

## 2. Hafele-Keating: Direct Clock Transport

The Hafele-Keating experiment (1971) provides a direct test of the framework's time-dilation structure by transporting cesium atomic clocks on commercial aircraft around the world in both directions and comparing them to reference clocks at the U.S. Naval Observatory. In this framework, two effects contribute to the elapsed-time difference between airborne and ground clocks, both arising from the same displacement and transport structure used throughout the paper.

### 2.1 Gravitational contribution

A clock at altitude \(h\) above the Earth's surface sits at a smaller cumulative displacement than a clock at the surface. Its realized duration therefore runs faster relative to coordinate time. The fractional rate difference is

\[
\frac{\Delta\tau}{\tau}\bigg|_{\text{grav}}=\frac{GM_\oplus}{C^2}\left(\frac{1}{R}-\frac{1}{R+h}\right)\approx\frac{g\,h}{C^2},
\]

where \(R\) is the Earth's radius at the relevant latitude and \(g\) is the local gravitational acceleration. This contribution is positive for the airborne clock — it gains time relative to the ground.

### 2.2 Kinematic contribution

Both ground and airborne clocks move through the transport structure. In the Earth-centered inertial frame, the ground clock moves at the local surface rotation speed \(v_\oplus\), while the airborne clock moves at \(v_\oplus\pm v_{\text{air}}\) depending on the direction of flight. The kinematic time-dilation difference is

\[
\frac{\Delta\tau}{\tau}\bigg|_{\text{kin}}=\frac{v_\oplus^2-v_{\text{plane}}^2}{2C^2},
\]

where \(v_{\text{plane}}\) is the airborne clock's speed in the inertial frame. For eastbound flight (\(v_{\text{plane}}=v_\oplus+v_{\text{air}}\)), the airborne clock moves faster and loses time. For westbound flight (\(v_{\text{plane}}=v_\oplus-v_{\text{air}}\)), the airborne clock moves slower and gains time.

### 2.3 Combined prediction

The net elapsed-time difference over flight time \(T\) is

\[
\Delta\tau=T\left[\frac{GM_\oplus}{C^2}\left(\frac{1}{R}-\frac{1}{R+h}\right)+\frac{v_\oplus^2-v_{\text{plane}}^2}{2C^2}\right].
\]

The qualitative structure is correctly predicted: eastbound clocks lose time (kinematic loss exceeds gravitational gain), westbound clocks gain time (both contributions are positive). The asymmetry between eastbound and westbound arises from the velocity relative to the inertial frame, not from any frame-dependent convention.

### 2.4 Comparison with measurement

For a simplified model using average altitude and speed, the eastbound prediction is approximately \(-60\) ns, compared to the measured \(-59\pm10\) ns — agreement within measurement uncertainty. The westbound simplified prediction overestimates the gain because the model assumes constant cruise altitude for the full flight duration, while the actual flight included ground time at airports, varying altitudes, and latitude changes that reduce the gravitational contribution.

Hafele and Keating's own published prediction, which integrated over the actual logged navigational data supplied by the flight crews, gave \(+275\pm21\) ns for the westbound flight, matching the measured \(+273\pm7\) ns. The framework's prediction, if integrated over the same flight-path data, would give the same result, because both the gravitational and kinematic contributions are numerically identical to the GR expressions at this precision level. The displacement framework's \(\Sigma\)-gradient time dilation and the transport-structure kinematic dilation are the same two effects that GR attributes to gravitational and special-relativistic time dilation, expressed in different language but yielding the same weak-field numbers.

The Hafele-Keating experiment therefore confirms that the framework's time-dilation structure — both the \(\Sigma\)-dependent gravitational component and the velocity-dependent kinematic component — is correct at the level of direct clock transport.

### 2.5 Preferred-frame velocity and the closed-path cancellation

In this framework, the kinematic time-dilation factor \(\lambda=\sqrt{1-v^2/C^2}\) applies to the total velocity through the transport structure, not merely to velocity relative to the Earth-centered inertial frame. The full velocity stack includes the CMB-frame motion of the solar system (\(\sim370\) km/s), the Earth's orbital velocity (\(\sim30\) km/s), and the surface rotation and aircraft speed on top of that.

The squared total velocity of the airborne clock differs from that of the ground clock by

\[
|\vec{V}_{\text{plane}}|^2-|\vec{V}_{\text{ground}}|^2=2\,\vec{V}_g\cdot\vec{v}_{\text{air}}+v_{\text{air}}^2,
\]

where \(\vec{V}_g\) is the total velocity of the ground station through the transport structure and \(\vec{v}_{\text{air}}\) is the aircraft's velocity relative to the ground. The second term gives the standard ECI kinematic contribution. The first term is a cross-term between the preferred-frame velocity and the local aircraft velocity, and at full alignment it would be roughly three orders of magnitude larger than the standard term.

That cross-term, however, vanishes identically for a closed path. Since \(\vec{V}_g\) is effectively constant over the flight duration (the CMB and orbital velocities change negligibly over days), the integrated cross-term is

\[
\int_0^T 2\,\vec{V}_g\cdot\vec{v}_{\text{air}}\,dt=2\,\vec{V}_g\cdot\int_0^T\vec{v}_{\text{air}}\,dt=2\,\vec{V}_g\cdot\Delta\vec{x}=0,
\]

because the aircraft returns to its starting point (\(\Delta\vec{x}=0\)). The preferred-frame cross-terms cancel exactly for any closed-path clock-transport experiment. The surviving kinematic contribution is the frame-independent \(v_{\text{air}}^2\) term, which is the standard result.

This cancellation explains why the Earth-centered inertial calculation gives the correct answer even in a framework with a preferred transport structure: for closed paths, the preferred-frame velocity drops out of the differential elapsed time. An open-path clock-transport experiment — one in which the clock does not return to its starting point — would in principle retain the cross-term, though the required measurement precision would be extreme.

## 3. Pound-Rebka: Gravitational Redshift

The Pound-Rebka experiment (1959) and its refinement by Pound and Snider (1965) measured the gravitational frequency shift of 14.4 keV photons over a vertical height of 22.57 m using the Mössbauer effect in \({}^{57}\)Fe. In this framework, the result is not introduced as a separate in-transit mechanism. It follows directly from the position-dependent realized clock rate set by the cumulative displacement. Once gravitationally differentiated clock rates are admitted, the observed shift is already fixed by the endpoint rate ratio.

### 3.1 Prediction

A clock at radius \(r_1\) from the Earth's center realizes duration at a rate governed by the local cumulative displacement \(\Sigma(r_1)\). A photon emitted at \(r_1\) and received at \(r_2>r_1\) arrives at a receiver whose clock runs faster. The fractional frequency shift is

\[
\frac{\Delta f}{f}=\frac{GM_\oplus}{C^2}\left(\frac{1}{r_1}-\frac{1}{r_2}\right)\approx\frac{g\,h}{C^2},
\]

where \(g=GM_\oplus/r^2\) is the local gravitational acceleration and \(h=r_2-r_1\) is the height difference. No metric or curved-spacetime construction is required — the shift is entirely a consequence of the displacement-gradient difference in realized clock rates between emitter and receiver. This is already the full first-order prediction for two stationary endpoints at different heights.

In this framework, the photon does not lose energy as it climbs out of the displacement field, nor does it gain energy as it falls in. The photon propagates at \(C\) through the transport structure and arrives unchanged. What differs between emitter and receiver is the rate at which local physical processes unfold — the realized clock rate. A photon emitted by a slower clock and received by a faster clock is measured as redshifted, not because anything happened to the photon in transit, but because the receiver's clock ticks faster than the emitter's. The observed frequency shift is a comparison of endpoint clock rates, not a property acquired by the photon along the way. Once the endpoint clock-rate structure is admitted, no additional in-transit frequency-evolution term is needed to reproduce the experiment.

### 3.2 Comparison with measurement

For the Jefferson Physical Laboratory at Harvard (latitude 42.37° N, geocentric radius \(R_M=6{,}368{,}495\) m, local \(g=9.827\) m/s²), the predicted fractional shift over \(h=22.57\) m is

\[
\frac{\Delta f}{f}=2.468\times10^{-15}.
\]

Pound and Snider (1965) measured \(2.46\times10^{-15}\) with approximately 1% precision, giving agreement within 0.3%. The experiment confirms the \(\Sigma\)-gradient clock-rate structure at the most elementary level: two stationary clocks at different depths in the displacement field realize different clock rates, and the observed frequency shift is the instantaneous ratio of those rates at the emission and reception points. The photon does not accumulate a shift along its path — it is emitted at one realized rate and received at another, and the fractional frequency difference is exhausted by the difference in realized clock rates at the two endpoints.

## 4. Shapiro Delay

In this framework, the Shapiro delay is a path-integrated propagation-cost effect. Light does not slow locally near a mass; it continues to propagate at \(C\) in the locally realized description. The delay arises because the displaced transport structure near the mass contains more storage per coordinate meter, so the signal accumulates extra coordinate travel time along the path through the near-mass region.

The relevant field quantity is the cumulative displacement

\[
\Sigma(r)=\frac{d^2}{2r},
\]

and for a signal passing a mass with impact parameter \(b\), with path coordinate \(z\), one has

\[
r(z)=\sqrt{b^2+z^2}.
\]

The one-way delay is then

\[
\Delta t_{\text{one-way}}=\frac{1}{C}\int_{-L}^{L}\Sigma(r)\,dz
=\frac{d^2}{2C}\int_{-L}^{L}\frac{dz}{\sqrt{b^2+z^2}}.
\]

For \(L\gg b\), this gives

\[
\Delta t_{\text{one-way}}=\frac{d^2}{2C}\ln\!\left(\frac{2L}{b}\right).
\]

Using separate endpoint distances \(L_1\) and \(L_2\), and \(d^2=2GM/C^2\), the one-way result becomes

\[
\Delta t_{\text{one-way}}=\frac{GM}{C^3}\ln\!\left(\frac{4L_1L_2}{b^2}\right).
\]

The measurable signal is normally round trip, so the delay doubles. With the framework's mass-to-displacement relation, the full round-trip result is

\[
\Delta t_{\text{round trip}}=\frac{4GM}{C^3}\ln\!\left(\frac{4L_1L_2}{b^2}\right),
\]

matching the standard weak-field logarithmic form.

The interpretive point is that the delay is not attributed to a local slowing of light in the realized geometry, nor to a curved path through space. Light continues to propagate at \(C\) through each locally realized meter of transport. The delay arises because the displaced transport structure near the mass has more \(F\!\cdot\!H\) storage per coordinate meter — the tangential stretching of the transport packs more storage structure into each unit of coordinate extent. Light traversing that region therefore covers fewer coordinate meters per unit of coordinate time, even though its local propagation speed is unchanged. The Shapiro delay is thus a propagation-cost effect accumulated along the signal path.

## 5. Mercury Perihelion Precession

Mercury perihelion advance is treated in this framework as a local weak-field consequence of finite-speed displacement response on an eccentric orbit, rather than as the output of a purely static correction. The primary result is the integrated weak-field orbit equation on the effective displacement geometry, which yields the standard total coefficient \(\alpha=3\) and therefore the observed secular precession. The retardation, kinematic-steering, and displacement-geometry pieces discussed below are an interpretive unpacking of that integrated result, not independent fitted ingredients.

The first interpretive contribution arises from the retardation mismatch. If the retardation time is

\[
\tau=\frac{r}{C},
\]

then during that interval Mercury advances on its curved orbit. Because the orbit is accelerated rather than inertial, the retarded cone geometry no longer lands exactly on Mercury's instantaneous position. The resulting angular mismatch is written as

\[
\delta\phi_{\text{mismatch}}=\frac{1}{2}\ddot{\phi}\tau^2,
\]

and with angular momentum \(L=r^2\dot{\phi}\) this becomes

\[
\delta\phi_{\text{mismatch}}=\frac{L\dot r}{rC^2}.
\]

That mismatch induces a tangential force

\[
F_\perp=\frac{GM}{r^2}\cdot\frac{L\dot r}{rC^2}.
\]

The second interpretive contribution comes from the external-field kinematic steering. Mercury is deflected by the Sun's gravitational field, which belongs to the transport structure. The accumulated steering per orbit uses the external-field coefficient developed in the companion noncollinear paper [3], giving

\[
W_{\mathrm{ext,orbit}}=(\gamma-1)\,2\pi\approx \tfrac{1}{2}\beta^2\,2\pi.
\]

This is the standard Thomas precession value. (Earlier versions of the companion notes listed the co-moving integral \(W_{\mathrm{co}}=(\gamma^2-1)\cdot 2\pi\) and a separate "time dilation of internal oscillations" as independent contributions. These are one effect: the external-field integral already incorporates the time-dilation mismatch through its \(1/(\gamma_{\mathrm{tot}}+1)\) correction factor.)

The third interpretive contribution comes from the cumulative displacement field

\[
\Sigma(r)=\frac{d^2}{2r},
\]

which modifies the effective radial and temporal components of the coordinate geometry. This is the dominant geometric contribution.

Taken together, this interpretive decomposition gives

\[
\alpha=\alpha_1+\alpha_2+\alpha_3=1+\tfrac{1}{2}+\tfrac{3}{2}=3,
\]

matching the total coefficient already obtained from the effective displacement geometry. The corrected effective potential may therefore be written

\[
V_{\text{eff}}=-\frac{GM}{r}\left(1+\frac{\alpha GM}{rC^2}\right).
\]

Applying the standard weak-field precession integral then gives

\[
\delta\omega=\frac{2\pi\alpha GM}{a(1-e^2)C^2}=\frac{6\pi GM}{a(1-e^2)C^2}.
\]

For Mercury this yields

\[
\delta\omega=42.98\ \text{arcsec/century}.
\]

A numerical consistency check using a nine-body simulation of the inner solar system, with the displacement-framework force law applied to all bodies simultaneously, gives approximately \(43.3\pm0.3\) arcsec/century for Mercury's anomalous precession, supporting the analytical result.

## 6. Light Deflection and the PPN \(\gamma\) Parameter

### 6.1 Light deflection from realized propagation cost

The earlier straight-in-connection-space picture requires one correction. If a horizontal straight line in connection space is mapped back to displaced coordinates through \(D(r,d)=\sqrt{r^2+d^2}/r\), the result is a symmetric arch: the path bulges near closest approach but returns to the same asymptotic direction at infinity. The displacement mapping by itself therefore gives no net far-field deflection. What it captures is the spatial deformation of the medium, not yet the realized ray. The observable light path must instead be obtained from a stationary-cost principle.

The relevant quantity for an actual light ray is the **realized propagation cost** through the displaced medium. In weak field, the cumulative displacement is

\[
\Sigma(r)=\frac{d^2}{2r}=\frac{GM}{C^2 r}.
\]

A purely timing-side treatment would assign an index \(n(r)=1+\Sigma(r)\) and recover only the Soldner/Newtonian half-deflection. In the present framework, however, the gravitational modification is Type G: both \(\varepsilon_0\) and \(\mu_0\) scale together. That produces two equal burdens along the path. First, the propagation rate is reduced by the local timing burden, giving a factor \((1+\Sigma)\). Second, the same displacement stretches the traversed transport medium, giving an equal spatial burden \((1+\Sigma)\). The realized cost per coordinate length is therefore

\[
n_{\mathrm{eff}}(r)=(1+\Sigma(r))^2 \approx 1+2\Sigma(r)=1+\frac{d^2}{r}.
\]

Light deflection is then the Fermat/Huygens result for the path that minimizes

\[
\int n_{\mathrm{eff}}(r)\,ds,
\]

not the image of a straight coordinate remap. For a background source at large impact parameter \(b\gg d\),

\[
\theta=\int \frac{\partial n_{\mathrm{eff}}}{\partial b}\,dx=\frac{2d^2}{b}=\frac{4GM}{bC^2},
\]

using \(d^2=2GM/C^2\). This is the standard GR weak-field result. For the Sun's limb \((b=R_\odot)\), it yields \(1.75\) arcsec, in agreement with modern VLBI constraints.

The factor of \(4\) is therefore most cleanly read as two separate factors of \(2\). One comes from the mass-displacement relation \(d^2=2GM/C^2\). The other comes from the realized cost itself: \(n_{\mathrm{eff}}=(1+\Sigma)^2\) contains one \((1+\Sigma)\) from the time cost and one \((1+\Sigma)\) from the space cost. This gives the same structural conclusion as the earlier symmetric \(\varepsilon_0/\mu_0\) argument, but now through a direct variational derivation rather than through the coordinate transform alone.

This correction also changes the interpretation of self-lensing. Under the stationary-cost ray picture, limb rays from the mass star curve toward the mass rather than away from it, so the apparent disc is not reduced by the earlier CS-straight construction. The present weak-field paper does not attempt a full compact-object apparent-radius analysis, but the relevant optical statement is now clear: the realized ray is the least-action path in the displaced medium.

For precise alignment of observer, mass, and background source, the same realized-cost optics produces the usual Einstein ring

\[
\theta_E=\sqrt{\frac{4GM\,D_{ls}}{C^2\,D_l\,D_s}},
\]

where \(D_l\), \(D_s\), and \(D_{ls}\) are the observer-lens, observer-source, and lens-source distances. For offset sources, the ring breaks into arcs or split images in the standard way. The phenomenology is therefore unchanged; what changes is the mechanism assigned to the realized ray.

### 6.2 The PPN \(\gamma\) parameter

The parameterized post-Newtonian parameter \(\gamma\) measures the degree to which spatial geometry is deformed per unit mass. It enters three observational predictions: light deflection is proportional to \((1+\gamma)/2\), the Shapiro delay is proportional to \((1+\gamma)/2\), and perihelion precession depends on \((2+2\gamma-\beta)/3\). In general relativity, \(\gamma=1\) exactly.

In this framework, \(\gamma=1\) is not a fitted value but a structural consequence of how displacement modifies the vacuum storage medium. The displacement field scales both \(\varepsilon_0\) and \(\mu_0\) by the same factor — what the companion dynamics paper calls a Type G (gravitational) modification. This symmetric scaling leaves the vacuum impedance \(Z_0=\sqrt{\mu_0/\varepsilon_0}\) unchanged while modifying the propagation speed and storage density equally in all directions. The equal treatment of the two storage modes is what produces \(\gamma=1\): there is no mechanism within the framework for spatial deformation to differ from temporal deformation at leading post-Newtonian order.

The best current constraint on \(\gamma\) comes from the Cassini spacecraft's superior conjunction in 2003. The measurement tracked the two-way coherent frequency shift of a radio signal passing near the Sun, extracting the time-varying Shapiro delay as the impact parameter changed over several days. The result was \(\gamma-1=(2.1\pm2.3)\times10^{-5}\), consistent with \(\gamma=1\).

### 6.3 Preferred-frame velocity and the Cassini measurement

The solar system moves through the transport structure at approximately \(370\) km/s (the CMB dipole velocity). In principle, this motion could introduce a directional asymmetry in the Shapiro delay that would mimic a departure from \(\gamma=1\). In practice, the correction is negligible for two reasons.

First, the Cassini measurement uses a round-trip coherent link. The first-order Doppler shift from the CMB-frame motion is a constant offset in the frequency data, absorbed into the spacecraft trajectory model rather than appearing in the time-varying Shapiro signature that determines \(\gamma\).

Second, the displacement field's modification of the vacuum storage is achromatic — the symmetric scaling of \(\varepsilon_0\) and \(\mu_0\) does not couple to the signal frequency or to the observer's velocity through the transport structure at first order. The propagation cost through the displaced region depends on the local \(F\!\cdot\!H\) density, not on the velocity of the system through which that density is embedded.

The round-trip geometry further suppresses any residual directional asymmetry to order \((v_{\text{CMB}}/C)^2\approx1.5\times10^{-6}\), which is below the Cassini measurement precision. The framework therefore predicts \(\gamma=1\) with no preferred-frame correction at any currently accessible precision level.

### 6.4 The PPN \(\beta\) parameter

The second PPN parameter \(\beta\) measures nonlinearity in the gravitational superposition. In this framework, the displacement field has a specific ordering rule (farthest source first, closest last), which is explicitly non-additive. This gives \(\beta\neq1\) in principle. However, the correction is second-order in \(\Sigma\):

\[
\beta-1\sim O(\Sigma^2)\sim\left(\frac{GM}{C^2r}\right)^2.
\]

For Mercury, \(\Sigma\approx2.5\times10^{-8}\), giving \(\beta-1\sim10^{-15}\) — far below any current measurement threshold. With \(\gamma=1\) and \(\beta=1\) to this precision, the perihelion precession factor \((2+2\gamma-\beta)/3\) is exactly \(1\), and the full Mercury precession is recovered.

## 7. Lunar Laser Ranging: Equivalence and Consistency Checks

Lunar laser ranging provides a long-baseline weak-field consistency test. In the present context, its importance is not that it introduces a new dynamical mechanism beyond those already used for Mercury and Gravity Probe B, but that it checks whether the same displacement structure remains consistent when applied to the coupled Earth-Moon-Sun system.

### 7.1 Zero Nordtvedt effect

The primary LLR test is the Nordtvedt effect: whether the Earth and Moon fall toward the Sun at slightly different rates because they contain different fractions of gravitational self-energy. In this framework, the null result is structural. The displacement gradient of the Sun acts on each body through the boundary of its displacement region rather than by separately sampling its internal bookkeeping of self-energy. Earth's self-energy is already encoded in its total displacement parameter, and the Moon's is encoded in its own. The external displacement gradient acts on each body's outer displacement structure in the same way. The framework therefore predicts zero Nordtvedt effect by construction.

### 7.2 Lunar geodetic precession

The second LLR consistency check is the geodetic precession of the lunar orbit as the Earth-Moon system moves around the Sun. This is treated as another instance of the same three-contribution weak-field structure already used for Mercury and GPB geodetic precession. Using the Earth's solar orbital velocity, the resulting continuous precession rate is

\[
\Omega_{\text{geodetic}}^{\text{lunar}}\approx 19.2\ \text{mas/yr}.
\]

### 7.3 Null time variation of \(G\)

LLR also constrains any secular variation of the gravitational constant. The framework's prediction is null: \(G\) is treated as a fixed bridge between displacement geometry and gravitational effect, set by the displacement scale and the vacuum propagation structure. In the absence of cosmological evolution of the medium itself, there is no mechanism in the present framework for a secular drift in \(G\).

### 7.4 CMB-aligned well-depth asymmetry

The framework also predicts a small directional asymmetry in the effective gravitational well depth experienced by orbiting bodies. Because the solar system moves through the transport structure at approximately \(370\) km/s, the retarded displacement field of the Sun is not perfectly symmetric: an orbiting body on the leading edge of its orbit (moving into the CMB velocity) sees a slightly shallower effective well and drifts outward, while on the trailing edge it sees a slightly deeper well and is pulled inward. This would produce a CMB-aligned modulation of orbital eccentricity, distinct from the solar tidal modulation aligned with Earth's perihelion direction. The two directions differ by approximately \(67°\) in ecliptic longitude and are in principle resolvable. Whether this residual is detectable in the existing lunar laser ranging dataset after subtraction of the well-modeled solar tidal contribution is an open observational question.

### 7.5 Role

Lunar laser ranging is presented here as a consistency check, not as a centerpiece derivation. It shows that the framework preserves the universality of free fall for self-gravitating bodies, extends the three-contribution weak-field structure into the Earth-Moon-Sun setting, and remains compatible with the observational null result for secular variation of \(G\).

## 8. Gravitational Radiation from the Displacement Field

The two-layer structure developed in the dynamics paper [4] implies that accelerating sources produce outgoing displacement disturbances — the framework's gravitational waves. This section develops the tensor structure of those disturbances and identifies the open questions that connect the displacement radiation to the observed inspiral rate of compact binaries.

### 8.1 Tensor structure of the displacement deformation

The cumulative displacement \(\Sigma\) is a scalar, but the deformation it describes is not. At each point, the displaced transport structure is compressed radially by \(1/D\) and stretched tangentially by \(D\). In the weak field, the deformation relative to the identity may be written as a rank-2 tensor:

\[
h_{ij}\equiv \mathcal{D}_{ij}-\delta_{ij}\approx \Sigma(r)\bigl(\delta_{ij}-2\hat{r}_i\hat{r}_j\bigr),
\]

where \(\hat{r}\) is the radial unit vector from the source. For a single static source, this tensor is diagonal in the radial basis. For two orbiting sources, the radial directions differ at each field point, and the superposition of the two deformation fields produces a time-varying tensorial pattern with off-diagonal (shear) components that oscillate at twice the orbital frequency.

### 8.2 Linearized perturbation equation

For a time-varying source, write \(\Sigma=\Sigma_{\mathrm{bg}}+\delta\Sigma\) where \(\Sigma_{\mathrm{bg}}\) is the quasi-static background from the total mass (the monopole) and \(\delta\Sigma\) is the time-varying perturbation from orbital motion. The background satisfies the Poisson equation,

\[
\nabla^2\Sigma_{\mathrm{bg}}=-\frac{4\pi G}{c^2}\,\rho_{\mathrm{bg}},
\]

giving \(\Sigma_{\mathrm{bg}}=GM_{\mathrm{total}}/(c^2r)\). The perturbation satisfies

\[
\frac{1}{c^2}\,\partial_t^2\delta\Sigma-\nabla^2\delta\Sigma=\frac{4\pi G}{c^2}\,\delta\rho.
\]

In the radiation zone, far from the source, \(\delta\rho=0\) and the perturbation satisfies the homogeneous wave equation at speed \(c\). The outgoing solution is a free wave propagating through the same LC medium that carries electromagnetic signals.

### 8.3 Quadrupole radiation and the scalar power

The retarded solution for \(\delta\Sigma\) admits a multipole expansion. The monopole (total mass) is constant; the dipole (center-of-mass position) is constant for a bound system. The leading radiative term is the quadrupole:

\[
\delta\Sigma(\mathbf{x},t)\approx \frac{G}{2c^4r}\,n_in_j\,\ddot{Q}_{ij}(t_{\mathrm{ret}}),
\]

where \(Q_{ij}=\int\rho\,x_i'x_j'\,d^3x'\) is the mass quadrupole moment and \(t_{\mathrm{ret}}=t-r/c\). For a circular binary, the trace \(Q_{kk}\) is constant and does not radiate; the radiating part is the traceless quadrupole, oscillating at twice the orbital frequency. For eccentric orbits, the trace oscillates with the varying separation and provides an additional breathing-mode radiation channel absent in general relativity.

The energy density of the \(\Sigma\) wave field is

\[
u=\frac{c^4}{8\pi G}\!\left[\frac{1}{c^2}\!\left(\frac{\partial\delta\Sigma}{\partial t}\right)^{\!2}+|\nabla\delta\Sigma|^2\right],
\]

and for an outgoing wave the power flux is \(F=c^3/(4\pi G)\,(\partial_t\delta\Sigma)^2\). Using the quadrupole expression for \(\partial_t\delta\Sigma=G\,n_in_j\dddot{Q}_{ij}/(2c^4r)\) and integrating over the sphere, the total radiated power from the scalar field \(\Sigma\) alone is

\[
P_{\Sigma}=\frac{G}{30\,c^5}\bigl\langle\dddot{Q}_{ij}\dddot{Q}_{ij}\bigr\rangle.
\]

The corresponding general-relativity result for the transverse-traceless tensor waves is

\[
P_{\mathrm{GR}}=\frac{G}{5\,c^5}\bigl\langle\dddot{Q}_{ij}^{\mathrm{TT}}\dddot{Q}_{ij}^{\mathrm{TT}}\bigr\rangle.
\]

The ratio for the traceless quadrupole (circular orbits) is

\[
\frac{P_{\Sigma}}{P_{\mathrm{GR}}}=\frac{1/30}{1/5}=\frac{1}{6}.
\]

The scalar displacement wave carries exactly one sixth of the general-relativity power.

### 8.4 The factor of six and the deformation tensor

The ratio \(1/6\) has a direct geometric interpretation. The displacement is not merely a scalar compression. It is an anisotropic deformation of the transport structure: radial compression by \(1/D\), tangential stretch by \(D\) in two independent directions. The full deformation relative to the identity is described by a symmetric rank-2 tensor \(h_{ij}=\mathcal{D}_{ij}-\delta_{ij}\), which has six independent components.

For a static source, all six components are determined by the single scalar \(\Sigma\). For a time-varying source, the oscillation of the quadrupole drives all six components simultaneously. Each component satisfies the same wave equation as \(\Sigma\) and carries the same energy per unit amplitude, because the vacuum impedance \(Z_0\) is isotropic — the medium responds identically in all directions.

The total radiated power is therefore six times the scalar power:

\[
P_{\mathrm{total}}=6\,P_{\Sigma}=\frac{6G}{30\,c^5}\bigl\langle\dddot{Q}_{ij}\dddot{Q}_{ij}\bigr\rangle=\frac{G}{5\,c^5}\bigl\langle\dddot{Q}_{ij}\dddot{Q}_{ij}\bigr\rangle=P_{\mathrm{GR}}.
\]

The displacement framework reproduces the general-relativity quadrupole power exactly. The match is not a coincidence or a fit: it follows from the scalar wave equation (which gives \(1/30\)), the isotropy of the vacuum impedance (which gives equal power per component), and the six independent components of the symmetric deformation tensor (which gives the factor of \(6\)).

### 8.4a Hulse-Taylor binary inspiral

The Hulse-Taylor binary pulsar (PSR B1913+16) provides the most precise test of gravitational radiation. The system consists of two neutron stars in a \(7.75\)-hour orbit with eccentricity \(e=0.617\). The observed orbital period decay rate is \(\dot{P}_{\text{obs}}=-2.4056\times10^{-12}\) s/s, matching the general-relativistic prediction to within \(0.07\%\).

For a binary with masses \(m_1\) and \(m_2\), semi-major axis \(a\), and eccentricity \(e\), the quadrupole power formula gives the orbital period decay rate

\[
\dot{P}=-\frac{192\pi}{5}\,\frac{G^{5/3}}{C^5}\left(\frac{P}{2\pi}\right)^{-5/3}\frac{m_1\,m_2}{(m_1+m_2)^{1/3}}\,f(e),
\]

where \(f(e)=(1-e^2)^{-7/2}(1+\frac{73}{24}e^2+\frac{37}{96}e^4)\) is the eccentricity enhancement function. For the Hulse-Taylor parameters, this gives \(\dot{P}=-2.404\times10^{-12}\) s/s, in agreement with the observed value.

The framework reproduces this result because the total radiated power matches the GR quadrupole formula exactly (Section 8.4). The two effects that contribute to the binary's evolution — the kinematic steering remainder \(W\) (which precesses the orbit without extracting energy) and the displacement radiation (which carries energy away and shrinks the orbit) — are cleanly separable. The steering remainder is conservative and contributes to the measured periastron advance. The radiation is dissipative and drives the inspiral. The characteristic orbital speed \(\beta\sim10^{-3}\) places this system in the regime where the steering remainder is roughly \(10^{6}\) times larger per orbit than the radiative energy loss, confirming that the two effects are orthogonal.

The breathing-mode correction from the eccentricity (Section 8.6) could in principle modify \(f(e)\) at a level that is testable against the observed inspiral rate, though this calculation has not yet been completed.

### 8.5 Metric perturbation and wave polarization

The perturbation \(\delta\Sigma\) produces corresponding oscillations in the effective coordinate metric:

\[
\delta g_{tt}=2c^2\,\delta\Sigma,\qquad \delta g_{rr}=2\,\delta\Sigma,\qquad \delta g_{\theta\theta}=\delta g_{\phi\phi}=0.
\]

Both the time and radial components oscillate with \(\delta\Sigma\), while the angular metric remains unperturbed (\(h=1\) exactly). This is a scalar/longitudinal wave mode — a compression wave in the transport structure — rather than a transverse-traceless tensor mode. The displacement framework therefore predicts that gravitational waves are longitudinal compression waves in the transport structure, consistent with the physical picture developed in the dynamics paper.

The polarization structure in principle differs from general relativity, which predicts two transverse tensor polarizations (\(+\) and \(\times\)). Current multi-detector networks have limited sensitivity to polarization mode discrimination, so this remains a future observational test. The total power, however, is the same regardless of polarization structure, because it depends only on the quadrupole amplitude and the number of radiating degrees of freedom.

### 8.6 Breathing mode and eccentric orbits

For eccentric orbits, the trace \(Q_{kk}\) oscillates with the varying orbital separation. This produces an additional scalar radiation channel — a breathing mode — that is absent in general relativity's traceless-transverse tensor waves. The eccentricity enhancement function \(f(e)\) would therefore differ from the GR expression, with the breathing mode contributing additional power at the radial oscillation frequency.

The magnitude of this correction depends on the eccentricity. For nearly circular orbits (\(e\to 0\)), the trace is constant and the correction vanishes. For the Hulse-Taylor binary (\(e=0.617\)), the trace oscillation is significant and the breathing-mode contribution could modify \(f(e)\) at a level that is in principle testable against the observed inspiral rate. This represents the most concrete near-term observational distinction between the displacement framework and general relativity in the gravitational wave sector.

## 9. Gravity Probe B: Geodetic and Frame-Drag Components

Gravity Probe B provides two distinct weak-field tests relevant to this framework. The two effects act on different objects. The geodetic effect is an orbital phenomenon: the displacement geometry modifies the satellite's in-plane orbital rate, and the gyroscope serves as the inertial witness that reveals that orbital drift. The frame-drag effect acts on the gyroscope itself: the Earth's rotation produces an azimuthal twist in the transport structure, and the gyroscope's spin axis is carried by that twist in a force-free manner. No torque is applied to the gyroscope — the transport it is embedded in is itself twisted by the rotating source, so the gyroscope's orientation in the coordinate description changes even though it remains locally inertial within the twisted transport.

### 9.1 Geodetic effect: in-plane orbital rate modification

The geodetic measurement is an in-plane effect. The satellite orbits the Earth in the displacement geometry established by the Earth's mass. That geometry is the same effective coordinate-level line element developed in the dynamics paper [4]:

\[
ds^2=-\frac{c^2}{(1+\Sigma)^2}\,dt^2+D^2\,dr^2+r^2\,d\Omega^2.
\]

The orbit equation on this geometry does not close at the Keplerian rate. Each revolution, the satellite returns to its starting angular position with a small in-plane angular deficit — the same mechanism that produces Mercury's perihelion advance, applied to the GPB orbit. Over many orbits, this deficit accumulates as a secular drift of the satellite's orbital reference relative to the inertial guide-star direction.

The gyroscope, being inertially fixed, continues to point at the guide star. The satellite's orbital frame drifts relative to that fixed direction. The measured geodetic signal is this growing angle between the inertial gyroscope and the satellite's precessing orbital reference.

For GPB, the accumulated in-plane orbital drift gives

\[
\delta_{\text{geodetic}}=6.59\ \text{arcsec/yr},
\]

close to the observed geodetic value. This result follows from the same effective coordinate geometry that produces the Mercury precession (Section 5), applied to the GPB orbital parameters. The total coefficient \(\alpha=3\) comes from the effective geometry as a single integrated result: the displacement modifies the time and radial components while leaving the angular sector Euclidean, and the orbit equation on that geometry does not close at the Keplerian rate.

The interpretive decomposition is the same as for Mercury: \(\alpha_1=1\) (retardation mismatch), \(\alpha_2=1/2\) (external-field kinematic steering at the standard Thomas coefficient), and \(\alpha_3=3/2\) (displacement geometry). The kinematic steering contribution is the orbital manifestation of the external-field remainder \(W_{\mathrm{ext}}\) derived in the companion noncollinear paper [3], which gives \((\gamma-1)\cdot 2\pi \approx \frac{1}{2}\beta^2\cdot 2\pi\) per orbit — matching the standard Thomas precession. The displacement geometry carries the largest share of the geodetic total through the modification of the effective metric components.

### 9.2 Frame dragging: azimuthal twist of the transport structure

The frame-drag measurement is an out-of-plane effect. The Earth's rotation produces an azimuthal twist in the transport structure — the vector displacement field developed in the dynamics paper [4]. This twist is not a force acting on the satellite or the gyroscope. It is a geometric property of the transport: the connection paths near a rotating source have a built-in azimuthal bias with definite handedness. The satellite's orbit is embedded in that twisted transport, and the gyroscope's spin axis inherits the twist passively.

The scalar cumulative-displacement sector is not sufficient to describe this effect; the rotating-source problem requires the vector response. The relevant field is the spin-odd azimuthal component

\[
V_{\phi,\mathrm{odd}}(\rho,\theta)\propto \omega\,\frac{\cos\theta}{\rho^2}.
\]

This field gives the azimuthal twist rate of the transport at radius \(\rho\) and latitude \(\theta\). The gyroscope's spin axis, embedded in this twisted transport, precesses at a rate set by the polar-orbit average of the twist field.

The extraction route proceeds by determining the equatorial fixed-probe value at the GPB radius, extending it over latitude using the established \(\cos\theta\) dependence, performing the polar-orbit average analytically, and then applying the Earth moment-of-inertia correction.

On that route, the thin-shell estimate is about \(82.5\) mas/yr. Applying

\[
\frac{I_\oplus/(MR^2)}{2/3}=\frac{0.3307}{2/3}\approx 0.496,
\]

yields a corrected prediction of about \(40.9\) mas/yr, close to the measured \(39.2\) mas/yr.

The gyroscope's spin axis is carried by this twisted transport in a force-free manner. The measured frame-drag signal is the coordinate-description drift of the gyroscope's orientation as the transport twist rotates it relative to the distant guide star.

### 9.3 Measurement geometry

The two effects are orthogonal in the measurement. The geodetic drift is in the orbital plane (the direction the satellite moves as it passes the guide star) and reflects the orbital rate modification. The frame-drag drift is perpendicular to the orbital plane and reflects the force-free rotation of the gyroscope by the twisted transport. For GPB's polar orbit, the geodetic signal appears in the north-south direction and the frame-drag signal in the east-west direction.

The geodetic branch follows directly from the effective coordinate geometry and may be treated as mature. The frame-drag branch depends on the rotating-source vector sector and should be presented as the current route rather than a final fully closed field-law derivation.

## References

[1] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[2] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[3] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. https://doi.org/10.5281/zenodo.19155341

[4] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[5] C. W. F. Everitt et al., "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity," *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[6] J. G. Williams, S. G. Turyshev, and D. H. Boggs, "Lunar Laser Ranging Tests of the Equivalence Principle with the Earth and Moon," *International Journal of Modern Physics D* **18**(7), 1129–1175 (2009). https://doi.org/10.1142/S021827180901500X

[7] C. M. Will, "The Confrontation between General Relativity and Experiment," *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4
