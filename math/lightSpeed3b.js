
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );
import {lnQuat} from "../3d/src/lnQuatSq.js"

let showXTGraph = false;
let showXTGraph_unbiased = false;
let showSelf = false;
let showObserver = false;
let showRelativeVelocities = false;
let includeAberration = true;
let lockVelocity = false;
let lengthContract = 1;
let A=0;
let ca = Math.cos(A);
let sa = -Math.sin(A);
let A_o = 0;
let ca_o = Math.cos( A_o );
let sa_o = -Math.sin( A_o );

let L=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let D2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.6184/5; // velocity  (m/s)
let myV=0.5*0.6184/5; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let runT = 20;
let E = 0;
let now = 0;
let animate = true;
const step = 10;

const frames = [];
let curFrame = -1;
const nFrames = 101;
let eventFrame = -1;

//------------------ Storage for information about a frame ---------------------------

class Frame{
	PobsrX = 0; // position observer
	PobsrY = 0; // position observer
	PobsdX = 0; // position observer
	PobsdY = 0; // position observer
	Ph = 0; // position head
	Pc = 0; // postion center
	Pt = 0; // position tail
	hue = 0;
	T_start = 0; // time start event
	Event = 0;

	T_see_h = 0; // when head is seen by observer
	T_see_c = 0; // when center is seen by observer                      
	T_see_t = 0; // when tail is seen by observer

	P_see_h = 0; // when head is seen by observer
	P_see_c = 0; // when center is seen by observer                      
	P_see_t = 0; // when tail is seen by observer

	T_end = 0; // when we can stop drawing...
}

for( let n = 0; n < nFrames; n++ ) {
	frames.push( new Frame() );
}


function aberration_orig(th,V) {
	const a = Math.acos( (Math.cos(th)+V/C)/(1+V/C*Math.cos(th)) )
	return a;
}


function aberration( X, Vo, Xo ) {
	// light direction (X-Xo) dot Vo/C = Vdot = |X-Xo||1|cos(th)
	//    Vdot/||(X-Xo) = cos(th)
	//  sindot =  sin(th) =  sqrt( 1-cos*cos );
	//  X += sinDot * Vo/C
	if( !includeAberration ) {
		return X;
	}
	const Xr = {x:0,y:0,z:0}
	const delx = X.x-Xo.x;
	const dely = X.y-Xo.y;
	const delz = X.z-Xo.z;
	const len2 = delx*delx+dely*dely+delz*delz;
	const Vlen2 = Vo.x*Vo.x+Vo.y*Vo.y+Vo.z*Vo.z;
	const Vdot = delx * Vo.x + dely * Vo.y + delz * Vo.z;
	const Vcrs = { x: delz*Vo.y-dely*Vo.z, y: delx*Vo.z-delz*Vo.x, z: dely*Vo.x-delx*Vo.y }
	if( len2 < 0.0000001 || Vlen2 < 0.000001) {
		// not far enough away to change...
		Xr.x = X.x;
		Xr.y = X.y;
		Xr.z = X.z;
		
	} else {
		const len = Math.sqrt(len2);
		const Vlen = Math.sqrt(Vlen2);
		const norm = Vlen*len;
 		//const vAng = Math.acos( Vo.x/Vlen ) * (Vo.y<0?1:-1);
		 //console.log( "velocity angle:", vAng, "from", Vlen );
		const CosVDot = Vdot/(norm);
		const baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/C ) 
				/ ( 1 + Vlen/C * CosVDot ) )-baseAng;//*((Vcrs.z<0)?-1:1);

		if( !delAng ) {
			Xr.x = X.x;
			Xr.y = X.y;
			Xr.z = X.z;
			return Xr;
		}
		const c = Math.cos(delAng);
		const s = Math.sin(delAng);
		const n = Math.sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
//console.log( "blah?", norm, );
		const qx = Vcrs.x/n;
		const qy = Vcrs.y/n;
		const qz = Vcrs.z/n;

		const vx = delx , vy = dely , vz = delz;

		const dot =  (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
		Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
		Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;
		
/*
		const lnQ = new lnQuat( delAng, Vcrs ); // normalizes vector
		const delVec = {x:delx, y:dely, z:delz };
		const newDel = lnQ.apply( delVec )

		Xr.x = Xo.x + newDel.x;
		Xr.y = Xo.y + newDel.y;
		Xr.z = Xo.z + newDel.z;
*/
	}
	return Xr;
}

//const d3xTransform = new D3xTransform();
class D3xTransform {
	// converts a long time to a short time.
	
	static get gamma() { return  (C*C-V*V)/C*C };
 	static getObservedTime(X,T,myV) {
		myV = myV || 0;
		const willSee = RealTime( T, {x:V,y:0,z:0}, {x:X, y:0, z:0}, {x:myV,y:0,z:0}, {x:0, y:0, z:0} );
		return willSee[0];
	}
 	static getObservedPlace(X,T,V,myV) {
 	   myV = myV || 0;
		const willSee = RealTime( T, {x:V,y:0,z:0}, {x:X, y:D, z:0}, {x:myV,y:0,z:0}, {x:0, y:0, z:0} ); 
		return willSee[0] * V + X;
	}
 	static getObservedPlace2(X,T) {
		const willSee2 = RealTime( T, {x:V,y:0,z:0}, {x:X, y:D, z:0}, {x:myV,y:0,z:0}, {x:0, y:0, z:0} ); 
		return willSee2[0] * V + X - willSee2[0]*myV;
	}

	static GetSeenSpace( C, now, pos, V, L, D ) {
		const A = pos;//((now*V)- L);
		// how long it will take to be seen at the current velocities...
		//const gamma = (C*C-V*V)/C;
		const hLen = ((A*V+Math.sqrt(A*A*C*C+D*D*(C*C-V*V)))/(C*C-V*V));
		return { now, pos:now*V, see_pos:pos+now*V+hLen*V, seen:now+hLen }
		//frame.T_start = now;
		//frame.Ph = frame.Pc + hLen*V;
		//frame.T_see_h = now+hLen;

	}

	static drawCoords( atNow ) {
		const xscale_ = xscale/3.5;
		const ofs = 500;//xscale_ * 13;

// velocity ratio line.
/*
		ctx.beginPath();
		ctx.strokeStyle= "white";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*(-10*(V/C) ) );
		ctx.stroke();
*/
   if(0) { // show velocity vector...
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle= "red";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + 10*(xscale_)*(V/(C*C-V*V)), ofs - 10*xscale_ );
		ctx.stroke();

		ctx.lineWidth = 2;
	}
	const myX = now*myV*ca_o;
	const myY = now*myV*sa_o;
	const posX = now*V*ca;
	const posY = now*V*sa;

	const delVX = V*ca - myV*ca_o ;
	const delVY = V*sa - myV*sa_o ;

