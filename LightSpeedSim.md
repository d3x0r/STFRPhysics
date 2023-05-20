(math renders properly [github version](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedSim.md))

# Reality of Relativity

I started this project ([step-by-step](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedSim.md#Step-by-Step)) to observe first what it would look like to see something going faster than the speed of light (faster than the speed of sound, faster than waves in water...).  
I didn't concern myself so much with practical limitations like clocks would tick backwards at faster than the speed of light (clocks that are seen).  I've later refined portions of this to include light aberration, length contraction, and time dilation (special relativity).

## Demos

[Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed.html) This started with a brute force method of calculating apparent relative position of objects moving at some speed>0. The body emits Red at its head, Green at its center and Blue at its tail.  The emissions then go towards an observer; until they pass the observer, the apparent position is indicated on the reference line; once observed, the line and related photon circle disappear.  This has been updated to test a function to reverse calculate, and show a computed observed position(dicussed under 'The Math').

![Screenshot](https://github.com/d3x0r/STFRPhysics/raw/master/math/lightSpeed1.jpg)

Sliders allow adjusting `C` or the speed of light, the time scale (run faster/slower), the distance of the observer from the line of the path being observed, velocity of the body moving along a line, Half-Length of the body (a length of 1 is 2, and is center (0) +L and -L); and the run-time... or how far into the past/future the time extends.

The 0 time event is centered on the line (sort of like x=0), and the simulation starts at -1/2 Run time; or -5 seconds with the default settings.  The default has the velocity at 2 times the speed of light, so for the first 5 seconds, you don't actually see anything, then you see an image of the ship continuing forward, and reverting backward to its source, as the ship passes you.  The reversed image might appear to have a velocity greater than the speed of light(although the faster the ship goes, the slower the reverse image goes, and only near slightly faster than the speed of light does the image go very fast), but the image of it having passed you does not travel faster than the speed of light.

Colors are standardized so T=0 is green, and T=-1 is red, T=1 is blue; the overall progression is then red to green to blue to red...
|T|  hue| 
|---|---|
| -1 | red |
| 0 | green |
|1 | blue |
| 2 | red | 
| 3 | green |

### List of Demos

- [First Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed1.html) : fast moving body, stationary observer
- [First Demo - Speed Limited](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed1.html) : fast moving body, stationary observer; velocity is always a fraction of C.
- [Second Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed2a.html) : fast moving observer, stationary body
- [Third Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3.html) : fast moving body, with a stationary observer on the body (offset can chance)
- [Fourth Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4.html) : fast moving body, stationary observer on the body, the direction of the velocity that space is moving around the body is added.
- [Fifth 2D Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html) : Two independent spaces moving relative to each other that can observe each other.  Each has their own velocity, which then gives a relative velocity between the bodies.
- [Wheel Spinning - on ground](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4-wheel.html) This demonstration shows a spinning wheel with some spokes, it is rolling along the ground with one side stationary and the other moving.  This is set as if the axle passes at the position of the viewer.  Have to adjust the distance by -1 to be at the edge of the wheel.  (This does take a little time for the object to show up from the left side of the screen).
- [Wheel Spinning - stationary](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4-wheel2.html) This demonstration shows a spinning wheel, but not moving laterally.  This lets you look at the wheel with just a distance between you and the axle.
- [3D Perspective test](https://d3x0r.github.io/Voxelarium.js/index2-dual-view.html)This is a modified [Voxelarium](https://github.com/d3x0r/Voxelarium.js)voxel world with relatistic corrections applied.  When the speed of the observer and the speed of the observed is the same, the world is very square in perspective.  This shows a orthographic camera (on the left) which shows the real transformations applied to the surface and a perspective camera(on the right) which shows the world from the observers viewpoint; and completes the transformation to be square. ([More info...](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedSim.md#3d-voxel-world-with-perspective-camera))
- [3D Shape test](https://d3x0r.github.io/IsoSurface-MultiTexture/index-blackvoxel-lorentz.html)Used the [marching tetrahedra](https://github.com/d3x0r/IsoSurface-MultiTexture) framework to show a shape with an observer in the center, being able to apply an offset to that observer, but use the orbit camera (with a perspective matrix) to show what the observer sees, but not from the observer's perspective.  
- [Relative Clock test](http://d3x0r.github.io/STFRPhysics/math/indexLightSpeed-Clocks.html).  This shows how various times are seen by various observers.  It also includes a demonstration of [this exam question](#lorentz-problem).  Also has some wavelength calculations - to demonstrate identitcal wave count in 2-way perceptions.  [Usage manual](lightspeedclocks.md) (instructions on use and explanation of various indicators.)

## Conventions

There are places I use an expression like $CC$ which is the same as $C*C$ or $C^2$.  Variables used in the math expressions are a single letter, unless they have a subscript.  One reason might be that it's fewer characters, but more often it's harder to see superscript in inline equations.

## Disclaimer

This is a non-Lorentz Transform(augmented? extended?), and at times I will attempt to regress/address the Lorentz Transform(LT), this is a more general solution, and there is an intersection with the domain of LT.

If you're expectation is that this will be exactly the same, it's not.  However, time in the future (after now), and positive relative velocities works out to be the same as Lorentz Transform (also with a small fraction of the speed of siganl propagation).

## Differences in Terminology

The end result requires different terms to describe than were previously established with the Lortenz Transform and General or Special Relativity.

 - Time contraction : This is the reciprocal of 'Time dilation', and refers to how much a moving clock slows down; how much less time ticks per real-tick.  Given that observers are able to observe their own velocity, they can also adjust their clock appropriately knowing that this happens.
 - Length Expansion : there is an asymmetry in the observed shape of a moving body.  Before passing an observer the length of the body appears to be extended/expanded.  The length of the body is effectively lengthened; for example, if the back of a ship is 1 light second behind an observer on the ship, then at a high velocity, the back of the ship would appear (from LT only) N light-seconds long, and the light will take N seconds to get to you(on a non-contracted clock), and be the speed of light.  N will be a value greater than 1.  The length expansion is often further dilated by Light Aberration, which makes a very distant back of thte ship still seem to be where it always was in perspective.

## The Math


This model is generally built using light's frame as the reference frame; in one sense, it's the frame of absolute motion, so it isn't a rest frame; but, when a light event is emitted it can be modeled as a point source, which at any point in time T has a probability of being at some equidistance from a stationary point; and the location of that point is relative to the space-medium transporting the light, but essentially exists in a rest frame(that is to address that distant galaxies 'moving away from us at the speed of light' are themselves in a space that isn't moving away from their photon emissions; that and gravitational displacements of space can cause the space to not be where it should otherwise be; [more on this here](math/TheNotBang.md)).  The network of all light events that have been emitted, with their specific time and location, is really the framework from which all observations are calculated; since the only constant is that light travels at a certain speed from a point to any observer.

The math starts with an equation that has minimal degrees of freedom; later, a more general approach that moves two spaces relative to each other is given later.  It is essentially 1D, but has a perpendicular component that doesn't fully define a 2D plane, so is sort of 1.5D.  The perpendicular distance from a line is a dimension outside of the body with a velocity.

In the demos, observable body has 3 parts, the tail, the center and thead head; the tail follows the head, and the head is in the direction of the velocity.  Each part emits a signal at the position it is, and that signal's time to the observer is recorded.  At each frame, the time is compared to when the signal should be seen by the observer, and the frame with a time nearest to the current time is used to show where the body was seen. The expected time is used to span the computed line from a part on the body with a marker.  All frames were precomputed beforehand.   After observing what the calculation was, the inverse calculation was obtained.  This calculation can be used to figure out where the body part that emitted a signal was located when it was finally seen.

At some time $T$, a body to observe is at a position $VT$; the extents of the body of a given length are at $(VT+L)$ for the head and $(VT-L)$ for the tail. A relatively stationary observer exists, at some $D$ distance from the body (this is the closest distance to the line defined by $VT$; the distance is perpendicular to the velocity)
; then $D_o = \sqrt{D^2+(VT+L)^2}$ is the distance a photon has to travel
to the observer.  The relative distance divided by the speed of light is how long that signal will travel to the observer (delta time to be observed).  $\Delta T_o = \frac {\sqrt{D^2+(VT+L)^2}} {C}$ is the time it takes (the C can be factored into the expression as $C^2$).  (Special case $D=0$, $L=0$, $\Delta {T_o} = \frac{\sqrt {V^2T^2}}{C}$~~, which Lorentz simplified to $T_o=VT/C$, and this latter formula yields the wrong results~~; a more suitable version would be ${\Delta T_o}=\frac {|VT|} C$).

Observed time of (some position along body L) ( head(+L), center(+0), tail(-L)), including the $T$ime that the event happened, then $T_o=\Delta T_o + T$ is the real time the event is seen.

### Equations

(equation 1) 
$$T_O = \frac {\sqrt{{D}^{2}+\left({VT+L}\right)^{2}}} C+T$$
-or- $$T_O = \sqrt{\left( \frac D C \right)^{2}+\left({{\frac V C }T+{\frac L C}}\right)^{2}}+T$$

The above is real time that an observer sees an event emitted at at time $T$ from a position on the body. Then the above can be solved for $T$ such that at some time an observer saw an event ($T_o$), can find the time the event was emitted ($T$).  I asked Wolfram Alpha(WA)f to solve this... `solve for T  x=sqrt( D^2+(VT+L)^2)/C+T` (I had to use 'x' instead of 'T_o').  I got impatient and solved this by hand here: [long hand solution.](LightSpeedNotes.md#15d-step-by-step-derivation)

$$T = \frac{\sqrt{C^{2}D^{2}+C^{2}L^{2}+2C^{2}LV{x}+V^{2}\left(\ C^{2}{x}^{2}-D^{2}\right)}+C^{2}{x}+LV}{C^{2}-V^{2}}$$

(slight refactor into partial expressions, revert 'x' to 'T_o')

$$ A=D^2+(L+VT_o)^2  $$

$$T = \frac{\sqrt{C^{2}(A) -V^{2}D^{2}}+C^{2}{T_o}+LV}{C^{2}-V^{2}}$$

[Skip to usage...](#convert-a-time-to-position)

The above returns the real time from an observers time $T_O$, and an offset along the body ($L$) and some distance (D) from the line defined by the velocity over time.  The resulting time times velocity and then add the offset gives the real position of the body seen.  The above reverse equation has a singularity when `C` equals `V`; so this equation is used instead:

### Special case to approach Lorentz Transform

Setting $D=0$, $L=0$, and replace the sqrt  with absolute value. The resulting gamma factor in this result is only for what is seen, and is not the gamma for length or time contraction.
$$T = \frac{ {C|{{V}{T_o}}| }+C^{2}{T_o}}{C^{2}-V^{2}}$$


#### Special case V=C

In the special case that $V=C$, then $V/C = 1$, so equation 1(above) simplifies to this... the T under the square root has the coefficient $\frac V C$ which $=1$.

$$T_O = \sqrt{\frac{D^2}{C^2}+\left(T+\frac{L}{C}\right)^{2}}+T$$

And the inverse when (V=C) is this; which has a singullarity when C=0; which is irrelavent, if events don't propagate than they never go anywhere.  When `T_O=-L/C`; that the time the ship if first 'seen'; and is the oldest signal from the ship first; each closer signal has slightly more slope to get to the observer.  ( `solve S=sqrt(D^2 / C^2 +(T+ L/C)^2)+T  for T` , 'T_o' is replaced with 'S')

$$T = \frac {C^2 {T_O}^2 -  D^2 - L^2} {2 C (C {T_O} + L)}$$

(or -V=C)
$$T = \frac {C^2 {T_O}^2 -  D^2 - L^2} {2 C (C {T_O} - L)}$$


or (when D=0, L=0); which should simplify to $T=\frac {T_o} 2$, but this seems wrong; at seen -10 real time is -5, which is in the future.   This expression should be split, if T_o < 0, and positive velocity, then any time T is seen at +T from there, and the difference is 0.   If T_o > 0 and positive velocity, then the craft appears to be going away at 1/2 the speed of light.  If the sign of the velocity is the other direction, the conditions are reversed.

$$VT_o<0 : T=T_o $$

$$VT_o>0 : T=\frac {T_o} 2 $$


- https://mathb.in/74833
- https://mathb.in/74928 
- https://mathb.in/75151 (updated; fixed A/2B at V=C)

### The Lorentz Case

Simplified, and this is again will still have a sqrt, which has to be at least an absolute value on the distance from the observer. (D=0, L=0) $$T_{real}\left(T\right)={\sqrt{(T)^2}+T}$$ 
or
$$T_{real2}\left(T\right)=\left|T\right|+T$$

### Convert a Time to Position
Once you have the real time, the real observed position is $X=(L+VT)$. 


$$X = L+V\left(\frac{\sqrt{C^{2}(D^2+(L+VT_o)^2) -V^{2}D^{2}}+C^{2}{T_o}+LV}{C^{2}-V^{2}}\right)$$


### That was the simple case

At this point, you have most of the position offset from time-delayed signals received from an emitter (observable) to a detector(observer). 

The above assumes the observer is stationary, at a fixed position, with some distance between them and an object travelling along a line at a Velocity.  

[Skip to 3D math](#generalized-to-3d-vectors)

### Length Contraction Applied

After computing what length contraction should be for a body, it was applied to several 2D demos.  This scales any $L$ offset on the body towards 0.

$$\alpha = \frac {\sqrt{CC-VV}}{C}$$

$$T_O = \frac {\sqrt{{D}^{2}+\left({VT+\alpha L}\right)^{2}}} C+T$$

$$T = \frac {C^2 {T_O}^2 -  D^2 - ((\alpha L)^2} {2 C (C {T_O} + \alpha L)}$$

$$Position(T_o,L) = \alpha L+VT$$



## Generalized to 3D Vectors

$\vec V=(D,E,F)$ and $\vec{V_o}=(J,K,L)$ are velocity vectors; $T$ is the time an event was emitted, and $T_o$ is the observed time, $S$ is the delta time between $T$ and $T_o$.  $(X,Y,Z)$ or $\vec X$ is the difference between the position being seen, and the position it is being seen from; basically 'I'm looking at this point that is $(X,Y,Z)$ from me.'  $\vec X+ \vec V T$ is the position that an event is emitted, at time $T$. $(J,K,L){T_o}$ or $\vec {V_o}T_o$ is the distance the observer moves while the signal is in flight plus the time the observer moved before the event was emitted $T_o=\Delta {T_o} + T$ ; it should be removed from the position the event is observed from.  $(\vec X + \vec V T)-  (\vec 0+ \vec {V_o} {T_o})$ divided by the speed of light $C$, is the time it takes to see something.  ($S=T_o$ because subscript variables don't work well on Wolfram Alpha(WA))

$S = \frac { || {(X, Y, Z) + (D, E, F) T - (J, K, L) (S)} || } {C} + T$; solve for S and for T (ask WA to solve for...).

(equation 2) the above long expression expressed as vectors
$$S = \frac { \lVert {\vec{X}-\vec{X_o} + \vec{V} T - \vec{V_o} S} \rVert } {C} + T$$
solved for T; raw result copied from WA.
$$T = \frac {\sqrt{(-2 C^2 S - 2 D J S - 2 D X - 2 E K S - 2 E Y - 2 F L S - 2 F Z + 4 J^2 S + 4 J X + 4 K^2 S + 4 K Y + 4 L^2 S + 4 L Z)^2 - 4 (C^2 - D^2 + 4 D J - E^2 + 4 E K - F^2 + 4 F L - 4 J^2 - 4 K^2 - 4 L^2) (C^2 S^2 - J^2 S^2 - 2 J S X - K^2 S^2 - 2 K S Y - L^2 S^2 - 2 L S Z - X^2 - Y^2 - Z^2)} + 2 C^2 S + 2 D J S + 2 D X + 2 E K S + 2 E Y + 2 F L S + 2 F Z - 4 J^2 S - 4 J X - 4 K^2 S - 4 K Y - 4 L^2 S - 4 L Z} {2 (C^2 - D^2 + 4 D J - E^2 + 4 E K - F^2 + 4 F L - 4 J^2 - 4 K^2 - 4 L^2)}$$

The simplest refactor removes a 2 from numerator and denominator... 

$$S = \frac {\sqrt{(-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) (C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)} + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$$

$$T = \frac {\sqrt{(-C^2 S + D J S + E K S + F L S - D X - E Y - F Z)^2 - (C^2 - D^2 - E^2 - F^2) (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)} + C^2 S - D J S - E K S - F L S + D X + E Y + F Z}{C^2 - D^2 - E^2 - F^2}$$

Refatoring the above is left as an excersize for the reader.  It's several expressions that are squared; pairing up the factors one can find the relations.  (It became easier to just express with the vectors below)

For a more general 3D case, with Y aligned with direction of D to path; Z aligned perpendicular to the line, and X aligned with the original L direction on the line.

Implemented as a 3D graph here for X/Y plane, shows T seen as Z.  https://geogebra.org/3d/ckphajff

---
Another refactor of equation 2

$$T
_o = \frac { \lVert ({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {T_o})} \rVert } {C} + T$$

---
Solved for T (ask Wolfram Alpha to solve for T; although it doesn't work in vectors, and this is really just a refactor of the above Wolfram alpha result into vectors): $\vec a$, $A$, $B$, $D$ are partial expressions, to find $T=$. [Long hand 3D solution here.](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedNotes.md#3d-math-solution),  [Slightly shorter version](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedNotes.md#alternate-3d-math-solution).

$$\vec{a}=(\vec{X}-\vec{X_o})-\vec{V_o}T_o $$
$$A = C^2{T_o}^2 - \vec{a}\cdot\vec{a}$$
$$B = C^2{T_o} + \vec{V}\cdot\vec{a}$$
$$D = C^2-\vec{V}\cdot\vec{V}$$

if( D (is near) 0 ) $T = \frac A {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$


#### Single Line Expression

$\vec{a}=(\vec{X}-\vec{X_o})-\vec{V_o}T_o$ ; $A = C^2{T_o}^2 - \vec{a}\cdot\vec{a}$ ; $B = C^2{T_o} + \vec{V}\cdot\vec{a}$ ; $D = C^2-\vec{V}\cdot\vec{V}$ ; if $||\vec V||=C$ then $T=\frac {A} {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$

#### Special case for V=C

In the case that the velocity is the same as $C$, then a version of (equation 2) replaces $C$ with $\vec V$. Having a more complex denominator prevents solving into a form with a constant 0 in the denominator.

$S = \frac { || {(X, Y, Z) + (D, E, F) T - (J, K, L) (S)} || } {(D,E,F)} + T$ or $S = \frac { || {\vec{X} + \vec{V} T - \vec{V_o} S} || } {||\vec{V}||} + T$; solve for S and for T (ask WA to solve for...). [Vector Solution for V=C.](https://github.com/d3x0r/STFRPhysics/blob/master/LightSpeedNotes.md#3d-solution-when-vc)

This is a copy of the full solved expression.
$$T = \frac { (-C^2 S^2 + J^2 S^2 - 2 J S X + K^2 S^2 - 2 K S Y + L^2 S^2 - 2 L S Z + X^2 + Y^2 + Z^2) } {2 (C^2 (-S) + (C D J S)/\sqrt{(D^2 + E^2 + F^2)} + (C E K S)/\sqrt{(D^2 + E^2 + F^2)} + (C F L S)/\sqrt{(D^2 + E^2 + F^2)} - (C D X)/\sqrt{(D^2 + E^2 + F^2)} - (C E Y)/\sqrt{(D^2 + E^2 + F^2)} - (C F Z)/\sqrt{(D^2 + E^2 + F^2)})}$$

This is refactored into vector components.
$$\vec a=(\vec X - \vec{X_o})- \vec{V_o} {T_o}$$ $$T= \frac {(\vec a \cdot \vec a) -C^2{T_o}^2} {2*( \frac { (\vec {V_o} {T_o} -\vec X) \cdot \vec {V} C  } { ||\vec V|| } -{T_o}C^2)}$$
The above solution works when $||\vec V||=C$.  Otherwise the normal form can be used; When greater than C, the negative square root should be considered as a possible answer.   (This are events that haven't reached you yet, but will, and happen after the observed body passes you; the relative speed of these events may exceed the speed of light).


---
### Including self velocity to make 3 body

Consider modifying the above to be a full 3 body problem, where the relative velocities specified are relative to a third body, similarly their positions are relative to the third body's position.  In computer games, this would mean they are like boxes on the deck of a ship, or shapes hanging from a hanging mobile.  The original bodies are defined by $(\vec{V_1},\vec {X_1})=(\vec {V},\vec{X})$, $(\vec{V_2},\vec{X_2})=(\vec {V_o},\vec {X_o})$, the additonal body is $(\vec {V_0},{\vec {X_0}})$.  Note, these subscripts are numeric.

$$T_2-T_1= \frac { \lVert ((\vec{X_1}-\vec{X_0})+ (\vec{V_1}+ \vec{V_0}) {T_1} )-((\vec{X_2}-\vec{X_0}) + (\vec{V_2}+ \vec{V_0}) ({T_2}))  \rVert } {C} $$

The third body $(X_0,V_0)$ with a velocity itself biases the other two bodies additively.  The position might add or subtract, either way the $X_0$ factor disappears, since it won't matter to the other two bodies where the third body is.  Because their velocity is also relative to the third's velocity, that should be accounted for when computing the total velocity.

$T_2$ includes $T_1$; and is the sum of $T+T_o$ where or $T_o=T_2-T_1$ is the time it takes between emission and detection.  So expanding this...

$$T_2-T_1 = \frac { \lVert ((\vec{X_2}-\vec{X_1})  + (\vec{V_1}+ \vec{V_0}) {T_1} - (\vec{V_2}+ \vec{V_0}) {T_2} \rVert } {C} $$

It could be refactored to compute just the delta, and internally use $T_1+T_2$ as the total time the observer moved.
$$T_2 = \frac { \lVert ((\vec{X_2}-\vec{X_1})  + (\vec{V_1}+ \vec{V_0}) {T_1} - (\vec{V_2}+ \vec{V_0}) ({T_1}+{T_2}) \rVert } {C} $$

 $V_0T_1$ disappears, so the general offset of the event from the speed doesn't matter.  But a $V_0T_2$ term remains.
$$T_2 = \frac { \lVert ((\vec{X_2}-\vec{X_1})  + \vec{V_1} {T_1} - \vec{V_2} ({T_1}+{T_2}) +\vec{V_0}{T_2}\rVert } {C} $$

The original solve can still be used, with the velocity terms substituted ($V=V_1-V_0$) and ($V_o=V_2-V_0$); the above expression is just an interested note.  I was refactoring to see if $V_0$ was actually a relevant factor, or if, like $X_0$, it disappears.   It does remain as an additional distance(delay) between $T_1$ and $T_2$.


### Double check on right first equation

It came to be that I was pondering why the equation was $-V_oS$ ; that change is position of the observer reduces the length, while  It might be reasonable to think about $X+VT$ as the position an event happens and $X_o+V_oT$ where the observer was at that time, and subtract those; then $+V_o(T_o-T)$ is an additional distance the observer moved from the time it happened; but that's really relative to the origin of the frame, and should be subtracted.  It is really $T_o= \sqrt{ ( (X+VT) -(X_o+{V_o}T+{V_o}{(T_o}-T))^2}+T$; $||\vec x||=\sqrt {\vec{x}\cdot\vec{x}}= \sqrt{x^2}$, or assuming 1D: $T_o=  |(X+VT) -(X_o+{V_o}T+{V_o}{(T_o}-T))|+T$ which makes the last term just a subtraction.

$T=T_1$
$T_2 = T_o-T$
$T_o = T_2+T$
$T_1 = T$

$$T_2 = \frac { \lVert{ (\vec{X_1} + \vec{V_1} T_1) - (\vec{X_2}+ \vec{V_2} ({T_1}+{T_2} ))  }\rVert } {C}$$
replacing $T_2$ and $T_1$ with  $T_o$ , and  $T$...
$$T_o-T = \frac { \lVert{ (\vec{X_1}-\vec{X_2}) + \vec{V_1} {T}  + \vec{V_2} (T+T_o-T) }\rVert } {C}$$
or
$$T_o-T = \frac { \lVert{ (\vec{X_1}-\vec{X_2}) + \vec{V_1} {T}  - \vec{V_2} T_o ) }\rVert } {C}$$
## Light Aberration
This is a phenomenon that applies when an observer is moving.  The observed angle of a signal is advanced an amount according to the observer's velocity, around the velocity vector.

[Desmos playground](https://www.desmos.com/calculator/0tqxxfzsgp) (Initial tests)
[Implemented from](https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)/11%3A_Photographic_Astrometry/11.03%3A_Refinements_and_Corrections/11.3.04%3A_Aberration_of_Light#:~:text=ccos%CF%87%E2%80%B2%3Dccos,is%20%E2%88%92csin%CF%87%E2%80%B2) (Some random link that described the math)

Demo: https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html

Added light aberration correction.  It's a toggle, but enabled to start.  It's a correction factor for the change in incidence angle when photons hit a moving body.

In the example source there is an 'aberration' function.  It takes 'where you something was that you can see(detect)', 'your speed', and 'where you were when you saw(detected) it', uses the dot product of the velocity and the difference in positions (their distance) to find the angle of incidence, and applies the light aberration correction to the angle, and re-projects the value with the angle of the `( velocity + corrected angle ) * distance`. 

and something like (equation 3) $f\left(x\right)=\arccos \left(\frac{\left(C\cos\left(x\right)+V\right)}{\left(C+V\cos\left(x\right)\right)}\right)$  (from desmos link above).  

### Details of implementation
The dot product of a position relative to an observer and the velocity gives the cosine of base angle of the observed signal; dividing by the length of velocity and distance to point leaves the `cos(x)` factor.  Then it is computed at a new position using the light aberration formula above (equation 3). 

$V= ||\vec V||$; $\cos(x)= \frac {\vec X \cdot \vec V} {||\vec X|| * ||\vec V||}$; $\theta = x = \arccos( \frac {\vec X \cdot \vec V} {||\vec X|| * ||\vec V||})$

$$f(\vec X,\vec V)=\frac {C \frac {\vec X \cdot \vec V} {||\vec X|| * ||\vec V||} +||\vec V||} {C + \frac {\vec X \cdot \vec V} {||\vec X||}}$$

rotation axis = $\frac {\vec X \times \vec V} {||\vec X|| * ||\vec V||}$; rotation angle =  $\theta -\arccos \left(f(\vec X, \vec V)\right)$

`observedPosition = new lnQuat( rotationAngle, rotationAxis ).apply( `$\vec X$ `)`

The new angle may be used with the cross product of the position with the velocity, which, when normalized, gives the axis of rotation for the point, and the resulting angle minus the base angle is the angle of rotation.

The Light Aberration formula above only changes angle, not distance.

### 2D aberration

$\theta = \arccos({\frac d {\sqrt{xx+dd}}})$
$f(x)= arccos( \frac {C*{\frac d {\sqrt{xx+dd}}} + |V| } {C+|V| {\frac d {\sqrt{xx+dd}}}} )$

### Examples Including Aberration

This is two bodies travelling at 0.62c.  The purple/red line through the vertical center is directly across from them, that they would see each other; This means that a light clock would bounce the photon apparently back and forth, but really be receiving it ahead of itself, and projecting ahead of itself.  (These screen shots do not include Length Contraction)

![](https://github.com/d3x0r/STFRPhysics/raw/master/aberration.png)

Without aberation, the things directly to the side of you actually appear somewhat to the back, and would have a longer distance, in the above image, the aberration doesn't bring what's lateral exacty to 1, but it's slightly longer, which makes it take slightly longer to cover that distance.  So rods that are lateral to a body do appear longer. (But then any plane attached to that cylinder is still at that distance) (These screen shots do not include Length Contraction)
![](https://github.com/d3x0r/STFRPhysics/raw/master/aberration-disable.png)

#### My Hypothetical

A classic view might say that a photon is a wave, that has some length in the direction of its emission.  When the photon first hits the detector in a location, that sort of grabs the photon's foot, and drags it forward as the rest of the photon is subsequently emitted, then the detector moves a right-triangle amount forward in the amount of time the rest of the wavelength of the light hits the detector.   This causes a deflection towards the front; or that it will subsequently be picked up by a sensor from a direction that is further forward... 

The resulting vector IS back-tipped, which in a logical sense might seem that 'well then the wave should appear to be coming from behind, since that's the natural direction overall of the wave'; but this isn't that.  It is that the photon had an angle to hit a lense in a certain spot, and then was skewed toward the front; while the photon that started in the backward sense would have struck the lense in a different angle to start with.  It's all actually quite classical, and a sensor that read waves from other boats might do the same thing.  

### Fixed Lorentz plus Light Aberration

When Light Aberration is also included, often, the path of the object seen and the Lorentz single relative velocity (shown in purple above), actually tracks with the body being observed.  (More so when observed with a perspetive transform as in a common perspective matrix used for 3D graphics).

When both a offset translation, and a rotation of the velocity vector for one of the bodies occurs, then there are jogs in the path.

https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html

Lock Velocity, Show Velocities, change the first direction slider to $0.5\pi$.  towards the end of the animation, the body was following the lorentz path, but then jogs off of the path.  (this is hard to show with a static image).

That is to say - it actually covers itself it you assume that it is both Light Aberration AND the Lorentz Transform, but applying both will give a double skew to the system; and really the math that resembles reality should just be used. 

It could be said that the existing Lorentz Transform encapsulates both, but there are still cases where this isn't true


## 3D Voxel world with perspective camera

I wanted to see if maybe the distortion above would behave differently with perspective.  But in the above cases of a 2D plane, `(x,y)/sqrt(xx+yy)` is just a circle... it normalizes the coordinate to a unit circle; but then that's what open GL does for 3D right?

https://d3x0r.github.io/Voxelarium.js/index2-dual-view.html

![Screen shot of above demo](https://github.com/d3x0r/STFRPhysics/raw/master/Voxel-relativity.png)

The left is an orthographic camera, that shows the displaced pixels that are warped as in the 2D case, and basically is looking at the scene as if it were 2D.  The right camera is from the same camera point of view, same position, same orientation, but with a perspetive camera matrix applied instead.  When the velocities of the observer and observed are the same, the result in a very square projection.  There is an (optional) length contraction applied before either the extended lorentz function or light aberration is applied, which makes the result appear more square when changing velocities.  [More on this later](#length-and-time-contraction).

Without the length contraction, there is a general elongation that happens, the aberration pushes things very far forward, and the Lorentz Transform pushes them very far backward.  Unlocking the velocities can show these two effects and how they transform the world - so that at the same speed, in perspective, a warped surface looks square; that was not a goal of this, when when I started above, with the hypothesis of perspective, I didn't expect it to be the thing that squared up an observer riding in a ship at the speed of light, such that the ship still looks the same and square.


## Alcubierre Drive and FTL
Given that we want to curve space, and take a portion of space with us, such that we're not actually going the speed of light, the laws of relativy apply more to that still frame than the frame where the rest of your space is relative to all other space.

Doesn't that make space sort of an Aether or medium?  the fields that QFT operates in, related within a region? 

A light signal crossing the boundary between the spaces is going to be where most of the transform is, but if done right, light from space not within the bubble just go around the bubble - but take a slightly longer time than one would expect.

(Skinwalker Ranch S04E02, had a lidar measuring device around an area they are investigating.  It got readings as if there was a cloaked ship - something with space folded around it - such that they registered a return time longer than it should have been - it wasn't that the dots hit something early, there was just a huge skew in the data around a region.  I would have wanted to immediately gone back and move the lidar to see if the shadow moved... where its boundary was.  But it's early in the season, and this is from like a year ago realtime... so maybe there's hope? )

However, On pondering this, if that space is now 'stationary' then your previous velocity would ... a) come to an abrupt stop b) your space is a subset of real space and flows around you as if you were going that speed, and then it wouldn't be a very good bubble - maybe good for accelerations...  c) what if you have to get to a place where you are stationary, then warp the space, and then go around with the space.   Unless d) there IS an Aether drag around the earth that keeps relative space moving with the masses in it... then your bit of space you're dragging with you would make everything seem locally different than everything else... which isn't the case; there's still velocity-drag on anything that isn't the observer; there's still a light aberration because the observer is moving with the thing... which is why it still appears square.

(side-side note: I'm thinking for story purposes I'll chose 'must get to a relatively stationary velocity', and when you drop out of warped space, you will have to catch up to whatever you're going after.)  But then I'm also not sure about the re-integration of that space with 'flat space' (universe-space?) ) This doesn't really align with observations of UFO's though - but maybe they come close in that warped space, and don't actually drop out of warp?  But then if they've landed, and take off again, how to accelerate so very fast away?  Maybe just wait until the right time, and let the planet go away as you drop into stationary space?)



#### Length Contraction to the rescue?

Without length contraction, then parallel to the velocity is the longest 2-way time; velocity along the perpendicular is the shortest 2-way time.  The velocity direction defines what is 'front' and 'back', any other perpendicular direction is 'lateral'.  The side you look at in the direction of the velocity is 'front', while the side you look at in a direction opposing the velocity is 'back'.

So, for the worst case time, take 1 light-second $(1s\cdot C)$ with units(m-s/s), and divide by the speed from the back to the front, which is $C-V$.  The signal propagates to the front at the speed of light (C), but the front moves away, which makes that relative speed $C-V$.  $\frac C {C-V}$ (which has units m-s-s/m-s) seconds is then how long the signal takes to go from the back to the front.

The best case time, using the same 1 light-second, has a relative speed of $C+V$, while the signal propagates at the speed of light (C), the back also catches up with the signal, making the effective relative speed $C+V$.  $\frac C{C+V}$ is how many seconds it takes for the back to see the front.  

A) Adding the worse and best case times $\frac C {C-V} + \frac C {C+V} = \frac {2CC} {CC-VV}$.  If the distance is multiplied by the inverse of this ($A=\frac {CC-VV} {2CC}$), that is the distance that would be covered in 2 seconds to cover forward and backward.  

 - Sidenote: Another approach might be to consider the velocity $(C+V)*1$ and get the distance covered in 1 second; and the other $(C-V)*1$, so the total $(C+V)+(C-V)=2C$.  This is not the correct answer.

However, since the speed of light is limited to C, when going forward, the lateral time for the signal to cross 1 light-second is $\frac {1s \cdot C} {\sqrt{CC-VV}}$.  The reciprocal of this is the lateral distance covered in 1 second; so $B=\frac {2C} {\sqrt{CC-VV}}$ is the equivalent distance for 2-way time.

Then, scaling the distance by dividing by A and multiplying by B $\frac {CC-VV} {2CC} \cdot \frac {2C} {\sqrt{CC-VV}}$ = $\frac {2({CC-VV})} {2C\sqrt{CC-VV}}$= $\frac {\sqrt{CC-VV}} {C}$.  This final expression is the length contraction factor.  The inverse is the time contraction.

#### Another derivation

Parallel time = $\frac C {C+V} + \frac C {C-V}$ = $\frac {2CC} {CC-VV}$; (total wavelengths = $\frac{CC-VV} {2CC}$), either are unitless.

Perpendicular time = $\frac {C} {\sqrt{CC-VV}}$ which gives a total wavelength of $\frac {\sqrt{CC-VV}} {C}$, and 2 of these lengths have to be counted: $2 \frac {\sqrt{CC-VV}}{C}$.

So the common wavelengths = $\frac {2C}{\sqrt{CC-VV}}$  and ${\frac {CC-VV} {2CC} }$

Combining the above, to reduce the total length, and scale back up for the time delay sideways $\frac {CC-VV} {2CC} \cdot \frac{2C}{\sqrt{CC-VV}}$ = $\frac {CC-VV} {C \sqrt{CC-VV}}$ = $\frac {\sqrt{CC-VV}} C$

So : Length Contraction : $\beta = \frac{\sqrt{CC-VV}} {C}$; this is also Time-contraction (the clock on the body is slowed by this much $t'=\beta t$.  1 tick on the observer's clock = $\beta$ ticks on the moving bodies clock.)

## Length and Time Contraction

https://www.desmos.com/calculator/tibw8kuy9v (older version; C factor was included in scalar expressions)
https://www.desmos.com/calculator/uazzijpkei
https://www.desmos.com/calculator/o7eyerh7bc (Revised version; in the long run, for steps 1,2,3, 1 to 2 and 2 to 3 multiply by a reciprocal, so skipping from 1 to 3 deletes a bit of math)

Given the variables $T$ is a time scalar in (s), $V$ is velocity in (m/s), C is the velocity of light in (m/s).  The length will be given with $CT$ which is in (m), and is light-seconds.   The function parameter $x$, below, is a velocity.  The function parameter $a$ is the angle of the line light travels relative to V; at $a=0$ the line is aligned with the velocity, at $a=\frac {\pi} 2$ the line is perpendicular to the velocity.

The function s() takes a velocity, and results in how long light takes to span a round trip of a distance (multiplied by 2) at some velocity(x); at 0, the function is 1, and at C the function is infinity.  Multiplying by this value gives a scaled time that light will travel a unit distance.  
$$s(x)=\frac {CC\sqrt{CC-xx}} {C({CC-xx})}$$
or
$$s(x)=\frac {C} {\sqrt{CC-xx}}$$

The function t() takes a velocity, and results in the how long it takes light to span a round trip at that velocity.  This is the worst-case round trip where the direction of the light is parallel to the velocity.  Dividing by this value gives a scaled length that light will travel in a unit time.

$$t(x)= \frac 1 2 \cdot \frac {2CC} {CC-xx}$$ 
The function p() takes a velocity, and results in how long it takes light to span a distance.
$$ p(x)=\frac {\sqrt{CC-xx}} {C}$$

$f_x(a)$ is the scaled X coordinate (the velocity is assumed to be along the X axis) based on the angle of the line considered, and velocity. The absolute value of $cos(a)$ is used because it's an absolute length at that angle. 
$$f_x(a)=\frac {|\cos(a)|D} {t(V)}$$
$f_y(a)$ is the scaled Y coordinate (no scaling) of a line at angle $a$. The absolute value of $sin(a)$ is used because it's an absolute length at that angle.
$$f_y(a) = |sin(a)|D$$
$f_{xt}(a)$ is the average time it takes light to cover the round-trip of the scaled distance ($f_x(a)$)  along the X axis (in the direction of velocity).  $\frac {f_x(a)} C$ converts the distance to time. 
$$f_{xt}(a)={f_x(a)} \cdot s(V)$$
$f_{yt}(a)$ is the time it takes to span the distance perpendicular to the velocity.  $\frac {f_x(a)} C$ converts the distance to time;  (m)/(m/s) = (m)(s/m) = (s).
$$f_{yt}(a)={f_x(a)} \cdot p(V)$$
$h(a)$ is the total time it takes light to travel along a line in some direction $a$. 
$$h(a)=\sqrt{f_{xt}(a)^2 + f_{yt}(a)^2}$$
If the scalars $t(x)$ and $s(x)$ for $f_x$ and $f_{xt}$ are combined, the result is just $p(x)$; however the exact change in length is lost.
$$\frac {2C} {\sqrt{CC-xx}} \cdot \frac {CC-xx} {2CC} = \frac {\sqrt{CC-xx}} C$$

However, the following might be used for the expressions.
$$  D {\frac {\sqrt{CC-VV}} C}( |\cos(a)|, |\sin(a)|)$$

Vector A ($\vec{A}$), is a temporary expression which is the normalized velocity vector which is a unit vector in the direction of the velocity, with the position projected on that vector; it has the length of $\vec{X}$ and the $\cos(\theta)$ where $\theta$ is the angle between the point and the velocity direction.  (This angle may be useful in the application of light aberration)

If the length of velocity is 0, then no modification should take place.  This may be easier to manage with a direction vector and speed scalar.

$$\vec{A}=\frac {\vec {V}(\vec{X} \cdot \vec{V})} {||\vec{V}||} $$
Subtracting the projected vector, and then add back in the contracted part.

$$\vec {X'} = \vec{X}-\vec{A} + \vec{A} \frac{\sqrt{CC-VV}}{C} $$
This is a refactor of the previous equation

$$\vec {X'} = \vec{X}-\vec{A}(1 - \frac{\sqrt{CC-VV}}{C}) $$

## Time Dilation 

(see also [Realtivity Faq](Relativity.FAQ.md) )

Time dilation is $\frac {C} {\sqrt{CC-VV}}$ or $\frac {C} {\sqrt{1-\frac{V^2}{C^2}}}$, which is the reciprocal of the length contraction.  Even as the length contracts - the lateral time still takes longer and longer to complete a trip.  The contracted length still uses its 2-way time of $\frac {CC} {CC-VV}$, so multiplying a contracted length $\frac{\sqrt{CC-VV}} C \cdot \frac {CC} {CC-VV} = \frac {C} {\sqrt{CC-VV}}$, and the time dilation, from length contraction still matches the contracted time laterally - and in all directions of a circle.

  - the clock dialation is $\frac {C} {\sqrt{CC-VV}}$, clock contraction is $\frac {\sqrt{CC-VV}} C$. 
  - ${V_{real}} = \frac{VC}{\sqrt{CC+VV}}$ ; This expression results with the real ratio of the speed of light that some velocity $V$ that a body feels like it is going.  This speed can be many times the speed of light.
  - $V_{feel}=\frac{VC}{\sqrt{CC-VV}}$; This expression results in what a real velocity V (limited by the speed of light) feels like.
 
This makes 0.707c feel like the speed of light; according to your clock and the velocity you're going, you travel 1 light second per second.  If you are emitting 1 pulse every second by your clock, it would take 1.414 real seconds for you to go 1 light second, but you would pulse once every light second.   Another example 0.949c feels like 3 times the speed of light.

(This is another equation I should adress someday.) Spin squared plus velocity squared equals c squared.
$$ \Delta s^{2}\,=\,c^{2}\Delta t^{2}-\Delta x^{2}$$


## Applying time dilation

Do clock synchronization protocols really have to be considered before publishing?  

~~[Demo + Special relativity](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed-SR.html) not completed...is just 
about showing clocks... ~~




## The Rolling Wheel (Dev-notes)

- (situation 1)the velocity at the tangent of the top of a wheel is rotating at velocity V, along the ground, and the bottom velocity is 0.
- (situation 2)the tangent to the top and bottom of the wheel is rotating at V and -V.

### case 1 
linear velocity at the axle is V/2 - the Linear speed of the circle is V/2.

$R$ =radius = \sqrt(xx+yy)
angular change = $\frac{V}{R}$radians 
center V = V;

1) $S=\frac {||(R\cos(\frac V R T)+VT,R\sin(\frac V R T)+D)||} C + T$ Includes the Distance offset, with a position defined by $VT$
2) $S=\frac {||(R\cos(\frac V R T)+X,R\sin(\frac V R T)+Y)||} C +T$ add position offset X and Y since there's no linear velocity.
Not an easy solve - brute force it is.
for each frame
for each center of each seg on circle is marked for when it will be seen.
make some spoke segments, and similarly mark the center of each of those for visibility.

draw arc segments for fixed locations around the circle.  I guess the spoke positions do update, but the circle doesn't actually rotate, it will just translate.  Display segments that are +/- 1/2 Frame step from 'now'.  `(Math.abs(time_seen - now) < frameStep/2)`.

https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4-wheel.html
https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4-wheel2.html

### Possible computable solution
The circle itself should still be the circle, although each segment of the circle has an independant velocity.  The time of that segment determines the overall rotation of the wheel, and a segment, that at that time is rotated so there is a spoke can start a spoke connected to the center (still with somewhat of a sweeping velocity I suppose... it's position is still sourced from a line)


# Step-by-Step

This is a detailed summary of how I approached building the simulation.

 - define the speed of light C.  This is a value that starts at 1, but can be changed (and should be to confirm equivalent realtionships).
 - define a train having length 2L.  +L is the head of the train and -L is the tail of the train with the center of the train at 0.
 - define an observer that is some distance D from the train (don't want them(it?) to be run over).
 - define a variable V that can be used to control the velocity of the train(or observer).
 - define a run length 2R, such that that time goes from -R to R.
 - define a clock that has 'now', and picks a moment between -R to R.
 - define storage `frames=[]` for the above, a number of steps(N) are allocated ahead of time.

 - create a canvas/drawing surface
 - figure out an x/y spatial coordinate system for that surface. I'm working around '1' so maybe +/-10 across the drawing surface?
 - multiple points of view of situations look different; and since this is about what's being observed by an observer in a situation, there are several independant modes.
   - one simulation with a stationary observer and a moving train.
   - consider more general situation of V1 and V2... or `V` and `V*ratio` where the ratio is like +/-100%.
   - another simulation with a stationary train, and a moving observer.
   - another simulation with a moving train which has on it a stationary observer.
 - first simulation
   - for each step to compute each frame's information  `frame = frames[step]`
     - `T = frame.time = step/steps * 2*R - R`.  Scale the steps from -R to R run time.
     - `frame.hue = (frame.time % 3)*120`.  Assign a color per second to the frame, this helps later to know which time you're seeing now.
     - `frame.position = T * V`.  At a constant velocity the position of a body is VT.
     - `frame.head_position = V*T+L` and `frame.tail_position = V*T-L`
     - `Math.sqrt( D*D + (V*T+/* 0, +L, -L*/)*(V*T+/* 0, +L, -L*/))/C`. Compute how long light takes to get from each of the previous positions to the observer.  The observer has a position `D` perpendicular to the body moving.  The distance divided by the speed of light = Time.
     - `frame.observed_center = Math.sqrt( D*D + V*T*V*T )/C + T`;  The final time that it will be seen by the observer is the frame's now plus the time it takes for light to get from a point to another point.
     - `frame.observed_head = Math.sqrt( D*D + (V*T+L)*(V*T+L) )/C + T`; ...
     - `frame.observed_tail = Math.sqrt( D*D + (V*T-L)*(V*T-L) )/C + T`;  ...
     - together, the last three are referred to as 'frame.observed_times' and means do the same thing to all 3; frame.observed_time refers to any one of the 3.
   - draw the resulting frames...
     - for some 'now' if `frame.time < now` draw the frame.  If any of the frame.observed_times are less than now, then it no longer needs to be drawn.
     - draw markers of the photons scaled from the origin point (frame.position, 0) to (0, D), iterated by (now-frame.time)~0 and (frame.observed_time-frame.time)~1; `del = (now-frame.time)/(frame_observed_time-frame.time)`; then `photon position = (frame.position*(1-del)+0*(del), 0*(1-del),D*(del))`.
     - draw lines from frame.position to observer's position.
     - draw the body at (now * V) and it's head and tail at (now*V) +/-L.
   - observe the behavior.  Notice there's a thing called 'length expansion' that happens too, and lengths are not just contracted. 
   - Solve all of the above factors for the inverse function, such that given a D, T and L, I can know when some part of a train was in that position that it would be seen.
     - $T_O = \frac {\sqrt{{D}^{2}+\left({VT+L}\right)^{2}}} C+T$  time-observed from time-event.
     - $f(x,L) = \frac{\sqrt{C^{2}D^{2}+C^{2}L^{2}+2C^{2}LVx+V^{2}\left(\ C^{2}x^{2}-D^{2}\right)}+C^{2}x+LV}{C^{2}-V^{2}}$ get the time of the event from time-observed.
     - Not such a friendly inverse; and honestly I had Wolfram Alpha help.
   - revisit drawing, add circles that animate simply from each `frame.position` and have a radius of `now * C`.  These should coincide with the above photon marks.  (double check nothing went wrong in the math)
 - Second simluation, very much like the first, except in the frame computations.
  -  for each step to compute each frame's information  `frame = frames[step]`
     - `T = frame.time = step/steps * 2*R - R`.  Scale the steps from -R to R run time.
     - `frame.hue = (frame.time % 3)*120`.  Assign a color per second to the frame, this helps later to know which time you're seeing now.
     - `frame.position = 0`.  At a constant velocity the position of a body is VT.
     - `frame.head_position = +L` and `frame.tail_position = -L`
     - `Math.sqrt( D*D + (V*T- /* +/-L */)^2 )/C`. Compute how long light takes to get from each of the previous positions to the observer.  The observer has a position `((VT +/-L),D)` to the stationary train.  The distance divided by the speed of light = Time.
     - `frame.observed_center = Math.sqrt( D*D + V*T*V*T )/C + T`;  The final time that it will be seen by the observer is the frame's now plus the time it takes for light to get from a point to another point.
     - `frame.observed_head = Math.sqrt( D*D + (V*T-L)*(V*T-L) )/C + T`; ...
     - `frame.observed_tail = Math.sqrt( D*D + (V*T+L)*(V*T+L) )/C + T`;  ...
     - together, the last three are referred to as 'frame.observed_times' and means do the same thing to all 3; frame.observed_time refers to any one of the 3.
   - draw (same as above)
   - observe the behavior, a stationary object will not appear contracted or expanded.  The photons received from the train are in the same position always.  If it had a small velocity itself, then the light received will come from a different time, and be in a different place.
   - solve the reverse... which appears to be very much the same?)
 - Third simluation, very much like the first, except in the frame computations.
  -  for each step to compute each frame's information  `frame = frames[step]`
     - `T = frame.time = step/steps * 2*R - R`.  Scale the steps from -R to R run time.
     - `frame.hue = (frame.time % 3)*120`.  Assign a color per second to the frame, this helps later to know which time you're seeing now.
     - `frame.position = T * V`.  At a constant velocity the position of a body is VT.
     - `frame.head_position = V*T+L` and `frame.tail_position = V*T-L`
     - `( (V*T+(L-D)) )/C`, `( (V*T-(L-D)) )/C`.  The observer is in the train, so the D in this case is an offset within the train.
     - `frame.observed_center = `, well, in this case, don't really need the center to show... the center is the observer, except offset
     - `frame.observed_head = ( (V*T+(L-D)) )/C + T`; ...
     - `frame.observed_tail = ( (V*T-(L-D)) )/C + T`;  ...
     - together, the last three are referred to as 'frame.observed_times' and means do the same thing to all 3; frame.observed_time refers to any one of the 3.
   - draw (same as above)



# (Duplicate sections?)

## Rotating Photon Clocks

This is about having a constant length photon clock which has a static orientation, but the velocity it's moving changes direction.   This demonstrates worst-case and best-case times for time dilation.  While intersting, this is not what finally led to the calculation for length contraction or time contraction(dilation).

### Extended velocity rotations

[This Demo(4)](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed4.html) Allows changing the direction of the velocity,
while keeping the orientation of the moving frame the same direction.  This then required a function like this...

$$f\left(a\right)=\frac{\sqrt{\left(\left(\left(-VVXX\right)\sin\left(a\right)\sin\left(a\right)-VVYY\cdot\cos\left(a\right)\cdot\cos\left(a\right)+2\cdot VVXY\ \cdot\sin\left(a\right)\cdot\cos\left(a\right)+CCXX+CCYY\right)\right)}+VX\cdot\cos\left(a\right)+VY\left(\sin\left(a\right)\right)}{CC-VV}$$

to compute when the observed signal would go away.  (position is not drawn at this time).

### Time dilation graphs

https://www.desmos.com/calculator/ryles5r3h4 https://www.desmos.com/calculator/qucxqp3wsq These graphs encapsulate
 the various parameters... Across the X axis is angle
of the velocity.  This shows the various speeds observed from various angles around an offet.  
The X and Y parameters are the X and Y
offset from a point source emitter. I did add green and blue horizontal lines, and a vertical marker for 90 degree rotation.
At 90 degrees, the clock should work like the standard Lorentz Transformation clock.  The green line intersects with the
Purple and is the computed Loretnz gamma factor.  The Blue horizontal line is 1/2 max+min clock speeds - as if the clock
was always horizontal. There's probably a third option that's roughly the average of the areas under the curve.

Can add a graph line $\frac{\left(f\left(x\right)+f\left(x+\pi\right)\right)}{2}$ which shows all opposing 2-way times for light to span the clock; this curve is also not very constant.  Adding the two way speed for 2 clocks 90 degrees to each other : $\frac{\left(f\left(x\right)+f\left(x+\frac{\pi}{2}\right)+f\left(x+\pi\right)+f\left(x+\frac{3\pi}{2}\right)\right)}{4}$  Is closer to a constant, and close to the average of Lorentz Gamma factor and my calculated Gamma.


Result maybe -$\frac{\sqrt{\left(CC-VV\right)}+C}{2(CC-VV)}$

6 way speed of light doesn't appear to be much better... https://geogebra.org/3d/twjua74e
Using a 4 way speed of light calculated with `(f(x)+f(x+pi/2)+f(x+pi)+f(x+3*pi/2))/4` is actually itself
fairly constant.  This is slightly slower occastionally than the worse-case two-way and one-way gamma factors averaged.
But, is the minimum error at either worst/best cases, and inbetween has only a slight error at even `0.404c` at which 
time it's about a 1% deviation.  (https://www.desmos.com/calculator/pbconetjkf)


---
# SR Devnotes

(Clock display has not been done yet, what an observer sees for a clock on the thing observed, this own clock, the real clock, ... what the clock on the observer actually is (increased distance increases clock ticks 'in the air'))

'if two observers have clocks, and are in motion relative to one another at high velocities, then each should see the other's time as moving slower than theirs. when they meet back up, what determines which observer's clock has ticked more?'  from a user on physics discord.. 

"depends on whether they are approaching or leaving each other whether they see clocks tick faster or slower; a rule I saw someone say was the one that accelerated more will have the slower clock (much like someone deeper in a gravity well has a slower clock and feels like there's more acceleration).   " ... 

and then I could continue on... but this is only a bit of it
" If one was travelling towards the other at the speed of light, then all of its clock ticks would be seen at once which makes for seeing a very fast clock.  (although if they are each going 1/2 the speed of light toward each other, then the light has time to travel away and ahead of each, so you don't see all ticks at once).  "

Because then, with SR, the lightspeed craft has 0 ticks, and the clock doesn't 'go' and the stationary observer sees for all time that it was the same tick until some point before the craft was AT light speed.

But then shifting the problem, they are each `sqrt(2)/2`  for their time scalar, so I should then apply that to when ticks are emitted from their clocks (in theory each tick generates a photon that can be seen at some point in the future...)

At emmision, the photon source knows its position, and it is treated as a stationary point, and the other end is the difference in velocities to calculate where the light has to go, to know how long the light will take to get to be seen....

'ticks in the air'  is really where the missing information on the clocks goes, other than when a clock is also retarded.  Tron experiment, it was decided that the slowest clock would be used as the tick rate for the game;   This means in terms of the simulator, players that are going slower than the fastest player goes even slower....  The world clock ticks VERY fast overall though.



## math/indexLightSpeed-SR.html

Initial conditions...
1) both bodies start at some negative time T such that at T=0 both observe a signal sent from the other (including offset between them).
2)  `T=Math.sqrt( (D*D)/(C*C) / (C*C-V*V));` given V=Real velocity (sublight).
3) the next signal they emit will be ... 

### Space time index

https://geogebra.org/3d/ckphajff  is the fixed version from the correct top math... 

speed of light case is nice and simple though... h(x,y)=((-x^(2)-y^(2))/(2 x))


The graph shows light seconds away, and how long ago you're seeing that point.

## GLSL Implementation

This is just a reference implentation for GLSL to calculate offsets of position.

GLSL code
``` glsl
uniform float time;
uniform vec3 velocity1;
uniform vec3 velocity2;
const float C = 1.0;

        vec3 delpos = position-cameraPosition;
        vec3 tmp = delpos - velocity2*time;
        float A = time*time*C*C - dot(tmp,tmp);
        float B = time*C*C + dot(velocity1, tmp );
        float D = C*C-dot(velocity1,velocity1);
        float T;
        if( abs(D) < 0.0000001 ) T = A/(2.0*B);
        else T = (sqrt( B*B - D*A ) + B)/D;
        vec3 real_position = position + T*velocity1;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( real_position, 1.0 );
```

GLSL version of light aberration routine (2D though... still needs to be updated for 3D).

```glsl
// this has to take negative velocity
vec3 aberration( vec3 X, vec3 Xo, vec3 Vo ) {
	vec3 result;
	vec3 del = X-Xo;
	float len2 = dot(del,del);
	float vlen2 = dot( Vo, Vo);
	float Vdot = dot( del, vo );
	vec3 Vcrs = cross( del, vo );
	if( len2 < 0.000001 && Vlen2 < 0.0000001 ) {
		result = X;
	} else {
        float len = sqrt(len2);
        float vlen = sqrt(vlen2 );
        float norm = len*vlen;
        float CosVDot = Vdot/norm;

        const float baseAng = acos( CosVDot );
        const float delAng = acos( ( CosVDot + Vlen/C )
                / ( 1 + Vlen/C * CosVDot ) );//*((Vcrs.z<0)?-1:1);
if( abs( delAng ) < 0.0000001  ) {
	return X;
}
        const c = Math.cos(delAng);
        const s = Math.sin(delAng);
        const n = Math.sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
		
		const qx = Vcrs.x/n, qy = Vcrs.y/n, qz = Vcrs.z/n;
        const vx = delx , vy = dely , vz = delz;
  
        const dot =  (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
        Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
        Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
        Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;        result = Xo+rpos;               
	}
	return result;
}
```

## Gamma



https://www.desmos.com/calculator/fbl7sujtzp

This is derrived from a clock perpendicular to the velocity, that each time a photon hits a side of the clock is 1 tick.

Lorentz Gamma: $f\left(x\right)=\frac{C}{\sqrt{CC-xx}}$ or $\frac{C}{\sqrt{\left(1-\frac{xx}{CC}\right)}}$

Gamma which I scale the isometric grid simulation is `C-V` as the gamma factor (for a single velocity of an observed body and a stationary observer).  https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html `XT Graph` option, the white grid is sloped by Lorentz's Transform, and scaled to match the native math of one observer seeing another.

At a fraction of the speed of light, a body feels a certain effective speed; which is their real speed * gamma.  The following function
takes some speed a body feels like it is going, and results in the fraction of the speed of light.  (which can conversely be taken to 
determine that this is the speed the moving body feels)

Velocity Lorentz Real for feels like x:  $V_{lr}\left(x\right)=\left(\ \frac{cx}{\sqrt{cc+xx}}\right)$

This is the gamma factor for two-way speed of light...

Two-Way SoL Gamma: $g\left(x\right)=\frac{cc}{cc-xx}$ or $\frac{1}{1-\frac{xx}{cc}}$

which comes from, A+B=2C; a=A/C; b=B/C; a+b=2; that going one way and the other way is 2 ticks.  The time between one side and the other
may be different, as long as the total of 2 bounces is 2 ticks.

from: $a+b=2$, $a=c/(c+x)$, $b=c/(c-x)$, $1=1 second$, $\frac{c}{2\left(c+x\right)}+\frac{c}{2\left(c-x\right)}=1 = \frac{cc}{cc-xx}$

Again the inverse from feels like to real velocity, but for the two-way speed of light.

Velocity Real for Feels like x: $V_{r}\left(x\right)=\frac{\left(\sqrt{\left(c^{4}+4c^{2}x^{2}\right)}-cc\right)}{2x}$ 

# Problems This has Highlighted

### What is a relative velocity?

This is a graph of relative velocity for a body travelling past an observer at some distance.  The relative velocity isn't the same as the constant velocity of the body.  The Lorentz Transform also truly uses this constant velocity, and not truly a relative velocity between bodies.

https://www.desmos.com/calculator/4jsuiamohh


## Practical examples of failures

After some pondering on the Lorentz Transform, I considered where its shortcomings actually manifest.

A classic example, although somewhat simplified from reality.  A boat on water bobs; we should really be somewhat more precise and say I have a mechanism that taps water periodically, and causes waves to emit from a certain point.  The wave pool is infinite, and there are no boundary reflections.  An observer can see the height of water in a region and see that it goes up and down.  It can deduce from the direction the waves are going which direction the other body is, and with a couple detectors, can detect distance. 

So instead can we just say, there's a boat, on water, that bobs, it emits waves in a circle around it.  Another boat can only use the height of these waves in order to see the other boat.  The boat has perfect sensors that absorb all energy from incoming waves, and do not reflect any waves themselves, other than from their bobbing motion, but it cannot see that there was a outgoing change, because those waves will never return to the source.

Now, we simply start moving one boat, and see the changes in the pattern of waves.  The direction one boat sees another boat going will be because the center of the waves changed - at some time later than the observed boat actually moved.  Hoever, the moving boat cannot say that the source of the waves is really changing very much when he senses the waves from the first stationary boat.

---
If there are 2 boats, and they are sitting there bobbing, and one takes off with a velocity, then a bow-wake sort of forms, not to mention the tail wake, but, then at some later point that boat can't go, 'wait, I have no wake in the water, it's the other boat that's moving away from me, and has a wake from it's after'.


### One Velocity

Having a single relative velocity between two bodies, those two bodies can only technically approach or regress from each other; although really, the error in the equation means what seems like a negative velocity, is also a body regressing, but in the opposite direction. (that's probably hard to justify at this place in the document; VT can be positive or negative.  Lorentz VT positive is V regressing, and time advancing, VT negative is V regressing and time receeding (going into the past)... the sign of V doesn't actually change).  If a body passes another body, the sign of the relative velocity changes from negative to positive; and there is no consideration for the changing of the sign.

Body A and Body B are moving apart at 0.5c, (the arrow from B to A on the top left is meant to be A moving away from B, not B moving towards A).  The velocity between B or A might belong to A, and have it be $(0,0.5,0)$, or it might belong to B and be $(0,-0.5,0)$; it could be split and be $(0,0.25,0)$ and $(0,-0.25,0)$... although Lorentz Transform always biases the observer as 0; so if the observer is at B, then A has a velocity away at 0.5c.

![](https://github.com/d3x0r/STFRPhysics/raw/master/relative-velocities.png)

On the top right, A accelerates laterally to B, and the result is a vector from B to A that's 0.5c and is still their separation.  This would look exactly like the above case, only rotated.  

However, the true relative speeds of each body are given, which means to B, A is moving to the right, which means that A should be leaving a wake(shown in blue) of waves towards the lower right, while B leaves a wake(shown in red) of waves going up the drawing, and not that A has a wake of waves on a velocity line in-line with B (shown in green).
 
### Lorentz calculated vs real positions
The purple line is the previous positions of the body calculated from the relative velocity.  The yellow X's are the actual positions in space - when the space ship was going by, it dropped a bouy at each of those spots (sort of, they are inertialess so they stop at the proper X Y frame position).  If there's a lateral motion in the velocity component of the observed, or even just a simple distance to the observer, then the positions a ship actually came from (and emitted light from to be seen) does not lie along the forward vector.

https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3b.html

If one frame has a velocity of 0 (ala Lorentz), then the spots do always align, but then there's no complex calculation for a lateral motion that has no acceleration, but has a non-constant velocity observed.


![Sample screenshot from current demo](https://github.com/d3x0r/STFRPhysics/raw/master/Lorentz-v-real.png)

The following image shows the actual relative velocity between the two frames... (I mean, if you really want to use a relative velocity then this is what it would be).  Both velocities between the frames are actually constant themselves.
![screenshot of demo with relative velocities enabled](https://github.com/d3x0r/STFRPhysics/raw/master/relative-velocity-vectors.png)

The above white lines show the apparent relative velocity, based on the actual change in distance to the observer.  With an offset and a skew, there appears to be up to 3 regions that the velocity changes, with rather sharp regions of change inbetween.

### Lorentz Problem

This is a more typical example was on Physics Discord... The 'correct' answer to this is wrong, so what does that make the Lorentz Transform?  Incomplete and limited in scope? or wrong?  Anyhow here's the problem...

---

"While you're having breakfast in the morning, a creature in the Andromeda galaxy is doing the same. We call the two breakfast events event X (on Earth) and event Y (in the Andromeda galaxy). "Simultaneously" means simultaneous in your reference frame. If instead we describe the two events in another reference frame, that of a space traveler who is traveling at a very high speed from the Andromeda galaxy towards Earth, which of the following statements is correct?

  - A. Event X and event Y are simultaneous.
  - B. Event X occurs before event Y.
  - C. Event Y occurs before event X.
  - D. The question is not well-defined, as we cannot define simultaneity for events that do not occur at the same place in space.

I get that it has something to do with that the traveler is going at relativistic speeds which means things will move slower relative to him. I just don't get how the gamma factor ties in to the problem context"

---

I solved this as above, but assuming that a moving observer would basically see the same times as the other sim (Although, to get a single answer, I had to interpret that the breakfast was simulateous *to 'you' eating breakfast*);
otherwise there are multiple choices.  And even made an image.

![Probability Image](https://github.com/d3x0r/STFRPhysics/raw/master/RelativityHomework.png)

The left graph (1) is the interpretation, that the event from A is seen on E at the same time as E is having breakfast.  This yields one answer that is "C - Event Y occurs before event X."; but (B) is the right answer, so that's not a correct interpretation.

The light cones of the problem, shown in black, and several observers in different times, shown in pink, all going exactly the same speed (was careful to copy the lines and not re-draw them).  The observer intersecting a black line can see the associated event at that time and position in space. The right side graph (2)  clearly shows observers that can answer more than one
answer... 

The 'correct' answer, as interpreted using the Lorentz Tranform, says that B is the one answer; that the event on Earth is always observed before the event on Andromeda.   

[This demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed2a.html) was revised, to calculate a different projection factor from a large relatively stationary event that occurs at 2 distant places.   (The Half-(L)ength must be large).  (Time of simulataneous event is any time you want to match the colors emitted with.  This demo should also be updated with aberration).  

There is a triangle, `CT` that is for some time seconds the speed of light long; Another side is the distance from the observed events (defaults to 1 light second offset, gives the observer some space to avoid planets events might be generated on).
The third side is the current position `A` of the craft relative to an event (the event on the left is `-L` and the event on the right is `L` in terms of the demo), plus the craft's actual postion $VT$ or some velocity in time.  

$$(CT)^2 = (D)^2 + (VT-L)^2$$ 

solved for T...

$$A=((TV)- (+L))$$

$$\frac {AV+ \sqrt { A^2C^2+D^2(C^2-V^2)}} {C^2-V^2}$$

and some tinkering with refactoring

$$\frac {((TV)- (+L))V+ \sqrt { (((TV)- (+L)))^2C^2+D^2(C^2-V^2)}} {C^2-V^2}$$
 
since the problem assumed `D=0` then this will simplify...

$$\frac {(TV-L)(V+C)} {C^2-V^2}$$

$$X = TV $$

$$\frac {(X-L)(V+C)} {C^2-V^2}$$

This is getting closer to the Lorentz Transform than the above... but still to use this time span, it has to be added to the current time `T`...

### Homework Reframed

Another example, with a slightly different metaphor, but the same idea : https://phys.libretexts.org/Bookshelves/University_Physics/Book%3A_University_Physics_(OpenStax)/University_Physics_III_-_Optics_and_Modern_Physics_(OpenStax)/05%3A__Relativity/5.06%3A_The_Lorentz_Transformation
example 5.6.3; the phrase 'an observer' doesn't mean any observer, but a specific observer (when using Lorentz transform, it's an observer 0 distance, observing the 0 point at 0 time or more).

[This demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed3.html) has an observer tied to the train.  Instead of a Distance from the train, you can postion the observer in the train.



``` js
" T:" + (-2*(C*D2+L*V)/(C*C-V*V)).toFixed(2) + " O:"+ (-2*(C*D2+L*V)).toFixed(2);
```
Difference in time, that an external observer notes between when the chained observer will first see the light to when they will see the other simultaneous event.

$$\frac{ -2(CD+LV)}{CC-VV}$$

Difference in time, noted by the observer on the train between the signals.

$$-2*(CD+LV)$$
