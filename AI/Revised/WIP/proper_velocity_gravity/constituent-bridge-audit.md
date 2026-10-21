# Checkpoint 11: constituent motion, binding and the ruler bridge

**Scope correction following the author's clarification.** The overlap law examined here concerns near-contact/merger behavior. Its lack of a finite-separation minimum is not a missing prerequisite for the external motion of two separated bodies. [Checkpoint 12](separated-test-displacement.md) calculates that motion and the finite external response across a small test body directly from the selected field. Internal binding enters when predicting its deformation or stress; no bond between the source and test body is required.

7 October 2026. This revisits checkpoints 9–10 after the author's clarification: the problem is another displacement's response, not merely a photon's path cost. The target is to identify what the existing model determines before introducing any new constitutive assumption.

## 1. Finding: a partial bridge already exists

The geometry-to-interval bridge is explicit. README §7 gives a realized separation \(\boldsymbol\ell=E\boldsymbol\xi\) and its differentiated transport rule. §15 gives the anisotropic map, its volume factor, and even an equivalent electric/magnetic tensor representation. The constants-recovery paper §§1 and 3 supplies the storage/cycle interpretation; excitation dynamics §§3–7 supplies an individual support functional and an overlap-dependent occupancy energy.

Therefore the missing bridge should not be described as an absent F–H mechanism or an arbitrary choice between deformation and acceleration. The narrower unresolved connection is the evolution of interacting constituent positions and their preferred separations on the changing background, in a common transport/time convention.

This audit inspected those papers, `AI/EM/stfr_material_response_research_program.md`, the foundational/local-geometry texts, the n-body displacement visualization, and the resonant-cavity demonstration. Targeted searches of AI, math and freeSpaceTest for binding potentials, rest lengths, springs and elastic response did not identify an implementation closing that constituent problem. This is a bounded search result, not proof that no other file contains relevant work.

## 2. Geometric transport is not an additional acceleration

For a locally affine separation map, the README's rule is

\[
\boldsymbol\ell=E(t)\boldsymbol\xi,
\qquad
\ddot{\boldsymbol\ell}=E\ddot{\boldsymbol\xi}
+2\dot E\dot{\boldsymbol\xi}+\ddot E\boldsymbol\xi.
\]

All derivatives must use the same parameter. If a constituent response already specifies the realized relative acceleration \(\mathbf b=\ddot{\boldsymbol\ell}\), the reference-coordinate equation is necessarily

\[
\boxed{\ddot{\boldsymbol\xi}=E^{-1}
\left(\mathbf b-2\dot E\dot{\boldsymbol\xi}-\ddot E\boldsymbol\xi\right).}
\]

These are two descriptions of the same motion. Evolving \(\boldsymbol\ell\) with \(\mathbf b\) and then applying another geometric acceleration from the same map would count the conversion twice. The map can be physically motivated; this chain-rule statement does not reduce the whole framework to a coordinate relabeling or derive \(\mathbf b\) from geometry alone.

For a full differentiable map \(\mathbf y=F(\mathbf x,t)\), the corresponding identity is

\[
\ddot{\mathbf y}=F_{,x}\ddot{\mathbf x}
+F_{,xx}[\dot{\mathbf x},\dot{\mathbf x}]
+2F_{,xt}\dot{\mathbf x}+F_{,tt}.
\]

The static spherical map \(F(\mathbf x)=\sqrt{r^2+d^2}\,\mathbf x/r\) is available in the exterior. An arbitrary time-dependent multi-source field is not automatically the Jacobian of one global map. The affine identity applies locally when such a map is specified; it is not a derivation of the missing field evolution.

Checkpoints 1, 3 and 6 already formulate motion using the compressed radial ruler or mapped positions and proper velocity. Their predictions cannot acquire a second correction merely by reapplying the same forward map. A change in the actual constituent-response law would be a different matter.

## 3. What a ruler requires, and what can already be stated

Suppose a constituent pair has an interaction energy \(W(\ell)\), where \(\ell=|\boldsymbol\ell|\) is realized separation, and a stable minimum at \(\ell=L_0\). This is a representation of whatever binding physics the model supplies, not an assertion that HPF has a new independent spring force.

In a small region with approximately uniform \(E\), the equilibrium condition in reference coordinates is simply

\[
|E\boldsymbol\xi|=L_0.
\]

A chain of such relations explains how a ruler can retain a locally measured length while its reference-coordinate span changes. No arbitrary displacement-to-F–H coefficient is necessary for this conversion. What remains to derive is whether the underlying interaction preserves \(L_0\), changes it, or changes the excitation itself under that environment. The author's local co-deformation assumption supports the common-response case but does not give the finite body's stress dynamics by itself.

