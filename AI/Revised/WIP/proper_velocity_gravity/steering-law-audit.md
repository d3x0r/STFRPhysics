# Checkpoint 5: what specifies actual trajectory steering?

7 October 2026. This audit follows [checkpoint 4](direction-transport-checkpoint.md). It examines the current noncollinear paper, Weak-field Observational Tests §6, the simulation methods note, the nine-body demo and its two-body shadow, the retained connection-space notes, and relevant optical working material. It is not a claim that every historical file or external graph has been exhausted.

## 1. Current evidence

The noncollinear paper supplies an external-field orientation remainder and distinguishes spin from orbital motion. Its orbital coefficient is attributed to the Dynamics metric. The simulation methods note repeats that metric route. The optical working material describes front steering from transverse propagation-burden gradients, but does not specify a massive-body translational update that closes the revised radial system.

Weak-field Observational Tests §6 does supply a tangential expression,

\[
F_\perp=\frac{GM}{r^2}\frac{L\dot r}{rc^2}.
\]

With \(L=r^2\dot\phi\), the expression has acceleration units rather than force units. Its proposed preceding identity also needs a sign convention: differentiating constant \(L\) gives \(\ddot\phi=-2L\dot r/r^3\), hence \(\tfrac12\ddot\phi(r/c)^2=-L\dot r/(rc^2)\), whereas the paper writes the positive value. Defining a lag angle as the negative of that change can reverse the sign, but that must be stated. The paper explicitly calls its three contributions an interpretation of the integrated metric result, not independent force terms to sum. Consequently this term cannot simply be imported as a validated additional acceleration.

The finite displacement still requires the correct radial and time adapters. No complete replacement for the old metric's trajectory equations has been found in the inspected sources.

## 2. The missing relation is specific

Let \(\mathbf a_0=-A_b\hat{\mathbf y}\) denote checkpoint 3's baseline. The missing translational statement is what determines

\[
\dot{\mathbf U}=\mathbf a_0+\mathbf S.
\]

The existing remainder determines an orientation increment from an acquired velocity increment. It does not uniquely determine whether \(\mathbf S\) exists, its sign, or whether that orientation rotates the existing velocity, the next impulse, or the transported basis. These operations yield different trajectories.

For example, consider only as a diagnostic the proposed feedback

\[
\mathbf S=s\,\boldsymbol\Omega\times\mathbf U,\qquad
\boldsymbol\Omega=\frac{\mathbf U\times\dot{\mathbf U}}{c^2(\gamma+1)},\qquad s=\pm1.
\]

Resolve acceleration parallel and perpendicular to \(\mathbf U\). The triple-product identity gives

\[
a_\parallel=a_{0\parallel},\qquad
\boxed{a_\perp=\frac{a_{0\perp}}{1-s(\gamma-1)}.}
\]

Thus the negative-sign version gives \(a_\perp=a_{0\perp}/\gamma\), while the positive-sign version gives \(a_\perp=a_{0\perp}/(2-\gamma)\), singular at \(\gamma=2\) for nonzero transverse forcing. Both reduce to the selected radial response for collinear motion, yet they have different nonradial behavior. This demonstrates why radial agreement cannot select the missing steering law. Neither candidate is adopted.

If instead the rotation rate is calculated from \(\mathbf a_0\) before feedback, the transverse factors are \(1+s(\gamma-1)\), again different. Ordering and the meaning of the impulse increment therefore matter as much as the rotation formula itself.

## 3. Simulation evidence and its limits

The shadow routine in `AI/stfr_nbody_sigma.html` uses, in displacement mode,

\[
\mathbf a_{\rm extra}=-\frac{3GM L^2}{c^2r^5}\mathbf r.
\]

In Schwarzschild mode it uses a magnitude \(3GM L^2/(c^2r^4)\) multiplied by \(-\mathbf r/r\). These are the same vector expression. Agreement between their shadow results is therefore an implementation identity, not an independent test of displacement-derived steering. A direct test of the extracted routine verifies this identity on several states.

The displayed `precession()` fits the angle history `lrl.angs`; the shadow update supplies that history. Thus the displayed precession statistic is not by itself a measurement of the full nine-body displacement branch. The latter also has the separate extra-radius discrepancy identified in checkpoint 4. No simulation code was changed during this audit.

## 4. Decision boundary

The completed checkpoints establish the static radial response and quantify one explicit nonradial baseline. They have not established the complete HPF orbit law. The next useful input is the intended operation connecting external-field transport to translation: what is rotated, relative to which frame, and before or after which impulse update? An explicit existing graph, equation or update sequence can settle this; a desired perihelion coefficient cannot.

Work on the static strong-field response can continue independently. No revision to radial escape follows from this audit, and the microscopic origin of displacement remains a separate question.
