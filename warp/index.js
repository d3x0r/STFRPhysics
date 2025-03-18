// Import necessary THREE.js components (assuming you have them included in your HTML)
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

// Set up the Three.js scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee); // Light grey background

let sphereRadius = 0.8; // Radius of the central sphere

// Create a perspective camera
const camera = new THREE.PerspectiveCamera(
    45,                                 // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                // Near clipping plane
    1000                                // Far clipping plane
);
camera.position.set(0, 10, 20); // Position the camera
camera.lookAt(0, 0, 0);         // Make the camera look at the origin

// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight); // Set the render size
document.body.appendChild(renderer.domElement);          // Add the renderer to the HTML document

// Add OrbitControls for interactive rotation, panning, and zooming
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.rotateSpeed = 1.0;
controls.enablePan = true;
controls.enableZoom = true;

// Set controls to rotate with right mouse button
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE
};

// Parameters for the simulation
const params = {
  showSphere: true,                 // Toggle to show/hide the central sphere
  mode: 'Belt Trick',               // Simulation mode: 'Spin 1/2' or 'Belt Trick'
  gridSize: 40,                     // Number of divisions along one axis of the grid
  gridExtent: 20,                   // Extent of the grid in each direction
  maxKernelAngle: 180,              // Maximum rotation angle for the kernel (degrees)
  speed: 2,                         // Rotation speed
  phase: 0,                         // Phase angle in radians
  autoRotate: true,                 // Automatically increment phase
  numMarkers: 2,                    // Number of markers
  shellRadius: 3,                   // Radius for the ring-shaped kernel
  kernelFunction: 'Original',       // Kernel function type: 'Original' or 'Ring'
  power: 1.4,                       // Decay power for the kernel function
  numLayers: 1                      // Number of grid layers (planes)
};

let maxRadius;                        // Maximum radius for transformations
let sphere;                           // Central sphere object
let beltCubes = [];                   // Array to hold the cubes forming the belt (Belt Trick)
const beltSegments = 48;              // Number of segments in the belt
let gridMeshes = [];                  // Array to hold all grid meshes (layers)
const markers = [];                   // Array to hold marker objects
const markerTrails = [];              // Array to hold marker trails
const trailLength = 300;              // Number of positions to keep in the trail

// GUI Controls using dat.GUI
const gui = new dat.GUI({ autoPlace: false });
document.getElementById('gui-container').appendChild(gui.domElement);

// Add GUI controls and attach event listeners
gui.add(params, 'mode', ['Spin 1/2', 'Belt Trick']).name('Mode').onChange(() => {
  setModeParameters();
  recreateObjects();
});
gui.add(params, 'kernelFunction', ['Original', 'Ring']).name('Kernel Function').onChange(() => {
  updateKernelParametersVisibility();
  recreateObjects(); // Recreate objects if necessary
});
gui.add(params, 'showSphere').name('Show Sphere').onChange(() => {
  if (sphere) sphere.visible = params.showSphere;
});
gui.add(params, 'maxKernelAngle', 0, 3600.0).name('Max Winding');
gui.add(params, 'speed', 0, 5).name('Rotation Speed');
gui.add(params, 'autoRotate').name('Auto Rotate');
const phaseController = gui.add(params, 'phase', 0, Math.PI * 4).name('Phase');
phaseController.listen(); // Update GUI when value changes
gui.add(params, 'numMarkers', 1, 20, 1).name('Number of Markers').onChange(updateMarkers);
gui.add(params, 'power', 1.2, 2.5).name('Decay Power').onChange(() => {
  // Re-render or update if necessary
});
const shellRadiusController = gui.add(params, 'shellRadius', 0, 10).name('Shell Radius');
gui.add(params, 'numLayers', 1, 10, 1).name('Number of Layers').onChange(() => {
  recreateObjects();
});

// Initial parameter setup
setModeParameters();

// Create initial objects for the scene
createObjects();
updateKernelParametersVisibility();

// Function to update visibility of kernel-related GUI parameters
function updateKernelParametersVisibility() {
  const isRingKernel = params.kernelFunction === 'Ring';
  shellRadiusController.domElement.parentElement.style.display = isRingKernel ? '' : 'none';

  if (isRingKernel) {
    params.maxKernelAngle = 90;
    // Finer grid for ring kernel
    params.gridSize = 60;
    params.gridExtent = 10;
  }
}

