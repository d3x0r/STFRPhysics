

var casting = {
    reset: function() { this.cubes = 0; },
    material : new THREE.LineBasicMaterial({color:'blue',linewidth:3}),
    geometry : new THREE.BufferGeometry,
    mesh : null,
    addRef : null,
    cubes : 0
};
casting.geometry.dynamic = true;
casting.mesh = new THREE.LineSegments( casting.geometry, casting.material );
 casting.mesh.frustumCulled = false;
 var vertices = new Float32Array( 500 * 3 ); // 3 vertices per point
casting.geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )

casting.addRef = function updateCastMesh( currentRef) {
  {
    var unit = currentRef.cluster.voxelUnitSize;
    var x = currentRef.wx * unit
    var y = currentRef.wy * unit
    var z = currentRef.wz * unit
  }
  var P = [new THREE.Vector3( x, y, z )
    , new THREE.Vector3( x + unit, y, z )
    , new THREE.Vector3( x, y + unit, z )
    , new THREE.Vector3( x + unit, y + unit, z )
    , new THREE.Vector3( x, y, z + unit )
    , new THREE.Vector3( x + unit, y, z + unit )
    , new THREE.Vector3( x, y + unit, z + unit )
    , new THREE.Vector3( x + unit, y + unit, z + unit )
    ]
    var geometry = casting.geometry;
    //    console.log( "add", x, y, z )
    var v = casting.cubes * 24*3;
    vertices[v++] = P[0].x; vertices[v++] = P[0].y; vertices[v++] = P[0].z;
    vertices[v++] = P[1].x; vertices[v++] = P[1].y; vertices[v++] = P[1].z;
    vertices[v++] = P[1].x; vertices[v++] = P[1].y; vertices[v++] = P[1].z;
    vertices[v++] = P[3].x; vertices[v++] = P[3].y; vertices[v++] = P[3].z;
    vertices[v++] = P[3].x; vertices[v++] = P[3].y; vertices[v++] = P[3].z;
    vertices[v++] = P[2].x; vertices[v++] = P[2].y; vertices[v++] = P[2].z;
    vertices[v++] = P[2].x; vertices[v++] = P[2].y; vertices[v++] = P[2].z;
    vertices[v++] = P[0].x; vertices[v++] = P[0].y; vertices[v++] = P[0].z;

    vertices[v++] = P[4].x; vertices[v++] = P[4].y; vertices[v++] = P[4].z;
    vertices[v++] = P[5].x; vertices[v++] = P[5].y; vertices[v++] = P[5].z;
    vertices[v++] = P[5].x; vertices[v++] = P[5].y; vertices[v++] = P[5].z;
    vertices[v++] = P[7].x; vertices[v++] = P[7].y; vertices[v++] = P[7].z;
    vertices[v++] = P[7].x; vertices[v++] = P[7].y; vertices[v++] = P[7].z;
    vertices[v++] = P[6].x; vertices[v++] = P[6].y; vertices[v++] = P[6].z;
    vertices[v++] = P[6].x; vertices[v++] = P[6].y; vertices[v++] = P[6].z;
    vertices[v++] = P[4].x; vertices[v++] = P[4].y; vertices[v++] = P[4].z;

    vertices[v++] = P[0].x; vertices[v++] = P[0].y; vertices[v++] = P[0].z;
    vertices[v++] = P[4].x; vertices[v++] = P[4].y; vertices[v++] = P[4].z;
    vertices[v++] = P[1].x; vertices[v++] = P[1].y; vertices[v++] = P[1].z;
    vertices[v++] = P[5].x; vertices[v++] = P[5].y; vertices[v++] = P[5].z;
    vertices[v++] = P[2].x; vertices[v++] = P[2].y; vertices[v++] = P[2].z;
    vertices[v++] = P[6].x; vertices[v++] = P[6].y; vertices[v++] = P[6].z;
    vertices[v++] = P[3].x; vertices[v++] = P[3].y; vertices[v++] = P[3].z;
    vertices[v++] = P[7].x; vertices[v++] = P[7].y; vertices[v++] = P[7].z;
    this.cubes++;
    geometry.attributes.position.needsUpdate = true
    geometry.verticesNeedUpdate = true;
}



