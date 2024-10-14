


v1,v2 are unit vectors already... so rotating them they can end up on the same...

$(A,B)$  $(C,D)$

$(a,b)A$ $(c,d)B$    ;  $(a,b)=\frac{(A,B)}{|(A,B)|}$    $(c,d)= \frac{(C,D)}{|(C,D)|}$ $A=|(A,B)|$  $B=|(C,D)|$

if( $AD$ > $BC$ ) s=1  else s=-1

dot product is (a,b)x(c,d) = (ac+bd)

$s*\sqrt{1-(db+ac)^2}*A*B = (ad-bc)*A*B$

// why isn't that 2 single values, like next is 3 single values?

(bd, ac)



$(A,B,C)$ $(D,E,F)$

$(a,b,c)A$ $(d,e,f)B$  ; $(a,b,c)=\frac{(A,B,C)}{|(A,B,C)|}$ ... $(d,e,f)=\frac{(D,E,F)}{|(D,E,F)|}$  $A={|(A,B,C)|}$ $B={|(D,E,F)|}$


if( BF > EC ) sx=1  else sz=-1

if( CD > FA ) sy=1  else sy=-1

if( AE > DB ) sz=1  else sz=-1

$sx*\sqrt{1-(be+cf)^2} *AB = (bf-ec)*AB$

$sy*\sqrt{1-(cf+ad)^2} *AB = (cd-fa)*AB$

$sz*\sqrt{1-(ad+be)^2}*AB = (ae-db)*AB$


(A,B,C,D) (E,F,G,H)

$(a,b,c,d)A$ $(e,f,g,h)B$  ; $(a,b,c,d)=\frac{(A,B,C,D)}{|(A,B,C,D)|}$ ... $(e,f,g,h)=\frac{(E,F,G,H)}{|(E,F,G,H)|}$  $A={|(A,B,C,D)|}$ $B={|(E,F,G,H)|}$

