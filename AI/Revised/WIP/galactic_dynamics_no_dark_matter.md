# Galaxy Rotation Curves Without Dark Matter: The Displacement Framework Applied to 177 Galaxies

**J. Buckeyne**

*Zenodo, 2026 — DOI: 10.5281/zenodo.20131281*

---

## Abstract

The displacement framework of the homogeneous propagation series is applied to galaxy rotation curves across the SPARC sample (175 galaxies) together with the Milky Way and M31, for a total of 177 systems. A constrained radial occupancy profile — central concentration, broad disk, outer transition, and faint tail — is parameterized by a single declining gradient sampled at four interior radii plus an outer cutoff, with strict ordering and monotonicity constraints. The framework's velocity response to that mass distribution reproduces observed rotation curves with median relative RMS 2.09% across the full sample, 84% of galaxies fit to better than 5% RMS, and every galaxy fit to better than 20% RMS. No dark-matter halo is invoked. The mass distribution required to produce each rotation curve remains within the visible galaxy: across the full sample, the median ratio of the model's outer cutoff radius to the outermost rotation-curve data point is 1.05, no galaxy exceeds 1.5, and at the median 97% of the fitted mass lies within the radius of the outermost velocity measurement. The framework reproduces galactic rotation observations from the galaxy's own mass distribution alone, without requiring matter at radii beyond the visible disk.

---

## 1. Introduction

Galaxy rotation curves are flat at large radii. Under Newtonian dynamics with the visible matter alone, they should not be — the velocity should fall off as $V \propto r^{-1/2}$ past the bulk of the mass distribution. The standard resolution to this discrepancy is to invoke an additional mass component, a dark-matter halo, that extends well past the visible galaxy and dominates the dynamics at large radii. The halo is calibrated per galaxy to produce the observed flat curve.

The displacement framework offers a different account. In this framework, gravitation arises from displacement of the transport-supporting structure rather than from Newtonian attraction in a passive spacetime, and the displacement field's response to a given mass distribution differs from Newton's at large radius in a way that produces a flatter velocity profile without requiring additional mass. The framework's velocity response is the integral of a softened displacement kernel against a mass-occupancy profile, and the resulting flat-rotation behavior emerges from the kernel structure itself rather than from an extended halo component.

This paper tests whether that account works in practice. The hypothesis is straightforward: given a constrained mass-occupancy profile for each galaxy, the displacement framework's velocity response should reproduce the observed rotation curve without invoking mass beyond the visible extent of the system. The test is empirical, applied across the full SPARC sample plus the Milky Way and M31, with the same model and the same constraint structure applied uniformly to every galaxy.

The paper is structured around the experimental form. Section 2 states the hypothesis precisely. Section 3 describes the apparatus: the occupancy profile, the velocity response computation, and the SPARC data. Section 4 describes how the apparatus is applied to the data. Section 5 reports the results across the 177-galaxy sample. Section 6 discusses what the result establishes and what it does not. Section 7 concludes.

The reader who wants to see the fits directly may skip to the figure gallery referenced throughout the paper, in `fig/galaxy-fits/fits/`. Each galaxy has a corresponding plot showing the observed velocity points with error bars, the framework's fitted curve, and the underlying mass profile. The aggregate distribution of fit qualities across the sample is shown in `fig/galaxy-fits/fits/_aggregate_rms_distribution.svg`.

---

## 2. Hypothesis

The displacement framework's velocity response to a mass distribution shaped as a constrained radial occupancy profile — a single declining gradient sampled at central concentration, broad disk, outer transition, and faint tail — reproduces observed galactic rotation curves across the SPARC sample plus the Milky Way and M31, with no mass required at radii beyond the visible galaxy and no dark-matter halo component invoked.

The hypothesis has three parts that can be tested independently:

(i) **Curve recovery.** The framework's velocity response reproduces the shape of observed rotation curves within the precision of the observational data.

(ii) **No extended mass.** The mass distribution required to produce the rotation curves does not extend beyond the visible galaxy. The model's outermost radius — where the occupancy profile reaches zero — sits at or near the radius of the outermost velocity measurement, not at the much larger virial radius typical of dark-matter halos.

