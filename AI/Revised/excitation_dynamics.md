# The Homogeneous Propagation Framework: Excitation, Closure, and Material Response

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447

**Zenodo DOI:** [placeholder — reserved DOI to be inserted before publication]

*Companion papers:* *Homogeneous Light Propagation Framework*; *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*; *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*; *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*; *The Homogeneous Propagation Framework: Weak-Field Observational Tests*.

## Abstract

This paper develops the excitation-side branch of the homogeneous propagation framework. The displacement layer fixes the effective transport geometry through cumulative displacement and transport deformation, but it does not by itself explain how localized matter excitations maintain closure, realize a preferred support scale, or respond differently to geometric displacement and material loading. The present paper therefore treats a localized mass as a sustained excitation of the vacuum storage medium and develops a first formal closure model on that displaced background.

A minimal excitation field is written on the effective geometry, its eikonal limit yields a Hamilton--Jacobi relation with a distinct closure scale, and a slow-envelope limit separates displacement, closure, and material contributions in the effective excitation energy. A native closure/support functional is then introduced, with transport-side and storage-side costs treated separately. The storage-side term is refined into a continuous internal occupancy factor, and the overlap/composition problem is recast as a single geometric law for merging internal bubbles rather than as two separately postulated mechanisms. This gives a first explicit support law and a corresponding closure-scale shift that remain exposed-boundary-driven at weak overlap while transitioning smoothly toward the corrected strong-merger endpoint.

The result is not yet a final substrate derivation of matter. Its purpose is narrower and more immediate: to sharpen the excitation problem into a tractable three-branch structure consisting of displacement geometry, excitation closure, and material constitutive response, and to show that those branches can already be written in one coherent paper-level formalism.

## 1. Introduction

The displacement-side branch of the framework addresses how mass-energy deforms the transport-supporting vacuum structure and how that deformation propagates causally. What remains open is the excitation-side problem: if matter is a sustained localized excitation of the same medium, what fixes its closure, its support scale, and its response to displaced or materially loaded backgrounds?

The current working picture is that a localized mass is a sustained LC-like excitation that persistently occupies vacuum storage. The open problem is therefore not only how displacement propagates, but how a localized excitation closes on itself, maintains support, shifts its realized cycling on a displaced background, and acquires both particle-like and wave-like behavior.

This paper is intentionally limited in scope. It does not claim a final substrate derivation of the matter spectrum, charge structure, or complete microscopic constitutive law. Its narrower aim is to put the excitation branch into a stable formal shape: to show how a minimal field description, a support-selection law, and a first internal-occupancy/composition model can be stated together without collapsing excitation closure into either background displacement or material loading.

This paper keeps three branches separate from the start:

1. **Displacement / geometric branch.** This branch is carried by the cumulative displacement and transport deformation, schematically \(\Sigma(x,t)\) and \(D(x,t)\), and determines the effective transport geometry.
2. **Excitation / closure branch.** This branch describes the sustained localized mode living on that background. It carries closure, internal cycling, localization, and support.
3. **Material constitutive branch.** This branch changes local storage ratios and impedance through constitutive response rather than by acting as additional pure displacement.

That three-way split is essential. Gravity/displacement, excitation closure, and material loading are related, but they are not the same effect written in different variables.

The strategy of the paper is correspondingly simple. Section 2 fixes the live constraints inherited from the earlier branches. Section 3 introduces the minimal field picture and its eikonal and slow-envelope reductions. Sections 4 through 7 then develop the paper's main new formal content: the closure/support functional, the occupancy refinement, the overlap-driven composition law, and the corresponding closure-scale shift. Section 8 returns to the material branch to keep it separate from pure displacement, and Sections 9 and 10 state the present status of the excitation program.

## 2. Constraints inherited from the earlier branches

Several corrections are already in force and must constrain the excitation-side development. They are worth stating explicitly at the front because they define what the present paper is and is not allowed to do.

First, the spatial transport deformation and the cumulative timing burden are not the same object. The earlier shorthand \(g = D^2 = 1 + 2\Sigma\) should not be reused without qualification. The cumulative displacement \(\Sigma\) controls the timing-side burden, while the spatial deformation branch requires separate treatment.

Second, the displacement-composition rule remains boundary-deficit-like in the weak-overlap regime. Ordinary mass additivity and small binding are governed by exposed-boundary deficit, not by full volume addition. This does not mean mass is surface area; the source content remains volume-like occupancy that enters later bookkeeping through a support radius and then through squared-radius terms.

Third, the strong-merger endpoint for complete volume addition corresponds to exponent \(n = 3/2\), not the earlier inverted value. This correction matters directly when internal occupancy is modeled through overlap or merger analogies.

These corrections do not invalidate the excitation-side program. They narrow it. The closure and occupancy model must preserve the weak-overlap exposed-boundary rule, respect the corrected strong-merger endpoint, and avoid collapsing timing burden into spatial deformation.

## 3. Minimal excitation field on the displaced background

The first excitation-side step is to place a minimal excitation field on the effective background set by the displacement layer. A deliberately simple starting point is a scalar amplitude-phase field

\[
\Psi = A e^{i\phi},
\]

with the understanding that the field lives on the effective excitation geometry supplied by the displacement branch rather than on an undeformed background. At this stage the goal is not a final substrate derivation of matter structure. The goal is to put the excitation branch into field form so that closure, localization, and environmental response can be discussed in one language rather than through disconnected analogies.

