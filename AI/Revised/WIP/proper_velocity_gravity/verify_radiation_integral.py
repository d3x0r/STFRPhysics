"""Angular radiation identity and exact-depth Poisson residual checks."""
import math
for T in [[[1,0,0],[0,-1,0],[0,0,0]],[[1,0,0],[0,1,0],[0,0,1]],[[2,.3,.4],[.3,-.5,.2],[.4,.2,1]]]:
    total=0.;nm=400;np=32;dm=2/nm
    for i in range(nm+1):
        mu=-1+i*dm;s=math.sqrt(max(0,1-mu*mu));weight=1 if i in [0,nm] else (4 if i%2 else 2)
        for j in range(np):
            phi=2*math.pi*j/np;n=[s*math.cos(phi),s*math.sin(phi),mu]
            value=sum(n[a]*T[a][b]*n[b] for a in range(3) for b in range(3))
            total+=weight*value*value
    total*=dm/3*2*math.pi/np
    trace=sum(T[i][i] for i in range(3));norm=sum(x*x for row in T for x in row)
    expected=4*math.pi/15*(trace*trace+2*norm)
    assert abs(total/expected-1)<1e-8,(total,expected)
    stf=sum((T[i][j]-(trace/3 if i==j else 0))**2 for i in range(3) for j in range(3))
    assert abs((trace*trace+2*norm)/60-(stf/30+trace*trace/36))<1e-14
for r in [.3,1.,3.]:
    h=r*1e-3
    f=lambda x:1/(math.hypot(x,1)+x)
    first=(f(r+h)-f(r-h))/(2*h)
    second=(f(r+h)-2*f(r)+f(r-h))/(h*h)
    exact=1/math.hypot(r,1)**3+2/math.hypot(r,1)-2/r
    assert abs((second+2*first/r)/exact-1)<2e-5
print('PASS: trace-free, trace-only and mixed scalar-power angular integrals; STF decomposition; nonzero static Poisson residual.')
