# A Light Propagation Equation in a Homogeneous-Speed Framework

James Buckeyne  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447


## Abstract

This paper develops a propagation-first framework in which source, observer, and signal are related through a native light-propagation condition. The analysis asks what familiar kinematic structure is recovered once that condition is reduced under specific observational constraints. Within this framework, the standard longitudinal contraction factor $\lambda(v)=\sqrt{1-v^2/c^2}$ is recovered as a normalization that removes directional disparity between longitudinal and transverse two-way interaction cost, while the standard Lorentz timing factor $\gamma(v)=1/\sqrt{1-v^2/c^2}$ is recovered from the enlarged total two-way interaction cost of the moving system. The standard one-dimensional Lorentz transformation is then recovered in form as a consequence of the propagation structure rather than assumed as a primitive postulate.

The framework is also extended to signal transfer. There, a staged signal description is adopted in which a source-side Doppler factor is recovered from a geometric propagation contribution together with a separate timing contribution, while the scalar aberration relation, light propagation, and any receiver-local timing update are treated as distinct operational stages. This separation is part of the interpretive claim of the framework: propagation effects and frame-dependent frequency assignment are kept distinct before any final observational expression is assembled. The result is a unified scheme in which contraction, timing, mapping, and signal-transfer relations arise as recovered consequences of a common propagation-based construction.

## 1. Introduction

A central question in relativistic kinematics is which familiar transformation and signal-transfer relations must be taken as primitive assumptions and which may instead be recovered from a more basic propagation structure. The present paper examines that question in a propagation-first setting. It begins from a native light-propagation condition relating source, observer, and signal, and asks what standard kinematic forms emerge once that condition is reduced under specific observational constraints.

The aim is to reorganize the derivation and interpretation of the familiar transformation laws while remaining consistent with their standard forms. In the development that follows, contraction, timing, and moving-frame mapping relations are recovered in form from a common propagation-based construction. The same viewpoint is then extended to signal transfer, where the source-side Doppler factor, scalar aberration relation, and frame-local frequency assignments are treated as distinct operational stages rather than collapsed immediately into a single packaged observational formula.

This separation is part of the paper’s interpretive claim. Propagation effects and frame-dependent frequency assignment are kept distinct until the final observational stage, so that the contribution of source motion to signal propagation can be tracked independently of the frame in which emission or reception is described.

The paper proceeds in stages. Section 2 states the native propagation condition and its anchored forms, which serve as the formal starting point for the analysis. Section 3 develops the reduced cases needed for uniform motion and directional decomposition. Sections 4 and 5 show how contraction and timing factors emerge from the two-way interaction structure. Section 6 then recovers the moving-frame mapping in form and examines the associated composition law. Section 7 turns to signal transfer, where the source-side Doppler factor, scalar aberration relation, and frame-local frequency assignments are treated as distinct operational stages. Appendix A supplies the one-way interval derivation used by the centered reduction, and Appendix B develops the generalized signed aberration treatment.

The argument developed below remains consistent with the familiar relativistic formulas, but reorganizes how those formulas may be derived and interpreted when propagation is taken as the primary starting point. On that reading, contraction, timing, moving-frame mapping, and signal-transfer relations appear not as disconnected ingredients, but as formally linked consequences of a common underlying structure. The resulting framework is offered as an interpretive and derivational reorganization, with particular emphasis on keeping propagation effects distinct from frame-dependent frequency assignment until the final observational stage.


## 2. Native light propagation equation

We begin with a propagation law for light in this homogeneous-speed framework. The central assumption is that light propagates through connection space at baseline speed $c$, while sources and observers may move relative to that propagation layer during the interval between emission and reception. The resulting propagation relation is therefore implicit: the travel time to be solved for also enters the event geometry that defines the path.

Let the source position be $\vec{x}_s(t)$ and the observer position be $\vec{x}_o(t)$, both expressed in the coordinate description associated with connection space. Let a signal be emitted at time $t_e$ and received at time $t_o$, with

$$
t_o-t_e>0.
\tag{2.1}
$$

The native propagation condition is

$$
\left\|\vec{x}_o(t_o)-\vec{x}_s(t_e)\right\|=c\,(t_o-t_e).
\tag{2.2}
$$

This relation is implicit because the propagation interval appears both as the unknown travel time and through the source and observer configurations associated with emission and observation.

To preserve that event structure explicitly, represent the propagation interval in both directions. Define the backward offset from observation to emission by

$$
\Delta t_{\mathrm{obs}\to\mathrm{emit}}\equiv t_e-t_o,
\tag{2.3}
$$

and the forward offset from emission to observation by

$$
\Delta t_{\mathrm{emit}\to\mathrm{obs}}\equiv t_o-t_e,
\tag{2.4}
$$

so that

$$
\Delta t_{\mathrm{obs}\to\mathrm{emit}}=-\Delta t_{\mathrm{emit}\to\mathrm{obs}}.
\tag{2.5}
$$

Anchored at the observation event, the native law becomes

$$
\left\|\vec{x}_o(t_o)-\vec{x}_s\!\left(t_o+\Delta t_{\mathrm{obs}\to\mathrm{emit}}\right)\right\| = c\,\left|\Delta t_{\mathrm{obs}\to\mathrm{emit}}\right|.
\tag{2.6}
$$

Anchored at the emission event, it becomes

$$
\left\|\vec{x}_o\!\left(t_e+\Delta t_{\mathrm{emit}\to\mathrm{obs}}\right)-\vec{x}_s(t_e)\right\| = c\,\Delta t_{\mathrm{emit}\to\mathrm{obs}}.
\tag{2.7}
$$

These two forms are algebraically equivalent, but they play distinct operational roles. The observation-anchored form reconstructs the emission geometry associated with a received event, while the emission-anchored form projects a specified emission forward to the corresponding observation geometry.

No implicit reflector is assumed in the native equation itself. Round-trip constructions are obtained later by composition of one-way propagation segments. Full algebraic solutions of the native equation, including the Past Light Cone term $B_{\mathrm{PLC}}$ used in the one-way solved propagation structure, are collected in Appendix A.

## 3. Operational forms and reduced solutions

