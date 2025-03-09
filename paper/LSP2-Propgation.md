
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Light Propagation

Light propagation at a constant speed is the core of this system. It involves at least two points, one that emits an event at a time, and one
that later observes that event.

A point observed on a body that emits an event is represented by $\vec{X_{E}} + T_{E}\vec{V_{E}}$ where $\vec{X_{E}}$ is the position on the body that emitted a signal, $\vec{V_{E}}$ is the velocity of the body, $T_E$ is a time in the frame of space (it is an un-contracted time).

The point representing an observer is $\vec{X_{O}} + T_{O}\vec{V_{O}}$ where $\vec{X_{O}}$ is the observer’s position in the observing frame, $\vec{V_{O}}$ is the velocity of the observer's frame, and $T_O$ is a time in the frame of space which the observer sees the event.

The time of observation may be decomposed into the base time of emission plus time delta to observation: $T_O= T_E + T_{\Delta O}$. In practice, computing the delta time just adds an additional step of adding the delta to the base time.

Propagation time is computed by taking the observer’s point and subtracting the observed point, to find the shortest directed distance from the observer to the emitter; this essentially treats emission as a perfect circle from the point of emission until observation. The distance calculated is then divided by $C$, which results in the time it takes of the observer to see the emitted event.

The time for the observer to see an emitted event is:
 

$$\begin{equation}\begin{array}{r}
T_{O} = \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C} + T_{E} 
\end{array}\end{equation}$$

The delta time for the observer to see the emitted event is:

$$\begin{array}{r}
T_{O} = T_{E} + T_{\Delta O}
\end{array}$$

$$\begin{array}{r}
T_{E} = T_{O} - T_{\Delta E}\\
\end{array}$$

Replace $T_O$ terms in equation \[1\] with equation \[2\]:

$$\begin{array}{r}
T_{E} + T_{\Delta O} = \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + \left( T_{E} + T_{\Delta O} \right)\vec{V_{O}} \right) \right\|}{C} + T_{E}\\
\end{array}$$

Resulting with $T_{\Delta O}$ equation, which is the delta from
emission to observation:

$$\begin{array}{r}
T_{\Delta O} = \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + \left( T_{E} + T_{\Delta O} \right)\vec{V_{O}} \right) \right\|}{C}\\
\end{array}$$

Can also replace $T_E$ terms in equation \[1\] with equation
\[3\]:

$$\begin{array}{r}
T_{O} = \frac{\left\| \left( \vec{X_{E}} + \left( T_{O} - T_{\Delta E} \right)\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C} + (T_{O} - T_{\Delta E})\\ (1.6)
\end{array}$$

Resulting with $T_{\Delta E}$ equation, which is the delta from
observation to emission:

$$\begin{array}{r}
T_{\Delta E} = \frac{\left\| \left( \vec{X_{E}} + \left( T_{O} - T_{\Delta E} \right)\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}\\ (1.7)
\end{array}$$

## Solution for $T_E$ from $T_O$

This solution is used to find where an event was emitted that an
observer sees at some point. It is the most used solution in the
demonstration programs.

Equation (1) solved for $T_E$ (step-by-step solution in
[Appendix A](#appendix-a-t-solve)), define partial expression
$\vec{P_{O}}$, which is roughly base the position of the
emitted event to the observer. $\vec{P_{O}}$ makes the
solution somewhat shorter.

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right)\\\ (1.8)
\end{array}$$

This results with time of emission from a time of observation:

$$\begin{array}{r}
\boxed{T_{E} = \frac{\sqrt{\left( C^{2}T_{O} + \vec{V_{E}}\vec{P_{O}} \right)^{2} - \left( C^{2} - \vec{V_{E}}\vec{V_{E}} \right)\left( C^{2}{T_{O}}^{2} - \vec{P_{O}}\vec{P_{O}} \right)} + C^{2}T_{O} + \vec{V_{E}}\vec{\vec{P_{O}}}}{C^{2} - \vec{V_{E}}\vec{V_{E}}}}\\ (1.9)
\end{array}$$

Alternative expressions for above solution for T, equation (4) using
partial expressions...

$$\begin{array}{r}
A_{E} = C^{2}T_{O}^{2} - \vec{P_{O}}\vec{P_{O}}\\ (1.10)
\end{array}$$

$$\begin{array}{r}
B_{E} = C^{2}T_{O} + \vec{V_{E}}\vec{P_{O}}\\ (1.11)
\end{array}$$

$$\begin{array}{r}
D_{E} = C^{2} - \vec{V_{E}}\vec{V_{E}}\\ (1.12)
\end{array}$$

$$\begin{array}{r}
T_{E} = \frac{\sqrt{{B_{E}}^{2} - D_{E}A_{E}} + B_{E}}{D_{E}}\\ (1.13)
\end{array}$$

The position the event was emitted is then:

$$\begin{array}{r}
\vec{X_{P}} = \vec{X_{E}} + T_{E}\vec{V_{E}}\\ (1.14)
\end{array}$$

$$\begin{array}{r}
\vec{X_{P}} = \vec{X_{E}} + \frac{\sqrt{{B_{E}}^{2} - D_{E}A_{E}} + B_{E}}{D_{E}}\vec{V_{E}}\\ (1.15)
\end{array}$$

If the observer has a velocity, the resulting point should also have
light aberration applied, and if the time on the observer’s local clock
is shown, then $T_O$ should also have time contraction
applied, but then maybe the delay to the position of the clock might
also have to be calculated. An observer’s clock that is 1 light-second
away from the observer may be lagged by a second.

## Solution for $T_O$ from $T_E$

This is the solution that computes the time of observation from a time
of emission. The stepwise solution for $T_O$ is in [Appendix
B](#appendix-b-mathbft_mathbfomathbf-solve):

This is roughly the position of the emitted event:

$$\begin{array}{r}
\vec{P_{E}} = \left( \vec{X_{E}} + \vec{V_{E}}T_{E} \right) - \vec{X_{O}}\\ (1.16)
\end{array}$$

$$\begin{array}{r}
\boxed{T_{O} = \frac{\sqrt{\left( C^{2}T + \vec{P_{E}}\vec{V_{O}} \right)^{2} - \left( C^{2} - {\vec{V_{O}}}^{2} \right)\left( C^{2}T^{2} - \vec{P_{E}}\vec{P_{E}} \right)} + \left( C^{2}T + \vec{P_{E}}\vec{V_{O}} \right)}{C^{2} - \vec{V_{O}}\vec{V_{O}}}}\\ (1.17)
\end{array}$$

Simplify with partial expressions:

$$\begin{array}{r}
A_{O} = C^{2}T^{2} - \vec{P_{E}}\vec{P_{E}}\\ (1.18)
\end{array}$$

$$\begin{array}{r}
B_{O} = C^{2}T + \vec{V_{O}}\vec{P_{E}}\\ (1.19)
\end{array}$$

$$\begin{array}{r}
D_{O} = C^{2} - \vec{V_{O}}\vec{V_{O}}\\ (1.20)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{\sqrt{{B_{O}}^{2} - D_{O}A_{O}} + B_{O}}{D_{O}}\\ (1.21)
\end{array}$$

The result is of the same format as equation \[8\], but the calculation
is from T when an event is emitted and results with the time the event
is observed. $\vec{X_{S}}$ is the position of an observer
that sees the event.

$$\begin{array}{r}
\vec{X_{S}} = \vec{X_{O}} + T_{O}\vec{V_{O}}\\ (1.22)
\end{array}$$

$$\begin{array}{r}
\vec{X_{S}} = \vec{X_{O}} + \frac{\sqrt{{B_{O}}^{2} + D_{O}A_{O}} + B_{O}}{D_{O}}\vec{V_{O}}\\ (1.23)
\end{array}$$

## Solution for $T_{\Delta O}$ from time of emission

For completeness, can calculate just the delta time after an event is
emitted until the event is observed.

$$\begin{array}{r}
T_{\Delta O} = \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + \left( T_{E} + T_{\Delta O} \right)\vec{V_{O}} \right) \right\|}{C}\\ (1.5)
\end{array}$$

Solution for equation \[5\] given a time of emission ([Appendix
C](#appendix-c-mathbfdeltat-solve)):

$$\begin{array}{r}
\vec{P_{\mathrm{\Delta}}} = \vec{X_{E}} + \vec{V_{E}}T_{E} - \left( \vec{X_{O}} + T_{E}\vec{V_{O}} \right)\\ (1.19)
\end{array}$$

$$\begin{array}{r}
T_{\Delta O} = \frac{\sqrt{\vec{P_{\mathrm{\Delta}}}\vec{P_{\mathrm{\Delta}}}\left( D_{E} + \vec{V_{O}}\vec{V_{O}} \right)} - \vec{P_{\mathrm{\Delta}}}\vec{V_{O}}}{D_{E}}\\ (1.20)
\end{array}$$

Broken into partial expressions:

$$\begin{array}{r}
A_{\Delta O} = - \vec{P_{\mathrm{\Delta}}}\vec{P_{\mathrm{\Delta}}}\\ (1.21)
\end{array}$$

$$\begin{array}{r}
B_{\Delta O} = \vec{P_{\Delta}}\vec{V_{O}}\\ (1.22)
\end{array}$$

$$\begin{array}{r}
D_{\Delta O} = C^{2} - {\vec{V_{O}}}^{2}\\ (1.23)
\end{array}$$

$$\begin{array}{r}
T_{\Delta O} = \frac{\sqrt{{B_{\Delta O}}^{2} - D_{\Delta O}A_{\Delta O}} + B_{\Delta O}}{D_{\Delta O}}\\ (1.24)
\end{array}$$

The position an event is seen:

$$\begin{array}{r}
\vec{X_{S}} = \vec{X_{O}} + \left( T_{E} + T_{\Delta O} \right)\vec{V_{O}}\\ (1.25)
\end{array}$$

$$\begin{array}{r}
\vec{X_{S}} = \vec{X_{O}} + \left( T_{E} + \frac{\sqrt{{B_{\Delta O}}^{2} - D_{\Delta O}A_{\Delta O}} + B_{\Delta O}}{D_{\Delta O}} \right)\vec{V_{O}}\\ (1.26)
\end{array}$$

## Solution for $T_{\Delta E}$ from time of observation

Calculation for the delta time before an event is observed that an event
was emitted.

$$\begin{array}{r}
T_{\Delta E} = \frac{\left\| \left( \vec{X_{E}} + \left( T_{O} - T_{\Delta E} \right)\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}\\ (1.7)
\end{array}$$

$$\begin{array}{r}
\vec{P_{\Delta O}} = \vec{X_{E}} + T_{O}\vec{V_{E}} - \vec{X_{O}} - T_{O}\vec{V_{O}}\\ (1.28)
\end{array}$$

$$\begin{array}{r}
\boxed{T_{\Delta E} = \frac{\sqrt{D_{\Delta O}\vec{P_{\Delta O}}\vec{P_{\Delta O}} + {\vec{P_{\Delta O}}}^{2}{\vec{V_{E}}}^{2}} + \vec{P_{\Delta O}}\vec{V_{E}}}{D_{\Delta O}}}\\ (1.29)
\end{array}$$

Broken into partial expressions:

$$\begin{array}{r}
A_{\Delta E} = - \vec{P_{\Delta O}}\vec{P_{\Delta O}}\\ (1.30)
\end{array}$$

$$\begin{array}{r}
B_{\Delta E} = \vec{P_{\Delta O}}\vec{V_{O}}\\ (1.31)
\end{array}$$

$$\begin{array}{r}
D_{\Delta E} = C^{2} - {\vec{V_{E}}}^{2}\\ (1.32)
\end{array}$$

$$\begin{array}{r}
T_{\Delta E} = \frac{\sqrt{{B_{\Delta E}}^{2} - D_{\Delta E}A_{\Delta E}} + B_{\Delta E}}{D_{\Delta E}}\\ (1.33)
\end{array}$$

Event seen position, change in emitter position:

$$\begin{array}{r}
\vec{X_{P}} = \vec{X_{E}} + \left( T_{O} - T_{\Delta E} \right)\vec{V_{E}}\\ (1.34)
\end{array}$$

$$\begin{array}{r}
\vec{X_{P}} = \vec{X_{E}} + \left( T_{O} - \frac{\sqrt{{B_{\Delta E}}^{2} - D_{\Delta E}A_{\Delta E}} + B_{\Delta E}}{D_{\Delta E}} \right)\vec{V_{E}}\\ (1.35)
\end{array}$$

## Special Case for V=C

The above equations are the propagation delay between any two points on
two moving bodies each with their own independent velocities. The above
solutions are only valid for $V$ &lt; $C$, or $V$ &gt; $C$; if
$V$ &gt; $C$, then the negative of the square root should also be
considered as a solution; this will show the craft going backwards
towards where it came from, as the signals it had emitted when it was
there will finally reach the viewer. If $V$ = $C$, the following special
case formula can used.

This solution also only works if
$\vec{X_{E}} \neq \vec{X_{O}}$; and then only
when $T_O&gt;T$, the observer can’t see an event before
it is emitted. If the position an event is emitted is the same as the
observer, then it can be assumed there is 0 time to observe the event.

Instead of the first equation:

$$\begin{array}{r}
T_{O} = T + \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}\\ (1.1)
\end{array}$$

Replace C with ||V<sub>e</sub>||, and solve as normal ([Appendix
D](#appendix-d-vc)):

$$\begin{array}{r}
T_{O} = T_{E} + \frac{\left\| \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{\left\| \vec{V_{E}} \right\|}\\ (1.36)
\end{array}$$

Solved for $T_E$:

$$\begin{array}{r}
T_{E} = \frac{C^{2}{T_{O}}^{2} - \left( \vec{X_{E}} - \vec{X_{O}} - \vec{V_{O}}T_{O} \right)^{2}}{2\cdot\left( T_{O}C^{2} + \left( \vec{X_{E}} - \vec{X_{O}} - \vec{V_{O}}T_{O} \right) \cdot \vec{V_{E}} \right)}\\ (1.37)
\end{array}$$

Simplified with partial expression:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right)\\ (1.8)
\end{array}$$

$$\begin{array}{r}
A_{E} = C^{2}T_{O}^{2} - \vec{P_{O}}\vec{P_{O}}\\ (1.10)
\end{array}$$

$$\begin{array}{r}
B_{E} = C^{2}T_{O} + \vec{V_{E}}\vec{P_{O}}\\ (1.11)
\end{array}$$

$$\begin{array}{r}
T_{E} = \frac{A_{E}}{2B_{E}}\\ (1.38)
\end{array}$$

