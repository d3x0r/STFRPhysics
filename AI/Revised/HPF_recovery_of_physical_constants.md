# Homogeneous Propagation Framework: Recovery of Physical Constants

**James Buckeyne**
Independent Research
Fernandina Beach, FL 32034; United States
Email: d3ck0r@gmail.com
ORCID iD: 0009-0004-2865-6447

*Companion papers:*
*Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960);
*The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929);
*The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition* (DOI: 10.5281/zenodo.19155341);
*The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response* (DOI: 10.5281/zenodo.19155407);
*The Homogeneous Propagation Framework: Weak-Field Observational Tests*;
*The Homogeneous Propagation Framework: Excitation, Closure, and Material Response*

---

## Abstract

The prior papers in this series establish the propagation framework, the displacement geometry of gravitation, and the weak-field observational tests. The present paper works in the opposite direction: starting from the classical constants G, h, e, and the SI unit system, it asks what upstream structure those constants already bundle. The answer in each case involves the same two quantities — the vacuum storage pair ε₀, μ₀ and the nuclear support radius r₀ — appearing in different combinations depending on which aspect of the medium is being measured. The factorizations are structural audits, not new derivations of the constants from first principles. The resulting picture is that ε₀, μ₀, and r₀ form the primitive layer from which the classical constants, the SI units, and the framework's weak-field geometric scales can be read.

**Keywords:** physical constants, vacuum primitives, upstream factorization, nuclear support scale, gravitational constant, Planck's constant, electron charge, natural units

---

## Introduction

The homogeneous propagation framework begins from the vacuum as a physical medium. Its two storage properties — electric permittivity ε₀ (F/m) and magnetic permeability μ₀ (H/m) — are the framework's primitive quantities. Their product sets the propagation speed, c = 1/√(ε₀μ₀), as the wave speed of the medium rather than a postulated spacetime constant. Their ratio sets the vacuum impedance, Z₀ = √(μ₀/ε₀) = 376.73 Ω, as the natural balance point between the two storage modes. The prior papers in this series develop the kinematic, transport, and gravitational consequences of this starting point, recovering the standard weak-field observational results from a displacement ontology rather than spacetime curvature.

The present paper asks a different question. The classical physical constants — the gravitational constant G, Planck's constant h, and the electron charge e — are usually presented as independent empirical inputs. Here they are treated instead as downstream packaging of the same upstream ingredients. G tracks how much displacement one unit of mass-energy produces in the transport structure, h tracks the minimum phase-space area of stable LC closure, and e tracks the electric-side loading of one proton-scale support volume. In each case the packaging leads back to ε₀, μ₀, and the nuclear support radius r₀ ≈ 1.22 fm.

**The convergence claim.** The point is not merely that G, h, and e can be rewritten in terms of other measured quantities. The point is that they all reduce onto the *same small basis* — ε₀, μ₀, r₀, and a chosen length unit — in combinations that suggest a common geometric origin in the vacuum medium. If the constants were genuinely independent, their decompositions would be expected to point to different scales and different substructure. Instead they repeatedly return to the same support scale and the same vacuum pair.

The meter is treated here as a chosen convention rather than a primitive ingredient. Once a length scale is fixed, the remaining free inputs are ε₀, μ₀, and r₀. The one open question that cannot yet be closed is why r₀ has the value it does. That unresolved step is shared with the deeper nuclear and excitation-side program, not introduced by this paper.

A second scope note is worth making explicit. The support bridge itself is not first introduced here. In the companion excitation paper, the isolated-to-bulk support shift is already carried by the occupancy/support channel and by the one-gram displacement proxy $d_{\mathrm{mole}}$. The role of the present constants paper is narrower: to show how that already-motivated support normalization is repackaged into the familiar constant forms once gram-native bookkeeping and SI conventions are made explicit.

The factorizations developed here are structural audits rather than full first-principles derivations. They show how the classical constants dissolve into a smaller set of geometric and medium factors once the SI packaging is unpacked. The residual open problems are likewise explicit: the value of r₀ from the medium geometry alone, the mass spectrum, and charge quantization.

A short interpretive note on proper and coordinate quantities is retained because it clarifies why the constant factorizations are not written as relativistic correction terms. That note is framing rather than dependency: the constants argument stands without any strong-field extension.

The paper is organized as follows. Section 1 develops the upstream unit hierarchy: the vacuum storage pair as primitives, the downstream emergence of seconds and kilograms, and the natural length scale. Section 2 covers gravity and mass together — G, r₀, the kilogram, the shell theorem, and the equivalence principle are all facets of the same displacement picture. Section 3 recovers Planck's constant from LC closure. Section 4 recovers the electron charge and develops the r₀³ kernel common to charge, mass, and action. Section 5 covers geometric and structural notes including the role of π and the safe claims. Section 6 briefly comments on proper and coordinate quantities as an interpretive frame for the earlier sections. Appendix A collects anchor numerical values. Appendix B gives a short note on the Larmor-radiation bookkeeping issue in the same medium picture.

Throughout, the distinction between structural audit and completed derivation is maintained. The factorizations show that the classical constants are not independent — they share a common upstream structure built from ε₀, μ₀, and r₀. They do not yet show why r₀ has the value it does, or why the mass spectrum is discrete, or why charge is quantized. Those questions are now sharply posed in terms of the medium geometry, which is a stronger position than treating them as unexplained empirical facts. But sharply posed is not yet answered, and the paper does not claim otherwise.


---


## 1. Vacuum Primitives and Unit Hierarchy

### 1.1 Foundational unit identity

The vacuum storage pair $\varepsilon_0$ (F/m) and $\mu_0$ (H/m) are the primitives of the framework. F and H are not converted to anything else — they are the primitive storage units of the medium. The foundational identity is simply:

$$
\boxed{\text{F}\cdot\text{H} = \text{F}\cdot\text{H}}
$$

This is the only statement needed. The vacuum factors $z_u \sim \sqrt{\text{H}}$ and $z_e \sim \sqrt{\text{F}}$ have the product

$$
z_u z_e \sim \sqrt{\text{F}\cdot\text{H}},
$$

which is a quantity of vacuum storage — not converted to seconds or any other derived unit. All subsequent factorizations in this note work in these terms. SI derived units (seconds, kilograms) are downstream consequences, not primitives.

---

### 1.2 Reactive exchange: the dynamics of storage

The foundational identity F·H = F·H describes static storage capacity. But an excitation is not static — it is a cycling exchange between the two storage modes. The dynamic quantities that describe this exchange are the magnetic reactance and the dielectric susceptance.

For a medium with storage densities $\varepsilon_0$ (F/m) and $\mu_0$ (H/m) cycling at frequency $f$:

$$
X = \mu_0 f \quad \text{(magnetic reactance, } \Omega\text{)}
\qquad
B = \varepsilon_0 f \quad \text{(dielectric susceptance, S)}
$$

$X$ is Henry per second — the rate at which magnetic storage is exchanged. $B$ is Farad per second — the rate at which dielectric storage is exchanged.

Their product is dimensionless:

$$
XB = \varepsilon_0\mu_0 f^2 = \frac{f^2}{c^2}
$$

This is the **energy storage factor** — the fraction of the medium's storage capacity that is actively cycling at frequency $f$. At $f = c/\ell$ (the natural resonance of a region of extent $\ell$), $XB = 1/\ell^2$, fully engaged.

Their ratio is frequency-independent:

$$
Z_0 = \sqrt{\frac{X}{B}} = \sqrt{\frac{\mu_0}{\varepsilon_0}} = 376.73\,\Omega
$$

