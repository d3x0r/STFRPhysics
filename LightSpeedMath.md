
Reference Frame network(?) is a related set of reference frames.

For ease and simplification, frames that are in other frames move exactly with the outer frame.  They are assumed that whatever makes them in that frame is rigid within the forces expected; further investigation into details might make some of the bodies less rigid by moving them to attached, but not 'in'.  Bodes that are in may change position relative to their immediate parent reference frame, but they are represented implicitly and explicitly relative to their parent frame.  They may within that frame also be relative to other things, and indirectly even further away may be relative to another frame in a child of a grand-parent frame.

Frames are not restricted to any coordinate system or metric.  They might be described using rulers and protractors, or something more basic like three dimensional position and rotation vectors at some time.  This gives at least 7 coordinates to describe a frame.

## Some initial givens...

A point observed on a body that emits an event is represented by $\vec{X_{E}} + T_{E}\vec{V_{E}}$ where $\vec{X_{E}}$ is the position on the body that emitted a signal (emitter), $\vec{V_{E}}$ is the velocity of the body(This relates to a changing position of the body, and where it was when it emitted a signal), $T_E$ is a time in the frame of space of the emitter (it is an un-contracted time).

The point representing an observer is $\vec{X_{O}} + T_{O}\vec{V_{O}}$ where $\vec{X_{O}}$ is the observer’s position in the observing frame, $\vec{V_{O}}$ is the velocity of the observer's frame, and $T_O$ is a time in the frame of space which the observer sees the event.

The time of observation may be decomposed into the base time of emission plus time delta to observation: $T_O= T_E + T_{\Delta O}$. In practice, computing the delta time just adds an additional step of adding the base time; but the math for just delta solve is easier.

$$
T_{O} = \frac{\left\| \left( \vec{X_{O}} + T_{O}\vec{V_{O}} \right) - \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) \right\|}{C} + T_{E} 
$$

or

$$
T_{\Delta O} = \frac{\left\| \left( \vec{X_{O}} + \left(T_{E}+T_{\Delta O}\right)\vec{V_{O}} - \left( \vec{X_{E}} + T_{E}\vec{V_{E}} \right) \right) \right\|}{C} 
$$

Although - which side Emitter or Observer is subtracted from the other, the overall magnitude of the vector will be the same.

${P}$ has been the symbol used for the base position.  

$$\vec{P}=\vec{X_O}+T_E \vec{V_O} - \vec{X_E} - T_E \vec{V_E}$$

$\vec{P}$ is all of the terms in the magnitude expression that do not include $T_{\Delta O}$.   Its the difference in positions, plus the initial velocity for the emitter at the time a signal was emitted.

$$
T_{\Delta O} = \frac{\left\| \vec{P} + T_{\Delta O}\vec{V_{O}} \right\|}{C} 
$$

Which simplifies to a position plus a change in position for the velocity times the delta time.  

Solves to become:

$$
 {T_{\Delta O}} =\frac{\sqrt{ {\left({\vec{P}\vec{V_O}}\right)^2+(C^2 -{V_O}^2)  {V_O}^2}  } +\vec{P}\vec{V_O} }{{C^2 -{V_O}^2}} 
$$

A term $D$ can be defined which is $\left(C^2-{\vec{V_O}}^2\right)$...

$$
 {T_{\Delta O}} =\frac{\sqrt{ {\left({\vec{P}\cdot\vec{V_O}}\right)^2 + D\vec{V_O}^2}  } + \vec{P}\vec{V_O} }{D} 
$$
## 1D Bad Math Solve

In one dimension, $|X|=X$ or $|X|=\{X<0:-X,X\}$; not $|X|=\sqrt{X^2}$, which is what it would be if X is a vector and not a simple scalar.  The square root of the square also performs an absolute value, since the time of observation is always after the time of emission, the negative solution is usually disregarded;  If the observed body is travelling faster than the speed of light, the the negative square root solution should also be considered, since there is the possibility of seeing the craft is more than 1 and no more than 2 places at once.  The observation of their craft is a shadow of the craft and you can never interact with it, the craft will have already left the space you see the craft in... in order to interact one would have to lead the target, and project where they should be.

But, in the argument that solving t=sqrt( (a+bt)^2 ) should be hard, assume everything is a simple scalar, and b=v, a=p, c is an extra term, and t delta=t....  

$$ T_{\Delta}=\frac{P+V_OT_{\Delta}}{C}$$

$$ T_{\Delta}C-V_OT_{\Delta}={P}$$

$$ T_{\Delta}(C-V_O)={P}$$

$$ T_{\Delta}=\frac{P}{C-V_O}$$

$P=X_O-X_E+V_ET_E$

$$T_{\Delta} = \frac {X_O-X_E+V_ET_E} {C-V_O}$$

Then in theory the above is the solution for $T_{\Delta}$, or how much time elapses before event at $X_E$ is observed at $X_O$, with each having their own velocity vectors.

$$ {T_{\Delta}}^2C^2={P^2+2PV_OT_{\Delta}+{V_O}^2{T_{\Delta}}^2}$$

$$ {T_{\Delta}}^2(C^2 -{V_O}^2) - 2PV_OT_{\Delta}={P^2}$$

$D=C^2-{V_O}^2$

$$ ({T_{\Delta}}\sqrt{D} - \frac{PV_O}{\sqrt{D}})^2 - \frac{P^2{V_O}^2}{D}={P^2}$$

