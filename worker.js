const ORIGIN = "https://raw.githubusercontent.com/vodonoukvianny-cmyk/voldigod/main/";
const ALLOWED = new Set([
  "",
  "index.html",
  "game.js",
  "manifest.webmanifest",
  "icon.svg",
  "privacy-policy.html",
  "sw.js",
  "vendor/three.min.js",
  "vendor/GLTFLoader.js"
]);

const TYPES = {
  "": "text/html; charset=utf-8",
  "index.html": "text/html; charset=utf-8",
  "game.js": "text/javascript; charset=utf-8",
  "manifest.webmanifest": "application/manifest+json",
  "icon.svg": "image/svg+xml",
  "privacy-policy.html": "text/html; charset=utf-8",
  "sw.js": "text/javascript; charset=utf-8",
  "vendor/three.min.js": "text/javascript; charset=utf-8",
  "vendor/GLTFLoader.js": "text/javascript; charset=utf-8"
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!path) path = "index.html";

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (!ALLOWED.has(path)) {
      return new Response("Not Found", { status: 404 });
    }

    const target = ORIGIN + (path === "index.html" ? "index.html" : path);
    const upstream = await fetch(target, {
      cf: { cacheTtl: 86400, cacheEverything: true }
    });

    if (!upstream.ok) {
      return new Response("Asset unavailable", { status: 502 });
    }

    const headers = new Headers(upstream.headers);
    headers.set("Content-Type", TYPES[path] || "application/octet-stream");
    headers.set("Cache-Control", path === "index.html"
      ? "no-store"
      : "public, max-age=86400, immutable");
    headers.set("X-OTAKUJEUX", "OTAKUJEUX");

    return new Response(request.method === "HEAD" ? null : upstream.body, {
      status: upstream.status,
      headers
    });
  }
};