					let seen  = RealTime( now, { x: V*ca, y: V*sa, z: 0 }
									, { x:0, y:-D, z:0 }
									, { x:ca_o*myV, y:sa_o*myV, z: 0 }
									, { x:0, y:0, z:0 } );

//seen

			ctx.lineWidth = 0.5;

			if( showRelativeVelocities ) 
	for( let n = 0; n < nFrames; n++ ) {
		const frame = frames[n];
		if( frame.T_start <= seen[0] ) {
			if( showRelativeVelocities ) {
			if( n > 1 )  {
			const frame0 = frames[n-1];
			ctx.beginPath();
			ctx.moveTo( ofs + (xscale_)* (frame.PobsdX -myX), ofs+(xscale_)*(frame.PobsdY-myY ) )
//			ctx.lineTo( ofs + (xscale_)* (frame.PobsdX + ((frame.PobsdX-frame.PobsrX)-(frame0.PobsdX-frame0.PobsrX))*3 -myX)
//							, ofs+(xscale_)*(frame.PobsdY + ((frame.PobsdY-frame.PobsrY)-(frame0.PobsdY-frame0.PobsrY))*3 -myY) )
/*
			const speed = Math.sqrt( (frame.delX-frame0.delX) * (frame.delX-frame0.delX) + (frame.delY-frame0.delY) * (frame.delY-frame0.delY));
			ctx.lineTo( ofs + (xscale_)* (frame.PobsdX - (speed * (frame.PobsdX-frame.PobsrX))*5 -myX)
							, ofs+(xscale_)*(frame.PobsdY - (speed*(frame.PobsdX-frame.PobsrX))*5 -myY) )
*/
			ctx.lineTo( ofs + (xscale_)* (frame.PobsdX + ((frame.delX)-(frame0.delX))*10 -myX)
							, ofs+(xscale_)*(frame.PobsdY + ((frame.delY)-(frame0.delY))*10 -myY) )
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.lineWidth = 0.5;
			}
			}
			ctx.beginPath();
			//ctx.moveTo( ofs + (xscale_)* (frame.PobsrX+L/3 ), ofs+(xscale_)*(frame.PobsrY-L/3 ) )
			//ctx.lineTo( ofs + (xscale_)* (frame.PobsrX-L/3 ), ofs+(xscale_)*(frame.PobsrY+L/3 ) )
			ctx.strokeStyle = "#f0f"

			ctx.moveTo( ofs + (xscale_)* (delVX*frame.T_start-L/3 ), ofs+(xscale_)*(delVY*frame.T_start-L/3 ) )
			ctx.lineTo( ofs + (xscale_)* (delVX*frame.T_start+L/3 ), ofs+(xscale_)*(delVY*frame.T_start+L/3 ) )
			ctx.moveTo( ofs + (xscale_)* (delVX*frame.T_start+L/3 ), ofs+(xscale_)*(delVY*frame.T_start-L/3 ) )
			ctx.lineTo( ofs + (xscale_)* (delVX*frame.T_start-L/3 ), ofs+(xscale_)*(delVY*frame.T_start+L/3 ) )
			ctx.stroke();
			ctx.beginPath();

			if( frame.T_start <= seen[0] ){
			if( Math.abs(frame.T_start - seen[0] ) < 0.001 ) 
				ctx.strokeStyle= "green";
			else
				ctx.strokeStyle = "yellow"

			ctx.moveTo( ofs + (xscale_)* (frame.PobsdX-L/3 -myX), ofs+(xscale_)*(frame.PobsdY-L/3-myY ) )
			ctx.lineTo( ofs + (xscale_)* (frame.PobsdX+L/3 -myX ), ofs+(xscale_)*(frame.PobsdY+L/3-myY ) )
			ctx.moveTo( ofs + (xscale_)* (frame.PobsdX+L/3 -myX ), ofs+(xscale_)*(frame.PobsdY-L/3-myY ) )
			ctx.lineTo( ofs + (xscale_)* (frame.PobsdX-L/3 -myX ), ofs+(xscale_)*(frame.PobsdY+L/3-myY ) )
			}

			ctx.stroke();
		}

	}

			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.strokeStyle = "#0F0"
			ctx.moveTo( ofs + (xscale_)* (V*seen[0]*ca-L/3 -myX), ofs+(xscale_)*(V*seen[0]*sa-L/3-D -myY) )
			ctx.lineTo( ofs + (xscale_)* (V*seen[0]*ca+L/3 -myX), ofs+(xscale_)*(V*seen[0]*sa+L/3-D -myY) )
			ctx.moveTo( ofs + (xscale_)* (V*seen[0]*ca+L/3 -myX), ofs+(xscale_)*(V*seen[0]*sa-L/3-D -myY) )
			ctx.lineTo( ofs + (xscale_)* (V*seen[0]*ca-L/3 -myX), ofs+(xscale_)*(V*seen[0]*sa+L/3-D -myY) )
			ctx.stroke();
			ctx.lineWidth = 1;