A convenient schematic field equation is

\[
\mathcal{L}_{\mathrm{eff}}\Psi + \mu_{\mathrm{cl}}^2\Psi = 0,
\]

where \(\mathcal{L}_{\mathrm{eff}}\) is the displacement-dressed propagation operator and \(\mu_{\mathrm{cl}}\) is the excitation-side closure scale. This form is intentionally generic. It only encodes the separation already established in the checkpoint work: background displacement modifies propagation, closure enters as its own excitation-scale burden, and material loading can later dress the equation without being identified with pure geometric displacement.

### 3.1 Eikonal / Hamilton--Jacobi limit

Write the phase as a rapidly varying action,

\[
\Psi = a(x)\,e^{iS(x)/\hbar_{\mathrm{eff}}},
\]

with slowly varying envelope \(a(x)\). At leading order in the phase gradient, the field equation reduces to a Hamilton--Jacobi relation,

\[
g_{\mathrm{eff}}^{ab}\,\partial_a S\,\partial_b S + \mu_{\mathrm{cl}}^2 = 0.
\]

This is the same eikonal structure already captured in the continuation note. The important point is not the formal resemblance alone, but the separation of roles: the effective geometry enters through the displacement-side background, closure enters through \(\mu_{\mathrm{cl}}\), and later material dressing enters through constitutive response rather than by being folded into the geometry term. This is the first point where the excitation center acquires a particle/ray-level description without collapsing closure into trajectory.

In other words, the ray follows the displaced transport geometry, but the existence and identity of the localized excitation are still controlled by a separate closure scale.

### 3.2 Constitutively dressed action equation

The same Hamilton--Jacobi structure can be extended to include the material branch. Schematically, one may write

\[
g_{\mathrm{eff}}^{ab}\,\partial_a S\,\partial_b S + \mu_{\mathrm{cl}}^2 + \delta\mu_{\mathrm{mat}}^2 = 0,
\]

where \(\delta\mu_{\mathrm{mat}}^2\) summarizes constitutive dressing through quantities such as \(\epsilon_r = 1 + \chi_e\) and \(\mu_r = 1 + \chi_m\). These are used here as propagation-limited analogs of generic electric-type and magnetic-type response, not as a commitment to standard Maxwell ontology. In that reading, electric-type loading is tied more closely to positional configuration and local storage contrast, while magnetic-type loading is tied more closely to directional or velocity-linked organization. The present paper does not treat that magnetic-type channel as an imported Thomas/Wigner coefficient or as a co-moving steering remainder. When later analogy to spin or heading is useful, the relevant comparison for environmental or material forcing is the externally applied case, not the internally generated one. The purpose of this term is not yet to declare a final microscopic law for material response. Its purpose is to keep the material branch explicit. Displacement changes propagation and timing burden; materials change storage ratios and impedance; closure remains a distinct excitation-scale object.

That distinction matters later for refractive media and for wave/particle structure. A material medium cannot simply be treated as extra geometric displacement, because the same background geometry can support different local constitutive responses.

### 3.3 Slow-envelope / Schrödinger-like limit

To reach a wave/particle equation for a localized mode, separate the fast closure oscillation from the slow envelope by writing

\[
\Psi(x,t) = e^{-i\omega_{\mathrm{cl}} t}\,\psi(x,t),
\]

with \(\omega_{\mathrm{cl}}\) the dominant closure frequency and \(\psi\) slowly varying on that timescale. In a weak background and slow-motion limit, the second-order field equation reduces schematically to a first-order envelope equation of Schrödinger type,

\[
i\hbar_{\mathrm{eff}}\,\partial_t \psi = \left(T_{\mathrm{eff}} + V_{\mathrm{eff}}\right)\psi.
\]

At this level the point is structural rather than exact. The leading effective potential separates into three pieces. One piece is set by cumulative displacement \(\Sigma\) and scales like \(m c^2\Sigma\), entering negatively in the effective energy. A second piece is a material scalar loading with scale \(\tfrac{m c^2}{2}(\chi_e + \chi_m)\), also entering negatively. The remainder appears through anisotropic corrections to the kinetic operator, reflecting the fact that displacement and constitutive loading need not dress all directions identically.

In the most compact geometric form, the kinetic branch is represented as a metric-dressed Laplace--Beltrami operator,

\[
T_{\mathrm{eff}}\psi = -\frac{\hbar^2}{2m_0}\,\Delta_{h_{\mathrm{eff}}}\psi,
\]

with \(h_{\mathrm{eff}}\) the effective spatial metric seen by the slow envelope. In local coordinates, or in application-specific constitutive models, the same object is represented more explicitly by a tensor-dressed second-order operator,

\[
T_{\mathrm{eff}}\psi = -\frac{\hbar^2}{2}\,\partial_i\!\left(M^{ij}_{\mathrm{eff}}(x)\,\partial_j\psi\right),
\]

where \(M^{ij}_{\mathrm{eff}}\) is the effective transport tensor. The geometric and tensor forms are not different physical claims. The first is the compact background-level statement; the second is the local constitutive representation used when anisotropy needs to be handled explicitly.

To first order around an isotropic vacuum background, it is enough to expand the tensor as

\[
M^{ij}_{\mathrm{eff}}(x) \approx \frac{\delta^{ij}}{m_0} + A^{ij}_{\Sigma}\,\Sigma + A^{ij}_e\,\chi_e + A^{ij}_m\,\chi_m,
\]

