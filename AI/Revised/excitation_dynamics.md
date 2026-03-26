# The Homogeneous Propagation Framework: Excitation, Closure, and Material Response

## Abstract

This paper develops the excitation-side branch of the homogeneous propagation framework. The displacement layer fixes the effective transport geometry through cumulative displacement and transport deformation, but it does not by itself explain how localized matter excitations maintain closure, realize a preferred support scale, or respond differently to geometric displacement and material loading. The present paper treats a localized mass as a sustained excitation of the vacuum storage medium and develops the first field-based closure model on that displaced background. A minimal excitation field is written on the effective geometry, its eikonal limit yields a Hamilton--Jacobi relation with a distinct closure scale, and a slow-envelope limit separates displacement, closure, and material contributions in the effective excitation energy. A native closure/support functional is then introduced, with transport-side and storage-side costs treated separately. The storage-side term is refined into a continuous internal occupancy factor, and the overlap/composition problem is recast as a single geometric law for merging internal bubbles rather than as two separately postulated mechanisms. This gives a first explicit support law and a corresponding closure-scale shift that remain surface-led at weak overlap while transitioning smoothly toward the corrected strong-merger endpoint. The result is not yet a final substrate derivation, but it sharpens the excitation problem into a tractable three-branch structure: displacement geometry, excitation closure, and material constitutive response.

## 1. Introduction

The displacement-side branch of the framework addresses how mass-energy deforms the transport-supporting vacuum structure and how that deformation propagates causally. What remains open is the excitation-side problem: if matter is a sustained localized excitation of the same medium, what fixes its closure, its support scale, and its response to displaced or materially loaded backgrounds?

The current working picture is that a localized mass is a sustained LC-like excitation that persistently occupies vacuum storage. The open problem is therefore not only how displacement propagates, but how a localized excitation closes on itself, maintains support, shifts its realized cycling on a displaced background, and acquires both particle-like and wave-like behavior.

This paper keeps three branches separate from the start:

1. **Displacement / geometric branch.** This branch is carried by the cumulative displacement and transport deformation, schematically \(\Sigma(x,t)\) and \(D(x,t)\), and determines the effective transport geometry.
2. **Excitation / closure branch.** This branch describes the sustained localized mode living on that background. It carries closure, internal cycling, localization, and support.
3. **Material constitutive branch.** This branch changes local storage ratios and impedance through constitutive response rather than by acting as additional pure displacement.

That three-way split is essential. Gravity/displacement, excitation closure, and material loading are related, but they are not the same effect written in different variables.

## 2. Live constraints and corrections

Several corrections are already in force and must constrain the excitation-side development.

First, the spatial transport deformation and the cumulative timing burden are not the same object. The earlier shorthand \(g = D^2 = 1 + 2\Sigma\) should not be reused without qualification. The cumulative displacement \(\Sigma\) controls the timing-side burden, while the spatial deformation branch requires separate treatment.

Second, the displacement-composition rule remains surface-area-like in the weak-overlap regime. Ordinary mass additivity and small binding are governed by exposed surface deficit, not by full volume addition.

Third, the strong-merger endpoint for complete volume addition corresponds to exponent \(n = 3/2\), not the earlier inverted value. This correction matters directly when internal occupancy is modeled through overlap or merger analogies.

These corrections do not invalidate the excitation-side program. They narrow it. The closure and occupancy model must preserve the weak-overlap surface rule, respect the corrected strong-merger endpoint, and avoid collapsing timing burden into spatial deformation.

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

The largest unresolved excitation-side problem is support selection: what fixes the preferred support scale of a localized sustained excitation?

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

The large-\(a\) storage term should not be interpreted as empty geometric occupancy. It is better interpreted as an excitation-side closure/storage burden: the effective depth to which a sustained localized mode occupies the available closure capacity of the medium.

To avoid overcommitting to literal integer submode counts, replace the storage-side count by a continuous factor \(Q_{\mathrm{occ}}\). In the present draft \(Q_{\mathrm{occ}}\) is treated phenomenologically: it is not a new displacement source term and not a vacuum-energy-density variable, but a dimensionless effective closure/storage loading factor for the excitation. The closure functional becomes

\[
E_{\mathrm{cl}}(a) = \frac{m c^2}{2} \left[ \alpha_{\mathrm{tr}}\left(\frac{\ell_C}{a}\right) + \alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}\left(\frac{a}{\ell_C}\right) \right].
\]

This is the first meaningful refinement of the storage-side term because it allows smooth overlap, merger-like crossover, and non-integer internal occupancy while keeping the excitation-side burden distinct from the displacement-side sourcing postulate.

With this replacement, the preferred support law becomes

\[
a_* = \ell_C\sqrt{\frac{\alpha_{\mathrm{tr}}}{\alpha_{\mathrm{cyc}}\,Q_{\mathrm{occ}}}}.
\]

The remaining problem is therefore to give \(Q_{\mathrm{occ}}\) a sharper microscopic and geometric meaning. For now it should be read as a to-be-fitted effective loading factor rather than a derived substrate count.

## 6. Geometric composition of internal occupancy

The best current first model treats internal structured occupancy by analogy with two overlapping or merging bubbles. This is a composition model for internal structured burden, not a literal claim that matter is made of two classical geometric bubbles. Earlier note work split the effect into a weak-overlap shared-surface reduction and a separate enlargement term tied to ambient displacement. That was useful scaffolding, but the current view is that those may not be distinct mechanisms. They may be the same composition geometry described from two sides.

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

