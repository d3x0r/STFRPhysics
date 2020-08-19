"use strict";

var CubeTest = function() {
	return new cubeTest();
}


function cubeTest() {
	var l = 0;

	var geometry, material, mesh = [];
	var frame_target = [];
	var lineGeo;
	var slow_animate = false;
	var frame = 0;
	var rotcounters = [];

	var mode = 0;

	//const totalUnit = Math.PI/(2*60);
	//const unit = totalUnit;
	var delay_counter = 60*3;
	//const pause_counter = delay_counter + 120;
	var single_counter = 60;
	var totalUnit = Math.PI/2;
	var unit = totalUnit / single_counter;
	var pause_counter = 120;

	var counter= 0;


function setMode1(){
	console.log( "reset counter (mode1)")
	slow_animate = false;
	single_counter = 60;
	totalUnit = Math.PI/2;
	unit = totalUnit / single_counter;
	pause_counter = 120;
	counter = 0;
	mode = 0;
	mesh.forEach( (mesh)=>{ mesh.matrixAutoUpdate = false;var o = mesh.matrix.origin.clone(); mesh.matrix.identity(); mesh.matrix.origin = o;} );
	mesh[7].matrixAutoUpdate = false;
	rotcounters.forEach( (set)=>{ set[0] = 0; set[1] = 0; set[2] = 0; });
}


function setMode2() {
	console.log( "reset counter (mode2)")
	slow_animate = false;
	 totalUnit = Math.PI/(2*60);
	 unit = totalUnit;
	 delay_counter = 60;
	 pause_counter = delay_counter + 90;
	 counter = 0;
	 mode = 1;
	 mesh.forEach( (mesh)=>{ mesh.matrixAutoUpdate = false;var o = mesh.matrix.origin.clone(); mesh.matrix.identity(); mesh.matrix.origin = o;} );
	 mesh[7].matrixAutoUpdate = false;
}


function setMode3() {
	console.log( "reset counter (mode3)")

	slow_animate = false;
	totalUnit = Math.PI*3/(2);
	unit = 0;//totalUnit;
	delay_counter = 60;
	pause_counter = delay_counter + 90;
	counter = 0;
	mode = 2;
	mesh.forEach( (mesh)=>{ mesh.matrixAutoUpdate = true; var o = mesh.matrix.origin.clone(); mesh.matrix.identity(); mesh.matrix.origin = o;} );
	mesh[6].matrixAutoUpdate = false;
}

function setControls1() {
	controls.disable();
	camera.matrixAutoUpdate = false;
	controlNatural.moveSpeed = 12*2.54 * 10;
	controls = controlNatural;
	controls.enable();
}
function setControls2() {
	controls.disable();
	camera.matrixAutoUpdate = true;
	controls = controlOrbit;
	controls.enable();

}
function setControls3() {
	controls.disable();
	camera.matrixAutoUpdate = true;
	controls = controlOrbit;
	controls.enable();

}

function makeText( t,color, v )
{
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 40px Arial";
	context1.fillStyle = color;
	context1.fillText(t, 0, 50);

	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1)
	texture1.needsUpdate = true;
	// default is currently THREE.MipMapNearestFilter
	texture1.minFilter = THREE.NearestFilter;

	var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide, transparent:true } );
	material1.transparent = true;
	material1.depthWrite = false;

	var mesh1 = new THREE.Mesh(
		new THREE.PlaneGeometry(canvas1.width, canvas1.height),
		material1
	);
	if( v )
		mesh1.position.set( v[0], v[1], v[2] );
	else
		mesh1.position.set(0,0,150);
	scene.add( mesh1 );
	return mesh1;
}

