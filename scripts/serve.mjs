import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../build/client/", import.meta.url)).replace(/\/$/, "");
const portArgument = process.argv.indexOf("--port");
const port = Number(portArgument >= 0 ? process.argv[portArgument + 1] : process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".data": "text/x-script", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

await stat(resolve(root, "index.html"));
const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end(); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end();
    return;
  }
  let status = 200;
  try {
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    if (!(await stat(file)).isFile()) throw new Error("Not a file");
  } catch {
    status = 404;
    file = resolve(root, "404.html");
  }
  response.writeHead(status, { "Content-Type": mime[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
  if (request.method === "HEAD") { response.end(); return; }
  const stream = createReadStream(file);
  stream.on("error", () => response.destroy());
  stream.pipe(response);
});
server.listen(port, "127.0.0.1", () => console.log(`Static portfolio: http://127.0.0.1:${port}`));
