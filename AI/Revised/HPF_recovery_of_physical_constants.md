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

The prior papers in this series establish the propagation framework, the displacement geometry of gravitation, and the weak-field observational tests. The present paper works in the opposite direction: starting from the classical constants G, h, e, and the SI unit system, it asks what upstream structure those constants already bundle. The answer in each case involves the same two quantities — the vacuum storage pair ε₀, μ₀ and the nuclear support radius r₀ — appearing in different combinations depending on which aspect of the medium is being measured. The factorizations are structural audits, not new derivations of the constants from first principles. Several additional corrective results are developed: the proper-velocity reframing of black hole infall, gravitational lensing as differential phase accumulation rather than wavefront deflection, the elimination of the photon sphere on observational grounds. Together these establish a consistent upstream picture in which ε₀, μ₀, and r₀ are the primitive layer from which the classical constants, the SI units, and the weak-field gravitational geometry all descend.

**Keywords:** physical constants, vacuum primitives, upstream factorization, nuclear support scale, gravitational constant, Planck's constant, electron charge, natural units, proper velocity, gravitational lensing, photon sphere

---

## Introduction

The homogeneous propagation framework begins from the vacuum as a physical medium. Its two storage properties — electric permittivity ε₀ (F/m) and magnetic permeability μ₀ (H/m) — are the framework's primitive quantities. Their product sets the propagation speed, c = 1/√(ε₀μ₀), as the wave speed of the medium rather than a postulated spacetime constant. Their ratio sets the vacuum impedance, Z₀ = √(μ₀/ε₀) = 376.73 Ω, as the natural balance point between the two storage modes. The prior papers in this series develop the kinematic, transport, and gravitational consequences of this starting point, recovering the standard weak-field observational results from a displacement ontology rather than spacetime curvature.

The present paper asks a different question. The classical physical constants — the gravitational constant G, Planck's constant h, the electron charge e — are presented in standard treatments as independent empirical inputs. Each carries its own units, its own measurement history, its own dimensional combination of mass, length, and time. That combination is not accidental: each constant encodes a specific physical relationship, and those relationships, once the SI unit system is unpacked, reveal the same upstream structure. G encodes how much displacement one unit of mass-energy produces in the transport structure. h encodes the minimum phase-space area for a stable LC closure in the vacuum medium. e encodes the capacitive loading of one proton-scale support volume on the electric side of the medium. In each case the packaging is downstream of ε₀, μ₀, and a third quantity: the nuclear support radius r₀ ≈ 1.22 fm, the per-nucleon packing scale of nuclear matter.

The factorizations developed here are not derivations in the sense of recovering the numerical values of the constants from ε₀ and μ₀ alone. They are structural audits — demonstrations that when the constants are expressed in terms of ε₀, μ₀, r₀, and the SI unit conventions (gram versus kilogram, the meter as an arbitrary human length scale), the classical packaging dissolves into a small set of geometric and medium factors. The residuals that cannot yet be derived — the precise value of r₀ from the medium geometry alone, the mass spectrum, the quantization of charge — are identified explicitly as the remaining open problems.

Several corrective results accompany the factorization program. The framework's account of proper velocity — which has no upper bound, with photons carrying infinite proper velocity rather than a coordinate speed $c$ — clarifies the black hole infall picture: the infalling observer runs out of proper time in milliseconds during the final approach, while the outside observer receives a time-stretched but finite record of those last milliseconds. Neither observer experiences anything frozen or infinite. The standard narrative has this backwards. Gravitational lensing is developed as differential phase accumulation through displaced medium rather than wavefront deflection — a distinction proved by the observed preservation of polarization through lensing events, which rules out genuine path curvature. The photon sphere is eliminated as a consequence: it requires circular null geodesics, which require wavefront bending, which polarization preservation rules out. The paper is organized as follows. Section 1 develops the upstream unit hierarchy: the vacuum storage pair as primitives, the downstream emergence of seconds and kilograms, and the natural length scale. Section 2 covers gravity and mass together — G, r₀, the kilogram, the shell theorem, and the equivalence principle are all facets of the same displacement picture. Section 3 recovers Planck's constant from LC closure. Section 4 recovers the electron charge and develops the r₀³ kernel common to charge, mass, and action. Section 5 covers geometric and structural notes including the role of π and the safe claims. Section 6 is a discussion of how the classical formulas were already proper-velocity expressions. Appendix B contains corrective notes on proper velocity and black hole infall, gravitational lensing as phase accumulation, and the resolution of the Larmor radiation paradox. An appendix collects anchor numerical values.

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

The per-source factor $g$ is not necessarily a universal constant per unit mass — in principle it could depend on nuclear composition, proton-to-neutron ratios, packing geometry, and binding energy. Different materials have different nuclear structures and therefore potentially different displacement amplitudes per unit mass.

However, the framework's own stability selection rule (section 2.8) provides a strong argument that this material dependence cancels exactly for any persistent excitation. The medium only sustains excitations for which the displacement a body sources equals the displacement it resists — meaning $g_{\text{grav}} = g_{\text{inertia}}$ is enforced by the medium's self-consistency condition, not assumed as a postulate. Any composition-dependent variation in $g_{\text{material}}$ would affect both the sourcing and the resistance equally, leaving their ratio identically 1.

This makes the MICROSCOPE result not a constraint on the framework but an **expected** outcome. MICROSCOPE measured:

$$\eta(\text{Ti},\,\text{Pt}) = [-1.5 \pm 2.3_\text{stat} \pm 1.5_\text{syst}] \times 10^{-15}$$

