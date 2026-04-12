# Note on Possible Upstream Support and Vacuum-Factor Constants in the STFR Excitation/Displacement Chain (v19)

## Status

This note records a speculative but structurally motivated line of thought that grew out of the excitation/displacement discussion. It is **not** yet a claimed derivation. Its purpose is narrower:

1. preserve the logic in a compact form,
2. separate structurally useful observations from stronger claims,
3. expose which factors in the classical constants are geometric packaging and which may point to upstream quantities.

The note treats gravity and electromagnetism in parallel. In both cases there are two valid directions of reading:

- **classical to upstream**: start from the standard constants and factor them to expose what they already bundle,
- **upstream to classical**: start from a more primitive support/storage picture and ask whether the familiar constants appear as packaged descendants.

Those are not contradictory. They are the same structure read in opposite explanatory directions. None of the factorizations below constitute a derivation of the constants involved — they are structural audits of what the classical constants already bundle.

---

## 0. Foundational unit identity

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

## 0.2. Reactive exchange: the dynamics of storage

The foundational identity F·H = F·H describes static storage capacity. But an excitation is not static — it is a cycling exchange between the two storage modes. The dynamic quantities that describe this exchange are the magnetic reactance and the dielectric susceptance.

For a medium with storage densities $\varepsilon_0$ (F/m) and $\mu_0$ (H/m) cycling at frequency $f$:

$$
X = \mu_0 f \quad \text{(magnetic reactance, } \Omega\text{)}
\qquad
B = \varepsilon_0 f \quad \text{(dielectric susceptance, S)}
$$

$X$ is Henry per second — the rate at which magnetic storage is exchanged. $B$ is Farad per second — the rate at which dielectric storage is exchanged. Both are standard SI quantities; Weber (Wb) and Siemens (S) are SI units, not specialist terminology.

Their product is dimensionless:

$$
XB = \varepsilon_0\mu_0 f^2 = \frac{f^2}{c^2}
$$

This is the **energy storage factor** — the fraction of the medium's storage capacity that is actively cycling at frequency $f$. At $f = c/\ell$ (the natural resonance of a region of extent $\ell$), $XB = 1/\ell^2$, fully engaged.

Their ratio is frequency-independent:

$$
Z_0 = \sqrt{\frac{X}{B}} = \sqrt{\frac{\mu_0}{\varepsilon_0}} = 376.73\,\Omega
$$

This is the **vacuum impedance** — the natural balance point between the two storage modes. A wave in the medium sitting exactly at $Z_0$ has equal magnetic and dielectric amplitudes; neither mode dominates. It is a property of the medium alone, not of the frequency or the excitation amplitude.

### Amplitude and cycling as independent parameters

This separates two things that are often conflated:

- **Cycling frequency** $f$ — set by the closure geometry of the excitation, determining what we call rest mass via $E = hf$
- **Cycling amplitude** — how hard the storage modes are being driven, determining the actual volts and amps in the medium

A resonant tank at fixed frequency can carry wildly different energy depending on amplitude. The electron's charge-to-vacuum ratios $e/\varepsilon_0$ and $e/\mu_0$ (Appendix) are measures of the amplitude of its cycling relative to the vacuum storage densities — how much of the medium's F and H capacity the excitation is actually using. The fact that their ratio equals $Z_0^2$ means the electron sits at the vacuum balance point: neither storage mode is preferentially loaded.

The kilogram (section 9) measures the total persistent loading. The reactance and susceptance measure the rate of exchange. Both are needed to characterize what an excitation actually is.

---

## 0.3. Volts and amps as rates of change of storage

The storage densities $\varepsilon_0$ (F/m) and $\mu_0$ (H/m) become total storage quantities once integrated over a spatial extent $\ell$:

$$
\Psi = \varepsilon_0 \cdot \ell \quad \text{(Coulombs — total dielectric storage)}
\qquad
\Phi = \mu_0 \cdot \ell \quad \text{(Webers — total magnetic storage)}
$$

$\Psi$ and $\Phi$ are the vacuum primitives packaged with a length scale. They are not new quantities — they are $\varepsilon_0$ and $\mu_0$ given a spatial home.

Their rates of change with respect to time then give the familiar electrical units:

$$
I = \frac{\Psi}{t} = \frac{\varepsilon_0 \cdot \ell}{t} \quad \text{Amperes}
\qquad
E = \frac{\Phi}{t} = \frac{\mu_0 \cdot \ell}{t} \quad \text{Volts}
$$

The Ampere is Coulombs per second — the rate at which dielectric storage is exchanged. The Volt is Webers per second — the rate at which magnetic storage is exchanged. Neither is primitive; both are one spatial and one temporal step from $\varepsilon_0$ and $\mu_0$.

Their product gives power:

$$
E \cdot I = \frac{\mu_0 \cdot \ell}{t} \cdot \frac{\varepsilon_0 \cdot \ell}{t} = \frac{\varepsilon_0\mu_0 \cdot \ell^2}{t^2} \quad \text{Watts}
$$

