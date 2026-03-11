# The R3 Spin Group
## Rotation Vectors in Three-Dimensional Space

James Buckeyne  
Independent Research  
Fernandina Beach, FL 32034; United States  
Email: d3ck0r@gmail.com  
ORCID iD: 0009-0004-2865-6447

---

# Preface

[TODO: Your voice. Why this work exists. The path from practical rotation problems through matrix permutation hacks, through quaternion denormalization frustration, to finding Rodrigues, to building the full framework. Not a formal abstract — a direct account of where this came from and what it's for. Mention the Wikipedia contribution and its removal as motivation for writing a proper reference.]

---

# Part I: Context

## Chapter 1: The Problem of Rotations

Rotations in three dimensions have exactly three degrees of freedom — an axis and an angle. Every widely used representation either obscures this fact or introduces pathologies.

**Euler angles** decompose a rotation into three successive rotations about coordinate axes. There are twelve valid orderings, each producing different behavior. The Jacobian of the Euler angle parameterization is rank-deficient at certain configurations (gimbal lock), where two axes align and a degree of freedom is lost. This is not a numerical artifact — it is a topological obstruction inherent to parameterizing $\mathrm{SO}(3)$ with three angles composed in sequence.

**Rotation matrices** are elements of $\mathrm{SO}(3)$ directly: 3×3 real orthogonal matrices with determinant +1. They compose by matrix multiplication and apply to vectors by matrix-vector product. However, they use nine numbers to encode three degrees of freedom, subject to six orthogonality constraints ($A^T A = I$, $\det A = +1$). Under repeated multiplication with finite-precision arithmetic, the matrix drifts off the $\mathrm{SO}(3)$ manifold — the columns cease to be orthonormal. Re-orthogonalization (e.g., Gram-Schmidt) is required periodically. Additionally, a rotation matrix can only represent angles in the range $[0, \pi]$ — the trace formula $\theta = \cos^{-1}((\mathrm{tr}(A) - 1)/2)$ does not distinguish $\theta$ from $2\pi - \theta$, so the matrix sees only half of the rotation space.

**Quaternions** (unit elements of $\mathbb{H}$) eliminate gimbal lock and represent rotations with four numbers subject to one constraint ($|q| = 1$). Composition is quaternion multiplication. But the unit-norm constraint must be actively maintained: under finite-precision arithmetic, especially at low precision (single-precision float in real-time applications), quaternions denormalize — they drift off the 3-sphere $S^3 \subset \mathbb{R}^4$. Furthermore, quaternions have a singularity at identity: the axis of rotation is encoded in the imaginary part, which vanishes as the angle approaches zero, making the axis numerically unrecoverable. And quaternions are not easy to reason about geometrically — the half-angle encoding means that a $90°$ physical rotation corresponds to a $45°$ quaternion, and the double cover ($q$ and $-q$ represent the same rotation) creates sign ambiguities in interpolation and comparison.

All three representations obscure the same simple fact: **a rotation is a vector.** Its direction is the axis, its magnitude is the angle. The representation lives in $\mathbb{R}^3$, has exactly three components, requires no constraints, and the identity is the zero vector.

This monograph develops that representation — the rotation vector, or log-quaternion — as a complete computational framework.


## Chapter 2: Historical Foundations

### 2.1 Rodrigues (1840)

Olinde Rodrigues, in his 1840 paper "Des lois géométriques qui régissent les déplacements d'un système solide dans l'espace," derived the composition formula for rotations expressed as axis-angle pairs. He showed that two successive rotations, each specified by an axis and angle, combine into a single rotation whose axis and angle can be computed directly from the inputs. The three rotation axes form a spherical triangle, and the dihedral angles between the planes of this triangle are determined by the rotation angles.

This was two years before Hamilton's 1843 discovery of quaternions. Rodrigues' result is equivalent to quaternion multiplication, but expressed entirely in terms of axes and angles — without the quaternion formalism.

### 2.2 Hamilton (1843) and the Quaternion Tradition

Hamilton's quaternions provided an algebraic framework that subsumed Rodrigues' geometric results. The quaternion representation became dominant, and Rodrigues' direct axis-angle approach was largely forgotten as a computational method. The standard advice in textbooks and reference works to this day is: "convert to quaternions, multiply, convert back." The Wikipedia article on rotation formalisms states, regarding axis-angle composition, that "it is best to employ the rotation matrix or quaternion notation, calculate the product, and then convert back to Euler axis and angle."

This monograph demonstrates that this advice is unnecessary. Composition can be performed directly in axis-angle (rotation vector) form, and there are practical advantages to doing so.

### 2.3 The Several Rodrigues Formulas

The name "Rodrigues' Rotation Formula" refers to several distinct results:

1. **The rotation of a vector** about an axis by an angle: given a point $\vec{x}$, axis $\hat{a}$, and angle $\theta$, the rotated point is $\cos\theta\,\vec{x} + \sin\theta\,(\hat{a} \times \vec{x}) + (1-\cos\theta)(\hat{a} \cdot \vec{x})\hat{a}$.

2. **The composition of two rotations** in axis-angle form: given $(\hat{A}, a)$ and $(\hat{B}, b)$, compute the resulting $(\hat{C}, c)$ directly.

3. **The rotation matrix** from axis-angle, which is the matrix form of (1) applied to the basis vectors.

All three are used in this monograph. The composition formula (2) is the central result.

---

# Part II: The Framework

## Chapter 3: Rotation Vectors

### 3.1 Definition

A **rotation vector** $\vec{r} \in \mathbb{R}^3$ encodes a rotation: its direction is the axis, its magnitude is the angle of rotation in radians.

$$\hat{a} = \frac{\vec{r}}{|\vec{r}|}, \qquad \theta = |\vec{r}|$$

The **identity** is $\vec{r} = \vec{0}$: zero angle, no rotation, axis undefined (and irrelevant).

An identity rotation applied to any vector returns that vector unchanged. A rotation composed with identity returns the original rotation. These are the group identity properties.

An important distinction: a **rotation** is a specific transformation of spatial coordinates at an instant — it describes a fixed frame, evaluated at time $T = 1$. A **curvature** or **angular velocity** is the rate $d\theta/dT$, the continuous change in angle over time, analogous to how linear velocity $d\vec{x}/dT$ describes continuous change in position. A rotation vector can represent either: as an orientation (the accumulated rotation from a reference), or as an angular velocity (the rate of rotation, integrated over time to produce orientation). Velocity sums to position; angular velocity sums to angular position. Curvature at time $T = 0$ is identity regardless of the rate — it is the basis frame itself.

This distinction matters because matrices and quaternions represent only the rotation at $T = 1$: the principal projection. They have no concept of evaluating the frame at a different time step without recomputing from the angular velocity. A rotation vector, by contrast, can be scaled by $\Delta t$ to evaluate the frame at any time, because $\sin$ and $\cos$ of the scaled angle give the frame at that step directly.

### 3.2 The Exponential Map

A rotation vector $\vec{r}$ maps to a unit quaternion by the exponential:

$$\exp(\vec{r}) = Q = \left(\cos\frac{|\vec{r}|}{2},\; \sin\frac{|\vec{r}|}{2}\;\frac{\vec{r}}{|\vec{r}|}\right)$$

This map always produces a unit quaternion — the constraint $|Q| = 1$ is enforced by the structure of $\cos^2 + \sin^2 = 1$, not maintained by renormalization. The inverse is the logarithm: $\ln(Q) = \vec{r}$.

At identity: $\exp(\vec{0}) = (1, 0, 0, 0)$.

The rotation vector $\vec{r}$ is the element of the Lie algebra $\mathfrak{su}(2) \cong \mathfrak{so}(3) \cong \mathbb{R}^3$ (with the cross product as the Lie bracket). The exponential map takes it to the Lie group $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \cong S^3$ (the unit quaternions). The rotation vectors are the logarithmic coordinates of the group.

### 3.3 The Covering Structure

The rotation group $\mathrm{SO}(3)$ — the group of physical rotations — is the quotient $\mathrm{Spin}(3)/\{+1, -1\}$, since $q$ and $-q$ produce the same rotation. In terms of rotation vectors: $\vec{r}$ and $\vec{r}' = \vec{r}(1 + 2\pi/|\vec{r}|)$ map to antipodal quaternions that act identically on vectors.

The standard result is that the ball $\bar{B}^3(2\pi) \subset \mathbb{R}^3$ (radius $2\pi$), with antipodal points on the boundary $S^2(2\pi)$ identified, is homeomorphic to $\mathrm{SO}(3)$. Rotation vectors within this ball provide a **double cover**: each physical rotation has two preimages (except identity).

However, the rotation vector space extends beyond the $2\pi$ ball. The magnitude $|\vec{r}|$ is not bounded — it can represent multiple full turns. At $|\vec{r}| = 2\pi$, the rotation returns to identity (but the quaternion is $-1$, not $+1$). At $|\vec{r}| = 4\pi$, both the rotation and the quaternion return to their starting values.

This gives the space a **concentric shell structure**: the spherical shells at radii $[0, 2\pi)$, $[2\pi, 4\pi)$, $[4\pi, 6\pi)$, ... each cover the full rotation group. The `principal()` operation projects any rotation vector back into the first shell.

[TODO: Investigate and formalize the covering multiplicity. The standard double cover of $\mathrm{SO}(3)$ by $\mathrm{Spin}(3)$ is well established. The question is whether the specific parameterization and boundary identifications in the rotation vector space, particularly with the Hopf fibration structure and the latitude/longitude/twist decomposition, produce additional identifications that yield a quad cover or higher. Work through explicit examples at the $2\pi$ and $4\pi$ boundaries.]

### 3.4 Beyond the Principal Angle

For many applications, the principal rotation (angle in $[0, 2\pi)$) is sufficient. But for tracking angular velocity or accumulated rotation — as in a spinning rigid body, a robot joint, or an IK chain — the full unbounded rotation vector is essential.

Consider a hypothetical failure case: an IK chain with a few links, where the full chain computation results in a net rotation of $1°$, but the total sum of inputs is $361°$. If the result is projected to its principal angle and fed back down the chain, the chain's joints are forced into configurations that distort the intended motion. In quaternion space, this distortion is unavoidable because quaternions cannot represent more than a half-turn. Rotation vectors preserve the full winding number.

Free bodies (spacecraft, projectiles) accumulate rotation over time. The rotation vector accumulator can grow without bound. The option to maintain the full count is available and sometimes necessary.

---

## Chapter 4: Notation and Primitives

A vector is an ordered triple:

$$\vec{v} = (v_x, v_y, v_z)$$

Components are extracted as $\vec{v}.x$, $\vec{v}.y$, $\vec{v}.z$.

**Addition.** Component-wise, commutative:
$$\vec{a} + \vec{b} = (a_x + b_x,\; a_y + b_y,\; a_z + b_z)$$

**Scalar multiplication:**
$$s\,\vec{a} = (s\,a_x,\; s\,a_y,\; s\,a_z)$$

**Dot product.** Commutative, scalar result:
$$\vec{a} \cdot \vec{b} = a_x b_x + a_y b_y + a_z b_z$$

The squared magnitude: $\vec{a}^2 \equiv \vec{a} \cdot \vec{a}$.

**Cross product.** Anti-commutative, vector result:
$$\vec{a} \times \vec{b} = (a_y b_z - a_z b_y,\; a_z b_x - a_x b_z,\; a_x b_y - a_y b_x)$$

**Magnitude:**
$$|\vec{v}| = \sqrt{\vec{v} \cdot \vec{v}}$$

**Normalization:**
$$\hat{v} = \frac{\vec{v}}{|\vec{v}|}$$

**Decomposition of a rotation vector** into axis and angle:
$$\hat{a} = \frac{\vec{r}}{|\vec{r}|}, \qquad \theta = |\vec{r}|$$

Analogous to decomposing a velocity vector into direction and speed:
$$\hat{d} = \frac{\vec{v}}{|\vec{v}|}, \qquad s = |\vec{v}|$$

---

## Chapter 5: Operations on Rotation Vectors

### 5.1 Rotate a Point (Rodrigues' Rotation Formula)

Given a point $\vec{x}$, a unit axis $\hat{a}$, and an angle $\theta$:

$$R(\vec{x}, \hat{a}, \theta) = \cos\theta\;\vec{x} + \sin\theta\;(\hat{a} \times \vec{x}) + (1 - \cos\theta)(\hat{a} \cdot \vec{x})\;\hat{a}$$

Using a rotation vector $\vec{q}$ directly:

$$R_q(\vec{x}, \vec{q}) = R\!\left(\vec{x},\;\frac{\vec{q}}{|\vec{q}|},\;|\vec{q}|\right)$$

When $|\vec{q}| = 0$: $R_q(\vec{x}, \vec{0}) = \vec{x}$.

### 5.2 Build a Rotation Matrix

The Rodrigues formula applied to the standard basis vectors $(1,0,0)$, $(0,1,0)$, $(0,0,1)$ produces the columns of the rotation matrix. Let $x, y, z$ be the components of the rotation vector, $\theta = \sqrt{x^2 + y^2 + z^2}$.

$$\small\begin{bmatrix}
\cos\theta - \frac{(1 - \cos\theta)x^2}{\theta^2} & \frac{(1 - \cos\theta)xy}{\theta^2} - \frac{\sin\theta\, z}{\theta} & \frac{(1 - \cos\theta)xz}{\theta^2} + \frac{\sin\theta\, y}{\theta} \\[6pt]
\frac{(1 - \cos\theta)xy}{\theta^2} + \frac{\sin\theta\, z}{\theta} & \cos\theta - \frac{(1 - \cos\theta)y^2}{\theta^2} & \frac{(1 - \cos\theta)yz}{\theta^2} - \frac{\sin\theta\, x}{\theta} \\[6pt]
\frac{(1 - \cos\theta)xz}{\theta^2} - \frac{\sin\theta\, y}{\theta} & \frac{(1 - \cos\theta)yz}{\theta^2} + \frac{\sin\theta\, x}{\theta} & \cos\theta - \frac{(1 - \cos\theta)z^2}{\theta^2}
\end{bmatrix}$$

This is column-major: the first column is the image of the $x$-axis (the "right" direction), the second is "up," the third is "forward." Computing a single column (e.g., just the forward vector) requires less work than the full matrix, but the full matrix shares common subexpressions and is not much more expensive than two individual columns.

### 5.3 Recover a Rotation Vector from a Matrix

Given a rotation matrix $M$ with entries $m[\mathrm{col}][\mathrm{row}]$:

**Angle** from the trace:
$$\theta = \cos^{-1}\!\left(\frac{m[0][0] + m[1][1] + m[2][2] - 1}{2}\right)$$

**Axis** from the skew-symmetric part:
$$\vec{a} = (m[1][2] - m[2][1],\; m[2][0] - m[0][2],\; m[0][1] - m[1][0])$$

Normalize: $\hat{a} = \vec{a}/|\vec{a}|$.

The rotation vector is $\vec{r} = \theta\,\hat{a}$.

**Singularities.** When $\theta \approx 0$, the skew-symmetric part vanishes and the axis is indeterminate — but the rotation is near identity, so any axis will do (or return $\vec{0}$). When $\theta \approx \pi$, the skew-symmetric part again becomes small; the axis must be recovered from the symmetric part of $M$ instead (the eigenvector of eigenvalue $+1$).


### 5.4 Compose Rotations (Rotate a Rotation)

This is the central formula of the framework: the direct composition of two rotations in axis-angle form without converting to quaternions or matrices.

Given $(\hat{A}, a)$ — the rotation to be rotated — and $(\hat{B}, b)$ — the rotation to apply — the result is $(\hat{C}, c)$.

**Half-angle terms:**

$$\begin{aligned}
S_{+} &= \sin\tfrac{a + b}{2}, & C_{+} &= \cos\tfrac{a + b}{2} \\[4pt]
S_{-} &= \sin\tfrac{a - b}{2}, & C_{-} &= \cos\tfrac{a - b}{2}
\end{aligned}$$

**Resulting angle:**

$$c = 2\cos^{-1}\frac{(\hat{A} \cdot \hat{B})(C_{+} - C_{-}) + C_{-} + C_{+}}{2}$$

The argument of $\cos^{-1}$ is the scalar (real) part of the quaternion product $\exp(\vec{r}_A) \cdot \exp(\vec{r}_B)$. Geometrically, it behaves like $\cos(a/2)\cos(b/2) - \sin(a/2)\sin(b/2)(\hat{A} \cdot \hat{B})$, which is approximately $\cos((a+b)/2)$ when the axes are aligned, but skews toward $\cos((a-b)/2)$ as the axes become anti-parallel. The dot product $\hat{A} \cdot \hat{B}$ interpolates between these two regimes — it controls how much the individual angles add vs. subtract in the composition. The result is always in $[0, 2\pi)$.

**Resulting axis** (unnormalized):

$$\vec{C} = (\hat{B} \times \hat{A})(C_{-} - C_{+}) + \hat{A}(S_{+} + S_{-}) + \hat{B}(S_{+} - S_{-})$$

**Normalization:**

$$\hat{C} = \frac{\vec{C}}{|\vec{C}|} \cong \frac{\vec{C}}{\sin(c/2)}$$

The result is the rotation vector $c\,\hat{C}$.

**The identity singularity.** When $c \approx 0$, we have $\sin(c/2) \approx 0$ and the axis is indeterminate. Because the angle is computed first and independently, this is trivial to detect: if $c < \epsilon$, the result is $\vec{0}$ (identity). The analogous singularity in quaternion space — where the imaginary part vanishes at identity — is the same phenomenon, but in quaternion form it is entangled with the representation rather than cleanly separated.

**The $2\pi$ boundary.** Similarly, when $c \approx 2\pi$, $\sin(c/2) \approx 0$ again. This boundary requires the same handling.


### 5.5 Intrinsic vs. Extrinsic Rotations

The composition formula of §5.4 contains a cross product term $\hat{B} \times \hat{A}$. The cross product is anti-commutative: $\hat{B} \times \hat{A} = -\hat{A} \times \hat{B}$.

**Negating the cross product term switches between intrinsic and extrinsic rotation.**

An **intrinsic** rotation applies torque relative to the body's own frame — the rotation axis is fixed to the body and rotates with it. An **extrinsic** rotation applies torque relative to a fixed global frame — the rotation axis does not change as the body rotates.

In the quaternion formulation, the distinction between $q_1 q_2$ and $q_2 q_1$ (which differ by the sign of the cross product in the quaternion multiplication) corresponds to left- vs. right-multiplication, and thus to intrinsic vs. extrinsic application.

In the rotation vector formulation, a single sign flag on the cross product term controls the mode. The same rotation vector, the same formula, one sign change. This was discovered empirically: implementing the Rodrigues composition with the cross product in one orientation matched intrinsic (body-frame) rotations as generated by rotation matrices; inverting it matched extrinsic (global-frame) rotations and reproduced quaternion multiplication exactly.

The alternative to the sign flip is to transform the rotation vector into or out of the body frame before applying it: given the current orientation $q$ and a torque $\vec{r}$, the extrinsic application is equivalent to rotating $\vec{r}$ by $q^{-1}$ (removing the body frame), applying intrinsically, then rotating the result back.

[TODO: Demonstrate with the Hopf fibration demo — the animated cube that shows intrinsic rotation (body axes) vs. extrinsic rotation (global axes) with the same rotation vector input.]


### 5.6 Add Rotations (Simultaneous Torques)

When multiple rotational influences act at the same instant — not sequentially — vector addition is the correct operation:

$$\vec{r}_{\mathrm{total}} = \vec{r}_1 + \vec{r}_2 + \cdots + \vec{r}_n$$

This is commutative: the order of summation does not matter. This is physically correct — simultaneous torques have no ordering.

This applies in free-body dynamics: multiple thrust vectors from rocket engines, multiple forces producing torques about a center of mass. The cross product of the moment arm with the force gives a torque vector; summing all torque vectors gives the net angular acceleration. This sum is an addition of rotation vectors.

This does **not** apply when rotations are chained through a rigid hierarchy (a robot arm, a skeletal animation rig, a gimbal stack). Sequential application through constrained joints requires the composition formula of §5.4.

The distinction between these two cases — additive (simultaneous, commutative, Lie algebra) vs. multiplicative (sequential, non-commutative, Lie group) — is a core feature of the framework.


---

## Chapter 6: Connections to Existing Theory

### 6.1 The Lie Algebra $\mathfrak{so}(3)$

The space of rotation vectors $\mathbb{R}^3$, equipped with the cross product as the Lie bracket:

$$[\vec{u}, \vec{v}] = \vec{u} \times \vec{v}$$

is the Lie algebra $\mathfrak{so}(3)$. This is isomorphic to $\mathfrak{su}(2)$ (the algebra of traceless skew-Hermitian $2 \times 2$ matrices).

The additive composition of §5.6 is Lie algebra addition. The multiplicative composition of §5.4 is a closed-form expression for the Baker-Campbell-Hausdorff (BCH) formula on $\mathfrak{so}(3)$.

The BCH formula in general is an infinite series:

$$\ln(e^X e^Y) = X + Y + \tfrac{1}{2}[X,Y] + \tfrac{1}{12}([X,[X,Y]] - [Y,[X,Y]]) + \cdots$$

For a general Lie algebra this series does not terminate. But $\mathfrak{so}(3)$ is sufficiently constrained (dimension 3, simple) that the Rodrigues composition formula provides the exact result in closed form. The formula of §5.4 is the BCH formula for $\mathfrak{so}(3)$, fully evaluated.

### 6.2 The Lie Group $\mathrm{Spin}(3)$

The unit quaternions produced by the exponential map form $\mathrm{Spin}(3) \cong \mathrm{SU}(2) \cong S^3$. This is the universal (double) cover of $\mathrm{SO}(3)$.

The R3 Spin Group is a parameterization of $\mathrm{Spin}(3)$ — and, by projection, of $\mathrm{SO}(3)$ — that lives entirely in the Lie algebra $\mathbb{R}^3$, with group operations pulled back through the exponential map. The group multiplication in $\mathrm{Spin}(3)$ (quaternion multiplication) becomes the composition formula of §5.4 in $\mathbb{R}^3$.

### 6.3 The Hopf Fibration

The decomposition of a rotation into "direction the pole points" (latitude/longitude, two parameters) and "twist around the pole" (one parameter) is the Hopf fibration $S^1 \hookrightarrow S^3 \to S^2$. The $S^1$ fiber is the twist angle. The base space $S^2$ is the sphere of possible "up" directions. The total space $S^3$ is the full rotation group (as unit quaternions).

In the rotation vector parameterization, this structure is directly visible: the X-Z components of the rotation vector control the direction of the pole (latitude and longitude), while the Y component contributes to the twist. The Hopf fibration curves — the fibers — are generated naturally by varying the twist parameter while holding the pole direction fixed.

[TODO: Reference the live Hopf fibration demo at d3x0r.github.io/STFRPhysics/3d/index4.html. Include screenshots or figures.]


### 6.4 What Is New

The individual components are well known:
- The Rodrigues rotation formula (1840)
- The Lie algebra $\mathfrak{so}(3)$ and its exponential map
- The BCH formula
- The Hopf fibration

What this monograph provides is:

1. **A complete, self-contained computational framework** that stays in $\mathbb{R}^3$ throughout — no conversion to quaternions or matrices required at any point.

2. **The explicit closed-form composition formula** (§5.4) expressed directly in terms of axis-angle pairs, with clear handling of singularities.

3. **The intrinsic/extrinsic sign** (§5.5): a single cross-product sign that switches between body-frame and world-frame rotations.

4. **The clean separation of additive and multiplicative composition** (§5.5 vs. §5.6) as distinct physical operations with distinct mathematical content.

5. **Practical implementation** across multiple languages and platforms, including FPGA hardware, with empirical validation across a range of applications.

---

# Part III: Geometry of the Rotation Space

## Chapter 7: Parameterizations

### 7.1 Axis-Angle

Trivial: $\vec{r} = \theta\,\hat{a}$.

### 7.2 Latitude and Longitude

Convention: Y is up (pole), X is right (prime meridian), Z is forward.

$$\vec{r}(\mathrm{lat}, \mathrm{lng}) = \begin{cases}
(0,\; \mathrm{lng},\; 0) & \text{if } \mathrm{lat} = 0 \\[4pt]
(\mathrm{lat} \cdot \sin(\mathrm{lng}),\; 0,\; \mathrm{lat} \cdot \cos(\mathrm{lng})) & \text{if } \mathrm{lat} \neq 0
\end{cases}$$

The rotation vector lies in the X-Z plane with magnitude equal to the latitude (0 at the pole, $\pi$ at the antipode) and direction set by the longitude. The $\mathrm{lat} = 0$ case is a pure twist around Y.

### 7.3 From a Rotation Matrix

See §5.3. The angle is recovered from the trace, the axis from the skew-symmetric part.

### 7.4 Aligning an Axis

[TODO: The formula for generating a rotation vector that aligns a given reference axis (e.g., "up") with a target direction, optionally including a twist. This is the content from the "From basis" section in the working document, which needs clearer derivation and geometric explanation.]


## Chapter 8: Sphere Coverings and Curvature Groups

### 8.1 The Shell Structure

Rotation vector space has a concentric spherical shell structure. Each shell of thickness $2\pi$ covers the full rotation group:

- $|\vec{r}| \in [0, 2\pi)$: first cover
- $|\vec{r}| \in [2\pi, 4\pi)$: second cover  
- $|\vec{r}| \in [4\pi, 6\pi)$: third cover
- and so on.

Within each shell, every physical rotation has a unique representative (except at the boundaries). The `principal()` operation projects into the first shell.

For tracking angular velocity or accumulated winding, the full unbounded space is used. The shell index tracks the winding number.

### 8.2 Coordinate Conventions and Pole Structures

Working convention: X right, Y up, Z forward. North pole on Y. Prime meridian on X.

Orientations are built relative to the Y-axis pole. Latitude and longitude from the pole are rotations around the X and Z axes, moving Y to a new "up" direction. Around that new up, the twist (rotation about the local Y) defines the facing direction on the surface.

$$\vec{Q} = (\mathrm{lat} \cdot \sin(\mathrm{lng}),\; 0,\; \mathrm{lat} \cdot \cos(\mathrm{lng}))$$

An axis vector in the X-Z plane controls which direction the pole is tilted; its magnitude is how far from the pole. This is a concrete realization of the Hopf fibration base space ($S^2$, the sphere of "up" directions) as a subspace of rotation vector space.

### 8.3 Curvature Groups

A **polar curvature group** takes a base orientation $\vec{o}$ and generates a family of rotations relative to it. For input $(r, \gamma, \vec{o})$ — radius from the pole, angle around the pole, base orientation:

$$\vec{A} = R\!\left((r\cos\gamma, 0, 0),\; \vec{o},\; \theta\right) + R\!\left((0, 0, r\sin\gamma),\; \vec{o},\; \theta\right)$$

The twist applied after this mapping depends on the projection mode:

- **Weyl curvature**: twist by $+\gamma$ (parallel transport around the pole)
- **Polar-aligned, no stereographic projection**: twist by $-\gamma$
- **Stereographic, not polar-aligned**: twist by $-r$
- **Stereographic and polar-aligned**: twist by $+r$

[TODO: Explain each mode geometrically. What does the resulting field look like on the sphere? Include figures from the demos (index.html, index2.html, index3.html). Explain the relationship between these modes and standard differential geometry concepts (parallel transport, holonomy, stereographic projection of $S^3$).]

### 8.4 Poloidal Harmonics

[TODO: A variation on spherical harmonics that decomposes a function on the sphere as a sum of waves emitted from polar generators, rather than as products of associated Legendre polynomials and complex exponentials. This avoids the equatorial artifacts (latitude-aligned nodal lines) of standard spherical harmonics. Needs: definition of the generators, the resulting basis functions, comparison with $Y_l^m$, and demonstration of the improved behavior near the equator.]

---

# Part IV: Extended Applications

## Chapter 9: Further Applications

### 9.1 Quantum Spin

The rotation vector framework has applications to quantum spin measurement that are developed in a companion document: *Quantized Probability: Spin Measurement and Correlation Without Complex Numbers*. The key observation is that because the Pauli spin matrices generate $\mathfrak{su}(2)$ — the same Lie algebra parameterized by rotation vectors — the probability calculations for spin-½ measurement can be reformulated entirely in terms of real-valued rotation vectors, without invoking complex amplitudes. The companion paper develops this reformulation and examines its implications for Bell inequality tests and CHSH experiments.

## Chapter 10: Practical Computation

### 10.1 Implementation Notes

The composition formula (§5.4) is largely parallel: most operations are component-wise (additions, multiplications, dot products). The exception is the cross product, which mixes components. On SIMD architectures, the parallel portions vectorize directly.

Common subexpressions: $\sin\theta/\theta$ and $(1-\cos\theta)/\theta^2$ appear throughout (in the rotation matrix, the Rodrigues formula, and the composition). These should be computed once and reused.

### 10.2 Numerical Stability

Rotation vectors do not suffer from normalization drift — there is no constraint to maintain. The angle is a scalar magnitude, the axis is recovered by normalization only when needed.

The singularity at identity ($|\vec{r}| = 0$) is handled by detecting small magnitudes before dividing. Near identity, the rotation is well-approximated by the first-order terms ($\cos\theta \approx 1$, $\sin\theta \approx \theta$), giving:

$$R(\vec{x}, \vec{q}) \approx \vec{x} + \vec{q} \times \vec{x}$$

### 10.3 SLERP vs. Linear Interpolation

SLERP (spherical linear interpolation) on quaternions follows a geodesic on $S^3$ — it is an internal rotation between two orientations. Linear interpolation of rotation vectors in $\mathbb{R}^3$ follows a straight line in the Lie algebra, which does not correspond to a single fixed-axis rotation but rather a path whose instantaneous axis changes. However, recovering the differential rotation between two frames and applying it fractionally is straightforward in the rotation vector framework and produces the same geodesic.

[TODO: Comparison with figures. When does linear interpolation in the Lie algebra suffice? When is the geodesic (SLERP-equivalent) necessary?]

### 10.4 Rigid Body Hierarchies

Sequential composition (§5.4) for kinematic chains. Each joint rotation is composed with its parent's accumulated rotation. The rotation vector preserves winding number, so chains that pass through large accumulated angles (common in multi-segment robot arms) do not lose information.

### 10.5 Free-Body Dynamics

Additive composition (§5.6) for net torque computation. The cross product of the moment arm with the applied force gives a torque vector; these are summed to get net angular acceleration. Integration of angular velocity over time gives accumulated rotation.

The rotation speed limit: if we take the speed of light as a physical maximum, the maximum angular velocity for a body of radius $r$ occurs when the surface velocity reaches $c$. For a body of radius 0.3m, this is approximately one rotation per nanosecond, or $3 \times 10^9$ RPM.

---

# Appendices

## Appendix A: Derivation of the Composition Formula

[TODO: Full derivation from the quaternion multiplication identity. Show how expressing $q_1 q_2$ in terms of $(\hat{A}, a)$ and $(\hat{B}, b)$ using the half-angle exponential form yields the $S_{\pm}$, $C_{\pm}$ terms. Show the equivalence to the Rodrigues composition on the Wikipedia quaternion page.]

## Appendix B: Reference Implementations

[TODO: Implementations in JS, C, and GLSL. Reference the canonical JS implementation at STFRPhysics/3d/src/lnQuat.js. Include the core methods: `new`, `add`, `apply`, `applyInv`, `exp`, `getBasis`, `principal`, `torque`.]

## Appendix C: Interactive Demonstrations

Live WebGL demonstrations hosted at d3x0r.github.io/STFRPhysics/:

- **Hopf Fibration generator** (index4.html): Generates Hopf curves from the rotation vector parameterization. Shows intrinsic vs. extrinsic rotation on an animated cube.
- **5-segment arm, additive** (indexArm.html): Five rotation settings summed additively. Shows curvature evolution.
- **5-segment arm, proper** (indexArmProper.html): Five rotation settings composed sequentially through the chain. Demonstrates the difference between additive and multiplicative composition.
- **Relative rotations** (indexRelative.html): Five rotations showing curvature from 0.0–1.0 in 0.01 steps. Shows differential rotations.
- **Grid to sphere map** (indexSphereMap.html): Projects a regular grid onto a sphere using rotation vectors.
- **Curvature plots** (index3.html): Demonstrates free angle choice and free normal vector choice for curvature groups.

Desmos 3D visualizations:
- https://www.desmos.com/3d/t2gcnqzpef
- https://www.desmos.com/3d/do2eu1adeb

[TODO: Annotate each demo — what to look for, what parameters to adjust, what the visualization shows about the underlying mathematics.]

## Appendix D: The Wikipedia Contribution

[TODO: Reproduce (from the author's archive) the "Quaternion Natural Log" section that was contributed to the Wikipedia article "Rotation formalisms in three dimensions" and subsequently removed for lack of a published reference. This monograph serves as that reference.]

---

# References

Rodrigues, O. (1840). "Des lois géométriques qui régissent les déplacements d'un système solide dans l'espace." *J. Math. Pures Appl.* **5**: 380–440. [Online](http://sites.mathdoc.fr/JMPA/PDF/JMPA_1840_1_5_A39_0.pdf)

Arnold, M. et al. "Log-Quaternion Adder for FPGA Robotics Controller." *Proceedings of ARITH20*. [PDF](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf)

[TODO: Additional references — Hamilton (1843), Lie/Killing/Cartan for the algebraic context, Altmann's "Rotations, Quaternions, and Double Groups" for the covering theory, Stillwell's "Naive Lie Theory" as a model for accessible exposition, and the various references already collected in the STFRPhysics README.]
