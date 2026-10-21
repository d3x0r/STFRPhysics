"""Coordinate-consistency diagnostic; no microscopic binding law is inferred."""
import math

def mapping(t):
    return (1+.2*math.sin(.7*t), .14*math.cos(.7*t), -.098*math.sin(.7*t))

def response(t, ell):
    tide = .08*math.cos(.9*t)
    return tide*ell-4*(ell-1)

def rhs(t, state):
    ell, vel, x, vx, bad, vbad = state
    e, de, dde = mapping(t)
    return [vel, response(t,ell), vx,
            (response(t,e*x)-2*de*vx-dde*x)/e,
            vbad, response(t,bad)+dde/e*bad]

def step(t, s, h):
    k1 = rhs(t,s)
    k2 = rhs(t+h/2,[v+h*k/2 for v,k in zip(s,k1)])
    k3 = rhs(t+h/2,[v+h*k/2 for v,k in zip(s,k2)])
    k4 = rhs(t+h,[v+h*k for v,k in zip(s,k3)])
    return [v+h*(a+2*b+2*c+d)/6 for v,a,b,c,d in zip(s,k1,k2,k3,k4)]

def run(h):
    e,de,_ = mapping(0)
    s = [1,0,1/e,-de/e**2,1,0]
    error = bad_error = 0
    for j in range(round(20/h)):
        s = step(j*h,s,h)
        e,de,_ = mapping((j+1)*h)
        error = max(error,abs(s[0]-e*s[2]),abs(s[1]-e*s[3]-de*s[2]))
        bad_error = max(bad_error,abs(s[0]-s[4]))
    return error,bad_error

coarse,_ = run(.02)
fine,bad = run(.01)
assert fine < coarse/10 and fine < 1e-8
assert bad > .01

for u in (.05,.3,.7,.95):
    energy = lambda x: 2**(1/(3-x))
    h = 1e-5
    derivative = (energy(u+h)-energy(u-h))/(2*h)
    expected = energy(u)*math.log(2)/(3-u)**2
    assert derivative > 0 and math.isclose(derivative,expected,rel_tol=1e-8)
print(f'PASS: mapped/realized state max error {fine:.3e}; refinement {coarse/fine:.2f}x')
print(f'PASS: double-counting negative control differs by {bad:.3e}; overlap derivative positive')
