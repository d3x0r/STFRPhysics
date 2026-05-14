# Cluster Lensing After Halo-Free Rotation Curves

## A Forward-Model Diagnostic in the Displacement Framework

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447

---

## Abstract

A prior displacement-framework study, *Galaxy Rotation Curves Without Dark Matter: The Displacement Framework Applied to 177 Galaxies* (DOI: 10.5281/zenodo.20131281), applied a constrained radial occupancy model to the SPARC rotation-curve sample together with the Milky Way and M31, reporting halo-free fits across 177 systems. The present note takes that galactic-scale result as prior work and turns to a separate evidence class: cluster lensing. The aim is not to claim that cluster lensing has already been closed within the framework, but to specify the correct diagnostic. Weak-lensing mass maps are not primitive observations of matter; they are inverse reconstructions from small statistical distortions of background-galaxy shapes under an assumed gravitational response kernel. In the displacement framework, the relevant comparison should instead be forward-mode: visible galaxy and plasma distributions are used to compute a projected displacement and shear-like field, which is then compared against the observed background-galaxy ellipticity statistics. Bullet-like merger systems are therefore treated as separation tests, not empty-space tests. The question is whether the observed shear amplitude and morphology require an additional collisionless mass component, or whether the displacement response of the visible galaxy-associated sources produces the required projected field without a separate dark halo.

**Keywords:** cluster lensing, weak lensing, Bullet Cluster, dark matter, displacement framework, forward modeling, galaxy rotation curves, shear reconstruction

---

## 1. Introduction

Dark matter is inferred from several different observational classes, but those classes do not all have the same logical status. Galaxy rotation curves, cluster weak lensing, and the cosmic microwave background each involve different measurements, different inverse problems, and different levels of model dependence.

Galaxy rotation curves are dynamical measurements interpreted through a gravitational response law. In the Newtonian spherical approximation, the observed circular speed is inverted into enclosed mass by

\[
M(<r)=\frac{v^2r}{G}.
\]

That expression is not an observed mass. It is the mass required under the Newtonian enclosed-mass response. If the response kernel differs, the inferred mass distribution also differs.

The displacement framework directly challenges that galactic-scale inference. In the prior rotation-curve study, bounded galaxy occupancy profiles were passed through the framework's displacement response and fitted to 177 observed galaxy rotation curves without invoking extended dark halos. That result removes the need to treat galactic dark halos as a fixed prior when approaching cluster lensing.

Cluster lensing is a different problem. Weak-lensing maps are commonly presented as mass maps, but they are reconstructed products. The measured data are small coherent distortions in background-galaxy shapes. Since the intrinsic orientation and ellipticity of any individual background galaxy are unknown, the lensing signal emerges statistically. The resulting projected mass map is therefore an inverse reconstruction under an assumed response kernel, not a direct photograph of unseen matter.

The present note argues that cluster lensing should be re-evaluated by forward computation in the displacement framework. Rather than taking an existing mass reconstruction and asking where dark matter must be placed, one should begin with the visible galaxy and plasma distributions, compute the projected displacement field, lens a synthetic or observed background source catalog through that field, and compare the resulting ellipticity statistics with observation.

This note is intentionally limited. It does not claim that cluster lensing is solved. It defines the correct test and reports the current exploratory simulator used to expose the relevant geometry.

---

## 2. Prior Work: Halo-Free Rotation Curves

The rotation-curve branch is treated here as prior work. The present note does not re-fit galaxy rotation curves or re-derive the displacement response used there. It relies on the result reported in *Galaxy Rotation Curves Without Dark Matter: The Displacement Framework Applied to 177 Galaxies* (DOI: 10.5281/zenodo.20131281).

That study applied the displacement framework to the SPARC sample of 175 galaxies together with the Milky Way and M31. Each system was fitted using a constrained radial occupancy profile with bounded support. No dark-matter halo was invoked. The result was presented as an empirical test of whether the framework's velocity response could reproduce observed rotation curves from the galaxy's own mass distribution.

The importance of that prior result for the present note is not merely that it provides good rotation-curve fits. Its importance is that it breaks a common dependency in dark-matter reasoning. Cluster lensing is often interpreted after galactic dark halos have already been accepted as necessary from rotation curves. If rotation curves no longer require extended halos within the displacement framework, cluster lensing can be treated as an independent forward-propagation diagnostic rather than as a consistency check on halo masses inferred elsewhere.

The logical relation is therefore:

1. The prior paper addresses the galactic rotation-curve evidence.
2. The present note addresses the cluster-lensing evidence.
3. The cluster-lensing question is not whether standard halo models can fit lensing maps, but whether the displacement response from visible sources can reproduce the weak-lensing observables.