Watts is the product of the vacuum storage pair times a spatial area, divided by time squared — two time derivatives from the primitive storage. Power is not primitive.

Their ratio at resonance recovers the vacuum impedance:

$$
\frac{E}{I} = \frac{\mu_0 \cdot \ell / t}{\varepsilon_0 \cdot \ell / t} = \frac{\mu_0}{\varepsilon_0} = Z_0^2 \quad \Rightarrow \quad \frac{E}{I} = Z_0 \quad \text{at resonance}
$$

The spatial extent $\ell$ and the time $t$ both cancel, leaving the ratio of the vacuum primitives alone. $Z_0$ is a property of the medium, not of the frequency, the amplitude, or the geometry.

### The upstream hierarchy so far

$$
\underbrace{\varepsilon_0,\,\mu_0}_{\text{primitive (F/m, H/m)}} \;\to\; \underbrace{\Psi = \varepsilon_0\ell,\;\Phi = \mu_0\ell}_{\text{total storage}} \;\to\; \underbrace{I = \Psi/t,\;E = \Phi/t}_{\text{time rates}} \;\to\; \underbrace{EI = \varepsilon_0\mu_0\ell^2/t^2}_{\text{power}}
$$

At every level $Z_0 = \sqrt{\mu_0/\varepsilon_0}$ is the natural ratio between the magnetic and dielectric sides. It is the backbone of the hierarchy throughout.

---

## 0.5. The natural propagation length and the origin of seconds

From the primitive storage pair:

$$
c = \frac{1}{\sqrt{\varepsilon_0\mu_0}}
$$

Define the **natural propagation length** $C_L$ — $c$ expressed in meters rather than meters per second:

$$
C_L = c\sqrt{\varepsilon_0\mu_0}
$$

Since $c\sqrt{\varepsilon_0\mu_0} = 1$, $C_L$ is dimensionlessly 1 but carries meters — it is the distance light travels in one natural period of the medium, expressed as a length rather than a speed. It is not a new constant; it is $c$ with the "per second" dropped, because the second was already implicit in how the meter was counted.

The second then falls out:

$$
\text{s} = \frac{C_L}{c} = \frac{\sqrt{\varepsilon_0\mu_0}}{\text{m}} \cdot C_L
$$

The meter is the one arbitrary human choice. Once a length is fixed, the second is determined by the medium's storage properties, and the kilogram follows (section 9). All three SI base units are downstream of $\varepsilon_0$, $\mu_0$, and a choice of length scale.

---

## 1. Gravity: the displacement relation already hides a square-root structure

In the present framework, the weak-field displacement parameter is written as

$$
d^2 = \frac{2GM}{c^2}.
$$

The source-side displacement quantity is naturally $d$, but the weak-field bookkeeping is written in terms of $d^2$. The square-root structure is already present in the framework, attached to the source displacement scale rather than to $G$ itself.

### Target form

The goal of the factorization program is to make the vacuum primitives explicit rather than hidden inside $c$. Substituting $c = 1/(z_u z_e)$ and $G = g^2$ (developed in sections 3 and 4), the displacement relation becomes

$$
d = \sqrt{2}\, g\sqrt{M}\cdot z_u z_e.
$$

In this form the structure is transparent: $\sqrt{M}$ is the source amplitude, $g$ is the per-source gravitational interaction factor, and $z_u z_e$ is the vacuum storage factor — appearing multiplied because $1/c^2 = (z_u z_e)^2$, so the vacuum storage pair moves from denominator to numerator when $c$ is eliminated. The current framework writes $d^2 = 2GM/c^2$; the target is this factored form, with the unit of $M$ (gram or kilogram) then falling out of dimensional consistency once $d$, $g$, $z_u$, and $z_e$ are given their natural substrate meanings.

---

## 2. Gravity: $r_0$ unpacked — sphere factor and support density

A bulk-radius law of the form $R = r_0\,m^{1/3}$ already contains hidden geometric packaging. For packed matter with support volume per gram $p_\star$:

$$
V = p_\star m = \frac{4\pi}{3}R^3
\quad\Rightarrow\quad
r_0 = \left(\frac{3}{4\pi}p_\star\right)^{1/3}.
$$

So $r_0$ bundles two pieces: the pure sphere-volume factor $(3/4\pi)^{1/3}$ and the physical support-density term $p_\star^{1/3}$. The cube root is not mysterious — it is simply the inversion of volume scaling. The physically interesting part is the support normalization hidden inside $r_0$.

Defining

$$
\chi_{\mathrm{sph}} \equiv \left(\frac{3}{4\pi}\right)^{1/3} \approx 0.62035,
\qquad
\ell_\star \equiv p_\star^{1/3},
$$

so that $r_0 = \chi_{\mathrm{sph}}\,\ell_\star$, makes the distinction explicit: $r_0$ is the historical bundled coefficient; $\ell_\star$ is the unbundled linear support scalar; $p_\star$ is the support-volume coefficient per gram.

