"""Separated test-body field samples; no overlap or binding law is used."""
import math

C = 3e8
ELL0 = 6371000.
K = C*C/ELL0
R0 = 1.2187e-15

def field_gap(d, q, k=K):
    # Keep the gap separate: d+q can round to d near a large source.
    r = math.sqrt(q)*math.sqrt(2*d+q)
    rho = d+q
    delta = d*(d/(rho+r))
    A = k*delta/r
    radial = k*(d/r)**2/r
    transverse = -A/rho
    return A, radial, transverse, delta, r

def check():
    for q in (1e-8, .001, .1, 1., 10., 1e3):
        A, radial, tang, delta, r = field_gap(1.,q,1.)
        h = q*1e-5
        derivative = (field_gap(1.,q-h,1.)[0]-field_gap(1.,q+h,1.)[0])/(2*h)
        assert math.isclose(derivative,radial,rel_tol=3e-7)
        D = (1+q)/r
        assert math.isclose(radial/-tang,D*(D+1),rel_tol=1e-13)
        halfspan = q*.1
        near = field_gap(1.,q-halfspan,1.)
        far = field_gap(1.,q+halfspan,1.)
        # Uniform radial line average: exact integral versus Simpson quadrature.
        exact = (near[3]+far[3])/(near[4]+far[4])
        n=1000; step=2*halfspan/n
        integral = step/3*(near[0]+far[0]+sum(
            (4 if j%2 else 2)*field_gap(1.,q-halfspan+j*step,1.)[0]
            for j in range(1,n)))
        assert math.isclose(integral/(2*halfspan),exact,rel_tol=2e-11)
        ratios=[]
        for size in (.1,.05):
            a=q*size
            diff=field_gap(1.,q-a,1.)[0]-field_gap(1.,q+a,1.)[0]
            ratios.append(abs(diff/(2*a*radial)-1))
        assert ratios[1]<ratios[0]/3.8
    print('PASS: radial gradient, transverse ratio, finite-line integral, small-span convergence')

def table():
    print('| Source d (m) | Surface gap h/r0 | Centre acceleration (m/s^2) | Near-minus-far magnitude (m/s^2) | Spread / centre | v_escape/c |')
    print('|---:|---:|---:|---:|---:|---:|')
    for d in (1.37087e5, 2.84e8):
        for gap_ratio in (100.,1.):
            a=R0; h=gap_ratio*R0; q=h+a
            centre=field_gap(d,q)
            near=field_gap(d,h);far=field_gap(d,h+2*a)
            diff=near[0]-far[0]
            sigma=centre[3]/ELL0
            v=math.sqrt(2*sigma/(1+2*sigma))
            print(f'| {d:.6g} | {gap_ratio:g} | {centre[0]:.6e} | {diff:.6e} | {diff/centre[0]:.6f} | {v:.8f} |')
    print('Earth surface:')
    d=237.501817708; r=6371000.
    rho=math.hypot(r,d)
    delta=d*d/(rho+r)
    A=K*delta/r
    radial=K*d*d/r**3
    print(f'A={A:.9g} m/s^2; radial gradient={radial:.9g} s^-2; spread over 2r0={2*R0*radial:.9g} m/s^2')

if __name__ == '__main__':
    check()
    table()