The native propagation equation preserves the full event structure of emission and observation, but it is not always the most convenient form for calculation. This section extracts reduced forms for the uniform-motion cases used throughout the paper.

### 3.1 Event-anchored reductions

Starting from

$$
\left\|\vec{x}_o(t_o)-\vec{x}_s(t_e)\right\|=c\,(t_o-t_e),
\tag{3.1}
$$

the observation-anchored form is

$$
\left\|\vec{x}_o(t_o)-\vec{x}_s\!\left(t_o+\Delta t_{\mathrm{obs}\to\mathrm{emit}}\right)\right\| = c\,\left|\Delta t_{\mathrm{obs}\to\mathrm{emit}}\right|,
\tag{3.2}
$$

with $\Delta t_{\mathrm{obs}\to\mathrm{emit}}<0$, and the emission-anchored form is

$$
\left\|\vec{x}_o\!\left(t_e+\Delta t_{\mathrm{emit}\to\mathrm{obs}}\right)-\vec{x}_s(t_e)\right\| = c\,\Delta t_{\mathrm{emit}\to\mathrm{obs}},
\tag{3.3}
$$

with $\Delta t_{\mathrm{emit}\to\mathrm{obs}}>0$.

The backward form reconstructs an earlier emission geometry from a known received event, while the forward form projects a known emission to its corresponding observation event.

### 3.2 Uniform-motion form

Assume uniform motion in the coordinate description associated with connection space. Let

$$
\vec{x}_s(t)=\vec{x}_{s0}+\vec{v}_s t,
\qquad
\vec{x}_o(t)=\vec{x}_{o0}+\vec{v}_o t.
\tag{3.4}
$$

Substituting into the emission-anchored form gives

$$
\left\|
\vec{x}_{o0}+\vec{v}_o(t_e+\Delta t_{\mathrm{emit}\to\mathrm{obs}}) -
\bigl(\vec{x}_{s0}+\vec{v}_s t_e\bigr)
\right\| = c\,\Delta t_{\mathrm{emit}\to\mathrm{obs}}.
\tag{3.5}
$$

Rearranging,

$$
\left\|
(\vec{x}_{o0}-\vec{x}_{s0}) + (\vec{v}_o-\vec{v}_s)t_e + \vec{v}_o\,\Delta t_{\mathrm{emit}\to\mathrm{obs}}
\right\| = c\,\Delta t_{\mathrm{emit}\to\mathrm{obs}}.
\tag{3.6}
$$

### 3.3 Longitudinal one-way forms

For one-dimensional propagation along the direction of motion, let the system move at speed $v$ through connection space and let $L$ denote the relevant longitudinal separation. Then

$$
\Delta t_{\rightarrow}=\frac{L}{c-v},
\qquad
\Delta t_{\leftarrow}=\frac{L}{c+v}.
\tag{3.7}
$$

These are the raw one-way propagation costs associated with longitudinal motion through connection space.

### 3.4 Transverse one-way form

For propagation across a separation transverse to the system motion,

$$
\Delta t_{\perp}=\frac{L}{\sqrt{c^2-v^2}}.
\tag{3.8}
$$

This is the transverse reduced form of the same native law.

### 3.5 Round-trip constructions

Composing the longitudinal one-way forms gives the auxiliary longitudinal round-trip time

$$
\tau_{\parallel,\mathrm{rt}}^{(0)} = \Delta t_{\rightarrow}+\Delta t_{\leftarrow} = \frac{L}{c-v}+\frac{L}{c+v} = \frac{2Lc}{c^2-v^2}.
\tag{3.9}
$$

Similarly, the auxiliary transverse round-trip time is

$$
\tau_{\perp,\mathrm{rt}}^{(0)} = 2\Delta t_{\perp} = \frac{2L}{\sqrt{c^2-v^2}}.
\tag{3.10}
$$

These quantities are still auxiliary. They expose the directional disparity in two-way interaction cost, but they do not yet represent the normalized moving system.

### 3.6 General directional form

Let the separation at the chosen reference event be decomposed as

$$
\vec{L}=\vec{L}_{\parallel}+\vec{L}_{\perp}.
\tag{3.11}
$$

Then the one-way propagation interval satisfies a quadratic condition of the schematic form

$$
\left\|
\vec{L}_{\perp} + \bigl(\vec{L}_{\parallel}+\vec{v}\,\Delta t\bigr)
\right\| = c\,\Delta t.
\tag{3.12}
$$

The longitudinal and transverse forms above are recovered as the aligned and orthogonal limits of this general directional case.

## 4. Two-way propagation geometry and longitudinal normalization

The reduced one-way forms expose a directional asymmetry of propagation in a moving system. The next step is to determine what normalization is required if the moving system is to admit an internally coherent operational description. The point of the comparison is not yet to assign a material length directly, but to identify the adjustment required to remove the disparity in two-way interaction cost between longitudinal and transverse cases.

Let $L$ denote a fiducial longitudinal or transverse separation used only to construct the propagation comparison.

### 4.1 Longitudinal round-trip traversal

For a longitudinal segment aligned with the system velocity $v$,

$$
\Delta t_{\rightarrow}=\frac{L}{c-v},
\qquad
\Delta t_{\leftarrow}=\frac{L}{c+v}.
\tag{4.1}
$$

Thus

$$
\tau_{\parallel,\mathrm{rt}}^{(0)} = \frac{L}{c-v}+\frac{L}{c+v} = \frac{2Lc}{c^2-v^2}.
\tag{4.2}
$$

### 4.2 Transverse round-trip traversal

For a transverse segment,

$$
\Delta t_{\perp}=\frac{L}{\sqrt{c^2-v^2}},
\tag{4.3}
$$

so

$$
\tau_{\perp,\mathrm{rt}}^{(0)} = 2\Delta t_{\perp} = \frac{2L}{\sqrt{c^2-v^2}}.
\tag{4.4}
$$

### 4.3 Directional disparity

For $v>0$,

$$
\tau_{\parallel,\mathrm{rt}}^{(0)}>\tau_{\perp,\mathrm{rt}}^{(0)}.
\tag{4.5}
$$