$$ {T_{\Delta}}\sqrt{D} =\sqrt{{P^2} + \frac{P^2{V_O}^2}{D} } + \frac{PV_O}{\sqrt{D}} $$

$$ {T_{\Delta}} =\frac {1}{\sqrt{D}} \cdot \left(\sqrt{\frac{DP^2}{D} + \frac{{P^2V_O}^2}{D} } + \frac{PV_O}{\sqrt{D}}\right) $$


$$ {T_{\Delta}} =\sqrt{ \frac{P^2D+{P^2V_O}^2}{D^2} } + \frac{PV_O}{{D}} $$

$$ {T_{\Delta}} =\frac {\sqrt{ {P^2\left(D+{V_O}^2\right)} } + {PV_O}}{{D}} $$

$$ {T_{\Delta}} =\frac{\sqrt{ {P^2\left( C^2 -{V_O}^2 + {V_O}^2\right)}  } + PV_O }{{C^2 -{V_O}^2}} $$

or

Can't simplify the square-root, because P is a vector and C is a constant; unless 1D
$$ {T_{\Delta}} =\frac{\sqrt{ {P^2 C^2 }  } + PV_O }{{C^2 -{V_O}^2}} $$

$$ {T_{\Delta}} =\frac{  P( C + V_O) }{{C^2 -{V_O}^2}} $$

$$ {T_{\Delta}} =\frac{  P }{{C -{V_O}}} $$


vs

$$ T_{\Delta}=\frac{P}{C-V_O}$$


$$ T_{\Delta}C-V_OT_{\Delta}={P}$$


$$ T_{\Delta}C-V_OT_{\Delta}={P}$$



### Solve with Vectors

$$ T_{\Delta}=\frac{\left|\left|\vec{P}+\vec{V_O}T_{\Delta}\right|\right|}{C}$$

becomes:

$$ T_{\Delta}=\frac{\sqrt{\left(\vec{P}+\vec{V_O}T_{\Delta}\right)^2}}{C}$$

again - at this point, it would seem logical to reduce the sqrt(x^2) to x, however, what you end up with then is a vector for a time, an time is only ever a scalar;  So you need to at least do the dot product of the vector result of $(\vec{P}+\vec{V_O}T_{\Delta})$, which is represented by a square of the vector, which results in a scalar, but that scalar has to have the square root taken.  So in this case the sqrt(x^2) also reduces the vector to a simple scalar.

$$ T_{\Delta}^2C^2 ={{\left(\vec{P}+\vec{V_O}T_{\Delta}\right)^2}}$$

$$ {T_{\Delta}}^2C^2 ={{{\vec{P}}^2+2\vec{P}\vec{V_O}T_{\Delta}+{\vec{V_O}}^2{T_{\Delta}}^2 }}$$


## Length Contraction 

Given a point $\vec{X}$, and a velocity vector $\vec{V}$, and a speed of light $c$
(Length contraction is more complicated than this see below...)
classically gamma : $\gamma$ is defined as $\frac 1 {\sqrt{1-\frac{vv}{cc}}}$ or ${\beta} = \frac v c$, and $\frac 1 {\sqrt{1-{\beta} ^2}}$  also: $\frac c {\sqrt{c^2-v^2}}$.

${\Gamma} = \frac 1 {\gamma} = \frac {\sqrt{CC-VV}} {C} = {\sqrt{1-\frac{VV}{CC}}}$
Wikipedia says 'some authors define the reciprocal...' as alpha
${\alpha}={\Gamma}$

$1-{\alpha}$ = how much length is removed at some speed V.

$1-{\alpha} = ( 1 - \sqrt { 1 - \frac {\left|\vec{V}\right|^2} {c^2} } )$

---

