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
$$ h(a)=100000(g(a)-g(a+pi/2))$$

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

![[Discord-math-help-9-1.png]]

Equation 1:
$$T_o = \frac {\sqrt{{D}^{2}+\left({VT+L}\right)^{2}}} C+T$$


Replace T_o with S (S works later when there's XYZ,DEF,JKL...)  Move the C into the racidal, move T to the left, square both sides....

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

This is a work in progresss.

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

$\vec a = X-(X_o+V_oT)$; 

figure out the square, minus the odd part.... 

- Equation 6: $\left( \sqrt{(C^2- \vec{V}\vec{V})} T  - \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}} {\sqrt{C^2-\vec{V}\vec{V}}} \right) ^2 -\left( \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}} {\sqrt{C^2-\vec{V}\vec{V}}}\right)^2 = -C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}S  + ( \vec{X_o}+ \vec{V_o} {S})^2$
- Equation 6a: $(C^2- \vec{V}\vec{V}) T^2  -2(C^2S+\vec{V}\cdot\vec{a})T= -C^2S^2 + (\vec{a})^2$
- Equation 6a2: $\left(\sqrt{C^2- \vec{V}\vec{V}} T  -\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}\right)^2 -\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} = -C^2S^2 + (\vec{a})^2$

Move odd term to the right, and take the square root of both sides.

- Equation 7: $\sqrt{(C^2- \vec{V}\vec{V})} T  - \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}} {\sqrt{C^2-\vec{V}\vec{V}}}  = \sqrt{-C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}S  + ( \vec{X_o}+ \vec{V_o} {T_o})^2 +\left( \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}} {\sqrt{C^2-\vec{V}\vec{V}}}\right)^2}$
- Equation 7a: $$\sqrt{C^2- \vec{V}\vec{V}} T  -\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}  = \sqrt{+\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} -C^2S^2 + (\vec{a})^2 }$$

move odd term to the right, divide by the coefficient of T... 

- Equation 8: $T   = \frac {\sqrt{-C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}T_o  + ( \vec{X_o}+ \vec{V_o} {S})^2 -\left( \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} + \vec{V}\vec{V_o}{T_o}} {\sqrt{C^2-\vec{V}\vec{V}}}\right)^2} +\frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}} {\sqrt{C^2-\vec{V}\vec{V}}}  } {\sqrt{(C^2- \vec{V}\vec{V})} }$
- Equation 8a: $$ T   = \frac { \sqrt{+\frac{(C^2S+\vec{V}\cdot\vec{a})^2}{C^2-\vec{V}\vec{V}} -C^2S^2 + \vec{a}\cdot\vec{a} } +\frac{(C^2S+\vec{V}\cdot\vec{a})}{\sqrt{C^2-\vec{V}\vec{V}}}} {\sqrt{C^2- \vec{V}\vec{V}}} $$

Multiply top and bottom by $\frac {\sqrt{C^2-\vec{V}\vec{V}}}{\sqrt{C^2-\vec{V}\vec{V}}}$

- Equation 9: $T   = \frac {\sqrt{ (C^2-\vec{V}\vec{V}) \left( -C^2S^2 + \vec{X}\vec{X}    -2 \vec{X}\vec{X_o} -2\vec{X}\vec{V_o}T_o  + ( \vec{X_o}+ \vec{V_o} {S})^2 +\left( \frac {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{T_o}} {\sqrt{C^2-\vec{V}\vec{V}}}\right)^2\right)} + {C^2S+\vec{X}\vec{V}- \vec{V} \vec{X_o} - \vec{V}\vec{V_o}{S}}   } {(C^2- \vec{V}\vec{V}) }$
- Equation 9a: $$ T   = \frac { \sqrt{(C^2S+\vec{V}\cdot\vec{a})^2 -  (C^2-\vec{V}\vec{V})(C^2S^2 - \vec{a}\cdot\vec{a}) } +C^2S+\vec{V}\cdot\vec{a} } {C^2- \vec{V}\vec{V}} $$

Define $A$, $B$ and $D$.

$B=(C^2S+\vec{V}\cdot\vec{a})$
$D = C^2 - \vec{V}\vec{V}$
$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$

- Equation 10a: $$ T   = \frac { \sqrt{B^2 -  DA } +B } {D} $$
The otther path led to something like this.... earlier simpflification of $\vec{a}$ helped...
$$T = \frac {  \sqrt{ C^2S^2V^2 +  C^2\vec{X}\vec{X} -V^2\vec{X}\vec{X}   -2C^2\vec{X}\vec{X_o} +2\vec{V}\vec{V}\vec{X}\vec{X_o} -2C^2\vec{X}\vec{V_o}T_o +2\vec{V}\vec{V}\vec{X}\vec{V_o}S +  \vec{X_o}\vec{X_o}+2\vec{X_o}\vec{V_o}{T_o}+ \vec{V_o}\vec{V_o} {S}^2 - 2CCSV\vec{a}- \vec{V}\vec{V} * \vec{a}\cdot\vec{a})} + {C^2S+\vec {V}\cdot\vec{a}}   } {(C^2- \vec{V}\vec{V}) }$$

### 3D Target

$$\vec{a}=(\vec{X}-\vec{X_o})-\vec{V_o}T_o $$
$$A = C^2{S}^2 - \vec{a}\cdot\vec{a}$$
$$B = C^2{S} + \vec{V}\cdot\vec{a}$$
$$D = C^2-\vec{V}\cdot\vec{V}$$

if( D (is near) 0 ) $T = \frac A {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$
