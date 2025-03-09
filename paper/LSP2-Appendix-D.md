
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Appendix D (V=C)

When V=C, then the equations can be solved by substituting C for the
appropriate velocity. Later in the process the V term that was replaced
can be restored back to C, but then this covers the singularity of
dividing by $C^2$ − $V$<sup>2</sup> = 0 when it equals 0.

## Solve for T when $\left\| \vec{{V}_{{E}}} \right\|$=C…

This only works if
$\vec{X_{E}} \neq \vec{X_{O}}$.

$$\begin{array}{r}
T_{O} = T + \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{\left\| \vec{V_{E}} \right\|}\\ (1.1)
\end{array}$$

Convert magnitudes to square root of vectors squared:

$$\begin{array}{r}
T_{O} = T + \frac{\sqrt{\left( \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right)^{2}}}{\sqrt{\vec{V_{E}}\vec{V_{E}}}}\\ (D.1)
\end{array}$$

Define partial expression P to simplify later operations:

$$\begin{array}{r}
\vec{P} = \vec{X_{E}} - \left( \vec{X_{O}} + \vec{V_{O}}T_{O} \right)\\ (3)
\end{array}$$

Substitute P into expression:

$$\begin{array}{r}
T_{O} = T + \frac{\sqrt{\left( \vec{P} + T\vec{V_{E}} \right)^{2}}}{\sqrt{\vec{V_{E}}\vec{V_{E}}}}\\ (D.2)
\end{array}$$

Move T expression to left side, preparing to square both sides:

$$\begin{array}{r}
T_{O} - T = \frac{\sqrt{\left( \vec{P} + T\vec{V_{E}} \right)^{2}}}{\sqrt{\vec{V_{E}}\vec{V_{E}}}}\\ (D.3)
\end{array}$$

Square both sides:

$$\begin{array}{r}
{T_{O}}^{2} - 2T_{O}T + T^{2} = \frac{\left( \vec{P} + T\vec{V_{E}} \right)^{2}}{\vec{V_{E}}\vec{V_{E}}}\\ (D.4)
\end{array}$$

Expand squares, move $\vec{V_{E}}\vec{V_{E}}$ to
the left side:

$$\begin{array}{r}
\vec{V_{E}}\vec{V_{E}}{T_{O}}^{2} - 2\vec{V_{E}}\vec{V_{E}}T_{O}T + \vec{V_{E}}\vec{V_{E}}T^{2} = \vec{P}\vec{P} + 2T\vec{P}\vec{V_{E}} + T^{2}\vec{V_{E}}\vec{V_{E}}\\ (D.5)
\end{array}$$

Move expressions with only $T_O$ to the right:

$$\begin{array}{r}
 - 2\vec{V_{E}}\vec{V_{E}}T_{O}T + \vec{V_{E}}\vec{V_{E}}T^{2} = \vec{P}\vec{P} + 2T\vec{P}\vec{V_{E}} + T^{2}\vec{V_{E}}\vec{V_{E}} - \vec{V_{E}}\vec{V_{E}}{T_{O}}^{2}\\ (D.6)
\end{array}$$

$\vec{V_{E}}\vec{V_{E}}T^{2}$ is removed since
it’s on both sides, move T term to left:

$$\begin{array}{r}
 - 2\vec{V_{E}}\vec{V_{E}}T_{O}T - 2T\vec{P}\vec{V_{E}} = \vec{P}\vec{P} - \vec{V_{E}}\vec{V_{E}}{T_{O}}^{2}\\ (D.7)
\end{array}$$

Factor out common  − 2*T* term:

$$\begin{array}{r}
 - 2T\left( \vec{V_{E}}\vec{V_{E}}T_{O} + \vec{P}\vec{V_{E}} \right) = \vec{P}\vec{P} - \vec{V_{E}}\vec{V_{E}}{T_{O}}^{2}\\ (D.8)
\end{array}$$

Divide both sides by coefficient of T:

$$\begin{array}{r}
T = - \frac{\vec{P}\vec{P} - \vec{V_{E}}\vec{V_{E}}{T_{O}}^{2}}{2\left( \vec{V_{E}}\vec{V_{E}}T_{O} + \vec{P}\vec{V_{E}} \right)}\\ (D.9)
\end{array}$$

Remember $\sqrt{\vec{V_{E}}\vec{V_{E}}} = C$ so
replace some expressions with $C^2$, distribute negative sign:

$$\begin{array}{r}
T = \frac{C^{2}{T_{O}}^{2} - \vec{P}\vec{P}}{2\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)}\\ (D.10)
\end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
\vec{P} = \vec{X_{E}} - \left( \vec{X_{O}} + \vec{V_{O}}T_{O} \right)\\ (14)
\end{array}$$

$$\begin{array}{r}
A_{O} = C^{2}{T_{O}}^{2} - \vec{P}\vec{P}\\ (15)
\end{array}$$

