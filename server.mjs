import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const relative = normalize(urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, ""));
    const file = join(root, relative);
    if (!file.startsWith(root)) throw new Error("Invalid path");
    const fileStat = await stat(file);
    if (!fileStat.isFile()) throw new Error("Not a file");
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`GEO workbench demo: http://127.0.0.1:${port}`);
});