var status_line;
	this.init = function init(scene) {
		document.getElementById( "mode1").onclick = setMode1;
		document.getElementById( "mode2").onclick = setMode2;
		document.getElementById( "mode3").onclick = setMode3;
		document.getElementById( "controls1").onclick = setControls1;
		document.getElementById( "controls2").onclick = setControls2;
		document.getElementById( "controls3").onclick = setControls3;
		var o = document.createElement( "span");
		status_line = o;
		console.log( document.body, typeof status_line, typeof o )
		document.body.appendChild( status_line );
		//controlOrbit = new THREE.OrbitControls( camera, renderer.domElement );


		var strings = [];
		strings.push( makeText( "roll", "rgba(255,64,255,0.95)",[-300 + 150, 0, 175 ]) )
		strings.push( makeText( "yaw", "rgba(255,64,255,0.95)",[0 + 150, 0, 175 ]) )
		strings.push( makeText( "pitch", "rgba(255,64,255,0.95)",[300 + 150, 0, 175 ]) )

		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [-300 + 150, 300-40, 175 ]) )
		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [-300 + 150, 300-40, 175 ]) )
		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [-300 + 150, 300-40, 175 ]) )

		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [-300 + 150, -300 - 0, 175 ] ) )
		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [-300 + 150, -300 - 40, 175 ] ) )
		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [-300 + 150, -300 - 80, 175 ] ) )

		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [0 + 150, -300 - 0, 175 ] ) )
		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [0 + 150, -300 - 40, 175 ] ) )
		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [0 + 150, -300 - 80, 175 ] ) )

		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [300 + 150, -300 + 0, 175 ] ) )
		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [300 + 150, -300 - 40, 175 ] ) )
		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [300 + 150, -300 - 80, 175 ] ) )


		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [-300 + 150, -600 - 0, 175 ] ) )
		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [-300 + 150, -600 - 40, 175 ] ) )
		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [-300 + 150, -600 - 80, 175 ] ) )

		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [0 + 150, -600 - 0, 175 ] ) )
		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [0 + 150, -600 - 40, 175 ] ) )
		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [0 + 150, -600 - 80, 175 ] ) )

		strings.push( makeText( "roll", "rgba(64,64,255,0.95)", [300 + 150, -600 + 0, 175 ] ) )
		strings.push( makeText( "yaw", "rgba(64,64,255,0.95)", [300 + 150, -600 - 40, 175 ] ) )
		strings.push( makeText( "pitch", "rgba(64,64,255,0.95)", [300 + 150, -600 - 80, 175 ] ) )


		//strings[0].position.set( -300 + 150, 0, 150 )
		//strings[1].position.set( -0 + 150, 0, 150 )
		//strings[2].position.set( 300 + 150, 0, 150 )

		strings[3].position.set( -300 + 150, 300-40, 150 )
		strings[5].position.set( -300 + 150, 300+0, 150 )
		strings[4].position.set( -300 + 150, 300+40, 150 )
		makeText( "ALL(new)", "rgba(64,255,255,0.95)", [ -300+150, 300+80, 175 ] )
		makeText( "ALL(old)", "rgba(64,255,255,0.95)", [ 0+150, 300+80, 175 ] )

		lineGeo = [ makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			,makeLine()
			   ]
		geometry = new THREE.BoxGeometry( 200, 200, 200 );
		( (form)=>{
			console.log( "have ", form.faces.length, "faces")
			form.faces[0].color.setHex( 0x0000FF );  // left
			form.faces[1].color.setHex( 0x0000FF );
			form.faces[2].color.setHex( 0x00ff00 );  //right
			form.faces[3].color.setHex( 0x00ff00 );
			form.faces[4].color.setHex( 0x00FFFF );  // top
			form.faces[5].color.setHex( 0x00FFFF );
			form.faces[6].color.setHex( 0xFF0000 ); // bottom
			form.faces[7].color.setHex( 0xFF0000 );
			form.faces[8].color.setHex( 0xffFF00 ); /* forward face */
			form.faces[9].color.setHex( 0xffFF00 );
			form.faces[10].color.setHex( 0xFF00ff );
			form.faces[11].color.setHex( 0xFF00ff );
		})(geometry);

		material = [
			new THREE.MeshBasicMaterial( { color: 0xFFFFFF/*0xff0000*/, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color:  0xFFFFFF/*0x00FF00*/, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color:  0xFFFFFF/*0x0000ff*/, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color:  0xFFFFFF/*0xffFF00*/, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false,vertexColors: THREE.FaceColors } )
			, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false ,vertexColors: THREE.FaceColors} )
			, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: false ,vertexColors: THREE.FaceColors} )
		 ];

		 for( var n = 0; n < 12; n++ ){
			 var tmp;
			 var tmpm;
			 mesh.push( tmpm = new THREE.Mesh( geometry, material[0] ) );
			 frame_target.push( tmp = { src_quat : new THREE.Quaternion()
				 					,  target_quat : new THREE.Quaternion() } );
			tmp.src_quat.copy( tmpm.quaternion );
			 tmp.target_quat.copy( tmpm.quaternion );
		 }
			//delete mesh[0].position;
			//Object.defineProperty(mesh[0], "position", { get: function () { return this.matrix.origin; } });
			//mesh[0].position = get function(){ return this.matrix.origin; }
			console.log( "setting matrix to a new matrix?", new THREE.Matrix4())
			mesh[6].matrix = new THREE.Matrix4();
