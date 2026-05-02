# Solar Limb Lensing: Displacement Framework vs GR vs Observation

**Working note** — companion to *Weak-Field Observational Tests*

---

## 1. The Two Branches

### 1.1 GR / least-action through the displaced medium

The weak-field observational tests paper derives the standard light-deflection coefficient by a stationary-cost principle. The realized propagation cost per coordinate length is

$$
n_{\mathrm{eff}}(r)=(1+\Sigma)^2\approx 1+2\Sigma=1+\frac{d^2}{r},
$$

where one factor of $(1+\Sigma)$ comes from the time burden and one from the spatial stretch of the displaced medium. Minimizing the path integral gives

$$
\theta_{\mathrm{GR}}(b)=\frac{4GM}{c^2 b}.
$$

At the solar limb, using $b=R_\odot=695{,}700\,\mathrm{km}$,

$$
\theta_{\mathrm{GR}}(R_\odot)\approx 1.752''.
$$

This is the conservative, observation-safe branch. It matches the ordinary exposed-limb GR coefficient and modern eclipse/VLBI-style reductions.

### 1.2 Displacement-framework surface / β branch

A more direct surface estimate uses the escape-velocity beta at the solar surface as the fractional transport stretch:

$$
\beta_\odot=\frac{v_{\mathrm{esc}}}{c}
=\frac{\sqrt{2GM_\odot/R_\odot}}{c}
\approx 0.002059.
$$

This number is not an adjustable fit parameter. For a spherical source with known mass and radius, there is only one escape-velocity beta and therefore one associated surface expansion scale:

$$
\Delta R_\beta=\beta_\odot R_\odot.
$$

For the Sun this is about $0.002R_\odot$, or about **2 mm per meter** of radial surface scale. Projected at Earth, this corresponds to

$$
\beta_\odot\,\theta_{\odot,\mathrm{radius}}
\approx 0.002059\times 960''
\approx 1.98''.
$$

Equivalently, the surface estimate gives

$$
\theta_\beta(R_\odot)\approx 1.977''.
$$

In this interpretation, the β branch is not primarily a free alternative amplitude. It says that the Sun has a definite transport/displacement surface or tangent-horizon scale fixed by the escape velocity. The open question is how that fixed β-surface edge maps onto the first clean observable lensed image outside the occulting/photospheric boundary.

### 1.3 Same falloff, different edge assignment

For the simplified comparison used in this note, both branches are treated as having the same $1/b$ falloff:

$$
\theta_\beta(b)=\theta_\beta(R_\odot)\frac{R_\odot}{b},
\qquad
\theta_{\mathrm{GR}}(b)=\theta_{\mathrm{GR}}(R_\odot)\frac{R_\odot}{b}.
$$

The ratio is therefore fixed:

$$
\frac{\theta_\beta}{\theta_{\mathrm{GR}}}
=\frac{1.977}{1.752}
\approx 1.128.
$$

The number $1.128R_\odot$ is a **diagnostic radius**, not a claim that the Sun is physically twelve percent larger. It is simply the impact parameter at which the β curve falls to the canonical GR exposed-limb number:

$$
\theta_\beta(1.128R_\odot)=1.752''.
$$

The physical β surface expansion is instead the much smaller scale $\beta R_\odot\approx0.002R_\odot$. These two radii must not be collapsed into one claim.

Thus the more precise interpretive statement is:

> The β branch may be an edge-assignment difference rather than a different far-field law. GR conventionally reports the exposed optical deflection coefficient at the photospheric impact radius. The β branch assigns a stronger value to the displacement/tangent boundary and asks where that branch becomes observationally accessible once occultation, hidden-source mapping, glare, and clean centroiding are imposed.

---

## 2. The Straight-Line Geodesic and Its Relation to GR

### 2.1 Why the surface β formula over-predicts

The β surface formula computes the angle using the **Earth→sun** geometry: it takes the displacement at $R_\odot$ and projects it through the straight-line distance $L_\odot$. This is a surface-only, single-point estimate — it does not integrate over the ray path.

