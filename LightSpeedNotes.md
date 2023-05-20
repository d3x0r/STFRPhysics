

## Old considerations for clock dilation 

 - The other possible clock dilation is the N-way speed of light, that sums all possible speeds and gets a result - the 4-way speed of light comes close... 

$$f\left(a\right)=\frac{\left(\sqrt{\left(\left(\left(-VVXX\right)\sin\left(a\right)\sin\left(a\right)-VVYY\cdot\cos\left(a\right)\cdot\cos\left(a\right)+2\cdot VVXY\ \cdot\sin\left(a\right)\cdot\cos\left(a\right)+CCXX+CCYY\right)\right)}+VX\cdot\cos\left(a\right)+VY\left(\sin\left(a\right)\right)\right)}{\left(CC-VV\right)}$$
a simple case starts with clock to the origin with (X=1, Y=0)...
$$f\left(a\right)=\frac{\sqrt{-\left( V\sin\left(a\right)\right)^2+C^2}+V\cos\left(a\right)}{C^2-V^2}$$
$$f(x)=\frac{\sqrt{C^{2}-V^{2}\sin(x)^{2}}\ +V\cos\left(x\right)}{C^2-V^2}$$
$$\frac{\int_{x=0}^\pi  f({x)} } {\pi}$$


# Frequency-wavelength interferometer tests


