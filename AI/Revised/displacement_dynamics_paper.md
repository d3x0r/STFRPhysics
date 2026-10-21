# The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response

*Working paper — consolidated 19 October 2026. Static displacement and its response are primary; retardation extends that construction to moving sources.*

## Abstract

This paper distinguishes the exact square-root displacement map from the adopted exterior transport and motion rules. The map gives radial compression, tangential expansion and a bounded accumulated depth. The exterior closure uses an exponential lapse and an isotropic spatial coefficient, recovering the Newtonian limit and giving the full leading Mercury perihelion advance, optical bending and delay, and geodetic spin precession. These predictions are verified by orbit, ray and spin integration. Escape and tidal response are expressed in the same closure variables. Weak retarded scalar and rotating-source descriptions identify the additional dynamics needed for radiation, comparable-source motion and frame dragging. The exact strong-field continuation of the exterior closure is kept distinct from the bounded-depth near-source construction.

## 1. Foundational Postulate and Scope

The framework treats intra-nuclear excitation dynamics as sources of displacement of the transport-supporting structure; mass-energy is the macroscopic bookkeeping of that sourcing. Matter evolves within that structure, and changes of the displacement are assumed to propagate causally through the medium. This separates excitation dynamics from displacement dynamics without declaring them independent physical substances.

The static exterior map is the geometric starting point. The response convention specified below is an additional working law, not a consequence of a spatial Jacobian alone. Its mathematical consistency is checked; its complete microscopic derivation and empirical validation remain separate questions.

**Scope of results.** The map identities and the consequences of the exterior constitutive postulates are explicit mathematical results. The exterior closure predicts approximately 42.99 arcseconds per century for Mercury, optical-cost coefficient two, and the leading geodetic precession. A microscopic explanation of these adopted response rules is not a prerequisite for computing their predictions. The remaining strong-field specification concerns how the bounded map depth and its material rulers are related to the exterior transport variables. Comparable-source backreaction, radiation energy and detector response, and the rotating-source coupling are separate dynamical questions.

## 2. Static Equilibrium Geometry and the Cumulative Field

### 2.1 Coordinates and normalization

The notation separates source size, local deformation and accumulated depth:

| Symbol | Definition and role | Units |
| --- | --- | --- |
| \(d\), \(d_b=d_{\rm eff}(m_b,r_b)\) | Source displacement parameter; body-specific effective value | Length |
| \(D(r;d)=\sqrt{1+d^2/r^2}\) | Local tangential stretch factor; reciprocal radial factor | Dimensionless |
| \(E\) | Single-source local deformation Jacobian, \(\operatorname{diag}(D^{-1},D,D)\) | Dimensionless matrix |
| \(J_F\) | Ordered composite Jacobian \(E_tE_s\) | Dimensionless matrix |
| \(\Sigma(r;d,\ell_0)\) | Map depth \((\sqrt{r^2+d^2}-r)/\ell_0\) | Dimensionless |
| \(\Sigma_b(r)\) | The same map depth evaluated at \(d=d_b,\ell_0=r_b\) | Dimensionless |
| \(S(R)\) | Adopted static exterior depth \(GM/(c^2R)\) | Dimensionless |
| \(S_{\rm ret}(\mathbf x,t)\) | Weak retarded source field of §4.4 | Dimensionless |

Uppercase \(D\) is never the body-displacement function here. It is a scalar
factor, not the Jacobian matrix, although \(\det E=D\) for this map.
The body depth is a specialization,
\(\Sigma_b(r)=\Sigma(r;d_{\rm eff}(m_b,r_b),r_b)\), not an additional field.
The map depth and exterior depth have the same leading weak limit; they
are not identified as exact functions.

Let \(d>0\) be a fixed source displacement, \(r>0\) the reference radius, and

\[
\rho=\sqrt{r^2+d^2},\qquad D=\rho/r,\qquad
d\ell=d\rho=dr/D.
\]

The forward local deformation is

\[
E=\operatorname{diag}(D^{-1},D,D),\qquad \det E=D.
\]

The square-root map is the adopted shell-relocation geometry. A source volume label \(4\pi d^3/3\) does not derive it by constant-volume shell conservation. No cube-root radial map is used.

With a fixed normalization length \(\ell_0>0\), define

\[
\delta=\rho-r=\frac{d^2}{\rho+r},\qquad
\Sigma=\delta/\ell_0,\qquad K=c^2/\ell_0,\qquad \Phi=K\delta.
\]

Here \(\delta\) has length units, \(\Sigma\) is dimensionless, \(K\) has acceleration units, and \(\Phi\) has squared-velocity units. Local deformation \(D-1\) and accumulated depth \(\Sigma\) are different quantities.

For a spherical body's effective bulk displacement, introduce the shorthand

\[
\boxed{d_b=d_{\rm eff}(m_b,r_b)
=\sqrt{\frac{2Gm_{b_{kg}} r_b}{c^2}}=r_0 \sqrt{m_b r_b},
\qquad r_0= 1.2187\ \mathrm{fm}}
\]

Here \(r_b>0\) is the body's specified extent in the reference-radius
convention, not the observation radius \(r\). \(m_b\) is the mass in grams, \(r_b\) is the body extent radius in meters. For a fixed static body,
\(d_b\) is constant, and its map and normalized depth are

\[
\rho_b(r)=\sqrt{r^2+d_b^2},\qquad
\delta_b(r)=\frac{d_b^2}{\sqrt{r^2+d_b^2}+r},\qquad
\Sigma_b(r)=\frac{\delta_b(r)}{r_b}.
\]

This body-specific normalization sets \(\ell_0=r_b\). It gives
\(\Sigma_b\sim Gm_b/(c^2r)\) far from the source without a universal
Earth-radius calibration. The definition in terms of \(G\) is dimensional;
when expressing it through the constants-recovery \(r_0\) convention,
the mass-unit conversion coefficient remains outside \(r_0^2\).
This is an effective aggregate prescription, not a derivation of a
constituent's intrinsic displacement from its own mass; although it does have a relation of nucleon density within the body comparing the radius of the body with its mass. A resolved shell
or other extended distribution still requires its constituent arrangement;
the bulk shorthand does not prescribe its interior field.

### 2.2 Compressed-ruler and reference-coordinate integrals

The selected depth is

\[
\ell_0\Sigma=\int_{\rho}^{\infty}(D-1)\,d\rho'
=\int_r^\infty(1-D^{-1})\,dr'=\rho-r.
\]

Integrating over the reference-coordinate interval instead defines a distinct function:

\[
\Delta_{\rm coord}=\int_r^\infty(D-1)\,dr'
=d\operatorname{asinh}(d/r)-(\rho-r).
\]

Both integrals approach \(d^2/(2r)\) far from the source. The historical position-only response work integral uses the compressed-ruler depth \(\delta\). The reference-coordinate integral diverges logarithmically inward, while \(\delta\to d\) is finite. Also, \(D^2-1=d^2/r^2\) and \(2\Sigma\sim d^2/(\ell_0r)\) have different exterior radial dependence.

### 2.3 Adopted exterior response and escape

For the exterior closure, use a distinct isotropic radius \(R\), proper
radial interval \(d\ell_{\rm ext}\), and depth \(S\):

