# Checkpoint 10: excitation closure, acceleration and wave readout

**Interpretation clarified by [checkpoint 11](constituent-bridge-audit.md).** The undetermined coefficients in this draft parameterization are not established independent physical choices. The existing displacement and constituent interaction rules may determine them. The geometry-to-interval bridge already exists; the narrower unresolved calculation is binding/equilibrium and its evolution on that background. The conditional examples below must not be added to an already mapped constituent response as another deformation force.

7 October 2026. This connects checkpoint 9 to the equations already present in `excitation_dynamics.md` §§3.3–4.3 and `WIP/exploring_optical_dynamics.md`. It derives constraints and a conditional weak-wave response from those equations; it does not assign the remaining constitutive coefficients by fitting an observable.

## 1. The excitation paper already supplies a closure connection

Its support functional is

\[
E(a)=\frac{mc^2}{2}\left[A\frac{\ell_C}{a}+BQ\frac{a}{\ell_C}\right],
\qquad a_* =\ell_C\sqrt{\frac{A}{BQ}},\qquad
E_* =mc^2\sqrt{ABQ}.
\]

Here \(A=\alpha_{\rm tr}\), \(B=\alpha_{\rm cyc}\), and \(Q=Q_{\rm occ}\). These are excitation-support coefficients, **not** Appendix B's displacement-field stiffness \(\alpha\). Work about a homogeneous reference state normalized to \(A=B=Q=1\), with fixed baseline \(m,\ell_C\). Define small fractional perturbations \(a_T=\delta A/A\), \(a_C=\delta B/B\), \(q=\delta Q/Q\). Then

\[
s\equiv\frac{\delta a_*}{a_*}=\frac{a_T-a_C-q}{2},\qquad
k\equiv\frac{\delta E_*}{mc^2}=\frac{a_T+a_C+q}{2}.
\]

Consequently \(a_T=k+s\) and \(a_C+q=k-s\). Support change and cycle-energy change are distinct combinations of the same coefficients. An energy/clock calibration alone cannot fix support deformation.

The paper identifies the carrier frequency through \(\hbar_{\rm eff}\omega_{\rm cl}\propto E_*\). Thus, in the convention used for that energy,

\[
\frac{\delta\omega_{\rm cl}}{\omega_{\rm cl}}=k-rac{\delta\hbar_{\rm eff}}{\hbar_{\rm eff}}.
\]

The shorter expression \(\delta\omega/\omega=k\) assumes fixed \(\hbar_{\rm eff}\). Neither expression alone converts a local cycle into a comparison between separated transport histories. This is an existing clock/closure mechanism whose coefficient and comparison conventions need reconciliation, not an absence of clocks.

## 2. The slow-envelope potential constrains double counting

The written potential in excitation §3.3 is

\[
V=-mc^2\Sigma-mc^2\chi+\delta E_*,\qquad
\chi=\tfrac12(\chi_e+\chi_m).
\]

At leading weak-field, slow-motion order, with homogeneous baseline inertial mass and kinetic operator, Hamilton's equations give

\[
\boxed{\mathbf a=c^2\nabla(\Sigma+\chi-k).}
\]

Terms from the perturbed kinetic tensor involve momentum and do not supply a first-order acceleration for a body initially at rest. This statement does not extend that approximation to fast motion or the strong field. It also presumes all three energy terms are expressed in the same time/energy convention.

For a pure displacement background the excitation paper distinguishes material loading from displacement, so set the separate material susceptibilities to zero. To preserve the already adopted leading response \(\mathbf a=c^2\nabla\Sigma\) **while retaining that potential split literally**, one needs \(\nabla k=0\). If \(a_T=t_\Sigma\Sigma\), \(a_C=c_\Sigma\Sigma\), and \(q=q_\Sigma\Sigma\) with constant coefficients, this requires

\[
t_\Sigma+c_\Sigma+q_\Sigma=0.
\]

This is a compatibility condition, not an imposed new material law. A nonzero closure contribution may instead already be included in the calibrated \(-mc^2\Sigma\) term, in which case adding it again is incorrect. Alternatively it can represent genuinely additional material response, requiring a revised calibration. A change of energy/time convention also needs an explicit conversion before taking the gradient. The current equations do not choose among these readings.

Even with \(k=0\), support can change: \(a_T=b\Sigma\), \(a_C=-b\Sigma\), \(q=0\) gives \(s=b\Sigma\) for any small-response coefficient \(b\), while preserving the same leading acceleration. Taking all three zero preserves that acceleration with \(s=0\). These examples demonstrate nonuniqueness; neither is adopted as HPF's response.