The framework predicts $\eta = 0$ exactly — not approximately, not subject to composition corrections, but exactly, because the selection rule enforces it for any stable excitation regardless of what it is made of. A nonzero result would require an excitation that sources more displacement than it resists, which the medium does not sustain. MICROSCOPE is measuring the ratio that stability already requires to be 1.

For smaller bodies where $\Sigma$ is tiny, both the gravitational coupling and the inertial resistance scale with the same $r_0^3$ per nucleon. Their ratio is 1 by construction at every scale. The equivalence principle is not a coincidence to be tested — it is the self-consistency condition for existence.

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

Each nucleon contributes $r_0^3$ of support volume (Appendix B.5). The total displacement field of a body is the sum of individual nucleon contributions:

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

### 2.8.3 What MICROSCOPE actually constrains

$$
\eta(\text{Ti},\,\text{Pt}) = [-1.5 \pm 2.3_\text{stat} \pm 1.5_\text{syst}] \times 10^{-15}
$$

In this framework the null result is **expected**: the selection rule enforces $g_\text{grav}/g_\text{inertia} = 1$ for any persistent excitation regardless of composition. The experiment probes the *ratio* of the two couplings, not whether $g_{\text{material}}$ itself varies. The framework predicts $\eta = 0$.

Additional systematics noted:

- **Nesting and displacement composition**: the inner Pt mass sees the Earth's field dressed by the Ti shell. $\Sigma_{\text{shell}} \sim 1.6\times10^{-12}$, small but formally present.
- **Electrostatic suspension**: asymmetric electrode geometry with different dielectric properties of Pt and Ti could produce a material-dependent coupling at the nN scale — not claimed as an actual systematic but open.
- **Orbital clock mismatch**: Pt and Ti Compton frequencies differ by $\approx 4\times$. Over one orbital period ($\approx 5900$ s), accumulated phase difference $\sim 10^4$ rad. Whether this feeds back into the effective inertial response at $10^{-15}$ is open.

### 2.8.4 The nuclear radius measurement problem

Charge radius measurements (electron scattering, isotope shifts, muonic X-rays) measure the **charge (proton) radius**, not the **matter (proton + neutron) radius**. For MICROSCOPE: Pt-195 has $N/Z \approx 1.50$ with neutron skin $\sim 0.15$–$0.20$ fm; Ti-48 has $N/Z \approx 1.18$ with neutron skin $\sim 0.05$ fm. The effective per-nucleon matter radius differs from the charge-radius-derived value, with corrections pushing in opposite directions (reducing the naive charge-radius difference from $\approx 6.5\%$ to $\approx 4.9\%$).

Additionally, charge radii measured from ions may systematically underestimate the effective $r_0$ in neutral bulk matter, since the electron cloud's outward electrostatic pressure on the nucleus is absent in stripped ions.

### 2.8.5 Binding energy as a competing effect

$$
B/A(\text{Pt-195}) \approx 7.83\,\text{MeV/nucleon}, \qquad B/A(\text{Ti-48}) \approx 8.72\,\text{MeV/nucleon}
$$

A difference of $\approx 11\%$. The binding energy effect **opposes** the charge-radius ordering, producing a partial cancellation of the naive $\eta$ estimate. Whether this cancellation is accidental or structural is open.

### 2.8.6 The matter-wave alternative

Matter-wave interferometry uses an independent mass scale — the Compton frequency $f_C = mc^2/h$ — rather than gravitational or electromagnetic calibration. Current tests (Rb$^{87}$/K$^{41}$, Sr/Rb) reach $\eta \sim 10^{-7}$ to $10^{-9}$. Future space-based missions (STE-QUEST, AEDGE) targeting $10^{-17}$ would probe clock-to-trajectory mismatches, a genuinely different observable from the Eötvös ratio.

---


---


## 3. Recovery of Planck's Constant

### 3.1 Closure quantization and the VA = 1 condition

A self-sustaining excitation satisfies a locking condition between its spatial extent $\ell$ and its cycling frequency $f$:

$$
\frac{\ell f}{c} = 1 \quad \Rightarrow \quad \ell = \frac{c}{f} = \lambda_C
$$

This is the Compton wavelength relation — not imposed from outside but falling out of what it means to close.

The apparent power (VA) of such an excitation:

$$
E \cdot I = \varepsilon_0\mu_0 \cdot \ell^2 \cdot f^2 = \frac{\ell^2 f^2}{c^2} = 1
$$

Dimensionless and equal to 1 for every closed excitation, regardless of which particle.

### VA as the second derivative of action

Action $h$ has units J·s. One time derivative gives J (energy). A second time derivative gives J/s = W = VA. So VA is the *second derivative of action* — the acceleration of the action displacement. Equivalently, action is the double integral of VA over time.

The physical reading of this hierarchy:

- **VA** — the acceleration available to the action, the instantaneous rate at which action is being driven
- **Joules** — one integration, energy, the velocity of the action displacement
- **$h$** (J·s) — two integrations, action, the displacement itself

At VA = 1 the acceleration of action is exactly balanced: one full quantum of $h$ accumulates per cycle, neither more nor less. The cycling is at constant "velocity" in action space. A perturbation away from VA = 1 means the action is accelerating or decelerating per cycle — an unstable configuration the medium does not sustain.

### The resonant string and the unit pluck

A resonant string can vibrate at any amplitude — the frequency is set by geometry, the amplitude by how hard it is plucked. But if the pluck itself is quantized, only certain amplitudes are stable.

The pluck that initiates a vacuum excitation is not arbitrary — it is one quantum of angular momentum shed by an electron transition, carried as a photon. A photon always carries exactly $h$ of action regardless of its frequency. The frequency sets the energy $hf$; the action per cycle is always $h$. The pluck is always the same size.

