# The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response

## Abstract

*Companion papers:* *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929); *The Homogeneous Propagation Framework: Weak-Field Observational Tests* (companion paper)

This paper develops the next dynamical step of the displacement framework. The starting point is the postulate that mass-energy sources a displacement of the transport-supporting structure, and that changes in that displacement propagate causally at the medium speed \(c\). In the stationary spherically symmetric limit, that postulate yields the equilibrium displacement geometry \(D(r,d)=\sqrt{r^2+d^2}/r\), the cumulative displacement field \(\Sigma(r)\), and the correct weak-field Newtonian limit. What has been lacking is the dynamical law that propagates this displacement away from equilibrium. This paper develops that law at the correct level: the equation belongs to the displacement layer of the framework, not to the full microphysics of matter.

The main dynamical claim is that the retarded displacement map is the primary expression of the causal structure. The field at a point depends on retarded source configuration rather than instantaneous source position, and the retarded integral for the cumulative displacement \(\Sigma(\mathbf{x},t)\) has a local wave-equation equivalent propagating at the medium speed \(c\). The displacement defines an effective coordinate-level geometry whose structure is fixed by the framework's own internal logic: the vacuum storage capacity is anchored to the coordinate grid, while transport is displaced relative to that grid. The resulting line element modifies the time and radial components while leaving the angular sector Euclidean, and its weak-field orbit equation recovers the standard perihelion precession. That scalar sector is sufficient for the stationary weak-field timing structure, but rotating sources require an additional vector response. The first non-spherical application is then the rotating-source frame-drag branch, whose current Earth-corrected Gravity Probe B estimate lies near the observed weak-field signal. The result is not yet a final closed field theory, but it does define a coherent dynamical program: a two-layer coupled structure, a causal retarded displacement map with its wave-equation equivalent, an effective coordinate geometry recovering the correct orbit structure, and a rotating-source vector extension.

## 1. Foundational Postulate and Scope

This framework begins from a single physical postulate: **mass-energy sources a displacement of the transport-supporting structure, and changes in that displacement propagate causally at the medium speed \(c\).** In the layered picture already developed in the companion transport/local-geometry paper, this is a statement about the geometry of the propagation-supporting stage itself, not about an additional force law acting within ordinary matter dynamics. The transport structure is the layer that carries the propagation condition, and when mass inserts volume into that layer, the resulting change in geometry appears observationally as gravity, lensing, time dilation, and related weak-field effects.

A useful structural comparison may be made with Wheeler’s familiar summary of general relativity: *matter tells spacetime how to curve, and spacetime tells matter how to move.* The present framework adopts an intentionally similar division of roles, but with a different ontology. Here the relation is instead: **mass tells space how to displace, and displaced space tells mass how to move.** The similarity is only at the level of coupling structure. In both cases, one sector describes how sources modify the stage, while another describes motion within the modified stage. In this framework, however, gravity is not identified with curvature of spacetime itself. It is identified with displacement of the transport-supporting spatial network.

This viewpoint leads naturally to two coupled dynamical layers. The first contains the ordinary dynamics of excitations, matter, and interactions evolving within the transport structure. The second contains the displacement of the transport structure itself. These layers are coupled, but not collapsed into a single equation. Mass sources displacement, and the resulting displacement modifies the effective geometry through which motion proceeds. Gravity is therefore not treated here as a conventional force internal to transport-structure dynamics, but as a modification of the stage on which those dynamics unfold. The two-layer architecture also clarifies the role of the present paper: the equation to be developed belongs to the displacement layer, not to the full microphysics of matter.

For a stationary isolated source, the equilibrium form of that displacement is described by

\[
D(r,d)=\frac{\sqrt{r^2+d^2}}{r},
\]

with \(d\) the displacement scale associated with the source. In the existing development, this form is not introduced as an arbitrary ansatz. It follows from the geometric requirement that when a volume \(\frac{4}{3}\pi d^3\) is inserted into the spherically symmetric transport structure, each shell originally at radius \(r\) is displaced outward to \(r'=\sqrt{r^2+d^2}\), so that the static displacement factor is simply the ratio \(r'/r\). The postulate is therefore physical, while the static form is geometric.

The weak-field structure is then governed not merely by the local deviation \(D-1\), but by the cumulative displacement