So here's this.  the frequency changes between front and back, leaving the same total wavelengths to travel, and the time to travel them as a constant.  Spoiler this is basically $\frac A B * \frac B A = 1$.

  a ship moving at 0.5c, has a signal bouncing front to back.  It is at 1ghz (1 foot in 1 ns (if not in a moving frame)).  It is emitted from the front to the back across a ship that is 100 feet (though the actual length doesn't matter).  

  The front emitter emits a signal that is red shifted to the back, and the back approaches that signal fast such that the frequency is still the 1ghz frequency.  The back hits the signal at 1.5c (between the rate of the signal backward, and the back coming forward), and so takes seconds (per foot?) (1ns/1.5ft) = 0.66ns/ft, and to cross the ship (100ft=66ns).  Wavelength is sent from 0.5c which is a wavelength (per sec?) 1.5ft/ns.  `1.5ft/ns*0.66ns/ft = 1ft-ns/ns-ft`  = 1.  $(C+V)*1/(C+V)$

  The back emitter emites a signal that is blue shifted to the front, but then ends up with more waves in-flight that can't catch the front, and the front is at 0.5c (1c from the light minus 0.5c for the forward velocity, that makes it effectively slower.)  and it takes 200 ns for 100 feet, and is `2ns/ft` for the signal to get there. wavelength is sent from the back at 1.5c, which is a freq of 0.5ft/ns.  `0.5ft/ns * 2ns/ft = 1ft-ns/ns-ft` = 1.  $(C-V)*1/(C-V)$.

  the left emitter emits a signal that is not shited to the right, and it takes (1+0.5^2), `sqrt(5)/2ns/ft` to get there, at 1ghz... well, the receiver must be ahead of the emission, and the receiver sees it at 2ft/sqrt(5)ns so, there is a slight red shift on reception, and blue on emission.  and still between what the transmitter did, and the receiver does, the wave is 1.

Earth orbits the sun at 0.00009776903ft/ns.  0.01% the speed of light. or 1 in 10,000 parts.  Earths rotation is only 0.00000150919ft/ns or 0.0002% the speed of light.  We are genally going some 

230 km/s in the milky way

the motion of the mily way is .000853018ft/ns or 0.09% the speed of light(now we're cookin with gas)

368 km/s Sun relative to the CMB; we're in a back-spin of our local group, which itself is moving at 600km/s.   .001207349ft/ns or 0.1% the speed of light or 1 in 1000.

this gives us 1/(1.0012 +/- 0.000098)  0.998*wavelength to 1.0012*wavelengths. 
1.001298 - 0.998703 (worst case I guess)
1.001102 - 0.998899

1.0012 - 0.9988
+1.0012 + 0.9988 = 1.0000 deviation in waves in the same length (but 2-way)

at `deviation*100000` = -0.76 ; or 0.0000076   1/131578.95  parts.

0.00000072 deviation between two arms.  And then only the total length of the arms counts, multiple two-way trips are still the same number of 2-way trips

### The Math of Interferometry?

This equation returns the ratio of the number of waves in a direction $a$ for a velocity $V$.  (Inversed is the time scalar of how long it takes a photon to travel 1 light-second in direction of said angle).

$$f\left(a\right)=\frac{\left(CC-VV\right)}{\sqrt{CC-VV\sin\left(a\right)\sin\left(a\right)}+V\cos\left(a\right)}$$
This is the ratio of how many waves are in a 2-way span of light, for an arm in said angle.  $f(a)$ is the amount 1 direction and $f(a+\pi)$ is the amount in the other direction.
$$g(a)=\frac {f(a)+f(a+\pi)} 2$$
This is a large scalar times the difference in the ratio of waves between two arms at a right angle.  This is the worst case difference.
$$h(a)=100000(g(a)-g(a+pi/2))$$

at $V=0.0013$ (slightly faster than we're going); assuming the right angle arms are aligned on the plane with the velocity vector,  The best error is 0.072/100000 = 0.000072% difference.

But, we get to use light, so there's a bonus, light is  400 THz to 800 THz, or 400,000Ghz so or 400,000-800,000 per foot?  so that ends up being like 0.288 or 28.8% per foot.



# Connection to Quantum Mechanical Correlations

(losely related... C+V and C-V with a ratio of C+V=2 hasn't really surfaced yet... )


The above last two sections, to answer a textbook question (still can't get the 'right' answer, so I shouldn't help people with their homework or to learn the material everyone else has learned.)   I just derrived it all myself.

The 'gamma factor' in Lorentz Transform is just a clock scalar, and is applied to the `T`, which is really used for everything else since `position= V*T`, and time Passed is T... so everything that has time gets gamma if you just scale the clock. 
(see previous demo - Homework Rework).

[Quantized Probablity](https://github.com/d3x0r/STFRPhysics/blob/master/QuantizedProbability.md) was a earlier project, using a LHV of quantum mechanics called 'spin axis' led me to this method of calculation QM probabliities.
It's within 3% of QM predictions, which is less than experimental apparatus error bars...

```
		//2(CD+LV)/(CC-VV)

		// 2D  //  V=0, L=any(any time after a fixed start point is same), C=1  sqrt(1-v/c)=1
		// A+B = 2D
		// a = A/D   b = B/D
		// a+b=2
		// 1-a/b = b/a-1 = 0   QM balance.
```


(Note sections are potentially incomplete/inaccurate).

### Tron-lightcycles

There's several frames of importance - the arena, and the people in it, and each player's local frame.

A player going 0.707x LS  means the world is 1.414x faster (vendors in the stands would rush around)   
A player going 0.894x LS means the world is 2x faster(?) not really - but the player is feeling like 2x the speed of light.   so anything from light sources is received 2x as fast?  Then how is the other 1.414x at 1x speed of light?


# 1.5D step-by-step derivation

This is a manual solution for a moving body with a stationary observer.  It's not impossible, though not immediately obvious how the solution is found.

`solve for T  x=sqrt( D^2+(VT+L)^2)/C+T` This command works on wolfram alpha to generate a solution.

![Discord help link](Discord-math-help-9-1.png)

Equation 1:
$$T_o = \frac {\sqrt{{D}^{2}+\left({VT+L}\right)^{2}}} C+T$$


Replace T_o with S (S works later when there's XYZ,DEF,JKL...)  Move the C into the radical, move T to the left, square both sides....

- Equation 2: $( S-T)^2 = {\frac {{D}^{2}}{{C}^2}+\left({\frac V C T+\frac L C}\right)^{2}}$

Expand both sides, move the C to the left anyway...

- Equation 3: $C^2(S^2- 2ST +T^2) = { {{D}^{2}}+ {{V^2}{T^2}} + {2VLT} +{L^2}}$

Combine T terms from (3) and other terms.

- Equation 4: ${C^2}{T^2} - {{V^2}{T^2}} - {2ST}{C^2} - {2VLT} = -{C^2}{S^2}+{ {{D}^{2}} +{L^2}}$

Group common factors of T from (4) set equal to 0

- Equation 5: $(C^2-V^2)T^2 - (2SC^2+2VL)T+C^2S^2-D^2-L^2=0$

Group common factors of T from (4), and move other parts to the right.

- Equation 6: $({C^2}-{V^2}){T^2} - ({S}{C^2} - {VL} )2T = { {{D}^{2}} +{L^2}}-{C^2}{S^2}$

Factor out 1 $T$ from (6); no further references to (7)

- Equation 7: $T\left(({C^2}-{V^2}){T} - 2({S}{C^2} - {VL} ) \right) = { {{D}^{2}} +{L^2}}-{C^2}{S^2}$

Quadratic formula on T parts, leaving a remainder outside. from (6)

- Equation 8: $\left(\sqrt{{C^2}-{V^2}}){T} - \frac {({S}{C^2} - {VL} )} {\sqrt{CC-VV}}\right)^2 - \frac { (SC^2-VL)^2}{CC-VV} = { {{D}^{2}} +{L^2}}-{C^2}{S^2}$

Move non-T expresssion to the right, Square both sides... from (8)
- Equation 9: $\sqrt{{C^2}-{V^2}}){T} - \frac {({S}{C^2} - {VL} )} {\sqrt{CC-VV}}  = \sqrt{{ {{D}^{2}} +{L^2}}-{C^2}{S^2} + \frac { (SC^2-VL)^2}{CC-VV}}$

Move partial term to the right....  divide both sides by what T is...

- Equation 10: ${T}   = \frac { \sqrt{{ {{D}^{2}} +{L^2}}-{C^2}{S^2} + \frac { (SC^2-VL)^2}{CC-VV}} + \frac {({S}{C^2} - {VL} )} {\sqrt{CC-VV}} } {\sqrt{{C^2}-{V^2}}}$

Multiply (10) by $\frac{\sqrt{C^2-V^2}}{\sqrt{C^2-V^2}}$ Looks like this is the way.

- Equation 11: ${T}   = \frac { \sqrt{ ({C^2-V^2}) \left({ {{D}^{2}} +{L^2}}-{C^2}{S^2} + \frac { (SC^2-VL)^2}{CC-VV}\right)}  + {({S}{C^2} - {VL} )}  } {{C^2}-{V^2}}$

Distribute product from(11)
- Equation 12: ${T}   = \frac { \sqrt{ C^2D^2-V^2D^2 + C^2L^2-V^2L^2-V^2C^2S^2-{C^4}{S^2} +  { S^2C^4-2S{C^2}VL+V^2L^2} }  + {({S}{C^2} - {VL} )}  } {{C^2}-{V^2}}$

cancel same terms, regroup and reorder values under the radical
- Equation 13: ${T}   = \frac { \sqrt{ C^2D^2+C^2L^2+2{C^2}SVL -V^2(D^2-C^2S^2 ) }  + {({S}{C^2} - {VL} )}  } {{C^2}-{V^2}}$

## Solution 1:

$${T}   = \frac { \sqrt{ C^2D^2+C^2L^2+2C^2SVL +V^2(C^2S^2-D^2 ) }  + {({S}{C^2} - {VL} )}  } {{C^2}-{V^2}}$$

Target:
$$T = \frac{\sqrt{C^{2}D^{2}+C^{2}L^{2}+2C^{2}LV{S}+V^{2}\left(\ C^{2}{S}^{2}-D^{2}\right)}+C^{2}{S}+LV}{C^{2}-V^{2}}$$


$$T = \frac{\sqrt{C^{2}(D^2+(L+VT_o)^2) -V^{2}D^{2}}+C^{2}{T_o}+LV}{C^{2}-V^{2}}$$


## 3D Math solution


This uses the same procedure as the previous, but solves with more terms and vectors instead of individual variables.  A solution for T is found, all that remains is simplifying terms at the end.

Equation 1:

$$T
_o = \frac { \lVert ({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {T_o})} \rVert } {C} + T$$

Replace T_o with S; convert length expression to sqrt of dot product. move C, square both sides.

- Equation 2:
$$C^2(S-T)^2 =  (  (\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {S}) )\cdot (({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {S}))} $$

Expand expressions....

- Equation 3: $C^2S^2-2C^2ST+C^2T^2 = (\vec{X} + \vec{V} T )(\vec{X} + \vec{V} T ) -2 (\vec{X} + \vec{V} T )( \vec{X_o}+ \vec{V_o} S) + ( \vec{X_o}+ \vec{V_o} S)^2$

Expand expressions which involve T...
- Equation 4: $C^2S^2-2C^2ST+C^2T^2 = \vec{X}\vec{X} +2\vec{X}\vec{V}T + \vec{V}\vec{V} T^2  -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}S -2 \vec{V} T\vec{X_o}-2 \vec{V}\vec{V_o}TS + ( \vec{X_o}+ \vec{V_o} S)^2$

move T terms to the left, else to the right; also combined terms and reversed some signs...

- Equation 5: $(C^2- \vec{V}\vec{V}) T^2  -2(C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}S)T= -C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}S  + ( \vec{X_o}+ \vec{V_o} S)^2$
- $(C^2- \vec{V}\vec{V}) T^2  -2(C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}S)T= -C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}(\vec{X_o} +\vec{V_o}S)  + ( \vec{X_o}+ \vec{V_o} S)^2$
- Equation 5a: Simplified right hand by factoring $\vec{X}$ and using that as $(A\vec{X} +\frac B A)^2$
   - $(C^2- \vec{V}\vec{V}) T^2  -2(C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S})T= -C^2S^2 + (\vec{X}   -(\vec{X_o} +\vec{V_o}S))^2$