with symmetric coefficient tensors \(A^{ij}_{\Sigma}\), \(A^{ij}_e\), and \(A^{ij}_m\) describing directional transport-side dressing from displacement, electric-type material loading, and magnetic-type material loading. In practice these need not be equally free. The displacement contribution is constrained by the background geometry, the electric-type contribution is usually more tightly tied to positional or storage configuration, and the magnetic-type contribution is more naturally associated with directional or velocity-linked organization. In the isotropic weak-background limit these tensors reduce to scalar multiples of \(\delta^{ij}\), and the operator collapses to the familiar Schrödinger kinetic term \(-\tfrac{\hbar^2}{2m}\nabla^2\psi\). This makes the slow-envelope statement more than a list of terms: it is the first place where the separated Hamilton--Jacobi branches reappear as separated contributions inside a wave/particle equation.

A compact way to summarize the same statement is

\[
V_{\mathrm{eff}} \approx -m c^2\Sigma - \frac{m c^2}{2}(\chi_e + \chi_m) + V_{\mathrm{cl}}^{(1)},
\]

where the first closure-side term is taken from the local shift of the minimized closure energy,

\[
V_{\mathrm{cl}}^{(1)} \approx \delta E_{\mathrm{cl}}.
\]

Using the support functional developed below, that shift is

\[
\delta E_{\mathrm{cl}} \approx \frac{E_{\mathrm{cl}}}{2}\left(\frac{\delta\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{tr}}} + \frac{\delta\alpha_{\mathrm{cyc}}}{\alpha_{\mathrm{cyc}}} + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right),
\]

so, to first order,

\[
V_{\mathrm{cl}}^{(1)} \approx \frac{E_{\mathrm{cl}}}{2}\left[(t_{\Sigma}+c_{\Sigma})\Sigma + (t_e+c_e)\chi_e + (t_m+c_m)\chi_m + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right].
\]

This does not introduce a new independent potential by hand. It is the closure-side energy correction induced by the same transport-side dressing, cycle-side dressing, and occupancy composition that later determine the preferred support. The kinetic operator then retains the directional corrections coming from the displaced and materially dressed background. The resulting envelope equation is therefore the first place where background displacement, closure burden, and constitutive loading appear together in one dynamical equation without being collapsed into a single scalar source term.

A small but important optical clarification belongs here. For an actual light ray or excitation-front in a displaced background, the physically realized path is not set by the coordinate remap alone. A straight path pushed through the spatial displacement map can display local bowing while still returning to the same far-field asymptote. The realized ray is selected instead by the propagation cost carried by the displaced medium. In the weak-field gravitational case that cost is not just the timing burden \((1+\Sigma)\), but the full realized cost \((1+\Sigma)^2\): one factor from the slower propagation rate and one from the increased traversed medium per coordinate length. This point matters for the excitation branch because it cleanly separates three roles that might otherwise be conflated: the background geometry, the realized transport cost on that geometry, and the independent closure burden of the localized mode.

### 3.4 Bound-mode / closure shift

For a weakly perturbed localized bound mode, the same separation implies that the carrier closure frequency shifts under displacement, support change, and material loading in a correlated way. The cleanest first-order identification is to tie the carrier frequency to the minimized closure energy,

\[
\hbar_{\mathrm{eff}}\,\omega_{\mathrm{cl}} \propto E_{\mathrm{cl}}(a_*),
\]

with \(a_*\) the preferred support selected by the closure functional of Section 4.

Using the occupancy-refined support functional,

\[
E_{\mathrm{cl}}(a) = \frac{m c^2}{2} \left[ \alpha_{\mathrm{tr}}\left(\frac{\ell_C}{a}\right) + \alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}\left(\frac{a}{\ell_C}\right) \right],
\]

the stationarity condition gives

\[
a_* = \ell_C\sqrt{\frac{\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}}},
\]

and the minimized closure energy becomes

\[
E_{\mathrm{cl}}(a_*) = m c^2\sqrt{\alpha_{\mathrm{tr}}\,\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}}.
\]

The first-order fractional closure shift therefore follows directly,

\[
\frac{\delta E_{\mathrm{cl}}}{E_{\mathrm{cl}}} \approx \frac{1}{2}\left(\frac{\delta\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{tr}}} + \frac{\delta\alpha_{\mathrm{cyc}}}{\alpha_{\mathrm{cyc}}} + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right).
\]

Equivalently, using the support law,

\[
\frac{\delta a_*}{a_*} \approx \frac{1}{2}\left(\frac{\delta\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{tr}}} - \frac{\delta\alpha_{\mathrm{cyc}}}{\alpha_{\mathrm{cyc}}} - \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right),
\]

so the same closure shift may be written as

\[
\frac{\delta E_{\mathrm{cl}}}{E_{\mathrm{cl}}} \approx \frac{\delta\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{tr}}} - \frac{\delta a_*}{a_*} \approx \frac{\delta\alpha_{\mathrm{cyc}}}{\alpha_{\mathrm{cyc}}} + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}} + \frac{\delta a_*}{a_*}.
\]

At this order there is no need to introduce separate direct constitutive shift coefficients on top of the support functional, because displacement, constitutive loading, and occupancy already enter through \(\alpha_{\mathrm{tr}}\), \(\alpha_{\mathrm{cyc}}\), and \(Q_{\mathrm{occ}}\). Any residual direct dressing may be added later if the closure-side field equation requires it, but doing so now would mostly risk double counting.