The unnormalized moving construction therefore contains a directional asymmetry in two-way interaction cost. A system that preserved the same fiducial longitudinal and transverse extents in physical space would not preserve equal two-way interaction structure across those directions.

### 4.4 Longitudinal normalization factor

Introduce a longitudinal normalization factor $\lambda(v)$ such that

$$
\lambda(v)\,\tau_{\parallel,\mathrm{rt}}^{(0)}=\tau_{\perp,\mathrm{rt}}^{(0)}.
\tag{4.6}
$$

Substituting the two round-trip forms gives

$$
\lambda(v)\,\frac{2Lc}{c^2-v^2} = \frac{2L}{\sqrt{c^2-v^2}},
\tag{4.7}
$$

and therefore

$$
\lambda(v)=\frac{\sqrt{c^2-v^2}}{c} = \sqrt{1-\frac{v^2}{c^2}}.
\tag{4.8}
$$

This is the canonical contraction form used below. As a contraction factor, $\lambda(v)\to 0$ as $v\to c$. The algebraic relation to the timing factor may be noted later, but $\lambda(v)$ is introduced here in its own base form because its role is to normalize longitudinal extent, not to define a dilation. [2]

### 4.5 Interpretation as longitudinal contraction

Stable material structure in physical space is constrained by two-way photonic interactions carried through connection space. A material length therefore cannot be treated independently of the propagation cost required to sustain those interactions across it.

For a system moving at speed $v$ through connection space, the raw longitudinal round-trip interaction cost exceeds the corresponding transverse cost when the same fiducial extent $L$ is assigned in both directions. The longitudinal direction is therefore the limiting case for maintaining a consistent internal interaction structure. If the moving system is to preserve an internally coherent material geometry, its longitudinal extent in physical space must adjust so that the two-way longitudinal interaction cost matches the transverse reference case.

That adjustment is the longitudinal normalization derived in Section 4.4. In the present framework, longitudinal contraction is therefore interpreted as the material adjustment in physical space required by the changed two-way interaction cost of motion through connection space. It is not introduced as an independent starting postulate, but as the normalization needed to restore directional consistency within the moving system.

## 5. Two-way interaction cost and recovered time structure

Longitudinal normalization does not exhaust the significance of the moving two-way geometry. Even after the longitudinal extent has been adjusted to restore directional consistency, the total two-way interaction cost of the moving system remains larger than that of the same system at rest. The next question is therefore not one of spatial normalization, but of timing structure.

### 5.1 Stationary and moving two-way reference cases

For a system at rest in connection space,

$$
\tau_0=\frac{2L}{c}.
\tag{5.1}
$$

For a system moving at speed $v$,

$$
\tau_{\parallel,\mathrm{rt}}^{(0)} = \frac{L}{c-v}+\frac{L}{c+v} = \frac{2Lc}{c^2-v^2}.
\tag{5.2}
$$

Replacing the fiducial longitudinal extent by the normalized extent $\lambda(v)L$, the normalized longitudinal round-trip time becomes

$$
\tau_{\parallel,\mathrm{rt}} = \frac{\lambda(v)L}{c-v} + \frac{\lambda(v)L}{c+v}.
\tag{5.3}
$$

Using the contraction factor from Section 4,

$$
\tau_{\parallel,\mathrm{rt}} = \sqrt{1-\frac{v^2}{c^2}}
\left(
\frac{L}{c-v}+\frac{L}{c+v}
\right) = \frac{2L}{c}\,\frac{1}{\sqrt{1-v^2/c^2}} = \gamma(v)\,\tau_0.
\tag{5.4}
$$

Thus the moving two-way traversal time exceeds the stationary value by the factor

$$
\gamma(v)=\frac{1}{\sqrt{1-v^2/c^2}}.
\tag{5.5}
$$

This is the canonical timing factor used below. As a dilation factor, $\gamma(v)\to\infty$ as $v\to c$. [1]

### 5.2 Interpretation of the excess two-way cost

Normalization of longitudinal extent restores directional consistency of material geometry in physical space, but it does not restore the stationary two-way interaction cost. A moving system therefore remains dynamically distinguished from a stationary one at the level of total two-way photonic interaction time.

If stable material processes in physical space are constrained by repeated two-way propagation through connection space, then an increase in round-trip interaction cost by the factor $\gamma(v)$ implies a corresponding dilation of the characteristic timing of the moving system. In the present framework, this is the timing counterpart to longitudinal contraction: $\lambda(v)$ governs the normalized longitudinal extent required for directional consistency, while $\gamma(v)$ governs the enlarged total two-way interaction cost that remains after that normalization has been imposed.

The moving system is therefore characterized by both a normalized longitudinal extent reduced by $\lambda(v)$ and a total two-way interaction cost enlarged by $\gamma(v)$. These are not independent insertions. They are paired consequences of the same propagation geometry.

## 6. Recovery of transformation structure

The preceding sections established two essential ingredients of the moving-system kinematics: longitudinal normalization of material extent by $\lambda(v)$ and enlarged total two-way interaction cost by $\gamma(v)$. The next task is to show how the same propagation framework recovers the moving-frame mapping in form. Appendix A provides the solved one-way emission interval in a form that separates a Past Light Cone contribution from a transport contribution, and the centered reduction of that result exposes the positional tilt term that later enters the recovered mapping.

### 6.1 One-way algebraic reduction

Appendix A gives the solved one-way emission propagation interval in the form

$$
\Delta t = B_{\mathrm{PLC}} + T_{\mathrm{tr}}.
\tag{6.1}
$$

where $B_{\mathrm{PLC}}$ is the Past Light Cone term and $T_{\mathrm{tr}}$ is the transport term. The Past Light Cone term is the light-cone surface contribution associated with an offset point in the frame; over all spatial positions it forms the cone surface in space-time, while the skew across that surface is carried by the transport term. What matters for the present section is that the solved one-way interval already separates a cone contribution from a transport contribution before any full moving-frame mapping is written.

### 6.2 Centered one-way case

In the centered one-way case, the Past Light Cone contribution drops out and the solved interval reduces to its transport part,

$$
\Delta t = T_{\mathrm{tr}}.
\tag{6.2}
$$

For the longitudinal case, with the spatial part aligned with the motion,

