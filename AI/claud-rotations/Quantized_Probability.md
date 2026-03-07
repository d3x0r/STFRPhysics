# Quantized Probability
## Spin Measurement and Correlation Without Complex Numbers

James Buckeyne  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447

---

# Preface

[TODO: Brief motivation. This started from the rotation vector work — once rotations were parameterized as real 3-vectors, the observation that Pauli matrices generate the same algebra suggested that spin measurement probabilities might also be expressible without complex numbers. This paper develops that observation.]

This paper depends on the mathematical framework developed in the companion monograph *The R3 Spin Group: Rotation Vectors in Three-Dimensional Space*. Familiarity with rotation vectors, the exponential map, and the composition formula is assumed.

---

# Part I: Standard Quantum Spin

## Chapter 1: The QM Framework

### 1.1 Pauli Matrices and Spin-½

In standard quantum mechanics, spin-½ particles are described by two-component complex spinors $|\psi\rangle \in \mathbb{C}^2$. The spin operators along the three axes are the Pauli matrices:

$$\sigma_x = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad
\sigma_y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}, \quad
\sigma_z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

These are unitary and Hermitian. They satisfy the commutation relations $[\sigma_i, \sigma_j] = 2i\epsilon_{ijk}\sigma_k$, which are the defining relations of $\mathfrak{su}(2)$ — the same Lie algebra that rotation vectors parameterize with the cross product bracket $[\vec{u}, \vec{v}] = \vec{u} \times \vec{v}$.

### 1.2 Measurement Probabilities

A spin-½ particle in state $|\psi\rangle$, measured along an axis $\hat{n}$, yields spin-up with probability:

$$P(\uparrow | \hat{n}) = \frac{1 + \hat{n} \cdot \vec{r}}{2}$$

where $\vec{r} = \langle\psi|\vec{\sigma}|\psi\rangle$ is the Bloch vector — the expectation value of the spin operator, a real 3-vector on or inside the unit sphere. For pure states, $|\vec{r}| = 1$ and the Bloch vector lies on $S^2$.

### 1.3 The Bloch Sphere as Rotation Space

The Bloch sphere is the quotient of $\mathrm{SU}(2)$ by the $\mathrm{U}(1)$ phase — it is the base space of the Hopf fibration $S^1 \hookrightarrow S^3 \to S^2$. A pure spin state is specified by a direction on $S^2$ (two real parameters), with the global phase (the $S^1$ fiber) being physically unobservable.

This is the same decomposition that rotation vectors exhibit when split into "pole direction" (latitude/longitude in the X-Z plane) and "twist" (rotation around the local Y axis). The Bloch sphere is the sphere of rotation vector directions, modulo the twist fiber.

---

## Chapter 2: Spin-Up Probability from Geometry

### 2.1 The Projection Formula

Consider a spin axis — a unit vector $\hat{s} \in S^2$ representing the orientation of a spin-½ particle. A detector aligned along axis $\hat{d}$ measures the component of $\hat{s}$ along $\hat{d}$:

$$x = \hat{s} \cdot \hat{d}$$

This dot product ranges from $-1$ (anti-aligned) to $+1$ (aligned). The spin-up probability as a function of this projection is:

$$P(\uparrow) = \sin^2\!\left(\frac{(1+x)\pi}{4}\right)$$

At $x = 1$ (aligned with detector): $P = \sin^2(\pi/2) = 1$. Full certainty of spin-up.

At $x = 0$ (perpendicular): $P = \sin^2(\pi/4) = 1/2$. Equal probability — no information.

At $x = -1$ (anti-aligned): $P = \sin^2(0) = 0$. Full certainty of spin-down.

This is equivalent to the standard QM result $P = \cos^2(\alpha/2)$ where $\alpha$ is the angle between $\hat{s}$ and $\hat{d}$, since $x = \cos\alpha$ and $\sin^2((1+\cos\alpha)\pi/4) = \cos^2(\alpha/2)$ by half-angle identities.

### 2.2 Three-Axis Decomposition

