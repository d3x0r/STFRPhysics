# Directional photon-clock periods in the static displacement map

Working derivation — 7 October 2026

## 1. The experiment and its transport convention

Place a splitter and two stationary, immediately reflecting endpoints in a static single-source field. Start with equal reference arm lengths L, then map their endpoints through

\[
\mathbf F(\mathbf x)=\sqrt{1+d^2/|\mathbf x|^2}\,\mathbf x.
\]

Use one time variable t for launch and return. Endpoint clock readings can be assigned arbitrarily; they do not determine these event intervals. Mirrors have no dwell time. The apparatus is held stationary during each measurement; free fall and material relaxation are different calculations.

The calculation below stipulates that rays propagate along straight segments in the mapped coordinates F(x), at speed c per t. This makes the proposed shorter radial path operational. Calling c a coordinate speed without naming these coordinates would not be sufficient: constant speed along straight segments in the original x coordinates would instead give equal travel times for equal original-coordinate spans. The spatial map alone does not select between those propagation assignments.

This is a directional apparatus calculation, not a derivation of a universal material clock rate. Equal reference lengths are not equal mapped lengths.

## 2. Local result for every orientation

Let D=sqrt(1+d²/r²). In a local radial/tangential basis,

\[
E=\operatorname{diag}(D^{-1},D,D).
\]

For a reference arm of length L at angle alpha to the radial direction, its mapped length, to leading order in arm size, is

\[
L'(\alpha)=L\sqrt{\frac{\cos^2\alpha}{D^2}+D^2\sin^2\alpha}.
\]

Consequently,

\[
\boxed{T(\alpha)=\frac{2L}{c}
\sqrt{\frac{\cos^2\alpha}{D^2}+D^2\sin^2\alpha}}.
\]

In particular,

\[
T_r=\frac{2L}{Dc},\qquad T_t=\frac{2DL}{c},\qquad
\boxed{\frac{T_r}{T_t}=\frac1{D^2}=\frac{r^2}{r^2+d^2}}.
\]

Relative to T0=2L/c, the radial period is shorter, and the tangential period longer. The corresponding photon-clock cycle frequencies have ratio nu_r/nu_t=D². At r=d, Tr/T0=0.707107 and Tt/T0=1.414214. At r=0.1d, these factors are 0.0995037 and 10.049876, with Tr/Tt=1/101. Strong compression therefore makes the directional contrast greater, rather than causing a two-way cancellation.

An arm has the undeformed period when sin²(alpha)=1/(D²+1). Thus radial contraction and tangential elongation also produce intermediate orientations with unchanged period. The angle is defined in the reference basis; mapped angles differ.

The local expansion requires a sufficiently short arm relative to field variation and curvature scales. Keeping a finite L while taking r to zero violates that assumption; use the finite formulas below instead.

## 3. Finite radial and initially tangent linear arms

Take reference endpoints

\[
A=(r,0),\quad B_r=(r+L,0),\quad B_t=(r,L),\qquad r>0.
\]

The two arms are initially orthogonal and have equal reference length L. Write f(r)=sqrt(r²+d²), q=sqrt(r²+L²), and Dq=sqrt(1+d²/q²). For straight rays between mapped endpoints, the exact one-way lengths are

\[
s_r=f(r+L)-f(r)
=\frac{2rL+L^2}{f(r+L)+f(r)},
\]

\[
s_t=\sqrt{[rD_q-f(r)]^2+(LD_q)^2}.
\]

The stable form of the first component in st is r times the difference between Dq and D(r). In weak fields evaluate these differences using rationalized expressions, rather than subtracting nearly equal large coordinates.

\[
\boxed{T_r=2s_r/c,\qquad T_t=2s_t/c.}
\]

Both approach the local formulas as L/r tends to zero. Their outward and return legs have equal duration in this static reciprocal propagation construction. A faster clock at the upper mirror does not lengthen either leg: immediate reflection uses no mirror clock.

The straight mapped tangent segment can pass through the excluded central sphere |F|<d for sufficiently deep locations or large arms. Before using st as a physical route, check its closest approach to the origin. If it intersects the excluded region, a boundary/deflection rule is required; this chord is then only a geometric length, not an allowed ray.

A mapped material arm need not lie along that straight segment. If the ray is guided along the image of the original tangent line x(u)=(r,u), its one-way length is instead

\[
s_{t,\rm guided}=\int_0^L
\sqrt{1+\frac{d^2}{r^2+u^2}
-\frac{d^2u^2}{(r^2+u^2)^2}
\left(1+\frac{r^2+u^2}{r^2+u^2+d^2}\right)}\,du.
\]

Equivalently, use sqrt[cos²(alpha(u))/D(u)² + D(u)² sin²(alpha(u))], with cos(alpha(u))=u/sqrt(r²+u²). The guided route remains in the mapped exterior. Guided and free straight rays agree at local leading order but are different finite-arm experiments.

## 4. A clean same-shell comparison

For two endpoints at the same reference radius r and angular separation theta, their reference chord length is L=2r sin(theta/2). Both endpoints have the same D, so their mapped chord length is exactly DL. The free-ray round-trip time is therefore exactly 2DL/c whenever the chord is permitted.

The condition for that chord to remain outside the limiting sphere is

\[
\sqrt{r^2+d^2}\cos(\theta/2)\ge d.
\]

Alternatively, a guided shell arc of reference length r theta has mapped length f(r) theta. That arc stays outside the limiting sphere, but is not a linear photon-clock arm. In both cases the equal-radius endpoints avoid an endpoint-depth difference without eliminating the directional length effect.

## 5. Allowing a spatially varying transport-time factor

If instead local transport time satisfies d tau=N(x)dt and light covers mapped length ds' at c per local transport time, the reference-time round trip on a reciprocal stationary route is