The remaining factors  in the below project the position on the velocity, and scale that projection and velocity vector to a unit vector in the direction of velocity, which is then scaled by how much to remove in order to contract the length, and subtract that from the position.  Since only some of the components of X change, have to use the majority position of X as the basis, and subtracting one minus ${\Gamma}$ times the part projected on velocity removes a small amount near V=0 and a large part when V approaches C.
$$\vec{X'} = \vec{X} -\frac {\vec{V}(\vec{V}\cdot \vec{X})} {\left|\left|\vec{V}\right|\right|^2} ( 1 - \sqrt { 1 - \frac {\left|\vec{V}\right|^2} {c^2} } )$$

This refactors the gamma term slightly to bring back C instead of 1. 
$$\vec{X'} = \vec{X} -\frac {\vec{V}\left(\vec{V}\cdot X\right)} {\left|\vec{V}\right|^2} \frac{ c -  \sqrt { c^2 - {|V|^2}  } } c$$


### Length Contraction Derivation

$\vec{X}$ dot $\vec{V}$ is the amount of the position from the origin which is along the length vector. This has to be divided by the length of V to normalize the vector to be a direction.   Scaling $\vec{V}$, which is also scaled by the length of $\vec V$ to a direction vector, by $\vec{X}$ dot $\vec{V}$ gives how much of $\vec{X}$ in the direction of $\vec{V}$.  

Subtracting the above quantity from the position gives  the adjusted position.

## Light Aberration

### From Points Rotate Point (2D)

Given a points $\vec{X_o}$ and $\vec{X}$, and a velocity vector $\vec{V}$


$$\vec{dX} = ( \vec{X} - \vec{X_o} )$$

$${cosvdot} = \frac { \vec{dX} \cdot \vec{V} } { ||\vec{dX}|| \cdot ||\vec{V}|| }$$

$$dA = \cos^{-1} \left( cosvdot + \frac { \frac {|V|} c } { 1+ {cosvdot}  \frac {|V|} c}   \right) - cos^{-1}(cosvdot)$$

2D rotation

$$\vec{X'} = \vec{X_o} + \vec{dX}\cdot\cos(dA) + \sin(dA)\cdot( \vec{dX} \times \vec{V}) \vec{V}$$

## Time Contraction
This is the long part of a sideways photon clock basically.  It's not just that the photon has to travel diagonally 1 unit for every unit forward, thereby being at the speed of light, and only having to go diagonal 1.414, the more it goes forward, the less it goes sideways, so at the speed of light the travel time is infinite, since any additional sideways motion would mean the thing was going slower than the speed of light.  So the triangle starts with a side as $V$ for velocity from 0 to C, the hypotenuse is C always, and the remaining side of the triangle is sqrt{CC - VV}.  V can never be greater than C, because C can't cover more than ${C_L}$ amount of space in any amount of time.
Then we want this to be a simple ratio to scale time, so we scale from 0 to C to 0 to 1, and get a contraction factor:

This is the same $\alpha$ or $\frac 1 {\gamma}$ factor as found above, but for different reasons.
$$\frac{\sqrt{C^2 - \vec{V}\cdot\vec{V}}} {C}$$
Given time contraction doesn't affect the velocity of the body, the observed velocity would be affected.  As the clock slows down, than the amount of space being covered per time unit would seem to increase.  An observer going 0.707c feels like they are going 1c, because their clocks are ticking as 1 second in 1.414 real seconds, they cover 1.414 real seconds at 0.707 and find they have covered 1 light-second in 1 second by their local clock.

for speed V, the feels like speed = $\frac V {\gamma}$ or $\alpha V$.  But, more interestingly, an observer that feels like they are going x times the speed of light is really going $\frac {xC} {\sqrt{C^2+x^2}}$ .    

$$\gamma = \frac{\sqrt{cc-xx}}{c}$$

$$\frac {V}{\gamma} = \frac{xc}{\sqrt{cc-xx}}$$

Feels-like V = real speed X fraction of C.

$$v = \frac{xc}{\sqrt{cc-xx}}$$

$$vv=\frac{xxcc}{cc-xx}$$

$$vv(cc-xx) = xxcc$$
$$vvcc = xx(cc+vv)$$

$$\frac{vvcc}{cc+vv}=xx$$

Real speed x (fraction of speed of light) = feels-like 'v'.  

$$\frac {vc}{\sqrt{cc+vv}}=x$$



## Light Propagation

$$T_O = T_E + \frac {\left|(\vec{X_O} + \vec{V_O}T_O) - (\vec{X_E}+ \vec{V_E}T_E)\right|} {C}$$
$$T_O=T_E+T_{\Delta O}$$
$$T_E=T_O-T_{\Delta E}$$

## Solve T_delta from T_e

$$T_{\Delta} = \frac {\left|(\vec{X_O} + \vec{V_O}(T_E+T_{\Delta}) - (\vec{X_E}+ \vec{V_E}T_E)\right|} {C}$$


$$T_{\Delta} = \frac {\sqrt{ \left((\vec{X_O} + \vec{V_O}(T_E+T_{\Delta}) - (\vec{X_E}+ \vec{V_E}T_E)\right)^2}} {C}$$

$$ (T_{\Delta}C)^2 = {{ \left((\vec{X_O} + \vec{V_O}(T_E+T_{\Delta}) - (\vec{X_E}+ \vec{V_E}T_E)\right)^2}} $$

Rather than taking the square root of both sides, have to keep the square so the vectors become scalars via dot products....
$$ (T_{\Delta}C)^2 = {{ \left(\left( \vec{X_O} + \vec{V_O}(T_E+T_{\Delta})\right) - (\vec{X_E}+ \vec{V_E}T_E)\right)^2}} $$

### This is wrong - why is it wrong?
$$ T_{\Delta} = \frac { \vec{X_O}- \vec{X_E} + \left(\vec{V_O} - \vec{V_E}\right)T_E } { C-\vec{V_O} }$$

$$\vec{P_E}=\vec{X_O}+\vec{V_O}T_E-(\vec{X_E}+\vec{V_E}T_E) $$
$$T_{\Delta} = \frac {\left|(\vec{X_O} + \vec{V_O}(T_E+T_{\Delta}) - (\vec{X_E}+ \vec{V_E}T_E)\right|} {C}$$


$$T_{\Delta} = \frac {\left|\vec{P_E}+\vec{V_O}T_{\Delta}\right|} {C}$$

$$T_{\Delta}T_{\Delta}CC =  { \vec{P_E}\vec{P_E}+2\vec{P_E}\vec{V_O}T_{\Delta} +\vec{V_O}T_{\Delta}\vec{V_O}T_{\Delta} }$$

$$T_{\Delta}T_{\Delta}(CC-\vec{V_O}\vec{V_O})-2\vec{P_E}\vec{V_O}T_{\Delta} =  { \vec{P_E}\vec{P_E} }$$

$$( T_{\Delta}T_{\Delta}(CC-\vec{V_O}\vec{V_O})-2\vec{P_E}\vec{V_O}T_{\Delta} =  { \vec{P_E}\vec{P_E} }$$


$$\left( \sqrt{(CC-\vec{V_O}\vec{V_O})} T_{\Delta}- \frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}} \right)^2 - \left(\frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}}\right)^2 =  { \vec{P_E}\vec{P_E} }$$


$$(  T_{\Delta} )  = \frac { \sqrt{{ \vec{P_E}\vec{P_E} } + - \left(\frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}}\right)^2} + \frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}} } {\sqrt{(CC-\vec{V_O}\vec{V_O})}}$$

