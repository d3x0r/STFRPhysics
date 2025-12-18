
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Introduction.md)                | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Appendix C (**Δ**T solve)

Delta time can be the delta from emitted time or from observed time.

$$\begin{array}{lr}
T_{O} = T_{E} + T_{\Delta O} & (C.1)
\end{array}$$

$$\begin{array}{lr}
T_{E} = T_{O} - T_{\Delta E}& (C.2)
\end{array}$$

## Solve for $T_{\Delta O}$ from $T_E$

(Follows the same basic steps as above, description of steps omitted)

$$\begin{array}{r}
T_{\Delta O} = \frac{\left\| \left( \vec{X_{O}} + \left( T_{E} + T_{\Delta O} \right)\vec{V_{O}} \right) - \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) \right\|}{C}& (1.1)
\end{array}$$

Position at time of emission, only in terms of $T_E$ from emission pointed to observation.

$$\begin{array}{r}
\vec{P_{\Delta O}} = \left( \vec{X_{O}} + T_{E}\vec{V_{O}} \right) - \left( \vec{X_{E}} + \vec{V_{E}}T_{E}\right) & (1.19)
\end{array}$$

Substitute 

$$\begin{array}{r}
T_{\Delta O} = \frac{\sqrt{\left( \vec{P_{\Delta O}} - T_{\Delta O}\vec{V_{O}} \right)^{2}}}{C}& (C.1)
\end{array}$$

$$\begin{array}{r}
\left( CT_{\Delta O} \right)^{2} = \left( \vec{P_{\Delta O}} - T_{\Delta O}\vec{V_{O}} \right)^{2}& (C.2)
\end{array}$$

$$\begin{array}{r}
C^{2}{T_{\Delta O}}^{2} = \vec{P_{\Delta O}}\vec{P_{\Delta O}} - 2\vec{P_{\Delta O}}T_{\Delta O}\vec{V_{O}} + T_{\Delta O}\vec{V_{O}}T_{\Delta O}\vec{V_{O}}& (C.3)
\end{array}$$

$$\begin{array}{r}
C^{2}{T_{\Delta O}}^{2} - {\vec{V_{O}}}^{2}{T_{\Delta O}}^{2} - 2\vec{P_{\Delta O}}T_{\Delta O}\vec{V_{O}} = \vec{P_{\Delta O}}\vec{P_{\Delta O}}& (C.4)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O} = C^{2} - {\vec{V_{O}}}^{2}& (C.5)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O}{T_{\Delta O}}^{2} - 2T_{\Delta O}\vec{P_{\Delta O}}\vec{V_{O}} = \vec{P_{\Delta O}}\vec{P_{\Delta O}}& (C.6)
\end{array}$$

$$\begin{array}{r}
\left( \sqrt{D_{\Delta O}}T_{\Delta O} - \frac{\vec{P_{\Delta O}}\vec{V_{O}}}{\sqrt{E_{\Delta}}} \right)^{2} - \frac{({\vec{P_{\Delta O}}}{\vec{V_{O}}})^2}{D_{\Delta O}} = \vec{P_{\Delta O}}\vec{P_{\Delta O}}& (C.7)
\end{array}$$

$$\begin{array}{r}
\left( \sqrt{D_{\Delta O}}T_{\Delta O} - \frac{\vec{P_{\Delta O}}\vec{V_{O}}}{\sqrt{D_{\Delta O}}} \right)^{2} = \vec{P_{\Delta O}}\vec{P_{\Delta O}} + \frac{({\vec{P_{\Delta O}}}{\vec{V_{O}}})^2}{D_{\Delta O}}& (C.8)
\end{array}$$

$$\begin{array}{r}
\sqrt{D_{\Delta O}}T_{\Delta O} - \frac{\vec{P_{\Delta O}}\vec{V_{O}}}{\sqrt{D_{\Delta O}}} = \sqrt{\vec{P_{\Delta O}}\vec{P_{\Delta O}} + \frac{({\vec{P_{\Delta O}}}{\vec{V_{O}}})^2}{D_{\Delta O}}}& (C.9)
\end{array}$$