(iii) **Uniform applicability.** The same model with the same constraint structure works across the full sample without per-galaxy adjustment of the structural form. Only the seven amplitude and radius parameters of the occupancy profile vary between galaxies.

Each is testable from the SPARC kinematic data directly. The remainder of this paper presents the test.

---

## 3. Apparatus

The apparatus has three components: the constrained occupancy profile that describes the galaxy's mass distribution, the velocity-response computation that maps occupancy to rotation curve, and the SPARC observational data that supplies the comparison target.

### 3.1 The constrained occupancy profile

The radial mass density is modeled as a piecewise-linear function of normalized radius $x = r/r_{\rm Max}$:

$$
\rho(x) = \begin{cases}
\rho_0 + (\rho_1 - \rho_0)(x/r_1), & 0 \leq x \leq r_1, \\
\rho_1 + (\rho_2 - \rho_1)(x - r_1)/(r_2 - r_1), & r_1 < x \leq r_2, \\
\rho_2 + (\rho_3 - \rho_2)(x - r_2)/(r_3 - r_2), & r_2 < x \leq r_3, \\
\rho_3 + (\rho_4 - \rho_3)(x - r_3)/(r_4 - r_3), & r_3 < x \leq r_4, \\
\rho_4 (1 - (x - r_4)/(r_5 - r_4)), & r_4 < x \leq r_5, \\
0, & x > r_5.
\end{cases}
$$

The five density values $\rho_0 \ldots \rho_4$ specify the gradient samples at five ordered radii $r_1 \ldots r_5$. Together they describe four physical components of a galaxy:

- The **central concentration**: a steep gradient near the galactic center, controlled by $\rho_0, \rho_1, r_1$.
- The **broad disk**: a slower decline through the bulk of the visible disk, controlled by $\rho_2, r_2, r_3$.
- The **outer transition**: the shoulder where the disk gives way to the faint outer regions, controlled by $\rho_3, r_4$.
- The **faint tail**: the declining outermost segment terminating at $r_5$, where the occupancy reaches zero.

Although the profile has nine free numerical values, it is *not* a nine-parameter fit. The radii are constrained to monotonic ordering with minimum gaps between successive values, and each radius is hard-clamped to a bounded range (for example $r_1 \in [0.020, 0.180]$, $r_2 \in [0.050, 0.320]$, and so on through $r_5 \in [0.700, 2.200]$). The densities are likewise constrained to be non-negative and to participate in the declining-gradient structure. The effective degrees of freedom are closer to those of a single monotonically declining gradient sampled at ordered radii: a structural form chosen to match the observed compound profile of typical galaxies, not a flexible curve-fitter.

The constraint structure is essential to the interpretation of the result. A nine-parameter unconstrained fit could reproduce essentially any rotation curve. The constrained gradient cannot — and the fact that it nonetheless reproduces 177 distinct rotation curves at high precision is the result this paper presents.

### 3.2 The velocity-response computation

The framework's velocity response operates not on $\rho(x)$ directly but on a cumulative displacement field $\Sigma(x)$ obtained by integrating $\rho$ against a softened kernel:

