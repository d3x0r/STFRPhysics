# Checkpoint 13: source-first, test-displacement-last composition

**Continuation:** [Checkpoint 14](cross-interaction-response.md) supplies the mutual-response representation already implicit in README §12.4 and the selected response potential. Centre translation does not require evaluating the body's own singular exterior gradient. The map-only limitation below remains valid, but is not an obstruction to the existing fixed-source interaction calculation.

7 October 2026. This implements the nearest-last ordering in Dynamics Appendix B.2 and `AI/STFR_Connection_Space_Displacement_Math_2.md` §3 for separated sources. It uses the square-root radial map, not the abandoned cube-root radial map. The calculation concerns exterior transport geometry; it does not use overlap energy or infer a new nuclear interaction.

## 1. Explicit centred composition

Put the large source at the reference origin and the test centre at reference position \(\mathbf b\ne0\). Define

\[
F_s(\mathbf x)=\sqrt{|\mathbf x|^2+d_s^2}\frac{\mathbf x}{|\mathbf x|},
\quad \mathbf B=F_s(\mathbf b),\quad
\mathbf u=F_s(\mathbf x)-\mathbf B,
\]
\[
H_t(\mathbf y)=\mathbf B+
\sqrt{|\mathbf y-\mathbf B|^2+d_t^2}
\frac{\mathbf y-\mathbf B}{|\mathbf y-\mathbf B|},
\qquad \boxed{F=H_t\circ F_s.}
\]

The nearby centre is transported with the background to \(\mathbf B\) before inserting its map. Keeping its untransported centre \(\mathbf b\) in the intermediate chart would describe a different placement. This recentering and holding \(d_t\) fixed as an intrinsic displacement scale in the intermediate chart are explicit implementation conventions; the ordering statement alone does not specify source-scale dressing.

Let \(E_s=\partial F_s/\partial\mathbf x\), \(E_t=\partial H_t/\partial\mathbf y\), and \(s=|\mathbf u|>0\). Each Jacobian has the existing radial-map form

\[
E_i=D_i I+(D_i^{-1}-D_i)\mathbf n_i\mathbf n_i^{\mathsf T},
\quad D_s=\sqrt{1+d_s^2/|\mathbf x|^2},\quad
D_t=\sqrt{1+d_t^2/s^2}.
\]

The chain rule gives the exact exterior result

\[
\boxed{J_F=E_tE_s,\qquad \det J_F=D_tD_s.}
\]

There is no additional free geometric coefficient. The factors must be evaluated at their respective stages, not at a common unmodified distance. The map is smooth only on the exterior branch away from either excluded centre; this fixed ordering is a local calculation around the small body, not a proof that a globally switched nearest-source ordering is smooth.

## 2. Radial and lateral patches behave differently

Where the two radial axes coincide, the local principal stretches are

\[
((D_sD_t)^{-1},D_sD_t,D_sD_t).
\]

Where the axes are perpendicular, choose the first axis along the large-source radial direction and the second along the test radial direction. The stretches are then

\[
(D_t/D_s,\ D_s/D_t,\ D_sD_t).
\]

For an oblique patch the matrices generally do not commute. The product can contain an orientation change as well as stretch; its principal stretches are its singular values, not simply its diagonal entries. This geometric orientation change is not automatically the velocity-composition Wigner rotation or another trajectory-steering impulse.

The test map's local scale is relevant through \(s/d_t\):

| Intermediate distance \(s/d_t\) | \(D_t\) | Test-radial multiplier \(1/D_t\) | Test-transverse multiplier \(D_t\) |
|---:|---:|---:|---:|
| 100 | 1.000050 | 0.999950 | 1.000050 |
| 10 | 1.004988 | 0.995037 | 1.004988 |
| 1 | 1.414214 | 0.707107 | 1.414214 |

These distances are measured around the test centre in the source-mapped chart. They are not the source-to-test surface gap of checkpoint 12. A small body can have appreciable local self-map deformation even when separated from the large source.

## 3. Why this does not directly give centre acceleration

