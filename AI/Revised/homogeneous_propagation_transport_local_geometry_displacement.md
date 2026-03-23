# The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion paper:* *Homogeneous Light Propagation Framework* (Zenodo DOI: 10.5281/zenodo.18997960)

## Abstract

The homogeneous propagation framework isolated a narrow result: a constant-speed propagation condition is sufficient to recover a familiar special-relativistic structure in form. The present paper develops the descriptive setting relevant to that result. It treats one underlying domain through several charted roles: a reference coordinate chart, a vacuum storage field and its associated chart, a transport structure governing admissible propagation, and a local geometry realized by material systems. In the homogeneous regime, the storage chart is identified with the coordinate chart, transport remains undeformed, and realized duration scales from coordinate duration through the factor $\lambda$. The paper then turns to local departure from homogeneity, described here through displacement defects in the transport-supporting structure. At the chart level, these appear when transport is displaced from storage, with local geometry following the admissible displaced transport. Time enters through a relation between coordinate duration and realized duration rather than through a parallel hierarchy of temporal charts. The purpose of the paper is foundational: to define the descriptive roles clearly enough that later papers on displacement and gravitation can proceed with stable terminology.

**Keywords:** homogeneous propagation, transport structure, local geometry, realized duration, displacement defects, vacuum storage field, gravitation

## 1. Introduction

The homogeneous propagation framework was intentionally narrow. Its purpose was to ask what follows if signal transfer is governed by a constant-speed propagation condition, and to show that a familiar special-relativistic structure can be recovered in form from that starting point. That narrowing allowed the propagation result to stand on its own terms, but it also left open a natural question: what kind of spatial description makes that construction meaningful?

The present paper develops that setting. The framework uses one underlying domain together with several distinct charts and structures that serve different physical roles. These include a reference coordinate chart, a vacuum storage field and its associated chart, a transport structure governing admissible propagation, and a local geometry realized by material systems.

This matters because the propagation framework is stated at the transport level, while measurement is realized locally. Positions may be described in several charts as descriptions of the same underlying point, and the physically relevant content lies in the transforms between those descriptions. In the homogeneous limit, the storage chart is identified with the coordinate chart. A local departure from that homogeneous alignment appears when the transport chart is displaced from storage, and local geometry follows the admissible transport. Time enters through a scaling relation between coordinate duration and realized duration, expressed by the factor $\lambda$, with both durations understood relative to a chosen reference event.

This paper is foundational rather than dynamical. Its aim is to establish a stable descriptive vocabulary for the portion of the framework used here. The immediate goal is to clarify how one underlying space supports several distinct roles, how propagation and measurement are related within that setting, and how this layered description prepares the ground for later papers on displacement and gravitation.

## 2. One Underlying Domain, Several Physical Roles

The framework begins with one underlying domain, denoted $ \mathcal{M} $. The layered vocabulary describes different physical roles associated with that same domain. One role serves as reference, one expresses substrate support, one governs admissible propagation, and one expresses local realization.

For each point $p \in \mathcal{M}$, the framework allows several chart-level descriptions associated with these roles. The transforms between those descriptions carry the relevant physical structure.

## 3. Core Objects and Vocabulary

### 3.1 Underlying domain

Let $ \mathcal{M} $ denote the underlying domain. Each point $p \in \mathcal{M}$ may be described through several charts associated with different physical roles. These charts provide distinct descriptions of the same point.

### 3.2 Coordinate chart

The **coordinate chart** provides the reference description of $ \mathcal{M} $. It is the common chart in which baseline identities and displacements may be written.

### 3.3 Vacuum storage field

The **vacuum storage field** is the distributed property of the domain that gives it the capacity to support stored and propagating energy. This wording shifts emphasis away from impedance as a derived quantity and toward substrate support as the primitive idea. The storage pair may be written in the familiar vacuum-constant form

$$
c=\frac{1}{\sqrt{\varepsilon_0\mu_0}},
\qquad
Z_0=\sqrt{\frac{\mu_0}{\varepsilon_0}}.
$$

with $\varepsilon_0$ and $\mu_0$ taken in their standard sense [2–4].