\[
S=\frac{GM}{c^2R},\quad B=1+2S,\quad N=e^{-S},\qquad
 ds^2=-N^2c^2dt^2+B(dR^2+R^2d\Omega^2),\quad
 d\ell_{\rm ext}=\sqrt B\,dR.
\]

The symbols \(r,\rho,\ell,\Sigma\) in §§2.1–2.2 describe the displacement
map; they are not silently identified with \(R,\ell_{\rm ext},S\).
The exterior rule is adopted as a constitutive postulate. With outward-positive
radial proper velocity \(U=d\ell_{\rm ext}/d\tau\),

\[
\gamma=\sqrt{1+U^2/c^2},\qquad e=N\gamma=\mathrm{constant},\qquad
\boxed{\frac{dU}{d\tau}=c^2\gamma^2 S_{,\ell_{\rm ext}}
=-\frac{GM}{R^2\sqrt B}\gamma^2.}
\]

Marginal escape has \(e=1\), hence

\[
U_{\rm esc}=c\sqrt{e^{2S}-1},\qquad
\gamma_{\rm esc}=e^S,\qquad v_{\rm esc}=c\sqrt{1-e^{-2S}}.
\]

The framework's bounded velocity \(v=U/\gamma\) uses static local distance
and time. The global metric-coordinate rate is \(dR/dt=Nv/\sqrt B\).
The earlier position-only rule \(dU/d\tau=-K(D-1)\), its invariant
\(U^2/2-\Phi\), and its square-root escape gamma are historical response
calculations, retained in the static-displacement note. They are not added
to the adopted geodesic response.

### 2.4 Weak limit and exact-continuation scope

The map depth has \(\Sigma\sim d^2/(2\ell_0r)\). Its weak exterior matching
uses \(d^2/\ell_0=2GM/c^2\), with the radial labels agreeing at leading
order. For the body shorthand in §2.1, this relation holds with
\(d=d_b\) and \(\ell_0=r_b\). This bulk calibration does not redefine
the primitive nucleon displacement.

The closure gives \(A\sim GM/R^2\), \(U_{\rm esc}^2\sim2GM/R\), and
\(N=1-GM/(c^2R)+\cdots\). Its exact continuation with \(S=GM/(c^2R)\)
has \(N>0\) for every finite depth but unbounded dilation as \(R\to0\).
In contrast, the map depth in §2.2 is bounded by \(d/\ell_0\).
A bounded-depth continuation must specify its relation to the exterior
ruler before its acceleration or orbit can be evaluated. This is a question
about the exact functions and their coordinate conversion, not a requirement
to derive a microscopic ontology before using the postulates.

For the stated exterior continuation, the local static circular speed is

\[
\frac{v_{\rm orb}^2}{c^2}=\frac{S(1+2S)}{1+S}.
\]

The circular null orbit lies at \(S=1/\sqrt2\). Existence of a timelike
circular orbit at smaller depth does not establish its stability. Replacing
\(B=1+2S\) by \(e^{2S}\) leaves the first-order spatial coefficient intact
but changes the exact strong-field results.

### 2.5 Body depth, local deformation and conditional near-source response

Define the surface compactness \(s_b=Gm_b/(c^2r_b)\). The body map gives

\[
\Sigma_b(r_b)=\sqrt{1+2s_b}-1,\qquad
\lim_{r\to0}\Sigma_b(r)=\frac{d_b}{r_b}=\sqrt{2s_b}.
\]

Thus the surface depth equals \(s_b\) only to leading weak-field order.
The ratio \(d_b/r\) measures local deformation, whereas \(d_b/r_b\)
bounds accumulated depth. Strong local compression can coexist with shallow
depth. The formal inward limit is a property of the single-map continuation;
it is not an interior solution for a resolved material body.

If the exponential lapse and radial energy rule are continued using this
depth and the compressed map ruler, then

\[
N_b=e^{-\Sigma_b},\quad e=N_b\gamma,\quad d\ell=dr/D,
\qquad
\boxed{\frac{dU}{d\tau}
=c^2\gamma^2\Sigma_{b,\ell}
=-\frac{c^2\gamma^2}{r_b}(D-1)},\qquad
D=\sqrt{1+d_b^2/r^2}.
\]

The weak radial limit is \(-\gamma^2Gm_b/r^2\), reducing to Newtonian
acceleration for slow motion. Marginal escape obeys

\[
U_{\rm esc}=c\sqrt{e^{2\Sigma_b}-1},\qquad
v_{\rm esc}=c\sqrt{1-e^{-2\Sigma_b}}.
\]

At fixed positive \(m_b,r_b\), the limiting depth, dilation and escape
speeds are finite, but the inward acceleration scales as
\(-c^2\gamma^2d_b/(r_b r)\). Finite accumulated depth does not bound
its derivative with respect to a compressed radial ruler.

This is a conditional radial continuation, not a matched replacement for
§2.3. For example, identifying \(R=r\) and instead retaining the exterior
ruler prescription \(d\ell=\sqrt{1+2\Sigma_b}\,dr\) gives

\[
\frac{dU}{d\tau}
=-\frac{c^2\gamma^2}{r_b}
\frac{1-r/\rho_b}{\sqrt{1+2\Sigma_b}},
\]

whose radial magnitude has a finite inward limit. The relation between the
two rulers must therefore be established before selecting a strong-field
response. Neither radial calculation supplies a full nonradial transport
law or establishes a horizon. The circular null orbit stated in §2.4
belongs specifically to that exterior metric continuation; visibility of
the far side of a luminous disk requires connecting bent transport paths,
not necessarily a circular null orbit.

For fixed \(r_b\), the maximum depth vanishes as \(m_b\to0\). If mass
and extent both vary, their ratio \(m_b/r_b\) controls that limit. In
particular, \(r_s\ll r_b\) implies \(d_b\ll r_b\): the effective bulk
prescription does not identify an isolated proton's nuclear radius with
its gravitationally calibrated displacement.

## 3. Separated Sources and Mutual Response

### 3.1 Interaction without isolated translational self-force

In the weak field a two-source interaction representation is

\[
h_i(R)=\sqrt{Gm_i/(c^2R)},\qquad
V_{12}=-c^2\sqrt{m_1m_2}\,h_1h_2=-Gm_1m_2/R.
\]

Differentiating this interaction energy gives the mutual force. An isolated self-energy invariant under rigid translation gives no centre force. This does not remove internal self-support or environment-dependent changes of that support.

For the historical position-only response in a prescribed source field, the test-body functional was

\[
V_{s,t}(\mathbf B)=-\int\Phi_s(\mathbf B+\boldsymbol\eta)\,dm,
\qquad \mathbf F_{s,t}=\int\nabla\Phi_s(\mathbf B+\boldsymbol\eta)\,dm.
\]

The derivative holds the instantaneous internal configuration fixed. It describes that historical response in a common local rate convention. Its leading weak interaction remains useful, but it is not the velocity-dependent exterior geodesic action or a fully relativistic comparable-source energy law. No isolated test self-gradient is evaluated at its centre.

### 3.2 Finite extent and tides

For neighboring freely falling particles initially at rest relative to the
static frame of §2.3, the instantaneous orthonormal tidal response is
\(\ddot\xi_i=\mathcal T_i\xi_i\). With \(R_A=R\sqrt B\),