Define partial term $\vec{a}$.

$\vec a = X-(X_o+V_oS)$; 

figure out the square, minus the odd part.... substitute $\vec{a}$

- Equation 6: $(C^2- \vec{V}\vec{V}) T^2  -2(C^2S+\vec{V}\cdot\vec{a})T= -C^2S^2 + (\vec{a})^2$
- Equation 6a: $\left(\sqrt{C^2- \vec{V}\vec{V}} T  -\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}\right)^2 -\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} = -C^2S^2 + (\vec{a})^2$

Move odd term to the right, and take the square root of both sides.

- Equation 7: $\sqrt{C^2- \vec{V}\vec{V}} T  -\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}  = \sqrt{+\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} -C^2S^2 + (\vec{a})^2 }$

move odd term to the right, divide by the coefficient of T... 

- Equation 8: $T   = \frac { \sqrt{+\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} -C^2S^2 + \vec{a}\cdot\vec{a} } +\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}} {\sqrt{C^2- \vec{V}\vec{V}}}$

Multiply top and bottom by $\frac {\sqrt{C^2-\vec{V}\vec{V}}}{\sqrt{C^2-\vec{V}\vec{V}}}$

- Equation 9: $T   = \frac { \sqrt{(C^2S+\vec{V}\cdot\vec{a})^2 -  (C^2-\vec{V}\vec{V})(C^2S^2 - \vec{a}\cdot\vec{a}) } +C^2S+\vec{V}\cdot\vec{a} } {C^2- \vec{V}\vec{V}}$