$$
T_{\mathrm{tr}}=\frac{\vec{P}\cdot\vec{v}}{c^2-v^2}.
\tag{6.3}
$$

Let the contracted longitudinal spatial coordinate be

$$
x'_{\parallel}=\lambda(v)\,x_{\parallel}.
\tag{6.4}
$$

with $\lambda(v)$ given by Eq. (4.8).

Applying this normalization to the spatial transport part gives

$$
\lambda(v)\,T_{\mathrm{tr}} = \lambda(v)\frac{\vec{P}\cdot\vec{v}}{c^2-v^2}.
\tag{6.5}
$$

In the aligned one-dimensional case, with sign fixed by the chosen orientation convention so that $\vec{P}\cdot\vec{v}=-xv$, this becomes

$$
\lambda(v)\,T_{\mathrm{tr}} = -\sqrt{1-\frac{v^2}{c^2}}\,
\frac{xv}{c^2-v^2}.
\tag{6.6}
$$

Using Eq. (4.8), one obtains

$$
\lambda(v)\,T_{\mathrm{tr}} = -\frac{xv}{c\sqrt{c^2-v^2}} = -\gamma(v)\frac{vx}{c^2}.
\tag{6.7}
$$

with $\gamma(v)$ given by Eq. (5.5).

This is the recovered time-tilt term. Combining it with the timing factor gives

$$
t'=\gamma(v)\left(t-\frac{vx}{c^2}\right).
\tag{6.8}
$$

The centered one-way reduction does not by itself constitute the full moving-frame mapping. What it does show is narrower and more precise: after spatial normalization, the one-way transport structure exposes the positional tilt term that later enters the broader mapping.

### 6.3 Full moving-frame mapping

The full moving-frame mapping is

$$
x'=\gamma(v)(x-vt),
\qquad
t'=\gamma(v)\left(t-\frac{vx}{c^2}\right).
\tag{6.9}
$$

Equivalently,

$$
L_v(x,t)=\left(\gamma(v)(x-vt),\,0,\,\gamma(v)\left(t-\frac{vx}{c^2}\right)\right).
\tag{6.10}
$$

This is the standard one-dimensional Lorentz transformation recovered in form within the present construction. [3] The centered one-way algebra is therefore not being identified with the full map itself. Rather, it supplies one component of the structure: the tilt term exposed by the transport part after contraction is applied. The full mapping is the broader kinematic relation in which contraction, timing dilation, and simultaneity slope coexist.

### 6.4 Interpretation

The spatial part is normalized by contraction, the factor $\gamma(v)$ corresponds to the dilation of internal timing produced by increased two-way interaction cost, and the term

$$
-\frac{vx}{c^2}
$$

is the positional tilt in time assignment across the moving frame.

Read this way, the recovered mapping is not a disconnected formal insertion. Its parts have already appeared separately in the earlier propagation analysis: $\lambda(v)$ from longitudinal normalization, $\gamma(v)$ from the enlarged total two-way interaction cost, and the positional tilt from the centered one-way transport structure. The mapping brings these together into a single frame-assignment relation.

### 6.5 Slow-clock transport

The same position-dependent clock offset is also found through slow clock transport. A clock transported through the moving system remains subject to the same propagation-based timing structure that governs the material frame itself. As that transported clock accumulates small time differences across the moving frame, it does not simply retain a universal frame-independent alignment, but acquires a position-dependent offset relative to clocks elsewhere in the system.

This offset is not introduced as a chosen synchronization rule, but emerges from the kinematics of slow clock transport together with the propagation structure. In standard relativistic treatments, slow clock transport is one of the recognized routes by which simultaneity structure is analyzed [8]. Once motion through the medium and the corresponding accumulated clock-dilation effects are taken into account, that offset is already built into the clocks in the moving frame, resulting in internal synchronization checks reporting the clocks as mutually synchronous.

This matters because it shows that the recovered clock-offset structure is not merely a special artifact of the centered one-way case. It is found independently within the broader timing behavior of clocks transported through the moving system.

### 6.6 Slope of simultaneity

The quantity usually associated with the simultaneity slope is therefore read differently in the present framework than in standard coordinate-based treatments. In the usual relativistic presentation, the term $-vx/c^2$ expresses the fact that events simultaneous in one inertial frame are generally not simultaneous in another. In the present framework, however, that quantity is found as a motion-induced clock-offset structure across the frame.

It is not introduced as a chosen synchronization rule, but emerges from the kinematics of slow clock transport together with the propagation structure. Once motion through the medium and the corresponding accumulated clock-dilation effects are taken into account, that offset is already built into the moving frame, even though ordinary internal synchronization checks still return the clocks as mutually synchronous. In this way, the frame preserves the expected internal signal relations despite the anisotropy of propagation delay.

Thus the simultaneity slope is not inserted independently of the propagation construction. It is one of the structures found within it, and it links the recovered contraction and timing behavior to the moving-frame clock offsets that underlie the observed signal relations. To understand what this offset structure does and does not imply, it is useful to consider the moving frame as a field of distributed clocks rather than as a single pointwise time assignment.

### 6.7 Field of clocks and event synchronicity

The clock-offset structure described above should not be confused with the claim that velocity by itself determines whether events are synchronous. In the present framework, that is not the right operational picture. What matters for synchronicity is the relation among emission events, reception events, and the distributed clock field across the frame.

Consider a field of signal emitters distributed across a frame, together with an observer at the center of that frame who has synchronized the local clocks by a broadcast signal. At the center reception event, signals from that field may still be received as simultaneous. If another frame passes through that same central event at the moment of reception, the coincidence of those arrivals at that event is not destroyed merely by the velocity of the passing frame. The shared reception event remains a shared reception event.

What changes relative synchronicity in the present framework is therefore not velocity alone, but offset in position and/or offset in time across the extended system. Velocity affects propagation delay, delayed source position, and directional update, but those effects do not by themselves imply that all simultaneous reception structure is broken. In particular, where events are received at a common point, coincidence of reception remains coincidence of reception.

