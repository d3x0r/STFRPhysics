# Solar Limb Lensing: Displacement Framework vs GR vs Observation

**Working note** — companion to *Weak-Field Observational Tests*

---

## The Two Working Branches

### GR / least-action through displaced medium

The weak-field observational tests paper derives the full deflection via the stationary-cost principle. The realized propagation cost per coordinate length is

$$
n_{\mathrm{eff}}(r) = (1+\Sigma)^2 \approx 1 + 2\Sigma = 1 + \frac{d^2}{r}
$$

where one factor of $(1+\Sigma)$ comes from the time burden and one from the spatial stretch of the displaced medium. Minimizing the path integral gives

$$
\theta_{\mathrm{GR}} = \frac{4GM}{c^2 b}
$$

At the solar limb ($b = R_\odot = 695{,}700$ km):

$$
\theta_{\mathrm{GR}} = 1.752''
$$

This is confirmed by modern VLBI to $1.752 \pm 0.05''$.

---

### Displacement Framework Surface / Horizon Prediction (β formula)

A more direct surface estimate uses the escape velocity beta at the solar surface as the fractional space stretch:

$$
\beta = \frac{v_{\mathrm{esc}}}{c} = \frac{\sqrt{2GM/R_\odot}}{c} \approx 0.002059
$$

The deflection angle at the limb from this stretch, projected through the geometry:

$$
\theta_\beta = \arcsin\!\left(\beta \cdot \frac{R_\odot}{L_\odot}\right) \cdot \frac{360 \times 3600}{2\pi}
$$

where $L_\odot = 1\,\mathrm{AU}$ is the Earth-Sun distance. This gives:

$$
\theta_\beta = 1.977''
$$

The ratio to the GR value is $\theta_\beta / \theta_{\mathrm{GR}} \approx 1.128$.

Both predictions follow the same $1/b$ falloff in this first comparison — they differ only in the limb amplitude. At any impact parameter $b$:

$$
\theta_\beta(b) = \theta_{\mathrm{GR}}(b) \times 1.128
$$

This should not be read as two simple predictions for the same visible star at the same observational surface. The least-action/GR branch describes the clean exposed-limb deflection ordinarily extracted from measurable exterior star images. The β branch is a surface/horizon estimate: it describes the displacement scale at the occulting edge, where a remote background source can still be geometrically behind the visible solar disk while its bent image is projected outside the disk.

---

## Behind-the-Sun Sources Are Part of the Signal

A gravitational-lensing simulation must not remove all sources whose unlensed positions fall behind the visible solar disk. That filter would erase the phenomenon under test. One of the strong points of solar-limb lensing is that it makes background objects visible even when their geometric source positions are at or behind the occulting edge.

The useful simulation therefore contains several classes of fixed source points:

- points clearly behind the visible disk,
- points inside the apparent limb but close enough to be lensed outward,
- half-emergent or tangent-clearance points,
- points just outside the limb,
- and exterior comparison points where ordinary exposed-limb astrometry is unambiguous.

In this reading, the familiar $1.752''$ value can appear as the first clean exterior image position even when the underlying displacement/horizon scale is closer to $1.977''$. The β value is then not discarded as a failed exposed-star prediction; it is interpreted as the buried edge or horizon scale from which the first clean visible image is projected.

---

## The Convergence Problem

The two predictions differ by $\sim 0.22''$ at the limb. However, the first *measurable* star position during a solar eclipse is typically $\sim 0.25\,R_\odot$ past the apparent limb. At that position:

| Position | $b/R_\odot$ | $\theta_\beta$ | $\theta_{\mathrm{GR}}$ | $\theta_\beta/\theta_{\mathrm{GR}}$ | $\theta_\beta/1.752''$ |
|---|---:|---:|---:|---:|---:|
| Limb ($b = R_\odot$) | 1.000 | 1.977'' | 1.752'' | 1.128 | 1.128 |
| +0.128 R☉ ($b \approx 1.128R_\odot$; $\theta_\beta = 1.752''$) | 1.128 | 1.752'' | 1.553'' | 1.128 | 1.000 |
| +0.25 R☉ | 1.250 | 1.581'' | 1.401'' | 1.128 | 0.902 |
| +0.50 R☉ | 1.500 | 1.318'' | 1.168'' | 1.128 | 0.752 |
| +1.00 R☉ | 2.000 | 0.988'' | 0.876'' | 1.128 | 0.564 |
| +2.00 R☉ | 3.000 | 0.659'' | 0.584'' | 1.128 | 0.376 |
| +4.00 R☉ | 5.000 | 0.395'' | 0.350'' | 1.128 | 0.225 |