\[
\mathcal T_R=c^2(S_{,\ell_{\rm ext}\ell_{\rm ext}}-S_{,\ell_{\rm ext}}^2)
=\frac{2c^2S(1+S-S^2)}{R^2B^2},\qquad
\mathcal T_t=c^2S_{,\ell_{\rm ext}}\frac{R_{A,\ell_{\rm ext}}}{R_A}
=-\frac{c^2S(1+S)}{R^2B^2}.
\]

The weak limits are \(+2GM/R^3\) radially and \(-GM/R^3\) in each tangent
direction. The exact exterior continuation changes radial stretching to
compression above \(S=(1+\sqrt5)/2\). A moving observer requires the
corresponding transformed tidal tensor; internal stress also depends on the
body's material response and support.

A centred finite body's mean response begins at second order in its extent,
while the endpoint difference begins at first order. The earlier exact
mapped-span examples remain in the static-displacement note under the
historical response, not as extra terms in the metric tidal tensor.
For a consistent coordinate change, \(\boldsymbol\ell=E\boldsymbol\xi\)
implies

\[
\ddot{\boldsymbol\ell}=E\ddot{\boldsymbol\xi}
+2\dot E\dot{\boldsymbol\xi}+\ddot E\boldsymbol\xi.
\]

All derivatives must use the same time parameter. These terms convert a
trajectory; they are not a second deformation force.

### 3.3 Ordered exterior composition

For source-first/test-last composition, transport the test centre \(\mathbf b\) to \(\mathbf B=F_s(\mathbf b)\) and apply its radial map about \(\mathbf B\). The exterior Jacobian is \(J_F=E_tE_s\), with determinant \(D_tD_s\). Oblique factors need not commute. The test centre is excluded from its own exterior map, so this Jacobian is not evaluated there as a centre-force multiplier.

For the same scalar rewritten after insertion, gradients transform with \(E_t^{-\mathsf T}\); trajectories transform with \(E_t\) plus map-derivative terms. Transforming the kinetic metric reconciles them. Declaring a new Euclidean kinetic rule after insertion would add dynamics beyond that conversion. The exterior centre trajectory now follows §2.3 and §4; a derived comparable-source backreaction remains separate from this map-composition identity.

## 4. Transport, Nonradial Motion and Causal Extension

### 4.1 Clock, ruler and motion compatibility

For a static metric using the same proper radial ruler and body time,
\(dU/d\tau=-c^2\gamma^2\,d\ln N/d\ell_{\rm ext}\).
Thus a position-only lapse cannot reproduce the historical position-only
acceleration for every launch speed. The adopted law includes the required
\(\gamma^2\) dependence and conserves \(e=N\gamma\).

The square-map identity
\(d\rho^2+\rho^2d\Omega^2=D^{-2}dr^2+D^2r^2d\Omega^2\)
converts spatial intervals in that map. It alone is not the exterior
spacetime postulate. Reference distance, displaced distance, material rod
length and clock period must be distinguished when interpreting their relation.

### 4.2 Planar orbit equation

Set \(f=e^{-2S}\), \(g=h=B\), \(u=1/R\), and use conserved
\(E=fc^2\dot t\), \(L=hR^2\dot\phi\). The exact planar equation is

\[
 u'^2=Q(u)=\frac{h^2}{gL^2}\left(\frac{E^2}{fc^2}-c^2\right)
 -\frac hg u^2,\qquad u''=\tfrac12Q'(u).
\]

Dots use body proper time; primes use orbital angle. In coordinate time,
the first-post-Newtonian vector acceleration is

\[
\ddot{\mathbf R}=-\frac{GM}{R^3}\mathbf R+
\frac{GM}{c^2R^3}\left[
\left(\frac{4GM}{R}-V^2\right)\mathbf R+
4(\mathbf R\cdot\mathbf V)\mathbf V\right],\quad
\mathbf V=\frac{d\mathbf R}{dt}.
\]

This follows from the metric action. The checkpoint-6 impulse-plus-steering
law and its generalized angular invariant are superseded for exterior
orbits; their derivations remain available in checkpoints 6–7. They are
not added as separate precession contributions to this equation.

### 4.3 Verified orbit and optical results

The leading perihelion advance is \(6\pi GM/[c^2a(1-e^2)]\).
For \(G=6.674\times10^{-11}\), \(M=1.989\times10^{30}\) kg,
\(c=2.998\times10^8\) m/s, \(a=0.38710\times1.496\times10^{11}\) m,
and \(e=0.20563\), exact Binet integration gives 42.9886 arcseconds per
century using 87.969 days per orbit. The corrected simulation shadow gives
42.9927 using its measured period, consistent with the leading Kepler-period
value 42.992706. Timestep halving changes the shadow result by less than
0.00005 arcseconds/century. Its Newtonian control is effectively zero.

The printed deposited metric \(f=(1+S)^{-2},g=1+2S,h=1\) instead gives
21.49. The formerly inserted Schwarzschild correction did not validate that
metric. The updated simulation uses the acceleration in §4.2; planetary
interactions remain Newtonian, and its two-body shadow contains no planetary
perturbations.

The same closure supplies optical index

\[
 n=\frac{\sqrt B}{N}=e^S\sqrt{1+2S}=1+2S+O(S^2).
\]

Direct ray integration recovers leading bending \(4GM/(c^2b)\) and
round-trip Shapiro logarithmic coefficient \(4GM/c^3\). No independent
optical coefficient is fitted. The [calculation record](WIP/proper_velocity_gravity/closure-observable-results.md)
provides the integration equations, refinement checks and machine-readable results.

### 4.4 Weak retarded field

For mass-equivalent density \(\varrho_m\), the weak scalar extension is