$$(  T_{\Delta} )  = \frac { \sqrt{{ \vec{P_E}\vec{P_E} } + - \left(\frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}}\right)^2} + \frac{\vec{P_E}\vec{V_O}}{\sqrt{CC-VV}} } {\sqrt{(CC-\vec{V_O}\vec{V_O})}}$$

Setup some partial expressions... 

## Solve T_o from T_e
---
solve time observed from time emitted
$$\vec{P_E} = \vec{X_O}-(\vec{X_E}+\vec{V_E}T_E)$$

$$T_{E} = T_O - \frac {\left|\vec{P_E}+\vec{V_O}T_O\right|} {C}$$

---
solve time emitted from time observed

$$\vec{P_O} = \vec{X_O}+\vec{V_O}T_O-\vec{X_E}$$

$$T_{O} = T_E + \frac {\left|\vec{P_O}+\vec{V_E}T_E\right|} {C}$$
Convert length expression to sqrt(length^2)
$$T_{O} = T_E + \frac {\sqrt{\left(\vec{P_O}+\vec{V_E}T_E\right)^2}} {C}$$
Move Te, and C
$$C(T_{O}-T_E) =   {\sqrt{\left(\vec{P_O}+\vec{V_E}T_E\right)^2}} $$

Square both sides, and expand squared expressions
$$CC(T_{O}^2-2T_{O}T_{E}+T_E^2) =   {{\vec{P_O}\vec{P_O}+2\vec{P_O}\vec{V_E}T_E + \vec{V_E}T_E\vec{V_E}T_E}} $$
move Te terms to the left, and To Terms to the right
$$ T_E^2(CC-\vec{V_E}\vec{V_E}) -2T_{E}(CCT_{O} -\vec{P_O}\vec{V_E}) =    {{\vec{P_O}\vec{P_O} }} -CCT_{O}^2 $$

split on multiple lines...

$$ \begin{array}{}
\left(T_E\sqrt{(CC-\vec{V_E}\vec{V_E})} - \\
\frac{CCT_{O} -\vec{P_O}\vec{V_E}}{\sqrt{(CC-\vec{V_E}\vec{V_E})}}\right)^2 \\
-\frac {\left(CCT_O-\vec{P_O}\vec{V_E}\right)^2}{CC-\vec{V_E}\vec{V_E}} \\
=  {{\vec{P_O}\vec{P_O} }}  -CCT_{O}^2 
\end{array}
$$

Define partial term to simplify some expressions:

$$D_E = CC-\vec{V_E}\vec{V_E}$$


$$ \begin{array}{}
\left(T_E\sqrt{{D_E}} - \\
\frac{CCT_{O} -\vec{P_O}\vec{V_E}}{\sqrt{{D_E}}}\right)^2 \\
-\frac {\left(CCT_O-\vec{P_O}\vec{V_E}\right)^2}{{D_E}} \\
=  {{\vec{P_O}\vec{P_O} }}  -CCT_{O}^2 
\end{array}
$$


$$ \begin{array}{}
T_E\sqrt{{D_E}} - \frac{CCT_{O} -\vec{P_O}\vec{V_E}}{\sqrt{{D_E}}} \\
= \sqrt \frac {( {{\vec{P_O}\vec{P_O} }}  -CCT_{O}^2){D_E} +\left(CCT_O-\vec{P_O}\vec{V_E}\right)^2}{{D_E}}
\end{array}
$$


$$ \begin{array}{}
T_E\sqrt{{D_E}} \\
= \sqrt \frac {( {{\vec{P_O}\vec{P_O} }}  -CCT_{O}^2){D_E} +\left(CCT_O-\vec{P_O}\vec{V_E}\right)^2}{{D_E}} + \frac{CCT_{O} -\vec{P_O}\vec{V_E}}{\sqrt{{D_E}}}
\end{array}
$$

$$T_E  = \frac { \sqrt  {( {({\vec{X_O}+\vec{V_O}T_O-\vec{X_E})^2 }}  -CCT_{O}^2){D_E} +\left(CCT_O-(\vec{X_O}+\vec{V_O}T_O-\vec{X_E})\vec{V_E}\right)^2} + {CCT_{O} -(\vec{X_O}+\vec{V_O}T_O-\vec{X_E})\vec{V_E}}}{D_E}$$





---
$$ T_{\Delta}=\frac{\left|\vec{P_O}+V_OT_{\Delta}\right|}{C}$$

$$ T_{\Delta}=\frac{\sqrt{{\vec{P_O}\vec{P_O}(CC)} }+\vec{V_O}\vec{P_O} }{CC-\vec{V_O}\vec{V_O}}$$