THREE.GameMouse = function ( object, domElement ) {
    this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.casting = casting;
  this.camera = null;
  var scope = this;
  this.mode = 0;
  this.voxelSelector = null;
  this.clusters = null;
  this.mouseRay = { n : THREE.Vector3Zero.clone(), o: new THREE.Vector3().delete() }
  this.mouseClock = new THREE.Clock();
  this.mouseEvents = [];
  this.currentAddType = Voxelarium.Voxels.types[2];

  var mouseButtonCount = 0;
  var mouseScrollX = 0;
  var mouseScrollY = 0;
  var cursorDistance = 650;

  this.setCurrentType = function( type ) {
      this.currentAddType = type;
  }
  this.setMouseRay = function( camera, e ) {
      //#define BEGIN_SCALE 1
      var rect = scope.domElement.getBoundingClientRect();
      const w = rect.right-rect.left;//window.innerWidth;
      const h = rect.bottom-rect.top;//window.innerHeight;
      var x = (((e.clientX-rect.left)-(w/2.0))/w) * 2;
      var y = (((e.clientY-rect.top)-(h/2.0))/h) * 2;
      //console.log( `mouse at ${x}, ${y}` )

      var mouse_ray_slope = new THREE.Vector3( camera.matrix.elements[0], camera.matrix.elements[1], camera.matrix.elements[2] ).multiplyScalar( x*camera.aspect );
      mouse_ray_slope.addScaledVector( camera.matrix.up, -(y) );

      // 0.47 is some magic number for 90 degree FOV
      //mouse_ray_slope.addScaledVector( camera.matrix.forward, -0.47 );
      // 75 degree view and like 3/4 aspect
      //mouse_ray_slope.addScaledVector( camera.matrix.forward, -0.605 );//-Math.sqrt(1 - mouse_ray_slope.length()) );
      mouse_ray_slope.addScaledVector( camera.matrix.backward, -1.304);//0.652 );//-Math.sqrt(1 - mouse_ray_slope.length()) );

      //mouse_ray_slope.unproject( camera );

      //var mouse_ray_target = THREE.Vector3Zero.clone().addScaledVector( THREE.Vector3Forward, 1000 );
      //mouse_ray_target.addScaledVector( THREE.Vector3Left,  camera.aspect*1000*x );
      //mouse_ray_target.addScaledVector( THREE.Vector3Up, -(1000)*y );

      //mouse_ray_origin.applyMatrix4( camera.matrix );
      //mouse_ray_target.applyMatrix4( camera.matrix );

      //var mouse_ray_slope = mouse_ray_target.clone().sub( mouse_ray_origin );
      //mouse_ray_slope.sub(camera.matrix.origin);
  	  mouse_ray_slope.normalize();
      //mouse_ray_origin.delete();
      scope.mouseRay.n.delete();

      scope.mouseRay.n = mouse_ray_slope;
      scope.mouseRay.o = camera.matrix.origin;
  }

  this.update = function() {
    if( !scope.clusters )
      return;
     switch( scope.mode )
     {
     case 0:
        var cluster = scope.clusters[0];
        if( mouseScrollY ) {
            cursorDistance += ( mouseScrollY / 120 ) * cluster.voxelUnitSize;
            mouseScrollY = 0;
        }
        if( scope.mouseRay ) {
            var o = scope.mouseRay.o;
            var result;
            result = rayCast( cluster, scope.mouseRay.o, scope.mouseRay.n )

            if( Voxelarium.selector.currentVoxel )
              Voxelarium.selector.currentVoxel.delete();

            if( result ) {
                Voxelarium.selector.currentAddVoxel = cluster.getVoxelRef( false, result.PredPointedVoxel.x, result.PredPointedVoxel.y, result.PredPointedVoxel.z )
              Voxelarium.selector.currentVoxel = result.ref;
          }
          /* this was another way of getting voxels... raycast is the routine for this now?
            rayCast projects a line through each plane going going out, and is more accurate than this.
            Plus rayCast can return the side of detection. */
          if( false ){

                var vox = o.clone().addScaledVector( scope.mouseRay.n, cursorDistance ).delete()

                var vrTo = Voxelarium.VoxelRef( cluster, null
                    , Math.floor(vox.x/cluster.voxelUnitSize)
                    , Math.floor(vox.y/cluster.voxelUnitSize)
                    , Math.floor(vox.z/cluster.voxelUnitSize) );
                var vrFrom = Voxelarium.VoxelRef( cluster, null
                        , Math.floor(o.x/cluster.voxelUnitSize)
                        , Math.floor(o.y/cluster.voxelUnitSize)
                        , Math.floor(o.z/cluster.voxelUnitSize) );
                //console.log( "things are ", vrTo, vrFrom )
                //this.casting.reset();
                //console.log( "---------- new set ----------- ")
                var ref = vrFrom.forEach( vrTo, false, (ref)=>{
                    //this.casting.addRef( ref );
                  //console.log( `check at `, ref.wx, ref.wy, ref.wz )
                  if( ref.voxelType && !ref.voxelType.properties.Is_PlayerCanPassThrough )
                    return ref;
                  return null;
                })
                //if( ref ) {
                //    this.casting.geometry.computeBoundingSphere();
                //    this.casting.geometry.setDrawRange( 0, (this.casting.cubes-1)*24 );
                //}
                if( ref ) {
                  Voxelarium.selector.currentVoxel = ref;
                } else {
                  Voxelarium.selector.currentVoxel = cluster.getVoxelRef( true, vox.x, vox.y, vox.z );
                }
                vrTo.delete();
                vrFrom.delete();
            }
        }

        if( scope.mouseEvents ) {
            var mEvent = scope.mouseEvents.shift();
            if( mEvent ) {
                if( mEvent.down ) {
                    if( mEvent.button === 0 ) { // left
                        var ref = Voxelarium.selector.currentAddVoxel;
                        if( ref && ref.sector ){
                            ref.sector.setCube( ref.x, ref.y, ref.z, scope.currentAddType )
                            ref.cluster.mesher.SectorUpdateFaceCulling( ref.sector, true )
                            //basicMesher.SectorUpdateFaceCulling_Partial( cluster, sector, Voxelarium.FACEDRAW_Operations.ALL, true )
                            ref.cluster.mesher.MakeSectorRenderingData( ref.sector );
                            Voxelarium.db.world.storeSector( ref.sector );
                        }

                    }
                    if( mEvent.button === 2 ) { // right
                        var ref = Voxelarium.selector.currentVoxel;
                        if( ref && ref.sector ){
                            ref.sector.setCube( ref.x, ref.y, ref.z, Voxelarium.Voxels.Void )
                            ref.cluster.mesher.SectorUpdateFaceCulling( ref.sector, true )
                            //basicMesher.SectorUpdateFaceCulling_Partial( cluster, sector, Voxelarium.FACEDRAW_Operations.ALL, true )
                            ref.cluster.mesher.MakeSectorRenderingData( ref.sector );
                            Voxelarium.db.world.storeSector( ref.sector );
                        }
                    }
                }
            }
        }

        break;
     }
      /*
      scope.object.matrix.rotateRelative( -phiDelta, thetaDelta, 0 );
      scope.object.matrix.rotateRelative( 0, 0, -scope.object.matrix.roll );
      scope.object.matrixWorldNeedsUpdate = true;
      */
  }

function mouseEvent( x, y, b, down ) {
    var ev = { x : x,
        y : y,
        button : b,
        delta : scope.mouseClock.getDelta(),
        down : down
    }

    scope.mouseEvents.push( ev );
}

var ongoingTouches = [];

function copyTouch(touch) {
  return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}
function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}
function onTouchDown(event) {
  event.preventDefault();
  var touches = event.changedTouches;
  for( var i = 0; i < touches.length; i++ ) {
    console.log( `touch ${i}=${touches[i]}`);
    ongoingTouches.push( copyTouch( touches[i] ) );

  }
}

