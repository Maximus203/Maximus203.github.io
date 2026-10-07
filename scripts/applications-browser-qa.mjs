/**
 * Real-browser acceptance checks. Start a freshly built static export at QA_BASE_URL,
 * then run: node scripts/applications-browser-qa.mjs
 * Screenshots, downloaded files and the observed report stay under ignored artifacts/.
 * No application methods or mocked successful exports are called by the test.
 */
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { deflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { chromium, expect } from '@playwright/test';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';

const base = process.env.PORTFOLIO_BASE_URL || process.env.QA_BASE_URL || 'http://localhost:4178';
const output = path.resolve(process.env.QA_OUTPUT || 'artifacts/applications');
const only = process.env.QA_ONLY?.split(',');
await mkdir(output, { recursive: true });
const report = { testedAt: new Date().toISOString(), base, checks: [], pageErrors: [], externalRequests: [], mutationRequests: [] };
const isSelected = name => !only || only.some(part => name.includes(part));
const external = url => /^https?:/.test(url) && new URL(url).origin !== new URL(base).origin;

// The Clipboard API normalizes line endings to the host platform (CRLF on Windows).
// Compare content semantics while keeping the generated/downloaded source strict.
function normalizeClipboardText(value) {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}), args: ['--no-sandbox'] });
} catch (error) {
  report.blocked = { stage: 'browser-launch', error: error.message };
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  console.error(`BLOCKED browser launch: ${error.message}`);
  process.exit(1);
}
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
context.on('request', request => {
  const observed = { url: request.url(), method: request.method() };
  if (external(request.url())) report.externalRequests.push(observed);
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method())) report.mutationRequests.push(observed);
});
const page = await context.newPage();
page.on('pageerror', error => report.pageErrors.push({ url: page.url(), message: error.message }));
page.setDefaultTimeout(10_000);

async function check(name, run) {
  if (!isSelected(name)) return;
  const started = Date.now();
  try {
    const observed = await run();
    report.checks.push({ name, verdict: 'pass', durationMs: Date.now() - started, observed });
    console.log(`PASS ${name}`);
  } catch (error) {
    const screenshot = path.join(output, `failure-${name.replace(/[^a-z0-9]+/gi, '-')}.png`);
    await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
    report.checks.push({ name, verdict: 'fail', durationMs: Date.now() - started, error: error.stack || String(error), screenshot });
    console.error(`FAIL ${name}: ${error.message}`);
  }
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
}
async function go(route) {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, `${route} HTTP status`);
  await expect(page.locator('h1').first()).toBeVisible();
}
async function shot(name) {
  const file = path.join(output, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  return file;
}
async function download(button, expectedName) {
  const event = page.waitForEvent('download');
  await button.click();
  const item = await event;
  assert.equal(await item.failure(), null);
  const name = item.suggestedFilename();
  if (expectedName) assert.match(name, expectedName);
  const file = path.join(output, `${Date.now()}-${name}`);
  await item.saveAs(file);
  return { bytes: await readFile(file), name, file };
}
function signature(bytes, format) {
  if (format === 'png') assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  if (format === 'jpeg') assert.deepEqual([...bytes.subarray(0, 3)], [255, 216, 255]);
  if (format === 'webp') { assert.equal(bytes.toString('ascii', 0, 4), 'RIFF'); assert.equal(bytes.toString('ascii', 8, 12), 'WEBP'); }
  if (format === 'pdf') assert.equal(bytes.toString('ascii', 0, 5), '%PDF-');
  if (format === 'zip') assert.equal(bytes.toString('hex', 0, 4), '504b0304');
}
function crc32(bytes) {
  let crc = -1;
  for (const byte of bytes) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  return (crc ^ -1) >>> 0;
}
function pngFixture(width, height, alternate = false) {
  const chunk = (name, data) => { const type = Buffer.from(name); const size = Buffer.alloc(4); size.writeUInt32BE(data.length); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([type, data]))); return Buffer.concat([size, type, data, crc]); };
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) { const i = y * (width * 4 + 1) + 1 + x * 4; raw[i] = alternate ? 30 : x % 256; raw[i + 1] = y % 256; raw[i + 2] = alternate ? x % 256 : 150; raw[i + 3] = 255; }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
const imageA = { name: 'sample.png', mimeType: 'image/png', buffer: pngFixture(640, 360) };
const imageB = { name: 'sample.png', mimeType: 'image/png', buffer: pngFixture(320, 240, true) };
const invalidImage = { name: 'not-really.png', mimeType: 'image/png', buffer: Buffer.from('not a real PNG') };

