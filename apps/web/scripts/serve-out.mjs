// Minimal static server for the export in out/ (e2e tests only; no dependency).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT ?? 4173);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".ico": "image/x-icon", ".txt": "text/plain", ".json": "application/json" };

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = path.join(root, url);
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) file = path.join(root, "404.html");
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