The minimum stable excitation of the vacuum medium is therefore the one that sustains itself on exactly one such pluck — one $h$ per cycle, VA = 1. This is not an external constraint imposed on the medium; it is what the medium naturally supports given that the initiating event is always one quantum of angular momentum. Higher stable states are integer multiples — the harmonic spectrum of the string — which maps to the structure of particle generations and excited states.

The proton and electron both satisfy VA = 1 at one $h$ per cycle, but at very different frequencies — different string lengths, same pluck. The mass ratio $m_p/m_e \approx 1836$ is the ratio of their closure frequencies, which is the inverse ratio of their closure lengths. The pluck is universal; the geometry is not.

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

---

### 3.2 Derivation of $h$ from LC closure

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

Both $h$ and $G$ now emerge from the same nuclear support scale $r_0$ together with $\varepsilon_0$, $\mu_0$. No external quantum constant is inserted.

---


## 4. Recovery of the Electron Charge

### 4.1 Vacuum pair first, classical constants second

Introducing complementary vacuum factors $z_u$ (magnetic side) and $z_e$ (electric side):

$$
z_u z_e = \sqrt{\mu_0\varepsilon_0}, \qquad c = \frac{1}{z_u z_e}.
$$

$\mu_0$ and $\varepsilon_0$ are packaged descendants of the more primitive pair $(z_u, z_e)$.

---

### 4.2 The symmetric two-source reading and the purely electric nature of charge

The Coulomb law $F = q_1q_2/(4\pi\varepsilon_0 r^2)$ admits a symmetric factorization parallel to gravity:

$$
F = \left(z_e\frac{q_1}{r}\right)\left(z_e\frac{q_2}{r}\right) = z_e^2\frac{q_1q_2}{r^2},
$$

formally identifying $1/(4\pi\varepsilon_0) = z_e^2$. The two-body law is the product of two identical per-source amplitudes — the same structure as $G = g^2$.

An important contrast with gravity: **charge contains no $c$, no $\mu_0$**. The Coulomb constant $k_e = 1/(4\pi\varepsilon_0)$ is purely electric-side storage — no propagation speed, no magnetic component. This is because charge is *static* storage occupancy, not a cycling rate. Gravity couples to energy (which is storage cycling — F·H per unit time), so $c$ appears naturally in $G$. Charge couples only to the capacitive side of the medium.

---

### 4.3 The $r_0^3$ kernel: charge, mass, and action as different faces of one support volume

The proton is the primitive charge. It has a support radius $r_0$, and that radius defines a natural volume of vacuum medium. All three of the main excitation quantities — charge, mass, and action — have $r_0^3$ as their common kernel. They differ only in which aspect of the medium is being counted.

#### Charge: the electric-side loading of one support volume

Define $A_v = 1\,\text{m}^{-1}$ as a bookkeeping scalar — value 1, carrying the unit needed to turn the linear density $\varepsilon_0$ (F/m) into a pure capacitance over a volume:

$$
C_{\text{nat}} = \varepsilon_0 \cdot A_v \cdot r_0^3 = \frac{\text{F}}{\text{m}} \cdot \frac{1}{\text{m}} \cdot \text{m}^3 = \text{F}
$$

This is **pure Farads** — the natural capacitance of one support volume. No $c$, no $\mu_0$, no cycling. The charge at unit voltage is then:

$$
e \sim C_{\text{nat}} \times 1\,\text{V} = \varepsilon_0\, A_v\, r_0^3 \times 1\,\text{V} \quad [\text{Coulombs}]
$$

Numerically: $C_{\text{nat}} = 8.854\times10^{-12} \times (1.2187\times10^{-15})^2 \approx 1.315\times10^{-41}\,\text{F}$.

The gap between this and $e = 1.602\times10^{-19}\,\text{C}$ is the internal voltage of the excitation — not 1 V externally imposed but the field amplitude set by the proton's own closure geometry. That voltage is essentially $m_p c^2 / e \approx 938\,\text{MV}$, which is the rest energy of the proton expressed as a potential across one electron charge.

*Note:* $A_v$ is not a new physical constant. It is the bookkeeping acknowledgment that $\varepsilon_0$ is a linear density (F/m) and the volume normalization requires one factor of 1/m to be absorbed. Like the $4\pi$ in Coulomb's law and the 500 in $G$, it is packaging, not physics.

#### Mass: the total F·H loading of one support volume

$$
m_p \sim \frac{\text{F}\cdot\text{H}}{\text{m}} \cdot r_0^2 \quad\text{(from section 9: }1\,\text{kg} \sim \text{F}\cdot\text{H/m)}
$$

The proton mass is the F·H loading — both storage modes together — of its support geometry.

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

The common factor is $r_0^3$. The distinctions are: which storage mode (electric only vs both), and static vs cycling.

---


## 5. Geometric Notes and Summary

### 5.1 The role of $\pi$: two different appearances

- **Gravity side**: $\pi$ enters through sphere-volume inversion — $V = \frac{4\pi}{3}R^3$ gives $(3/4\pi)^{1/3}$ in $r_0$. It is a **volume** normalization.
- **Coulomb side**: $4\pi$ comes from spherical flux spreading — surface area $A = 4\pi r^2$. It is a **surface-flux** normalization.

The two appearances should not be conflated.

---


### 5.2 Summary and safe claims

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

#### What would be needed to go further