The meter enters through the vacuum constants themselves. Since $\mu_0$ and $\varepsilon_0$ carry units $\mathrm{H}/\mathrm{m}$ and $\mathrm{F}/\mathrm{m}$, the speed relation has dimensions

$$
[c]=\frac{1}{\sqrt{(\mathrm{H}/\mathrm{m})(\mathrm{F}/\mathrm{m})}}
=\frac{\mathrm{m}}{\sqrt{\mathrm{H}\,\mathrm{F}}}
=\frac{\mathrm{m}}{\mathrm{s}}.
$$

The storage field remains the supporting structure whether a region is quiet or already carrying ambient disturbance. Propagation takes finite time because transport engages this nonzero storage structure.

### 3.4 Storage chart

The **storage chart** is the chart associated with the vacuum storage field. In the homogeneous baseline,

$$
X_{\mathrm{storage}}=X_{\mathrm{coord}}.
$$

This provides the simplest alignment between substrate support and reference description.

### 3.5 Transport structure

The **transport structure** is the propagation-supporting relational structure on $ \mathcal{M} $. It determines admissible continuation, path structure, and signal transport.

### 3.6 Transport chart

The **transport chart** is the chart associated with transport. It expresses how admissible propagation is described relative to the underlying domain. Displacement enters when this chart departs from the storage chart:

$$
X_{\mathrm{transport}}\neq X_{\mathrm{storage}}.
$$

### 3.7 Local geometry

The **local geometry** is the geometry realized by rods, clocks, and material observers. It is the locally realized measurement structure.

### 3.8 Local chart

The **local chart** is the chart associated with local geometry. Local realization follows the surrounding transport. The full relation between charts is given in Section 4.

### 3.9 Coordinate duration and realized duration

The temporal language is simpler. The relevant distinction is between **coordinate duration**

$$
\Delta \tau_{\mathrm{coord}}
$$

and **realized duration**

$$
\Delta \tau_{\mathrm{realized}}.
$$

Their relation is expressed through the scaling factor $\lambda$:

$$
\Delta \tau_{\mathrm{realized}} = \
\lambda(X_{\mathrm{local}},v)\,\Delta \tau_{\mathrm{coord}}.
$$

Both durations are understood relative to a chosen reference event. Realized duration is the duration over which local physical processes unfold within the realized local description. Accordingly, the factor $\lambda$ scales the duration assigned to those processes relative to the coordinate description.

## 4. Chart Relations on a Common Point Set

For each point $p \in \mathcal{M}$, define the chart assignments

$$
X_{\mathrm{coord}}(p), \qquad
X_{\mathrm{storage}}(p), \qquad
X_{\mathrm{transport}}(p), \qquad
X_{\mathrm{local}}(p).
$$

These are chart-level descriptions of the same point. The chart relations may be written schematically as

$$
X_{\mathrm{local}} \rightarrow X_{\mathrm{transport}} \rightarrow X_{\mathrm{storage}} \rightarrow X_{\mathrm{coord}}.
$$

In the homogeneous baseline,

$$
X_{\mathrm{storage}}=X_{\mathrm{coord}}.
$$

In displaced cases,

$$
X_{\mathrm{transport}}\neq X_{\mathrm{storage}},
$$

and local geometry follows the displaced transport. On the temporal side, the corresponding relation is

$$
\Delta \tau_{\mathrm{realized}} = \
\lambda(X_{\mathrm{local}},v)\,\Delta \tau_{\mathrm{coord}}.
$$

## 5. The Homogeneous Regime: Propagation, Realization, and Duration

Section 4 gave the general chart relations. The present section specializes them to the homogeneous regime, which is the setting used by the propagation framework. In this regime, storage aligns with the coordinate chart, transport remains undeformed, local geometry follows that transport, and realized duration scales through the homogeneous factor $\lambda$.

### 5.1 Baseline alignment

In the homogeneous limit,

$$
X_{\mathrm{storage}}=X_{\mathrm{coord}}.
$$

This provides the simplest chart setting for the propagation analysis.

### 5.2 Propagation at the transport level

With storage aligned to the coordinate chart, transport is studied in its undeformed form. In the propagation framework, this appears as the constant-speed propagation condition in the native propagation layer, from which one-way and two-way signal costs are derived. Those costs are sufficient to recover the normalization and duration-scaling relations relevant to the homogeneous regime [1].

