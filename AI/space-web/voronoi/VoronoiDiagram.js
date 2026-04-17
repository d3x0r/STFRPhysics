// VoronoiDiagram — manages a set of Nodes, an Octree, and per-node Voronoi cells.
//
// Design notes:
//   - No Three.js dependency. All geometry is plain {x,y,z} objects.
//   - Nodes are stored in a sparse array; removed slots are recycled.
//     Indices assigned by addNode() are stable until that node is removed.
//   - Local rebuilds: only the moved/added/removed node + its affected neighbors
//     are recomputed — not the full diagram.
//   - Thread safety: the diagram owns all mutable state. Run it inside a Web Worker
//     and communicate via postMessage / getSnapshot(). See getSnapshot() below.

import { normalize } from './vec3.js';
import { clipPolygonByPlane, makeDisk } from './clip.js';
import { Octree } from './Octree.js';
import { Node }   from './Node.js';

export class VoronoiDiagram {
  /**
   * @param {SphereBound|AABBBound} bound
   * @param {object}  [options]
   * @param {number}  [options.K]  Fixed candidate count for bisector search.
   *                               Default: auto (max(20, ceil(n * 0.35))).
   */
  constructor(bound, options = {}) {
    this.bound   = bound;
    this._K      = options.K ?? null;

    const c = bound.octreeCenter;
    this._octree    = new Octree(c.x, c.y, c.z, bound.octreeHalf);
    this._nodes     = [];   // sparse Node[]; null slots = removed
    this._freeSlots = [];   // recycled indices from removeNode()
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Create and register a base Node.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {*}    [userData]
   * @param {Node} [anchor]   Nearby node — hints the octree search radius.
   *                          Does not need to be the nearest node; just a starting point.
   * @returns {Node}
   */
  addPoint(x, y, z, userData = null, anchor = null) {
    return this.addNode(new Node(x, y, z, userData), anchor);
  }

  /**
   * Register a pre-constructed Node or subclass instance.
   * The node's position (x,y,z) must already be set.
   *
   * @param {Node}  node
   * @param {Node}  [anchor]
   * @returns {Node}
   */
  addNode(node, anchor = null) {
    const idx = this._allocIdx();
    node._idx     = idx;
    node._diagram = this;
    this._nodes[idx] = node;
    this._octree.insert(idx, node.x, node.y, node.z);
    this._rebuildAffected(idx);
    return node;
  }

  /**
   * Move a node and locally recompute all affected cells.
   * Called automatically by node.move(x,y,z) when the node is registered.
   *
   * @param {Node}   node
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Set<number>}  Indices of all recomputed nodes.
   */
  movePoint(node, x, y, z) {
    // Snapshot old neighbors before the move — they may no longer be neighbors after.
    const oldNeighborIdxs = node._neighbors.map(n => n._idx);
    node.x = x; node.y = y; node.z = z;
    this._octree.update(node._idx, x, y, z);
    return this._rebuildAffected(node._idx, oldNeighborIdxs);
  }

  /**
   * Remove a node from the diagram.
   * Former neighbors are rebuilt — they may now become direct neighbors of each other.
   * Called automatically by node.remove().
   *
   * @param {Node} node
   * @returns {Set<number>}  Indices of all recomputed nodes.
   */
  removeNode(node) {
    const idx          = node._idx;
    const neighborIdxs = node._neighbors.map(n => n._idx);

    this._octree.remove(idx);
    this._nodes[idx] = null;
    this._freeSlots.push(idx);

    node._idx       = -1;
    node._diagram   = null;
    node._neighbors = [];
    node._faces     = [];

    const rebuilt = new Set();
    for (const ni of neighborIdxs) {
      const nb = this._nodes[ni];
      if (nb) { this._buildCell(ni); rebuilt.add(ni); }
    }
    return rebuilt;
  }

  /** @returns {Node|null} */
  getNode(idx) { return this._nodes[idx] ?? null; }

  /** All live nodes as an array (no nulls). */
  get nodes() { return this._nodes.filter(Boolean); }

  /** Number of live nodes. */
  get size() {
    return this._nodes.length - this._freeSlots.length
         - this._nodes.reduce((n,v) => n + (v === undefined ? 1 : 0), 0);
  }

  /**
   * Broad-phase spatial query — returns Nodes within `radius` of a point.
   * The query point does NOT need to be a registered node.
   *
   * @returns {Node[]}
   */
  queryRegion(x, y, z, radius) {
    return this._octree.queryRegion(x, y, z, radius)
      .map(i => this._nodes[i])
      .filter(Boolean);
  }

  /**
   * Serialisable snapshot of the full diagram state.
   * Safe to transfer via postMessage() to another thread / worker.
   *
   * userData is intentionally excluded — the caller knows whether it is
   * transferable (it usually isn't).  Attach it separately if needed.
   *
   * @returns {Array<{idx, x, y, z, neighbors: number[], faces: object[]}>}
   */
  getSnapshot() {
    return this._nodes
      .filter(Boolean)
      .map(n => ({
        idx:       n._idx,
        x: n.x, y: n.y, z: n.z,
        neighbors: n._neighbors.map(nb => nb._idx),
        faces:     n._faces.map(f => ({
          verts:       f.verts,
          neighborIdx: f.neighbor?._idx ?? -1,
          isBoundary:  f.isBoundary,
        })),
      }));
  }

  // ── Internal ───────────────────────────────────────────────────────────────

  _allocIdx() {
    return this._freeSlots.length > 0
      ? this._freeSlots.pop()
      : this._nodes.length;
  }

  _computeK() {
    if (this._K) return this._K;
    const n = this._nodes.filter(Boolean).length;
    return Math.min(n - 1, Math.max(20, Math.ceil(n * 0.35)));
  }

  /**
   * Rebuild cell for `idx`, then rebuild all transitively affected neighbors.
   *
   * `extraIdxs` carries previously-known neighbors that should also be rebuilt
   * (used by movePoint so that old neighbors — which may have lost this node —
   * are not skipped).
   *
   * @param {number}   idx
   * @param {number[]} [extraIdxs=[]]
   * @returns {Set<number>}
   */
  _rebuildAffected(idx, extraIdxs = []) {
    const rebuilt = new Set();

    if (this._nodes[idx]) {
      this._buildCell(idx);
      rebuilt.add(idx);
    }

    // Rebuild union of old neighbors + new neighbors
    const toRebuild = new Set(extraIdxs);
    this._nodes[idx]?._neighbors.forEach(n => toRebuild.add(n._idx));

    for (const ni of toRebuild) {
      if (ni !== idx && this._nodes[ni]) {
        this._buildCell(ni);
        rebuilt.add(ni);
      }
    }
    return rebuilt;
  }

  /** Compute the Voronoi cell for a single node index. */
  _buildCell(idx) {
    const node = this._nodes[idx];
    if (!node) return;

    const K     = this._computeK();
    const diskR = this.bound.diskRadius;

    const candidateIdxs = this._octree.kNearest(node.x, node.y, node.z, K, idx);

    // Bisector plane for each candidate neighbor.
    const planes = candidateIdxs
      .map(i => {
        const nb = this._nodes[i];
        if (!nb) return null;
        return {
          // midpoint between site and neighbor
          o: { x:(node.x+nb.x)*0.5, y:(node.y+nb.y)*0.5, z:(node.z+nb.z)*0.5 },
          // outward normal (points toward neighbor)
          n: normalize({ x:nb.x-node.x, y:nb.y-node.y, z:nb.z-node.z }),
          neighborIdx: i,
        };
      })
      .filter(Boolean);

    const faces         = [];
    const trueNeighbors = new Set();

    for (let pi = 0; pi < planes.length; pi++) {
      const plane = planes[pi];

      // Start with a large disk on this bisector plane …
      let poly = makeDisk(plane.o, plane.n, diskR);

      // … clip by every other bisector (eliminates faces from non-neighbors) …
      for (let ki = 0; ki < planes.length; ki++) {
        if (ki === pi) continue;
        poly = clipPolygonByPlane(poly, planes[ki]);
        if (poly.length < 3) break;
      }
      if (poly.length < 3) continue;

      // … clip by bounding volume.
      poly = this.bound.clip(poly);
      if (poly.length < 3) continue;

      // Face survived — this bisector plane yields a true Voronoi face.
      const isBoundary = poly.some(v => this.bound.isOnBoundary(v));
      faces.push({
        verts:      poly,
        neighbor:   this._nodes[plane.neighborIdx] ?? null,
        isBoundary,
      });
      trueNeighbors.add(plane.neighborIdx);
    }

    node._faces     = faces;
    node._neighbors = [...trueNeighbors]
      .map(i => this._nodes[i])
      .filter(Boolean);
  }
}