The role of the clock field is therefore subtler than a simple “moving clocks disagree” picture. The clocks carry a motion-induced offset structure across the frame, but that structure is built into the clocks in the moving frame in such a way that internal synchronization checks still report the clocks as mutually synchronous. The point is not that the clocks visibly fail to agree, but that their offset structure is already part of the moving frame and must be taken into account when relating separated events across it.

In this sense, the simultaneity slope does not say that velocity itself directly decides synchronicity. Rather, it describes how the distributed clock field of a moving frame is organized, and how that organization enters the projection of separated events through the propagation structure.

### 6.8 Velocity composition

The discussion above concerns the clock-offset and event-projection structure of a moving frame. It does not by itself require a general velocity-composition law. The composition issue is noted here separately because the recovered Lorentz transformation does not by itself fix a unique velocity-composition rule for the broader framework. In the present construction, the natural composition variable is the corresponding proper-velocity variable

$$
v_{\mathrm{proper}}(x)=\frac{x}{\sqrt{1-x^2/c^2}}=
\frac{xc}{\sqrt{c^2-x^2}}.
\tag{6.12}
$$

where $x=v_{\mathrm{physical}}$.

This proper-velocity parametrization is standard, and it is used here because the composition rule is additive in the proper-velocity variable rather than in physical velocity itself. [6]

The inverse map back to physical velocity is

$$
v_{\mathrm{physical}}(x)=\frac{x}{\sqrt{1+x^2/c^2}}=
\frac{xc}{\sqrt{c^2+x^2}}.
\tag{6.13}
$$

The composition law adopted here is additive in proper velocity:

$$
v_{\mathrm{add}}(u,v)=
v_{\mathrm{physical}}\!\bigl(v_{\mathrm{proper}}(u)+v_{\mathrm{proper}}(v)\bigr).
\tag{6.14}
$$

Explicitly,

$$
v_{\mathrm{add}}(u,v)=
\frac{v_{\mathrm{proper}}(u)+v_{\mathrm{proper}}(v)}
{\sqrt{1+\dfrac{\left(v_{\mathrm{proper}}(u)+v_{\mathrm{proper}}(v)\right)^2}{c^2}}}.
\tag{6.15}
$$

Since

$$
v_{\mathrm{proper}}(v)=\gamma(v)\,v,
\tag{6.16}
$$

with $\gamma(v)$ given by Eq. (5.5), this may also be written as

$$
v_{\mathrm{add}}(u,v) = \frac{\gamma(u)u+\gamma(v)v}
{\sqrt{1+\dfrac{\bigl(\gamma(u)u+\gamma(v)v\bigr)^2}{c^2}}}.
\tag{6.17}
$$

This law is commutative, associative, and has $0$ as its identity element, because it is constructed by ordinary addition in the proper-velocity variable followed by inversion back to physical velocity.

It is not the standard Einstein velocity-addition law [4],

$$
v_E(u,v)=\frac{u+v}{1+\dfrac{uv}{c^2}}.
\tag{6.18}
$$


For equal input speeds, the present composition law reduces to

$$
v_{\mathrm{add}}(u,u)=\frac{2u}{\sqrt{1+3u^2/c^2}}.
\tag{6.19}
$$

whereas Einstein addition gives

$$
v_E(u,u)=\frac{2u}{1+u^2/c^2}.
\tag{6.20}
$$

The deviation between the two is maximal at

$$
u \approx 0.631637\,c.
\tag{6.21}
$$

for which

$$
v_E(u,u)\approx 0.903006\,c,
\qquad
v_{\mathrm{add}}(u,u)\approx 0.852301\,c.
\tag{6.22}
$$

so that

$$
\Delta_{\max}\approx 0.050705\,c.
\tag{6.23}
$$

The discrepancy between the present composition law and Einstein velocity addition is noted here for completeness, but a full analysis lies outside the scope of the present paper. Since the present paper does not otherwise require a velocity-addition law for its main derivational results, that discrepancy will be addressed separately in a companion paper.

## 7. Signal transfer: propagation, directional update, and frame-local assignment

The propagation framework developed above may also be applied to signal transfer. In the present treatment, that analysis is carried out in stages rather than collapsed immediately into a single packaged observational law. Source-local timing assignment, propagation geometry, directional update, and observer-local timing interpretation are kept conceptually distinct so that the contribution of emitter motion to signal propagation can be tracked separately from the frame in which emission or observation is described.

### 7.1 Staged signal pipeline

The signal analysis is organized as a staged transfer process rather than collapsed immediately into a single observational formula. In fuller form, the pipeline is:

1. source-local timing effects,
2. source-side Doppler factor,
3. emitter-side aberration,
4. light propagation,
5. observer-side aberration,
6. observer-side Doppler factor,
7. observer-local timing update.

This decomposition is intentional. It separates source-local timing structure, directional update, transmission, observer-side directional reinterpretation, and final observer-local timing update, rather than treating signal transfer as a single pre-packaged Doppler law.

### 7.2 Source-side Doppler factor

For an emitter moving with speed $v_e$, first isolate the geometric propagation contribution

$$
\kappa_{\mathrm{geom}}(\theta,v_e)=\frac{1}{1-\frac{v_e}{c}\cos\theta}.
\tag{7.4}
$$

This factor captures the effect of emitter motion relative to the propagation direction. By itself, however, it is not yet the full relativistic Doppler factor, because the source-local timing factor must also be included separately.

Let the source-local timing factor be $\gamma(v_e)$, with the corresponding canonical form given by Eq. (5.5) after replacing $v$ by $v_e$.

If the source-local emitted frequency is written as

$$
f_{\mathrm{emit}}=\gamma(v_e)\,f_0,
\tag{7.5}
$$

then the source-side Doppler factor is recovered by combining the geometric propagation contribution with the corresponding timing normalization:

$$
\kappa_{\mathrm{dop}}(\theta,v_e)=\frac{\sqrt{1-v_e^2/c^2}}{1-\frac{v_e}{c}\cos\theta}.
\tag{7.6}
$$

Thus the standard relativistic Doppler expression is recovered here in staged form rather than taken as primitive. The geometric propagation contribution and the timing contribution are identified separately, and only then combined into the familiar result. [5]

In standard treatments these ingredients are often written directly as a single Doppler formula. In the present framework, separating them first makes clear which part is associated with propagation geometry and which part is associated with source-local timing structure.