The weak-overlap regime should remain surface-led. The strong-merger endpoint should approach the corrected volume-addition result.

### 6.2 Effective composition exponent

To encode that transition with one function, define an effective composition exponent

\[
n_{\mathrm{eff}}(u) = 1 + \frac{1-u}{2} = \frac{3-u}{2}.
\]

This gives the correct limits:

\[
n_{\mathrm{eff}}(1) = 1, \qquad n_{\mathrm{eff}}(0) = \frac{3}{2}.
\]

So the model is surface-area-like at weak overlap and reaches the corrected full volumetric endpoint at complete merger.

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

The strong-merger endpoint matches the corrected equal-input full-merger result. The combined occupancy burden is reduced below the surface-additive sum as the internal bubbles merge.

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

So deeper overlap reduces the storage-side burden and relaxes the preferred support outward by about 12.2% relative to the surface-additive baseline.

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

The leading correction is linear in \(1-u\), not quadratic. That is the expected qualitative behavior if the weak-overlap regime is controlled by shared surface area.

## 7. Closure-scale shift

The same occupancy model can be fed back into the excitation Hamilton--Jacobi branch by taking the closure burden scale to vary with the square root of effective occupancy. This is the specific closure-side identification used in Section 3.4 to connect carrier-frequency shift to the support/occupancy model,

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

A central point of the present paper is that material response should not be collapsed into the displacement branch. Materials change local storage ratios and impedance. In the present notation, the constitutive branch is carried schematically by

\[
\epsilon_r = 1 + \chi_e, \qquad \mu_r = 1 + \chi_m.
\]

At the excitation level, these loadings affect the response of the localized mode without becoming identical to pure displacement. The intent is not to treat them as literal primitive EM fields. It is to retain two effective constitutive channels that play broadly electric-type and magnetic-type roles inside a propagation-limited medium. In that usage, electric-type loading is more naturally tied to positional configuration and local storage contrast, while magnetic-type loading is more naturally tied to directional or velocity-linked organization. Stated more plainly, they are effective response analogs of generic electric and magnetic behavior under substrate propagation limits, not Maxwell-sector primitives inserted unchanged into the framework. The magnetic-type branch should also not be read as automatically inheriting the full co-moving noncollinear-steering remainder from the separate Wigner/Thomas analysis. Where a steering analogy is invoked for environmental or material forcing, the correct comparison is the externally applied regime, because the deflecting agency belongs to the surrounding transport structure rather than to an internally updated thruster-like source. This is why the slow-envelope branch distinguishes a displacement contribution from a material scalar loading, and why magnetic-type loading can act differently from electric-type loading on support and closure.

This distinction should remain intact in later work on refractive media, wave/particle structure, and the relation between excitation support and environmental material dressing.

## 9. Status and open items

The paper now has a stable excitation-side structure. The branch separation, field-based excitation picture, native closure/support functional, continuous occupancy refinement, and overlap-driven composition law are sufficient to support the present argument without further architectural change.

The remaining work is narrower than the earlier note-stage version suggested. The main unresolved items are:

1. a sharper microscopic definition of the excitation-side closure/storage burden term \(Q_{\mathrm{occ}}\),
2. a stronger derivation of the closure/phase functional beyond the current first STFR-native form,
3. a constitutive closure linking the scalar support dressings \(t_{\bullet}, c_{\bullet}\) to the directional transport tensors \(A^{ij}_{\bullet}\).

These are extensions of the current structure, not reasons to reopen it. The present draft is therefore best read as a first coherent excitation-side formulation whose remaining tasks are refinement and closure, rather than redefinition of the basic branch architecture.

## 10. Conclusion

The excitation-side branch of the homogeneous propagation framework can now be stated more sharply than before. The displacement layer fixes the effective background geometry, but it does not determine closure by itself. A sustained localized matter excitation requires its own field-based closure branch and its own support-selection logic. The material branch must also remain distinct, because constitutive loading changes local storage response rather than simply reproducing geometric displacement. Within that branch, electric-type and magnetic-type response are treated as propagation-limited constitutive analogs whose constraint structure differs, rather than as literal imported Maxwell primitives. When magnetic-type behavior is compared to spin or steering, the appropriate comparison for environmental forcing is the external-field regime, not the co-moving internal-thrust regime.

The present draft therefore develops a first coherent excitation-side structure. A minimal field is placed on the displaced background. Its eikonal limit yields a Hamilton--Jacobi relation with a separate closure scale. A slow-envelope limit reveals the displacement, closure, and material branches directly in the effective excitation energy. A native closure/support functional then gives a preferred support scale, and a continuous occupancy refinement replaces an empty geometric storage count by an effective excitation-side closure/storage burden. Finally, the overlap problem is rewritten as a single composition law of two merging bubbles that is surface-led at weak overlap and approaches the corrected volumetric endpoint at strong merger.

This is not yet the final closure theory of matter in the framework. But it turns the excitation problem into a more definite program: derive the microscopic excitation-side closure/storage burden from the substrate, refine the closure functional beyond the current first form, and determine whether support shift, closure-frequency shift, and effective localized-mode energy continue to move consistently under the same occupancy geometry. That is the current live continuation of the framework.