A spin axis $\hat{s} = (s_x, s_y, s_z)$ with $s_x^2 + s_y^2 + s_z^2 = 1$ has three orthogonal projections. Each component independently gives a spin-up probability via the formula above. The unit-vector constraint ensures consistency: when $s_x = \pm 1$ (100% probability along X), both $s_y = s_z = 0$ (50-50 along Y and Z).

The three probabilities are not independent — they are constrained by the geometry of the unit sphere. This is the content of the normalization: the $\sin^2$ probability function, applied component-wise to a unit vector, automatically satisfies the requirement that the total probability over all directions is consistent.

### 2.3 The Probability Cloud

When the spin-up probability is computed for all spin axes uniformly distributed on $S^2$, the resulting probability distribution is not spherically symmetric. The $\cos^2$ (or equivalently $\sin^2$) factor distorts the uniform distribution into a **superellipsoidal** or **cuboid** shape — bulging along the detector axes and compressed at $45°$ between them.

[Figure: The probability cloud. Left: uniform distribution of spin axes (sphere). Right: probability-weighted distribution showing cuboid distortion from $\cos^2$ weighting.]

This is visible in simulation: rendering each spin axis as a line segment, colored by its detection outcome (red for X-up, green for Y-up, blue for Z-up), and scaled by detection probability, produces the characteristic "rounded cube" shape rather than a perfect sphere.

---

# Part II: Correlation and the Local Hidden Variable Model

## Chapter 3: Two-Detector Correlation

### 3.1 The Setup

Two detectors, A and B, are oriented along axes $\hat{a}$ and $\hat{b}$ respectively, separated by angle $\phi$ ($\cos\phi = \hat{a} \cdot \hat{b}$). A source emits pairs of particles with correlated spin axes. For each pair, both detectors produce a binary outcome: spin-up or spin-down.

The correlation $E(\phi)$ is the statistical tendency for the two detectors to agree:

- $E = +1$: perfect correlation (always same outcome)
- $E = 0$: no correlation (random, independent outcomes)  
- $E = -1$: perfect anti-correlation (always opposite outcomes)

QM predicts: $E(\phi) = \cos^2(\phi/2)$ for aligned pairs, or $-\cos(\phi)$ depending on the convention and particle type.

### 3.2 The Local Hidden Variable

In this model, the "hidden variable" is the particle's spin axis $\hat{s}$ — a real unit 3-vector carried by the particle from the source. It is not a digital $\pm 1$ value (as Bell's original formulation assumes for the hidden variable's contribution to the measurement function). It is an analog direction in $\mathbb{R}^3$.

When particle with spin axis $\hat{s}$ encounters detector $\hat{d}$:
- The projection $x = \hat{s} \cdot \hat{d}$ determines the measurement outcome.
- If $x > 0$: detected as spin-up.
- If $x < 0$: detected as spin-down.
- The *probability* of agreement between two detectors depends on the overlap of their acceptance regions on $S^2$.

### 3.3 Correlation from Arc Overlap

For two detectors separated by angle $\phi$, consider the sphere of possible spin axes. Each detector divides the sphere into two hemispheres (up/down). The fraction of spin axes that produce the *same* outcome in both detectors is determined by the overlap of these hemispheres.

Let $S$ = count of same outcomes (up-up or down-down), $D$ = count of different outcomes (up-down or down-up), with $S + D = N$ (total samples).

The correlation is computed as a **relative change**:

$$E = \begin{cases}
1 - D/S & \text{if } S \geq D \\[4pt]
S/D - 1 & \text{if } D > S
\end{cases}$$

This is not the same as the standard formula $(S - D)/N$. The distinction matters. The standard formula treats $S$ and $D$ symmetrically relative to the total count. The relative change formula treats the *majority* outcome as the reference and measures the minority relative to it. This is analogous to placing the same and different counts on a balance beam and reading the angle of deflection.

### 3.4 The Resulting Correlation Curve

Using the relative change formula with uniform random spin axes and a dot-product threshold for detection:

$$E(\phi) \approx 1 - \frac{\phi/(\pi/2)}{2 - \phi/(\pi/2)}$$

or equivalently, with $x = \phi/(\pi/2)$ normalized to $[0,1]$:

$$E(x) = 1 - \frac{x}{2-x}$$

[TODO: Verify this is the exact expression or the approximation. Reconcile with the `cos(pi/2 * x)` comparison in SpinProbabilities.md. The error between this curve and $\cos^2(\phi/2)$ is stated as ~10% maximum.]

At $\phi = 0$ ($x = 0$): $E = 1$. Perfect correlation.

At $\phi = \pi/2$ ($x = 1$): $E = 0$. No correlation.

At $\phi = \pi$ ($x = 2$): $E = -1$. Perfect anti-correlation.

This curve closely approximates the QM prediction $\cos^2(\phi/2)$ but is not identical. The discrepancy is largest at intermediate angles.

---

## Chapter 4: Bell's Inequality and CHSH

### 4.1 Bell's Assumption

Bell's theorem (1964) proves that no local hidden variable theory with *digital* hidden variables ($\pm 1$) can reproduce the QM correlation curve. The proof rests on the hidden variable being a discrete value that contributes $\pm 1/2$ to the measurement function $\sigma(V, A)$.

The spin axis model uses an *analog* hidden variable — a continuous direction on $S^2$. The integral $\int d\hat{s}\, P(\hat{s})\, \sigma_A(\hat{s})\, \sigma_B(\hat{s})$ produces a different bound because the measurement functions are not restricted to $\pm 1/2$ at every point, but instead produce a continuously varying projection.

### 4.2 CHSH Test

The CHSH inequality provides a robust test: for any local hidden variable theory with digital variables, the quantity:

$$S = |E(A_0, B_0) + E(A_0, B_1) + E(A_1, B_0) - E(A_1, B_1)| \leq 2$$

QM predicts $S = 2\sqrt{2} \approx 2.828$ (the Tsirelson bound).

The spin axis model, with the relative change correlation formula, produces:

**Monte Carlo simulation result:** $S \approx 2.39$ at standard CHSH test angles.

**Ideal CHSH S for this LHV model:** $S = 3.40$, achieved by choosing detector angles that exploit the 90° zero-correlation point as a free point (since detectors at 90° never correlate, the $A_1$/$B_1$ penalty term vanishes).

### 4.3 Interpretation

The spin axis LHV model exceeds the Bell bound of $S = 2$ but does not reach the QM prediction of $2\sqrt{2}$. The gap between $2.39$ and $2.828$ at standard angles could reflect:

- The difference between the relative change correlation formula and the standard $(S-D)/N$ formula.
- Experimental factors: lossy polarizers, detector noise, non-detection events.
- A genuine difference between the model and QM that could be tested experimentally.

The ideal value of $3.40$ exceeds the Tsirelson bound, which would require QM to produce $S > 3.40$ to rule out this specific LHV model. Whether this is achievable is an open question.

[TODO: Clarify the experimental conditions under which $S = 3.40$ is the correct comparison. The CHSH game setup with $A_1 \perp B_1$ at 90° is a specific configuration — does the standard CHSH protocol allow this choice, or does it require specific angle sets?]

---

## Chapter 5: Polarizer Model and Arc Geometry

### 5.1 Polarized Plates

The two-detector system can be modeled as overlapping polarized plates. A photon with spin axis $\hat{s}$ passes through polarizer A (aligned along $\hat{a}$), potentially having its polarization modified within $\pm 90°$ of $\hat{a}$, then encounters polarizer B.

"Correlation" means a photon passes through both polarizers. "Anti-correlation" means it is blocked by one but not the other.

### 5.2 Arc Overlap

On the sphere of spin axes, each polarizer defines an acceptance arc (a hemisphere). The intersection of two acceptance arcs, offset by angle $\phi$, determines the region of definite correlation. The regions outside the intersection but inside one arc or the other are the regions of definite anti-correlation.

Within the intersection (the green arc in the visualization), a photon passing through polarizer A can be modified into a state that is outside B's acceptance — these are subtracted from the definite correlations.

The ratio of the remaining correlated arc to the total intersection arc gives the correlation. This geometric construction produces the $1 - x/(2-x)$ curve.

[TODO: Include the arc overlap diagram from QuantizedProbability.md. Explain the three subtractions clearly.]

