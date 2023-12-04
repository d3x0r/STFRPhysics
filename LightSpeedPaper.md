# Abstract

(Preamble 1)
This paper shows the derivation of equations for a one-way speed of light.

# History

Space(Ether/Aether?) *Space* has had, through time, been thought to have properties, until Einstein, and Special Relativity.  This space is thought to not exist because interferometer tests do not show any *space* drag.  This paper will show that, given the proper math, that a null result should have been expected even at the time, and that *space* as a medium can still exist, and probably does.

# Conventions

Variables are generally upper case, while functions are lower case.  

The phrase 'emits an event' is 'emits a photon that will be seen', the event
is considered a 'signal'.  A body that emits an event, emits a signal.  It is the signal that propagates through *space*.

- Velocity is a vector $\vec{V}$.
- Speed refers to the magnitude of the velocity ( $||\vec{V}||$ ).
- Direction refers to the unit vector of velocity ( $\frac {\vec{V}} {||\vec{V}||}$ ).
- Position is a vector of the same order as velocity, $\vec{X}$ is an example.
- $\vec{X}\times\vec{Y}$ denotes a cross product.
- $\vec{X}\cdot\vec{Y}$ denotes a dot product. This may also be written as $\vec{X}\vec{Y}$.
- $\vec{X}^2$ is the same as $\vec{X}\cdot\vec{X}$.
- $||\vec{X}||$ is the same as $\sqrt{\vec{X}^2}$
- $X\cdot Y$ denotes a multiplication of two simple numbers; may also be written as $XY$.
- $\Delta$ is used to denote a delta or change from one value to another.

C is the constant speed of propagation in light-seconds per second usually, but it may also be used as a distance, in which case C light-seconds and has the same value as C, but with units of length instead of speed.  For example, C could be in meters per second (300,000,000 approximately), and then C meter-seconds would be 300,000,000.  (${C_L}$ could be used?  But its value is always actually identical to C other than the units that it is in, $\frac C {C_L}=1 s^{-1}$ or $\frac {C_L} {C} = 1s$ ).

## Rotation

Rotations are 3D vectors $\vec{Q}$ is an example; they are effectively the log of a quaternion.  
The angular rate is the magnitude of a rotation vector $||\vec{Q}||$.
The axis of rotation is the unit vector of a rotation $\frac {\vec{Q}} {||\vec{Q}||}$.
An applied rotation will be represented like a function $\vec{Q}(\vec{X})$ results in $\vec{X}$ rotated around $\vec{Q}$.  ~~Torques, which apply a rotation to a rotation are not employed in this paper.~~

Given a rotation vector around Q: ${\vec{Q}(\vec{X})}$, angular rate is $a=||\vec{Q}||$ components $\vec{A}=\frac{\vec{Q}} {a}$.  In the following equation 