### Empirical values

Using the gram-normalized proxy $r_0 \approx r_{0,\mathrm{eff}} \approx 1.2187\times 10^{-15}\,\mathrm{m}$:

$$
p_\star = \frac{4\pi}{3}r_0^3 \approx 7.5819\times 10^{-45}\,\mathrm{m^3/g},
\qquad
\ell_\star \approx 1.9645\times 10^{-15}\,\mathrm{m\,g^{-1/3}}.
$$

---

## 3. Gravity: gram normalization and the support-through-vacuum quantity

The gram-normalized displacement proxy is

$$
r_{0,\mathrm{eff}} \equiv d_{\mathrm{mole}} = \sqrt{\frac{2G(1\,\mathrm g)}{c^2}},
$$

which gives the identity

$$
G = 500\,r_{0,\mathrm{eff}}^2 c^2 = \frac{500\,r_{0,\mathrm{eff}}^2}{\mu_0\varepsilon_0}.
$$

The explanatory direction suggested is: the support/displacement scale is the physically primitive quantity; $G$ is the downstream conversion constant that packages it into SI weak-field bookkeeping.

At gram normalization, defining $G_{\mathrm g}$ via $d^2 = 2G_{\mathrm g} M_{\mathrm{grams}}/c^2$:

$$
G_{\mathrm g} = \frac{r_{0,\mathrm{eff}}^2 c^2}{2} = \frac{\kappa_0^2}{2},
$$

where the **support-through-vacuum** quantity is

$$
\kappa_0 \equiv r_{0,\mathrm{eff}} c = \frac{r_{0,\mathrm{eff}}}{\sqrt{\mu_0\varepsilon_0}}.
$$

The cleanest reading of the gravity side: support/displacement scale first, vacuum-carried support quantity next, squared and normalized gravitational conversion constant afterward.

---

## 4. Gravity: the symmetric two-source reading

Gravity in this framework is not a force but a displacement of the transport structure. The force experienced by a test mass is a derived quantity — what happens when something with inertia sits in a gradient of the displacement field $\Sigma(r)$.

The natural place to see the two-source structure is in the escape velocity, not the force. The escape velocity from mass $M$ at distance $r$ is:

$$
v_{esc} = \sqrt{\frac{2GM}{r}}
$$

In this framework, displacement fields from two sources compose multiplicatively (nearest-last), not additively. Each source contributes a displacement scaling factor $g\sqrt{M}/r$ to the transport structure. The interaction between two masses is therefore the product of their individual displacement contributions:

$$
\Sigma_{12} \sim \left(g\frac{\sqrt{m_1}}{r}\right)\left(g\frac{\sqrt{m_2}}{r}\right) = g^2\frac{\sqrt{m_1 m_2}}{r^2},
$$

formally identifying $G = g^2$ as the natural signature of two displacement fields composing multiplicatively. The $g^2$ is in the geometry; the Newtonian force law $F = Gm_1m_2/r^2$ is what you get after projecting that multiplicative composition onto a test mass. Newton packages the $g^2$ as a single constant $G$ — the multiplicative structure was always there in the displacement, not introduced at the force level.

---

## 4.5. Material-dependent displacement: $g_{\text{material}}$

The per-source factor $g$ in the displacement relation is not a universal constant per unit mass — it is a per-source displacement amplitude that depends on what the source is made of. Different materials have different nuclear compositions, proton-to-neutron ratios, packing geometries, and binding energy fractions. All of these feed into the actual displacement geometry sourced by the material, not just the total mass count.

The two-source interaction is therefore more precisely:

$$
\Sigma_{12} \sim \frac{g_1\sqrt{m_1}}{r} \cdot \frac{g_2\sqrt{m_2}}{r}
$$

where $g_1 = g(\text{material}_1)$ and $g_2 = g(\text{material}_2)$ are material-dependent. For the same mass, lead and aluminium have different nuclear structures and therefore different displacement amplitudes per unit mass.

At macroscopic scale, $G$ is measured from bulk matter experiments (Cavendish-type) and always returns some average $\bar{g}^2$ that washes out material dependence. The nuclear radius parameter $r_0 \approx 1.21$ fm is similarly a fitted average across nuclear compositions — it absorbs the spread rather than resolving it.

This suggests the equivalence principle as standardly tested is not a fundamental geometric identity but an approximate consequence of averaging over materials whose $g_{\text{material}}$ values happen to be close. A genuine material-dependence of gravitational acceleration — not from composition-dependent charge distributions but from composition-dependent displacement geometry — would be a direct signature of this picture.

### Open: high-precision drop tests across material compositions

There is a reported (but currently unsourced) experiment involving drop tests of masses of different compositions filmed with a high-speed camera, which appeared to show a small but nonzero difference in gravitational acceleration between materials — a difference of order one frame at landing, not visible to the naked eye but potentially resolvable instrumentally.

