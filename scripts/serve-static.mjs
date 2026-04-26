import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', 'out');
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

function safeJoin(baseDir, requestPath) {
  const normalized = path.normalize(path.join(baseDir, requestPath));
  return normalized.startsWith(baseDir) ? normalized : null;
}

function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const cleanedPath = pathname === '/' ? '/index.html' : pathname;
  const candidates = [
    cleanedPath,
    `${cleanedPath}.html`,
    path.join(cleanedPath, 'index.html'),
  ];

  for (const candidate of candidates) {
    const resolved = safeJoin(rootDir, candidate);
    if (resolved && fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return resolved;
    }
  }

  return safeJoin(rootDir, '404.html');
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const statusCode = filePath.endsWith('404.html') ? 404 : 200;
  const contentType = contentTypes[ext] || 'application/octet-stream';

  res.writeHead(statusCode, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Serving static export from ${rootDir} at http://localhost:${port}`);
});