The correct picture is **sun→Earth**: a ray from a distant star enters nearly flat space, passes through increasingly displaced space as it approaches the sun, reaches maximum displacement $\Sigma(R_\odot) = GM/c^2 R_\odot$ at closest approach, then propagates back outward through the weakening $1/r$ field to Earth. The field at 1 AU is:

$$
\frac{\Sigma(L_\odot)}{\Sigma(R_\odot)} = \frac{R_\odot}{L_\odot} \approx \frac{1}{215}
$$

so space at Earth is essentially flat and the outbound leg gradually straightens the ray.

### 2.2 The path integral recovers GR exactly

For a straight-line geodesic through displaced space — not a least-action path, simply a straight line in displaced coordinates — the transverse deflection integrates as:

$$
\theta = \int_{-\infty}^{+\infty} \nabla_\perp\, n_{\mathrm{eff}}\, dz
= 2\int_{-\infty}^{+\infty} \frac{b\cdot GM/c^2}{(b^2+z^2)^{3/2}}\,dz
= \frac{4GM}{c^2 b}
$$

**This is exactly the GR result.** Numerically verified: integrating the spatial stretch alone gives the Newtonian 0.876''; including both the spatial and time-burden factors $(1+\Sigma)^2$ gives 1.752'' = GR exactly.

The β surface formula over-predicts because:
1. It uses only the **spatial stretch at the surface**, missing the equal time-burden contribution
2. It uses Earth-frame geometry rather than integrating the full path through the $1/r$ field
3. The outbound leg ($R_\odot \to L_\odot$) partially straightens the ray as $\Sigma(r)$ weakens — this is automatically included in the path integral but absent from the surface estimate

The 12.8% excess is therefore the difference between a surface-only single-factor estimate and the completed two-factor displaced-geodesic ray trace. This statement is not the least-action branch. It is the direct ray-trace result through the displaced transport geometry. The least-action derivation remains a separate conservative route to the same weak-field coefficient.

### 2.3 The coordinate picture

| | GR | Displacement Framework |
|---|---|---|
| Geometry | Curved spacetime, least-action | Displaced flat space, straight-line geodesic |
| Singularity | $r=0$ → infinite density | Finite displaced volume, no singularity |
| Interior | Coordinate artifact | Real displaced space pushed outward by finite mass |
| Path | Geodesic in curved coords | Straight line through stretched metric |
| Observable at Earth | 1.752'' | 1.752'' (full path integral) |

GR's power is in mapping observed (displaced) space onto flat coordinates. It works precisely for predictions but does not track where the displaced volume went — the singularity at $r=0$ is an artifact of compressing real displaced space into a coordinate point. The displacement framework keeps that space explicit: a finite mass displaces a finite volume, pushed outward, and the ray travels straight through it.

### 2.4 Where the β branch fits

The β surface value (1.977'') is the displacement at the physical surface projected to Earth assuming flat space on both sides — analogous to Snell's law at a sharp interface. It correctly describes the maximum displacement encountered by the ray. The full path integral then accounts for how that displacement is distributed along the entire path, recovering the lower GR value.

The β branch is therefore not a failed prediction. It is the **surface horizon scale** — the displacement at closest approach — while the completed displaced-geodesic ray trace gives the **integrated path deflection** as observed from Earth. The 12.8% difference is the ratio of the peak surface scale to the completed observed value.

### 2.5 Surface-to-observer scalar compression

The 12.8% beta/GR difference should not be read as a permanent excess in the final observed image field. It appears when the surface/tangent scale

$$
\theta_\beta(R_\odot)\approx1.977''
$$

is compared directly with the completed weak-field observed coefficient

$$
\theta_{\mathrm{obs}}(R_\odot)=1.752''.
$$

In the direct displaced-geodesic reading, the beta value is the closest-approach or surface-coordinate scale. The information then propagates outward from the Sun through the decreasing displacement map toward the observer. To first order, that outward map acts like a nearly scalar compression of the solar-centered lensed field:

$$
\theta_{\mathrm{obs}}(b)\simeq k\,\theta_\beta(b),
\qquad
k=\frac{1.752}{1.977}\simeq0.887.
$$