The ratio $\theta_\beta/\theta_{\mathrm{GR}}$ remains fixed at $1.128$ in this simplified comparison because both branches are being treated with the same $1/b$ falloff. The final column instead compares the β value at each radius to the canonical exposed-limb value $1.752''$. The row at $b \approx 1.128R_\odot$ is useful because it marks the impact radius where the β branch gives the familiar $1.752''$ exposed-limb number. In that same row the least-action/GR branch gives $1.553''$, so this is not an equality point between the two curves; it is the radius at which the β curve reaches the canonical exposed value. The first measurable star at $+0.25\,R_\odot$ shows $1.58''$ ($\beta$) vs $1.40''$ (GR) — a difference of only $0.18''$, which is within Eddington's error bars.

---

## The Unresolvable / Horizon Zone

The apparent limb, where the photosphere becomes optically opaque, and the true deflecting-edge or tangent-horizon condition are separated by the deflection itself. In the β framework this zone spans $\sim 1.977''$; in the GR/least-action branch it spans $\sim 1.752''$.

Any source or image appearing within this zone is ambiguous:

- it may be a source physically *behind* the Sun whose light grazes past the occulting edge and is bent into view,
- it may be a source whose center is still behind the visible disk while its lensed image has cleared the limb,
- it may be a star whose unlensed position happens to sit near the apparent limb,
- or it may be a partially emerged/tangent-clearance case whose visibility depends on the exact photospheric, atmospheric, and instrumental boundary.

The simulation interpretation is therefore a hidden-to-visible mapping, not a simple outside-limb displacement map. The β branch assigns a larger displacement scale to the occulted horizon; the least-action/GR branch gives the clean exposed coefficient. Those can coincide operationally if the first barely visible exterior image lies near the GR value while the buried horizon scale remains closer to the β value.

This is also why a direct visual interpretation such as "the remote Sun is half-risen over the horizon" is useful. The edge condition is not an orthographic, infinitely sharp circle. The source must clear the opacity boundary, the bent ray must clear the tangent, and the final image must land far enough outside the solar limb to be measured against glare, corona, plate blur, and reduction error.

There is therefore a large extrapolation hidden inside the word *edge*. The β-to-GR offset corresponds to about $0.128R_\odot$ in the simple $1/b$ comparison, roughly one eighth of the solar radius. That number should **not** be read as a proposed error in the physical solar radius. The solar mass, Earth-Sun distance, and broad photospheric radius are much too well constrained to absorb the full β/GR amplitude difference. The row at $b \approx 1.128R_\odot$ is instead a diagnostic radius: it shows where the β branch falls to the canonical GR limb value under a shared $1/b$ falloff.

The plausible observational ambiguity is more local and procedural. In a central eclipse the Moon can be larger than the Sun in apparent angular radius and can hide the true photospheric edge altogether. The observed dark disk is then the lunar occulting edge, not necessarily the solar edge. If the Moon is oversized and offset toward the relevant background-star side, it can remove precisely the innermost rays that would most strongly distinguish the β branch from the least-action/GR branch. That does not need to mimic a simple $0.128R_\odot$ radius shift; it only needs to determine which near-limb source/image pairs are actually available for extrapolation.

The Moon is also not just an occulting mask. It is a weak foreground lens. At a grazing lunar impact parameter its ordinary gravitational contribution is about $0.00738''$. This is small compared with the solar limb deflection, but it is not identically zero: it is about $0.42\%$ of $1.752''$ and about $3.3\%$ of the $0.225''$ β/GR limb-amplitude difference. In most eclipse reductions this term is much smaller than the solar signal and historical plate errors, but it belongs in a complete near-limb model because the same lunar edge that determines visibility also contributes a small local deflection.

The radius question is therefore not “is the Sun secretly twelve percent larger or smaller?” but “which center, edge, and impact parameter were used when the exposed plate positions were reduced?” A uniform plate-scale factor would mostly be solved away by differential astrometry. A directionally correlated center, radius, occultation, or star-selection bias near the smallest impact parameters is more relevant, because the fitted deflection depends on

$$
b_i = \lVert \vec{x}_i-\vec{x}_\odot \rVert
$$

and the signal is radial and nonlinear in $1/b_i$. Any claim about the solar tangent/horizon position has to be projected from the exposed star images, the lunar radius, the solar radius, and the alignment geometry rather than read directly off a visible solar boundary.

---


## The 1919 Observations