This is the **vacuum impedance** — the natural balance point between the two storage modes. A wave sitting exactly at $Z_0$ has equal magnetic and dielectric amplitudes; neither mode dominates.

#### Amplitude and cycling as independent parameters

- **Cycling frequency** $f$ — set by the closure geometry of the excitation, determining rest mass via $E = hf$
- **Cycling amplitude** — how hard the storage modes are being driven, determining the actual volts and amps

The kilogram (section 9) measures the total persistent loading. The reactance and susceptance measure the rate of exchange. Both are needed to characterize what an excitation actually is.

---

### 1.3 Volts, amps, and the action hierarchy

The storage densities $\varepsilon_0$ (F/m) and $\mu_0$ (H/m) become total storage quantities once integrated over a spatial extent $\ell$:

$$
\Psi = \varepsilon_0 \cdot \ell \quad \text{(Coulombs — total dielectric storage)}
\qquad
\Phi = \mu_0 \cdot \ell \quad \text{(Webers — total magnetic storage)}
$$

These are static quantities — a charged capacitor has $\Psi$ whether or not any current is flowing. A permanent magnet has $\Phi$ whether or not any circuit is connected. The storage is there, in the medium, independent of time.

Their product is the **volt-amp** capacity — VA, the static energy amplitude:

$$
\Psi \cdot \Phi = \varepsilon_0\mu_0 \cdot \ell^2 \quad \text{(VA — static action capacity)}
$$

This is what a battery rating means. Nothing is changing in time. VA is the action capacity sitting on the shelf — dimensionally the second derivative of action $h$, not because anything is accelerating, but because of what the units *are*. A battery rated at 10 VA has that much action capacity available regardless of whether it is connected to anything.

When the circuit closes and storage begins to flow, the static quantities acquire time derivatives:

$$
I = \frac{d\Psi}{dt} = \frac{\varepsilon_0 \cdot \ell}{t} \quad \text{Amperes}
\qquad
V = \frac{d\Phi}{dt} = \frac{\mu_0 \cdot \ell}{t} \quad \text{Volts}
$$

Now the product gives **watts** — the rate at which action flows:

$$
V \cdot I = \frac{\varepsilon_0\mu_0 \cdot \ell^2}{t^2} \quad \text{Watts}
$$

And watts per second — the rate of change of power — is the **jerk** of the action displacement. In an inductor this jerk is physically observable: $V = L\,dI/dt$ — a voltage spike proportional to the rate of change of current. The inductive kick when a circuit is broken is the medium resisting jerk in action space.

The full hierarchy, reading from action downward:

$$
\underbrace{h}_{\text{J}\cdot\text{s — action}} \;\to\; \underbrace{h/\text{s} = \text{J}}_{\text{energy}} \;\to\; \underbrace{h/\text{s}^2 = \text{W} = \text{VA}}_{\text{acceleration of action}} \;\to\; \underbrace{h/\text{s}^3 = \text{W/s}}_{\text{jerk}}
$$

Or reading upward from the primitives:

$$
\underbrace{\varepsilon_0,\,\mu_0}_{\text{primitive}} \;\to\; \underbrace{\Psi,\,\Phi}_{\text{static storage}} \;\to\; \underbrace{\Psi\Phi = \text{VA}}_{\text{action capacity}} \;\to\; \underbrace{I,\,V}_{\text{flow rates}} \;\to\; \underbrace{VI = \text{W}}_{\text{action flow}} \;\to\; \underbrace{\dot{P} = \text{W/s}}_{\text{jerk}}
$$

The VA = 1 closure condition of section 3.1 is now legible: the vacuum excitation sits at unit action capacity — one quantum of VA — with no jerk. A perturbation introduces jerk, which the medium does not sustain, and which propagates outward as radiation.

Their ratio at resonance recovers the vacuum impedance:

$$
\frac{V}{I} = \frac{\mu_0}{\varepsilon_0} = Z_0^2 \quad \Rightarrow \quad \frac{V}{I} = Z_0 \quad \text{at resonance}
$$

---

### 1.4 Why $c^2$ and not $c$ — the signature of two coupled modes

Maxwell found $c = 1/\sqrt{\varepsilon_0\mu_0}$ as a dimensional observation — the number matched the measured speed of light before anyone wrote down a wave equation. The wave equation came after and justified it. But the square root was already there in the units relationship.

The deeper reason: $\varepsilon_0$ and $\mu_0$ are two **equal partners exchanging** energy, not one thing scaling linearly. The geometric mean is the natural combination when two quantities are multiplicatively coupled — exactly what an LC oscillator is. Energy sloshes between them, neither dominates, and the propagation speed is set by their product. The square root is the signature of this two-mode exchange.

The wave equation has a square root *because* the underlying medium has two coupled storage modes — Maxwell's dimensional observation came first and pointed at the physics the wave equation later made explicit.

This also explains where the factor of 2 appears throughout:
- $c^2 = 1/(\varepsilon_0\mu_0)$ — two time derivatives in the wave equation, because two modes
- $d^2 = 2GM/c^2$ — the 2 is the kinematic $\frac{1}{2}at^2$ factor, same second-derivative origin
- $G_g = \kappa_0^2/2$ — the ½ is the same kinematic factor

The square root is not mysterious. It is what you get when you ask how fast a disturbance propagates through a medium with two storage modes that exchange on equal terms.

---

### 1.5 The natural length — why $r_0 = 1$ is the fixed point

From $\varepsilon_0$ and $\mu_0$ alone, no length can be formed. Their ratio $\mu_0/\varepsilon_0 = Z_0^2$ has units $\Omega^2 = \text{H/F}$. Their product $\varepsilon_0\mu_0$ has units $\text{s}^2/\text{m}^2$. Neither combination yields a length. **The meter is irreducibly a human choice** — once a length is fixed, the second and kilogram follow, but the length itself must be chosen.

The framework does have a natural emergent length scale: $r_0$, the nuclear support radius. And there is a geometric reason it is the right choice.

For any length $r$, compare the volume $r^3$ to the linear scale $r$. The crossover where $r^3 = r$ is at $r = 1$. Below unity, volume collapses faster than radius shrinks. Above unity, volume grows faster than radius grows. The fixed point is exactly $r = 1$.

This is not just a curiosity. In natural units where $r_0 = 1$:
- Volume $= \frac{4\pi}{3} \approx 4.2$ — larger than the radius, as geometry requires
- Energy $\sim 1/r_0 = 1$ — order unity
- All the $10^{-45}$ factors vanish — they are entirely an artifact of the SI meter being $\approx 10^{15}\,r_0$

When $r < 1$ (i.e., measuring in units larger than $r_0$, as SI does), the volume of the support is *smaller* than what the linear dimension implies. The geometry inverts. This is not a physical effect — it is the unit system placing you on the wrong side of the fixed point.

The natural length is therefore $r_0$ itself: the scale where $r^3 = r$, where volume and linear measure are equal, and where the physics is geometrically self-consistent. This is also the scale where:
- $r_0^3$ is the support volume of one nucleon
- The Compton wavelength of the proton $\lambda_C \approx r_0$
- Both $G$ and $h$ emerge from the same $r_0$ (sections 3 and 8.7)

*Note on SI penalties:* The gram is more natural than the kilogram here. $r_0$ was fit to nuclear data which is inherently per-nucleon, per-gram-mole. The framework is secretly gram-native. The kilogram introduces a factor of 1000 — visible as the difference between $m_p = 1.661\times10^{-24}$ g and $m_p = 1.661\times10^{-27}$ kg, and as the 500 = 1000/2 in $G = 500\,r_0^2 c^2$ (1000 from kg→g, 2 from the kinematic half).

---


