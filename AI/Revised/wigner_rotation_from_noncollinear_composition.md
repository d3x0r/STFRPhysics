# The Homogeneous Propagation Framework: Wigner Rotation from Noncollinear Composition

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929)

## Abstract

The homogeneous propagation framework established that a propagation-first construction recovers the familiar special-relativistic endpoint structure in form. The present paper develops one deferred consequence of that result: noncollinear composition. Although the endpoint translational state remains recoverable through proper-velocity composition, the endpoint alone does not exhaust the noncollinear case. When one component of motion is established first and a perpendicular component is then acquired, the transition proceeds through an ordered buildup with changing total speed, so the associated transport contribution accumulates across that buildup. On that basis, the paper derives an accumulated remainder $W$, relates it to the standard discussions of Wigner rotation and Thomas precession, and notes the low-speed comparison $W \approx v_1v_2/c^2$. The resulting interpretation is correspondingly narrow: $W$ is read primarily as an accumulated steering remainder associated with ordered noncollinear velocity acquisition. Within that scope, the framework remains broadly consistent with established weak-field relativistic phenomenology while offering a different derivational and interpretive account of noncollinear accumulation.

**Keywords:** homogeneous propagation, noncollinear composition, Wigner rotation, Thomas precession, proper velocity, steering remainder, transport accumulation

## 1. Introduction

The preceding paper in this series developed the homogeneous propagation framework in its special-relativistic overlap regime. Its purpose was intentionally narrow: to show that contraction, timing structure, and the one-dimensional moving-frame map can be recovered in form from a propagation-first starting point, while only briefly noting proper-velocity endpoint composition together with a transport-induced rotational remainder under noncollinear composition.

The present paper takes up that deferred noncollinear problem directly. It does not dispute the recoverable endpoint state. Its claim is that endpoint composition does not by itself exhaust the structure of the transition when one component of motion is already established and a perpendicular component is then acquired. In that case, the change from the initial state to the final one is not usefully described as an instantaneous substitution from one velocity to another. It proceeds through an ordered buildup.

That distinction matters because the same propagation structure that recovers the Lorentz simultaneity term also places that term inside the moving-frame transport structure. Once that structure is treated as part of the composition process, the noncollinear case contains more than the endpoint alone. The working notes already isolate the needed ingredients: the proper-velocity endpoint map remains order-independent, but the buildup from an established longitudinal component to a final noncollinear state passes through intermediate total speeds, and the corresponding transport contribution accumulates across that change.

The claim of the present paper is therefore limited but definite. In the homogeneous propagation framework, noncollinear composition carries an accumulated remainder associated with the ordered buildup path. The paper derives that remainder, relates it to the standard discussions of Wigner rotation and Thomas precession, and then clarifies the narrower physical interpretation intended here. The aim is not to restate the broader framework, but to isolate one consequence already visible at the edge of the previous paper and treat it on its own terms.

## 2. Endpoint Composition and Its Limit

The first point to establish is that the endpoint state is not the disputed part of the construction. In the present framework, the natural composition variable is proper velocity. The earlier propagation paper already states the endpoint composition in that form, and the working notes make the same point explicitly: the endpoint physical speed is obtained by ordinary addition in proper-velocity space followed by inversion back to physical velocity. In that sense, the endpoint state is commutative and associative. As an endpoint, it is order-independent.

That concession matters because it prevents the argument from sounding broader than it is. The present paper is not claiming that relativistic endpoint composition fails to be recovered. It is claiming something narrower: an endpoint map identifies the initial and final translational states, but it does not yet describe the intermediate acquisition of the second component when the composition is noncollinear.

That limitation is already visible within the propagation construction itself. The Lorentz simultaneity term is recovered by isolating the transport contribution of the propagation equation and applying the same contraction factor already recovered elsewhere in the construction. In that sense, the noncollinear problem is not imported from outside the framework. It grows out of the same transport structure that already enters the moving-frame relations.

The limit of endpoint composition can therefore be stated simply. The endpoint state may be order-independent, yet the ordered acquisition of that state need not be. Once one component is already present and a perpendicular component is then added, the composition passes through a path of intermediate total speeds. The paper is concerned with the extra structure carried by that path, not with replacing the endpoint result.

## 3. Ordered Noncollinear Buildup

The endpoint state does not describe how the transition is realized. In the present framework, the noncollinear case is treated as an ordered buildup: one component is already established, and a perpendicular component is then accumulated continuously. The working notes state this in the most useful form: let $v_x=v_1$ be established first, and let $v_y$ build from $0$ to $v_2$. During that buildup, the total speed is not fixed. It rises continuously as the transverse component is acquired.

