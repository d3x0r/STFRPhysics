// Pure vector math — no dependencies.
// All functions are non-mutating: they return new {x,y,z} objects.

export const v3     = (x=0, y=0, z=0) => ({x, y, z});
export const clone  = a => ({x:a.x, y:a.y, z:a.z});
export const add    = (a,b) => ({x:a.x+b.x, y:a.y+b.y, z:a.z+b.z});
export const sub    = (a,b) => ({x:a.x-b.x, y:a.y-b.y, z:a.z-b.z});
export const scale  = (a,s) => ({x:a.x*s,   y:a.y*s,   z:a.z*s});
export const negate = a     => ({x:-a.x,     y:-a.y,    z:-a.z});

// a + b*s
export const addScaled = (a,b,s) => ({x:a.x+b.x*s, y:a.y+b.y*s, z:a.z+b.z*s});

export const dot = (a,b) => a.x*b.x + a.y*b.y + a.z*b.z;

export const cross = (a,b) => ({
  x: a.y*b.z - a.z*b.y,
  y: a.z*b.x - a.x*b.z,
  z: a.x*b.y - a.y*b.x,
});

export const lengthSq = a => a.x*a.x + a.y*a.y + a.z*a.z;
export const length   = a => Math.sqrt(lengthSq(a));

export function normalize(a) {
  const len = length(a);
  if (len < 1e-12) return {x:0, y:0, z:0};
  const inv = 1/len;
  return {x:a.x*inv, y:a.y*inv, z:a.z*inv};
}

export const lerp = (a,b,t) => ({
  x: a.x + (b.x-a.x)*t,
  y: a.y + (b.y-a.y)*t,
  z: a.z + (b.z-a.z)*t,
});

export const midpoint = (a,b) => lerp(a,b,0.5);

export const distSq = (a,b) => {
  const dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z;
  return dx*dx + dy*dy + dz*dz;
};