if( (DG,BH,CF) > (CH,DF,BG)  1  else -1

if( (AH,CE,DG) > (DE,AG,CH)  1  else -1

if( (BE,DF,AH) > (AF,BH,DE)  1  else -1

if( (CF,AG,BE) > (BG,CE,AF)  1  else -1







```

a,A
a,A, b,B
a,A, b,B, c,C
a,A, b,B, c,C, d,D


dot product  # dot #   divide by length of each and will be 1
dot product ## dot ##  divided by length, then this is in a circle, and each is a 1, but 

directionally will result with sin(angle) angle = 0 +/-   

cos(angle) angle=0 when parallel = 1 and either side can't tell...?


dot product ### dot ### is again 0 +/- projection of sin (+90 -90)

dot product #### dot #### has the same rules?  


a       b
a,b     c,d
a,b,c   d,e,f


a,b,c   d,e,f

dot product is sin(theta)  cos(theta) 1 = 0; -1 = 180; 0 = 90

cross product is sin(theta) 1 = 90; -1 = -90; 0 = 0/180 (parallel the cross product is 0)

( sqrt(1-(a.yz*b.yz)^2), sqrt(1-(a.yz*b.yz)^2), sqrt(1-(a.yz*b.yz)^2) )

sqrt(1-(a.yz*b.yz)^2) = a.yb.z - a.zb.y

a = A/|A|
b = B/|B|

sqrt( 1 - (a.y*b.y) ) = aybz

sqrt(1-(a.y*b.y + a.z*b.z)^2) = a.yb.z - a.zb.y

3d cross product
( sqrt(1-(a.y*b.y + a.z*b.z)^2) = ?? /*a.yb.z - a.zb.y ;  parallel dot perpendicular */
, sqrt(1-(a.x*b.x + a.z*b.z)^2) = ?? /*a.xb.z - a.zb.x ;  parallel dot perpendicular */
, sqrt(1-(a.x*b.x + a.y*b.y)^2) = ?? /*a.xb.y - a.zb.y ;  parallel dot perpendicular */
)

correct value - invalid signs... the projection of one on the other is only the angle along up-to anti-along; the perpendicular
taken into the dot product is 0 for aligned, 1 for  perpendicular and 0 again for anti-aligned
although it does go to -1 if it's on the other side of the line - that is - the shortest path to align approaches 0 ; but could go the wrong way

I can do arccos( dot ) = angle between the two  from 1 to -1 and 0 = aligned
arcsin(dot) = 0 when parpendicular and angle toward aligned or anti-aligned is +1 and -1 respectively.

but that still doesn't get me 'side' - what is side in respect to though?
1) it's a shortness up to perpendicular, but greater than 90 degrees looks like less than 90 degrees
2) it's projected on the view angle to that plane - to get front/back

a little Y shape y ... sort of thing, the angle is to one side in the current configuration, where the long 
defined one angle and the short is offset - if it was turned around, then the cross product would be towards the other side
there's a rotation vector perpendicular to the surface of the Y around which the little arm has been turned... 
axis-angle can really only support positive angles, so this angle will always be a positive rotation by some amount.
but this would mean knowing that rotation vector already - when the cross product's result is that vector; and 
so the signs of the results have to be solved such that the dot products are all 0 at the end... 


A x B = 
R dot A and R dot B = 0

(Rx,Ry,Rz) dot (Ax,Ay,Az)


v1,v2 are unit vectors already... so rotating them they can end up on the same...

(A,B)  (C,D)
(a,b)A (c,d)B    ;  (a,b)= (A,B)/|(A,B)|    (c,d)= (C,D)/|(C,D)|

if( AD > BC ) s=1  else s=-1

s*sqrt(1-(ac+db)^2) *A*B = (ad-bc)*A*B


(A,B,C) (D,E,F)
(a,b,c)A (d,e,f)B  ; (a,b,c)=(A,B,C)/|(A,B,C)| ...

if( BF > EC ) sx=1  else sz=-1
if( CD > FA ) sy=1  else sy=-1
if( AE > DB ) sz=1  else sz=-1

sx*sqrt(1-(be+cf)^2) *A*B = (bf-ec)*A*B
sy*sqrt(1-(cf+ad)^2) *A*B = (cd-fa)*A*B
sz*sqrt(1-(ad+be)^2) *A*B = (ae-db)*A*B



(A,B,C,D) (E,F,G,H)
if( (DG,BH,CF) > (CH,DF,BG)  1  else -1
if( (AH,CE,DG) > (DE,AG,CH)  1  else -1
if( (BE,DF,AH) > (AF,BH,DE)  1  else -1
if( (CF,AG,BE) > (BG,CE,AF)  1  else -1



( G dot H ) / |G||H| = cos( between G and H )   acos() = angle between G->H

sin( angle ) ... sqrt(1-coscos) if( cos < 0 )   (0->90  1 to 0    0 to 1 (and to 0)  all positive sign



K/|K| or L/|L|

		const len = Math.sqrt( axis.x * axis.x + axis.y * axis.y + axis.z * axis.z );
		const qx = axis.x / len, qy = axis.y / len, qz = axis.z / len;
		// rodrigues full angle multiply
//		const c = Math.cos(angle*del);
//		const s = Math.sin(angle*del);

c = ( G dot H ) / |G||H|;
s = sqrt( 1- c*c );

		const vx = A , vy = B , vz = C;
		const dot = 0;// (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		
		// this is yet another cross product to have to compute...
		// which are on 2 points to solve
		
		
		
		target.set( vx*c + s*(Ry * vz - Rz * vy) + 0//qx * dot
		          , vy*c + s*(Rz * vx - Rx * vz) + 0//qy * dot
		          , vz*c + s*(Rx * vy - Ry * vx) + 0//qz * dot 
		//          , D*c + s*(qx * vy - qy * vx) + qw * dot 
			);
			
		if( target === A ) {
		   return R
		} else return -R;


sqrt( 1 - (vyqy+vzqz)^2 ), sqrt( 1 - (vyqy+vzqz)^2 ), 




4d cross product is then:
( +/- sqrt(1-(a.w+b.w + a.y*b.y + a.z*b.z)^2)|A||B| = ?? /*a.yb.z - a.zb.y ;  parallel dot perpendicular */
, +/- sqrt(1-(a.w+b.w + a.x*b.x + a.z*b.z)^2)|A||B| 
, +/- sqrt(1-(a.w+b.w + a.y*b.y + a.x*b.x)^2)|A||B|
, +/- sqrt(1-(a.z+b.z + a.y*b.y + a.x*b.x)^2)|A||B| )


1- ayby^2 - 2ayazbybz - azbz^2 = aybz^2 - 2ayazbybz + azby^2

1- ayby^2 ~~- 2ayazbybz~~ - azbz^2 = aybz^2 ~~- 2ayazbybz~~ + azby^2

1 = ayby^2 + azbz^2 + aybz^2 + azby^2


1 = ayay ( byby + bzbz ) +azaz(byby + bzbz )
    (ayay + azaz)(byby+bzbz)
	
	ayaybyby ayaybzbz azazbyby azazbzbz
```