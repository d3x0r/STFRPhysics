
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Appendix A (T solve)

Solve equation \[1\] for T...

$$\begin{array}{r}
T_{O} = \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C} + T\\ (1.1)
\end{array}$$

Can also be written as:

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\left( \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right)^{2}}}{C} + T\\ (A.1)
\end{array}$$

Use partial term \[3\] for base position:

$$\begin{array}{r}
\vec{P} = \vec{X_{E}} - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right)\\ (3)
\end{array}$$

Substitute *P⃗*:

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\left( \vec{P} + T\vec{V_{E}} \right)^{2}}}{C} + T\\ (A.2)
\end{array}$$

Move *T* to the left side, substitute *P⃗*, and multiply both sides by
$C$, then square both sides to remove the square root.

$$\begin{array}{r}
C^{2}\left( T_{O} - T \right)^{2} = \left( \vec{P} + T\vec{V_{E}} \right) \bullet \left( \vec{P} + T\vec{V_{E}} \right)\\ (A.3)
\end{array}$$

Expand expressions which have T in them, expand right side:

$$\begin{array}{r}
C^{2}T_{O} - {2C}^{2}T_{O}T + C^{2}T^{2} = {\vec{P}}^{2} + 2\vec{P}T\vec{V_{E}} + T^{2}{T\vec{V_{E}}}^{2}\\ (A.4)
\end{array}$$

Move T terms to the left, else to the right; also combined terms,
reorder right side terms with a negation:

 $$\begin{array}{r}
 C^{2}T^{2} - 2C^{2}T_{O}T - 2T\vec{P}\vec{V_{E}} - T^{2}{\vec{V_{E}}}^{2} = - \left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)\\ (A.5)
 \end{array}$$

Combine coefficients of T <sup>2</sup> and T:

 $$\begin{array}{r}
 \left( C^{2} - {\vec{V_{E}}}^{2} \right)T^{2} - 2T\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right) = - \left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)\\ (A.6)
 \end{array}$$

Combine expressions with T, factor to a simple square:

 $$\begin{array}{r}
 \left( T\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)} - \frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)}{\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)}} \right)^{2} - \frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)^{2}}{C^{2} - {\vec{V_{E}}}^{2}} = - \left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)\\ (A.7)
 \end{array}$$

Move $T_O$ expression to right side, take the square root of
both sides:

 $$\begin{array}{r}
 T\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)} - \frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)^{2}}{\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)}} = \sqrt{\frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)^{2}}{C^{2} - {\vec{V_{E}}}^{2}} - \left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)}\\ (A.8)
 \end{array}$$

Move $T_O$ term to the right, and divide by coefficient of
*T*, group left expression under radical, and negate sign of group:

 $$\begin{array}{r}
 T = \frac{\sqrt{\frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)^{2}}{C^{2} - {\vec{V_{E}}}^{2}} - \left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)} + \frac{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)}{\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)}}}{\sqrt{\left( C^{2} - {\vec{V_{E}}}^{2} \right)}}\\ (A.9)
 \end{array}$$

Multiply right-side top and bottom by
$\frac{\sqrt{\left( C^{2} - {\vec{V}}^{2} \right)}}{\sqrt{\left( C^{2} - {\vec{V}}^{2} \right)}}$

 $$\begin{array}{r}
 T = \frac{\sqrt{\left( C^{2}T_{O} + \vec{P}\vec{V_{E}} \right)^{2} - \left( C^{2} - {\vec{V_{E}}}^{2} \right)\left( C^{2}{T_{O}}^{2} - {\vec{P}}^{2} \right)} + C^{2}T_{O} + \vec{P}\vec{V_{E}}}{C^{2} - {\vec{V_{E}}}^{2}}\\ (A.10)
 \end{array}$$

Fully expanded form (s):

 $$\begin{array}{r}
 T = \frac{\begin{array}{r}
 \sqrt{\begin{array}{r}
 \left( C^{2}T_{O} - \vec{X_{E}}\vec{V_{E}} + \vec{X_{O}}\vec{V_{E}} + T_{O}\vec{V_{O}}\vec{V_{E}} \right)^{2} \\
  - \left( C^{2} - {\vec{V_{E}}}^{2} \right)\left( C^{2}{T_{O}}^{2} - \left( \vec{X_{E}} - \vec{X_{O}} - T_{O}\vec{V_{O}} \right)^{2} \right)
 \end{array}} \\
  + C^{2}T_{O} + \vec{X_{E}}\vec{V_{E}} - \vec{X_{O}}\vec{V_{E}} - T_{O}\vec{V_{O}}\vec{V_{E}}
 \end{array}}{C^{2} - {\vec{V_{E}}}^{2}}\\ (A.11)
 \end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
\vec{P} = \vec{X_{E}} - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right)\\ (1.3)
\end{array}$$

$$\begin{array}{r}
A = C^{2}{T_{O}}^{2} - \vec{P}\vec{P}\\ (1.6)
\end{array}$$

$$\begin{array}{r}
B = C^{2}T_{O} + \vec{V_{E}}\vec{P}\\ (1.7)
\end{array}$$

$$\begin{array}{r}
D = C^{2} - \vec{V_{E}}\vec{V_{E}}\\ (1.8)
\end{array}$$

$$\begin{array}{r}
T = \frac{\sqrt{B^{2} - DA} + B}{D}\\ (1.9)
\end{array}$$