1. A substrate-level derivation of the isolated support scale.
2. A derivation of the collective dressing that lifts isolated support to the bulk $r_0$ scale.
3. A derivation showing why the weak-field burden depends on the square of the vacuum-carried support quantity.
4. A derivation connecting the symmetric two-source amplitudes to the standard sourced-field form.
5. A clearer substrate-level interpretation of $z_e$, $z_u$, and $A_v$.
6. Derivation of the internal voltage $V_{\rm int}$ from the proton closure geometry — this would close the charge derivation.

---


## 6. Discussion: The Classical Formulas Were Already Proper

Every measurement ever made is a proper measurement. Every clock that has ever ticked is a physical process running in proper time. Every velocity ever recorded was measured with such clocks. Every force ever felt by an accelerometer was proper acceleration. There is no instrument that measures coordinate time, coordinate velocity, or coordinate acceleration — those quantities are theoretical constructs, useful for calculation, but never directly observed.

This has a consequence that runs through the entire paper. Newton derived his formulas from experiment at terrestrial velocities, where $v/c \sim 10^{-5}$ and the difference between proper and coordinate quantities is of order $10^{-10}$ — far below any classical measurement threshold. He wrote down formulas that work. He could not have known, and did not need to know, that they were proper-velocity formulas. The distinction was unmeasurable. The formulas are therefore already in proper-velocity space, not because Newton put them there deliberately, but because all measurements are.

The escape velocity formula $w_{esc} = \sqrt{2GM/r}$ is the clearest example. At Earth's surface it gives $\sim 11.2$ km/s — proper and coordinate velocity agree to ten decimal places, and the formula works. Extended to relativistic regimes, it continues to give the proper escape velocity. At the Schwarzschild radius $r_s = 2GM/c^2$ it gives $w_{esc} = c$ — not coordinate $c$, but proper $c$, which corresponds to a photon. Inside $r_s$ it gives $w_{esc} > c$, meaning escape requires more than a photon's proper velocity, which no massive excitation can provide. This is a physically meaningful, coordinate-independent statement derived from a Newtonian formula that never needed relativistic correction — because it was never a coordinate formula.

The same applies throughout this paper. The factorizations of $G$, $h$, and $e$ in sections 2–4 work cleanly without relativistic corrections because they are already operating in proper-velocity space. The gram-normalization of $G$ in section 2.3, the LC closure derivation of $h$ in section 3.2, the capacitive loading picture of $e$ in section 4 — none of these require a relativistic amendment, because the underlying quantities ($r_0$, $\varepsilon_0$, $\mu_0$) are medium properties that exist prior to any kinematic description.

The contrast with $E = mc^2$ is instructive. That formula is explicitly relativistic — Einstein derived it from the relativistic framework. The $c$ in it is the wave speed of the medium, $1/\sqrt{\varepsilon_0\mu_0}$, which corresponds to infinite proper velocity. It is not a kinematic velocity at all. Rest energy $mc^2$ is "how much energy you would get if you converted mass entirely to photon-mode propagation of the medium" — the infinite-proper-velocity end of the spectrum, not a speed limit. The formula is relativistic not because it corrects Newton but because it operates at a regime Newton never reached.

What is standardly called "relativistic correction to Newtonian mechanics" is therefore better understood as a *coordinate correction* — a restatement of proper-velocity formulas in coordinate terms that breaks down near $v = c$ in coordinate language, even though the proper formulas remain valid throughout. The physics does not break down. The coordinate description of the physics breaks down. Section 7 applies this distinction to three specific cases where the coordinate description has produced standard narratives that the proper-velocity picture corrects.

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


## Appendix B: Corrective Notes

### B.1 Proper time, proper velocity, and the black hole infall narrative

*This section develops the proper-velocity reframing of black hole physics and identifies where the standard narrative has the physics backwards.*

---

### B.1.1 The measurement problem with coordinate time

Coordinate time is never measured. Every physical clock — atomic, mechanical, biological — is a process running in proper time. Every velocity measurement uses those clocks. Every accelerometer measures proper acceleration. The entire body of classical mechanics that has been tested and confirmed is therefore already written in proper quantities, even when the variables were called coordinate quantities because the distinction was not yet understood.

At terrestrial velocities, $v/c \sim 10^{-5}$, the difference between proper and coordinate velocity is $\sim 10^{-10}$ — far below any classical measurement threshold. Newton wrote formulas that work, not knowing they were proper-time formulas all along. The escape velocity formula:

$$w_{esc} = \sqrt{\frac{2GM}{r}}$$

is a proper velocity formula. It gives the proper velocity required to escape from radius $r$. At Earth's surface, $w_{esc} \approx 11.2$ km/s — far below $c$, so proper and coordinate velocity agree to ten decimal places. The formula is not wrong; it is misapplied when extended to relativistic regimes under the assumption that $w$ means coordinate velocity.

---

### B.1.2 Proper velocity has no upper bound

The proper velocity is $w = \gamma v$, where $\gamma = \sqrt{1 + w^2/c^2}$. There is no ceiling. A photon has infinite proper velocity — it traverses any coordinate distance in zero proper time, making the ratio formally $\infty$. A massive particle can have any finite proper velocity, with $\gamma$ growing without bound.

The coordinate form $\gamma = 1/\sqrt{1 - v^2/c^2}$ looks like it has a singularity at $v = c$, but this is a coordinate artifact of using coordinate velocity as the primary variable. In proper velocity $w$, the same function is $\gamma = \sqrt{1 + w^2/c^2}$ — smooth, monotone, no singularity anywhere.

This matters for black holes because the standard "escape velocity equals $c$" statement is about **coordinate** $c$. In proper terms:

$$w_{esc}(r) = \sqrt{\frac{2GM}{r}}$$

