// Optional Three.js rendering adapter.
// Import separately — keeps the core library free of any Three.js dependency.
//
// Usage:
//   import * as VoronoiThree from './voronoi/three-adapter.js';
//   const group = VoronoiThree.buildGroup(diagram, selectedIdx, THREE);

import { triangulate } from './clip.js';

// ── Geometry helpers ──────────────────────────────────────────────────────────

/** BufferGeometry for a filled cell face (fan-triangulated). */
export function faceGeometry(verts, THREE) {
  const tris = triangulate(verts);
  const pos  = new Float32Array(tris.length * 3);
  tris.forEach((v,i) => { pos[i*3]=v.x; pos[i*3+1]=v.y; pos[i*3+2]=v.z; });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

/** BufferGeometry for a wireframe edge loop around a polygon. */
export function edgeGeometry(verts, THREE) {
  const loop = [...verts, verts[0]]; // close the loop
  const arr  = new Float32Array(loop.length * 3);
  loop.forEach((v,i) => { arr[i*3]=v.x; arr[i*3+1]=v.y; arr[i*3+2]=v.z; });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  return geo;
}

// ── Materials ─────────────────────────────────────────────────────────────────

export function faceMaterial(hue, selected, THREE) {
  return new THREE.MeshPhongMaterial({
    color:      new THREE.Color().setHSL(hue, 0.55, selected ? 0.35 : 0.18),
    emissive:   new THREE.Color().setHSL(hue, 0.40, selected ? 0.08 : 0.0),
    transparent: true,
    opacity:    selected ? 0.85 : 0.18,
    side:       THREE.DoubleSide,
    depthWrite: selected,
  });
}

export function edgeMaterial(hue, selected, THREE) {
  return new THREE.LineBasicMaterial({
    color:       new THREE.Color().setHSL(hue, 0.7, selected ? 0.7 : 0.45),
    transparent: true,
    opacity:     selected ? 0.95 : 0.35,
  });
}

// ── Per-node helpers (use these for incremental updates) ─────────────────────

/**
 * Build face + edge meshes for a single node's cell.
 * Returns a flat array of Object3D — pass to disposeObjects() when done.
 */
export function buildCellMeshes(node, isSelected, THREE) {
  const h   = (node.idx * 137.508 / 360) % 1;
  const out = [];
  for (const face of node.faces) {
    if (face.verts.length < 3) continue;
    out.push(new THREE.Mesh(
      faceGeometry(face.verts, THREE),
      faceMaterial(h, isSelected, THREE),
    ));
    out.push(new THREE.LineLoop(
      edgeGeometry(face.verts, THREE),
      edgeMaterial(h, isSelected, THREE),
    ));
  }
  return out;
}

/**
 * Build the node indicator sphere.
 * userData.node is set for raycasting.
 */
export function buildNodeSphere(node, isSelected, THREE) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(isSelected ? 0.045 : 0.028, 8, 8),
    new THREE.MeshBasicMaterial({ color: isSelected ? 0xffcc44 : 0x44aaff }),
  );
  mesh.position.set(node.x, node.y, node.z);
  mesh.userData.node = node;
  return mesh;
}

/**
 * Dispose geometry + material for every object in the array.
 * Call before removing objects from the scene to avoid GPU memory leaks.
 */
export function disposeObjects(objects) {
  for (const obj of objects) {
    obj.geometry?.dispose();
    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
    else obj.material?.dispose();
  }
}

// ── Full scene build (convenience wrappers) ───────────────────────────────────

/**
 * Build a THREE.Group containing meshes and edge lines for every cell in the diagram.
 */
export function buildGroup(diagram, selectedIdx, THREE) {
  const group = new THREE.Group();
  for (const node of diagram.nodes) {
    for (const obj of buildCellMeshes(node, node.idx === selectedIdx, THREE))
      group.add(obj);
  }
  return group;
}

/**
 * Build a THREE.Group of node indicator spheres.
 */
export function buildNodeGroup(diagram, selectedIdx, THREE) {
  const group = new THREE.Group();
  for (const node of diagram.nodes)
    group.add(buildNodeSphere(node, node.idx === selectedIdx, THREE));
  return group;
}