Expand length expression and square both sides.

$$ T_{\Delta}T_{\Delta}{C}{C}={\vec{P_O}\vec{P_O}+2V_O\vec{P_O}T_{\Delta} + V_OV_OT_{\Delta}T_{\Delta}}$$

move T_delta terms to the left.

$$ T_{\Delta}T_{\Delta}({C}{C}- \vec{V_O}\vec{V_O}) -2\vec{V_O}\vec{P_O}T_{\Delta} ={\vec{P_O}\vec{P_O} }$$

Replace CC-VV with a 'D' expression.

$D=CC-\vec{V_O}\vec{V_O}$

Find perfect square of T_delta terms, and remove the extra term that gets created.

$$ \left(T_{\Delta}\sqrt{D } - \frac{\vec{V_O}\vec{P_O}}{\sqrt{D}}\right)^2 -\frac{\vec{V_O}\vec{V_O}\vec{P_O}\vec{P_O}}{D}={\vec{P_O}\vec{P_O} }$$

move non-tdelta to the right, take square root, divide both sides by sqrt(d) to isolate T_Delta result.

$$ T_{\Delta}=\frac{\sqrt{\vec{P_O}\vec{P_O} +\frac{\vec{V_O}\vec{V_O}\vec{P_O}\vec{P_O}}{D} }}{\sqrt{D}} + \frac{\vec{V_O}\vec{P_O}}{D}$$

$$ T_{\Delta}=\frac{\sqrt{\frac{\vec{P_O}\vec{P_O}( D+\vec{V_O}\vec{V_O})}{D} }}{\sqrt{D}} + \frac{\vec{V_O}\vec{P_O}}{D}$$

$$ T_{\Delta}=\frac{\sqrt{{\vec{P_O}\vec{P_O}(CC)} }+\vec{V_O}\vec{P_O} }{D}$$


Bring back the position term with initial time in it.

$$\vec{P_O} = \vec{X_O}+\vec{V_O}T_E-(\vec{X_E}+\vec{V_E}T_E)$$





$$T_E=\frac{\sqrt{(C^2T_O+\vec{V_E}\vec{P_O})^2 - (C^2-\vec{V_E}\vec{V_E})(C^2T_O-\vec{P_O}\vec{P_O})}+C^2T_O+\vec{V_E}\vec{P_O}}{C^2-\vec{V_E}\vec{V_E}}$$

$$A_E=C^2{T_O}^2 - \vec{P_O}\vec{P_O}$$
$$B_E=C^2T_O+\vec{V_E}\vec{P_O}$$
$$D_E=C^2  - \vec{V_E}\vec{V_E}$$
$$T_E=\frac{\sqrt{{B_E}^2-D_EA_E}+B_E} {D_E}$$
---
$$\vec{P_E} = \vec{X_E}+\vec{V_E}T_E-\vec{X_O}$$
$$ T_O=T_E+\frac{|\vec{P_E}-V_OT_O|}{C}$$

$$T_O=\frac{\sqrt{(C^2T_E+\vec{P_E}\vec{V_O})^2 - (C^2-\vec{V_O}^2)(C^2{T_E}^2-\vec{P_E}\vec{P_E})}+C^2T_E+\vec{P_E}\vec{V_O}}{CC-\vec{V_O}\vec{V_O}}$$

$$A_O=C^2T_E^2-\vec{P_E}\vec{P_E}$$
$$B_O=C^2T_E+\vec{V_O}\vec{P_E}$$
$$\vec{D_O}=C^2-\vec{V_O}\vec{V_O}$$
$$T_O=\frac{\sqrt{{B_O}^2-D_OA_O}+B_O}{D_O}$$

---
## Two-way light propagation  (at 2 speed of C)

$$T_O = T_E + \frac {|(\vec{X_E} + \vec{V_E}T_E) - (\vec{X_O}+ \vec{V_O}T_O)|} {C}$$

$$T_O = T_E + \frac {|(\vec{X_E} + \vec{V_E}T_E) - (\vec{X_O}+ \vec{V_O}T_O)|} {C}$$

$$T_E=\frac{\sqrt{(C^2T_O+\vec{V_E}\vec{P_O})^2 - (C^2-\vec{V_E}\vec{V_E})(C^2T_O-\vec{P_O}\vec{P_O})}+C^2T_O+\vec{V_E}\vec{P_O}}{C^2-\vec{V_E}\vec{V_E}}$$
$$T_O=\frac{\sqrt{{B_O}^2-D_OA_O}+B_O}{D_O}$$


$$\vec{P_E} = \vec{X_E}+\vec{V_E}T_E-\vec{X_O}$$
$$B_O=C^2T_E+\vec{V_O}\vec{P_E}$$
$$\vec{D_O}=C^2-\vec{V_O}\vec{V_O}$$

$$T_E=\frac{\sqrt{{B_E}^2-D_EA_E}+B_E} {D_E}$$
P_a = X_a + V_at_x-Xb
$T_1$ = time from A to B.
A = 
from here to there.  T_o = T_2


$$T_B = T_O + \frac {|(\vec{X_A} + \vec{V_A}T_O) - (\vec{X_B}+ \vec{V_B}T_B)|} {C}$$
$$T_E=\frac{\sqrt{{B_E}^2-D_EA_E}+B_E} {D_E}$$