Move non $T_{\Delta O}$ expression to the right, divide by
coefficient of $T_{\Delta O}$

$$\begin{array}{r}
T_{\Delta O} = \frac{\sqrt{\vec{P_{\Delta O}}\vec{P_{\Delta O}} + \frac{({\vec{P_{\Delta O}}}{\vec{V_{O}}})^2}{D_{\Delta O}}} + \frac{\vec{P_{\Delta O}}\vec{V_{O}}}{\sqrt{D_{\Delta O}}}}{\sqrt{D_{\Delta O}}}& (C.10)
\end{array}$$

Multiply by $\frac{\sqrt{D_{\Delta O}}}{\sqrt{D_{\Delta O}}}$, reorder
terms under radical:

$$\begin{array}{r}
\boxed{T_{\Delta O} = \frac{\sqrt{\left({\vec{P_{\Delta O}}}{\vec{V_{O}}}\right)^{2} + D_{\Delta O}\vec{P_{\Delta O}}\vec{P_{\Delta O}}} + \vec{P_{\Delta O}}\vec{V_{O}}}{D_{\Delta O}}}& (C.11)
\end{array}$$

Simplify with partial expressions this is basically from ${T_E}=0$, and is just the additional time, so only initial positions matter for initial vector:

$$\begin{array}{r}
\vec{P_{\Delta O}} = \vec{X_{O}}-\vec{X_{E}} & (C.12)
\end{array}$$

$$\begin{array}{r}
A_{\Delta O} = \vec{P_{\Delta O}}\vec{P_{\Delta O}}& (1.11)
\end{array}$$

$$\begin{array}{r}
B_{\Delta O} = \vec{P_{\Delta O}}\vec{V_{O}}& (1.12)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O} = C^{2} - {\vec{V_{O}}}^{2}& (C.12)
\end{array}$$

$$\begin{array}{r}
T_{\Delta O} = \frac{\sqrt{{B_{\Delta O}}^{2} + D_{\Delta O}A_{\Delta O}} + B_{\Delta O}}{D_{\Delta O}}& (C.13)
\end{array}$$

## Solve for $T_{Δ E}$ from $T_O$

$T_E$ = $T_O$ − $T_{\Delta E}$

(Follows the same basic steps as above, description of steps omitted)

$$\begin{array}{r}
T_{O} = \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}& (1.2)
\end{array}$$

$$\begin{array}{r}
T_{E} = T_{O} - T_{\Delta E}& (C.14)
\end{array}$$

$$\begin{array}{r}
T_{\Delta E} = \frac{\left\| \left( \vec{X_{E}} + \left( T_{O} - T_{\Delta E} \right)\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}& (C.15)
\end{array}$$

$$\begin{array}{r}
\vec{P_{\Delta E}} = \vec{X_{E}} + T_{O}\vec{V_{E}} - \vec{X_{O}} - T_{O}\vec{V_{O}}& (1.29)
\end{array}$$

$$\begin{array}{r}
T_{\Delta E} = \frac{\sqrt{\left( \vec{P_{\Delta E}} - T_{\Delta E}\vec{V_{E}} \right)^{2}}}{C}& (C.16)
\end{array}$$

$$\begin{array}{r}
\left( CT_{\Delta E} \right)^{2} = \left( \vec{P_{\Delta O}} - T_{\Delta E}\vec{V_{E}} \right)^{2}& (C.17)
\end{array}$$

$$\begin{array}{r}
C^{2}T_{\Delta E} = \vec{P_{\Delta E}}\vec{P_{\Delta E}} - 2\vec{P_{\Delta E}}T_{\Delta O}\vec{V_{E}} + T_{\Delta O}\vec{V_{E}}T_{\Delta E}\vec{V_{E}}& (C.18)
\end{array}$$

$$\begin{array}{r}
C^{2}{T_{\Delta E}}^{2} - {\vec{V_{E}}}^{2}{T_{\Delta E}}^{2} - 2\vec{P_{\Delta E}}T_{\Delta E}\vec{V_{E}} = \vec{P_{\Delta E}}\vec{P_{\Delta E}}& (C.19)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O} = C^{2} - {\vec{V_{E}}}^{2}& (C.20)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O}{T_{\Delta E}}^{2} - 2T_{\Delta E}\vec{P_{\Delta E}}\vec{V_{E}} = \vec{P_{\Delta E}}\vec{P_{\Delta E}}& (C.21)
\end{array}$$

