import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:4178';
const output = `${process.cwd()}/artifacts`;
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
const report = { checks: {}, consoleErrors: [] };
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
const page = await context.newPage();
page.on('console', (message) => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
page.on('pageerror', (error) => report.consoleErrors.push(error.message));

await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${output}/home-desktop.png`, fullPage: false });
report.checks.portrait = await page.locator('.portrait-surface img').evaluate((img) => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight, fit: getComputedStyle(img).objectFit }));

await page.getByRole('button', { name: 'Interroger Cherif' }).click();
await page.waitForTimeout(400);
const chatBox = await page.locator('.chat-panel').boundingBox();
report.checks.chatDesktop = chatBox;
await page.locator('.chat-form input').fill('Parle-moi d’Atlas et des bots Telegram');
await page.locator('.chat-form').evaluate((form) => form.requestSubmit());
await page.waitForTimeout(250);
report.checks.chatAnswer = await page.locator('.chat-messages').innerText();
report.checks.chatSources = await page.locator('.chat-sources a').count();
await page.screenshot({ path: `${output}/chat-desktop.png`, fullPage: false });
await page.getByRole('button', { name: 'Fermer le chat' }).click();

await page.locator('.lab-section').scrollIntoViewIfNeeded();
await page.getByRole('button', { name: 'Explorer la scène 3D' }).click();
await page.getByRole('button', { name: 'Plein écran' }).click();
await page.waitForTimeout(500);
report.checks.labExpanded = await page.locator('.lab-3d-scene').evaluate((scene) => ({ cssExpanded: scene.classList.contains('is-expanded'), nativeFullscreen: document.fullscreenElement === scene, transform: getComputedStyle(scene.querySelector('.lab-3d-object')).transform }));
await page.screenshot({ path: `${output}/lab-fullscreen.png`, fullPage: false });
await page.keyboard.press('Escape');

await page.goto(`${base}/fr/gallery`, { waitUntil: 'networkidle' });
report.checks.galleryCount = await page.locator('.gallery-item').count();
report.checks.galleryImage = await page.locator('.gallery-item img').first().evaluate((img) => ({ width: img.naturalWidth, height: img.naturalHeight, renderedHeight: img.getBoundingClientRect().height }));
await page.screenshot({ path: `${output}/gallery-desktop.png`, fullPage: false });
await page.locator('.gallery-image-button').first().click();
report.checks.lightbox = await page.locator('.gallery-lightbox').isVisible();
await page.screenshot({ path: `${output}/gallery-lightbox.png`, fullPage: false });
await page.getByRole('button', { name: 'Fermer la photo' }).click();

await page.goto(`${base}/fr/projects`, { waitUntil: 'networkidle' });
report.checks.projectCount = await page.locator('.project-card').count();
await page.getByRole('heading', { name: 'Murabbi Landing' }).scrollIntoViewIfNeeded();
report.checks.murabbiGif = await page.getByRole('heading', { name: 'Murabbi Landing' }).locator('xpath=ancestor::article').locator('img').evaluate((img) => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight }));
await page.screenshot({ path: `${output}/projects-demos.png`, fullPage: false });

const routes = ['/fr', '/en', '/zh', '/ja', '/fr/projects', '/fr/gallery', '/fr/tools', '/fr/tools/image-converter', '/fr/tools/meme-generator', '/fr/tools/readme-generator', '/fr/students', '/robots.txt', '/sitemap.xml'];
report.checks.routes = [];
for (const route of routes) {
  const response = await page.request.get(`${base}${route}`);
  report.checks.routes.push({ route, status: response.status() });
}

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const mobilePage = await mobile.newPage();
mobilePage.on('console', (message) => { if (message.type() === 'error') report.consoleErrors.push(`mobile: ${message.text()}`); });
await mobilePage.goto(`${base}/fr`, { waitUntil: 'networkidle' });
await mobilePage.screenshot({ path: `${output}/home-mobile.png`, fullPage: false });
await mobilePage.getByRole('button', { name: 'Interroger Cherif' }).click();
report.checks.chatMobile = await mobilePage.locator('.chat-panel').boundingBox();
await mobilePage.screenshot({ path: `${output}/chat-mobile.png`, fullPage: false });
await mobilePage.goto(`${base}/fr/gallery`, { waitUntil: 'networkidle' });
report.checks.mobileOverflow = await mobilePage.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
report.checks.mobileGalleryColumns = await mobilePage.locator('.gallery-grid').evaluate((grid) => getComputedStyle(grid).columnCount);
await mobilePage.screenshot({ path: `${output}/gallery-mobile.png`, fullPage: false });

await mobile.close();
await context.close();
await browser.close();
process.stdout.write(JSON.stringify(report, null, 2));
