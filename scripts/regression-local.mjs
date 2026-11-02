import { spawn, spawnSync } from 'node:child_process';
import { openSync } from 'node:fs';

const base = 'http://localhost:4178';
const env = { ...process.env, NEXT_PUBLIC_ASSET_PREFIX: '', NEXT_PUBLIC_ASSET_ORIGIN: '' };

async function isServing() {
  try {
    await fetch(base);
    return true;
  } catch {
    return false;
  }
}

if (await isServing()) {
  console.error('Port 4178 is already in use. Stop the running server before the local regression test.');
  process.exit(1);
}

const build = spawnSync('npx', ['next', 'build'], { env, stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status ?? 1);

const log = openSync('/tmp/regression-local-server.log', 'w');
const server = spawn('npx', ['next', 'start', '-p', '4178'], { env, detached: true, stdio: ['ignore', log, log] });

try {
  const deadline = Date.now() + 60_000;
  while (!(await isServing())) {
    if (Date.now() > deadline) throw new Error('Server did not start within 60s. See /tmp/regression-local-server.log');
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const test = spawnSync('npm', ['run', 'test:regression'], { stdio: 'inherit' });
  process.exitCode = test.status ?? 1;
} finally {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {}
}
