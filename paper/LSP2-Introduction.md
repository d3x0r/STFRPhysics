
| [Abstract](LSP2-Abstract.md)                        | 3. [Light Aberration](LSP2-Light-Aberration.md)       | 7. [Experiment Proposal](LSP2-Experiment.md)                          | [Appendix C](LSP2-Appendix-C.md) | [Appendix G](LSP2-Appendix-G.md) |
| --------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- | -------------------------------- |
| [Introduction](LSP2-Interoduction.md)               | 4. [Full Transformation](LSP2-Full-Transformation.md) | 8. [References and Declarations](LSP2-References-and-Declarations.md) | [Appendix D](LSP2-Appendix-D.md) | [Appendix H](LSP2-Appendix-H.md) |
| 1. [Light Propagation](LSP2-Propagation.md)         | 5. [Doppler Effects](LSP2-Doppler.md)                 | [Appendix A](LSP2-Appendix-A.md)                                      | [Appendix E](LSP2-Appendix-E.md) | [Appendix I](LSP2-Appendix-I.md) |
| 2. [Length Contraction](LSP2-Length-Contraction.md) | 6. [Results](LSP2-Results.md)                         | [Appendix B](LSP2-Appendix-B.md)                                      | [Appendix F](LSP2-Appendix-F.md) | [Appendix J](LSP2-Appendix-J.md) |
# Introduction

Starting from the ground up to derive the math of Special Relativity, by
developing the math for the propagation of light at a constant speed in
a stationary medium, or alternatively that there were at least three
observers, who all agree that the speed of light was constant in any
direction, they may have to consider their own velocity relative to the
point the light was emitted from, and any effects their velocity may
have on their own clock. The resulting equations challenge aspects of
the Principle of Equivalence employed by Einstein. The math also results
in a system that expects a null result from any interferometer
experiments such as Michelson-Morley, or interferometer implementations
such as The Laser Interferometer Gravitational-Wave Observatory (LIGO).

A frame is a set of orthogonal axes which measure distances between
locations within the frame, the orientation of the frame, and a time.
When a velocity is applied, the frame moves in the direction and speed
of the velocity. There are a minimum of 3 frames; the global frame
itself has no velocity, and is always in the same location, both the
observer and observed have their own frames. The global frame has an
origin defined at a location defined as appropriate for the situation
being evaluated. In this paper all frames share the same origin
$\vec{X}=\{0,0,0\}$ and orientation $\vec{Q}=\{0,0,0\}$ at $T=0$. The global frame
is the frame light propagates in; given the constant clarity we observe
in galaxies out to the edge of the universe, it can be assumed that the
space this global frame represents does not have significant currents or
motions, and represents space. There are minor oscillations in the
density and curvatures in this space, but it’s not like looking through
hot air currents.

Light is given a constant propagation speed of $C$ in global frame.

Bodies move at some speed and direction or combining speed and direction
into a single term, at a velocity. This medium is called space. Space
has no velocity or orientation, and the clock in the frame of space
ticks at constant rate. The clock in this frame is called the global
clock. A frame which moves within the space frame, or global frame, is
called a local frame. A local frame has a local clock, which may tick at
a different rate than the global clock.

The specific density of space (the average distance between two points)
in a frame may differ at various locations. This paper does not
implement varied density, and only considers frames that have entirely
homogeneous coordinates. It should not be entirely discounted given
gravitational wave detection that space can move at least slightly.

A body can only be observed if it has emitted or re-emitted a photon. A
photon on an observed body will come from position on the observed body.
The photon, once emitted, travels in the global frame, independent of
the body it was emitted from. An observer has a body itself and will
observe the photon from the observed body at some position in the frame
of the observer a later time after the body emitted a photon.