\[
T[\mathcal P]=\frac2c\int_{\mathcal P}\frac{ds'}{N(\mathbf x)}.
\]

For an outward radial route,

\[
T_r=\frac2c\int_r^{r+L}\frac{ds}{D(s)N(s)}.
\]

A stationary emitter with a separate scalar clock rate Ne records Ne T. Endpoint synchronization offsets still do not enter. Locally a common scalar N cancels from the radial/tangential ratio, leaving 1/D². Finite arms sample different N profiles, so their full integrals must be evaluated. Free-ray paths may also change under this transport law; they cannot automatically be kept as straight mapped chords.

Do not define N using the very directional photon-clock period being calculated and then multiply by it again. An imposed propagation-time law and a derived oscillator period are different stages of the calculation.

## 6. Result and scope

Under constant-c propagation in the mapped geometry, equally sized reference arms have unequal round-trip periods. The directional ratio follows directly from the anisotropic map and survives arbitrary endpoint synchronization. This establishes the proposed geometric mechanism for radial photon-clock contraction in that construction.

It does not establish that every physical clock contracts at the same rate, that a rigid device rotates without changing its material state, or that the framework's coordinate-c propagation is already defined in these particular coordinates. Those questions require the material and optical route prescription. For a freely propagating linear clock, the immediate next check is whether its actual endpoint/ray construction agrees with the mapped-chord law used here.

Related derivation: [Static Displacement: Weak and Strong Fields](static-displacement-weak-and-strong-fields.md), §§2, 6 and 8. Source geometry: README §15 and §16.1.

## 7. Velocity-clock control and common transport/storage response

12 October 2026. This extends the preceding constant-speed construction; it does not replace its stated assumptions. The question is whether arm deformation and propagation, evaluated together, supply a clock period compatible with the calibrated escape expression. The reference second below is one external time parameter t. A local period factor is C=T/T0, and the corresponding cycle-rate factor is N=1/C. Neither is assigned to every material oscillator by this calculation.

### 7.1 Verify the velocity case without putting gamma into the travel time

Take a clock with rest arm length L0, moving at laboratory velocity v along x. Its rest orientation is n. Supply the usual longitudinal arm contraction as the control hypothesis:

\[
\mathbf l=L_0(n_x/\gamma,n_y,n_z),\qquad
\gamma=(1-v^2/c^2)^{-1/2}.
\]

The photon must intercept the translating mirror and then the translating emitter. With a=c²-v² and b=l·v, these two travel times are

\[
t_+=\frac{b+\sqrt{b^2+a|\mathbf l|^2}}a,\qquad
t_-=\frac{-b+\sqrt{b^2+a|\mathbf l|^2}}a.
\]

They follow from |l+vt+|=ct+ and |-l+vt-|=ct-. Their sum gives

\[
\boxed{T/T_0=\gamma,\qquad T_0=2L_0/c,}
\]

for every orientation, including inline and transverse. Omitting contraction gives gamma² for the inline clock. Thus this control validates the interception calculation given the contraction; it does not derive the material contraction mechanism. Endpoint synchronization is not needed for the single-emitter round trip.

### 7.2 State the gravitational arm and propagation in the same chart

In a locally uniform static patch let the actual arm be l=M L0 n in mapped coordinates y. M describes the stipulated endpoint response; it equals E only if the actual arm follows the forward deformation. An arm that instead preserves its mapped equilibrium length has a different M. This distinction follows the [constituent/ruler audit](constituent-bridge-audit.md), rather than introducing a new binding law.

Represent reciprocal, nondispersive local ray travel time by a positive symmetric dimensionless matrix Q:

\[
c^2dt^2=d\mathbf y^{\mathsf T}Q\,d\mathbf y.
\]

Q is an optical travel-cost matrix, not an extra definition of primitive F or H and not automatically the mass or inertia tensor. In a uniform patch, a stationary straight-arm clock has

\[
\frac{T(\mathbf n)}{T_0}
=\sqrt{\mathbf n^{\mathsf T}M^{\mathsf T}QM\mathbf n}.
\]

All orientations have the same period C if and only if

\[
\boxed{M^{\mathsf T}QM=C^2I.}
\]

For the co-deformed-arm hypothesis M=E=diag(D^-1,D,D), this requires

\[
\boxed{Q=C^2E^{-\mathsf T}E^{-1}
=C^2\operatorname{diag}(D^2,D^{-2},D^{-2}).}
\]

The principal-axis ray speeds in these external coordinates must then be

\[
\boxed{c_r=\frac{c}{CD},\qquad c_t=\frac{cD}{C}.}
\]

Arm lengths Lr=L0/D and Lt=L0 D give exactly Tr=Tt=C T0. Values of a mapped-coordinate speed above c do not assert locally measured superluminal propagation; the comparison must include the ruler and clock conversion.

A common scalar speed change alone cannot achieve this with M=E: it leaves Tr/Tt=D^-2. Conversely, if M=I, common periods require Q=C²I. The tensor requirement depends on the actual endpoint response. We have derived a compatibility condition, not selected which material response occurs.

### 7.3 The existing storage tensor already supplies the geometric compensation

README §15 supplies the impedance-matched transformation tensor in its stated push-forward convention:

\[
\varepsilon_r=\mu_r=S=\frac{EE^{\mathsf T}}{\det E}
=\operatorname{diag}(D^{-3},D,D).
\]

In the corresponding local linear Maxwell model, the principal-axis speed is c/sqrt(epsilon_j mu_k), with i,j,k distinct. This gives cr=c/D and ct=cD for both polarizations. Its ray-cost matrix is Q=E^-T E^-1. Thus co-mapping the arm and propagation yields

\[
\boxed{T_r/T_0=T_t/T_0=1.}
\]

This is the common-map control: the directional deformation compensates, but no nontrivial common clock delay is generated. It does not say the whole framework is a coordinate transformation; this particular tensor/arm pair is mathematically the transformation of the same original propagation experiment. The earlier sections' Q=I experiment is a different transport assignment and retains its anisotropy.

The [optical storage note](../exploring_optical_dynamics.md) also discusses multiplying both storage channels by a common scalar while preserving their impedance ratio. In this tensor setting, the conditional assignment

\[
\varepsilon_r=\mu_r=C S
\]

slows every ray by C relative to the common-map control and supplies precisely Q=C²E^-T E^-1. The local co-deformed photon clock then has period C. This is one explicit way in which transport and storage can change together. The storage-to-displacement relation must supply C; fitting C to a desired period is not its derivation. No extra multiplication by the same clock factor should be applied afterward.

### 7.4 Compare with the calibrated escape target

The existing body-clock escape integral supplies

\[
U_{\rm esc}^2=2c^2\delta/\ell_0,\qquad
C_{\rm target}=\gamma_{\rm esc}=\sqrt{1+2\delta/\ell_0}.
\]

Using Ctarget in §7.3 would produce that photon-clock period in every local orientation. This deliberately tests what storage response would be required; it does not establish the identification of a stationary material-clock period with escape gamma.

The weak expansions are

\[
D-1\simeq\frac{GM\ell_0}{c^2r^2},\qquad
C_{\rm target}-1\simeq\frac{GM}{c^2r}.
\]

Holding the existing Earth normalization fixed, the numerical comparison is:

| Location | Local stretch excess D-1 | Target period excess Ctarget-1 |
|---|---:|---:|
| Earth surface | 6.94846e-10 | 6.94846e-10 |
| Twice Earth radius | 1.73712e-10 | 3.47423e-10 |
| Moon surface | 1.14969e-10 | 3.13526e-11 |
| Sun surface | 1.94084e-8 | 2.11935e-6 |

These are model calculations using G=6.67366578e-11, c=3e8, ell0=6371000 m and the mass/radius inputs recorded in the results. They are not independent clock measurements or precision celestial models. At Earth surface the two quantities nearly coincide by calibration; the other locations distinguish them.

There is also an exact obstruction to a universal clock factor depending only on the local deformation D. At r=d all source strengths give D=sqrt(2), but

\[
\delta=d(\sqrt2-1),\qquad
C_{\rm target}=\sqrt{1+2d(\sqrt2-1)/\ell_0}
\]

varies with d at fixed ell0. Thus no universal C(D) can reproduce this escape target across sources. A rule may use accumulated depth, spatial derivatives, constituent structure or other transport state; the local deformation matrix alone does not distinguish these cases.

If the target is adopted, its radial derivative obeys

\[
\boxed{A_b=-\frac{c^2}{2}\frac{d C_{\rm target}^2}{d\ell}.}
\]

This follows from the already selected escape/response pair. It is a compatibility identity, not acceleration newly derived from the optical tensor. The metric-geodesic mismatch documented in [checkpoint 2](metric-response-checkpoint.md) is unchanged.

### 7.5 Finite arms and the result of this test

The equal-orientation condition above is local. For a nonuniform field and a specified reference path P mapped by F, the same Q gives

\[
T[P]=\frac2c\int_{F(P)}\sqrt{d\mathbf y^{\mathsf T}Q\,d\mathbf y}
=\frac2c\int_P C(\mathbf x)\,|d\mathbf x|.
\]

The spatial factors compensate point by point, but different finite paths can sample different C profiles. A guided path must be distinguished from a freely refracted ray; a straight mapped chord cannot be retained without checking its ray equation. Reflection delays and material phase/storage costs have not been included.

The control and gravitational tests therefore resolve a specific question. Changing both path geometry and transport can remove the local radial/tangential clock discrepancy. The already-written transformation tensor demonstrates that compensation without adding a fit parameter. It leaves the common period unchanged. A common storage factor can then provide a shared clock delay, but its dependence on depth must come from the F-H response rather than be inferred solely from matching escape speed. This supplies a precise transport/storage target for the next constituent-cycle calculation.

Validation: [verify_photon_clock_transport.cjs](verify_photon_clock_transport.cjs) checks ray interception over 31 orientations and speeds through 0.99c, the uncontracted inline failure, Maxwell principal-axis speeds, co-mapped and scalar-loaded clocks through D=100, and the equal-D/different-depth counterexample. [Numerical results](photon-clock-transport-results.json) preserve the inputs and surface comparisons. Run with `node AI/Revised/WIP/proper_velocity_gravity/verify_photon_clock_transport.cjs` from the repository root.

## 8. Squared cycle time, F-H product, and accumulation

12 October 2026, continued. The constants-recovery paper §1.1 identifies the storage product with the squared-time layer and its square root with the cycle-time layer. Here use Tcycle for a period and D for the tangential stretch to avoid the earlier symbol T serving both purposes. This section evaluates the product connection without asserting that a dimensional identity determines a constitutive law.

### 8.1 Evaluate the two coupled storage channels

For a lumped linear reciprocal cycle, let Feff be an effective capacitance and Heff an effective inductance, including the chosen mode geometry. The two evolution equations are

\[
F_{\rm eff}\dot V=-I,\qquad H_{\rm eff}\dot I=V.
\]

For constant coefficients they give

\[
\ddot V+\frac{V}{F_{\rm eff}H_{\rm eff}}=0,
\qquad T_{\rm cycle}=2\pi\sqrt{F_{\rm eff}H_{\rm eff}}.
\]

Relative to the same baseline mode, define

\[
f=F_{\rm eff}/F_0,\quad h=H_{\rm eff}/H_0,
\quad P=fh,\quad C=T_{\rm cycle}/T_0=\sqrt P.
\]

Thus C² belongs to the normalized product, not to an additional period multiplier. The normalization removes the common 2pi. A different waveform/mode closure needs its own mode factor; this test does not derive every matter excitation as a lumped linear LC oscillator.

Storage densities epsilon and mu have units F/m and H/m, whereas Feff and Heff here are integrated modal quantities. Path/geometry factors must either be included in their definitions or treated separately, never both. In §7 the common geometric mapping has already been factored out, and P denotes only the residual common product factor. Tensor eigenvalues are not themselves universal integrated capacitances or inductances.

Direct integration of the coupled equations verifies C=2 for all three normalized pairs (f,h)=(2,2), (4,1), and (1/4,16). Their products are all 4, but their impedance ratios differ. A period measurement fixes the product; preserving the storage ratio additionally selects f=h=sqrt(P).

### 8.2 The radial accumulation needed by the escape target

Let the local volume excess be e=D-1 and keep the compressed radial ruler d ell=dr/D. To reproduce the existing escape target, the required inward product accumulation is

\[
\boxed{\frac{dP}{d\ell}=-\frac{2}{\ell_0}e,
\qquad P(\infty)=1.}
\]

Since the exact geometric integral is integral e d ell=delta, this gives

\[
\boxed{P(r)=1+\frac{2\delta(r)}{\ell_0},\quad
C=\sqrt P,\quad U_{\rm esc}=c\sqrt{P-1}.}
\]

The selected response is equivalently

\[
\boxed{A_b=-\frac{c^2}{2}\frac{dP}{d\ell}
=\frac{c^2}{\ell_0}(D-1).}
\]

This states exactly what accumulation law would connect the local deformation to the product. It is not independently derived by the LC oscillator equations: those determine the cycle for given storage, not how a background changes that storage. The integral to infinity is a field-state/boundary prescription, not a claim that each tick travels to infinity.

The far-field powers then follow in one calculation: e is proportional to r^-2; its accumulated product excess P-1 is proportional to r^-1; the square root of that excess gives Uesc proportional to r^-1/2; and the spatial derivative of P gives acceleration proportional to r^-2. Clock period excess C-1 is also proportional to r^-1 at leading order. Merely taking a square root of the local e would instead yield r^-1, not the required escape-speed power.

### 8.3 Accumulating the product is different from accumulating each channel

If each storage channel instead acquires the same additive depth increment, f=h=1+Sigma with Sigma=delta/ell0, then

\[
P_{\rm channels}=(1+\Sigma)^2,
\qquad C_{\rm channels}=1+\Sigma.
\]

Product accumulation in §8.2 gives

\[
P_{\rm product}=1+2\Sigma,
\qquad f=h=C_{\rm product}=\sqrt{1+2\Sigma}.
\]

Their product difference is Sigma². The first gives equal additive channel increments; the second has per-channel increment sqrt(1+2Sigma)-1. Written differentially, the equal-channel product-target rule is

\[
\frac{df}{d\ell}=\frac{dh}{d\ell}
=-\frac{D-1}{\ell_0\sqrt{1+2\Sigma}}.
\]

The inverse-loading factor is therefore required if both equal channels are to implement the linear product accumulation. It is a concrete target for the storage response, not a feedback mechanism derived here. Product accumulation and channel accumulation agree in the weak field and differ beyond first order. The latter resembles the historical C=1+Sigma closure, but using the revised finite delta does not restore that historical paper's different coordinate-depth integral.

For d=ell0 and c=1, the comparison is:

| r/d | Sigma | Product-accumulated period | Channel-accumulated period |
|---|---:|---:|---:|
| 10 | 0.049876 | 1.048690 | 1.049876 |
| 1 | 0.414214 | 1.352193 | 1.414214 |
| 0.1 | 0.904988 | 1.676298 | 1.904988 |

The bound depends on d/ell0. As r approaches zero in this formal continuation, the two periods tend respectively to sqrt(1+2d/ell0) and 1+d/ell0. Neither expression establishes survival of the oscillator there.

### 8.4 A clock-energy gradient still needs a consistent inertia convention

An additional diagnostic uses a slowly varying harmonic oscillator at fixed adiabatic action. With its frequency measured against the same external time t, Eref=E0/C. This is a conditional energy interpretation, not a proved excitation law. Let E0=m0 c², and write a trial slow-motion action in the chosen ruler ell as

\[
L_t=\tfrac12 M_t(\ell)\dot\ell^2-E_{\rm ref}(\ell).
\]

At instantaneous rest, its signed acceleration is -Eref'/Mt. The inward force magnitude per baseline mass is

\[
\frac{|E_{\rm ref}'|}{m_0}
=\frac{A_b}{P^{3/2}}.
\]

That quantity is not yet the body's proper-velocity response. If the candidate clock relation is d tau=dt/C, then at instantaneous rest

\[
\left|\frac{d^2\ell}{d\tau^2}\right|
=C^2\left|\frac{d^2\ell}{dt^2}\right|,
\qquad
\boxed{\frac{A_{\rm trial,b}}{A_b}=\frac{m_0}{M_t C}.}
\]

Thus preserving the selected acceleration at rest would require the reference-time kinetic coefficient Mt=m0/C in this particular fixed-action energy construction. Keeping Mt=m0 instead gives a ratio 1/C. Choosing Mt=m0 C gives 1/P, consistent with the at-rest metric comparison in checkpoint 2 under its own ruler/time identifications. These are diagnostic kinetic coefficients, not three measured rest-mass laws. The optical calculation alone selects none of them, and it does not justify a particular timelike action.

At d=ell0=r=c=1 the selected inward acceleration is 0.414214. The constant-Mt diagnostic gives about 0.306327, Mt=m0 C gives 0.226541, and Mt=m0/C gives 0.414214. Matching the last at rest is not an all-velocity derivation: spatially changing inertia and the moving clock law contribute additional terms away from rest. This also explains why a scalar phase-frequency shift must not simply be added to the already calibrated excitation potential as another gravitational force.

### 8.5 Checked result

The square-root bookkeeping is supported by direct coupled-storage evolution. The required product accumulation is compatible with the exact displaced-space integral and produces all three desired weak-field powers. It differs from equal additive channel accumulation at second order. Completing the mechanism requires deriving the background-induced storage increments and the kinetic response of the same excitation with one ruler/time convention. A successful cycle-frequency calculation alone is insufficient to fix that kinetic response.

Validation: [verify_storage_product.cjs](verify_storage_product.cjs) integrates the two storage equations, checks energy conservation, integrates the compressed-radial depth numerically, differentiates the product and cycle-energy fields independently, and checks the reference-time to body-time conversion at rest. [Results](storage-product-results.json) retain all assumptions and numerical examples. Run `node AI/Revised/WIP/proper_velocity_gravity/verify_storage_product.cjs` from the repository root.

## 9. Assemble the ruler, clock and momentum factors before adding a force

12 October 2026, continued. The physical interpretation remains displacement modifying F-H storage and transport. This section assembles the conversions for that interpretation. It does not add an independent deformation force to the selected motion. It also identifies an operational ruler difference between §7's compensated photon clock and the existing mapped-ruler acceleration law.

### 9.1 A general static radial conversion

Specify the operational radial ruler and clock convention by

\[
ds=\lambda(r)dr,\qquad U=ds/d\tau,\qquad
dt=C(r)\,dt_s=C(r)\gamma(U)d\tau,
\qquad \gamma=\sqrt{1+U^2/c^2}.
\]

Here ts is local stationary clock time and t is the external comparison time. The product C gamma is conditional on using the same local ruler and kinetic clock law in both constructions. C is the candidate static period factor; this conversion does not establish it experimentally. Write b=dU/dtau for signed proper-velocity response and w=dr/dt. Direct differentiation gives

\[
\boxed{w=\frac{U}{\lambda C\gamma},}
\]

\[
\boxed{\frac{d^2r}{dt^2}
=\frac{b}{\lambda C^2\gamma^4}
-\frac{d\ln(\lambda C)}{dr}\,w^2.}
\]

The gamma^4 contains both the derivative of U/gamma and the conversion of the time parameter. The second term follows from moving through the varying ruler and static clock factor. It is a conversion term, not an additional postulated source attraction. In particular, at instantaneous rest

\[
\boxed{b=\lambda C^2\frac{d^2r}{dt^2}.}
\]

For the existing mapped ruler lambda=1/D and the existing signed response b=-Ab, the result is

\[
\boxed{\frac{d^2r}{dt^2}
=-\frac{D A_b}{C^2\gamma^4}
+\left(\frac{D_r}{D}-\frac{C_r}{C}\right)w^2.}
\]

This preserves the previous body-time dynamics exactly; it merely states the external-coordinate acceleration. If physical momentum is already p=mU with fixed m, then dp/dtau=-mAb and dp/dt=-mAb/(C gamma). Neither is m times d²r/dt² in general. Inferring a new force from their difference would count the coordinate conversion twice.

### 9.2 The compensated photon-clock ruler is not automatically the mapped ruler

Section 7 stipulated actual arms y=E x and ray cost Q=C²E^-T E^-1. Consider a locally radial increment dy=dr/D. The optical time is

\[
c\,dt=CD\,|dy|=C\,|dr|.
\]

After converting to the candidate stationary clock time dts=dt/C, the light advances dr at c, while its mapped interval dy advances at c/D. A radial rod with mapped length L0/D is assigned one baseline length L0 by the co-deformed ruler. Its operational radial interval is therefore ds=dr, or lambda=1, in this local construction. This is an operational conversion, not the claim that space did not deform.

The existing selected response instead takes ds=dell=dy=dr/D and defines kinetic gamma using U=dell/dtau. If light is c per stationary second in that ruler, it requires

\[
c\,dt=C\,|dy|=\frac{C}{D}|dr|,
\]

a different optical assignment from the compensated clock. Thus the three assumptions

1. actual equal reference arms co-map by E;
2. their transport compensates to the same period C;
3. the mapped length dy, rather than the co-deformed rod's length reading, is the ruler in which local propagation is c;

cannot all be imposed at once for D different from 1. Sections 7 and 8 deliberately tested conditional constructions; this assembly shows why their ruler definitions must not now be merged silently.

Keeping the original mapped-ruler dynamics is consistent with light at c in mapped length per stationary second. Equal mapped-length equilibrium arms then both have period C; equal reference-length co-deformed arms instead retain their directional factors. Determining which arm spans the constituent response produces remains the same material-support calculation identified earlier, not a new physical origin for gravity.

### 9.3 Relabelling the old trajectory versus changing the response ruler

If W=dr/dtau is introduced only as a new coordinate rate for the old mapped-ruler trajectory, then W=D U and

\[
\boxed{\frac{dW}{d\tau}=-DA_b+D D_r U^2.}
\]

The old kinetic gamma remains sqrt(1+W²/(D²c²)); replacing it by sqrt(1+W²/c²) changes the physical velocity convention. This transformed trajectory is not obtained by simply replacing Ab with a new scalar gradient and calling W proper velocity.

Alternatively, if one chooses the compensated clock's reference ruler as operational and applies the same product-gradient hypothesis to it, then

\[
\frac{dU_{\rm ref}}{d\tau}=\frac{c^2}{2}\frac{dP}{dr}
=-\frac{c^2}{\ell_0}(1-D^{-1})=-\frac{A_b}{D}.
\]

This is a different physical response hypothesis, not a coordinate rewrite. It still has the algebraic escape expression Uref,esc²=c²(P-1), but that velocity now counts different spatial intervals per body second. Consequently identical escape formulas do not establish identical trajectories or observed escape speeds.

Both operational choices recover the leading weak-field power. With c=d=ell0=r=1, D=sqrt(2) and C=sqrt(1+2(sqrt(2)-1)), their distinct quantities are:

| Quantity | Original mapped ruler | Reference ruler with product-gradient response |
|---|---:|---:|
| Inward body response | 0.414214 | 0.292893 |
| Inward external radial acceleration at rest | 0.320377 | 0.160189 |
| Outward light dr/dt | 1.045866 | 0.739539 |

External coordinate speeds above c here do not exceed the stipulated c in their respective operational rulers and clocks. This example lies at reference radius r=d, not at one arbitrary body's material radius. No surface/support interpretation is supplied by setting the units to one.

### 9.4 What is now fixed and what must be carried forward

For the existing selected motion, the complete radial clock/ruler conversion is fixed by §9.1 once C is specified; no freely fitted acceleration multiplier is needed. The proper escape integral and the previous body-time trajectories remain intact. The compensated optical calculation cannot simultaneously be imported as an unchanged local ruler convention, because it measures the reference interval instead of the compressed mapped interval.

The next physical calculation is the already-identified constituent support and transport response: which interval does a deformed clock/rod actually count, and how does its momentum change in those same units? This is a quantitative reconciliation of the existing displacement interpretation. It is not a claim that the F-H mechanism is absent, nor permission to choose independent factors solely to preserve each observable.

Validation: [verify_acceleration_adapters.cjs](verify_acceleration_adapters.cjs) evolves the radial state in body time and independently differences external-coordinate velocities against external time. It checks 30 weak/strong, inward/outward/rest cases, the radial invariant, the at-rest conversion, and nine direct transformations W=D U. [Results](acceleration-adapter-results.json) retain both ruler hypotheses and the transformed original trajectories separately. Run `node AI/Revised/WIP/proper_velocity_gravity/verify_acceleration_adapters.cjs` from the repository root.

## 10. Deformable clocks, mode geometry, and identifiable comparisons

13 October 2026. A perfectly rigid vertical/horizontal interferometer is neither available nor required as a logical prerequisite for testing clock predictions. The measured frequency includes the response of the apparatus. This section derives geometric path proxies and identifies which comparisons could constrain the combined response, without assigning the proxies to real quartz or atomic oscillators.

### 10.1 Line, plane and isotropic path weights

First retain the earlier uncompensated construction: co-deformed reference paths, constant c in mapped space, no extra storage factor. Set b=ln D and let mu be the reference propagation direction's cosine to the local radial direction. The exact local length/period factor is

\[
g(\mu)=\sqrt{e^{-2b}\mu^2+e^{2b}(1-\mu^2)},
\qquad g-1=b(1-2\mu^2)+O(b^2).
\]

For a prescribed closed path with normalized reference-length weights, define W=<nn^T>. Its first-order fractional period change is

\[
\boxed{\Delta T/T=b[1-2\,\mathbf e_r^{\mathsf T}W\mathbf e_r].}
\]

This is a weighted path result. It is not a proof that a coherent elastic or atomic eigenmode has that same sensitivity kernel. Three informative proxies follow:

| Proxy | Directional weight | First-order period excess |
|---|---|---|
| Linear round trip, axis n | W=nn^T | b[1-2(n·er)²] |
| Circular path in a plane with normal k | W=(I-kk^T)/2 | b(k·er)² |
| Isotropic ensemble of path directions | W=I/3 | b/3 |

A linear radial clock gives -b; a tangential one gives +b. A circular path in a tangential plane gives +b. A circular path in a plane containing the radial direction gives zero at first order, but its exact ellipse-perimeter calculation gives +3b²/4 at second order. Isotropic angular sampling removes orientation dependence, but does not remove the common b/3 shift in this particular uncompensated construction.

These averages retain the local b proportional to r^-2 in the exterior weak field. Choosing a line, plane or isotropic cycle changes the coefficient and angular dependence; it does not create the required accumulated r^-1 clock-depth dependence. With the fully co-mapped propagation of §7, the geometric period change is zero for every direction and therefore for all three proxies. A common residual storage factor C multiplies the resulting periods separately.

For the Earth-calibrated d=237.501817708 m at r=6371000 m, b=6.94846e-10. The uncompensated line model gives a radial-to-tangential frequency difference about 1.38969e-9 of baseline, or 0.01390 Hz at a nominal 10 MHz. This is a hypothetical path-model signal, not a prediction for a real quartz oscillator. The isotropic path proxy has period excess 2.31615e-10. These are calculated model values, not experimental constraints.

[Geometry comparison plot](clock-geometry-comparison.svg). The plot compares weak deformation and D=sqrt(2), using the same local path models without smoothing. The line angle refers to its axis; the plane angle refers to its normal.

### 10.2 Why quartz and rubidium need different mode calculations

A crystal oscillator is a coupled elastic/electric eigenmode. Its geometry, elastic response, density, electrodes, crystal cut and support all enter its frequency. A thin plate is not by that fact a circular planar light clock; a thickness-shear mode need not follow an optical path around the plate. Its directional response should be calculated from the mode and its stress/constitutive perturbations.

For example, Driscoll's primary quartz-resonator measurements characterize a vector acceleration sensitivity and report typical SC-cut sensitivities around 5e-10 per g in the tested devices. The paper also treats cable and sustaining-circuit contributions. This supports the relevance of the author's orientation observation but does not identify its cause as gravitational propagation anisotropy. [Driscoll, 1990](https://doi.org/10.1109/58.105244).

A rubidium frequency standard uses an atomic hyperfine resonance to steer an electronic oscillator, commonly quartz; it is not a classical electron orbit acting as a planar clock. Apparatus magnetic fields and interrogation establish directional sensitivities that must be included in an orientation experiment. The atomic discriminator and the electronic output must also be distinguished: a fast orientation change can perturb the quartz or electronics before the atomic servo corrects it. [NIST, Fundamentals of Time and Frequency](https://tf.nist.gov/general/pdf/1498.pdf), atomic-oscillator discussion.

These facts do not select HPF's microscopic clock geometry. They identify what a model must calculate to compare with each device. Assigning the isotropic path proxy to an atomic clock, or the planar proxy to a crystal, merely from the device's name would be unjustified.

### 10.3 Experimental information exists without a rigid reference arm

Bothwell et al. measured a frequency gradient consistent with gravitational redshift within a millimetre-scale ultracold strontium sample. This is a comparison of atomic resonances, not a comparison of ideally rigid vertical and horizontal interferometer arms. It constrains the total predicted height-dependent clock ratio. It does not by itself separate storage, arm deformation, propagation, or orientation effects in this framework. [Bothwell et al., Nature 602, 420-424 (2022)](https://arxiv.org/abs/2109.12238).

Likewise, a deformable interferometer can constrain a model of the combined material and optical response; deformation is a systematic contribution to evaluate, not a universal proof that comparison is impossible. Conversely, an observed null cannot bound the bare geometric path term if the proposed model predicts a compensating material/transport term. Predictions and constraints must be stated for the whole measured observable.

The user need not have a personal precision-clock data set to use published clock comparisons as boundary constraints. A new vertical/horizontal apparatus would be a separate test of directional residuals, not the only source of information about a common clock-rate factor.

### 10.4 Separate odd and even tilt effects, without assuming perfect cancellation

Let y(theta) be the fractional frequency difference to a comparison clock during a slow rotation in a vertical plane. A diagnostic fit can include

\[
y(\theta)=y_0+a_1\cos\theta+b_1\sin\theta
+a_2\cos2\theta+b_2\sin2\theta+\text{drift and residuals}.
\]

A fixed linear acceleration-sensitivity vector dotted into gravity has first-harmonic terms. The radial/tangential axis response of the bare line model has second-harmonic terms. The combinations

\[
y_{\rm even}(\theta)=\frac{y(\theta)+y(\theta+\pi)}2,
\qquad
y_{\rm odd}(\theta)=\frac{y(\theta)-y(\theta+\pi)}2
\]

separate those parity classes. They do not separate all physical causes: quadratic stress, magnetic shifts, support geometry and other even effects can also occupy the second harmonic. A 180-degree reversal alone leaves both horizontal/vertical anisotropy and these even contaminants unchanged. Four or more angles, revisited in reverse order, are more informative than just two orientations but still require an uncertainty model.

Useful independent controls would be changing support or preload, comparing distinct modes/devices, recording temperatures and magnetic conditions, and comparing ordinary tilt with calibrated applied acceleration. A centrifuge tests acceleration sensitivity; it is not an identical gravitational environment, and rotational/kinetic effects must be accounted for. Free fall changes support loading but also changes the motion and readout conditions. None is a one-step automatic subtraction of material response.

Keep the relevant mode centres at matched heights when testing orientation, so ordinary height-dependent clock shifts are not silently mixed with the result. Symmetric paths about the centre suppress a first-order spatial-gradient contribution in a simple reciprocal path integral; they do not eliminate all finite-size terms or internal stress. The model must use the actual mode weighting and path.

### 10.5 What can and cannot be inferred from clock comparisons

For the local ray-clock model the measured quadratic form is K=M^T Q M. Clock periods alone do not identify M and Q separately: replacing M by S M and Q by S^-T Q S^-1 leaves K unchanged for any invertible local S. This is an algebraic non-identifiability statement, not a claim that every such transformation is physically realizable. Independent material or propagation observables are needed to distinguish factorizations.

At the same location, frequency ratios of clocks that share exactly the same scalar C cancel that common factor. Such ratios can constrain differences between clock types or orientation responses, but cannot determine the common absolute factor. Height-separated comparisons constrain changes in C, together with any device-specific response, motion and transfer effects. Thus the two tasks should be kept distinct:

1. Constrain common depth scaling with clock comparisons across potential differences.
2. Constrain residual directional response with orientation and material/mode comparisons at controlled height.

The practical theoretical next step is to compute a sensitivity kernel for one specified sustained mode or bound constituent configuration, using the existing support/closure response, instead of inferring a clock's dimension from its packaging. The line/plane/isotropic results provide limiting checks on that calculation. They do not close the material dynamics or select a universal clock law.

Validation: [verify_clock_geometry.cjs](verify_clock_geometry.cjs) checks the weak directional coefficients, the planar second-order remainder, angular quadrature, full common-map compensation and odd/even tilt decomposition. It writes the [plot](clock-geometry-comparison.svg) and [numerical results](clock-geometry-results.json). All 156 checks passed. Run `node AI/Revised/WIP/proper_velocity_gravity/verify_clock_geometry.cjs` from the repository root.

## 11. Clock gradient, circumference expansion and constituent support

**Scope correction (18 October 2026): this common-expansion branch is set aside as the explanation of the directional adjustment.** The fixed-d map is E=diag(D^-1,D,D). Its inverse directional adjustment B=diag(D,D^-1,D^-1) gives EB=I; more generally E(sB)=sI for any common scale s. Equalizing directions therefore fixes relative separations, not the common scale, the clock factor C, or a relation s=C. This section additionally chose s=C=exp(Sigma) and unchanged mapped ray speed, then interpreted that common support expansion as the clock mechanism. Those are extra hypotheses, not consequences of compensating the map's anisotropy.

The working separation is the fixed-d directional adjustment, of order D-1~d^2/(2r^2) far from a source, and checkpoint 19's separately adopted isotropic clock/transport sector. The former does not replace the latter. At r comparable to d the directional adjustment need not be small, and their strong-field combination remains to be specified. The conformal metric and retrograde orbit below test only the additional common-expansion/unchanged-ray/geodesic branch; they are not objections to the directional adjustment or to checkpoint 19's working closure. The calculations are retained as a record of the extra assumptions and their consequences, not as the active material-response derivation.

18 October 2026. This follows the author's proposal that a sustained cycle can expand as its propagation/binding equilibrium changes. This branch sets aside the additional transverse-storage loading discussed in conversation and retains constant ray speed c in mapped coordinates y per reference time t. It develops a conditional constituent-support realization, rather than assuming that the metric of checkpoint 19 follows from expanding rods. Sections 1-10 retain their explicitly different hypotheses.

### 11.1 The measured gradient and the exact extension being tested

Let C be the period relative to the far reference, N=1/C the stationary tick rate, and h an operational upward height. Weak-field clock comparisons constrain

\[
\frac{d\ln\nu}{dh}=-\frac{d\ln C}{dh}\simeq\frac{g}{c^2}.
\]

Bothwell et al. use signed Rabi frequency discrimination for their gravitational-gradient result, not just an unsigned Ramsey phase ellipse. Their downward z convention gives a corrected gradient -9.8(2.3)e-20 per mm. Their measured lab acceleration magnitude 9.796 m/s^2 corresponds to approximately +1.09e-16 per metre upward. This constrains the weak, combined clock/transfer response; it does not select an exact strong-field constitutive law or a vertical-versus-horizontal optical transit time. [Bothwell et al., arXiv:2109.12238v1](https://arxiv.org/abs/2109.12238), Methods, Analysis, and Table 1.

Keep the mapped radial interval distinct from a newly expanded measuring rod:

\[
\rho=\sqrt{r^2+d^2},\quad d\ell=d\rho=dr/D,\quad
\Sigma=\frac{\rho-r}{\ell_0},\quad
A=\frac{c^2}{\ell_0}(D-1)>0.
\]

The existing field identity is dSigma/dell=-A/c^2. The additional hypothesis in this section is proportional cycle expansion per depth increment:

\[
\boxed{d\ln C=d\Sigma.}
\]

With C=1 at Sigma=0, integration gives C=exp(Sigma) and N=exp(-Sigma). This law already appears as a conditional clock-acceleration relation in README section 12.1. Its derivation here is an integration of the proportional-response hypothesis, not an independent derivation of that hypothesis from constituent microdynamics.

For a fixed mapped-shape cycle whose circumference is proportional to its support radius a, constant c gives T/T0=a/a0. Thus a/a0=C supplies the desired period through one-dimensional path length. Do not multiply that period by another C for the same effect. If F_eff H_eff denotes an already integrated LC product, the equivalent period relation would be F_eff H_eff/(F0 H0)=C^2; it is not an extra delay to append to the path result.

The three candidate clock laws agree at leading weak order but have different gradients in the original mapped ruler:

| Period C | C expansion | d ln N / d ell |
|---|---|---|
| 1+Sigma | 1+Sigma | A/[c^2(1+Sigma)] |
| sqrt(1+2 Sigma) | 1+Sigma-Sigma^2/2+... | A/[c^2(1+2 Sigma)] |
| exp(Sigma) | 1+Sigma+Sigma^2/2+... | A/c^2 |

An exact identification of the last gradient with acceleration selects the exponential only after fixing the ruler and the meaning of acceleration. The measured leading gradient alone does not distinguish the rows.

### 11.2 A stable support realization within the existing functional

Use excitation dynamics section 3.4's functional, normalized to its homogeneous baseline, with E0=m0 c^2 and a0=ell_C fixed reference scales:

\[
\mathcal E(a;\Sigma)=\frac{E_0}{2}
\left[\alpha_{\rm tr}(\Sigma)\frac{a_0}{a}
+b(\Sigma)\frac{a}{a_0}\right],\qquad
b=\alpha_{\rm cyc}Q_{\rm occ}.
\]

Then

\[
\frac{a_*}{a_0}=\sqrt{\frac{\alpha_{\rm tr}}b},\qquad
\frac{\mathcal E_*}{E_0}=\sqrt{\alpha_{\rm tr}b}.
\]

Suppose the cycle-energy/frequency relation uses fixed hbar_eff and this same reference time. Requiring both a*/a0=C and omega/omega0=E*/E0=1/C fixes

\[
\boxed{\alpha_{\rm tr}=1,\qquad
\alpha_{\rm cyc}Q_{\rm occ}=C^{-2}=e^{-2\Sigma}.}
\]

This is a necessary and sufficient coefficient relation within the given functional under those conventions. It does not determine alpha_cyc and Q_occ separately, nor demonstrate that the underlying occupancy/storage dynamics generates their product. In the language of checkpoint 10, the first-order changes are a_T=0, a_C+q=-2 Sigma, support shift s=+Sigma, energy shift k=-Sigma.

The resulting equilibrium is stable in this support coordinate:

\[
a_*=a_0e^\Sigma,\qquad \mathcal E_*=E_0e^{-\Sigma},\qquad
\left.\partial_a^2\mathcal E\right|_{a_*}
=\frac{E_0}{a_0^2}e^{-3\Sigma}>0.
\]

Thus the hypothesis is compatible with a stable expanded support and a lower carrier frequency. This improves on merely prescribing mirror endpoints. It establishes neither a stable interatomic bond nor the time needed to relax to the new support. The paper's a is an excitation-support variable; interpreting it as the radius of a specified circulation path is an additional identification used in this test.

If hbar_eff/hbar0=eta(Sigma) is allowed to change, the same size and frequency require alpha_tr=eta and b=eta/C^2 instead. Fixed hbar_eff is therefore an explicit convention, not a result of the minimization.

The carrier cycle is also distinct from a small support-breathing oscillation. With internal support inertia I_a, the latter has Omega_a^2=E''/I_a. Requiring that mode to share period C would additionally require I_a/I_a0=C^-1. Fixed inertia instead gives Omega_a/Omega_a0=C^-3/2. Static stiffness does not supply the inertia or damping.

The energy shift E0(e^-Sigma-1) already starts as -E0 Sigma. Adding it to the existing -m0 c^2 Sigma slow-envelope potential as a second gravitational term would double that leading contribution if both describe the same physics. A common energy/time convention must identify whether it replaces, contains, or is distinct from that potential. No centre-motion law is changed by this support check.

### 11.3 What expanded rods measure

For a small affine patch with geometric map E=diag(D^-1,D,D), orientation-independent period C under unchanged mapped propagation requires reference separations

\[
L_{{\rm ref},r}=CDL_0,\qquad
L_{{\rm ref},t}=\frac C D L_0.
\]

Both mapped lengths are C L0. The radial reference expansion is not a reversal of the map's compressed cells; it changes how many such intervals separate the constituents. Conversely, radial reference expansion alone is not sufficient for the isotropic-clock construction: the tangential response above is part of the hypothesis as well.

If these expanded material elements define the measuring rod, a fixed mapped interval contains fewer rods. In baseline rod units its operational length is

\[
ds_{\rm rod}=\frac{d\ell}{C},\qquad d\tau_{\rm clock}=\frac{dt}{C}.
\]

Mapped rays still have d ell/dt=c, and their locally counted speed is also c. But the gradient conversion is

\[
\boxed{\frac{d\ln N}{ds_{\rm rod}}=
C\frac{d\ln N}{d\ell}=\frac{CA}{c^2}.}
\]

Thus the original A per mapped ruler cannot simultaneously be called c^2 d ln N/ds_rod exactly. They agree at leading weak order. A measured height calibration and acceleration readout require the corresponding material and time conventions, including the conversion of the acceleration itself. This is a concrete limitation of the shorthand used in the preceding conversation.

The relation a*=a0 C concerns equilibrium support. Tidal stretching concerns the variation of ambient acceleration across separated parts. They may act together; this calculation does not identify one with the other or add a second tidal force from the map.

### 11.4 Strong-field limits and escape bookkeeping

For the exact fixed-d depth,

\[
0\le\Sigma<d/\ell_0,\qquad
1\le C<e^{d/\ell_0},\qquad N>e^{-d/\ell_0}
\]

at r>0, with limiting equalities as r approaches zero. The period is finite for each fixed d/ell0, but there is no source-independent universal bound. Support stiffness remains positive in the stipulated functional. The local-patch approximation can fail when an expanded excitation spans appreciable field variation; a finite limit of the formula does not prove an actual stable compact object or sustained cycle there.

Meanwhile A is asymptotic to c^2 d/(ell0 r), so the mapped-length clock gradient diverges even though the integrated clock factor remains finite. The new-rod gradient CA/c^2 also diverges, since C approaches a finite positive limit. Finite accumulated depth does not remove tides or local gradient singularities.

The old selected radial response retains U_esc^2=2c^2 Sigma in its own convention. If instead one additionally adopts the conserved metric-like energy e=N gamma, the exponential clock gives U_esc^2=c^2(exp(2 Sigma)-1). These are different dynamical closures, equal only at leading weak order. The support minimization does not authorize replacing one by the other without deriving the motion/time adapter.

### 11.5 A discriminating orbital check: expanding rods do not supply the positive spatial metric

The period factor C=e^Sigma alone does not derive checkpoint 19's spatial choice g=h=1+2 Sigma. Indeed, the rods of section 11.3 count d y/C per fixed mapped interval, not C d y.

If these clock and ruler counts are additionally packaged as an effective spacetime metric, the direct operational candidate in mapped coordinates is

\[
d\mathcal S^2=C^{-2}[-c^2dt^2+d\rho^2+\rho^2d\Omega^2].
\]

In original reference coordinates its spatial part is C^-2[D^-2 dr^2+D^2 r^2 dOmega^2]. This conformal metric preserves the stipulated straight mapped null rays. A position-dependent common factor on every interval cannot by itself produce optical bending in mapped space. Adopting timelike geodesics of this metric is a further, separately tested assumption; it is not implied merely by clock and rod calibration.

For an isolated weak exterior with Sigma=mu/(c^2 rho), mu=GM, put w=1/rho. Conserved quantities for this conditional metric are E=f c^2 t_dot and J=f rho^2 phi_dot, with f=exp(-2 mu w/c^2). The exact orbit equation simplifies to

\[
w''+w=\frac{\mu}{J^2}\exp\left(-\frac{2\mu w}{c^2}\right).
\]

Its first correction is proportional to -2 mu^2 w/(c^2 J^2), giving

\[
\Delta\varpi=-\frac{2\pi\mu}{c^2p}+\cdots.
\]

Numerical integration with the metric-audit constants gives **-14.329520 arcseconds/century**, a retrograde correction. Both the general metric integrator and an independently simplified Binet implementation agree, including step refinement. The different checkpoint-19 choice f=exp(-2 Sigma), g=h=1+2 Sigma gives **+42.988564** under the same conversion. The century convention here is 36525/87.969 orbits; checkpoint 7 uses a computed Kepler period, so their rounded century rates should not be compared as identical calculations.

This is a failed Mercury test of the specific expanded-rod/unchanged-ray/geodesic combination, not a prediction for all HPF dynamics. It also shows why a successful exponential clock test must not be promoted into a recovered full orbital response. The point-source weak depth used in this orbital check is declared explicitly; the bounded depth is retained for the strong-field/support tests above.

As an external diagnostic only, the conformal candidate has beta_PPN=1 and gamma_PPN=-1 at leading weak orders, whereas the positive-spatial candidate has beta_PPN=gamma_PPN=1. The usual orbital combination (2+2 gamma_PPN-beta_PPN)/3 reproduces the direct integration's -1/3 versus +1. This comparison does not replace the framework's dynamics. [Will, 2014, section 4.2](https://link.springer.com/article/10.12942/lrr-2014-4).

### 11.6 Status and reproducible checks

Read these results under the scope correction at the start of section 11. Passing the algebraic and numerical checks does not establish that the extra common-expansion assumption describes the author's intended directional compensation.

Derived conditional results: proportional depth response integrates to exp(Sigma); the existing support functional admits stable a*=a0 exp(Sigma) and inverse cycle frequency for alpha_tr=1, alpha_cyc Q_occ=exp(-2 Sigma); the exact bounded depth gives a finite period limit; expanded rods change the operational gradient; the direct conformal geodesic adapter fails the prograde Mercury target.

Still to derive: the coefficient response from the actual constituent/occupancy dynamics, the material bond and support-inertia response, and the compatible centre-motion/energy law. These are related uses of the existing propagation/storage mechanism, not a demand to define a new underlying substance or to restore the dropped transverse-storage multiplier.

Validation: [verify_clock_gradient_support.py](verify_clock_gradient_support.py) performs 106 checks, including independent support minimization, finite-difference stiffness and clock gradients, numerical depth integration, ruler conversion, weak illustrative Earth/Moon/Sun values, bounded-depth limits, and the two orbit formulations. [Results](clock-gradient-support-results.json). Run `python -B AI/Revised/WIP/proper_velocity_gravity/verify_clock_gradient_support.py` from the repository root. The earlier geometry-only SVG remains a plot of section 10's hypotheses; it does not display this new material-response branch.

## 12. Material response, ambient steering and orbital stability

18 October 2026. Synthesis of the author's subsequent clarification. This section records the proposed physical coupling and separates it from the discarded inference that material expansion must define a conformal metric. It does not replace checkpoint 19's working exterior closure or claim a completed Mercury or ISCO derivation.

### 12.1 Clock depth and material dimensions

The author proposes that gravitational clock slowing is accompanied by expansion of the material cycle that realizes the clock. This is a response of constituents and their binding/propagation processes. Extending that response into a universal deformation of the surrounding coordinate space requires an additional argument; section 11's conformal-metric test did not supply one.

Two distinct parts of the response must be retained. Compensation of the fixed-d map's radial/tangential anisotropy fixes relative dimensions. A common material-size response, if present, belongs to the depth-dependent constituent dynamics. Neither is determined merely by requiring the local cycle to agree in all directions. In particular, setting aside section 11's metric inference does not rule out a depth-dependent material expansion.

Use C for the gravitational period factor and s for a common linear material-size factor, keeping them distinct until their relationship is derived. For the present weak-field clock candidate,

\[
\Sigma(r)\simeq\frac{GM_\odot}{c^2r},\qquad
C=e^\Sigma,\qquad N=C^{-1}.
\]

Along Mercury's elliptical orbit,

\[
\frac{d\ln C}{dt}=-\frac{GM_\odot}{c^2r^2}\dot r.
\]

The gravitational period increases inward and decreases outward. Its temporal derivative vanishes at the turning points, although the spatial gradient remains. Motion-dependent clock response must also be carried through the same ruler/time conventions; it is not included in this gravitational factor alone.

### 12.2 A possible coupling to centre-of-mass acceleration

Symmetric expansion need not move a body's centre of mass, but it can affect that centre's acceleration if it changes the body's interaction with the external field. The proposed mechanism is an increased effective profile intersecting the source field, whose leading spherical dilution is proportional to 1/r^2.

For an effective profile with two transverse linear factors s_1 and s_2,

\[
\frac{A_{\rm eff}}{A_{{\rm eff},0}}=s_1s_2.
\]

If both equal s, and coupling per unit area and inertial response are otherwise unchanged in a fixed convention, the candidate magnitude is

\[
a_{\rm amb}(r)=\frac{GM_\odot}{r^2}s(r)^2.
\]

The additional hypothesis s=C=e^Sigma would give

\[
a_{\rm amb}(r)\simeq\frac{GM_\odot}{r^2}
\left[1+\frac{2GM_\odot}{c^2r}+\cdots\right].
\]

This is a conditional weak-field enhancement, larger near perihelion. It is not a force law derived solely from spherical dilution. The effective profile must be identified with a physical interaction quantity: for example, constituent coupling areas rather than automatically the planet's visible silhouette. Changed coupling per cycle, cycle rate and inertia must be included consistently. Any effect already represented in the adopted orbital closure must not be counted again by multiplying its acceleration by s^2.

### 12.3 Shape changes and field sampling

Radial compression changes how far the material extends into both stronger and weaker parts of the field. The near-side and far-side changes are not equal because the field is nonlinear. A compensating material response can restore an approximately spherical shape, but a common scale factor alone cannot undo anisotropy.

For clarity, in the local convention E=diag(D^-1,D,D), let b_r and b_t multiply reference material separations before E is applied. Their mapped lengths are proportional to b_r/D and D b_t. Equal mapped lengths require b_r/b_t=D^2. This statement specifies which coordinates carry each factor; it does not assert that either reference-coordinate or mapped-coordinate shape must be spherical. The corresponding material equilibrium is the quantity to determine.

Changes in field sampling and changes in effective coupling area are separate contributions. As a baseline check, an additive inverse-square field acting on a small centred distribution gives inward acceleration

\[
a_{\rm CM}=\frac{GM_\odot}{r^2}
\left[1+\frac{3\langle\xi_r^2\rangle
-\tfrac32\langle\xi_1^2+\xi_2^2\rangle}{r^2}+\cdots\right].
\]

Here the averages are mass-weighted offsets about the centre in the field's coordinates. The linear term vanishes by the centre-of-mass definition. For a spherical mass distribution the displayed terms cancel; in the additive Newtonian exterior problem the spherical-body result is exact. Thus increased overall size does not itself imply the interaction-area multiplier above. A modified constituent coupling must be evaluated separately. This baseline is a check on the proposed HPF calculation, not a replacement for it.

### 12.4 Ambient acceleration, applied thrust and Wigner steering

A powered turn and an unpowered orbit need not implement the same impulse and transport processes. Thrust exchanges energy and momentum with exhaust and loads the body internally. An unpowered trajectory follows the ambient-field response, including whatever clock and material factors that response contains. A similar spatial curve does not establish identical clock histories, internal stresses or response laws.

Wigner rotation arises from noncollinear boost composition. With the same ordered boosts and basis convention, that kinematic rotation does not depend on the label attached to the force. A distinction between thrust and ambient gravity must therefore come from the physical impulse, field transport or material response, not from assigning different kinematic rotations merely because one rocket is powered.

The earlier [checkpoint 6](trajectory-steering-checkpoint.md) made a specific additional choice: apply the external-field remainder to the translational velocity after acquiring the baseline impulse. It obtained

\[
\frac{d\mathbf U}{d\tau}
=\mathbf a_{0\parallel}+\gamma\mathbf a_{0\perp},
\qquad \gamma=\sqrt{1+|\mathbf U|^2/c^2}.
\]

Within that prescription, transverse steering grows relative to the baseline as proper velocity increases. This explains the proposed importance near compact sources, but is not an ISCO result. [Checkpoint 19](metric-closure-checkpoint.md) subsequently adopted a different exterior motion closure. These are distinct prescriptions to reconcile, not independent corrections to add together. A rotation of a transported basis or spin likewise must not automatically be counted as another rotation of the trajectory.

### 12.5 What an ISCO calculation would test

ISCO is a stability property of the unpowered motion law. A thrust-controlled circular path does not establish a stable free orbit. A circular free orbit can have constant depth while its velocity direction continuously changes; an elliptical orbit adds depth and speed variation. A small radial perturbation of a circular orbit then probes the derivatives of those response factors.

Once a single consistent motion and material-response law is specified, find its unpowered circular solutions and perturb them, conserving the quantities actually conserved by that law. If an effective-potential reduction is valid, circularity requires V_eff'=0, stability requires V_eff''>0, and marginal radial stability occurs at V_eff''=0. If material variables have their own relaxation dynamics, include those variables in the perturbation calculation rather than assuming instantaneous equilibrium. Tidal disruption or failure of material support is a separate limit from orbital instability.

No ISCO radius, new perihelion coefficient or calibrated material-area law is established here. The concrete proposal is that depth-dependent constituent expansion may modify ambient coupling while directional compensation controls shape. The next calculation must compose those responses within one motion law, with one explicit time/ruler convention, without inferring a universal metric from the body's dimensions or adding an already included effect twice.

## 13. Calculated trial: material area composed with ambient steering

18 October 2026. The author requested an actual calculation through this perspective, rather than only the synthesis above. This section supplies that calculation. It deliberately uses the older checkpoint-6 update as a specified trial law. It does not add corrections to checkpoint 19's already adopted metric closure.

### 13.1 Explicit assumptions and variables

Use mapped position y, mapped radius R=|y|, proper velocity U=dy/dtau and the transported body-time convention of checkpoint 6. Set mu=GM and m=mu/c^2. Retain the depth identity

\[
A_0=-c^2\frac{d\Sigma}{dR}>0.
\]

The weak exterior has Sigma=m/R and A0=mu/R^2. For the finite displacement comparison,

\[
r=\sqrt{R^2-d^2},\quad d^2=2m\ell_0,\quad
\Sigma=\frac{R-r}{\ell_0},\quad
A_0=\frac{c^2}{\ell_0}\left(\frac Rr-1\right),\quad R>d.
\]

The material hypothesis tested is s=C=exp(Sigma) for each transverse linear interaction dimension. With unchanged coupling per area and inertial response in this convention, its effective area multiplies the baseline acceleration by C^2. Define

\[
A_q=A_0e^{q\Sigma}.
\]

Only q=0 (no area change) and q=2 (the stated area hypothesis) are used in the comparisons. q is a switch for those assumptions, not a fitted parameter. The interaction area is an effective constituent-coupling quantity; the calculation does not assume that a larger visible planetary silhouette automatically intercepts gravity like an opaque screen.

The explicit composed trial is

\[
\frac{d\mathbf y}{d\tau}=\mathbf U,\qquad
\frac{d\mathbf U}{d\tau}
=\mathbf a_{q\parallel}+\gamma\mathbf a_{q\perp},\qquad
\mathbf a_q=-A_q\hat{\mathbf y},\quad
\gamma=\sqrt{1+U^2/c^2}.
\]

The unsteered comparison instead uses dU/dtau=a_q. These equations specify the operation being tested, rather than inferring a universal spatial metric from the material expansion.

### 13.2 The escape integral now matches the exponential-clock threshold

Because A0=-c^2 dSigma/dR, the modified depth integral can be performed exactly:

\[
\Phi_q(R)=\int_R^\infty A_q(s)\,ds
=\begin{cases}
\dfrac{c^2}{q}(e^{q\Sigma}-1),&q\ne0,\\
c^2\Sigma,&q=0.
\end{cases}
\]

The steering term is perpendicular to U, so E_b=U^2/2-Phi_q is conserved for both trial laws. The marginal escape condition E_b=0 therefore gives, for the area hypothesis,

\[
\boxed{U_{\rm esc}^2=c^2(e^{2\Sigma}-1),\qquad
\gamma_{\rm esc}=e^\Sigma=C.}
\]

This is a substantive connection: the assumed material-area response supplies the extra acceleration factor required to make the escape gamma equal the exponential clock factor. It follows without deriving a metric from rod lengths. The usual U-to-coordinate-speed map gives v_esc/c=sqrt(1-e^-2Sigma) in that map's convention; an external clock/ruler adapter must still be specified before calling it a remote coordinate speed.

Agreement of this escape threshold is not equivalence of the complete dynamics. For q=2 the trial conserved quantity is

\[
\frac{2E_b}{c^2}=\gamma^2-e^{2\Sigma}.
\]

The metric-like energy e^-Sigma gamma is therefore not generally conserved by this trial; it equals one on its marginal escape trajectory. General bound trajectories distinguish the laws even though their escape thresholds agree. For bounded Sigma, the escape threshold and C remain bounded for a fixed d/ell0, while A0 still diverges at the formal r=0 boundary. A finite escape integral does not remove that local singularity.

### 13.3 Independent orbit calculations

The steered trial retains the angular invariant H=J e^gamma/(gamma+1), where J=|y cross U|. With w=1/R and primes denoting orbital-angle derivatives, its exact Binet equation is

\[
w''+w=\frac{\gamma A_q}{J(w)^2w^2},\qquad
\gamma(w)=\sqrt{1+2(E_b+\Phi_q)/c^2}.
\]

For the unsteered comparison, J is constant and the numerator gamma is absent. Expanding the weak-exterior equations yields

\[
\Delta\varpi=\frac{\pi(q+2\eta)\,m}{p}+O((m/p)^2),
\qquad p=a(1-e^2),
\]

where eta=1 selects the full checkpoint-6 steering update and eta=0 selects the unsteered law. The fixed-d map adds 3 pi d^2/(2p^2) at leading order in d^2/p^2. This is a separate small geometric correction, not the proposed area response.

Using the metric audit's Mercury inputs and century conversion (36525/87.969 orbits):

| Trial | Weak 1/R depth, arcsec/century | Bounded depth with ell0=6371000 m |
|---|---:|---:|
| Unsteered, no area change | 0 within numerical error | 0.002468 |
| Unsteered, area factor e^(2 Sigma) | 14.329521 | 14.331991 |
| Checkpoint-6 steering, no area change | 14.329523 | 14.331986 |
| Area factor and checkpoint-6 steering composed | **28.659044** | **28.661515** |

The familiar 6 pi m/p reference with these inputs is 42.988561 arcsec/century. Thus this explicit composition supplies about two thirds of that advance, not the full result. The steering row is the result of the entire specified impulse/rotation law, not a claim that the isolated Wigner angle contributes one third. No further multiplier has been chosen to force agreement.

Two independent numerical routes were used: Binet integration and Cartesian integration of the planar velocity equations. At enlarged compactness m/a=1e-4, the three nontrivial trials agree in advance to 4e-13 radians/orbit, with energy and angular-invariant drift below 6e-14 in normalized units. At Mercury compactness, doubling the Binet resolution changes the reported rates by at most 5.1e-6 arcsec/century.

### 13.4 Circular stability of this trial

For the steered law, circularity requires U_c^2=R A_q gamma_c. Put k=R A_q/c^2; then gamma_c=(k+sqrt(k^2+4))/2. Linearizing the radial motion at fixed H gives

\[
\boxed{\frac{\kappa^2}{\Omega^2}
=1+\frac{d\ln A_q}{d\ln R}
+\frac1{\gamma_c}+\frac1{\gamma_c^3}},
\qquad \Omega=U_c/R.
\]

For the unsteered law the ratio is 3+d ln A_q/d ln R. Positive values give radial oscillations and negative values give radial instability. For the weak 1/R depth,

\[
\frac{d\ln A_q}{d\ln R}=-2-q\Sigma.
\]

Extrapolating that depth inward, the formal marginal radii R/m are 2.000000 (area only), 1.276742 (steering only), and 4.527794 (both). These are conditional mathematical results of the specified trial, not established physical ISCO radii.

The finite displacement gives instead

\[
\frac{d\ln A_q}{d\ln R}
=-D(D+1)-q\frac{R A_0}{c^2},\qquad D=R/r.
\]

For the illustrative solar mass with the provisional Earth calibration ell0/m=4313.699386, the corresponding mapped marginal radii R/m become 145.822964, 145.817279 and 146.744870. The last has reference r/m=113.607474. This is an isolated-source continuation inside the real Sun's material extent, not a model of the distributed Sun or a prediction for a collapsed object with a different displacement prescription. The contrast exposes how strongly the stability result depends on the source/depth continuation. It prevents promoting the attractive-looking 4.53m result into an HPF ISCO prediction.

All six formal marginal circles were checked against an independent numerical derivative of radial acceleration at fixed angular invariant, with stable and unstable sides verified.

### 13.5 What this calculation settles and what remains physical input

The proposed area enhancement has a concrete route into centre-of-mass dynamics, even for symmetric material expansion. In this trial it strengthens the field, reconciles the exponential clock with the marginal escape gamma, adds prograde perihelion advance, and shifts the circular stability boundary. These conclusions are conditional consequences of the declared area response, not effects of making all surrounding space expand.

The unresolved physical input is how effective area, response per cycle, cycle rate and inertia change together. Identifying s=C does not alone prove that their net acceleration multiplier is C^2. A radial shape compensation and finite-body field sampling must also be kept distinct from that constituent-area multiplier.

A common positive reparameterization d tau/dt multiplies both dy/dtau and dU/dtau by the same factor and leaves the spatial orbit unchanged. Merely applying a gravitational clock conversion consistently to this already specified trial cannot supply the missing perihelion contribution. A changed interaction or momentum response could do so, but it must be derived. Likewise the existing checkpoint-19 motion law must not receive these area and steering terms as additions unless their absence from that law has been established.

Reproduction: [verify_material_area_orbits.py](verify_material_area_orbits.py), [numerical results](material-area-orbit-results.json). Run `python -B AI/Revised/WIP/proper_velocity_gravity/verify_material_area_orbits.py`. Checks cover the potential derivative and escape identity, eight Mercury trial/refinement cases, three independent Cartesian trajectories with invariants, and six circular stability boundaries. All passed. No production orbital simulation or adopted paper equation was changed.
