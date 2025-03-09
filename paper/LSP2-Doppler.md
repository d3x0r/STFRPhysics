
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Introduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |

# Doppler Effect or Frequency Shift

The frequency shift depends on the angle the light was emitted, after
aberration is applied. Theta (*θ*) in the equation is the emission angle
relative to the velocity direction, and V is just the speed component of
the velocity.

$$\begin{array}{r}
F = \frac{1}{\sqrt{1 + \frac{V^{2}}{C^{2}} - \frac{2V}{C}\sin(\theta)}}\\ (6.1)
\end{array}$$

The above factor is a scalar on the frequency, and $\frac{1}{F}$ should
be used to scale the wavelength.

The composite frequency shift and light aberration function:

$$\begin{array}{r}
F = \frac{1}{\sqrt{1 + \frac{V^{2}}{C^{2}} - \frac{2V}{C}\\\cos\left( N\cdot{\cos^{- 1}\left( \frac{\cos(dA) + \frac{V}{C}}{1 + \frac{V}{C}\cos(dA)} \right)} \right)}}\\ (6.2)
\end{array}$$

## Derivation of Doppler Shift

$A_O$ is the angle observed. (same as in aberration)

$D$ is the direction the emitter is travelling. (same as in aberration)

Equation \[6.3\] is the distance the signal travels in 1 tick:

$$\begin{array}{r}\vec{A} = \left\{C\cos\left( A_{O} \right),C\sin\left( A_{O} \right)\right\}\\ (6.3)\end{array}$$
Equation \[6.4\] is the distance the body travels in 1 tick:

$$\begin{array}{r}
\vec{B} = \left\{ V\cos(D),V\sin(D) \right\}\\ (6.4)
\end{array}$$

This is the difference between the distance traveled by 1 wave in 1 tick
minus the distance traveled by the body:

$$\begin{array}{r}
\vec{A - B} = \left\| C\cos(A) - V\cos(D),C\sin(A) - V\sin(D) \right\|\\ (6.5)
\end{array}$$

Square both sides, to work to getting length of the vector:

$$\begin{array}{r}
{\vec{A - B}}^{2} = \left( \begin{array}{r}
\left( C^{2}\cos^{2}(A) - 2CV\cos(A)\cos(D) + V^{2}\cos^{2}(D) \right) \\
 + \left( C^{2}\sin^{2}(A) - 2CV\sin(A)\sin(D) + V^{2}\sin^{2}(D) \right)
\end{array} \right)\\ (6.6)
\end{array}$$

Combine common terms:

$$\begin{array}{r}
{\vec{A - B}}^{2} = \left( \begin{array}{r}
C^{2}\left( \cos^{2}(A) + \sin^{2}(A) \right) \\
 - 2CV\left( \cos(A)\cos{(D) + \sin(A)\sin(D)} \right) \\
 + V^{2}\left( \cos^{2}{(D) + \sin^{2}(D)} \right)
\end{array} \right)\\ (6.7)
\end{array}$$

Remove terms that combine to be 1, and simplify complex trig identity:

$$\begin{array}{r}
{\vec{A - B}}^{2} = C^{2} - 2CV\left( \sin(D - A) \right) + V^{2}\\ (6.8)
\end{array}$$

Take square root of both sides to result in length, and divide both
sides by C to convert the distance to a time:

$$\begin{array}{r}
\frac{\left\| \vec{A - B} \right\|}{C} = \frac{\sqrt{C^{2} - 2CV\left( \sin(D - A) \right) + V^{2}}}{C}\\ (6.9)
\end{array}$$

Resulting equation:

$$\begin{array}{r}
\boxed{\frac{\left\| \vec{A - B} \right\|}{C} = \sqrt{1 + \frac{V^{2}}{C^{2}} - \frac{2V}{C}\left( \sin(D - A) \right)}}\\ (6.10)
\end{array}$$