## 2. Gravity and Mass

Gravity and mass are not separate phenomena that happen to be equal — in the displacement framework they are the same thing seen from two directions. Mass is the persistent loading of the vacuum medium by a sustained LC excitation. Gravity is the displacement that loading creates in the transport structure. Without mass there is no displacement; without displacement there is no gravitational effect. The equivalence principle, which in standard treatments is a coincidence requiring explanation, is in this picture simply the statement that sourcing and responding are two aspects of one medium property.

This section develops the gravitational constant $G$ and the kilogram together, because separating them obscures their common origin.

### 2.1 The symmetric two-source reading — $G = g^2$

Newton's law of gravitation $F = Gm_1 m_2/r^2$ presents gravity as a force between two masses, with $G$ as a universal constant of proportionality. This framing hides a structural feature that was always present in the underlying physics: the force is not really a property of the pair — it is the product of two separate one-source effects.

Consider what each mass actually does. Mass $m_1$ creates a cumulative displacement field in the transport structure — a scalar field:

$$\Sigma_1(r) = \frac{g \cdot m_1}{r}$$

at distance $r$ from the source. Mass $m_2$ does the same independently. The displacement field is a scalar at every point — a dimensionless number encoding how much the medium is displaced there, with no direction in it. When two sources are present, their displacement fields compose multiplicatively, giving:

$$\Sigma_{12} \sim \frac{g \cdot m_1}{r} \cdot \frac{g \cdot m_2}{r} = \frac{g^2\, m_1 m_2}{r^2}$$

formally identifying $G = g^2$. Mass enters linearly — not as a square root. Each source contributes $g \cdot m/r$ to the displacement, and the product of two such contributions gives $g^2 m_1 m_2/r^2 = G m_1 m_2/r^2$ exactly, matching Newton.

**The gradient gives the force and its direction.** The scalar field $\Sigma(r)$ is the cumulative displacement — it has no direction. The gravitational acceleration is the gradient of this scalar:

$$\mathbf{a} = -c^2\,\nabla\Sigma$$

The direction of gravitational attraction emerges from the geometry of how $\Sigma$ varies in space — pointing toward higher $\Sigma$, which is toward the source. The force law is not put in by hand; it is the gradient of a scalar sum. This is why the Shell Theorem (section 2.7) works cleanly: inside a uniform shell $\Sigma$ is constant, its gradient is zero, and there is no force — not because force vectors cancel geometrically, but because the scalar field is flat and has no gradient to extract a direction from.

**How this could have been seen during initial formulations.** Newton had no reason to factor $G$ because all he could measure was the combined constant. Cavendish measured $G$ by measuring the force between known masses — a two-source measurement by construction. Every subsequent measurement of $G$ has been a two-source measurement. The one-source amplitude $g$ was never accessible from those experiments. The factoring only becomes natural when the displacement geometry is made explicit: once you see that each mass sources its own scalar displacement field and the force is the gradient of their product, $G = g^2$ is the natural expression of two fields composing multiplicatively.

The cleanest statement: $G$ is not a fundamental constant — it is the square of a more primitive amplitude $g$ that characterizes how strongly one unit of mass displaces the transport structure per unit distance. Everything that follows in this section is the unpacking of what $g$ is made of.

---

### 2.2 The displacement relation — staged geometry, not surface area

The weak-field displacement parameter is written as:

$$d^2 = \frac{2GM}{c^2}$$

This is useful bookkeeping but easy to over-read. The appearance of a squared radius does **not** mean that mass is fundamentally a surface area, or that the displacement geometry is two-dimensional. The correct reading, as established in the displacement dynamics companion paper (Appendix D), is that source content passes through a staged geometric chain before arriving at this squared-radius form:

$$\text{occupancy/mass} \;\longrightarrow\; \text{support volume } Nr_0^3 \;\longrightarrow\; \text{support radius } r_0 N^{1/3} \;\longrightarrow\; \text{squared-radius bookkeeping } d^2$$

Mass is volume-rooted occupancy first. For $N$ nucleons, each contributing support volume $r_0^3$, the total volume is $Nr_0^3$ and the aggregate support radius is $r_0 N^{1/3}$ by the cube-root inversion of a sphere. Only after this geometric reduction does the displacement parameter $d^2 = 2GM/c^2$ appear — as macroscopic weak-field bookkeeping over an already-integrated body, not as a statement that the source is an area.

The $d^2 \propto M$ (linear in mass) is therefore consistent with $r \propto M^{1/3}$ (cube root in nucleon count) — they are describing different stages of the same chain. $d^2$ is what you get when the full nucleon-volume geometry has been summed and packaged into the macroscopic weak-field limit. The ontological primitive is the volume $Nr_0^3$; the squared form is a downstream convenience.

#### Target form in upstream variables

Substituting $c = 1/(z_u z_e)$ and $G = g^2$ (section 2.1), the displacement parameter becomes:

$$d = \sqrt{2}\, g M \cdot z_u z_e$$

where $M$ is the source mass (in grams, gram-native units), $g = r_{0,\mathrm{eff}}\,c$ is the per-source gravitational amplitude (section 2.4), and $z_u z_e = \sqrt{\mu_0\varepsilon_0}$ is the vacuum storage factor. The structure is: source mass times a vacuum-carried amplitude — the displacement is the product of what the source is ($M$) and how strongly the medium responds to it ($g \cdot z_u z_e$).

---

### 2.3 $r_0$ unpacked — sphere factor and support density

A bulk-radius law of the form $R = r_0\,m^{1/3}$ already contains hidden geometric packaging. For packed matter with support volume per gram $p_\star$:

$$
V = p_\star m = \frac{4\pi}{3}R^3
\quad\Rightarrow\quad
r_0 = \left(\frac{3}{4\pi}p_\star\right)^{1/3}.
$$

So $r_0$ bundles two pieces: the pure sphere-volume factor $(3/4\pi)^{1/3}$ and the physical support-density term $p_\star^{1/3}$.

Defining

$$
\chi_{\mathrm{sph}} \equiv \left(\frac{3}{4\pi}\right)^{1/3} \approx 0.62035,
\qquad
\ell_\star \equiv p_\star^{1/3},
$$

so that $r_0 = \chi_{\mathrm{sph}}\,\ell_\star$: $r_0$ is the historical bundled coefficient; $\ell_\star$ is the unbundled linear support scalar; $p_\star$ is the support-volume coefficient per gram.

#### Empirical values

Using $r_0 \approx r_{0,\mathrm{eff}} \approx 1.2187\times 10^{-15}\,\mathrm{m}$:

$$
p_\star = \frac{4\pi}{3}r_0^3 \approx 7.5819\times 10^{-45}\,\mathrm{m^3/g},
\qquad
\ell_\star \approx 1.9645\times 10^{-15}\,\mathrm{m\,g^{-1/3}}.
$$

---

### 2.4 Gram normalization, $\kappa_0$, and little $g$

The gram-normalized displacement proxy is

$$
r_{0,\mathrm{eff}} \equiv d_{\mathrm{mole}} = \sqrt{\frac{2G(1\,\mathrm g)}{c^2}},
$$

which gives the identity

$$
G = 500\,r_{0,\mathrm{eff}}^2 c^2 = \frac{500\,r_{0,\mathrm{eff}}^2}{\mu_0\varepsilon_0}.
$$

The factor 500 = 1000/2: the 1000 is the kg→g conversion (the framework is gram-native; see section 0.6), the 2 is the kinematic $\frac{1}{2}at^2$ factor.