\[
\Sigma(r)=\int_r^\infty (D(r')-1)\,dr',
\]

whose weak-field limit gives

\[
\Sigma(r)\approx \frac{d^2}{2r}.
\]

This quantity carries the required \(1/r\) behavior, governs clock-rate and propagation effects, and yields Newtonian acceleration through its gradient. In that sense, the existing static development already supplies a definite hierarchy: local displacement, cumulative displacement, and the associated acceleration structure.

What remains to be developed is the dynamical law. At present, this framework does not derive from deeper substrate microphysics why mass has the role of sourcing displacement. That sourcing relation therefore remains a foundational postulate. The task of the present paper is to formulate the field equation from which the static equilibrium form \(D(r,d)\) emerges as the stationary solution, and to develop the consequences of causal displacement for moving and rotating sources.

The paper therefore does not claim to reduce gravity all the way to a deeper microscopic explanation of why mass displaces the transport structure. Its more limited aim is to formulate the displacement problem at the correct layer and to develop the consequences of that postulate in a causal setting. Once displacement is taken to be physical, and once changes in it are limited by the same propagation speed \(c\) that governs the underlying medium, retardation is no longer an added correction. It is part of the basic structure from the outset. The causal evolution of displacement is therefore the natural setting for Mercury-scale retardation effects, rotating-source response, and the frame-drag branch.

## 2. Static Equilibrium Geometry and the Cumulative Field

For a stationary isolated source, the displacement problem reduces to an equilibrium geometry. The foundational postulate is that mass inserts volume into the transport structure. In the spherically symmetric case, this means that a source with displacement scale \(d\) inserts a volume

\[
\frac{4}{3}\pi d^3
\]

at the origin of the surrounding transport-supporting medium. The resulting static geometry is then not chosen arbitrarily. It is fixed by the requirement that each spherical shell originally at radius \(r\) be displaced outward so as to accommodate the inserted volume while preserving spherical ordering. In the construction adopted here, that displaced shell radius is

\[
r'=\sqrt{r^2+d^2},
\]

so the equilibrium displacement factor is the ratio

\[
D(r,d)=\frac{r'}{r}=\frac{\sqrt{r^2+d^2}}{r}.
\]

Thus the physical postulate is volumetric insertion, while the form of \(D(r,d)\) is a geometric consequence. There is no additional functional freedom beyond the source scale \(d\).

This construction makes the local deformation of the transport structure explicit. A unit cell centered at radius \(r\) is compressed in the radial direction by a factor \(1/D\), stretched in each tangential direction by a factor \(D\), and therefore occupies a net coordinate volume larger by the factor

\[
\left(\frac{1}{D}\right)DD=D.
\]

The static displacement geometry is therefore anisotropic in its local deformation but scalar in its bookkeeping: the same single function \(D(r,d)\) determines radial compression, tangential stretching, and net volume expansion of the displaced medium.

Several immediate features of \(D(r,d)\) are worth recording. As \(r\to\infty\), one has \(D\to 1\), so the geometry tends smoothly to the undeformed background. Near the source, \(D\) grows without bound in the unregularized form, reflecting the concentration of the inserted displacement into the innermost region. For the purposes of the present paper, however, the main role of \(D\) is the weak-field structure at radii large compared with \(d\). In that regime,

\[
D(r,d)=\sqrt{1+\frac{d^2}{r^2}}\approx 1+\frac{d^2}{2r^2},
\]

so the local displacement above background falls with the inverse square of radius.

That inverse-square falloff is the correct local field-strength behavior, but not yet the quantity that governs time dilation and the effective weak-field potential. The key step in this framework is that observable weak-field timing effects are controlled by the **cumulative displacement**, not merely by the local deviation \(D-1\). The cumulative field is defined by

\[
\Sigma(r)=\int_r^\infty \bigl(D(r')-1\bigr)\,dr'.
\]

Its physical interpretation is the total excess transport medium encountered along the radial path from \(r\) out to infinity. In the weak-field limit \(d\ll r\), substituting \(D(r)-1\approx d^2/(2r^2)\) gives

\[
\Sigma(r)\approx \int_r^\infty \frac{d^2}{2r'^2}\,dr'=\frac{d^2}{2r}.
\]

This is the crucial transition from a local \(1/r^2\) structure to an accumulated \(1/r\) structure. The framework therefore has a definite hierarchy:

\[
D(r)-1 \sim \frac{d^2}{2r^2},
\qquad
\Sigma(r)\sim \frac{d^2}{2r},
\qquad
\frac{d\Sigma}{dr}\sim \frac{d^2}{2r^2}.
\]

The local displacement gives the field-strength scaling, the cumulative displacement gives the clock and propagation scaling, and the gradient of the cumulative displacement returns the inverse-square acceleration structure.

This hierarchy connects the static geometry to Newtonian gravity. Matching the cumulative displacement to the standard weak-field time-dilation form gives

\[
\frac{d^2}{2r}=\frac{GM}{c^2r},
\]

so that

\[
d^2=\frac{2GM}{c^2}.
\]

With this identification, the acceleration associated with the cumulative displacement becomes

\[
g=c^2\frac{d\Sigma}{dr}=c^2\frac{d^2}{2r^2}=\frac{GM}{r^2}.
\]

Thus Newtonian gravity appears not as a separate postulate, but as the acceleration associated with the gradient of accumulated displacement once the static source scale is tied to mass through \(d^2=2GM/c^2\).

## 3. The Open Dynamics Problem

The static displacement geometry developed in the previous section is already constrained enough to recover the weak-field hierarchy, the cumulative displacement \(\Sigma(r)\), and the Newtonian limit. What it does not yet provide is the dynamical law from which that geometry follows. The function \(D(r,d)\) describes the equilibrium displacement around a stationary source, but it is not yet derived as a solution of a field equation, action principle, or evolution law. The task for the remainder of this paper is to formulate that dynamical equation at the correct level: not as a replacement for the full microphysics of matter, but as the law governing the displacement layer specifically.

That task should be stated at the correct level. The displacement equation is not intended to replace the whole microphysics of matter, nor to absorb all of ordinary matter dynamics into a single gravitational master equation. One layer contains the ordinary dynamics of matter and interactions within the transport structure. The other contains the displacement of the transport structure itself. These layers are coupled, but they are governed by different equations. The displacement equation only needs to know where masses are and how they move; it does not need to encode the internal structure of each source body. In that sense, the field equation belongs specifically to the displacement layer.

Gravity is not being treated here as a force internal to the transport structure. It is the transport structure itself being displaced. The task is therefore to propagate information about that displacement causally through the medium, not to reformulate all non-gravitational physics. Once this is stated clearly, the target of the field equation becomes narrower and cleaner: it must describe how mass-sourced displacement is communicated through the transport structure at the medium speed \(c\). Sections 4 and 5 develop that equation through the retarded displacement map and its local wave-equation equivalent.

## 4. Retarded Displacement Map

Once displacement is treated as a physical modification of the transport-supporting network, and once changes in that displacement are taken to propagate at speed \(c\), the natural dynamical construction is retarded rather than instantaneous. The field at a point cannot depend on the source as it is “now” in a coordinate bookkeeping sense, but only on the source configuration whose influence has had time to propagate through the medium. In that sense, the displacement problem is causal from the outset: the geometry at a field point is determined by the past state of the source, evaluated on the relevant propagation cone.

This suggests that the most fundamental statement of the dynamics is not differential but integral. Given a collection of masses with known trajectories, the displacement at each field point is constructed by summing source contributions evaluated at retarded time. In plain terms: given where masses are and how they are moving, evaluate the displacement at each field point by summing retarded contributions from all sources, each propagating at \(c\), using the source position at the retarded time. The importance of this statement is that it defines the dynamical problem directly in physical terms. The field is whatever results from propagation-limited sourcing through the medium; a PDE, if introduced later, is only a local representation of that more basic causal rule.

For a single source, this means the displacement field at spacetime point \((\mathbf{x},t)\) is determined by the source position \(\mathbf{x}_s(t_r)\) at retarded time \(t_r\), where \(t_r\) satisfies

\[
t-t_r=\frac{R(t_r)}{c},
\qquad
R(t_r)=\|\mathbf{x}-\mathbf{x}_s(t_r)\|.
\]

The field therefore depends on the delayed source-to-field separation rather than on the instantaneous separation. In the static limit, where \(\mathbf{x}_s\) is constant, the retarded construction collapses trivially to the stationary geometry of Section 2. The static displacement function \(D(r,d)\) is therefore the equilibrium rest solution of the retarded map, not an unrelated object that later has dynamics added to it.

For many sources, the full field is obtained by combining retarded contributions according to the multi-source composition rule of the framework. In the weak and well-separated regime this may be approximated by a direct sum over retarded source terms. In the fuller displacement picture, however, the contributions are not strictly additive: local space may already be displaced by distant sources before the nearer source acts, so ordering remains relevant. One is not superposing independent forces in empty space, but composing deformations of a medium already modified by other sources.

This causal picture explains why several previously separate weak-field effects can be treated within a common dynamical language. In the static case, the cumulative displacement \(\Sigma(r)\) governs clock-rate and propagation effects, while the local geometry \(D(r,d)\) governs spatial deformation. Once the source is time-dependent, those same quantities become retarded fields. Mercury precession can then be read as a consequence of finite-speed response on an accelerated orbit; Shapiro delay remains the integrated clock-rate effect of the cumulative displacement along the signal path; and the rotating-source problem becomes a retarded field problem rather than a purely static geometric one.

For that reason, the retarded map should be treated here as the conceptual heart of the dynamics paper. It states what gravity is at the displacement layer: not an instantaneous action, and not a force law internal to matter dynamics, but a propagation-limited modification of the transport stage sourced by the past state of matter.

## 5. Two-Layer Coupled Structure and the Coordinate-Level Effective Geometry

The retarded displacement map gives the physical rule: mass-sourced displacement propagates through the transport-supporting medium at speed \(c\), and the field at any point is determined by the retarded source configuration rather than by instantaneous source position. The present section develops two further steps. First, the retarded map is given an explicit integral form whose static limit recovers the established cumulative displacement. Second, the displacement is shown to define an effective coordinate-level geometry whose weak-field orbit structure reproduces the standard perihelion precession.

### 5.1 Two coupled layers

The dynamics of this framework are organized as two coupled layers rather than a single master equation.

The first layer contains the ordinary dynamics of excitations — matter as sustained LC oscillations, electromagnetic fields, and their interactions — evolving within the transport-supporting structure. These excitations propagate through the transport structure at the speed set by the vacuum storage medium: \(c=1/\sqrt{\varepsilon_0\mu_0}\). Their energy-momentum distribution is the source of displacement.

The second layer contains the displacement of the transport structure itself. The cumulative displacement field \(\Sigma(\mathbf{x},t)\) responds to the energy distribution of the first-layer excitations, with changes propagating causally at \(c\). The resulting displacement modifies the effective geometry through which first-layer excitations propagate. Gravity is therefore not a force internal to the excitation layer. It is a modification of the stage on which those excitations evolve, fed back from the displacement layer.

The coupling is bidirectional. Excitation energy sources displacement; displacement reshapes the transport geometry that governs excitation dynamics. In the general case, the two layers must be solved together: moving sources change the displacement, and the changing displacement modifies the source trajectories.

In the static and weak-field regimes, however, this coupling decouples into a one-way hierarchy. When the source is stationary, the displacement layer reduces to a Poisson equation that is solved once for the given energy distribution. The resulting \(\Sigma(r)\) sets a fixed background geometry, and the excitation layer then evolves on that background without modifying it. The two layers do not iterate. This static decoupling is what makes the equilibrium geometry tractable: the source sits at rest, its energy distribution sources \(\Sigma(r)=d^2/(2r)\), and the resulting displacement geometry is the equilibrium form \(D(r,d)\) already established.

The same decoupling extends to test excitations on a static background. A planet orbiting the Sun moves within the Sun's fixed displacement geometry. The planet's own displacement is negligible compared to the Sun's, so it does not modify the background. The displacement layer is solved once for the dominant source; the excitation layer provides the orbit equation on that fixed background. All of the weak-field results developed in this paper — Mercury precession, Shapiro delay, light deflection, and the GPB geodetic and frame-drag measurements — belong to this decoupled regime.

The layers re-couple when comparable-mass sources move and accelerate in each other's displacement fields. A compact binary system, where each body's displacement significantly affects the other's trajectory and the trajectories in turn modify the displacement, requires the full retarded integral with both layers evolving together. That strong-coupling regime is the frontier beyond the present paper.

### 5.2 The displacement layer: retarded integral form

The natural variable for the displacement layer is the cumulative displacement \(\Sigma(\mathbf{x},t)\) rather than the local displacement factor \(D\). The reason is the same one already seen in the static theory: \(D-1\) carries the local \(1/r^2\) field-strength structure, while \(\Sigma\) carries the accumulated \(1/r\) structure that governs clock-rate, propagation, and weak-field dynamics.

The retarded map of Section 4, written as an explicit integral, gives

\[
\Sigma(\mathbf{x},t)=\frac{G}{c^2}\int\frac{\rho_{\mathrm{LC}}(\mathbf{x}',t_r)}{|\mathbf{x}-\mathbf{x}'|}\,d^3x',
\]

where \(\rho_{\mathrm{LC}}\) is the energy density of the LC excitations that constitute the source, and the retarded time satisfies \(t_r=t-|\mathbf{x}-\mathbf{x}'|/c\). This is the displacement analog of the retarded potential in electromagnetism: the cumulative displacement at a field point is sourced by the retarded energy distribution, propagated through the vacuum medium at speed \(c\).

The integral form is the more fundamental statement. Its equivalent local differential representation is

\[
\frac{1}{c^2}\partial_t^2\Sigma-\nabla^2\Sigma=\frac{4\pi G}{c^2}\,\rho_{\mathrm{LC}},
\]

which is a wave equation with source, propagating at the medium speed \(c\). The propagation speed is not a free parameter: it is the only speed the vacuum storage medium supports. In the static limit, this reduces to

\[
\nabla^2\Sigma=-\frac{4\pi G}{c^2}\,\rho_{\mathrm{LC}},
\]

whose point-source solution is \(\Sigma(r)=GM/(c^2r)=d^2/(2r)\), recovering the established cumulative displacement. Once \(\Sigma(\mathbf{x},t)\) is known, the local geometric displacement factor may be recovered algebraically by

\[
D(r,t)=\frac{\sqrt{r^2+2r\,\Sigma(r,t)}}{r}.
\]

For the static point-source solution, this reduces immediately to the equilibrium form of Section 2.

The displacement field does not have independent oscillatory dynamics in the way that a free wave does. It tracks the retarded source distribution. Outgoing displacement disturbances — the framework's gravitational waves — are the retarded response to accelerating matter, not free oscillations of the displacement field itself. The wave-equation form encodes the same causal retardation as the integral; the two descriptions are complementary.

### 5.3 The excitation layer: effective coordinate geometry

The second step is to determine what geometry the first-layer excitations see when propagating through a displacement background. The key constraint comes from the vacuum storage structure. The storage capacity \(F\!\cdot\!H=\varepsilon_0\mu_0\) is attached to the coordinate grid (Appendix A). Displacement moves the transport structure relative to that grid, but it does not move the grid itself.

In the displaced transport structure, a unit cell at radius \(r\) is compressed radially by \(1/D\) and stretched tangentially by \(D\). A physical meter — realized within transport as a sustained LC excitation — co-deforms with the transport. The physical meter is not identical to the transport structure; it is an observable realized within it. When transport is displaced, the rod's realized properties change accordingly: radially, the physical meter spans fewer coordinate meters; tangentially, it spans more.

The question is how this deformation appears in the coordinate-level description that governs the effective dynamics. The answer is set by which quantities belong to coordinates and which belong to transport.

**Temporal component.** The 3D oscillation that constitutes a clock cycle traverses a net volume of \(F\!\cdot\!H\) that scales as \(D\) relative to the undisplaced case (the product of radial compression \(1/D\) and tangential stretch \(D\) in two directions). A complete cycle therefore encounters more total storage, and the clock runs slower. The realized clock rate relative to coordinate time is \(1/(1+\Sigma)\), giving an effective time-time component

\[
f(r)=\frac{1}{(1+\Sigma(r))^2}.
\]

**Radial component.** A physical meter in the radial direction spans \(1/D\) coordinate meters. Equivalently, one coordinate meter radially spans \(D\) physical meters of transport. In the effective coordinate-level line element, this means the radial coefficient is

\[
g(r)=D(r)^2=1+2\Sigma(r),
\]

where the second equality uses the weak-field relation \(D^2\approx 1+2\Sigma\).

**Angular component.** The tangential stretching of transport cells means each cell covers more coordinate arc. But the coordinate arc \(r\,d\theta\) is a property of the coordinate grid, and the coordinate grid is not displaced. The angular bookkeeping in coordinates remains Euclidean. This is the critical point: the storage capacity \(F\!\cdot\!H\) per coordinate meter is unchanged by displacement, and the coordinate angles are defined on the coordinate grid, not on the transport chart. The angular coefficient is therefore

\[
h(r)=1.
\]

The effective coordinate-level line element for excitations propagating through the static displacement background is then

\[
ds^2=-\frac{c^2}{(1+\Sigma)^2}\,dt^2+D^2\,dr^2+r^2\,d\Omega^2.
\]

In the weak field, with \(\sigma=r_s/r=2GM/(c^2r)=2\Sigma\), this becomes

\[
ds^2\approx -(1-\sigma)\,c^2\,dt^2+(1+\sigma)\,dr^2+r^2\,d\Omega^2,
\]

which is the standard weak-field form to leading order in \(\sigma\).

### 5.4 Recovery of the weak-field orbit structure

The effective geometry of the preceding subsection is not merely a rewriting of known results. It is derived from the displacement framework's own internal logic: the storage capacity is on the coordinate grid, the displacement deforms transport relative to that grid, and the physical meter co-deforms with transport. The fact that the resulting line element agrees with the standard weak-field Schwarzschild form at leading order is a consistency check, not a circular input.

The orbit equation for a test excitation on this background may be derived by standard methods. In the weak-field expansion, the orbit equation takes the form

\[
\frac{d^2u}{d\phi^2}+u=\frac{GM}{L^2}+\frac{3GM}{c^2}\,u^2+O(\sigma^2),
\]

where \(u=1/r\) and \(L\) is the conserved angular momentum per unit mass. The \(3GM\,u^2/c^2\) correction is the term responsible for perihelion precession. For Mercury, it gives

\[
\delta\omega=\frac{6\pi GM}{a(1-e^2)\,c^2}=42.98\ \text{arcsec/century}.
\]

The three contributions previously identified for Mercury precession — retardation mismatch, time-dilation steering, and cumulative displacement gradient — are therefore not three separate physical mechanisms to be added independently. They are three aspects of a single geometric fact: the displacement of transport on the coordinate grid modifies the time component and the radial component of the effective coordinate geometry, while the angular component remains Euclidean. The orbit equation on that effective geometry produces the correct precession as one integrated result rather than as a sum of separately motivated corrections.

The same effective geometry also supports the Shapiro delay as a pure clock-rate effect and the geodetic precession as the same three-contribution structure applied to the GPB orbit [7]. In each case, the coordinate-level description carries the full physics. Local clock rates, rod lengths, and other realized-geometry observables may be recovered from the coordinate description whenever needed, but the dynamics are most cleanly posed in coordinate terms.

## 6. Rotating Sources and the Vector Response

The preceding sections establish the scalar displacement sector: mass-sourced displacement is causal, propagation-limited, and in the stationary spherically symmetric limit is captured by the equilibrium geometry \(D(r,d)\) or, more naturally for dynamics, by the cumulative field \(\Sigma(\mathbf{x},t)\). That scalar sector is sufficient for the static point-source problem and for the first weak-field timing and propagation effects. It is not sufficient for the first genuinely non-spherical source class: rotating bodies. The rotating-source problem requires the causal displacement framework to develop a corresponding vector response.

This extension follows naturally from the retarded-map viewpoint. In the static scalar case, the source is fully specified by radial displacement around a stationary center. For a rotating body, however, the source elements are not merely displaced in radius; they are moving around the source axis with definite handedness. The retarded field at a probe point must therefore retain information about source motion as well as source location. A purely scalar field can encode the strength of cumulative displacement, but it cannot by itself encode the azimuthal asymmetry associated with source rotation. The causal displacement layer must therefore admit a vector channel in addition to the scalar cumulative field.

The relevant object is the retarded **vector** field built from the spin-odd azimuthal component of the source pull. This is the key conceptual step: the rotating-source problem belongs to the vector response of the displacement field, not to the symmetric scalar geometry alone. The leading far-field form is taken to be

\[
V_{\phi,\mathrm{odd}}(\rho,\theta)\propto \omega\,\frac{\cos\theta}{\rho^2},
\]

where \(\omega\) is the source spin, \(\rho\) is the probe radius, and \(\theta\) is latitude relative to the spin axis. This form is linear in source spin, odd under reversal of \(\omega\), azimuthal rather than radial, and modulated by latitude through \(\cos\theta\).

This vector channel should be introduced carefully. The paper does not need to claim that the full rotating-source field equation has already been derived in closed substrate form. What can be said more cleanly is that the retarded displacement map, once applied to a spinning source, naturally generates a vector response whose stable observational content lies in the spin-odd azimuthal sector. The scalar cumulative field remains the correct object for the stationary weak-field timing structure, while the rotating-source response requires the corresponding vector extension of the same causal architecture.

## 7. Gravity Probe B and the Frame-Drag Estimate

The rotating-source vector response becomes physically meaningful only when it is tied to an observable. In this framework, the natural first test case is Gravity Probe B. The role of the present section is therefore not to introduce a new phenomenological domain, but to extract the first concrete weak-field observable from the rotating-source displacement field developed in the previous section.

The observable to be extracted is the frame-drag component of the GPB gyroscope drift. The geodetic branch belongs to the already-established three-contribution weak-field structure and need not be rederived in the body. The present section is concerned only with the rotating-source contribution.

Within the rotating-source construction, the relevant field is the retarded spin-odd azimuthal component

\[
V_{\phi,\mathrm{odd}}(\rho,\theta)\propto \omega\,\frac{\cos\theta}{\rho^2}.
\]

This object is the stable carrier of the frame-drag signal in the current route. Its symmetry already fixes much of the observable structure. The response is linear in the source spin \(\omega\), reverses sign under spin reversal, and varies over latitude through the factor \(\cos\theta\). The azimuthal character of the field is what makes it the natural home of frame dragging in this framework: it is a genuine rotating-source response, not a correction to the scalar equilibrium geometry.

The practical extraction proceeds in four steps. First, determine the equatorial fixed-probe value at the GPB orbital radius. Second, extend that value over latitude using the established \(\cos\theta\) dependence. Third, perform the polar-orbit projection analytically rather than by stepping a moving probe around the full orbit. Fourth, convert the thin-shell source model to the Earth’s actual moment of inertia.

On that route, the thin-shell estimate for the GPB frame-drag signal is about \(82.5\) milliarcsec/yr. Applying the Earth moment-of-inertia correction

\[
\frac{I_\oplus/(MR^2)}{2/3}=\frac{0.3307}{2/3}\approx 0.496,
\]

yields an Earth-corrected prediction of about \(40.9\) milliarcsec/yr. This is close to the GPB measured frame-drag value of \(39.2\) milliarcsec/yr. In the logic of the present paper, that agreement is not yet presented as a final closed derivation from the deeper substrate, but it is strong evidence that the rotating-source displacement field is carrying the right weak-field structure.

## 8. Limits, Status, and the Remaining Closure Problem

The preceding sections establish a definite intermediate result. This framework already supplies a static equilibrium geometry for mass-sourced displacement, a cumulative field \(\Sigma\) with the required \(1/r\) weak-field structure, and a causal retarded interpretation in which displacement changes propagate at the medium speed \(c\). The two-layer coupled structure then provides the dynamical organization: the displacement layer tracks the retarded source distribution through a wave equation at speed \(c\), while the excitation layer evolves within the effective coordinate geometry set by that displacement. The coordinate-level line element — with its time dilation from \(\Sigma\), radial modification from \(D^2\), and unmodified angular sector — recovers the correct weak-field orbit structure, including the standard perihelion precession. The rotating-source analysis identifies a spin-odd azimuthal vector response as the natural home of frame dragging.

At the same time, the limits of the present result should be stated plainly. The foundational postulate remains exactly that: mass inserts volume into the transport structure, and changes in that displacement propagate causally. What has not yet been derived is the deeper microphysical reason that mass has this sourcing role. The framework therefore remains explicit about where it is postulating and where it is deriving. The geometry of \(D(r,d)\), the cumulative displacement \(\Sigma(r)\), and the weak-field hierarchy are derived once the postulate is granted; the postulate itself is not yet reduced to a deeper mechanism.

The two-layer structure and the retarded integral for \(\Sigma(\mathbf{x},t)\) represent a step beyond the purely static geometric development. The retarded map is the more fundamental statement: source information propagates outward at \(c\), and the field at a point depends on the retarded source configuration. The wave equation is its local differential equivalent. Together they fix the propagation speed to \(c\) (the only speed the medium supports) and tie the source term directly to the LC energy density of matter. The effective coordinate geometry derived from the displacement then recovers the weak-field tests without requiring separately motivated correction terms.

The rotating-source case sharpens this point. The scalar cumulative field is sufficient for the stationary weak-field timing sector, but it is not sufficient for rotating bodies. There the framework requires a vector response, and the current route identifies the stable observable channel as the spin-odd azimuthal component of the retarded field. That is enough to support a coherent GPB route, but it is not yet the same thing as a fully derived rotating-source field equation. The present paper therefore claims the vector channel as the correct qualitative and quantitative direction, not as a fully closed final theory of spinning sources.

The remaining closure step can now be stated more precisely than before. A completed displacement dynamics would need to do at least four things. First, it would have to derive the displacement sourcing relation from deeper substrate structure rather than leave it primitive. Second, it would have to supply a full retarded field law or equivalent local equation whose stationary solution is the established \(D(r,d)\) geometry. Third, it would have to incorporate the vector response of moving and rotating sources in the same unified formalism rather than as a separate downstream construction. Fourth, it would have to recover the already-established weak-field tests without changing their successful static or weak-field sectors.

Beyond the weak-field orbital tests, the two-layer structure also implies gravitational radiation from accelerating sources. The displacement deformation is not merely a scalar but carries a tensor structure reflecting the anisotropy of the transport deformation (radial compression, tangential stretch). For a compact binary, the time-varying tensorial pattern radiates at the quadrupole level. The scalar wave equation for the cumulative displacement \(\Sigma\) gives one sixth of the general-relativity power; the full symmetric deformation tensor has six independent components, each radiating with equal power due to the isotropy of the vacuum impedance; and the total power therefore matches the GR quadrupole formula exactly [7]. For circular orbits this reproduces the Hulse-Taylor inspiral rate. For eccentric orbits, the oscillating trace provides an additional breathing-mode channel absent in general relativity, potentially modifying the eccentricity enhancement function \(f(e)\).

### 8.1 Self-consistency of the two-layer loop

The two-layer structure raises a natural self-consistency question. The displacement layer sources \(\Sigma\) from the energy density of LC excitations. The excitation layer evolves within the effective geometry set by that displacement. For the loop to close, the energy distribution of a source at rest in its own displacement field must be consistent with the \(\Sigma\) it generates.

In the static case, this loop closes straightforwardly. A point mass with energy \(mc^2\) sources a cumulative displacement \(\Sigma(r)=GM/(c^2r)\) through the Poisson equation. The resulting effective geometry is the coordinate-level line element of Section 5.3. A stationary source sitting at the origin of that geometry is at rest in the displacement it creates — there is no further feedback at this order. The static displacement is the equilibrium configuration, and the effective geometry is self-consistent.

The remainder of this subsection and the next sketch how the self-consistency loop might close at a deeper level. These remarks identify where the connections must eventually be made, but the derivations themselves are not completed in this paper.

The deeper question is what determines the source energy \(mc^2\) itself. In this framework, matter is a sustained LC excitation of the vacuum medium. Such an excitation cycles between the capacitive (\(\varepsilon_0\)) and inductive (\(\mu_0\)) storage modes at a definite frequency. The resonant frequency of a vacuum region of spatial extent \(\ell\) is \(f\sim c/\ell\), set entirely by the medium properties. A sustained excitation — one that persists rather than dispersing — must satisfy a closure condition: after one complete LC cycle, the excitation must return to its starting configuration. This topological closure quantizes the action per cycle, and that quantum is Planck's constant \(h\). The energy of the excitation is then \(E=hf\), and its spatial extent is the Compton wavelength \(\ell_C=h/(mc)\).

The same LC substrate also determines the de Broglie wavelength of a moving excitation. A particle at rest has a spatially uniform internal phase. When the excitation moves at velocity \(v\) through the transport medium, the simultaneity slope \(v/c^2\) per unit length — already derived in the homogeneous propagation framework — converts that uniform phase into a spatial phase gradient. The wavelength of that gradient is

\[
\lambda_{\mathrm{dB}}=\frac{c^2}{v\,f_0}=\frac{h}{mv}=\frac{h}{p},
\]

where \(f_0=mc^2/h\) is the rest-frame cycling frequency. The de Broglie relation is therefore not an independent postulate. It is the spatial phase structure of an LC resonance viewed through the simultaneity tilt of the propagation framework.

### 8.2 Hierarchy of constants

The framework's constant structure then has a natural hierarchy. The medium properties \(\varepsilon_0\) and \(\mu_0\) give the propagation speed \(c\) and the vacuum impedance \(Z_0\). The closure condition on sustained LC resonances gives the quantum of action \(h\). The gravitational constant \(G\) is the bridge between the excitation layer and the displacement layer: it determines how much displacement one unit of LC energy produces. The relationship \(d^2=2Gm/c^2\) connects the displacement scale of a source to its mass, and the per-nucleon form \(G=d_n^3c^2/m_n\) (times a geometric factor) suggests that \(G\) is derivable if the nucleon's displacement radius \(d_n\) can be determined from the LC resonance structure of the nucleon itself.

The self-consistency of the full loop — medium properties determine resonance structure, resonance structure determines source energy, source energy determines displacement, displacement modifies the medium geometry, and the modified geometry supports the resonance — is not yet closed in this paper. But the two-layer structure developed here defines each link in the chain and identifies where the remaining derivations must connect.

## 9. Conclusion

This framework treats gravity as a causal displacement of the transport-supporting spatial network rather than as a force internal to ordinary matter dynamics. Starting from the postulate that mass-energy sources that displacement, and that changes in it propagate at speed \(c\), the static equilibrium geometry \(D(r,d)\) and the cumulative field \(\Sigma(r)\) recover the required weak-field hierarchy and Newtonian limit.

The dynamical problem is organized as two coupled layers. The displacement layer tracks the retarded energy distribution of matter through the medium at speed \(c\), with the retarded integral as the fundamental statement and the wave equation as its local differential equivalent. The excitation layer contains the ordinary dynamics of matter and fields evolving within the effective coordinate geometry set by the displacement. That geometry is determined by the framework's own internal logic: the vacuum storage capacity \(F\!\cdot\!H\) is anchored to the coordinate grid, the displacement deforms transport relative to that grid, and the physical meter co-deforms with transport. The resulting coordinate-level line element modifies the time component and the radial component while leaving the angular sector Euclidean, and its weak-field orbit equation recovers the standard perihelion precession as a single integrated geometric result.

This same causal architecture extends beyond the stationary scalar sector. For rotating sources, the relevant response is not exhausted by the symmetric cumulative field alone, but requires a spin-odd azimuthal vector channel. In the current route, that channel yields a Gravity Probe B frame-drag estimate of about \(40.9\) mas/yr after polar-orbit projection and Earth moment-of-inertia correction, close to the observed \(39.2\) mas/yr.

The result is not yet a final closed field theory. What it does provide is a coherent dynamical program: a two-layer coupled structure, a causal retarded displacement map with its local wave-equation equivalent, an effective coordinate geometry whose weak-field orbit equation gives the correct precession, and a rotating-source vector branch that reaches the observed weak-field frame-drag scale. The remaining closure problem is now sharply defined: derive the full displacement field law from the deeper substrate, recover the established static geometry as its stationary solution, and unify the scalar and rotating-source sectors within one formal dynamical framework.

## Appendix A. Vacuum Storage, Propagation Units, and Meters per Storage Capacity

This framework treats the vacuum storage field as a distributed substrate support characterized by the familiar constants \(\varepsilon_0\) and \(\mu_0\), with units \(F/m\) and \(H/m\). Their product sets the propagation scale,

\[
c=\frac{1}{\sqrt{\varepsilon_0\mu_0}},
\]

so that \(\varepsilon_0\mu_0\) carries dimensions of time-squared per length-squared. In this sense, the propagation speed is not an additional postulate but the wave speed supported by the storage structure itself.

The important geometric point for the displacement framework is that the storage capacity represented by \(F\!\cdot\!H\) is attached to the coordinate description. When mass displaces the transport structure, a unit cell of the transport-supporting medium spans more or less coordinate extent depending on direction, but the local physical meter realized by rods and clocks co-expands or co-compresses with that same displacement. The result is that the amount of storage structure encountered per physical meter remains matched to the realized meter itself. Light therefore continues to propagate at \(C\) in the locally realized geometry even in a displaced region; what changes is not the local physical speed of light but the realized clock rate and the accumulated displacement along a path.

This point is used repeatedly in the appendices that follow. It underlies the interpretation of Shapiro delay as a pure clock-rate effect, supports the cumulative-displacement reading of weak-field timing structure, and explains why geometric displacement and timing effects can be separated without introducing a local anisotropy in the speed of light.

## Appendix B. Nonlinear Displacement and the Strong-Field Regime

The wave equation for \(\Sigma\) developed in Section 5.2 is linear: the propagation speed is \(c\), the source term is the LC energy density, and the superposition of solutions from multiple sources is additive. This linearity is valid in the weak field, where \(\Sigma\ll 1\) and the displacement is a small perturbation of the transport structure. The present appendix identifies where that linearity breaks down and what replaces it.

### B.1 Displacement-dependent stiffness

The linear wave equation treats the transport medium as having fixed properties: the \(F\!\cdot\!H\) storage per coordinate meter is constant, and the propagation speed \(c\) is determined by that constant storage density. But when the transport structure is displaced, the medium is already deformed. A region with existing displacement \(\Sigma>0\) has its transport cells stretched tangentially and compressed radially. Further displacement into that already-deformed medium encounters less resistance than the same displacement would in the undisplaced background.

The physical mechanism is the same one that produces the golden-ratio crossing noted earlier: the displacement function \(D(r)\) describes a medium whose local properties depend on the current deformation state. In the language of the wave equation, the coefficient multiplying \(\nabla^2\Sigma\) is not the bare \(c^2\) but an effective speed that depends on the local value of \(\Sigma\). The displacement equation is therefore inherently nonlinear: the medium through which displacement propagates is itself modified by the displacement.

In the weak field this correction is negligible. At the surface of the Sun, \(\Sigma\sim 10^{-6}\), and the nonlinear correction to the propagation coefficient is of order \(\Sigma^2\sim 10^{-12}\). At any currently accessible precision level, the linear wave equation suffices. The nonlinearity becomes significant only when \(\Sigma\) approaches order unity — the strong-field regime.

### B.2 Multi-source composition and the ordering rule

For multiple sources, the nonlinearity appears more concretely. The displacement from each source acts on a medium that is already displaced by every other source. In the framework's composition rule, contributions are applied in order of distance: the farthest source first, the closest source last. Each successive displacement acts on the result of the previous one, not on the undisplaced background.

The consequence is that two nearby masses allow each other to displace more than each would in isolation. The first mass displaces the medium; the second mass encounters an already-stretched medium with reduced stiffness and therefore produces a slightly larger displacement than it would in flat space. The combined displacement of two nearby sources is slightly greater than the sum of their individual displacements. This is the origin of the second post-Newtonian parameter \(\beta\neq 1\) in the framework, though the correction is of order \(\Sigma^2\) and is unmeasurably small in any current weak-field test.

### B.3 Strong-field structure

The following discussion describes the qualitative behavior implied by the displacement geometry when extrapolated beyond the weak-field regime. Because the nonlinear wave equation (Section B.4) has not yet been derived from the LC substrate, the strong-field picture described here is framework-motivated extrapolation rather than a derived result. Its purpose is to identify what the displacement picture implies at the structural level, not to claim quantitative predictions in the strong-field domain.

At radii approaching the displacement scale \(d\) — equivalently, where \(\Sigma\) approaches order unity — the linear theory breaks down in a specific way. The cumulative displacement \(\Sigma(r)=d^2/(2r)\) grows without bound as \(r\to 0\), but the physical displacement factor \(D(r)\) is finite everywhere: it approaches \(d/r\) at small radii, becoming large but never infinite (or, with the regularization parameter \(\epsilon\), saturating at \(d/\epsilon\)).

The strong-field picture in this framework is not a singularity but an extreme deformation. The transport structure is stretched to its limits: tangentially expanded by large \(D\), radially compressed by \(1/D\), with the net volume per cell growing as \(D\). The time dilation factor \(1/(1+\Sigma)\) approaches zero — physical processes become arbitrarily slow relative to coordinate time — but never reaches it. There is no point at which the transport structure is torn; the LC network remains continuous, though severely deformed.

In this picture, a black hole is the regime where \(\Sigma\gg 1\) over a macroscopic region. The mass resides on or near the displacement surface — the locus where \(D\) is large enough to produce extreme time dilation — rather than at a central point. The interior of the displacement region is nearly frozen in coordinate time but physically connected. The storage structure remains continuous and finite throughout — there is no singularity of the kind that produces divergences when the gravitational field is quantized. Effective horizons may still exist for particular classes of events depending on timescale and context, but the underlying transport structure is not torn or terminated at any finite radius.

### B.4 The nonlinear wave equation

The preceding discussion suggests that the full displacement dynamics takes the form of a wave equation with displacement-dependent coefficients:

\[
\frac{1}{c^2_{\mathrm{eff}}(\Sigma)}\,\partial_t^2\Sigma-\nabla\!\cdot\!\bigl[\alpha(\Sigma)\,\nabla\Sigma\bigr]=\frac{4\pi G}{c^2}\,\rho_{\mathrm{LC}},
\]

where \(c_{\mathrm{eff}}(\Sigma)\) and \(\alpha(\Sigma)\) encode the displacement-dependent stiffness of the medium. In the weak field, \(c_{\mathrm{eff}}\to c\) and \(\alpha\to 1\), recovering the linear wave equation of Section 5.2. In the strong field, the coefficients deviate, and the equation admits solutions that differ qualitatively from the linear case.

The functional forms of \(c_{\mathrm{eff}}(\Sigma)\) and \(\alpha(\Sigma)\) are not yet derived from the LC substrate. Determining them is part of the remaining closure problem identified in Section 8: the full field law must emerge from the medium properties rather than be assumed. What can be said is that the nonlinear structure is required on physical grounds — a medium that has already been deformed responds differently to further deformation — and that its weak-field limit must reproduce the linear wave equation that successfully recovers all current observational tests.

### B.5 Source-sphere enlargement and binding energy

The preceding subsections describe how the displacement field responds nonlinearly to the medium state. A further effect acts on the displacement source itself. Each mass inserts a displacement sphere of volume \(\frac{4}{3}\pi d^3\) into the transport structure. When that insertion occurs in a region already displaced by another source, the transport into which the sphere is inserted is already expanded. The source sphere — the physical volume of displaced transport structure — is therefore slightly larger in coordinate terms than it would be in the undisplaced background. The displacement source geometry itself responds to the environment.

This effect is significant only when two displacement sources are close enough that the ambient \(D\) at the location of one source, due to the other, is appreciably above unity. At inter-atomic separations (angstroms), the displacement per nucleus is femtometer-scale and the effect is negligible (\(d^2/r^2\sim 10^{-10}\)). At sub-nuclear separations — where the internal constituents of a nucleus interact — the displacement scales and the separations are both femtometer-scale, and the source-sphere enlargement can be significant.

A distinct but related effect occurs when two displacement spheres are close enough to merge. Two isolated sources each displace volume \(\frac{4}{3}\pi d^3\); the total is twice that. When the sources merge or overlap, the combined displacement volume is less than the sum of the two individual volumes — some displaced space is shared rather than independently sourced. Since the gravitational mass of a system is set by its total displacement through \(d^2=2Gm/c^2\), a reduction in total displacement volume corresponds to a reduction in mass. The mass deficit is the binding energy.

The source-sphere enlargement and the volume merging act in opposite directions. Enlargement increases each source's effective displacement in the other's environment; merging reduces the total displacement volume when the sources combine. Binding energy — the net mass deficit of a composite system — is the result of the volume reduction from merging exceeding the enlargement from mutual displacement. At the sub-nuclear scale, where nuclear binding energies are of order \(0.9\%\) of the rest mass, both effects are significant and their net balance determines the observed binding curve.

## Appendix C. Second Post-Newtonian Predictions

The effective coordinate geometry of Section 5.3 matches the Schwarzschild metric at first post-Newtonian (1PN) order. At second order the two diverge, producing specific predictions that differ from general relativity. This appendix records those differences and estimates their physical magnitude.

### C.1 Metric expansions

The framework's exact metric components are

\[
f=\frac{1}{(1+\Sigma)^2},\qquad g=D^2=1+2\Sigma,\qquad h=1,
\]

with \(\sigma=r_s/r=2\Sigma\) as the weak-field expansion parameter. The Schwarzschild components in the same coordinates are

\[
f_S=1-\sigma,\qquad g_S=\frac{1}{1-\sigma},\qquad h_S=1.
\]

Expanding to \(O(\sigma^2)\):

\[
\begin{aligned}
f&=1-\sigma+\tfrac{3}{4}\sigma^2+\cdots,&\qquad f_S&=1-\sigma,\\[4pt]
g&=1+\sigma,&\qquad g_S&=1+\sigma+\sigma^2+\cdots,\\[4pt]
fg&=1-\tfrac{1}{4}\sigma^2+\cdots,&\qquad f_S g_S&=1.
\end{aligned}
\]

The two metrics agree at \(O(\sigma)\) in every component. At \(O(\sigma^2)\) they differ in three ways.

First, the time component \(f\) acquires a \(\frac{3}{4}\sigma^2\) correction in the framework because \(1/(1+\Sigma)^2\) is smooth through \(\Sigma=1\), whereas Schwarzschild is exactly linear in \(\sigma\) with a zero at \(\sigma=1\). The framework's time dilation approaches zero asymptotically rather than reaching it at a finite radius.

Second, the radial component \(g\) is exactly linear in the framework (\(D^2=1+\sigma\)), while Schwarzschild's \(1/(1-\sigma)\) carries all powers of \(\sigma\). The framework's displacement geometry truncates at first order in the radial deformation.

Third, the product \(fg\) departs from unity at \(O(\sigma^2)\) in the framework, while Schwarzschild maintains \(f_Sg_S=1\) exactly. This is a structural difference: in Schwarzschild, the radial light-speed coordinate factor \(\sqrt{f/g}\) is exactly \(1-\sigma\); in the framework it is \(1-\sigma+\frac{7}{8}\sigma^2+\cdots\).

### C.2 Orbit equation at 2PN

The orbit equation for a test mass on the framework's effective geometry, expanded to \(O(r_s^2)\), takes the form

\[
\frac{d^2u}{d\phi^2}+u=\frac{GM}{L^2}+\frac{3GM}{c^2}\,u^2+r_s^2\!\left(\frac{E^2}{4L^2c^2}\,u-2u^3-\frac{u}{L^2}\right)+O(r_s^3),
\]

where \(u=1/r\), \(L\) is the conserved angular momentum per unit mass, and \(E\) is the conserved energy per unit mass. The Schwarzschild orbit equation has no \(O(r_s^2)\) correction in this form (the 2PN Schwarzschild corrections enter through the energy-angular momentum relation rather than as additional terms in the orbit equation itself).

The leading new term is \(-2r_s^2u^3\). For a nearly circular orbit at radius \(r_0\) with \(u_0=1/r_0\), this correction is of order \(r_s^2/r_0^3\) relative to the Newtonian term \(u_0\). Its ratio to the 1PN correction is \(\sigma_0=r_s/r_0\) — the same small parameter that controls the post-Newtonian expansion.

### C.3 Physical magnitudes

For Mercury (\(\sigma\approx 5\times 10^{-8}\)):

\[
\frac{\text{2PN correction}}{\text{1PN precession}}\sim\sigma\approx 5\times 10^{-8}.
\]

The 2PN contribution to Mercury's perihelion advance is approximately \(0.002\) milliarcsec per century — roughly ten orders of magnitude below current measurement precision.

For the Hulse-Taylor binary (\(\sigma\approx 2\times 10^{-6}\)):

\[
\frac{\text{2PN correction}}{\text{1PN precession}}\sim 2\times 10^{-6}.
\]

With a 1PN precession of order \(4\) degrees per year, the 2PN correction is approximately \(0.03\) arcsec per year. Current timing precision for the Hulse-Taylor system constrains the periastron advance to within \(0.04\%\) of the GR prediction, which corresponds to roughly \(5\) arcsec per year — well above the predicted \(0.03\) arcsec/yr difference. The 2PN divergence is therefore marginally below current sensitivity for compact binaries but could become accessible with improved pulsar timing.

### C.4 Light propagation at second order

The coordinate radial speed of light is \(c\sqrt{f/g}\). In the framework this expands as

\[
c\sqrt{f/g}=c\!\left(1-\sigma+\tfrac{7}{8}\sigma^2+\cdots\right),
\]

while in Schwarzschild the exact result is \(c(1-\sigma)\). The second-order correction \(\frac{7}{8}\sigma^2\) modifies the integrated time delay and deflection angle at the same post-Newtonian order. For Shapiro delay, this would produce a correction to the logarithmic time-delay formula proportional to \(\sigma^2\ln(4L_1L_2/b^2)\). For light deflection, the correction modifies the bending angle at \(O(GM/(c^2b))^2\).

The physical magnitude for solar-system measurements is again small: \(\sigma^2_\odot\sim 10^{-12}\) at the solar limb. Precision ranging experiments or high-accuracy astrometric missions operating at the micro-arcsecond level could in principle access this regime, but it remains beyond current observational reach.

### C.5 Status

The 2PN divergence between the displacement framework and general relativity is a genuine prediction, not a tunable parameter. It follows directly from the exact forms of the metric components, which are themselves determined by the framework's internal logic: \(f=1/(1+\Sigma)^2\) from the clock-rate relation, \(g=D^2\) from the radial deformation, and \(h=1\) from the coordinate anchoring of \(F\!\cdot\!H\). The prediction is that the Schwarzschild horizon is replaced by asymptotic time dilation, and the radial deformation is exactly linear in \(\sigma\). Both features produce specific second-order corrections that are currently below observational thresholds but are in principle testable.

## Appendix D. Mass as Surface Area and the Displacement Composition Rule

The relation \(d^2=2Gm/c^2\) has a direct geometric reading that determines how masses compose in the displacement framework.

### D.1 Surface area is mass

The surface area of a displacement sphere of radius \(d\) is

\[
S=4\pi d^2=\frac{8\pi Gm}{c^2}.
\]

Surface area is exactly linear in mass. This is not a dimensional accident — it is the content of the relation \(d^2\propto m\). The displacement sphere's surface area is proportional to the mass that sources it, with the proportionality constant set by \(G\) and \(c\).

An immediate consequence is that surface areas add linearly. For \(N\) displacement spheres with individual surface areas \(S_n=4\pi d_n^2\), the total surface area is \(N\,S_n\). The combined displacement parameter is \(d_{\mathrm{combined}}^2=N\,d_n^2\), and the combined mass is

\[
m_{\mathrm{combined}}=\frac{d_{\mathrm{combined}}^2\,c^2}{2G}=N\,m_n.
\]

Masses add exactly when surface areas add. This is why Newtonian gravity is linear in mass: the linearity is the surface-area composition of displacement spheres.

### D.2 Binding energy as shared surface area

When two displacement spheres overlap, the contact region reduces the total exposed surface area. The total surface area of the combined system is less than the sum of the individual surface areas by the area of the shared patch. Since mass is proportional to surface area, the mass deficit is proportional to the shared area:

\[
\frac{\Delta m}{m}=\frac{\Delta S}{S}.
\]

The fractional mass deficit equals the fractional surface area deficit, one to one. No geometric correction factor is needed.

For iron, the nuclear binding energy is approximately \(8.8\) MeV per nucleon out of \(939\) MeV rest mass, a fractional deficit of about \(0.94\%\). The implied surface area sharing is therefore also about \(0.94\%\) per nucleon. The corresponding contact patch radius is approximately \(20\%\) of the nucleon displacement radius — geometrically consistent with close-packed displacement spheres barely overlapping at their boundaries.

### D.3 Volume addition and its consequences

If displacement volumes were the additive quantity rather than surface areas, the composition rule would be \(d_{\mathrm{combined}}^3=N\,d_n^3\), giving \(d_{\mathrm{combined}}=N^{1/3}\,d_n\) and \(m_{\mathrm{combined}}=N^{2/3}\,m_n\). This produces massive overbinding — a \(74\%\) mass deficit for \(56\) nucleons, compared to the observed \(0.94\%\). Volume addition is therefore not the composition rule for displacement in the weak-overlap regime.

However, volume becomes relevant in the strong-overlap regime. When two displacement spheres fully merge, the combined volume is the sum. The transition from surface-area-additive (weak overlap, small binding) to volume-additive (full merger, large binding) spans the range between nuclear physics and black hole coalescence.

### D.4 Connection to black hole mergers

The working notes record that LIGO merger remnant masses are best fit by \(M_A^n+M_B^n=M_C^n\) with \(n\approx 1.1\). In the displacement picture, the exponent \(n\) characterizes the composition rule:

\[
\begin{aligned}
n=1&:\quad\text{surface areas add (exact mass additivity, no deficit)},\\
n=\tfrac{2}{3}&:\quad\text{volumes add (maximum binding, }20.6\%\text{ deficit for equal masses)}.
\end{aligned}
\]

The LIGO value \(n\approx 1.1\) is close to surface-area addition with a small correction. For equal-mass mergers, it gives a mass deficit of approximately \(6\%\) — the energy radiated as gravitational waves during the merger. The coalescence is mostly surface-area-additive, with a volume-interaction correction at the merger interface where the displacement spheres interpenetrate.

The exponent \(n\) therefore encodes the degree of displacement-sphere interpenetration during the merger. A value near \(1\) means the spheres join with minimal volume sharing; a value near \(2/3\) would mean complete volumetric merger. The observed \(n\approx 1.1\) indicates that even in the extreme strong-field regime of black hole coalescence, the composition is predominantly surface-area-like.

## Appendix E. Rotating-Source Effective Metric

The static effective geometry of Section 5.3 describes a non-rotating source. This appendix extends that geometry to slowly rotating sources by developing the vector sector of the retarded displacement integral.

### E.1 The retarded vector integral

Just as the scalar cumulative displacement \(\Sigma\) is sourced by the retarded mass density, the vector displacement is sourced by the retarded mass current. By direct analogy with Section 5.2, the vector component of the displacement field is

\[
A_i(\mathbf{x},t)=\frac{G}{c^3}\int\frac{\rho_{\mathrm{LC}}(\mathbf{x}',t_r)\,v_i(\mathbf{x}',t_r)}{|\mathbf{x}-\mathbf{x}'|}\,d^3x',
\]

where \(v_i\) is the velocity of the source element. This integral has exactly the structure of the electromagnetic vector potential, with \(G/c^3\) replacing \(1/(4\pi\varepsilon_0 c)\) and mass current replacing charge current.

For a slowly rotating source with angular momentum \(J=I\omega\), the leading multipole of this integral is the magnetic-dipole-type term:

\[
A_\phi\sim\frac{GJ\sin^2\!\theta}{c^3\,r}.
\]

This is the gravitomagnetic vector potential. Its curl gives the gravitomagnetic field, which is the transport twist developed in Sections 6 and 7.

### E.2 The slow-rotation effective metric

The vector displacement enters the effective coordinate metric as a cross term between the time coordinate and the azimuthal angle. Combined with the scalar sector from Section 5.3, the full slow-rotation effective metric is

\[
ds^2=-\frac{c^2}{(1+\Sigma)^2}\,dt^2+D^2\,dr^2+r^2\bigl(d\theta^2+\sin^2\!\theta\,d\phi^2\bigr)+\frac{4GJ\sin^2\!\theta}{c^2\,r}\,dt\,d\phi.
\]

The scalar sector (\(f\), \(g\), \(h=1\)) is unchanged by the rotation at leading order. The rotation enters only through the cross term \(g_{t\phi}\), which is linear in \(J\), odd under reversal of spin, and vanishes on the rotation axis (\(\theta=0,\pi\)).

This is the same structure as the slow-rotation limit of the Kerr metric in Boyer-Lindquist coordinates. At leading order in both \(\Sigma\) and \(J\), the two metrics agree term by term. The scalar sector matches at 1PN (as established in Section 5.4 and Appendix C), and the vector sector matches at the leading gravitomagnetic order.

### E.3 Frame-drag angular velocity and gyroscope precession

The frame-dragging angular velocity — the rate at which the local transport structure is twisted by the source rotation — is

\[
\omega_{\mathrm{drag}}=\frac{g_{t\phi}}{g_{\phi\phi}}=\frac{4GJ}{c^2\,r^3}.
\]

This is independent of latitude at leading order and falls as \(1/r^3\), the characteristic dipole scaling of the gravitomagnetic field.

For a gyroscope on a polar orbit, the gyroscope's spin axis is carried by this twisted transport [7]. The orbit-averaged precession rate depends on the angular projection of the twist onto the orbital geometry. For the Earth, using the thin-shell angular momentum \(J_{\mathrm{shell}}=\frac{2}{3}MR^2\omega\) and the GPB orbital radius, the thin-shell estimate is approximately \(82\) mas/yr. Applying the Earth moment-of-inertia correction \(I_\oplus/(MR^2)/(2/3)\approx 0.496\) yields approximately \(41\) mas/yr, close to the observed \(39.2\) mas/yr. The \(\sim 4\%\) residual may reflect either the specific polar-orbit angular projection or a genuine higher-order difference between the framework and general relativity in the vector sector.

### E.4 Rapidly rotating sources and the equilibrium surface

The metric of Section E.2 is the displacement framework's analog of the slow-rotation Kerr metric. The structural correspondence is exact at leading order in both the scalar and vector sectors. The scalar sector diverges from Schwarzschild at second post-Newtonian order (Appendix C); whether an analogous second-order divergence exists in the vector sector remains to be computed.

Beyond the slow-rotation limit, the displacement framework admits a nonperturbative treatment of the rotating equilibrium. A self-gravitating spinning body in displacement equilibrium must satisfy equal realized time dilation at every latitude on its surface. Gravitational time dilation (from the cumulative displacement \(\Sigma\)) and velocity time dilation (from the surface rotation speed) both reduce the local clock rate, and the equilibrium shape is the surface on which their combined effect is uniform:

\[
\frac{c^2}{(1+\Sigma(r(\phi)))^2}-r(\phi)^2\omega^2\cos^2\!\phi=S_0^2,
\]

where \(S_0\) is the uniform residual spin capacity and \(\phi\) is latitude. At the pole (\(\phi=\pi/2\)), the rotation velocity vanishes and the condition reduces to \(S_0=c/(1+\Sigma(r_p))\), fixing \(S_0\) in terms of the polar radius \(r_p\). At the equator (\(\phi=0\)), the rotation velocity is maximal, and the equilibrium radius is correspondingly larger. The surface is oblate, with the oblateness determined by the spin.

In nondimensionalized form, setting \(\rho=2r/d^2\) (radius in units of the displacement scale) and \(\alpha=d^2\omega/(2c)\) (dimensionless spin parameter), the equilibrium condition becomes

\[
\left(\frac{1}{\rho_p}-\frac{1}{\rho}\right)\!\left(2-\frac{1}{\rho}-\frac{1}{\rho_p}\right)=\alpha^2\rho^2\cos^2\!\phi.
\]

This is exact and implicit in \(\rho(\phi)\). For each latitude, it determines the equilibrium surface radius as a function of the two free parameters \(\rho_p\) (polar radius in displacement-scale units) and \(\alpha\) (dimensionless spin). In the slow-rotation limit \(\alpha\ll 1\), it linearizes to a small oblate perturbation of the spherical equilibrium, recovering the slow-rotation metric of Section E.2. For rapid rotation, the surface becomes highly oblate, with the equatorial radius potentially many times the polar radius.

The maximum spin occurs when the equatorial surface velocity reaches \(c\), giving \(\rho_e=1/\alpha\). At this limit the equatorial matter has no residual spin capacity (\(S=0\)), and no internal LC oscillation is possible at the equator. The polar matter, by contrast, retains full isotropic spin capacity reduced only by the gravitational depth. This asymmetry between directional (velocity) and isotropic (gravitational) time dilation at different latitudes is a distinctive feature of the displacement picture that has no direct analog in the Kerr metric, where the equilibrium surface geometry is algebraically determined by the Kerr parameters rather than by a physical balance of time-dilation mechanisms.

The astrophysical consequences of the rapidly rotating equilibrium — including polar mass accumulation, jet formation, and the spin-dependent equilibrium shape — are developed separately. For the present paper, the equilibrium surface equation serves as the natural strong-field, rapidly-rotating extension of the slow-rotation effective metric, completing the framework's analog of the Kerr solution.

## References

[1] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[2] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[3] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*. Zenodo. https://doi.org/10.5281/zenodo.19155341

[4] C. W. F. Everitt et al., “Gravity Probe B: Final Results of a Space Experiment to Test General Relativity,” *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[5] J. G. Williams, S. G. Turyshev, and D. H. Boggs, “Lunar Laser Ranging Tests of the Equivalence Principle with the Earth and Moon,” *International Journal of Modern Physics D* **18**(7), 1129–1175 (2009). https://doi.org/10.1142/S021827180901500X

[6] C. M. Will, “The Confrontation between General Relativity and Experiment,” *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4
[7] James Buckeyne, *The Homogeneous Propagation Framework: Weak-Field Observational Tests*. Zenodo. (Companion paper.)
