// Polygon clipping and geometry helpers.
// All inputs/outputs are arrays of {x,y,z} plain objects.
// No Three.js dependency.

import { clone, cross, normalize, addScaled, dot, sub, lengthSq, lerp } from './vec3.js';

// ── Sutherland-Hodgman half-space clip ────────────────────────────────────────
// plane = { o:{x,y,z}, n:{x,y,z} }
// Keeps the side where (p - o)·n <= 0  (i.e. "site" side).

export function clipPolygonByPlane(poly, plane) {
  if (poly.length < 3) return [];
  const {o, n} = plane;
  const sd = p => (p.x-o.x)*n.x + (p.y-o.y)*n.y + (p.z-o.z)*n.z;
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i+1) % poly.length];
    const da = sd(a), db = sd(b);
    if (da <= 0) out.push(clone(a));
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      out.push(lerp(a, b, da / (da - db)));
    }
  }
  return out;
}

// ── Sphere clip ───────────────────────────────────────────────────────────────
// Keeps the interior (|p| <= R). Uses ray-sphere intersection on each edge.

export function clipPolygonBySphere(poly, R) {
  if (poly.length < 3) return [];
  const R2 = R*R;
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i+1) % poly.length];
    const da = lengthSq(a) - R2, db = lengthSq(b) - R2;
    if (da <= 0) out.push(clone(a));
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const d = sub(b, a);
      const A = lengthSq(d);
      const B = 2 * dot(a, d);
      const C = lengthSq(a) - R2;
      const disc = B*B - 4*A*C;
      if (disc >= 0) {
        const sq = Math.sqrt(disc);
        const t  = (-B - sq) / (2*A);
        const t2 = (-B + sq) / (2*A);
        const tt = (t  >= 0 && t  <= 1) ? t
                 : (t2 >= 0 && t2 <= 1) ? t2 : -1;
        if (tt >= 0) out.push(lerp(a, b, tt));
      }
    }
  }
  return out;
}

// ── AABB clip ─────────────────────────────────────────────────────────────────
// Clips by all 6 faces of the axis-aligned box [min, max].

export function clipPolygonByAABB(poly, min, max) {
  if (poly.length < 3) return [];
  const planes = [
    { o: min, n: {x:-1, y:0, z:0} },
    { o: max, n: {x: 1, y:0, z:0} },
    { o: min, n: {x:0, y:-1, z:0} },
    { o: max, n: {x:0, y: 1, z:0} },
    { o: min, n: {x:0, y:0, z:-1} },
    { o: max, n: {x:0, y:0, z: 1} },
  ];
  let p = poly;
  for (const plane of planes) {
    p = clipPolygonByPlane(p, plane);
    if (p.length < 3) return [];
  }
  return p;
}

// ── Disk ──────────────────────────────────────────────────────────────────────
// Build a large convex polygon (disc) centred at `o` on the plane with normal `n`.
// This is the starting shape that gets clipped down to a Voronoi face.

export function makeDisk(o, n, R, segments = 24) {
  const tmp = Math.abs(n.x) < 0.9 ? {x:1,y:0,z:0} : {x:0,y:1,z:0};
  const u   = normalize(cross(tmp, n));
  const v   = normalize(cross(n, u));
  const poly = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    poly.push(addScaled(addScaled(clone(o), u, Math.cos(a)*R), v, Math.sin(a)*R));
  }
  return poly;
}

// ── Triangulate ───────────────────────────────────────────────────────────────
// Fan triangulation from centroid.
// Returns a flat array of {x,y,z} vertices, 3 per triangle.

export function triangulate(poly) {
  if (poly.length < 3) return [];
  let cx=0, cy=0, cz=0;
  for (const p of poly) { cx+=p.x; cy+=p.y; cz+=p.z; }
  const inv = 1 / poly.length;
  const c   = {x:cx*inv, y:cy*inv, z:cz*inv};
  const tris = [];
  for (let i = 0; i < poly.length; i++) {
    tris.push(clone(c), clone(poly[i]), clone(poly[(i+1) % poly.length]));
  }
  return tris;
}