This equals $c$ at $r = 2GM/c^2 = r_s$ — the Schwarzschild radius. But $w = c$ is not a wall; it is one point on a smooth curve. The formula continues to larger $w$ for smaller $r$:

| $r/r_s$ | $w_{esc}$ |
|---|---|
| $10^9$ (Earth orbit scale) | $\sim 4\times10^{-5}c$ |
| $3$ (neutron star surface) | $\sim 0.58c$ |
| $1.5$ (photon sphere) | $\sqrt{2}c \approx 1.41c$ |
| $1.01$ | $\sim 10c$ |
| $1 + 10^{-46}$ | $\sim 10^{23}c$ |
| $1$ (Schwarzschild radius) | $\infty$ |

The horizon is where proper escape velocity reaches infinity — requiring a photon ($w \to \infty$) to just barely escape. This is a physically meaningful statement, not a coordinate artifact.

---

### B.1.3 Freefall does not feel acceleration

A critical correction to the naive "maximum survivable acceleration" framing: in freefall, everything accelerates together. There is no proper acceleration — an accelerometer in freefall reads zero. The only physically felt quantity near a black hole (for a small enough observer) is tidal force — the gradient of the gravitational field across a finite body size. For a sufficiently large black hole, tidal forces at the horizon are negligible. There is no wall, no jolt, no felt threshold at $r_s$.

The relevant limit for a freefalling observer is not acceleration tolerance but the **proper time budget remaining** — how many seconds of experienced time are left before reaching $r = 0$.

---

### B.1.4 The proper time crunch — numerics

For a stellar-mass black hole ($M = 10 M_\odot$, $r_s \approx 30$ km), consider a freefalling observer starting from rest at $r_0 = 1$ light-second $\approx 3\times10^8$ m from the center.

The proper escape velocity at that distance:

$$w_0 = \sqrt{\frac{2GM}{r_0}} = \sqrt{\frac{2 \times 6.67\times10^{-11} \times 2\times10^{31}}{3\times10^8}} \approx 3\times10^6\,\text{m/s} \approx 0.01c$$

At this distance $\gamma \approx 1.00005$ — barely any time dilation. The coordinate infall time from here:

$$t_{coord} \sim \sqrt{\frac{r_0^3}{2GM}} \approx \sqrt{\frac{(3\times10^8)^3}{2.67\times10^{21}}} \approx 100\,\text{s}$$

So far, unremarkable. But as the observer falls inward, $w$ grows rapidly and proper time compresses. The total proper time for the entire infall from $r_0$ to the singularity is:

$$\tau_{total} = \frac{\pi}{2}\sqrt{\frac{r_0^3}{2GM}} \approx \frac{\pi}{2} \times 100 \approx 157\,\text{s}$$

This is the total proper time budget from 1 light-second out to $r = 0$. The distribution of that budget is highly nonuniform — most of it is spent in the slow early phase. By the time the observer reaches $r = 10 r_s = 300$ km, the remaining proper time is:

$$\tau_{remaining}(10 r_s) \approx \frac{\pi}{2}\sqrt{\frac{(10 r_s)^3}{2GM}} \approx \frac{\pi}{2}\sqrt{\frac{(3\times10^5)^3}{2.67\times10^{21}}} \approx 0.27\,\text{s}$$

At $r = 2r_s = 60$ km (just outside the horizon):

$$\tau_{remaining}(2 r_s) \approx \frac{\pi}{2}\sqrt{\frac{(2 r_s)^3}{2GM}} \approx \frac{\pi}{2}\sqrt{\frac{(6\times10^4)^3}{2.67\times10^{21}}} \approx 0.024\,\text{s}$$

At $r = 1.01 r_s$:

$$\tau_{remaining}(1.01 r_s) \approx \frac{\pi}{2}\sqrt{\frac{(1.01 r_s)^3}{2GM}} \approx 0.0024\,\text{s} \approx 2.4\,\text{ms}$$

So the observer has about 2.4 milliseconds of proper time remaining when they are 1% of a Schwarzschild radius outside the horizon — at this point $w_{esc} \approx 10c$. A human neural reaction time is $\sim 150$ ms. The thought "I should take a picture" would require more proper time than remains in the entire subsequent trajectory.

The standard narrative has this exactly backwards. It says the outside observer sees the infaller freeze, while the infaller experiences nothing special. In proper terms: the infaller is the one who runs out of time. The outside observer's coordinate time runs indefinitely.

---

### B.1.5 What the outside observer actually sees

The infaller's last few milliseconds of proper-time emission are real physical events — real photons emitted, real processes occurring. Those photons must climb out through the displaced transport structure, and each successive emission event is closer to the horizon, requiring a longer and longer climb. The redshift grows exponentially:

$$\nu_{obs} \approx \nu_{emit} \cdot e^{-t_{obs}/\tau_{decay}}$$

where $\tau_{decay} \sim 4GM/c^3$ for a Schwarzschild black hole ($\approx 2\times10^{-4}$ s for $10 M_\odot$).

So the outside observer receives:
- A genuine physical record of the infaller's last few milliseconds of existence
- Stretched exponentially in coordinate time by the displaced transport structure
- Fading to infrared and then radio as the redshift grows without bound
- Asymptotically dimming — no sharp cutoff, but a definite exponential fade

This is not an illusion or a coordinate artifact. The photons genuinely take longer to climb out because there is more displaced medium to traverse — the transport structure is doing real physical work on each photon. The smearing is the displacement field's fingerprint on the infaller's final emissions.

The corrected picture is therefore:

