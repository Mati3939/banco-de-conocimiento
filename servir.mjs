// Servidor estático de la Biblioteca para acceder desde el celular (misma WiFi).
// Uso: node servir.mjs [puerto]   (por defecto 8080) — o doble clic en "Servir Biblioteca.bat".
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { networkInterfaces } from "node:os";
import { join, normalize, extname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL(".", import.meta.url));
const PUERTO = Number(process.argv[2]) || 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

const servidor = http.createServer(async (req, res) => {
  try {
    let ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (ruta.endsWith("/")) ruta += "index.html";
    // Evitar salir de la carpeta Biblioteca
    const archivo = normalize(join(RAIZ, ruta));
    if (!archivo.startsWith(normalize(RAIZ))) {
      res.writeHead(403).end("Prohibido");
      return;
    }
    let info;
    try {
      info = await stat(archivo);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado: " + ruta);
      return;
    }
    if (info.isDirectory()) {
      res.writeHead(301, { Location: ruta.replace(/\/?$/, "/") }).end();
      return;
    }
    const cuerpo = await readFile(archivo);
    res.writeHead(200, {
      "Content-Type": MIME[extname(archivo).toLowerCase()] ?? "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(cuerpo);
  } catch (e) {
    res.writeHead(500).end("Error interno");
    console.error(e);
  }
});

servidor.listen(PUERTO, "0.0.0.0", () => {
  const ips = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === "IPv4" && !i.internal)
    .map((i) => i.address);
  console.log("\n📚 Biblioteca sirviéndose desde esta PC.\n");
  console.log(`   En esta PC:      http://localhost:${PUERTO}/`);
  for (const ip of ips) console.log(`   Desde el celular: http://${ip}:${PUERTO}/   (misma WiFi)`);
  console.log("\n   Dejá esta ventana abierta. Ctrl+C para detener.\n");
});
