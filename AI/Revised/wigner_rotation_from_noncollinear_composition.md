# The Homogeneous Propagation Framework: Wigner Rotation and Accumulated Steering

**James Buckeyne**  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447  

*Companion papers:* *Homogeneous Light Propagation Framework* (DOI: 10.5281/zenodo.18997960); *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects* (DOI: 10.5281/zenodo.19079929)

## Abstract

The homogeneous propagation framework recovers the familiar special-relativistic endpoint structure from a propagation-first construction. The present paper develops one consequence of that result: noncollinear composition. The endpoint translational state remains recoverable through proper-velocity composition, but the endpoint alone does not exhaust the noncollinear case. When one component of motion is established first and a perpendicular component is then acquired, the transition proceeds through an ordered buildup with changing total speed, and the associated transport contribution accumulates across that buildup. The paper derives the accumulated remainder $W$, relates it to the standard Wigner rotation and Thomas precession, and notes the low-speed comparison $W \approx v\,v_\perp/c^2$ — twice the standard Thomas angle. The remainder is read as an accumulated steering associated with ordered noncollinear velocity acquisition. The framework is broadly consistent with established weak-field phenomenology while offering a different derivational account of noncollinear accumulation.

**Keywords:** homogeneous propagation, noncollinear composition, Wigner rotation, Thomas precession, proper velocity, steering remainder, transport accumulation

## 1. Introduction

The preceding paper recovered contraction, timing structure, and the one-dimensional moving-frame map from a propagation-first starting point, while briefly noting proper-velocity endpoint composition and a transport-induced steering remainder under noncollinear composition. The present paper develops that noncollinear remainder directly.

The endpoint translational state is not in question. In the present framework, the natural composition variable is proper velocity: the endpoint physical speed is obtained by ordinary addition in proper-velocity space followed by inversion back to physical velocity. The endpoint is commutative and associative, and as an endpoint it is order-independent. What the endpoint map does not capture is the intermediate structure of the transition when one velocity component is already established and a perpendicular component is then acquired. The composition passes through a path of intermediate total speeds, and the same propagation structure that recovers the Lorentz simultaneity term places that term inside the moving-frame transport structure. Once that structure is treated as part of the composition process, the noncollinear case carries more than the endpoint alone.

## 2. Accumulated Steering Remainder

Let $v$ be the established longitudinal speed, and let the transverse component be acquired through intermediate values $u\in[0,v_\perp]$. At each stage, the total speed is

$$
v_{\mathrm{tot}}(u)=\sqrt{v^2+u^2},
$$

so the buildup passes through a continuum of states with different total speed and therefore different rate structure. The same incremental transverse addition does not contribute in the same way at every stage, because the denominator governing the transport accumulation changes with the evolving total speed.

Consider an increment $du$ in the transverse component. It contributes an incremental turning relative to the established longitudinal component $v$. The increment is angular in character because each added transverse element is accumulated relative to that established direction. The contribution scales with $v$, while the evolving total-state constraint enters through the denominator:

$$
c^2-v_{\mathrm{tot}}(u)^2=c^2-v^2-u^2.
$$

The incremental contribution to the accumulated steering remainder is therefore

$$
dW=\frac{v}{c^2-v^2-u^2}\,du.
$$

The buildup accumulates against a continuously tightening denominator as the total speed rises. The full steering remainder is

$$
W=\int_0^{v_\perp}\frac{v}{c^2-v^2-u^2}\,du.
$$

Evaluating the integral gives

$$
W(v,v_\perp)=\frac{v}{\sqrt{c^2-v^2}}\operatorname{arctanh}\!\left(\frac{v_\perp}{\sqrt{c^2-v^2}}\right).
$$

The extra term appears because the ordered acquisition of the second component samples different total speeds on the way to the endpoint, and the transport contribution must be integrated across the entire buildup. The steering remainder belongs to the process by which the endpoint is reached, not to the endpoint itself.

The effect is nonuniform. Early in the buildup, the denominator is larger and the accumulation is gentler. Later, as the total speed rises and $c^2-v_{\mathrm{tot}}^2$ narrows, the same incremental transverse addition contributes more. As $v_\perp\to\sqrt{c^2-v^2}$, the arctanh argument approaches unity and the steering remainder diverges, reflecting the non-finite character of the buildup at the light-speed boundary.

The low-speed form is instructive. To first order,

$$
W\approx\frac{v\,v_\perp}{c^2}.
$$

Even before relativistic saturation becomes important, the ordered acquisition carries a nonzero accumulated turning proportional to the product of the two components.

## 3. Relation to Wigner Rotation

The standard relativistic comparison point is Wigner rotation: the composition of two non-parallel Lorentz boosts is not itself a pure boost but carries an associated rotation. In what follows, $W$ denotes the accumulated remainder derived here, while $W_{SR}$ denotes the standard relativistic rotation angle.