Using the first-order dressing laws of Section 4,

\[
\frac{\delta\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{tr}}} \approx t_{\Sigma}\Sigma+t_e\chi_e+t_m\chi_m,
\]

\[
\frac{\delta\alpha_{\mathrm{cyc}}}{\alpha_{\mathrm{cyc}}} \approx c_{\Sigma}\Sigma+c_e\chi_e+c_m\chi_m,
\]

one obtains the explicit bridge

\[
\frac{\delta\omega_{\mathrm{cl}}}{\omega_{\mathrm{cl}}} \approx \frac{\delta E_{\mathrm{cl}}}{E_{\mathrm{cl}}} \approx \frac{1}{2}\left[(t_{\Sigma}+c_{\Sigma})\Sigma + (t_e+c_e)\chi_e + (t_m+c_m)\chi_m + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right].
\]

This is the key closure of the present draft: the same occupancy model that selects support also shifts the carrier closure frequency, and it does so through the same dressed transport-side and cycle-side coefficients. Displacement therefore enters the bound-mode spectrum in two related ways. It changes the effective background seen by the field, and it changes the preferred closure burden through support selection. Material loading likewise enters both through constitutive dressing of the coefficients and through any occupancy-side change in the localized support burden, without becoming identical to geometric displacement.

Section 7 then supplies one concrete closure-side identification,

\[
\mu_{\mathrm{cl}} \propto \sqrt{Q_{\mathrm{occ}}},
\qquad
\omega_{\mathrm{cl}} \propto \mu_{\mathrm{cl}},
\]

so that the occupancy channel alone contributes

\[
\frac{\delta\omega_{\mathrm{cl}}}{\omega_{\mathrm{cl}}} \approx \frac{1}{2}\,\frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}
\]

when the coefficient dressings are held fixed. The support-linked result above is the more complete first-order statement, because it keeps the transport-side and cycle-side dressing in view at the same time.

This section therefore establishes the minimum field-theoretic backbone needed for the rest of the paper. A localized excitation can be described by a field on the displaced background, its eikonal limit yields a trajectory law with separate closure scale, and its slow-envelope limit reveals how displacement, closure, and material response enter the effective bound-mode dynamics in distinct ways.

## 4. Closure and support selection

The largest unresolved excitation-side problem is support selection: what fixes the preferred support scale of a localized sustained excitation? The earlier field-theoretic section established how a localized mode can be written on the displaced background. The next step is to state the independent closure condition that selects which localized support is actually maintained.

A generic localization functional was used temporarily in earlier note work, but that form was not native enough to the present framework. The better starting point is a closure/support energy built directly from the transport/storage logic of the medium.

This deserves to be stated plainly: background geometry alone does not fix support. The displacement field can modify propagation cost, timing, and anisotropy, but a sustained localized mode must still satisfy an independent closure condition. The support problem is therefore not just a geometric one. It is the problem of balancing transport-side phase closure against storage-side cycle burden for a self-maintaining excitation.

### 4.1 STFR-native closure functional

The working closure/support energy is

\[
E_{\mathrm{cl}}(a) = \frac{m c^2}{2} \left[ \alpha_{\mathrm{tr}}\left(\frac{\ell_C}{a}\right) + \alpha_{\mathrm{cyc}}\left(\frac{a}{\ell_C}\right) \right],
\]

where \(\ell_C = h/(m c)\) is the characteristic closure scale, \(\alpha_{\mathrm{tr}}\) weights the transport/phase cost, and \(\alpha_{\mathrm{cyc}}\) weights the cycle/storage burden.

The interpretation is direct:

- \(\ell_C/a\) is the transport or phase-closure cost,
- \(a/\ell_C\) is the cycle-encountered storage cost.

This is the first closure functional in the current branch that naturally gives a preferred support near \(\ell_C\) in flat vacuum, a minimum closure energy near \(m c^2\), and a clean route for background dressing.

### 4.2 Background-dressed coefficients

The coefficients are not fixed universal scalars. Weak displacement and material loading dress them differently:

- \(\alpha_{\mathrm{tr}}\) for the transport side,
- \(\alpha_{\mathrm{cyc}}\) for the cycle/storage side.

To first order, it is enough to write

\[
\alpha_{\mathrm{tr}} \approx \alpha_{\mathrm{tr}}^{(0)}\left(1+t_{\Sigma}\Sigma+t_e\chi_e+t_m\chi_m\right),
\]

\[
\alpha_{\mathrm{cyc}} \approx \alpha_{\mathrm{cyc}}^{(0)}\left(1+c_{\Sigma}\Sigma+c_e\chi_e+c_m\chi_m\right),
\]

with independent transport-side and cycle-side dressing coefficients. The coefficients need not match, and in general should not. That difference is one reason material loading and displacement do not act identically on support. At the field-operator level, the same separation appears as scalar dressing of the closure functional together with tensor dressing of the slow-envelope transport operator. The scalar coefficients \(t_{\bullet}\) and \(c_{\bullet}\) therefore summarize only the support-side part of the response, while the tensors \(A^{ij}_{\bullet}\) introduced in Section 3.3 carry the directional part. In that tensor branch the three channels need not be equally free. The displacement contribution is constrained by the background geometry, the electric-type contribution is constrained more strongly by positional configuration and local storage contrast, and the magnetic-type contribution is associated more naturally with directional or velocity-linked organization inside the propagation-limited medium.

