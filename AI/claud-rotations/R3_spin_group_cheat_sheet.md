# R3 Spin Group Cheat Sheet
## Commonly Used Expressions

**Scope.** This is a compact working reference for the rotation-vector / log-quaternion framework used in the R3 Spin Group monograph. It emphasizes the expressions most likely to be reused in derivations, code, and practical computation.

---

## 1. Rotation vector basics

**Rotation vector**

$$\vec{r} \in \mathbb{R}^3, \qquad \hat{a}=\frac{\vec{r}}{|\vec{r}|}, \qquad \theta=|\vec{r}|$$

- direction = axis
- magnitude = angle in radians
- identity = $\vec{0}$

**Angular-velocity interpretation**

$$\vec{r}(\Delta t)=\vec{\omega}\,\Delta t$$

Use the same formulas for finite orientation or for an incremental time-step rotation.

---

## 2. Exponential / logarithm

**Quaternion from rotation vector**

$$q = \exp\!\left(\frac{\vec{r}}{2}\right)
= \left(\cos\frac{|\vec{r}|}{2},\; \hat{a}\,\sin\frac{|\vec{r}|}{2}\right)$$

**Half-angle algebra element**

$$\vec{u}=\frac{\vec{r}}{2}$$

Then

$$\exp(\vec{u}) = \left(\cos|\vec{u}|,\; \hat{u}\,\sin|\vec{u}|\right)$$

**Quaternion logarithm**

For a unit quaternion $q=(w,\vec{v})$ with $|\vec{v}|\neq 0$,

$$\log q = \hat{v}\,\arccos(w)
= \hat{v}\,\operatorname{atan2}(|\vec{v}|,w)$$

where

$$\hat{v}=\frac{\vec{v}}{|\vec{v}|}$$

**Full physical rotation vector from quaternion**

$$\vec{r}=2\log q$$

**Half-angle convention**

If

$$q = \left(\cos\frac{\theta}{2},\; \hat{n}\,\sin\frac{\theta}{2}\right),$$

then

$$\log q = \hat{n}\,\frac{\theta}{2}, \qquad \vec{r}=\hat{n}\,\theta = 2\log q$$

---

## 3. Rotate a vector (Rodrigues)

**Axis-angle form**

$$R(\vec{x},\hat{a},\theta)=\cos\theta\,\vec{x}+\sin\theta\,(\hat{a}\times\vec{x})+(1-\cos\theta)(\hat{a}\cdot\vec{x})\hat{a}$$

**Rotation-vector form**

$$R_{\vec{r}}(\vec{x})=R\!\left(\vec{x},\frac{\vec{r}}{|\vec{r}|},|\vec{r}|\right)$$

**Inverse rotation**

$$R^{-1}_{\vec{r}}(\vec{x}) = R_{-\vec{r}}(\vec{x})$$

---

## 4. Small-angle forms

For $\theta\to 0$:

$$\sin\theta \approx \theta - \frac{\theta^3}{6}, \qquad \cos\theta \approx 1 - \frac{\theta^2}{2}$$

**Useful normalized forms**

$$\frac{\sin\theta}{\theta} \approx 1 - \frac{\theta^2}{6}$$

$$\frac{1-\cos\theta}{\theta^2} \approx \frac{1}{2} - \frac{\theta^2}{24}$$

**Linearized rotation**

$$R_{\vec{r}}(\vec{x}) \approx \vec{x} + \vec{r}\times\vec{x}$$

**Near-identity quaternion log**

If $q=(w,\vec{v})$ is near identity,

$$\log q \approx \vec{v}, \qquad \vec{r} \approx 2\vec{v}$$

---

## 5. Rotation matrix from rotation vector

Let

$$
\hat{\mathbf r} = (\hat r_x,\hat r_y,\hat r_z), \qquad
\theta = \lVert \mathbf r \rVert, \qquad
s=\sin\theta, \quad c=\cos\theta, \quad m=1-c.
$$

The full rotation matrix is

$$
M(\mathbf r)=
\begin{bmatrix}
c + m\,\hat r_x^2
  & m\,\hat r_x\hat r_y - s\,\hat r_z
  & m\,\hat r_x\hat r_z + s\,\hat r_y \\[4pt]
m\,\hat r_x\hat r_y + s\,\hat r_z
  & c + m\,\hat r_y^2
  & m\,\hat r_y\hat r_z - s\,\hat r_x \\[4pt]
m\,\hat r_x\hat r_z - s\,\hat r_y
  & m\,\hat r_y\hat r_z + s\,\hat r_x
  & c + m\,\hat r_z^2
\end{bmatrix}.
$$

Read column-wise, the matrix gives the rotated basis axes directly:

$$
M(\mathbf r)=\bigl[\,R(\mathbf r)\;\;U(\mathbf r)\;\;F(\mathbf r)\,\bigr]
$$

with shorthand

$$
R(\mathbf r)\equiv \operatorname{Right}(\mathbf r), \qquad
U(\mathbf r)\equiv \operatorname{Up}(\mathbf r), \qquad
F(\mathbf r)\equiv \operatorname{Forward}(\mathbf r).
$$

So the basis vectors are the matrix columns:

**Right axis** (image of $(1,0,0)$)
$$
R(\mathbf r)=\operatorname{Right}(\mathbf r)=
\begin{pmatrix}
c + m\,\hat r_x^2 \\[3pt]
s\,\hat r_z + m\,\hat r_x\hat r_y \\[3pt]
-s\,\hat r_y + m\,\hat r_x\hat r_z
\end{pmatrix}.
$$

**Up axis** (image of $(0,1,0)$)
$$
U(\mathbf r)=\operatorname{Up}(\mathbf r)=
\begin{pmatrix}
-s\,\hat r_z + m\,\hat r_y\hat r_x \\[3pt]
c + m\,\hat r_y^2 \\[3pt]
s\,\hat r_x + m\,\hat r_y\hat r_z
\end{pmatrix}.
$$

**Forward axis** (image of $(0,0,1)$)
$$
F(\mathbf r)=\operatorname{Forward}(\mathbf r)=
\begin{pmatrix}
s\,\hat r_y + m\,\hat r_z\hat r_x \\[3pt]
-s\,\hat r_x + m\,\hat r_z\hat r_y \\[3pt]
c + m\,\hat r_z^2
\end{pmatrix}.
$$

This is the cleanest way to connect the basis functions to the matrix/tensor viewpoint: \(R,U,F\) are not extra definitions layered on top of the matrix; they are the matrix columns themselves.


## 6. Recover rotation vector from matrix

**Angle from trace**

$$\theta = \cos^{-1}\!\left(\frac{\operatorname{tr}(M)-1}{2}\right)$$

**Axis from skew part**

$$\vec{a}=(m_{12}-m_{21},\;m_{20}-m_{02},\;m_{01}-m_{10})$$

$$\hat{a}=\frac{\vec{a}}{|\vec{a}|}, \qquad \vec{r}=\theta\,\hat{a}$$

Special care is needed when $\theta\approx 0$ or $\theta\approx \pi$.

---

## 7. Compose rotations (sequential)

Given $(\hat{A},a)$ and $(\hat{B},b)$:

**Half-angle terms**

$$S_{+}=\sin\frac{a+b}{2}, \quad C_{+}=\cos\frac{a+b}{2}$$

$$S_{-}=\sin\frac{a-b}{2}, \quad C_{-}=\cos\frac{a-b}{2}$$

**Result angle**

$$c = 2\cos^{-1}\frac{(\hat{A}\cdot\hat{B})(C_{+}-C_{-})+C_{-}+C_{+}}{2}$$

**Result axis (unnormalized)**

$$\vec{C}=(\hat{B}\times\hat{A})(C_{-}-C_{+})+\hat{A}(S_{+}+S_{-})+\hat{B}(S_{+}-S_{-})$$

**Normalize**

$$\hat{C}=\frac{\vec{C}}{|\vec{C}|}, \qquad \vec{r}_{\text{out}}=c\,\hat{C}$$

When $c\approx 0$ or $c\approx 2\pi$, the axis is indeterminate; return identity or handle the boundary explicitly.

---

## 8. Composition operator and rotation updates

This section uses the same sequential composition law as the monograph’s composition section. Write composition as

$$
\mathbf{r}_2 \circ \mathbf{r}_1,
$$

meaning “apply $\mathbf{r}_1$ first, then apply $\mathbf{r}_2$.”

The two most useful update operators are:

**Rotate a point**
$$
\mathcal{P}(\mathbf{r},\mathbf{x}) = R_{\mathbf{r}}(\mathbf{x}).
$$

**Rotate a rotation / update an orientation**
$$
\mathcal{R}_{\mathrm{int}}(\mathbf{r},\mathbf{d}) = \mathbf{d} \circ \mathbf{r},
$$

for an intrinsic/body-frame update, and

$$
\mathcal{R}_{\mathrm{ext}}(\mathbf{r},\mathbf{d}) = \mathbf{r} \circ \mathbf{d},
$$

for an extrinsic/world-frame update.

Let a pure turn about unit axis $\hat{\mathbf{u}}$ by angle $\phi$ be

$$
\mathcal{T}(\hat{\mathbf{u}},\phi) = \phi\,\hat{\mathbf{u}}.
$$

Using the basis vectors already defined in Section 5,