$\vec{X'} = \cos(a)\vec{X} + \sin(a)(\vec{A}\times\vec{X}) + (1-\cos(a))(\vec{A}\cdot\vec{X})\vec{A}$

## Vectors from Components

Vectors as components will be shown in braces : $\{X,Y,Z\}$

# On the Equivalence Principle

The equivalence principle is a good idea, but only applies within certain limits.  Two bodies that are moving at the same velocity to each other are relatively stationary, but that is not equivalent to being stationary.  Through the development of this we will see that an observer moving with an observed body will see the body exactly the same as if they were actually stationary.  However, let us consider a more classical example, but instead of locking the observer in a room with no access to the outside, they are freely able to go to the deck of a ship and observe things.  On a boat that is stationary, lets say it bobs up and down, and therefore emits waves in concentric circles around it.  When it starts to move, a wake is formed, and the concentric circles from its bobbing motion are no longer concentric, but are offset.  If there were two boats stationary, and one takes off at some speed, it isn't very logical that one could say 'no, I'm not moving, it's the other boat moving, and it has a wake in front of it'.  You can clearly see that your boat is making a wake, and that the other is still emitting concentric circles of waves.  This is also true of light traveling at a one-way constant speed in space, that all observers can agree it is traveling at.  A stationary body is one that is still near where it has previously emitted photons, while a moving body is one that has changed position from where it has previously emitted photons.  This doesn't remove the idea of being relative stationary with another, or having a relative velocity to another, but it does have consequences which will be discussed later.
The equivalence principle will not be used; but further issues will be discussed later.

# Relative Light Speed

Once a photon is emitted, then it is in $space$ and is no longer related with the body that emitted it.  The photon travels at its own constant speed.  This means that a photon emitted from the front of a moving body towards the back, where front and back are determined by the velocity of the body; the back is moving towards the photon moving at C with a speed of V, and the light effectively travels at C+V.   Conversely, a photon emitted from the back, and moving towards the front is moving at C, and the front is moving away from the photon at V, which gives an effective velocity of C-V; that the photon is never relatively at the speed of light, unless the body is stationary.


# Light Aberration

"The discovery of the aberration of light in 1725 by James Bradle"(ref 1).

Light aberration is an effect that is seen as advancing the angle of a received photon in a moving frame.  It also applies for photons that are emitted.

I used the existing math for light aberration as derived by Einstein from Wikipedia 'Relativistic Aberration':

$$\cos {\theta_o} = \frac { \cos \theta_s - \frac V C} {1-\frac V C cos \theta_s}$$

Where $\theta_o$ is the observed angle for a frame moving at speed V. I extended the math slightly to include the direction part of the velocity:


$\vec{dX} = ( \vec{X} - \vec{X_o} )$

${cosvdot} = \frac { \vec{dX} \cdot \vec{V} } { ||\vec{dX}|| \cdot ||\vec{V}|| }$

$\Delta A = \cos^{-1} \left( cosvdot + \frac { \frac {|V|} c } { 1+ {cosvdot}  \frac {|V|} c}   \right) - cos^{-1}(cosvdot)$

$\Delta A$ is the change in the angle observed.  This, again, applies for both transmission and reception.  If this did not apply to transmission, then a light beam emitted at 90 degrees across a rocket of sufficient size, the light would drift down the wall by an amount relative to the speed of the rocket, and an interferometer would have a non-null result.

The above formula generally works for the 3D case, but because $\arccos$ aka $\cos^{-1}$ only returns $0$ to $\pi$, a correction needs to be applied based on the input angle.

$({ A \times D } < 0 ?-1:1 )$
Given an input of $D$ which is the angle direction the body is travelling (where 0 is towards positive infinity on the X axis), and $A$ which is the angle the observer is travelling, the delta angle is $dA = D - A$. The multipart equation $N$ computes a multiplier based on the angle; every $\pi$ units the sign of the result flips:
$${N} = \left\{ \begin{array}{ll}  \left| \lfloor \frac {dA} {\pi}  \rfloor \right| \bmod 2 & -1\  \mbox{if }\  1\  \\&  1\ \mbox{if }0 \end{array} \right . $$

And the aberrated angle is:
$$a= N*\cos^{-1}\left( \frac { \cos(dA) +\frac V C } { 1 + \frac V C \cos( dA ) } \right) + D$$

The calculation to determine the angle that resulted in an aberrated angle of $dA$ is:

$$b= N*\cos^{-1}\left( \frac { V - C\cos(dA)  } {  V \cos( dA ) - C  } \right) + D$$


# One Way Constant Speed of Light(C)

Given a propagation speed of $C$, in a stationary, frictionless(?), massless medium, bodies move at various speeds in various directions, or combined into a single term at a certain velocity.  This medium is called *space*.  *Space* has no velocity, so there is nothing like length contraction or time contraction(this is a term that will be defined later) that applies; the clock in the frame of *space* ticks at the fastest rate, and is always the same rate.  This clock may also be called the global clock as opposed to a local clock on a moving body, or in a local frame.

Observing a point on a body is represented by $\vec{X_e}+T\vec{V_e}$, where $\vec{X_e}$ is the position on the body that emitted a signal, $T$ is the time in the frame of *space*.

At a constant velocity, the position of an observer is $\vec{X_o} + T_o\vec{V_o}$.  $\vec{X_o}$ is the observers position in the observing frame, $\vec{V_o}$ is the velocity of the observer's frame, and $T_o$ is the time in the frame of *space* which the observer sees the event.  The observer's time of observation may be decomposed into the base time plus a delta : ${T_o}=T+{T_d}$.  In practice, computing the delta time just adds an additional step of adding the delta to the base time.

Propagation time is computed for the direct distance between emitter and receiver; this essentially treats emission as a perfect circle from the point of emission until reception.  The math is not based on such a geometry, and is just an algebraic solution.

The delta time for the observer to see the emitted event is 
$$T_d = \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+(T+T_d)\vec{V_o}) ||} {C}$$

