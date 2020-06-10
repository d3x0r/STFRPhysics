# Fast Faraday Force Flux Field Reactor (FFFFFR)

I wrote a few pages, and lost it all :(  Lost some references from page too

(Space-Time Field Reactor ?STFR? )

## What is a thing





## Rotation limits

If we consider the speed of light achievable, 1 half rotation per nano second is a reasonable maximum.  

This is 3B RPM is the maximum rotation rate.  This turns out to be a 1 rotation at 1dm is the speed of light.


## Quaternion rotation points

1) ln(q) = angle(s) and length.

add vectors instead of multiply.




## References

quaternion expoentiation mapping
https://www.youtube.com/watch?v=UHzAY5Q7ji0

https://www.ljll.math.upmc.fr/perronnet/delaunay3d/delaunay3d.html


https://en.wikipedia.org/wiki/Quaternion (especially exponentiation)

http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf // logrithm quaternion adoptations.

https://parasol.tamu.edu/wafr/wafr2018/ppr_files/WAFR_2018_paper_1.pdf  (dual quatnerions; recommend calculation of separate things)

https://en.wikipedia.org/wiki/Natural_logarithm (bottom of page, complex number extension, graph of abs(ln(x+yi)) = high speed break of record hydraulic press channel. (30,000 RPM!)

https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/other/dualNumbers/functions/index.htm (only exp)

http://new.math.uiuc.edu/math198/MA198-2014/rgandre2/seminar.pdf (exp and ln)
```
a+be.. exp(a+be) = exp(a) + exp(a)* b * e

log(a+be) = log(a) + ( b / a ) e

```


https://math.stackexchange.com/questions/939229/unit-quaternion-to-a-scalar-power

```java

/**
 * sets this quaternion to this^n (for a rotation quaternion, this is equivalent to rotating this by itself n times)
 * This should only work for unit quaternions.
 * @param n power
 * @return this
 */
public final Quaternion pow(float n){
    ln().scale(n).exp();
    return this;
}


public final QuaternionF exp() {
    float r  = r;// (float) Math.sqrt(x*x+y*y+z*z);
    float s  = r>=0.00001f? et*(float)Math.sin(r)/r: 0f;

    w=Math.exp(w)*(float)Math.cos(r);
    x*=s;
    y*=s;
    z*=s;

	r *= s;
	rc = Math.cos(r);
	rs = Math.sin(r);
    return this;
}


public final QuaternionF ln() {
    float r  = r;// (float) Math.sqrt(x*x+y*y+z*z);
    float t  = r>0.00001f? (float)Math.atan2(r,w)/r: 0.f;

    w=0.5f*(float)Math.log(w*w+x*x+y*y+z*z);

    x*=t;
    y*=t;
    z*=t;
	r *= t;
    return this;
}

public QuaternionF scale(float scale){
    w*=scale;
    x*=scale;
    y*=scale;
    z*=scale;
    return this;
}

```

