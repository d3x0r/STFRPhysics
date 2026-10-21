"""Exterior composition and response-conversion identities, standard library."""
import math

def norm(v): return math.sqrt(sum(x*x for x in v))
def sub(a,b): return [x-y for x,y in zip(a,b)]
def add(a,b): return [x+y for x,y in zip(a,b)]
def mv(a,v): return [sum(x*y for x,y in zip(row,v)) for row in a]
def mm(a,b): return [[sum(a[i][k]*b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
def det(a):
    return sum(a[0][j]*(a[1][(j+1)%3]*a[2][(j+2)%3]-a[1][(j+2)%3]*a[2][(j+1)%3]) for j in range(3))
def mapped(x,d):
    r=norm(x); D=math.hypot(r,d)/r
    return [D*t for t in x]
def jac(x,d,inverse=False):
    r=norm(x); n=[v/r for v in x]; D=math.hypot(r,d)/r
    radial,tang=(D,1/D) if inverse else (1/D,D)
    return [[(tang if i==j else 0)+(radial-tang)*n[i]*n[j] for j in range(3)] for i in range(3)]
def close(a,b,tol=2e-7):
    assert max(abs(x-y) for x,y in zip(a,b)) < tol*max(1.,norm(b)), (a,b)

ds,dt=2.,.15
b=[4.,0.,0.]; B=mapped(b,ds)
def composite(x): return add(B,mapped(sub(mapped(x,ds),B),dt))
worst=0.
for x in ([4.3,.2,.1],[3.7,-.3,.15],[4.01,.02,-.03]):
    y=mapped(x,ds); u=sub(y,B)
    es,et=jac(x,ds),jac(u,dt)
    j=mm(et,es); inv=jac(u,dt,True)
    h=1e-6
    for k in range(3):
        step=[h if k==i else 0 for i in range(3)]
        numeric=[v/(2*h) for v in sub(composite(add(x,step)),composite(sub(x,step)))]
        exact=[j[i][k] for i in range(3)]
        close(numeric,exact)
        worst=max(worst,max(abs(a-c) for a,c in zip(numeric,exact)))
    expected=math.hypot(norm(x),ds)/norm(x)*math.hypot(norm(u),dt)/norm(u)
    assert math.isclose(det(j),expected,rel_tol=1e-12)
    def potential(y):
        rho=norm(y); r=math.sqrt(rho*rho-ds*ds)
        return ds*ds/(rho+r)
    rho=norm(y); r=math.sqrt(rho*rho-ds*ds)
    A=ds*ds/((rho+r)*r)
    accel=[-A*v/rho for v in y]
    z=composite(x)
    def phi_z(z):
        w=sub(z,B); q=norm(w)
        y=add(B,[v*math.sqrt(q*q-dt*dt)/q for v in w])
        return potential(y)
    numerical=[]
    for k in range(3):
        step=[h if k==i else 0 for i in range(3)]
        numerical.append((phi_z(add(z,step))-phi_z(sub(z,step)))/(2*h))
    grad=mv(inv,accel)
    close(numerical,grad)
    close(mv(mm(et,et),grad),mv(et,accel),1e-12)
print(f'PASS: composite Jacobian (max absolute residual {worst:.3e}), determinant, scalar gradient, kinetic metric')