**Action item**: locate this experiment. Candidate search terms: composition-dependent free-fall, equivalence principle violation drop test high speed camera, differential gravitation dense materials, Eötvös-type drop experiment video.

If real, this would be direct experimental support for $g_{\text{material}}$ varying across nuclear compositions, and would constitute a testable distinguishing prediction of the displacement framework over standard GR (which predicts strict equality of gravitational and inertial mass regardless of composition at this level).

---

## 5. Tentative geometry of electric and magnetic storage

The standard presentation of $\varepsilon_0$ in F/m and $\mu_0$ in H/m should not be taken to mean the underlying storage ontology is fundamentally linear. Three distinct layers should be kept separate:

1. **Construction geometry** — how a capacitor or inductor is most efficiently built.
2. **Field/storage geometry** — how the stored branch actually occupies the medium.
3. **Radiative/closure geometry** — how an active disturbance distributes through the occupied region.

A provisional intuition is that the electric branch is more sensitive to boundary and facing geometry, while the magnetic branch is more sensitive to circulation and enclosed volume. But construction efficiency does not determine ontological dimensionality. Both branches remain volumetric field occupancies of the medium; the note stays agnostic about whether electric storage is fundamentally area-like and magnetic storage volume-like.

*This section is a staging note for future development, not a conclusion.*

---

## 6. Electromagnetism: vacuum pair first, classical constants second

The vacuum propagation relation

$$
c = \frac{1}{\sqrt{\mu_0\varepsilon_0}}
$$

is more cleanly read by introducing complementary vacuum factors $z_u$ (magnetic side) and $z_e$ (electric side) such that

$$
z_u z_e = \sqrt{\mu_0\varepsilon_0}, \qquad c = \frac{1}{z_u z_e}.
$$

In this reading $\mu_0$ and $\varepsilon_0$ are packaged descendants of the more primitive pair $(z_u, z_e)$, and $c$ is the reciprocal of their product.

---

## 7. Electromagnetism: the symmetric two-source reading

The Coulomb law $F = q_1q_2/(4\pi\varepsilon_0 r^2)$ admits a symmetric factorization parallel to the gravity case:

$$
F = \left(z_e\frac{q_1}{r}\right)\left(z_e\frac{q_2}{r}\right) = z_e^2\frac{q_1q_2}{r^2},
$$

formally identifying $1/(4\pi\varepsilon_0) = z_e^2$. This relocates the $4\pi$ into the definition of the per-source amplitude rather than explaining it. The point is structural: the two-body law is the product of two identical per-source amplitudes, paralleling the gravity case.

---

## 8. The role of $\pi$: two different appearances

The $\pi$ on the gravity side and the Coulomb side are not the same phenomenon:

- **Gravity side**: $\pi$ enters through sphere-volume inversion — $V = \frac{4\pi}{3}R^3$ gives the cube-root factor $(3/4\pi)^{1/3}$ in $r_0$. It is a **volume** normalization.
- **Coulomb side**: $4\pi$ comes from spherical flux spreading — the surface area $A = 4\pi r^2$. It is a **surface-flux** normalization.

The two appearances should not be conflated.

---

## 8.5. Closure quantization and the VA = 1 condition

A self-sustaining excitation in the vacuum medium satisfies a locking condition between its spatial extent $\ell$ and its cycling frequency $f$:

$$
\frac{\ell f}{c} = 1 \quad \Rightarrow \quad \ell = \frac{c}{f} = \lambda_C
$$

This is the Compton wavelength relation — not imposed from outside but falling directly out of what it means to close. If the excitation spans a length $\ell$, it cycles at $c/\ell$; if it cycles at $f$, it spans $c/f$. The two are the same statement.

The apparent power (VA) of such an excitation is then:

$$
E \cdot I = \varepsilon_0\mu_0 \cdot \ell^2 \cdot f^2 = \frac{\ell^2 f^2}{c^2} = 1
$$

Dimensionless and equal to 1 for every closed excitation, regardless of which particle. The proton and the electron both satisfy VA = 1. So does any stable particle. The VA is not a measure of mass or energy — it is the closure condition itself, expressed as a power balance.

### What this means for the mass spectrum

This separates the closure condition from the amplitude question. A closed excitation has:

- **One free parameter**: the frequency $f$ (or equivalently $\ell = c/f$). This sets what we call rest mass via $E = hf$.
- **One fixed relation**: VA = 1. This is the closure constraint — the medium's capacitive and inductive cycling must balance over one period.
- **One open question**: the amplitude — how hard the storage modes are being driven at that locked frequency. This is what distinguishes particles of different mass at the same closure topology.

The frequency spectrum of stable particles is not continuous. Only certain closure amplitudes are stable — the medium supports some and not others. This is the quantization: not of frequency (which in principle is continuous) but of the stable amplitude states at each frequency. Planck's constant $h$ is the quantum of closure action — the minimum stable cycling amplitude — and the particle masses are the discrete amplitudes the medium sustains.

### Photons and the open case

