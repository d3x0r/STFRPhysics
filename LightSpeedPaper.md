# Abstract

(Preamble 1)
This paper shows the derivation of equations for a one-way speed of light.

# History

Space(Ether/Aether?) *Space* has had, through time, been thought to have properties, until Einstein, and Special Relativity.  This space is thought to not exist because interferometer tests do not show any *space* drag.  This paper will show that, given the proper math, that a null result should have been expected even at the time, and that *space* as a medium can still exist, and probably does.

# Conventions

Variables and are generally upper case, while functions are lower case.  

The phrase 'emits an event' is 'emits a photon that will be seen', the event
is considered a 'signal'.  A body that emits an event, emits a signal.  It is the signal that propagates through *space*.

Velocity is a vector $\vec{V}$.
Speed refers to the magnitude of the velocity ( $||\vec{V}||$ ).
Direction refers to the unit vector of velocity ( $\frac {\vec{V}} {||\vec{V}||}$ ).
Position is a vector of the same order as velocity, $\vec{X}$ is an example.
$\vec{X}\times\vec{Y}$ denotes a cross product.
$\vec{X}\cdot\vec{Y}$ denotes a dot product.
$X\cdot Y$ denotes a multiplication.
$\vec{X}^2$ is the same as $\vec{X}\cdot\vec{X}$.
$||\vec{X}||$ is the same as $\sqrt{\vec{X}^2}$
$\Delta$ is used to denote a delta or change from one value to another.

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

The equivalence principle is a good idea, but only applies within certain limits.  Two bodies that are moving at the same velocity to each other are relatively stationary, but that is not equivalent to being stationary.  Through the development of this we will see that an observer moving with an observed body will see the body exactly the same as if they were actually stationary.  However, let us consider a more classical example, but instead of locking the observer in a room with no access to the outside, they are freely able to go to the deck of a ship and observe things.  On a boat that is stationary, lets say it bobs up and down, and therefore emits waves in concentric circles around it.  When it starts to move, a wake is formed, and the concentric circles from its bobbing motion are no longer concentric, but are offset.  If there were two boats stationary, and one takes off at some speed, it isn't very logical that one could say 'no, I'm not moving, it's the other boat moving, and it has a wake in front of it'.  You can clearly see that your boat is making a wake, and that the other is still emitting concentric circles of waves.  This is also true of light travelling at a one-way constant speed in space, that all observers can agree it is travelling at.  A stationary body is one that is still near where it has previously emitted photons, while a moving body is one that has changed position from where it has previously emitted photons.  This doesn't remove the idea of being relative stationary with another, or having a relative velocity to another, but it does have consequences which will be discussed later.

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

# One Way Constant Speed of Light(C)

Given a propagation speed of $C$, in a stationary, frictionless(?), massless medium, bodies move at various speeds in various directions, or combined into a single term at a certain velocity.  This medium is called *space*.  *Space* has no velocity, so there is nothing like length contraction or time contraction(this is a term that will be defined later) that applies; the clock in the frame of *space* ticks at the fastest rate, and is always the same rate.  This clock may also be called the global clock as opposed to a local clock on a moving body, or in a local frame.

Observing a point on a body is represented by $\vec{X_e}+T\vec{V_e}$, where $\vec{X_e}$ is the position on the body that emitted a signal, $T$ is the time in the frame of *space*.

At a constant velocity, the position of an observer is $\vec{X_o} + T_o\vec{V_o}$.  $\vec{X_o}$ is the observers position in the observing frame, $\vec{V_o}$ is the velocity of the observer's frame, and $T_o$ is the time in the frame of *space* which the observer sees the event.  The observer's time of observation may be decomposed into the base time plus a delta : ${T_o}=T+{T_d}$.  In practice, computing the delta time just adds an additional step of adding the delta to the base time.


~~on the emitter's clock, $\vec{V_e}$ is the velocity of the emitting frame.  The real time $T$ is $\gamma(\vec{V_e})$ or $\gamma(\vec{V_o})$~~

The delta time for the observer to see the emitted event is 
$$T_d = \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+(T+T_d)\vec{V_o}) ||} {C}$$

The time for the observer to see the emitted event is 
$$T_o = T + \frac {|| (\vec{X_e}+T\vec{V_e}) - (\vec{X_o}+T_o\vec{V_o}) ||} {C}$$
solved for T

(define partial expression $\vec{P}$ to make the solution somewhat shorter)
$$\vec{P} = \vec{X_e}-(\vec{X_o}+T_o\vec{V_o})$$
$$T   = \frac { \sqrt{(C^2{T_o}+\vec{V_e}\cdot\vec{P})^2 -  (C^2-\vec{V_e}\vec{V_e})(C^2{T_o}^2 - \vec{P}\cdot\vec{P}) } +C^2S+\vec{V_e}\cdot\vec{P} } {C^2- \vec{V_e}\vec{V_e}}$$

---
Solved for T in a shorter way

$\vec P = X-(X_o+V_oS)$; 
$A = C^2{S}^2 - \vec{P}\cdot\vec{P}$;
$B=(C^2S+\vec{V}\cdot\vec{P})$;
$D = C^2 - \vec{V}\vec{V}$
$$T   = \frac { \sqrt{B^2 -  DA } +B } {D}$$

$$\Delta T  = \frac {\sqrt{ {\vec{P}\vec{P}( D+{\vec{V_o}\vec{V_o}})} } - {\vec{P}\vec{V_o}}} {{D}}$$

The above equations are the propagation delay between any two points on two moving bodies each with their own independent velocities.

# Relative Light Speed

Once a photon is emitted, then it is in $space$ and is no longer related with the body that emitted it.  The photon travels at its own constant speed.  This means that a photon emitted from the front of a moving body towards the back, where front and back are determined by the velocity of the body; the back is moving towards the photon moving at C with a speed of V, and the light effectively travels at C+V.   Conversely, a photon emitted from the back, and moving towards the front is moving at C, and the front is moving away from the photon at V, which gives an effective velocity of C-V; that the photon is never relatively at the speed of light, unless the body is stationary.


# Length Contraction

There is a phenomenon called Length Contraction, where the length of a body moving with a velocity is contracted in the direction of the velocity.
The worst case travel time of forward-backward gets scaled to the best case lateral travel time; that is the time a photon travels perpendicular to the velocity.




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