This is the place where the visible SI wrapper should be read carefully. The substantive bridge is the gram-native one-gram support proxy $d_{\mathrm{mole}} \equiv r_{0,\mathrm{eff}}$, already motivated on the excitation side as the bulk-support normalization. The factor 500 is not the primary claim; it is the downstream SI packaging of the chain

$$
\text{support scale} \;\longrightarrow\; d_{\mathrm{mole}} \;\longrightarrow\; g=\kappa_0 \;\longrightarrow\; G_{\mathrm g}=g^2/2 \;\longrightarrow\; G.
$$

In that reading, the kg-based 500 is the final wrapper, not the first appearance of the underlying support law.

At gram normalization:

$$
G_{\mathrm g} = \frac{r_{0,\mathrm{eff}}^2 c^2}{2} = \frac{\kappa_0^2}{2},
$$

where the **support-through-vacuum** quantity — also written as little $g$ — is:

$$
\boxed{\kappa_0 \equiv g \equiv r_{0,\mathrm{eff}}\, c = \frac{r_{0,\mathrm{eff}}}{\sqrt{\mu_0\varepsilon_0}}}
$$

**$\kappa_0$ and $g$ are the same object.** In the two-source displacement reading (section 2.1), $G = g^2$ identifies little $g$ as the per-source displacement amplitude. In the gram-normalization reading (this section), $\kappa_0 = r_{0,\mathrm{eff}}\,c$ identifies the same quantity as the support scale carried through the vacuum propagation factor. These are two ways of reading the same upstream object; the note uses $g$ going forward.

The cleanest chain: support scale $r_{0,\mathrm{eff}}$ → vacuum-carried amplitude $g = r_{0,\mathrm{eff}}\,c$ → squared conversion constant $G_g = g^2/2$ → SI-packaged $G = 500\,g^2/c^2 \cdot c^2 = 500\,g^2$.

---

### 2.5 Material-dependent displacement: $g_{\text{material}}$

In principle the per-source factor $g$ could depend on nuclear composition, proton-to-neutron ratios, packing geometry, and binding energy. Different materials have different nuclear structures and therefore potentially different displacement amplitudes per unit mass.

For the purposes of the present paper, however, that possibility is not pushed into a detailed phenomenology. The role of section 2 is narrower: to identify the common upstream structure carried by the gravitational packaging itself. Questions of composition dependence, null tests of equivalence, and material-specific departures are downstream matters that belong to the excitation and measurement side of the framework rather than to the constant audit developed here.

---

### 2.6 The kilogram as volumetric F·H — mass as medium loading

$G$ contains kilograms in its units; $h$ (the current SI definition) also bundles kilograms. Neither is upstream of the kilogram — both are downstream conversions that presuppose it. The framework inverts this.

The second falls out of the medium directly:

$$
1\,\text{s} = \sqrt{\text{F}\cdot\text{H}}.
$$

With the second eliminated, $c^2 = \text{m}^2/(\text{F}\cdot\text{H})$, and from $E = Mc^2$:

$$
\boxed{1\,\text{kg} \sim \frac{\text{F}\cdot\text{H}}{\text{m}}}.
$$

A kilogram is vacuum LC storage per unit length. The primitive hierarchy is:

$$
\varepsilon_0,\,\mu_0 \;\xrightarrow{\text{primitive}}\; c,\,Z_0 \;\xrightarrow{\text{derived}}\; \text{s},\,\text{kg},\,G.
$$

---


### 2.7 Shell theorem in displacement terms

Newton's Shell Theorem states that a uniform spherical shell exerts no gravitational force on a body inside it, and exerts a force on a body outside it equivalent to the shell's total mass concentrated at the center. The standard derivation works through the force law. In the displacement framework the same result appears, but with an important addition: the *potential* — equivalently, the cumulative displacement $\Sigma$ — does not vanish inside the shell. It is constant.

---

### 2.7.1 Displacement field of a thin shell

For a thin uniform shell of mass $M$ and radius $R$, the cumulative displacement at a field point $P$ is the sum of contributions from each mass element $dm$:

$$\Sigma(P) = \int_{\text{shell}} \frac{G\,dm}{c^2\,|\mathbf{r}_P - \mathbf{r}_{dm}|}$$

This is the standard potential integral. $\Sigma$ is a scalar — just a number at each point, with no direction in it. The direction of gravitational effect emerges from differentiating this scalar field: $\mathbf{a} = -c^2\nabla\Sigma$. The scalar sum encodes everything; direction is what you get *from* the scalar by differentiation, not something that needs to be put in at the start. This is cleaner than the vector force derivation of the Shell Theorem, which requires tracking how force contributions from opposite sides of the shell cancel geometrically. In the displacement picture, that cancellation is automatic — it is encoded in the flatness of the scalar field inside the shell, as the result below shows.

The Shell Theorem result for the potential is:

$$\Sigma(r) = \begin{cases} \dfrac{GM}{c^2 R} & r < R \quad\text{(inside — constant)} \\[8pt] \dfrac{GM}{c^2 r} & r > R \quad\text{(outside — same as point mass)} \end{cases}$$

Outside the shell, $\Sigma(r) = GM/c^2 r$ — the displacement field is identical to that of a point mass at the center. The shell's detailed structure is invisible from outside.

Inside the shell, $\Sigma = GM/c^2 R$ — uniform throughout the interior. The gradient $\nabla\Sigma = 0$ everywhere inside, so there is no force, no preferred direction, no tidal acceleration. The shell is gravitationally transparent to its contents in the force sense.

---

### 2.7.2 What the constant interior displacement means — tangential stretch and the Pythagorean geometry

The force vanishing inside does not mean the displacement vanishes. Every point inside the shell carries the same cumulative displacement $\Sigma = GM/c^2 R$ — sourced by the entire shell, but uniform, so its gradient is zero.

In the displacement framework, $\Sigma$ directly sets the clock rate: a clock inside the shell runs slow by the factor $(1 - \Sigma)$ relative to a clock far outside. The shell produces **uniform time dilation** throughout its interior — every clock inside runs at the same rate, slower than outside, with no position-dependence within the shell.

**The uniform interior displacement is set by the shell's own radius, not by position inside it.** $\Sigma_{interior} = GM/c^2 R$ — it knows $R$ but not $r$. This is the geometrically correct result: every shell element at radius $R$ contributes a $1/r^2$ falloff outward from itself, but integrated over the full sphere the $1/r^2$ contributions from opposing elements cancel in gradient and sum to a constant in potential. The interior displacement is entirely determined by the shell's mass and its own radius — not by how far inside you are.

**The tangential stretch picture.** The displacement geometry $D(r,d) = \sqrt{r^2 + d^2}/r$ describes how the transport structure is stretched tangentially around a mass. At the shell surface, the tangential distance in displaced transport is $\sqrt{R^2 + d^2}$ rather than $R$ — a Pythagorean combination of the coordinate radius and the displacement parameter $d$. This is where the square root enters the displacement geometry: not from an area calculation but from the Pythagorean combination of radial and tangential displacement components.

For an interior point at radius $r < R$, the shell elements surround it at all angles. Each element's tangential stretch contribution, projected inward, averages over the full solid angle. The result is that the interior experiences the displacement as if it were sitting at the shell's own radius $R$ — the full tangential stretch of the shell is present everywhere inside, uniformly, because no direction is preferred. The $1/r^2$ falloff from individual shell elements is exactly compensated by the increasing solid angle as you consider elements further from any given interior point, leaving a constant.

**The interior time dilation is therefore equivalent to the shell's own surface displacement** $\Sigma = d^2/2R = GM/c^2 R$. It is not accumulating as you go deeper — it is fixed at the value set by the shell's mass and radius. A clock deep inside a shell and a clock just inside the shell run at exactly the same rate. The shell's displacement, seen from inside, is the same everywhere: the Pythagorean stretch of the transport structure at the shell's own radius, projected uniformly inward.