A photon also satisfies $\ell f / c = 1$ and VA = 1. The difference from a massive particle is not the cycling relation — it is that the photon does not close. It is an open propagating disturbance rather than a self-sustaining loop. The closure is what picks out discrete mass values; without it, the excitation disperses and carries no persistent medium loading.

The electron-as-photon-like picture (section 9) is consistent with this: the electron may be a minimally closed excitation sitting just above the open/closed boundary, with a small but nonzero persistent displacement and a cycling amplitude set by the minimum stable closure condition.

### Planck's constant in upstream terms

The closure quantum $h$ has SI units of J·s = kg·m²/s. Substituting the upstream expressions for kg and s:

$$
h \sim \frac{\text{F}\cdot\text{H}}{\text{m}} \cdot \text{m}^2 \cdot \frac{1}{\sqrt{\text{F}\cdot\text{H}}} = \text{m}\sqrt{\text{F}\cdot\text{H}}
$$

$h$ is a length times the natural oscillation unit of the medium. It is the spatial scale of one complete closure action — one full cycle of the medium's capacitive-inductive exchange over a characteristic length.

The rest energy of a particle is then:

$$
E = hf = \text{m}\sqrt{\text{F}\cdot\text{H}} \cdot f
$$

Since $f = c/\ell = 1/(\ell\sqrt{\varepsilon_0\mu_0})$, and $\ell$ is the Compton wavelength:

$$
E = \frac{\text{m}\sqrt{\text{F}\cdot\text{H}}}{\ell\sqrt{\text{F}\cdot\text{H}/\text{m}^2}} = \frac{\text{m}^2}{\ell}
$$

A pure ratio of lengths — the natural length unit of the medium to the closure length of the excitation. The joule is SI packaging on what is fundamentally a geometric ratio.

For the proton, $\ell_p = \lambda_C \approx 1.32 \times 10^{-15}$ m and $E_p = m_p c^2 \approx 1.503 \times 10^{-10}$ J — the same number, now understood as the medium's natural length squared divided by the proton's closure scale.

---

## 9. The kilogram as volumetric F·H

### SI circularity and the primitive hierarchy

$G$ contains kilograms in its units; $h$ (the current SI definition of the kilogram) also bundles kilograms. Neither is upstream of the kilogram — both are downstream conversions that presuppose it. The framework inverts this: $\varepsilon_0$ and $\mu_0$ are the genuine primitives, and the kilogram, the second, and $G$ are all derived.

The second falls out of the medium directly. Given a length and the vacuum storage pair:

$$
1\,\text{s} = \text{m}\cdot\sqrt{\varepsilon_0\mu_0} = \sqrt{\text{F}\cdot\text{H}}.
$$

The second is the natural LC oscillation period of a one-meter length of vacuum medium — not a primitive, but the medium's own timescale.

With the second eliminated, $c^2 = \text{m}^2/(\text{F}\cdot\text{H})$, and from $E = Mc^2$:

$$
\boxed{1\,\text{kg} \sim \frac{\text{F}\cdot\text{H}}{\text{m}} = \frac{\text{s}^2}{\text{m}}}.
$$

A kilogram is vacuum LC storage per unit length — the label for how much of the medium's oscillation capacity is persistently loaded by a sustained excitation. The primitive hierarchy is:

$$
\varepsilon_0,\,\mu_0 \;\xrightarrow{\text{primitive}}\; c,\,Z_0 \;\xrightarrow{\text{derived}}\; \text{s},\,\text{kg},\,G.
$$

### Amplitude versus persistent loading

The kilogram-as-F·H picture applies cleanly to persistently displaced matter (proton-like excitations). For excitations that are more photon-like — occupying storage transiently during transit rather than maintaining a fixed displacement — the "mass" measured via charge-field deflection may be measuring the amplitude of storage occupation rather than a persistent medium burden. The charge-to-vacuum ratios in the Appendix are intended to inform this open question.

---

## 10. Summary and safe claim

The compact structural chain:

**Gravity**
$$
r_0 = \left(\frac{3}{4\pi}p_\star\right)^{1/3}, \qquad
\kappa_0 = \frac{r_{0,\mathrm{eff}}}{\sqrt{\mu_0\varepsilon_0}}, \qquad
G_{\mathrm g} = \frac{\kappa_0^2}{2}, \qquad
[G = g^2\text{ optional}]
$$

**Electromagnetism**
$$
c = \frac{1}{z_u z_e}, \qquad \frac{1}{4\pi\varepsilon_0} = z_e^2\text{ [optional]}
$$

**Units**
$$
1\,\text{s} = \sqrt{\text{F}\cdot\text{H}}, \qquad 1\,\text{kg} \sim \frac{\text{F}\cdot\text{H}}{\text{m}}
$$

The safe claim throughout: reverse factorization is a structural audit of what the classical constants already bundle, not a derivation of new results. What would be needed to go further:

1. A substrate-level derivation of the isolated support scale.
2. A derivation of the collective dressing that lifts isolated support to the bulk $r_0$ scale.
3. A derivation showing why the weak-field burden depends on the square of the vacuum-carried support quantity.
4. A derivation connecting the symmetric two-source amplitudes to the standard sourced-field form.
5. A clearer substrate-level interpretation of the electric and magnetic vacuum factors $z_e$ and $z_u$.

---

## 11. The equivalence principle as a stability selection rule, and constraints from composition-dependent free-fall tests

### 11.1 The circularity of the inertial mass measurement

The standard interpretation of the weak equivalence principle (WEP) treats the equality of gravitational and inertial mass as an empirical result requiring explanation. In the present framework the relationship is inverted: this equality is not a coincidence to be explained but a **stability selection rule** that the medium imposes on any excitation that persists.

The reason is metrological before it is physical. In SI, the kilogram is defined either gravitationally (historically, via the international prototype) or electromagnetically (post-2019, via the Kibble balance, which balances electromagnetic force against gravity). In both cases, the unit of mass is anchored to a gravitational or electromagnetic coupling of a specific material. There is no third independent handle. The ratio $m_\text{grav}/m_\text{inertial}$ cannot be measured in absolute terms for a single material — only the *relative* ratio between two different materials can be probed. This is what the Eötvös ratio

$$
\eta = \frac{a_1 - a_2}{\bar{a}}
$$

actually measures. A universal shift of the absolute ratio — the same for all materials — is invisible to any experiment that uses mass as its own reference.

In the framework's own terms (section 9): the kilogram is vacuum LC storage per unit length, $1\,\text{kg} \sim \text{F}\cdot\text{H}/\text{m}$. This definition is upstream of any gravitational calibration. Whether a given material's gravitational coupling $g_\text{grav}(r_0)$ and inertial resistance $g_\text{inertia}(r_0)$ are separately material-dependent is therefore not testable by any experiment that calibrates mass through gravity or electromagnetism. The constraint $\eta = 0$ is built into the measurement apparatus.

### 11.2 The selection rule

The more interesting reading is not metrological but physical. The medium sustains only excitations for which the displacement a localized mode **sources** equals the displacement it **resists**. Formally:

$$
g_\text{grav}(r_0,\,f,\,A) = g_\text{inertia}(r_0,\,f,\,A)
$$

where $r_0$ is the support scale, $f$ is the closure frequency, and $A$ is the cycling amplitude. This is a self-consistency condition on the excitation: it must source exactly the displacement field that its own inertia would require to carry it. An excitation that sources more displacement than it resists accelerates itself; one that sources less is dragged. Neither is stable. The medium only maintains the fixed points.

This condition is not independent of the VA = 1 closure condition from section 8.5. Both are expressions of the same underlying balance — VA = 1 enforces the internal transport/storage balance; the gravitational/inertial equality enforces the external sourcing/resistance balance. A stable particle must satisfy both simultaneously. Together they constrain the allowed $(f, r_0, A)$ triples to a discrete set, which is why the mass spectrum is not continuous. The observed stable particle Compton frequencies,

$$
f_C = \frac{mc^2}{h}
$$

are the frequencies at which both closure conditions close against the medium's own scales $(\varepsilon_0, \mu_0)$. Their ratios — $m_p/m_e \approx 1836$, $m_\mu/m_e \approx 207$ — are not explained by any current theory. In the present framework they are the ratios of the discrete fixed points of the double closure condition, and deriving them from the medium geometry is an open problem (see open question 1 in section 10).

Unstable particles fail the gravitational/inertial balance condition: they source more or less displacement than they resist, and decay until they reach a configuration — a combination of daughter particles — that satisfies both conditions. Stability is thus not a separate postulate but a consequence of medium self-consistency.

### 11.3 What MICROSCOPE actually constrains in this framework

The MICROSCOPE satellite experiment tested the WEP using two concentric cylindrical test masses of different compositions: a platinum–rhodium alloy (PtRh10, inner mass) and a titanium alloy (TA6V: 90% Ti, 6% Al, 4% V, outer mass). The final result was

$$
\eta(\text{Ti},\,\text{Pt}) = [-1.5 \pm 2.3_\text{stat} \pm 1.5_\text{syst}] \times 10^{-15}
$$

at $1\sigma$. In the present framework this null result is **expected**, because the selection rule of section 11.2 enforces $g_\text{grav}/g_\text{inertia} = 1$ for any persistent excitation regardless of composition. The experiment does not probe whether $g_\text{material}$ varies across materials — it probes whether the *ratio* of the two couplings varies. The framework predicts the ratio is identically 1, so $\eta = 0$ is the natural prediction, not a constraint on the framework.

Several additional systematics deserve note for completeness.

