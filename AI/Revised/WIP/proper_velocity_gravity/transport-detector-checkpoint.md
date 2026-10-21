# Checkpoint 9: static transport constraint and detector response

**Interpretation clarified by [checkpoint 11](constituent-bridge-audit.md).** The two detector prescriptions below are diagnostics, not freely selectable HPF mechanisms. A geometric interval change is not automatically an additional strain relative to material equilibrium. When motion is already evolved in realized coordinates, adding the same map's transport terms again double counts it. The narrower unresolved connection is configuration-dependent constituent binding and evolution, not the existence of an F–H mechanism.

7 October 2026. This continues checkpoint 8 by testing Dynamics Appendix B.4 and separating the response operations needed by Weak-field Observational Tests §§9.5–9.6. The static displacement remains primary. No wave stiffness, clock factor or radiation multiplier is fitted here.

## 1. What the static family requires of Appendix B.4

Appendix B.4 proposes, but does not specify, a scalar equation of the form

\[
c_{\rm eff}(\Sigma)^{-2}\Sigma_{tt}
-\nabla\cdot[\alpha(\Sigma)\nabla\Sigma]=4\pi G\rho_m/c^2.
\]

Use its reference-coordinate spatial operator and an exterior with no explicit source. For the revised static family

\[
\rho=\sqrt{r^2+d^2},\quad \Sigma=(\rho-r)/\ell_0,
\quad \Sigma_r=-\frac{\rho-r}{\ell_0\rho},
\]

the exterior equation requires constant radial flux. Matching \(\alpha\to1\) at infinity fixes

\[
r^2\alpha\Sigma_r=-\frac{d^2}{2\ell_0},\qquad
\boxed{\alpha_{\rm required}=\frac{\rho(\rho+r)}{2r^2}
=\frac{D(D+1)}2.}
\]

This is an exact static constraint under the stated scalar divergence ansatz. It is not a derivation of a dynamical constitutive law. It also does not establish that this flux equals microscopic mass for merged and distributed sources under the same calibration.

There is a useful obstruction: **a universal coefficient depending only on accumulated depth cannot give this entire family.** Put \(\delta=\ell_0\Sigma\). Then

\[
r=\frac{d^2-\delta^2}{2\delta},\qquad
D=\frac{d^2+\delta^2}{d^2-\delta^2}.
\]

At the same positive \(\Sigma\), different \(d>\delta\) require different \(D\) and different stiffness. For example, at \(\delta=1\), \(d=2\) requires \(\alpha=20/9\), while \(d=3\) requires \(\alpha=45/32\). Both have exactly the same accumulated depth if \(\ell_0\) is fixed. A coefficient fitted for one source is not universal across sources.

The existing local deformation state is therefore relevant information beyond scalar depth. A coefficient depending on that state, a tensor operator, another spatial measure, or explicit effective exterior sources can avoid this restricted obstruction. This calculation does not select between them. In particular, the spherical expression is not a multi-source composition rule.

The two expansion parameters also differ: \(D-1\) measures local deformation, whereas \(\Sigma\) measures normalized accumulated depth. \(r\sim d\) is not generally equivalent to \(\Sigma\sim1\); their relationship contains \(d/\ell_0\).

## 2. Static stiffness does not determine propagation speed

If the local deformation is retained as an independent state and the above coefficient is frozen on a slowly varying background, the principal scalar operator in B.4 has characteristic speed

\[
v_{\rm char}=c_{\rm eff}\sqrt{\alpha}.
\]

Thus its written \(c_{\rm eff}\) alone is not the characteristic speed. Specifying a characteristic speed would additionally constrain the time coefficient. If the deformation is instead eliminated in favor of gradients of \(\Sigma\), linearization can change the principal spatial operator; the frozen-coefficient expression is not then sufficient.

Neither this calculation nor the static flux fixes inertia of the medium, damping, source coupling, or the wave energy functional. The previously assumed scalar flux normalization cannot be validated from static equilibrium alone. This leaves transport as the clock convention; it identifies which time-dependent transport coefficients have not yet been supplied by that convention.

## 3. Two concrete response calculations give different polarizations

