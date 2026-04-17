import * as THREE from 'three';
import { VoronoiDiagram, SphereBound, AABBBound } from '../voronoi/index.js';
import {
  buildCellMeshes, buildNodeSphere, disposeObjects,
  buildGroup, buildNodeGroup,
} from '../voronoi/three-adapter.js';

// ── Renderer ──────────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x060810);
document.body.appendChild(renderer.domElement);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.01, 1000);

scene.add(new THREE.AmbientLight(0x334466, 1.2));
const dlight = new THREE.DirectionalLight(0x88aaff, 1.0);
dlight.position.set(3, 5, 4);
scene.add(dlight);

// ── Orbit controls ────────────────────────────────────────────────────────────
let orbiting = false, lastMX = 0, lastMY = 0;
let theta = 0, phi = Math.PI / 2, orbitR = 4.5;

function updateCamera() {
  camera.position.set(
    orbitR * Math.sin(phi) * Math.sin(theta),
    orbitR * Math.cos(phi),
    orbitR * Math.sin(phi) * Math.cos(theta),
  );
  camera.lookAt(0, 0, 0);
}
updateCamera();

renderer.domElement.addEventListener('mousedown', e => { orbiting = true; lastMX = e.clientX; lastMY = e.clientY; });
renderer.domElement.addEventListener('mouseup',   () => orbiting = false);
renderer.domElement.addEventListener('mousemove', e => {
  if (!orbiting) return;
  theta -= (e.clientX - lastMX) * 0.005;
  phi    = Math.max(.05, Math.min(Math.PI - .05, phi + (e.clientY - lastMY) * 0.005));
  lastMX = e.clientX; lastMY = e.clientY;
  updateCamera();
});
renderer.domElement.addEventListener('wheel', e => {
  orbitR = Math.max(1.5, Math.min(20, orbitR * (e.deltaY > 0 ? 1.1 : 0.9)));
  updateCamera();
  e.preventDefault();
}, { passive: false });

// ── Scene graph ───────────────────────────────────────────────────────────────
// All Voronoi objects live in one group so bounds wireframe stays separate.
const voroGroup = new THREE.Group();
scene.add(voroGroup);

// Incremental mesh tracking: only affected cells get disposed+rebuilt per frame.
const faceMeshes   = new Map(); // nodeIdx → Object3D[]
const sphereMeshes = new Map(); // nodeIdx → THREE.Mesh

let boundMesh = null; // bounding volume wireframe

// ── State ─────────────────────────────────────────────────────────────────────
let diagram  = null;
let selected = -1;
let animating = false;
let animT     = 0;
let lastRebuilt = 0; // cells rebuilt on last move

const BOUND_R = 1.5;

// ── Incremental scene update ──────────────────────────────────────────────────

function addCellToScene(node) {
  // Dispose + remove old face meshes for this node
  const old = faceMeshes.get(node.idx);
  if (old) { disposeObjects(old); old.forEach(o => voroGroup.remove(o)); }

  const isSel = node.idx === selected;
  const objs  = buildCellMeshes(node, isSel, THREE);
  faceMeshes.set(node.idx, objs);
  objs.forEach(o => voroGroup.add(o));

  // Sphere: update position if it exists (avoids geometry churn for moving nodes).
  // Only rebuild sphere when selection state changed (different size/colour).
  let sphere = sphereMeshes.get(node.idx);
  const wasSelected = sphere?.material.color.getHex() === 0xffcc44;
  if (sphere && wasSelected === isSel) {
    // Just move it
    sphere.position.set(node.x, node.y, node.z);
    sphere.userData.node = node; // keep ref fresh after move
  } else {
    // Selection state flipped — rebuild with right size/colour
    if (sphere) { sphere.geometry.dispose(); sphere.material.dispose(); voroGroup.remove(sphere); }
    sphere = buildNodeSphere(node, isSel, THREE);
    sphereMeshes.set(node.idx, sphere);
    voroGroup.add(sphere);
  }
}

function removeCellFromScene(idx) {
  const objs = faceMeshes.get(idx);
  if (objs) { disposeObjects(objs); objs.forEach(o => voroGroup.remove(o)); faceMeshes.delete(idx); }
  const sphere = sphereMeshes.get(idx);
  if (sphere) { sphere.geometry.dispose(); sphere.material.dispose(); voroGroup.remove(sphere); sphereMeshes.delete(idx); }
}

// Full rebuild: clear everything, repopulate all cells.
function fullRebuild() {
  // Dispose all tracked objects
  for (const [idx] of faceMeshes)   removeCellFromScene(idx);

  // Rebuild bound wireframe
  if (boundMesh) { boundMesh.geometry.dispose(); boundMesh.material.dispose(); scene.remove(boundMesh); }
  boundMesh = makeBoundWireframe(diagram.bound);
  scene.add(boundMesh);

  // Rebuild every cell
  for (const node of diagram.nodes) addCellToScene(node);
  updateStats();
}

// Partial rebuild: only touch the affected subset.
// Called every animation frame — skips the 50+ untouched cells entirely.
function partialRebuild(affected) {
  for (const idx of affected) {
    const node = diagram.getNode(idx);
    if (node) addCellToScene(node);
    else      removeCellFromScene(idx);
  }
  updateStats();
}