### Solution 2:

Define $A$, $B$ and $D$.

$\vec a = X-(X_o+V_oS)$; 

$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$;

$B=(C^2S+\vec{V}\cdot\vec{a})$;

$D = C^2 - \vec{V}\vec{V}$


$$T   = \frac { \sqrt{B^2 -  DA } +B } {D}$$

### 3D Target

$$\vec{a}=(\vec{X}-\vec{X_o})-\vec{V_o}T_o $$
$$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$$
$$B = C^2{S} + \vec{V}\cdot\vec{a}$$
$$D = C^2-\vec{V}\cdot\vec{V}$$

if( D (is near) 0 ) $T = \frac A {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$


## 3D Solution when V=C

Use V instead of C to normalize the function.

Equation 1:
$$S = \frac { || {(\vec{X}-\vec{X_o}) + \vec{V} T - \vec{V_o} S} || } {||\vec{V}||} + T$$
Equation 2: These terms are all part of 'in terms of' for the solution.
$$\vec{a} =\vec{X}-\vec{X_o}-\vec{V_o}S $$

Equation 3: convert normal bars to square root of length; replace with $\vec{a}$. All vector multiplications are performed as a dot product.
$$(S-T)\sqrt{\vec{V}\cdot\vec{V}} = \sqrt{ ({\vec{a} + \vec{V} T})^2}   $$
Equation 4: Expand term in radical.
$$(S-T)\sqrt{\vec{V}\cdot\vec{V}} = \sqrt{ (\vec{a}\vec{a} + 2\vec{a}\vec{V}T + \vec{V}\vec{V} T  T )}   $$
Equation 5: square both sides
$$(S-T)^2 ({\vec{V}\cdot\vec{V}}) = (\vec{a}\vec{a} + 2\vec{a}\vec{V}T + \vec{V}\vec{V} T  T )  $$

Equation 6: expand $(S-T)^2$

$$ -2ST({\vec{V}\cdot\vec{V}})+(SS{\vec{V}\cdot\vec{V}})+(TT{\vec{V}\cdot\vec{V}}) = (\vec{a}\vec{a} + 2\vec{a}\vec{V}T + \vec{V}\vec{V} T  T )  $$

Equation 7: group T terms on the left and everthing else to the right
$$( +({\vec{V}\cdot\vec{V}}-\vec{V}\vec{V} )T^2 +( -2\vec{a}\vec{V} -2S({\vec{V}\cdot\vec{V}}))T = \vec{a}\vec{a}  - SS{\vec{V}\cdot\vec{V}}  $$

Equation 8: $T^2$ term cancels out, leaving just a coefficient on T to divide on the right side.   Move resulting sign to top.
$$T = - \frac { \vec{a}\vec{a}  - SS{\vec{V}\cdot\vec{V}}} { 2\vec{a}\vec{V} +2S({\vec{V}\cdot\vec{V}})}  $$

Equation 9: Move signs
$$T =  \frac { SS{\vec{V}\cdot\vec{V}}-\vec{a}\vec{a} } { 2\vec{a}\vec{V} +2S({\vec{V}\cdot\vec{V}})}  $$
Equation 9: Define A and B which is denominator (and used in 3D above)
$$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$$
$$B = C^2{S} + \vec{V}\cdot\vec{a}$$

V=C, substitute C back in for V.

### Solution 3

$$\vec{a} =\vec{X}-\vec{V_o}S $$
$$T = \frac {A} {2B}  $$

Substitute $\vec{a}$ back in to make sure there's no additional zeros. Also replace $S$ with ${T_o}$.  This does have a problem at $T_o=0$ and position=0. 

$$T = \frac { T_o^2{C^2}-(\vec{X}-\vec{X_o}-\vec{V_o}T_o)\cdot(\vec{X}-\vec{X_o}-\vec{V_o}T_o)) } { 2\left((\vec{X}-\vec{X_o}-\vec{V_o}T_o)C +C^2{T_o}\right)}  $$

This is only valid for T_o > 0 ; T=1/2 T_o
 at T < -1/2X (before the point it's first seen) all positions are seen at the same time according to their offset along the shp.




## Alternate 3D Math solution


This uses the same procedure as the previous, but solves with more terms and vectors instead of individual variables.  A solution for T is found, all that remains is simplifying terms at the end.

- Equation 1: $T_o = \frac { \lVert ({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o} {T_o})} \rVert } {C} + T$

- Equation 2: $\vec{a} = \vec{X}-\vec{X_o}-\vec{V_o}{T_o}$

Replace T_o with S; convert length expression to sqrt of dot product. move C, square both sides.
- Equation 3: $C^2(S-T)^2 =  (  \vec{a}+\vec{V}T )\cdot (\vec{a}+\vec{V}T )$

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

### Solution 4:

Define $\vec{a}$, $A$, $B$ and $D$.

$\vec a = X-(X_o+V_oS)$

$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$

$B=C^2S+\vec{V}\cdot\vec{a}$

$D = C^2 - \vec{V}\vec{V}$

$$T   = \frac { \sqrt{B^2 -  DA } +B } {D}$$

---
So this isn't 'Lorentz Transform' which also has something about telling what time the other guy thinks it is?

$$\beta = v/c$$
$$\gamma = \frac c {\sqrt{c^2-\vec{v}\vec{v}}} *\frac{\frac 1 c}{\frac 1 c}=\frac {1} {\sqrt{1-\frac {\vec{v}\vec{v}}{c^2}}} 
$$
Local time for body (assuming a sync'd clock at T=0)
$$ T_b = \gamma (T)$$
The local clock with value $T_b$ is seen at 
$$T_o = \frac{|| (\vec{x}-\vec{x_o}-\vec{v_o}T_o)+\vec{v}T ||}{C} + T$$



---

- Equation 1: ${\Delta T} = \frac { \lVert ({\vec{X} + \vec{V} T ) -( \vec{X_o}+ \vec{V_o}( {T+\Delta T}))} \rVert } {C}$

- Equation 2: $\vec{a} = \vec{X}-\vec{X_o}+VT - \vec{V_o}T$


- Equation 3: $$C^2\Delta T^2 =  {(a-V_o\Delta T)^2}$$

Replace T_o with S; convert length expression to sqrt of dot product. move C, square both sides.
- Equation 3: $$C^2\Delta T^2 =  aa-2aV_o(\Delta T) + \vec{V_o}\vec{V_o}\Delta T^2$$

Equation 3: $$(C^2-V_o^2)\Delta T^2 +2aV_o(\Delta T)  =  aa$$
$D=(C^2-\vec{V_o}\vec{V_o})$

Equation 3: $$(\sqrt D \Delta T + \frac{ aV_o} {\sqrt D})^2- \frac{ aaV_oV_o} D  =  aa$$

Equation 3: $$\sqrt D \Delta T + \frac{ aV_o} {\sqrt D} = \sqrt{ aa( 1+\frac{V_oV_o} D) }$$
Equation 3: $$\sqrt D \Delta T  = \sqrt{ aa( 1+\frac{V_oV_o} D) } - \frac{ aV_o} {\sqrt D}$$
Equation 3: $$ \Delta T  = \frac 1 {\sqrt{D}} \sqrt{ aa( 1+\frac{V_oV_o} D) } - \frac{ aV_o} { D}$$
Equation 3: $$ \Delta T  = \frac {\sqrt{ {Daa( 1+\frac{V_oV_o} D)} } - {aV_o}} {{D}} $$

Equation 3: $$ \Delta T  = \frac {\sqrt{ {aa( D+{V_oV_o})} } - {aV_o}} {{D}}$$
Solution for Delta T - position difference at Time T 

 $\vec{a} = \vec{X}-\vec{X_o}+VT - \vec{V_o}T$

$$ \Delta T  = \frac {\sqrt{ {aa( (C^2-\vec{V_o}\vec{V_o})+{V_oV_o})} } - {aV_o}} {(C^2-\vec{V_o}\vec{V_o})}$$




---

# Lorentz Transform - Original Flavor

So this has 2 sets of coordinates.  (x,t) and (x',t') where the primed version is the moving ship.  And it's to translate velocity, such that the moving ship is vertical after the fact.   

This demo relates various 
http://d3x0r.github.io/STFRPhysics/math/indexLightSpeed-Clocks.html

https://www.youtube.com/watch?v=Rh0pYtQG5wI This is that cool mechanical transform - too bad it's not actually symmetric like this.

https://www.youtube.com/watch?v=HIQ5hnm61LQ Kahn Academy - Introduction to Lorentz Transformation

[Lorentz Transformation](https://www.youtube.com/watch?v=sbNEtMUjiMU&pp=ygUWbG9yZW50eiB0cmFuc2Zvcm1hdGlvbg%3D%3D "Lorentz Transformation") [MIT's Experimental Study Group](https://www.youtube.com/@VloggingESG) This is one I'd like  to address point by point.  They build it using some definitions of variables.
 - Begins framing this problem
   - Astronaut in spaceship, with a stationary observer.  The space ship starts moving forward with a light pulse emitted at the same time.
   - Determine how far the light pulse is from each observer by their own clock.  
   - stationary observer see the pulse at $d=ct$ displacement equals the speed of light times time
   - moving observer sees the pulse at $d'=ct'$, this displacement is from the ship, but is also at the speed of light $c$ but in a different time.
 - Derive the lortentz transform so we can find $t'$ above.
   - $x'=Ax+Bt$, $t'=Dx+Et$; These are the equations which are proposed to be solved for various circumstances. 
   - 4 scenarios are provided to come up with the ideal solution.
      1) boat with velocity relative to a dock.  And setup how each observer describes the boats location. This is from the boat's perspective where they are 0.
        - $t=t'=0$, $x=x'=0$ 
        - the dock describes the boat as x=vt
           - the dock could describe the boat as $x = \sqrt{ (L+vt)^2 }$, and really the requirement for sqrt is for $x =\sqrt{ (y^2+z^2)+(L+vt)^2 }$ (for a positive velocity).
        - the boat describes themselves as $x'=0$
           -  the boat could describe themselves as $x'=0+D$ for an offset within the boat.
        - which then is $0=Avt+Bt, 0=Av+B$, $-Av=B$
          -  or $D=A\sqrt{(L+vt)^2}+Bt$, solved for B: $\frac {D-A\sqrt{(L+vt)^2}}{t}=B$
        - $x'=A(x-vt)$
          - or $x'=Ax+(\frac {L-A\sqrt{(L+vt)^2}}{t})t$, $x'=Ax+D-A\sqrt{(L+vt)^2}$, $x'=D+A(x-\sqrt{(L+vt)^2})$
        - 
      2) boat with a velocity relative to dock.  This is from the dock's stationary perspective.
        - $t=t'=0$, $x=x'=0$ 
        - the boat describes them as $x'=-vt'$
           - the boat could describe the dock as $x' = -\sqrt{(D+vt')^2}$
        - the dock describes themselves as $x=0$
           -  the dock could describe themselves as $x=0+L$ for an offset on the dock.
        - which then is $x'=A(0-vt)$, $-vt'=x'$, $-v(D*0+Et)=A(0-vt)$ $$-Evt=-Avt$$ $$E=A$$
          -  or $x'=D_b+A(x-\sqrt{(L+vt)^2})$, $x'=D_b+A\sqrt{(L+vt)^2}$,  $-v(D*0+Et)=D_b+A\sqrt{(L+vt)^2}$$, $E=\frac {D_b+A(\sqrt{(L+vt)^2})} {vt}$
        - $x'=A(x-vt)$
          - or $x'=Ax-L+(A\sqrt{v^2})t$
        - t' = Dx+At
	  - $t' = Dx + \frac {D_b+A(\sqrt{(L+vt)^2})} {vt} t$
      3)  Back to the rocket ship, and that pulse of light
        - position of the light from the stationary astronaut $x=ct$
        - position of the light from the rocket $x'=ct'$
	- already had $x'=A(x-vt)$, $t'=Dx+At$
       - $ct' = A(ct-vt)$
       - $c(Dx+At)=At(c-v)$
       - $c(Dct + At) = At(c-v)$
       - $Dc^2t+Act = Act-Avt$
       - $Dc^2t=-Avt$
       - $D=\frac{-Av}{c^2}$
       - results as....
       - $x'=A(x-vt)$
       - $t'=\frac {Av}{c^2}x+At$
       - $t'=A(\frac{-vx}{c}+t)$


 - Alternate 
    - $x'=-L+A(x+t\sqrt{v^2})$
    - $t' = Dx + \frac {D_b+A(\sqrt{(L+vt)^2})} {vt} t$
    - $ct'=-L+A(ct+t\sqrt{v^2})$
    - $c(Dx+At)=-L+A(ct+t\sqrt(v^2))$
    - $c(Dct+At)=-L+A(ct+t\sqrt(v^2))$
    - $Dc^2t+Act=-L+Act+At\sqrt(v^2))$
    - $Dc^2t=-L+At\sqrt(v^2))$
    - $D=\frac{-L+At\sqrt(v^2))} {c^2t}$
        - results are:
	- $x'=Ax-L+(A\sqrt{v^2})t$
	- $t'=\frac{-L+At\sqrt(v^2))} {c^2t} x + \frac {D_b+A(\sqrt{(L+vt)^2})} {vt} t$