	if(showXTGraph) {
		const gamma = lengthContract*(C-V)/C;  // This matches the matrual curve (at C=1)
		//const gamma = Math.sqrt( C*C-V*V);
		const gamma2 = lengthContract*(C+V)/C;
// Lorentz Transform Grid, based on velocity ratio line.
		for( let X = -10; X < 10; X++ ) 
		{
			ctx.beginPath();
			ctx.strokeStyle= "white";
			ctx.lineWidth = 3;
			//if( X > 0 )
			{
				ctx.moveTo( ofs - (xscale_)*(0), ofs  - (xscale_)*(+X)*(gamma) );
				ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*((-10*V/C-X*(gamma))) );
				ctx.moveTo( ofs + (xscale_)*((X))*(gamma), ofs  - (xscale_)*(-0) );
				ctx.lineTo( ofs + (xscale_)*(10*V/C+X*(gamma)), ofs + (xscale_)*(-10 ) );
			}


			{
				ctx.moveTo( ofs - (xscale_)*(0), ofs  - (xscale_)*(+X)*(gamma2) );
				ctx.lineTo( ofs + (xscale_)*(-10), ofs + (xscale_)*((10*V/C-X*(gamma2))) );
				ctx.moveTo( ofs + (xscale_)*((-X))*(gamma2), ofs  - (xscale_)*(-0) );
				ctx.lineTo( ofs + (xscale_)*(-10*V/C-X*(gamma2)), ofs + (xscale_)*(10 ) );
			}

			ctx.stroke();
		}	
	}



	ctx.strokeWidth= 1.5;


		for( let X = -20*lengthContract; X < 20*lengthContract; X+=1*lengthContract ) {
			for( let T = 10; T > -10; T-=1 ) {

				{
					ctx.beginPath();
					ctx.strokeStyle= "blue";
					ctx.moveTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(X+1), ofs + (xscale_)*(T) );
					ctx.moveTo( ofs +  (xscale_)*(X), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T-1) );
					ctx.stroke();
				}	
				if(1)
				{						
					let here  = RealTime( now, { x: V*ca, y: V*sa, z: 0 }
									, { x:X, y:T-D, z:0 }
									, { x:ca_o*myV, y:sa_o*myV, z: 0 }
									, { x:0, y:0, z:0 } );
							//observedTimeToRealTimeXYZ2( now, V, +0*V*now*ca + X, T+0*V*now*sa-D, 0, myV, 0*myX, 0*myY, 0, ca, sa, ca_o, sa_o );
					const hx =  here[0] * (V) * ca + X - myX;
					const hy =  here[0] * (V) * sa + T-D - myY;
					const here_abb = aberration( {x:hx, y:hy, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
					let right = RealTime( now, { x: V*ca, y: V*sa, z: 0 }
											, { x:X+1, y:T-D, z:0 }
											, { x:ca_o*myV, y:sa_o*myV, z: 0 }
											, { x:0, y:0, z:0 } );
							//observedTimeToRealTimeXYZ2( now, V, +0*V*now*ca + X+1, T+0*V*now*sa-D, 0, myV, 0*myX, 0*myY, 0, ca, sa, ca_o, sa_o );
					const rx =  right[0] * (V) * ca + (X+1) - myX;
					const ry =  right[0] * (V) * sa + T-D - myY;

					const right_abb = aberration( {x:rx, y:ry, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
					
					let next   = RealTime( now, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:T+1-D, z:0 }, { x:ca_o*myV, y:sa_o*myV, z: 0 }, { x:0, y:0, z:0 } );
							//observedTimeToRealTimeXYZ2( now, V, +0*V*now*ca + X, T+0*V*now*sa+1-D, 0, myV, 0*myX, 0*myY, 0, ca, sa, ca_o, sa_o );
					const nx =  next[0] * (V) * ca + X - myX;
					const ny =  next[0] * (V) * sa + (T+1)-D - myY;

					const next_abb = aberration( {x:nx, y:ny, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );

					ctx.beginPath();
				//console.log( "BLAH:", (Math.floor((X+20)/40*255)).toString(16).padStart( '0', 2 ) );
					ctx.strokeStyle= "red";
					//ctx.strokeStyle= `#${Math.floor(((X+20)/40*255)).toString(16).padStart( '0', 2 ) }0000`;
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs + (xscale_)*(here_abb.x), ofs + (xscale_)*(here_abb.y) );
					ctx.lineTo( ofs + (xscale_)*(right_abb.x), ofs + (xscale_)*(right_abb.y) );
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs +  (xscale_)*(here_abb.x), ofs + (xscale_)*(here_abb.y) );
					ctx.lineTo( ofs + (xscale_)*(next_abb.x), ofs + (xscale_)*(next_abb.y) );
					ctx.stroke();

if(0)
					if( here.length > 1 )
					{
						const hx =  here[1] * (V) * ca + X - myX;
						const hy =  here[1] * (V) * sa + T-D - myY;
						const rx =  right[1] * (V) * ca + (X+1) - myX;
						const ry =  right[1] * (V) * sa + T-D - myY;
						const nx =  next[1] * (V) * ca + X - myX;
						const ny =  next[1] * (V) * sa + (T+1)-D - myY;

						ctx.beginPath();
					//console.log( "BLAH:", (Math.floor((X+20)/40*255)).toString(16).padStart( '0', 2 ) );
						ctx.strokeStyle= "red";
						//ctx.strokeStyle= `#${Math.floor(((X+20)/40*255)).toString(16).padStart( '0', 2 ) }0000`;
						//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
						ctx.moveTo( ofs + (xscale_)*(hx), ofs + (xscale_)*(hy) );
						ctx.lineTo( ofs + (xscale_)*(rx), ofs + (xscale_)*(ry) );
						//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
						ctx.moveTo( ofs +  (xscale_)*(hx), ofs + (xscale_)*(hy) );
						ctx.lineTo( ofs + (xscale_)*(nx), ofs + (xscale_)*(ny) );
						ctx.stroke();
					}

					if( showObserver )
					{
						let here  = observedTimeToRealTimeXYZ2( now, myV, X, T, 0, V, 0, 0, 0, ca_o, sa_o, ca, sa );
						const hx =  here[0] * (myV) * ca_o + X - posX;
						const hy =  here[0] * (myV) * sa_o + T+D - posY;

						let right = observedTimeToRealTimeXYZ2( now, myV, X+1, T, 0, V, +0, 0, 0, ca_o, sa_o, ca, sa );
						const rx =  right[0] * (myV) * ca_o + (X+1) - posX;
						const ry =  right[0] * (myV) * sa_o + T+D - posY;
						let next   = observedTimeToRealTimeXYZ2( now, myV, X, T+1, 0, V, +0, 0, 0, ca_o, sa_o, ca, sa );
						const nx =  next[0] * (myV) * ca_o + X - posX;
						const ny =  next[0] * (myV) * sa_o + (T+1)+D - posY;

						ctx.beginPath();
						ctx.strokeStyle= "green";
						//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
						ctx.moveTo( ofs + (xscale_)*(hx), ofs + (xscale_)*(hy) );
						ctx.lineTo( ofs + (xscale_)*(rx), ofs + (xscale_)*(ry) );
						//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
						ctx.moveTo( ofs +  (xscale_)*(hx), ofs + (xscale_)*(hy) );
						ctx.lineTo( ofs + (xscale_)*(nx), ofs + (xscale_)*(ny) );
						ctx.stroke();
					}
				}

			if( showXTGraph) {
					ctx.beginPath();
					const ox  = D3xTransform.getObservedPlace2(X,T);
					const oxo = D3xTransform.getObservedPlace2(X+1,T);
					const oxt = D3xTransform.getObservedPlace2(X,T+1);
					const ot  = D3xTransform.getObservedTime(X,T)+Math.abs(X);
					const oto = D3xTransform.getObservedTime(X+1,T)+(Math.abs(X)+(X>-1?1:-1));
					const ott = D3xTransform.getObservedTime(X,T+1)+Math.abs(X);
					if( T === 0 ){
						ctx.lineWidth = 5;
						ctx.strokeStyle= "green";
					}
					else{
						ctx.lineWidth = 2;
						ctx.strokeStyle= "yellow";
					}
					ctx.moveTo( ofs + (xscale_)*(ox), ofs - (xscale_)*(ot) );
					ctx.lineTo( ofs + (xscale_)*(oxo), ofs - (xscale_)*(oto) );
					ctx.stroke();

					if( T === 0 ){
						ctx.lineWidth = 2;
					}
					ctx.beginPath();
					ctx.strokeStyle= "red";
					ctx.moveTo( ofs +  (xscale_)*(ox), ofs - (xscale_)*(ot) );
					ctx.lineTo( ofs + (xscale_)*(oxt), ofs - (xscale_)*(ott) );
					ctx.stroke();

			}

			if( showXTGraph_unbiased) {
				ctx.beginPath();
				const ox  = D3xTransform.getObservedPlace2(X,T);
				const oxo = D3xTransform.getObservedPlace2(X+1,T);
				const oxt = D3xTransform.getObservedPlace2(X,T+1);
				const ot  = D3xTransform.getObservedTime(X,T);
				const oto = D3xTransform.getObservedTime(X+1,T);
				const ott = D3xTransform.getObservedTime(X,T+1);
				if( T === 0 ){
					ctx.lineWidth = 5;
					ctx.strokeStyle= "green";
				}
				else{
					ctx.lineWidth = 2;
					ctx.strokeStyle= "yellow";
				}
				const ox_abb = aberration( {x:ox, y:ot, z:0 }, {x:myV, y:0, z:0 }, {x:0, y:0, z:0} );
				const ot_abb = aberration( {x:oxo, y:oto, z:0 }, {x:myV, y:0, z:0 }, {x:0, y:0, z:0} );
				const ott_abb = aberration( {x:oxt, y:ott, z:0 }, {x:myV, y:0, z:0 }, {x:0, y:0, z:0} );
	

				ctx.moveTo( ofs + (xscale_)*(ox_abb.x), ofs - (xscale_)*(ox_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(ot_abb.x), ofs - (xscale_)*(ot_abb.y) );
				ctx.stroke();

				if( T === 0 ){
					ctx.lineWidth = 2;
				}
				ctx.beginPath();
				ctx.strokeStyle= "red";
				ctx.moveTo( ofs +  (xscale_)*(ox_abb.x), ofs - (xscale_)*(ox_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(ott_abb.x), ofs - (xscale_)*(ott_abb.y) );
				ctx.stroke();

		}

			ctx.lineWidth = 1;

		}

		ctx.font = "lighter 24px serif";
		ctx.strokeStyle= "yellow";
		ctx.strokeWidth= 1;
		ctx.fillStyle= "yellow";
		ctx.fillText( "Observed Space", 10, 10 + 0.5*xscale_);//-L*xscale_ ); 
		function doSegA( seg ) {

			function _doSeg(tailx,taily, headx, heady) {

			let tail  = observedTimeToRealTimeXYZ2( now, V, tailx, taily - D, 0, myV, 0, 0, 0, ca, sa, ca_o, sa_o );
			let head  = observedTimeToRealTimeXYZ2( now, V, headx, heady - D, 0, myV, 0, 0, 0, ca, sa, ca_o, sa_o );

			const hdx =  head[0] * (V) * ca +headx - myX;
			const hdy =  head[0] * (V) * sa +heady  - myY-D;
			const tx =  tail[0] * (V) * ca +tailx - myX;
			const ty =  tail[0] * (V) * sa +taily - myY-D;

			const head_abb = aberration( {x:hdx, y:hdy, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
			const tail_abb = aberration( {x:tx, y:ty, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );

			ctx.beginPath();
			//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
			if( !showSelf && !showObserver )
				ctx.strokeStyle =  `hsl(${(head[0]%3)*120+120},100%,50%)`

			ctx.moveTo( ofs + (xscale_)*(head_abb.x), ofs + (xscale_)*(head_abb.y) );
			ctx.lineTo( ofs + (xscale_)*(tail_abb.x), ofs + (xscale_)*(tail_abb.y) );
			ctx.stroke();
			if( head.length > 1 ) {
				const hdx =  head[1] * (V) * ca +headx - myX;
				const hdy =  head[1] * (V) * sa +heady  - myY-D;
				const tx =  tail[1] * (V) * ca +tailx - myX;
				const ty =  tail[1] * (V) * sa +taily - myY-D;

				const head_abb = aberration( {x:hdx, y:hdy, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
				const tail_abb = aberration( {x:tx, y:ty, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
				ctx.beginPath();
				//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
				ctx.moveTo( ofs + (xscale_)*(head_abb.x), ofs + (xscale_)*(head_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(tail_abb.x), ofs + (xscale_)*(tail_abb.y) );
				ctx.stroke();
			}

		}

		function __doSeg( a,b,c,d ) {
			const _a = a - a*ca * ( 1 - lengthContract );
			const _b = b - b*sa * ( 1 - lengthContract );
			const _c = c - c*ca * ( 1 - lengthContract );
			const _d = d - d*sa * ( 1 - lengthContract );
			return _doSeg( _a,_b,_c,_d );
		}

			__doSeg( -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L, -L );
			__doSeg( -L +((seg)/10)*L, L, -L +((seg+1)/10)*L, L );
			__doSeg( -L, -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L );
			__doSeg( L, -L +((seg)/10)*L, L, -L +((seg+1)/10)*L );
		}
		for( let seg = 0; seg < 20; seg++ ){ 
			doSegA( seg );
		}
		if(1)
		{
			ctx.beginPath();
			ctx.strokeStyle= "yellow";
			ctx.strokeWidth= 3;

			ctx.moveTo( ofs + (xscale_)* (posX+runT*V*ca  -myX), ofs+(xscale_)*(posY+runT*V*sa -D -myY) )
			ctx.lineTo( ofs + (xscale_)* (posX-runT*V*ca  -myX), ofs+(xscale_)*(posY-runT*V*sa -D -myY) )
			ctx.moveTo( ofs + (xscale_)* (posX-L/3  -myX), ofs+(xscale_)*(posY-L/3 -D -myY) )
			ctx.lineTo( ofs + (xscale_)* (posX+L/3  -myX), ofs+(xscale_)*(posY+L/3 -D -myY) )
			ctx.moveTo( ofs + (xscale_)* (posX+L/3  -myX), ofs+(xscale_)*(posY-L/3 -D -myY) )
			ctx.lineTo( ofs + (xscale_)* (posX-L/3  -myX), ofs+(xscale_)*(posY+L/3 -D -myY) )
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "#55A"
			ctx.moveTo( ofs + (xscale_)* (-L/3 ), ofs+(xscale_)*(-L/3 ) )
			ctx.lineTo( ofs + (xscale_)* (+L/3 ), ofs+(xscale_)*(+L/3 ) )
			ctx.moveTo( ofs + (xscale_)* (+L/3 ), ofs+(xscale_)*(-L/3 ) )
			ctx.lineTo( ofs + (xscale_)* (-L/3 ), ofs+(xscale_)*(+L/3 ) )
			ctx.stroke();
			if(1)
			{
			ctx.beginPath();
			ctx.strokeStyle = "#FFF"
			let shootAt  = ShotTime( now, {x:V*ca,y:V*sa,z:0}, {x:0,y:D,z:0}, {x:myV*ca_o,y:myV*sa_o, z:0}, {x:0,y:0,z:0} );
			//let shootAt  = ShotTime( now, {x:V*ca,y:V*sa,z:0}, {x:posX,y:posY+D,z:0}, {x:0,y:0, z:0}, {x:myX,y:myY,z:0} );
			let toPos;
			//let shootAt  = ShotTime( now, {x:V*ca,y:V*sa,z:0}, {x:0,y:D,z:0}, {x:0,y:0, z:0}, {x:myX,y:myY,z:0} );
			ctx.beginPath();
			ctx.arc(ofs+(shootAt*V*ca-myX)*xscale_, ofs+(shootAt*V*sa -D -myY)*xscale_, (0.33)*(xscale_), 0, 2 * Math.PI, false);
			ctx.stroke()

			ctx.moveTo( ofs + (xscale_)* (shootAt*V*ca-L/3  -myX), ofs+(xscale_)*(shootAt*V*sa-L/3 -D -myY) )
			ctx.lineTo( ofs + (xscale_)* (shootAt*V*ca+L/3  -myX), ofs+(xscale_)*(shootAt*V*sa+L/3 -D -myY) )
			ctx.moveTo( ofs + (xscale_)* (shootAt*V*ca+L/3  -myX), ofs+(xscale_)*(shootAt*V*sa-L/3 -D -myY) )
			ctx.lineTo( ofs + (xscale_)* (shootAt*V*ca-L/3  -myX), ofs+(xscale_)*(shootAt*V*sa+L/3 -D -myY) )
			ctx.stroke();
			}
			ctx.strokeWidth= 1;
		}

		if( showSelf ) {
			ctx.strokeStyle= "orange";
			ctx.fillStyle= "orange";
			ctx.fillText( "Observed(self)", 10, 10+1.5*xscale_);//-L*xscale_ ); 
			function doSegASelf( seg ) {

				function _doSeg(tailx,taily, headx, heady) {
				let tail  = observedTimeToRealTimeXYZ2( now, V, tailx, taily, 0, V, 0, 0, 0, ca, sa, ca, sa )[0] - now;
				let head  = observedTimeToRealTimeXYZ2( now, V, headx, heady, 0, V, 0, 0, 0, ca, sa, ca, sa )[0] - now;

				const hdx =  head * (V) * ca +headx ;
				const hdy =  head * (V) * sa +heady ;
				const tx =  tail * (V) * ca +tailx ;
				const ty =  tail * (V) * sa +taily ;

				const head_abb = aberration( {x:hdx, y:hdy, z:0 }, {x:V*ca, y:V*sa, z:0 }, {x:0, y:0, z:0} );
				const tail_abb = aberration( {x:tx, y:ty, z:0 }, {x:V*ca, y:V*sa, z:0 }, {x:0, y:0, z:0} );
/*
				const head_s = Math.sqrt( head_abb.x * head_abb.x + head_abb.y*head_abb.y )
				const tail_s = Math.sqrt( tail_abb.x * tail_abb.x + tail_abb.y*tail_abb.y )
				head_abb.x *= 1/head_s;
				head_abb.y *= 1/head_s;
				tail_abb.x *= 1/tail_s;
				tail_abb.y *= 1/tail_s;
*/
				ctx.beginPath();
				ctx.strokeStyle =  `hsl(${(head%3)*120+120},100%,50%)`

				//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
				ctx.moveTo( ofs + (xscale_)*(head_abb.x), ofs + (xscale_)*(head_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(tail_abb.x), ofs + (xscale_)*(tail_abb.y) );
				ctx.stroke();
				}
		function __doSeg( a,b,c,d ) {
			const _a = a - a*ca * ( 1 - lengthContract );
			const _b = b - b*sa * ( 1 - lengthContract );
			const _c = c - c*ca * ( 1 - lengthContract );
			const _d = d - d*sa * ( 1 - lengthContract );
			return _doSeg( _a,_b,_c,_d );
		}


				__doSeg( -L +((seg)/30)*L, -L, -L +((seg+1)/30)*L, -L );
				__doSeg( -L +((seg)/30)*L, L, -L +((seg+1)/30)*L, L );
				__doSeg( -L, -L +((seg)/30)*L, -L, -L +((seg+1)/30)*L );
				__doSeg( L, -L +((seg)/30)*L, L, -L +((seg+1)/30)*L );
			}
			for( let seg = 0; seg < 60; seg++ ){ 
				doSegASelf( seg );
			}
		}

		if( showObserver ) {
			ctx.strokeStyle= "cyan";
			ctx.fillStyle= "cyan";
			ctx.fillText( "Observer(from observed)", 10, 10 + 2.5*xscale_);//-L*xscale_ ); 
			function doSeg( seg ) {
				function _doSeg(tailx,taily, headx, heady) {

				let tail  = observedTimeToRealTimeXYZ2( now, myV, tailx, taily, 0, V, 0*posX, 0*posY-D, 0, ca_o, sa_o, ca, sa );
				let head  = observedTimeToRealTimeXYZ2( now, myV, headx, heady, 0, V, 0*posX, 0*posY-D, 0, ca_o, sa_o, ca, sa );
				const hdx =  head[0] * (myV) * ca_o +headx - posX;
				const hdy =  head[0] * (myV) * sa_o +heady +D  - posY;
				const tx =  tail[0] * (myV) * ca_o +tailx - posX;
				const ty =  tail[0] * (myV) * sa_o +taily +D - posY;

				const head_abb = aberration( {x:hdx, y:hdy, z:0 }, {x:V*ca, y:V*sa, z:0 }, {x:0, y:0, z:0} );
				const tail_abb = aberration( {x:tx, y:ty, z:0 }, {x:V*ca, y:V*sa, z:0 }, {x:0, y:0, z:0} );

				ctx.beginPath();
				ctx.strokeStyle =  `hsl(${(head[0]%3)*120+120},100%,50%)`

				//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
				ctx.moveTo( ofs + (xscale_)*(head_abb.x), ofs + (xscale_)*(head_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(tail_abb.x), ofs + (xscale_)*(tail_abb.y) );
				ctx.stroke();

				}
		function __doSeg( a,b,c,d ) {
			const _a = a - a*ca * ( 1 - lengthContract );
			const _b = b - b*sa * ( 1 - lengthContract );
			const _c = c - c*ca * ( 1 - lengthContract );
			const _d = d - d*sa * ( 1 - lengthContract );
			return _doSeg( _a,_b,_c,_d );
		}

				__doSeg( -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L, -L );
				__doSeg( -L +((seg)/10)*L, L, -L +((seg+1)/10)*L, L );
				__doSeg( -L, -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L );
				__doSeg( L, -L +((seg)/10)*L, L, -L +((seg+1)/10)*L );
			}
			for( let seg = 0; seg < 20; seg++ ){
				doSeg( seg );
			}
		}
		if( showSelf && showObserver ) {
			ctx.strokeStyle= "magenta";
			ctx.fillStyle= "magenta";
			ctx.fillText( "Observer(Self)", 10, 10 + 3.5*xscale_);//-L*xscale_ ); 
			function doSegSelf( seg ) {
				function _doSeg(tailx,taily, headx, heady) {
				let tail  = observedTimeToRealTimeXYZ2( now, myV, tailx, taily, 0, myV, 0, 0, 0, ca_o, sa_o, ca_o, sa_o )[0]-now;
				let head  = observedTimeToRealTimeXYZ2( now, myV, headx, heady, 0, myV, 0, 0, 0, ca_o, sa_o, ca_o, sa_o )[0]-now;
				const hdx =  head * (myV) * ca_o +headx ;
				const hdy =  head * (myV) * sa_o +heady ;
				const tx =  tail * (myV) * ca_o +tailx ;
				const ty =  tail * (myV) * sa_o +taily ;
				const head_abb = aberration( {x:hdx, y:hdy, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
				const tail_abb = aberration( {x:tx, y:ty, z:0 }, {x:myV*ca_o, y:myV*sa_o, z:0 }, {x:0, y:0, z:0} );
				ctx.beginPath();
				//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
				ctx.moveTo( ofs + (xscale_)*(head_abb.x), ofs + (xscale_)*(head_abb.y) );
				ctx.lineTo( ofs + (xscale_)*(tail_abb.x), ofs + (xscale_)*(tail_abb.y) );
				ctx.stroke();

				}
		function __doSeg( a,b,c,d ) {
			const _a = a - a*ca * ( 1 - lengthContract );
			const _b = b - b*sa * ( 1 - lengthContract );
			const _c = c - c*ca * ( 1 - lengthContract );
			const _d = d - d*sa * ( 1 - lengthContract );
			return _doSeg( _a,_b,_c,_d );
		}


				__doSeg( -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L, -L );
				__doSeg( -L +((seg)/10)*L, L, -L +((seg+1)/10)*L, L );
				__doSeg( -L, -L +((seg)/10)*L, -L, -L +((seg+1)/10)*L );
				__doSeg( L, -L +((seg)/10)*L, L, -L +((seg+1)/10)*L );
			}
			for( let seg = 0; seg < 20; seg++ ){
				doSegSelf( seg );
			}
		}
	}
}
}

//------------------ Create Controls ---------------------------

const controls = document.getElementById( "controls" );

let span = document.createElement( "br" );
controls.appendChild( span );

span = document.createElement( "span" );
span.className = "left";
span.textContent = "C";
controls.appendChild( span );

const sliderC = document.createElement( "input" );
sliderC.setAttribute( "type", "range" );
controls.appendChild( sliderC );
sliderC.addEventListener( "input", update );

sliderC.setAttribute( "max",1250 );
sliderC.value = C*100;
sliderC.style.width="250px";

const spanC = document.createElement( "span" );
spanC.textContent = "1";
controls.appendChild( spanC );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Time Scale";
controls.appendChild( span );

const sliderS = document.createElement( "input" );
sliderS.setAttribute( "type", "range" );
controls.appendChild( sliderS );
sliderS.addEventListener( "input", update );

sliderS.setAttribute( "max",250 );
sliderS.value = S*10;
sliderS.style.width="250px";

const spanS = document.createElement( "span" );
spanS.textContent = "1";
controls.appendChild( spanS );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Distance";
controls.appendChild( span );

const sliderD = document.createElement( "input" );
sliderD.setAttribute( "type", "range" );
controls.appendChild( sliderD );
sliderD.addEventListener( "input", update );

sliderD.setAttribute( "max",100 );
sliderD.value = (D2+5)*10;
sliderD.style.width="250px";

const spanD = document.createElement( "span" );
spanD.textContent = "1";
controls.appendChild( spanD );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Velocity";
controls.appendChild( span );

const sliderV = document.createElement( "input" );
sliderV.setAttribute( "type", "range" );
controls.appendChild( sliderV );
sliderV.addEventListener( "input", update );

sliderV.setAttribute( "max",1000 );
sliderV.value = V*1000;
sliderV.style.width="250px";

const sliderMyV = document.createElement( "input" );
sliderMyV.setAttribute( "type", "range" );
controls.appendChild( sliderMyV );
sliderMyV.addEventListener( "input", update );

sliderMyV.setAttribute( "max", 1000 );
sliderMyV.value = myV*1000;
sliderMyV.style.width="250px";

const spanV = document.createElement( "span" );
spanV.textContent = "1";
controls.appendChild( spanV );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Half-Length";
controls.appendChild( span );

const sliderL = document.createElement( "input" );
sliderL.setAttribute( "type", "range" );
controls.appendChild( sliderL );
sliderL.addEventListener( "input", update );

sliderL.setAttribute( "max",100 );
sliderL.value = L*10;
sliderL.style.width="250px";

const spanL = document.createElement( "span" );
spanL.textContent = "1";
controls.appendChild( spanL );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Direction";
controls.appendChild( span );

const sliderA = document.createElement( "input" );
sliderA.setAttribute( "type", "range" );
controls.appendChild( sliderA );
sliderA.addEventListener( "input", update );

sliderA.setAttribute( "max",200 );
sliderA.value = A*100;
sliderA.style.width="250px";

const spanA = document.createElement( "span" );
spanA.textContent = "1";
controls.appendChild( spanA );

const sliderA_o = document.createElement( "input" );
sliderA_o.setAttribute( "type", "range" );
controls.appendChild( sliderA_o );
sliderA_o.addEventListener( "input", update );

sliderA_o.setAttribute( "max",200 );
sliderA_o.value = A_o*100;
sliderA_o.style.width="250px";

const spanA_o = document.createElement( "span" );
spanA_o.textContent = "1";
controls.appendChild( spanA_o );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Time of sim. event: ";
//controls.appendChild( span );

const sliderE = document.createElement( "input" );
sliderE.setAttribute( "type", "range" );
//controls.appendChild( sliderE );
sliderE.addEventListener( "input", update );

sliderE.setAttribute( "min",-100 );
sliderE.setAttribute( "max",+100 );
sliderE.value = E*10;
sliderE.style.width="250px";

const spanE = document.createElement( "span" );
spanE.textContent = "1";
//controls.appendChild( spanE );

span = document.createElement( "br" );
//controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Run-Time";
controls.appendChild( span );

const sliderRunT = document.createElement( "input" );
sliderRunT.setAttribute( "type", "range" );
controls.appendChild( sliderRunT );
sliderRunT.addEventListener( "input", update );

sliderRunT.setAttribute( "max",250 );
sliderRunT.value = runT*5;
sliderRunT.style.width="250px";

const spanRunT = document.createElement( "span" );
spanRunT.textContent = "1";
controls.appendChild( spanRunT );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Now";
controls.appendChild( span );

const sliderNow = document.createElement( "input" );
sliderNow.setAttribute( "type", "range" );
controls.appendChild( sliderNow );
sliderNow.addEventListener( "input", update );

sliderNow.setAttribute( "min",-100 );
sliderNow.setAttribute( "max",100 );
sliderNow.value = now*runT;
sliderNow.style.width="250px";

const spanNow = document.createElement( "span" );
spanNow.textContent = "1";
controls.appendChild( spanNow );

//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = " |Animate";
spanChkNow.appendChild( chkLblNow );
controls.appendChild( spanChkNow );
//- - - - - - - - - - - - - - 

const chkLblXTGraph = document.createElement( "input" );
chkLblXTGraph.setAttribute( "type", "checkbox" );
chkLblXTGraph.checked = showXTGraph;
//controls.appendChild( chkLblXTGraph );
chkLblXTGraph.addEventListener( "input", update );

const spanChkXTGraph = document.createElement( "label" );
spanChkXTGraph.textContent = " |XT Graph";
spanChkXTGraph.appendChild( chkLblXTGraph );
controls.appendChild( spanChkXTGraph );
//- - - - - - - - - - - - - - 
const chkLblShowObserver = document.createElement( "input" );
chkLblShowObserver.setAttribute( "type", "checkbox" );
chkLblShowObserver.checked = showObserver;
chkLblShowObserver.addEventListener( "input", update );

const spanChkShowObserver = document.createElement( "label" );
spanChkShowObserver.textContent = " |Show Observer";
spanChkShowObserver.appendChild( chkLblShowObserver );
controls.appendChild( spanChkShowObserver );
//- - - - - - - - - - - - - - 
const chkLblShowSelf = document.createElement( "input" );
chkLblShowSelf.setAttribute( "type", "checkbox" );
chkLblShowSelf.checked = showSelf;
chkLblShowSelf.addEventListener( "input", update );

const spanChkShowSelf = document.createElement( "label" );
spanChkShowSelf.textContent = " |Show Self";
spanChkShowSelf.appendChild( chkLblShowSelf );
controls.appendChild( spanChkShowSelf );
//----------------------

span = document.createElement( "br" );
controls.appendChild( span );
//- - - - - - - - - - - - - - 
const chkLblShowVelocities = document.createElement( "input" );
chkLblShowVelocities.setAttribute( "type", "checkbox" );
chkLblShowVelocities.checked = showRelativeVelocities;
chkLblShowVelocities.addEventListener( "input", update );

const spanChkShowVelocities = document.createElement( "label" );
spanChkShowVelocities.textContent = " |Show Velocities";
spanChkShowVelocities.appendChild( chkLblShowVelocities );
controls.appendChild( spanChkShowVelocities );
//- - - - - - - - - - - - - - 
const chkLblShowAberration = document.createElement( "input" );
chkLblShowAberration.setAttribute( "type", "checkbox" );
chkLblShowAberration.checked = includeAberration;
chkLblShowAberration.addEventListener( "input", update );

const spanChkShowAberration = document.createElement( "label" );
spanChkShowAberration.textContent = " |Show Aberration";
spanChkShowAberration.appendChild( chkLblShowAberration );
controls.appendChild( spanChkShowAberration );
//- - - - - - - - - - - - - - 
const chkLblLockVelocity = document.createElement( "input" );
chkLblLockVelocity.setAttribute( "type", "checkbox" );
chkLblLockVelocity.checked = lockVelocity;
chkLblLockVelocity.addEventListener( "input", update );

const spanChkLockVelocity = document.createElement( "label" );
spanChkLockVelocity.textContent = " |Lock Velocities";
spanChkLockVelocity.appendChild( chkLblLockVelocity );
controls.appendChild( spanChkLockVelocity );
//- - - - - - - - - - - - - - 
const chkLblContract = document.createElement( "input" );
chkLblContract.setAttribute( "type", "checkbox" );
chkLblContract.checked = true;
chkLblContract.addEventListener( "input", update );

const spanChkContract = document.createElement( "label" );
spanChkContract.textContent = " |Length Contraction";
spanChkContract.appendChild( chkLblContract );
controls.appendChild( spanChkContract );
//----------------------

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------



update();

const body = [];


function ShotTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

function ObservedTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

function RealTime( T_o, V, P, V_o, P_o ) {
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const X_ = P.x-P_o.x;
	const Y_ = P.y-P_o.y;
	const Z_ = P.z-P_o.z;
	let VV = V.x*V.x+V.y*V.y+V.z*V.z;

	const VLen = (VV>0)?Math.sqrt(VV):1;
	const dot = VLen===0?1:(X_*V.x + Y_*V.y + Z_*V.z)/VLen;
	const X = X_ - V.x*dot/VLen * (1-lengthContract)
	const Y = Y_ - V.y*dot/VLen * (1-lengthContract)
	const Z = Z_ - V.z*dot/VLen * (1-lengthContract)


	const S = T_o;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const jsx = X-J*S;
	const ksy = Y-K*S;
	const lsz = Z-L*S;


	const tmp = ( C*C * S + D*jsx + E*ksy + F*lsz );
	const tmp2 = ( S*S * C*C - jsx*jsx - ksy*ksy - lsz*lsz );
	const CV = C*C - VV;
	if( Math.abs(CV) < 0.000001 ) {
		// D*D+E*E+F*F = C
		// solve (S-T)^2 = ( ( (X+D*T-J*S)^2+(Y+E*T - K*S)^2+(Z + F*T - L* S)^2) )/(D*D+E*E+F*F) for T
		// T = ((J^2 S^2)/(D^2 + F^2 + e^2) - (2 J S X)/(D^2 + F^2 + e^2) + (K^2 S^2)/(D^2 + F^2 + e^2) - (2 K S Y)/(D^2 + F^2 + e^2) + (L^2 S^2)/(D^2 + F^2 + e^2) - (2 L S Z)/(D^2 + F^2 + e^2) + X^2/(D^2 + F^2 + e^2) + Y^2/(D^2 + F^2 + e^2) + Z^2/(D^2 + F^2 + e^2) - S^2)
		//        /((2 D J S)/(D^2 + F^2 + e^2) + (2 e K S)/(D^2 + F^2 + e^2) + (2 F L S)/(D^2 + F^2 + e^2) - (2 D X)/(D^2 + F^2 + e^2) - (2 e Y)/(D^2 + F^2 + e^2) - (2 F Z)/(D^2 + F^2 + e^2) - 2 S)
		// T = ((J^2 S^2)/C - (2 J S X)/C + (K^2 S^2)/C - (2 K S Y)/C + (L^2 S^2)/C - (2 L S Z)/C + X^2/C + Y^2/C + Z^2/C - S^2)
		//        /((2 D J S)/C + (2 e K S)/C + (2 F L S)/C - (2 D X)/C - (2 e Y)/C - (2 F Z)/C - 2 S)
		// T = ((J^2 S^2) - (2 J S X) + (K^2 S^2) - (2 K S Y) + (L^2 S^2) - (2 L S Z) + X^2 + Y^2 + Z^2 - S^2*C)
		//        /((2)*( (D J S) + (e K S) + (F L S) - (D X) - (e Y) - (F Z) - S C))

		const T =  ( tmp2 ) / ( 2*( tmp ) )
		if( T < T_o ) return [T];
		return -Math.Infinity;
	}
	
	const delT = Math.sqrt(tmp*tmp - CV * tmp2	);
	const T = (-delT + tmp )/CV;
	if( T > T_o ) {

		const T2 = (+delT + tmp )/CV;
		if( T2 < T_o ) return [T2];
		return [];
	}
	const T2 = (+Math.sqrt(tmp*tmp - CV * tmp2	) + tmp )/CV;
	return (T2<T_o)?[T,T2]:[T];
}

function observedTimeToRealTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return RealTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}




function timeBiasAtPos( V, X, Y, Z ) {
	//b(x,y)=-sqrt((x If(x<0, ((C+V)/(C-V)), ((C-V)/(C+V))))^(2)+(y ((sqrt(C C+V V))/(C)))^(2)+(Z ((sqrt(C C+V V))/(C)))^(2))
	const div1 = ( C+V ) / (C-V)
	const div2 = ( C-V ) / (C+V)
	const div3 = Math.sqrt( C*C+V*V ) / (C)

	const xx = (X<0?( Math.abs(X) * div1):(Math.abs(X)*div2));
	const yy = Math.abs(Y)*div3;
	const zz = Math.abs(Z)*div3;
	const b = -Math.sqrt( xx*xx + yy*yy + zz*zz );
	return b;

}

function update( evt ) {

	lockVelocity = chkLblLockVelocity.checked;

	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	V = Number(sliderV.value)/200*C;

	lengthContract = chkLblContract.checked?V<C?Math.sqrt(C*C-V*V)/(C*C):Math.sqrt(V*V-C*C)/(C*C):1;

	if( lockVelocity ) myV = V;
	else myV = Number(sliderMyV.value)/200*C;
	spanV.textContent = V.toFixed(3) + " : " + V*C*C/(C*C-V*V) + " : " + myV;
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);

	A = Number(sliderA.value)/100*Math.PI;
	sa = -Math.sin(A);
	ca = Math.cos(A);
	spanA.textContent = (A/Math.PI).toFixed(3) + "π";

	
	A_o = Number(sliderA_o.value)/100*Math.PI;
	sa_o = -Math.sin(A_o);
	ca_o = Math.cos(A_o);
	spanA_o.textContent = (A_o/Math.PI).toFixed(3) + "π";

	D2 = (Number(sliderD.value)/50-1)*L;
	D =10* (Number(sliderD.value)/50-1);
	spanD.textContent = D.toFixed(3) + " T(world s):" + (-2*(C*D+L*V)/(C*C-V*V)).toFixed(2)  + " T(obs s):"+ ((-2*(C*D+L*V)/(C*C-V*V))/Math.sqrt(1-V/C)).toFixed(2) /*+ " O(m-m/s):"+ (-2*(C*D2+L*V)).toFixed(2)*/;
	E = Number(sliderE.value)/10 - Math.sqrt( D*D + L*L )/C * V;
	spanE.textContent = E.toFixed(1);
	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(1);

	showXTGraph = chkLblXTGraph.checked;
	showSelf = chkLblShowSelf.checked;
	showRelativeVelocities = chkLblShowVelocities.checked;
	showObserver = chkLblShowObserver.checked;
	includeAberration = chkLblShowAberration.checked;

	const didAnimate = animate;
	animate = chkLblNow.checked;
	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	if( animate ) {
	}else
		now = (Number(sliderNow.value)/100*runT/2);
	spanNow.textContent = "T(world s):" +  (now).toFixed(2)  + " T(obs s):" + (now/Math.sqrt(1-V/C)).toFixed(2) /*+ " T(obs m-m/s):" + (now*(C*C-V*V)).toFixed(2)*/;

	spanC.textContent = C.toFixed(2)+ " scalar: "+ ((C*C-V*V)/(C*C)).toFixed(3) ;

	for( let n = 0; n < nFrames; n++ ) {
		const frame = frames[n];
		const del = n/nFrames;
		const Treal = 2*((del * runT)-runT/2);
		frame.T_start = Treal;
		frame.PobsrX = ca_o * myV * Treal;
		frame.PobsrY = sa_o * myV * Treal;
		frame.PobsdX = ca * V * Treal;
		frame.PobsdY = sa * V * Treal-D;
		frame.delX = Math.abs(frame.PobsdX - frame.PobsrX); // distance, non directed
		frame.delY = Math.abs(frame.PobsdY - frame.PobsrY); // distance, non directed
	}


	if( !animate ) {
		draw(  );
	} else if( !didAnimate ) draw();

}



	function headTri( t,o,f ) {
		const y = 0;
		
		if(f)ctx.fillStyle = "red";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale + 5, o+y );
		ctx.lineTo( 500+(t) * xscale - 5, o+y -5 );
		ctx.lineTo( 500+(t) * xscale - 5, o+y +5 );
		ctx.fill();
	}

	function tailTri( t,o,f ) {      
		const y = 0;
		
		if(f)ctx.fillStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale - 5, o+y );
		ctx.lineTo( 500+(t) * xscale + 5, o+y - 5 );
		ctx.lineTo( 500+(t) * xscale + 5, o+y + 5 );
		ctx.fill();
	}

	function centerBoxXY( x,y,f ) {      
		
		if(f)ctx.fillStyle = "green";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( x +5, y );
		ctx.lineTo( x, y - 5 );
		ctx.lineTo( x-5, y  );
		ctx.lineTo( x, y + 5 );
		ctx.fill();
	}
	function centerBox( t,o ) {      
		//const y = 20;
		centerBoxXY( 500+(t)*xscale, o );
	}


let last_draw_time = 0;
const xscale = 100;
const yscale = 100;
let didEvent = false;
const photonStart = 100;
function draw(  ) {
	
	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2);
	}
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
    D3xTransform.drawCoords( now );



	last_draw_time = now;

	if( animate )
	requestAnimationFrame( draw );

	return;

}

		draw();

