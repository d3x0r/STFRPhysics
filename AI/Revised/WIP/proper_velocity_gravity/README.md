# Proper-Velocity Gravity, Optical Closure, and Static Displacement

**18 October exterior-closure results:** [Mercury, direct light and spin
transport, escape, tides, and draft erratum](closure-observable-results.md).
**19 October consolidation:** the dynamics paper main text and checkpoint status now agree with these results.
This dated update supersedes the older position-only orbital response for
exterior weak-field motion; historical explorations below remain available.


*Working note — 2026-09-28*

## Status

This note records a line of investigation rather than a finished strong-field model. Its purpose is to keep several related ideas in one consistent vocabulary:

- velocity composition is additive in proper velocity, not rapidity;
- gravitational acceleration may be read as proper velocity added per second, with
  the identity of that clock (stationary local observer or moving body) left explicit;
- time dilation and acceleration have different radial curves because one tracks accumulated depth and the other its gradient;
- a photon may remain on a straight coordinate-$c$ propagation segment while changing material endpoint states produce the observed optical effects;
- freely falling matter, its electron clouds, its measuring rods, and the local transport basis may co-deform, suppressing both uniform-acceleration and part of the naive tidal signal;
- the square-root shell map supplies the static displacement geometry and its radial, tangential, and accumulated-depth factors.

The note deliberately keeps competing strong-field closures visible. Agreement in the weak field does not decide between them.

## 1. Proper velocity is the additive velocity variable

Let $v$ be bounded physical velocity and let $U$ be proper velocity:

\[
U(v)=\frac{v}{\sqrt{1-v^2/c^2}},
\qquad
v(U)=\frac{U}{\sqrt{1+U^2/c^2}}.
\]

The endpoint composition rule used by the propagation framework is ordinary addition in $U$ followed by inversion back to $v$:

\[
U_{12}=U_1+U_2,
\qquad
v_{12}=\frac{U_{12}}{\sqrt{1+U_{12}^2/c^2}}.
\]

This is not rapidity addition. Rapidity remains a useful parameterization, but it is not taken here as the primary additive state variable.

The Lorentz timing factor expressed in proper velocity is

\[
\gamma(U)=\sqrt{1+\frac{U^2}{c^2}}=\frac{\sqrt{U^2+c^2}}{c}.
\]

With $c=1$,

\[
\gamma(U)=\sqrt{U^2+1},
\qquad
\gamma^2-U^2=1.
\]

The graph of $\gamma$ against signed proper velocity $U$ is therefore the upper branch of a hyperbola. The realized clock rate is its reciprocal:

\[
\frac{d\tau}{dt}=\frac{1}{\gamma(U)}=\frac{1}{\sqrt{1+U^2/c^2}}.
\]

The graph is symmetric under $U\mapsto -U$. Time dilation depends on the magnitude of the proper-velocity state, not its sign.

## 2. Proper acceleration and the timing curve

Define a collinear rate of proper-velocity change per local second:

\[
A_U=\frac{dU}{dt_{\mathrm{local}}}.
\]

The symbol $t_{\mathrm{local}}$ is incomplete until the clock is named. A
stationary local observer's time $t_{\mathrm{stat}}$ and the moving body's own
time $\tau$ satisfy $dt_{\mathrm{stat}}=\gamma(U)d\tau$. The examples immediately
below use $t_{\mathrm{local}}=t_{\mathrm{stat}}$. Section 12.8 compares the two
clock choices for gravitational escape.

For constant $A_U$ beginning from rest,

\[
U(t)=A_Ut,
\]

\[
v(t)=\frac{A_Ut}{\sqrt{1+A_U^2t^2/c^2}},
\]

\[
\gamma(t)=\sqrt{1+\frac{A_U^2t^2}{c^2}}.
\]

Thus acceleration and time dilation do have different curves. Proper velocity grows linearly under constant $A_U$, physical velocity approaches $c$ asymptotically, and $\gamma$ follows the hyperbolic square-root curve.

For example,

\[
U=c \quad\Longrightarrow\quad v=\frac{c}{\sqrt{2}}\approx0.707c,
\]

\[
U=2c \quad\Longrightarrow\quad v=\frac{2c}{\sqrt{5}}\approx0.894c.
\]

The corresponding ordinary velocity acceleration is

\[
\frac{dv}{dt_{\mathrm{local}}}=\frac{A_U}{\left(1+U^2/c^2\right)^{3/2}}
\]

for collinear motion. A field may therefore continue adding the same amount of proper velocity per local second while producing progressively smaller changes in bounded physical velocity.

## 3. Gravitational acceleration is a gradient; clock depth is an integral

Let the positive gravitational depth be

\[
\Sigma(r)=\frac{GM}{rc^2}
\]

in the weak-field exterior of an isolated source. Its gradient gives the Newtonian acceleration magnitude:

\[
A_g(r)=c^2\left|\frac{d\Sigma}{dr}\right|=\frac{GM}{r^2}.
\]

The different radial curves are therefore expected:

\[
\Sigma(r)\propto\frac{1}{r},
\qquad
A_g(r)\propto\frac{1}{r^2}.
\]

Acceleration is the local slope of gravitational depth. Time dilation depends on the accumulated depth, not directly on the local slope.

### 3.1 Stationary-clock acceleration closure

Here $t_{\mathrm{stat}}$ means a stationary local second. Let $\ell$ be locally
measured radial distance, so $d\ell=L(r)dr$, and let $A_s(\ell)>0$ be the
outward body's deceleration magnitude in $U$ per stationary local second.

Take

\[
\frac{dU}{dt_{\mathrm{stat}}}=-A_s(\ell),
\qquad
\frac{d\ell}{dt_{\mathrm{stat}}}=v(U).
\]

The relativistic kinetic energy per unit rest mass is

\[
K(U)=c^2\left(\gamma(U)-1\right).
\]

Its rate of change is

\[
\frac{dK}{dt_{\mathrm{stat}}}=-vA_s.
\]

Consequently,

\[
\frac{dK}{d\ell}=-A_s.
\]

Define the positive escape depth

\[
\Phi_s(r)=\int_{\ell(r)}^\infty A_s(\lambda)\,d\lambda.
\]

Marginal escape then gives

\[
\gamma_{\mathrm{esc}}(r)-1=\frac{\Phi_s(r)}{c^2},
\]

\[
U_{\mathrm{esc}}(r)=c\sqrt{\left(1+\frac{\Phi_s(r)}{c^2}\right)^2-1},
\]

\[
v_{\mathrm{esc}}(r)=c\sqrt{1-\left(1+\frac{\Phi_s(r)}{c^2}\right)^{-2}}.
\]

For the weak-field exterior approximation $L\approx1$ and
$A_s\approx GM/r^2$, one obtains $\Phi_s\approx GM/r=\Sigma c^2$.
Promoting that depth to an exact strong-field form gives

\[
\gamma_{\mathrm{esc}}=1+\Sigma,
\]

\[
U_{\mathrm{esc}}=c\sqrt{2\Sigma+\Sigma^2},
\]

\[
v_{\mathrm{esc}}=c\sqrt{1-\frac{1}{(1+\Sigma)^2}}.
\]

If the escape kinetic gamma is identified with the inverse static clock rate,
this closure gives the existing framework clock factor

\[
N(r)=\frac{1}{1+\Sigma(r)}.
\]

### 3.2 Body-clock acceleration closure

Alternatively, let $A_b>0$ denote proper-velocity deceleration per second on the
moving body's own clock. Because $d\ell/d\tau=U$, its integrated depth is

