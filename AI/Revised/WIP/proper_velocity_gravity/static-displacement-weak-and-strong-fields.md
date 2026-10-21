# Static Displacement: Weak and Strong Fields

Working synthesis — 6 October 2026; closure update 18 October 2026

## Purpose and status

This note distils `AI/Revised/WIP/proper_velocity_gravity/README.md`, especially §§3.1–3.2, 12.9, 15, 16.1 and 17, together with the subsequent discussion. It separates exact displacement geometry from the response laws used to connect that geometry to acceleration, escape and material clocks.

The primary construction is static. Motion and delayed source response extend that construction; the retarded formulation does not replace it as the starting point. One square-root displacement map supplies both weak- and strong-field geometry. Strong-field behavior is obtained from the exact expressions, rather than a separate field equation selected at a threshold.

This document fixes the mathematical distinctions needed for the current working model. It does not claim that a complete strong-field material, clock, or many-source response has been derived.

**18 October closure update.** Sections 4–6 now distinguish the adopted
exterior metric from the earlier fixed-map, position-only response. The
original geometry and source-structure discussion are retained. Older
response calculations elsewhere in this document use the historical law
unless explicitly recast below; they are not strong-field predictions of
checkpoint 19. See [the completed calculations](closure-observable-results.md).

## 1. Definitions