This is physically distinct from zero displacement. The shell:
- Exerts no force on anything inside (gradient zero)
- Time-dilates everything inside uniformly at $\Sigma = GM/c^2 R$ (set by shell radius, not interior position)
- Is equivalent to a point mass for everything outside

**The $d^2$ in the displacement relation.** The appearance of $d^2 = 2GM/c^2$ as a squared quantity reflects this Pythagorean geometry. The displacement parameter $d$ is the geometric displacement of the transport structure — the offset in the Pythagorean combination $\sqrt{r^2 + d^2}$. It appears squared in the weak-field relation because the potential $\Sigma = d^2/2r$ involves the square of this geometric offset divided by the distance. This is not a surface area — it is a squared length from the Pythagorean displacement geometry.

**The rotating hollow shell — frame drag and Mach's principle.** For a rotating shell, the scalar displacement $\Sigma$ inside is still uniform and gradient-free — the static result is unchanged. But the rotation adds a vector displacement channel: the transport structure inside the shell acquires a uniform azimuthal twist set by the shell's angular velocity $\Omega$ and its $\Sigma$. The frame drag rate inside is uniform:

$$\omega_{drag} = \frac{4}{3}\Sigma\,\Omega$$

A gyroscope anywhere inside the shell is embedded in this uniformly twisted transport. It gets carried at the same angular rate regardless of position — no gradient, no differential steering, no precession relative to anything else inside the shell. A gyroscope inside does not precess relative to another gyroscope inside.

The only way to detect the shell's rotation from inside is to compare against an external reference — a guide star. That comparison would show everything inside rotating together at $\omega_{drag}$. No interior experiment can distinguish the shell's rotating frame from an inertial frame.

This is Mach's principle stated precisely in displacement terms: inside a sufficiently massive rotating shell, the locally inertial frame is the shell's rotating frame. The transport structure is uniformly twisted, and there is no position-dependent variation to reveal the twist from inside. Each shell nucleon contributes its own near-field azimuthal displacement; the sum of all these contributions inside is the uniform twist. No gradient means no differential steering, means no detectable precession using interior references alone.

This contrasts sharply with the GPB case, where the Earth's frame drag field varies with position and altitude. A gyroscope in orbit moves through a varying transport structure, the orbital frame rotates as the spacecraft follows the curved geodesic, and the guide star comparison reveals the accumulated drift. The gradient is what makes the effect observable without an external reference.

---

### 2.7.3 Stacking shells — building a solid sphere

For a solid uniform sphere of mass $M$ and radius $R$, decompose it into thin shells of radius $r'$ and mass $dM(r') = (3M/R^3)r'^2\,dr'$. The displacement at a field point $r$ inside the sphere receives contributions from:

- All shells with $r' > r$: each contributes $G\,dM(r')/c^2 r'$ uniformly (interior formula)
- All shells with $r' < r$: each contributes $G\,dM(r')/c^2 r$ as a point mass (exterior formula)