Admissible propagation belongs to transport. This is the level at which the propagation condition is posed.

### 5.3 Local realization in the homogeneous case

Within the homogeneous regime, local geometry follows transport directly. The propagation framework can therefore recover contraction and related local structure from transport analysis without separately postulating an independent transformed local space.

Measurement is realized locally, but that local realization remains tied to the homogeneous transport. Rods, clocks, and material observers therefore realize the geometry supported by the same transport relations that govern propagation.

### 5.4 Homogeneous duration scaling

The temporal relation in the homogeneous case is

$$
\Delta \tau_{\mathrm{realized}}=\lambda\,\Delta \tau_{\mathrm{coord}}.
$$

Here $\Delta \tau_{\mathrm{coord}}$ is elapsed duration in the reference description, and $\Delta \tau_{\mathrm{realized}}$ is the duration realized by local physical processes. Both are understood relative to a chosen reference event from which duration is accumulated. The factor $\lambda$ is the homogeneous scaling factor derived in the propagation framework [1].

Realized duration is the duration over which local physical processes unfold within the realized local description. Accordingly, $\lambda$ scales the duration assigned to those processes relative to the coordinate description.

This scaling can also be understood through propagation cost. In the moving frame, the change is not merely geometric. As the frame moves through transport, the span of underlying vacuum storage effectively carried within that frame increases. A confined light process within the frame therefore traverses not only a longer path, but a larger effective capacity. This raises the total cost of propagation for processes realized within the frame. The slower rate of local processes, including the slower transport of clocks within the frame, is the realized result of that increased total cost. In that sense, the enlarged cost does not need to be compensated after the fact; it appears directly as the slower realized evolution of the frame’s internal processes.

Along the direction of motion, there is a second effect. The propagation cost is not only larger in total, but asymmetric between forward and backward traversal. That asymmetry is handled differently. It is not what produces the slower process rate; rather, it is what requires the frame’s synchronization assignment across separated clocks. Clocks synchronized by any conventional signal-exchange scheme inherit this issue, since such schemes determine one-way timing by partitioning round-trip propagation cost. The assignment of times to those clocks absorbs the directional imbalance, so that one-way propagation is still measured internally at the standard light speed. The slower local process rate therefore follows from the increased total cost, while the synchronization structure compensates for the directional asymmetry.

This ongoing maintenance of synchronization is natural in terrestrial frames. A frame attached to a rotating and orbiting planet is not statically realized once and then left unchanged. Its clocks and material processes are continually carried through the frame’s broader transport history. In that setting, the slow transport of clocks provides an ongoing physical mechanism by which scheduling relations are maintained. The point here is not to develop a full terrestrial timing model, but to note that in naturally evolving frames of this kind, synchronization is maintained through the frame’s transport history rather than being purely stipulated.

### 5.5 Propagation and measurement in one homogeneous setting

The homogeneous regime shows how propagation and measurement fit within one descriptive setting. Propagation is stated at the transport level. Measurement is realized at the local level. Because local geometry follows transport in the homogeneous case, the propagation analysis is sufficient to recover the local contraction and duration scaling developed in the first paper [1].

This is the key to the narrow starting point. The base paper did not need a full theory of displacement because the homogeneous regime lets transport, local realization, and duration scaling be treated together before the deeper chart non-identities appear.

### 5.6 Why the narrow starting point worked

The homogeneous regime suppresses the non-identity transforms that become central later. That allows the first paper to begin with the transport-level propagation condition alone and recover the narrow kinematic structure developed there. The present paper supplies the broader descriptive setting in which that result sits.

### 5.7 Summary

The homogeneous regime is the setting in which storage aligns with the coordinate description, transport remains undeformed, local geometry follows that transport, and realized duration scales from coordinate duration through the homogeneous factor $\lambda$.

## 6. Local Departure from Homogeneity: Displacement Defects and Gravitation

Section 5 treated the homogeneous regime. The present section turns to local departure from that alignment. In the vocabulary adopted here, gravitation appears as a displacement defect in the transport-supporting structure: transport is displaced from storage, and local geometry follows the admissible displaced transport.

The detailed mechanism by which such displacement defects arise, and the extent to which transport is excluded, retained, or stretched locally, is deferred to later work.