$$\begin{array}{r}
\left( \sqrt{D_{\Delta O}}T_{\Delta E} - \frac{\vec{P_{\Delta E}}\vec{V_{E}}}{\sqrt{D_{\Delta O}}} \right)^{2} - \frac{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2}}{D_{\Delta O}} = \vec{P_{\Delta E}}\vec{P_{\Delta E}}& (C.22)
\end{array}$$

$$\begin{array}{r}
\left( \sqrt{D_{\Delta O}}T_{\Delta E} - \frac{\vec{P_{\Delta E}}\vec{V_{E}}}{\sqrt{D_{\Delta O}}} \right)^{2} = \vec{P_{\Delta E}}\vec{P_{\Delta E}} + \frac{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2}}{D_{\Delta O}}& (C.23)
\end{array}$$

$$\begin{array}{r}
\sqrt{D_{\Delta O}}T_{\Delta E} - \frac{\vec{P_{\Delta E}}\vec{V_{E}}}{\sqrt{D_{\Delta O}}} = \sqrt{\vec{P_{\Delta E}}\vec{P_{\Delta E}} + \frac{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2}}{D_{\Delta O}}}& (C.24)
\end{array}$$

$$\begin{array}{r}
\sqrt{D_{\Delta O}}T_{\Delta E} - \frac{\vec{P_{\Delta E}}\vec{V_{E}}}{\sqrt{D_{\Delta O}}} = \sqrt{\vec{P_{\Delta E}}\vec{P_{\Delta E}} + \frac{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2}}{D_{\Delta O}}}& (C.24)
\\ \vec{P_{\Delta E}} = \vec{X_{E}} + T_{O}\vec{V_{E}} - \vec{X_{O}} - T_{O}\vec{V_{O}}& (1.29)
\end{array}$$




Move non $T_{\Delta E}$ expression to the right, divide by
coefficient of $T_{\Delta E}$, reorder terms under radical:

$$\begin{array}{r}
T_{\Delta E} = \frac{\sqrt{\frac{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2}}{D_{\Delta O}} + \vec{P_{\Delta E}}\vec{P_{\Delta E}}} + \frac{\vec{P_{\Delta E}}\vec{V_{E}}}{\sqrt{D_{\Delta O}}}}{\sqrt{D_{\Delta O}}}& (C.25)
\end{array}$$

Multiply by $\frac{\sqrt{D_{\Delta O}}}{\sqrt{D_{\Delta O}}}$:

$$\begin{array}{r}
\boxed{T_{\Delta E} = \frac{\sqrt{\left({\vec{P_{\Delta E}}}{\vec{V_{E}}}\right)^{2} + D_{\Delta O}\vec{P_{\Delta E}}\vec{P_{\Delta E}}} + \vec{P_{\Delta E}}\vec{V_{E}}}{D_{\Delta O}}}& (C.26)
\end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
\vec{P_{\Delta E}} = \vec{X_{E}} + T_{O}\vec{V_{E}} - \vec{X_{O}} - T_{O}\vec{V_{O}}& (C.27)
\end{array}$$

$$\begin{array}{r}
A_{\Delta E} = \vec{P_{\Delta E}}\vec{P_{\Delta E}}& (C.28)
\end{array}$$

$$\begin{array}{r}
B_{\Delta E} = \vec{P_{\Delta E}}\vec{V_{E}}& (C.29)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O} = C^{2} - {\vec{V_{E}}}^{2}& (C.30)
\end{array}$$

$$\begin{array}{r}
T_{\Delta E} = 
\frac{\sqrt{{B_{\Delta E}}^{2} + D_{\Delta O}A_{\Delta O}} + B_{\Delta O}}{D_{\Delta O}}& (C.31)
\end{array}$$

