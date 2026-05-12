# HPF vs GR: The Displacement and the Transport Layer

*Working note — James Buckeyne*

---

## The Core Relationship

GR and HPF are not competing descriptions of different physics. They are the same physical trajectory described from opposite sides of the same transformation — one that moves the displacement in or out of the geometry.

**GR maps the displacement *out*.**
The gravitational displacement field is folded into the metric. What remains is locally flat. The geodesic in that folded space is a straight line by construction. The Levi-Civita connection is the connection *of the already-displaced space* — it is curved because the displacement has been absorbed into the geometry. Nearness, in GR's sense, is defined after the displacement has been removed from real space and encoded into the metric structure.

**HPF leaves the displacement *in*.**
Real space stays flat. The displacement field $\Sigma(\vec{r})$ remains as a physical object in that flat space. A straight line in the flat background gets bent outward by the displacement — the transport layer itself is shoved. The Levi-Civita connection is flat, acting on a medium whose local structure has been physically displaced. Nearness — what counts as "the next step forward" along a path — is shifted by $\Sigma$.

**The reverse translation is the same path.**
When you take GR's straight geodesic and reverse-translate it back through the displacement it folded out, you recover exactly the bent path that HPF produces directly. They describe the same physical trajectory. The difference is not in the prediction but in what the theory says is *happening*: GR says space is curved; HPF says the transport layer has been displaced in flat space.

---

## The Levi-Civita Connection Is Real in Both

This is not an analogy to optics or a refractive-index trick. The Levi-Civita connection is genuinely operative in HPF — it determines how the fiber bundle parallel-transports along a path. What changes is not the connection but **what it acts on**.

- In GR: the connection encodes curvature because the displacement is absorbed into the metric. The fiber bundle threads through a curved space and the connection tells it what straight means there.
- In HPF: the connection is flat, but the transport layer — the medium through which the fiber bundle threads — has been physically displaced by $\Sigma$. The bundle follows the flat connection, but "what is nearby" at each step is shifted.

The fiber bundle sees different neighbors in HPF not because the geometry is curved but because the layer it rides on has been shoved out by the local displacement field.

---

## Why Minkowski Works (and What It Omits)

Minkowski space works for weak-field lensing calculations because linearized GR and a perturbed transport medium with $n_\text{eff} \approx 1 + 2\Phi/c^2$ are mathematically identical at first order. Both integrate the same quantity — they just call it curvature in one case and displacement in the other.

What Minkowski/GR omits — or rather, what it absorbs invisibly — is the displacement as a physical object. By folding it into the metric, GR removes it from real space. HPF insists it remains there, which is why the **composition rule** matters: when multiple displacement sources are present, the order in which the transport layer encounters them is physically meaningful. Nearest-last composition is a statement about the fiber bundle threading through sequentially displaced layers — it has no analog in GR's linear superposition of metric perturbations, because GR has already removed the layers from real space.

This is also why HPF and GR agree exactly in weak field for lensing: the first-order integral of $\Sigma$ along the path is the same regardless of whether $\Sigma$ is called curvature or displacement. The ordering correction is second-order in $\Sigma$, and only becomes significant in strong-field regimes — near compact objects, or in the deep interior structure where $\Sigma \sim 1$.

---

## The Cluster Lensing Implication

At galaxy cluster scales, individual galaxy displacements are weak ($\Sigma \ll 1$ per galaxy), so HPF and GR give identical per-photon deflections. The lensing signal attributed to dark matter cannot come from a per-deflection HPF correction.

The cluster mass discrepancy instead points to structural effects:

1. **Self-lensing contraction**: galaxies appear smaller than they physically are because their own extent is lensed inward. Photometric mass estimates based on apparent stellar distributions undercount physical mass.

2. **Projected displacement field shape**: the framework's $d\Sigma/dr$ gradient projects differently along the line of sight than a Newtonian enclosed-mass profile. The convergence $\kappa(\xi)$ has a different radial shape than assumed in dark-matter lensing reconstructions.

3. **Per-galaxy geometric coupling**: each member galaxy contributes its own geometric coupling term ($r_0 N^{1/3}$) independently. The cluster is not one mass of $10^{14}\ M_\odot$ — it is hundreds of galaxies each operating in the regime where geometric coupling is active. Their displacement fields superpose in the cluster halo region.

4. **Bullet Cluster specifically**: the lensing contours follow the galaxy positions (where nucleon count $N$ is concentrated) while the hot gas is displaced from the collision. No dark matter halo is needed — the displacement field tracks $N$, which is in the galaxies.

---

## Summary Statement

> GR and HPF describe the same bent path. GR gets there by removing the displacement from real space and encoding it as curvature. HPF gets there by leaving the displacement in real space and letting it shove the transport layer. The Levi-Civita connection is real in both — but in GR it is the connection of displaced space, while in HPF it is a flat connection acting on a displaced medium. Reversing GR's coordinate transformation recovers HPF's picture exactly.
