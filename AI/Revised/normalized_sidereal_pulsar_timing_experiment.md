# A Normalized Sidereal Pulsar-Timing Test for Longitudinal Delay Nulls and Aberrated Source Heading

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States

## Abstract

This note outlines a compact observational proposal based on the homogeneous light propagation framework. Two synchronized detectors are placed at opposite ends of an Earth-scale baseline aligned with the laboratory velocity. Because the baseline is longitudinal, the framework assigns both a length normalization and a distributed clock-field offset across the detector pair. A distant periodic source such as a pulsar is then observed over a full sidereal sweep. The resulting inter-detector timing difference has a maximum and minimum when the source is inline with the velocity axis, and two zero crossings between them. This allows the experiment to determine its own axial phase from the same timing data, without requiring an independently constructed local 90-degree reference. The central claim is that the heading of zero local delay and the finally assigned observed source heading are distinct observables. In the small-
velocity regime, the geometric null shifts from transverse by order \(\beta=v/c\), while the finally observed heading after receiver-local aberration shifts by approximately \(2\beta\). At Earth orbital speed this corresponds to a geometric offset of about 20.5 arcsec and an apparent offset of about 41.0 arcsec.

## 1. Introduction

The homogeneous propagation framework separates three ingredients that are often blended in standard discussions: propagation geometry, distributed clock structure within the moving frame, and endpoint-local aberrational reassignment of the received signal direction. In that staged picture, the direction at which two separated detectors record equal local arrival times is not automatically identical to the direction finally assigned to the received source.

That distinction suggests an observational test. If two detectors are placed on opposite sides of an Earth-scale diameter aligned with the frame velocity, then the detector pair defines a longitudinal baseline. Within the framework, that baseline is both length-normalized and clock-skewed by the same motion. A distant periodic source provides repeated events whose relative arrival times can be compared between the two ends of the baseline as the source heading sweeps through the sky.

The practical obstacle is that an absolute local 90-degree reference is difficult to construct independently from the same moving apparatus. The present note adopts a different operational standard: a **normalized sidereal heading clock**. One full sidereal cycle is mapped to 24 normalized sidereal hours, so the source heading is treated as a direction label rather than primarily as a time label. The experiment then recovers its own inline and transverse phase structure directly from the timing data.

## 2. Baseline geometry and timing model

Let the proper baseline radius be \(R\), so the two detectors would lie at opposite ends of a proper diameter \(2R\). Let the laboratory move at speed \(v\) along the detector axis, with

\[
\beta = \frac{v}{c},
\qquad
\lambda = \sqrt{1-\beta^2},
\qquad
\gamma = \frac{1}{\lambda}.
\]

The framework's longitudinal normalization gives the realized detector radius

\[
R_c = \lambda R.
\]

Place the trailing detector at \(x=-R_c\) and the leading detector at \(x=+R_c\). For a distant source at heading angle \(\alpha\), treated as a plane-wave source, the propagation-only arrival-time difference between the leading and trailing detectors is

\[
\Delta t_{\rm prop}
= t_{\rm lead}-t_{\rm trail}
= -\frac{2R_c\cos\alpha}{c}.
\]

The detector clocks also carry the moving-frame simultaneity slope

\[
t' = \gamma\left(t-\frac{vx}{c^2}\right),
\]

so the local timestamp difference assigned by the separated detectors becomes

\[
\Delta \tau
= \gamma\left(\Delta t_{\rm prop}-\frac{2vR_c}{c^2}\right)
= \gamma\left(-\frac{2R_c\cos\alpha}{c}-\frac{2vR_c}{c^2}\right).
\]

This expression contains two distinct pieces: the propagation geometry and the distributed clock-field offset.

## 3. Null-delay headings

The equal-local-delay condition is obtained from

\[
\Delta \tau = 0.
\]

This yields

\[
\cos\alpha_{\rm null} = -\beta.
\]

Thus the geometric null-delay heading is not exactly transverse. In the low-speed limit,

\[
\alpha_{\rm null} \approx 90^\circ + \beta_{\rm rad},
\]

where \(\beta_{\rm rad}\) is \(\beta\) expressed in radians. More exactly, the two null headings are

\[
\alpha_{\rm null}^{(1)} = 180^\circ - \cos^{-1}(\beta),
\qquad
\alpha_{\rm null}^{(2)} = 180^\circ + \cos^{-1}(\beta).
\]

The same timing curve also gives the inline extrema directly:

- maximum and minimum delay occur at the inline headings,
- the midpoint headings between those extrema define the naive transverse pair,
- the null-delay headings are offset from those midpoint headings by the amount above.