If displacement is represented through effective storage susceptibilities for optical bookkeeping, those are not automatically the independent *material* susceptibilities in this potential. Counting the same displacement in both \(\Sigma\) and \(\chi\) would duplicate its contribution unless the decomposition expressly removes it from one term.

## 3. Equilibrium support is not instantaneous wave following

The support functional fixes its static stiffness:

\[
K_a=\left.\frac{\partial^2E}{\partial a^2}\right|_{a_*}
=\frac{mc^2 A\ell_C}{a_*^3}>0.
\]

It does not specify inertia or damping of that internal support coordinate. To exhibit the missing quantities, a diagnostic linear response could be written

\[
I_a\ddot\eta+C_a\dot\eta+K_a(\eta-\eta_{\rm eq})=0,
\qquad \eta_{\rm eq}=a_*s.
\]

This oscillator is not derived from the substrate or adopted as a replacement theory. It shows what an equilibrium minimization alone leaves out. With the convention \(e^{-i\omega t}\), its transfer function would be

\[
\frac{\eta(\omega)}{\eta_{\rm eq}(\omega)}
=\frac{K_a}{K_a-I_a\omega^2-i C_a\omega}.
\]

Many different wave responses have the same equilibrium minimum. Even if an individual excitation changes support size, this does not by itself specify the center-to-center separation of free masses, a bonded rod's length, or the response of an entire interferometer. Those require the corresponding interaction/support equations. This is also the mathematical distinction between a tide's equilibrium shape and its continued motion after forcing changes.

## 4. A concrete conditional plane-wave limit

Let \(\psi=f(t-\mathbf n\cdot\mathbf x/v_w)\) be a small disturbance. Parameterize the *written weak potential* by \(\delta\Sigma=\psi\), \(\delta\chi=C_\chi\psi\), \(\delta k=C_k\psi\), and set \(C_g=1+C_\chi-C_k\). Its relative acceleration for initially resting proof masses is

\[
\delta\ddot\xi_i=\frac{c^2 C_g}{v_w^2}f''n_i n_j\xi_j.
\]

For a pulse with \(f=f'=0\) before arrival, the first-order displacement is

\[
\delta\xi_i=\frac{c^2 C_g}{v_w^2}f\,n_i n_j\xi_j.
\]

It returns to zero after a compact pulse under these particular initial conditions and ideal free-body assumptions. There is no transverse center motion from this scalar-gradient channel. This conclusion does not remove internal support response, direct transport deformation, or optical propagation effects.

The optical note separately gives \(\delta n=(\chi_e^{\rm opt}+\chi_m^{\rm opt})/2\) in its scalar case. These optical coefficients must be connected to the same disturbance rather than identified by notation alone with the material potential terms. Write \(\delta n=C_n\psi\) as an explicitly uncalibrated transfer coefficient in a fixed chart.

For propagation normal to an equal-arm detector plane, stationary endpoints, and this isotropic optical coupling, both arms sample the same field history. With arm length \(L\) and return time \(t\), each round trip has

\[
\delta T(t)=C_n\int_{t-2L/c}^{t}f(u)\,du.
\]

Each path can change while their difference vanishes. For a local oscillator with fractional frequency perturbation \(C_\omega f\), define the readout as current local phase minus the phase of the returning emission. Its perturbation is

\[
\delta\varphi(t)=\omega_0\delta T(t)
+\omega_0 C_\omega\int_{t-2L/c}^{t}f(u)\,du.
\]

For equal arms the common oscillator term cancels in the differential measurement, as does this isotropic normal-incidence path term. Oblique incidence, unequal arms, anisotropic storage and endpoint motion require the two separate path integrals from checkpoint 9. No claim of universal detector insensitivity follows.

## 5. What this resolves and what remains

The existing excitation functional supplies a real bridge: summed coefficient changes determine closure energy, whereas their difference determines support. Its stated potential also supplies an explicit acceleration compatibility condition. Thus the missing information can be named precisely: the displacement-induced coefficient changes, the convention separating closure energy from the calibrated potential, the dynamical response of support, and the direction-dependent optical storage coupling.

The static field does not determine these independently. Choosing arbitrary values would create a new model and could change the weak acceleration already calibrated. The metric eikonal in excitation §3.1 also inherits checkpoint 2's restriction if it is used to reproduce the revised response at all velocities; this weak calculation does not repair that incompatibility.

No new breathing amplitude or binary decay rate is claimed. The next derivation should specify the transport/storage coefficient map from the actual F–H rule, with a declared energy/time convention, then evaluate its support and optical responses using the formulas above. This is now a specific coefficient-and-response problem rather than a request to invent a clock or assume a polarization.

Validation: `verify_constitutive_response.py` checks the exact support minimum against its first-order expansion, the energy/support nonuniqueness, support stiffness, and a direct two-leg optical path integral against the round-trip expression.