// Function to set parameters based on the selected mode
function setModeParameters() {
  if (params.mode === 'Belt Trick') {
    // Belt Trick specific parameters
    params.gridSize = 40;
    params.gridExtent = 10;
    params.maxKernelAngle = 180;
    params.speed = 1;
    params.autoRotate = true;
    maxRadius = params.gridExtent; // Max distance from center
  } else {
    // Spin 1/2 default parameters
    params.gridSize = 40;
    params.gridExtent = 10;
    params.maxKernelAngle = 180;
    params.speed = 1;
    params.autoRotate = true;
    maxRadius = Math.sqrt(2 * params.gridExtent * params.gridExtent);
  }
}

// Function to create all objects in the scene
function createObjects() {
  if (params.mode === 'Belt Trick') {
    createBelt(); // Create the belt for Belt Trick mode
    createGrid(); // Create the grid (planes)
  } else {
    createGrid(); // Create the grid for Spin 1/2 mode
  }
  createMarkers();     // Create markers
  createCenterSphere(); // Create the central sphere
}

// Function to create the central sphere
function createCenterSphere() {
  const sphereRadius = 0.8; // Radius of the central sphere

  // Remove existing sphere if any
  if (sphere) {
    scene.remove(sphere);
  }

  // Create the sphere geometry and material
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
  const sphereMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.5,
  });

  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.userData.originalPosition = sphere.position.clone();
  sphere.visible = params.showSphere; // Set visibility based on parameter
  scene.add(sphere); // Add sphere to the scene
}

// Function to recreate objects when parameters change
function recreateObjects() {
  // Remove existing grid meshes
  gridMeshes.forEach(mesh => scene.remove(mesh));
  gridMeshes = [];

  // Remove existing belt cubes
  beltCubes.forEach(cube => scene.remove(cube));
  beltCubes = [];

  // Remove existing markers and trails
  markers.forEach(marker => scene.remove(marker));
  markerTrails.forEach(trail => scene.remove(trail));
  markers.length = 0;
  markerTrails.length = 0;

  // Create new objects
  createObjects();
}

// Function to create multiple grid layers (planes)
function createGrid() {
  // Remove any existing grid meshes
  gridMeshes.forEach(mesh => scene.remove(mesh));
  gridMeshes = [];

  const layerDistance = 2; // Distance between layers
  const numLayers = params.numLayers;
  const startY = - (numLayers - 1) / 2 * layerDistance; // Center layers around y=0

  for (let i = 0; i < numLayers; i++) {
    // Create plane grid geometry
    const geometry = new THREE.PlaneBufferGeometry(
        params.gridExtent * 2,      // Width of the plane
        params.gridExtent * 2,      // Height of the plane
        params.gridSize,            // Segments along width
        params.gridSize             // Segments along height
    );
    geometry.rotateX(-Math.PI / 2); // Rotate to lie in XZ-plane

    // Shift vertices along Y to position the grid layer
    const positionAttribute = geometry.attributes.position;
    const vertexCount = positionAttribute.count;
    const originalPositions = positionAttribute.array;
    const offsetY = startY + i * layerDistance; // Calculate Y-offset for this layer

    for (let j = 0; j < vertexCount; j++) {
      positionAttribute.array[j * 3 + 1] += offsetY; // Shift Y-coordinate
    }

    // Store original positions for transformations
    const originalPositionsCopy = new Float32Array(positionAttribute.array);

    // Create material for the grid
    const material = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      wireframe: true,
    });
    const gridMesh = new THREE.Mesh(geometry, material);

    // Store attributes for later use in animations
    gridMesh.userData = {
      positionAttribute: positionAttribute,
      vertexCount: vertexCount,
      originalPositions: originalPositionsCopy
    };

    scene.add(gridMesh);    // Add grid mesh to the scene
    gridMeshes.push(gridMesh); // Add to array of grid meshes
  }
}

// Function to create the belt (used in Belt Trick mode)
function createBelt() {
  const beltLength = params.gridExtent * 2; // Total length of the belt
  const beltWidth = 0.2;                    // Width of the belt
  const beltThickness = 1;                  // Thickness of the belt
  const segmentLength = beltLength / beltSegments; // Length of each belt segment

  for (let i = 0; i <= beltSegments; i++) {
    // Calculate the position of each cube in the belt
    const x = -params.gridExtent + i * segmentLength + segmentLength / 2;
    const y = 0;
    const z = 0;

    // Check if the cube is inside the sphere to skip it
    const distanceFromCenter = Math.sqrt(x * x + y * y + z * z);
    const cubeHalfWidth = beltWidth / 2;
    if (distanceFromCenter - cubeHalfWidth < sphereRadius) {
      continue; // Skip creating this cube as it's inside the sphere
    }

    // Create the cube geometry and material
    const cubeGeometry = new THREE.BoxGeometry(segmentLength, beltWidth, beltThickness);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaff00,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide, // Render both sides
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, 0); // Position will be set for the group

    // Create wireframe for the cube edges
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.LineSegments(edgesGeometry, wireframeMaterial);
    wireframe.position.set(0, 0, 0);

    // Group the cube and wireframe together
    const cubeGroup = new THREE.Group();
    cubeGroup.add(cube);
    cubeGroup.add(wireframe);

    // Position the group in the scene
    cubeGroup.position.set(x, y, z);

    // Store original rotation and position for transformations
    cubeGroup.userData.originalPosition = cubeGroup.position.clone();
    cubeGroup.userData.originalRotation = cubeGroup.rotation.clone();

    // Add the group to the scene and to the beltCubes array
    scene.add(cubeGroup);
    beltCubes.push(cubeGroup);
  }
}

