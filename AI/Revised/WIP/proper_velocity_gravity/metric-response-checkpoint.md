# Checkpoint 2: metric compatibility and transport coordinates

7 October 2026. This follows [checkpoint 1](static-response-checkpoint.md). It tests a metric representation of the selected response; it does not impose a metric as the framework's mechanism.

## Result

The selected law \(dU/d\tau=-A_b(\ell)\) cannot, for all radial launch velocities, be represented by timelike geodesics of a static position-only metric whose proper distance and proper time are identified with the selected transport ruler and body time. Adjusting the radial coefficient alone does not resolve this. An escape-matched lapse reproduces the marginal escape curve but not the full family of trajectories.

This is a limitation of that proposed representation, not an algebraic inconsistency in checkpoint 1's radial system. The next calculations should retain the transport response and derive its nonradial extension explicitly instead of inheriting the old geodesic orbit equation.

## 1. Three spatial descriptions must be distinguished

The forward map is \(\rho=\sqrt{r^2+d^2}\), with local deformation \(E=\operatorname{diag}(D^{-1},D,D)\). If lengths are mapped forward, their spatial quadratic form is

\[
d\ell_{\rm map}^2=D^{-2}dr^2+D^2r^2d\Omega^2
=d\rho^2+\rho^2d\Omega^2.
\]

This is the Euclidean metric in a different radial coordinate on its exterior domain; spatial remapping alone supplies no gravitational dynamics.

Counting undeformed coordinate intervals in units of co-deformed rods uses the inverse local factors. If that is the operational convention, it must be specified separately and need not be the forward-map ruler used in checkpoint 1. The old §4.3 adopts a radial inverse-ruler interpretation \(D^2dr^2\), while keeping the angular term \(r^2d\Omega^2\). It is neither simply the full forward map nor its full inverse. That may be a constitutive choice, but it is not obtained from the Jacobian without further definitions.

This checkpoint preserves the selected radial ruler \(d\ell=dr/D\). It does not replace the angular or time sector by assumption.

## 2. Radial geodesic test

Consider any candidate static radial metric, expressed using that same ruler:

\[
ds^2=-N(\ell)^2c^2dt^2+d\ell^2+\text{angular terms}.
\]

For the purpose of this test only, identify metric proper time with the transported body time \(\tau\). Then

\[
U=\frac{d\ell}{d\tau},\qquad
\gamma=\sqrt{1+U^2/c^2},\qquad
\mathcal E_{\rm metric}=N\gamma=\text{constant}
\]

along a radial geodesic. Differentiation, or the radial geodesic equation, yields

\[
\boxed{\frac{dU}{d\tau}=-c^2\gamma^2\frac{d\ln N}{d\ell}.}
\]

The result also holds at an instantaneous turning point by the geodesic equation or continuity. To equal the selected response for every \(U\) at one position would require

\[
\frac{d\ln N}{d\ell}=\frac{A_b(\ell)}{c^2\gamma(U)^2}.
\]

A position-only lapse cannot have this velocity dependence where \(A_b\ne0\). The angular metric cannot fix the mismatch for purely radial motion. Neither can a relabelling of the radius while preserving the same operational ruler.

The conclusion is limited to this static metric-geodesic representation with these identifications. A different operational time/ruler adapter, non-geodesic effective dynamics, or a more general velocity-dependent description is a different hypothesis and must be stated explicitly.

## 3. Why matching escape alone is insufficient

Write \(\Sigma=\Phi_b/c^2=\delta/\ell_0\), so \(d\Sigma/d\ell=-A_b/c^2\). Matching the marginal escape gamma to a metric energy normalized at infinity suggests

\[
N_{\rm esc}=(1+2\Sigma)^{-1/2}.
\]

Its geodesic response would be

\[
\left(\frac{dU}{d\tau}\right)_{\rm geo}
=-A_b\frac{\gamma^2}{1+2\Sigma}.
\]

This equals \(-A_b\) on the marginal escape curve, where \(\gamma^2=1+2\Sigma\). It differs for other launch energies. At rest its magnitude is \(A_b/(1+2\Sigma)\). Thus reproducing the previously calculated escape speeds does not validate this lapse as the general motion or material-clock law.

For a concrete dimensionless example, \(d=\ell_0=c=r=1\) gives \(\Sigma=\sqrt2-1\) and \(A_b=\sqrt2-1\). The selected body-clock acceleration magnitude is approximately 0.4142 for every instantaneous \(U\). The escape-matched geodesic gives approximately 0.2265 at rest, 0.4142 at marginal escape, and 0.4531 at \(U=c\).

The selected trajectory invariant is

\[
e_b=U^2/(2c^2)-\Sigma.
\]

Along it, \(\gamma^2=1+2\Sigma+2e_b\). A lapse fitted to each energy would therefore depend on \(e_b\); it would not be a universal static metric shared by all test bodies.

The historical lapse \(N=(1+\Sigma)^{-1}\), if evaluated with the selected depth and ruler, instead gives \(dU/d\tau=-A_b\gamma^2/(1+\Sigma)\). This comparison isolates the lapse issue; it is not a complete recalculation of the old paper's different depth and spatial convention.

## 4. Consequences for the paper

- **Keep:** the selected exact radial response, its invariant, the conditional surface/stand-off evaluations, and the leading Newtonian limit. Checkpoint 2 does not change their numbers.
- **Do not substitute:** \(N_{\rm esc}\) for the material clock response merely because it reproduces escape gamma.
- **Do not inherit:** §4.4's orbit equation or Appendix C's higher-order predictions from a metric whose geodesics implement a different response.
- **Resolve next:** nonradial transport of velocity and direction, the time/ruler adapter used to compare separated events, and the optical path/endpoints. These are what orbit and delay calculations need.

The correction is not confined to a formal strong-field singularity. For \(N_{\rm esc}\), the geodesic-to-selected acceleration ratio is \((1+U^2/c^2)/(1+2\Sigma)\). Its deviations begin at velocity-squared and potential order, so post-Newtonian observables must be recalculated even though the leading Newtonian acceleration survives.

No global clock law, horizon claim or revised perihelion coefficient is supplied by this checkpoint. Those would require choosing additional response equations beyond the selected radial system.

## Validation

`verify_static_response.py` additionally checks the lapse gradients by finite differences, the escape-only equality, the unequal accelerations at other launch velocities, and the failure of \(N_{\rm esc}\gamma\) to remain conserved on a non-marginal trajectory of the selected law. The radial checks from checkpoint 1 still pass.