### 5.3 Stern-Gerlach vs. Polarizer

For Stern-Gerlach (SG) devices: every particle passes through and is sorted into up or down. The spin axis dot product with the detector determines which bin.

For polarizers: the particle is either transmitted or blocked. The blocking introduces an asymmetry — non-detection does not imply non-correlation, only that the event was lost.

The distinction matters for experimental comparison. The simulation models SG-style detection (every event counted); real experiments with polarizers have additional loss factors.

---

# Part III: The $\cos^2$ Connection

## Chapter 6: From Relative Change to QM Prediction

### 6.1 The Discrepancy

The relative change formula $1 - x/(2-x)$ approximates but does not exactly match the QM prediction $\cos^2(\phi/2)$. The maximum error is approximately 10% at intermediate angles.

### 6.2 The $\cos$ Approximation

The expression $1 - x/(2-x)$ (for $x \in [0,1]$ corresponding to $\phi \in [0, \pi/2]$) can be related to cosine through:

$$\cos(x) \approx \frac{\pi - 2x}{\pi - x}$$

which is a rational approximation to cosine valid over $[0, \pi/2]$, expressed using the same $1 - a/b$ structure.

[TODO: Develop this connection more carefully. The SpinProbabilities.md notes state that $\cos(x) \approx g(x)$ where $g$ is constructed from a sawtooth wave with rational correction. The relationship between $1/2\cos^2(\phi)$ and $g(x)^2/2$ vs. $(g(2x)+1)/4$ needs to be worked out explicitly.]

### 6.3 The Cuboid Sphere Revisited

The $\cos^2$ probability weighting over all spin axes produces the cuboid (superellipsoidal) probability cloud observed in simulation. This shape arises because the measurement probability along each axis follows a $\sin^2$ or $\cos^2$ law, and the product of these over three orthogonal axes distorts the sphere into a shape that bulges along the axes.

[Figure: Side-by-side of the LHV probability cloud (sphere with dot-product threshold, showing RGB hemisphere coloring) and the QM $\cos^2$-weighted cloud (cuboid sphere with yellow high-probability regions).]

The LHV model produces the spherical distribution (Image 1); the QM prediction produces the cuboid (Image 2). The geometric difference between these two shapes *is* the discrepancy between the models.

---

# Appendices

## Appendix A: Simulation Details

[TODO: Description of the Monte Carlo simulation. Random spin axes uniformly distributed on $S^2$. Detection threshold: sign of dot product. Correlation computed via relative change. CHSH score computed from four detector angle pairs. Reference implementation at d3x0r.github.io/STFRPhysics/3d/index5-spin.]

## Appendix B: Experimental Data Comparison

[TODO: Table of predicted vs. measured correlation at various angles. Include the data from QuantizedProbability.md showing comparison with published experimental results at 11.25° increments.]

```
Angle    LHV Predicted    QM Predicted    Experimental
0°       1.000            1.000           0.500 ± 0.010
11.25°   ...              ...             ...
22.5°    ...              ...             ...
...
90°      0.000            0.000           0.041 ± 0.003
```

[TODO: The experimental data at 90° shows 0.041 rather than 0.000, suggesting a noise floor. Discuss the implications for distinguishing models.]

## Appendix C: The Wikipedia Talk Page Contribution

[TODO: The CHSH talk page contribution at https://en.wikipedia.org/wiki/Talk:CHSH_inequality#CHSH_Game_Implementation_scores_3.40 and the response/contention. Document the argument and counter-argument for the record.]

---

# References

Bell, J.S. (1964). "On the Einstein Podolsky Rosen Paradox." *Physics* **1**(3): 195–200.

Clauser, J.F.; Horne, M.A.; Shimony, A.; Holt, R.A. (1969). "Proposed experiment to test local hidden-variable theories." *Physical Review Letters* **23**(15): 880–884.

Buckeyne, J. *The R3 Spin Group: Rotation Vectors in Three-Dimensional Space.* [Companion monograph.]

[TODO: Aspect experiment papers. Additional CHSH experimental references. NoahExplainsPhysics YouTube series as pedagogical reference.]