### 4.3 Preferred support

Minimizing the occupancy-refined functional gives the preferred support law

\[
a_* = \ell_C\sqrt{\frac{\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}}}.
\]

Using the first-order dressing above,

\[
\frac{\delta a_*}{a_*} \approx \frac{1}{2}\left[(t_{\Sigma}-c_{\Sigma})\Sigma + (t_e-c_e)\chi_e + (t_m-c_m)\chi_m - \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right].
\]

At the same stationary point, the minimized closure energy is

\[
E_{\mathrm{cl}}(a_*) = m c^2\sqrt{\alpha_{\mathrm{tr}}\,\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}},
\]

so

\[
\frac{\delta E_{\mathrm{cl}}}{E_{\mathrm{cl}}} \approx \frac{1}{2}\left[(t_{\Sigma}+c_{\Sigma})\Sigma + (t_e+c_e)\chi_e + (t_m+c_m)\chi_m + \frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}\right].
\]

This is the simplest place where displacement and material response visibly separate in the support problem: differential dressing between transport and cycle burden shifts the preferred support, while the summed dressing sets the closure-energy shift. The occupancy channel enters both, with opposite sign in the support law and positive sign in the minimized closure energy.

At the purely schematic level already developed, the qualitative result is:

- displacement can shrink preferred support while still raising closure burden,
- material loading can also shrink preferred support while raising closure burden,
- magnetic-type and electric-type loading can remain distinct effective channels even when both are interpreted as propagation-limited EM analogs rather than primitive fields. The point is not that one is a literal Maxwell field while the other is a free residual tensor. The point is that the medium supports at least two different constitutive response modes, one more configuration-led and one more direction-led, and those need not dress support identically.

## 5. Internal structured occupancy

The support functional already shows that a purely geometric storage-side count is too crude. The large-\(a\) storage term should not be interpreted as empty geometric occupancy. It is better interpreted as an excitation-side closure/storage burden: the effective depth to which a sustained localized mode occupies the available closure capacity of the medium.

To avoid overcommitting to literal integer submode counts, replace the storage-side count by a continuous factor \(Q_{\mathrm{occ}}\). In the present paper \(Q_{\mathrm{occ}}\) is not a new displacement source term and not a vacuum-energy-density variable. It is a dimensionless effective closure/storage loading factor for the excitation. More sharply than in the earlier note-stage draft, however, it should not be read as a free placeholder with no physical target. Its natural physical role is to parametrize the collective dressing that separates an isolated closure scale from a bulk packed-matter support scale.

That distinction is already suggested by the Route A picture. The isolated support scale sits near

\[
a_{\mathrm{iso}} \approx 0.75\,\mathrm{fm},
\]

while bulk nuclear matter is characterized by the familiar packing law

\[
R = r_0 A^{1/3},
\]

with \(r_0\) the per-nucleon bulk packing radius. In the present reading these are not competing radius definitions for the same state. They are two different support regimes: an isolated closure scale and a collective packed support scale. The purpose of \(Q_{\mathrm{occ}}\) is to carry, in dimensionless form, the closure/storage dressing that moves the preferred support from the isolated regime toward the bulk one.

The closure functional therefore becomes

\[
E_{\mathrm{cl}}(a) = \frac{m c^2}{2} \left[ \alpha_{\mathrm{tr}}\left(\frac{\ell_C}{a}\right) + \alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}\left(\frac{a}{\ell_C}\right) \right].
\]

This is the first meaningful refinement of the storage-side term because it allows smooth overlap, merger-like crossover, and non-integer internal occupancy while keeping the excitation-side burden distinct from the displacement-side sourcing postulate.

With this replacement, the preferred support law becomes

\[
a_* = \ell_C\sqrt{\frac{\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}}}.
\]

### 5.1 Isolated support, bulk support, and the role of \(Q_{\mathrm{occ}}\)

The support law immediately shows how the occupancy channel should be read. If two environments share the same transport-side and cycle-side coefficients but differ in effective internal closure/storage burden, then

\[
\frac{a_{*,2}}{a_{*,1}} = \sqrt{\frac{Q_{\mathrm{occ},1}}{Q_{\mathrm{occ},2}}}.
\]

So \(Q_{\mathrm{occ}}\) does not simply count "more stuff present." It is an effective burden parameter inside the support law. Different geometric sharing or collective support can lower the effective burden even while the realized support radius grows. That is exactly the type of behavior later needed for merger and overlap.

This gives a clean reading of the isolated-versus-bulk distinction. Let

\[
a_{\mathrm{iso}} < a_{\mathrm{bulk}} \approx r_0.
\]

Then the corresponding occupancy factors satisfy

\[
Q_{\mathrm{occ}}^{(\mathrm{bulk})}
=
Q_{\mathrm{occ}}^{(\mathrm{iso})}
\left(\frac{a_{\mathrm{iso}}}{a_{\mathrm{bulk}}}\right)^2,
\]

up to whatever coefficient dressing separates the two environments. In other words, \(Q_{\mathrm{occ}}\) should be interpreted as the effective collective-dressing variable that bridges the isolated Route A support scale and the bulk packed-matter support scale. In the present paper this bridge is formalized, but not yet microscopically derived.

### 5.2 \(r_0\), the per-gram displacement proxy, and the direction of explanation