### 7.3 Scalar aberration relation

In scalar magnitude, the standard relativistic aberration relation may be written as

$$
\cos\theta' = \frac{\cos\theta-\beta}{1-\beta\cos\theta}, \qquad \beta=\frac{v}{c}.
\tag{7.7}
$$

This scalar form gives the standard magnitude relation for directional shift under relative motion, but by itself it does not preserve side-of-line information. In the present framework it is used as the scalar aberration baseline only. The generalized signed treatment is developed in Appendix B. [7]

Thus, just as the emitter-side Doppler factor is treated here in staged form rather than as a primitive combined law, the scalar aberration relation is treated as a magnitude-level directional baseline rather than a complete signed angular mapping.

### 7.4 Observer-local timing update

Once the emitter-side Doppler factor and the scalar aberration relation are fixed, the observer-side tail of the signal update may be written explicitly rather than schematically. On the observer side, the relevant timing update is applied separately after the preceding propagation and aberration stages.

Thus the observer-side tail may be written as

$$
f_{\mathrm{obs}} =
\gamma(v_o)^{-1}\,
\kappa_{\mathrm{geom}}(\theta_o,v_o)\,
f_{\mathrm{prop}}.
\tag{7.5}
$$

where $v_o$ is the observer velocity, $\theta_o$ is the observer-side effective propagation angle, and $f_{\mathrm{prop}}$ is the frequency entering the observer-side stage after the preceding propagation and aberration updates. Here $\theta_o$ denotes the observer-side effective propagation angle after the directional update has already been carried into the observer description. The observer-local timing update is written as $\gamma(v_o)^{-1}$ so that its role remains visibly paired with the source-side factor $\gamma(v_e)$, although it corresponds to the same contraction-side normalization identified earlier in Section 4.

This does not by itself constitute the full assembled signal pipeline. It gives only the observer-side tail end. The complete observed-frequency expression is obtained by composing this step with the earlier source-side timing, Doppler, aberration, and propagation stages.

### 7.5 Interpretation

The signal treatment is therefore consistent with the broader logic of the paper. Just as contraction, timing, and moving-frame mapping were recovered in form from a propagation-based construction, the signal-transfer analysis is organized so that propagation geometry is identified first, while frame-dependent timing and observation assignments are introduced only at the stage where they are actually needed.

In that sense, the purpose of the staged signal analysis is not merely to recover known Doppler and aberration effects as isolated mechanisms. Those effects are part of the machinery that determines the observer-side apparent signal state: which emission events contribute, from what delayed locations they arrive, and from what updated directions they are seen. The final visual image is then obtained by the ordinary perspective projection of that observer-side state.

This is why a co-moving observer does not visually detect the uniform motion of the surrounding interior merely from its final projected appearance. Although propagation delay selects emission events from further in the past, and those delayed signal origins are correspondingly displaced in space, the subsequent directional update and local timing structure carry those effects into an observer-side apparent state whose final perspective projection remains visually consistent with the stationary case.

This separation is not merely terminological. It is part of the interpretive claim of the framework that propagation effects and frame-dependent frequency assignment should be distinguished before any final observed description is assembled.


## 8. Scope of the present paper

The framework developed in this paper begins from a native light-propagation condition and asks what familiar kinematic structure can be recovered once that condition is reduced under specific observational constraints. Within that construction, the contraction factor $\lambda(v)$, Eq. (4.8), is recovered from the directional disparity between longitudinal and transverse two-way interaction cost, while the timing factor $\gamma(v)$, Eq. (5.5), is recovered from the enlarged total two-way interaction cost of the moving system. The standard one-dimensional Lorentz transformation is then recovered in form in Eq. (6.9), but is interpreted here as emerging from a propagation-based construction rather than being posited independently at the outset.

The present paper is intentionally narrow in scope. Its purpose is to establish the portion of the framework that overlaps most directly with the standard terrain of special relativity: contraction, timing structure, one-dimensional moving-frame mapping, velocity-composition comparison, and staged signal-transfer relations involving a source-side Doppler factor recovered in this staged way and the scalar aberration relation. It does not attempt to present the full framework or all of its further consequences.

At the signal level, the framework is presented in staged form. The source-side Doppler factor is recovered by combining a geometric propagation contribution with a separate source-local timing contribution, the scalar aberration relation is treated as a magnitude-level directional update, and any receiver-local timing assignment is applied separately according to frame. In this way, the geometric propagation contribution, timing contribution, directional update, and reception-side interpretation are not collapsed into a single undifferentiated signal law.

This separation is not merely terminological. It is part of the interpretive claim of the framework that propagation effects and frame-dependent frequency assignment should be distinguished before any final observational expression is assembled. Within the limited scope of the present paper, the main result is therefore that a propagation-based construction recovers, in the special-relativistic regime, a tightly connected set of familiar relations without taking those relations themselves as primitive starting assumptions.

## 9. Conclusion

This paper has examined the part of the light-propagation framework that overlaps most directly with the familiar domain of special relativity. Within that restricted scope, the analysis recovers in form the standard contraction factor, the standard timing factor, and the standard one-dimensional Lorentz transformation while remaining consistent with the familiar special-relativistic results in that regime. It also presents signal transfer in staged form, separating source-local timing effects, the geometric and timing ingredients that recover the source-side Doppler factor, aberrational update, propagation, and receiver-local timing update rather than collapsing them immediately into a single packaged observational law. Taken together, these results show that the propagation-based construction remains consistent with the standard special-relativistic sector addressed here while deriving its familiar structures from different starting assumptions.

That point is important, but it is also limited. The aim of the paper is not to argue that the broader construction should be identified with the Lorentz framework once this overlap has been shown. On the contrary, the Lorentz transformation appears here as one recovered structure inside a larger propagation-based organization. It is significant within the restricted regime treated in this paper, but it does not define the full scope, method, or intended development of the framework. The present analysis therefore establishes compatibility at a specific level, not reduction of the broader construction to the standard formalism.