That is the point at which the paper departs from a mere discussion of endpoint composition. If the state change were treated as a single jump from $A$ to $A\oplus B$, then only the initial and final values would matter. But in the buildup described here, the system passes through a continuum of intermediate states. Because the total speed changes throughout the process, the inverse-gamma factor changes with it. The process is therefore rate-changing rather than uniform.

This changing rate structure is the reason the ordered buildup matters. The same incremental transverse addition does not contribute in the same way at every stage, because the denominator governing the transport accumulation changes with the evolving total speed. The working notes make this explicit: the relevant denominator at each stage is $c^2-v_{\text{total}}^2$, not a fixed value attached only to the starting state or only to the endpoint. The buildup therefore samples a continuously changing transport structure as it proceeds.

The noncollinear problem is therefore not exhausted by the endpoint map alone. The endpoint remains recoverable, but the route to that endpoint carries an additional ordered contribution once the perpendicular component is treated as a finite acquisition rather than a formal substitution. The next section derives that accumulated remainder directly.

## 4. Accumulated Rotational Remainder

Once noncollinear composition is treated as an ordered buildup, the remaining task is to evaluate what that buildup accumulates. Let $v_x=v_1$ be already established, and let the transverse component be acquired through intermediate values $u\in[0,v_2]$. At each stage, the total speed is

$$
v_{\mathrm{tot}}(u)=\sqrt{v_1^2+u^2},
$$

so the buildup passes through a continuum of states with different total speed and therefore different rate structure.

To make the accumulation explicit, consider an increment $du$ in the transverse component. This increment does not merely relabel the endpoint state. It contributes an incremental turning relative to the already-established longitudinal component $v_1$. The increment is angular in character because each added transverse element is accumulated relative to that established direction. For that reason the contribution scales with $v_1$, while the evolving total-state constraint enters through the denominator. Since the relevant transport denominator at that stage is set by the total state, it takes the form

$$
c^2-v_{\mathrm{tot}}(u)^2=c^2-v_1^2-u^2.
$$

The incremental contribution to the accumulated remainder is therefore

$$
dW=\frac{v_1}{c^2-v_1^2-u^2}\,du.
$$

In this form, the origin of the effect is transparent: the buildup accumulates against a continuously tightening denominator as the total speed rises.

The full remainder is obtained by integrating across the transverse acquisition:

$$
W=\int_0^{v_2}\frac{v_1}{c^2-v_1^2-u^2}\,du.
$$

Evaluating the integral gives

$$
W(v_1,v_2)=\frac{v_1}{\sqrt{c^2-v_1^2}}\operatorname{arctanh}\!\left(\frac{v_2}{\sqrt{c^2-v_1^2}}\right).
$$

This is the quantity that, in the present framework, measures the accumulated remainder associated with ordered noncollinear acquisition.

Nothing in this derivation alters the endpoint translational result. The extra term appears because the ordered acquisition of the second component samples different total speeds on the way to that endpoint, and the transport contribution must therefore be integrated across the entire buildup. The remainder belongs to the process by which the endpoint is reached, not to the endpoint considered in isolation.

The expression also clarifies why the effect is nonuniform. Early in the buildup, when the total speed is lower, the denominator is larger and the accumulation is gentler. Later, as the total speed rises and $c^2-v_{\mathrm{tot}}^2$ narrows, the same incremental transverse addition contributes differently. As $v_2\to\sqrt{c^2-v_1^2}$, the arctanh argument approaches unity and the remainder diverges, reflecting the non-finite character of the buildup at the light-speed boundary.

The low-speed form is also instructive. When both $v_1/c$ and $v_2/c$ are small, one may expand the denominator as nearly constant at leading order, or equivalently expand the arctanh form for small argument. To first order this gives

$$
W\approx\frac{v_1v_2}{c^2}.
$$

In that regime, the remainder is simply proportional to the product of the established longitudinal component and the acquired transverse component. This makes the basic interpretation especially clear: even before relativistic saturation becomes important, the ordered acquisition already carries a nonzero accumulated turning.

The noncollinear remainder is therefore not a replacement for the endpoint composition law. It is the accumulated transport contribution associated with reaching that endpoint through finite transverse acquisition.

## 5. Relation to Wigner Rotation

The standard relativistic comparison point for noncollinear composition is Wigner rotation. In the orthodox account, the composition of two non-parallel Lorentz boosts is not itself a pure boost; the composed transformation carries an associated rotation. The earlier working draft already identified the structural source of that comparison by writing the two-step Lorentz transformation in a form with coupled boost factors, including the characteristic $\gamma_1\gamma_2$-type structure that appears when the simultaneity contribution of the first boost is carried through the second.