$$
R(\mathbf r), \qquad U(\mathbf r), \qquad F(\mathbf r),
$$

the local intrinsic updates are

$$
\operatorname{Yaw}(\mathbf{r},\phi) = \mathcal{R}_{\mathrm{int}}\!\bigl(\mathbf{r},\mathcal{T}(U(\mathbf{r}),\phi)\bigr),
$$

$$
\operatorname{Pitch}(\mathbf{r},\phi) = \mathcal{R}_{\mathrm{int}}\!\bigl(\mathbf{r},\mathcal{T}(R(\mathbf{r}),\phi)\bigr),
$$

$$
\operatorname{Roll}(\mathbf{r},\phi) = \mathcal{R}_{\mathrm{int}}\!\bigl(\mathbf{r},\mathcal{T}(F(\mathbf{r}),\phi)\bigr).
$$

The corresponding world-frame versions are obtained by replacing $\mathcal{R}_{\mathrm{int}}$ with $\mathcal{R}_{\mathrm{ext}}$.

Conventions used here:

1. **Right-handed basis.**
2. **Forward axis = +Z**, matching the basis-extractor formulas used in the monograph and this sheet.
3. **Intrinsic / body-frame updates** are the default for `Yaw`, `Pitch`, and `Roll`; world-frame variants are obtained by replacing $\mathcal{R}_{\mathrm{int}}$ with $\mathcal{R}_{\mathrm{ext}}$.
4. **Axis-image reading for extracted basis axes:** `Right(r)`, `Up(r)`, and `Forward(r)` are the images of the standard basis axes under the current rotation, matching the monograph’s “columns are the images of the axes” reading.

## 9. Intrinsic vs. extrinsic sign

The sign of the cross-product term switches the interpretation.

**Intrinsic / body-frame** and **extrinsic / world-frame** forms differ by

$$\hat{B}\times\hat{A} \longleftrightarrow -\,(\hat{B}\times\hat{A})$$

A single sign flag can therefore select body-frame vs. world-frame application.

---

## 10. Simultaneous torques (add, do not compose)

When torques act simultaneously,

$$\vec{r}_{\text{total}}=\vec{r}_1+\vec{r}_2+\cdots+\vec{r}_n$$

Use **vector addition** for simultaneous influences; use **composition** only for sequentially chained rotations.

---

## 11. Lie-algebra viewpoint

**Bracket**

$$[\vec{u},\vec{v}] = \vec{u}\times\vec{v}$$

**BCH series (general form)**

$$\log(e^X e^Y)=X+Y+\tfrac12[X,Y]+\tfrac1{12}([X,[X,Y]]-[Y,[X,Y]])+\cdots$$

In $\mathfrak{so}(3)$ / $\mathbb{R}^3$, the closed-form composition formula above is the exact evaluated result.

---

## 12. Principalization / winding

**Physical rotation** lives modulo $2\pi$ in $\mathrm{SO}(3)$, but the rotation-vector representation can track full winding.

Use a principal projection only when needed for display or canonical comparison; do **not** discard winding when accumulated rotation matters.

---

## 13. Most useful implementation snippets

**Normalize safely**

$$\hat{r}=\frac{\vec{r}}{|\vec{r}|} \quad \text{only if } |\vec{r}|>\epsilon$$

**Quaternion from physical rotation vector**

$$q=\left(\cos\frac{|\vec{r}|}{2},\;\hat{r}\sin\frac{|\vec{r}|}{2}\right)$$

**Physical rotation vector from quaternion**

$$\vec{r}=2\,\frac{\vec{v}}{|\vec{v}|}\,\operatorname{atan2}(|\vec{v}|,w)$$

**Rotate a vector**

$$\vec{x}'=\cos\theta\,\vec{x}+\sin\theta\,(\hat{a}\times\vec{x})+(1-\cos\theta)(\hat{a}\cdot\vec{x})\hat{a}$$

---

## 14. Mental checklist

- axis = direction
- angle = magnitude
- quaternion stores **half-angle**
- $\log q$ returns **half-angle algebra element**
- full physical rotation vector = $2\log q$
- add simultaneous torques
- compose sequential rotations
- preserve winding unless principalization is explicitly desired

---

## 15. Cross-product shortcuts that produce Rotation Vectors

These are useful helper constructions, not replacements for the full composition law.

Given two ordinary linear vectors $\vec a$ and $\vec b$ in $\mathbb{R}^3$ (not Rotation Vectors), first normalize them if needed:

$$
\hat a=\frac{\vec a}{\lVert \vec a \rVert}, \qquad
\hat b=\frac{\vec b}{\lVert \vec b \rVert}.
$$

**Axis from two directions**
$$
\hat{\mathbf{n}} \propto \hat a \times \hat b.
$$