\[
\Phi_b(r)=\int_{\ell(r)}^\infty A_b(\lambda)\,d\lambda.
\]

The corresponding exact proper-velocity escape condition is

\[
U_{\mathrm{esc}}^2=2\Phi_b.
\]

For the weak-field exterior approximation $L\approx1$ and
$A_b\approx GM/r^2$, promoting $\Phi_b\approx GM/r$ to an exact strong-field
form gives

\[
U_{\mathrm{esc}}=\sqrt{\frac{2GM}{r}}=c\sqrt{2\Sigma}.
\]

The associated physical escape speed and timing factor are

\[
v_{\mathrm{esc}}=c\sqrt{\frac{2\Sigma}{1+2\Sigma}},
\]

\[
\gamma_{\mathrm{esc}}=\sqrt{1+2\Sigma}.
\]

At $r_s=2GM/c^2$, where $\Sigma=1/2$,

\[
U_{\mathrm{esc}}=c,
\qquad
v_{\mathrm{esc}}=\frac{c}{\sqrt{2}}\approx0.707c.
\]

This is the cleanest version of the proposed finite, subluminal physical escape
speed at the radius conventionally called $r_s$. It is not by itself a result
about escaping a general-relativistic event horizon. It differs from the
stationary-second closure beyond the weak field. The difference begins at second
order in $\Sigma$ and depends on which clock defines the acceleration law.

Under the stationary-clock closure, the same surface instead gives

\[
U_{\mathrm{esc}}=\frac{\sqrt{5}}{2}c\approx1.118c,
\qquad
v_{\mathrm{esc}}=\frac{\sqrt{5}}{3}c\approx0.745c.
\]

Both closures remove a finite-radius $v=c$ escape boundary. Their quantitative strong-field predictions differ.

## 4. Large acceleration does not imply large accumulated depth

The statement $A=c$ per second is a statement about a local rate. Strong gravitational depth is controlled by the spatial integral of that rate.

For a point exterior,

\[
A(r)=\frac{GM}{r^2}.
\]

The radius at which $A=c/(1\,\mathrm{s})$ is

\[
r_{c/\mathrm{s}}=\sqrt{\frac{GM(1\,\mathrm{s})}{c}}.
\]

For one solar mass this is approximately

\[
r_{c/\mathrm{s}}\approx665\,\mathrm{km}
\approx225r_s.
\]

The gravitational depth there is only

\[
\Sigma\approx2.22\times10^{-3}.
\]

The field can therefore add proper velocity at more than $c$ per second locally while the total escape requirement remains much less than $c$. The distance over which the acceleration acts is essential.

The acceleration points inward. Escape requires an outward interaction that overcomes or reverses the accumulated inward proper velocity. The central strong-field claim is kinematic possibility, not low energetic cost: the required outward proper impulse is finite, and there is no one-way light-speed boundary.

## 5. Straight light propagation and changing material endpoints

The propagation picture considered here does not require a continuously curved photon trajectory. A photon segment is written in transport coordinates as

\[
\mathbf{x}_\gamma(t)=\mathbf{x}_E(t_e)+c\hat{\mathbf n}(t-t_e).
\]

Reception is the intersection condition

\[
\mathbf{x}_\gamma(t_r)=\mathbf{x}_R(t_r).
\]

The ray is linear, while emitter and receiver states change around it. Emission-side aberration, forward interception, reception-side aberration, clock rate, and material deformation remain distinct stages.

For approximately constant transverse acceleration during a flight time $T$,

\[
\Delta U_\perp\approx A_\perp T,
\]

\[
\Delta x_\perp\approx\frac{1}{2}a_{\perp,\mathrm{coord}}T^2.
\]

The relevant small parameter over a baseline $L\approx cT$ is

\[
\epsilon_A=\frac{A_\perp L}{c^2}.
\]

A physically accelerated apparatus is stressed. Its nuclei, electron clouds, cavity supports, mirrors, and detector bases do not remain in their previous equilibrium state. After internal transients propagate through the apparatus, those components may settle into an acceleration-dependent co-moving optical state.

A freely falling gravitational apparatus is different. If the displacement field updates matter and local transport together, the common gravitational acceleration supplies no internal supported reference against which a local photon experiment can measure that acceleration. A photon-based accelerometer can respond to thrust, support stress, a free proof mass, or differential acceleration, while reading zero for common-mode free fall.

## 6. Pound–Rebka as an endpoint comparison

The endpoint interpretation of gravitational redshift is retained here. In a stationary field, a photon is emitted with a transport energy fixed at emission and propagates without continuously gaining or losing that transport energy. The source and absorber realize different local clock and resonance rates because they occupy different gravitational depths.

Pound–Rebka therefore measures an endpoint resonance mismatch:

\[
\frac{f_R}{f_E}=\frac{(d\tau/dt)_E}{(d\tau/dt)_R}.
\]

The experiment does not, by itself, distinguish an in-transit photon-energy narrative from an endpoint clock-rate narrative. Within this framework, the latter is primary.

## 7. Tidal convergence must be compared with deformed rulers

The naive exterior Newtonian tidal tensor has the eigenvalue pattern

\[
T_N(r)=\frac{GM}{r^3}
\operatorname{diag}(2,-1,-1).
\]

It stretches a freely falling separation radially and compresses it in the two transverse directions.

The displacement geometry uses the opposite anisotropic pattern for local transport cells:

\[
E(r)=\operatorname{diag}\!\left(D^{-1},D,D\right).
\]

It compresses the radial basis and stretches the two tangential bases. Consequently, a measured tidal effect cannot be obtained by evolving coordinate separations while holding the rulers fixed.

If $\boldsymbol\xi$ is a coordinate separation and $\boldsymbol\ell$ is its locally realized representation,

\[
\boldsymbol\ell=E(r)\boldsymbol\xi.
\]

Along an inward trajectory,

\[
\ddot{\boldsymbol\ell}=E\ddot{\boldsymbol\xi}+2\dot E\dot{\boldsymbol\xi}+\ddot E\boldsymbol\xi.
\]

The first term contains coordinate tidal convergence. The remaining terms contain the changing ruler and transport basis. These contributions have the structure required to counter part of the naive tide.

The observable is therefore a residual:

\[
T_{\mathrm{observed}}=T_{\mathrm{trajectory}}-T_{\mathrm{co\text{-}deformation}}.
\]

Perfect local co-deformation would remove the corresponding optical and material signal. A finite room can still detect variation of the deformation across its extent. The remaining signal depends on spatial derivatives of the displacement map, not merely on the value of $GM/r^3$ calculated with undeformed rulers.

## 10. Questions that must be resolved

1. Is the primary gravitational field variable the displacement length $\Delta r$, the shell ratio $F$, the accumulated depth $\Sigma$, or a derived combination?
2. Is acceleration proportional to $\Delta r$, to a derivative of the shell map, or to the gradient of an independently accumulated depth?
3. Does the gravitational field specify a change of $U$ per body second or per stationary local second, and what radial ruler $L(r)$ measures the work integral?
4. Does the source radius $d$ equal $r_s$, a nuclear support radius, or a separately normalized displacement scale?
5. What interior density/support law makes the acceleration vanish smoothly at the center?
6. How much of the coordinate tidal tensor survives after matter, electron clouds, rulers, and transport are evolved in the same deformed basis?
7. Does a complete emitter–propagation–receiver calculation cancel acceleration-dependent optical deflection in free fall while retaining a thrust-dependent photon-accelerometer signal?