This is why the scope of the paper has been kept intentionally narrow. Its purpose is to establish the special-relativistic side of the program first: to show that contraction, timing, moving-frame mapping, and the corresponding signal-transfer relations can be recovered in form from a common propagation-based starting point. That is a necessary step, because without it the broader framework would remain disconnected from the best-known relativistic results. But it is only a first step. The wider landscape to which this construction belongs is not developed here, and the further papers still to be written will be needed to show how that larger structure should be understood on its own terms.

The main conclusion is therefore modest but definite. A propagation-first construction is already sufficient to recover the special-relativistic sector treated here in a coherent and internally connected way. That does not make the broader framework unnecessary, nor does it require the broader framework to remain conceptually confined within the Lorentz system once the overlap has been demonstrated. It shows instead that the familiar special-relativistic structures can be situated within a more primary propagation-based organization, and that this organization is viable enough to support further development beyond the limited regime examined in the present paper.

## Appendix A. Algebraic solution of the native propagation equation

### A.1 Sign conventions

The framework uses a positive one-way propagation interval from emission to observation,

$$
\Delta t_{\mathrm{emit}\to\mathrm{obs}} = t_o - t_e > 0.
$$

The corresponding backward interval from observation to emission is

$$
\Delta t_{\mathrm{obs}\to\mathrm{emit}} = t_e - t_o = -\Delta t_{\mathrm{emit}\to\mathrm{obs}}.
$$

The solved one-way propagation equation is written in the positive emission-to-observation form. The Past Light Cone interpretation is obtained relative to the observation event and therefore belongs naturally to the negative-side relation.

A positive velocity $v>0$ denotes motion in the $+x$ direction relative to connection space. Unless otherwise stated, the moving-frame mapping is written in the standard passive sign convention of Eq. (6.9).

Changing the sign of $v$, or switching between forward propagation and backward event reconstruction, reverses the signs of the mixed $x$-$t$ terms without changing the underlying geometry.

### A.2 Frame-built positions and event separation

The algebraic solution is written in terms of frame-built positions rather than primitive point displacements.

Let $\vec{O}$ denote the origin of a frame, and let $\vec{x}$ denote a location within that frame. The contraction map acting on frame-relative location is

$$
L_c(\vec{x},\vec{v}) = \vec{x} -
\frac{\vec{v}(\vec{x}\cdot\vec{v})}{\vec{v}\cdot\vec{v}}
\left(1-\sqrt{1-\frac{v^2}{c^2}}\right),
\qquad
v^2\equiv \vec{v}\cdot\vec{v}.
$$

Equivalently,

$$
L_c(\vec{x},\vec{v}) = \vec{x}_{\perp} + \sqrt{1-\frac{v^2}{c^2}}\,\vec{x}_{\parallel},
$$

where

$$
\vec{x}_{\parallel} = \frac{\vec{v}(\vec{x}\cdot\vec{v})}{\vec{v}\cdot\vec{v}},
\qquad
\vec{x}_{\perp} = \vec{x}-\vec{x}_{\parallel}.
$$

A frame-built position is then

$$
\vec{X}=\vec{O}+L_c(\vec{x},\vec{v}).
\tag{A.5}
$$

The contraction map acts on frame-relative location, not on the frame origin itself.

For the solved one-way emission propagation interval, define the event-separation vector

$$
\vec{P}=\vec{X}_e+\vec{V}_eT_e-\vec{X}_o.
\tag{A.6}
$$

where $\vec{X}_e$ is the source-frame position at the chosen emission reference, $\vec{V}_e$ is the corresponding frame-velocity contribution, $T_e$ is the emission-side time parameter, and $\vec{X}_o$ is the observation-frame reference position.

### A.3 Solved one-way emission propagation interval

Let $\vec{v}_o$ denote the observation-frame velocity. The solved one-way emission propagation interval is

$$
\Delta t = \frac{
\sqrt{(\vec{P}\cdot\vec{v}_o)^2+(c^2-v_o^2)(\vec{P}\cdot\vec{P})}
+\vec{P}\cdot\vec{v}_o
}{c^2-v_o^2},
\qquad
v_o^2\equiv \vec{v}_o\cdot\vec{v}_o.
\tag{A.7}
$$

This is a solved one-way emission result. It is not, by itself, the full two-way frame mapping.

### A.4 Separation into transport and Past Light Cone terms

The solved one-way emission interval separates as

$$
\Delta t=B_{\mathrm{PLC}}+T_{\mathrm{tr}}.
\tag{A.8}
$$

with

$$
B_{\mathrm{PLC}} = \frac{
\sqrt{(\vec{P}\cdot\vec{v}_o)^2+(c^2-v_o^2)(\vec{P}\cdot\vec{P})}
}{c^2-v_o^2}.
\tag{A.9}
$$

and

$$
T_{\mathrm{tr}} = \frac{\vec{P}\cdot\vec{v}_o}{c^2-v_o^2}.
\tag{A.10}
$$

Here $B_{\mathrm{PLC}}$ is the Past Light Cone term associated with the offset point $\vec{P}$. For a centered point, it reduces to the corresponding light-cone time coordinate. Over all spatial positions, it generates the cone surface in space-time. The skew across that surface is carried by $T_{\mathrm{tr}}$.

### A.5 Centered one-way case

In the centered one-way case, the Past Light Cone contribution drops out, leaving only the transport term. The remaining expression is still written in the unnormalized longitudinal geometry. After evaluation in the contracted geometry, the denominator changes from

$$
c^2-v^2
\tag{A.11}
$$

to

$$
c\sqrt{c^2-v^2}.
\tag{A.12}
$$

with the additional factor of $1/c$ preserving dimensional balance. In this centered one-way setting, that normalization exposes the time-tilt term that later appears in the recovered moving-frame mapping.

### A.6 Recovered one-way tilt term

After centered reduction and spatial normalization, the time-like piece takes the form of Eq. (6.8), together with the corresponding spatial term in Eq. (6.9).

This should not be read as identifying the full moving-frame map with the centered one-way solved interval. The centered one-way algebra exposes the tilt term that later becomes part of the broader moving-frame structure.

### A.7 Role in transformation recovery

The algebraic form given here preserves a solved one-way event structure that is partly hidden in the simpler utility forms of the main text. In particular:

1. the solved one-way interval separates into a transport part and a Past Light Cone part, Eqs. (A.8)–(A.10),
2. the centered one-way case removes the Past Light Cone contribution, Eq. (6.2),
3. spatial normalization reveals the time-tilt term, Eqs. (6.5)–(6.8),
4. that tilt enters the full moving-frame mapping, Eq. (6.9), and is also recovered independently through slow-clock transport.

## Appendix B. Generalized endpoint-local aberration

### B.1 Scalar aberration magnitude

For a propagation line making angle $\theta$ with a velocity $v$, the familiar relativistic aberration relation may be written in cosine form as

$$
\cos\theta'=\frac{\cos\theta-\beta}{1-\beta\cos\theta},
\qquad
\beta=\frac{v}{c}.
$$

This form is sufficient when only the magnitude of the angular shift is needed.

### B.2 Why the scalar inverse-cosine form is insufficient

The scalar cosine relation determines only the magnitude of the shifted angle. When inverted through $\arccos$, it returns the principal angle and therefore loses side-of-line information. That is acceptable in simple stellar-aberration settings, but not in the present framework, where aberration is applied at both emission and reception and the side of the line matters.

### B.3 Endpoint locality

Aberration is applied locally at an endpoint, not globally to an abstract line. The same propagation line may therefore be shifted differently depending on which endpoint is treated as local. This gives two distinct uses:

$$
\mathcal{A}_E
\qquad
\text{emission-side forward aberration}.
\tag{B.1}
$$

$$
\mathcal{A}_R
\qquad
\text{reception-side forward aberration}.
\tag{B.2}
$$

Each is a forward-end shift of the local line geometry.

### B.4 Signed planar aberration (2D only)

In two dimensions, the scalar cosine law determines only the magnitude of the aberration angle. A separate sign correction is therefore required. For the planar case used here,

$$
A_{\mathrm{mod}}(a)=
\begin{cases}
-1,& \left\lfloor \operatorname{mod}\!\left(\dfrac{a}{\pi},2\right)\right\rfloor > 0.5,\\[6pt]
1,& \text{otherwise}.
\end{cases}
$$

The signed planar aberration angle is then

$$
\Delta\theta_{\mathrm{signed}} = A_{\mathrm{mod}}(a)\,\Delta\theta_{\mathrm{mag}}.
\tag{B.4}
$$

where $\Delta\theta_{\mathrm{mag}}$ is the scalar aberration magnitude obtained from the cosine relation.

### B.5 Rotation formulation in 3D

In three dimensions, the cleaner formulation is to treat aberration as a rotation of the propagation direction.

Let $\hat{\vec{n}}$ be the unit propagation direction and $\hat{\vec{v}}$ the unit local velocity direction. The dot product

$$
\hat{\vec{n}}\cdot\hat{\vec{v}}
\tag{B.5}
$$

determines the scalar angle magnitude, while the cross product

$$
\hat{\vec{v}}\times\hat{\vec{n}}
\tag{B.6}
$$

determines the rotation axis and preserves the directional sign lost by the scalar inverse-cosine form.

Define

$$
\hat{\vec{a}} = \frac{\hat{\vec{v}}\times\hat{\vec{n}}}
{\|\hat{\vec{v}}\times\hat{\vec{n}}\|}.
\tag{B.7}
$$

Then the aberrated direction is written as

$$
\hat{\vec{n}}' = \mathcal{R}\!\left(\hat{\vec{a}},\Delta\theta\right)\hat{\vec{n}}.
\tag{B.8}
$$

where $\mathcal{R}$ denotes rotation about axis $\hat{\vec{a}}$ through signed angle $\Delta\theta$.

### B.6 Emission-side application

At emission, the local endpoint is the source. If $\hat{\vec{n}}_{\mathrm{emit}}$ is the direction before aberration, then the emitted ray is

$$
\hat{\vec{n}}_{\mathrm{ray}} = \mathcal{A}_E(\hat{\vec{n}}_{\mathrm{emit}},\vec{v}_{\mathrm{src}}).
\tag{B.9}
$$

### B.7 Reception-side application

At reception, the local endpoint is the receiver. The incoming ray is re-evaluated from the receiver’s local endpoint and rotated according to the receiver-local velocity geometry:

$$
\hat{\vec{n}}_{\mathrm{recv}} = \mathcal{A}_R(\hat{\vec{n}}_{\mathrm{ray}},\vec{v}_{\mathrm{recv}}).
\tag{B.10}
$$

### B.8 Directed beams and received rays

The same generalized aberration construction applies to directed emission, passive reception, and line reconstruction between moving endpoints.

### B.9 Relation to the main text

The main text uses only the scalar magnitude baseline where that is sufficient to describe the signal pipeline. This appendix supplies the generalized signed form needed when side-of-line information matters, the geometry is genuinely two- or three-dimensional, or emission-side and reception-side aberrations must both be tracked explicitly.

### B.10 Summary

The framework treats aberration as an endpoint-local rotation of the propagation line. Scalar cosine relations give angle magnitude only. For generalized use, the propagation direction must be rotated with sign and axis preserved. In 2D, that is handled by the planar sign correction $A_{\mathrm{mod}}(a)$. In 3D, it is supplied naturally by the cross-product rotation construction.

## References

[1] OpenStax, *University Physics, Volume 3*, Section 5.3, “Time Dilation.”

[2] OpenStax, *University Physics, Volume 3*, Section 5.4, “Length Contraction.”

[3] OpenStax, *University Physics, Volume 3*, Section 5.5, “The Lorentz Transformation.”

[4] OpenStax, *University Physics, Volume 3*, Section 5.6, “Relativistic Velocity Transformation.”

[5] OpenStax, *University Physics, Volume 3*, Section 5.7, “Doppler Effect for Light.”

[6] MIT OpenCourseWare, *Introduction to Special Relativity*, Lecture 8.3, “Proper Velocity.”

[7] Einstein, A., “On the Electrodynamics of Moving Bodies,” 1905.

[8] Eddington, A. S., *The Mathematical Theory of Relativity*, Cambridge University Press, 1923, especially Chapter I, §§4 and 11 (transport of clocks; simultaneity at different places).