console.log( "starting mesh matrix is even ", mesh[6], mesh[6].matrix);

mesh[8].matrixAutoUpdate = false;
mesh[8].matrix.Translate( -300, -600, 0 )
mesh[9].matrixAutoUpdate = false;
mesh[9].matrix.Translate( 0, -600, 0 )
mesh[10].matrixAutoUpdate = false;
mesh[10].matrix.Translate( 300, -600, 0 )

if( mesh[11] ) {
mesh[11].matrixAutoUpdate = false;
mesh[11].matrix.Translate( 300, 300, 0 )
mesh[11].matrix.rotateRelative( -0.3, 0.7, 0.1 )
                }
	mesh[0].matrixAutoUpdate = false;
	mesh[0].matrix.Translate( -300, -300, 0 )
	mesh[1].matrixAutoUpdate = false;
	mesh[1].matrix.Translate( 0, -300, 0 )
	mesh[2].matrixAutoUpdate = false;
	mesh[2].matrix.Translate( 300, -300, 0 )
	mesh[3].matrixAutoUpdate = false;
	mesh[3].matrix.Translate( -300, 0, 0 )
	mesh[4].matrixAutoUpdate = false;
	mesh[4].matrix.Translate( 0, 0, 0 )
	mesh[5].matrixAutoUpdate = false;
	mesh[5].matrix.Translate( 300, 0, 0 )
		mesh[6].matrixAutoUpdate = false;
		mesh[6].matrix.Translate( -300, 300, 0 )
		//console.log( "starting mesh matrix is even ", mesh[6].matrix);
		mesh[7].position.x = 0;
		mesh[7].position.y = 300;
		mesh.forEach( (mesh)=>{ scene.add(mesh); })

		mesh.forEach( (m)=>{ rotcounters.push([0,0,0]) } );

	}

function anim_mesh( n,a,b,c,d,e,f ) {
	if( rotcounters[n][0]++ < single_counter )
		mesh[n].matrix.rotateOrtho( unit, a, b );
	else if( rotcounters[n][1]++ < single_counter )
		mesh[n].matrix.rotateOrtho( unit, c, d );
	else if( rotcounters[n][2]++ < single_counter )
		mesh[n].matrix.rotateOrtho( unit, e, f );
	else {
		return false;
	}
	return true;
}

function anim_mesh2( n,a,b,c,d,e,f ) {
		mesh[n].matrix.rotateOrtho( unit, a, b );
		mesh[n].matrix.rotateOrtho( unit, c, d );
		mesh[n].matrix.rotateOrtho( unit, e, f );
}