In what follows, $W$ denotes the accumulated remainder derived in the present framework, while $W_{SR}$ denotes the standard relativistic rotation angle associated with noncollinear composition.

The same problem appears here from a different starting object. Rather than reading the rotation from the decomposition of a composed Lorentz map, the present paper derives $W$ from the ordered buildup itself. Once one velocity component is established and a perpendicular component is then acquired, the total speed changes throughout the acquisition, and the associated transport contribution accumulates across that change.

The comparison is necessary, but it should be stated carefully. Both $W$ and $W_{SR}$ belong to the noncollinear composition problem, and both vanish in the collinear limit. But $W_{SR}$ is introduced through composed-boost structure, whereas $W$ is introduced through the accumulated transport contribution of finite transverse acquisition. The present claim is therefore comparative: $W$ is the framework's rotation-like remainder in the same noncollinear setting for which standard relativity introduces $W_{SR}$.

## 6. Relation to Thomas Precession

Thomas precession is the continuous-motion comparison most closely related to the present discussion. Where $W_{SR}$ is introduced through the composition of non-parallel boosts, Thomas precession is usually discussed as the accumulated rotation associated with continuous noncollinear acceleration. The present comparison therefore asks how the accumulated remainder $W$, derived here from ordered transverse acquisition, relates to the standard continuous-precession result.

At the level of low-speed comparison, the distinction is already clear in the working notes. To leading order,

$$
W\approx\frac{v_1v_2}{c^2},\qquad \theta_T\approx\frac{v_1v_2}{2c^2}.
$$

So the present remainder is not being introduced merely as a restatement of the standard Thomas angle. Even before higher-speed behavior is considered, the leading coefficient differs by a factor of two.

That difference should be stated plainly but not overextended. The point of the present section is not to settle every observational or interpretive issue associated with Thomas precession. It is only to locate the present result relative to the standard relativistic comparison. Both concern noncollinear velocity change. But Thomas precession is ordinarily read from the kinematics of continuously changing inertial frames, whereas $W$ is derived here from the accumulated transport contribution of a rate-changing buildup in which the total speed evolves throughout the acquisition.

A discrete comparison of sequential simultaneity terms can suggest that the present framework lacks the coupled SR cross-term from which Thomas/Wigner rotation is usually inferred. But once the noncollinear change is treated as a finite buildup rather than an endpoint update, a nonzero accumulated remainder appears naturally from the changing denominator $c^2-v_{\text{total}}^2$ along the path.

The present remainder should therefore not be presented as a verbal variant of Thomas precession. It is a companion noncollinear accumulation derived from a different starting object and, already in the low-speed limit, carrying a different coefficient.

## 7. Physical Interpretation

The quantity $W$ is introduced here as the accumulated remainder associated with ordered noncollinear acquisition of velocity. Its most direct interpretation is kinematic. As a perpendicular component is acquired, the direction of motion changes continuously, and $W$ measures the accumulated steering associated with that change. In this sense, the derived angle belongs first to the evolution of the velocity direction itself, not to a coordinate artifact introduced after the fact.

This interpretation is narrower than some of the standard language surrounding relativistic rotation effects. The derivation given here does not require an additional independent precession of an internal body frame relative to the direction of travel. Rather, the natural reading is that the heading follows the changing velocity direction throughout the buildup. The accumulated remainder is therefore attached most directly to steering in the ordered noncollinear acquisition, not to a separately postulated rotation of an internal axis.

That distinction matters when comparing the present result with the orthodox discussions of Wigner rotation and Thomas precession. In standard treatments, those effects are often described through noncommuting boosts, rotating local frames, or the transport of spin and gyroscope axes. The present derivation begins earlier and more simply. It starts from the ordered acquisition itself and yields an accumulated angle from the changing transport structure along that path. For the purposes of this paper, that is the level at which the interpretation should remain.

The present interpretation should also be read with the scale of familiar tests in mind. The claim is not that every standard relativistic observable immediately changes character or sign. In regimes associated with gyroscope precession, perihelion advance, and precision orbital ranging, the present framework is broadly consistent with the established weak-field phenomenology ordinarily described by general relativity. What differs here is the derivational and interpretive account of the noncollinear accumulation within that regime.

Taken together, these points fix the intended role of $W$. It is best understood here as an accumulated steering remainder associated with ordered noncollinear velocity acquisition. A fuller treatment of frame rotation, spin transport, and possible observational distinctions is deferred to subsequent papers in the series; the present paper is limited to the derivation and immediate interpretation of the noncollinear remainder.

## 8. Observational Context

