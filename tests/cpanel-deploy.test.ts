import test from 'node:test';
import assert from 'node:assert/strict';
import { DeploymentError, catalogDigest, DOMAIN, ORIGIN, CDN, deploymentPaths, assertDeploymentPath, extractionQuery, parseApiResponse, validateUpload, validateExtraction, referencedAssets, verifyReleaseOnce, waitForRelease, deployWithTransport, type Fetcher } from '../scripts/deploy-cpanel';

const sha = 'a'.repeat(40);
const uploaded = { status: 1, errors: null, data: { failed: 0, succeeded: 1, uploads: [{ status: 1 }] } };
const extracted = { cpanelresult: { event: { result: 1 }, data: [{ result: 1, output: './index.html\n./media/error.png\n' }] } };
const html = `<html><head><link rel="stylesheet" href="${CDN}/_next/static/a.css"><script src="${CDN}/_next/static/b.js"></script></head><body><div class="content-page applications-page"><a href="/fr/applications/file-converter">a</a><a href="/fr/applications/meme-generator">b</a><a href="/fr/applications/readme-generator">c</a></div></body></html>`;
function responder(options: { marker?: unknown; html?: string; pageStatus?: number; assetStatus?: number; assetMime?: string } = {}): Fetcher {
  return async (url, init) => {
    assert.equal(init?.redirect, 'error');
    if (url.includes('/deployment.json')) return Response.json(options.marker ?? { commit: sha, application: 'cherif-portfolio', catalogSha256: catalogDigest(html) });
    if (url.includes('/fr/applications/')) return new Response(options.html ?? html, { status: options.pageStatus ?? 200, headers: { 'content-type': 'text/html' } });
    assert.equal(init?.method, 'HEAD');
    assert.ok(url.startsWith(CDN));
    return new Response(null, { status: options.assetStatus ?? 200, headers: { 'content-type': options.assetMime ?? (url.endsWith('.css') ? 'text/css' : url.endsWith('.js') ? 'application/javascript' : 'image/webp') } });
  };
}

test('cPanel deployment paths are account-relative and unique to the attempt', () => {
  const paths = deploymentPaths(sha, '123', '1');
  assert.equal(paths.archive, `${DOMAIN}/site-${sha}-123-1.tar.gz`);
  assert.equal(paths.destination, DOMAIN);
  assert.notEqual(deploymentPaths(sha, '123', '2').archive, paths.archive);
  assertDeploymentPath(paths.archive, true);
  assertDeploymentPath(paths.destination, false);
  for (const bad of ['/home/user/site.tar.gz', '../site.tar.gz', `${DOMAIN}/../file`, `${DOMAIN}/%2e%2e/file`, `${DOMAIN}/site.tar.gz`, 'another-domain.example/file']) assert.throws(() => assertDeploymentPath(bad, true), DeploymentError);
  for (const bad of ['../' + DOMAIN, DOMAIN + '/', '/home/user/' + DOMAIN, 'another-domain.example']) assert.throws(() => assertDeploymentPath(bad, false), DeploymentError);
  assert.throws(() => deploymentPaths('wrong', '123', '1'), DeploymentError);
  assert.throws(() => deploymentPaths(sha, '1;pwd', '1'), DeploymentError);
});

test('archive extraction stays in the upload directory instead of nesting the domain', () => {
  const archive = deploymentPaths(sha, '123', '1').archive;
  const query = extractionQuery('account', archive);
  assert.equal(query.get('op'), 'extract');
  assert.equal(query.get('sourcefiles'), archive);
  assert.equal(query.has('destfiles'), false);
  assert.throws(() => extractionQuery('', archive), DeploymentError);
  assert.throws(() => extractionQuery('account', `${DOMAIN}/site.tar.gz`), DeploymentError);
});

test('HTTP errors and non-JSON cPanel responses cannot become a successful deployment', () => {
  assert.deepEqual(parseApiResponse('{"status":1}', 200), { status: 1 });
  for (const status of [0, 301, 401, 403, 500, Number.NaN]) assert.throws(() => parseApiResponse('{"status":1}', status), DeploymentError);
  assert.throws(() => parseApiResponse('<html>upstream failed</html>', 200), /invalid JSON/);
});