The time for the observer to see the emitted event is 
$$T_o = T + \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+T_o\vec{V_o}) ||} {C}$$
solved for T

(define partial expression $\vec{P}$ to make the solution somewhat shorter)
$$\vec{P} = \vec{X_e}-(\vec{X_o}+T_o\vec{V_o})$$
$$T   = \frac { \sqrt{(C^2{T_o}+\vec{V_e}\cdot\vec{P})^2 -  (C^2-\vec{V_e}\vec{V_e})(C^2{T_o}^2 - \vec{P}\cdot\vec{P}) } +C^2S+\vec{V_e}\cdot\vec{P} } {C^2- \vec{V_e}\vec{V_e}}$$

---
Solved for T using partial expressions...

$\vec P = X-(X_o+V_oS)$
$A = C^2{S}^2 - \vec{P}\cdot\vec{P}$
$B=(C^2S+\vec{V}\cdot\vec{P})$
$D = C^2 - \vec{V}\vec{V}$
$$T   = \frac { \sqrt{B^2 -  DA } +B } {D}$$

? delta solution?

$$\Delta T  = \frac {\sqrt{ {\vec{P}\vec{P}( D+{\vec{V_o}\vec{V_o}})} } - {\vec{P}\vec{V_o}}} {{D}}$$

The above equations are the propagation delay between any two points on two moving bodies each with their own independent velocities.

This is only valid for $V<C$, or $V>C$; if $V>C$, then the negative of the square root should also be considered as a solution; this will show the craft going backwards towards where it came from, as the signals it had emitted when it was there will finally reach the viewer.  If $V=C$, there is a special case formula which can used.  Instead of the first equation

$$T_o = T + \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+T_o\vec{V_o}) ||} {C}$$

Replace C with $||\vec{V_e}||$, and solve as normal

$$T_o = T + \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+T_o\vec{V_o}) ||} {||\vec{V_e}||}$$

Which gives the equation

$$\begin{align}&\vec{P} =\vec{X}-\vec{V_o}{T_o} \\&B=C^2{T_o}+\vec{V}\cdot\vec{P}\end{align}$$
$$T = \frac {A} {2B}  $$

# Length Contraction

There is a phenomenon called Length Contraction, where the length of a body moving with a velocity is contracted in the direction of the velocity.
The worst case travel time of forward-backward gets scaled to the best case lateral travel time; that is the time a photon travels perpendicular to the velocity.

$T_W = (\frac {C_L}{C+||\vec{V}||} + \frac {C_L}{C-||\vec{V}||})\cdot \frac 1 2$


$T_B = \frac {C_L}{C+||\vec{V}||} + \frac {C_L}{C-||\vec{V}||}$



## Vector Expression to Apply Length Contraction