$$\Sigma(r) = \int_r^R \frac{G}{c^2 r'}\cdot\frac{3M}{R^3}r'^2\,dr' + \int_0^r \frac{G}{c^2 r}\cdot\frac{3M}{R^3}r'^2\,dr'$$

$$= \frac{3GM}{c^2 R^3}\int_r^R r'\,dr' + \frac{3GM}{c^2 r R^3}\int_0^r r'^2\,dr'$$

$$= \frac{3GM}{c^2 R^3}\cdot\frac{R^2-r^2}{2} + \frac{3GM}{c^2 r R^3}\cdot\frac{r^3}{3}$$

$$= \frac{3GM}{2c^2 R}\left(1 - \frac{r^2}{3R^2}\right) - \frac{GM\,r^2}{c^2 R^3}\cdot\frac{1}{2}$$

Simplifying:

$$\boxed{\Sigma(r) = \frac{GM}{2c^2 R}\left(3 - \frac{r^2}{R^2}\right) \quad r \leq R}$$

At the center ($r = 0$): $\Sigma(0) = 3GM/2c^2 R$ — maximum displacement, $3/2$ times the surface value.

At the surface ($r = R$): $\Sigma(R) = GM/c^2 R$ — matches the exterior formula continuously.

The gradient inside:

$$\frac{d\Sigma}{dr} = -\frac{GM\,r}{c^2 R^3}$$

This is nonzero inside — there is a force directed toward the center, proportional to $r$, recovering the standard result that gravity inside a uniform sphere is linear in depth.

---

### 2.7.4 The displacement composition picture

Each nucleon contributes $r_0^3$ of support volume. The total displacement field of a body is the sum of individual nucleon contributions:

$$\Sigma(r) = \sum_i \frac{G\,m_i}{c^2\,|\mathbf{r} - \mathbf{r}_i|}$$

For a shell of $N$ nucleons each at radius $R$ from the center, this is exactly the shell integral above. The individual displacement radii $d_i = \sqrt{2Gm_i/c^2}$ for each nucleon are tiny — of order $r_0 \approx 1.22$ fm for one nucleon's worth of mass. No interior point is inside any individual nucleon's displacement radius. The superposition is therefore always in the linear regime, and the Shell Theorem applies cleanly.

This confirms the framework's treatment of nuclear matter as incompressible: the displacement field of a macroscopic body is the linear superposition of individual nucleon displacements, summed over the body's geometry, with no nonlinear corrections unless two displacement radii overlap — which only happens at nuclear densities.

---

### 2.7.5 Summary

| Region | $\Sigma(r)$ | $\nabla\Sigma$ | Physical consequence |
|---|---|---|---|
| Outside shell ($r > R$) | $GM/c^2 r$ | $-GM/c^2 r^2$ | Force toward center, as point mass |
| Inside shell ($r < R$) | $GM/c^2 R$ (constant) | $0$ | No force; uniform time dilation |
| Inside solid sphere ($r < R$) | $\frac{GM}{2c^2 R}(3 - r^2/R^2)$ | $-GMr/c^2 R^3$ | Force linear in depth |
| Center of sphere | $3GM/2c^2 R$ | $0$ | Maximum time dilation, no net force |

The Shell Theorem in displacement terms adds one physical statement that the force version obscures: **a massive shell time-dilates its interior uniformly, even though it exerts no force on anything inside it.** This is not a small correction — for a shell the mass of a galaxy, the interior time dilation is significant regardless of where inside the shell you are. The force structure and the time-dilation structure are independent consequences of the same displacement field.

---


### 2.8 The equivalence principle as a stability selection rule

### 2.8.1 The circularity of the inertial mass measurement

The Eötvös ratio

$$
\eta = \frac{a_1 - a_2}{\bar{a}}
$$

measures the *relative* ratio between two different materials. A universal shift of the absolute ratio is invisible to any experiment that uses mass as its own reference. In the framework's terms: $1\,\text{kg} \sim \text{F}\cdot\text{H/m}$ is upstream of any gravitational calibration.

### 2.8.2 The selection rule

The medium sustains only excitations for which the displacement a localized mode **sources** equals the displacement it **resists**:

$$
g_\text{grav}(r_0,\,f,\,A) = g_\text{inertia}(r_0,\,f,\,A)
$$

This is a self-consistency condition. VA = 1 (section 8.5) enforces the internal transport/storage balance; this gravitational/inertial equality enforces the external sourcing/resistance balance. Together they constrain allowed $(f, r_0, A)$ triples to a discrete set — the mass spectrum is not continuous. Unstable particles fail the balance and decay until they reach a configuration that satisfies both conditions.

### 2.8.3 Scope note

The selection rule above is the framework's conceptual account of why gravitational sourcing and inertial response track one another for persistent excitations. In the present paper that claim is left at the structural level. Detailed confrontation with precision equivalence-principle experiments, material-dependent systematics, and matter-wave implementations would require a separate measurement-focused treatment and is therefore not developed here.

---


## 3. Recovery of Planck's Constant

The gravity-side factorization shows how a classical coupling constant can be unfolded back into medium and support-scale ingredients. The next question is whether the same can be done for the quantum side. Here the aim is not to reproduce the full historical derivation of Planck's constant, nor to claim that quantization has been reduced to vacuum storage alone. The aim is narrower: to show that once closure is treated as a property of a self-sustaining LC excitation, the units and scale of $h$ stop looking like an alien input and begin to look like the action bookkeeping of one completed support cycle.

That shift in viewpoint matters. In standard packaging, $h$ is introduced as the universal quantum of action and then used to relate energy, frequency, and phase-space area. In the present upstream reading, one asks instead what sort of medium-level closure condition would force a localized excitation to carry one fixed action per cycle. The answer proposed here is that stable closure fixes a specific relation between extent, cycling, and enclosed phase-space orbit. On that reading, $h$ is not the starting point of the closure argument but the integrated measure of a successful one.

### 3.1 Closure quantization and the VA = 1 condition

A self-sustaining excitation satisfies a locking condition between its spatial extent $\ell$ and its cycling frequency $f$:

$$
\frac{\ell f}{c} = 1 \quad \Rightarrow \quad \ell = \frac{c}{f} = \lambda_C
$$

This is the Compton wavelength relation — not imposed from outside but falling out of what it means to close. A closed excitation cannot choose its size and its cycling independently: one full cycle has to fit one full support traverse. The closure length is therefore not an optional geometrical label but part of the stability condition itself.

The apparent power (VA) of such an excitation:

$$
E \cdot I = \varepsilon_0\mu_0 \cdot \ell^2 \cdot f^2 = \frac{\ell^2 f^2}{c^2} = 1
$$

Dimensionless and equal to 1 for every closed excitation, regardless of which particle.

The importance of this condition is conceptual as much as algebraic. It says that closure fixes not only a frequency-length relation but also a normalized storage-exchange level. Once the excitation is truly self-sustaining, its electric-side and magnetic-side exchange no longer float freely; they sit at the unit closure condition. Different particles may differ in support geometry and frequency, but not in the basic fact that a stable closure must exactly balance its own cycling.

### VA as the second derivative of action

Action $h$ has units J·s. One time derivative gives J (energy). A second time derivative gives J/s = W = VA. So VA is the *second derivative of action* — the acceleration of the action displacement. Equivalently, action is the double integral of VA over time.

The physical reading of this hierarchy:

- **VA** — the acceleration available to the action, the instantaneous rate at which action is being driven
- **Joules** — one integration, energy, the velocity of the action displacement
- **$h$** (J·s) — two integrations, action, the displacement itself

At VA = 1 the acceleration of action is exactly balanced: one full quantum of $h$ accumulates per cycle, neither more nor less. The cycling is at constant "velocity" in action space. A perturbation away from VA = 1 means the action is accelerating or decelerating per cycle — an unstable configuration the medium does not sustain.

This is the narrative bridge between the storage language of Section 1 and the quantum constant language used later. The proposal is not that action is mysteriously imported into the medium from outside, but that once the medium supports a balanced closure, action is the natural integrated quantity that closure leaves behind over one cycle. VA is the local rate statement; $h$ is the cycle-complete bookkeeping statement.

### The resonant string and the unit pluck

A resonant string can vibrate at any amplitude — the frequency is set by geometry, the amplitude by how hard it is plucked. But if the pluck itself is quantized, only certain amplitudes are stable.

The pluck that initiates a vacuum excitation is not arbitrary — it is one quantum of angular momentum shed by an electron transition, carried as a photon. A photon always carries exactly $h$ of action regardless of its frequency. The frequency sets the energy $hf$; the action per cycle is always $h$. The pluck is always the same size.

The minimum stable excitation of the vacuum medium is therefore the one that sustains itself on exactly one such pluck — one $h$ per cycle, VA = 1. This is not an external constraint imposed on the medium; it is what the medium naturally supports given that the initiating event is always one quantum of angular momentum. Higher stable states are integer multiples — the harmonic spectrum of the string — which maps to the structure of particle generations and excited states.

The proton and electron both satisfy VA = 1 at one $h$ per cycle, but at very different frequencies — different string lengths, same pluck. The mass ratio $m_p/m_e \approx 1836$ is the ratio of their closure frequencies, which is the inverse ratio of their closure lengths. The pluck is universal; the geometry is not.

This analogy should be read as interpretive scaffolding rather than as the derivation itself. Its purpose is to make clear what is supposed to be universal and what is allowed to vary. The universal part is the unit closure condition and the one-action-per-cycle bookkeeping. The variable part is the support geometry that selects the realized frequency and therefore the realized rest mass.

#### What this means for the mass spectrum

- **One free parameter**: the frequency $f$ (sets rest mass via $E = hf$)
- **One fixed relation**: VA = 1 (the closure constraint)
- **One open question**: the amplitude — what distinguishes particles of different mass at the same closure topology

#### Planck's constant in upstream terms

$$
h \sim \text{m}\sqrt{\text{F}\cdot\text{H}}
$$

$h$ is a length times the natural oscillation unit of the medium — the spatial scale of one complete closure action. The rest energy:

$$
E = hf = \frac{\text{m}^2}{\ell}
$$

A pure ratio of lengths: the natural length unit of the medium to the closure length of the excitation.

That is the core structural claim of this subsection. Once closure is written in medium variables, the units of $h$ no longer look exceptional. They read as exactly what one would expect from a completed action cycle carried by a length-bearing storage medium.

---

### 3.2 Derivation of $h$ from LC closure

The previous subsection gives the qualitative closure picture. This subsection states the more concrete audit: what numerical combination of vacuum storage and support geometry reproduces the observed scale of $h$?

$h$ emerges from the requirement that a sustained localized LC excitation must leave zero net residue in the infinite homogeneous vacuum after one complete cycle.

Define the integrated electric displacement and magnetic flux over the effective cross-section $A \approx \pi r_0^2$:

$$Q \approx \varepsilon_0 E_{\rm max} A, \qquad \Phi \approx B_{\rm max} A.$$

For the excitation to be stable, the phase-space orbit in the $(Q, \Phi)$ plane must enclose:

$$\oint \Phi\, dQ = h \quad \Rightarrow \quad Q_{\rm max} \Phi_{\rm max} = h.$$

The LC medium enforces $B = \varepsilon_0 c E$, giving:

$$h = \varepsilon_0^2 c\, (E_{\rm max} A)^2.$$

With $A = \pi r_0^2$ and identifying the anchor energy with the proton rest energy:

$$
\boxed{h \approx \frac{\pi}{2}\, r_0\, m_p\, c^3 \approx \frac{\pi}{2}\, \frac{r_0^4}{(\varepsilon_0\mu_0)^{3/2}}}
$$

Using $r_0 \approx 1.2\times10^{-15}$ m reproduces $h \approx 6.626\times10^{-34}$ J·s.

The point of the expression is not merely that it gives the right order of magnitude. It is that the same support scale that already entered the gravity-side analysis reappears here in the closure-side analysis, now with the vacuum pair supplying the cycling factor. That is the convergence the paper wants the reader to notice: gravity and action are not being derived from unrelated hidden scales, but from different readings of the same support geometry in the same medium.

Both $h$ and $G$ now emerge from the same nuclear support scale $r_0$ together with $\varepsilon_0$, $\mu_0$. No external quantum constant is inserted. What remains open is not whether the factorization can be written, but why the support scale and closure amplitude take the values they do.

---


## 4. Recovery of the Electron Charge

If Section 3 addresses the cycling side of the medium, charge forces the opposite emphasis. Charge is not primarily about closure frequency or phase-space orbit. It is about static occupancy on the electric side of the vacuum pair. That makes the charge factorization both simpler and more delicate: simpler because no magnetic-side cycling is required at the first step, and more delicate because the missing ingredient is no longer a frequency but the internal field amplitude of the excitation.

The strategy of this section is therefore parallel to the earlier ones but not identical. First isolate the electric-side storage factor. Then show how the proton support geometry supplies a natural capacitance. Then identify the remaining gap explicitly: not a missing geometric kernel, but the internal voltage set by the excitation's own closure.

### 4.1 Vacuum pair first, classical constants second

Introducing complementary vacuum factors $z_u$ (magnetic side) and $z_e$ (electric side):

$$
 z_u z_e = \sqrt{\mu_0\varepsilon_0}, \qquad c = \frac{1}{z_u z_e}.
$$

$\mu_0$ and $\varepsilon_0$ are packaged descendants of the more primitive pair $(z_u, z_e)$.

This is useful here because it separates the two sides of the medium before they are repackaged into the more familiar constants. On the gravity and action sides, both branches remain active. For charge, the electric-side factor is the relevant one at leading order. Writing the vacuum pair this way makes that asymmetry legible instead of hiding it inside the final SI expressions.

---

### 4.2 The symmetric two-source reading and the purely electric nature of charge

The Coulomb law $F = q_1q_2/(4\pi\varepsilon_0 r^2)$ admits a symmetric factorization parallel to gravity:

$$
F = \left(z_e\frac{q_1}{r}\right)\left(z_e\frac{q_2}{r}\right) = z_e^2\frac{q_1q_2}{r^2},
$$

formally identifying $1/(4\pi\varepsilon_0) = z_e^2$. The two-body law is the product of two identical per-source amplitudes — the same structure as $G = g^2$.

That parallel matters because it shows that the paper is not arbitrarily treating gravity as composite while leaving electromagnetism untouched. At the level of the two-body law, both interactions admit the same formal reading: an interaction strength built from two identical per-source amplitudes. The difference is not in the symmetry of the source pairing, but in what kind of medium quantity each source amplitude represents.

An important contrast with gravity: **charge contains no $c$, no $\mu_0$**. The Coulomb constant $k_e = 1/(4\pi\varepsilon_0)$ is purely electric-side storage — no propagation speed, no magnetic component. This is because charge is *static* storage occupancy, not a cycling rate. Gravity couples to energy (which is storage cycling — F·H per unit time), so $c$ appears naturally in $G$. Charge couples only to the capacitive side of the medium.

That distinction is one of the cleanest conceptual results in the paper. It explains why the charge factorization should not be expected to look like a smaller copy of the $h$ factorization. Charge belongs to the storage side before the cycle starts. Action belongs to the completed cycle. Their common geometry may be the same, but the medium aspect being counted is different.

---

### 4.3 The $r_0^3$ kernel: charge, mass, and action as different faces of one support volume

The proton is the primitive charge. It has a support radius $r_0$, and that radius defines a natural volume of vacuum medium. All three of the main excitation quantities — charge, mass, and action — have $r_0^3$ as their common kernel. They differ only in which aspect of the medium is being counted.

This is the section's main unifying move. Rather than treating charge, mass, and action as three unrelated observables that happen to share a radius somewhere in their formulas, the proposal is that one proton-scale support volume is being read three different ways. That does not eliminate the differences among them; it explains where those differences live.

#### Charge: the electric-side loading of one support volume

ε₀ characterizes how the vacuum medium stores electric energy *per unit length of extent* — it is a linear density, F/m, not a volumetric one. This is not an arbitrary SI convention but a reflection of how electric storage capacity actually scales with geometry in the medium: a capacitor's capacitance scales with plate area divided by separation, which is a length ratio, so the fundamental medium property that governs it is linear.

This has a direct consequence when extracting a natural capacitance from a finite support volume. The support volume $r_0^3$ is a volume, but ε₀ is a linear density. To project the linear density onto the volume geometry of a spherical support of radius $r_0$, exactly one inverse-length factor must be absorbed — the factor that converts the linear extent $\ell$ over which ε₀ is defined into the appropriate projection onto the support volume. For a spherical geometry, this factor is $1/r_0$, or equivalently $A_v = 1\,\text{m}^{-1}$ as a dimensionless-valued but unit-carrying scalar:

$$
C_{\text{nat}} = \varepsilon_0 \cdot A_v \cdot r_0^3 = \frac{\text{F}}{\text{m}} \cdot \frac{1}{\text{m}} \cdot \text{m}^3 = \text{F}
$$

This is **pure Farads** — the natural capacitance of one support volume. No $c$, no $\mu_0$, no cycling. $A_v$ is not a new physical constant and not a dimensional patch — it is the expected consequence of ε₀'s character as a linear medium property being projected onto a three-dimensional support geometry. The same factor appears implicitly whenever a capacitance is computed from a spatial geometry: it is the $1/d$ in a parallel-plate capacitor, the $1/r$ in a spherical capacitor. Here it is made explicit because the support geometry is the proton itself.

The charge at unit voltage is then:

$$
e \sim C_{\text{nat}} \times 1\,\text{V} = \varepsilon_0\, A_v\, r_0^3 \times 1\,\text{V} \quad [\text{Coulombs}]
$$

Numerically: $C_{\text{nat}} = 8.854\times10^{-12} \times (1.2187\times10^{-15})^2 \approx 1.315\times10^{-41}\,\text{F}$.

The gap between this and $e = 1.602\times10^{-19}\,\text{C}$ is the internal voltage of the excitation — not 1 V externally imposed but the field amplitude set by the proton's own closure geometry. That voltage is essentially $m_p c^2 / e \approx 938\,\text{MV}$, the rest energy of the proton expressed as a potential across one electron charge. Deriving this internal voltage from the closure geometry is the remaining open step for the charge factorization.

This is the point at which the charge section becomes sharply posed rather than fully closed. The support volume and the electric-side capacitance are already in hand. What is still missing is the dynamical closure statement that fixes the realized internal field amplitude. In other words: the geometric container is identified, but the excitation-level filling rule is not yet fully derived.

#### Mass: the total F·H loading of one support volume

$$
m_p \sim \frac{\text{F}\cdot\text{H}}{\text{m}} \cdot r_0^2 \quad\text{(from section 9: }1\,\text{kg} \sim \text{F}\cdot\text{H/m)}
$$

The proton mass is the F·H loading — both storage modes together — of its support geometry. Here the same support structure is being read not as pure electric occupancy but as total persistent loading of both medium branches.

#### Action: the closure cycling of one support volume

$$
h \sim \frac{\pi}{2}\,r_0^4 / (\varepsilon_0\mu_0)^{3/2} = \frac{\pi}{2}\,r_0^3 \cdot \frac{r_0}{(\varepsilon_0\mu_0)^{3/2}}
$$

$h$ is $r_0^3$ (the kernel volume) times a cycling rate factor $r_0/(\varepsilon_0\mu_0)^{3/2}$ — the action quantum of one support volume completing one closure cycle.

#### Summary

| Quantity | Expression | Medium aspect |
|----------|-----------|---------------|
| $e$ | $\varepsilon_0\, A_v\, r_0^3 \times V_{\text{int}}$ | Electric-side (F only) |
| $m_p$ | $\sim \text{F}\cdot\text{H/m} \times r_0^2$ | Both modes, persistent loading |
| $h$ | $\sim r_0^3 \times r_0/(\varepsilon_0\mu_0)^{3/2}$ | Both modes, one closure cycle |

The common factor is $r_0^3$. The distinctions are: which storage mode (electric only vs both), and static vs cycling. That is why the three quantities can share a kernel without collapsing into the same observable.

---


## 5. Geometric Notes and Summary

The previous two sections carry most of the paper's substance. This final technical section is therefore not meant to introduce another major mechanism. Its role is to gather the recurring geometric motifs into one place and state, as plainly as possible, what the paper has and has not established.

In particular, two things need to be kept distinct. First, similar constants can inherit similar geometric factors for different reasons; shared symbols do not automatically imply shared physics. Second, the paper's strongest claims are structural rather than absolute: it identifies a common upstream basis and several repeated kernels, but it does not yet derive every excitation-scale multiplier from substrate theory alone.

### 5.1 The role of $\pi$: two different appearances

- **Gravity side**: $\pi$ enters through sphere-volume inversion — $V = \frac{4\pi}{3}R^3$ gives $(3/4\pi)^{1/3}$ in $r_0$. It is a **volume** normalization.
- **Coulomb side**: $4\pi$ comes from spherical flux spreading — surface area $A = 4\pi r^2$. It is a **surface-flux** normalization.

The two appearances should not be conflated. This is a small point algebraically, but it matters interpretively because the paper repeatedly moves between support volume, flux spreading, and closure area. The same symbol shows up in all three environments, but it is not doing the same job each time.

---


### 5.2 Summary and safe claims

What, then, is the most that can safely be said at the end of the audit? The answer is not that the classical constants have been reduced all the way to first principles. The answer is that several constants usually treated as independent can be unfolded onto the same medium pair and the same support scale, with the remaining gaps now localized rather than hidden.

#### The structural chain

**Gravity**
$$
r_0 = \left(\frac{3}{4\pi}p_\star\right)^{1/3}, \qquad
g \equiv \kappa_0 = r_{0,\mathrm{eff}}\,c, \qquad
G_{\mathrm g} = \frac{g^2}{2}, \qquad
G = 500\,g^2
$$

**Electromagnetism**
$$
c = \frac{1}{z_u z_e}, \qquad \frac{1}{4\pi\varepsilon_0} = z_e^2
$$

**The $r_0^3$ kernel**
$$
e \sim \varepsilon_0\,A_v\,r_0^3\,V_{\rm int}, \qquad
m_p \sim \frac{\text{F}\cdot\text{H}}{\text{m}}\,r_0^2, \qquad
h \sim \frac{\pi}{2}\frac{r_0^4}{(\varepsilon_0\mu_0)^{3/2}}
$$

**Units**
$$
1\,\text{s} = \sqrt{\text{F}\cdot\text{H}}, \qquad 1\,\text{kg} \sim \frac{\text{F}\cdot\text{H}}{\text{m}}, \qquad r_0 = 1 \text{ (natural length)}
$$

Taken together, these expressions are the paper's central output. They do not say that everything has been derived. They say that the apparent diversity of the packaged constants is at least partly downstream of a much smaller upstream basis.

#### What would be needed to go further

1. A substrate-level derivation of the isolated support scale.
2. A derivation of the collective dressing that lifts isolated support to the bulk $r_0$ scale.
3. A derivation showing why the weak-field burden depends on the square of the vacuum-carried support quantity.
4. A derivation connecting the symmetric two-source amplitudes to the standard sourced-field form.
5. A clearer substrate-level interpretation of $z_e$, $z_u$, and $A_v$.
6. Derivation of the internal voltage $V_{\rm int}$ from the proton closure geometry — this would close the charge derivation.

Those are not minor bookkeeping tasks. They are the actual frontier left by the present paper. But stating them explicitly is part of the point: once the constants have been unpacked this way, the remaining unknowns are narrower, more specific, and more physically interpretable than the original presentation in which $G$, $h$, and $e$ simply appear as separate primitives.

---

## 6. Discussion: Proper and Coordinate Quantities

Every physical measurement is made with material rods, clocks, and oscillatory processes. In that sense, experimentally anchored formulas are tied first to realized measurements, while coordinate descriptions are later theoretical organizations of those measurements. Here that point is only interpretive: the constant factorizations of sections 2–4 are written in terms of medium properties and support scales, so they need not be cast as relativistic correction formulas laid on top of an otherwise complete Newtonian packaging.

This does **not** require a wholesale re-reading of classical mechanics in proper-velocity language. The narrower point is simply that the quantities isolated here — $r_0$, $\varepsilon_0$, $\mu_0$, the closure scale, and the support volume — are upstream bookkeeping objects. They belong to the medium description prior to whichever coordinate language is later used for kinematics.

Read in that limited way, the discussion prevents category mistakes. The paper's claim is not that the constants have been rederived by a new relativistic mechanics, but that once the classical constants are unpacked into vacuum-storage and support-scale components, a common upstream structure becomes visible.

---


## Appendix A: Anchor Values and Charge-to-Vacuum Ratios

### Vacuum primitives

$$
\varepsilon_0 = 8.8542 \times 10^{-12}\,\text{F/m}, \qquad
\mu_0 = 1.2566 \times 10^{-6}\,\text{H/m}
$$
$$
c = 2.9979 \times 10^{8}\,\text{m/s}, \qquad Z_0 = 376.73\,\Omega
$$

### Nuclear support scale

$$
r_0 \approx r_{0,\mathrm{eff}} \approx 1.2187\times10^{-15}\,\text{m}
$$
$$
r_0^3 \approx 1.808\times10^{-45}\,\text{m}^3
\qquad
p_\star = \frac{4\pi}{3}r_0^3 \approx 7.582\times10^{-45}\,\text{m}^3/\text{g}
$$

### Little $g$ (= $\kappa_0$)

$$
g = r_{0,\mathrm{eff}}\,c \approx 1.2187\times10^{-15} \times 2.9979\times10^8 \approx 3.654\times10^{-7}\,\text{m}^2/\text{s}
$$
$$
G_g = g^2/2 \approx 6.676\times10^{-14}\,\text{m}^4/(\text{s}^2\text{-g})
\qquad
G = 500\,g^2 \approx 6.674\times10^{-11}\,\text{m}^3/(\text{kg-s}^2) \checkmark
$$

### Electron charge referenced to vacuum primitives

$$
e = 1.6022 \times 10^{-19}\,\text{C}
$$
$$
\frac{e}{\varepsilon_0} = 1.809 \times 10^{-8}\,\text{V}\cdot\text{m} \qquad\text{(electric-side amplitude)}
$$
$$
\frac{e}{\mu_0} = 1.275 \times 10^{-13}\,\text{A}\cdot\text{m}/\Omega \qquad\text{(magnetic-side amplitude)}
$$

The ratio $e/\varepsilon_0$ to $e/\mu_0$ equals $\mu_0/\varepsilon_0 = Z_0^2$: the electron sits at the vacuum impedance balance point.

### Natural capacitance of one support volume

$$
C_{\text{nat}} = \varepsilon_0\,A_v\,r_0^3 \approx 8.854\times10^{-12} \times (1.2187\times10^{-15})^2 \approx 1.315\times10^{-41}\,\text{F}
$$

The internal voltage implied by the proton rest energy: $V_{\rm int} = m_p c^2 / e \approx 938\,\text{MV}$.

---


---