$$T_B=\frac{\sqrt{(C^2T_O+\vec{P_E}\vec{V_O})^2 - (C^2-\vec{V_O}^2)(C^2{T_O}^2-\vec{P_E}\vec{P_E})}+C^2T_O+\vec{P_E}\vec{V_O}}{CC-\vec{V_O}\vec{V_O}}$$


A = T_b-T_o

T_O += A
T_E += A

$$T_C=\frac{\sqrt{(C^2T_B+\vec{P_E}\vec{V_O})^2 - (C^2-\vec{V_O}^2)(C^2{T_B}^2-\vec{P_E}\vec{P_E})}+C^2T_B+\vec{P_E}\vec{V_O}}{CC-\vec{V_O}\vec{V_O}}$$

B = T_c-T_b

T_O += B
T_E += B


$$T_B=\frac{\sqrt{(C^2T_O+\vec{P_E}\vec{V_O})^2 - (C^2-\vec{V_O}^2)(C^2{T_O}^2-\vec{P_E}\vec{P_E})}+C^2T_O+\vec{P_E}\vec{V_O}}{CC-\vec{V_O}\vec{V_O}}$$
$$T_C=\frac{\sqrt{(C^2T_B+\vec{P_E}\vec{V_O})^2 - (C^2-\vec{V_O}^2)(C^2{T_B}^2-\vec{P_E}\vec{P_E})}+C^2T_B+\vec{P_E}\vec{V_O}}{CC-\vec{V_O}\vec{V_O}}$$
---



## Length Contraction (NOT)

Given a point $\vec{X}$, and a velocity vector $\vec{V}$, and a speed of light $c$
(Length contraction is more complicated than this see below...)

https://www.desmos.com/calculator/frbv1e652p

the contraction has to be more than Lorentz (It's not, and this section is useless, preserved for 'don't do this'); otherwise the total time for light to bounce back and forth, accounting for the surface itself moving and making the light travel more or less of the distance that is the measured path for the light.  This means, that length will contract to 0 before reaching the speed of light in reality.

$L_{t2}(x)$ is time.  It is how long it takes for light to cross L in the forward direction.

$$
\begin{array}{}
A=L\\
B=C-v(x)\\
D=v(x)\\
A(\frac{1}{B} + \frac{\frac{1D}{B}}{B} +\frac{D\frac{\frac{D}{B}}{B}}{B}+ \frac{\frac{\frac{\frac{DDD}{B}}{B}}{B} }  {B} )\\
A(\frac{1}{B} + \frac{D}{B^2} +\frac{D^2}{B^3} + \frac{D^3}{B^4} + \frac{D^4}{B^5} ) 
\end{array}
$$



sum from 0 to infinity (or bias 1 to infinity, change index to N-1 and N instead of N and N+1)

$$\sum \frac{A^N}{B^{(N+1)}}=\sum {A^N}{B^{-(N+1)}} =\frac {-1} {A-B} = \frac{-1}{v(x)-(C-v(x))}
$$

This version is for -v(x), when the distance to be covered is shortened.  It ends up with an oscillating sign because $-v(x)*(-v(x)) = v(x)^2$ which is then $-v(x)*v(x)^2=-v(x)^3$

$$A(\frac{1}{B} - \frac{D}{B^2} -\frac{-D^2}{B^3} - \frac{D^3}{B^4} - \frac{-D^4}{B^5} ) 
 
 $$


$$\sum \frac{(-A)^N}{B^{(N+1)}}=\sum {(-A)^N}{B^{-(N+1)}} =\frac {1} {A+B} = \frac{1}{v(x)+(C+v(x))}
$$


$$ L_{t2}\left(x\right)=\frac{Lt\left(x\right)+\frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)}}{\left(C-v\left(x\right)\right)} $$

$$ L_{t2}\left(x\right)=\frac{Lt\left(x\right)+\frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} +\frac{v\left(x\right)\frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)}}{\left(C-v\left(x\right)\right)} }{\left(C-v\left(x\right)\right)} $$



$$ L_{t2}\left(x\right)=\left( \frac{1}{\left(C-v\left(x\right)\right)} +\frac{v\left(x\right)}
{(C-v(x))^2}\right) 
Lt\left(x\right) $$



$L_{T2}$ is time.  It is how long it takes light to cross in the backward direction.  Expanded, this would just have another negative term on the additional velocity, and will cancel out leaving just gamma for the length contraction factor.
$$L_{T2}\left(x\right)=\frac{Lt\left(x\right)-\frac{v\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)}}{\left(C+v\left(x\right)\right)}$$

$$ L_{T2}\left(x\right)=\left(\frac{1}{\left(C+v\left(x\right)\right)} -\frac{v\left(x\right)}{(C+v(x))^2} \right)Lt\left(x\right)$$


$$ L_{T2}\left(x\right)=\left(\frac{C}{(C+v(x))^2} \right)Lt\left(x\right)$$


## Attempt 2
Addition of reduced expressions...


$$ \left(\frac{C}{\left(C+v\left(x\right)\right)^2}  \right)Lt\left(x\right) +  \left( \frac{C}{\left(C-v\left(x\right)\right)^2} \right) Lt\left(x\right) $$

$$ \left(\frac{C}{\left(C + v\left(x\right)\right)^2}  \right)Lt\left(x\right) +  \left( \frac{C}{\left(C - v\left(x\right)\right)^2} \right) Lt\left(x\right) $$


