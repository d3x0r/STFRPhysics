# Checkpoint 12: a separated small displacement in an external field

7 October 2026. This evaluates the selected static response for a small distinct body near a larger displacement. The support regions remain separated. No overlap, merger or inter-body bond is needed to calculate the external response. The overlap audit in checkpoint 11 concerns a different regime and is not a prerequisite here.

## 1. Placement and scope

Let the source displacement be \(d_s\), the test displacement be \(d_t\), and the source material boundary be at mapped radius \(\rho_s\ge d_s\). Let \(a\) be the test body's **realized radial half-span** at the instant being evaluated and \(h>0\) the gap between the source boundary and the test body's near face. Then

\[
\rho_- =\rho_s+h,\qquad
\rho_c=\rho_s+h+a,\qquad
\rho_+=\rho_s+h+2a.
\]

Thus \(h\) is a surface-to-surface gap; it is not the centre's height and not the reference radius \(r\). Earlier point evaluations used a centre height as their gap variable. They should not be silently reused as finite-body placements.

For the formal limiting source surface \(\rho_s=d_s\), define centre height \(q=h+a\), so \(\rho_c=d_s+q\). An extended planet instead has its actual material boundary; its exterior central replacement is not used inside that boundary.

The test body's primitive displacement \(d_t\) is not converted through the bulk mass calibration. Nor is its deformed radial half-span automatically equal to \(d_t\). Values \(a=d_t=r_0\) below are declared instantaneous sampling examples, not a derivation of a proton's shape or equilibrium. For a specified small reference half-span \(a_{\rm ref}\), the local forward map instead gives \(a\simeq a_{\rm ref}/D_c\) when the map varies little across that span. These are different input conventions.

The calculation retains the source-only test-body approximation: source recoil, test-body feedback on the source map, and its self-field response are not included. In particular, a tiny mass ratio does not by itself establish that microscopic support feedback is negligible. This calculation is the external-field baseline to which that response can be connected.

## 2. Centre motion is already specified

Write \(d=d_s\), \(r=\sqrt{\rho^2-d^2}\), and \(K=c^2/\ell_0\). The selected equations give

\[
A(\rho)=K\left(\frac{\rho}{\sqrt{\rho^2-d^2}}-1\right),\qquad
\frac{dU_c}{d\tau_c}=-A(\rho_c),\quad
\frac{d\rho_c}{d\tau_c}=U_c.
\]

No inter-body binding model is needed for this radial test trajectory. The acceleration coefficient contains the source parameters and the adopted normalization, not the test mass. The adopted \(p=mU\) relation converts this to force if that quantity is needed.

Use stable formulas near the limiting surface:

\[
r(q)=\sqrt{q(2d+q)},\quad
\delta(q)=\frac{d^2}{d+q+r(q)},\quad
A(q)=K\frac{\delta(q)}{r(q)}.
\]

They avoid evaluating \(\rho^2-d^2\) by subtraction or losing a microscopic gap when adding it to a macroscopic \(d\). The centre escape result remains

\[
U_{\rm esc}=c\sqrt{2\delta(q)/\ell_0},\qquad
v_{\rm esc}=c\sqrt{\frac{2\delta(q)/\ell_0}{1+2\delta(q)/\ell_0}}.
\]

The latter is coordinate escape velocity in the framework's terminology. Its finite limit does not imply a small local acceleration gradient.

## 3. Differential external response

The exact radial derivative with respect to the realized radial interval is

\[
\boxed{\frac{dA}{d\rho}=-\frac{K d^2}{r^3}.}
\]

Consequently the near face has greater inward acceleration magnitude. For a freely sampled radial separation, the external contribution increases that separation: the near portion falls inward faster. The finite difference is

\[
\boxed{\Delta A=A(\rho_-)-A(\rho_+)>0,}
\qquad
\Delta A\simeq 2a\frac{K d^2}{r_c^3}
\]

when a local linear approximation is valid. The exact finite expression is preferable near the boundary.

For the adopted mapped-space central response \(\mathbf a=-A\mathbf n\), the instantaneous spatial derivative at zero initial proper velocity has eigenvalues

\[
\lambda_r=\frac{K d^2}{r^3},\qquad
\lambda_t=-\frac{A}{\rho},\qquad
\frac{\lambda_r}{|\lambda_t|}=D(D+1).
\]