function onTouchUp(event) {
  event.preventDefault();
}

function onTouchMove(event) {
  event.preventDefault();
  var touches = event.changedTouches;
  for( var i = 0; i < touches.length; i++ ) {
    var idx = ongoingTouchIndexById(touches[i].identifier);
    if( idx >= 0 ) {
      ongoingTouches.splice( idx, 1, copyTouch( touches[i] ) );
    }
  }
}

function onTouchCancel(event) {
  event.preventDefault();
}



  function onMouseDown(event) {
      if ( scope.enabled === false ) return;
      event.preventDefault();
      mouseEvent( event.clientX, event.clientY, event.button, true );
  }

  function onMouseUp(event) {
      if ( scope.enabled === false ) return;
      event.preventDefault();
      mouseEvent( event.clientX, event.clientY, event.button, false );
  }

    function onMouseMove( event ) {

    	if ( scope.enabled === false ) return;

    	event.preventDefault();

        scope.setMouseRay( camera, event );

    }

    function onMouseWheel( event ) {
        event.preventDefault();
        mouseScrollX += event.wheelDeltaX;
        mouseScrollY += event.wheelDeltaY;
    }

  function ignore(event) {
      event.preventDefault();
  }

  this.disable = function() {
    scope.domElement.removeEventListener( 'contextmenu', ignore, false );
    scope.domElement.removeEventListener( 'touchstart', onTouchDown, false );
    scope.domElement.removeEventListener( 'touchend', onTouchUp, false );
    scope.domElement.removeEventListener( 'touchcancel', onTouchCancel, false );
    scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );
    scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
    scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );
    scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
    scope.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
    scope.domElement.removeEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
    //window.removeEventListener( 'keydown', onKeyDown, false );
    //window.removeEventListener( 'keyup', onKeyUp, false );
  }

  this.enable = function() {
    scope.domElement.addEventListener( 'contextmenu', ignore, false );
    scope.domElement.addEventListener( 'touchstart', onTouchDown, false );
    scope.domElement.addEventListener( 'touchend', onTouchUp, false );
    scope.domElement.addEventListener( 'touchcancel', onTouchCancel, false );
    scope.domElement.addEventListener( 'touchmove', onTouchMove, false );
    scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
    scope.domElement.addEventListener( 'mouseup', onMouseUp, false );
    scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
    scope.domElement.addEventListener( 'mousewheel', onMouseWheel, false ); // firefox
    scope.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
    //window.addEventListener( 'keydown', onKeyDown, false );
    //window.addEventListener( 'keyup', onKeyUp, false );
  }
  this.enable();


}