// Function to create markers and their trails
function createMarkers() {
  // Remove existing markers and trails
  markers.forEach(marker => scene.remove(marker));
  markerTrails.forEach(trail => scene.remove(trail));
  markers.length = 0;
  markerTrails.length = 0;

  for (let i = 0; i < params.numMarkers; i++) {
    // Randomly generate initial positions for markers
    const nr = 4; // Range for random positions
    let ox = Math.random() * nr - nr / 2;
    let oy = Math.random() * nr - nr / 2;
    let oz = Math.random() * nr - nr / 2;

    // Offset the markers along Y-axis for better visibility
    if (oy > 0) oy = oy + 2;
    else oy = oy - 2;

    // For the first marker, set a specific position
    if (i === 0) {
      ox = sphereRadius;
      oy = 0;
      oz = 0;
    }

    // Create marker geometry and material
    const markerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.userData.originalPosition = new THREE.Vector3(ox, oy, oz);
    marker.userData.positions = []; // To store trail positions
    scene.add(marker);
    markers.push(marker);

    // Create trail for the marker
    const trailMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const trailGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]);
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    trail.userData.positions = []; // To store trail positions
    scene.add(trail);
    markerTrails.push(trail);
  }
}

// Function to update markers when number changes
function updateMarkers() {
  createMarkers();
}


// =========================== Animation loop ==============================
function animate() {
  requestAnimationFrame(animate);

  // Update phase angle if auto-rotating
  if (params.autoRotate) {
    params.phase += params.speed * 0.01;
    if (params.phase > Math.PI * 4) params.phase -= Math.PI * 4;
  }

  // Time-based rotation quaternion q(t) around Y-axis
  const timeQuaternion = new THREE.Quaternion();
  timeQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0), // Rotation axis (Y-axis)
      params.phase                // Rotation angle (phase)
  );

  // Inverse of q(t), which is q⁻¹(t) or conjugate in quaternion terms
  const inverseTimeQuaternion = timeQuaternion.clone().conjugate();

  // Transform and update the central sphere
  if (sphere) {
    const originalPosition = sphere.userData.originalPosition;
    const { newPosition, combinedQuaternion } = transform(
        originalPosition,
        timeQuaternion,
        inverseTimeQuaternion
    );

    // Update sphere position and rotation
    sphere.position.copy(newPosition);
    sphere.quaternion.copy(combinedQuaternion);
    sphere.visible = params.showSphere; // Update visibility
  }

  // Update belt cubes if in Belt Trick mode
  if (params.mode === 'Belt Trick') {
    beltCubes.forEach((cube) => {
      const originalPosition = cube.userData.originalPosition;
      const { newPosition, combinedQuaternion } = transform(
          originalPosition, timeQuaternion, inverseTimeQuaternion
      );

      // Update cube position and rotation
      cube.position.copy(newPosition);
      cube.quaternion.copy(combinedQuaternion);
    });
  }

  // Update vertex positions for all grid layers
  gridMeshes.forEach(gridMesh => {
    const positionAttribute = gridMesh.userData.positionAttribute;
    const vertexCount = gridMesh.userData.vertexCount;
    const originalPositions = gridMesh.userData.originalPositions;

    for (let i = 0; i < vertexCount; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      const originalPosition = new THREE.Vector3(ox, oy, oz);

      const { newPosition } = transform(
          originalPosition,
          timeQuaternion,
          inverseTimeQuaternion
      );

      // Update geometry positions
      positionAttribute.array[i * 3] = newPosition.x;
      positionAttribute.array[i * 3 + 1] = newPosition.y;
      positionAttribute.array[i * 3 + 2] = newPosition.z;
    }

    // Inform Three.js that positions have been updated
    positionAttribute.needsUpdate = true;
  });

  // Update markers and their trails
  markers.forEach((marker, idx) => {
    const originalPosition = marker.userData.originalPosition;
    const { newPosition } = transform(
        originalPosition,
        timeQuaternion,
        inverseTimeQuaternion
    );

    // Update marker position
    marker.position.copy(newPosition);

    // Update trail
    const trail = markerTrails[idx];
    const positions = trail.userData.positions;
    positions.push(newPosition.clone());
    if (positions.length > trailLength) {
      positions.shift(); // Remove oldest position
    }

    // Update trail geometry
    const trailGeometry = new THREE.BufferGeometry().setFromPoints(positions);
    trail.geometry.dispose(); // Dispose old geometry
    trail.geometry = trailGeometry;
  });

  // Update controls and render the scene
  controls.update();
  renderer.render(scene, camera);
}

