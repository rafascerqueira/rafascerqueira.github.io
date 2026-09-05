import { copyFile, stat, writeFile } from "node:fs/promises";
import { projects } from "../src/data/projects.ts";

const root = new URL("../build/client/", import.meta.url);
const origin = "https://rafascerqueira.github.io";
const paths = ["/", "/en/", ...projects.flatMap(({ slug }) => [`/projetos/${slug}/`, `/en/projetos/${slug}/`])];

await Promise.all(paths.map((path) => stat(new URL(`${path.slice(1)}index.html`, root))));
await copyFile(new URL("404/index.html", root), new URL("404.html", root));
await writeFile(new URL(".nojekyll", root), "");
await writeFile(new URL("robots.txt", root), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL("sitemap.xml", root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Static Pages artifact verified: ${paths.length} content pages, 404, sitemap and robots.txt.`);