## 11. Immediate next calculation

The next useful calculation is not another weak-field expansion. It is a coupled radial free-fall calculation with four explicitly separated quantities:

\[
\left\{r(t),U(t),E(r),\Sigma(r)\right\}.
\]

The calculation should evolve

\[
\frac{dU}{dt_{\mathrm{local}}}=A(r),
\qquad
\frac{dr}{dt_{\mathrm{local}}}=v(U),
\]

together with a neighboring trajectory and the changing local deformation basis. It should then compare:

- coordinate separation;
- separation in co-deformed local meters;
- endpoint clock-rate difference;
- straight-ray emitter/receiver interception;
- residual optical angle or phase after endpoint aberration.

That calculation would determine whether the apparent cancellations discussed here are exact identities, weak-field coincidences, or partial strong-field effects.

## 12. Declared depth and the clock–acceleration audit

Sections 3.1–3.2 derive the stationary-clock and body-clock escape closures.
This section audits their common depth variable rather than restating their
$U$, $v$, gamma, and clock-rate formulas. Those curves need not have the same
radial shape, but their relation must be declared. For weak-exterior
Newtonian-style potential bookkeeping, define

\[
s(r)=\frac{\Phi(r)}{c^2},
\qquad
A(r)=-c^2\frac{ds}{dr}.
\]

With $r$ positive outward and $s$ decreasing outward, $A$ is the positive
inward acceleration magnitude and the signed radial component is $-A$.
Section 16 revisits this derivative when the local radial ruler is compressed.

For the ordinary exterior inverse-radius depth,

\[
s(r)=\frac{GM}{c^2r},
\qquad
|A(r)|=\frac{GM}{r^2}.
\]

The two algebraic closures in Section 3 map this depth into different escape
and clock curves while agreeing at first weak-field order. The stricter fork
is whether $s$ denotes a potential depth, an integrated displacement depth,
or accumulated logarithmic clock depth. Those choices are not interchangeable
in the strong field.

### 12.1 Exact clock–acceleration consistency

Let $N(r)$ be the local static clock rate relative to infinity and let
$\gamma_g(r)=1/N(r)$. If acceleration is identified with the local proper
acceleration associated with a static lapse gradient, the magnitude relation is

\[
A_{\mathrm{clock}}(r)=c^2\left|\frac{d\ln N}{d\ell}\right|=c^2\left|\frac{d\ln\gamma_g}{d\ell}\right|,
\]

where $d\ell$ is proper radial distance. If $d\ell=L_r(r)dr$, then

\[
A_{\mathrm{clock}}(r)=\frac{c^2}{L_r(r)}
\left|\frac{d\ln\gamma_g}{dr}\right|.
\]

This is where a gamma-like multiplier can appear. Written in terms of the clock
rate itself,

\[
A_{\mathrm{clock}}(r)=\frac{c^2}{N(r)L_r(r)}
\left|\frac{dN}{dr}\right|.
\]

Define the accumulated acceleration depth by

\[
\Sigma(r)=\int_r^\infty\frac{A_{\mathrm{clock}}(\ell)}{c^2}\,d\ell.
\]

Then the exact lapse relation is

\[
\gamma_g(r)=e^{\Sigma(r)},
\qquad
N(r)=e^{-\Sigma(r)}.
\]

This exposes an important nonlinearity. If $L_r=1$ and the potential definition
$A=-c^2s'(r)$ is retained exactly, then clock consistency gives

\[
\gamma_g(r)=e^{s(r)}.
\]

If instead the energy closure $\gamma_g=1+s$ is retained exactly, the associated
clock-gradient acceleration is