// Function to apply the transformation to a position using quaternions
function transform(originalPosition, timeQuaternion, inverseTimeQuaternion) {
  const radius = originalPosition.length(); // Distance from the origin
  let kernelRotationAngle = 0;             // Rotation angle for the kernel
  const angle = (params.maxKernelAngle / 180.0) * Math.PI; // Convert max angle to radians
  const power = params.power;              // Decay power for the kernel function

  // Determine the kernel function to use
  if (params.kernelFunction === 'Original') {
    // Original kernel function: Decaying rotation angle with distance
    const adjustedRadius = Math.max(radius - sphereRadius, 0);
    // Fraction decreases with distance using a power function
    const fraction = 1 / Math.pow(adjustedRadius + 1, power);
    kernelRotationAngle = angle * fraction;
  } else if (params.kernelFunction === 'Ring') {
    // Ring-shaped kernel function: Gaussian centered at shellRadius
    const adjustedRadius = Math.abs(radius - params.shellRadius) / 2.0;
    const fraction = Math.exp(-Math.pow(adjustedRadius, power));
    kernelRotationAngle = angle * fraction;
  }

  // Kernel rotation quaternion k(r) rotating around X-axis
  const kernelQuaternion = new THREE.Quaternion();
  kernelQuaternion.setFromAxisAngle(
      new THREE.Vector3(1, 0, 0), // Rotation axis (X-axis)
      kernelRotationAngle          // Rotation angle based on kernel
  );

  // Combined rotation: q(t) * k(r) * q⁻¹(t)
//
// - q(t) is the time-dependent rotation quaternion representing a rotation around the Y-axis by an angle 'phase'.
//   This simulates the rotation of the entire system over time.
//
// - k(r) is the kernel rotation quaternion that depends on the position 'r'.
//   It represents a spatially dependent rotation around the X-axis by an angle determined by the kernel function.
//   This introduces a twist that varies with distance from the origin.
//
// - q⁻¹(t) is the inverse (conjugate) of q(t).
//   Applying q⁻¹(t) undoes the rotation applied by q(t).
//
// Why this works:
// - The sandwiching of k(r) between q(t) and q⁻¹(t) means that the kernel rotation is applied relative to the rotating frame defined by q(t).
// - Since q(t) * q⁻¹(t) equals the identity quaternion (no rotation), if k(r) were the identity (i.e., no kernel rotation), the combined rotation would also be the identity:
//     combinedQuaternion = q(t) * Identity * q⁻¹(t) = q(t) * q⁻¹(t) = Identity
// - This means that without the kernel rotation, the transformation does nothing, as expected.
// Relation to the 720-degree rotation (spin-1/2 behavior):
// - In quantum mechanics, spin-1/2 particles require a full 720-degree rotation to return to their original state.
// - When we rotate the system by 360 degrees (2π radians), the quaternion representation does not return to the original state but instead to its negative.
// - Only after a full 720-degree rotation does the quaternion return to its original value.
// - By using quaternions and the combined rotation, we simulate this property:
//     - As 'phase' increases from 0 to 2π (360 degrees), the system does not return to its initial state.
//     - Only when 'phase' reaches 4π (720 degrees) does the system return to its starting configuration.
// - The transformation captures the essence of the spin-1/2 rotational symmetry, where a 360-degree rotation changes the sign (state) of the particle, and a 720-degree rotation restores it.

  const combinedQuaternion = new THREE.Quaternion();
  combinedQuaternion.multiplyQuaternions(timeQuaternion, kernelQuaternion);
  combinedQuaternion.multiply(inverseTimeQuaternion);

  // Apply the combined rotation to the original position
  const newPosition = originalPosition.clone().applyQuaternion(combinedQuaternion);

  return { newPosition, combinedQuaternion };
}

// Start the animation loop
animate();

// Handle window resize events
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  // Update camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