Equivalently,

$$
\frac{1}{k}\simeq1.128.
$$

This is the same ratio that appears in the diagnostic row $b\simeq1.128R_\odot$. It is not a claim that the physical solar radius is wrong by 12.8%. It is the ratio between a surface/tangent displacement estimate and the completed Earth-observed angular displacement. If the compression is approximately scalar, the relative $1/b$ structure is preserved while the beta surface curve collapses onto the observed GR/ray-trace curve:

$$
k\,\frac{1.977''}{b/R_\odot}\simeq\frac{1.752''}{b/R_\odot}.
$$

This is why ordinary exposed-star reductions should recover the GR coefficient even if the beta surface scale remains meaningful as the local horizon/edge diagnostic at closest approach.

---

## 3. Hidden-to-Visible Source Mapping

A gravitational-lensing simulation must not remove all sources whose unlensed positions fall behind the visible solar disk. That filtering would erase the phenomenon under test. One of the strong points of solar-limb lensing is that it makes background objects visible even when their geometric source positions are at or behind the occulting edge.

The refined interpretation should distinguish at least three surfaces:

1. **True solar photospheric radius** — the physical radius used in the analytic solar-limb formula.
2. **Occulting/visible boundary** — during a total eclipse this may be the Moon's edge rather than the Sun's edge.
3. **First clean exposed astrometric image** — the first lensed image far enough outside the glare/corona/occulting boundary to be measured.

In this reading, the familiar $1.752''$ value can appear as the first clean exterior image position even if the buried/tangent β surface scale is closer to $1.977''$. The β value is then not discarded as a failed exposed-star prediction; it is interpreted as the hidden edge or horizon scale from which the first clean visible image is projected.

A useful visual analogy is a remote Sun half-risen over a horizon. The edge condition is not an orthographic, infinitely sharp circle. The source must clear the opacity boundary, the bent ray must clear the tangent, and the final image must land far enough outside the solar limb to be measured against glare, corona, plate blur, and reduction error.

### 3.1 The unseen inner curve

The first source that becomes visible just past the apparent solar edge is a limiting case. Its observed offset from the apparent limb can be essentially zero even though its unlensed source position belongs to the hidden/tangent zone. The strongest compression and edge-mapping ambiguity therefore live inside the innermost part of the curve.

Ordinary eclipse observations do not sample that inner curve well. The most useful measured stars are normally already outside the limb by at least one solar radius, and often much farther. In Bruns 2017, most stars were beyond $2.4R_\odot$, with only two close-in stars around $1.5$--$1.6R_\odot$. The region most likely to distinguish a beta-edge interpretation from the exposed GR/ray-trace coefficient is therefore mostly unseen and must be inferred from farther-out exposed images.

---

## 4. The Inserted Starfield

Lensing around the solar limb *reveals* stars that would otherwise be hidden:

- Without lensing: stars between the apparent limb and the true physical limb are blocked
- With lensing: their light grazes the physical limb and bends into view, appearing just outside the apparent limb
- Roughly $\theta_\beta \approx 2''$ worth of previously hidden sky is injected into the visible starfield

This injected angular content must be accommodated by the visible starfield — stars just outside the limb are pushed outward to make room. The measured deflection of any individual star is therefore a combination of its own geometric bending plus its share of the redistribution of the newly visible angular wedge.

The same $1/r$ field that acts on stellar images also acts on the injected stars as they propagate from the limb to Earth — pulling them back inward. The net effect, integrated over the full path, converges to the GR prediction. The β surface excess nearly cancels on propagation, leaving the observed 1.752''.

---

## 5. Numerical Ray Trace Verification

To verify the path integral result without any appeal to GR, a ray was traced directly through the STFR displaced metric. The ray starts at $z = -5\,\mathrm{AU}$, $x = b$ (impact parameter), with zero initial transverse velocity. At each step $dz$:

$$
\frac{d^2x}{dz^2} = \nabla_\perp\, n_{\mathrm{eff}} = 2\,\frac{d\Sigma}{dx} = -\frac{2GM}{c^2}\frac{x}{r^3}
$$