The present paper is not a full phenomenological treatment of the weak-field test regime, but the framework is not limited to the derivation given here alone. Within the broader series, the same displacement-based construction already reaches several standard comparison points, including Mercury perihelion advance, lunar ranging consistency checks, and the Gravity Probe B geodetic and frame-drag regimes. The purpose of the present section is not to reproduce those derivations in full, but only to note that the noncollinear remainder developed here belongs to a framework whose weak-field consequences are already quantitatively developed elsewhere.

A first comparison point is Mercury perihelion advance. In the broader displacement development, the perihelion result is obtained from the combined effect of finite-$C$ retardation geometry, time-dilation effects in the internal dynamics, and the cumulative displacement gradient, yielding the standard weak-field value of about $43$ arcsec/century. That fuller orbital derivation is outside the scope of the present paper, but it is relevant here because it shows that the framework's accumulated-transport structure is not limited to purely kinematic discussion.

A second comparison point is Gravity Probe B. The geodetic result is treated in the same broader development through the same weak-field displacement structure, and the frame-drag branch is no longer left as the earlier unresolved mismatch. In the updated account, the leading frame-drag contribution is assigned to the rotating-source displacement field rather than to the present noncollinear remainder $W$ alone. The detailed derivation is therefore deferred to a companion frame-drag paper, while the present paper remains limited to the ordered noncollinear contribution itself.

A similar remark applies to lunar laser ranging. The present paper does not attempt to derive a ranging model, but the framework's weak-field structure has already been extended to that domain in the broader notes. The point here is only that the present result sits inside a framework whose contact with standard weak-field tests is already more developed than the present derivation alone would suggest.

Taken together, these comparisons clarify the intended scale of the present claim. This paper introduces and interprets the accumulated noncollinear remainder $W$; it does not attempt to carry every weak-field test on its own. Those broader comparisons are treated elsewhere in the series, and the rotating-source derivation is the proper location for the full GPB frame-drag result.

## 9. Conclusion

The preceding paper in this series recovered the special-relativistic endpoint structure of the homogeneous propagation framework and noted, without developing it in full, that noncollinear composition carries an additional remainder beyond the endpoint translational state. The present paper has isolated that deferred point and treated it directly.

Its conclusion is limited but definite. The endpoint state remains recoverable and, as an endpoint, order-independent. But once one component of motion is established first and a perpendicular component is then acquired, the transition proceeds through intermediate total speeds rather than through a single substitution from one state to another. Because the relevant transport denominator changes throughout that buildup, the acquisition carries an accumulated remainder $W$ not captured by the endpoint map alone.

The paper has then related that remainder to the standard relativistic discussions of Wigner rotation and Thomas precession. The comparison is necessary, but the present derivation does not begin from the same primitive object. Standard relativity introduces the corresponding rotation through the composition of non-parallel boosts and, in the continuous case, through the associated precession structure. The present framework instead derives $W$ from the ordered buildup itself. The claim is therefore comparative rather than merely terminological: it identifies a rotation-like remainder in the same noncollinear problem domain while deriving it from finite acquisition under changing total speed.

The present claim is therefore constructive rather than revisionary. The framework is broadly consistent with the established weak-field relativistic phenomenology while offering a different derivational and interpretive account of noncollinear accumulation.

Within the series, the role of the paper is correspondingly narrow and clear. It is the noncollinear companion to the earlier homogeneous propagation result. It does not replace the endpoint composition law, and it does not attempt to settle the fuller questions of frame rotation, spin transport, or detailed weak-field phenomenology that belong to later papers in the series. Its narrower result is that noncollinear composition contains additional ordered structure once the buildup itself is treated as part of the description rather than suppressed in favor of the endpoint alone.

## References

[1] Wolfgang Rindler, *Introduction to Special Relativity*, 2nd ed. Oxford: Clarendon Press / Oxford University Press, 1991.

[2] John David Jackson, *Classical Electrodynamics*, 3rd ed. New York: Wiley, 1998.

[3] Mark J. Semon and Jonathan R. Taylor, “Relativistic velocity space, Wigner rotation, and Thomas precession,” *American Journal of Physics* **72**(7), 943–960 (2004). https://doi.org/10.1119/1.1652040

[4] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[5] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[6] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[7] C. M. Will, “The Confrontation between General Relativity and Experiment,” *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4

[8] C. W. F. Everitt et al., “Gravity Probe B: Final Results of a Space Experiment to Test General Relativity,” *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101

[9] K. Nordtvedt, “Testing Relativity with Laser Ranging to the Moon,” *Physical Review* **170**(5), 1186–1187 (1968).

[10] J. G. Williams, S. G. Turyshev, and D. H. Boggs, “Lunar Laser Ranging Tests of the Equivalence Principle with the Earth and Moon,” *International Journal of Modern Physics D* **18**(7), 1129–1175 (2009). https://doi.org/10.1142/S021827180901500X