This means the experiment can recover its own phase structure from the same sidereal sweep, rather than requiring an externally calibrated local right angle.

## 4. Receiver-local aberration and the distinct observed heading

In the staged signal picture of the framework, aberration is not folded into the propagation-null condition. It is applied afterward as a receiver-local directional reassignment. Using the standard scalar aberration relation as the angular-magnitude baseline,

\[
\cos\theta' = \frac{\cos\theta-\beta}{1-\beta\cos\theta},
\]

and substituting the geometric null condition \(\cos\theta=-\beta\), one obtains

\[
\cos\theta' = -\frac{2\beta}{1+\beta^2}.
\]

Therefore the finally assigned observed heading corresponding to the null-delay propagation direction is shifted from transverse by approximately twice the low-speed amount:

\[
\theta' \approx 90^\circ + 2\beta_{\rm rad}.
\]

This is the central observational distinction. The geometric direction at which the separated detectors register equal local delay is not the same as the finally assigned observed source heading after the endpoint-local aberration update.

## 5. Normalized sidereal heading clock

To make the comparison operational, define a normalized sidereal heading scale by assigning one full sidereal cycle to 24 normalized sidereal hours. Then

\[
360^\circ \leftrightarrow 24\,{\rm NST\ hours},
\qquad
15^\circ \leftrightarrow 1\,{\rm NST\ hour}.
\]

This converts the daily sky sweep into a directional phase coordinate. The point is not that the normalized sidereal clock replaces ordinary timekeeping, but that it provides a stable directional labeling of the sky relative to the detector baseline.

The experiment then proceeds by:

1. recording the inter-detector delay over a full normalized sidereal cycle,
2. locating the maximum and minimum delay headings,
3. identifying the midpoint headings between them,
4. measuring the two zero-delay headings,
5. comparing those with the finally assigned observed source headings.

Because the inline extrema and the zero crossings all come from the same timing sweep, the apparatus can determine its own phase center without first constructing an external local 90-degree reference.

## 6. Earth orbital-scale expectation

For Earth's orbital speed,

\[
v_{\rm orbit} \approx 29.78\,{\rm km/s},
\qquad
\beta_{\rm orbit} \approx 9.93\times 10^{-5}.
\]

The geometric null-delay offset from exact transverse is then

\[
\delta\alpha_{\rm geom} \approx \beta_{\rm orbit}
\approx 9.93\times 10^{-5}\,{\rm rad}
\approx 20.5\,{\rm arcsec}.
\]

After the receiver-local aberration update, the observed-heading offset becomes approximately

\[
\delta\alpha_{\rm obs} \approx 2\beta_{\rm orbit}
\approx 1.99\times 10^{-4}\,{\rm rad}
\approx 41.0\,{\rm arcsec}.
\]

These two values define the scale of the proposed effect.

## 7. Experimental logic

The proposal does not require the apparatus to know an absolute geometric transverse direction in advance. Instead, the same sidereal timing sweep determines the baseline axis observationally through its extrema. That is the key simplification.

The actual comparison is therefore not

> “Where is 90 degrees in an external geometric sense?”

but rather

> “What is the sidereal heading of the timing null, and how does it compare with the finally assigned observed source heading?”

If the staged framework is correct, those are different observables. The timing-null heading is displaced from the centered transverse heading by order \(\beta\), while the finally observed source heading is displaced by approximately order \(2\beta\).

## 8. Status and limitations

This note captures only the kinematic and signal-staging logic of the experiment. It does not yet address instrumental systematics, pulsar timing noise, atmospheric and ionospheric calibration, detector implementation, or the exact operational rule by which a practical telescope assigns the final source angle. Those are important, but they belong to a later engineering treatment.

The more limited claim here is that the experiment can be framed in a self-normalizing way. A normalized sidereal heading coordinate, combined with a longitudinal Earth-scale baseline and a periodic distant source, gives a direct route to comparing the geometric null-delay direction with the finally assigned observed direction.

## 9. Conclusion

A short Earth-scale pulsar-timing experiment can be formulated within the homogeneous propagation framework by using two opposite detectors on a longitudinal baseline and indexing the sky by normalized sidereal heading. The delay curve itself reveals the inline extrema and the two null-delay headings, removing the need for an independently constructed local transverse reference. In the framework's staged signal picture, the zero-delay direction and the final observed source heading are not the same quantity. The first shifts from transverse by order \(\beta\); the second shifts by approximately order \(2\beta\). At Earth orbital speed these are about 20.5 arcsec and 41.0 arcsec, respectively. The proposal is therefore not merely a timing test, but a test of whether propagation nulls and receiver-local angular assignment are observationally distinct.

