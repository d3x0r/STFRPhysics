# Checkpoint 3: a nonradial baseline and its orbit test

7 October 2026. This checkpoint follows the [radial response](static-response-checkpoint.md) and [metric comparison](metric-response-checkpoint.md). It evaluates an explicit minimal extension, not a uniquely derived HPF direction-transport law.

## 1. Additional assumption

Use the full forward spatial map \(\mathbf y=\rho\hat{\mathbf r}\), \(\rho=\sqrt{r^2+d^2}>d\). Its radial and tangential intervals are \(d\rho=dr/D\) and \(\rho d\theta=Drd\theta\). For this baseline only, identify proper-velocity vectors at neighboring points using the ordinary Euclidean Cartesian basis of \(\mathbf y\), and stipulate central body-clock acceleration:

\[
\frac{d\mathbf y}{d\tau}=\mathbf U,\qquad
\frac{d\mathbf U}{d\tau}=-A(\rho)\hat{\mathbf y},\qquad
A(\rho)=K\left(\frac{\rho}{\sqrt{\rho^2-d^2}}-1\right),\quad K=c^2/\ell_0.
\]

This reproduces checkpoint 1 on radial trajectories. It introduces no extra frame-rotation, retardation, or velocity-dependent steering term. Such terms are not demonstrated absent from HPF; they are deliberately left out to determine what the retained static scalar response predicts by itself. README §13 and the Wigner-rotation companion paper already identify frame transport as relevant.

## 2. Planar equations and invariants

In polar components, \(U_\rho=\dot\rho\), \(U_\theta=\rho\dot\theta\), with dots denoting \(d/d\tau\):

\[
\dot\rho=U_\rho,\quad \dot\theta=U_\theta/\rho,\quad
\dot U_\rho=U_\theta^2/\rho-A,\quad
\dot U_\theta=-U_\rho U_\theta/\rho.
\]

Equivalently, \(\dot r=DU_\rho\). The basis-rotation terms are essential even in this minimal model. The conserved specific angular momentum and body-clock invariant are

\[
J=\rho U_\theta,\qquad
\mathcal E_b=\frac{U_\rho^2+U_\theta^2}{2}-\Phi(\rho),\qquad
\Phi=K\left(\rho-\sqrt{\rho^2-d^2}\right).
\]

These follow from the chosen central vector law, not from the old metric. A positive time reparameterization does not change the spatial orbit or its apsidal angle.

The local bounded coordinate components are \(v_i=U_i/\gamma\), with \(\gamma=\sqrt{1+|\mathbf U|^2/c^2}\). Under \(dt_s=\gamma d\tau\), the Cartesian coordinate-velocity derivative is

\[
\frac{d\mathbf v}{dt_s}=\frac{1}{\gamma^2}\left(\mathbf a_b-\frac{\mathbf v(\mathbf v\cdot\mathbf a_b)}{c^2}\right),
\qquad \mathbf a_b=-A\hat{\mathbf y}.
\]

Using the same scalar conversion for longitudinal and transverse components would be incorrect. A global time adapter remains separate from this local relation.

## 3. Circular orbits

At radius \(\rho_c\),

\[
U_c^2=\rho_c A_c,\qquad
v_c^2=\frac{\rho_c A_c}{1+\rho_c A_c/c^2},\qquad
\omega_\tau^2=A_c/\rho_c.
\]

The radial epicyclic frequency at fixed \(J\) is

\[
\kappa_\tau^2=\frac{dA}{d\rho}+\frac{3A}{\rho},\qquad
\frac{dA}{d\rho}=-K\frac{d^2}{r^3}.
\]

Writing \(D=\rho/r\),

\[
\boxed{\frac{\kappa_\tau^2}{\omega_\tau^2}=3-D(D+1).}
\]

Stable circular orbits in this baseline require \(D<(\sqrt{13}-1)/2\). The marginal value is at \(r/d\approx1.1976\), or \(\rho/d\approx1.5602\). Circular solutions farther inward are radially unstable under this closure. This is not yet an HPF compact-object prediction: changing directional transport can change this result.

## 4. Near-circular precession

For stable, sufficiently small radial oscillations, the angle per radial period is

\[
\Delta\theta=\frac{2\pi}{\sqrt{3-D(D+1)}},\qquad
\Delta\varpi=\Delta\theta-2\pi.
\]

The exact expression is an epicyclic (small-eccentricity) result, not an all-eccentricity formula. In the weak geometric regime,

\[
\boxed{\Delta\varpi\simeq\frac{3\pi d^2}{2\rho_c^2}
=\frac{3\pi GM\ell_0}{c^2\rho_c^2}.}
\]

This differs from the old paper's claimed near-circular coefficient \(6\pi GM/(c^2\rho_c)\). The ratio is \(\ell_0/(2\rho_c)\), not a universal constant. Thus the minimal forward-map central response retains Newtonian orbits at leading order but does not recover the old perihelion expression by itself. Fitting one radius would not establish agreement across orbital radii. No Mercury numerical prediction is made from this small-eccentricity comparison.

For arbitrary planar orbits, the Binet equation in \(w=1/\rho\) is

\[
\frac{d^2w}{d\theta^2}+w=\frac{A(1/w)}{J^2w^2}.
\]

With \(\mu=GM=Kd^2/2\), its weak expansion is

\[
w''+w=\frac{\mu}{J^2}\left(1+\frac34d^2w^2+O(d^4w^4)\right).
\]

The correction is not the old \(3\mu w^2/c^2\) term: its coefficient depends on \(J\) and the displacement scale. Converting \(U\) to bounded \(v\) does not add a missing precession to the same spatial trajectory.

## 5. Checkpoint outcome and next dependency

Completed: an explicit nonradial baseline, conservation laws, coordinate-velocity adapter, circular speed, radial stability, Binet equation, and conditional precession. A small-eccentricity orbit integration checks the epicyclic angle and both invariants.

Not established: that Cartesian identification in the forward mapped space is the framework's actual noncollinear transport. The next task is to derive the direction-transport contribution from the existing HPF/Wigner construction and its coupling to the spatially varying displacement. It must distinguish a change of local basis from an actual change of trajectory, reduce to the selected radial law, and state the resulting angular-momentum/energy balance. Adding a familiar precession coefficient by hand would not supply that derivation.

The old orbit and optical predictions remain pending. This checkpoint identifies exactly what the static scalar baseline supplies and where extra directional physics would have to enter.
