import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const PORT = 3000;
const ROOT = join(import.meta.dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  let url = req.url.split('?')[0];
  console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
  if (url === '/') url = '/preview/index.html';

  // Serve preview/ and dist/ directories
  const filePath = join(ROOT, url);
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found: ' + url);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Preview server running on http://0.0.0.0:${PORT}`);
});
