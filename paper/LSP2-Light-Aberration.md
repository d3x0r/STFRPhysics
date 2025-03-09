
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |

# Light Aberration

"The discovery of the aberration of light in 1725 by James Bradle"(ref
1).

Light aberration is an effect that is seen as advancing the angle of a
received photon in a moving frame. It also applies for photons that are
emitted.

I used the existing math for light aberration as derived by Einstein
from Wikipedia 'Relativistic Aberration' \[[ref
2](#RelativsiticAberration)\]:

$$\begin{array}{r}
\cos\theta_{o} = \frac{\cos\theta_{s}\\ - \\\frac{V}{C}}{1 - \\\frac{V}{C}\\\cos\theta_{s}}\\ (3.1)
\end{array}$$

Where *θ*<sub>*o*</sub> is the observed angle for a frame moving at
speed $V$. I extended the math slightly to include the direction part of
the velocity:

$$\begin{array}{r}
\vec{dX} = \left( \vec{X_{E}} - \vec{X_{O}} \right)\\ (3.2)
\end{array}$$

Equation 20 is the cosine of the angle a body is observed:

$$\begin{array}{r}
\cos{\theta_{s} =}J = \frac{\vec{dX} \cdot \vec{V_{O}}}{\left| \left| \vec{dX} \right| \right| \cdot \left| \left| \vec{V_{O}} \right| \right|}\\ (3.4)
\end{array}$$

$$\begin{array}{r}
\Delta A = \cos^{- 1}\frac{\\J\\ + \\\\\frac{V_{o}}{C}}{1 + J\frac{V_{o}}{C}} - \cos^{- 1}J\\ (3.5)
\end{array}$$

*Δ**A*, the result of equation 21, is the change in the angle observed.
This, again, applies for both transmission and reception. If this did
not apply to transmission, then a light beam emitted at 90 degrees
across a rocket of sufficient size, the light would drift down the wall
by an amount relative to the speed of the rocket, and an interferometer
would have a non-null result.

The above formula generally works for the 3D case, but because arccos
aka  cos<sup>−1</sup> only returns 0 to *π*, a correction needs to be
applied based on the input angle.

(*A*×*D*&lt;0?−1:1) Given an input of *D* which is the direction the
body is travelling (where 0 is towards positive infinity on the X axis),
and *A* which is the angle the observer is travelling, the delta angle
is *d**A* = *D* − *A*. The multipart equation *N* computes a multiplier
based on the angle; every *π* units the sign of the result flips; this
is the absolute value of the floor of dA divided by *π*, mod 2, then if
the result is 0 the value is 1, otherwise the value is -1:

$$\begin{array}{r}
dA = D - A\\ (3.6)
\end{array}$$

$$\begin{array}{r}
N = \left\{ x = \left| \left\lfloor \frac{dA}{\pi} \right\rfloor \right|mod\\2\\\begin{aligned}
1,\\\\ & x = 0 \\
 - 1,\\\\ & x = 1
\end{aligned} \right.\\\\ (3.7)
\end{array}$$

And the aberrated angle for a body moving at $V$ is:

$$\begin{array}{r}
a = N\cdot\cos^{- 1}\frac{\cos{dA} + \frac{V}{C}}{1 + \frac{V}{C}\cos{dA}} + D\\ (3.8)
\end{array}$$

The inverse calculation to determine the angle that resulted in an
aberrated angle of *d**A* is:

$$\begin{array}{r}
b = N\cdot\cos^{- 1}\frac{V - C\cos{dA}}{V\cos{dA} - C} + D\\ (3.9)
\end{array}$$

Light aberration is one clue that a moving body has to determine that
they are actually the ones moving, although the parallax of the stars
shifts too, distant galaxies are still going to be distant enough that
their aberrated position can be compared to a base stellar map.
## 3D Aberration with Rotation

The partial expressions required for producing the angle of aberration
can also be used to perform a rotation on a 3D vector. In the 3D case,
the potential error from arccos only resulting with a value from 0 to pi
are fixed by having the full cross product which is rotated around. Even
in the case of the plane that is entirely edge-on to the observer, the
cross-product Z axis is positive or negative whether the angle is on the
left or right side, so the above N term does not have to be computed.
The cross-product also gives the axis of rotation for the aberration.

Calculate delta position:

$\begin{array}{r}
\vec{\Delta X_{d}} = \vec{X} - \vec{X_{O}}\\ (3.10)
\end{array}$

Compute cross product of position and observer's velocity:

$\begin{array}{r}
\vec{V_{c}} = \vec{\Delta X_{d}} \times \vec{V_{O}}\\ (3.11)
\end{array}$

Normalize the cross product (axis of rotation):

$$\begin{array}{r}
V_{cn} = \frac{\vec{V_{c}}}{\left\| \vec{V_{c}} \right\|}\\ (3.12)
\end{array}$$

Calculate dot product of position and normalized observer's velocity:

$$\begin{array}{r}
\vec{V_{d}} = \vec{\Delta X_{d}} \cdot \vec{V_{O}}\\ (3.13)
\end{array}$$

Normalize the dot product (cosine of angle between delta position and
velocity)

$$\begin{array}{r}
\vec{V_{dn}} = \frac{\vec{V_{d}}}{\left\| \vec{V_{d}} \right\|}\\ (3.14)
\end{array}$$

Compute angle of aberration:

$$\begin{array}{r}
\theta = cos^{- 1}\frac{V_{dn} + \frac{\left\| V_{O} \right\|}{C}}{1 + \frac{\left\| V_{O} \right\| V_{dn}}{C}}\\ (3.15)
\end{array}$$

Rotation of observed point *X*<sub>*d*</sub> plus position of observer:

$$\begin{array}{r}
X_{r} = \vec{X_{O}} + \cos(\theta)\vec{\Delta X_{d}} + \sin(\theta)\left( \vec{V_{C}} \times \vec{\Delta X_{d}} \right) + \left( \left( 1 - \cos\theta \right)\vec{V_{c}} \cdot \vec{\Delta X_{d}} \right)\vec{\Delta V_{cn}}\\ (3.16)
\end{array}$$

<span id="_Length_Contraction" class="anchor"></span>

# Time Contraction

Time contracts according to the speed of a moving body. Contraction in
the sense that clocks run slower. This contraction happens when
normalizing the time it takes for worst-case time of forward and
backward propagation across the contracted length, or by normalizing the
lateral propagation time.

Forward and backward, the time light takes to cover the contracted
distance of C light-seconds is:

$$\begin{array}{r}
T_{W} = \frac{1}{2} \bullet \frac{\sqrt{C^{2} - V^{2}}}{C}\left( \frac{C_{L}}{(C + V)} + \frac{C_{L}}{(C - V)} \right)\\ (4.1)
\end{array}$$

Multiplying the fraction for the distance of $C_L$ over $C+V$ by $C-V$ over $C-V$ and $C_L$ over $C-V$ by $C+V$ over $C+V$ reduces the expression to the following expression. The units will not change since $\frac{C + V}{C + V}$ cancels out the units and becomes just a scalar $\frac{x}{C^{2} - V^{2}}$ still has units of length over velocity, not velocity squared.

$$\begin{array}{r}
\frac{\sqrt{C^{2} - \vec{V^{2}}}}{2C} \cdot \left( \frac{2C_{L}C}{C^{2} - \vec{V^{2}}} \right)\\ (4.2)
\end{array}$$

Which is then:

$$\begin{array}{r}
\frac{C}{\sqrt{C^{2} - \vec{V^{2}}}}\\ (4.3)
\end{array}$$

And the reciprocal, which scales the clock so 1 tick happens per
light-tick is

$$\begin{array}{r}
\boxed{\Gamma = \frac{\sqrt{C^{2} - \vec{V^{2}}}}{C}}\\ or\\\sqrt{1 - \left( \frac{\vec{V}}{C} \right)^{2}}\\ (4.4)
\end{array}$$

Alternatively, it is possible to compute the time it takes for a photon
clock mounted laterally to tick... and the result is the same as above.
the time it takes for light to travel along the lateral path of C
light-seconds is

$$\begin{array}{r}
\frac{C}{\sqrt{C^{2} - \vec{V^{2}}}}\\ (4.5)
\end{array}$$

And, again, the reciprocal, which scales the clock so 1 tick happens per
light-tick is:

$$\begin{array}{r}
\boxed{\Gamma = \frac{\sqrt{C^{2} - \vec{V^{2}}}}{C}}\\ or\\\sqrt{1 - \left( \frac{\vec{V}}{C} \right)^{2}}\\ (4.6)
\end{array}$$