The occupancy interpretation becomes sharper once the bulk support scale is compared with the displacement-side mass mapping. The framework already uses

\[
d^2 = \frac{2GM}{c^2}
\]

as the mass-to-displacement relation in the weak-field branch. Independently, nuclear matter is characterized by a bulk support/packing scale \(r_0\). The numerically important observation is that the displacement scale attached to one gram,

\[
d_{\mathrm{mole}} \equiv \sqrt{\frac{2G\,(1\,\mathrm{g})}{c^2}},
\]

lies in the same range as the bulk nuclear packing/support radius.

At the level of present evidence, however, both quantities are still empirical anchors rather than completed substrate derivations. The fitted nuclear support/packing radius \(r_0\) is inferred from nuclear-size phenomenology, while \(G\) is inferred from macroscopic weak-field gravity measurements. They do not enter with the same experimental precision: \(G\) is the sharper macroscopic conversion constant, while \(r_0\) is the more physically suggestive excitation-side scale. The point of comparing them is therefore not to claim that ordinary finite-nucleus fits have already measured \(r_0\) as precisely as \(G\), but to note that the framework can promote the bulk support scale to an exact displacement-equivalent proxy once the one-gram map is adopted.

Writing that proxy as \(r_{0,\mathrm{eff}} \equiv d_{\mathrm{mole}}\), the weak-field identity may be inverted directly:

\[
G = 500\,r_{0,\mathrm{eff}}^2 c^2
= 500\,\frac{r_{0,\mathrm{eff}}^2}{\mu_0\varepsilon_0}.
\]

A suggestive way to read the same relation is to make the vacuum storage pair explicit rather than writing only \(c\). Since
\[
c=\frac{1}{\sqrt{\mu_0\varepsilon_0}},
\]
one may define the upstream support-through-vacuum quantity
\[
\kappa_0 \equiv \frac{r_{0,\mathrm{eff}}}{\sqrt{\mu_0\varepsilon_0}},
\]
which is algebraically just \(r_{0,\mathrm{eff}}c\), but written to emphasize that the bulk support length is being measured against the vacuum propagation/storage factor. The present paper does not promote \(\kappa_0\) to a new formal constant. It is mentioned only as an interpretive guide: if the framework eventually derives the macroscopic weak-field bookkeeping from the excitation side, the more natural upstream object may be the support scale carried through the vacuum storage pair, with \(G\) appearing only after squaring and unit packaging.

This should be read carefully. It does not mean that empirical nuclear-radius data alone have derived \(G\). It means that, once the framework identifies the bulk nuclear support/displacement normalization with the exact one-gram displacement proxy, the gravitational conversion constant becomes the SI bookkeeping factor that packages that normalization into kilogram-based weak-field observables.

This does not by itself prove a substrate derivation. But it strongly suggests that the direction of explanation should not run from an already accepted macroscopic \(G\) downward into the excitation branch. The more natural long-term target is the opposite: derive the nuclear support scale first, identify its collective dressing law, and only then recover the weak-field mass-to-displacement map as the macroscopic bookkeeping expression of that support scale.

Said differently, if the framework ever truly derives \(G\), it will likely do so through the support/displacement normalization set by the bulk nuclear scale rather than by starting with \(G\) as primitive. In that sense, \(G\) should be read here as the present high-precision SI conversion factor in the weak-field branch, while \(r_0\) is the more direct physical scale on the excitation side.

The paper therefore keeps two chains conceptually distinct. On the excitation side,

\[
r_0 \;\longrightarrow\; \text{support scale} \;\longrightarrow\; \text{closure burden}.
\]

On the weak-field side,

\[
d^2 = \frac{2GM}{c^2}
\;\longrightarrow\;
\Sigma(R),\; \lambda(R),\; v_{\mathrm{esc}}.
\]

The present claim is not that these two chains have already been fully unified. It is that the observed numerical proximity between bulk \(r_0\) and the per-gram displacement proxy is strong enough to guide how \(Q_{\mathrm{occ}}\) should be interpreted. The occupancy channel is not an abstract fitting knob. It is the formal place where isolated support, bulk support, and eventual mass-to-displacement normalization can meet.

The remaining problem is therefore to give \(Q_{\mathrm{occ}}\) a sharper microscopic and geometric meaning. For the present paper it should be read as an effective collective-dressing factor with a real physical target — the isolated-to-bulk support shift — rather than as a freely floating phenomenological scalar.

## 6. Geometric composition of internal occupancy

Once \(Q_{\mathrm{occ}}\) is introduced, the next question is how it combines under overlap or merger. The best current first model treats internal structured occupancy by analogy with two overlapping or merging bubbles. This is a composition model for internal structured burden, not a literal claim that matter is made of two classical geometric bubbles. Earlier note work split the effect into a weak-overlap shared-boundary reduction and a separate enlargement term tied to ambient displacement. That was useful scaffolding, but the current view is that those may not be distinct mechanisms. They may be the same composition geometry described from two sides.

The model is therefore simplified here into a single overlap-driven composition law.

### 6.1 Overlap variable

Take two equal-radius internal bubbles of radius \(R\) and center separation \(s\), and define

\[
u = \frac{s}{2R}, \qquad 0 \le u \le 1,
\]

with

- \(u = 1\): just touching,
- \(u < 1\): overlap,
- \(u \to 0\): strong merger / concentric limit.

