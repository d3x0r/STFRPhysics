# Checkpoint 6: magnitude-preserving trajectory steering

7 October 2026. Author clarification: relativistic addition gives the resulting velocity magnitude, and the external-field remainder additionally shifts the direction. The remainder therefore acts on translational velocity, not merely on basis or spin orientation. This resolves the missing operation identified in checkpoint 5; it does not retroactively make the basis-only test a trajectory-steering calculation.

## 1. Explicit local update

Retain checkpoint 3's forward mapped position \(\mathbf y\), proper velocity \(\mathbf U\), and baseline field \(\mathbf a_0=-A_b\hat{\mathbf y}\). For an increment of transported body time, first acquire

\[
\Delta\mathbf U=\mathbf a_0\Delta\tau,\qquad
\mathbf U_* =\mathbf U+\Delta\mathbf U.
\]

The resulting coordinate-speed magnitude is \(|\mathbf U_*|/\sqrt{1+|\mathbf U_*|^2/c^2}\). Then rotate the resulting direction:

\[
\boxed{\mathbf U_{\rm next}=\mathcal R(\Delta\boldsymbol W)\mathbf U_*.}
\]

An orthogonal rotation preserves the addition result's magnitude exactly. The infinitesimal external-field remainder is

\[
\Delta\boldsymbol W=\frac{\mathbf U\times\Delta\mathbf U}{c^2(\gamma+1)}+O(\Delta\tau^2),\qquad
\gamma=\sqrt{1+|\mathbf U|^2/c^2}.
\]

Here the increment is the acquired field impulse before the additional rotation. Feeding the already rotated velocity change back into this same remainder would instead define the implicit-feedback hypothesis considered in checkpoint 5.

The signed convention used for this implementation is additional turning in the acquired transverse impulse's sense: positive \(\mathbf U\times\Delta\mathbf U\). The word “additionally” is interpreted this way; reverse rotation would change the equations and must be stated if intended. A finite large kick still requires its ordered buildup, not use of this first-order formula as an exact finite angle.

## 2. Continuous limit

With position advanced using the steered velocity, the limiting equations are

\[
\dot{\mathbf y}=\mathbf U,\qquad
\boxed{\dot{\mathbf U}=\mathbf a_0+
\frac{(\mathbf U\times\mathbf a_0)\times\mathbf U}{c^2(\gamma+1)}.}
\]

Decompose \(\mathbf a_0\) parallel and perpendicular to the current velocity. Since \(|\mathbf U|^2/[c^2(\gamma+1)]=\gamma-1\),

\[
\boxed{\dot{\mathbf U}=\mathbf a_{0\parallel}+\gamma\mathbf a_{0\perp}.}
\]

The radial launch law is unchanged when velocity and field are collinear. Transverse turning is enhanced, while the instantaneous speed change remains determined by \(\mathbf U\cdot\mathbf a_0\). This is a different translational model from checkpoint 3's unsteered baseline.

## 3. Conserved quantities for the central static field

The additional term is perpendicular to \(\mathbf U\), so the previous invariant survives:

\[
\mathcal E_b=|\mathbf U|^2/2-\Phi_b=\text{constant}.
\]

Ordinary specific angular momentum \(\mathbf J=\mathbf y\times\mathbf U\) is generally not conserved. However,

\[
\dot{\mathbf J}=-\frac{\mathbf U\cdot\mathbf a_0}{c^2(\gamma+1)}\mathbf J,
\qquad
\dot\gamma=\frac{\mathbf U\cdot\mathbf a_0}{c^2\gamma},
\]

which gives the exact invariant

\[
\boxed{\mathbf J\,\frac{e^\gamma}{\gamma+1}=\text{constant}.}
\]

Numerical implementations should check \(\ln|J|+\gamma-\ln(\gamma+1)\) to avoid unnecessary exponentiation. The existence of this generalized invariant does not prove a particular microscopic momentum balance; it follows from the selected central effective equations.

## 4. Circular speed and next calculation

For circular motion the field is perpendicular to velocity, hence

\[
U_c^2=\rho A_b\gamma_c.
\]

Writing \(q=\rho A_b/c^2\) and \(z=U_c^2/c^2\),

\[
z=q\sqrt{1+z},\qquad
\boxed{z=\frac{q^2+q\sqrt{q^2+4}}2},\qquad
v_c^2/c^2=\frac{z}{1+z}.
\]

Checkpoint 3's precession and stability formulas assumed conservation of \(J\) and must not be reused here. The next step is to derive and integrate eccentric orbits using the generalized angular invariant. No new perihelion coefficient is asserted in this checkpoint.

## Validation

`verify_trajectory_steering.py` checks that the kick-then-rotation preserves the acquired magnitude, that its derivative converges to the stated vector law, and that both invariants are conserved during an eccentric orbit segment. This validates the implementation of the clarified operation; it does not establish empirical agreement for orbital precession.