$\vec{X'} = \vec{X} -\frac {\vec{V}\cdot \vec{X}} {||\vec{V}||} ( 1 - \sqrt { 1 - \frac {\vec{V}^2} {C^2} } )$

$\vec{X'} = \vec{X} -\frac {\vec{V}\cdot \vec{X}} {||\vec{V}||} \frac{ C -  \sqrt { C^2 - {\vec{V}^2}  } } {C}$

# Time Contraction

It's also a well known phenomenon that time contracts according to the speed of a moving body.  This contraction happens when normalizing the worst case time of forward and backward propagation times with the lateral propagation time.

Forward, the time light takes to cover the contracted distance of C light-seconds is 

$$\frac{1}{2} \cdot \frac {\sqrt{C^2-\vec{V}^2}} {C} \cdot (\frac{C_L}{C+||V||}+\frac {C_L} {C-||V||})$$
Multiplying the fraction for the distance of 1 over C+V by C-V over C-V and 1 over C-V by C+V over C+V reduces the expression to; the units will not change since $\frac {C+V}{C+V}$ cancels out the units and becomes just a scalar $\frac x {C^2-V^2}$ still has units of length over velocity, not velocity squared.
$$\frac {\sqrt{C^2-\vec{V}^2}} {2{C_L}} \cdot (\frac{2{C_L}C} {C^2-\vec{V}^2})$$

Which is then
$$\frac C {\sqrt{C^2-\vec{V}^2}}$$
And the reciprocal, which scales the clock so 1 tick happens per light-tick is
$$\frac {\sqrt{C^2-\vec{V}^2}} C\ {or}\ \sqrt{ 1-\left(\frac {\vec{V}} C\right)^2}$$
Alternatively, it is possible to compute the time it takes for a photon clock mounted laterally to tick... and the result is the same as above.

the time it takes for light to travel along the lateral path of C light-seconds is 
$$ \frac C {\sqrt{C^2-\vec{V}^2}}$$ 
And, again, the reciprocal, which scales the clock so 1 tick happens per light-tick is

$$\frac {\sqrt{C^2-\vec{V}^2}} C\ {or}\ \sqrt{ 1-\left(\frac {\vec{V}} C\right)^2}$$

# Full Process to Compute Observation

Length contraction is applied to both points on each bodies according to their own velocities.

The time between a point on the emitting body and observing body is computed using the observing body's real time coordinate, giving the emitting bodies real time when the event was emitted.

The absolute position can then be computed from emitter to observer, and then the light aberration for the observer based on the angle the signal is detected, resulting in a final actual position that the body being observed is perceived.

# Doppler Effect or Frequency Shift

The frequency shift depends on the angle the light was emitted, after aberration is applied.

$$F = \frac {1} { \sqrt{ 1+ \frac {V^2} {C^2} - \frac {2V}{C} \cos( \theta ) } } $$

The above factor is a scalar on the wavelength, and $\frac 1 F$ should be used to scale the frequency.

The composite frequency shift and light aberration function:

$$F = \frac {1} { \sqrt{ 1+ \frac {V^2} {C^2} - \frac {2V}{C} \cos\left( N*\cos^{-1}\left( \frac { \cos(dA) +\frac V C } { 1 + \frac V C \cos( dA ) } \right) \right) } } $$

# Relative Velocities

An observer which is offset from the path of an observer has several relative velocities while the body itself itself only having a constant velocity.  An observed body will at the furthest extent be seen as traveling towards the observer with a velocity that points towards the observer (-V in a 2D sense), will slowly change to 0, and then appear to accelerate back to velocity V away from the observer.  If there is 0 distance (or an insignificant fraction of the speed of light-seconds away), then the velocity instantly changes from -V (towards the observer) to V (away from the observer).

In the following equation, $D$ is the distance to the straight line (1 in the graph), $V$ is the velocity (1 in the graph), T is the time (x in the graph).

$v_{x}=\left(\sqrt{\left(VT\right)^2+DD}-\sqrt{DD+\left(V\left(T-0.001\right)\right)^2}\right)\cdot1000$

Example Graph:

![[Pasted image 20231202233428.png]]

# Relative Time Dilation

It's said that only the relative difference matters between two bodies.  Consider a scenario where 8 craft pass by Earth at exactly the same time, and their clocks are all exactly synchronized.  Each craft is 0.1c faster than the previous.  

8 ships each leave the earth at +0.1c from each other.

each ship has a propagation lag of +0.1 seconds per second. such that after 10 seconds there's 1 light second between them and 1 second delayed signal.
between the first and last ship then is 8 seconds of delay per 10 seconds of travel.

each ship has a relative 'time dilation' of 1.005038 or 0.9949874
so after 1 seconds, each ship is 10*(1-.9949874) = 0.050126 slower seconds per 10 seconds of travel slower than the previous ship.
obviously the Lorentz Transform that results in 0.05 seconds does not include the 1 seconds of propagation time between each ship.
when really each ship sees the next as 1.05 seconds per 10 seconds slower.

the total difference from the first ship to the last is then 80/9.95 or call it 8 seconds of lag
while the total time dilation between the first and 8th is 0.6.
 0.994^8 != 0.6.
```
0     1       2     3       4      5      6      7      8
1.0  0.995  0.978  0.954  0.917  0.866  0.800  0.714  0.600 ( actual time contraction)
1.0  0.995  0.99   0.985  0.980  0.975  0.970  0.960  0.960 ( from each relative clock to the next)
```
(the flowing is across 10 seconds, and including propagation delay)
1 sees 2 as 1 second + 10*(0.995-0.978)=0.15 seconds ... so 1 sees 2 lagged by 1.05 seconds.
7 sees 8 as 1 second + 10*(0.714-0.600)=1.14 seconds ... so 7 to 8 sees the clock lagged by 2.14 seconds per 10 seconds. 

but - 7 to 8 and 1 to 2 are both relative to each other by only 0.1c, so the time dilation that 7 sees from 8 should still be just 0.995 seconds from time dilation.

## Consequences

Several consequences are immediately obvious.

1) In order for all clocks to behave the same in all frames, acceleration due to a specific force is no longer a constant.  Instead, the velocity imparted due to a specific acceleration must be scaled depending on the direction of the force relative to the velocity of the frame it is in.  An acceleration applied backward must be scaled by $A\frac{C}{\left(C-V\right)}$ and applied forward must be scaled by $A \frac{C}{\left(C+V\right)}$; or more generally an acceleration applied in a direction $\theta$ is $A\frac {C}{C+cos(\theta)V}$. (approximately; needs discussion)
2) The one-way velocity of light is not a constant, and adding the velocity of the two direction is not a constant, but what is constant is the amount of time it takes light to cover a certain distance two-ways.  The time can be expressed as $A+B=2$.
3) The experience of travelling at a velocity ends up meaning that for a given velocity V, with the time factor scaled by the time contraction of $\sqrt{C^2-V^2}$, means that at 0.707c, that the frame actually feels like it is travelling at 1c.   It travels 1 light second in what feels like 1 second in the frame.  If the ship emitted a signal every second, a pulse would be seen by external observers every 1 light second, but there would be more than 1 second between pulses (ignoring light propagation time).  At 0.861 the ship would emit a pulse every 2 light seconds every second... a ship would feel like it was going many times the speed of light before it actually reached the speed of light. (this could probably be expanded).  (This idea has been criticized as not making any sense since nothing can go faster than the speed of light - but it's really not - it just 'feels like' it's going faster than the speed of light.)
4) The universe doesn't contract when a body is moving through it - a stationary object that is bounded by say 2 walls that emit a signal that is its local time, will always be seen as 2 light seconds apart (other than effects from light aberration).
5) An observer that is traveling with a body at some speed will always see that body in perspective as exactly the same as when it was stationary.  The length contraction and light aberration causes the various observed positions to look, in perspective (as in 3D graphics perspective, or as light is projected on the retina as a 2D surface) to be exactly the same.... the light from the back of the craft takes a longer time to reach the observer, and intuitively it would seem like it would come from further away, but the light aberration from the back widens out the perceived distance, and results after a perspective correction as exactly the same perspective as being stationary.  Similarly light from the front of the craft would arrive sooner, and the front wall should appear closer to the viewer, but, light aberration contracts the width of it, and ends up looking in perspective exactly as it did when the frame was stationary.  If there was a perceivable cycling signal of lights say going red-green-blue-red-etc, then the light that is closest to 'now' would come from further in front of the observer, and the back would lag behind; but within reasonable limits, (since we don't build space craft that are 300,000km long), there is no notable difference.
6) As mentioned before, light aberration place on transmission too - this is somewhat like a transfer of inertia to the emitted light.  If this aberration did not take place, then a laser light shining across a craft moving at some speed would drift down the wall when not under acceleration, but at increased speeds; this doesn't happen.  That means the light from the laser when it leaves the last bit of the lens medium and enters free space, will have been aberrated by some angle such that it will cross the craft at exactly 90 degrees; similarly if there is a reflective surface like a mirror, the mirror will aberrate the light it receives, and appear to have received the light from directly across, instead of an angle lagged behind, and on reflection, will aberrate the light further forward.  This is part of the reason that interferometers like LIGO or Michelson-Morley experiment don't detect any drag on the light.  The other part that plays a part is length contraction.  Between the two effects, the time light travels between splitters, and mirrors is exactly the same in any direction; but depending on the direction of the device may take a longer or shorter time, but the time along each path the light takes will still be the same, and the light will come back in phase with itself and interfere as expected.
7) 
# Appendix A