The weak-overlap regime should remain exposed-boundary-driven. The strong-merger endpoint should approach the corrected volume-addition result. This is a composition rule for nearby support regions, not a claim that mass itself is fundamentally surface-based: the source content remains volume-like occupancy, and the boundary-deficit language only describes how the just-touching additive limit is corrected once overlap begins.

### 6.2 Effective composition exponent

To encode that transition with one function, define an effective composition exponent

\[
n_{\mathrm{eff}}(u) = 1 + \frac{1-u}{2} = \frac{3-u}{2}.
\]

This gives the correct limits:

\[
n_{\mathrm{eff}}(1) = 1, \qquad n_{\mathrm{eff}}(0) = \frac{3}{2}.
\]

So the model is exposed-boundary-like at weak overlap and reaches the corrected full volumetric endpoint at complete merger.

### 6.3 Occupancy composition law

Define the combined effective occupancy by

\[
Q_{\mathrm{occ}}(u)^{\,n_{\mathrm{eff}}(u)} = Q_A^{\,n_{\mathrm{eff}}(u)} + Q_B^{\,n_{\mathrm{eff}}(u)}.
\]

For equal constituents \(Q_A = Q_B = Q_0\),

\[
Q_{\mathrm{occ}}(u) = 2^{1/n_{\mathrm{eff}}(u)} Q_0 = 2^{2/(3-u)} Q_0.
\]

The endpoints are then

\[
Q_{\mathrm{occ}}(1)=2Q_0, \qquad Q_{\mathrm{occ}}(0)=2^{2/3}Q_0\approx 1.587\,Q_0.
\]

The strong-merger endpoint matches the corrected equal-input full-merger result. The combined occupancy burden is reduced below the just-touching additive sum as the internal bubbles merge.

### 6.4 Support law under geometric composition

Substituting into the closure/support functional gives

\[
a_*(u) = \ell_C \sqrt{\frac{\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{cyc}}\,2^{2/(3-u)}Q_0}}.
\]

Relative to the just-touching value

\[
a_{*,1} = \ell_C \sqrt{\frac{\alpha_{\mathrm{tr}}}{2\alpha_{\mathrm{cyc}}Q_0}},
\]

this becomes

\[
a_*(u)=a_{*,1}\,2^{\frac{1}{2}-\frac{1}{3-u}}.
\]

At full merger,

\[
a_*(0)=2^{1/6}a_{*,1}\approx 1.122\,a_{*,1}.
\]

So deeper overlap reduces the storage-side burden and relaxes the preferred support outward by about 12.2% relative to the just-touching additive baseline.

### 6.5 Weak-overlap expansion

For \(u = 1 - \epsilon\) with \(\epsilon \ll 1\),

\[
n_{\mathrm{eff}}(u)=1+\frac{\epsilon}{2},
\]

so

\[
Q_{\mathrm{occ}}(u) \approx 2Q_0\left[1-\frac{\ln 2}{2}\epsilon\right],
\]

and therefore

\[
a_*(u) \approx a_{*,1}\left[1+\frac{\ln 2}{4}\epsilon\right].
\]

The leading correction is linear in \(1-u\), not quadratic. That is the expected qualitative behavior if the weak-overlap regime is controlled by shared exposed-boundary deficit.

## 7. Closure-scale shift

The same occupancy model can now be fed back into the excitation Hamilton--Jacobi branch by taking the closure burden scale to vary with the square root of effective occupancy. This is the specific closure-side identification used in Section 3.4 to connect carrier-frequency shift to the support/occupancy model,

\[
\mu_{\mathrm{cl}}(u) \propto \sqrt{Q_{\mathrm{occ}}(u)}.
\]

For equal constituents,

\[
\mu_{\mathrm{cl}}(u)=\mu_0\,2^{1/(3-u)}.
\]

Relative to the just-touching baseline,

\[
\frac{\mu_{\mathrm{cl}}(u)}{\mu_{\mathrm{cl}}(1)} = 2^{\frac{1}{3-u}-\frac{1}{2}}.
\]

At full merger,

\[
\mu_{\mathrm{cl}}(0)=2^{-1/6}\mu_{\mathrm{cl}}(1)\approx 0.891\,\mu_{\mathrm{cl}}(1).
\]

So the same geometric composition law that relaxes the preferred support also softens the closure-scale burden. In first-order form this means

\[
\frac{\delta\omega_{\mathrm{cl}}}{\omega_{\mathrm{cl}}} \approx \frac{1}{2}\,\frac{\delta Q_{\mathrm{occ}}}{Q_{\mathrm{occ}}}
\]

when the coefficient dressings are held fixed, which is exactly the occupancy-side term appearing in Section 3.4. That is the first internally consistent indication that support shift, closure-frequency shift, and effective localized-mode energy may all move together under one occupancy model.

## 8. Material response and separation of branches

The previous sections developed the excitation branch without allowing it to collapse into geometry. The complementary caution is that material response should not be collapsed into the displacement branch either. Materials change local storage ratios and impedance. In the present notation, the constitutive branch is carried schematically by

\[
\epsilon_r = 1 + \chi_e, \qquad \mu_r = 1 + \chi_m.
\]