### 6.1 Gravitation as transport displacement

At the descriptive level used here, gravitation appears when transport is displaced from storage:

$$
X_{\mathrm{transport}}\neq X_{\mathrm{storage}}.
$$

Observable structure then follows from the changed admissible transport relations.

### 6.2 Local geometry follows transport

Local geometry is realized through the surrounding transport. A longer local extent or a changed realized duration reflects the transport through which local processes unfold. The local chart therefore follows the transport chart:

$$
X_{\mathrm{local}} \rightarrow X_{\mathrm{transport}}.
$$

### 6.3 Admissible realization

Transport determines what local geometric realization is available. Rods, clocks, and observers are sustained within the same domain whose transport has been displaced, so local realization tracks that admissible structure.

### 6.4 Hierarchy in displaced cases

In displaced cases, the key structural departure is

$$
X_{\mathrm{transport}}\neq X_{\mathrm{storage}}.
$$

Local geometry then follows the displaced transport described in Section 4.

### 6.5 Temporal consequence

The duration relation remains

$$
\Delta \tau_{\mathrm{realized}} = \
\lambda(X_{\mathrm{local}},v)\,\Delta \tau_{\mathrm{coord}},
$$

but the position dependence now belongs to transport displaced from storage. Realized duration and local geometry therefore appear together as coordinated aspects of the same displaced structure.

### 6.6 Forward use

This vocabulary lets later papers describe lensing, perihelion behavior, and related effects as consequences of displaced admissible transport and its local realization. A companion treatment of homogeneous noncollinear composition is given separately [2], and rotating-source response together with retarded cumulative displacement structure is taken up in a later dynamical paper [3].

## 7. Scope and Limits

This paper establishes descriptive vocabulary for the portion of the framework relevant to propagation, local realization, displacement, and gravitation.

It introduces one underlying domain together with several charted roles: coordinate, storage, transport, and local realization. It defines the relation between coordinate duration and realized duration through the factor $\lambda$. It also identifies gravitational structure, descriptively, with displacement of transport from storage.

The paper does not attempt the governing field equation for displacement, a full treatment of non-collinear transport, or a complete account of lensing, perihelion, or strong-field structure. Those belong to companion papers on homogeneous noncollinear composition and on retarded cumulative displacement with rotating-source response [2,3].

This division of labor is deliberate. The purpose here is to stabilize language and notation before later developments build on them.

## 8. Conclusion

This paper has developed a descriptive vocabulary for the portion of the framework that underlies the homogeneous propagation result and its extension toward displacement and gravitation. The central structure is a single underlying domain described through several charted roles: a coordinate chart, a vacuum storage field and its associated chart, a transport structure governing admissible propagation, and a local geometry realized by material systems.

In the homogeneous limit, the storage chart is identified with the coordinate chart, and the transport-level propagation condition is sufficient for the narrow kinematic result developed in the homogeneous propagation framework. In displaced cases, transport is displaced from storage, and local geometry follows the admissible transport.

Time enters through a relation between coordinate duration and realized duration, expressed by the scaling factor $\lambda$. This is sufficient for the homogeneous result and carries naturally into displaced cases.

The task of this paper has been foundational. It defines the descriptive roles clearly enough that later papers can build on them with stable terminology for space, transport, local geometry, and realized duration. With that vocabulary in place, later work on displacement and gravitation can proceed more cleanly.

## References

[1] James Buckeyne, *Homogeneous Light Propagation Framework*, Zenodo, 10.5281/zenodo.18997960.

[2] James Buckeyne, *The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition*, Zenodo, 10.5281/zenodo.19155341.

[3] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*, Zenodo, 10.5281/zenodo.19155407.

[4] National Institute of Standards and Technology, *Fundamental Physical Constants*.

[5] National Institute of Standards and Technology, *CODATA Value: vacuum electric permittivity*.

[6] National Institute of Standards and Technology, *CODATA Value: vacuum magnetic permeability*.


## Appendix A. Draft Changelog

**2026-03-18**  
Expanded the discussion of propagation cost and synchronization, including the distinction between increased total cost and directional asymmetry, and the note on synchronization being maintained through a frame’s transport history.