---

## 3. Why Cluster Lensing Requires Forward Modeling

A standard weak-lensing analysis proceeds schematically as

\[
\text{observed ellipticity field}
\rightarrow
\text{lensing shear field}
\rightarrow
\text{projected potential}
\rightarrow
\text{projected mass map}.
\]

This is an inverse problem. The final mass map is not directly imaged. It is inferred from the shear field under a lensing kernel and a gravitational response model.

The displacement-framework diagnostic should run in the opposite direction:

\[
\text{visible galaxy/plasma distribution}
\rightarrow
\text{projected displacement field}
\rightarrow
\text{deflection/shear field}
\rightarrow
\text{synthetic background-galaxy distortions}
\rightarrow
\text{comparison with observed ellipticity statistics}.
\]

This distinction is essential. If the response kernel differs from the standard Newtonian/GR mass inversion, then interpreting a weak-lensing reconstruction as a literal mass map may import the assumption that the test is meant to examine.

The displacement framework therefore should not be judged by whether it can reproduce a pre-inferred dark-matter map point by point. It should be judged by whether its forward-computed lensing observables match the measured background-galaxy distortions.

---

## 4. Bullet-Like Systems as Separation Tests

The Bullet Cluster and similar merging systems are often summarized as showing lensing mass separated from baryonic matter. That summary is too compressed for the diagnostic needed here.

The lensing peaks in Bullet-like systems are not in source-free empty space. They are broadly associated with the collisionless galaxy components of the merging clusters. The dominant X-ray plasma, by contrast, is slowed and displaced by ram pressure during the merger. The observational separation is therefore not simply between "matter" and "no matter." It is between the galaxy-associated collisionless component and the collisional plasma component.

The standard interpretation is that the galaxies themselves do not contain enough baryonic mass to account for the lensing amplitude. Therefore a dominant collisionless dark-matter component is inferred near the galaxy concentrations.

The displacement-framework question is narrower and more diagnostic:

> Does the observed weak-lensing shear require an additional collisionless mass component, or does the displacement response of the visible galaxy-associated mass produce the required projected field without a separate dark halo?

This reframing matters because adding dark halos near the same locations as the galaxy concentrations may change the amplitude and reach of the lensing field without changing its basic topology. In that case, the crucial distinction is quantitative rather than positional. The simulator should therefore compare not only contour locations but also shear amplitude, saddle structure, bridge structure, and reconstructed ellipticity fields.

Four source controls are useful:

1. **Galaxies only:** compact collisionless member-galaxy sources.
2. **Gas only:** broad plasma/X-ray baryonic component.
3. **Galaxies + gas:** visible baryonic source model.
4. **Galaxies + gas + conventional dark halos:** standard comparison control.

If the topology differs strongly, the dark-halo interpretation is strengthened. If the topology remains similar and only amplitude changes, the displacement kernel remains a live alternative and the test must move to full-resolution shear statistics.

---

## 5. Open-Source Diagnostic Simulator

A live exploratory simulator for the cluster-lensing diagnostic is hosted with the project at:

https://d3x0r.github.io/STFRPhysics/AI/cluster_lens.html

The simulator is not presented as an observational closure test. Its purpose is to expose the forward-mode geometry. Starting from galaxy-scale sources, plasma-like components, and optional conventional dark-halo controls, it renders angular deflection, grid distortion, caustic or near-caustic diagnostics, and iso-displacement profiles.

The current simulator includes interactive presets for single-source, binary-source, Bullet-like, Einstein-cross, and rich-cluster configurations. Users can add or remove mass components, compare baryonic and dark-source controls, and inspect how the projected field changes under different source assumptions.

The tool is useful because it makes the distinction between morphology and amplitude visible. In Bullet-like configurations, galaxy-associated sources already produce barbell, saddle, bridge, and long-axis structures. Adding conventional dark components at the same broad source locations tends to increase magnitude and reach rather than producing an entirely unrelated topology. This suggests that the decisive question is not merely where the contours appear, but whether the amplitude and weak-shear statistics close under the displacement response without the additional mass component.

The simulator remains exploratory. The next required step is to replace visual grids with synthetic or observed background-galaxy catalogs and compare ellipticity fields directly.

---

## 6. Required Observational Test

The correct observational test is a catalog-level forward-lensing comparison.

An adequate test would require:

- a projected visible-source model, including member galaxies and plasma/X-ray gas;
- angular diameter distances and source-redshift distributions;
- a background source catalog or synthetic background source field;
- the displacement-framework projected deflection and shear field;
- conventional GR/Newtonian controls with and without dark halos;
- an inversion or reconstruction step comparable to that used in weak-lensing observations.

The most important test is not whether hand-drawn contours look similar. It is whether synthetic galaxies lensed through the displacement field, when processed through a standard weak-lensing reconstruction pipeline, produce apparent mass peaks or shear structures comparable to the observed maps.

A strong result would have the form:

> When background galaxies are lensed through a baryon-only displacement field and then passed through a standard weak-lensing reconstruction, the resulting inferred mass map displays separated peaks or long-axis shear features similar to those attributed to dark matter.

Such a result would not automatically close the case, but it would demonstrate that at least part of the dark-matter inference may be a response-kernel artifact rather than direct evidence for unseen mass.

Conversely, if the baryon-only displacement field fails to reproduce the observed shear amplitude or ellipticity correlations at observational scale, then cluster lensing remains evidence for an additional component or for missing physics in the displacement model.

---

## 7. Relation to Prior Cluster-Lensing Reanalyses

Some prior cluster-lensing discussions have explored whether more of the observed lensing can be accounted for by matter associated with the galaxies themselves, rather than by a dominant smooth dark halo. Such approaches face a standard objection: even if they help cluster lensing, they do not solve galaxy rotation curves.

The displacement framework changes that context. Since the prior 177-galaxy rotation-curve study already reports halo-free fits at galactic scale, cluster lensing can be revisited without relying on dark halos as a prior necessity from rotation curves.

This does not solve cluster lensing by itself. It removes one reason for dismissing galaxy-associated or baryon-forward lensing models before the forward calculation is performed.

---

## 8. CMB Status

The cosmic microwave background remains outside the scope of the present diagnostic. The displacement framework does not yet provide a complete replacement pre-recombination perturbation calculation.

The CMB evidence for dark matter is also model-mediated. It is not an image of particulate dark matter, but an inference from acoustic peak structure, polarization, damping-tail physics, lensing, and large-scale consistency under a cosmological model. A displacement-framework treatment would need to address at least:

- photon-baryon acoustic phase and amplitude;
- baryon loading and pressure support before recombination;
- displacement-field propagation and persistence before recombination;
- CMB lensing and late-time structure growth;
- cross-correlation with observed matter distributions.

Until such a perturbation calculation exists, the CMB should be listed as an open branch rather than claimed as solved.

---

## 9. Discussion

The displacement framework currently challenges dark matter most strongly in galaxy rotation curves. That branch has a dedicated empirical apparatus and a reported 177-galaxy result. Cluster lensing is not yet at the same stage. It is a forward-model diagnostic under development.

The central methodological claim of this note is that weak-lensing mass maps should not be treated as primitive evidence against the displacement framework. They are inverse reconstructions under a gravitational kernel. If the kernel changes, the reconstruction must be redone at the observable level.

Bullet-like systems are especially useful because they test separation between collisional plasma and collisionless galaxy components. But they should not be described as showing lensing peaks in source-free regions. The peaks are associated with galaxy components. The unresolved question is whether visible galaxy-associated sources produce sufficient shear amplitude under the displacement response.

The simulator shows that the relevant projected structures are present qualitatively. The remaining work is quantitative: source catalog, PSF/noise treatment, redshift distribution, non-exaggerated angular scale, and comparison to observed weak-lensing ellipticity statistics.

---

## 10. Conclusion

Dark matter is not directly observed in either galaxy rotation curves or weak-lensing mass maps. It is inferred through response kernels. The prior displacement-framework rotation-curve study reports that the galactic inference changes under a different response kernel, allowing 177 galaxies to be fitted without extended dark halos.

The next evidence class is cluster lensing. This note argues that cluster lensing should be tested by forward displacement modeling, not by reinterpretation of already-inverted mass maps. Visible galaxy and plasma distributions should be used to compute the projected displacement field, lens background sources, and compare the resulting shear statistics with observations.

The present cluster-lensing branch remains open. Its current contribution is diagnostic: it identifies the correct observable, provides an open simulator for exploring the geometry, and clarifies why Bullet-like systems are amplitude and shear-statistics tests rather than simple empty-space mass tests.

---

## References

Buckeyne, J. *Galaxy Rotation Curves Without Dark Matter: The Displacement Framework Applied to 177 Galaxies*. Zenodo, 2026. DOI: 10.5281/zenodo.20131281.

Live simulator: https://d3x0r.github.io/STFRPhysics/AI/cluster_lens.html
