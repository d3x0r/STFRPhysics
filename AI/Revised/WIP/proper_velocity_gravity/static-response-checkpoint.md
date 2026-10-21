# Checkpoint 1: consistent static radial response

7 October 2026. Baseline: the existing Dynamics paper. Revised material: the proper-velocity README, the accompanying static-displacement paper, and the author's subsequent clarifications.

## Outcome

The selected static body-clock response is a closed radial initial-value system for fixed source displacement and fixed response normalization. Its geometric gradient, escape integral, and velocity conversions are consistent. It reproduces the Newtonian exterior acceleration at leading order. This checkpoint does not establish the old effective metric or inherit its orbit and optical predictions.

## Definitions and selected equations

Use reference radius \(r>0\), fixed source displacement \(d>0\), mapped radius \(\rho=\sqrt{r^2+d^2}\), and fixed normalization length \(\ell_0>0\). A radial interval is \(d\ell=d\rho=dr/D\), where \(D=\rho/r\). The symbol \(\ell\) specifies a ruler; its additive origin is immaterial. Define

\[
\delta=\rho-r=\frac{d^2}{\rho+r},\quad
\Sigma=\delta/\ell_0,\quad K=c^2/\ell_0,\quad
\Phi_b=K\delta,\quad A_b=K(D-1).
\]

The response convention retained from README §16.1 is proper-velocity change per transported body second \(\tau\). For signed outward proper velocity \(U\), the radial equations are

\[
\boxed{\frac{dr}{d\tau}=DU,\qquad\frac{dU}{d\tau}=-A_b(r).}
\]

These equations apply to a radial test-body trajectory within the specified exterior map. They do not supply a distributed-source interior, angular dynamics, or a microscopic derivation of sourcing.

In the framework's terminology, the bounded coordinate velocity is

\[
v=U/\gamma,\qquad \gamma=\sqrt{1+U^2/c^2}.
\]

For the local stationary transport-time increment \(dt_s=\gamma d\tau\), the same trajectory obeys

\[
\frac{d\ell}{dt_s}=v,\quad
\frac{dr}{dt_s}=Dv,\quad
\frac{dU}{dt_s}=-\frac{A_b}{\gamma}.
\]

Thus the bounded coordinate velocity \(v\) is explicitly the transport-ruler velocity, not \(dr/dt_s\). The latter can exceed \(c\) as a coordinate rate. No global stationary time or gravitational clock factor has been inferred from this local conversion. In particular, comparing vector rates at different positions requires the specified transport convention; this radial system is the chosen effective response, not an automatic consequence of local special relativity.

## Gradient and escape checks

The exact chain rule gives

\[
-\partial_r\Phi_b=K(1-D^{-1})=A_b/D,
\qquad -\partial_\ell\Phi_b=A_b.
\]

It follows that

\[
\int_{\ell(r)}^\infty A_b\,d\ell=\Phi_b(r),\qquad
\boxed{\mathcal E_b=\frac{U^2}{2}-\Phi_b(r)=\text{constant}.}
\]

The invariant follows directly by differentiating along the two radial equations. It is the selected body-clock invariant, not the standard relativistic kinetic energy. Marginal escape has \(\mathcal E_b=0\), hence

\[
U_{\rm esc}=c\sqrt{2\Sigma},\qquad
v_{\rm esc}=c\sqrt{\frac{2\Sigma}{1+2\Sigma}}.
\]

The associated \(\gamma_{\rm esc}=\sqrt{1+2\Sigma}\) is a kinetic factor. It is not the shell ratio \(D\), nor an independently derived material clock factor.

For the same trajectory, \(A_s=A_b/\gamma(U)\). Substituting the same position-only \(K(D-1)\) for both \(A_s\) and \(A_b\) changes the dynamics; it is not a change of notation.

## Weak limit, transition and source calibration

For \(r\gg d\),

\[
A_b=\frac{c^2d^2}{2\ell_0r^2}+O(r^{-4}),\qquad
\Phi_b=\frac{c^2d^2}{2\ell_0r}+O(r^{-3}).
\]

The matching relation is \(d^2/\ell_0=2GM/c^2\). This fixes a combination of source and response parameters, not their separate values. The Earth-normalized numerical coefficient remains a working bulk calibration; it is not applied to redefine an elementary \(r_0\) displacement.

There is no gap near \(r=d\): the exact expressions give \(D=\sqrt2\), \(A_b=K(\sqrt2-1)\), and \(\delta=d(\sqrt2-1)\). As \(r\to0^+\), \(A_b\) diverges but \(\Phi_b\to Kd\). This is an exterior-map limit, not a prescription to continue through an extended body's centre.

The shell factor and escape depth cannot be identified even as functions in the exterior weak limit:

\[
D^2-1=\frac{d^2}{r^2},\qquad
2\Sigma\sim\frac{d^2}{\ell_0r}.
\]

The discrepant radial powers are the issue, not just a omitted higher-order term.

## Boundary and test-body placement

A material boundary must identify its coordinate. \(r=d\) means \(\rho=\sqrt2d\), whereas the limiting mapped sphere \(\rho=d\) means \(r=0\). For a test body's centre at a mapped gap \(h>0\) above the latter,

\[
r=\sqrt{h(2d+h)},\quad
D=\frac{d+h}{\sqrt{h(2d+h)}},\quad
\delta=\frac{d^2}{d+h+\sqrt{h(2d+h)}}.
\]

These stable expressions evaluate the field at a specified gap. They do not establish that a deformed proton can maintain that gap or a particular shape.

## What this changes in Dynamics

| Location | Checkpoint consequence |
|---|---|
| §1 and §2 cumulative field | Distinguish the historical coordinate-path integral from the selected compressed-radial depth; normalize dimensionless \(\Sigma\) explicitly |
| §2 weak acceleration | Retain as a leading exterior limit, not an exact strong-field expression |
| §4.3 radial coefficient | The written inverse-ruler interpretation differs from the ruler used here; reconcile the chart before assigning a metric coefficient |
| §4.3 and Appendix C | Remove reliance on \(D^2=1+2\Sigma\) as a geometric identity; the dependent metric expansion needs recalculation |
| Appendix B timing | Do not inherit an infinite clock-period limit from the historical depth definition |
| §4.4 and Appendices C/E | Orbit, higher-order optical and rotating-source claims await the metric/transport checkpoint; no revised numbers are asserted here |

For orientation, the Euclidean pullback of the spatial map alone is \(d\rho^2+\rho^2d\Omega^2=D^{-2}dr^2+D^2r^2d\Omega^2\). This is a coordinate-map identity, **not** a proposed spacetime metric or a replacement gravity law. It demonstrates why changing only \(g_{rr}\) in the existing metric would not reconcile all of its coordinate conventions.

## Checkpoint boundary and next step

The static radial convention is now explicit and checked. The next step is to derive or adapt the effective coordinate description so it reproduces this radial system while specifying nonradial transport. A full material clock model, microscopic intranuclear sourcing, and a general aggregation law are separate questions; they are not silently filled in by the escape gamma. Observable recalculation begins once the necessary adapters are established.

Validation: `verify_static_response.py` checks finite-difference map/depth/field derivatives across both regimes, a transformed improper escape integral, marginal escape trajectories, and the radial invariant for escaping and turning trajectories. It verifies the stipulated equations, not their empirical validity.
