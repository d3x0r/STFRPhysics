
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Full Process to Compute Observation

Length contraction is applied to points on each body according to their
own velocities.

The time between a point on the emitting body and observing body is
computed using the observing body's real time coordinate, giving the
emitting bodies real time when the event was emitted.

The absolute position can then be computed from emitter to observer, and
then the light aberration for the observer based on the angle the signal
is detected, resulting in a final actual position that the body being
observed is perceived.

Given:

-   *X⃗* : Position being observed at T=0
-   $\vec{V_{E}}$ : Velocity of body emitting a signal
-   $\vec{X_{O}}$ : Position of observer at T=0
-   $\vec{V_{O}}$ : Velocity of observer

Length contract points:

$$\begin{array}{r}
\vec{X^{'}} = \vec{X} - \frac{\vec{V_{E}}\left( \vec{X} \cdot \vec{V_{E}} \right)}{{\vec{V_{E}}}^{2}}\left( 1 - \frac{\sqrt{CC - {V_{E}}^{2}}}{C} \right)\\ (5.1)
\end{array}$$

$$\begin{array}{r}
\vec{{X_{O}}^{'}} = \vec{X_{O}} - \frac{\vec{V_{O}}\left( \vec{X_{O}} \cdot \vec{V_{O}} \right)}{{\vec{V_{O}}}^{2}}\left( 1 - \frac{\sqrt{CC - {V_{O}}^{2}}}{C} \right)\\ (5.2)
\end{array}$$

Propagation Delay from contracted point to observer:

$$\begin{array}{r}
\vec{P} = \vec{X^{'}} - \left( \vec{X_{O}'} + T_{O}\vec{V_{O}} \right)\\ (5.3)
\end{array}$$

$$\begin{array}{r}
T = \frac{\sqrt{\left( C^{2}T_{O} + \vec{V_{E}} \cdot \vec{P} \right)^{2} - \left( C^{2} - \vec{V_{E}}\vec{V_{E}} \right)\left( C^{2}T_{O}^{2} - \vec{P} \cdot \vec{P} \right)} + C^{2}T_{O} + \vec{V_{E}} \cdot \vec{P}}{C^{2} - \vec{V_{E}}\vec{V_{E}}}\\ (5.4)
\end{array}$$

Light aberration:

$$\begin{array}{r}
\vec{X^{''}} = \vec{X_{E}} + \vec{V_{E}}T\\ (5.5)
\end{array}$$

$$\begin{array}{r}
\vec{\Delta X_{d}}\\ = \vec{X^{'}} + \vec{V_{E}}T - \vec{{X_{O}}^{'}}\\ (5.6)
\end{array}$$

$$\begin{array}{r}
\vec{V_{d}} = \vec{\Delta X_{d}} \cdot \vec{V_{O}}\\ (5.7)
\end{array}$$

$$\begin{array}{r}
\vec{V_{dn}} = \frac{\vec{V_{d}}}{\left\| \vec{V_{d}} \right\|}\\ (5.8)
\end{array}$$

$$\begin{array}{r}
\theta = cos^{- 1}\frac{V_{dn} + \frac{\left\| V_{O} \right\|}{C}}{1 + \frac{\left\| V_{O} \right\| V_{dn}}{C}}\\ (5.9)
\end{array}$$

$$\begin{array}{r}
\vec{V_{c}} = \vec{\Delta X_{d}} \times \vec{V_{O}}\\ (5.10)
\end{array}$$

$$\begin{array}{r}
\vec{V_{cn}} = \frac{\vec{V_{c}}}{\left\| \vec{V_{c}} \right\|}\\ (5.11)
\end{array}$$

$$\begin{array}{r}
X^{'''} = \vec{X^{''}} + \cos(\theta)\vec{\Delta X_{d}} + \sin(\theta)\left( \vec{V_{cn}} \times \vec{\Delta X_{d}} \right) + \left( \left( 1 - \cos\theta \right)\vec{V_{cn}} \cdot \vec{\Delta X_{d}} \right)\vec{V_{cn}}\\ (5.12)
\end{array}$$

Finally:
*X*<sup>‴</sup> *i**s* *t**h**e* *p**o**s**i**t**i**o**n* *o**f* *t**h**e* *p**o**i**n**t* *b**e**i**n**g* *o**b**s**e**r*$V$*e**d* *r**e**l**a**t**i*$V$*e* *t**o* *t**h**e* *o**b**s**e**r*$V$*e**r*.
