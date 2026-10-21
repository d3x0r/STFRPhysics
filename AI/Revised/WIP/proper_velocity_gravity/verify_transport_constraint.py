"""Algebraic/numerical checks for checkpoint 9; no fitted wave law."""
import math

for d in (0.01, 1.0, 100.0):
    for ratio in (1e-5, .01, .1, 1, 10, 1e3, 1e5):
        r = ratio*d
        rho = math.hypot(r, d)
        delta = d*d/(rho+r)
        derivative = -delta/rho  # ell_0 = 1
        D = rho/r
        alpha = D*(D+1)/2
        flux = r*r*alpha*derivative
        assert math.isclose(flux, -d*d/2, rel_tol=2e-14)
        # Independent finite-difference divergence of required radial flux.
        def radial_flux(x):
            rr = math.hypot(x, d)
            return x*x*(rr*(rr+x)/(2*x*x))*(-d*d/((rr+x)*rr))
        h = r*1e-4
        residual = (radial_flux(r+h)-radial_flux(r-h))/(2*h)
        assert abs(residual)*r/(d*d) < 1e-10

values = []
for d in (2., 3.):
    delta = 1.
    r = (d*d-delta*delta)/(2*delta)
    rho = math.hypot(r, d)
    assert math.isclose(rho-r, delta)
    D = rho/r
    values.append(D*(D+1)/2)
assert math.isclose(values[0], 20/9)
assert math.isclose(values[1], 45/32)

for n in ((0,0,1), (1,0,0), (1/math.sqrt(2),1/math.sqrt(2),0)):
    b = .01
    e = [[b*((1 if i == j else 0)-2*n[i]*n[j]) for j in range(3)] for i in range(3)]
    diff = e[0][0]-e[1][1]
    assert math.isclose(diff, -2*b*(n[0]**2-n[1]**2), abs_tol=1e-16)
    if n[2] == 1:
        assert diff == 0 and e[0][0] == b and e[2][2] == -b
print('PASS: exact radial flux, divergence, depth-only counterexample, arm projection')