**Nesting and displacement composition.** In the STFR framework, displacement fields compose multiplicatively in order nearest-last. The inner Pt mass does not see the Earth's field directly — it sees it dressed by the Ti shell that surrounds it: $\Sigma_\text{Pt} = \Sigma_\text{Earth} \circ \Sigma_\text{Ti\,shell} \circ \Sigma_\text{Pt}$, while $\Sigma_\text{Ti} = \Sigma_\text{Earth} \circ \Sigma_\text{Ti}$. The assumption that both masses see the same external field, which underlies the Eötvös ratio interpretation, is therefore not exactly satisfied in the framework's geometry. The Ti shell's displacement at the Pt location is $\Sigma_\text{shell} \sim d/r_\text{inner} \sim 1.6 \times 10^{-12}$, small compared to Earth's $\sim 10^{-8}$ but formally present as an asymmetric dressing.

**Electrostatic suspension and material-dependent coupling.** The masses are maintained in position by electrostatic forces from asymmetric electrode geometries. Platinum and titanium have different dielectric properties, work functions, and surface charge distributions. An asymmetric capacitor geometry (of the type studied in Biefeld–Brown and related asymmetric dielectric experiments, including recent work by groups pursuing electrostatic propulsion) produces a directional force scaling as $F \sim \varepsilon E^2 A\,\delta d/d$. At the nN scale such effects would be $10^3$ times larger than the instrument's sensitivity floor of $\sim 10^{-12}$ N. The MICROSCOPE systematic characterization focused on thermal instabilities and glitch events; a material-dependent electrostatic coupling between the different test mass compositions and the electrode geometry would appear as a signal at the EP frequency and would not be nulled by the SUREF reference pair (which uses matched Pt masses). This is not claimed as an actual systematic in the MICROSCOPE data, but it is an open question for the interpretation.

**Orbital velocity and internal clock rates.** The satellite orbits at $\approx 7.5$ km/s, giving $\beta = v/c \approx 2.5 \times 10^{-5}$. The kinematic dressing $\gamma - 1 \approx 3 \times 10^{-10}$ is negligible. However, the Pt and Ti nuclei have Compton frequencies differing by a factor of $\approx 4$ ($f_{C,\,\text{Pt}} \approx 4.4 \times 10^{25}$ Hz, $f_{C,\,\text{Ti}} \approx 1.1 \times 10^{25}$ Hz). In the framework, inertia is tied to internal closure cycling. Over one orbital period ($\approx 5900$ s), the accumulated phase difference between the two internal clocks is $\sim 10^4$ radians. Whether this internal clock mismatch feeds back into the effective inertial response at the $10^{-15}$ level is an open question.

### 11.4 The nuclear radius measurement problem

The calculation of $g_\text{material}(r_0)$ for platinum and titanium in section 4.5 used nuclear charge radii extracted from electron scattering, isotope shifts in atomic spectra, and muonic atom X-ray measurements. A systematic issue applies to all three methods.

**What charge radius measurements actually measure.** Electron scattering off a nucleus measures the electromagnetic form factor of the proton distribution. Isotope shift spectroscopy measures the change in the nuclear volume seen by the electron cloud between isotopes. Muonic atom X-rays use a muon ($m_\mu \approx 207\,m_e$) in a tight orbit around the nucleus, making it sensitive to the nuclear charge distribution at short range. In every case the observable is the **charge (proton) radius**, not the **matter (proton + neutron) radius**.

The matter radius — relevant if gravitational displacement coupling involves total nucleon occupancy rather than charge distribution — must be inferred from hadronic probes: proton–nucleus or nucleus–nucleus scattering at appropriate energies, or neutron skin measurements from parity-violating electron scattering (as in the PREX-II experiment on $^{208}$Pb). These measurements are systematically less precise and model-dependent.

For the MICROSCOPE pair: Pt-195 has $N/Z \approx 1.50$ (117 neutrons, 78 protons) and carries a significant neutron skin estimated at $\sim 0.15$–$0.20$ fm. Ti-48 has $N/Z \approx 1.18$ (26 neutrons, 22 protons) and is close to symmetric, with a neutron skin of $\sim 0.05$ fm. The effective per-nucleon matter radius $r_{0,\text{matter}}$ therefore differs from the charge-radius-derived value, and the two corrections push in opposite directions: Pt's matter radius is larger than its charge radius suggests (neutron-rich surface), partially reducing the naive charge-radius difference between Pt and Ti from $\approx 6.5\%$ to $\approx 4.9\%$.

**The ion beam problem.** A more fundamental issue applies to any nuclear radius measurement that uses electron probes on ionized atoms. If the measurement is performed on bare nuclei or highly stripped ions — as is required for many high-precision electron scattering experiments, where the electron beam must reach the nucleus without the atomic electron cloud absorbing or scattering it — then the nuclear environment is not the same as in neutral bulk matter. In a neutral atom, the electron cloud exerts an outward electrostatic pressure on the nucleus (the electron–nucleus Coulomb attraction is balanced by the kinetic energy of the electrons). In a stripped or highly ionized atom, this balancing pressure is absent or reduced. The nuclear charge distribution measured in an ion may therefore be more compact than in the neutral atom, because the electrons are no longer pulling the proton distribution outward against the nuclear binding force.

