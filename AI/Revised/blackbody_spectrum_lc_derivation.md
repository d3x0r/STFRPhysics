# Blackbody Spectrum — Derivation from LC Medium Principles

*Note from conversation, April 2026*

---

## The three-factor decomposition

The Planck spectral radiance is:

**B(f, T) = g(f) × hf × n(f, T)**

Each factor has a clean physical meaning in the LC vacuum medium picture:

| Factor | Expression | Physical meaning |
|---|---|---|
| g(f) | 8πf²/c³ | Number of independent LC resonance modes per unit volume per unit frequency |
| hf | — | Energy cost of one complete LC closure cycle at frequency f |
| n(f,T) | 1/(e^(hf/kT) − 1) | Mean number of closure cycles the thermal bath can sustain per mode |

---

## Factor 1: Mode density g(f) ∝ f²

### Where the f² comes from

Each independent LC resonance at frequency f has a spatial extent ℓ ~ λ/2 = c/2f. In k-space (where k = 2πf/c), each mode is a point at radius |k|. The number of independent modes in a thin shell [k, k+dk] is:

    N(k) dk = (4πk²) × (V / (2π)³) × dk       [volume of shell × mode density in k-space]

Substituting k = 2πf/c and dk = (2π/c)df:

    g(f) = (8πf²/c³) × V

The **f² factor is purely geometric** — it is the surface area of a sphere in k-space. It has nothing to do with energy, temperature, or statistics. It counts how many distinguishable spatial configurations of the LC medium can independently oscillate at frequency f per unit volume.

Multiplied by 2 for the two independent polarization states (the two orthogonal ways the LC cycling can be oriented transversely), the standard result g(f) = 8πf²/c³ × V follows directly.

**No special assumptions are needed.** The f² arises because we live in 3D space. In 2D it would be f¹; in 1D, f⁰ (flat).

---

## Factor 2: Photon energy hf

In the LC picture, a photon is a propagating disturbance in the vacuum LC network — not a particle with rest mass, but a detached piece of field structure. Its energy is:

    E = hf

This comes directly from the **closure condition**: a sustained LC excitation must return to its starting configuration after one complete cycle. The topological closure quantizes the action per cycle, and that quantum is Planck's constant h. So one photon = one complete closure cycle at frequency f, costing hf.

This is the same closure condition used for matter (E = hf_matter, where f_matter = mc²/h is the rest-frame cycling frequency). The photon is just the massless, propagating limit — no rest-frame closure, energy is entirely momentum.

---

## Factor 3: Bose-Einstein occupation n(f, T) — the entropy factor

The thermal bath at temperature T has ~kT of thermal energy available per degree of freedom. To excite a mode at frequency f, the bath must pay hf to complete one LC closure cycle.

The occupation number:

    n(f, T) = 1 / (e^(hf/kT) − 1)

has three regimes:

- **hf << kT** (classical, low frequency): n ≈ kT/hf — many photons per mode, classical equipartition.
- **hf ~ kT** (Wien peak region): n ~ 1 — roughly one photon per mode; this is where the spectrum peaks.
- **hf >> kT** (quantum suppression, high frequency): n ~ e^(−hf/kT) → 0 — the mode is thermally inaccessible because the bath cannot afford even one full closure cycle.

### The entropy argument

The Bose-Einstein factor is a statement about **accessible microstates**. A mode at high frequency has a very coarsely-spaced energy ladder (steps of hf, which is large). The number of ways to distribute kT of thermal energy across such a ladder is exponentially smaller than for a fine-grained (low-f) ladder. The system entropically favors occupying many low-frequency modes over few high-frequency ones.

In the LC picture: completing a high-frequency closure cycle costs more than the bath has. The mode simply doesn't get excited. This is not an ad hoc rule — it follows from the same closure quantization that defines hf in the first place.

---

## The ultraviolet catastrophe — resolved naturally

The classical (Rayleigh-Jeans) result assumed classical equipartition: every mode gets kT regardless of f. This gives:

    B_classical(f) ∝ f² × kT    → diverges as f → ∞

The problem was assuming you can add arbitrarily small amounts of energy to excite a high-f mode. In the LC medium, this is wrong: **below hf, you cannot complete a single closure cycle**, so the mode is simply empty. The quantization isn't introduced by hand — it is the closure condition that already defines what a photon is.

No new principle is required. The UV catastrophe is resolved by the same physics that explains E = hf for matter.

---

## Summary: no conflicts, no odd behavior

The Planck spectrum falls out of three things that are already in the LC framework:

1. **3D geometry of k-space** → g(f) ∝ f²
2. **LC closure condition** → photon energy = hf
3. **Entropy / thermal statistics** → Bose-Einstein occupation suppresses hf > kT modes

The only thing that looks like it might need separate justification is Bose-Einstein statistics itself — why photons are bosons (why multiple photons can occupy the same mode). In the LC picture this is natural: photons are field disturbances, not localized particles with identity, so there is no Pauli exclusion. Any number of propagating LC wave packets can co-exist in the same mode. The bosonic nature of photons is a consequence of their being waves in the medium, not particles with closure identity.

**Units note:** The amplitude "1 VA" sets the scale of a single mode's field strength. The spectrum shape (the relative distribution across frequencies) is entirely determined by the three factors above and is independent of that amplitude. The amplitude only sets the absolute power scale, not the shape.

---

*Connected to: displacement_dynamics_paper.md §8.1 (LC closure and Planck's constant), philosophical_companion.md §2 (postulate ladder), excitation_dynamics.md §3 (closure functional)*