test('upload must explicitly confirm one successful file with no API errors', () => {
  validateUpload(uploaded);
  for (const payload of [null, {}, { ...uploaded, status: 0 }, { ...uploaded, errors: ['synthetic failure'] }, { ...uploaded, data: { ...uploaded.data, failed: 1 } }, { ...uploaded, data: { ...uploaded.data, succeeded: 0 } }, { ...uploaded, data: { ...uploaded.data, uploads: [] } }, { ...uploaded, data: { ...uploaded.data, uploads: [{ status: 0 }] } }]) assert.throws(() => validateUpload(payload), DeploymentError);
});

test('extraction rejects the observed false-green tar output despite result=1', () => {
  validateExtraction(extracted);
  for (const output of [
    'tar (child): /synthetic/account/wrong/archive.tar.gz : open impossible: No such file or directory\ntar (child): Error is not recoverable: exiting now\n/bin/gtar: Child returned status 2',
    'tar: file: Cannot open: Permission denied',
    'gzip: input: unexpected error',
    'Error is not recoverable: exiting now',
  ]) {
    const payload = { cpanelresult: { event: { result: 1 }, data: [{ result: 1, output }] } };
    assert.throws(() => validateExtraction(payload), error => error instanceof DeploymentError && !error.message.includes('/synthetic/account'));
  }
});

test('extraction also rejects API2 envelope and row failures', () => {
  for (const payload of [{}, { cpanelresult: { event: { result: 0 }, data: [{ result: 1 }] } }, { cpanelresult: { event: { result: 1 }, data: [] } }, { cpanelresult: { event: { result: 1 }, data: [{ result: 0 }] } }, { cpanelresult: { event: { result: 1 }, data: [{ result: 1, err: 'synthetic failure' }] } }, { cpanelresult: { event: { result: 1 }, errors: ['failure'], data: [{ result: 1 }] } }]) assert.throws(() => validateExtraction(payload), DeploymentError);
});

test('post-publication gate identifies the exact release, new catalog and real assets', async () => {
  assert.equal(await verifyReleaseOnce(sha, responder()), 3);
  for (const options of [{ marker: { commit: 'b'.repeat(40), application: 'cherif-portfolio' } }, { marker: {} }, { html: '<html>Old site</html>' }, { html: html.replace('>a</a>', '>stale release</a>') }, { pageStatus: 404 }, { assetStatus: 404 }, { assetMime: 'text/html' }]) await assert.rejects(verifyReleaseOnce(sha, responder(options)));
  assert.throws(() => referencedAssets(html.replace(`${CDN}/_next/static/a.css`, 'https://unexpected.example/_next/static/a.css')), /Unexpected/);
  assert.throws(() => referencedAssets(html.replace('a.css', 'a.png')), /CSS\/JS/);
});

test('a transient CDN mismatch can recover, but stale content cannot yield a green result', async () => {
  let markers = 0; let sleeps = 0;
  const good = responder();
  const transient: Fetcher = async (url, init) => {
    if (url.includes('/deployment.json') && ++markers < 2) return Response.json({ commit: 'old', application: 'cherif-portfolio' });
    return good(url, init);
  };
  assert.equal(await waitForRelease(sha, { attempts: 3, fetcher: transient, sleep: async () => { sleeps++; } }), 3);
  assert.equal(sleeps, 1);
  await assert.rejects(waitForRelease(sha, { attempts: 2, fetcher: responder({ html: 'old' }), sleep: async () => {} }), /did not converge/);
});

test('failed upload/extraction stops before public success checks; no cleanup API is called', async () => {
  const calls: string[] = [];
  await assert.rejects(deployWithTransport({ upload: async () => { calls.push('upload'); return { status: 0 }; }, extract: async () => { calls.push('extract'); return extracted; }, verify: async () => { calls.push('verify'); return 3; } }));
  assert.deepEqual(calls, ['upload']);
  calls.length = 0;
  await assert.rejects(deployWithTransport({ upload: async () => { calls.push('upload'); return uploaded; }, extract: async () => { calls.push('extract'); return {}; }, verify: async () => { calls.push('verify'); return 3; } }));
  assert.deepEqual(calls, ['upload', 'extract']);
  calls.length = 0;
  assert.equal(await deployWithTransport({ upload: async () => { calls.push('upload'); return uploaded; }, extract: async () => { calls.push('extract'); return extracted; }, verify: async () => { calls.push('verify'); return 3; } }), 3);
  assert.deepEqual(calls, ['upload', 'extract', 'verify']);
});
