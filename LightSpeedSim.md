# Minimized speed of light test

## Demo

[Demo + Special relativity](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed-SR.html)

[Demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed.html) This started with a brute force method of calculating apparent relative position of objects moving at some speed>0. The body emits Red at its head, Green at its center and Blue at its tail.  The emissions then go towards an observer; when they pass the observer, the apparent position is indicated on the reference line.  This also has a function to reverse calculate, and show a computed observed position.

![Screenshot](math/lightSpeed1.jpg)

Sliders allow adjusting `C` or the speed of light, the time scale (run faster/slower), the distance of the observer from the line of the path being observed, velocity of the body moving along a line, Half-Length of the body (a length of 1 is 2, and is center (0) +L and -L); and the run-time... or how far into the past/future the time extends.

The 0 time event is centered on the line, and the simulation starts at -1/2 Run time; or -5 seconds with the default settings.  The default has the velocity at 2 times the speed of light, so for the first 5 seconds, you don't actually see anything, then you see an image of the ship continuing forward, and reverting backward to its source.  Neither of these images travel faster than the speed of light.


## The Math

Each part of the body emits a signal at the position it is, and that signal time to the observer is recorded.

At some time T, a body is at a position VT; the extents of the body are at `(VT+L)` and `(VT-L)`.  
A relatively stationary observer, at some `D` distance from the body; then `Do = sqrt(DD+(VT+L)^2)` is the photon has to travel
to the observer.  `To = sqrt(DD+(VT+L)^2)/C` is the time it takes (the C can be factored into the expression as `C^2`).  (Special case `D=0`,`L=0`, `To = TV/C`).


(correction?) observed at `(VT'+L)/C`. `T' = T \gamma`; `gamma = 1/sqrt(C^2-V^2)`   

The position divided by the speed of light is how long that signal will travel to the observer.  

Observed time of (some position along body L) ( head, center, tail)

$T_O = \frac {\sqrt{{D}^{2}+\left({VT+L}\right)^{2}}} C+T$

Real time observer at time `x` sees (head); should be able to have a function that includes the base time, and the position along the craft to get the following; I asked Wolfram Alpha to solve this... `solve for T  x=sqrt( D^2+(VT+L)^2)/C+T`.

$f(x,L) = \frac{\sqrt{C^{2}D^{2}+C^{2}L^{2}+2C^{2}LVx+V^{2}\left(\ C^{2}x^{2}-D^{2}\right)}+C^{2}x+LV}{C^{2}-V^{2}}
$

The above returns the real time from an observer time `T_O`, and an offset along the body (`L`).  The resulting time times velocity and then add the offset gives the real position of the body seen.  The above reverse equation has a singularity when `C` equals `V`; so this equation is used instead

if (V=C), then `V/C = 1`, so equation 1 simplifies to this...
$T_O = \sqrt{\left(\frac{DD}{CC}+\left(T+\frac{L}{C}\right)^{2}\right)}+T$

And the inverse when (V=C) is this; which has a singullarity when C=0; which is irrelavent, if events don't propagate than they never go anywhere.  When `T_O=-L/C`; `-L/C` is the time the ship if first 'seen'; and is the oldest signal from the ship first; each closer signal has slightly more slope to get to the observer.
$T = \frac {C^2 {T_O}^2 -  D^2 - L^2} {2 C (C {T_O} + L)}$

### Lorentz Problem

This is a more typical example was on Physics Discord...

---

"While you're having breakfast in the morning, a creature in the Andromeda galaxy is doing the same. We call the two breakfast events event X (on Earth) and event Y (in the Andromeda galaxy). "Simultaneously" means simultaneous in your reference frame. If instead we describe the two events in another reference frame, that of a space traveler who is traveling at a very high speed from the Andromeda galaxy towards Earth, which of the following statements is correct?

  A. Event X and event Y are simultaneous.
  B. Event X occurs before event Y.
  C. Event Y occurs before event X.
  D. The question is not well-defined, as we cannot define simultaneity for events that do not occur at the same place in space.


I get that it has something to do with that the traveler is going at relativistic speeds which means things will move slower relative to him. I just don't get how the gamma factor ties in to the problem context"

---

I solved this as above, but assuming that a moving observer would basically see the same times as the other sim (Although, to get a single answer, I had to interpret that the breakfast was simulateous *to 'you' eating breakfast*);
otherwise there are multiple choices.  And even made an image.

![Probability Image](RelativityHomework.png)

Which shows the light cones of the problem, and several observers in different times, all going exactly the same speed (was very careful to copy the lines and not re-draw them); which clearly shows observers that can answer more than one
answer... The conversation continued, and then we have to go learn about the derviation of the Lorentz Transform (including gamme factor); not just the derivation, but the justification of why that math works.