**The outside observer sees a real but time-stretched replay of the infaller's last few milliseconds, smeared over a long coordinate time by the transport structure, exponentially fading to undetectability. The infaller experiences those milliseconds normally, with no felt threshold at the horizon, simply running out of proper time before they could react.**

Neither observer sees the other "freeze forever." The infaller runs out of proper time. The infaller's final photons fade exponentially as seen from outside. Both processes are finite, physical, and consistent.

---

### B.1.6 The Newtonian escape velocity formulas are not wrong

The orbital and escape velocity formulas used in astrophysics — circular orbit speed $v_c = \sqrt{GM/r}$, escape speed $v_{esc} = \sqrt{2GM/r}$, Kepler's third law — are all derived from Newtonian mechanics without relativistic correction. They appear in general relativistic treatments of black holes with the implicit assumption that they carry a coordinate interpretation.

But as argued in section 14.1, these formulas are already proper-velocity expressions at the scales where they were derived and tested. The relativistic correction is not needed because the formula was never a coordinate formula to begin with — it was always a proper measurement, identified as coordinate only because the distinction was unmeasurable at terrestrial scales.

The retrocorrection is not that these formulas are wrong. It is that their domain of validity is proper velocity, and extending them to extreme regimes (strong fields, relativistic speeds) must be done in proper terms, not coordinate terms. The Schwarzschild radius as "where escape velocity equals $c$" is a proper statement — $w_{esc} = c$ — not a coordinate statement. And $w = c$ is not the maximum; it is just one value on the proper velocity curve, corresponding to photons.

The horizon is where proper escape velocity becomes infinite — requiring infinite proper velocity, which only photons have — and this is a physically meaningful, coordinate-independent statement about the geometry of the displaced transport structure.




### B.2 Gravitational lensing as differential phase accumulation, not wavefront deflection

*This section corrects the standard description of gravitational lensing and eliminates the photon sphere as a physical object. The argument rests on an observed property of gravitational lensing that is incompatible with genuine wavefront bending.*

---

### B.2.1 Polarization is preserved through gravitational lensing

The key observational fact:

> "Like wavelength, polarization is an intrinsic property of the photon, which is not altered by gravitational potentials. The path of the photon will be deflected and the image of a source formed by an ensemble of photons will be distorted due to differential bending, yet the polarization of the source remains intact."

Polarization is the orientation of the $E$ and $B$ fields of the electromagnetic wave — it is tied to the propagation direction by the transversality condition $\vec{E} \perp \vec{B} \perp \hat{k}$. If the wavefront genuinely bent — if the propagation direction physically rotated — the polarization vector would rotate with it. A wave that travels a curved path carries its polarization along that curve; the polarization at arrival would be rotated relative to emission by the total turning angle.

Gravitational lensing produces no such rotation. Polarization is preserved to the limits of measurement, through lensing events that produce angular deflections of arcseconds, Einstein rings, and multiple images.

This is a direct observational proof that **the wavefront does not bend**. The propagation direction does not rotate. The polarization arrives aligned with the source because the wave traveled straight.

---

### B.2.2 What actually happens: differential phase accumulation

In the STFR displacement framework, the mechanism is immediate. The displacement field $\Sigma(r) = GM/(c^2 r)$ means there is more medium — more $\varepsilon_0\mu_0$ per coordinate length — closer to the mass. The wave propagates at $c$ through all of it. $c$ is the wave speed of the medium, $1/\sqrt{\varepsilon_0\mu_0}$, everywhere and always.

A plane wave passing a mass at impact parameter $b$ has different parts of its wavefront traversing different amounts of medium:

- The near side (closer to the mass) traverses more $\varepsilon_0\mu_0$ per coordinate length
- The far side traverses less
- Both sides travel at $c$ through their respective local medium

The result is a **phase difference** across the wavefront — not a rotation of the propagation direction, but a differential advance of phase. This phase difference, when the wave reaches a distant observer, produces an apparent angular shift of the source: the observer infers a different arrival direction from the phase gradient across their aperture.

The polarization is untouched because the propagation direction is untouched. The wave traveled straight through the displaced medium. What changed is the accumulated phase on each side, not the direction of travel.

This is exactly analogous to a graded-index optical medium — a glass lens with a smooth refractive index gradient. Light through such a lens does not bend in the sense of changing propagation direction abruptly; it accumulates differential phase across the wavefront, and the apparent direction of the source shifts. Polarization is preserved through graded-index optics for the same reason.

---

### B.2.3 The Eddington deflection from straight-line propagation

The apparent deflection angle for a source at large impact parameter $b \gg d$ (where $d^2 = 2GM/c^2$ is the displacement scale) is:

$$\theta = \frac{2d^2}{b} = \frac{4GM}{bc^2}$$

This is the standard general-relativistic result, recovered here entirely from straight-line propagation through the displacement geometry — no geodesic curvature, no bending of paths, no principle of least action applied to photon trajectories.

The factor of 4 (rather than the Newtonian factor of 2) comes from two equal contributions:

- The **near-side displacement**: the wave accumulates extra phase on the near side as it approaches the mass, equivalent to $2GM/(bc^2)$
- The **far-side displacement**: the wave accumulates extra phase again as it recedes, another $2GM/(bc^2)$

The Newtonian calculation gets half the answer because it treats light as a massive particle traveling at coordinate $c$ and computes a gravitational deflection force. This misses both the proper nature of $c$ (which is infinite proper velocity, not a coordinate speed subject to gravitational force) and the symmetric contribution from both sides of the lens plane.

