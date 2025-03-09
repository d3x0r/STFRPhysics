
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Introduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Results

The first thing that was learned through the development of the above
system of equations, is that a body that is approaching an observer at a
high speed appears expanded, while a body that is leaving an observer
appears contracted. This is only an apparent expansion and contraction,
the physical length contraction of a moving body is not related to this
appearance; the appearance expands the body even longer than it is
non-contracted, and the apparent contraction is even more than the
contracted length (even if the body was not calculated to have any
length contraction).

The propagation of light delays when an observer sees a body, so the
observer sees the body in a position that is always behind a moving
body’s real position. If the observer is also moving, at a similar speed
to the body being observed, then the observer’s perception is advanced
in angle by light aberration. The light aberration makes it appear that
the body is further forward.

The application of perspective to the result is also important; just
plotting points as they would appear from light propagation, length
contraction, and light aberration in a 2D space-time graph makes the
graphs very distorted; or in the following case plogging the x-y change
of a square body that is observed moving.
<img src="attach/media/image2.png" style="width:7.125in;height:7.125in"
alt="Figure 2: Distortion of an observed space that is moving at 0.61c for an observer moving at 0.31c. This from this demo. The demonstration program allows " />Figure
2: Distortion of an observed space that is moving at 0.61c for an
observer moving at 0.31c. This from [this demo.](#two_space_demo) The
demonstration program allows toggling length contraction and aberration,
but light propagation effects are always applied.

This showed that there is a distinct asymmetry to the equations.

## Relative Velocities

An observer which is offset from the path of an observer has several
relative velocities while the body only has a constant velocity. An
observed body will at the furthest extent be seen as traveling towards
the observer with a velocity that points towards the observer (-V in a
2D sense), will slowly change to 0, and then appear to accelerate back
to velocity V away from the observer. If there is 0 distance (or an
insignificant fraction of the speed of light-seconds away), then the
velocity instantly changes from -V (towards the observer) to V (away
from the observer).

In the following equation, D is the distance to the straight line (1 in
the graph), V is the velocity (1 in the graph), T is the time (x in the
graph).

These equations give the position of an object some distance from an
observer at some time at a given velocity:

$$\begin{array}{r}
X = VT,Y = D,X^{'} = V(T - 0.001)\\ (73,74,75)
\end{array}$$

The change position between a ‘now’ and ‘now’ minus one one-thousandth
of a time unit, dividing the change in distance by 1/1000 is the same as
multiplying by 1000:

$$\begin{array}{r}
v_{x} = \left( \sqrt{\left( X^{2} + Y^{2} \right) - \left( \left( X^{'} \right)^{2} + Y^{2} \right)} \right) \bullet 1000\\ (76)
\end{array}$$

Expanded:

$$\begin{array}{r}
v_{x} = \left( \sqrt{(VT)^{2} + DD} - \sqrt{DD + \left( V(T - 0.001) \right)^{2}} \right) \cdot 1000\\ (77)
\end{array}$$

Give this graph:

<img src="attach/media/image3.jpg"
style="width:7.125in;height:1.24687in"
alt="Figure 3: a constant velocity (V) at an offset distance (D on the Y axis) is shown as the green line, while the relative time to an observer at X=0 is shown in purple. " />  
Figure 3: a constant velocity (V) at an offset distance (D on the Y
axis) is shown as the green line, while the relative time to an observer
at X=0 is shown in purple. The X-axis is a distance from the observer.
The Y-axis for the purple line is the relative velocity.

The Lorentz Transform does not account for this sort of relative
velocity. It does not even consider that before passing an observer the
relative velocity is negative, or toward the observer, and positive
after a body has passed an observer.

## The Lorentz Transform

In an attempt to get from propagation to derive the Lorentz
Transform\[[Ref 4](\l)\], there are a few points discovered to be issues
with the Lorentz Transform. First, the Lorentz Transform does not
include any consideration to change any propagation delay from an offset
of the body, instead falling back to a Galilean Transform for the Y and
Z coordinates, or from an offset on the observer; the further away a
point is in any direction, the longer it takes to see that point, and
the more lagged the position along the velocity of the observed body.
Second, there’s no support for [relative
velocity](#relative-time-dilation). The velocity is instead treated as a
differential between the two absolute velocities. A train going 60mph
and a car on the highway going 80mph, the train has a differential
velocity of -20mph compared to the car, but the relative velocity
changes as the car passes the train. Before the car passes the train,
the relative velocity between the two bodies is negative as they get
closer together, the delta is -20mph; and after the car passes the train
the velocity is positive and is 20mph. During the passing of the train,
relative to a particular point on the train, the relative velocity to a
specific point on the train is 0mph when it is at the closest distance
to the car. The velocity slowly changes from -20mph to 0mph to 20mph
relative to any point on the train.

The Lorentz Transform is also only valid for an event at the origin,
with an observer at the origin.

This isn’t an attempt to get the same result, since the behaviors are
not the same, it’s more to identify where the differences are. In the
case of basic light propagation calculation, there are two independent
velocities relative to a third frame. This might be *G*, *L*<sub>1</sub>
and *L*<sub>2</sub> frames, where *L*<sub>1</sub> and *L*<sub>2</sub>
are local frames moving with independent constant velocities within the
frame of *G*.

### Lorentz Transform Equations

$$\begin{array}{r}
\gamma = \frac{1}{\sqrt{1 - \frac{v^{2}}{c^{2}}}} = \frac{c}{\sqrt{c^{2} - v^{2}}}\\ (78)
\end{array}$$

$${\begin{array}{r}
t^{'} = \gamma\left( t - \frac{vx}{c^{2}} \right)\\ (79)
\end{array}
}\begin{array}{r}
x^{'} = \gamma(x - vt)\\ (80)
\end{array}$$

$${\begin{array}{r}
y^{'} = y\\ (81)
\end{array}
}\begin{array}{r}
z^{'} = z\\ (82)
\end{array}$$

The above set of equations are a solution for an event occurring at the
origin, and the primed frame is the observer also at the origin and is
the one is moving\[[ref 5](#Ref4_lorentz_derivation)\]; this is a pretty
typical derivation. But then that means the resulting equations have
only a limited scope of applicability. The offset in the *y* or *z*
directions also changes when an event is received, and it becomes
apparent that although the solved set of equations claims to use $C$*t*
as the propagation time of an event, that at some time *t* that the
signal is $C$*t* units from the origin, the solution doesn’t include
that factor, and only really tracks time dilation and length expansion.
The gamma term as defined increases to infinity as the velocity
approaches the speed of light.

Einsteins derivation in 1920 \[[ref 6](#Ref5_Einstein_derivation)\]
assumes a lot and does not give a step-by-step derivation.

The sequence of steps given to work from a Galilean transform to the
Lorentz Transform seems plausible, but it appears that the solution is
really reversed between the time direction and the space direction, when
considered from specialized consideration of light propagation formulae
given above. To approach the Lorentz Transform equivalent math, the
emitted event an observed event must be located at the origin of the
frame, which might also be, at an insignificant fraction of a
light-time-unit from the origin; given that the speed of light is very
fast, anything within a lab-scale distance is also 0. Lab-scale in this
sense is approximately anything up to the scale of the Earth, but maybe
1/40<sup>th</sup> of the radius of Earth is a more reasonable limit.

### Another Derivation

The Wikipedia derivation of the Lorentz Transform starts with two
stationary points, {*x*<sub>1</sub>, *y*<sub>1</sub>, *z*<sub>1</sub>}
and {*x*<sub>2</sub>, *y*<sub>2</sub>, *z*<sub>2</sub>}. The distance
between those points takes an amount of time from *t*<sub>1</sub> to
*t*<sub>2</sub>, times the speed of light \[[ref](#Lorentz_derivations)
7\]. It does immediately present that $C$*t* is somehow a meaningful
value itself, rather than the differential length divided by c is equal
to the delta time between the events; which then c can later be moved
over to the time side, and squared.

$$\begin{array}{r}
c^{2}\left( t_{2} - t_{1} \right)^{2} = \left( x_{2} - x_{1} \right)^{2} + \left( y_{2} - y_{1} \right)^{2} + \left( z_{2} - z_{1} \right)^{2}\\ (83)
\end{array}$$

or

$$\begin{array}{r}
c^{2}\left( t_{2} - t_{1} \right)^{2} - \left( x_{2} - x_{1} \right)^{2} - \left( y_{2} - y_{1} \right)^{2} - \left( z_{2} - z_{1} \right)^{2} = 0\\ (84)
\end{array}$$

Equation \[65\] itself I cannot find fault in; other than it is for the
time between two stationary events and does not include any motion.

The next point is establishing invariance of interval \[[ref
7](#Lorentz_derivations)\]:

$$\begin{array}{r}
ds^{2} = c^{2}dt^{2} - dx^{2} - dy^{2} - dz^{2}\\ (85)
\end{array}$$

Then this *d**s* term is used to apply a relative velocity. Although
since *d**s*<sup>2</sup> = 0, it does seem to just be an exercise. But
as mentioned above, there isn’t a single relative velocity between two
bodies, except when the two bodies have the same velocity and are
relatively stationary with 0 relative velocity between them.
Additionally, *d**s* being an infinitesimal since
*d**s*<sup>2</sup> = 0, this is still only valid near 0.

### Comparison working from Light Propagation

Starting with equation \[1\]:

$$\begin{array}{r}
T_{O} = T + \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}\\ (2)
\end{array}$$

To match equation \[71\], which specifies that the emission of the event
(subscript 1) invert some signs. However, the right side will always be
positive, so the left side the observed event must be after the
emission, so it would be untrue to reverse the signs on the left. In the
above equations, *t*<sub>2</sub> − *t*<sub>1</sub>is a negative term,
but it shouldn’t matter after squaring.

$$\begin{array}{r}
T_{O} - T = \frac{\left\| \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) - \left( \vec{X_{E}} + T\vec{V_{E}} \right) \right\|}{C}\\ (86)
\end{array}$$

Convert magnitude expression to square root of squared difference:

$$\begin{array}{r}
T_{O} - T = \frac{\sqrt{\left( \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) - \left( \vec{X_{E}} + T\vec{V_{E}} \right) \right)^{2}}}{C}\\ (87)
\end{array}$$

Move C to the left side, and square both sides to remove radical:

$$\begin{array}{r}
C^{2}\left( T_{O} - T \right)^{2} = \left( \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) - \left( \vec{X_{E}} + T\vec{V_{E}} \right) \right)^{2}\\ (88)
\end{array}$$

At this point we can introduce another variable that makes the equation
non-zero on the left… though the invariance interval above (equation
\[66\]) is already in a delta, dropping the static initial points that
defined the terms. Also simplify to a single dimension instead of a
vector here.

$$\begin{array}{r}
{dS}^{2} = C^{2}\left( T_{O} - T \right)^{2} - \left( \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) - \left( \vec{X_{E}} + T\vec{V_{E}} \right) \right)^{2}\\ (89)
\end{array}$$

But then the velocities are already part of the math, and don’t have to
be applied to the *d**S* term. If there was a single differential (not
relative) velocity specified, then we could define:

$$\begin{array}{r}
\vec{V_{E}} = - \vec{V};\vec{V_{O}} = 0\\ (90,91)
\end{array}$$

Substitute velocity expressions \[71\] and \[72\] into \[70\]:

$$\begin{array}{r}
{dS}^{2} = C^{2}\left( T_{O} - T \right)^{2} - \left( \left( \vec{X_{O}} \right) - \left( \vec{X_{E}} - T\vec{V} \right) \right)^{2}\\ (92)
\end{array}$$

Remove some parenthesis:

$$\begin{array}{r}
{dS}^{2} = C^{2}\left( T_{O} - T \right)^{2} - \left( \vec{X_{O}} - \vec{X_{E}} - T\vec{V} \right)^{2}\\ (93)
\end{array}$$

Change $T_O$ to *T* + *T*<sub>*Δ*</sub>, and
$\vec{X_{O}} - \vec{X_{E}}$ to
$\vec{X_{\mathrm{\Delta}}}$

$$\begin{array}{r}
{dS}^{2} = C^{2}\left( T + T_{\Delta} - T \right)^{2} - \left( \vec{X_{\mathrm{\Delta}}} - T\vec{V} \right)^{2}\\ (94)
\end{array}$$

Simplify expressions, and this resembles equation\[73\], but still has a
differential velocity that works as a relative velocity in the equation:

$$\begin{array}{r}
{dS}^{2} = C^{2}{T_{\Delta}}^{2} - \left( \vec{X_{\mathrm{\Delta}}} + T_{\Delta}\vec{V} \right)^{2}\\ (95)
\end{array}$$

### Solving Light Propagation at the Origin

Alternatively, a shorter method that approaches the Lorentz Transform,
but doesn’t quite get there is to start with Equation 2:

$$\begin{array}{r}
T_{O} = T + \frac{\left\| \left( \vec{X_{E}} + T\vec{V_{E}} \right) - \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) \right\|}{C}\\ (2)
\end{array}$$

Define gamma:

$$\begin{array}{r}
\gamma = \frac{C}{\sqrt{C^{2} - V^{2}}}\\ (96)
\end{array}$$

Simplify so there is 0 distance between the observers, the point being
observed is 0, and a 0 velocity for the emitter, gives the following
equation:

$$\begin{array}{r}
C\left( T_{O} - T \right) = \left\| \left( - T_{O}\vec{V_{O}} \right) \right\|\\ (97)
\end{array}$$

Converting the magnitude expression to the square root of the vector
squared:

$$\begin{array}{r}
C\left( T_{O} - T \right) = \sqrt{\left( - T_{O}V \right)^{2}}\\ (98)
\end{array}$$

$$\begin{array}{r}
C^{2}T_{O}T_{O} - 2 C^{2}T_{O}T + {C^{2}T}^{2} = \left( - T_{O}V \right)^{2}\\ (99)
\end{array}$$

$$\begin{array}{r}
C^{2}T_{O}T_{O} - V^{2}T_{O}T_{O} - {2C^{2}T}_{O}T = - C^{2}T^{2}\\ (100)
\end{array}$$

$$\begin{array}{r}
\left( C^{2} - V^{2} \right)T_{O}T_{O} - {2C^{2}T}_{O}T = - C^{2}T^{2}\\ (101)
\end{array}$$

$$\begin{array}{r}
\left( \sqrt{\left( C^{2} - V^{2} \right)}T_{O} - \frac{C^{2}T}{\sqrt{\left( C^{2} - V^{2} \right)}} \right)^{2} = \frac{{C^{4}T}^{2}}{\left( C^{2} - V^{2} \right)} - {C^{2}T}^{2}\\ (102)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\frac{{C^{4}T}^{2}}{\left( C^{2} - V^{2} \right)} - {C^{2}T}^{2}} + \frac{CT}{\sqrt{\left( C^{2} - V^{2} \right)}}}{\sqrt{\left( C^{2} - V^{2} \right)}}\\ (103)
\end{array}$$

$$\begin{array}{r}
{T_{O}}^{} = \frac{\sqrt{{C^{4}T}^{2} - {\left( C^{2} - V^{2} \right)C^{2}T}^{2}} + C^{2}T}{C^{2} - V^{2}}\\ (104)
\end{array}$$

$$\begin{array}{r}
\boxed{T_{O} = \frac{\sqrt{V^{2}C^{2}T^{2}} + C^{2}T}{C^{2} - V^{2}}}\\ (105)
\end{array}$$

Which, naively, the square root of the square simplifies (incorrectly):

$$\begin{array}{r}
T_{O} = \frac{C^{2}T ± VCT}{C^{2} - V^{2}}\\ (106)
\end{array}$$

Scaled by gamma, this should be equivalent the *t*<sup>′</sup> equation
of the Lorentz Transformation:

$$\begin{array}{r}
T_{O} = \gamma CT\left( \frac{C \pm V}{C^{2} - V^{2}} \right)\\ (107)
\end{array}$$

$$\begin{array}{r}
T_{O} = \gamma CT\left( \frac{1}{C \pm V} \right)\\ (108)
\end{array}$$

$$\begin{array}{r}
X_{O} = \gamma VCT\left( \frac{1}{C \pm V} \right)\\\\ (109)
\end{array}$$

Should be:

$$\begin{array}{r}
t' = \gamma\left( t - \frac{vx}{c^{2}} \right)\\ (79)
\end{array}$$

Or:

$$\begin{array}{r}
X = \frac{tv}{C}\\ (110)
\end{array}$$

$$\begin{array}{r}
t' = \gamma\left( t - \frac{v}{C}\frac{vt}{C} \right)\\ (111)
\end{array}$$

$$\begin{array}{r}
x^{'} = \gamma(x - vt)\\ (80)
\end{array}$$

It can be noted, the simplification between \[105\] and \[106\] is not
correct, and the results are not equivalent. The result of the square
root should always be positive (except if V &gt; C, at which point, the
observer can notice the event in two places, and the negative solution
that is greater than T should also be considered), since observation
always occurs at a time after a signal is emitted, so it should at least
be an absolute value. This is invariably why the graph is taken as
symmetric across the origin, when with the full expression there is an
asymmetry to the observed space. Propagation is not a coordinate
transformation though, but when scaled with gamma correction factors,
the results are very close near the slow speed the Earth is moving
through the universe.

<img src="attach/media/image4.png"
style="width:7.125in;height:5.93333in"
alt="Example desmos graph from link below" />

Figure 4: https://www.desmos.com/calculator/vrvjp9vzcr. This is a
comparison of Lorentz Time plot vs Light Propagation time. The blue line
is the correct plot, at time *T* =  − 5, the event will be observed at
nearly $T_O$ =  − 3.33, because the observer is before the
event at the origin when it goes off, and it will run into the signal
from the event as it goes to the origin. At T=1, the event will be seen
at $T_O$ = 2, because the observer will have already passed
the event, and will take twice the time for the event to catch up to the
observer. The orange and red dashed lines are the incorrect
simplification for equation \[106\]. They each represent part of the
blue line, but continued, without following the blue line. The black
line is the Lorentz Transform, which results in an inexplicable graph.
The green line is the Lorentz time transformed without the gamma term.

### Another Approach, working from solved equation for propagation:

$$\begin{array}{r}
\vec{P_{O}} = \vec{X_{E}} + \vec{V_{E}}T - \vec{X_{O}}\\ (11)
\end{array}$$

$$\begin{array}{r}
\boxed{T_{O} = \frac{\sqrt{\left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)^{2} - \left( C^{2} - {\vec{V_{O}}}^{2} \right)\left( C^{2}T^{2} - \vec{P_{O}}\vec{P_{O}} \right)} + \left( C^{2}T + \vec{P_{O}}\vec{V_{O}} \right)}{C^{2} - {\vec{V_{O}}}^{2}}}\\ (12)
\end{array}$$

Again, simplify for $\vec{X_{E}} = \vec{0}$,
$\vec{X_{O}} = \vec{0},\\\vec{V_{E}} = \vec{0}$,
$\vec{V_{O}} = \vec{V}$:

$$\vec{P_{O}} = 0$$

$$\begin{array}{r}
T_{O} = \frac{\sqrt{\left( C^{2}T \right)^{2} - \left( C^{2} - {\vec{V}}^{2} \right)\left( C^{2}T^{2} \right)} + C^{2}T}{C^{2} - {\vec{V}}^{2}}\\ (112)
\end{array}$$

Expand terms:

$$\begin{array}{r}
T_{O} = \frac{\sqrt{C^{4}T^{2} - C^{2}C^{2}T^{2} + {\vec{V}}^{2}C^{2}T^{2}} + C^{2}T}{C^{2} - {\vec{V}}^{2}}\\ (113)
\end{array}$$

$$\begin{array}{r}
\boxed{T_{O} = \frac{\sqrt{{\vec{V}}^{2}C^{2}T^{2}} + C^{2}T}{C^{2} - {\vec{V}}^{2}}}\\ (114)
\end{array}$$

Incorrect simplification here:

$$\begin{array}{r}
T_{O} = \frac{\left\| \vec{V} \right\| CT + C^{2}T}{C^{2} - {\vec{V}}^{2}}\\ (115)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{\left( \left\| \vec{V} \right\| + C \right)(CT)}{C^{2} - {\vec{V}}^{2}}\\ (116)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{\left( \vec{V} + C \right)(CT)}{\left( C - \left\| \vec{V} \right\| \right)\left( C + \left\| \vec{V} \right\| \right)}\\ (117)
\end{array}$$

$$\begin{array}{r}
T_{O} = \frac{(CT)}{\left( C - \left\| \vec{V} \right\| \right)}\\ (118)
\end{array}$$

Again, the simplification removing the radical between \[114\] and
\[115\] is incorrect. The squaring of the terms and the square root is
effectively an absolute value on the T and V terms.

## $E=mc^2$?

The expression for energy and mass only depends on time dilation
gamma\[[ref 3](\l)\], and the gamma term is the same; there is no
consequence or modification for this expression.

## The Problems

The following sections are problems that were found with the above math.
They are places where the idea of relativity and the equivalence
principle do not match what would happen in reality.

### Relative Time Dilation

This is an issue with Relativity as a concept.

It's said that only the relative difference matters between two bodies.
Consider a scenario where 8 craft pass by Earth at the same time (T=0),
and their clocks are all exactly synchronized. Each craft is 0.1c faster
than the previous.

Each ship has an additional distance of 0.1 light seconds per second,
which is a lag of +0.1 seconds per second, or after 10 seconds there's 1
light-second between them which is an additional delay of 1 second.
Between the first and last ship then is 8 seconds of delay per 10
seconds of travel.

If considered entirely relatively, then each ship has a relative time
contraction of 0.995 compared to the previous ship, or the same as the
contraction between the earth and the first ship. After 1 second, each
ship’s clock is 10*(1-0.995) = 0.050 slower seconds per 10 seconds of
travel slower than the previous ship.

A side note: obviously the Lorentz Transform that results in 0.05 second
contraction does not include the 1 second of propagation time between
each ship. Each ship would see the next as 1.05 seconds per 10 seconds
slower when including the propagation delay. The total difference from
the first ship to the last is at least 7 seconds of lag.

The time contraction for the 8<sup>th</sup> ship relative to the earth
is (1-0.6 = 0.4 which indicates it loses 4 seconds in 10) and
8*(1-0.995) is 0.040, which is the total contraction the 8<sup>th</sup>
ship would have if considered as only relative to the prior ship.
0.040(total relative) is not equal to 0.40(relative to earth).

The below table shows the actual and relative differences for their
local clock.

Table 1

<table>
<colgroup>
<col style="width: 7%" />
<col style="width: 9%" />
<col style="width: 9%" />
<col style="width: 9%" />
<col style="width: 9%" />
<col style="width: 9%" />
<col style="width: 9%" />
<col style="width: 8%" />
<col style="width: 11%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>0</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>Comments</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>1.0</p>
<p>0</p></td>
<td><p>0.995</p>
<p>0.005</p></td>
<td><p>0.978</p>
<p>0.022</p></td>
<td><p>0.954</p>
<p>0.046</p></td>
<td><p>0.917</p>
<p>0.073</p></td>
<td><p>0.866</p>
<p>0.134</p></td>
<td><p>0.800</p>
<p>0.200</p></td>
<td><p>0.714</p>
<p>0.276</p></td>
<td><p>0.600</p>
<p>0.400</p></td>
<td>Actual time contraction; how much time each clock loses</td>
</tr>
<tr class="even">
<td><p>1.0</p>
<p>0</p></td>
<td><p>0.995</p>
<p>0.005</p></td>
<td><p>0.990</p>
<p>0.010</p></td>
<td><p>0.985</p>
<p>0.015</p></td>
<td><p>0.980</p>
<p>0.020</p></td>
<td><p>0.975</p>
<p>0.025</p></td>
<td><p>0.970</p>
<p>0.030</p></td>
<td><p>0.965</p>
<p>0.035</p></td>
<td><p>0.960</p>
<p>0.040</p></td>
<td>Total tTime contraction if time was relative to the previous</td>
</tr>
</tbody>
</table>

The following is across 10 seconds, and including propagation delay:

-   Observer 1 sees 2 as 1 second + 10(0.995-0.978)=0.15 seconds ... so
    1 sees 2 lagged by 1.15 seconds*.*

-   Observer in 7 sees 8 as 1 second + 10(0.714-0.600)=1.14 seconds ...
    so 7 to 8 sees 8’s clock lagged by 2.14 seconds per 10 seconds
    compared to its own clock.

Remember 7 to 8 and 1 to 2 are both relative to each other by only 0.1c,
so the time dilation that 7 sees from 8 should still be just 0.995
seconds from time dilation according to Special Relativity.

### The Twin Paradox

There is no paradox in this system. Every observer can agree which is
moving and which is stationary. The moving twin ages slower, and at a
known rate compared to their twin back in the nearly stationary frame of
Earth.

The Twin Paradox stems from equivalence where the moving twin pretends
that they are stationary, and therefore the stationary twin is the one
that is moving, and therefore has the slow clock, when really the slow
clock is always on the side which is really moving.

The moving ship can use the aberration of the stars compared to the
aberration the twin on earth sees, if they send stellar charts back and
forth, they can identify which IS moving, and which clock is running
slow. Relativity and the Equivalence principle says it’s just as valid
that the ship is not moving and the earth is moving away, therefore the
twin on the earth is aging slower; this is not what happens. It’s been
said that the other solution to this is to measure the acceleration, and
the body that has undergone more acceleration is the one with the slow
clock, but then that implies it’s acceleration that causes time
contraction, and that not accelerating or coasting at a velocity will
have non-contracted time, which is untrue… acceleration may lead to a
velocity which then is a cause of contracted time, but it is not
directly responsible for the contraction of time.

## Demonstrations and Simulations

While developing this I made a series of demonstration programs to
investigate various behaviors. This is not a comprehensive list.

<https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedSim.md> Is
the main document for the project that has the list of demos, and more
information about the demonstrations.

[Stationary Observer, Moving Observable, at
V&gt;C](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed.html) –
This was the first idea – just to see what the behavior was for a body
that was able to move faster than the speed of light (or speed of sound,
or speed of water waves); an interesting realization was that for a
supersonic plane, as I often heard when living in Las Vegas from Nellis
Air Force Base, there would be a loud noise, followed by very loud jet
sounds; but the sound would actually appear to go towards the base and
away from the base. It was very hard to know if they were returning or
leaving, since the plane was closest before I ever heard it, and then
the sound for whatever direction it came from would overlap the sound
from the direction it was going.

[Stationary Observer, moving Observable, V as a fraction of
C](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed1.html) –
This is the same as the first demonstration, but limits velocity to a
maximum of C.

[Stationary Observable, moving
observer](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed2a.html)
– this becomes mostly about light aberration, since the position the
observes sees the stationary thing from is always the same. The length
does not contract for things that are not moving relative to the moving
observer; this is another place where the symmetry of the Lorentz
Transform, and when claiming that the moving observer is stationary,
while the body that is stationary is the one that is moving, is invalid.

[Moving body with an observer in
it](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3.html) –
this would be like a train with a passenger inside the train. This
demonstration only supported one direction.

[Moving body with observer, supports changing direction of
velocity](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4.html)

[2D Bodies, each with their own velocity and
direction](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html)
– This showed the transform of space and was part of trying to match the
Lorentz Transform space-time graphs; there’s an option to enable X-T
Graph specifically about that. This compares how a 2D space is
transformed for an observer in a square ship, watching another square
ship with its own velocity and directions. This employs length
contraction and light aberration, and I had an inspiration that maybe
because of light aberration of the propagation delayed points might look
more correct in perspective. In 2D, however, this would just be a
circle, and not being a flatlander, I’m not very good with interpreting
a perspective of a plane in a circle.

[3D Orthogonal vs Perspective
Test](https://d3x0r.github.io/Voxelarium.js/index2-dual-view.html) – I
implemented another test in another project that had a voxel cube. I
implemented moving the points according to the velocity and delay of
propagation and light aberration in the shader which changes the shape
of the geometry in real time. The orthogonal view and perspective views
do the same transformation, and the camera position and orientation is
also exactly the same. This shows, when velocity and direction are
locked, that even though the geometry is highly deformed by the
propagation time of where a point on the moving body is seen from, and
the light aberration, that at any speed the frame still looks exactly
square. Even with VR enabled, other than the color changes, there is no
perceivable difference between moving along with the body at any speed
and being stationary in that body. The wide aspect ratio of this expect

[Testing Time dilation and propagation
delays](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed-Clocks.html)
– This demonstration was to challenge an [entrance exam
question](#appendix-e-exam-question) for college. I further implemented
various clocks to test time contraction.

[Interferometer
demonstration](https://d3x0r.github.io/STFRPhysics/math/indexInterferometer4.html),
I implemented various versions of an interferometer which used light
aberration, and length contraction, and this final version allows
choosing an arbitrary angle, to show the identical lengths of each path
of light takes, demonstrating the expected null result. This version has
a ‘4’ at the end of its link, there is also (no number), 2 and 3
versions; 3 is almost like 4, but for also includes multiple photons
emitted at the nodes of a specified wavelength and assisted in deriving
the doppler shift equation.

## Consequences

Several consequences of a one-way speed of light are immediately
obvious.

1.  For all clocks to behave the same in all frames, acceleration due to
    a specific force is no longer constant. Instead, the velocity
    imparted due to a specific acceleration must be scaled depending on
    the direction of the force relative to the velocity of the frame it
    is in. An acceleration applied backward must be scaled by
    $A\frac{C}{(C - V)}$ and applied forward must be scaled by
    $A\frac{C}{(C + V)}$; or more generally an acceleration applied in a
    direction θ is $A\frac{C}{C + cos(\theta)V}$ (approximately). I
    don’t know if the acceleration itself just ends up scaled or if it’s
    just effectively different than it would seem. Here are a few clock
    ideas for 0G clocks like an hourglass in a centrifuge, a machine
    that launches marbles in various directions until they hit a
    detector, similarly a turntable with marbles in a cage, that the
    cage drops launching the ball centrifugally. (With a spring-plunger
    mechanism, with a magnetic field, etc. In the case of the magnetic
    field, then it behaves like photons, and the ball in one direction
    would see more flux from the field in one direction that some other
    direction, which would mean the force was actually changed, rather
    than just resulting in a different momentum).
2.  The one-way velocity of light is not constant, and adding the
    velocity of the two directions is not a constant, but what is
    constant is the amount of time it takes light to cover a certain
    distance two-ways. The time can be expressed as A + B = 2C (C here
    is just a variable, not the speed of light constant). A distance
    divided by a time is a velocity, but it’s not the velocity of light
    in either direction.
3.  The experience of travelling at a velocity ends up meaning that for
    a given velocity V, with the time factor scaled by the time
    contraction of $\sqrt{C^{2} - V^{2}}$, means that at 0.707c, that
    the frame ‘feels like’ it is travelling at 1c. It travels 1 light
    second in what feels like 1 second in the frame. If the ship emitted
    a signal every second, a pulse would be seen by external observers
    every 1 light second, but there would be more than 1 second between
    pulses (ignoring light propagation time). At 0.861 the ship would
    emit a pulse every 2 light seconds every second... a ship would feel
    like it was going many times the speed of light before it reached
    the speed of light. (this could probably be expanded). (This idea
    has been criticized as not making any sense since nothing can go
    faster than the speed of light - but it's not faster than light, it
    just 'feels like' it's going faster than the speed of light.)
4.  The universe doesn't contract when a body is moving through it - a
    stationary object that is bounded by say 2 walls that emit a signal
    that is its local time, will always be seen as 2 light seconds apart
    (other than effects from light aberration).
5.  An observer that is traveling with a body at some speed will always
    see that body in perspective as the same as when it was stationary.
    The length contraction and light aberration causes the various
    observed positions to look, in perspective (as in 3D graphics
    perspective, or as light is projected on the retina as a 2D surface)
    to be the same.... the light from the back of the craft takes a
    longer time to reach the observer, and intuitively it would seem
    like it would come from further away, but the light aberration from
    the back widens out the perceived distance, and results after a
    perspective correction as the same perspective as being stationary.
    Similarly light from the front of the craft would arrive sooner, and
    the front wall should appear closer to the viewer, but light
    aberration contracts the width of it, and ends up looking in
    perspective exactly as it did when the frame was stationary. If
    there was a perceivable cycling signal of lights say going
    red-green-blue-red-etc, then the light that is closest to 'now'
    would come from further in front of the observer, and the back would
    lag behind; but within reasonable limits, (since we don't build
    space craft that are 300,000km long), there is no notable
    difference.
6.  As mentioned before, light aberration takes place on transmission
    too - this is somewhat like a transfer of inertia to the emitted
    light. If this aberration did not take place, then a laser light
    shining across a craft moving at some speed would drift down the
    wall when not under acceleration, but at increased speeds; this
    doesn't happen. That means the light from the laser when it leaves
    the last bit of the lens medium and enters free space, will have
    been aberrated by some angle such that it will cross the craft at
    exactly 90 degrees; similarly if there is a reflective surface like
    a mirror, the mirror will aberrate the light it receives, and appear
    to have received the light from directly across, instead of an angle
    lagged behind, and on reflection, will aberrate the light further
    forward. This is part of the reason that interferometers like LIGO
    or Michelson-Morley experiment don't detect any drag on the light.
    The other part that plays a part is length contraction. Between the
    two effects, the time light travels between splitters, and mirrors
    is the same in any direction; but depending on the direction of the
    device may take a longer or shorter time, but the time along each
    path the light takes will still be the same, and the light will come
    back in phase with itself and interfere as expected.
7.  The Lorentz Transform is incomplete; and is truly only valid
    considering bodies that are 0 distance from each other, or at best
    an insignificant fraction of a light-second. I tried several times
    to bias a space-time graph to the Lorentz Transform space-time
    graph, but it truly only aligns at T&gt;0 and X&gt;0 if V&gt;0 or
    X&lt;0 if V&lt;0; there is an asymmetry that is induced when you
    consider the propagation delay. A ship that is travelling towards an
    observer is elongated, even factoring in the length contraction,
    it’s still seen as longer; while a ship that is moving away from an
    observer is contracted, even more than the length contraction
    applies.
8.  General Relativity – A side project included applying the Einstein
    Field equations to space, and performing the curvature directly,
    without a factor of time; more information in [Appendix
    G](#appendix-g-gr-hypothesis)

