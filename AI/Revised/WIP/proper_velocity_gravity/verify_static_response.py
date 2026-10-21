"""Numerical checks for the selected dimensionless static radial response."""
import math

def field(r):
    rho=math.hypot(r,1.0)
    delta=1/(rho+r)
    D=rho/r
    a=delta/r
    return D,delta,a

def close(a,b,tol=2e-6):
    assert abs(a-b)<=tol*max(abs(b),1e-12),(a,b)

for r in [.01,.1,1.,10.,100.]:
    h=r*1e-5
    D,p,a=field(r)
    close((math.hypot(r+h,1)-math.hypot(r-h,1))/(2*h),1/D)
    close((field(r+h)[1]-field(r-h)[1])/(2*h),-a/D)
    close(D*(field(r+h)[2]-field(r-h)[2])/(2*h),-1/r**3)
    # s = r/t maps infinity to t=0. Integral of a(s)/D(s) ds.
    def integrand(t):
        if t==0:return 1/(2*r)
        s=r/t; ds,ps,aa=field(s)
        return (ps/math.hypot(s,1))*r/(t*t)
    n=20000;dt=1/n
    integral=dt/3*(integrand(0)+integrand(1)+sum((4 if i%2 else 2)*integrand(i*dt) for i in range(1,n)))
    close(integral,p,2e-7)

def rhs(z):
    r,u=z;D,p,a=field(r)
    return D*u,-a

def step(z,h):
    k1=rhs(z);k2=rhs(tuple(z[i]+h*k1[i]/2 for i in range(2)))
    k3=rhs(tuple(z[i]+h*k2[i]/2 for i in range(2)))
    k4=rhs(tuple(z[i]+h*k3[i] for i in range(2)))
    return tuple(z[i]+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6 for i in range(2))

worst=0
for r,u,duration in [(.2,math.sqrt(2*field(.2)[1]),.1),(1.,math.sqrt(2*field(1.)[1]),2.),(1.,1.2,2.),(2.,.1,1.)]:
    z=(r,u);energy=u*u/2-field(r)[1];h=duration/10000
    for _ in range(10000):
        z=step(z,h)
        residual=abs(z[1]**2/2-field(z[0])[1]-energy)
        worst=max(worst,residual)
        assert residual<1e-9,(z,residual)
    if abs(energy)<1e-14:close(z[1],math.sqrt(2*field(z[0])[1]),1e-8)
    if u==.1:assert z[1]<0,'Expected subescape launch to turn'

print('PASS: map, depth and acceleration derivatives; escape quadrature; radial trajectories and turning point.')
print(f'Maximum dimensionless radial-invariant residual: {worst:.3g}')

# Metric comparison in c=d=ell_0=1 units. These lapses are hypotheses.
for r in [.1,1.,10.]:
    D,sigma,a=field(r);h=r*1e-5
    for label,N,expected in [
        ('escape',lambda x:1/math.sqrt(1+2*field(x)[1]),a/(1+2*sigma)),
        ('historical',lambda x:1/(1+field(x)[1]),a/(1+sigma))]:
        derivative=D*(math.log(N(r+h))-math.log(N(r-h)))/(2*h)
        close(derivative,expected)
    q=1+2*sigma
    close(a*q/q,a)
    assert a/q<a
    assert abs(a*(1+2**2)/q-a)>1e-6

z=(1.,1.2)
def metric_energy(z):return math.sqrt(1+z[1]**2)/math.sqrt(1+2*field(z[0])[1])
before=metric_energy(z)
for _ in range(10000):z=step(z,2/10000)
assert abs(metric_energy(z)-before)>1e-3
print('PASS: metric lapse gradients, marginal-only matching, and non-marginal metric-energy mismatch.')