\[
A_{\mathrm{clock}}(r)=-\frac{c^2s'(r)}{1+s(r)}.
\]

All three statements become equivalent to leading order when $s\ll1$, but they
are not simultaneously exact in the strong field. This is the precise place where
the framework must choose a definition rather than identify similar-looking
curves.

The [circumference/support continuation](directional-photon-clock.md#11-clock-gradient-circumference-expansion-and-constituent-support)
records a common-expansion branch now set aside as the explanation of the
directional adjustment. Compensating the fixed-$d$ map's $D$ versus $1/D$
anisotropy fixes relative separations, not a common material expansion by
$C=e^\Sigma$. The continuation assumed that additional expansion and an
unchanged mapped ray speed; its conformal-metric orbital result applies only
to that extra branch. Keep the directional adjustment separate from checkpoint
19's adopted isotropic clock/transport closure.

The subsequent [material-response and orbit synthesis](directional-photon-clock.md#12-material-response-ambient-steering-and-orbital-stability)
records the author's proposed interaction-area coupling, separates it from
finite-size field sampling, and distinguishes ambient steering from applied
thrust. It states the requirements for a future ISCO stability calculation
without adopting a new orbital correction.

### 12.2 Audit of the shared Desmos gamma comparison

Under the proposed interpretation, take the Newtonian escape expression as a
proper velocity:

\[
U_{\mathrm{esc}}(r,M)=\sqrt{\frac{2G_0M}{r}}.
\]

The corresponding proper-to-physical velocity map and dilation factor are

\[
v(U)=\frac{Uc}{\sqrt{c^2+U^2}},
\qquad
\gamma(U)=\sqrt{1+\frac{U^2}{c^2}}.
\]

Consequently the gamma appropriate to this *proper-escape hypothesis* is

\[
\gamma_U(r,M)=\sqrt{1+\frac{2G_0M}{c^2r}}.
\]

This produces the exact identity

\[
\gamma_U(r,M)^2-1=\frac{2G_0M}{c^2r}.
\]

Differentiating with respect to outward radius gives

\[
g(r,M)=\frac{G_0M}{r^2}=-\frac{c^2}{2}\frac{d}{dr}\gamma_U(r,M)^2=-c^2\gamma_U(r,M)\frac{d\gamma_U}{dr}.
\]

Thus the Newtonian acceleration curve and the dilation curve are not supposed to
have the same radial shape. Under the proper-escape hypothesis they are connected
by gamma times the radial gradient of gamma. This identity follows from the
chosen escape expression and velocity map; it is not yet an independent gravity
law.

The saved 3D graph's actual definition is different. It sets
$G_{mr}(r,M)=G_{vd}(V_{esc}(r,M))$, where
$G_{vd}(v)=1/\sqrt{1-v^2/C^2}$ accepts an **ordinary** speed argument. If
$V_{esc}$ is instead declared proper, that direct composition mixes velocity
types. As written, the plotted $G_{mr}$ is

\[
G_{mr}(r,M)=\frac{1}{\sqrt{1-2G_0M/(C^2r)}}.
\]

It diverges when $V_{esc}=C$, whereas the proper-velocity gamma $\gamma_U$
above remains finite at that radius. The graph separately defines
$V_{real}(U)=UC/\sqrt{C^2+U^2}$, so the intended proper-velocity comparison can
be made without changing its basic ingredients:

\[
\gamma_U(r,M)=G_{vd}\!\left(V_{real}\!\left(V_{esc}(r,M)\right)\right).
\]

At the screenshot settings $G_0=1$, $M_0=3.7$, and $C=1$, the direct
$G_{mr}$ needs $r>2G_0M_0/C^2=7.4$ to be real. Its displayed radial domain
ends at $r=5$, so the direct-gamma surfaces are undefined throughout that
domain. The composed proper-velocity curve remains real there. This is one
specific reason the visible plot contains little of the proposed comparison.

The earlier calculator screenshot uses precisely this extra $V_{real}$ step
when evaluating the Earth-surface escape example. Keep $G_{mr}$ and $\gamma_U$
distinct rather than using one graph trace for both conventions.

The plotted ratio $G_{mr}/\sqrt{g}$ is not the direct consistency test. A
direct overlay test for the *proper-velocity* construction is

```text
H(r)=G_vd(V_real(V_esc(r,M_0)))
z=-C^2 H(r)H'(r)
z=g(r,M_0)
```

With consistent units and $C=1$, the two surfaces coincide algebraically
apart from plotting resolution.

This identity belongs specifically to the escape-energy construction. It should
not be silently identified with the static-lapse proper-acceleration relation in
the previous subsection; testing whether those two notions coincide after radial
ruler deformation remains a separate question.

### 12.3 Audit of the square-displacement and orbital calculations

The earlier square-displacement work contains three similar quantities that need
separate names.

The original fixed-scale shell-relocation factor is

\[
D_{\mathrm{shell}}(r,d)=\frac{\sqrt{r^2+d^2}}{r}=\sqrt{1+\frac{d^2}{r^2}}.
\]

Its local excess has the far-field form

\[
D_{\mathrm{shell}}(r,d)-1\sim\frac{d^2}{2r^2}.
\]

Integrating that local excess produces the cumulative depth

\[
\Sigma(r)\sim\frac{GM}{c^2r}.
\]

The shared Desmos graph and the orbital code also define

\[
\Gamma_{\mathrm{esc}}(r)=\sqrt{1+2\Sigma(r)}.
\]

This is the gamma factor obtained by treating
$U_{\mathrm{esc}}=c\sqrt{2\Sigma}$ as proper velocity. It is also the function
called `Dfactor` in the Mercury simulation.

The clock closure used in the displacement paper is instead

\[
\Gamma_{\mathrm{clock}}(r)=1+\Sigma(r).
\]

The latter two quantities are related, but they are not identical:

\[
\Gamma_{\mathrm{clock}}(r)=\frac{\Gamma_{\mathrm{esc}}(r)^2+1}{2}.
\]

They agree through first order in $\Sigma$ and differ at second order. This is why
Mercury and the weak-field N-body comparisons cannot select between them.

There is also a literal radial-scaling conflict if the same symbol $D$ is used for
both the fixed-$d$ shell factor and the orbital-code factor. With fixed $d$,

\[
D_{\mathrm{shell}}^2-1=\frac{d^2}{r^2},
\]

whereas

\[
\Gamma_{\mathrm{esc}}^2-1=2\Sigma\propto\frac{1}{r}.
\]

They cannot be the same exact function of radius unless a nominally fixed scale
or normalization is allowed to vary with $r$. The present draft's statement
$D^2=1+2\Sigma$ should therefore be read as a weak-field metric identification
using $\Gamma_{\mathrm{esc}}$, not as an identity obeyed by the original
fixed-$d$ shell-relocation function.

The Mercury calculation uses the Sun as the dominant background source and
Mercury as a freely falling test body. The multi-body Newtonian force is evaluated
pairwise, while the `Sigma Geodesic` branch adds the standard first
post-Newtonian radial correction

\[
\mathbf a_{\Sigma}=-\frac{3GM L^2}{c^2r^5}\mathbf r.
\]

That calculation tests the weak-field effective geometry, where all candidate
closures agree to the retained order. It does not test which strong-field
continuation of $D$, $\Sigma$, or gamma is correct.

### 12.4 The square-root amplitude

The proposed $1/\sqrt{r}$ factor can be made exact by defining an amplitude

\[
h(r)=\sqrt{s(r)}.
\]

Then

\[
s(r)=h(r)^2,
\qquad
A(r)=-2c^2h(r)\frac{dh}{dr}.
\]

For $h(r)=\sqrt{GM/(c^2r)}$,

\[
\frac{dh}{dr}=-\frac{h}{2r},
\qquad
|A(r)|=\frac{c^2h(r)^2}{r}=\frac{GM}{r^2}.
\]

Thus

\[
\frac{1}{\sqrt r}\frac{1}{\sqrt r}=\frac{1}{r}
\]

produces the depth or potential shape. The spatial derivative supplies the extra
$1/r$ needed for acceleration. A square-root amplitude is therefore plausible as
an interaction factor, but it is not itself an acceleration, velocity, or gamma
factor.

For two bodies at separation $r$, define dimensionless source amplitudes

\[
h_1(r)=\sqrt{\frac{Gm_1}{c^2r}},
\qquad
h_2(r)=\sqrt{\frac{Gm_2}{c^2r}}.
\]

Their symmetric product can encode the ordinary interaction energy:

\[
V_{12}(r)=-c^2\sqrt{m_1m_2}\,h_1(r)h_2(r)=-\frac{Gm_1m_2}{r}.
\]

The force and the two body-specific accelerations follow only after differentiating
and dividing by the relevant inertial mass:

\[
F_r(r)=-\frac{dV_{12}}{dr}=-\frac{Gm_1m_2}{r^2},
\]

\[
a_1(r)=\frac{Gm_2}{r^2},
\qquad
a_2(r)=\frac{Gm_1}{r^2},
\qquad
a_{\mathrm{rel}}(r)=\frac{G(m_1+m_2)}{r^2}.
\]

This gives a precise home to the intuition that the interaction is combined
between two bodies while the measured acceleration remains relative to the body
whose motion is being described.

### 12.5 Desmos paste list

The block compares both closures using $s=k/r$, where $k=GM/c^2$ is a
gravitational length. Paste the expressions as separate Desmos lines.

```text
c=1
k=1
s(r)=k/r {r>0}
h(r)=sqrt(s(r)) {r>0}
A(r)=-c^2 s'(r) {r>0}
A_h(r)=-2c^2 h(r)h'(r) {r>0}
u_E(r)=c sqrt((1+s(r))^2-1) {r>0}
v_E(r)=u_E(r)/sqrt(1+(u_E(r)/c)^2) {r>0}
g_E(r)=sqrt(1+(u_E(r)/c)^2) {r>0}
q_E(r)=1/g_E(r) {r>0}
A_E(r)=A(r)/g_E(r) {r>0}
g_X(r)=e^(s(r)) {r>0}
q_X(r)=1/g_X(r) {r>0}
u_N(r)=c sqrt(2s(r)) {r>0}
v_N(r)=u_N(r)/sqrt(1+(u_N(r)/c)^2) {r>0}
g_N(r)=sqrt(1+(u_N(r)/c)^2) {r>0}
q_N(r)=1/g_N(r) {r>0}
```

### 12.7 Escape speed along an outward trajectory

Escape speed is a **local launch condition**. At radius $r$, an outward-moving
body must already have at least the local escape speed to reach infinity without
additional propulsion. Compare its speed with successive stationary local
observers, using the proper-velocity and gamma definitions of Section 1 with
the subscript *local*.

Let $N(r)$ be the stationary clock rate relative to a clock at infinity. Under
a static metric-like energy law, the conserved energy per rest energy of an
unpowered radial trajectory is

\[
e=N(r)\gamma_{\mathrm{local}}(r).
\]

At the marginal escape threshold the body reaches infinity with zero residual
speed, so $e=1$. Consequently,

\[
\gamma_{\mathrm{local}}(r)=\frac{1}{N(r)},
\qquad
U_{\mathrm{esc}}(r)=c\sqrt{\frac{1}{N(r)^2}-1}.
\]

The change of local time standard and the outward loss of kinetic speed are tied
by one conservation equation:

\[
\frac{d\gamma_{\mathrm{local}}}{\gamma_{\mathrm{local}}}=-\frac{dN}{N}.
\]

They should not be entered as two independent decelerations. As $N$ rises toward
one at larger radius, $\gamma_{\mathrm{local}}$ and $U_{\mathrm{local}}$ fall
toward one and zero, respectively. With $e>1$, the body instead retains speed at
infinity.

For the draft's clock rule $N=1/(1+\Sigma)$, the marginal trajectory is

\[
\gamma_{\mathrm{local}}=1+\Sigma,
\qquad
U_{\mathrm{esc}}=c\sqrt{2\Sigma+\Sigma^2}.
\]

To express its local deceleration, let a radial ruler measure
$d\ell=L(r)dr$, and let a stationary clock measure $dt_{\mathrm{stat}}=N(r)dt$.
Then $d\ell/dt_{\mathrm{stat}}=v_{\mathrm{local}}$, and the outward trajectory
obeys

\[
\frac{dU_{\mathrm{local}}}{dt_{\mathrm{stat}}}=\frac{c^2}{L(r)}\frac{d\Sigma}{dr}.
\]

For $\Sigma=GM/(c^2r)$ this rate is negative and has magnitude
$GM/[r^2L(r)]$. When $L\approx1$ it is the Newtonian deceleration. This is the
rate at which the speed measured by successive stationary observers changes;
in a metric free-fall model it is distinct from the reading of an accelerometer
carried by the unpowered body.

If instead $U_{\mathrm{esc}}^2=2c^2\Sigma$ is exact for a conserved marginal
escape trajectory, the corresponding static clock rule must be

\[
N(r)=\frac{1}{\sqrt{1+2\Sigma(r)}}.
\]

Under that alternative pair of rules, the speed rate measured against successive
stationary clocks is

\[
\frac{dU_{\mathrm{local}}}{dt_{\mathrm{stat}}}=\frac{c^2}{L(r)\sqrt{1+2\Sigma(r)}}\frac{d\Sigma}{dr}.
\]

Thus, if "gravitational acceleration" specifically means change of local proper
velocity per local stationary second, the two exact clock/escape closures predict
different strong-field rates even though both approach $-GM/r^2$ in the weak
field (for $L\approx1$). This offers a concrete consistency test for the model.

The square shell geometry does not by itself choose between these clock rules.
Its local displacement, the accumulated depth, the stationary clock rate, and
the moving body's kinetic gamma each need their own symbol.

As a dimensional aside, the electromagnetic identity is

\[
\frac{1}{\varepsilon_0\mu_0}=c^2,
\]

whose SI units are $\mathrm{m^2/s^2}$. Setting $c=1$ normalizes this speed
scale but does not remove the need for a length or time scale in a gravitational
acceleration law.

### 12.8 The decisive choice: whose second measures acceleration?

The two escape closures arise from two different meanings of "proper velocity
added per second." For an outward-moving body, let $a_s>0$ be the magnitude of
its deceleration in $U$ per stationary local second, and let $a_b>0$ be the
magnitude per second on the body's own clock:

\[
a_s=-\frac{dU}{dt_{\mathrm{stat}}},
\qquad
a_b=-\frac{dU}{d\tau}=\gamma a_s.
\]

With local radial distance $d\ell=L(r)dr$,

\[
\frac{d\ell}{dt_{\mathrm{stat}}}=v=\frac{U}{\gamma},
\qquad
\frac{d\ell}{d\tau}=U.
\]

The two escape integrals are derived in Sections 3.1–3.2: prescribing $a_s$
gives the relativistic kinetic depth $c^2(\gamma_{\mathrm{esc}}-1)$, while
prescribing $a_b$ gives $U_{\mathrm{esc}}^2/2$. The latter is the exact route
to the user's literal proper-escape hypothesis. For the *same trajectory*,
however, both relations hold with $a_b=\gamma a_s$.
One cannot assign the same numerical $GM/r^2$ to both rates in a strong field.

In the weak-field exterior, where $L\approx1$, using $GM/r^2$ for either rate
gives $\Phi\approx GM/r$ and the two escape formulas differ only at the next
order. At strong field the square shell geometry must specify $L(r)$, and the
field law must say which clock measures its acceleration. Once those are fixed,
the marginal escape curve can be derived. A compatible static clock factor follows
if the model also adopts the conserved-energy rule $e=N\gamma$.

### 12.9 Material support versus the proper-$c$ escape radius

The constants-recovery paper treats $F\!\cdot\!H$ storage as upstream of the
second and describes mass as persistent loading of that storage. For $N$ nucleons
with support-radius coefficient $r_0$, its occupancy construction assigns a
support volume proportional to $N r_0^3$, hence an illustrative aggregate radius

\[
R_{\mathrm{sup}}\approx r_0N^{1/3}\approx r_0\left(\frac{M}{m_n}\right)^{1/3}.
\]

Here $m_n$ is a nucleon mass and the second approximation neglects binding mass
deficit and support overlap. This is an occupancy estimate, not a proven minimum
radius or a compact-object equilibrium solution.

Under the body-clock escape closure with the further exact exterior assumption
$\Phi_b=GM/r$, the radius where the *local proper escape velocity* equals $c$ is

\[
r_{U=c}=\frac{2GM}{c^2}.
\]

At a material surface $R_{\mathrm{sup}}>r_{U=c}$, the exterior approximation
would give $U_{\mathrm{esc}}(R_{\mathrm{sup}})<c$. These are three different
lengths: material support $R_{\mathrm{sup}}$, the proper-$c$ escape radius
$r_{U=c}$, and the square shell-displacement parameter $d$, for which the
revised displacement paper gives $d^2=r_{U=c}\ell_0$ with normalization length
$\ell_0$. None is automatically an event-horizon radius.

The constants-recovery paper's one-gram displacement proxy satisfies
$r_{0,\mathrm{eff}}^2=r_s(1\,\mathrm g)\,(1\,\mathrm m)$. If that proxy is
identified with $d(1\,\mathrm g)$, the SI normalization here is
$\ell_0=1\,\mathrm m$, not the nuclear length $r_0$. The near numerical
agreement of $r_{0,\mathrm{eff}}$ and the per-nucleon support coefficient
$r_0$ does not make them the same mass-scaling law.

The occupancy estimate scales as $M^{1/3}$ while $r_{U=c}$ scales as $M$. Using
$r_0=1.2187\,\mathrm{fm}$ and $m_n=1.66054\times10^{-27}\,\mathrm{kg}$ gives,
illustratively, $R_{\mathrm{sup}}\approx12.9\,\mathrm{km}$ and
$r_{U=c}\approx2.95\,\mathrm{km}$ for one solar mass. The two scales cross near
$9.2$ solar masses under these assumptions. Thus occupancy can place a lower-mass
source outside the proper-$c$ radius, but it does not imply that the ratio remains
large for all masses.

There is a unit issue in Section 2.3 of the constants-recovery draft. It labels
$(4\pi/3)r_0^3\approx7.58\times10^{-45}$ as $\mathrm{m^3/g}$, but that number
is the assigned volume of **one nucleon** when $r_0$ is a nuclear radius
coefficient. Converting to a volume per gram requires division by the nucleon
mass in grams:

\[
p_{\mathrm{gram}}=\frac{(4\pi/3)r_0^3}{m_n(\mathrm g)}\approx4.57\times10^{-21}\,\mathrm{m^3/g}.
\]

The radius estimates above use $N=M/m_n$ explicitly and therefore do not use
the draft's unconverted per-gram number.

To turn this scaling into a compact-object prediction, the framework needs a
maximum support loading or overlap law, a binding-energy relation between
baryonic occupancy and exterior gravitational mass, and an interior equilibrium
condition. The local condition $U_{\mathrm{esc}}=c$ alone does not define a
causal boundary.

## 13. Interface to orbital, ray, and compact-object calculations

The existing nine-body orbital simulation advances coordinate positions and
velocities using a coordinate-time acceleration callback. A framework whose
primitive measurements are local length and proper time must supply a conversion
contract before that callback can represent its strong-field dynamics.

The minimal contract has four parts:

1. **Source state.** Given matter occupancy, binding, motion, and support overlap,
   return the field source and material boundary. The exterior gravitational mass
   and the occupied support radius are separate outputs.
2. **Local geometry and clock transport.** Given an event and source history,
   return the local ruler map, the static clock comparison when one exists, and a
   rule for transporting a moving clock and velocity state to a neighboring local
   frame. In a static spherical reduction write $d\ell=L(r)dr$ and
   $dt_{\mathrm{stat}}=N(r)dt$. Here $N$ is a derived summary of clock transport,
   not a required microscopic primitive.
3. **Motion law.** Specify the clock used to measure proper-velocity change and
   the local acceleration law. For a body-clock law, write
   $a_b(r,U,\text{field state})=-dU/d\tau$. Dependence on $U$ must be allowed;
   even a static field can yield a velocity-dependent local-frame rate.
4. **Signal law.** Specify the local propagation characteristic, clock/phase
   accumulation, and emitter/receiver coupling. A compact-object calculation
   needs this law to determine whether outward signals actually cease to reach
   distant observers; a threshold $U_{\mathrm{esc}}=c$ is insufficient.

For a stationary spherical background, the body-clock law can be exported to a
coordinate-time integrator by the radial equations

\[
\frac{dr}{dt}=\frac{N(r)}{L(r)}\frac{U}{\gamma(U)},
\qquad
\frac{dU}{dt}=-\frac{N(r)}{\gamma(U)}a_b(r,U),
\qquad
\frac{d\tau}{dt}=\frac{N(r)}{\gamma(U)}.
\]

These equations state the interface assumptions explicitly: $U$ is measured
against successive stationary local frames, $d\ell/d\tau=U$, and the local
body-clock acceleration already includes the framework's rule for comparing $U$
between those frames. If the transport rule has memory or nonlocal response,
$N(r)$ and $a_b(r,U)$ must be replaced by state- and history-dependent terms.

If the interface also adopts the static conserved-energy law $e=N\gamma$, its
clock and acceleration outputs cannot be chosen independently. Differentiating
that law along an outward trajectory gives the consistency condition

\[
a_b(r,U)=\frac{c^2\gamma(U)^2}{L(r)}\frac{d\ln N}{dr}.
\]

This condition is a test of a proposed transport law, not a derivation of that
law from $F\!\cdot\!H$ storage. The latter still has to explain why a moving
clock follows a particular $N$ and how its phase responds while crossing the
gradient.

The current orbital code's `accel9(state)` returns coordinate accelerations for
states $(x,y,v_x,v_y)$. Feeding it a proper-velocity rate as though it were
$d^2x/dt^2$ would omit the clock conversion, the radial ruler factor, and
derivatives of those factors. A three-dimensional version also needs the local
spatial frame and its rotation/transport rule so noncollinear velocities are
composed consistently. A metric-like realization could instead provide a full
effective line element and a specified matter coupling for a geodesic solver;
the present radial contract does not assume that choice.

The first useful implementation is therefore a one-source radial adapter with
explicit $L(r)$, clock transport, and $a_b(r,U)$. It should reproduce the
weak-field $GM/r^2$ limit, conserve its stated energy quantity on marginal escape,
and return locally measured $U$ and clock phase alongside coordinate trajectories.
Only after that check is the interface ready for N-body or black-hole inference.

## 14. Constant proper-velocity change and the elementary displacement law

There is a useful flat-spacetime kinematic check on the proposed body-clock
acceleration convention. Fix one external inertial frame with spatial coordinate
$x$ and time $t$, and let $\tau$ be the ship's clock. Define

\[
U=\frac{dx}{d\tau}=\gamma v,
\qquad
\gamma(U)=\sqrt{1+\frac{U^2}{c^2}},
\qquad
v=\frac{dx}{dt}=\frac{U}{\gamma(U)}.
\]

If the stipulated acceleration is a constant rate of proper-velocity change
per ship second, $a_b=dU/d\tau$, then the familiar displacement equation is
**exact for $x$ as a function of $\tau$**:

\[
U(\tau)=U_0+a_b\tau,
\qquad
x(\tau)-x_0=U_0\tau+\frac12 a_b\tau^2.
\]

The external observer's elapsed time is a *separate integral* because the
clock conversion changes during acceleration:

\[
t(\tau)-t_0=\int_0^\tau
\sqrt{1+\frac{(U_0+a_b s)^2}{c^2}}\,ds.
\]

Applying $V_{\rm real}(U)=U/\gamma(U)$ to the **final** $U$ gives the final
instantaneous speed; it cannot convert the entire displacement interval using
one final-state factor. For example, start at rest and take
$a_b=c\,{\rm s}^{-1}$ for two ship seconds. The endpoint has $U=2c$,
$\gamma=\sqrt5$, and $v=2c/\sqrt5\approx0.894c$. The ship has advanced
two light-seconds in the chosen external frame, but that frame's elapsed time is

\[
t=\int_0^2\sqrt{1+s^2}\,ds=\sqrt5+\tfrac12\operatorname{asinh}(2)\approx2.958\,{\rm s}.
\]

Its external-frame *average* speed over that accelerating interval is therefore
about $0.676c$. By contrast, if the ship is already at $U=2c$ and **coasts** for
one ship second, it advances two external-frame light-seconds while the external
clock advances $\sqrt5\approx2.236$ seconds; its constant speed is $0.894c$.
The pair "two light-seconds in about 1.6 external seconds" would imply an
external-frame average speed above $c$, so it cannot describe either case.

This $a_b=dU/d\tau$ is the framework's chosen *body-clock rate*, not what a
conventional accelerometer in special relativity calls constant proper
acceleration. For collinear motion the latter is
$\alpha=dU/dt=(1/\gamma)dU/d\tau$; thus constant $a_b$ corresponds to a
declining accelerometer reading $\alpha=a_b/\gamma$. A constant accelerometer
reading instead gives hyperbolic motion in ship time. No velocity-dependent
rest mass is needed to express either relation: the clock map and the distinction
between the two acceleration rates carry the conversion.

This check uses one inertial frame's $x$ and $t$. Across a gravitational gradient,
successive local rulers and clocks require the transport and coordinate adapter
of Section 13; their accumulated local lengths need not equal one global inertial
coordinate distance.

## 15. Two-direction transport, optical timing, and local-clock escape

This is a provisional assembly, not a derived strong-field constitutive law.
Use the shell scale $d$ and material radius $R_{\mathrm{sup}}$ as distinguished
in Section 12.9; $a$ below is only an optical edge-to-edge reference span.
The discussed $d=1$ optical example is **not** an $r=1$ result.

Spherical symmetry gives one radial and two equal tangential deformation
factors. Write their local spatial map and volume factor as

\[
E(r,d)=\operatorname{diag}(R(r,d),T(r,d),T(r,d)),
\qquad J(r,d)=R(r,d)T(r,d)^2.
\]

For the square-shell factor $D=r'/r$ defined in Section 12.3,

\[
R=\frac{dr'}{dr}=D^{-1},
\qquad T=\frac{r'}{r}=D,
\qquad J=D.
\]

The deformation thus changes shell spacing and lateral extent differently.
The scalar $J$ records their net volume factor but discards information needed
to calculate directional propagation or an anisotropic inertial response.
The local storage geometry does not fix the optical path factor by itself.

Transformation optics supplies a mathematical analogy: a purely spatial map
can be represented in flat coordinates by direction-dependent effective
electric and magnetic response tensors. In one push-forward convention, an
initially isotropic response transforms as

\[
\frac{\boldsymbol\varepsilon_{\mathrm{eff}}}{\varepsilon_0}=\frac{\boldsymbol\mu_{\mathrm{eff}}}{\mu_0}=\frac{EE^{\mathsf T}}{J}=\operatorname{diag}\!\left(\frac{R}{T^2},\frac1R,\frac1R\right).
\]

For $R=D^{-1}$ and $T=D$, these entries are $(D^{-3},D,D)$ in that
convention. This is an *equivalent material description* of a coordinate map,
not yet a physical claim that the locally measured vacuum $\varepsilon_0$ or
$\mu_0$ changes. A ferrite-like material response would be additional to the
underlying transport response; the STFR constitutive relation must say how
that loading composes with displacement.

Define the optical path factor only after specifying the two endpoints and
the actual path $\mathcal P(r,d;a)$:

\[
q(r,d;a)=\frac{L_{\mathcal P}(r,d;a)}{L_{\mathrm{ref}}(a)},
\qquad
t_{\mathcal P}=\frac{L_{\mathcal P}}{c}
\]

when $c$ is the locally measured propagation speed throughout the comparison.
For a circular (or great-circle) displacement boundary, compare the shortest
boundary arc between two points with the straight chord between them. If their
central angle is $0<\theta\le\pi$, the ratio is

\[
q_{\mathrm{boundary}}(\theta)=\frac{\theta}{2\sin(\theta/2)}\le\frac\pi2.
\]

The maximum is the antipodal semicircle-to-diameter comparison, whose inverse
path-time ratio is $2/\pi\approx0.637$. This **single-boundary** bound is
scale-independent: whatever circular boundary radius is associated with a
given $d$, its arc and chord contain the same radius factor. The normalized
$d=1$ example was one
instance, not the reason for the bound. A path that winds, passes through
multiple boundaries, or accumulates clock-depth changes is a different
comparison. Nor does this arc/chord theorem set the local shell stretch
$D(r,d)=r'/r$; the two ratios should not be identified without an explicit
transport rule.

A clock-rate factor $N_{\mathrm{path}}=1/q$ follows only if a clock's full
physical cycle is governed by that same optical route and no additional phase
or storage cost intervenes. Likewise, a Shapiro-like delay along an extended
route requires integrating its local travel-time factors; a one-cell
$\pi/2$ ratio is not a universal cap on accumulated delay. The displacement
paper's separate strong-field proposal $N=1/(1+\Sigma)$ approaches zero.
Equating it to $1/q$ is therefore a substantive constitutive claim, not a
kinematic identity, and any proposed finite bound on $q$ would need to be
reconciled with that clock law.

The proposed physical clock is one adapted, sustained spherical ripple: a
tick requires return to its starting state after the full two-pass cycle.
Unequal segment times do not by themselves prevent closure. A further,
unproved *clock-cycle ansatz* assigns a period factor $C=Rq^2$ and lets the
two lateral route factors reach their boundary cap $q=\pi/2$. In that
saturated case $C=1$ at

\[
\frac{r}{d}=\frac{4}{\sqrt{\pi^4-16}}\approx0.4433.
\]

This is a crossing of the flat reference period, not an energy minimum,
clock-failure radius, or horizon. The radial factor makes $C$ fall farther
inward, so a surviving clock would formally speed up; the model does not
establish that such a clock remains coherent. In the saturated ansatz $C$
increases outward, while the local geometric Jacobian $J=D$ increases
inward. A capped cycle cost must therefore not be substituted for the
translational $F\!\cdot\!H$ support gain or its acceleration gradient.

The bare-nucleon support estimate is defined, with its binding and overlap
limitations, in Section 12.9. The calculator screenshot called this quantity
$D(m)$; the present note calls it $R_{\mathrm{sup}}$ to keep it distinct
from both shell factors. For Earth's mass it gives about $186.7\,\mathrm m$,
not Earth's actual radius or a demonstrated compact-object size.

The displacement paper also
sets $d^2=r_s\ell_0$ with $r_s=2GM/c^2$. With fixed $r_0$ and $\ell_0$,
$d\propto M^{1/2}$ while $R_{\mathrm{sup}}\propto M^{1/3}$, hence
$d/R_{\mathrm{sup}}\propto M^{1/6}$. The surface deformation
$D(R_{\mathrm{sup}},d)$ need not be mass-independent. In the weak exterior
approximation the surface depth $GM/(c^2R_{\mathrm{sup}})$ scales as
$M^{2/3}$. The cancellation that gives equal escape speed at equal
$r/r_s$ does not apply automatically at these material surfaces. The
occupancy estimate is not a proven equilibrium or minimum-radius law.

As Sections 12.8 and 13 require, a candidate body-clock gravity law must
specify both local-frame transport and a response rate that may depend on $U$:

\[
\frac{dU}{d\tau_b}=-a_b(r,U;R,T,\text{storage state}).
\]

The escape integral of Section 3.2 is then evaluated along the solved
trajectory, not as a field-only potential when $a_b$ depends on $U$.
The local force or thrust history required to create the initial $U_{\mathrm{esc}}$
also needs a momentum-response law; it cannot be obtained by multiplying an
escape speed by $1/D$, $q$, or a clock factor. A distant clock is useful for
comparing reports, not for causing the body's local interaction.

The next closure therefore has to derive, from one displacement-dependent
$F\!\cdot\!H$ response, (i) the $d$-dependent optical path and phase cost,
(ii) the clock-cycle rate, (iii) the inertial momentum response, and (iv) the
gravitational $a_b$ and frame transport. Those outputs must agree in the weak
field and remain mutually consistent when evaluated at the support radius.

## 16. What the radial/lateral factors already establish

The radial and tangential factors are defined in Section 15. With
$\chi=d/r$, their geometric response ratio is

\[
\frac{T}{R}=D^2=1+\chi^2.
\]

This establishes a radial-versus-lateral *geometric* response ratio. If $k$
means this local deformation factor $D$, the radial-to-lateral ratio is indeed
$(1/k)/k=1/k^2$, and its reciprocal is $k^2$. At $r=d=1$, $D=\sqrt2$ and
$T/R=2$. At $r=1,d=100$, $r'\approx100.005$, $D\approx100.005$, and
$T/R=10001$. The controlling quantity is $d/r$, or equivalently the normalized
shell displacement $(r'-r)/r=D-1$. If $r_s$ means a Schwarzschild radius,
however, $(r_s-r)/r$ is *not* this quantity; the paper relates $d^2$ to
$r_s\ell_0$ by a separate weak-field calibration.

As Section 15 distinguishes, the boundary-path factor $q$ is not $D$:
at $r=d=1$, for example, $D=\sqrt2$ while the antipodal path ratio is
$\pi/2$. Neither is automatically a clock-rate factor.

There is already a conditional coordinate-level inertial result in the
displacement paper's effective line element. Write its static clock factor as
$N=1/(1+\Sigma)$ and assume the usual point-body action
$L=-mc^2\,d\tau/dt$. At low coordinate speeds it becomes

\[
L\approx-mc^2N+\frac{m}{2N}\left(D^2\dot r^2+r^2\dot\Omega^2\right).
\]

The radial coordinate-time inertia coefficient is therefore $mD^2/N$,
versus $m/N$ for tangential arc motion: their ratio is exactly $D^2$.
This makes the user's greater *effective radial inertia* a derivable feature
of that chosen coordinate dynamics, not merely an analogy to length
contraction. It does **not** imply a changed locally measured rest mass;
that would require the excitation's internal $F\!\cdot\!H$ response to be
worked out. The coefficient also depends on the observer clock through $N$.

### 16.1 Coordinate-path depth versus compressed-radial depth

The displacement paper accumulates the local excess using the original
radial label. Give this historical choice an explicit subscript:

\[
\Delta\ell_{\mathrm{coord}}(r,d)=\int_r^\infty\left[D(\rho,d)-1\right]d\rho
=d\,\operatorname{asinh}(d/r)-\left(\sqrt{r^2+d^2}-r\right),
\]

\[
\Sigma_{\mathrm{coord}}=\frac{\Delta\ell_{\mathrm{coord}}}{\ell_0}.
\]

The compressed radial ruler of Section 15 instead measures
$d\ell=R\,dr=dr'$. Let $\delta(r)=r'-r$. The square map gives the exact
identity

\[
-\frac{d\delta}{d\ell}=\frac{1-R}{R}=D-1,
\qquad
\Delta\ell_{\mathrm{proper}}(r,d)
=\int_{\ell(r)}^\infty(D-1)\,d\ell=\delta(r),
\qquad
\Sigma_{\mathrm{proper}}=\frac{\delta}{\ell_0}.
\]

Both normalized depths approach $d^2/(2r\ell_0)$ when $r\gg d$. At $r\to0$ they
separate: $\Delta\ell_{\mathrm{proper}}\to d$, whereas
$\Delta\ell_{\mathrm{coord}}$ diverges logarithmically. Thus the new
proper-radial integral is a finite strong-field continuation, not a proof
that a material clock survives or that its period follows
$\Sigma_{\mathrm{proper}}$.

If the body-clock field law is *additionally* taken to be
$a_b=(c^2/\ell_0)(D-1)$ along this ruler, its marginal escape depth is
$\Phi_b=c^2\delta/\ell_0$ and Section 3.2 gives

\[
U_{\mathrm{esc}}^2=\frac{2c^2\delta}{\ell_0}.
\]

With the weak-field calibration $d^2=r_s\ell_0$, the radius at which this
candidate has $U_{\mathrm{esc}}=c$ is
$r_{U=c}=r_s-\ell_0/4$, provided that radius is positive and lies in the
modelled exterior. This is a proper-velocity threshold, not a horizon or a
derived material surface.

For fixed $d$ and $\ell_0$, neither depth makes the paper's written
$D^2=1+2\Sigma$ an exact identity: $D^2-1=d^2/r^2$, whereas either
$2\Sigma$ has a $1/r$ far-field leading term. At $r=1,d=100$ in common
length units, $\Delta\ell_{\mathrm{coord}}\approx430.829$ and
$\delta\approx99.005$, while $D^2-1=10000$. The distinction is decisive
in the strong field and must be reconciled before using the paper's
effective metric there.

Thus the geometry-to-*relative-coordinate-inertia* step can be written down
now, and a proper-radial escape candidate can be stated conditionally. The
remaining task is to choose and justify the depth and clock law, reconcile
the strong-field metric's radial functions, and derive the local momentum
response from the same storage/transport rule.

## 17. Separate the material boundary from the two formal radii

The distinct lengths and their calibration are set out in Section 12.9.
Evaluating every expression at $r=1$ does not define a black-hole surface,
and using $d^2=r_s\ell_0$ at a strong-field material boundary extrapolates
a weak-field calibration. At a candidate boundary,

\[
D_{\mathrm{sup}}=\sqrt{1+\frac{d^2}{R_{\mathrm{sup}}^2}}=\sqrt{1+\frac{r_s\ell_0}{R_{\mathrm{sup}}^2}},
\qquad
\gamma_{U,\mathrm{esc}}=\sqrt{1+\frac{r_s}{R_{\mathrm{sup}}}}
\]

if the Newtonian escape expression is interpreted as proper velocity.
The two dimensionless controls are $d/R_{\mathrm{sup}}$ and
$r_s/R_{\mathrm{sup}}$; neither is fixed by merely naming a source mass.
The first concerns local radial/lateral deformation, while the second
concerns the chosen proper-escape launch condition.

This makes the two occurrences of $\sqrt2$ unambiguous. The proper-escape
gamma is $\sqrt2$ at $r=r_s$, whereas the square-map deformation factor
is $\sqrt2$ at $r=d$. Since $d^2=r_s\ell_0$, those are generally different
radii. Indeed $D(r_s)=\sqrt{1+\ell_0/r_s}$, not automatically $\sqrt2$.
Nor is $\sqrt2$ a global dynamical ceiling: at $r<r_s$ the stipulated
proper escape velocity exceeds $c$ and its associated gamma exceeds
$\sqrt2$. Whether material can have a boundary there is a distinct
source/support question.

The square *map continued inward* has no universal twofold cap. It reaches
$D=2$ at $r=d/\sqrt3$ and increases further as $r/d$ decreases. A physical
support boundary can exclude those radii; for example, $r\ge d$ implies
$D\le\sqrt2$ in the exterior. This unbounded local map remains distinct
from Section 15's capped single-boundary arc/chord ratio.

Numerically, using $r_0=1.2187\,\mathrm{fm}$ as the framework's nucleon
support scale, a proton mass has conventional
$r_s\approx2.48\times10^{-54}\,\mathrm m$, roughly
$4.91\times10^{38}$ times smaller than $r_0$. Conversely, the mass whose
conventional $r_s$ equals $r_0$ is about $8.21\times10^{11}\,\mathrm{kg}$,
or $4.91\times10^{38}$ proton masses. That is enormous relative to one
proton, though not a universe-scale mass. These are scale comparisons from
$r_s=2GM/c^2$, not evidence that such matter can be supported at $r_0$.
The value $r_0$ is a framework support parameter, not the measured proton
charge radius. Numerical constants: [NIST 2022 CODATA](https://physics.nist.gov/cuu/pdf/JPCRD2022CODATA.pdf).

Finally, an infinite *distant-clock* time assignment does not by itself
require a local traveller to cross an infinite physical $F\!\cdot\!H$ path
per tick. That is an additional physical-path interpretation which STFR
would need to formulate explicitly. The distinction between a distant
appearance and a faller's finite local passage is standard in the
[NASA black-hole explanation](https://imagine.gsfc.nasa.gov/ask_astro/black_holes.html).

## Related framework sources

- [Homogeneous Light Propagation Framework](../../homogeneous_light_propagation_framework.md)
- [Displacement Dynamics](../../displacement_dynamics_paper.md)
- [Recovery of Physical Constants](../../HPF_recovery_of_physical_constants.md)
- [Wigner Rotation from Noncollinear Composition](../../wigner_rotation_from_noncollinear_composition.md)
- [Weak-Field Observational Tests](../../weak_field_observational_tests.md)