// ── Bound wireframe ───────────────────────────────────────────────────────────
function makeBoundWireframe(bound) {
  const mat = new THREE.LineBasicMaterial({ color: 0x1a2a40, transparent: true, opacity: 0.3 });
  if (bound instanceof SphereBound) {
    return new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(bound.radius, 24, 16)), mat);
  }
  const { min, max } = bound;
  const geo = new THREE.WireframeGeometry(
    new THREE.BoxGeometry(max.x - min.x, max.y - min.y, max.z - min.z));
  return new THREE.LineSegments(geo, mat);
}

// ── Stats display ─────────────────────────────────────────────────────────────
function updateStats() {
  const sel    = selected >= 0 ? diagram.getNode(selected) : null;
  const selTxt = sel
    ? `  sel:${sel.idx}  nb:${sel.neighbors.length}  faces:${sel.faces.length}`
      + (lastRebuilt ? `  rebuilt:${lastRebuilt}/${diagram.nodes.length}` : '')
    : '';
  document.getElementById('stats').textContent =
    `nodes:${diagram.nodes.length}  ` +
    `bound:${diagram.bound instanceof SphereBound ? 'sphere' : 'aabb'}${selTxt}`;

  const selEl = document.getElementById('selinfo');
  selEl.textContent = sel
    ? `node ${sel.idx}  →  [${sel.neighbors.map(n => n.idx).join(', ')}]`
    : '';
}

// ── Generate ──────────────────────────────────────────────────────────────────
function createBound() {
  return document.getElementById('btnAABB').classList.contains('active')
    ? AABBBound.fromHalfExtent(BOUND_R * 0.9)
    : new SphereBound(BOUND_R);
}

function generate(n) {
  diagram  = new VoronoiDiagram(createBound());
  selected = -1;
  lastRebuilt = 0;

  const inner = BOUND_R * 0.82;
  for (let i = 0; i < n; i++) {
    const r    = inner * Math.cbrt(Math.random());
    const cosT = Math.random() * 2 - 1;
    const sinT = Math.sqrt(1 - cosT * cosT);
    const ph   = Math.random() * Math.PI * 2;
    diagram.addPoint(r * sinT * Math.cos(ph), r * cosT, r * sinT * Math.sin(ph));
  }
  fullRebuild();
}

// ── Click selection ───────────────────────────────────────────────────────────
const raycaster = new THREE.Raycaster();
const mouse2    = new THREE.Vector2();

renderer.domElement.addEventListener('click', e => {
  if (Math.abs(e.clientX - lastMX) > 4 || Math.abs(e.clientY - lastMY) > 4) return;
  mouse2.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(mouse2, camera);

  const hits = raycaster.intersectObjects([...sphereMeshes.values()]);
  const prevSelected = selected;
  selected = hits.length ? hits[0].object.userData.node.idx : -1;
  lastRebuilt = 0;

  if (selected !== prevSelected) {
    // Only the two nodes whose sphere appearance changes need rebuilding.
    const changed = new Set();
    if (prevSelected >= 0 && diagram.getNode(prevSelected)) changed.add(prevSelected);
    if (selected    >= 0)                                    changed.add(selected);
    partialRebuild(changed);
  }
});

// ── Animation: Lissajous path on selected node ────────────────────────────────
function stepAnimation(dt) {
  if (!animating || selected < 0) return;
  const node = diagram.getNode(selected);
  if (!node) return;

  animT += dt * 0.4;
  const r  = BOUND_R * 0.65;
  const nx = r * Math.sin(animT * 1.3);
  const ny = r * Math.sin(animT * 0.7);
  const nz = r * Math.sin(animT * 1.0);

  // node.move() does the local Voronoi rebuild; we get back exactly which cells changed.
  const affected = node.move(nx, ny, nz);
  lastRebuilt = affected ? affected.size : 0;

  // Only rebuild Three.js geometry for the ~10-16 affected cells.
  if (affected) partialRebuild(affected);
}

// ── UI controls ───────────────────────────────────────────────────────────────
const nSl = document.getElementById('nSl');
nSl.addEventListener('input', () => document.getElementById('nLbl').textContent = nSl.value);
document.getElementById('btnRegen').addEventListener('click', () => generate(+nSl.value));

function setBound(type) {
  document.getElementById('btnSphere').classList.toggle('active', type === 'sphere');
  document.getElementById('btnAABB').classList.toggle('active',  type === 'aabb');
  generate(+nSl.value);
}
document.getElementById('btnSphere').addEventListener('click', () => setBound('sphere'));
document.getElementById('btnAABB').addEventListener('click',   () => setBound('aabb'));

document.getElementById('btnAnimate').addEventListener('click', () => {
  animating = !animating;
  document.getElementById('btnAnimate').classList.toggle('active', animating);
  if (animating && selected < 0 && diagram?.nodes.length) {
    selected = diagram.nodes[0].idx;
    partialRebuild(new Set([selected]));
  }
});

window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// ── Render loop ───────────────────────────────────────────────────────────────
let lastTime = 0;
(function loop(t) {
  requestAnimationFrame(loop);
  const dt = Math.min((t - lastTime) / 1000, 0.05);
  lastTime = t;
  stepAnimation(dt);
  renderer.render(scene, camera);
})();

generate(+nSl.value);