This is not a small correction at the sub-femtometer level. The electron cloud's effect on nuclear shape (nuclear polarizability) is already included in isotope shift analyses, but the full self-consistent effect of the electron cloud on the equilibrium nuclear radius in neutral bulk matter — as opposed to the nucleus in isolation or in an ion — is a separate question. If the gravitational displacement coupling is to the support geometry of matter in its natural (neutral, bulk) state, then charge radii measured from ions may systematically underestimate the effective $r_0$ relevant to the framework. The direction of the correction would tend to push all measured charge radii toward larger values, and might reduce the per-nucleon spread across materials if the electron-pressure effect is more pronounced for lighter, more symmetric nuclei (like Ti) than for heavier, neutron-rich ones (like Pt).

**Open question:** Are the nuclear charge radii used in $r_0$ estimates representative of the actual support geometry of neutral bulk matter? How large is the electron-cloud correction to the effective nucleon spatial distribution in condensed phase, and does it act systematically to suppress the apparent $r_0$ variation across materials?

### 11.5 Binding energy as a competing effect

The nuclear binding energy per nucleon $B/A$ provides an additional source of per-nucleon mass variation across materials. For the MICROSCOPE pair:

$$
B/A(\text{Pt-195}) \approx 7.83\,\text{MeV/nucleon}, \qquad B/A(\text{Ti-48}) \approx 8.72\,\text{MeV/nucleon}
$$

a difference of $\approx 11\%$. More tightly bound nucleons contribute less free mass-energy per nucleon (the binding energy is the mass deficit). If the gravitational displacement coupling is to the actual mass-energy of the nucleon distribution — rather than to the geometric support radius — then titanium, being more tightly bound, sources less displacement per nucleon than its spatial size suggests, while platinum, being less tightly bound, sources more. This effect **opposes** the charge-radius ordering (which predicts Ti has a larger per-nucleon $r_0$ and thus stronger coupling). The two effects partially cancel.

The net result of charge-radius difference and binding-energy difference acting in opposite directions is a suppression of the naive $\eta$ estimate whose magnitude depends on the relative weight of each effect in the coupling. Whether this partial cancellation is accidental or structural — i.e., whether the medium geometry enforces a coupling function that naturally makes these effects compensate — is an open question. If the coupling is to something like the total rest-mass-energy density of the support region (which includes both the geometric size and the binding mass deficit), the cancellation may be near-exact by construction rather than by fine-tuning.

### 11.6 The matter-wave alternative

The only experimental approach that uses an independent mass scale — one not calibrated through gravity or electromagnetic force — is matter-wave interferometry. In atom interferometry, the relevant mass appears through the Compton frequency $f_C = mc^2/h$, which sets the internal phase accumulation rate of the matter wave during free fall. This frequency is determined by the atom's rest mass energy, which in the framework is set by the closure condition $\ell_C f_C / c = 1$ — the same VA = 1 condition of section 8.5.

If the double closure condition of section 11.2 produces a material-dependent anomaly, it would appear in matter-wave experiments as a **frequency mismatch** between species — a deviation of the interferometric phase from the value predicted by the gravitationally calibrated mass. Current matter-wave WEP tests (Rb$^{87}$/K$^{41}$, Sr/Rb, and related species) reach $\eta \sim 10^{-7}$ to $10^{-9}$, ten to a hundred million times less precise than MICROSCOPE, but they are probing a genuinely different quantity: the consistency between the internal oscillation frequency of matter and its gravitational free-fall trajectory. Future space-based atom interferometry missions (STE-QUEST, AEDGE) targeting $10^{-17}$ would reach the regime where framework-level anomalies might become visible as clock-to-trajectory mismatches, independent of any Eötvös-ratio measurement.

---

## Appendix: Anchor values and charge-to-vacuum ratios

### Vacuum primitives

$$
\varepsilon_0 = 8.8542 \times 10^{-12}\,\text{F/m}, \qquad
\mu_0 = 4\pi \times 10^{-7}\,\text{H/m} = 1.2566 \times 10^{-6}\,\text{H/m}
$$
$$
c = 2.9979 \times 10^{8}\,\text{m/s}, \qquad Z_0 = \sqrt{\mu_0/\varepsilon_0} = 376.73\,\Omega
$$

### Electron charge referenced to vacuum primitives

$$
e = 1.6022 \times 10^{-19}\,\text{C}
$$

$$
\frac{e}{\varepsilon_0} = 1.809 \times 10^{-8}\,\text{V·m} \qquad\text{(electric-side amplitude)}
$$

$$
\frac{e}{\mu_0} = 1.275 \times 10^{-13}\,\text{A·m}/\Omega \qquad\text{(magnetic-side amplitude)}
$$

The ratio of the two amplitudes is $\mu_0/\varepsilon_0 = Z_0^2$, as required for an excitation of the medium. The electron charge sits at the vacuum impedance ratio — it does not pick a preferred storage mode. These are empirical anchors, not derived quantities.