This uses the neighboring-vector identification specified by the nonradial working model. At zero velocity the additional direction-steering term vanishes. The ratio tends to 2 in the weak field but grows in the deep field. Radial stretching and transverse convergence of free-body trajectories are therefore not equal to the radial compression and transverse expansion of the geometric map itself. Applying the map again as an extra force would double count coordinate transport, as checkpoint 11 shows.

These are derivatives of the stipulated body-clock response coefficients. Treating separated trajectories as one time history requires a common time/transport prescription. In a weak local patch they give the usual leading relative-acceleration calculation. In the deep field the spatial profile and endpoint rates can still be evaluated exactly, but they are not by themselves a synchronized detector strain or stress prediction.

## 4. The controlling near-surface length is the gap

For \(q\ll d\),

\[
A(q)\simeq K\sqrt{\frac{d}{2q}},\qquad
\frac{\lambda_r}{A}\simeq\frac1{2q}.
\]

Thus a body's differential response is small when its radial half-span is small compared with its centre height:

\[
\frac{\Delta A}{A_c}\simeq\frac{a}{q}=\frac{a}{h+a}
\quad(a\ll q\ll d).
\]

A body can be tiny compared with the source and still be large compared with the field's variation length. For a finite span in the same deep regime, retaining endpoint evaluation gives

\[
\boxed{\frac{\Delta A}{A_c}\simeq
\sqrt{h+a}\left(\frac1{\sqrt h}-\frac1{\sqrt{h+2a}}\right).}
\]

At \(h=100a\), this is approximately 0.009902. At \(h=a\), it is approximately 0.597717; the linear approximation would give 0.5 and is no longer adequate. Both placements have nonzero separation between supports. The near-contact case is illustrative only, not a claim that a nucleus remains intact or that its electrical interactions are negligible there.

## 5. Numerical examples under the existing working normalization

Use \(c=3\times10^8\) m/s, \(\ell_0=6371000\) m and \(a=r_0=1.2187\times10^{-15}\) m. The two large source displacements are the previously discussed solar-scale effective candidate and the approximately light-second candidate. Each table entry assumes its source boundary is the limiting mapped sphere \(\rho_s=d_s\). Applying the Earth-normalized response to these compact sources remains conditional; this is not a new calibration or a claim about observed compact-object surfaces.

| Source displacement (m) | Surface gap \(h/r_0\) | Centre \(A_c\) (m/s²) | \(\Delta A\) (m/s²) | \(\Delta A/A_c\) | Coordinate \(v_{\rm esc}/c\) |
|---:|---:|---:|---:|---:|---:|
| 137087 | 100 | 1.054166e19 | 1.043793e17 | 0.009902 | 0.20312340 |
| 137087 | 1 | 7.491256e19 | 4.477651e19 | 0.597717 | 0.20312340 |
| 2.84e8 | 100 | 4.798108e20 | 4.750893e18 | 0.009902 | 0.99443847 |
| 2.84e8 | 1 | 3.409696e21 | 2.038033e21 | 0.597717 | 0.99443847 |

For comparison, at Earth's reference surface radius 6371000 m with \(d=237.501817708\) m, the same response gives \(A\simeq9.81575193\) m/s² and \(\lambda_r\simeq3.081385\times10^{-6}\) s⁻². Across a realized span \(2r_0\), the external acceleration difference is approximately \(7.510568\times10^{-21}\) m/s². No central-map extrapolation into the Earth is used.

Centre acceleration is not automatically the exact mass-averaged acceleration of a finite body. As one explicit averaging example, a uniform radial line has

\[
\overline A=\frac1{2a}\int_{\rho_-}^{\rho_+}A(\rho)\,d\rho
=K\frac{\delta_-+\delta_+}{r_-+r_+}.
\]

This stable expression follows from the same field, without a binding law. An actual three-dimensional body's average requires its realized mass distribution and a common rate convention.

## 6. What is established without fusion or material closure

The selected response already determines the centre test trajectory, escape requirement, external spatial gradient, and finite endpoint difference. There is no missing inter-body bond calculation for these quantities. Positive nuclear charge belongs in a separate electrical interaction when charged bodies are being modeled; this displacement-only calculation does not assert their total acceleration or determine their separation.

Internal support becomes necessary for the next question: how the body maintains or changes its size and shape under that nonuniform response. The field calculation supplies the external input to that problem. It does not require the two source supports to merge, and the overlap law should not be used as a substitute for separated-body response.

Validation: `verify_separated_test_body.py` checks the radial derivative, radial/transverse ratio, exact finite-line average against quadrature, and convergence of the finite difference to the local gradient. It also generates the table with gap-stable arithmetic.