At the test centre \(\mathbf u=0\), the exterior map has no single-valued vector limit: approaching from different directions gives different points of a sphere of radius \(d_t\) around \(\mathbf B\). Its radial Jacobian eigenvalue tends to zero while its tangential eigenvalues diverge. Consequently, evaluating \(E_t\) at the test centre and multiplying the centre acceleration by it is undefined.

The centre \(\mathbf B\) is a source anchor, not a regular exterior sample point. The map describes surrounding transport; a law for how that anchor moves must be supplied by the selected test-body response or derived from momentum/support exchange. It is not obtained by including the body's own exterior gradient as a centre force.

Under this particular insertion convention, the limiting test boundary is spherical **in the intermediate chart** as a set. That is a property of the constructed map. It is not a prediction that an existing material body stays spherical or instantaneously relaxes to that boundary. Transporting an already specified support shape through the source map is a different operation; its material evolution cannot be inferred from the set of exterior-map limiting points alone.

## 4. Gradient conversion and vector transport are distinct operations

The source-only potential in mapped coordinates is

\[
\Phi_s(\mathbf y)=K\left(|\mathbf y|-\sqrt{|\mathbf y|^2-d_s^2}\right),
\qquad \mathbf a_s=\nabla_y\Phi_s.
\]

On a regular exterior patch, suppose the test map is used to express that *same scalar* in \(\mathbf z=H_t(\mathbf y)\):

\[
\widetilde\Phi_s(\mathbf z)=\Phi_s(H_t^{-1}(\mathbf z)),\qquad
\boxed{\nabla_z\widetilde\Phi_s=E_t^{-\mathsf T}\nabla_y\Phi_s.}
\]

This is the covector chain rule. Its test-radial component is multiplied by \(D_t\), and its test-transverse components by \(1/D_t\). It is not automatically the physical acceleration in the new chart.

For a time-independent map and the same time parameter, transporting an already specified trajectory instead gives

\[
\ddot{\mathbf z}=E_t\ddot{\mathbf y}
+H_{t,yy}[\dot{\mathbf y},\dot{\mathbf y}].
\]

At instantaneous rest only the first term remains. Its multipliers are the reverse of the covector conversion. There is no contradiction: the transformed kinetic metric is \(g_z=E_t^{-\mathsf T}E_t^{-1}\), so raising the scalar gradient with its inverse gives

\[
g_z^{-1}\nabla_z\widetilde\Phi_s
=E_tE_t^{\mathsf T}E_t^{-\mathsf T}\mathbf a_s=E_t\mathbf a_s.
\]

Treating \(\nabla_z\widetilde\Phi_s\) as an acceleration with a newly Euclidean kinetic rule instead changes the dynamics. Such a rule might be motivated by a physical displacement theory, but it does not follow merely from the map's chain rule. This identifies the precise place where a geometric conversion could be mistaken for a new force.

The actual moving test map also has time-dependent centre and possibly scale. Its full trajectory conversion includes the time derivatives displayed in checkpoint 11. The static patch above isolates the issue without claiming those terms vanish during a trajectory.

## 5. Consequence for checkpoint 12

The ordered composition supplies definite local geometric changes. It does **not** on its own supply a unique correction to the previously stipulated source-only centre acceleration, nor justify replacing it by a self-gradient at the excluded centre. The external-field profile in checkpoint 12 remains the selected test-body baseline.

For a finite body, turning this geometry into a changed response requires a prescription for transporting or recomputing its response energy and inertia under insertion, or an equivalent constituent/support evolution law. No arbitrary choice is requested here: the task is to find or derive that prescription from the existing physics. The ordering statement and square-root map inspected here do not specify it by themselves.

This is a more precise boundary than saying that F–H coefficients are missing. Exterior geometry is calculable. The unresolved bridge is between that exterior composition and the motion/support of the distinct source producing the second map. Neither fusion physics nor an inter-body bond has been invoked.

Validation: `verify_two_displacement_composition.py` checks the composite Jacobian against finite differences at non-collinear exterior points, determinant multiplication, the scalar-gradient chain rule, and the kinetic-metric identity above. All quantities are evaluated away from excluded centres.
