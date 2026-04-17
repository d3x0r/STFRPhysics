// Static file server for the voronoi test page.
// Run from the worktree root:
//   node --import sack.vfs/import test/server.mjs
// Then open: http://localhost:8080/test/

import { Protocol as Protocol_ } from "sack.vfs/server-protocol";

class Protocol extends Protocol_ {
  constructor() {
    // resourcePath "." = serve from CWD (worktree root).
    // That gives the browser access to /voronoi/, /node_modules/, and /test/.
    super({ resourcePath: ".", port: Number(process.env.PORT) || 8080 });
  }
}

const protocol = new Protocol();
console.log(`Voronoi test server → http://localhost:${protocol.port || 8080}/test/`);
