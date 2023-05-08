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