try {
  await check('hub-search-categories-empty-reset', async () => {
    await go('/en/applications');
    await expect(page.locator('.application-card')).toHaveCount(4);
    await page.getByRole('searchbox', { name: 'Search applications' }).fill('PDF');
    await expect(page.locator('.application-card')).toHaveCount(1);
    await expect(page.locator('.application-card h2')).toHaveText('File Converter');
    await page.getByRole('searchbox').fill('');
    for (const [category, expected] of [['Files & data', 'File Converter'], ['Creative', 'Meme Studio'], ['Development', 'README Studio'], ['Games', 'TicTacToe']]) {
      await page.getByRole('button', { name: category, exact: true }).click();
      await expect(page.locator('.application-card')).toHaveCount(1);
      await expect(page.locator('.application-card h2')).toHaveText(expected);
    }
    await page.getByRole('searchbox').fill('unfindable-qa-9876');
    await expect(page.locator('.application-card')).toHaveCount(0);
    await expect(page.getByText('No applications match this search.', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
    await expect(page.locator('.application-card')).toHaveCount(4);
    await expect(page.getByRole('searchbox')).toHaveValue('');
    return { screenshot: await shot('applications-hub-desktop') };
  });

  await check('all-language-application-and-legacy-routes', async () => {
    const results = [];
    for (const locale of ['fr', 'en', 'zh', 'ja']) {
      for (const suffix of ['/applications', '/applications/file-converter', '/applications/meme-generator', '/applications/readme-generator', '/applications/tic-tac-toe', '/tools', '/tools/image-converter', '/tools/meme-generator', '/tools/readme-generator', '/tools/tic-tac-toe']) {
        await go(`/${locale}${suffix}`);
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        const title = await page.locator('h1').first().innerText();
        assert.ok(title.trim());
        if (suffix.includes('-generator') || suffix.includes('-converter')) await expect(page.locator('.application-workspace')).toBeVisible();
        results.push({ route: `/${locale}${suffix}`, title, canonical: await page.locator('link[rel=canonical]').getAttribute('href') });
      }
    }
    return results;
  });

  // The complete application workflows follow below and use only real, visible controls.
  await check('image-real-exports-zip-pdf-signatures-and-stale-state', async () => {
    await go('/en/applications/file-converter');
    const upload = page.locator('input[type=file][multiple]');
    const links = page.locator('a[download]');
    const convert = page.getByRole('button', { name: 'Convert files', exact: true });
    await upload.setInputFiles([imageA, imageB]);
    await expect(links).toHaveCount(2);
    await expect(convert).toBeEnabled();
    const webp = await download(links.first(), /^sample\.webp$/);
    signature(webp.bytes, 'webp');
    const zip = await download(page.getByRole('button', { name: 'Download ZIP', exact: true }), /\.zip$/);
    signature(zip.bytes, 'zip');
    const archive = await JSZip.loadAsync(zip.bytes);
    assert.deepEqual(Object.keys(archive.files).sort(), ['sample-2.webp', 'sample.webp']);
    for (const file of Object.values(archive.files)) signature(await file.async('nodebuffer'), 'webp');
    const exported = [{ format: 'webp', size: webp.bytes.length }, { format: 'zip', files: Object.keys(archive.files) }];
    for (const [format, label, extension] of [['jpeg', /^JPEG/, 'jpg'], ['png', /^PNG/, 'png'], ['pdf', /^PDF/, 'pdf']]) {
      await page.getByRole('button', { name: label }).click();
      await expect(links).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Download ZIP', exact: true })).toBeDisabled();
      await convert.click();
      await expect(links).toHaveCount(2);
      await expect(convert).toBeEnabled();
      const result = await download(links.first(), new RegExp(`^sample\\.${extension}$`));
      signature(result.bytes, format);
      if (format === 'png') { assert.equal(result.bytes.readUInt32BE(16), 640); assert.equal(result.bytes.readUInt32BE(20), 360); }
      if (format === 'pdf') {
        const pdf = await PDFDocument.load(result.bytes);
        assert.equal(pdf.getPageCount(), 1);
        assert.equal(pdf.getPage(0).getWidth(), 480);
        assert.equal(pdf.getPage(0).getHeight(), 270);
      }
      exported.push({ format, size: result.bytes.length });
    }
    await page.getByRole('button', { name: /^JPEG/ }).click();
    await convert.click();
    await expect(links).toHaveCount(2);
    await expect(convert).toBeEnabled();
    await page.locator('#conversion-quality').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(links).toHaveCount(0);
    await convert.click();
    await expect(links).toHaveCount(2);
    await expect(convert).toBeEnabled();
    await upload.setInputFiles(imageA);
    await expect(links).toHaveCount(3);
    assert.deepEqual((await links.evaluateAll(nodes => nodes.map(node => node.download))).sort(), ['sample-2.jpg', 'sample-3.jpg', 'sample.jpg']);
    await expect(convert).toBeEnabled();
    await upload.setInputFiles(invalidImage);
    await expect(page.getByText('Unsupported file. Choose a genuine PNG, JPEG, WebP, GIF or BMP image.', { exact: true })).toBeVisible();
    await expect(links).toHaveCount(3);
    await expect(convert).toBeEnabled();
    const screenshot = await shot('file-converter-batch-results');
    await page.getByRole('button', { name: 'Reset all', exact: true }).first().click();
    await expect(links).toHaveCount(0);
    await expect(convert).toBeDisabled();
    await upload.setInputFiles(imageB);
    await expect(links).toHaveCount(1);
    await expect(convert).toBeEnabled();
    signature((await download(links.first(), /\.webp$/)).bytes, 'webp');
    return { exported, screenshot, repeatedUploads: 'unique names; invalid input preserved prior valid results; reset recovered' };
  });

  await check('image-batch-limit-and-corrupt-file-recovery', async () => {
    await go('/en/applications/file-converter');
    const upload = page.locator('input[type=file][multiple]');
    await upload.setInputFiles(Array.from({ length: 21 }, (_, index) => ({ ...imageA, name: `image-${index}.png` })));
    await expect(page.locator('.application-workspace').getByRole('alert')).toContainText('20 images');
    await expect(page.locator('a[download]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Reset all', exact: true }).first().click();
    await upload.setInputFiles({ name: 'damaged.png', mimeType: 'image/png', buffer: imageA.buffer.subarray(0, 40) });
    await expect(page.getByText('This image could not be read. It may be damaged or unsupported by this browser.', { exact: true })).toBeVisible();
    await expect(page.locator('a[download]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Reset all', exact: true }).first().click();
    await upload.setInputFiles(imageA);
    await expect(page.locator('a[download]')).toHaveCount(1);
  });

  await check('image-aggregate-100MiB-limit-before-processing-and-recovery', async () => {
    await go('/en/applications/file-converter');
    const paddedPng = Buffer.alloc(26 * 1024 * 1024);
    imageA.buffer.copy(paddedPng);
    const upload = page.locator('#conversion-files');
    // Playwright caps combined in-memory payloads at 50 MB; real filesystem inputs
    // exercise the application's 100 MiB limit without weakening the test.
    const fixtureDir = await mkdtemp(path.join(tmpdir(), 'portfolio-qa-'));
    try {
      const filePaths = Array.from({ length: 4 }, (_, index) => path.join(fixtureDir, `large-${index}.png`));
      await Promise.all(filePaths.map(file => writeFile(file, paddedPng)));
      await upload.setInputFiles(filePaths, { timeout: 60_000 });
    } finally { await rm(fixtureDir, { recursive: true, force: true }); }
    await expect(page.locator('.application-workspace').getByRole('alert')).toContainText('This batch exceeds 100 MB');
    await expect(page.locator('a[download]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Convert files', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: 'Reset all', exact: true }).first().click();
    await upload.setInputFiles(imageA);
    await expect(page.locator('a[download]')).toHaveCount(1);
    return { individuallyValidBytes: paddedPng.length, selectedTotalBytes: paddedPng.length * 4, actualConversionAfterReset: true };
  });

  await check('data-csv-json-download-error-and-option-invalidation', async () => {
    await go('/en/applications/file-converter');
    await page.getByRole('button', { name: 'CSV & JSON', exact: true }).click();
    const source = page.locator('#conversion-source');
    const result = page.locator('#conversion-result');
    const convert = page.getByRole('button', { name: 'Convert data', exact: true });
    const save = page.getByRole('button', { name: 'Download', exact: true });
    const expected = [{ name: 'Zoë', note: 'hello, 世界' }];
    await source.fill('name,note\nZoë,"hello, 世界"');
    await convert.click();
    assert.deepEqual(JSON.parse(await result.inputValue()), expected);
    const json = await download(save, /^converted\.json$/);
    assert.deepEqual(JSON.parse(json.bytes.toString()), expected);
    await source.fill('a,b\n"broken');
    await expect(result).toHaveValue('');
    await expect(save).toBeDisabled();
    await convert.click();
    await expect(page.locator('.application-workspace').getByRole('alert')).toContainText('Invalid CSV quoting');
    await source.fill('[{"name":"=1+1","city":"東京"}]');
    await page.locator('#data-operation').selectOption('json-csv');
    await expect(save).toBeDisabled();
    await convert.click();
    assert.ok((await result.inputValue()).includes("'=1+1"));
    const csv = await download(save, /^converted\.csv$/);
    assert.equal(csv.bytes.toString('hex', 0, 3), 'efbbbf');
    assert.ok(csv.bytes.toString().includes("'=1+1"));
    await page.getByRole('checkbox', { name: 'Protect spreadsheet formulas', exact: true }).uncheck();
    await expect(result).toHaveValue('');
    await expect(save).toBeDisabled();
    await convert.click();
    assert.match(await result.inputValue(), /\r?\n=1\+1,/);
    await page.locator('input[type=file]:not([multiple])').setInputFiles({ name: 'bad-utf8.csv', mimeType: 'text/csv', buffer: Buffer.from([0xc3, 0x28]) });
    await expect(page.locator('.application-workspace').getByRole('alert')).toContainText('not valid UTF-8');
    await expect(result).toHaveValue('');
    await expect(save).toBeDisabled();
    await page.locator('input[type=file]:not([multiple])').setInputFiles({ name: 'fresh.json', mimeType: 'application/json', buffer: Buffer.from('[{"fresh":true}]') });
    await expect(source).toHaveValue('[{"fresh":true}]');
    await convert.click();
    await expect(result).toHaveValue(/^fresh\r?\ntrue$/);
    return { screenshot: await shot('file-converter-data-results'), downloadedJsonBytes: json.bytes.length, downloadedCsvBytes: csv.bytes.length };
  });
  await check('meme-upload-caption-options-real-png-reset-recovery', async () => {
    await go('/en/applications/meme-generator');
    const upload = page.locator('#meme-file');
    const canvas = page.locator('#meme-canvas');
    const save = page.getByRole('button', { name: 'Export PNG', exact: true });
    const baseline = await download(save, /^meme\.png$/);
    signature(baseline.bytes, 'png');
    assert.equal(baseline.bytes.readUInt32BE(16), 1200);
    assert.equal(baseline.bytes.readUInt32BE(20), 800);
    await upload.setInputFiles(imageA);
    await expect(canvas).toHaveAttribute('width', '640');
    await expect(canvas).toHaveAttribute('height', '360');
    await page.locator('#meme-top').fill('A real exported caption');
    await page.locator('#meme-bottom').fill('東京 · 世界 · Bonjour');
    await page.locator('#meme-font').selectOption('sans');
    await page.getByRole('checkbox', { name: 'UPPERCASE captions', exact: true }).uncheck();
    await page.locator('#meme-font-size').focus();
    await page.keyboard.press('ArrowRight');
    const edited = await download(save, /^meme\.png$/);
    signature(edited.bytes, 'png');
    assert.equal(edited.bytes.readUInt32BE(16), 640);
    assert.equal(edited.bytes.readUInt32BE(20), 360);
    assert.notEqual(createHash('sha256').update(edited.bytes).digest('hex'), createHash('sha256').update(imageA.buffer).digest('hex'));
    await page.locator('#meme-top').fill('Different caption');
    await expect(page.getByText('PNG download started', { exact: true })).toHaveCount(0);
    const changed = await download(save, /^meme\.png$/);
    assert.notEqual(createHash('sha256').update(changed.bytes).digest('hex'), createHash('sha256').update(edited.bytes).digest('hex'));
    await upload.setInputFiles(imageB);
    await expect(canvas).toHaveAttribute('width', '320');
    const second = await download(save, /^meme\.png$/);
    assert.equal(second.bytes.readUInt32BE(16), 320);
    assert.equal(second.bytes.readUInt32BE(20), 240);
    await upload.setInputFiles(invalidImage);
    await expect(page.locator('.application-workspace').getByRole('alert')).toContainText('Unsupported file');
    await expect(canvas).toHaveAttribute('width', '320');
    await upload.setInputFiles(imageA);
    await expect(canvas).toHaveAttribute('width', '640');
    await expect(page.locator('.application-workspace').getByRole('alert')).toHaveCount(0);
    const screenshot = await shot('meme-custom-caption-desktop');
    await page.getByRole('button', { name: 'Reset composition', exact: true }).click();
    await expect(canvas).toHaveAttribute('width', '1200');
    await expect(page.locator('#meme-top')).toHaveValue('ONE SMALL IDEA');
    return { screenshot, baselineBytes: baseline.bytes.length, editedBytes: edited.bytes.length, secondUploadDimensions: [320, 240] };
  });

  await check('readme-safe-generation-skills-clipboard-markdown-workflow-download', async () => {
    const requestsBefore = report.externalRequests.length;
    await go('/en/applications/readme-generator');
    const username = page.getByRole('textbox', { name: 'GitHub username', exact: true });
    const saveMarkdown = page.getByRole('button', { name: 'Download README.md', exact: true });
    await username.fill('octocat');
    await page.getByRole('textbox', { name: /^Heading/ }).fill('<img src=x onerror="window.__qaInjected=1">');
    await page.getByRole('textbox', { name: /^About you/ }).fill('Building useful tools.\n[unsafe](javascript:alert(1))');
    await page.getByRole('textbox', { name: /^Portfolio/ }).fill('javascript:alert(1)');
    await expect(saveMarkdown).toBeDisabled();
    await expect(page.getByText('Enter a public HTTPS URL without a password, local address or script.', { exact: true })).toBeVisible();
    await page.getByRole('textbox', { name: /^Portfolio/ }).fill('https://example.com/portfolio');
    await expect(saveMarkdown).toBeEnabled();
    await page.getByRole('button', { name: 'Skills', exact: true }).click();
    await page.getByRole('button', { name: 'React', exact: true }).click();
    await page.getByRole('button', { name: 'TypeScript', exact: true }).click();
    await page.getByRole('button', { name: 'Style & widgets', exact: true }).click();
    await page.getByRole('checkbox', { name: /^Profile statistics/ }).check();
    await page.getByRole('checkbox', { name: /^Contribution snake/ }).check();
    assert.equal(await page.evaluate(() => window.__qaInjected), undefined);
    assert.equal(report.externalRequests.length, requestsBefore, 'no third-party requests before explicit opt-in');
    await expect(page.locator('[data-testid="readme-preview"] img')).toHaveCount(0);
    await page.getByRole('button', { name: 'Markdown', exact: true }).click();
    const source = page.getByRole('textbox', { name: 'Markdown', exact: true });
    const text = await source.inputValue();
    assert.ok(text.includes('&lt;img'));
    assert.ok(!text.includes('<img src=x'));
    assert.ok(!text.includes('href="javascript:'));
    assert.ok(text.includes('https://img.shields.io/'));
    assert.ok(text.includes('/octocat/octocat/snake-output/'));
    const markdown = await download(saveMarkdown, /^README\.md$/);
    assert.equal(markdown.bytes.toString(), text);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByRole('button', { name: 'Copy source', exact: true }).click();
    await expect(page.getByRole('status', { name: 'Export status', exact: true })).toContainText('Copied to clipboard');
    assert.equal(normalizeClipboardText(await page.evaluate(() => navigator.clipboard.readText())), text);
    await page.getByRole('button', { name: 'Snake workflow', exact: true }).click();
    const workflow = await page.getByRole('textbox', { name: 'Snake workflow', exact: true }).inputValue();
    assert.ok(workflow.includes('github_user_name: "octocat"'));
    assert.ok(workflow.includes('target_branch: snake-output'));
    assert.ok(workflow.includes('${{ secrets.GITHUB_TOKEN }}'));
    assert.ok(!/target_branch:\s*(main|master)/.test(workflow));
    const yaml = await download(page.getByRole('button', { name: 'Download snake.yml', exact: true }), /^snake\.yml$/);
    assert.equal(yaml.bytes.toString(), workflow);
    await username.fill('not valid!');
    await expect(page.getByRole('button', { name: 'Download snake.yml', exact: true })).toBeDisabled();
    await username.fill('octocat2');
    await expect(page.getByRole('textbox', { name: 'Snake workflow', exact: true })).toHaveValue(/octocat2/);
    const refreshed = await download(page.getByRole('button', { name: 'Download snake.yml', exact: true }), /^snake\.yml$/);
    assert.ok(refreshed.bytes.toString().includes('github_user_name: "octocat2"'));
    assert.equal(report.externalRequests.length, requestsBefore);
    return { markdownBytes: markdown.bytes.length, workflowBytes: yaml.bytes.length, screenshot: await shot('readme-snake-workflow') };
  });

  await check('readme-external-preview-opt-in-and-new-URL-reapproval', async () => {
    // Intentional network failure injection exercises honest placeholders, not a mocked successful image.
    await context.route('https://**/*', route => route.abort('failed'));
    try {
      const start = report.externalRequests.length;
      await go('/en/applications/readme-generator');
      await page.getByRole('textbox', { name: 'GitHub username', exact: true }).fill('octocat');
      await page.getByRole('button', { name: 'Style & widgets', exact: true }).click();
      await page.getByRole('checkbox', { name: /^Profile statistics/ }).check();
      assert.equal(report.externalRequests.length, start);
      await expect(page.locator('[data-testid="readme-preview"] img')).toHaveCount(0);
      await page.getByRole('button', { name: 'Load external images', exact: true }).click();
      await page.locator('[data-testid="readme-preview"]').scrollIntoViewIfNeeded();
      await expect.poll(() => report.externalRequests.length).toBeGreaterThan(start);
      await expect(page.getByText('Image unavailable. Check the provider or try loading again.', { exact: true })).toBeVisible();
      assert.ok(report.externalRequests.slice(start).every(request => new URL(request.url).hostname === 'github-stats-extended.vercel.app'));
      const afterOptIn = report.externalRequests.length;
      await page.getByRole('textbox', { name: 'GitHub username', exact: true }).fill('octocat2');
      await expect(page.getByRole('button', { name: 'Load external images', exact: true })).toBeVisible();
      await expect(page.locator('[data-testid="readme-preview"] img')).toHaveCount(0);
      assert.equal(report.externalRequests.length, afterOptIn, 'changed URL needs a fresh explicit opt-in');
      await page.getByRole('button', { name: 'Load external images', exact: true }).click();
      await page.locator('[data-testid="readme-preview"]').scrollIntoViewIfNeeded();
      await expect.poll(() => report.externalRequests.length).toBeGreaterThan(afterOptIn);
      await page.getByRole('button', { name: 'Block external images', exact: true }).click();
      await expect(page.locator('[data-testid="readme-preview"] img')).toHaveCount(0);
      return { observedRequests: report.externalRequests.slice(start), networkFailureInjected: true, screenshot: await shot('readme-privacy-opt-in') };
    } finally { await context.unroute('https://**/*'); }
  });

  await check('readme-clipboard-failure-fallback-and-reset', async () => {
    await go('/en/applications/readme-generator');
    await page.getByRole('textbox', { name: /^Heading/ }).fill('Manual copy test');
    // Intentional permission failure injection only; successful copy is separately tested above.
    await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: async () => { throw new DOMException('Test permission denial', 'NotAllowedError'); } }); });
    await page.getByRole('button', { name: 'Copy source', exact: true }).click();
    const source = page.getByRole('textbox', { name: 'Markdown', exact: true });
    await expect(source).toBeVisible();
    await expect(page.getByRole('status', { name: 'Export status', exact: true })).toContainText('Clipboard unavailable');
    const selection = await source.evaluate(node => ({ start: node.selectionStart, end: node.selectionEnd, length: node.value.length, focused: document.activeElement === node }));
    assert.deepEqual(selection, { start: 0, end: selection.length, length: selection.length, focused: true });
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Start over', exact: true }).click();
    await expect(page.getByRole('textbox', { name: /^Heading/ })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'GitHub username', exact: true })).toHaveValue('');
    await expect(page.locator('[data-testid="readme-preview"]')).toContainText('Add a heading');
    return { selection, permissionFailureInjected: true };
  });

  await check('readme-delayed-clipboard-never-overwrites-newer-edits-reset-or-tab', async () => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const observed = [];
    for (const interruption of ['edit', 'reset', 'tab']) {
      await go('/en/applications/readme-generator');
      await page.getByRole('textbox', { name: /^Heading/ }).fill('Original content');
      await page.evaluate(() => {
        window.__qaOriginalClipboard = navigator.clipboard.writeText.bind(navigator.clipboard);
        Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: () => new Promise((resolve, reject) => { window.__qaClipboard = { resolve, reject }; }) });
      });
      await page.getByRole('button', { name: 'Copy source', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Copying…', exact: true })).toBeDisabled();
      if (interruption === 'edit') await page.getByRole('textbox', { name: /^Heading/ }).fill('Newer content');
      if (interruption === 'reset') {
        page.once('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'Start over', exact: true }).click();
      }
      if (interruption === 'tab') await page.getByRole('button', { name: 'Snake workflow', exact: true }).click();
      await page.evaluate(mode => {
        if (mode === 'edit') window.__qaClipboard.resolve();
        else window.__qaClipboard.reject(new DOMException('Delayed permission denial', 'NotAllowedError'));
      }, interruption);
      await expect(page.getByRole('status', { name: 'Export status', exact: true })).toHaveText('');
      await expect(page.getByRole('button', { name: interruption === 'tab' ? 'Snake workflow' : 'Preview', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: window.__qaOriginalClipboard }); });
      await page.getByRole('button', { name: 'Markdown', exact: true }).click();
      const current = await page.getByRole('textbox', { name: 'Markdown', exact: true }).inputValue();
      await page.getByRole('button', { name: 'Copy source', exact: true }).click();
      await expect(page.getByRole('status', { name: 'Export status', exact: true })).toContainText('Copied to clipboard');
      assert.equal(normalizeClipboardText(await page.evaluate(() => navigator.clipboard.readText())), current);
      observed.push({ interruption, staleStatus: false, staleNavigation: false, nextRealCopy: true });
    }
    return { delayedPromiseInjected: true, observed };
  });

  await check('responsive-three-apps-phone-tablet-desktop-and-locales', async () => {
    const observations = [];
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const app of ['file-converter', 'meme-generator', 'readme-generator', 'tic-tac-toe']) {
        for (const locale of width === 390 ? ['fr', 'en', 'zh', 'ja'] : ['en']) {
          await go(`/${locale}/applications/${app}`);
          const dimensions = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
          assert.ok(dimensions.scroll <= dimensions.client + 1, `${locale}/${app} at ${width}px overflows: ${JSON.stringify(dimensions)}`);
          const workspace = await page.locator('.application-workspace').boundingBox();
          assert.ok(workspace.width <= width, 'workbench fits viewport');
          if (width === 1440) assert.ok(workspace.width > 1000, 'desktop workspace uses the page width');
          const missingLabels = await page.locator('.application-workspace input, .application-workspace textarea, .application-workspace select').evaluateAll(nodes => nodes.filter(node => !node.labels?.length && !node.getAttribute('aria-label') && !node.getAttribute('aria-labelledby')).map(node => ({ tag: node.tagName, id: node.id, type: node.type })));
          assert.deepEqual(missingLabels, [], 'all application form controls have accessible names');
          const screenshot = await shot(`${locale}-${app}-${width}`);
          observations.push({ locale, app, width, dimensions, workspaceWidth: workspace.width, screenshot });
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await go('/en/applications');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
    await shot('applications-hub-phone');
    // The source view contains long real service URLs and must not widen the mobile page.
    await go('/en/applications/readme-generator');
    await page.getByRole('textbox', { name: 'GitHub username', exact: true }).fill('octocat');
    await page.getByRole('button', { name: 'Style & widgets', exact: true }).click();
    await page.getByRole('checkbox', { name: /^Contribution snake/ }).check();
    await page.getByRole('button', { name: 'Snake workflow', exact: true }).click();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1));
    await shot('readme-workflow-phone');
    await page.setViewportSize({ width: 1440, height: 1000 });
    return observations;
  });

  await check('no-uncaught-browser-errors-or-external-file-uploads', async () => {
    assert.deepEqual(report.pageErrors, []);
    assert.ok(report.externalRequests.every(request => request.method === 'GET'), 'no external upload or mutation requests');
    assert.deepEqual(report.mutationRequests, [], 'no same-origin or external file uploads or mutations');
    return { pageErrors: report.pageErrors, externalMethods: report.externalRequests.map(request => request.method) };
  });
} finally {
  report.summary = { passed: report.checks.filter(check => check.verdict === 'pass').length, failed: report.checks.filter(check => check.verdict === 'fail').length, total: report.checks.length };
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report.summary));
  console.log(`Evidence: ${path.join(output, 'report.json')}`);
  if (report.summary.failed) process.exitCode = 1;
}
