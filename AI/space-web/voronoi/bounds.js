// Bounding volumes for the Voronoi diagram.
//
// Both classes implement the same interface:
//   clip(poly)           — clip a polygon to the interior, returns new polygon
//   diskRadius           — (getter) large enough disk radius to cover the bound
//   octreeCenter         — (getter) {x,y,z} center for the Octree root
//   octreeHalf           — (getter) half-extent for the Octree root
//   contains(p)          — is point p strictly inside?
//   isOnBoundary(p)      — is point p on the surface (within floating-point eps)?

import { lengthSq } from './vec3.js';
import { clipPolygonBySphere, clipPolygonByAABB } from './clip.js';

// Relative tolerance for boundary detection.
const REL_EPS = 1e-4;

// ── Sphere ────────────────────────────────────────────────────────────────────

export class SphereBound {
  constructor(radius) {
    this.radius = radius;
  }

  clip(poly) {
    return clipPolygonBySphere(poly, this.radius);
  }

  get diskRadius() {
    // Must be large enough to reach every point in the bound from any bisector origin.
    return this.radius * 2.2;
  }

  get octreeCenter() { return {x:0, y:0, z:0}; }
  get octreeHalf()   { return this.radius * 1.1; }

  contains(p) {
    return lengthSq(p) <= this.radius * this.radius;
  }

  isOnBoundary(p) {
    const R2  = this.radius * this.radius;
    return Math.abs(lengthSq(p) - R2) <= REL_EPS * R2;
  }
}

// ── AABB ──────────────────────────────────────────────────────────────────────

export class AABBBound {
  /** @param {{x,y,z}} min @param {{x,y,z}} max */
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  /** Convenience: centred box from half-extents. */
  static fromHalfExtent(hx, hy=hx, hz=hx) {
    return new AABBBound({x:-hx, y:-hy, z:-hz}, {x:hx, y:hy, z:hz});
  }

  clip(poly) {
    return clipPolygonByAABB(poly, this.min, this.max);
  }

  get diskRadius() {
    // Diagonal of the box — large enough to cover any bisector plane inside it.
    const dx = this.max.x - this.min.x;
    const dy = this.max.y - this.min.y;
    const dz = this.max.z - this.min.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  }

  get octreeCenter() {
    return {
      x: (this.min.x + this.max.x) * 0.5,
      y: (this.min.y + this.max.y) * 0.5,
      z: (this.min.z + this.max.z) * 0.5,
    };
  }

  get octreeHalf() {
    // Half the longest side, with a small margin.
    return Math.max(
      this.max.x - this.min.x,
      this.max.y - this.min.y,
      this.max.z - this.min.z,
    ) * 0.55;
  }

  contains(p) {
    return p.x >= this.min.x && p.x <= this.max.x
        && p.y >= this.min.y && p.y <= this.max.y
        && p.z >= this.min.z && p.z <= this.max.z;
  }

  isOnBoundary(p) {
    const ex = (this.max.x - this.min.x) * REL_EPS;
    const ey = (this.max.y - this.min.y) * REL_EPS;
    const ez = (this.max.z - this.min.z) * REL_EPS;
    return Math.abs(p.x - this.min.x) <= ex || Math.abs(p.x - this.max.x) <= ex
        || Math.abs(p.y - this.min.y) <= ey || Math.abs(p.y - this.max.y) <= ey
        || Math.abs(p.z - this.min.z) <= ez || Math.abs(p.z - this.max.z) <= ez;
  }
}
