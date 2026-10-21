# Checkpoint 7: eccentric orbits with additional direction steering

7 October 2026. This evaluates the author-clarified magnitude-first, direction-second operation as implemented in [checkpoint 6](trajectory-steering-checkpoint.md): explicit acquired field impulse, followed by additional rotation in that impulse's turning sense. It retains the forward mapped spatial ruler and body-clock radial response. The numbers below are predictions of that stated combination, not of every possible HPF transport closure.

## 1. Equations and exact invariants

Use mapped radius \(\rho=\sqrt{r^2+d^2}\), \(\mu=GM\), and \(d^2=2\mu\ell_0/c^2\). Then

\[
A=\frac{c^2}{\ell_0}\left(\frac{\rho}{r}-1\right)
=\frac{2\mu}{r(\rho+r)},\qquad
\Phi=\frac{2\mu}{\rho+r}.
\]

For \(U^2=U_\rho^2+U_\theta^2\) and \(\gamma=\sqrt{1+U^2/c^2}\), the steered equations in body time are

\[
\dot\rho=U_\rho,\quad \dot\theta=U_\theta/\rho,
\]
\[
\dot U_\rho=\frac{U_\theta^2}{\rho}-\gamma A
+(\gamma-1)A\frac{U_\rho^2}{U^2},\qquad
\dot U_\theta=-\frac{U_\rho U_\theta}{\rho}
+(\gamma-1)A\frac{U_\rho U_\theta}{U^2}.
\]

At zero velocity the Cartesian formula has the regular limit \(\dot{\mathbf U}=\mathbf a_0\); apparent \(U^2\) denominators above are removable using \((\gamma-1)/U^2=1/[c^2(\gamma+1)]\).

The invariants are

\[
E=U^2/2-\Phi,\qquad H=J\frac{e^\gamma}{\gamma+1},\qquad J=\rho U_\theta.
\]

## 2. Exact orbit equation

For \(w=1/\rho\), with primes denoting derivatives with respect to orbital angle,

\[
\boxed{w''+w=\frac{\gamma A(1/w)}{J(w)^2w^2}},
\]
\[
\gamma(w)=\sqrt{1+2[E+\Phi(1/w)]/c^2},\qquad
J(w)=H(\gamma+1)e^{-\gamma}.
\]

When converting \(\ddot\rho\) to angular derivatives, the term from \(\dot J\) cancels the radial projection of the added steering term. It must not be dropped by assuming constant \(J\).

## 3. Circular stability

The circular speed remains as derived in checkpoint 6: \(U_c^2=\rho A\gamma_c\). Linearizing about that circular solution gives

\[
\boxed{\frac{\kappa_\tau^2}{\omega_\tau^2}
=1-D(D+1)+\frac1{\gamma_c}+\frac1{\gamma_c^3}},
\qquad \omega_\tau=U_c/\rho.
\]

Positive ratio means radial stability; zero is marginal; negative means instability. For a stable nearly circular orbit the apsidal angle is \(2\pi\omega_\tau/\kappa_\tau\). Unlike the unsteered baseline, the stability boundary depends on \(\gamma_c\), hence on the source/response normalization as well as \(r/d\). The old numerical boundary from checkpoint 3 is not reused.

## 4. Weak eccentric-orbit advance

At leading order in \(\mu/(c^2p)\) and \(d^2/p^2\), where \(p=a(1-e^2)\) labels the underlying Newtonian ellipse,

\[
\boxed{\Delta\varpi=
\frac{2\pi\mu}{c^2p}+\frac{3\pi d^2}{2p^2}
+O\!\left(\frac{\mu^2}{c^4p^2},\frac{\mu d^2}{c^2p^3},\frac{d^4}{p^4}\right).}
\]

This follows by expanding \(\gamma/J^2\) at fixed \(H\). If \(J_0\) absorbs its constant normalization, the Binet equation is

\[
w''+w=\frac{\mu}{J_0^2}
\left[1+\frac{2E}{c^2}+\frac{2\mu w}{c^2}+\frac34d^2w^2+\cdots\right].
\]

The constant term shifts the reference orbital scale; the terms proportional to \(w\) and \(w^2\) give the displayed first-order precession. Both the added turning and its induced angular-momentum evolution contribute. Consequently simply adding the orientation angle per orbit to the unsteered perihelion angle would not produce this result.

Relative to the old paper's \(6\pi\mu/(c^2p)\), the leading ratio is

\[
\frac{\Delta\varpi_{\rm selected}}{\Delta\varpi_{\rm old}}
=\frac13+\frac{\ell_0}{2p}.
\]

For fixed Earth-normalized \(\ell_0\), the second term is small on planetary orbital scales. Changing that normalization to match a single orbit would not establish a universal recovery across different \(p\).

## 5. Numerical evaluation

`verify_steered_orbits.py` integrates the exact Binet system using fourth-order Runge–Kutta. It checks eccentricities 0.001, 0.20563 and 0.5 while halving the compactness; deviations from the leading formula decrease accordingly. It also checks the exact circular linearization.

For the isolated Mercury-like example, use the repository demo's constants: \(G=6.674\times10^{-11}\), solar mass \(1.989\times10^{30}\,\mathrm{kg}\), \(c=2.998\times10^8\,\mathrm{m/s}\), AU \(=1.496\times10^{11}\,\mathrm m\), \(a=0.38710\) AU, \(e=0.20563\), and working \(\ell_0=6{,}371{,}000\,\mathrm m\). Initial conditions use the underlying Newtonian perihelion radius and speed as proper-velocity input; finite relativistic element differences do not change the first-order comparison.

| Calculation | Advance, arcseconds per century |
|---|---:|
| Exact steered Binet integration | 14.333372 |
| Leading analytical expression | 14.333371 |
| Old coefficient, same constants | 42.992706 |

The numerical advance is approximately \(1.6734810\times10^{-7}\) radians per radial period. Halving the angular integration step changed the converted rate by about \(3.8\times10^{-6}\) arcseconds per century. Century conversion uses the leading Keplerian period and a 365.25-day year; it is not a derivation of the unresolved global clock adapter. The per-orbit angle comparison is independent of that adapter.

This is not a full solar-system fit: it excludes other planets, solar multipoles and any additional source-motion or field-history response. It does establish that the selected static response plus the explicit additional direction rotation does not recover the previously claimed isolated-orbit coefficient.

## 6. Consequence and next scope

The author clarification supplies actual trajectory steering and produces a definite result. It does not, in this explicit implementation, supply the full old perihelion coefficient. The radial escape results remain unchanged because collinear motion has no added rotation.

The next audit should address which remaining physical ingredient the framework actually prescribes: source-motion/retarded response, a different mapping between the force input and transported proper-velocity increment, or an alternative directional update order. Such an ingredient must be derived and tested; an extra precession term must not be inserted solely to reach the old number. Strong-field and observational claims should retain the stated assumptions while this is resolved.