this.animate = function animate() {

if( mode == 1 )
{
	if( counter >= delay_counter )
	{
		if( counter++ < pause_counter ){
			renderer.render( scene, camera );
			return;
		}
		else {
			counter = 0;
			renderer.render( scene, camera );
			return;
		}

	}
		anim_mesh2( 0, 1, 2, 0, 2, 0, 1 );
		anim_mesh2( 1, 0, 2, 1, 2, 0, 1 );
		anim_mesh2( 2, 0, 1, 0, 2, 1, 2 );
		anim_mesh2( 8, 1, 2, 0, 1, 0, 2 );
		anim_mesh2( 9, 0, 2, 0, 1, 1, 2 );
		anim_mesh2( 10, 0, 1, 1, 2, 0, 2 );
		mesh[3].matrix.rotateOrtho( unit, 0, 1 );
		mesh[4].matrix.rotateOrtho( unit, 0, 2 );
		mesh[5].matrix.rotateOrtho( unit, 1, 2 );
		mesh[6].matrix.rotateRelative( unit, unit, unit );
		mesh[7].rotation.x += unit;
		mesh[7].rotation.y += unit;
		mesh[7].rotation.z += unit;
}
else if( mode == 0 ){

		if( !anim_mesh( 0, 1, 2, 0, 2, 0, 1) ) {
			if( counter++ < pause_counter ){
				renderer.render( scene, camera );
				return;
			}
			else {
				counter = 0;
				rotcounters.forEach( (set)=>{ set[0] = 0; set[1] = 0; set[2] = 0; });
				//console.log ("reset counter and rotcounters...", rotcounters)
				renderer.render( scene, camera );
				return;
			}
		}

		anim_mesh( 1, 0, 2, 1, 2, 0, 1 );
		anim_mesh( 2, 0, 1, 0, 2, 1, 2 );
		anim_mesh( 8, 1, 2, 0, 1, 0, 2 );
		anim_mesh( 9, 0, 2, 0, 1, 1, 2 );
		anim_mesh( 10, 0, 1, 1, 2, 0, 2 );

		mesh[3].matrix.rotateOrtho( unit/3, 0, 1 );
		mesh[4].matrix.rotateOrtho( unit/3, 0, 2 );
		mesh[5].matrix.rotateOrtho( unit/3, 1, 2 );
		mesh[6].matrix.rotateRelative( unit/3, unit/3, unit/3 );
		mesh[7].rotation.x += unit/3;
		mesh[7].rotation.y += unit/3;
		mesh[7].rotation.z += unit/3;

		var rotmat = new THREE.Matrix4();
	if( mesh[11] ) {
		var forward = mesh[11].matrix.forward;
		var left = mesh[11].matrix.left;
		var up = mesh[11].matrix.up;
		rotmat.rotateOrtho( unit/3, 0, 1 );
		forward.applyMatrix4( rotmat );
		left.applyMatrix4( rotmat );
		up.applyMatrix4( rotmat );
		if(0) {
		rotmat.identity();
		rotmat.rotateOrtho( unit/3, 0, 2 );
		forward.applyMatrix4( rotmat );
		left.applyMatrix4( rotmat );
		up.applyMatrix4( rotmat );

		rotmat.identity();
		rotmat.rotateOrtho( unit/3, 1, 2 );
		forward.applyMatrix4( rotmat );
		left.applyMatrix4( rotmat );
		up.applyMatrix4( rotmat );
		}
		//console.log( "before basis", mesh[11].matrix )
		mesh[11].matrix.makeBasis( left, up, forward );
		mesh[11].matrix.Translate( 300, 300, 0 )
		//console.log( "after basis", mesh[11].matrix )
	}

}
else if( mode == 2 ) {
	var p = new THREE.Quaternion();
	var y = new THREE.Quaternion();
	var r = new THREE.Quaternion();

	if( counter >= delay_counter )
	{
		if( counter++ >= pause_counter )
			counter = 0;
		return;
	}
	else if( !counter ) {
		mesh.forEach( (mesh)=>{ mesh.matrixAutoUpdate = true;
				var o = mesh.matrix.origin.clone();
				mesh.position.set( o.x, o.y, o.z );
				mesh.matrix.identity();
				mesh.matrix.origin = o;
			 	mesh.quaternion.set(0,0,0,1)} );
   	 	mesh[6].matrixAutoUpdate = false;

		unit = unit + Math.PI/(2*10);
		status_line.innerHTML = `${( unit * 360 / (2*Math.PI) )} degrees  ${unit*360/(60*2*Math.PI)} interval` ;

		p.setFromAxisAngle( THREE.Vector3Right, unit );
		y.setFromAxisAngle( THREE.Vector3Up, unit );
		r.setFromAxisAngle( THREE.Vector3Forward, unit );

		var t1 = new THREE.Quaternion();
		t1.multiplyQuaternions( p, y );
		t1.multiply( r );
		//frame_target[0].src_quat.copy( frame_target[0].target_quat );
		frame_target[0].target_quat.multiply( t1 );

		t1.multiplyQuaternions( y, p );
		t1.multiply( r );
		//frame_target[1].src_quat.copy( frame_target[1].target_quat );
		frame_target[1].target_quat.multiply( t1 );

		t1.multiplyQuaternions( r, p );
		t1.multiply( y );
		//frame_target[2].src_quat.copy( frame_target[2].target_quat );
		frame_target[2].target_quat.multiply( t1 );


		t1.multiplyQuaternions( p, r );
		t1.multiply( y );
		//frame_target[8].src_quat.copy( frame_target[8].target_quat );
		frame_target[8].target_quat.multiply( t1 );

		t1.multiplyQuaternions( y, r );
		t1.multiply( p );
		//frame_target[9].src_quat.copy( frame_target[9].target_quat );
		frame_target[9].target_quat.multiply( t1 );

		t1.multiplyQuaternions( r, y );
		t1.multiply( p );
		//frame_target[10].src_quat.copy( frame_target[10].target_quat );
		frame_target[10].target_quat.multiply( t1 );


		frame_target[3].src_quat.copy( frame_target[3].target_quat );
		frame_target[3].target_quat.multiply( r );
		frame_target[4].src_quat.copy( frame_target[4].target_quat );
		frame_target[4].target_quat.multiply( y );
		frame_target[5].src_quat.copy( frame_target[5].target_quat );
		frame_target[5].target_quat.multiply( p );
	}
	counter++;

var meshes = [0,1,2,3,4,5,8,9,10]
	for( var n = 0; n < meshes.length; n++ ){
		var m = mesh[meshes[n]];
		var ft = frame_target[meshes[n]];
		m.quaternion.copy( ft.src_quat );
		m.quaternion.slerp( ft.target_quat, counter/delay_counter );
	}

	mesh[6].matrix.rotateRelative( unit/delay_counter, unit/delay_counter, unit/delay_counter );

	mesh[7].rotation.x += unit/delay_counter;
	mesh[7].rotation.y += unit/delay_counter;
	mesh[7].rotation.z += unit/delay_counter;



}
//if(0)
	for( var n = 0; n < 7; n++ ) {
		var d = mesh[n].matrix.forward;
		lineGeo[n*3+0].position.set( mesh[n].position.x + 110*d.x
				,  mesh[n].position.y + 110*d.y
				,  mesh[n].position.z + 110*d.z );

		var d = mesh[n].matrix.left;
		lineGeo[n*3+1].position.set( mesh[n].position.x + 110*d.x
				,  mesh[n].position.y + 110*d.y
				,  mesh[n].position.z + 110*d.z );
		//console.log( "what is d ", d, mesh[n].position.x + 110*d.x
		//				,  mesh[n].position.y + 110*d.y
		//				,  mesh[n].position.z + 110*d.z  )

		var d = mesh[n].matrix.up;
		lineGeo[n*3+2].position.set( mesh[n].position.x + 110*d.x
				,  mesh[n].position.y + 110*d.y
				,  mesh[n].position.z + 110*d.z );
	}

}


function makeLine() {
	//console.log( l )
	var material = new THREE.LineBasicMaterial({
		color:l===0? 0x0000ff:l===1?0x80ff80:l==2?0xff0000:0xff00ff
	});
	l++;
	if( l == 3)
		l = 0;


	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( -10, 0, 0 ),
		new THREE.Vector3( 0, 10, 0 ),
		new THREE.Vector3( 10, 0, 0 )
	);

	var line = new THREE.Line( geometry, material );
	scene.add( line );
	return line;
}

}