At the excitation level, these loadings affect the response of the localized mode without becoming identical to pure displacement. The intent is not to treat them as literal primitive EM fields. It is to retain two effective constitutive channels that play broadly electric-type and magnetic-type roles inside a propagation-limited medium. In that usage, electric-type loading is more naturally tied to positional configuration and local storage contrast, while magnetic-type loading is more naturally tied to directional or velocity-linked organization. Stated more plainly, they are effective response analogs of generic electric and magnetic behavior under substrate propagation limits, not Maxwell-sector primitives inserted unchanged into the framework. The magnetic-type branch should also not be read as automatically inheriting the full co-moving noncollinear-steering remainder from the separate Wigner/Thomas analysis. Where a steering analogy is invoked for environmental or material forcing, the correct comparison is the externally applied regime, because the deflecting agency belongs to the surrounding transport structure rather than to an internally updated thruster-like source. This is why the slow-envelope branch distinguishes a displacement contribution from a material scalar loading, and why magnetic-type loading can act differently from electric-type loading on support and closure.

This distinction should remain intact in later work on refractive media, wave/particle structure, and the relation between excitation support and environmental material dressing.

## 9. Status and open items

The paper now has a stable excitation-side structure. At this stage the main question is no longer whether the branch has enough architecture to stand as a paper. It does. The remaining question is which unresolved items should be stated as live continuation rather than incorrectly promoted to solved status. The branch separation, field-based excitation picture, native closure/support functional, continuous occupancy refinement, and overlap-driven composition law are sufficient to support the present argument without further architectural change.

The remaining work is narrower than the earlier note-stage version suggested. The main unresolved items are:

1. a sharper microscopic definition of the excitation-side closure/storage burden term \(Q_{\mathrm{occ}}\),
2. a stronger derivation of the closure/phase functional beyond the current first STFR-native form,
3. a constitutive closure linking the scalar support dressings \(t_{\bullet}, c_{\bullet}\) to the directional transport tensors \(A^{ij}_{\bullet}\).

These are extensions of the current structure, not reasons to reopen it. The present draft is therefore best read as a first coherent excitation-side formulation whose remaining tasks are refinement and closure, rather than redefinition of the basic structure.

## 10. Conclusion

The excitation-side branch of the homogeneous propagation framework can now be stated more sharply than before. The displacement layer fixes the effective background geometry, but it does not determine closure by itself. A sustained localized matter excitation requires its own field-based closure description and its own support-selection logic. The material sector must also remain distinct, because constitutive loading changes local storage response rather than simply reproducing geometric displacement. Within that branch, electric-type and magnetic-type response are treated as propagation-limited constitutive analogs whose constraint structure differs, rather than as literal imported Maxwell primitives. When magnetic-type behavior is compared to spin or steering, the appropriate comparison for environmental forcing is the external-field regime, not the co-moving internal-thrust regime.

The present draft therefore develops a first coherent excitation-side structure. A minimal field is placed on the displaced background. Its eikonal limit yields a Hamilton--Jacobi relation with a separate closure scale. A slow-envelope limit reveals the displacement, closure, and material branches directly in the effective excitation energy. A native closure/support functional then gives a preferred support scale, and a continuous occupancy refinement replaces an empty geometric storage count by an effective excitation-side closure/storage burden. That occupancy channel is also given a sharper physical target: it is the formal bridge between the isolated support scale and the bulk packed-matter support scale near \(r_0\). Finally, the overlap problem is rewritten as a single composition law of two merging bubbles that is exposed-boundary-driven at weak overlap and approaches the corrected volumetric endpoint at strong merger.

This is not yet the final closure theory of matter in the framework. It does, however, convert the excitation problem from a loose placeholder into a defined formal program: derive the microscopic excitation-side closure/storage burden from the substrate, show how the isolated support scale is collectively dressed into the bulk scale near \(r_0\), recover the mass-to-displacement normalization from that support scale rather than treating \(G\) as primitive, refine the closure functional beyond the current first form, and determine whether support shift, closure-frequency shift, and effective localized-mode energy continue to move consistently under the same occupancy geometry. In that more modest but more disciplined sense, the paper functions as the first formal excitation-side branch of the series rather than as a final statement of matter theory.



## References

1. Buckeyne, James. *Homogeneous Light Propagation Framework*. Zenodo. doi:10.5281/zenodo.18997960.
2. Buckeyne, James. *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. doi:10.5281/zenodo.19079929.
3. Buckeyne, James. *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. doi:10.5281/zenodo.19155341.
4. Buckeyne, James. *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. doi:10.5281/zenodo.19155407.
5. Buckeyne, James. *The Homogeneous Propagation Framework: Weak-Field Observational Tests*. Companion paper.
6. Buckeyne, James. *The Homogeneous Propagation Framework: Philosophical Foundations and Postulate Structure*. Companion paper.
7. Rodrigues, Olinde. “Des lois géométriques qui régissent les déplacements d'un système solide dans l'espace, et de la variation des coordonnées provenant de ces déplacements considérés indépendamment des causes qui peuvent les produire.” *Journal de Mathématiques Pures et Appliquées* 5 (1840): 380–440.
8. de Broglie, Louis. *Recherches sur la théorie des quanta*. Paris, 1924.
9. Schrödinger, Erwin. “An Undulatory Theory of the Mechanics of Atoms and Molecules.” *Physical Review* 28, no. 6 (1926): 1049–1070. doi:10.1103/PhysRev.28.1049.
10. Hamilton, William Rowan. “On Quaternions; or on a New System of Imaginaries in Algebra.” *The London, Edinburgh, and Dublin Philosophical Magazine and Journal of Science* 25, no. 163 (1844): 489–495.
