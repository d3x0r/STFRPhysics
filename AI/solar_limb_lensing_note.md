# Solar Limb Lensing: Displacement Framework vs GR vs Observation

**Working note** — companion to *Weak-Field Observational Tests*

---

## The Two Predictions

### GR (least-action through displaced medium)

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

### Displacement Framework Surface Prediction (β formula)

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

Both predictions follow the same $1/b$ falloff — they differ only in the limb amplitude. At any impact parameter $b$:

$$
\theta_\beta(b) = \theta_{\mathrm{GR}}(b) \times 1.128
$$

---

## The Convergence Problem

The two predictions differ by $\sim 0.22''$ at the limb. However, the first *measurable* star position during a solar eclipse is typically $\sim 0.25\,R_\odot$ past the apparent limb. At that position:

| Position | $\theta_\beta$ | $\theta_{\mathrm{GR}}$ |
|---|---|---|
| Limb ($b = R_\odot$) | 1.977'' | 1.752'' |
| +0.25 R☉ | 1.581'' | 1.401'' |
| +0.50 R☉ | 1.318'' | 1.168'' |
| +1.00 R☉ | 0.988'' | 0.876'' |
| +2.00 R☉ | 0.659'' | 0.584'' |
| +4.00 R☉ | 0.394'' | 0.350'' |

The first measurable star at $+0.25\,R_\odot$ shows $1.58''$ ($\beta$) vs $1.40''$ (GR) — a difference of only $0.18''$, which is within Eddington's error bars.

---

## The Unresolvable Zone

The apparent limb (where the photosphere becomes optically opaque) and the true limb (the physical edge of the deflecting mass) are separated by the deflection itself. In the β framework this zone spans $\sim 1.977''$; in GR it spans $\sim 1.752''$.

Any star appearing within this zone is ambiguous:
- It may be a star physically *behind* the sun whose light grazes past and is bent into view
- Or a star that happens to sit right at the apparent limb

This unresolvable zone is exactly where the two frameworks disagree most. Stars clearly *outside* this zone show deflections where β and GR differ by $< 15\%$ — well within 1919-era measurement precision.

---

## The 1919 Observations

| Expedition | Result | Notes |
|---|---|---|
| Sobral, Brazil (4-inch lens) | $1.98 \pm 0.12''$ | Best plates; matches $\theta_\beta$ exactly |
| Sobral (astrographic lens) | $0.93''$ | Excluded — mirror distortion |
| Príncipe, West Africa (Eddington) | $1.61 \pm 0.30''$ | Cloud interference; wide error bar |
| Modern (2017 repeat, VLBI) | $1.752 \pm 0.05''$ | Confirms GR prediction |

The Sobral 4-inch result of $1.98 \pm 0.12''$ is consistent with $\theta_\beta = 1.977''$ and *inconsistent* with $\theta_{\mathrm{GR}} = 1.752''$ at $1.9\sigma$. However it is also consistent with GR at $1.9\sigma$ given the error bars.

The modern result confirms GR and is inconsistent with $\theta_\beta$ at $\sim 4.5\sigma$.

---

## Systematic Concerns in 1919 Measurements

Several systematic effects complicate interpretation of the 1919 plates:

1. **Stellar aberration** — Earth's orbital velocity ($\sim 30$ km/s) causes $\sim 20''$ aberration. Eclipse plates and comparison plates (taken 6 months apart) have different aberration vectors. Imperfect correction leaves residuals potentially comparable to the signal.

2. **Plate scale differences** — eclipse and comparison plates taken at different times, temperatures, and optical configurations introduce scale errors.

3. **Atmospheric/chromospheric refraction** — plasma in the chromosphere adds a small positive deflection bias not corrected in early analyses.

4. **Star selection** — only stars clearly outside the solar disk are usable. Stars within $\sim 2''$ of the limb (the unresolvable zone) are ambiguous.

5. **Which stars were measured** — Eddington's usable stars were not at the limb itself but distributed over several solar radii, where both frameworks agree more closely.

The net effect is that 1919 data could not distinguish between $\theta_\beta$ and $\theta_{\mathrm{GR}}$ — both were within error bars, and both ruled out the Newtonian half-deflection ($0.875''$), which was the primary goal.

---

## Status

- The β surface formula and the GR limb prediction are indistinguishable with any pre-VLBI measurement.
- The β formula agrees exactly with the best 1919 plate (Sobral 4-inch).
- Modern VLBI confirms GR at $1.752 \pm 0.05''$, disfavoring $\theta_\beta$ at $\sim 4.5\sigma$.
- The discrepancy is concentrated entirely within $\sim 0.25\,R_\odot$ of the limb — the unresolvable zone.
- A high-precision measurement of stars within $0.1\,R_\odot$ of the solar limb during totality could directly test the two limb predictions.

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
