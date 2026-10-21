"""Checks differential external-field rotation and basis-only transport."""
import math

for beta in [.1,.5,.9,.99,.9994]:
    g=1/math.sqrt(1-beta*beta);a=math.sqrt(1-beta*beta)
    # Rationalized square root in the paper's finite integral.
    def full(n):
        kick=beta*math.sin(2*math.pi/n)
        return n*2*math.atan(beta/(1+a)*math.tan(math.asin(kick/a)/2))
    exact=2*math.pi*(g-1)
    coarse,fine=full(10000),full(100000)
    assert abs(fine-exact)<abs(coarse-exact)
    assert abs(fine/exact-1)<1e-6

def rhs(z,rotating):
    x,y,u,v=z[:4];rho=math.hypot(x,y);r=math.sqrt(rho*rho-1)
    A=1/((rho+r)*r);ax=-A*x/rho;ay=-A*y/rho
    if not rotating:return u,v,ax,ay
    omega=(u*ay-v*ax)/(math.sqrt(1+u*u+v*v)+1)
    return u+omega*y,v-omega*x,ax+omega*v,ay-omega*u,omega

def step(z,h,rot):
    n=len(z);k1=rhs(z,rot);k2=rhs(tuple(z[i]+h*k1[i]/2 for i in range(n)),rot)
    k3=rhs(tuple(z[i]+h*k2[i]/2 for i in range(n)),rot)
    k4=rhs(tuple(z[i]+h*k3[i] for i in range(n)),rot)
    return tuple(z[i]+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6 for i in range(n))

rho=math.sqrt(101);A=1/((rho+10)*10);speed=math.sqrt(rho*A)
fixed=(rho*1.001,0.,0.,speed/1.001);moving=(*fixed,0.)
period=2*math.pi*math.sqrt(rho/A);worst=0
for _ in range(20000):
    fixed=step(fixed,period/10000,False);moving=step(moving,period/10000,True)
    x,y,u,v,w=moving;co,si=math.cos(w),math.sin(w)
    reconstructed=(co*x-si*y,si*x+co*y,co*u-si*v,si*u+co*v)
    worst=max(worst,max(abs(a-b) for a,b in zip(fixed,reconstructed)))
assert worst<1e-8,worst
assert abs(moving[-1])>.01
print('PASS: finite external-field integral converges to 2*pi*(gamma-1).')
print(f'PASS: fixed/rotating orbit reconstruction; maximum state difference {worst:.3g}; accumulated orientation {moving[-1]:.8f} rad.')