$$\begin{array}{r}
B_{O} = C^{2}T_{O} + \vec{V_{O}}\vec{P}\\ (16)
\end{array}$$

$$\begin{array}{r}
T = \frac{A_{O}}{2B_{O}}\\ (12)
\end{array}$$

## Solve for $T_O$ when $\left\| \vec{{V}_{{O}}} \right\|$=C…

This only works if
$\vec{X_{E}} \neq \vec{X_{O}}$.

$$\begin{array}{r}
T_{O} = T + \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{\left\| \vec{V_{O}} \right\|}\\ (D.11)
\end{array}$$

Convert magnitudes to square root of vectors squared:

$$\begin{array}{r}
T_{O} = T_{E} + \frac{\sqrt{\left( \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right)^{2}}}{\sqrt{\vec{V_{O}}\vec{V_{O}}}}\\ (D.12)
\end{array}$$

Define partial expression P to simplify later operations:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} + \vec{V_{E}}T_{E} - \vec{X_{O}}\\ (11)
\end{array}$$

Substitute P into expression:

$$\begin{array}{r}
T_{O} = T_{E} + \frac{\sqrt{\left( \vec{P_{O}} - T_{O}\vec{V_{O}} \right)^{2}}}{\sqrt{\vec{V_{O}}\vec{V_{O}}}}\\ (D.13)
\end{array}$$

Move T expression to left side, preparing to square both sides:

$$\begin{array}{r}
T_{O} - T_{E} = \frac{\sqrt{\left( \vec{P_{O}} - T_{O}\vec{V_{O}} \right)^{2}}}{\sqrt{\vec{V_{O}}\vec{V_{O}}}}\\ (D.14)
\end{array}$$

Square both sides:

$$\begin{array}{r}
{T_{O}}^{2} - 2T_{O}T_{E} + {T_{E}}^{2} = \frac{\left( \vec{P_{O}} - T_{O}\vec{V_{O}} \right)^{2}}{\vec{V_{O}}\vec{V_{O}}}\\ (D.15)
\end{array}$$

Expand squares, move $\vec{V_{O}}\vec{V_{O}}$ to
the left side:

$$\begin{array}{r}
\vec{V_{O}}\vec{V_{O}}{T_{O}}^{2} - 2\vec{V_{O}}\vec{V_{O}}T_{O}T_{E} + \vec{V_{O}}\vec{V_{O}}{T_{E}}^{2} = \vec{P_{O}}\vec{P_{O}} - 2T_{O}\vec{P_{O}}\vec{V_{O}} + {T_{O}}^{2}\vec{V_{O}}\vec{V_{O}}\\ (D.16)
\end{array}$$

$\vec{V_{O}}{T_{O}}^{2}$ is removed since it’s on both
sides, move T term to left:

$$\begin{array}{r}
 - 2\vec{V_{O}}\vec{V_{O}}T_{O}T_{E} + 2T_{O}\vec{P_{O}}\vec{V_{O}} + \vec{V_{O}}\vec{V_{O}}{T_{E}}^{2} = \vec{P_{O}}\vec{P_{O}}\\ (D.17)
\end{array}$$

Factor out common  − 2$T_O$ term:

$$\begin{array}{r}
 - 2T_{O}\left( \vec{V_{O}}\vec{V_{O}}T_{E} + \vec{P_{O}}\vec{V_{O}} \right) = \vec{P_{O}}\vec{P_{O}} - \vec{V_{O}}\vec{V_{O}}{T_{E}}^{2}\\ (D.18)
\end{array}$$

Divide both sides by coefficient of $T_O$:

$$\begin{array}{r}
T_{O} = - \frac{\vec{P_{O}}\vec{P_{O}} - \vec{V_{O}}\vec{V_{O}}{T_{E}}^{2}}{2\left( \vec{V_{O}}\vec{V_{O}}T_{E} + \vec{P_{O}}\vec{V_{O}} \right)}\\ (D.19)
\end{array}$$

Remember $\sqrt{\vec{V_{O}}\vec{V_{O}}} = C$ so
replace some expressions with $C^2$, distribute negative sign:

$$\begin{array}{r}
T_{O} = \frac{C^{2}{T_{E}}^{2} - \vec{P_{O}}\vec{P_{O}}}{2\left( C^{2}T_{E} + \vec{P_{O}}\vec{V_{O}} \right)}\\ (D.20)
\end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} + \vec{V_{E}}T_{E} - \left( \vec{X_{O}} \right)\\ (11)
\end{array}$$

$$\begin{array}{r}
A_{E} = C^{2}{T_{E}}^{2} - \vec{P_{O}}\vec{P_{O}}\\ (15)
\end{array}$$

$$\begin{array}{r}
B_{E} = C^{2}T_{E} + \vec{P_{O}}\vec{V_{O}}\\ (16)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{A_{E}}{2B_{E}}\\ (12)
\end{array}$$
