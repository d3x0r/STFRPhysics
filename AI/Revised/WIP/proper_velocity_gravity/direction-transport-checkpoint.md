# Checkpoint 4: external-field rotation versus orbital steering

7 October 2026. Sources inspected: `../../wigner_rotation_from_noncollinear_composition.md` §§3, 6, 7.2–8; README §13; Dynamics §4.4; `../../../stfr_nbody_sigma.html` (`accel9` and its separate shadow calculation).

## Outcome

The external-field remainder has a well-defined infinitesimal vector form that can be integrated along the checkpoint-3 orbit. It gives a transported orientation. Applied as a consistent change of vector basis, it leaves that orbit unchanged. The inspected paper does not provide an additional translational coupling equation that uniquely turns this orientation remainder into the missing perihelion correction.

This does not rule out HPF trajectory steering. It identifies the additional relation needed to calculate it, without treating a basis rotation as an extra acceleration by default.

## 1. Differential transport obtained from the existing integral

The external-field transverse increment in the companion paper, evaluated at zero newly acquired transverse component in the instantaneous velocity-aligned frame, is

\[
dW_{\rm ext}=\frac{\gamma^2}{\gamma+1}\frac{v\,dv_\perp}{c^2}.
\]

Its rotationally covariant instantaneous form is

\[
\boxed{d\boldsymbol W=\frac{\gamma^2}{\gamma+1}
\frac{\mathbf v\times d\mathbf v}{c^2}
=\frac{\mathbf U\times d\mathbf U}{c^2(\gamma+1)}.}
\]

The second equality follows from \(\mathbf U=\gamma\mathbf v\); the parallel \(d\gamma\) contribution drops out of the cross product. This is a local differential extension of the paper's integral, not a claim that arbitrary finite perpendicular-component graphs are identical.

On the selected baseline trajectory,

\[
\frac{d\boldsymbol W}{d\tau}
=\frac{\mathbf U\times\mathbf a_b}{c^2(\gamma+1)},\qquad
\mathbf a_b=-A\hat{\mathbf y}.
\]

We take \(\boldsymbol W\) positive along the turning sense of the velocity. The opposite sign describes the usual lagging orientation convention; no physical coupling is inferred by choosing a sign. For constant-speed circular motion,

\[
\frac{dW}{d\theta}=\frac{U^2}{c^2(\gamma+1)}=\gamma-1,
\qquad W_{\rm orbit}=2\pi(\gamma-1).
\]

This confirms the companion paper's continuous circular result. The ratio of its derivative with respect to \(v_\perp/c\) to \(\gamma-1\) is \(1/\beta\); multiplying by \(d(v_\perp/c)=\beta d\theta\) accounts for the distinction. No extra averaging mechanism is needed to explain that factor.

## 2. Rotating the basis consistently

Let an orthogonal basis \(Q\) obey \(\dot Q=\widehat{\Omega}Q\), and express vectors as \(\mathbf y=Q\mathbf z\), \(\mathbf U=Q\mathbf u\). For this test choose \(\Omega=\dot{\boldsymbol W}\), while retaining the baseline Cartesian response. In the rotated components,

\[
\boxed{\dot{\mathbf z}=\mathbf u-\boldsymbol\omega\times\mathbf z,
\qquad
\dot{\mathbf u}=Q^{\mathsf T}\mathbf a_b-\boldsymbol\omega\times\mathbf u,}
\]

where \(\boldsymbol\omega=Q^{\mathsf T}\boldsymbol\Omega\). Reconstructing \(\mathbf y\) and \(\mathbf U\) cancels both basis terms and recovers checkpoint 3 exactly. The orientation can accumulate without changing the reconstructed perihelion angle.

The rotation of the spatial radial/tangential basis as position changes is also already present in checkpoint 3's polar-component equations. It must not be counted again as a dynamical steering term.

## 3. What would constitute actual steering?

A new translational rule would have to specify a change in the derivative of \(\mathbf U\) in the common comparison frame, for example a stated term \(\mathbf S\) in

\[
\dot{\mathbf U}=\mathbf a_b+\mathbf S(\mathbf y,\mathbf U,\text{transport state}).
\]

The example \(\mathbf S=\dot{\boldsymbol W}\times\mathbf U\) would be a new coupling assumption, not a consequence of writing vectors in a rotating basis. It preserves speed instantaneously because \(\mathbf U\cdot\mathbf S=0\), but generally changes angular momentum through \(\dot{\mathbf J}=\mathbf y\times\mathbf S\). Its sign, impulse-delivery convention and whether \(\dot{\boldsymbol W}\) uses the total acceleration or only the baseline field would all matter. None is selected here merely to recover an expected precession.

The companion paper §7.2 explicitly describes external-field spin precession relative to orbital motion. Sections 7.3–8 then rely on the Dynamics paper's integrated metric result for the orbital coefficient. They do not independently derive \(\mathbf S\) for the revised static response. The stated decomposition \(1+1/2+3/2=3\) therefore cannot fill this gap by itself.

An existing orbital-code correction also does not supply the missing derivation: it directly inserts a familiar angular-momentum-dependent correction rather than advancing the noncollinear transport state.

## 4. Separate code finding

In `AI/stfr_nbody_sigma.html`, the main `accel9` displacement branch forms

```text
aGeo = 3*GM*L2/(c2*r5)
acceleration +=/-= aGeo * displacement / r
```

For conventional dimensional positions and specific angular momentum \(L\), that prefactor has units \(1/\mathrm{s}^2\), not acceleration. Multiplying by a unit direction leaves one length missing. The separate shadow calculation multiplies the same prefactor by the displacement vector directly. These two implementations therefore differ by a radius factor. This is a dimensional/implementation discrepancy, not a proposed new force correction. Neither implementation has been modified at this checkpoint; the main simulation and the provenance of quoted orbit numbers need a dedicated audit before those numbers serve as validation.

## 5. Validation and next decision

`verify_direction_transport.py` tests the paper's finite external-field integral against the circular differential limit, and integrates the same baseline orbit in fixed and rotating components. Reconstructed positions and velocities agree, while the accumulated orientation is nonzero. This establishes that basis transport alone does not add orbital advance.

The next substantive input is the framework's actual trajectory-steering rule, or its derivation from the impulse/transport construction. It may already exist in another source, graph or implementation, but it has not been identified in the inspected sources. Until that is specified, checkpoint 3 remains a conditional scalar baseline, not a completed HPF orbit law. The near-surface radial escape calculations are unchanged.
