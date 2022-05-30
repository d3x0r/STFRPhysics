
# Local Hidden Variable Theory

What is a local hidden variable?  It is a variable that is associated with a particle or photon that is carried with the photon.
This variable may change cyclicly with time; that is it may evolve over a set of possiblities, and return to a known state periodically.

The term originates from EPR vs the specifics of QM and non-locality.

There have been mathematical methods applied to estimate the maximum detectable behaviors from digital hidden variables that may be either -1 or +1 (or 0 and 1; but always a definite result).
[Bell](https://en.wikipedia.org/wiki/Bell%27s_theorem) used a integral of these digital variables, and figured out their limiting curve, and a Quantum Mechicanlically predicted value that differed; 
this can be done with particle detectors at Bell's Experimental Value of +/-60 degrees (or 120 and in a circle).

This LHV is a spin axis, something like a dipole moment, associated with the particle.  When a particle with a spin axis in a certain orientation (A) interacts with a particle detector aligned in another certain orientation (B), then
A  · B, describes the result of such an interaction.  The detector and the local variable together form the result; and the result is not known by the particle ahead of time, but it does have part of the information that produces
a result.

A spin axis is a 3 component vector that includes the spin around the X, Y and Z axii, and the sum of those vectors is a single axis of rotation, scaled by an amount of rotation around that axis; if the components were (0.1, 0.1, 0.1) the resulting
length is pretty short, but the direction is a well defined unit vector when the vector is scaled by the inverse square root of the square sum of the components.  Tnis is also called a normal or normalized unit vector, that's just scaled to 1 using
its own length.


## LHV Setup

There is always near zero correlation between LHV Predicted results and LHV Simulation results.

LHV Simulation is simply comparing if the dot product of vectors is greater than zero. 

The probability for a single detector and single particle is a sphere centered on the origin from -1 to 1, where < 0 indicates inversed result will be received; that is if expecting a up, should expect a down.

The probability of 2 detectors and the same local variable is the ratio of overlaped arcs where the dot product is > 0 for two circles; this ends up being just the ratio of the arcs covered by the angles.  `1-x/(2-x)` is the ratio of correlation; 
where both detections will be aligned vs detections that were expected aligned and were inverted.  The inverse of this is `1-1-x/(2-x)` or `x/(2-x)`. [Live Demo](https://d3x0r.github.io/STFRPhysics/math/indexBellInquality.html)


## Bell's Experiment

There's so many [The Sience Asylum, Bell Theory](https://www.youtube.com/watch?v=hiyKxhETXd8) There was a very recent done; lots can explain this idea.

QM prediction `cos(60 degrees)` = 50% chance or 0.5.  Or that at 60 degrees there's a 50% correlation, and 60 degrees is Bells Test Setting.

LHV prediction `x = 60 *pi/180 * 2/pi  120/180 = 2/3; p=1-(x/(2-x))` = 50% or 0.5.     `1-(2/3/(2-2/3))` = `1-(2/3/(4/3))` = `1-(2/3*(3/4))` = `1-(2/4)` =  0.5.


## CHSH Experiment

https://qubit.guide/9.3-chsh-inequality.html

QM Max correlation `2*sqrt(2)` = 2.828.

LHV Prediction `3*0.8 + 1` = 3.4.  That is to say I can (and did: [CHSH Game](https://d3x0r.github.io/STFRPhysics/math/CHSH_Game.html)) implement a game that two people isolated by distance with an entangled RNG can get 80% correlation on 3 of the 4 choices, and 0% correlation on the last, which is a full point for S: (4/5)+(4/5)+(4/5)+(1-0).

LHV Prediction using CHSH Experimental angles of 0, 22.5, 45, and 67.5 : ( 0.86 + 0.86 + 0.86 - 0.6 )  or (2.58 - 0.6 ) = 3.18;  (still higher than QM prediction).

### Scoring in Game

Scoring is based on a correlator that assumes that more than one type of result is required to actually have a correlation. 

In a sequence of (S)ame and (D)ifferent results, `SDSDSDSD` is 0% correlation.
A sequence `SDDSDDSDD` has a total D of 6, and a count of correlated D's of 3; which is a -50% correlation (or that the correlation is inverted, and for a '+1' should expect a '-1' and vice versa.
This can be accounted for numerically, by computing the minimum of D and S, subtracting the smaller from the larger, and dividing by just the larger.
Subtracting 1 of the results for every smaller result accounts that the first 'D' or 'S' in a sequence doesn't count for the length of correlations.

```
  (1-choices[c][1]/choices[c][0])

1-a/b = b-a/b  

a is the smaller of the differences or sames, b is the larger.

```

The game actually uses a simplified equation, 
because the values of sames and differences aren't setup to have inverse correlations, 
or expecting an inversion in the successful result.

I made this [interactive circle chart](https://d3x0r.github.io/STFRPhysics/math/indexBellInquality2.html)  there's a slider toward the bottom to control the angle of overlap.
The blue wedge compared to the green+blue wedge is what's being measured.

#### working notes of above

22.5 /90 = 0; 0.25; 0.5; 0.75;  `1 - 1/4/(2-1/4)` = `6/7` = 0.85714...

0.75 = `1-3/4/(2-3/4)` = `1-3/5` = 2/5; but as a loss is `1-2/5` = `3/5` = 0.6.  


### CHSH Real Life Comparisons

I have some other tests: [Game Correlation](https://d3x0r.github.io/STFRPhysics/math/indexBellInquality.html), [Stacked Polarizers](https://d3x0r.github.io/STFRPhysics/math/indexBellInquality2.html), having just implemented a stack of polarizers test version to match https://escholarship.org/content/qt2f18n5nk/qt2f18n5nk.pdf?t=p2au19  pages 83-85(ish) are the experimental results.

With a stack of polarizers, the only events that count are those that correlate (make it through both), 
vs the total amount that would normally be received in the same amount of time.   If the photon passes the 
first polarizer, and since there is only a second polarizer, then it doesn't matter if the first polarizer 
modifies the result, it would still be in the same arc as the original input.  This makes the probability of 
making it through both polarizers (pi/2 - x ) / pi  for x in radians.  (90-x)/180 for x in degrees...

Below is the experimental results from the link above, and new LHV predictions to relate... is far off?

```    	                                                    
    experimental   angle              QM pred.  QM/Exp      LHV pred.    LHV/QM    LHV/
    result	                                                                       Exp. Res.
    0.457 ± 0.009 0.00                0.464     1.015       0.5          1.07      1.015
    0.451 ± 0.013 11.25  (0.438)      0.448     0.993       0.4375       0.97      0.97
    0.400 ± 0.007 22.5                0.401     1.003       0.375        0.935     0.935
    0.340 ± 0.010 33.75               0.333     0.979       0.313        0.939     0.92
    0.249 ± 0.007 45                  0.251     1.008       0.250        0.996     1.004
    0.164 ± 0.007 56.25               0.170     1.03        0.1875       1.10      1.14
    0.100 ± 0.003 67.5                0.100     1.0         0.125        1.25      1.25
    0.052 ± 0.004 78.75               0.055     1.058       0.0625       1.13      1.20
    0.041 ± 0.003 90                  0.039     0.951       0.000        100       100
```

My prediction does not account for experimental bias of 1 in 35 counts just happen, or a similar percentage of counts lost.
Non-detection doesn't imply non-correlation, just that something happened that made the possible truth not go through the filter; the polarizers are lossy themselves.

The above comparison shows QM is +/-3% and I'm +25% -8% (the 25% is at low counts, where polarizers are mostly an inverse coorelation).

### CHSH Wikipedia Talk

[Link To Talk](https://en.wikipedia.org/wiki/Talk:CHSH_inequality#CHSH_Game_Implementation_scores_3.40)
It's been contested that my ratio of ratios is wrong, and not the intended result.  I can apply a scalar and offset and correct.

The reported probability is `1/2 cos^2(x)`; which can either be `1/2 g(x)^2` or `(g(2x)+1)/4` as approximations.  Would have to justify 
why this multiplication happens; but here's those graphs.

![graph](math/CHSH_wiki_game.png)

```

https://en.wikipedia.org/wiki/CHSH_inequality#Optimal_quantum_strategy

(for 0 to pi/2, ranges > pi/2 are inverse correlations and ranges < 0 are reflections of > 0 )

cos(x) ~= (1-(x/(pi-x))

A better expression of this is

// perform modulous with floor (amazingly most math programs do mod 'wrong').
mod(x,y)= (x/y-floor(x/y))*y

// this produces the basic saw wave

k(x)=| mod (x+pi/2, pi )- pi/2 |

// this is a sign correction for > pi/2 inverse correlations
m(x)= sign( | mod( x-pi/2,2pi) | - pi )

g(x)= m(x)(pi-2*k(x))/(pi-k(x));


cos(x) ~= g(x)

1/2 cos^2(pi/8)   is like    g(x)^2 / 2 
      and more like (g(2x)+1)/4 

// WHY?  I do not yet know, it just is.  so then measuring QM predictions should match...
(optimal quantum strategy wikipedia page above)
```


## GHZ Experiment

This test passes through a polarizer to align first within 90 degrees, and then tests with the same alignment detector and two other detectors at 45 degrees.  The assumed correlation is that measuring with the center detector aligns the reults for the other
detectors. This does not happen with 100% chance but  [However, we experimentally observed such terms with a fraction of 0.87 +/-0.04  (Fig. 4c), which violates the local realistic](https://web.physics.ucsb.edu/~quopt/ghz.pdf).

GHZ QM predcition - 100% (?) 

GHZ LHV Prediction - 66%+16% = 83.33%  (if the experiemental result is 0.87 minus 0.4, that's 0.83; and within the error bars).





## What are Dimensions?

(sidebar, another view of coordinate systems?)

In 1 Dimension, the length along a line is a a linear dimension.  It doesn't matter what shape the line is in, but it may be convenient to consider it a straight line for now.
There has to be some fixed mark on the line from which the distance is measured; many points along the line have relative distances to each other, and any other point is a valid origin for distance.
There is an amount of twist around the line, without adding another spatial dimension, line-landers will occupy some amount of arc-length or angle, (perhaps called phase?), and relative rotations can 
be measured against other known orientations.  If there's a well defined 0 for some reason, all angled might be based against that.  If the angle that's occupied does not overlap another line-lander they can pass each other
on the line, even if their body is also itself a length, with different amounts of angular occupation along the length in different orientations.

A second orthoganal dimension can be added, relating two of the previously mentioned line dimensions, and providing a 2D surface of X/Y relative positions things can interact with, and the additional rotation angle controls a direction normal
to that surface.  A surface normal is a sort of direction of the surface or orientation; in computer graphics, this is a normal map, which can use two spherical coordinates to represent a direction; which is a combination of the two spins 
of the X and Y lines.

To track a rotation in that plane, a third axis really has to be considered that is perpendicular to the surface itself, and becomes co-incidental with the Z axis when adding another dimension.
The rotation factors of the existing 2 dimensions don't really apply to track the rotation of the object on the plane, but the rotation at every point on the plane; and none of the points on the plane can move off of the plane.

Adding a 3rd dimension, now an X,Y and Z axis (which are, again, aribtrary lines, they don't have to be straight, and later will have to not be straight, but at this point, straight lines can be considered).  This forms a cube of related points
and thre's full freedom to move in any x y or Z diretion, plus at every point in the space there is an orientation to that point, which are the 3 coordinates of rotation associted with each axis.  
Shapes that occupy 3 linear dimensions, also occupy arc still, and additionally can use the same rotation directions to apply to points in the space around a line.  And all of the points around the line are rotated a certain amount
in a certain amount of time, which forms a macroscopic rotation.

These various dimensions can be used in various subsets; complex numbers for example use 3rd spin and first and second x/y location.

The change in orientation of the points in a space can be applied to fixed points in that space, and project how they change in time.  If the points (1,0,0), (0,1,0) and (0,0,1) are all individually rotated by a rotation, then the result
is a new orienation of that frame.  This sort of frame would represent the current X Y and Z axis coordinates, which can be scaled with each new point to find a new location in space.   Matrixes capture this, and represent these three direction
vectors, which, when applied(multiplied) with a point, results with a point in some direction in space.



### Moving Angles (rotations)

Rotations in 3 dimensions may be added together if they all happen at the same time; and any basis vectors Xb, Yb, Zb that are perpendicular in that space may be used scaled appropriately by some related X Y and Z scalars, and added together.

Rotations represent a change in angle over time, so if an object has already elapsed some time, and is at a rotation, applying the next rotation must be an integral including the current rotation which still happens; either the additional
rotation is from an internal source, in which case the relative direction of that force changes in time with the original rotation, or it is external, which changes which direction the current rotation is relative to that external instead.