The present paper derives $W$ from the ordered buildup rather than from the decomposition of a composed Lorentz map. Both $W$ and $W_{SR}$ belong to the noncollinear composition problem, and both vanish in the collinear limit. But $W_{SR}$ is introduced through composed-boost structure, whereas $W$ is introduced through the accumulated transport contribution of finite transverse acquisition.

## 4. Relation to Thomas Precession

Thomas precession is the continuous-motion comparison most closely related to the present discussion. To leading order,

$$
W\approx\frac{v\,v_\perp}{c^2},\qquad \theta_T\approx\frac{v\,v_\perp}{2c^2}.
$$

The leading coefficient differs by a factor of two. This difference is structural: it follows from the different starting objects of the two derivations and persists at all speeds. Thomas precession is read from the kinematics of continuously changing inertial frames, whereas $W$ is derived from the accumulated transport contribution of a rate-changing buildup in which the total speed evolves throughout the acquisition.

A discrete comparison of sequential simultaneity terms can suggest that the present framework lacks the coupled SR cross-term from which Thomas/Wigner rotation is usually inferred. But once the noncollinear change is treated as a finite buildup rather than an endpoint update, a nonzero accumulated steering remainder appears naturally from the changing denominator $c^2-v_{\text{total}}^2$ along the path. The present steering remainder is a companion noncollinear accumulation derived from a different starting object, not a verbal variant of Thomas precession.

In the later weak-field development, the steering content isolated here is absorbed into the fuller orbital and geodetic treatment rather than carried forward as a separately named term. The companion dynamics paper [6] develops that broader displacement structure and recovers the corresponding observational totals.

## 5. Physical Interpretation

The most direct interpretation of $W$ is kinematic. As a perpendicular component is acquired, the direction of motion changes continuously, and $W$ measures the accumulated steering associated with that change. The derived angle belongs to the evolution of the velocity direction itself, not to a coordinate artifact introduced after the fact.

The derivation does not require an additional independent precession of an internal body frame relative to the direction of travel. The heading follows the changing velocity direction throughout the buildup, and the accumulated remainder is attached to steering in the ordered noncollinear acquisition, not to a separately postulated rotation of an internal axis.

## 6. Observational Context

The present paper isolates the noncollinear steering remainder $W$. In the later weak-field development, that content is absorbed into the fuller orbital and geodetic treatment, including Mercury perihelion advance at approximately $43$ arcsec/century, rather than carried forward as a separately named term [6]. Related applications to geodetic precession and lunar laser ranging are developed in the companion papers. Frame dragging is treated separately through the rotating-source displacement field, not as a consequence of $W$ alone [6].

## 7. Conclusion

Noncollinear composition in the homogeneous propagation framework carries an accumulated remainder $W$ beyond the endpoint translational state. The endpoint remains recoverable and order-independent, but the ordered acquisition of a perpendicular velocity component proceeds through intermediate total speeds, and the transport contribution accumulates across that buildup. The resulting remainder has a leading low-speed coefficient twice the standard Thomas angle.

The present paper isolates that accumulated steering remainder. In the later weak-field development, its content is absorbed into the fuller orbital and geodetic treatment rather than carried forward as a separately named term, while rotating-source frame dragging belongs to the separate vector-response sector.

## References

[1] Wolfgang Rindler, *Introduction to Special Relativity*, 2nd ed. Oxford: Clarendon Press / Oxford University Press, 1991.

[2] John David Jackson, *Classical Electrodynamics*, 3rd ed. New York: Wiley, 1998.

[3] Mark J. Semon and Jonathan R. Taylor, "Relativistic velocity space, Wigner rotation, and Thomas precession," *American Journal of Physics* **72**(7), 943–960 (2004). https://doi.org/10.1119/1.1652040

[4] James Buckeyne, *Homogeneous Light Propagation Framework*. Zenodo. https://doi.org/10.5281/zenodo.18997960

[5] James Buckeyne, *The Homogeneous Propagation Framework: Transport, Local Geometry, and Displacement Defects*. Zenodo. https://doi.org/10.5281/zenodo.19079929

[6] James Buckeyne, *The Homogeneous Propagation Framework: Retardation, Cumulative Field Structure, and Rotating-Source Response*. Zenodo. https://doi.org/10.5281/zenodo.19155407

[7] C. M. Will, "The Confrontation between General Relativity and Experiment," *Living Reviews in Relativity* **17**, 4 (2014). https://doi.org/10.12942/lrr-2014-4

[8] C. W. F. Everitt et al., "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity," *Physical Review Letters* **106**, 221101 (2011). https://doi.org/10.1103/PhysRevLett.106.221101