Solve initial equation...

$$T_O = \frac{||(\vec{X} +\vec{V}T)-(\vec{X_O} +\vec{V_O}{T_O})||} {C} + T$$

Can also be written as:

$$T_O = \frac{\sqrt{((\vec{X} +\vec{V}T)-(\vec{X_O} +\vec{V_O}{T_O}))^2}} {C} + T$$

Move T to the left side, and multiply both sides by C, then square both sides to remove the square root.

$$C^2({T_O}-T)^2 = ((\vec{X} + \vec{V} T ) -( \vec{X_O}+ \vec{V_O} {S}) )\cdot (({\vec{X} + \vec{V} T ) -( \vec{X_O}+ \vec{V_O} {T_O}))} $$

Expand expressions which have $T$ in them; FOIL right side:

$$\begin{align}C^2{T_O}^2-2C^2{T_O}T+C^2T^2 = \\ &(\vec{X} + \vec{V} T )(\vec{X} + \vec{V} T ) \\ &- 2 (\vec{X} + \vec{V} T )( \vec{X_O}+ \vec{V_O} {T_O}) \\&+ ( \vec{X_O}+ \vec{V_O} {T_O})^2\end{align}$$

Expand right side terms that have $T$ in them:

$$\begin{align}C^2{T_O}^2-2C^2{T_O}T+C^2T^2 = \\&\vec{X}\vec{X} +2\vec{X}\vec{V}T + \vec{V}\vec{V} T^2  \\&-2 \vec{X}\vec{X_O} -2\vec{X}\vec{V_O}{T_O} -2 \vec{V} T\vec{X_O}-2 \vec{V}\vec{V_O}T{T_O} \\&+ ( \vec{X_O}+ \vec{V_O} {T_O})^2\end{align}$$

