# Checkpoint 8: source retardation and the breathing-mode dependency

7 October 2026. This audits Dynamics §§3.3–4.2 and Weak-field Observational Tests §§6 and 9 against the revised static response. It does not invent a nonlinear wave equation to obtain an expected orbit or radiation result.

## 1. Retardation of a stationary source

The written source integral is

\[
\Sigma(\mathbf x,t)=\frac{G}{c^2}\int
\frac{\rho_m(\mathbf x',t-|\mathbf x-\mathbf x'|/c)}{|\mathbf x-\mathbf x'|}\,d^3x'.
\]

Here \(\rho_m\) must be mass-equivalent density; using energy density requires another factor \(c^{-2}\). For a stationary density the time argument changes nothing. A moving test body samples that static field at its current position. Its previous position is not substituted for the source's retarded position by this integral.

Consequently the written source-retardation rule adds no correction to checkpoint 7's fixed-source test. This is consistent with Dynamics §4.1, which explicitly treats the planet as moving in the Sun's fixed field. The weak-field paper's probe-orbit “retardation mismatch” is not derived simply by delaying that stationary source. A separate finite-response/history rule for the probe or medium would have to be stated.

Recoil, other moving sources and a preferred-frame moving background require distinct calculations; they are not declared absent. Their magnitude or sign cannot be assumed to supply the missing coefficient. A common inertial boost is also not interchangeable with an added static central force.

## 2. The written linear wave equation is a weak-field closure

For the selected exact static depth \(\Sigma=(\sqrt{r^2+d^2}-r)/\ell_0\), in ordinary Euclidean reference coordinates,

\[
\boxed{\nabla^2\Sigma=\frac1{\ell_0}
\left[\frac{d^2}{(r^2+d^2)^{3/2}}+
\frac2{\sqrt{r^2+d^2}}-\frac2r\right]\ne0}
\]

outside the source for finite \(d\). Its weak leading residual is \(-3d^4/(4\ell_0r^5)\). Thus the exact finite-displacement depth is not the vacuum solution of the old flat-coordinate linear Poisson equation, although its leading \(d^2/(2\ell_0r)\) term is harmonic.

The old retarded \(1/r\) integral and linear wave equation can be retained as weak-field approximations. An exact strong-field dynamical continuation needs a specified nonlinear field equation, effective distributed source, or different transport operator with the required static solution. These are different choices; this audit selects none. The finite static map alone does not determine radiation propagation or energy flux.

## 3. Local deformation versus accumulated depth in the radiation section

Let \(\mathbf n\) be the source radial direction. The static local Jacobian is

\[
E=D I+(D^{-1}-D)\mathbf n\mathbf n^{\mathsf T}.
\]

With \(\epsilon=D-1\), its leading perturbation is

\[
E-I=\epsilon(I-2\mathbf n\mathbf n^{\mathsf T})+O(\epsilon^2),
\qquad \epsilon=\frac{\delta}{r}=\frac{\ell_0\Sigma}{r}.
\]

Weak-field §9.1 instead assigns \(\Sigma\) as that amplitude. The distinction is already present in the leading radial dependence. A metric perturbation, local Jacobian perturbation, and accumulated scalar wave need separately defined couplings. The static relation above is not a license to turn a radiation-zone \(1/r\) wave into a strain simply by substituting it into the static formula; that relation must come from the dynamical transport law.

## 4. Correct angular integral under the paper's scalar-wave assumptions

Retain, conditionally, the paper's weak retarded scalar quadrupole amplitude and its stated flux normalization:

\[
\delta\Sigma=\frac{G}{2c^4R}n_i n_j\ddot Q_{ij},
\qquad F=\frac{c^3}{4\pi G}(\partial_t\delta\Sigma)^2.
\]

Here \(R\) is a radiation-zone distance, not a material boundary. Define \(T_{ij}=\dddot Q_{ij}\). The angular identity

\[
\int n_i n_j n_k n_l\,d\Omega
=\frac{4\pi}{15}(\delta_{ij}\delta_{kl}+\delta_{ik}\delta_{jl}+\delta_{il}\delta_{jk})
\]

gives

\[
\boxed{P_\Sigma=\frac{G}{60c^5}
\left\langle(\operatorname{tr}T)^2+2T_{ij}T_{ij}\right\rangle.}
\]

With \(T^{\rm STF}_{ij}=T_{ij}-\delta_{ij}\operatorname{tr}T/3\), equivalently

\[
\boxed{P_\Sigma=\frac{G}{30c^5}\langle T^{\rm STF}_{ij}T^{\rm STF}_{ij}\rangle
+\frac{G}{36c^5}\langle(\operatorname{tr}T)^2\rangle.}
\]

The paper's \(G\langle T_{ij}T_{ij}\rangle/(30c^5)\) is sufficient when the trace derivative vanishes. It omits a term for a time-varying trace. This correction follows from the paper's own stated amplitude and flux; that flux normalization itself has not been derived from the revised strong-field dynamics.

For a Newtonian circular binary the trace of the mass quadrupole is constant, so this particular trace contribution vanishes. Eccentric radial motion can make it nonzero. The corrected orbit changes the source trajectories and therefore their quadrupole derivatives, but checkpoint 7's single-test-body orbit is not a complete comparable-mass binary model.

## 5. Six components are not six established radiating modes

A symmetric tensor has six entries, but an ansatz determined by a single scalar and a prescribed direction does not thereby contain six independent equal-energy waves. For example, the static leading shape \(I-2\mathbf n\mathbf n^{\mathsf T}\) has squared Frobenius norm 3, independent of direction; counting its six entries does not give a power multiplier of six. This example is not a proposal to replace six with three. Field dynamics, constraints, independent amplitudes and the energy functional must determine the power.

Accordingly §9.4's multiplication by six is not a derivation of total radiated power. The dependent exact inspiral match in §9.4a must remain unconfirmed until the radiative degrees of freedom and their normalization are established.

## 6. Source trace and measured breathing polarization

There are three separate questions:

1. Does source motion produce a time-dependent quadrupole trace?
2. Does the chosen field equation propagate a corresponding scalar disturbance, and with what energy?
3. Does that disturbance produce transverse isotropic detector motion, longitudinal motion, or some other propagation/endpoint response?

The first two do not by themselves answer the third. A scalar field sourced by a traceless quadrupole can still have nonzero directional radiation. Conversely, a varying source trace does not uniquely identify a detector's breathing polarization. The old §9.5 metric-polarization assignment inherits the metric coefficients now under revision.

Therefore the revised result is not “breathing disappears” or “breathing increases.” The source-trace channel remains present under the stated scalar assumptions, its scalar power bookkeeping is corrected above, and the detector polarization and total inspiral rate require a consistent wave-to-matter/optics coupling.

## 7. What is ready and what comes next

Ready: the fixed-source retardation conclusion, exact static Poisson residual, corrected conditional scalar power integral, and explicit dependency list. `verify_radiation_integral.py` checks the angular power identity for trace-free, trace-only and mixed tensors, and the static residual by finite differences.

Next: derive the weak dynamical transport/operator and detector response with the correct static limit before claiming a corrected breathing amplitude or binary decay rate. Independently, any added probe-history response proposed to complete orbital advance needs its own equation. Neither is supplied by a fitted factor or by delaying a stationary source.
