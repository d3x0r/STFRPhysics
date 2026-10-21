"""Check checkpoint 10 identities; coefficients are diagnostic, not fitted."""
import math

def support(A, B, Q):
    return math.sqrt(A/(B*Q)), math.sqrt(A*B*Q)

for t, c, q in ((.7, -.2, .3), (1., -1., 0.), (0., 0., 0.)):
    for eps in (1e-3, 1e-4, 1e-5):
        size, energy = support(1+t*eps, 1+c*eps, 1+q*eps)
        assert abs(size-1-(t-c-q)*eps/2) < 3*eps**2
        assert abs(energy-1-(t+c+q)*eps/2) < 3*eps**2

# Exactly constant closure energy with varying support, not only linear order.
for u in (-.1, .1, .3):
    size, energy = support(math.exp(u), math.exp(-u), 1)
    assert math.isclose(size, math.exp(u))
    assert math.isclose(energy, 1)

for A, B, Q in ((1.,1.,1.), (1.2,.9,1.1)):
    a, _ = support(A,B,Q)
    def E(x):
        return .5*(A/x+B*Q*x)  # mc^2 = ell_C = 1
    h = a*1e-4
    numerical = (E(a+h)-2*E(a)+E(a-h))/h**2
    assert math.isclose(numerical, A/a**3, rel_tol=1e-7)

def integrate(f, lo, hi, count=2000):
    h = (hi-lo)/count
    return h*(f(lo)+f(hi)+sum((4 if j%2 else 2)*f(lo+j*h)
                             for j in range(1,count)))/3

# c = 1; normal incidence makes the field uniform across the detector plane.
f = lambda t: math.sin(1.3*t)+.2*math.cos(.7*t)
L, t = .8, 2.3
outward = integrate(lambda s: f(t-2*L+s), 0, L)
inward = integrate(lambda s: f(t-L+s), 0, L)
roundtrip = integrate(f,t-2*L,t)
assert math.isclose(outward+inward,roundtrip,rel_tol=1e-12)
print('PASS: support/energy expansion, nonuniqueness, stiffness, two-leg optical response')