| Symbol | Meaning | Dimensions |
|---|---|---|
| \(r\) | Reference radial coordinate measured from one source centre | length |
| \(R\) | Material surface radius of an extended body | length |
| \(d\) | Fixed parameter of a single displacement map | length |
| \(r'\) | Mapped radial coordinate | length |
| \(D\) | Local tangential stretch \(r'/r\) | dimensionless |
| \(\lambda_r\) | Local radial factor \(dr'/dr\) | dimensionless |
| \(\ell\) | Radial ruler coordinate, with \(d\ell=dr'\) | length |
| \(\delta\) | Radial increment \(r'-r\), also the compressed-radial accumulated depth | length |
| \(\ell_0\) | Response-normalization length, when that closure is used | length |
| \(\Sigma\) | Dimensionless depth \(\delta/\ell_0\) | dimensionless |
| \(U\), \(v\) | Proper velocity and bounded coordinate velocity (framework terminology) | velocity |
| \(N\) | Material clock rate relative to a specified reference clock | dimensionless |

The elementary displacement coefficient \(r_0\) is primitive in the proposed source interpretation. It is not a body that receives an additional displacement. Its interpretation must not be conflated with an aggregate's fitted exterior parameter \(d_{\rm eff}\).

## 2. Exact single-displacement geometry

For fixed \(d\),

\[
r'=\sqrt{r^2+d^2},\qquad
D(r)=\sqrt{1+\frac{d^2}{r^2}},\qquad
\lambda_r=\frac{dr'}{dr}=\frac1D.
\]

The local map in radial and two tangential directions is

\[
E=\operatorname{diag}(D^{-1},D,D),\qquad \det E=D.
\]

Radial intervals compress while tangential intervals expand. The square-root map does not preserve three-dimensional local volume. These are geometric statements; a mapped material body need not preserve its original reference shape or remain in mechanical equilibrium.

The radial increment is

\[
\boxed{\delta(r)=r'-r=\sqrt{r^2+d^2}-r
=\frac{d^2}{\sqrt{r^2+d^2}+r}.}
\]

The rationalized expression is numerically preferable in the weak field. The displacement parameter \(d\), mapped radius \(r'\), and increment \(\delta\) are three distinct lengths.

At \(r=d\), \(D=\sqrt2\). This is a useful transition scale, not a discontinuity, material boundary or horizon. The weak expansion requires \(r\gg d\), not merely \(r>d\).

## 3. Accumulated depth and its measure

An infinitesimal radial deficit is

\[
dr-d\ell=\left(1-\frac1D\right)dr.
\]

Integrating outward gives the exact identity

\[
\boxed{
\int_r^\infty\left(1-\frac1{D(s)}\right)ds
=\int_{\ell(r)}^\infty(D-1)\,d\ell
=\delta(r).
}
\]

Thus \(\sqrt{r^2+d^2}-r\) is already the accumulated depth for this measure. It is not integrated a second time. The boundary term vanishes because \(\delta(s)\to0\) at infinity.

The earlier coordinate-path definition is different:

\[
\Delta\ell_{\rm coord}
=\int_r^\infty(D(s)-1)\,ds
=d\,\operatorname{asinh}(d/r)-\delta(r).
\]

Both approach \(d^2/(2r)\) in the weak field. In the formal inward continuation, \(\delta\to d\), whereas \(\Delta\ell_{\rm coord}\) diverges logarithmically. They cannot be interchanged in strong-field calculations.

## 4. Acceleration and escape in the adopted closure

Use \(\Sigma=m/r\), \(m=GM/c^2\), \(N=e^{-\Sigma}\),
\(B=1+2\Sigma\), \(d\ell=\sqrt B\,dr\), and \(R_A=r\sqrt B\).
Here \(r\) is the isotropic exterior coordinate, not the reference label
of the fixed-displacement map in §§1–3. With \(U=d\ell/d\tau\), conserved
\(e=N\sqrt{1+U^2/c^2}\) gives the outward-positive radial equation

\[
\frac{dU}{d\tau}=c^2\gamma^2\Sigma_{,\ell}
=-\frac{GM}{r^2\sqrt B}\gamma^2.
\]

The gravitational response is velocity dependent even with a static source.
Marginal escape \(e=1\) gives

\[
U_{\rm esc}=c\sqrt{e^{2\Sigma}-1},\qquad
\gamma_{\rm esc}=e^\Sigma,\qquad
v_{\rm esc}=c\sqrt{1-e^{-2\Sigma}}.
\]

The bounded velocity \(v=U/\gamma\) uses a static local ruler and clock;
the global metric-coordinate speed is \(dr/dt=Nv/\sqrt B\).
The old invariant \(U^2/2-c^2\Sigma\) below is replaced by \(e=N\gamma\).
The weak limits remain \(A=GM/r^2\), \(U_{\rm esc}^2=2GM/r\), and
\(N=1-GM/(c^2r)+\cdots\).

### 4.1 Historical fixed-map response

The following position-only law records the earlier calculation. It is
superseded for exterior orbital dynamics by the equations above.

The depth has two different derivatives:

\[
-\frac{d\delta}{dr}=1-\frac1D,\qquad
\boxed{-\frac{d\delta}{d\ell}=D-1.}
\]

The historical working response from README §16.1 is

\[
\boxed{A_b(r)=\frac{c^2}{\ell_0}(D-1),}
\]

where \(A_b\) denotes inward proper-velocity change per moving-body second. This is a response assumption applied to the exact geometry. It is not supplied by the coordinate map alone.

For an outward radial launch, specify

\[
\frac{dU}{d\tau}=-A_b,\qquad
\frac{d\ell}{d\tau}=U.
\]

Then

\[
\Phi_b(r)=\int_{\ell(r)}^\infty A_b\,d\ell
=\frac{c^2\delta(r)}{\ell_0},\qquad
\boxed{U_{\rm esc}^2=2\Phi_b.}
\]

Here \(\Phi_b\) has units of energy per mass but is the body-clock escape integral; \(U^2/2\) is not the standard relativistic kinetic energy per mass.

The coordinate derivative of the same potential is

\[
-\frac{d\Phi_b}{dr}=\frac{c^2}{\ell_0}\left(1-\frac1D\right).
\]

It must not be substituted for \(A_b=-d\Phi_b/d\ell\). Doing so changes the response law in precisely the regime being investigated.

The velocity definitions and conversion are:

The terminology here follows the framework: \(U\) is proper velocity and \(v\) is coordinate velocity, rather than “physical velocity.” For the radial transport convention used in this derivation, \(U=d\ell/d\tau\) and \(v=d\ell/dt_{\rm stat}\), with \(dt_{\rm stat}=\gamma\,d\tau\). This label does not silently replace \(d\ell\) with the original radial label \(dr\): since \(d\ell=dr/D\), the corresponding \(dr/dt_{\rm stat}=Dv\). A different global time coordinate needs its own transport conversion.

\[
v(U)=\frac{U}{\sqrt{1+U^2/c^2}},\qquad
\gamma(U)=\sqrt{1+U^2/c^2}.
\]

Consequently this working closure gives

\[
\gamma_{\rm esc}=\sqrt{1+2\delta/\ell_0},\qquad
v_{\rm esc}=c\sqrt{\frac{2\delta/\ell_0}{1+2\delta/\ell_0}}.
\]

For comparison, a field stipulated per stationary local second, \(dU/dt_{\rm stat}=-A_s\), instead satisfies

\[
c^2(\gamma_{\rm esc}-1)=\Phi_s,
\qquad \Phi_s=\int A_s\,d\ell.
\]

For the same trajectory the rates obey \(A_b=\gamma A_s\). Prescribing the same position-only formula for both rates defines different dynamics. The body-clock rate is also not automatically the conventional accelerometer reading.

## 5. Weak and strong limits

For the exact adopted exterior continuation, circular motion gives

\[
\frac{v_{\rm orb}^2}{c^2}=\frac{\Sigma(1+2\Sigma)}{1+\Sigma},\qquad
\Omega^2=\frac{c^2 e^{-2\Sigma}\Sigma}{r^2(1+\Sigma)}.
\]

The local static speed reaches \(c\) at the circular null orbit
\(\Sigma=1/\sqrt2\). Existence of a timelike circular orbit below that
depth is separate from its stability. The lapse is positive for finite
\(\Sigma\); it has no global positive lower bound if \(m/r\) is continued
to infinity. If a bounded near-source depth is adopted instead, the general
escape law in §4 remains valid, but these explicit circular formulas must be
recomputed from its derivative. Replacing \(B\) with \(e^{2\Sigma}\)
also changes the strong-field predictions.

### 5.1 Historical fixed-map asymptotics

The map asymptotics remain exact geometry. The \(A_b\) and \(\Phi_b\)
rows below belong specifically to the historical response of §4.1.

Write \(K=c^2/\ell_0\). With \(d\) and \(\ell_0\) fixed:

| Quantity | Weak field, \(r\gg d\) | Formal strong limit, \(r\ll d\) |
|---|---|---|
| \(D\) | \(1+d^2/(2r^2)+\cdots\) | \(d/r+\cdots\) |
| \(\lambda_r\) | \(1-d^2/(2r^2)+\cdots\) | \(r/d+\cdots\) |
| \(\delta\) | \(d^2/(2r)-d^4/(8r^3)+\cdots\) | \(d-r+r^2/(2d)+\cdots\) |
| \(A_b\) | \(Kd^2/(2r^2)+\cdots\) | \(K(d/r-1+\cdots)\) |
| \(\Phi_b\) | \(Kd^2/(2r)+\cdots\) | \(Kd-Kr+\cdots\) |

A divergent local response and finite accumulated escape depth are compatible: the radial ruler intervals shrink. Specifically, \(A_b\,d\ell=K(1-1/D)dr\), which is integrable inward.

### The transition region is the exact equation

The two asymptotic columns are not separate branches intended to meet. Neither approximation is reliable around \(r/d\sim1\). Set \(x=r/d\) and evaluate the same exact functions throughout:

\[
D=\sqrt{1+x^{-2}},\qquad
\frac{\delta}{d}=\sqrt{1+x^2}-x,\qquad
\frac{A_b}{K}=\sqrt{1+x^{-2}}-1.
\]

At \(x=1\), these give \(D=\sqrt2\), \(\lambda_r=1/\sqrt2\), \(\delta/d=\sqrt2-1\), and \(A_b/K=\sqrt2-1\). Every expression is smooth for \(r>0\). No interpolation or third field law is missing. That smooth response is the historical position-only law of §4.1; the adopted exterior law is stated separately in §4.

The body-clock escape gamma tends to \(\sqrt{1+2d/\ell_0}\) in this formal continuation. This is a bound on the chosen escape expression, not a derivation of a material-clock bound or the survival of matter at the origin. Nor does finite \(v_{\rm esc}<c\) by itself establish the global causal behavior of light.

## 6. Finite bodies and tides

In the adopted metric, the instantaneous tidal eigenvalues for neighboring
freely falling particles initially at rest relative to the static frame are

\[
\ddot\xi_r=\mathcal T_r\xi_r,\quad
\mathcal T_r=c^2(\Sigma_{,\ell\ell}-\Sigma_{,\ell}^2),\qquad
\ddot\xi_t=\mathcal T_t\xi_t,\quad
\mathcal T_t=c^2\Sigma_{,\ell}\frac{R_{A,\ell}}{R_A}.
\]

For \(\Sigma=m/r\), \(B=1+2\Sigma\), these become

\[
\mathcal T_r=\frac{2c^2\Sigma(1+\Sigma-\Sigma^2)}{r^2B^2},\qquad
\mathcal T_t=-\frac{c^2\Sigma(1+\Sigma)}{r^2B^2}.
\]

They approach \(+2GM/r^3\) and \(-GM/r^3\). The formal strong continuation
changes radial stretching into compression above
\(\Sigma=(1+\sqrt5)/2\). The statement is for the specified observer and
metric; a moving body's tidal tensor requires the corresponding frame
transformation. Material stress additionally requires the body's response.

### 6.1 Historical mapped-span calculation

The following remains a calculation for the earlier fixed-map response,
not an additional term to add to the metric tidal tensor.

A short fixed reference span \(L_r\) maps to \(L_\ell\simeq L_r/D\). For endpoints \(r_\pm=r\pm L_r/2\), the exact mapped span is

\[
L_\ell=\sqrt{r_+^2+d^2}-\sqrt{r_-^2+d^2},
\]

provided both endpoints belong to the same radial exterior branch.

For the working response,

\[
\frac{dA_b}{dr}=-K\frac{d^2}{D r^3},\qquad
\boxed{\frac{dA_b}{d\ell}=-K\frac{d^2}{r^3}.}
\]

Across a sufficiently small fixed reference span,

\[
|\Delta A_b|\simeq K\frac{d^2}{r^3}\frac{L_r}{D}
\underset{r\ll d}{\sim}K\frac{dL_r}{r^2}.
\]

The exact difference in the scalar field magnitudes is \(K[D(r_-)-D(r_+)]\). The linear approximation requires the body to be small compared with the variation scale; it is not valid for a fixed-size body taken arbitrarily close to the origin.

Radial compression therefore reduces the span over which the gradient acts, but does not cancel the differential response. The deeper end has a stronger inward tendency. A connected body must transmit tension to maintain its configuration; unattached parts can change separation while each falls freely. This does not require different physical laws in different frames.

These expressions compare the stipulated local field response. A full relativistic stress prediction additionally needs common-clock transport, the evolving body configuration and material response. The mapped reference span is not automatically the equilibrium length of a rigid rod. Tangential tides also require accounting for changes in the acceleration direction, not only its radial magnitude.

## 7. Source structure and macroscopic calibration

### 7.1 Independent sources versus a merged source

An extended body contains interacting sources that retain distinct centres. Its mass includes constituent interactions and binding. Arrangement matters: a hollow shell and a compact central source do not have interchangeable interiors.

For the proposed source interpretation, \(r_0\) is an elementary displacement. Assigning a further displacement to that displacement is not the construction. A volume-additive merged sphere would have

\[
d_{\rm merged}=r_0N^{1/3}.
\]

That is a merged-volume prescription, not a derivation of the response of packed, independent maps. Conversely, a macroscopic exterior fit \(d_{\rm eff}\propto\sqrt M\) is not established as an elementary-source aggregation rule. Its extrapolation to one proton must not silently redefine the primitive \(r_0\).

The proposed black-hole interpretation as a merged nuclear-like displacement remains a structural hypothesis. Neither that interpretation nor a neutron-star support law follows from the static square-root map.

### 7.2 Weak-field matching

The current response has the Newtonian exterior limit if

\[
\boxed{\frac{d_{\rm eff}^2}{\ell_0}=\frac{2GM}{c^2}.}
\]

Weak-field matching fixes this combination, not \(d_{\rm eff}\) and \(\ell_0\) separately. Their separate values affect the inward continuation.

The recent working Earth calibration absorbs the chosen reference length into a mass-to-displacement coefficient:

\[
d_{\rm eff}(M)=K_d\sqrt{M},\qquad
K_d=\frac{d_E}{\sqrt{M_E}},\qquad
\ell_0=\frac{c^2K_d^2}{2G}.
\]

With the discussion's numbers \(r_0=1.2178\times10^{-15}\), \(c=3\times10^8\,\mathrm{m/s}\), \(M_E=5.97\times10^{24}\,\mathrm{kg}\), and \(R_E=6{,}371{,}000\,\mathrm m\), the numerical convention \(G=500r_0^2c^2\) gives \(G=6.67366578\times10^{-11}\) in SI units. Its coefficient 500 carries the required unit conversion; it is not dimensionless in an SI dimensional equation.

The working normalization \(\ell_0=R_E\) gives

\[
K_d=9.720302314\times10^{-11}\,\mathrm{m\,kg^{-1/2}},
\qquad d_E=237.501818\,\mathrm m.
\]

This coefficient is held fixed when applying the bulk fit to other bodies; their own radii are evaluation points, not replacements for \(\ell_0\). It is a working calibration, not a demonstrated universal structural scale. The earlier surface-gamma identification that motivated it is no longer treated as an independent derivation.

For these parameters, \(\delta(R_E)=4.426865\,\mathrm{mm}\) and \(\delta(2R_E)=2.213432\,\mathrm{mm}\). The approximately 186.7 m value in README §§12.9 and 15 came instead from the bare-nucleon occupancy estimate. It was not obtained by integrating this depth. The two source prescriptions must not be mixed.

### 7.3 Domain of a bulk exterior replacement

The effective Earth value near 200 m does not establish a physical strong-field transition 200 m from Earth's centre. That position is inside an extended distribution. The central exterior replacement cannot be continued through the actual Earth without deriving the distributed response.

An ideal Newtonian shell illustrates the required distinction: its interior potential is constant but its gradient is zero. In this framework, the analogous shell result must be obtained from constituent composition. Zero resultant acceleration does not establish zero accumulated clock modification, or prove that the individual radial factors disappear.

For successive spatial maps, their Jacobians compose at the intermediate positions. In the near-Earth lunar working construction, the specified order is Moon first, Earth second, with Earth's centre carried through the lunar map. That local convention is not yet a general many-source composition theorem.

## 8. Clocks and F–H transport

The accompanying [directional photon-clock derivation](directional-photon-clock.md) evaluates local and finite radial/tangential round trips. For equal reference arms and constant-c propagation in the mapped geometry, it gives \(T_r/T_t=D^{-2}\). It states the ray-path and time conventions explicitly, including the distinction between free straight rays and guided mapped paths.

Its [transport/storage extension](directional-photon-clock.md#7-velocity-clock-control-and-common-transportstorage-response) tests the inline/transverse velocity-clock control and then the existing storage tensor. Co-mapping the arm and propagation compensates the directional deformation but leaves the common period unchanged. An additional common storage burden can yield a shared period; those sections record exploratory mechanisms. The adopted exterior postulate now fixes N=e^(−Σ) and marginal escape gamma=e^Σ, as in §4; the earlier mechanism trials are not prerequisites for using that postulate.

The proposed physical mechanism is modification of F–H storage and transport beneath material cycles, resonances and measuring processes. “Time dilation” describes the resulting clock comparison. Acceleration and a static clock rate are distinct responses; neither is obtained merely by naming the other.

The kinetic identity \(\gamma(U)=\sqrt{1+U^2/c^2}\) does not establish \(N=1/\gamma_{\rm esc}\). Likewise, the local shell ratio \(D\), dimensionless accumulated depth \(\Sigma\), and clock period factor must not be identified by notation.

The README already supplies a candidate physical clock construction: a sustained ripple returning to its initial state through a two-pass cycle. Its single-boundary arc/chord factor obeys

\[
q(\theta)=\frac{\theta}{2\sin(\theta/2)}\le\frac\pi2.
\]

This is an exact bound for that route comparison. The further period ansatz \(C=\lambda_r q^2\) is provisional, as the README states. A bounded single-boundary path factor is not a bound on \(D\), all multi-source paths, or every material clock. The task is to reconcile and evaluate the existing cycle construction, not to presume that no clock mechanism has been proposed.

The old \(N=(1+\Sigma)^{-1}\) is not carried forward as an established strong-field clock law. Weak-field agreement remains useful; it does not select the inward continuation.

### A clock period is not a general propagation-time difference

A material clock requires a stable recurring physical cycle. Strong directional deformation may disrupt that cycle; an algebraic period ansatz does not establish a functioning clock. Conversely, neither divergence of \(D\) nor the present formulas prove that all possible material cycles become unstable. In particular, the provisional saturated ansatz \(C=\lambda_r q^2\) tends to zero inward, not to an infinite period; extrapolating it is not a stability analysis.

For a non-repeating transit, the appropriate observable is an elapsed propagation time or a difference between specified arrival events. Given a defined reference time and a directional transport law, one may write schematically

\[
T[\mathcal P]=\int_{\mathcal P}\frac{ds}{v_{\rm path}(\mathbf x,\hat{\mathbf t})}.
\]

Here \(ds\) and \(v_{\rm path}\) must use the same specified spatial and time conventions; the equation does not supply the missing transport law. Direction-dependent transport can make the result depend on the route. That does not by itself make a stationary material clock's rate direction-dependent or prove that accumulated delay determines the route: the propagation equations must determine that coupling.

A stable local clock factor, a kinetic escape gamma, and an integrated travel-time difference are therefore separate outputs. The strong-field task includes determining where material cycles remain stable and calculating transit times where a periodic-clock description is unavailable.

## 9. Superseded assumptions and retained results

The following table records the original corrections. The working dynamics and observational papers have since been updated to the adopted exterior closure; historical claims below identify the earlier versions.

| Earlier statement or shortcut | Current treatment |
|---|---|
| Displacement dynamics introduction calls the retarded map primary | Static displacement is primary here; source motion supplies the dynamical extension |
| The square-root shell map is justified as ordinary insertion of a fixed spherical volume | Retain the map as the candidate; its Jacobian is \(D\), so volume insertion is not a proof of it |
| Coordinate-path depth and compressed-radial depth are interchangeable | They share a leading exterior limit but have different exact inward behavior |
| Local shell stretch equals escape gamma everywhere | Rejected for fixed \(d\): \(D^2-1\propto r^{-2}\), while weak escape depth is proportional to \(r^{-1}\) |
| Dynamics paper Appendix C uses \(D^2=1+2\Sigma\) as an exact identity | Not true for this fixed-\(d\) map and either accumulated depth; dependent metric/strong-field predictions require rederivation |
| \(N=(1+\Sigma)^{-1}\) is an established global clock law | Historical closure; establish cycle stability where a clock exists, and distinguish it from path-integrated transit-time differences |
| A coordinate-depth derivative is the compressed-ruler acceleration | Keep the chain-rule factor \(d/d\ell=D\,d/dr\) explicitly |
| Co-deformation or shortened radial extent removes tidal stress | Not implied; the retained field has a nonzero differential response across the compressed span |
| Nuclear occupancy, merged displacement and bulk exterior displacement share one aggregation rule | Distinguish source structure and derive their connection |
| A fitted planetary central map applies through its material interior | Exterior replacement only until the distributed-source calculation is supplied |

This does not declare the weak-field limit “strong” or discard every earlier observational calculation. It identifies which equations no longer support an exact strong-field continuation. Earlier metric, orbit and optical results must be checked against the response assumptions actually used; they are not inherited solely because the Newtonian limit agrees.

## 10. Surface evaluation and focused follow-ups

The compact-source interpretation is specified as a model hypothesis: a merged displacement is distinguished from an aggregate of individually centred sources. Explaining why intranuclear dynamics sources that displacement is a separate microscopic problem, not a prerequisite for evaluating the stipulated exterior map. The immediate task is to apply the finite geometry consistently, rather than to impose infinite clock dilation as a target.

### 10.1 Historical fixed-map surface response

For a small distinct test displacement near a larger source, [checkpoint 12](separated-test-displacement.md) supplies the separated-body calculation, including a surface-to-surface gap, centre acceleration, exact finite radial difference, and weak/strong examples. This is distinct from assigning the source itself the primitive size in the illustrative calculation below. It requires no overlap or inter-body binding law; internal support is needed only to turn the calculated nonuniform external response into deformation or stress.

For a reference-coordinate boundary at \(r=R_b>0\), the historical body-clock response of §4.1 gives

\[
A_b(R_b)=\frac{c^2}{\ell_0}\left(\sqrt{1+d^2/R_b^2}-1\right),
\qquad
U_{\rm esc}(R_b)=c\sqrt{\frac{2(\sqrt{R_b^2+d^2}-R_b)}{\ell_0}}.
\]

If the primitive source is assigned \(d=r_0\) and its reference boundary is also stipulated to be \(R_b=r_0=d\), then

\[
D_b=\sqrt2,\quad \lambda_{r,b}=1/\sqrt2,\quad
\delta_b=(\sqrt2-1)d,
\]

\[
\boxed{A_b(R_b)=(\sqrt2-1)\frac{c^2}{\ell_0}},\qquad
\boxed{U_{\rm esc}(R_b)=c\sqrt{2(\sqrt2-1)d/\ell_0}}.
\]

Coordinate escape speed is obtained through \(v=U/\sqrt{1+U^2/c^2}\). These values are finite. The local radial-to-tangential length ratio is \(1/D_b^2=1/2\), rather than arbitrarily small. Much stronger flattening requires \(r/d\ll1\), for example a small excitation in another, larger source's field.

The boundary convention is essential: \(R_b=d\) in the reference coordinate maps to \(R_b'=\sqrt2d\). A boundary defined instead by mapped radius \(R_b'=d\) corresponds to \(r=0\), where the map's differential factors are singular. A nonzero mapped sphere radius alone therefore does not remove the singular limit. State which radius defines the physical boundary before making a surface prediction.

The elementary-source normalization \(\ell_0\) has not been identified by the aggregate Earth calibration. No numerical proton surface acceleration is inferred by silently applying that bulk fit to the primitive displacement.

### 10.2 What remains to specify

1. **Near-source distance conversion.** The exterior ruler, body clock and motion law are specified in §4. For a bounded-depth continuation, state the exact conversion between reference distance, displaced distance and material rod length. Under \(p=mU\) for fixed rest mass, \(dp/d\tau=m\,dU/d\tau\); no new microscopic clock explanation is required to use the adopted exterior law.
2. **Closed paths and elapsed transport time.** A smooth deformation maps a closed geometric curve to another closed curve; it need not remain a great circle. Geometric closure does not by itself establish that the transported waveform follows that curve or returns with the phase and amplitude required for a stable repeating cycle. Calculate the route and return time first; use a clock-period description where the process actually repeats. A global spherical mode and one closed circuit impose different conditions.
3. **Distributed sources and packing.** Derive how constituent arrangement changes the effective exterior response. Treat geometric occupied volume, field overlap and the fitted displacement coefficient separately. Counting partial spheres at a sampling boundary is appropriate for a volume fraction; it does not establish the field-composition law.
4. **Specified boundary and finite-body response.** Evaluate the surface formulas for the chosen boundary convention and track finite-body differential response where needed. The compact-source interpretation is a model input; its microscopic sourcing and a complete material equilibrium calculation are distinct follow-ups.

For comparison with ordinary equal-sphere packing, a filling fraction \(\phi\) implies \(V_{\rm envelope}/V_{\rm spheres}=1/\phi\) and an equivalent radius ratio \(\phi^{-1/3}\). Densest bulk equal-sphere packing has \(\phi=\pi/\sqrt{18}\approx0.74048\), giving about 1.3505 in volume and 1.1053 in radius, not 1.27 in radius. A radius ratio 1.27 corresponds to \(\phi\approx0.488\) if that equivalent-volume interpretation applies. These geometric factors are comparisons, not established corrections to the displacement response. Source: [sphere-packing proof](https://arxiv.org/abs/math/9811076).

The nuclear binding/support connection, possible comparisons with microscopic theories, galaxy-scale response and dynamical radiation problem remain separate follow-ups.

## Source trail

- Repository: `M:/javascript/carWars/dual-quat/STFRPhysics/`.
- `AI/Revised/WIP/proper_velocity_gravity/README.md`: §§3.1–3.2 (clock conventions and escape), 12.9 (occupancy and normalization), 15 (directional map and clock cycle), 16.1 (two depth measures), 17 (material boundaries and formal radii).
- `AI/Revised/displacement_dynamics_paper.md`: static displacement and depth definitions; Appendix C's metric identification; Appendix D's mass-composition proposal.
- Author clarifications through 6 October 2026: take the static map as primary; distinguish primitive, distributed and merged sources; retain nonzero tidal response; treat the Earth coefficient as a provisional bulk calibration.

