"""Fixed-source cross interaction; dimensionless K=d_s=1."""
import math
from verify_separated_test_body import field_gap

def average(q,a):
    n=field_gap(1,q-a,1);f=field_gap(1,q+a,1)
    return (n[3]+f[3])/(n[4]+f[4])

def energy(q,a):
    n=1000;h=2*a/n
    val=lambda x:-field_gap(1,x,1)[3]
    return h/3*(val(q-a)+val(q+a)+sum((4 if j%2 else 2)*val(q-a+j*h) for j in range(1,n)))/(2*a)

for q in (.01,.2,2.,20.):
    a=.05*q;h=q*1e-5
    derivative=(energy(q+h,a)-energy(q-h,a))/(2*h)
    assert math.isclose(derivative,average(q,a),rel_tol=2e-7)
    A,_,_,_,r=field_gap(1,q,1)
    second=3*(1+q)/r**5
    errors=[]
    for a in (.1*q,.05*q):
        actual=average(q,a)-A
        leading=a*a*second/6
        errors.append(abs(actual/leading-1))
    assert errors[1]<errors[0]/3.8

for h_over_a in (100.,1.):
    q=1e-12;a=q/(h_over_a+1)
    exact=average(q,a)/field_gap(1,q,1)[0]
    asymptotic=2*math.sqrt(q)/(math.sqrt(q+a)+math.sqrt(q-a))
    assert math.isclose(exact,asymptotic,rel_tol=1e-7)
    print(f'h/a={h_over_a:g}: mean excess={(asymptotic-1)*100:.7f}%')
print('PASS: interaction-energy derivative, finite-size expansion, near-surface mean')