$$  \left( \frac{
\left(C+v\left(x\right)\right)^2
+\left(C-v\left(x\right)\right)^2
}{
(C^2 - v(x)^2)^2} \right) 2CLt\left(x\right) $$

$$  \left( \frac{
CC+2Cv\left(x\right)+v\left(x\right)^2
+CC-2Cv\left(x\right) + v\left(x\right)^2
}{
\left(C-v\left(x\right)\right)^4} \right) 2CLt\left(x\right) $$

$$  \left( \frac{
C^2+v\left(x\right)^2 
}{
(C^2 - v(x)^2)^2} \right) 4CLt\left(x\right) $$



$$  \left( \frac{2C}{(C^2 - v(x)^2)^2} \right) Lt\left(x\right) $$
This would end up being just gamma.  the 2 disappears because it's 2L.
## Attempt 1
Addition of basic functions

$$
L_{t2}\left(x\right)=\frac{\left(C-v\left(x\right)\right)\left(Lt\left(x\right)+\frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)}\right) + \left(C+v(x)\right)\left(Lt\left(x\right)-\frac{v\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)}\right)}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 
$$

$$
L_{t2}\left(x\right)=\frac{2CLt(x) +C \frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 
-C \frac{v\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)} 

- v\left(x\right) \frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 

+ v\left(x)\right)   \frac{v\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)}

}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 

$$
---
first expression part.
$$
\frac {2CLt(x)}
{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)}
$$
---
Solve for second part
$$
\frac{ + \frac{Cv\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 
- \frac{Cv\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)} 


}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 

$$

$$
\frac{ + \frac{\left(C+v\left(x\right)\right)Cv\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 
- \frac{\left(C-v\left(x\right)\right)Cv\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)} 
}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 

$$

$$
\left(C+v\left(x\right)\right)Cv\left(x\right)Lt\left(x\right)
- \left(C-v\left(x\right)\right)Cv\left(x\right)Lt\left(x\right)
$$



$$
 +2Cv\left(x\right)^2Lt\left(x\right)
$$
---
Solve here for v(x) expression...
$$
\frac{
- v\left(x\right) \frac{v\left(x\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 

+ v\left(x)\right)   \frac{v\left(x\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)}

}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 

$$

$$
\frac{
- v\left(x\right) \frac{v\left(x\right)\left(C+v\left(x\right)\right)Lt\left(x\right)}{\left(C-v\left(x\right)\right)} 

+ v\left(x\right)   \frac{v\left(x\right)\left(C-v\left(x\right)\right)Lt\left(x\right)}{\left(C+v\left(x\right)\right)}

}

{\left(C-v\left(x\right)\right) \left(C+v\left(x\right)\right)} 

$$


$$
- v\left(x\right) v\left(x\right)\left(C+v\left(x\right)\right)Lt\left(x\right)

+ v\left(x\right)   v\left(x\right)\left(C-v\left(x\right)\right)Lt\left(x\right)
$$

$$
- v\left(x\right)^3Lt\left(x\right)

- v\left(x\right)^3Lt\left(x\right)
$$

$$
 { -2v\left(x\right) ^3 Lt\left(x\right)}
$$



---
The original length contraction was to normalize the 2 way time forward/backward with lateral time.  However, it discounted the motion of the ruler itself... or did it?
If it's based on the light propagation equation, then, that time included the motion of the observer.

$T_O = T_E + T_{\Delta}$

$$T_{\Delta} = \frac { || (X_O + (T_E+T_{\Delta})V_O)-(X_E+T_EV_E) || } {C}  $$
Observer and emitter are moving in the same direction, so they have the same V.... This cancels some terms immediately.
$$T_{\Delta} = \frac { ||  X_O + T_EV+T_{\Delta}V  -X_E-T_EV|| } {C}  $$

$L=X_O-X_E$  ;...  $-L=X_E-X_O$

With the terms removed...
$$T_{\Delta} = \frac { || X_O+T_{\Delta}V -X_E ) || } {C}  $$
Replace displacements with L.
$$T_{\Delta} = \frac { \sqrt{ ( L+T_{\Delta}V  )^2 }} {C}  $$
Expand magnitude operation
$$T_{\Delta} {C} = { \sqrt{ ( LL+2LT_{\Delta}V+T_{\Delta}T_{\Delta}VV  ) }}  $$
Square both sides...
$$T_{\Delta} T_{\Delta} {C}{C} = { { ( LL+2LT_{\Delta}V+T_{\Delta}T_{\Delta}VV  ) }}  $$
Move $T_{\Delta}$ terms to the left.
$$T_{\Delta} T_{\Delta} ({C}{C}-VV) -2LT_{\Delta}V = { {  LL }}  $$
Create a term to simplify this; it's $\frac 1{C{\gamma}^2}$..
$D=({C}{C}-VV)$

Replace D into equation, find square term on left, remove extra term...

$$\left(T_{\Delta}  \sqrt{D} -\frac{LV}{\sqrt{D}}\right)^2 - \frac{LLVV}{D}= { {  LL }}  $$