The displacement field scales $\varepsilon_0$ and $\mu_0$ together by the same factor $\sigma(r) = D(r,d)$, preserving $Z_0 = \sqrt{\mu_0/\varepsilon_0}$ and therefore preserving $c$ locally. This symmetric scaling is also what produces $\gamma = 1$ for lensing (no birefringence, no chromatic aberration in vacuum lensing) — both storage modes are equally displaced, so the impedance ratio is unchanged, and all wavelengths are deflected identically.

---

### B.2.4 The photon has infinite proper velocity — it cannot be deflected by gravity

$c$ is the wave speed of the medium. A photon traveling at $c$ has:

$$w = \frac{c}{\sqrt{1 - c^2/c^2}} = \infty$$

Infinite proper velocity. A photon is not a particle being accelerated by gravity in any Newtonian or post-Newtonian sense. It is the propagation of the medium itself — a disturbance in the $\varepsilon_0\mu_0$ field traveling at the medium's own wave speed.

You cannot apply a gravitational force to the medium's own propagation. The displacement field changes the amount of medium per coordinate length, which changes the accumulated phase of propagating waves, which produces apparent angular shifts. But the wave itself travels straight, at $c$, with infinite proper velocity, undeflected.

The Newtonian lensing calculation (giving $2GM/bc^2$, half the correct answer) treats light as a slow massive particle at coordinate speed $c$ and computes $F = GMm/r^2$ on it. This is wrong in two ways: the photon has no mass to be pulled on, and $c$ is infinite proper velocity, not a coordinate speed subject to gravitational force. The Newtonian calculation gets any nonzero answer only because the phase accumulation it approximates accidentally captures half of the correct result.

---

### B.2.5 The photon sphere does not exist

The photon sphere at $r = 3GM/c^2$ in the Schwarzschild geometry is derived from the null geodesic equations — the condition that a null path curves back on itself in a circle. It requires genuine wavefront bending: the propagation direction must continuously rotate to maintain a circular orbit.

Since the wavefront does not bend — polarization preservation proves this — there can be no circular photon orbits. The displacement field can produce differential phase accumulation, which appears as deflection in coordinate terms, but it cannot continuously redirect a straight-traveling wave into a circle.

In a graded-index optical medium, there are no stable circular light orbits. Light entering a spherically symmetric graded-index medium curves inward then outward, accumulating differential phase, and exits. The path in coordinate space is curved; the propagation direction in the local medium frame is straight throughout.

The photon sphere is a prediction of geodesic optics — treating light as following curved spacetime geodesics. It is not a prediction of displacement-medium optics, where light travels straight through a non-uniform medium. The two frameworks give the same answer for weak-field deflection (both give $4GM/bc^2$) but differ on strong-field predictions: the photon sphere, the light ring, and the associated shadow structure of black hole images.

The observed black hole shadow (EHT images of M87* and Sgr A*) is consistent with STFR displacement geometry without requiring a photon sphere — the shadow boundary in the displacement picture is set by the impact parameter $b = d\sqrt{3}$ (for $b \gg d$ this gives the same angular scale as the photon sphere), but the physical mechanism is differential phase accumulation and the apparent edge of the displacement region, not circular null geodesics.

*This remains an open distinguishing prediction: if the photon sphere does not exist, the detailed structure of the black hole shadow — particularly any ring-like features attributed to photon sphere lensing — should differ from geodesic predictions in ways detectable by future higher-resolution VLBI.*

---

### B.2.6 Summary

| | Standard GR | STFR displacement |
|---|---|---|
| Mechanism | Geodesic curvature of spacetime | Differential phase through displaced medium |
| Wavefront | Bends | Straight — polarization preserved |
| Deflection angle | $4GM/bc^2$ | $4GM/bc^2$ — same result |
| Factor of 4 origin | Two contributions from geodesic curvature | Near-side + far-side phase accumulation |
| Newtonian factor of 2 | Missing spatial curvature | Missing far-side phase contribution |
| Photon sphere | Exists at $r = 3GM/c^2$ | Does not exist |
| Birefringence | None — $Z_0$ preserved | None — $\varepsilon_0, \mu_0$ scale together |
| Chromatic aberration | None in vacuum | None — $c$ same for all wavelengths |

The observational proof is polarization preservation. A bending wavefront would rotate the polarization. The polarization does not rotate. Therefore the wavefront does not bend. Therefore the mechanism is differential phase accumulation through displaced medium, not geodesic curvature.

---

### B.3 Larmor radiation, freefall, and the equivalence principle paradox

*This section resolves a long-standing conceptual problem in classical electrodynamics using the displacement framework's account of retarded field propagation.*

---

### B.3.1 The paradox

Larmor radiation is well established experimentally. Synchrotron radiation from electrons in circular accelerators and bremsstrahlung from decelerating charges in matter are both Larmor radiation — a charge undergoing proper acceleration emits electromagnetic radiation at a rate proportional to $a^2$. This is measured, unambiguous, and well characterized.

The equivalence principle creates a problem. If a charge accelerated by an electromagnetic field radiates, and gravitational acceleration is locally equivalent to electromagnetic acceleration, then a charge in freefall in a gravitational field should also radiate. But a freely falling charge is in a local inertial frame — it feels no proper acceleration, no force, nothing to distinguish its situation from floating in empty space. A charge floating in empty space does not radiate. The two conclusions contradict.

Standard resolution attempts are unsatisfying:

- *"It radiates for outside observers but not for the falling observer"* — radiation carries energy. Energy loss is not observer-dependent. Either the charge loses energy or it does not.
- *"The equivalence principle only holds locally, and radiation is non-local"* — true, but this is a dodge rather than a derivation.
- *Unruh effect* — an accelerating observer sees thermal radiation that an inertial observer does not. But this is a quantum vacuum effect and does not cleanly resolve the classical Larmor question.

