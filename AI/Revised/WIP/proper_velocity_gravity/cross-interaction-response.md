# Checkpoint 14: mutual interaction without isolated self-acceleration

7 October 2026. The author's clarification is to treat the combined interaction as multiplicative while not using a body's own isolated gradient to accelerate its centre. README §12.4 already supplies an interaction-energy representation of that idea. This checkpoint connects it to the separated-body and tidal calculations, rather than evaluating the singular self-map at the centre.

## 1. The product already present in the README

For weak-field separation \(R\), the README defines

\[
h_i(R)=\sqrt{Gm_i/(c^2R)},\qquad
V_{12}=-c^2\sqrt{m_1m_2}\,h_1h_2=-\frac{Gm_1m_2}{R}.
\]

The product encodes interaction energy, and differentiating with respect to separation gives the attractive force. Neither isolated self-gradient is used. In centre coordinates \(\mathbf B_1,\mathbf B_2\), translation invariance gives \(\mathbf F_1=-\mathbf F_2\) for this static pair energy.

An isolated self-energy that depends on internal structure but not absolute centre position has zero derivative under rigid translation. It can affect inertia and internal support without generating isolated translational acceleration. This is consistent with the author's distinction. An external environment can change that internal energy; such a change belongs in the interaction response, not in an isolated self-force. Retarded systems may also exchange momentum with the field; this static argument does not remove that possibility.

The constants-recovery paper §2.1 uses another factorization, \((gm_1/R)(gm_2/R)=Gm_1m_2/R^2\) with \(g=\sqrt G\). In SI this is a force magnitude, and each factor has units of square root of force, not dimensionless depth. Differentiating this product again would give an \(R^{-3}\) dependence. It cannot simultaneously be the dimensionless cumulative depth and the potential whose derivative produces that same force. The README energy product resolves the bookkeeping while preserving the multiplicative reading. Also, for positive depth \(\Sigma\propto1/R\), its gradient points inward, so the adopted attractive convention is \(+c^2\nabla\Sigma\).

There are therefore distinct products with distinct roles: the matrix product \(E_tE_s\) transports geometry; a scalar amplitude product can encode interaction energy; a force-amplitude product can directly encode force magnitude. Multiplication alone does not make them interchangeable.

## 2. The selected exact test response has an interaction functional

For a prescribed static source use the already adopted response potential

\[
\Phi_s(\rho)=K\left(\rho-\sqrt{\rho^2-d_s^2}\right),\qquad
K=c^2/\ell_0,\qquad \mathbf a_s=\nabla\Phi_s.
\]

For a point test mass, the response energy is \(V_{s,t}=-m_t\Phi_s\). Its derivative reproduces the stipulated source response exactly. In the weak limit this becomes \(-GM_sm_t/\rho\) when \(d_s^2/\ell_0=2GM_s/c^2\), agreeing with the README's two-source product.

This is an energy representation of the selected body-clock force law: \(m_tU^2/2-m_t\Phi_s\) is its radial invariant. It is not automatically the full relativistic energy or a symmetric comparable-mass Hamiltonian in one global time. The source is held fixed here. No primitive test displacement is converted through the bulk calibration, and no new strong-field symmetric pair formula is asserted.

For an instantaneous fixed distribution of test mass \(dm(\boldsymbol\eta)\) around its mass centre \(\mathbf B\), the same prescription gives

\[
\boxed{V_{s,t}(\mathbf B)=-\int\Phi_s(\mathbf B+\boldsymbol\eta)\,dm,}
\]
\[
\boxed{\mathbf F_{s,t}=-\nabla_B V_{s,t}
=\int\mathbf a_s(\mathbf B+\boldsymbol\eta)\,dm.}
\]

The derivative holds the instantaneous internal configuration fixed. It is a virtual translation, not an assumption of permanent rigidity. A body whose support readjusts can require additional configuration-dependent energy terms. For a fully equilibrated internal state, one should differentiate the total minimized energy, not add selected pieces twice.

This functional provides the separated-body translation bridge under the adopted response and a common local rate convention. The body's isolated self-field is absent. It does not need to be evaluated at the centre. This narrows checkpoint 13's conclusion: the map alone does not supply centre dynamics, but the already stipulated response potential does supply a consistent test-body interaction representation.

## 3. Translation and tides follow from the same interaction

Let \(M_t=\int dm\), \(\int\boldsymbol\eta\,dm=0\), and define the second moment

\[
S_{jk}=M_t^{-1}\int\eta_j\eta_k\,dm.
\]

Expanding a smooth source field about the centre yields

\[
\frac{F_i}{M_t}=a_i(\mathbf B)
+\frac12 S_{jk}\partial_j\partial_k a_i(\mathbf B)+\cdots.
\]

The first-order term vanishes by the mass-centre definition. In contrast, differences between nearby portions begin at first order:

\[
\delta a_i=(\partial_j a_i)\eta_j+\cdots.
\]

Thus a body can have appreciable differential response while its mean acceleration remains close to the centre value. This is the precise connection to the tidal calculation: bulk translation and nonuniform response come from derivatives of the same external interaction, with no separate self-acceleration mechanism.

For a symmetric uniform radial line of half-span \(a\),

\[
\overline A=A_c+\frac{a^2}{6}A_c''+O(a^4),\qquad
\Delta A=2a(-A_c')+O(a^3).
\]

For the exact field,

\[
A'=-Kd_s^2/r^3,\qquad A''=3Kd_s^2\rho/r^5.
\]

Near the limiting surface, with centre height \(q\), \(A\propto q^{-1/2}\), giving

\[
\frac{\overline A-A_c}{A_c}\simeq\frac{a^2}{8q^2},\qquad
\frac{\Delta A}{A_c}\simeq\frac{a}{q}.
\]

The exact near-surface line-average ratio is

\[
\frac{\overline A}{A_c}\simeq
\frac{2\sqrt q}{\sqrt{q+a}+\sqrt{q-a}},\qquad q=h+a.
\]

At surface gap \(h=100a\), the mean acceleration differs from the centre by about 0.001225%, although the near/far spread is about 0.9902%. At \(h=a\), the mean differs by about 3.53%, while the spread is about 59.77%. These are uniform-line sampling results, not a proton mass-distribution or shape prediction.

## 4. What is and is not closed

The weak two-source multiplicative interaction, absence of isolated translational self-force, exact prescribed-source test response, and finite-body sampling now fit together. The reason not to evaluate the self-map at its centre is not an obstacle to this calculation; it is consistent with using interaction rather than isolated self-gradient for translation.

What remains open is a strong-field comparable-source interaction with reciprocal backreaction and consistent time/energy transport, and the internal evolution of a finite test body if its mass distribution changes. Neither is needed to define the instantaneous external sampling above. This checkpoint supplies no extra correction to the point-test law and no revised wave-emission or breathing amplitude.

Validation: `verify_cross_interaction.py` differentiates the finite-body response energy and compares it with averaged acceleration, verifies the centre-moment expansion, and checks the near-surface ratios against the exact finite-source expression.
