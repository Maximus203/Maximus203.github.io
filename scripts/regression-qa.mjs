import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'file:///C:/Users/diouf/.agents/skills/local-demo-video-recorder/node_modules/playwright/index.mjs';

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:4178';
const root = 'D:/01-Dev/Perso/Maximus203.github.io/prototype-next';
const shots = `${root}/.test-shots`;
const artifacts = `${root}/artifacts`;
mkdirSync(shots, { recursive: true });
mkdirSync(artifacts, { recursive: true });

const locales = ['fr', 'en', 'zh', 'ja'];
const tails = ['', '/projects', '/gallery', '/tools', '/tools/image-converter', '/tools/meme-generator', '/tools/readme-generator', '/students'];
const report = { startedAt: new Date().toISOString(), base, checks: {}, errors: [], networkFailures: [], timings: {} };
const browser = await chromium.launch({ headless: true });

function observe(page, scope) {
  page.on('console', (message) => {
    if (message.type() === 'error') report.errors.push(`${scope}: console: ${message.text()}`);
  });
  page.on('pageerror', (error) => report.errors.push(`${scope}: page: ${error.message}`));
  page.on('response', (response) => {
    if (response.status() >= 400 && !response.url().endsWith('/de')) report.networkFailures.push(`${scope}: ${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', (request) => report.networkFailures.push(`${scope}: FAILED ${request.url()} ${request.failure()?.errorText || ''}`));
}

function matrixDelta(first, second) {
  const values = (matrix) => (matrix.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi) || []).map(Number);
  const left = values(first);
  const right = values(second);
  if (left.length !== right.length) return Number.POSITIVE_INFINITY;
  return Math.max(0, ...left.map((value, index) => Math.abs(value - right[index])));
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await context.addInitScript(() => localStorage.setItem('cherif-portfolio-theme', 'dark'));
  const page = await context.newPage();
  observe(page, 'desktop');

  const routeResults = [];
  for (const locale of locales) {
    for (const tail of tails) {
      const response = await page.request.get(`${base}/${locale}${tail}`);
      routeResults.push({ route: `/${locale}${tail}`, status: response.status() });
    }
  }
  assert.equal(routeResults.length, 32);
  assert.deepEqual([...new Set(routeResults.map((item) => item.status))], [200]);
  const invalidLocale = await page.request.get(`${base}/de`);
  assert.equal(invalidLocale.status(), 404);
  const legacyFavicon = await page.request.get(`${base}/favicon.ico`);
  assert.equal(legacyFavicon.status(), 200);
  assert.match(legacyFavicon.headers()['content-type'] || '', /image\/(x-icon|vnd\.microsoft\.icon|webp)/);
  report.checks.routes = { total: routeResults.length, invalidLocale: invalidLocale.status(), legacyFavicon: legacyFavicon.status() };

  const seo = [];
  for (const locale of locales) {
    await page.goto(`${base}/${locale}`, { waitUntil: 'domcontentloaded' });
    seo.push({
      locale,
      lang: await page.locator('html').getAttribute('lang'),
      canonical: await page.locator('link[rel="canonical"]').count(),
      alternates: await page.locator('link[rel="alternate"][hreflang]').count(),
      portraitIcon: await page.locator('link[rel="icon"][href*="photo.webp"]').count(),
    });
  }
  for (const item of seo) {
    assert.equal(item.lang, item.locale);
    assert.equal(item.canonical, 1);
    assert.equal(item.alternates, 4);
    assert.ok(item.portraitIcon >= 1);
  }
  report.checks.seo = seo;

  const loadStart = performance.now();
  await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
  const loadMs = Math.round(performance.now() - loadStart);
  assert.ok(loadMs < 3000, `Accueil trop lent en local: ${loadMs} ms`);
  report.timings.homeNetworkIdleMs = loadMs;

  await page.locator('.dimensional-portrait[data-mode="immersive"]').waitFor();
  const portrait = await page.locator('.portrait-surface img').evaluate((img) => ({
    src: img.getAttribute('src'),
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    objectFit: getComputedStyle(img).objectFit,
  }));
  assert.ok(portrait.src?.includes('photo.webp'));
  assert.ok(portrait.naturalWidth > 0 && portrait.naturalHeight > 0);
  assert.equal(portrait.objectFit, 'contain');
  assert.equal(await page.locator('.wordmark-avatar').count(), 1);
  assert.equal(await page.locator('.wordmark-mark').count(), 0);
  report.checks.portrait = portrait;
  const dimensionButtons = page.locator('.dimension-switcher > div > button');
  assert.equal(await dimensionButtons.count(), 4);
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-dimension'), '1');
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-autoplay'), 'playing');
  const levitationBefore = await page.locator('.portrait-stack').evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(4000);
  const levitationAfter = await page.locator('.portrait-stack').evaluate((node) => getComputedStyle(node).transform);
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-dimension'), '2');
  assert.notEqual(levitationBefore, levitationAfter);
  await page.getByRole('button', { name: 'Suspendre la lecture automatique' }).click();
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-autoplay'), 'paused');
  await dimensionButtons.nth(0).click();
  await page.waitForTimeout(780);
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-dimension'), '1');
  const oneDimensionalClip = await page.locator('.portrait-surface').evaluate((node) => getComputedStyle(node).clipPath);
  assert.match(oneDimensionalClip, /circle/);
  await dimensionButtons.nth(2).click();
  await page.waitForTimeout(780);
  const motionBefore = await page.locator('.portrait-motion').evaluate((node) => getComputedStyle(node).transform);
  const stageBox = await page.locator('.dimension-stage').boundingBox();
  assert.ok(stageBox);
  await page.mouse.move(stageBox.x + stageBox.width * .8, stageBox.y + stageBox.height * .25);
  await page.waitForTimeout(580);
  const motionAfter = await page.locator('.portrait-motion').evaluate((node) => getComputedStyle(node).transform);
  assert.notEqual(motionBefore, motionAfter);
  await dimensionButtons.nth(3).click();
  await page.waitForTimeout(780);
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-dimension'), '4');
  const ghostOpacity = await page.locator('.temporal-ghost').first().evaluate((node) => Number.parseFloat(getComputedStyle(node).opacity));
  assert.ok(ghostOpacity > 0);
  await page.screenshot({ path: `${shots}/PW-1-home-desktop-4d-after.png`, fullPage: false });
  await dimensionButtons.nth(1).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.dimensional-portrait').getAttribute('data-dimension'), '3');
  assert.equal(await dimensionButtons.nth(2).evaluate((node) => document.activeElement === node), true);
  report.checks.dimensionalPortrait = { controls: 4, autoplay: true, levitation: levitationBefore !== levitationAfter, oneDimensionalClip, parallax: motionBefore !== motionAfter, ghostOpacity, keyboard: true };
  await page.screenshot({ path: `${shots}/PW-1-home-desktop-after.png`, fullPage: false });

  assert.equal(await page.locator('.ambient-flow').count(), 1);
  const themeButton = page.getByRole('button', { name: /Diffuser le mode clair/ });
  await themeButton.click();
  await page.waitForTimeout(260);
  const fluidRadius = Number(await page.locator('.theme-fluid-blob').first().getAttribute('r'));
  assert.ok(fluidRadius > 0);
  await page.waitForTimeout(1100);
  assert.equal(await page.locator('.site-root').getAttribute('data-theme'), 'light');
  await page.getByRole('button', { name: /Diffuser le mode sombre/ }).click();
  await page.waitForTimeout(1300);
  assert.equal(await page.locator('.site-root').getAttribute('data-theme'), 'dark');
  report.checks.themeTransition = { fluidRadius, lightApplied: true, darkRestored: true };

  await page.getByRole('button', { name: 'Interroger Cherif' }).click();
  await page.waitForTimeout(400);
  const chatBox = await page.locator('.chat-panel').boundingBox();
  assert.ok(chatBox && chatBox.width >= 620 && chatBox.height >= 620);
  assert.equal(await page.locator('.chat-brand-mark').count(), 0);
  assert.equal(await page.locator('.chat-identity > img[src$="/media/photo.webp"]').count(), 1);
  assert.equal(await page.locator('.chat-launcher').evaluate((node) => getComputedStyle(node).visibility), 'hidden');
  const initialMessageCount = await page.locator('.chat-message').count();
  await page.locator('.chat-form input').fill('   ');
  await page.locator('.chat-form').evaluate((form) => form.requestSubmit());
  assert.equal(await page.locator('.chat-message').count(), initialMessageCount);

  let dialogs = 0;
  page.on('dialog', async (dialog) => { dialogs += 1; await dialog.dismiss(); });
  await page.locator('.chat-form input').fill('<img src=x onerror=alert(1)>');
  await page.locator('.chat-form').evaluate((form) => form.requestSubmit());
  assert.equal(await page.locator('.chat-message.user img').count(), 0);
  assert.equal(dialogs, 0);

  for (const question of ['Skills', 'Atlas', 'bots Telegram']) {
    await page.locator('.chat-form input').fill(question);
    await page.locator('.chat-form').evaluate((form) => form.requestSubmit());
  }
  const chatText = await page.locator('.chat-messages').innerText();
  assert.match(chatText, /80|compétences IA/i);
  assert.match(chatText, /Atlas/i);
  assert.match(chatText, /Telegram/i);
  assert.ok(await page.locator('.chat-sources a').count() >= 4);
  report.checks.chat = { ...chatBox, sources: await page.locator('.chat-sources a').count(), dialogs };
  await page.screenshot({ path: `${shots}/PW-1-chat-desktop-after.png`, fullPage: false });
  await page.getByRole('button', { name: 'Fermer le chat' }).click();

  const launcher = page.getByRole('button', { name: 'Interroger Cherif' });
  await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
  let tabSteps = 0;
  let launcherReached = false;
  while (tabSteps < 80 && !launcherReached) {
    await page.keyboard.press('Tab');
    tabSteps += 1;
    launcherReached = await launcher.evaluate((node) => document.activeElement === node);
  }
  const focusStyle = await launcher.evaluate((node) => ({ tag: node.tagName, outline: getComputedStyle(node).outlineStyle }));
  assert.equal(launcherReached, true);
  assert.notEqual(focusStyle.outline, 'none');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  const beforeSuggestion = await page.locator('.chat-message').count();
  const pathSuggestion = page.getByRole('button', { name: 'Parcours' });
  await pathSuggestion.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.chat-message').count(), beforeSuggestion + 2);
  const closeChat = page.getByRole('button', { name: 'Fermer le chat' });
  await closeChat.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('.chat-panel').count(), 0);
  report.checks.keyboard = { launcherFocused: true, tabSteps, launcherTag: focusStyle.tag, outline: focusStyle.outline, suggestionActivated: true, closeActivated: true };

  await page.locator('.lab-section').scrollIntoViewIfNeeded();
  const cube = page.locator('.lab-3d-object');
  assert.equal(await page.locator('.lab-3d-face').count(), 6);
  assert.equal(await page.locator('.lab-orbit').count(), 3);
  assert.equal(await page.locator('.lab-satellite').count(), 6);
  assert.equal(await page.locator('.signal-line').count(), 3);
  const idleA = await cube.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(300);
  const idleB = await cube.evaluate((node) => getComputedStyle(node).transform);
  assert.equal(idleA, idleB);
  await page.getByRole('button', { name: /Explorer (la scène 3D|le système)/ }).click();
  const activeA = await cube.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(350);
  const activeB = await cube.evaluate((node) => getComputedStyle(node).transform);
  assert.notEqual(activeA, activeB);
  await page.getByRole('button', { name: 'Pause' }).click();
  await page.waitForTimeout(80);
  const pausedA = await cube.evaluate((node) => getComputedStyle(node).transform);
  await page.waitForTimeout(300);
  const pausedB = await cube.evaluate((node) => getComputedStyle(node).transform);
  assert.equal(pausedA, pausedB);
  await page.getByRole('button', { name: 'Plein écran' }).click();
  await page.waitForTimeout(250);
  const expanded = await page.locator('.lab-3d-scene').evaluate((node) => node.classList.contains('is-expanded') || document.fullscreenElement === node);
  assert.equal(expanded, true);
  await page.screenshot({ path: `${shots}/PW-1-lab-expanded-after.png`, fullPage: false });
  const usedNativeFullscreen = await page.evaluate(() => Boolean(document.fullscreenElement));
  if (usedNativeFullscreen) await page.getByRole('button', { name: 'Réduire' }).click();
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.lab-3d-scene').evaluate((node) => node.classList.contains('is-expanded') || document.fullscreenElement === node), false);

  await page.evaluate(() => Object.defineProperty(Element.prototype, 'requestFullscreen', { value: undefined, configurable: true }));
  await page.getByRole('button', { name: 'Plein écran' }).click();
  assert.equal(await page.locator('.lab-3d-scene').evaluate((node) => node.classList.contains('is-expanded')), true);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const stillExpanded = await page.locator('.lab-3d-scene').evaluate((node) => node.classList.contains('is-expanded') || document.fullscreenElement === node);
  assert.equal(stillExpanded, false);
  report.checks.lab3d = { faces: 6, orbits: 3, satellites: 6, signalLines: 3, idleStable: idleA === idleB, animated: activeA !== activeB, paused: pausedA === pausedB, nativeExit: usedNativeFullscreen, fallbackEscape: !stillExpanded };

  await page.goto(`${base}/fr/gallery`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.gallery-item').count(), 27);
  const filters = page.locator('.filter-row button');
  assert.ok(await filters.count() >= 2);
  await filters.nth(1).click();
  const filteredCount = await page.locator('.gallery-item').count();
  assert.ok(filteredCount > 0 && filteredCount < 27);
  await page.locator('.gallery-image-button').first().click();
  assert.equal(await page.locator('.gallery-lightbox').isVisible(), true);
  await page.screenshot({ path: `${shots}/PW-1-gallery-lightbox-after.png`, fullPage: false });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.gallery-lightbox').count(), 0);
  report.checks.gallery = { total: 27, filtered: filteredCount, escapeClosed: true };

  await page.goto(`${base}/fr/projects`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.project-card').count(), 14);
  for (const heading of ['Bibliothèque de compétences IA', 'Atlas Automation', 'Bots Telegram Ops']) {
    assert.equal(await page.getByRole('heading', { name: heading }).count(), 1);
  }
  const gifs = await page.locator('.project-card img').evaluateAll((images) => images
    .filter((img) => (img.getAttribute('src') || '').includes('.gif'))
    .map((img) => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight })));
  assert.equal(gifs.length, 3);
  assert.ok(gifs.every((item) => item.width > 0 && item.height > 0));
  report.checks.projects = { total: 14, gifs };
  await page.screenshot({ path: `${shots}/PW-1-projects-after.png`, fullPage: true });

  await page.goto(`${base}/fr/tools/meme-generator`, { waitUntil: 'networkidle' });
  const longUnicode = 'É—界🙂'.repeat(500);
  await page.locator('#meme-top').fill(longUnicode);
  assert.equal((await page.locator('.meme-preview strong').first().textContent())?.length, longUnicode.length);
  await page.goto(`${base}/fr/tools/readme-generator`, { waitUntil: 'networkidle' });
  await page.locator('#readme-project-name').fill('Atlas Regression');
  assert.match(await page.locator('.readme-output').innerText(), /Atlas Regression/);
  await page.goto(`${base}/fr/tools/image-converter`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('input[type="file"]').count(), 1);
  assert.equal(await page.locator('iframe').count(), 0);
  report.checks.tools = { unicodeLength: longUnicode.length, readmeUpdated: true, fileInput: true, iframeCount: 0 };

  await page.goto(`${base}/fr/students`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.student-portfolio-card').count(), 5);
  const studentImages = await page.locator('.student-portrait img').evaluateAll((images) => images.map((img) => ({ src: img.getAttribute('src'), width: img.naturalWidth, height: img.naturalHeight })));
  assert.ok(studentImages.every((image) => image.width > 0 && image.height > 0));
  const studentNames = await page.locator('.student-card-copy h2').allTextContents();
  assert.deepEqual(studentNames, ['Mouhamed Gaye', 'El Hadji Ismael Diallo', 'Mamadou Dieye', 'Fatou Kine Dione', 'Adja Abibatou Diop']);
  assert.doesNotMatch(await page.locator('.students-page').innerText(), /Frontend|Backend|IA appliquée/);
  assert.ok(await page.locator('.footer-directory a').count() >= 9);
  assert.equal(await page.locator('.footer-identity img[src$="/media/photo.webp"]').count(), 1);
  report.checks.students = { total: 5, images: studentImages, names: studentNames, factualPage: true };
  report.checks.footer = { usefulLinks: await page.locator('.footer-directory a').count(), portrait: true };
  await page.screenshot({ path: `${shots}/PW-1-students-after.png`, fullPage: true });

  await context.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await mobile.addInitScript(() => localStorage.setItem('cherif-portfolio-theme', 'dark'));
  const mobilePage = await mobile.newPage();
  observe(mobilePage, 'mobile');
  await mobilePage.goto(`${base}/fr`, { waitUntil: 'networkidle' });
  const overflow = await mobilePage.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  assert.equal(overflow.scrollWidth, overflow.clientWidth);
  const mobilePortrait = await mobilePage.locator('.portrait-surface img').evaluate((img) => ({ width: img.naturalWidth, height: img.naturalHeight, fit: getComputedStyle(img).objectFit }));
  assert.ok(mobilePortrait.width > 0 && mobilePortrait.height > 0);
  assert.equal(mobilePortrait.fit, 'contain');
  assert.equal(await mobilePage.locator('.dimensional-portrait').getAttribute('data-mode'), '2d');
  assert.equal(await mobilePage.locator('.dimensional-portrait').getAttribute('data-dimension'), '2');
  assert.equal(await mobilePage.locator('.dimension-switcher').evaluate((node) => getComputedStyle(node).display), 'none');
  assert.equal(await mobilePage.locator('.temporal-ghost').first().evaluate((node) => getComputedStyle(node).display), 'none');
  await mobilePage.screenshot({ path: `${shots}/PW-2-home-mobile-2d-after.png`, fullPage: false });
  await mobilePage.getByRole('button', { name: /Menu/i }).click();
  assert.equal(await mobilePage.locator('#main-nav').getAttribute('class'), 'main-nav is-open');
  await mobilePage.getByRole('button', { name: 'Interroger Cherif' }).click();
  await mobilePage.waitForTimeout(400);
  const mobileChat = await mobilePage.locator('.chat-panel').boundingBox();
  assert.ok(mobileChat && mobileChat.width >= 389 && mobileChat.height >= 843);
  assert.equal(await mobilePage.locator('.chat-launcher').evaluate((node) => getComputedStyle(node).visibility), 'hidden');
  await mobilePage.screenshot({ path: `${shots}/PW-2-chat-mobile-after.png`, fullPage: false });
  await mobilePage.getByRole('button', { name: 'Fermer le chat' }).click();
  await mobilePage.locator('.lab-section').scrollIntoViewIfNeeded();
  await mobilePage.getByRole('button', { name: /Explorer (la scène 3D|le système)/ }).click();
  const reducedA = await mobilePage.locator('.lab-3d-object').evaluate((node) => getComputedStyle(node).transform);
  await mobilePage.waitForTimeout(350);
  const reducedB = await mobilePage.locator('.lab-3d-object').evaluate((node) => getComputedStyle(node).transform);
  const reducedDelta = matrixDelta(reducedA, reducedB);
  assert.ok(reducedDelta < 0.0001, `Mouvement réduit instable: delta=${reducedDelta}`);
  await mobilePage.goto(`${base}/fr/gallery`, { waitUntil: 'networkidle' });
  assert.equal(await mobilePage.locator('.gallery-grid').evaluate((node) => getComputedStyle(node).columnCount), '1');
  report.checks.mobile = { overflow, chat: mobileChat, portrait: mobilePortrait, dimensionMode: '2d', reducedMotionStable: reducedDelta < 0.0001, reducedMotionDelta: reducedDelta, galleryColumns: 1 };
  await mobilePage.screenshot({ path: `${shots}/PW-2-gallery-mobile-after.png`, fullPage: false });
  await mobile.close();

  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.networkFailures, []);
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL';
  report.failure = error instanceof Error ? { message: error.message, stack: error.stack } : String(error);
  throw error;
} finally {
  report.finishedAt = new Date().toISOString();
  writeFileSync(`${artifacts}/regression-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