Move T terms to the left, else to the right; also combined terms:

$$\begin{align}C^2T^2-2C^2{T_O}T -2\vec{X}\vec{V}T +2 &\vec{V} T\vec{X_O} +2 \vec{V}\vec{V_O}T{T_O} - \vec{V}\vec{V} T^2 = \\&-C^2{T_O}^2 + \vec{X}\vec{X}   \\&-2 \vec{X}\vec{X_O} -2\vec{X}\vec{V_O}{T_O}  \\&+ ( \vec{X_O}+ \vec{V_O} {T_O})^2\end{align}$$

Combine coefficients of $T^2$ and $T$:

$$\begin{align*}(C^2- \vec{V}\vec{V}) T^2  &-2(C^2{T_O}+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{T_O})T =\\& -C^2{T_O}^2 \\& + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}{T_O}  + ( \vec{X_o}+ \vec{V_o} {T_O})^2\end{align*}$$

Combine expressions with $2X$:

$$\begin{align}T^2(C^2- \vec{V}^2)  & -2T(C^2{T_O}+\vec{X}\vec{V}- \vec{V} \vec{X_O} - \vec{V}\vec{V_O}{T_O}) =\\& -C^2{T_O}^2 \\& + \vec{X}\vec{X}    -2 \vec{X}(\vec{X_O} +\vec{V_O}{T_O})  + ( \vec{X_O}+ \vec{V_O} {T_O})^2\end{align}$$

Simplify position expression to a squared term:

$$\begin{align}T^2(C^2- \vec{V}\vec{V})  & -2T(C^2{T_O}+\vec{V}(\vec{X}- (\vec{X_O} + \vec{V_O}{T_O}))) =\\& -C^2{T_O}^2 \\& + (\vec{X}    -(\vec{X_O} +\vec{V_O}{T_O}))^2\end{align}$$
Define partial term $\vec{P}$ (This partial term could be defined and applied sooner)

