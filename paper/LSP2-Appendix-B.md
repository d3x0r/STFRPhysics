
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Appendix B ($T_O$ solve)

Solve propagation equation for $T_O$

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\left( \left( \vec{X_{E}} + \vec{V_{E}}T \right) - \left( \vec{X_{O}} + \vec{V_{O}}T_{O} \right) \right)^{2}}}{C} + T\\ (1.2)
\end{array}$$

Define position term $\vec{P_{O}}\\$:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} + \vec{V_{E}}T - \vec{X_{O}}\\ (1.11)
\end{array}$$

Substitute P into the expression:

$$\begin{array}{r}
T_{O} = T + \frac{\sqrt{\left( \vec{P_{O}} - \vec{V_{O}}T_{O} \right)^{2}}}{C}\\ (B.1)
\end{array}$$

Isolate the radical, move T to the left, multiply both sides by C:

$$\begin{array}{r}
C\left( T_{O} - T \right) = \sqrt{\left( \vec{P_{O}} - \vec{V_{O}}T_{O} \right)^{2}}\\ (B.2)
\end{array}$$

Square both sides:

$$\begin{array}{r}
C^{2}\left( T_{O} - T \right)^{2} = \left( \vec{P_{O}} - \vec{V_{O}}T_{O} \right)^{2}\\ (B.3)
\end{array}$$

Expand squared expressions:

$$\begin{array}{r}
C^{2}T^{2} - 2C^{2}TT_{O} + C^{2}{T_{O}}^{2} = \vec{P_{O}}\vec{P_{O}} - 2\vec{P_{O}}\vec{V_{O}}T_{O} + {\vec{V_{O}}}^{2}{T_{O}}^{2}\\ (B.4)
\end{array}$$

Move terms with $T_O$ to the left, and terms with only *T*
to the right.

$$\begin{array}{r}
 - 2C^{2}TT_{O} - 2\vec{P_{O}}\vec{V_{O}}T_{O} + C^{2}{T_{O}}^{2} - {\vec{V_{O}}}^{2}{T_{O}}^{2} = \vec{P_{O}}\vec{P_{O}} - C^{2}T^{2}\\ (B.5)
\end{array}$$

Reverse right hand terms by negation:

$$\begin{array}{r}
 - 2C^{2}TT_{O} - 2\vec{P_{O}}\vec{V_{O}}T_{O} + C^{2}{T_{O}}^{2} - {\vec{V_{O}}}^{2}{T_{O}}^{2} = - (C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}})\\ (B.6)
\end{array}$$

Combine common factors of $T_O$:

$$\begin{array}{r}
\left( C^{2} - {\vec{V_{O}}}^{2} \right){T_{O}}^{2} - 2T_{O}\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right) = \vec{P_{O}}\vec{P_{O}} - C^{2}T^{2}\\ (B.7)
\end{array}$$

Define partial expression to simplify terms later:

$$\begin{array}{r}
D_{O} = C^{2} - \vec{V_{O}}\vec{V_{O}}\\ (16)
\end{array}$$

Substitute $D_O$ partial expression:

$$\begin{array}{r}
D_{O}{T_{O}}^{2} - 2T_{O}\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right) = \vec{P_{O}}\vec{P_{O}} - C^{2}T^{2}\\ (B.8)
\end{array}$$

Factor left side into a square expression, plus a correction for the
extra term that shows up:

$$\begin{array}{r}
\left( \sqrt{D_{O}}T_{O} - \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{\sqrt{D_{O}}} \right)^{2} - \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2}}{D_{O}} = \\ (B.9)
\end{array}$$

Move expression with $T$ in it to the right side:

$$\begin{array}{r}
\left( \sqrt{D_{O}}T_{O} - \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{\sqrt{D_{O}}} \right)^{2} = \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2}}{D_{O}} - \left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)\\ (B.10)
\end{array}$$

Take square root of both sides:

$$\begin{array}{r}
\sqrt{D_{O}}T_{O} - \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{\sqrt{D_{O}}} = \sqrt{\frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2}}{D_{O}} - \left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)}\\ (B.11)
\end{array}$$

Move expression with T to the right side:

$$\begin{array}{r}
\sqrt{D}T_{O} = \sqrt{\frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2}}{D_{O}} - \left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)} + \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{\sqrt{D_{O}}}\\ (B.12)
\end{array}$$

Divide by Coefficient of $T_O$:

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2}}{D_{O}} - \left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)} + \frac{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{\sqrt{D_{O}}}}{\sqrt{D_{O}}}\\ (B.13)
\end{array}$$

Multiply right-side by $\frac{\sqrt{D_{O}}}{\sqrt{D_{O}}}$,
substituting *D*<sub>*O*</sub> will give equation (12).

$$\begin{array}{r}
\boxed{T_{O} = \frac{\sqrt{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2} - D_{O}\left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)} + \left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{D_{O}}}\\ (B.14)
\end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} + \vec{V_{E}}T - \vec{X_{O}}\\ (1.11)
\end{array}$$

$$\begin{array}{r}
A_{O} = C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}}\\ (1.14)
\end{array}$$

$$\begin{array}{r}
B_{O} = C^{2}T + \vec{V_{O}}\vec{P_{O}}\\ (1.15)
\end{array}$$

$$\begin{array}{r}
D_{O} = C^{2} - \vec{V_{O}}\vec{V_{O}}\\ (1.16)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{\sqrt{{B_{O}}^{2} - D_{O}A_{O}} + B_{O}}{D_{O}}\\ (1.17)
\end{array}$$