[This demo](https://d3x0r.github.io/STFRPhysics/math/indexLightSpeed2a.html) was revised, to calculate a different projection factor from a large relatively stationary event that occurs at 2 distant places.   (The Half-(L)ength must be large).

There is a triangle, `CT` that is for some time seconds the speed of light long.  Another side is the distance from the observed events (defaults to 1 light second offset, gives the observer some space to avoid planets events might be generated on).
The other side is the current position `A` of the craft relative to an event (the event on the left is `-L` and the event on the right is `L` in terms of the demo), plus the craft's actual postion `VT` or some velocity in time.

$$(CT)^2 = (D)^2 + (A+VT)^2$$ 

solved for T...

$X=((TV)- (+L))$

$\frac {AV+ \sqrt { X^2C^2+D^2(C^2-V^2)}} {C^2-V^2}$

$\frac {((TV)- (+L))V+ \sqrt { (((TV)- (+L)))^2C^2+D^2(C^2-V^2)}} {C^2-V^2}$
 
$\frac {(TV-L)(V+C)} {C^2-V^2}$

$X = TV $

$\frac {(X-L)(V+C)} {C^2-V^2}$

This is getting closer to the lorentz transform than the above... but still to use this time span, it has to be added to the current time `T`...

``` js
	hLen = /* time until light emission from head and ship intersect*/ A=TV-L
		// f(T,TV-L)
	tLen = /* time until light emission from tail and ship intersect*/ A=TV-(-L)
		// f(T,TV-(-L))

		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.Pc = Treal*V;
		// position head intersects observer
		frame.Ph = frame.Pc + hLen*V;
		frame.Pt = frame.Pc + tLen*V;
		frame.T_start = Treal;

		// time head intersects observer
		frame.T_see_h = Treal+hLen;
		
		// time tail intersects observer
		frame.T_see_t = Treal+tLen;

```


(Note sections are potentially incomplete/inaccurate).

## Generalized to a 3D coordinate, which then orientation vs the observer matters.

For a more general 3D case, with Y aligned with direction of D to path; Z aligned perpendiculat to the line, and X aligned with the original L direction on the line.

$$ T_O=\sqrt{( Z*Z + (D+Y)*(D+Y) + ((T) + A)^2 )/C}+T;$$

The inverse (except where C=V)

$$ \frac { \sqrt{(-2XV-2C{T_O})^2 - 4\left(C^2-V^2\right)\left( -X^2 + C^2{T_O}^2 - D^2 -2DY - Y^2 - Z^2\right) }  + 2XV + 2C^2{T_O} } { 2\left(C^2-V^2\right) } $$

Special case 3D formula for V=C (bad variable subsittution?), 

$$ {T_O}=\sqrt{( Z*Z/(C*C) + ((D+Y)*(D+Y))/(C*C) + ((T) + A/C)^2 )}+T;$$

Gives this formula for the inverse calulation at V=C

$$ T = \frac { X^2 - C^2{T_O}^2 + D^2 + 2DY + YY + ZZ } { C(2A+2C{T_O}) }$$

## Time Dilation 
According to special relativity

(?) = m-m/s-s-s-s - m-m/s-s
$$ \Delta s^{2}\,=\,c^{2}\Delta t^{2}-\Delta x^{2}$$


Speed Scalar (Real to observed)

$$ T_S(x) = \frac {x} {\sqrt { CC-xx }} $$

Speed Scalar (observed to Real)

$$ T_R(x) = \frac {Cx} {\sqrt{xx+1 } } $$

Time scalar (observed velocity to real time scalar)

$$ \sqrt{CC - T_R(x)^2}$$

$$ \sqrt{CC - \frac {CCxx} {xx+1}} = C/\sqrt{(xx+1)}$$

## STFR Take on it

$$\theta = angle-in-cycles$$
Lambda is the unit cycles
$$\Lambda$$

frequency(phi) * wavelength(omega) = speed of light
$$\phi\omega = \frac \Lambda s * \frac m \Lambda = c $$
arc length is cylces per second times meters per cycle.  
$$ arc-length = \frac m \Lambda * \frac \Lambda s $$sqrt( Spin in arc-length squared plus velocity squared ) = speed of light
$$\sqrt {S^2  + V^2} = c  $$

a = sqrt( cc - at at ); v = at
v = at
p = 1/2 at^2 + vt 



### Dev Notes

( incomplete sentence fragments follow.  This was setting up how to think about the points... )
a craft that is 3 long (-1,0,1) is moving along.

at any given time T the craft is a color that  cycles through colors by changing the hue.
(maybe the brightness/saturation can be scaled for distance? no?)

at some time T=1, the craft is centered on 2, and its color is green(or subgradient from red to green).   The observer is 1 unit away  from the point 0 that is centered... so 
at 0, the craft is seen 1 second after where it is, as red.


|T|  a| p | ends| observer|
|---|---|---|---|---|
| -1 | red | 0 |  -1,1| (observes pre-time) |
| 0 | green | 0 |  -1,1| (observes pre-time) |
|1 | blue | 2 | 1,3|   observes green-red, green-red past time positions other than the center |
| 2 | red | 4 | 3,5|  1.414 seconds for tail(partially red-green at +1 tick) and sqrt(10)=3.16 to see the front) |
| 3 | green | 6 | 5,7| 

