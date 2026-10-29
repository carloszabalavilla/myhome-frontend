// Dependency-free launcher for the combined local demonstration.
const http = require('node:http');
const net = require('node:net');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = fs.existsSync(path.join(__dirname, 'web')) ? __dirname : path.resolve(__dirname, '..');
const web = path.join(root, fs.existsSync(path.join(root, 'web')) ? 'web' : 'build');
const jar = process.env.MYHOME_BACKEND_JAR || (fs.existsSync(path.join(root, 'backend', 'myhome.jar'))
  ? path.join(root, 'backend', 'myhome.jar') : path.resolve(root, '../myhome-backend/myhome/target/myhome-1.1.1.jar'));
if (!fs.existsSync(jar) || !fs.existsSync(path.join(web, 'index.html'))) {
  console.error('Falta el JAR del backend o el build del frontend. Consulta README-local.md.'); process.exit(1);
}
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
let child;
let closing = false;
const server = http.createServer();
function stop(code = 0) {
  if (closing) return;
  closing = true;
  if (child && !child.killed) child.kill();
  server.close();
  setTimeout(() => process.exit(code), 500).unref();
}
process.on('SIGINT', () => stop()); process.on('SIGTERM', () => stop());
async function main() {
  const reservation = net.createServer();
  await new Promise((resolve, reject) => { reservation.once('error', reject); reservation.listen(0, '127.0.0.1', resolve); });
  const apiPort = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  server.on('request', (req, res) => {
    if (req.url.startsWith('/api/')) {
      const upstream = http.request({ host: '127.0.0.1', port: apiPort, path: req.url, method: req.method, headers: req.headers }, response => {
        res.writeHead(response.statusCode, response.headers); response.pipe(res);
      });
      upstream.on('error', () => { if (!res.headersSent) res.writeHead(503, { 'Content-Type': 'application/json' }); res.end('{"message":"El backend está iniciándose"}'); });
      req.pipe(upstream); return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
    let requested;
    try { requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400); res.end(); return; }
    let file = path.resolve(web, '.' + requested);
    if (file !== web && !file.startsWith(web + path.sep)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      if (path.extname(requested)) { res.writeHead(404); res.end(); return; }
      file = path.join(web, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': (mime[path.extname(file)] || 'application/octet-stream') + (['.html', '.css', '.js', '.json'].includes(path.extname(file)) ? '; charset=utf-8' : '') });
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(3000, '127.0.0.1', resolve); });
  fs.mkdirSync(path.join(root, '.runtime'), { recursive: true });
  const log = fs.createWriteStream(path.join(root, '.runtime', 'backend.log'), { flags: 'w' });
  const java = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', process.platform === 'win32' ? 'java.exe' : 'java') : 'java';
  child = spawn(java, ['-jar', jar, '--spring.profiles.active=demo', '--server.port=' + apiPort], { cwd: root, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.pipe(log); child.stderr.pipe(log);
  child.on('error', error => { console.error('No se pudo ejecutar Java 17+: ' + error.message); stop(1); });
  child.on('exit', code => { if (!closing) { console.error('Backend detenido. Consulta .runtime/backend.log'); stop(code || 1); } });
  for (let attempt = 0; attempt < 120 && !closing; attempt++) {
    try {
      const response = await fetch('http://127.0.0.1:' + apiPort + '/api/auth/check/demo@example.invalid', { signal: AbortSignal.timeout(1000) });
      if (response.ok && await response.json() === true) {
        console.log('MyHome listo: http://localhost:3000');
        console.log('Demo: demo@example.invalid / DemoOnly123!');
        console.log('Los correos de confirmación y recuperación se guardan en .runtime/mail. Ctrl+C para detener.');
        return;
      }
    } catch { /* Wait for the local process to finish booting. */ }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (!closing) { console.error('No terminó el arranque. Consulta .runtime/backend.log'); stop(1); }
}
main().catch(error => { console.error(error.message); stop(1); });