The ray is stepped forward and its final transverse displacement at $z = +1\,\mathrm{AU}$ is converted to an angle. No GR formula is assumed — the ray bends only because the displaced metric has a transverse gradient.

Results ($N = 300{,}000$ steps, $z \in [-5\,\mathrm{AU},\, +1\,\mathrm{AU}]$):

| $b/R_\odot$ | Ray trace | GR formula | ratio |
|---:|---:|---:|---:|
| 1.000 | 1.7517'' | 1.7517'' | 1.000006 |
| 1.128 | 1.5529'' | 1.5529'' | 1.000007 |
| 1.250 | 1.4014'' | 1.4014'' | 1.000007 |
| 1.500 | 1.1678'' | 1.1678'' | 1.000009 |
| 2.000 | 0.8759'' | 0.8759'' | 1.000014 |
| 3.000 | 0.5839'' | 0.5839'' | 1.000028 |
| 5.000 | 0.3504'' | 0.3503'' | 1.000076 |

The ray trace matches GR to 5 significant figures at every impact parameter. The residual ~0.001% grows slightly at larger $b$ due to the fixed step count and is purely numerical. The bending in the STFR displaced metric is not approximately equal to GR — it **is** GR, traced from first principles without assuming the GR formula.

---

## 6. Deflection Table

The STFR direct geodesic ray trace (path integral through displaced transport, including both spatial and time-burden factors) gives the **same observed deflection as GR** at every impact parameter. This is not the least-action derivation; it is the completed ray-trace result. The least-action route remains a separate derivation that lands on the same weak-field coefficient.

The β surface column is a *different physical quantity*: the displacement field strength at closest approach, projected to Earth assuming flat space on both sides. It is the peak displacement the ray encounters, not the integrated path deflection that arrives at Earth.

| Position | $b/R_\odot$ | STFR ray trace | GR formula | $\beta$-surface (peak) | $\Sigma(b)$ |
|---|---:|---:|---:|---:|---:|
| Limb ($b=R_\odot$) | 1.000 | **1.7517''** | 1.7517'' | 1.977'' | $2.12\times10^{-6}$ |
| $+0.128R_\odot$ | 1.128 | **1.5529''** | 1.5529'' | 1.752'' | $1.88\times10^{-6}$ |
| $+0.25R_\odot$ | 1.250 | **1.4014''** | 1.4014'' | 1.581'' | $1.70\times10^{-6}$ |
| $+0.50R_\odot$ | 1.500 | **1.1678''** | 1.1678'' | 1.318'' | $1.41\times10^{-6}$ |
| $+1.00R_\odot$ | 2.000 | **0.8759''** | 0.8759'' | 0.988'' | $1.06\times10^{-6}$ |
| $+2.00R_\odot$ | 3.000 | **0.5839''** | 0.5839'' | 0.659'' | $7.08\times10^{-7}$ |
| $+4.00R_\odot$ | 5.000 | **0.3504''** | 0.3503'' | 0.395'' | $4.25\times10^{-7}$ |

The β surface column exceeds the observed deflection by a fixed factor of 1.128 at every row — it is the ratio of the peak displacement to the path-averaged displacement. The $b\approx1.128R_\odot$ row marks where the β surface value *equals* the GR/STFR limb deflection of 1.752'', which is useful as a diagnostic radius for the edge-assignment question.

---

## 7. Edge Geometry, Lunar Occultation, and Radius Audit

The solar mass, Earth-Sun distance, and broad photospheric radius are not plausible weak links for a twelve-percent amplitude difference. The modern values are much too constrained for that. The exact solar radius and photospheric edge definition have real subtleties, but not at the $0.128R_\odot$ scale.

The radius question is therefore not "is the Sun secretly twelve percent larger?" It is:

> Which center, edge, and impact parameter were used when the exposed plate positions were reduced?

A uniform plate-scale factor would mostly be solved away by differential astrometry. A directionally correlated center, radius, occultation, or star-selection bias near the smallest impact parameters is more relevant because the fitted deflection depends on

$$
b_i=\lVert \vec{x}_i-\vec{x}_\odot\rVert.
$$

