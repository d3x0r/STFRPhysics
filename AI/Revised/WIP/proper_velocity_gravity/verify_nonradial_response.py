"""Dimensionless orbit test for the conditional forward-map central closure."""
import math

def field(rho):
    r=math.sqrt(rho*rho-1)
    delta=1/(rho+r)
    return delta/r,delta

def rhs(z):
    x,y,u,v=z;rho=math.hypot(x,y);a,_=field(rho)
    return u,v,-a*x/rho,-a*y/rho

def step(z,h):
    k1=rhs(z);k2=rhs(tuple(z[i]+h*k1[i]/2 for i in range(4)))
    k3=rhs(tuple(z[i]+h*k2[i]/2 for i in range(4)))
    k4=rhs(tuple(z[i]+h*k3[i] for i in range(4)))
    return tuple(z[i]+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6 for i in range(4))

rho=math.sqrt(101);a,phi=field(rho);D=rho/10
ratio=3-D*(D+1);omega=math.sqrt(a/rho);period=2*math.pi/(omega*math.sqrt(ratio))
J=rho*math.sqrt(rho*a)
z=(rho*(1+1e-4),0,0,J/(rho*(1+1e-4)))
energy=(z[2]**2+z[3]**2)/2-field(z[0])[1]
h=period/20000;angle=0;oldtheta=0;lastdot=0;crossings=[];errE=errJ=0
for i in range(80000):
    z=step(z,h);x,y,u,v=z;rr=math.hypot(x,y)
    theta=math.atan2(y,x);oldangle=angle
    angle+=(theta-oldtheta+math.pi)%(2*math.pi)-math.pi;oldtheta=theta
    dot=x*u+y*v
    if lastdot<0<=dot:
        fraction=-lastdot/(dot-lastdot)
        crossings.append(oldangle+fraction*(angle-oldangle))
    lastdot=dot
    errE=max(errE,abs((u*u+v*v)/2-field(rr)[1]-energy))
    errJ=max(errJ,abs(x*v-y*u-J))
predicted=2*math.pi/math.sqrt(ratio)
measured=sum(b-a for a,b in zip(crossings,crossings[1:]))/(len(crossings)-1)
assert abs(measured-predicted)<1e-6,(measured,predicted)
assert errE<1e-10 and errJ<1e-9,(errE,errJ)
print(f'PASS: near-circular apsidal angle measured={measured:.10f}, predicted={predicted:.10f} rad')
print(f'Max invariant errors: energy={errE:.3g}, angular momentum={errJ:.3g}')
dc=(math.sqrt(13)-1)/2;rc=1/math.sqrt(dc*dc-1)
print(f'Marginal circular stability: r/d={rc:.10f}, rho/d={math.hypot(rc,1):.10f}')
