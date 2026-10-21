"""Exact Binet integration for checkpoint-6 steering; mu=a=1 units."""
import math

def orbit(e,eps,L,n=20000):
    c2=1/eps;d2=2*eps*L;rp=1-e;up=math.sqrt((1+e)/(1-e));jp=rp*up
    def field(rho):
        r=math.sqrt(rho*rho-d2)
        return 2/(r*(rho+r)),2/(rho+r)
    energy=up*up/2-field(rp)[1];gp=math.sqrt(1+up*up/c2)
    def rhs(w,z):
        rho=1/w;A,P=field(rho);g=math.sqrt(1+2*(energy+P)/c2)
        J=jp*math.exp(gp-g)*(g+1)/(gp+1)
        return z,g*A/(J*J*w*w)-w
    w,z=1/rp,0.;h=2*math.pi/n;crossings=[]
    for i in range(3*n+100):
        old=z;k1=rhs(w,z);k2=rhs(w+h*k1[0]/2,z+h*k1[1]/2)
        k3=rhs(w+h*k2[0]/2,z+h*k2[1]/2);k4=rhs(w+h*k3[0],z+h*k3[1])
        w+=h*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6
        z+=h*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6
        if old<0<=z:crossings.append((i-old/(z-old))*h)
    advance=sum(b-a for a,b in zip(crossings,crossings[1:]))/(len(crossings)-1)-2*math.pi
    p=1-e*e;leading=2*math.pi*eps/p+3*math.pi*d2/(2*p*p)
    return advance,leading

for e in [.001,.20563,.5]:
    a,p=orbit(e,1e-4,.2);b,q=orbit(e,5e-5,.2)
    assert abs(b/q-1)<abs(a/p-1) and abs(b/q-1)<.002,(e,a/p,b/q)
    print(f'e={e}: measured/leading {a/p:.9f}, {b/q:.9f} as compactness halves')

G=6.674e-11;M=1.989e30;c=2.998e8;AU=1.496e11;a=.38710*AU;e=.20563;L=6371000/a
eps=G*M/(a*c*c)
coarse,leading=orbit(e,eps,L,20000);fine,_=orbit(e,eps,L,40000)
assert abs(fine-coarse)<1e-10 and abs(fine/leading-1)<.001
period=2*math.pi*math.sqrt(a**3/(G*M));convert=180/math.pi*3600*(100*365.25*86400/period)
standard=6*math.pi*eps/(1-e*e)
print(f'Mercury-like isolated orbit: numerical={fine*convert:.6f}, leading={leading*convert:.6f}, old coefficient={standard*convert:.6f} arcsec/century')
print(f'Step-refinement change {abs(fine-coarse)*convert:.6g} arcsec/century; advance {fine:.12g} rad/orbit')

# Exact circular stability criterion from the linearized planar equations.
for D in [1.001,1.1,1.3]:
    rho=D/math.sqrt(D*D-1);A=D-1;q=rho*A
    z=(q*q+q*math.sqrt(q*q+4))/2;g=math.sqrt(1+z);u=math.sqrt(z)
    Aprime=-(D*D-1)**1.5
    direct=(u*u/rho**2+g*Aprime+(2*u/rho-A*u/g)*u/(rho*g))/(u*u/rho**2)
    formula=1-D*(D+1)+1/g+1/g**3
    assert abs(direct-formula)<1e-12
print('PASS: eccentric Binet integration, weak expansion, refinement, and circular linearization.')
