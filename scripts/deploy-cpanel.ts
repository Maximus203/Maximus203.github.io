/** cPanel release gate. Only this CLI reads credentials; pure helpers are safe to test. */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const DOMAIN = 'cherif-diouf.artist-dev.com';
export const ORIGIN = `https://${DOMAIN}`;
export const CDN = 'https://maximus203.github.io';
const exec = promisify(execFile);
export class DeploymentError extends Error {}
type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord => value && typeof value === 'object' && !Array.isArray(value) ? value as JsonRecord : {};
const success = (value: unknown) => value === 1 || value === true || value === '1';
const present = (value: unknown): boolean => value !== null && value !== undefined && value !== false && value !== 0 && (typeof value === 'string' ? value.trim().length > 0 : Array.isArray(value) ? value.length > 0 : typeof value === 'object' ? Object.keys(value).length > 0 : true);

export function deploymentPaths(commit: string, runId: string, attempt: string) {
  if (!/^[a-f0-9]{40}$/.test(commit) || !/^\d+$/.test(runId) || !/^\d+$/.test(attempt)) throw new DeploymentError('Invalid release identifier');
  const filename = `site-${commit}-${runId}-${attempt}.tar.gz`;
  return { filename, archive: `${DOMAIN}/${filename}`, destination: DOMAIN };
}
export function assertDeploymentPath(path: string, archive: boolean): void {
  const valid = archive ? new RegExp(`^${DOMAIN.replace(/\./g, '\\.')}\/site-[a-f0-9]{40}-\\d+-\\d+\\.tar\\.gz$`).test(path) : path === DOMAIN;
  if (!valid) throw new DeploymentError('Deployment path is outside the expected relative directory');
}
export function extractionQuery(user: string, archive: string, destination: string): URLSearchParams {
  if (!user || /[\r\n]/.test(user)) throw new DeploymentError('Missing or invalid cPanel deployment configuration');
  assertDeploymentPath(archive, true);
  assertDeploymentPath(destination, false);
  return new URLSearchParams({ cpanel_jsonapi_user: user, cpanel_jsonapi_apiversion: '2', cpanel_jsonapi_module: 'Fileman', cpanel_jsonapi_func: 'fileop', op: 'extract', sourcefiles: archive, destfiles: `/${destination}`, doubledecode: '1' });
}
export function parseApiResponse(body: string, status: number): unknown {
  if (!Number.isInteger(status) || status < 200 || status >= 300) throw new DeploymentError(`cPanel HTTP failure (${status})`);
  try { return JSON.parse(body); } catch { throw new DeploymentError('cPanel returned invalid JSON'); }
}
export function validateUpload(value: unknown): void {
  const response = record(value);
  const data = record(response.data);
  if (!success(response.status) || [response.error, response.errors, response.err].some(present) || Number(data.failed) !== 0 || Number(data.succeeded) !== 1 || !Array.isArray(data.uploads) || data.uploads.length !== 1 || !success(record(data.uploads[0]).status)) {
    throw new DeploymentError('cPanel upload did not confirm one successful file');
  }
}
export function hasExtractionFailure(output: string): boolean {
  return /\b(?:tar|gtar|gzip|unzip|bzip2)(?:\s+\([^)]*\))?\s*:[^\n]*(?:error|cannot|can not|failed|failure|no such|not found|impossible|introuvable|denied|not recoverable|returned status\s+[1-9])/i.test(output)
    || /(?:^|\n)\s*(?:fatal\b|error\s*:|error is not recoverable|child returned status\s+[1-9])/i.test(output);
}
export function validateExtraction(value: unknown): void {
  const outer = record(value);
  const result = record(outer.cpanelresult);
  if ([outer.error, outer.errors, outer.err, result.error, result.errors, result.err].some(present) || !success(record(result.event).result) || !Array.isArray(result.data) || result.data.length === 0) throw new DeploymentError('cPanel extraction returned an invalid or failed envelope');
  for (const entry of result.data) {
    const item = record(entry);
    if (!success(item.result) || present(item.err) || present(item.error) || present(item.errors) || (item.output !== undefined && typeof item.output !== 'string') || hasExtractionFailure(String(item.output ?? ''))) throw new DeploymentError('cPanel extraction reported failure (including archive diagnostics)');
  }
}
export function referencedAssets(html: string): string[] {
  if (!/class="[^"]*\bapplications-page\b/.test(html) || !['file-converter', 'meme-generator', 'readme-generator'].every(slug => html.includes(`/applications/${slug}`))) throw new DeploymentError('Applications page is missing the new catalog');
  const assets = new Set<string>();
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    let url: URL;
    try { url = new URL(match[1].replace(/&amp;/g, '&'), ORIGIN); } catch { continue; }
    if (!/\.(?:css|js)$/.test(url.pathname)) continue;
    if (!url.pathname.startsWith('/_next/static/')) continue;
    if (![ORIGIN, CDN].includes(url.origin) || url.username || url.password) throw new DeploymentError('Unexpected build asset origin');
    assets.add(url.href);
  }
  if (![...assets].some(url => url.endsWith('.css')) || ![...assets].some(url => url.endsWith('.js')) || assets.size > 40) throw new DeploymentError('Applications page does not reference a bounded CSS/JS bundle');
  return [...assets, `${CDN}/media/photo.webp`];
}
export const catalogDigest = (html: string) => createHash('sha256').update(html, 'utf8').digest('hex');
export type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;
async function publicResponse(fetcher: Fetcher, url: string, method = 'GET') {
  const response = await fetcher(url, { method, redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(20_000) });
  if (!response.ok) { await response.body?.cancel(); throw new DeploymentError(`Public verification HTTP failure (${response.status})`); }
  return response;
}
export async function verifyReleaseOnce(commit: string, fetcher: Fetcher = fetch): Promise<number> {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new DeploymentError('Invalid verification commit');
  const suffix = `?verify=${commit}`;
  const marker = await publicResponse(fetcher, `${ORIGIN}/deployment.json${suffix}`);
  const version = record(await marker.json());
  if (version.commit !== commit || version.application !== 'cherif-portfolio' || typeof version.catalogSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(version.catalogSha256)) throw new DeploymentError('Primary domain is serving a stale release marker');
  const page = await publicResponse(fetcher, `${ORIGIN}/fr/applications/${suffix}`);
  if (!page.headers.get('content-type')?.includes('text/html')) throw new DeploymentError('Applications route did not return HTML');
  const html = await page.text();
  if (catalogDigest(html) !== version.catalogSha256) throw new DeploymentError('Primary catalog bytes do not match the release marker');
  const assets = referencedAssets(html);
  await Promise.all(assets.map(async url => {
    const response = await publicResponse(fetcher, url, 'HEAD');
    const type = response.headers.get('content-type') || '';
    const pathname = new URL(url).pathname;
    const valid = pathname.endsWith('.css') ? type.includes('text/css') : pathname.endsWith('.js') ? /(?:javascript|ecmascript)/i.test(type) : type.startsWith('image/');
    await response.body?.cancel();
    if (!valid) throw new DeploymentError('A deployed asset has an unexpected content type');
  }));
  return assets.length;
}
export async function verifyCdnReleaseOnce(commit: string, html: string, fetcher: Fetcher = fetch, nonce = Date.now()): Promise<number> {
  if (!/^[a-f0-9]{40}$/.test(commit) || !Number.isSafeInteger(nonce) || nonce < 0) throw new DeploymentError('Invalid CDN verification release');
  const assets = referencedAssets(html);
  await Promise.all(assets.map(async asset => {
    const url = new URL(asset);
    if (url.origin !== CDN) throw new DeploymentError('A release asset is outside the expected CDN');
    url.searchParams.set('release', `${commit}-${nonce}`);
    const response = await publicResponse(fetcher, url.href, 'HEAD');
    const type = response.headers.get('content-type') || '';
    const valid = url.pathname.endsWith('.css') ? type.includes('text/css') : url.pathname.endsWith('.js') ? /(?:javascript|ecmascript)/i.test(type) : type.startsWith('image/');
    await response.body?.cancel();
    if (!valid) throw new DeploymentError('A CDN asset has an unexpected content type');
  }));
  return assets.length;
}
export async function waitForCdnRelease(commit: string, html: string, options: { attempts?: number; delayMs?: number; fetcher?: Fetcher; sleep?: (ms: number) => Promise<void>; log?: (message: string) => void } = {}) {
  const attempts = options.attempts ?? 30;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms)));
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 60) throw new DeploymentError('Invalid CDN verification budget');
  const deadline = Date.now() + 6 * 60_000;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try { return await verifyCdnReleaseOnce(commit, html, options.fetcher, Date.now() + attempt); }
    catch {
      options.log?.(`CDN release verification ${attempt}/${attempts} not ready`);
      if (attempt === attempts || Date.now() >= deadline) throw new DeploymentError('CDN assets did not converge before cPanel publication');
      await sleep(options.delayMs ?? 10_000);
    }
  }
  throw new DeploymentError('CDN release verification incomplete');
}
export async function waitForRelease(commit: string, options: { attempts?: number; delayMs?: number; fetcher?: Fetcher; sleep?: (ms: number) => Promise<void>; log?: (message: string) => void } = {}) {
  const attempts = options.attempts ?? 30;
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms)));
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 60) throw new DeploymentError('Invalid verification budget');
  const deadline = Date.now() + 6 * 60_000;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try { return await verifyReleaseOnce(commit, options.fetcher); }
    catch {
      options.log?.(`Public release verification ${attempt}/${attempts} not ready`);
      if (attempt === attempts || Date.now() >= deadline) throw new DeploymentError('Primary domain or referenced assets did not converge to the expected release');
      await sleep(options.delayMs ?? 10_000);
    }
  }
  throw new DeploymentError('Release verification incomplete');
}