$$\vec{P} = \vec{X}-(\vec{X_O}+V_O{T_O})$$
Substitute $\vec{P}$:
$$\begin{align} T^2(C^2- \vec{V}^2)  -2T(C^2{T_O}+\vec{V}\vec{P}) =\ -C^2{T_O}^2 + \vec{P}^2\end{align}$$
Factor left side into a single square.  There then is an additional term that is subtracted so the left side maintains equality, which is subtracted from the term afterward (the right side of the square, squared).
$$\left(T\sqrt{C^2- \vec{V}^2}   -\frac{(C^2{T_O}+\vec{V}\vec{P})}{\sqrt{C^2-\vec{V}^2}}\right)^2 -\frac{(C^2{T_O}+\vec{V}\vec{P})^2}{C^2-\vec{V}\vec{V}} = -C^2{T_O}^2 + \vec{P}^2$$

Move term without $T$ to right side, and take square root or both sides.
 $$ T\sqrt{C^2- \vec{V}^2}   -\frac{(C^2{T_O}+\vec{V}\vec{P})}{\sqrt{C^2-\vec{V}^2}}  = \sqrt{\frac{(C^2{T_O}+\vec{V}\vec{P})^2}{C^2-\vec{V}^2} -C^2{T_O}^2 + \vec{P}^2 }$$

Move partial term to the right side, and divide by coefficient of $T$.

$$T = \frac { \sqrt{\frac{(C^2{T_O}+\vec{V}\cdot\vec{P})^2}{C^2-\vec{V}^2} -C^2{T_O}^2 + \vec{P}^2 } +\frac{C^2{T_O}+\vec{V}\vec{P}}{\sqrt{C^2-\vec{V}^2}}} {\sqrt{C^2- \vec{V}\vec{V}}}$$

multiply top and bottom of right side by $\frac {\sqrt{C^2-\vec{V}^2}}{\sqrt{C^2-\vec{V}^2}}$

$$T   = \frac { \sqrt{(C^2{T_O}+\vec{V}\vec{P})^2 -  (C^2-\vec{V}^2)(C^2{T_O}^2 - \vec{P}^2) } +C^2{T_O}+\vec{V}\vec{P} } {C^2- \vec{V}^2}$$

Can then break that into partial expressions... (The partials of E,F,and G could have been defined earlier):

$\vec P = X-(X_O+V_O{T_O})$; 
$E = C^2{T_O}^2 - \vec{P}^2$;
$F=C^2{T_O}+\vec{V}\vec{P}$;
$G = C^2 - \vec{V}^2$

$$T   = \frac { \sqrt{F^2 -  GE } +F } {G}$$

# Appendix A-1


This uses the same procedure as the previous, but solves with more terms and vectors instead of individual variables.  A solution for T is found, all that remains is simplifying terms at the end.

- Equation 1: $T_o = \frac { \lVert ({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {T_o})} \rVert } {C} + T$

- Equation 2: $\vec{P} = \vec{X}-\vec{X_o}-\vec{V_o}{T_o}$

Convert length expression to the square root of the dot product. move C, square both sides.
- Equation 3: $C^2(T_O-T)^2 =  (  \vec{P}+\vec{V}T )\cdot (\vec{P}+\vec{V}T )$

Expand expressions.
- Equation 4: $C^2S^2-2C^2ST+C^2T^2 = \vec{a}\cdot\vec{a}+2\vec{a}\vec{V}T +\vec{V}\vec{V}TT$

Move T terms to the left, else to the right; also combined terms and reversed some signs.
- Equation 5:  $(C^2-\vec{V}\vec{V})T^2 -2(\vec{a}\vec{V}+C^2S)T   = -C^2S^2 + \vec{a}\cdot\vec{a}$

Define A, B and D.
- Equation 6: $A=C^2S^2-\vec{a}\vec{a}$
- Equation 7: $B=C^2S+\vec{a}\vec{V}$ 
- Equation 8:  $D = (C^2-\vec{V}\vec{V})$