// duplicated in VoxelCloud
function  rayCast(cluster, o, forward )
{
    var Out = null;
  var Delta_h = THREE.Vector4Pool.new(),Delta_v = THREE.Vector4Pool.new(),Delta_s = THREE.Vector4Pool.new();
  var Offset_h = THREE.Vector4Pool.new(), Offset_v = THREE.Vector4Pool.new(), Offset_s = THREE.Vector4Pool.new();
  var Norm_h = THREE.Vector3Pool.new(), Norm_v = THREE.Vector3Pool.new(), Norm_s = THREE.Vector3Pool.new();
  var Collision_h = THREE.Vector4Pool.new(), Collision_v = THREE.Vector4Pool.new(), Collision_s = THREE.Vector4Pool.new();

  var ActualCube_x,ActualCube_y,ActualCube_z;
  var NewCube_x,NewCube_y,NewCube_z;
  var Collide_X, Collide_Y, Collide_Z;
  var i;

  var Norm = forward;

  Collide_X = Collide_Y = Collide_Z = false;

  if (Norm.x >= 0.01 )
  {
    Collide_X = true;
    Delta_h.x = 1.0;
    Delta_h.y = Norm.y / Norm.x;
    Delta_h.z = Norm.z / Norm.x;
    Delta_h.w = 0;
    Delta_h.w = Delta_h.length();

    Collision_h.x = (Math.floor(o.x / cluster.voxelUnitSize) + 1.0)*cluster.voxelUnitSize;
    Collision_h.y = (Collision_h.x - o.x) * Delta_h.y + o.y;
    Collision_h.z = (Collision_h.x - o.x) * Delta_h.z + o.z;
    Collision_h.w = (Collision_h.x - o.x) * Delta_h.w;

    Offset_h.x = cluster.voxelUnitSize;
    Offset_h.y = Delta_h.y * cluster.voxelUnitSize;
    Offset_h.z = Delta_h.z * cluster.voxelUnitSize;
    Offset_h.w = Delta_h.w * cluster.voxelUnitSize;
    Norm_h.x = Offset_h.x/2;// / (cluster.voxelUnitSize/2);
    Norm_h.y = 0 / (cluster.voxelUnitSize/2);
    Norm_h.z = 0 / (cluster.voxelUnitSize/2);
  }
  else if (Norm.x <= -0.01)
  {
    Collide_X = true;

    Delta_h.x = 1.0;
    Delta_h.y = Norm.y / -Norm.x;
    Delta_h.z = Norm.z / -Norm.x;
    Delta_h.w = 0;
    Delta_h.w = Delta_h.length();

    Collision_h.x = (Math.floor(o.x / cluster.voxelUnitSize))*cluster.voxelUnitSize;
    Collision_h.y = (o.x - Collision_h.x) * Delta_h.y + o.y;
    Collision_h.z = (o.x - Collision_h.x) * Delta_h.z + o.z;
    Collision_h.w = (o.x - Collision_h.x) * Delta_h.w;
    Offset_h.x = -cluster.voxelUnitSize;
    Offset_h.y = Delta_h.y * cluster.voxelUnitSize;
    Offset_h.z = Delta_h.z * cluster.voxelUnitSize;
    Offset_h.w = Delta_h.w * cluster.voxelUnitSize;
    Norm_h.x = Offset_h.x/2;// / (cluster.voxelUnitSize/2);
    Norm_h.y = 0 / (cluster.voxelUnitSize/2);
    Norm_h.z = 0 / (cluster.voxelUnitSize/2);
  }

  if (Norm.y >= 0.01 )
  {
    Collide_Y = true;
    Delta_v.x = Norm.x / Norm.y;
    Delta_v.y = 1.0;
    Delta_v.z = Norm.z / Norm.y;
    Delta_v.w = 0;
    Delta_v.w = Delta_v.length();

    Collision_v.y = (Math.floor(o.y / cluster.voxelUnitSize)+1) * cluster.voxelUnitSize;
    var dely = (Collision_v.y - o.y);
    Collision_v.x = dely * Delta_v.x + o.x;
    Collision_v.z = dely * Delta_v.z + o.z;
    Collision_v.w = dely * Delta_v.w;
    Offset_v.y = cluster.voxelUnitSize;
    Offset_v.x = Delta_v.x * cluster.voxelUnitSize;
    Offset_v.z = Delta_v.z * cluster.voxelUnitSize;
    Offset_v.w = Delta_v.w * cluster.voxelUnitSize;
    Norm_v.x = 0 / (cluster.voxelUnitSize/2);
    Norm_v.y = Offset_v.y/2;// / (cluster.voxelUnitSize/2);
    Norm_v.z = 0 / (cluster.voxelUnitSize/2);
  }
  else if (Norm.y <= -0.01)
  {
    Collide_Y = true;
    Delta_v.x = Norm.x / -Norm.y;
    Delta_v.y = 1.0;
    Delta_v.z = Norm.z / -Norm.y;
    Delta_v.w = 0;
    Delta_v.w = Delta_v.length();

    Collision_v.y = (Math.floor(o.y / cluster.voxelUnitSize)) * cluster.voxelUnitSize;
    var dely = (o.y-Collision_v.y );
    Collision_v.x = (dely) * Delta_v.x + o.x;
    Collision_v.z = (dely) * Delta_v.z + o.z;
    Collision_v.w = (dely) * Delta_v.w;

    Offset_v.y = -cluster.voxelUnitSize;
    Offset_v.x = Delta_v.x * cluster.voxelUnitSize;
    Offset_v.z = Delta_v.z * cluster.voxelUnitSize;
    Offset_v.w = Delta_v.w * cluster.voxelUnitSize;
    Norm_v.x = 0 / (cluster.voxelUnitSize/2);
    Norm_v.y = Offset_v.y/2;// / (cluster.voxelUnitSize/2);
    Norm_v.z = 0 / (cluster.voxelUnitSize/2);
  }

  if (Norm.z >= 0.01)
  {
    Collide_Z = true;
    Delta_s.x = Norm.x / Norm.z;
    Delta_s.y = Norm.y / Norm.z;
    Delta_s.z = 1.0;
    Delta_s.w = 0;
    Delta_s.w = Delta_s.length();
    Collision_s.z = (Math.floor(o.z / cluster.voxelUnitSize) + 1.0)*cluster.voxelUnitSize;
    Collision_s.x = (Collision_s.z - o.z) * Delta_s.x + o.x;
    Collision_s.y = (Collision_s.z - o.z) * Delta_s.y + o.y;
    Collision_s.w = (Collision_s.z - o.z) * Delta_s.w;

    Offset_s.x = Delta_s.x * cluster.voxelUnitSize;
    Offset_s.y = Delta_s.y * cluster.voxelUnitSize;
    Offset_s.z = cluster.voxelUnitSize;
    Offset_s.w = Delta_s.w * cluster.voxelUnitSize;
    Norm_s.x = 0 / (cluster.voxelUnitSize/2);
    Norm_s.y = 0 / (cluster.voxelUnitSize/2);
    Norm_s.z = Offset_s.z/2;// / (cluster.voxelUnitSize/2);
  }
  else if (Norm.z <= -0.01)
  {
    Collide_Z = true;
    Delta_s.x = Norm.x / -Norm.z;
    Delta_s.y = Norm.y / -Norm.z;
    Delta_s.z = 1.0;
    Delta_s.w = 0;
    Delta_s.w = Delta_s.length();
    Collision_s.z = (Math.floor(o.z / cluster.voxelUnitSize) )*cluster.voxelUnitSize;
    Collision_s.x = (o.z - Collision_s.z) * Delta_s.x + o.x;
    Collision_s.y = (o.z - Collision_s.z) * Delta_s.y + o.y;
    Collision_s.w = (o.z - Collision_s.z) * Delta_s.w;

    Offset_s.x = Delta_s.x * cluster.voxelUnitSize;
    Offset_s.y = Delta_s.y * cluster.voxelUnitSize;
    Offset_s.z = - cluster.voxelUnitSize;
    Offset_s.w = Delta_s.w * cluster.voxelUnitSize;

    Norm_s.x = 0 / (cluster.voxelUnitSize/2);
    Norm_s.y = 0 / (cluster.voxelUnitSize/2);
    Norm_s.z = Offset_s.z/2;// / (cluster.voxelUnitSize/2);
  }



//  printf("yaw: %04lf pitch: %lf Offset_y:%lf Offset_z:%lf xyz:%lf %lf %lf NXYZ:%lf %lf %lf Dxyz:%lf %lf %lf", yaw,pitch, Delta_h.y, Delta_h.z,x,y,z, Norm_h.x, Norm_h.y, Norm_h.z, Delta_h.x, Delta_h.y, Delta_h.z);
 //printf("Angle (y:%lf p:%lf) XYZ:(%lf %lf %lf) Off(%lf %lf %lf %lf) Coll(%lf %lf %lf %lf) Norm(%lg %lg %lf) :\n", yaw,pitch,x,y,z, Offset_s.x, Offset_s.y, Offset_s.z, Offset_s.w, Collision_s.x, Collision_s.y, Collision_s.z, Collision_s.w, Norm_s.x,Norm_s.y, Norm_s.z);

  var Match_h = 0;
  var Match_s = 0;
  var Match_v = 0;
  var Cycle = 1;
  var MinW = 1000000.0;
  var ref;
  //console.log( '-------------------------');
  for (i=0;i<150;i++)
  {

    // Horizontal X axis.
    if (Collide_X)
    {
      if (Match_h==0 && Collision_h.w < MinW)
      {
        ActualCube_x = Math.floor((Collision_h.x - Norm_h.x) / cluster.voxelUnitSize);
        ActualCube_y = Math.floor((Collision_h.y - Norm_h.y) / cluster.voxelUnitSize);
        ActualCube_z = Math.floor((Collision_h.z - Norm_h.z) / cluster.voxelUnitSize);
        NewCube_x = Math.floor((Collision_h.x + Norm_h.x) / cluster.voxelUnitSize);
        NewCube_y = Math.floor((Collision_h.y + Norm_h.y) / cluster.voxelUnitSize);
        NewCube_z = Math.floor((Collision_h.z + Norm_h.z) / cluster.voxelUnitSize);
        if( ( ref = cluster.getVoxelRef( false, NewCube_x, NewCube_y, NewCube_z) ) && ref.sector && !ref.voxelType.properties.Is_PlayerCanPassThrough)
        {
            //console.log( `x check ${NewCube_x}  ${NewCube_y}  ${NewCube_z}    ${ActualCube_x} ${ActualCube_y} ${ActualCube_z}  ${MinW}  ${Collision_h.w}`)
            Out = { PredPointedVoxel : new THREE.Vector3( ActualCube_x, ActualCube_y, ActualCube_z ),
                    PointedVoxel : new THREE.Vector3( NewCube_x, NewCube_y, NewCube_z ),
                    ref : ref
                    };
          // printf(" MATCH_H: %lf\n",Collision_h.w);
          Match_h = Cycle;
          MinW = Collision_h.w;
        } else if( ref ) ref.delete();
      }
    }

    // Horizontal Z axis.

    if (Collide_Z)
    {
      if (Match_s == 0 && Collision_s.w < MinW)
      {
        ActualCube_x = Math.floor((Collision_s.x - Norm_s.x) / cluster.voxelUnitSize);
        ActualCube_y = Math.floor((Collision_s.y - Norm_s.y) / cluster.voxelUnitSize);
        ActualCube_z = Math.floor((Collision_s.z - Norm_s.z) / cluster.voxelUnitSize);
        NewCube_x = Math.floor((Collision_s.x + Norm_s.x) / cluster.voxelUnitSize);
        NewCube_y = Math.floor((Collision_s.y + Norm_s.y) / cluster.voxelUnitSize);
        NewCube_z = Math.floor((Collision_s.z + Norm_s.z) / cluster.voxelUnitSize);
        //console.log( `z check ${NewCube_x}  ${NewCube_y}  ${NewCube_z}  ${MinW}  ${Collision_s.w} `)
        if( ( ref = cluster.getVoxelRef( false, NewCube_x, NewCube_y, NewCube_z) ) && ref.sector && !ref.voxelType.properties.Is_PlayerCanPassThrough)
        {
            //console.log( `z check ${NewCube_x}  ${NewCube_y}  ${NewCube_z}  ${MinW}  ${Collision_s.w} `)
          Out = { PredPointedVoxel : new THREE.Vector3( ActualCube_x, ActualCube_y, ActualCube_z ),
                  PointedVoxel : new THREE.Vector3( NewCube_x, NewCube_y, NewCube_z ),
                  ref : ref
                   };
          // printf(" MATCH_S: %lf\n",Collision_s.w);
          Match_s = Cycle;
          MinW = Collision_s.w;
        } else if( ref ) ref.delete();
      }
    }

    // Vertical Y axis.

    if (Collide_Y)
    {
      if (Match_v==0 && Collision_v.w < MinW)
      {
        ActualCube_x = Math.floor((Collision_v.x - Norm_v.x) / cluster.voxelUnitSize);
        ActualCube_y = Math.floor((Collision_v.y - Norm_v.y) / cluster.voxelUnitSize);
        ActualCube_z = Math.floor((Collision_v.z - Norm_v.z) / cluster.voxelUnitSize);
        NewCube_x = Math.floor((Collision_v.x + Norm_v.x) / cluster.voxelUnitSize);
        NewCube_y = Math.floor((Collision_v.y + Norm_v.y) / cluster.voxelUnitSize);
        NewCube_z = Math.floor((Collision_v.z + Norm_v.z) / cluster.voxelUnitSize);
        if( ( ref = cluster.getVoxelRef( false, NewCube_x, NewCube_y, NewCube_z) ) && ref.sector && !ref.voxelType.properties.Is_PlayerCanPassThrough )
        {
            //console.log( `y check ${NewCube_x}  ${NewCube_y}  ${NewCube_z}  ${MinW}  ${Collision_v.w} `)
          Out = { PredPointedVoxel : new THREE.Vector3( ActualCube_x, ActualCube_y, ActualCube_z ),
                  PointedVoxel : new THREE.Vector3( NewCube_x, NewCube_y, NewCube_z ),
                  ref : ref
                   };
          // printf(" MATCH_V: %lf\n",Collision_v.w);
          Match_v = Cycle;
          MinW = Collision_v.w;
        } else if( ref ) ref.delete();
      }
    }

      //printf(" Match (H:%lf S:%lf V:%lf) \n", Collision_h.w, Collision_s.w, Collision_v.w);
      if (Match_h>0 && (Match_h - Cycle)<-100) return Out;
      if (Match_s>0 && (Match_s - Cycle)<-100) return Out;
      if (Match_v>0 && (Match_v - Cycle)<-100) return Out;

    Collision_h.x += Offset_h.x; Collision_h.y += Offset_h.y; Collision_h.z += Offset_h.z; Collision_h.w += Offset_h.w;
    Collision_v.x += Offset_v.x; Collision_v.y += Offset_v.y; Collision_v.z += Offset_v.z; Collision_v.w += Offset_v.w;
    Collision_s.x += Offset_s.x; Collision_s.y += Offset_s.y; Collision_s.z += Offset_s.z; Collision_s.w += Offset_s.w;
    Cycle ++;
  }
  Delta_h.delete();
  Delta_v.delete();
  Delta_s.delete();
  Offset_h.delete();
  Offset_v.delete();
  Offset_s.delete();
  Norm_h.delete();
  Norm_v.delete();
  Norm_s.delete();
  Collision_h.delete();
  Collision_v.delete();
  Collision_s.delete();

  return Out;
}
