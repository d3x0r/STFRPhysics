"""c=d=ell_0=1 checks for explicit acquired-impulse direction steering."""
import math
def rotate(u,w):
    co,si=math.cos(w),math.sin(w)
    return co*u[0]-si*u[1],si*u[0]+co*u[1]
def response(u,a):
    g=math.sqrt(1+sum(x*x for x in u));w=(u[0]*a[1]-u[1]*a[0])/(g+1)
    return a[0]-w*u[1],a[1]+w*u[0]
u=(.7,.3);a=(-.2,.4);target=response(u,a);errors=[]
for h in [1e-3,1e-4,1e-5,1e-6]:
    g=math.sqrt(1+sum(x*x for x in u));star=tuple(u[i]+a[i]*h for i in range(2))
    w=(u[0]*a[1]-u[1]*a[0])*h/(g+1);end=rotate(star,w)
    assert abs(math.hypot(*end)-math.hypot(*star))<1e-14
    errors.append(max(abs((end[i]-u[i])/h-target[i]) for i in range(2)))
assert all(b<a/5 for a,b in zip(errors,errors[1:]))
def rhs(z):
    x,y,u,v=z;rho=math.hypot(x,y);r=math.sqrt(rho*rho-1);A=1/((rho+r)*r)
    ax,ay=response((u,v),(-A*x/rho,-A*y/rho))
    return u,v,ax,ay
def step(z,h):
    k1=rhs(z);k2=rhs(tuple(z[i]+h*k1[i]/2 for i in range(4)))
    k3=rhs(tuple(z[i]+h*k2[i]/2 for i in range(4)))
    k4=rhs(tuple(z[i]+h*k3[i] for i in range(4)))
    return tuple(z[i]+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6 for i in range(4))
def invariants(z):
    x,y,u,v=z;rho=math.hypot(x,y);r=math.sqrt(rho*rho-1);g=math.sqrt(1+u*u+v*v)
    return (u*u+v*v)/2-1/(rho+r),math.log(abs(x*v-y*u))+g-math.log1p(g)
rho=math.sqrt(101);A=1/((rho+10)*10);q=rho*A;zc=(q*q+q*math.sqrt(q*q+4))/2
assert abs(zc-q*math.sqrt(1+zc))<1e-14
z=(rho,0.,0.,math.sqrt(zc)*.9);initial=invariants(z);worst=[0.,0.]
for _ in range(30000):
    z=step(z,.02)
    for i,value in enumerate(invariants(z)):worst[i]=max(worst[i],abs(value-initial[i]))
assert max(worst)<1e-9,worst
print('PASS: kick magnitude, continuous-limit convergence, circular-speed equation, and eccentric-trajectory invariants.')
print('Maximum energy and generalized-angular invariant residuals:',worst)