so at T=2, the observer needs to know how far the ship would have gone to have a light line that is 2 long.

(center-tail)
$$t*t = (x+vt)^2 + d^2$$
$$ \sqrt(t^2-d^2)-vt=x $$

at T=1 I do see the center at 0, but the front would be from a time in the past... so it wouldn't be where it is, based on its velocity.... because when I do see it at T=1.414 both the head and tail are in the same (correct 1:1 ratio) position... and green.



At some time T<0, the front of the space craft would have been seen at T=1 ... T=-0.1  H= c+h+vt; 
A=time 
B=time offset

A+B=1

(A+B) = 
c+h+vB ; c+h+v(T-A)


FTL condition...
T=-1; observer won't see anything, until after 0 (get hit with the bullet before seeing it).
T=0; observer doesn't see anything
T=0.5; observer sees nose of craft pass 0 point.
T=1, observer sees the craft center pass the 0 point. (some time before 1 it can see some thing?)
T=1.5, observer sees tail of craft pass 0 point.

T= 2, observer sees the craft receeding where it came from, and where it's going to; but slower than the craft actually goes. light from the past is finally getting to this point

STL condition...
T=-1; observer sees at a distance; all of the images will be superimposed on each other... 
T=0; 
T=1; observer sees the craft center at 0
T=2, observer sees the craft past the center, all light from past is gone

T=-0.5, H=0, and is 1 second away; but this will appear at 0.5 then, so 0.5 seconds after need 
T=-0.3, H = (C+H+VT)
T=0.5, T=0, and is 1 second away.

I can scale the X into a total time.
How do I find out when the Head is seen at a time T?  The time T at say 1.1 



1) real position of the object
2) apparent position of the object (1 second later)


sqrt( xx - CC) = +/- numberline seen at some time given C propagation

when head is at that number... sqrt( (x+h)^2 - CC ) = +/-


v=2 (2x speed of light)
d=1 (closest distance)
c=1 (speed of light)
T_r = sqrt( xx+dd/cc )

X_r = +/- sqrt( xx - dd/cc )

T=0 does not see anything on line... 
T_1=D/C first instanct closest point can be seen.

T_1 + 0.1 can see  

X_r(T_1+0.1) is a spot I see.
The ships front was at that spot at (C+H+v)
P_h=tv+1; T=(P_h-1)/v

?? X_r(T_1+0.1) = (P_h-1)/v  

T=x


$$(L V + C^2 x - sqrt(C^2 D^2 + C^2 L^2 - D^2 V^2 + 2 C^2 L V x + C^2 V^2 x^2))/(C^2 - V^2)) $$

$$(C^2 (1 - (V (L + V x))/sqrt(C^2 (D^2 + (L + V x)^2) - D^2 V^2)))/(C^2 - V^2)$$


---
# SR Devnotes

'if two observers have clocks, and are in motion relative to one another at high velocities, then each should see the other's time as moving slower than theirs. when they meet back up, what determines which observer's clock has ticked more?'  from a user on physics discord.. 

"depends on whether they are approaching or leaving each other whether they see clocks tick faster or slower; a rule I saw someone say was the one that accelerated more will have the slower clock (much like someone deeper in a gravity well has a slower clock and feels like there's more acceleration).   " ... 

and then I could continue on... but this is only a bit of it
" If one was travelling towards the other at the speed of light, then all of its clock ticks would be seen at once which makes for seeing a very fast clock.  (although if they are each going 1/2 the speed of light toward each other, then the light has time to travel away and ahead of each, so you don't see all ticks at once).  "

Because then, with SR, the lightspeed craft has 0 ticks, and the clock doesn't 'go' and the stationary observer sees for all time that it was the same tick until some point before the craft was AT light speed.

But then shifting the problem, they are each `sqrt(2)/2`  for their time scalar, so I should then apply that to when ticks are emitted from their clocks (in theory each tick generates a photon that can be seen at some point in the future...)

At emmision, the photon source knows its position, and it is treated as a stationary point, and the other end is the difference in velocities to calculate where the light has to go, to know how long the light will take to get to be seen....

'ticks in the air'  is really where the missing information on the clocks goes, other than when a clock is also retarded.  Tron experiment, it was decided that the slowest clock would be used as the tick rate for the game;   This means in terms of the simulator, players that are going slower than the fastest player goes even slower....  The world clock ticks VERY fast overall though.

### Tron-lightcycles

There's several frames of importance - the arena, and the people in it, and each player's local frame.

A player going 0.707x LS  means the world is 1.414x faster (vendors in the stands would rush around)   
A player going 0.894x LS means the world is 2x faster(?) not really - but the player is feeling like 2x the speed of light.   so anything from light sources is received 2x as fast?  Then how is the other 1.414x at 1x speed of light?


## math/indexLightSpeed-SR.html

Initial conditions...
1) both bodies start at some negative time T such that at T=0 both observe a signal sent from the other (including offset between them).
2)  `T=Math.sqrt( (D*D)/(C*C) / (C*C-V*V));` given V=Real velocity (sublight).
3) the next signal they emit will be ... 