Move non $T_{\Delta}$ terms to the right, take square root of both sides...
$$\left(T_{\Delta}  \sqrt{D} -\frac{LV}{\sqrt{D}}\right) = \sqrt{ { LL + \frac{LLVV}{D}}}  $$
Move non $T_{\Delta}$ terms to the right, divide both sides by sqrt(D); combine term under radical with common denominator.
$$T_{\Delta} = \frac{\sqrt {  \frac{DLL +LLVV}{D}} +\frac{LV}{\sqrt{D}}}{\sqrt D} $$
Combine $\sqrt{D}\sqrt{D}=D$,...
$$T_{\Delta}  = \frac{\sqrt { DLL + LLVV} +LV}{ D} $$
Combine LL factor...
$$T_{\Delta}  = \frac{\sqrt { LL(D+{VV}) } +LV}{D}$$
Expanding D will reveal a -VV term which cancels the +VV term under the radical...
$$T_{\Delta}  = \frac{\sqrt { LL(CC-VV+{VV}) } +LV}{D}$$
Remove term.
$$T_{\Delta}  = \frac{\sqrt { LLCC } +LV}{D}$$
Reduce $\sqrt{C^2}$ to C, and convert $\sqrt{L\cdot L}$ to $|L|$.

$$T_{\Delta}  = \frac{C|L| +LV}{D}$$

$$T_{2{way}}=T_{\Delta}(L)+T_{\Delta}(-L)$$


$$T_{2{way}}=\frac{C|L| +LV}{D} + \frac{C|-L| -LV}{D}$$


$$ T_{2{way}}=\frac{2C|L| }{CC-VV}  $$
Apply length contraction to L...
$$ T_{2{way}}=\frac{2\sqrt { LL(CC) } }{CC-VV} * \frac{\sqrt{CC-VV}}{C} $$
So then time contraction on the result with another gamma...??

Results with 

$$T_{2{way}}=2L$$

And then L is length-contracted, which cancels the C/CC-VV delay.  so it becomes =2L.  But this clock is global time, and is against an unscaled global clock.
$$
 T_{\Delta}=\frac{2|L|C}{ CC-VV} * \frac{CC-VV}{C}
 $$
## Simple Form

$$t=\sqrt{(a+bt)^2}$$

$$t^2=aa+2abt +bbtt$$

$$t^2-bbtt-2abt=aa$$


$$\left(t\sqrt{1-bb}-\frac{ab}{\sqrt{1-bb}}\right)^2-\frac{aabb}{1-bb}=aa$$

$$t\sqrt{1-bb}-\frac{ab}{\sqrt{1-bb}}=\sqrt{aa + \frac{aabb}{1-bb}}$$

$$t\sqrt{1-bb}=\sqrt{aa + \frac{aabb}{1-bb} }+ \frac{ab}{\sqrt{1-bb}}$$

$$t=\sqrt{\frac{aa(1-bb) + aabb}{(1-bb)^2} }+ \frac{ab}{{1-bb}}$$

$$t=\frac{ \sqrt{aa((1-bb) + bb)} +{ab}}{{1-bb}}$$

$$t=\frac{ \sqrt{aa} +{ab}}{{1-bb}}$$

$$t=\frac{ {a}(1 +{b})}{{1-bb}}$$

$$t=\frac{ {a}}{{1-b}}$$

b(x,y)=((abs(x))/(C-y))
b_{2}(x,y)=((abs(x))/(C+y))

(approaching emitter event)
$l(x,y)=If(b(x,y)<b_{2}(x,y), b(x,y), b_{2}(x,y))$

(leaving emitter event)
k(x,y)=If(b(x,y)>b_{2}(x,y), b(x,y), b_{2}(x,y))


---
A little on rotations

R3->Q 

$A(x,y,z)$, $(2\pi-A)(-x,-y,-z)$ go to the same quaternion ( cos(x) or (cos(2pi-x),  and sin(x)(x,y,z),-sin(2pi-x)(x,y,z)  are the same ))

A(x,y,z), ($2\pi$-A)(-x,-y,-z), (A-$2\pi$)(x,y,z), -A(-x,-y,-z) are all the same quaternion.  They are only 2 pairs of real points though. (Ax,Ay,Az) and ((A-$2\pi$)x,(A-$2\pi$)y,(A-$2\pi$)z); since -A(-x) = Ax, and (A-$2\pi$)(-x) = ($2\pi$-A)x.  

So over the course of time if one has a point at (Ax,Ay,Az) and later another point at ($2\pi$-A)(-x,-y,-z), even though they are in an entirely different area of the space of rotations, the quaternion cannot distinguish which it is.  say ($\pi$/sqrt(2),$\pi$/sqrt(2),0) and (-$\pi$/sqrt(2),-$\pi$/sqrt(2),0 ).  The neighborhood of points that are near that rotation is also distinct between the two; but again the quaternion puts them in the same space.  A quaternion with a real part that is -1 to 1 can either be (-2pi to zero) or  2pi to zero, directionally ).  The sin part doesn't help distinguish, because it gets multiplied by a direction vector which has negative components, and really only goes from 0 to 1 and back to 0 over the angle/2 converted quaternion.

![[Pasted image 20240417173351.png]]

Matrices cover the first half, inner hemisphere, quaternions cover the inner hemisphere.  

Reverse computation of angle only covers all positive or all negative; the spin direction around the spin axis therefore should be assigned a separate variable.... splitting axis from the angle almost accomplishes that.

So that makes R3 a double cover of Q(SU(2)) which is a double cover of SO(3).