The paradox is genuine and unresolved in standard treatments.

---

### B.3.2 The displacement framework resolution

In the STFR displacement picture, the physical mechanism of Larmor radiation is the **mismatch between a charge's current position and the center of its retarded electromagnetic field**.

The electromagnetic field of a charge at position $\mathbf{x}_{charge}(t)$ propagates outward from the charge's retarded position — the position at the retarded time $t_r = t - |\mathbf{x} - \mathbf{x}_{charge}(t_r)|/c$. Under moderate motion, the retarded field continuously updates and the field remains approximately centered on the charge. Under acceleration, the charge's current position pulls ahead of where the retarded update has propagated — there is a lag between where the charge is and where the field thinks it is. This shearing between current position and retarded field center is the radiation.

**Proper acceleration** — being pushed through the medium by an external force — creates this mismatch. The charge moves through the medium while the medium stays put. The retarded field propagates through undisturbed medium and finds the charge has moved ahead of where it propagated from. Mismatch, shearing, radiation.

**Freefall** is different in a precise geometric sense. In freefall, the charge is not being pushed through the medium. The displacement field $\Sigma(r)$ of the gravitational source modifies the propagation geometry of the electromagnetic field at every point in the region. The charge follows the displaced transport structure; the electromagnetic retarded field propagates through the same displaced transport structure. Both the charge's trajectory and the electromagnetic propagation geometry are shaped by the same $\Sigma(r)$.

The result is that the retarded field center, computed through the actual displaced propagation geometry, moves with the charge. The charge is always at the center of its own retarded field as computed through the medium it is actually falling through. The mismatch is identically zero. No radiation.

---

### B.3.3 The gradient cancellation

The precise statement is geometric. Larmor radiation occurs when the charge's current position differs from the center of its retarded field. In displaced medium, "center of the retarded field" must be computed by tracing the retarded propagation through the actual displacement geometry — not through flat space.

In freefall, the charge follows a geodesic of the displacement geometry. The electromagnetic field propagates along the same geodesic structure — the displaced $\varepsilon_0(r)$ and $\mu_0(r)$ that shape the gravitational displacement also shape the electromagnetic propagation speed and direction at every point. So the gradient of the charge's trajectory through the displacement field and the gradient acting on the electromagnetic propagation are the same gradient — both are $\nabla\Sigma(r)$.

These gradients combine to give zero net mismatch. Formally: the charge is displaced from its flat-space trajectory by $\nabla\Sigma$ per unit time; the retarded field center is displaced from its flat-space propagation center by the same $\nabla\Sigma$ per unit time. The difference — which is what produces radiation — is identically zero.

This is the geometric content of the equivalence principle in the displacement picture. It is not merely that freefall *feels like* inertial motion. The electromagnetic field propagation literally uses the same geometry the charge is falling through. The field cannot distinguish a charge in a gravity well from a charge in flat space, because both the charge and the field are subject to the same displacement geometry. The gradients cancel exactly, the mismatch is zero, and there is no radiation.

---

### B.3.4 Why electromagnetically accelerated charges do radiate

An electromagnetically accelerated charge follows a **non-geodesic** path through the displacement geometry. The electromagnetic force pushes the charge off the natural trajectory — the path it would follow if only the gravitational displacement were acting. The retarded electromagnetic field of the charge, propagating along the geodesic structure of the medium, no longer centers on the charge because the charge has been pushed sideways from that structure.

The mismatch between the charge's non-geodesic position and the geodesic propagation of its own field is the radiation. This is Larmor radiation, now understood as a geometric statement: radiation is the signature of deviation from geodesic motion through the displacement medium.

This unifies two statements that appear separate in standard treatments:

1. Charges in geodesic motion (freefall) do not radiate.
2. Charges in non-geodesic motion (proper acceleration) do radiate.

Both follow from the same mechanism: the mismatch between the charge's position and the center of its retarded field, computed through the actual displacement geometry of the medium.

---

### B.3.5 Connection to Larmor radiation rate and Unruh

The standard Larmor formula gives radiated power as:

$$P = \frac{e^2 a^2}{6\pi\varepsilon_0 c^3}$$

where $a$ is the **proper** acceleration. In the displacement picture this is the rate at which the mismatch between the charge's current position and its retarded field center grows — proportional to $a^2$ because both the position lag and the field-shearing rate scale with $a$.

The Unruh effect — that an accelerating observer sees thermal radiation from the vacuum — is a quantum analog of the same mechanism. At extreme proper acceleration $a \sim mc^3/\hbar$, the lag between the charge's current state and its retarded field reaches one LC cycle period. The charge can no longer maintain closure against its own field, and the disruption of the closure condition produces radiation whose character reflects the breakdown of the excitation's self-consistency — a different regime from the classical Larmor radiation but driven by the same underlying mismatch mechanism.

The equivalence principle paradox therefore has a clean resolution in the displacement framework:

- **Freefall = geodesic motion = zero mismatch = no radiation** — the gradients of trajectory and propagation geometry are identical, they cancel, no shearing occurs
- **Proper acceleration = non-geodesic motion = nonzero mismatch = Larmor radiation** — the charge is pushed off the geodesic, the field propagates along the geodesic, the difference grows at rate $\propto a$, radiation results
- **Extreme proper acceleration = closure disruption = Unruh-like radiation** — the mismatch reaches one LC cycle, the excitation's self-consistency breaks down

The paradox dissolves because the equivalence principle is exactly correct in the displacement picture: freefall is genuinely inertial in the only sense that matters for radiation — the charge moves with the medium, and its field propagates through the same medium, so no mismatch arises.