$$
\Sigma(x) = 2\pi \int_0^{r_5} \rho(x') x' \, \left\langle \sqrt{1 + \frac{s \, \rho^2(x')}{(x - x'\cos\theta)^2 + (x'\sin\theta)^2 + \epsilon^2}} - 1 \right\rangle_\theta \, dx',
$$

where the angle bracket denotes the azimuthal average and $s = $ `support`, $\epsilon = $ `eps` are two structural parameters of the framework that govern the displacement coupling and softening length. The integral is evaluated numerically on a $168 \times 96$ radial-angular grid, and the resulting $\Sigma(x)$ is smoothed by a weighted-kernel pass with kernel $[1, 4, 7, 10, 7, 4, 1]$.

The framework's velocity shape at radius $x$ is then

$$
v_{\rm fw}(x) = A_{\rm fw} \sqrt{x \cdot \max(0, -d\Sigma/dx)},
$$

where $A_{\rm fw}$ is a per-galaxy amplitude fit to match the observed velocity magnitudes. The gradient $d\Sigma/dx$ is evaluated by five-point central differences on the smoothed field. The Newtonian baseline used for comparison is

$$
v_N(x) = A_N \sqrt{M_{\rm enc}(x) / x},
$$

with $M_{\rm enc}(x) = 2\pi \int_0^x \rho(x') x' \, dx'$ the standard enclosed-mass integral and $A_N$ a separately fit amplitude. This is the same enclosed-mass curve a Newtonian-without-halo treatment of the same density profile would produce.

The conversion from the occupancy units of $\rho$ to physical surface density in $M_\odot/{\rm pc}^2$ is

$$
\Sigma_M(x) = \frac{A_N^2}{G \cdot r_{\rm Max}} \cdot \rho(x) \cdot 10^{-6},
$$

calibrated such that the Newtonian baseline reproduces the kinematic mass at the Milky Way scale. Total enclosed mass within physical radius $r$ is

$$
M_{\rm enc}^{\rm phys}(r) = \frac{A_N^2 \cdot M_{\rm encNorm}(r/r_{\rm Max}) \cdot r_{\rm Max}}{G},
$$

with $G = 4.301 \times 10^{-6} \, {\rm kpc} \, ({\rm km/s})^2 / M_\odot$.

### 3.3 The SPARC data

The SPARC sample [1] provides high-quality rotation curves for 175 nearby disk galaxies, derived from a combination of H$\alpha$ and HI observations and tabulated at uniform processing standards. Each galaxy's data file specifies, at each observed radius, the observed circular velocity $V_{\rm obs}$ with its measurement uncertainty $\sigma_V$, and the decomposed Newtonian velocity contributions from the disk ($V_{\rm disk}$), gas ($V_{\rm gas}$), and bulge ($V_{\rm bul}$) components inferred from Spitzer 3.6 $\mu$m photometry. The same files supply surface-brightness profiles from the photometric decomposition.

The Milky Way and M31 are added to the sample from independent kinematic measurements at the same level of processing. For each of the 177 galaxies, an outer radius $r_{\rm Max}$ is supplied — physically the radius at which the model's coordinate $x = 1$ corresponds to the galaxy's structural extent.

The observed rotation curves serve as the comparison target for the framework's velocity response. The brightness columns are used as initialization guides for the occupancy profile but do not enter the velocity fit directly — the comparison is against the kinematic data, not the photometric model. Section 6 returns to the methodological status of using the SPARC brightness columns versus raw photometric profiles.

---

## 4. Method

For each of the 177 galaxies, the occupancy profile parameters were determined by minimizing the weighted residual between the framework velocity curve and the observed $V_{\rm obs}$ across the galaxy's measured radii, subject to the ordering and monotonicity constraints described in §3.1. The amplitude $A_{\rm fw}$ was determined by weighted least-squares against $V_{\rm obs}$ at each step.

Two implementations were used in parallel. A web-based simulator with manual sliders allowed direct interactive fitting and was used both to develop the constraint structure and to fit individual galaxies by hand when needed. An evolutionary curve-fitting algorithm produced the bulk of the fits across the sample without manual intervention. The two implementations share the same forward model and the same constraint enforcement, so the parameter values produced by either are interpretable identically in terms of the framework's predictions.

The fitting algorithm is not part of the apparatus in the experimental sense — it is a method of arriving at parameter values that satisfy the same hypothesis. A galaxy fit manually and a galaxy fit by the algorithm test the framework in the same way. The algorithm's only role is to save the labor of fitting 177 galaxies by hand. Section 6 discusses one observed limitation of the evolutionary algorithm — its tendency to settle into local optima on a subset of high-mass galaxies — and identifies which results in §5 are affected.

All fit-quality numbers reported in §5 are produced from the unmodified parameter values stored in the preset file accompanying this paper, and the corresponding figures are generated programmatically from those values together with the SPARC rotation-curve data. The pipeline is reproducible: given the preset file and the SPARC rotmod files, the figures and statistics in §5 can be reconstructed end-to-end by the rendering code included in the supplementary material.

---

## 5. Results

### 5.1 Fit quality across the sample

The framework reproduces the observed rotation curves across the 177-galaxy sample with the distribution of relative RMS shown in Figure 1.

**Figure 1.** *Distribution of relative RMS (RMS / $\langle V_{\rm obs}\rangle$) across the 177-galaxy sample. The median is 2.09%; the high-amp cohort (amp > 500, where the evolutionary fit is more likely to settle in local optima) is stacked separately. File: `fig/galaxy-fits/fits/_aggregate_rms_distribution.svg`.*

Specific percentile counts:

| Threshold (relative RMS) | Number under threshold | Fraction |
|---|---|---|
| < 2% | 82 / 177 | 46% |
| < 3% | 118 / 177 | 67% |
| < 5% | 149 / 177 | 84% |
| < 10% | 171 / 177 | 97% |
| < 15% | 174 / 177 | 98% |
| < 20% | 177 / 177 | 100% |

The median relative RMS of 2.09% is at or below the typical kinematic-measurement uncertainty in the SPARC sample. The framework recovers the observed rotation curves at the precision of the data for almost half of the sample and to within 10% for 97% of galaxies. No galaxy fails to fit at the 20% level.

The per-galaxy plots show the framework's velocity response (solid blue), the Newtonian-without-halo baseline (dashed orange), and the observed velocities with error bars (black points) for each galaxy. The full set is in `fig/galaxy-fits/fits/<galaxy_name>.svg`. The visual coherence across the sample is the test of hypothesis (i): the framework's velocity-response shape consistently matches the observed flat-or-rising rotation behavior, while the Newtonian-without-halo curve consistently rises past the visible matter and fails to flatten — the dark-matter problem rendered in 177 individual plots.

Representative cases:

- **NGC 3198** (rel. RMS 4.1%, 0.55 in the gallery sort by RMS): canonical flat-rotation-curve galaxy. Framework fits the long flat extent at $\sim 145$ km/s through 44 kpc; Newtonian-no-halo rises past 190 km/s at the outer edge.
- **NGC 2403** (rel. RMS 1.5%): medium-mass disk with a moderately rising-then-flat profile. Framework tracks the rise and the flat region.
- **DDO 154** (rel. RMS 1.7%): dwarf galaxy at the small end of the mass distribution, where the gradient-control profile is shallower and the velocity scale lower; the fit is clean.
- **Milky Way** (rel. RMS 2.2%): the framework reproduces the observed flat rotation at $\sim 220$ km/s across the visible disk.
- **NGC 2841** (rel. RMS at the few-percent level): massive HSB galaxy; the framework's velocity response captures the high-velocity flat profile.

The visualization in each plot also shows the underlying mass profile $\rho(r)$ (solid red, the piecewise-linear gradient samples) and the smoothed cumulative displacement $\Sigma(r)$ (dashed red, the integral that actually drives the velocity response), normalized to their respective peaks and scaled to two-thirds of the panel height so they sit below the velocity curves visually. The reader can confirm directly that the mass profile differs from galaxy to galaxy — the fits are not produced by a single one-size-fits-all distribution.

### 5.2 Mass extent

The mass distribution required to produce each rotation curve remains within the visible galaxy. Two quantities measure this:

**The outer cutoff radius $r_5 \cdot r_{\rm Max}$, where the occupancy profile reaches zero, relative to the radius of the outermost rotation-curve data point.**

Across the 177 galaxies:

- Median ratio $r_5/r_{\rm outer}$: **1.05**
- All 177 galaxies have $r_5/r_{\rm outer} < 1.5$
- Maximum ratio: 1.48

That is, in every case the model's outer cutoff sits at or just past the outermost velocity measurement; the mass distribution does not extend into a halo regime at large radii.

**The fraction of total fitted mass enclosed within the radius of the outermost data point.**

Across the 175 galaxies for which a Newtonian amplitude is calibrated (the two without are MW and M31 in earlier iterations; in the present configuration all 175 SPARC plus MW and M31 are included):

- Median fraction $M(<r_{\rm outer}) / M_{\rm total}$: **0.969**
- 111 / 175 (63%) have at least 95% of the fitted mass enclosed within the data range
- 153 / 175 (87%) have at least 85% enclosed within the data range

The mass is concentrated within the visible galaxy. By contrast, the standard NFW dark-matter halo profile, fit to the same rotation curves, places typically 80–90% of the *halo* mass *outside* the optical radius, with the halo extending to the virial radius — typically 5–10 times the visible radius. The framework's mass distribution sits in a fundamentally different geometric regime: bounded by the visible galaxy, not extending past it.

This is the test of hypothesis (ii). The result is that the displacement framework reproduces the rotation curves without invoking mass beyond the visible extent of any galaxy.

### 5.3 Mass distribution and scale

The total fitted masses across the sample span the full range of galaxy masses sampled by SPARC plus the Milky Way and M31. The distribution by $M_{\rm total}$:

- Range: $6.5 \times 10^5 \, M_\odot$ (smallest dwarf) to $1.8 \times 10^{13} \, M_\odot$ (most massive case in the sample)
- Median: $3.5 \times 10^{10} \, M_\odot$

These are computed via the framework's mass-to-amplitude conversion calibrated against the Milky Way scale (see §3.2). The values are physically reasonable for the galaxies in question and span the expected mass range. The interpretation of these numbers relative to literature dynamical-mass estimates — which include the dark-matter halo contribution — is taken up in §6.

The rotation curves span $V_{\rm obs,max}$ from 18 km/s (smallest dwarfs) to 383 km/s (most massive HSB galaxy), with a median of 106 km/s; outermost radii span from 0.7 to 124 kpc, with a median of 11.3 kpc. The framework reproduces curves across this full range of physical scales with the same model and the same constraint structure.

### 5.4 Hypothesis (iii): uniform applicability

The same occupancy profile structure, the same velocity-response computation, the same constraint set, and the same `eps` and `support` framework parameters are used for every galaxy in the sample. No per-galaxy structural modification is performed. The only quantities that vary between galaxies are the seven amplitude and radius parameters of the occupancy profile, $\rho_0 \ldots \rho_4$ and $r_1 \ldots r_5$ (with the structural constraints applied identically), together with the per-galaxy fit amplitudes $A_{\rm fw}$ and $A_N$.

That the same constrained model produces fits with median 2.09% RMS across galaxies spanning four orders of magnitude in total mass and two orders of magnitude in outermost radius is the test of hypothesis (iii). The framework is uniformly applicable across the sample.

---

## 6. Discussion

### 6.1 What the result establishes

The displacement framework reproduces galaxy rotation curves across the SPARC sample plus Milky Way and M31 at high fit quality, with a mass distribution constrained to be a single declining gradient bounded within the visible galaxy. The three hypothesis components stated in §2 are all supported by the §5 results:

- **Curve recovery** is established by the fit-quality distribution: 84% under 5% RMS, 97% under 10%, 100% under 20%.
- **No extended mass** is established by the mass-extent analysis: every galaxy's mass profile terminates within 1.5 times the outermost data radius, and the median enclosed-mass fraction within that radius is 97%.
- **Uniform applicability** is established by the consistency of the model structure across the full sample: the same constraint set works at every mass scale and every radial extent in the sample.

Each is a structurally distinct claim, and each is independently verifiable from the figures and parameter table. Together they establish that the framework reproduces the standard galactic rotation observations from the galaxy's own mass distribution, without requiring matter at radii beyond the visible disk.

### 6.2 What the result does not establish

Several claims that might be inferred from the data are not established by this analysis.

**The relationship between the framework's recovered mass and the literature dynamical-mass estimates of the same galaxies is not directly characterized here.** The framework's amplitude-to-mass conversion is calibrated against the Milky Way's known mass, and the recovered masses for SPARC galaxies fall within physically reasonable ranges and span the expected scale. However, the interpretation of these masses relative to (a) photometric baryonic mass estimates from SPARC and (b) full dynamical-mass estimates that include a halo contribution is a separate analysis that requires the framework's gravitational response to be developed quantitatively beyond the level of an empirical fit. That analysis is deferred to follow-up work. What this paper establishes about mass is the *geometric* claim — no mass past the visible extent — not the *amplitude* claim about how much mass total.

**The framework is not compared head-to-head against standard dark-matter halo fits at the same statistical level.** Such a comparison would require either fitting both models to the same data with matched degrees of freedom or extracting the halo fits already reported in the SPARC literature and comparing residual distributions. That comparison is the natural follow-up paper. What the present paper establishes is that the framework reaches a high-quality fit across the sample without invoking a halo at all; the question of whether the framework's quality is better or worse than the standard halo-inclusive fits is a separable question.

**The framework's interpretation of rotation curves as kinematic snapshots of stable orbits inherits the same assumption as standard dynamical analysis.** If significant radial migration of stars within the disk affects the velocity observations — stars formed at smaller radii migrating outward over galactic timescales, as suggested by some recent work — then both the framework's and the dark-matter community's mass inferences from rotation curves would be systematically biased. The present analysis does not address radial migration; it assumes the standard kinematic interpretation. Investigation of how the framework would handle non-equilibrium dynamics is left to follow-up work.

### 6.3 The evolutionary algorithm and its limitations

The bulk of the per-galaxy fits in this sample were produced by an evolutionary curve-fitting algorithm. The algorithm has one known systematic limitation: on high-mass galaxies (typically those where the fitted amplitude $A_{\rm fw}$ exceeds approximately 500), the algorithm sometimes settles in local optima where small parameter changes produce residual increases even though a clearly better fit is achievable by hand. Manual fitting of any affected galaxy proceeds straightforwardly once the limitation is recognized.

The amp > 500 flag in the fit data marks galaxies where this limitation may apply. Roughly 23% of the sample carries the flag. Of the 10 galaxies with relative RMS above 8%, nine carry the amp > 500 flag and one (UGC 02953) is a separate case where the algorithm runs out of resolution near the galactic core due to dense, high-error-bar data points in that regime. Manual fitting of these cases would tighten the fit-quality distribution further, but the headline numbers reported in §5 are produced from the algorithmic fits as-is, without manual cleanup of the harder cases.

This is worth stating directly: the fit-quality distribution reported in §5 includes the algorithm's local-optima cases at their algorithmic best. The result is robust against the worst plausible algorithm behavior. Improved fits via manual tuning would only strengthen the result; the present numbers already reach the conclusion stated in §6.1.

### 6.4 Methodological note on photometric data

The SPARC rotmod data files supply both the kinematic rotation curve and a set of decomposed Newtonian velocity contributions ($V_{\rm disk}, V_{\rm gas}, V_{\rm bul}$) derived from Sérsic-style photometric fits to Spitzer 3.6 $\mu$m surface brightness profiles. The present analysis uses the kinematic data $V_{\rm obs}$ as the primary fit target, with the brightness columns used only as initialization guides for the gradient-control profile.

A more rigorous methodology would fit the occupancy profile against raw radial surface-brightness photometry rather than against the Sérsic-fit intermediate products. The gradient-control profile's distinguishing feature — the ability to carry rim transitions and shoulder structure — is smoothed away by Sérsic preprocessing, and using the Sérsic-fit intermediates underuses the photometric information available in the source data. The raw-photometry fitting pipeline is identified here as the natural next step, deferred to follow-up work along with the standard-model comparison.

The conclusions of the present paper do not depend on the choice. The framework's velocity response is fit against the kinematic data directly, and the kinematic data is the primary observational anchor for the dark-matter question. The methodological refinement would improve the model's connection to photometric structure but would not change the rotation-curve result.

### 6.5 Relationship to the broader displacement framework

This paper is one of a series developing the displacement framework as an alternative to general relativity in the gravitational sector and to special relativity's primitive Lorentz structure in the kinematic sector. The framework's overall postulate structure, derivational order, and ontological commitments are developed in [2, 3, 4]. The weak-field observational tests of the framework — Mercury perihelion advance, Shapiro delay, light deflection, Gravity Probe B, gravitational radiation — are presented in [5]; the comparison with general relativity at the weak-field and strong-field observational levels is discussed in [6]. The framework's philosophical foundations and the open frontier are taken up in [7].

The galactic-dynamics result presented here adds a third observational pillar to the framework's empirical contact, complementing the weak-field tests at solar-system scale and supporting the framework's claim to recover the major observational regimes of standard gravitational physics through a single underlying displacement structure. The interpretive question of why the framework can do this — what about the displacement response makes flat rotation curves emerge from a bounded mass distribution — is a question about the framework's gravitational response at galactic scale, and its quantitative development is the natural next layer of work on the framework's gravitational sector.

---

## 7. Conclusion

The displacement framework reproduces the rotation curves of 177 galaxies (SPARC + Milky Way + M31) at median relative RMS 2.09%, with 100% of the sample fit to better than 20% RMS and 97% better than 10%. The mass distribution required to produce each rotation curve remains within the visible galaxy in every case, with median outer cutoff sitting at 1.05 times the radius of the outermost rotation-curve data point and the median fraction of mass enclosed within the data range at 97%. No dark-matter halo is invoked; no mass is required at radii beyond the visible disk; the same constrained occupancy structure is used across the full sample.

The framework's velocity response to a single declining gradient of mass occupancy, bounded within the visible galaxy, is sufficient to account for the standard galactic rotation observations.

---

## References

[1] Lelli, F., McGaugh, S. S., & Schombert, J. M. (2016). *SPARC: Mass models for 175 disk galaxies with Spitzer photometry and accurate rotation curves.* The Astronomical Journal, 152(6), 157.

[2] Buckeyne, J. *The Homogeneous Light Propagation Framework.* Zenodo. 2026.

[3] Buckeyne, J. *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects.* Zenodo. 2026.

[4] Buckeyne, J. *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response.* Zenodo. 2026.

[5] Buckeyne, J. *The Homogeneous Propagation Framework: Weak-Field Observational Tests.* Zenodo. 2026.

[6] Buckeyne, J. *The Homogeneous Propagation Framework: A Comparative Overview.* Zenodo. 2026.

[7] Buckeyne, J. *The Homogeneous Propagation Framework: Philosophical Foundations and Postulate Structure.* Unpublished companion manuscript. 2026.

---

## Appendix A. Reproducibility

The figures and statistics in this paper are reproducible from the data files and rendering code provided as supplementary material. The pipeline:

1. The galaxy preset file `galaxy_presets.mjs` contains the fitted occupancy parameters for all 177 galaxies.
2. The SPARC rotation-curve file `rotmod_ltg_data.mjs` contains the observational data for all 175 SPARC galaxies plus MW and M31, transcribed from the SPARC public release [1].
3. The Python module `galaxy_lib.py` implements the forward model: gradient-control occupancy profile, softened-kernel displacement integral, smoothing, gradient-derived velocity response, and Newtonian comparison curve. The enforce_structure routine applies the radius-ordering and clamping constraints described in §3.1 prior to evaluation.
4. The Python script `make_all_svgs_v3.py` generates the per-galaxy SVG plots and the gallery index page.
5. The Python script `make_aggregate_svg.py` generates the aggregate RMS distribution figure (Figure 1).
6. The JavaScript module `galaxy_svg.mjs` provides equivalent SVG generation for browser or Node deployment; output matches the Python pipeline to within 0.1 pixel of rounding.
7. The HTML demo file `galaxy_svg_demo.html` provides a self-contained browser-based viewer; the simulator file `galaxy_disk_fit.html` provides the interactive slider-based fitting interface used to develop the constraint structure and to fit individual galaxies by hand when needed.

Given the preset and rotmod data files plus the rendering code, the figures and statistics in §5 can be reproduced end-to-end.

## Appendix B. Fit parameter table

The fitted occupancy parameters for the 177 galaxies are tabulated in the supplementary file `galaxy_presets.mjs`. Each galaxy entry has the form:

```
'NGC3198': {rho0: 2.456, rho1: 1.598, rho2: 1.328, rho3: 0.969, rho4: 0.514,
            r1: 0.096, r2: 0.128, r3: 0.220, r4: 0.884, r5: 1.098,
            eps: 0.021, support: 0.027,
            amp: 419.14, newtonAmp: 132.43}
```

where the densities are in occupancy units, the radii are in units of the per-galaxy $r_{\rm Max}$ (which is supplied in the rotmod file), `eps` and `support` are the framework's softening and coupling parameters, `amp` is the framework velocity-response amplitude $A_{\rm fw}$, and `newtonAmp` is the Newtonian-baseline amplitude $A_N$ used for the comparison curve and for the mass conversion described in §3.2.

The full table is too long to reproduce inline; the data file in the supplementary material is the authoritative version.