| Expedition | Result | Notes |
|---|---|---|
| Sobral, Brazil (4-inch lens) | $1.98 \pm 0.12''$ | Best plates; matches $\theta_\beta$ exactly |
| Sobral (astrographic lens) | $0.93''$ | Excluded — mirror distortion |
| Príncipe, West Africa (Eddington) | $1.61 \pm 0.30''$ | Cloud interference; wide error bar |
| Modern (2017 repeat, VLBI) | $1.752 \pm 0.05''$ | Confirms GR prediction |

The Sobral 4-inch result of $1.98 \pm 0.12''$ is consistent with $\theta_\beta = 1.977''$ and *inconsistent* with $\theta_{\mathrm{GR}} = 1.752''$ at $1.9\sigma$. However it is also consistent with GR at $1.9\sigma$ given the error bars.

The modern exposed-limb result confirms the GR/least-action coefficient when the data are reduced as an ordinary exterior-star deflection measurement. It does not by itself settle whether the β value represents a separate occulted-edge/horizon scale, because that interpretation requires a hidden-to-visible source map rather than a direct comparison of two exposed-star coefficients.

---

## Systematic Concerns in 1919 Measurements

Several systematic effects complicate interpretation of the 1919 plates:

1. **Plate scale differences** — eclipse and comparison plates taken at different times, temperatures, and optical configurations introduce scale errors.

2. **Atmospheric/chromospheric refraction** — plasma in the chromosphere adds a small positive deflection bias not corrected in early analyses.

3. **Star selection** — only stars clearly outside the solar disk are usable. Stars within $\sim 2''$ of the limb (the unresolvable zone) are ambiguous.

4. **Which stars were measured** — Eddington's usable stars were not at the limb itself but distributed over several solar radii, where both frameworks agree more closely.

5. **Lunar occultation geometry** — in a central total eclipse the Moon may cover more than the visible solar disk, hiding the photospheric edge that would otherwise define the tangent boundary. This does not by itself explain the full β/GR amplitude difference, but it can control which near-limb rays survive into the measured plate solution.

6. **Solar-center and impact-parameter placement** — the relevant fitted quantity is the Sun-centered impact parameter $b_i$, not merely a global plate scale. A coherent scale error is largely removable; a center/edge/selection bias concentrated near the smallest $b_i$ values can skew the inferred $1/b$ coefficient.

7. **Lunar gravitational deflection** — the Moon contributes a small additional lensing term, about $0.00738''$ for a grazing lunar ray. This is too small to account for the β/GR difference by itself, but it is coupled to the same lunar-edge geometry that selects which near-limb rays are visible.

The net effect is that 1919 data could not distinguish between $\theta_\beta$ and $\theta_{\mathrm{GR}}$ — both were within error bars, and both ruled out the Newtonian half-deflection ($0.875''$), which was the primary goal.

---

## Status

- The β surface/horizon formula and the GR/least-action exposed-limb coefficient are both observationally safe in the present interpretation because they are not assigned to the same observational surface.
- The β formula agrees with the best 1919 plate (Sobral 4-inch), but that historical agreement should be treated as suggestive rather than decisive.
- Modern exposed-limb reductions confirm the GR/least-action coefficient near $1.752''$.
- The β branch is retained as a horizon-scale interpretation: it applies to buried, tangent, half-emergent, or behind-the-Sun source positions that may lens into the first clean visible exterior image.
- The discrepancy is concentrated near the occulting boundary, where source position, image position, lunar occultation, lunar deflection, photospheric opacity, corona/glare, tangent clearance, fitted solar center, and plate reduction are inseparable.
- The $1.128R_\odot$ row is a diagnostic radius, not a claim that the true solar radius is uncertain at the twelve-percent level.
- The decisive test is not merely a higher-precision repetition of the ordinary exposed-star coefficient. It is a modeled hidden-to-visible mapping of sources inside and just outside the apparent limb, with lunar occultation geometry, atmospheric refraction, plate solution, fitted solar-center placement, corona/glare, and solar-edge opacity explicitly included.

---

## Constants Used

| Quantity | Value |
|---|---|
| $G$ | $6.67430 \times 10^{-11}$ m³ kg⁻¹ s⁻² |
| $c$ | $299{,}792{,}458$ m/s |
| $M_\odot$ | $1.989 \times 10^{30}$ kg |
| $R_\odot$ | $695{,}700$ km |
| $1\,\mathrm{AU}$ | $149{,}597{,}870.7$ km |
| $\beta = v_{\mathrm{esc}}/c$ at surface | $0.002059$ |
| $\theta_\beta$ at limb | $1.977''$ |
| $\theta_{\mathrm{GR}}$ at limb | $1.752''$ |
| Lunar grazing deflection | $0.00738''$ |