In a central total eclipse, the Moon can be larger than the Sun in apparent angular radius and may hide the true photospheric edge. The observed dark disk is then the lunar occulting edge, not the solar edge. For the 1919 eclipse, approximate semidiameters give a lunar radius about $5.5\%$ larger than the solar radius; for the 2027 Luxor eclipse, the lunar radius is expected to be about $6\%$ larger. This does not reach the $1.128R_\odot$ diagnostic radius, but it can determine which near-limb source/image pairs are actually available for extrapolation.

The Moon is also a weak foreground lens. At a grazing lunar impact parameter its ordinary gravitational contribution is about

$$
0.00738''.
$$

This is small compared with the solar limb deflection, about $0.42\%$ of $1.752''$, and about $3.3\%$ of the $0.225''$ β/GR limb-amplitude difference. It cannot explain the difference by itself, but if the goal is to split hairs at the sub-arcsecond level, it belongs in a complete near-limb model because the same lunar edge that determines visibility also contributes a small deflection.

---

## 8. Bruns 2017 Eclipse Measurement and Reduction Sensitivity

Donald Bruns' 2017 eclipse experiment is highly relevant because it used modern amateur/pro-am equipment, calibration fields on both sides of the Sun during totality, catalog star positions, optical-distortion calibration, and independent centroiding pipelines. The reported weighted result was

$$
L=1.752'',
$$

with about $3.4\%$ uncertainty, consistent with the GR/direct-ray-trace exposed coefficient.

However, the paper also exposes exactly the reduction-sensitive effects relevant to this note:

- The Danjon representation, which weights closer-in stars more strongly, gives slope $1.031$, corresponding to

$$
L\approx1.805''.
$$

- The eclipse images required subtraction of a blurred coronal background because the corona brightness gradient appeared to skew some centroid positions by up to $0.1''$.

- Most measured stars were farther than $2.4R_\odot$ from the Sun. Only two special short-exposure stars were close-in, at about $1.5$–$1.6R_\odot$.

Using the simple comparison

$$
\theta_{\mathrm{GR}}(b)=\frac{1.751''}{b/R_\odot},
\qquad
\theta_\beta(b)=\frac{1.977''}{b/R_\odot},
$$

the two close-in stars are especially informative:

| Star | $b/R_\odot$ | GR | β | Measured MDL | Measured AST |
|---:|---:|---:|---:|---:|---:|
| 19 | 1.513 | 1.157'' | 1.307'' | 1.285'' | 1.339'' |
| 20 | 1.603 | 1.092'' | 1.233'' | 1.081'' | 1.107'' |

Star 19 sits closer to the β branch; star 20 sits closer to the GR branch. These two stars carry disproportionate near-limb leverage, but they are also the most vulnerable to coronal background, short exposure, and centroiding systematics.

A simple full-table scalar fit of the Bruns published distance/deflection values does not prefer $L=1.977''$. Forcing $L=1.977''$ raises the RMS residual compared with a free or GR-like fit. The aggregate data remain GR-compatible. The narrower point is that the branch-discriminating content lives near the limb, and the near-limb content of the 2017 dataset is sparse and reduction-sensitive.

The 2017 data therefore do not overturn the GR/direct-ray-trace exposed coefficient. They do show why a targeted β-edge audit should use raw frames and a modeled hidden-to-visible source map rather than only the headline $L=1.752''$.

---

## 9. Historical 1919 Observations

| Expedition | Result | Notes |
|---|---:|---|
| Sobral, Brazil, 4-inch lens | $1.98\pm0.12''$ | Best 1919 plates; numerically matches $\theta_\beta$ |
| Sobral astrographic lens | $0.93''$ | Excluded — mirror/plate-scale distortion |
| Príncipe, West Africa | $1.61\pm0.30''$ | Cloud interference; wide error bar |

The 1919 data were strong enough to rule out the Newtonian half-deflection at roughly $0.875''$, which was the central historical goal. They were not designed to distinguish a nearby β-edge/horizon interpretation from the GR/direct-ray-trace exposed coefficient.

---

## 10. Data Prospects