\[
S_{\rm ret}(\mathbf x,t)=\frac G{c^2}\int\frac{\varrho_m(\mathbf x',t-R/c)}R\,d^3x',\quad
R=|\mathbf x-\mathbf x'|,
\]
\[
c^{-2}\partial_t^2S_{\rm ret}-\nabla^2S_{\rm ret}=4\pi G\varrho_m/c^2.
\]

For energy density the source coefficient instead contains \(c^{-4}\). A stationary spherical source gives \(S_{\rm ret}=S\) in its exterior. This weak retarded field is distinct from the exact map depth \(\Sigma\). A stationary density makes this field static; delaying the moving probe is not source retardation and does not supply the missing fixed-source perihelion term.

The exact static depth has nonzero exterior reference Laplacian:

\[
\nabla^2\Sigma=\ell_0^{-1}\left[d^2/(r^2+d^2)^{3/2}+2/\sqrt{r^2+d^2}-2/r\right].
\]

The retarded linear equation is therefore a weak closure, not the exact strong-field continuation. Appendix B gives the constraint on a proposed nonlinear continuation.

## 5. Rotating Sources and the Vector Response

A scalar source density does not retain the handed mass-current information of a rotating body. A candidate weak current response is

\[
\mathbf A_D=\frac G{c^2}\int\frac{\varrho_m(\mathbf x',t-R/c)\mathbf v(\mathbf x',t-R/c)}R\,d^3x'.
\]

This normalization gives velocity units; dividing \(\mathbf A_D\) by \(c\) gives a dimensionless field. A rotational observable must specify how this field or its curl transports the gyroscope and orbital frame. Spin reversal and angular structure alone do not fix that coupling or its normalization.

## 6. Gyroscope Observables and Gravity Probe B

Parallel transport of the spin four-vector along a circular geodesic of
§2.3 gives \(\Delta\psi=3\pi GM/(c^2R)\) per orbit at leading order.
Direct integration yields 6.620970 arcseconds/year for
\(GM_\oplus=3.986004418\times10^{14}\) m³/s²,
\(c=299792458\) m/s and \(R=7020137\) m (a nominal 642 km orbit).
This spherical benchmark is distinct from the mission-specific 6.6061
prediction [4]. Spin normalization and orthogonality to the four-velocity
are preserved to better than \(10^{-12}\).

Earth's frame-dragging contribution requires the rotating-source sector.
The current field in §5 supplies source information but not its normalization
as a spin-transport coupling. Multiplying it by a moment-of-inertia ratio
does not determine that coupling. Appendix E states those requirements.

## 7. Radiation and Material Response

Let \(Q_{ij}=\int \varrho_m(\mathbf x,t)x_i x_j\,d^3x\) be the source mass quadrupole, \(R\) the radiation-zone distance and \(\mathbf n\) the observation direction. Consider the conditional scalar amplitude and flux

\[
\delta S_{\rm ret}=\frac{G}{2c^4R}n_i n_j\ddot Q_{ij},\qquad
F=\frac{c^3}{4\pi G}(\partial_t\delta S_{\rm ret})^2,
\]

angular integration gives, for \(T_{ij}=\dddot Q_{ij}\),

\[
P_{\rm scalar}=\frac G{60c^5}\left\langle(\operatorname{tr}T)^2+2T_{ij}T_{ij}\right\rangle
=\frac G{30c^5}\langle T^{\rm STF}_{ij}T^{\rm STF}_{ij}\rangle
+\frac G{36c^5}\langle(\operatorname{tr}T)^2\rangle.
\]

The trace term contributes whenever the quadrupole trace has a nonzero third time derivative. The tensor entries do not count independent radiating modes: their constraints, propagation laws and energy normalization must determine the total power. The flux normalization above is conditional on the dynamical closure, so this scalar integral alone does not establish a binary inspiral rate.

For the static map, local deformation amplitude is \(D-1=\ell_0\Sigma/r\), not \(\Sigma\). This identity does not by itself convert the retarded perturbation \(\delta S_{\rm ret}\) into material strain. A source trace, a scalar disturbance, transverse breathing of a detector, and optical phase response are distinct quantities. A plane scalar-gradient response gives longitudinal relative acceleration at first order for initially resting probes. Imposing the static deformation shape as material strain additionally assumes how matter follows that geometry. Those descriptions must not be added as independent forces without a common evolution law.

The excitation branch supplies support and cycle-energy relations, and the constants branch supplies the F–H propagation/closure interpretation. A microscopic definition of the ultimate substance of F and H is not required for using those relations. What remains is the response of constituent support and optical paths to a changing field, without counting a geometric or closure contribution twice. Nuclear overlap is not a prerequisite for separated-body motion. A breathing amplitude or binary decay rate requires those additional response equations.

## 8. Conclusion

The square-root map supplies exact displacement geometry. The adopted exterior clock, ruler and motion postulates give a consistent set of weak-field orbit, light and geodetic-spin predictions, now checked numerically. Their strong-field expressions follow for the specified exterior continuation. Relating that continuation to bounded near-source depth requires explicit distance and material-response conversions. Comparable-source dynamics, radiation and rotating-source coupling remain separate work. These distinctions concern the scope of the equations, not a demand for a unique microscopic explanation before the postulates can be used.

## Appendix A. Storage, Local Units and Clock Transport

The storage pair satisfies \(c=1/\sqrt{\varepsilon_0\mu_0}\) and \(Z_0=\sqrt{\mu_0/\varepsilon_0}\). Within the framework, a clock is a sustained closure process through the storage/transport structure. Local co-deformation of matter and its measuring standard can preserve local measurement while reference-coordinate spans change. It does not prove absence of finite-body differential response.

For a specified stationary propagation cycle, \(T=\oint ds/c_{\rm path}\). Converting its path and effective propagation coefficients must not count the same stretch twice. Stable repeated cycles, kinetic escape gamma, and total arrival-time differences are not interchangeable. The exterior lapse is explicitly postulated in §2.3, rather than inferred from a kinetic identity alone. Stable material support in a strong field remains a separate response calculation.

## Appendix B. Nonlinear Displacement and the Strong-Field Regime

For the proposed reference-coordinate exterior ansatz \(\nabla\cdot[\alpha\nabla\Sigma]=0\), the static family requires

\[
r^2\alpha\Sigma_r=-d^2/(2\ell_0),\qquad \alpha=D(D+1)/2.
\]

A universal function of depth alone cannot produce that family: at fixed \(\delta=\ell_0\Sigma\), \(D=(d^2+\delta^2)/(d^2-\delta^2)\) still depends on source scale. Additional local deformation information or a different operator/source description is needed. This constraint is not a derived dynamical stiffness law. In a frozen-coefficient equation \(c_{\rm eff}^{-2}\Sigma_{tt}-\nabla\cdot(\alpha\nabla\Sigma)=0\), the characteristic speed is \(c_{\rm eff}\sqrt\alpha\); neither the time coefficient nor wave energy is fixed by the static profile alone.

The strong-deformation condition \(r\sim d\) is not generally \(\Sigma\sim1\). The ratio \(d/\ell_0\) matters. A mapped material boundary must also be specified: reference \(r=d\) maps to \(\rho=\sqrt2d\), whereas \(\rho=d\) is the singular exterior limit \(r=0\). No continuation through an extended planet's interior or material equilibrium at that limit is supplied.

## Appendix C. Conditions for a Metric and Higher-Order Expansion

For the map, \(D^2=1+d^2/r^2\) and
\(\Sigma=(\sqrt{r^2+d^2}-r)/\ell_0\) remain distinct. The adopted exterior
metric uses \(S=GM/(c^2R)\) and proper ruler \(\sqrt{1+2S}\,dR\).
Its isotropic expansion gives \(\beta_{\rm PPN}=\gamma_{\rm PPN}=1\).
It differs from isotropic Schwarzschild beyond first post-Newtonian order:
\(f\) has cubic coefficient \(-4/3\), rather than \(-3/2\), and the spatial
coefficient omits the Schwarzschild \(3S^2/2\) term. These are properties of
the specified exact continuation, not a choice already forced by the weak
limit. Likewise, contracted-rod counting \(B=e^{2S}\) shares the first-order
coefficient but is a different exact continuation.

## Appendix D. Source Structure and Mass Calibration

For a common bulk normalization, \(d_{\rm eff}^2=2GM\ell_0/c^2\); additive weak source masses then give additive effective squared scales. This bookkeeping does not prove that independent primitive displacements physically merge by a surface rule. A merged-volume estimate \(d\propto N^{1/3}\), a primitive support \(r_0\), and a fitted bulk exterior scale describe different constructions.

The excitation paper's overlap law concerns near-contact/merger structure. With other support coefficients fixed, its equal-input minimized energy is proportional to \(2^{1/(3-u)}\) and is monotonic in \(u=s/(2R_b)\), where \(s\) is the separation of two equal support centres and \(R_b\) their support radius, with \(0\le u\le1\). It alone supplies no finite-separation stable bond, but that does not obstruct the external separated-body calculation. Binding energies, compact merger mass deficits and source-scale dressing require the remaining configuration-dependent interaction terms.

## Appendix E. Rotating-Source Metric and Surface Claims

The mass-current integral in §5 supplies a candidate weak rotating-source field. To obtain gyroscope drift, a metric representation or a rotating equilibrium surface, the model must specify how that field couples to orientation and translation, how time is transported, and how the source maintains its support under rotation. A stationary material boundary requires its own force and support balance. Neither that boundary nor a metric cross term follows from the angular form of the current field alone.


## References

[1] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[2] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[3] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. https://doi.org/10.5281/zenodo.19155341

[4] C. W. F. Everitt et al., “Gravity Probe B: Final Results of a Space Experiment to Test General Relativity,” *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[5] J. G. Williams, S. G. Turyshev, and D. H. Boggs, “Lunar Laser Ranging Tests of the Equivalence Principle with the Earth and Moon,” *International Journal of Modern Physics D* **18**(7), 1129–1175 (2009). https://doi.org/10.1142/S021827180901500X

[6] C. M. Will, “The Confrontation between General Relativity and Experiment,” *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4
[7] James Buckeyne, *The Homogeneous Propagation Framework: Weak-Field Observational Tests*. Zenodo. (Companion paper.)


## Appendix F. Changelog

This appendix records revisions from the start of the static-response update. It is not a reconstruction of earlier publication history. Completed edits and calculations are distinguished from results awaiting re-evaluation.
Historical entries retain their original notation; the current notation is defined in §2.1.

### F.1 — 7 October 2026: Static-response checkpoint

**Changes to this paper.** Added the revision notice near the abstract and links to the [static-response checkpoint](WIP/proper_velocity_gravity/static-response-checkpoint.md) and [Static Displacement: Weak and Strong Fields](WIP/proper_velocity_gravity/static-displacement-weak-and-strong-fields.md). The notice establishes static displacement as the starting point, with retardation as its dynamical extension. It identifies the existing metric-dependent results as the pre-revision baseline rather than revised predictions. Added this changelog.

**Completed in the accompanying derivation.** Specified the compressed radial ruler \(d\ell=dr/D\), accumulated depth \(\delta=\sqrt{r^2+d^2}-r\), and selected body-clock response \(A_b=(c^2/\ell_0)(D-1)\). Made the radial evolution equations and their invariant explicit:

\[
\frac{dr}{d\tau}=DU,\qquad
\frac{dU}{d\tau}=-A_b,\qquad
\frac{U^2}{2}-\frac{c^2\delta}{\ell_0}=\text{constant}.
\]

Distinguished proper escape velocity from bounded coordinate escape velocity, with the transport distance and time definitions stated explicitly. Distinguished a reference-coordinate surface from a mapped surface and a test-body stand-off distance. These results consolidate and extend the new README material; they are not all first introduced by this checkpoint.

**Validation.** The accompanying [verification script](WIP/proper_velocity_gravity/verify_static_response.py) passed checks of map, depth and acceleration derivatives, the improper escape integral, marginal and non-marginal radial trajectories, and a turning trajectory. The largest dimensionless invariant residual in that run was approximately \(1.07\times10^{-14}\). These checks establish consistency of the stipulated equations, not empirical validation of the response law.

**Pending.** Reconcile the effective metric's radial-ruler interpretation with the selected transport convention. The identification \(D^2=1+2\Sigma\) in §4.3 and Appendix C does not follow from the fixed-displacement map and accumulated depth. Re-derive dependent orbit, optical, higher-order and rotating-source results before replacing their numerical predictions. The leading Newtonian exterior limit is retained by the selected radial response; this alone does not establish the other observational claims. No such recalculations have been completed in this revision.

### F.2 — 7 October 2026: Metric-compatibility checkpoint

**Completed.** Added the [metric/transport comparison](WIP/proper_velocity_gravity/metric-response-checkpoint.md) and a corresponding notice near the abstract. Distinguished the forward spatial map from inverse-ruler counting and from an effective spacetime metric. Derived the radial geodesic response, under the same distance and proper-time identification,

\[
\frac{dU}{d\tau}=-c^2\gamma^2\frac{d\ln N}{d\ell}.
\]

A position-only lapse cannot make this equal the selected \(-A_b(\ell)\) for all launch velocities. The escape-matched candidate \(N=(1+2\Sigma)^{-1/2}\) gives \(-A_b\gamma^2/(1+2\Sigma)\), agreeing with the selected response on the marginal escape curve but not generally. This is a restriction on that metric-geodesic representation, not a replacement of the radial response or proof against other transport descriptions.

**Validation.** Extended the checkpoint verification script to check lapse gradients, marginal-only matching and the change of the candidate metric energy along a non-marginal trajectory of the selected law. All checks, including those from F.1, passed.

**Pending.** Specify the nonradial transport response and the adapters for comparing separated events before recalculating orbit and optical observables. No lapse was adopted as a material-clock law, and no revised perihelion, lensing, delay or rotating-source numerical prediction was made. The mismatch can affect post-Newtonian corrections; preservation of the leading Newtonian limit is not sufficient to retain the old higher-order results.

### F.3 — 7 October 2026: Nonradial baseline and orbit test

**Completed.** Derived an explicitly conditional central-vector extension in the forward mapped spatial coordinates, documented in [checkpoint 3](WIP/proper_velocity_gravity/nonradial-response-checkpoint.md). Obtained its planar evolution equations, conserved body-clock invariant and angular momentum, circular velocities, radial stability condition, and Binet equation. Its near-circular advance is \(2\pi([3-D(D+1)]^{-1/2}-1)\), with weak leading term \(3\pi d^2/(2\rho^2)\). This is not the previously asserted metric-derived coefficient.

**Validation.** A [small-eccentricity orbit integration](WIP/proper_velocity_gravity/verify_nonradial_response.py) at reference radius \(r/d=10\) recovered the predicted apsidal angle, approximately 6.3308060853 radians per radial period. Maximum dimensionless energy and angular-momentum residuals were approximately \(8.81\times10^{-16}\) and \(3.95\times10^{-14}\), respectively.

**Pending.** Derive the HPF direction-transport contribution and distinguish basis rotation from trajectory steering. The tested baseline assumes ordinary Cartesian vector identification in the mapped space; it is not asserted to include all noncollinear HPF physics. No revised Mercury or optical prediction is claimed, and the old orbit recovery has not been confirmed.

### F.4 — 7 October 2026: External-field direction transport

**Completed.** [Checkpoint 4](WIP/proper_velocity_gravity/direction-transport-checkpoint.md) extracts the infinitesimal external-field remainder from the noncollinear-composition companion paper:

\[
d\boldsymbol W=\frac{\mathbf U\times d\mathbf U}{c^2(\gamma+1)}.
\]

The circular limit gives \(2\pi(\gamma-1)\). Consistently transporting position and velocity components in a basis rotating with this remainder leaves the reconstructed baseline orbit unchanged. The companion paper's external-field spin/orientation discussion does not by itself specify an additional translational steering law; its orbital coefficient still relies on the metric result under revision.

**Validation.** The [direction-transport checks](WIP/proper_velocity_gravity/verify_direction_transport.py) passed finite-integral convergence and fixed-versus-rotating-basis orbit tests. Maximum reconstructed state difference was approximately \(1.31\times10^{-12}\), with nonzero accumulated orientation of approximately 0.31109668 radians over the test interval.

**Separate finding.** The main displacement branch and the shadow calculation in `AI/stfr_nbody_sigma.html` apply their angular-momentum correction with different radius factors. The dimensional discrepancy is documented in checkpoint 4; the simulation was not modified and its quoted orbit validation has not been re-established.

**Pending.** Identify or derive the actual coupling from the transport remainder to trajectory steering, if such a coupling is intended, including sign and time convention. Do not add a spin/basis rotation to perihelion advance by default. Revised nonradial observables remain conditional; the radial escape results are unchanged.

### F.5 — 7 October 2026: Steering-law and simulation-evidence audit

**Completed.** [Checkpoint 5](WIP/proper_velocity_gravity/steering-law-audit.md) traces the inspected steering claims back to their equations and implementations. The weak-field paper's tangential retardation expression needs explicit acceleration-versus-force units and a lag-angle sign convention. The noncollinear orientation remainder does not uniquely specify a translational feedback operation. Diagnostic feedback examples show that different signs and impulse ordering preserve the radial law while producing different transverse responses; none was adopted as the framework law.

**Validation.** A [test of the extracted shadow routine](WIP/proper_velocity_gravity/verify_shadow_comparison.cjs) confirms algebraically identical displacement and Schwarzschild accelerations on the tested states. The displayed precession statistic uses the shadow's angle history. Its agreement therefore does not independently establish the revised displacement orbit law or the full nine-body implementation. Simulation code was not modified.

**Pending.** Specify or locate the actual translation-coupling update: which vector is rotated, in which frame, and at which point in impulse accumulation. The revised static radial response remains available independently of that nonradial decision.

### F.6 — 7 October 2026: Author clarification and translational steering

**Clarification.** The external-field remainder additionally rotates the resulting velocity direction after proper-velocity addition determines its magnitude. It acts on translation, not only on basis/spin orientation. This supplies the operation missing from F.5; the basis-only result in F.4 remains a distinct comparison.

**Completed.** [Checkpoint 6](WIP/proper_velocity_gravity/trajectory-steering-checkpoint.md) implements acquired field impulse followed by direction rotation, with additional turning in the impulse's sense and the remainder evaluated from the pre-rotation increment. The continuous law is \(\dot{\mathbf U}=\mathbf a_{0\parallel}+\gamma\mathbf a_{0\perp}\). It preserves the radial response and body-clock energy invariant, while replacing conservation of \(\mathbf J\) by conservation of \(\mathbf J e^\gamma/(\gamma+1)\). The sign and update ordering are explicit implementation conventions.

**Validation.** [Checks](WIP/proper_velocity_gravity/verify_trajectory_steering.py) passed magnitude preservation, convergence of the discrete update to the vector law, circular-speed consistency, and eccentric-trajectory invariant conservation. Maximum energy and generalized-angular invariant residuals were approximately \(1.41\times10^{-15}\) and \(1.62\times10^{-14}\).

**Pending.** Recalculate eccentric-orbit precession and stability for the steered law. The unsteered checkpoint-3 formulas are not inherited, and no updated Mercury coefficient is claimed here.

### F.7 — 7 October 2026: Steered eccentric orbits and stability

**Completed.** [Checkpoint 7](WIP/proper_velocity_gravity/steered-orbit-results.md) derives the exact Binet equation using the generalized angular invariant, the circular stability condition, and the leading eccentric-orbit advance for checkpoint 6's explicit direction update. The advance is \(2\pi GM/(c^2p)+3\pi d^2/(2p^2)\), rather than the old \(6\pi GM/(c^2p)\).

**Validation.** [Numerical checks](WIP/proper_velocity_gravity/verify_steered_orbits.py) passed eccentric-orbit convergence, the circular linearization and angular-step refinement. With the demo's constants and Earth-normalized response, the isolated Mercury-like orbit gives approximately 14.333372 arcseconds per century versus 42.992706 from the old coefficient. The comparison uses the leading Keplerian period; the per-orbit advance is approximately \(1.6734810\times10^{-7}\) radians. It is a conditional static-model calculation, not a full ephemeris prediction.

**Pending.** Derive and evaluate any further source-motion/transport contribution rather than inserting a fitted precession correction. The stated magnitude-first steering operation leaves radial escape unchanged but does not yet reproduce the old orbital claim.

### F.8 — 7 October 2026: Retardation and radiation dependencies

**Completed.** [Checkpoint 8](WIP/proper_velocity_gravity/retardation-radiation-checkpoint.md) shows that the written retarded-source integral reduces to a static field for a stationary source; it does not add the missing fixed-source orbital advance merely because the test body moves. The exact finite-displacement depth has a nonzero exterior Laplacian in the old reference-coordinate operator, so the linear retarded integral is a weak-field closure rather than its exact strong-field continuation.

**Radiation audit.** Under the weak-field paper's own scalar amplitude and flux assumptions, the general quadrupole power is \(G\langle(\operatorname{tr}\dddot Q)^2+2\dddot Q_{ij}\dddot Q_{ij}\rangle/(60c^5)\). The previous expression omits a contribution for varying trace. Local strain, accumulated scalar depth and detector polarization must be coupled explicitly; counting six tensor components does not derive a factor-six power enhancement. Added a re-evaluation notice at the start of the companion weak-field paper's radiation section, preserving its baseline derivation for comparison.

**Validation.** [Checks](WIP/proper_velocity_gravity/verify_radiation_integral.py) passed spherical angular integration for trace-free, trace-only and mixed tensors, the STF power decomposition, and finite-difference verification of the static Poisson residual.

**Pending.** Supply the dynamical transport/operator and wave-to-detector response before updating breathing amplitude, polarization or binary decay predictions. A source trace contribution is not by itself a measured breathing polarization. The radial escape result is unchanged; no missing precession term or radiative degree of freedom was fitted into the model.

### F.9 — 7 October 2026: Transport constraint and detector response

**Completed.** [Checkpoint 9](WIP/proper_velocity_gravity/transport-detector-checkpoint.md) derives the exact static radial-flux constraint for Appendix B.4: the required stiffness is alpha = D(D+1)/2 in its reference-coordinate source-free exterior. Equal accumulated depth at different source sizes requires different stiffness, excluding a universal depth-only coefficient for this entire static family under that ansatz. Added a local revision notice to B.4.

**Detector implications.** A conditional scalar-gradient plane-wave coupling gives longitudinal relative acceleration. A conditional continuation of the static deformation tensor instead contains transverse breathing and longitudinal strain. Their amplitudes and material coupling cannot be identified without an evolution law. The checkpoint gives the arm projection and first-order optical travel-time bookkeeping, connecting the remaining work to the existing constitutive optical exploration.

**Validation.** `WIP/proper_velocity_gravity/verify_transport_constraint.py` passed exact-flux and finite-difference divergence checks across weak and strong deformation, equal-depth counterexamples, and detector arm projections.

**Pending.** Derive the common time-dependent deformation/storage/matter coupling and its energy normalization. No unique revised breathing amplitude, inspiral rate or new clock factor is asserted. Static escape and the conditional steered-orbit results remain unchanged.

### F.10 — 7 October 2026: Excitation and constitutive response connection

**Completed.** [Checkpoint 10](WIP/proper_velocity_gravity/constitutive-response-checkpoint.md) connects the existing excitation support functional to the revised response audit. Sums of fractional transport/cycle/occupancy changes determine closure energy, while their difference determines support size. The slow-envelope potential supplies a compatibility condition with the calibrated weak acceleration; a closure-energy contribution already represented in that potential must not be counted twice. Added a localized compatibility notice to excitation dynamics section 3.3.

**Wave readout.** Derived a conditional scalar-gradient pulse response and an explicit two-leg optical/oscillator readout for normal incidence on equal arms. Internal support size, free-body center motion and optical path response remain distinct. A common response can vanish in the differential readout without being absent in each arm. Static support stiffness is determined by the functional, but support inertia and damping are not.

**Validation.** `WIP/proper_velocity_gravity/verify_constitutive_response.py` passed support/energy expansions, an exact constant-energy varying-support example, finite-difference stiffness and two-leg optical integration.

**Pending.** Specify displacement-induced transport/storage coefficients in a consistent energy/time convention and their dynamical material/optical response. The inspected equations leave these coefficients open; none was fitted or silently adopted. No revised breathing amplitude or binary decay rate is asserted.

### F.11 — 7 October 2026: Constituent and ruler bridge audit

**Completed.** [Checkpoint 11](WIP/proper_velocity_gravity/constituent-bridge-audit.md) locates the existing interval-transport bridge in README sections 7 and 15 and connects it to constituent motion. A response evolved in realized coordinates must not receive the same geometric transport terms a second time. Added interpretation clarifications to checkpoints 9 and 10: their diagnostic prescriptions are not established freely selectable mechanisms or independent deformation forces.

**Remaining bridge narrowed.** The excitation support and overlap energies provide partial interaction information, but the inspected equations do not close configuration-dependent binding and evolution of constituent separations. With other coefficients fixed, the written equal-input overlap energy is monotonic and alone supplies no interior stable bond separation. This does not exclude stabilization by the remaining configuration-dependent terms. No arbitrary material coefficient was adopted.

**Validation.** `WIP/proper_velocity_gravity/verify_constituent_bridge.py` reproduces a diagnostic bound-pair trajectory in mapped and realized descriptions, with maximum state discrepancy 3.599e-10 and approximately 16-fold improvement on halving the step. A deliberately double-counted evolution differs by about 0.052 in the test's dimensionless units. The overlap-energy derivative check passed. These validate bookkeeping and algebra, not a microscopic binding model.

**Pending.** Derive the total pair interaction/support response and its stable separation, if present, then evolve that response with the existing map and a consistent time convention. No new breathing amplitude or binary decay rate is asserted.

### F.12 — 7 October 2026: Separated test displacement and finite external response

**Completed.** [Checkpoint 12](WIP/proper_velocity_gravity/separated-test-displacement.md) calculates a distinct small body's centre acceleration and the external response across its radial span, without support overlap or an inter-body bond. It distinguishes source displacement, test displacement, realized test half-span, material boundary and surface-to-surface gap. Updated checkpoint 11's scope: its overlap-energy result concerns merger behavior, not a prerequisite for separated gravitational response.

**Results.** The exact radial response gradient is K d^2/r^3, with radial/transverse magnitude ratio D(D+1) for the mapped central law at initial rest. Near the limiting mapped surface, acceleration scales as the inverse square root of centre height. For a declared half-span a, the exact near/far spread is about 0.99 percent of centre acceleration at surface gap 100a, and 59.77 percent at gap a. Gap-stable numerical examples retain the conditional Earth-normalized source response; they do not establish a proton's deformed size or support survival.

**Validation.** `WIP/proper_velocity_gravity/verify_separated_test_body.py` passed gradient and tensor-ratio identities, the exact uniform-line average against numerical integration, and small-span convergence. The calculation evaluates external body-clock response coefficients, not a complete synchronized strong-field material evolution.

**Pending.** Internal deformation/stress needs the test body's support response, source feedback where relevant, and consistent time transport. Electrical interactions must be included separately when modeling charged bodies. None is needed merely to evaluate the specified external field profile, and no nuclear merger model was used.

### F.13 — 7 October 2026: Ordered exterior composition and response conversion

**Completed.** [Checkpoint 13](WIP/proper_velocity_gravity/two-displacement-composition.md) implements source-first/test-last composition with the test centre carried into the intermediate chart. The composite Jacobian is E_t E_s and its determinant is D_t D_s. Aligned, perpendicular and oblique patches have distinct stretch/orientation behavior. Recentring and a fixed intrinsic test displacement in the intermediate chart are stated implementation conventions, not a derived source-dressing law.

**Response boundary.** The test centre is excluded from its own exterior map, preventing evaluation of a self-Jacobian there as a centre-acceleration correction. Scalar gradients transform as covectors; trajectory accelerations transform with the Jacobian plus derivative terms. Transforming the kinetic metric reconciles those operations. Treating the transformed scalar gradient as a new Euclidean acceleration instead would introduce dynamics beyond the chain rule. The composition alone therefore supplies no unique correction to checkpoint 12's source-only test response.

**Validation.** `WIP/proper_velocity_gravity/verify_two_displacement_composition.py` passed finite-difference composite Jacobians at oblique exterior points (maximum absolute residual 1.345e-9), determinant multiplication, scalar-gradient conversion and the kinetic-metric identity.

**Pending.** Derive how insertion into the conditioned background changes or transports the test excitation's response energy and inertia, or supply the equivalent constituent/support evolution. No inter-body bond, nuclear overlap model, extra geometric force or fitted acceleration multiplier was introduced.

### F.14 — 7 October 2026: Cross interaction and tidal response without isolated self-force

**Completed.** [Checkpoint 14](WIP/proper_velocity_gravity/cross-interaction-response.md) connects README section 12.4's multiplicative interaction energy to the selected exact test-body response. The interaction functional is minus the integral of source response potential over the test mass. Its centre derivative gives averaged external response without evaluating an isolated self-gradient. Added a bookkeeping clarification to constants recovery section 2.1, where the displayed force-amplitude product must not also be differentiated as an energy potential.

**Tidal connection.** Differential response begins at first order in body extent; the mean correction for a centred symmetric distribution begins at second order. In the near-surface uniform-line example, gap 100 half-spans gives a 0.0012254 percent mean correction despite a roughly 0.99 percent endpoint spread. Gap one half-span gives a 3.5276 percent mean correction despite a roughly 59.77 percent spread. These are sampling results, not a derived material shape.

**Validation.** `WIP/proper_velocity_gravity/verify_cross_interaction.py` passed response-energy differentiation, averaged acceleration, second-moment scaling and the near-surface limiting ratios.

**Scope.** The functional represents the adopted body-clock response in a prescribed static field; it is not asserted to be a full relativistic comparable-mass Hamiltonian. Reciprocal strong-field backreaction, time transport and changing internal support remain separate. No isolated translational self-force or extra point-test acceleration correction was added.


### F.15 — 8 October 2026: Main-text consolidation

**Completed.** Replaced the superseded main-text static depth, response and metric-recovery narrative with the checked compressed-ruler equations, separated-body interaction, finite differential response and explicit direction-steering result. Static geometry is primary and the retarded linear field is stated as a weak extension. Corrected source-density units, distinguished depth from deformation, and removed current-prediction status from the former metric, 2PN, radiation-multiplier and rotating-surface claims. Section 1 supplies one current status statement; Appendices C and E identify the historical dependencies.

**Preservation.** The complete pre-consolidation draft is saved as [historical comparison](displacement_dynamics_preconsolidation_2026-10-08.md). Its former derivations are not erased or silently promoted to the revised model. The checkpoint notes remain derivational records, and F.1–F.14 remain chronological history rather than the current status of every result. Added a single relationship notice to the companion observational paper without rewriting its separate calculations.

### F.16 — 8 October 2026: Final consistency review for this working revision

**Validation.** All 12 Python verification scripts and the extracted JavaScript shadow-comparison check passed. Coverage includes map/gradient identities, escape integration and invariants, metric incompatibility, conditional unsteered and steered trajectories, rotation bookkeeping, radiation angular integrals, transport stiffness constraints, support identities, finite-body sampling, ordered composition and interaction-energy differentiation. The historical comparison tests are diagnostics, not validation of all prior physical claims.

**Review.** Checked current main-text coordinate and sign conventions, dimensional normalization, proper versus coordinate velocity, surface versus centre gap, weak/strong limiting behavior, conditional numerical values and relative document links. Reference bibliography and earlier changelog entries are preserved. No PDF was regenerated, no code simulation was changed, and no commit or publication was made.

**Stopping point.** This completes the consolidation and review of the revised working paper. Strong-field comparable-source backreaction, time-dependent material/optical readout and calibrated radiation/GPB predictions remain explicit research work; they are not additional prerequisites hidden behind this completed editorial checkpoint.

### F.17 — 10 October 2026: Standalone presentation

Recast the main text and Appendices A–E as a self-contained account of the current equations and their scope. Removed historical comparisons and dependencies on reading a prior draft; kept revision history here. Added numerical orbit inputs and local definitions for the radiation quadrupole and overlap variable. Replaced the historical GPB estimate with the actual requirements for that observable. No response equations or numerical predictions were changed. Checked document structure, links and remaining historical wording; numerical tests were not repeated for this editorial change.

### F.18 — 10 October 2026: Standalone weak-field observational paper

Replaced the companion observational paper's revision notices and contradictory recovery claims with self-contained calculations, assumptions and observable limits. Preserved its author metadata and references, and saved the full prior file as `weak_field_observational_tests_preconsolidation_2026-10-10.md`. The current paper states the weak clock calibration explicitly; distinguishes upward signed redshift from positive redshift magnitude; uses one optical-cost coefficient consistently for delay and bending; restricts closed-path cancellation to the constant common background term; presents the actual conditional orbit result; and supplies the corrected scalar trace power without an unsupported tensor-component multiplier. Ranging and gyroscope sections state their physical response requirements rather than asserting a completed prediction.

Validation: `verify_observational_formulas.py` passed numerical optical path integrals, the delay-gradient/deflection relation, endpoint-rate signs and the numerical height example. The scalar radiation checks passed again. Reviewed document structure, math delimiters and absence of editorial dependency notices. This is not a new fit to experimental data. No PDF was regenerated or publication made.

### F.19 — 16 October 2026: First-post-Newtonian audit of the effective metric

**Finding.** Exact geodesic integration shows that the deposited metric \(f=1/(1+\Sigma)^2\), \(g=1+2\Sigma\), \(h=1\) gives 21.49 arcsec/century for Mercury, not the 42.98 stated in the deposited §4.4; the \(3GMu^2/c^2\) term there was taken from Schwarzschild, not derived from that metric. The \(\Sigma^2\) coefficient of the clock enters at first post-Newtonian order (\(\beta_{\rm PPN}\)). The October-revision clock \(C^2=1+2\Sigma\) gives 14.33, which is the checkpoint-7 result: that number is a 1PN clock-coefficient effect, not a consequence of the strong-field bound. The nine-body Σ branch inserts the Schwarzschild term and carries an extra \(1/r\); its 43.3 confirmed the insertion only.

**Working closure.** Isotropic transport deformation \(g=h=1+2\Sigma\) (Type G scaling) with the exponential lapse \(N=e^{-\Sigma}\) (README §12.1) gives \(\gamma_{\rm PPN}=\beta_{\rm PPN}=1\): Mercury 42.99, deflection and Shapiro at the standard coefficients, \(\kappa_{\rm opt}=2\) fixed, no vanishing lapse at any finite \(\Sigma\). Details, table and the body-clock form of the geodesic in [checkpoint 19](WIP/proper_velocity_gravity/metric-closure-checkpoint.md).

**Validation.** `WIP/proper_velocity_gravity/verify_perihelion_metric.py` (RK4 Binet, standard library) agrees with an independent 40-digit quadrature to \(4\times10^{-5}\) arcsec/century on all seven metric rows.

**Pending.** Recast the static-displacement note's escape and tidal results in the closure variables; correct and re-run the nine-body simulation with the framework's own acceleration; derive deflection, delay and geodetic precession from the closure metric; erratum or new version for the deposited papers. The main text of this working copy still carries the checkpoint-7 steered-orbit numbers and is not yet updated to the closure.


### F.20 — 19 October 2026: Exterior closure consolidation completed

Updated the abstract, scope, radial escape, tides, orbital motion, optical
results, geodetic spin and conclusion to the adopted closure. The main text
now distinguishes map coordinates from exterior metric coordinates. Older
position-only and steering calculations remain in their checkpoint notes;
they are not presented as the current exterior dynamics. The numerical
coincidence between the metric's one-third result and checkpoint 7 does not
establish equality of their underlying motion laws, despite the wording in
the historical F.19 entry.

The five calculations listed as pending in F.19 are recorded in
[the closure results](WIP/proper_velocity_gravity/closure-observable-results.md),
including a draft deposited-paper erratum. Numerical verification uses the
metric Binet test, the actual simulation's shadow/refinement test, and direct
ray and spin transport with strong-field derivative checks. No new response
postulate, fit parameter, commit, PDF release or publication is introduced
by this consolidation. Submission of an erratum remains a publication action.

### F.21 — 19 October 2026: Body-dependent displacement shorthand

Added \(d_{\rm eff}(m_b,r_b)=\sqrt{2Gm_b r_b/c^2}\) and the associated
body-normalized depth, with fixed source extent distinguished from field
radius and primitive constituent displacement. Replaced the main-text
Earth-radius normalization with this body-specific prescription. Added
exact surface and limiting depths, separated strong local deformation from
large accumulated depth, and derived the conditional exponential-lapse
radial response using the compressed ruler. A contrasting exterior-ruler
continuation makes the remaining matching requirement explicit. Qualified
the circular-null-orbit interpretation without changing the adopted exterior
metric or its verified observables. Checked depth derivatives, radial
response conversion and weak-limit normalization numerically. No simulation
or published PDF was changed.

### F.22 — 20 October 2026: Symbol roles and retarded-field notation

Added a notation table separating the displacement function \(d_{\rm eff}\),
scalar deformation factor \(D\), Jacobian matrices \(E,J_F\), map depth
\(\Sigma\), its body specialization \(\Sigma_b\), and exterior depth \(S\).
Renamed the weak retarded field \(S_{\rm ret}\) and its radiation perturbation
accordingly, removing its use of the exact map-depth symbol. Equations and
response assumptions are unchanged. Historical entries retain their original
symbols. Checked current definitions and radiation references for consistency.