Work at first order about an undisplaced background with an initially resting detector. At this order reference and mapped lengths agree and the selected acceleration law reduces to \(\mathbf a=c^2\nabla\psi\), if the scalar disturbance \(\psi\) is coupled by the same gradient rule. This is a conditional extension of the static response, not a derived wave law. For

\[
\psi=f(t-\mathbf n\cdot\mathbf x/v_w),
\]

nearby free bodies with separation \(\boldsymbol\xi\) have

\[
\delta\ddot\xi_i=c^2\partial_i\partial_j\psi\,\xi_j
=\frac{c^2}{v_w^2}f''n_i n_j\xi_j.
\]

This coupling produces longitudinal relative acceleration and no transverse relative acceleration in the plane-wave limit. The additional velocity-direction steering is higher order for bodies initially at rest, so it does not change this first-order statement. Background fields, detector motion and wavefront curvature require further terms.

Alternatively, suppose a transported deformation directly produces realized separation strain

\[
e_{ij}=b(I-2\mathbf n\mathbf n^{\mathsf T})_{ij}.
\]

This is the static map's leading tensor shape, now expressly a conditional dynamical ansatz. It gives equal transverse strains \(+b,+b\) and longitudinal strain \(-b\). It contains transverse breathing together with longitudinal deformation. It is not the same response as the scalar-gradient calculation. A spatial metric strain would be \(h_{ij}=2e_{ij}\) at this order; silently identifying these amplitudes introduces another factor of two.

Moreover, assigning a tensor shape is not yet an evolution law for material endpoints. Whether freely moving matter follows that deformation, accelerates relative to it, or both must follow from a common transport prescription. Adding the two conditional responses without such a prescription could count the same effect twice.

For orthogonal equal arms with unit directions \(\mathbf p,\mathbf q\), the second ansatz gives the instantaneous geometric differential strain

\[
\frac{\delta L_p-\delta L_q}{L}
=-2b[(\mathbf p\cdot\mathbf n)^2-(\mathbf q\cdot\mathbf n)^2].
\]

It vanishes for propagation normal to the arm plane even though each transverse arm expands. A zero differential signal in that orientation does not imply zero deformation. This is a long-wavelength geometric calculation, not the completed optical response.

## 4. The optical branch supplies an explicit next connection

The nearby [optical exploration](../exploring_optical_dynamics.md) already organizes propagation through storage susceptibilities:

\[
n_{\rm eff}=\sqrt{(1+\chi_m)(1+\chi_e)},\qquad
\delta n=\tfrac12(\chi_m+\chi_e)
\]

at first order for its scalar constitutive case. This is a natural place to connect the dynamical displacement state to optical propagation. Tensor storage requires direction and polarization dependent versions. The note itself leaves the quantitative excitation/constitutive closure open.

In a fixed coordinate chart, with unperturbed stationary endpoints separated by \(L\mathbf p\), a first-order one-way travel-time perturbation is

\[
\delta T(t)=\frac{\mathbf p\cdot[\delta\mathbf x_B(t+L/c)-\delta\mathbf x_A(t)]}{c}
+\frac1c\int_0^L\delta n_{\mathbf p}(\mathbf x_A+s\mathbf p,t+s/c)\,ds.
\]

Here \(\delta n_{\mathbf p}\) is the complete coordinate optical path-cost perturbation in that chart. A deformation already included in it must not be inserted again as a second path-length correction. Round trips require both legs and the reflection event. Comparing phase additionally uses the emitter's accumulated oscillator phase along its transport history. A separately invented lapse is not required; an explicit transport-to-phase rule is.

## 5. Checkpoint result

The exact radial flux condition and the restricted failure of depth-only stiffness are new, concrete constraints on Appendix B. The detector calculations show precisely why the old longitudinal-wave claim and transverse-breathing claim are not interchangeable. Neither calculation rejects breathing; they specify different couplings whose choice must be resolved from the displacement/constitutive dynamics.

The next useful implementation is a common time-dependent local deformation state coupled to the storage pair and matter response. Its static limit must obey the constraint above, and its weak wave limit must yield endpoints and optical phase consistently. Until that connection is specified, no unique revised breathing amplitude or inspiral rate follows. The existing static escape and conditional orbit calculations are unaffected by this audit.

Validation: `verify_transport_constraint.py` checks radial flux across weak/strong regimes, equal-depth counterexamples, and the conditional arm response identities.