type DeploymentTransport = { upload: () => Promise<unknown>; preflight: () => Promise<number>; extract: () => Promise<unknown>; verify: () => Promise<number> };
export async function deployWithTransport(transport: DeploymentTransport): Promise<number> {
  validateUpload(await transport.upload());
  await transport.preflight();
  validateExtraction(await transport.extract());
  return transport.verify();
}

async function main() {
  const { GITHUB_SHA = '', GITHUB_RUN_ID = '', GITHUB_RUN_ATTEMPT = '', CPANEL_USER = '', CPANEL_TOKEN = '', CPANEL_SERVER = '' } = process.env;
  const paths = deploymentPaths(GITHUB_SHA, GITHUB_RUN_ID, GITHUB_RUN_ATTEMPT);
  if (process.argv[2] === 'marker') {
    await writeFile('deploy/deployment.json', JSON.stringify({ application: 'cherif-portfolio', commit: GITHUB_SHA, catalogSha256: catalogDigest(await readFile('deploy/fr/applications/index.html', 'utf8')) }) + '\n');
    return;
  }
  if (!CPANEL_USER || !CPANEL_TOKEN || !/^[A-Za-z0-9.-]+$/.test(CPANEL_SERVER) || /[\r\n]/.test(CPANEL_USER + CPANEL_TOKEN)) throw new DeploymentError('Missing or invalid cPanel deployment configuration');
  assertDeploymentPath(paths.archive, true); assertDeploymentPath(paths.destination, false);
  const api = `https://${CPANEL_SERVER}:2083`;
  const authorization = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;
  // Streaming upload via curl; no shell interpolation and no TLS verification bypass.
  const upload = async () => {
    let stdout: string;
    try {
      const result = await exec('curl', ['--silent', '--show-error', '--fail-with-body', '--proto', '=https', '--connect-timeout', '20', '--max-time', '240', '--header', `Authorization: ${authorization}`, '--form', `file=@${resolve('site.tar.gz')};filename=${paths.filename}`, '--form', `dir=${paths.destination}`, '--write-out', '\n%{http_code}', `${api}/execute/Fileman/upload_files`], { maxBuffer: 8 * 1024 * 1024 });
      stdout = result.stdout;
    } catch (error) {
      const code = Number((error as { code?: number }).code);
      throw new DeploymentError(code === 60 ? 'cPanel TLS certificate verification failed' : `cPanel upload transport failed${Number.isFinite(code) ? ` (${code})` : ''}`);
    }
    const split = stdout.lastIndexOf('\n');
    return parseApiResponse(stdout.slice(0, split), Number(stdout.slice(split + 1)));
  };
  const extract = async () => {
    // API2 resolves a relative destfiles from the source directory. The leading
    // slash is cPanel's account-root notation and avoids DOMAIN/DOMAIN nesting.
    const query = extractionQuery(CPANEL_USER, paths.archive, paths.destination);
    const response = await fetch(`${api}/json-api/cpanel?${query}`, { headers: { Authorization: authorization }, redirect: 'error', signal: AbortSignal.timeout(120_000) });
    return parseApiResponse(await response.text(), response.status);
  };
  const assets = await deployWithTransport({
    upload,
    preflight: async () => waitForCdnRelease(GITHUB_SHA, await readFile('deploy/fr/applications/index.html', 'utf8'), { log: console.log }),
    extract,
    verify: () => waitForRelease(GITHUB_SHA, { log: console.log }),
  });
  console.log(`Primary domain verified at ${GITHUB_SHA}; ${assets} referenced assets available. Archive retained; no server files purged.`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error instanceof DeploymentError ? error.message : 'Deployment failed unexpectedly; no success asserted'); process.exitCode = 1; });
}