Substitute D, B and A 
- Equation 9   $DT^2 -2(B)T = -A$

Simplified left side by factoring $AT^2 +2B$  as $(\sqrt A T +\frac B {\sqrt A})^2-B^2$
- Equation 10: $(\sqrt{D}T -\frac{B}{\sqrt{D}})^2  -\frac {B^2} D = -A$

Move the odd term, Take the square root of both sides,  move the remaining non $T$ term
- Equation 11: $\sqrt{D}T  = \sqrt{-A+ \frac {B^2} D}+\frac{B}{\sqrt{D}}$

Move odd term to the right, and take the square root of both sides.
- Equation 12: $T  = \frac{\sqrt{\frac {B^2} D-A}}{\sqrt{D}}+\frac{B}{{D}}$

Multiply top and bottom of left expression by $\frac{\sqrt{D}}{\sqrt{D}}$; which in the radical is $D$.
- Equation 13: $T  = \frac{\sqrt{B^2-DA}+B}{D}$
# Appendix B 

Solving propagation formula for $T_D$, which is the delta time from $T$.  As a reminder $T_O=T+T_D$.  This is useful if you know the time $T$ when a body emitted something, and want to know when the observer will see it.

$$T_d = \frac {|| (\vec{X_E}+T\vec{V_E}) - (\vec{X_O}+(T+T_d)\vec{V_O}) ||} {C}$$

Define $\vec{P}$:

$$\vec{P} = \vec{X_E}+\vec{V_E}T-\vec{X_O}-\vec{V_O}T$$

$$T_d = \frac {\sqrt{ (\vec{P}-\vec{V_O}T_d)^2 } } {C}$$

$$CT_d = \sqrt{ (\vec{P}-\vec{V_O}T_d)^2 }$$

$$C^2T_d^2 = (\vec{P}-\vec{V_O}T_d)^2$$

$$C^2T_d^2 = \vec{P}^2 - 2\vec{P}\vec{V_O}{T_d} + \vec{V_O}^2{T_d}^2 $$

$$C^2T_d^2 + 2\vec{P}\vec{V_O}{T_d} - \vec{V_O}^2{T_d}^2= \vec{P}^2  $$

$$(C^2-\vec{V_O}^2)T_d^2 + 2\vec{P}\vec{V_O}{T_d} = \vec{P}^2 $$

$$\left(\sqrt{C^2-\vec{V_O}^2}T_d + \frac{\vec{P}\vec{V_O} } {\sqrt{C^2-\vec{V_O}^2}} \right)^2 - \vec{P}^2\vec{V_O}^2 = \vec{P}^2 $$

$$\sqrt{C^2-\vec{V_O}^2}T_d + \frac{\vec{P}\vec{V_O} } {\sqrt{C^2-\vec{V_O}^2}}  = \sqrt{\vec{P}^2 + \vec{P}^2\vec{V_O}^2} $$

$$\sqrt{C^2-\vec{V_O}^2}T_d   = \sqrt{\vec{P}^2 + \vec{P}^2\vec{V_O}^2} - \frac{\vec{P}\vec{V_O} } {\sqrt{C^2-\vec{V_O}^2}}$$

$$T_d   = \frac { \sqrt{\vec{P}^2 + \vec{P}^2\vec{V_O}^2} - \frac{\vec{P}\vec{V_O} } {\sqrt{C^2-\vec{V_O}^2}}} {\sqrt{C^2-\vec{V_O}^2}}$$

$$T_d  =  \frac {{\sqrt{C^2-\vec{V_O}^2}}\sqrt{\vec{P}^2 + \vec{P}^2\vec{V_O}^2} - \vec{P}\vec{V_O}} {C^2-\vec{V_O}^2}  $$

Cannot simplify $\sqrt{\vec{P}^2}=\vec{P}$ as in: $\sqrt{\vec{P}^2+\vec{P}^2\vec{V_O}^2} = \sqrt{\vec{P}^2}\sqrt{1-\vec{V_O}^2}$, because that would result as a vector instead of a number...
