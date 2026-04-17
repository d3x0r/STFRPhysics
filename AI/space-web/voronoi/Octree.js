// Axis-aligned octree — spatial index with O(log n) insert, remove, update, query.
//
// Supports O(1) removal via a leaf-map (idx → {node, item}).
// No dependency on Three.js or any other module.

class OctreeNode {
  constructor(cx, cy, cz, half) {
    this.cx = cx; this.cy = cy; this.cz = cz;
    this.half     = half;
    this.items    = [];      // [{idx,x,y,z}] — populated only in leaf nodes
    this.children = null;    // 8 OctreeNode children when split
  }

  insert(item, leafMap) {
    if (this.children) {
      this._child(item.x, item.y, item.z).insert(item, leafMap);
    } else {
      this.items.push(item);
      leafMap.set(item.idx, { node: this, item });
      if (this.items.length > 8 && this.half > 0.005) this._split(leafMap);
    }
  }

  _split(leafMap) {
    const h = this.half * 0.5;
    this.children = [];
    for (let i = 0; i < 8; i++) {
      this.children.push(new OctreeNode(
        this.cx + (i&1 ? h : -h),
        this.cy + (i&2 ? h : -h),
        this.cz + (i&4 ? h : -h),
        h,
      ));
    }
    const items = this.items;
    this.items = [];
    for (const it of items) this._child(it.x, it.y, it.z).insert(it, leafMap);
  }

  _child(x, y, z) {
    return this.children[
      (x > this.cx ? 1 : 0) |
      (y > this.cy ? 2 : 0) |
      (z > this.cz ? 4 : 0)
    ];
  }

  // Collect indices of all items within radius r of (qx, qy, qz).
  query(qx, qy, qz, r, out) {
    // AABB–sphere early-out
    const dx = Math.max(0, Math.abs(qx - this.cx) - this.half);
    const dy = Math.max(0, Math.abs(qy - this.cy) - this.half);
    const dz = Math.max(0, Math.abs(qz - this.cz) - this.half);
    if (dx*dx + dy*dy + dz*dz > r*r) return;

    if (this.children) {
      for (const c of this.children) c.query(qx, qy, qz, r, out);
    } else {
      const r2 = r*r;
      for (const it of this.items) {
        const ex=it.x-qx, ey=it.y-qy, ez=it.z-qz;
        if (ex*ex + ey*ey + ez*ez <= r2) out.push(it.idx);
      }
    }
  }
}

export class Octree {
  /**
   * @param {number} cx  Center x
   * @param {number} cy  Center y
   * @param {number} cz  Center z
   * @param {number} half  Half-extent of root node
   */
  constructor(cx=0, cy=0, cz=0, half=4) {
    this._root    = new OctreeNode(cx, cy, cz, half);
    this._leafMap = new Map(); // idx → { node: OctreeNode, item: {idx,x,y,z} }
  }

  insert(idx, x, y, z) {
    if (this._leafMap.has(idx)) this.remove(idx); // guard against duplicate inserts
    const item = { idx, x, y, z };
    this._root.insert(item, this._leafMap);
  }

  // O(1) removal via leaf-map.
  remove(idx) {
    const entry = this._leafMap.get(idx);
    if (!entry) return;
    const { node, item } = entry;
    const i = node.items.indexOf(item);
    if (i >= 0) node.items.splice(i, 1);
    this._leafMap.delete(idx);
    // Note: empty internal nodes are NOT collapsed — tree only ever splits, never merges.
    // This is fine for dynamic scenes; call rebuild() periodically if memory matters.
  }

  update(idx, x, y, z) {
    this.remove(idx);
    this.insert(idx, x, y, z);
  }

  /**
   * Return up to K nearest indices to (x,y,z), excluding excludeIdx.
   * Uses expanding-radius search so it always returns K results (if available).
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} K
   * @param {number} [excludeIdx=-1]
   * @returns {number[]}  Sorted nearest-first, length <= K
   */
  kNearest(x, y, z, K, excludeIdx = -1) {
    // Initial radius: 1/4 of root half-extent — expands geometrically until K found.
    let r = this._root.half * 0.25;
    if (r < 0.01) r = 0.5;

    let candidates = [];
    const limit = this._root.half * 16;
    while (r < limit) {
      candidates = [];
      this._root.query(x, y, z, r, candidates);
      // Enough candidates (excluding self) found?
      const usable = excludeIdx < 0
        ? candidates.length
        : candidates.filter(i => i !== excludeIdx).length;
      if (usable >= K) break;
      r *= 2;
    }

    return candidates
      .filter(i => i !== excludeIdx)
      .map(i => {
        const item = this._leafMap.get(i)?.item;
        if (!item) return null;
        const dx=item.x-x, dy=item.y-y, dz=item.z-z;
        return { i, d2: dx*dx + dy*dy + dz*dz };
      })
      .filter(Boolean)
      .sort((a, b) => a.d2 - b.d2)
      .slice(0, K)
      .map(e => e.i);
  }

  /**
   * Return all indices within radius r of (x,y,z).
   * Does not filter — use for broad-phase queries.
   *
   * @returns {number[]}
   */
  queryRegion(x, y, z, r) {
    const out = [];
    this._root.query(x, y, z, r, out);
    return out;
  }

  get size() { return this._leafMap.size; }
}