Once the basic math of propagation of light at a constant speed in
space, with an observed frame and an observer’s frame was developed,
other aspects detailed by Special Relativity were considered, since they
were not immediately obvious from the propagation. Those aspects being
length contraction, and time dilation. Time dilation would be better
called time contraction, since less time passes on a clock, much like
length contraction there’s less distance than a real distance. The
details of [length contraction](#_Length_Contraction) and [time
contraction](#_Time_Contraction) will be discussed later.

Light aberration was the last missing factor from the system. Light
aberration is an effect that for a moving body, the angle light is seen
is advanced in the direction of the velocity of the viewer. While light
propagation usually results in a time-lagged view of an observed body,
light aberration advances the angle, which counteracts the effects of a
delayed propagation. Light aberration then makes two bodies that are
relatively stationary, at the same speed that are side-by-side still
appear side-by-side, even though the photons seen by an observer would
normally appear to be lagged to the observer.

Evaluating the resulting math with an [interferometer
demonstration](#InterferometerDemo), then led to the development of the
expression for doppler effect, or the shift of frequency of photons
emitted from a body at a velocity, or as seen from another body with
another velocity. The doppler effect equation is quite dissimilar from
Einstein’s equation. There are predicted red/blue shifts with Transverse
Doppler Effect with Einstein’s equations, while these would show no
frequency change in the transverse direction.

## Conventions

Variables are upper case unless they come from an external reference.
This makes variables mentioned in the text stand out.

-  Equations with numbers that have been stricken are invalid, for example: (999). They are provided for consideration only.
-  Velocity is a vector $\vec{V}$.
-  Speed refers to the magnitude of the velocity (  ||$\vec{V}$|| ).
-  Direction refers to the unit vector of velocity ($\frac{\vec{V}}{||\vec{V}||}$).
-  Position is a vector of the same order as velocity, $\vec{V}$ is an example.
-  $\vec{X}\times\vec{Y}$ denotes a cross product.
-  $\vec{X}\cdot\vec{Y}$ denotes a dot product. This may also be written as $\vec{X}\vec{Y}$.
-  $\vec{X}^2$ is the same as $\vec{X}\cdot\vec{X}$.
-  $\|\vec{X}\|$ is the same as $\sqrt{{\vec{X}}^{2}}$
-  $X\cdot Y$ denotes a multiplication of two simple numbers; may also be written as $XY$.

$C$ is the constant speed of propagation defined in light-seconds per
second as used in this paper. It may also be used as a distance, in
which case $C_L$ light-seconds and has the same value as
$C$, but with units of length instead of speed. For example, $C$ could
be in meters per second (300,000,000 approximately), and then
$C_L$ meters would be 300,000,000. The value is always
actually identical to $C$ other than the units:
$\frac{C}{C_{L}} = 1s^{- 1}$ or $\frac{C_{L}}{C} = 1s$.

The phrase 'emits an event' is 'emits a photon that will be seen'
describes the creation of a signal that propagates through space. A body
that emits an event, emits a signal. It is the signal that propagates
through space. Reception of a signal is also observation of an event.

## Rotation

Rotations are 3D vectors *Q⃗* is an example; they are effectively the log
of a quaternion. This is used for [light
aberration](#d-aberration-with-rotation).

-   The angular rate is the magnitude of a rotation vector ( $\|\vec{Q}\|$).
-   The axis of rotation is the unit vector of a rotation(
    $\frac{\vec{Q}}{||\vec{Q}||}$).
-   Given a rotation vector *Q⃗*, the angular rate is *θ* = ∥*Q⃗*∥ and
    axis $\vec{A} = \frac{\vec{Q}}{\theta}$ used
    in the following
    equation:$\vec{X'} = \cos(\theta)\vec{X} + \sin(\theta)(\vec{A} \times \vec{X}) + (1 - \cos(\theta)) \cdot (\vec{A} \cdot \vec{X})\vec{A}$

## The Equivalence Principle

The equivalence principle is an idea which is used for thought
experiments to equate one situation to another similar situation. The
principle only applies within certain limits, or under certain
conditions.

Two bodies that are moving at the same velocity to each other are
relatively stationary, that is not equivalent to being stationary.
Through the development of this it is shown that an observer moving at
any velocity with an observed body will see the body exactly the same as
if they were actually stationary ( see [3D Demo](#VoxelariumDemo) ).
However, let us consider a more classical example, instead of locking
the observer in a room with no access to the outside, they are freely
able to go to the deck of a ship and observe things. On a boat that is
stationary, let’s say it bobs up and down, and therefore emits waves in
concentric circles around it. When it starts to move, a wake is formed,
and the concentric circles from its bobbing motion are no longer
concentric but are offset. If there were two boats stationary, and one
takes off at some speed, it is illogical to say 'no, I'm not moving,
it's the other boat moving, and it has a wake in front of it'. You can
clearly see that your boat is making a wake, and that the other is still
emitting concentric circles of waves. This is also true of light
traveling at a one-way constant speed in space, that all observers can
agree it is traveling at. A stationary body is one that is still near
where it has previously emitted photons, while a moving body is one that
has changed position from where it has previously emitted photons. This
doesn't remove the idea of a frame being relatively stationary with
another frame, or having a relative velocity to another, but it does
have consequences which will be discussed later. The equivalence
principle will not be used, and further issues will be discussed later.

## Consistency of Physics

There is a postulate of Special Relativity that no experiment to an
isolated experimenter can determine the ambient velocity of the frame.
This idea isolates an experimenter in a box with no ability to take note
of information outside of the box. For example, an experimenter in the
hold of a sea going ship, without senses to the outside world. For an
observer that can look out a window, the aberration of stars and
galaxies will give an idea of direction and speed of motion at
relativistic speeds.

Quoted from Wikipedia: “The [laws of physics](https://en.wikipedia.org/wiki/Laws_of_physics) are [invariant](https://en.wikipedia.org/wiki/Invariant_(physics)) (identical)
in all [inertial frames of reference](https://en.wikipedia.org/wiki/Inertial_frame_of_reference) (that
is, [frames of reference](https://en.wikipedia.org/wiki/Frame_of_reference) with
no [acceleration](https://en.wikipedia.org/wiki/Acceleration)).“

This is essentially true, but like General Relativity modified Newton’s
Gravity, there are certain physics laws that need additional correction
factors.

## Relative Light Speed

Once a photon is emitted, then it is in space and is no longer related
to the body that emitted it. The photon travels at its own constant
speed through space. This means that a photon emitted from the front of
a moving body towards the back, where front and back are determined by
the velocity of the body; the back is moving towards the photon moving
at C with a speed of V, and the light effectively travels at C+V.
Conversely, a photon emitted from the back, and moving towards the front
is moving at C, and the front is moving away from the photon at V, which
gives an effective velocity of C-V; that the photon is never relatively
at the speed of light, unless the body is stationary.

## One Way Constant Speed of Light(C)

Given a propagation speed of C, in a stationary, frictionless, massless
medium, bodies move at various speeds in various directions, or combined
into a single term at a certain velocity. This medium is called space.
Space has no velocity, so there is nothing like length contraction or
time contraction (this is a term that will be defined later) that
applies, the clock in the frame of space ticks at the fastest and
constant rate. This clock may also be called the global clock as opposed
to a local clock on a moving body, or in a local frame.
