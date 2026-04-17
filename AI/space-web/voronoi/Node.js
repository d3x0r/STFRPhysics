// Base Voronoi node class — extend freely for game objects, physics bodies, etc.
//
// A Node is registered with a VoronoiDiagram via diagram.addNode(node) or
// diagram.addPoint(x, y, z, userData). Once registered it holds a back-reference
// to the diagram and exposes move() / addNearby() / remove() as convenience methods.
//
// The _-prefixed fields are owned by VoronoiDiagram and should not be mutated directly.

export class Node {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {*} [userData]  Arbitrary caller data — mesh ref, physics body, mass, etc.
   */
  constructor(x, y, z, userData = null) {
    this.x        = x;
    this.y        = y;
    this.z        = z;
    this.userData = userData;

    // Set by VoronoiDiagram when registered. Stable until removeNode().
    this._idx     = -1;
    this._diagram = null;

    // Computed by VoronoiDiagram._buildCell(). Read-only from outside.
    /** @type {Node[]} */
    this._neighbors = [];
    /**
     * @type {Array<{
     *   verts:      Array<{x:number,y:number,z:number}>,
     *   neighbor:   Node|null,
     *   isBoundary: boolean
     * }>}
     *
     * isBoundary = true  → face is clipped by the bounding volume ("edge of known space")
     * isBoundary = false → face is shared with a neighbour cell (fracture/contact surface)
     */
    this._faces = [];
  }

  // ── Read-only accessors ────────────────────────────────────────────────────

  /** True Voronoi neighbours — nodes that share a cell face with this one. */
  get neighbors() { return this._neighbors; }

  /**
   * Voronoi cell faces.  Each face:
   *   verts[]     — polygon vertices as {x,y,z}
   *   neighbor    — the Node on the other side (null for boundary faces)
   *   isBoundary  — clipped by bounding volume, not by another cell
   */
  get faces() { return this._faces; }

  /** Index in the parent diagram's node list.  -1 if not registered. */
  get idx() { return this._idx; }

  // ── Mutation helpers ───────────────────────────────────────────────────────

  /**
   * Move this node and trigger a local Voronoi rebuild.
   * Only works when the node is registered in a diagram.
   * @returns {Set<number>}  Indices of all recomputed cells, or null if unregistered.
   */
  move(x, y, z) {
    if (!this._diagram) {
      this.x = x; this.y = y; this.z = z;
      return null;
    }
    return this._diagram.movePoint(this, x, y, z);
  }

  /**
   * Add a new node near this one (anchor hint for search radius).
   * Returns the new Node, already registered in the same diagram.
   */
  addNearby(x, y, z, userData = null) {
    if (!this._diagram) throw new Error('Node is not registered in a diagram');
    return this._diagram.addPoint(x, y, z, userData, this);
  }

  /** Unregister this node from its diagram. */
  remove() {
    this._diagram?.removeNode(this);
  }
}