The cross product gives the oriented axis perpendicular to both directions. Its magnitude is

$$
\lVert \hat a \times \hat b \rVert = \sin\theta,
$$

where $\theta$ is the angle from $\hat a$ to $\hat b$.

**Exact Rotation Vector from two directions**
$$
\vec r_{a\to b} = \theta \, \frac{\hat a \times \hat b}{\lVert \hat a \times \hat b \rVert},
$$

with

$$
\theta = \arccos(\hat a \cdot \hat b),
$$

provided $\hat a \times \hat b \neq \mathbf{0}$.

This gives the Rotation Vector that turns $\hat a$ into $\hat b$ along the principal branch.

**Small-angle shortcut**
$$
\vec r_{a\to b} \approx \hat a \times \hat b.
$$

For small $\theta$, one has $\sin\theta \approx \theta$, so the raw cross product is already a good small-angle Rotation Vector.

**Atan2 version**
$$
\vec r_{a\to b} = \operatorname{atan2}\!\bigl(\lVert \hat a \times \hat b \rVert,\hat a \cdot \hat b\bigr)
\frac{\hat a \times \hat b}{\lVert \hat a \times \hat b \rVert}.
$$

This is often the cleanest one-line formula.

**Use cases**

- align one direction vector to another
- build an error Rotation Vector for steering / control
- compute a shortest-turn correction between forward directions
- make a small local correction from current axis to desired axis

**Boundary case**

If $\hat a \times \hat b = \mathbf{0}$, then the directions are parallel or anti-parallel:
- parallel $\Rightarrow \mathbf{r} = \mathbf{0}$
- anti-parallel $\Rightarrow$ the axis is not determined by the cross product alone; choose any unit axis perpendicular to $\hat a$ and use angle $\pi$

This is a directional-alignment helper. It starts from two ordinary linear direction vectors and constructs a Rotation Vector that aligns one to the other along the principal branch. It is not the same thing as the general finite composition law
$$
\mathbf{r}_2 \circ \mathbf{r}_1,
$$
which combines two already-realized rotations rather than aligning one direction vector to another.

## 16. Native interpolation / integration (SLERP-equivalent)

The native interpolation law is not ordinary quaternion SLERP. It is better understood as **partial reapplication of the remaining relative rotation**.

Given a current rotation $q$, a target rotation $p$, and a parameter $t$:

1. Remove the current rotation from the target to recover the remaining relative turn.
2. Recover the corresponding delta axis and delta angle.
3. Reapply only the fraction $t$ of that remaining turn back onto $q$.

In compact notation,

$$
\Delta(q,p) = \text{relative rotation taking } q \text{ toward } p,
$$

$$
\operatorname{Interp}(q,p,t) = \mathcal{R}\!\bigl(q,\; t\,\Delta(q,p)\bigr).
$$

This is the native Rotation-Vector / log-quaternion analogue of SLERP.

**Path versus endpoint**

Standard quaternion SLERP works on orientation classes. It may replace the supplied target by an equivalent endpoint representative in order to take the shortest arc. That preserves the final orientation in $SO(3)$, but it does **not** preserve the intended covered-space path or winding.

So the issue is not “same endpoint versus different endpoint” in the strict covered-space sense. It is

- **same represented path?** not necessarily
- **equivalent final orientation?** yes

In particular, a target that was intended as a long-path representative may be silently rewritten as a shorter equivalent representative before interpolation.

The native interpolation law does not do that collapse. The path is determined by the actual Rotation Vectors $q$ and $p$ that are supplied. If the target is constructed as a long-path representative, that long path is what is interpolated.

For example, a target represented as \(270^\circ\) about \(+Y\) remains that represented turn. It is not silently rewritten as \(-90^\circ\) or as the opposite-axis short path.

**Why use this instead of ordinary SLERP?**

- It is built in the native covered-space language of the framework.
- It is robust under branch-aware continuation.
- It preserves the represented path / winding that was actually supplied.
- It supports continuous extrapolation with $t<0$ and $t>1$.
- It does not force every interpolation onto the shortest equivalent arc.

Ordinary quaternion SLERP is mainly reliable on its standard interval

$$
0 \le t \le 1.
$$

and even there it is fundamentally a shortest-arc interpolation between equivalent endpoint orientations. Past that interval it quickly departs from the intended continuation.

The native interpolation/integration law is designed to continue naturally beyond that range.

**Practical reading**

- $t=0$ returns the current rotation $q$
- $t=1$ returns the target rotation $p$
- $0<t<1$ interpolates toward $p$
- $t>1$ extrapolates beyond $p$
- $t<0$ continues away from $p$ in the opposite direction

This is best thought of as a robust covered-space integration law rather than as a shortest-arc quaternion interpolation.