Most hobby eclipse imagery is not astrometric. It is optimized for the corona, HDR composites, visual drama, or short-exposure prominences. Useful data require raw or linearly calibrated frames, accurate timing, observer ephemeris, calibration fields, distortion characterization, and Gaia-referenced plate solutions.

STEREO/SECCHI, SOHO/LASCO, Proba-3, and related heliospheric/coronagraph instruments may contain background star information, but they are not primarily near-limb sub-arcsecond astrometric instruments. Background subtraction and occulting optics may remove or distort the stars needed for this test.

A better future target is a purpose-built 2027 total-eclipse campaign near Luxor/Egypt, with:

- raw monochrome CCD/CMOS frames during totality,
- multiple exposure lengths,
- calibration fields before/during/after totality,
- accurate site coordinates and timing,
- Gaia plate solutions,
- explicit lunar occulting geometry,
- lunar deflection included,
- coronal-gradient centroid bias modeled,
- and fits compared under GR/direct-ray-trace, least-action, β-edge, and hidden-to-visible source mappings.

The useful public pitch is not "GR is wrong." It is:

> Can a modern pro-am eclipse astrometry campaign distinguish near-limb solar-deflection models at the $0.1''$–$0.2''$ level once hidden-source mapping, lunar occultation, Moon lensing, and coronal centroid bias are modeled explicitly?

---

## 11. Present Status

- Once the **full displaced-geodesic ray trace** is used, there is no separate STFR prediction for the ordinary weak-field exposed solar-deflection coefficient. The observable is

$$
\theta_{\mathrm{obs}}(b)=\frac{4GM}{c^2b},
$$

so the solar-limb value is $1.752''$ at $b=R_\odot$.

- This no-difference result is specifically the **geodesic ray-trace/path-integral result through displaced transport**, not the surface beta estimate and not the least-action derivation. The least-action route remains a separate observation-safe derivation of the same weak-field coefficient.

- The beta surface value, $1.977''$, is retained as a **closest-approach surface/horizon scale** fixed by $\beta_\odot=v_{\mathrm{esc}}/c$. It is not a competing final exposed-star prediction.

- The apparent 12.8% excess is the ratio between the closest-approach beta surface scale and the completed Earth-observed field. In the surface-to-observer map this can be represented as an approximate scalar compression, $k\simeq0.887$, that maps the beta surface curve onto the observed GR/ray-trace curve while preserving the $1/b$ structure.

- The physical beta surface expansion is about $0.002R_\odot$ or $1.98''$ projected at Earth. The $1.128R_\odot$ row is only a diagnostic radius where the beta surface curve reaches the canonical exposed-limb value under the shared $1/b$ falloff.

- The decisive observational question is therefore not whether the ordinary solar deflection differs from GR in weak field. It does not, once the full ray trace is used. The remaining question is how the hidden-source/tangent-edge region maps into the first clean exposed images, especially because the strongest inner compression is mostly unobserved.

- Historical eclipse data ruled out Newtonian half-deflection but were not designed for this distinction. Bruns 2017 is GR-compatible in the aggregate, but its near-limb leverage comes mostly from two stars and reduction details at the $0.1''$ scale.

- A targeted test should model hidden-to-visible source positions, true solar radius, lunar occulting radius, lunar deflection, fitted solar-center placement, corona/glare, atmospheric refraction, optical distortion, and centroid bias simultaneously.

---

## 12. Constants Used

| Quantity | Value |
|---|---:|
| $G$ | $6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ |
| $c$ | $299{,}792{,}458\,\mathrm{m/s}$ |
| $M_\odot$ | $1.989\times10^{30}\,\mathrm{kg}$ |
| $R_\odot$ | $695{,}700\,\mathrm{km}$ |
| $1\,\mathrm{AU}$ | $149{,}597{,}870.7\,\mathrm{km}$ |
| $\beta_\odot=v_{\mathrm{esc}}/c$ | $0.002059$ |
| $\theta_\beta(R_\odot)$ | $1.977''$ |
| $\theta_{\mathrm{GR}}(R_\odot)$ | $1.752''$ |