4) Rocket ship; pulse goes up instead of to the right.
  - The astronaut sees the pulse as the same $y=ct$
  - The rocket sees the pulse ... $(-x')^2 + y'^2 = (ct')^2$
  - $y=y'$
  - $x'=A(x-vt)$
  - $t'=A(-vx/c^2+t)$
  - $y=ct$;  $(-x')^2 + y'^2$ = (ct)^2; $y=y'$
  - $(A(x-vt))^2 +y^2 = (ct')^2$
  - $(A(x-vt))^2 +(ct)^2 = (ct')^2$
  - $(A(x-vt))^2 +(ct)^2 = (c (A(\frac{-vx}{c}+t) ) )^2$
  - A^2v^2t^2 +c^2t^2 = A^2 c^2 t^2
  - ...
  - $1=A^2 - A^2V^2/C^2$
  - $A =\frac {1} {\sqrt{1-\frac{v^2}{c^2}}}$ or $c/\sqrt{ cc-vv }$
   - Alternate
      - $(L-A(x+t\sqrt{v^2}))^2 +y^2 = (ct')^2$



6) length contraction is $\frac{(cc-vv)c}{cc \sqrt{cc-vv}}$ 
$$\vec{a}=(x) $$
$$A = C^2{T_o}^2 - x*x$$
$$B = C^2{T_o} + V \cdot x$$
$$D = C^2-\vec{V}\cdot\vec{V}$$
if( D (is near) 0 ) $T = \frac A {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$