It is also essential to transform the whole dynamics. For static uniform \(E\), a kinetic energy expressed in reference coordinates is \(m\dot{\mathbf x}^{\mathsf T}E^{\mathsf T}E\dot{\mathbf x}/2\). The reference force is \(-\nabla_x W=-E^{\mathsf T}\nabla_y W\). Using that force with an unchanged Euclidean reference mass matrix would produce the wrong acceleration. The mass matrix and force together give the expected inverse-map conversion.

In a weak, slowly moving local patch with a common time convention, a bound radial pair can be represented by

\[
\ddot\ell=a_{\rm ext}(y_2)-a_{\rm ext}(y_1)
-\left(\frac1{m_1}+\frac1{m_2}\right)W'(\ell).
\]

For \(W'(L_0)=0\), positive \(W''(L_0)\), and small extension \(z=\ell-L_0\), this becomes

\[
\ddot z+\omega_b^2z\simeq T(t)(L_0+z),\qquad
\omega_b^2=\left(\frac1{m_1}+\frac1{m_2}\right)W''(L_0),
\]

where \(T=\partial a_{\rm ext}/\partial y\). The external gradient and the binding response combine in one equation. Geometric conversion is then applied consistently to that equation, not added as another independent forcing term. If the preferred separation itself evolves, its derivatives enter when defining \(z\); they must be obtained from the interaction/closure response. This weak local form is not a strong-field synchronization prescription for separated body clocks.

## 4. The overlap law supplies energy information but not yet a stable bond

Excitation dynamics §6 gives, for equal inputs and \(u=s/(2R)\),

\[
Q(u)=2^{2/(3-u)}Q_0,\qquad 0\le u\le1.
\]

Combining with its minimized support energy, holding the other coefficients and reference scales fixed, gives

\[
E_*(u)=mc^2\sqrt{ABQ_0}\,2^{1/(3-u)},\qquad
\frac{d\ln E_*}{du}=\frac{\ln2}{(3-u)^2}>0.
\]

Thus this contribution alone favors smaller separation; it has no stationary finite-separation minimum inside the overlap interval. It could contribute to binding, but it does not alone determine a bond length or restoring response. This does not disprove the support model: \(A,B,R\), other interactions, and source structure may respond as well. Their dependence on constituent configuration is the part needed to finish that calculation.

The material-response research program explicitly distinguishes transport displacement from material storage loading and retains electronic/interacting structure as unfinished work. Its transmission-line analogy already explains why more path across the same storage need not mean new primitive F or H values. That distinction should be preserved rather than filling the gap with arbitrary material susceptibilities.

The inspected n-body displacement shader prescribes source trajectories and visualizes their retarded fields; it does not evolve a bound ruler from constituent interactions. The cavity demonstration calculates signal interception on specified moving geometry; it does not determine that geometry from binding. Neither closes the missing mechanical step.

## 5. Correction to the earlier checkpoint language

Checkpoint 9's scalar-gradient and imposed-deformation examples are different diagnostic prescriptions, not two established freely selectable mechanisms in HPF. In particular, \(E-I\) is a geometric interval change relative to the reference chart; it is not automatically an extra physical strain of matter relative to its local binding equilibrium. Calling it a detector strain requires that additional identification. The examples remain useful for exposing what was assumed, but must not be summed to obtain a breathing prediction.

Checkpoint 10's symbolic support coefficients belong to the excitation draft's provisional parameterization. They demonstrate what that parameterization has not fixed, not that nature or the author must choose arbitrary new coefficients. The constants and displacement rules may determine them once the constituent interaction bridge is worked out.

The present status is therefore: interval transport is supplied; constituent external acceleration is supplied under the selected working response; individual support and overlap energy are partially supplied; configuration-dependent binding and its consistent time evolution have not been closed in the inspected material. Deriving the last step may eliminate the apparent freedom rather than add another postulate.

## 6. Verification and next derivation

`verify_constituent_bridge.py` evolves the same illustrative bound separation in realized coordinates and through a prescribed time-dependent map. Agreement checks the transport bookkeeping, not the validity of a microscopic spring model. A deliberately double-counted evolution is used as a negative control. The script also checks the monotonic overlap-energy derivative.

The next physically meaningful derivation is to form the total energy/response for a minimal pair of interacting excitations, including the configuration dependence of support and occupancy, and locate a stable separation if one exists. Its derivative and curvature would supply the pair response above. This does not require first defining the ultimate substance of F or H, and it should not be replaced by choosing an arbitrary breathing coefficient.
