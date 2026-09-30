import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'file:///C:/Users/diouf/.agents/skills/local-demo-video-recorder/node_modules/playwright/index.mjs';

const base = process.env.PORTFOLIO_BASE_URL || 'http://localhost:4178';
const root = 'D:/01-Dev/Perso/Maximus203.github.io/prototype-next';
const shots = `${root}/.test-shots`;
const reportPath = `${root}/artifacts/theme-regression-report.json`;
mkdirSync(shots, { recursive: true });

const report = {
  startedAt: new Date().toISOString(),
  buildId: readFileSync(`${root}/.next/BUILD_ID`, 'utf8').trim(),
  base,
  checks: {},
  errors: [],
  networkFailures: [],
};

function observe(page, scope) {
  page.on('console', (message) => {
    if (message.type() === 'error') report.errors.push(`${scope}: ${message.text()}`);
  });
  page.on('pageerror', (error) => report.errors.push(`${scope}: ${error.message}`));
  page.on('response', (response) => {
    if (response.status() >= 400) report.networkFailures.push(`${scope}: ${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', (request) => report.networkFailures.push(`${scope}: FAILED ${request.url()} ${request.failure()?.errorText || ''}`));
}

function rgb(value) {
  const match = value.match(/rgba?\((\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)/i);
  assert.ok(match, `Couleur illisible: ${value}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function luminance(value) {
  const channels = rgb(value).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return Number(((values[0] + 0.05) / (values[1] + 0.05)).toFixed(2));
}

async function snapshot(page, selector) {
  return page.locator(selector).first().evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.color, background: style.backgroundColor, display: style.display };
  });
}

const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  await desktop.addInitScript(() => {
    localStorage.setItem('cherif-portfolio-theme', 'light');
    document.addEventListener('DOMContentLoaded', () => {
      window.__portfolioThemeAtDomReady = {
        html: document.documentElement.dataset.portfolioTheme,
        site: document.querySelector('.site-root')?.getAttribute('data-theme'),
      };
    }, { once: true });
  });
  const page = await desktop.newPage();
  observe(page, 'desktop');
  await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });

  const light = await page.evaluate(() => {
    const site = document.querySelector('.site-root');
    const heading = document.querySelector('h1');
    const paragraph = document.querySelector('.hero-copy > p');
    return {
      htmlTheme: document.documentElement.dataset.portfolioTheme,
      siteTheme: site?.getAttribute('data-theme'),
      stored: localStorage.getItem('cherif-portfolio-theme'),
      background: getComputedStyle(site).backgroundColor,
      heading: getComputedStyle(heading).color,
      paragraph: getComputedStyle(paragraph).color,
    };
  });
  assert.equal(light.htmlTheme, 'light');
  assert.equal(light.siteTheme, 'light');
  assert.equal(light.stored, 'light');
  const firstPaintTheme = await page.evaluate(() => window.__portfolioThemeAtDomReady);
  assert.deepEqual(firstPaintTheme, { html: 'light', site: 'light' });
  assert.ok(contrast(light.heading, light.background) >= 7, `Contraste titre clair ${contrast(light.heading, light.background)}:1`);
  assert.ok(contrast(light.paragraph, light.background) >= 4.5, `Contraste texte clair ${contrast(light.paragraph, light.background)}:1`);
  const touchTargets = await page.evaluate(() => {
    const measure = (selector) => {
      const bounds = document.querySelector(selector).getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    };
    return { theme: measure('.mode-toggle'), autoplay: measure('.dimension-autoplay') };
  });
  assert.ok(touchTargets.theme.width >= 44 && touchTargets.theme.height >= 44);
  assert.ok(touchTargets.autoplay.width >= 44 && touchTargets.autoplay.height >= 44);
  report.checks.lightContrast = { ...light, firstPaintTheme, headingRatio: contrast(light.heading, light.background), paragraphRatio: contrast(light.paragraph, light.background), touchTargets };
  await page.screenshot({ path: `${shots}/THEME-FIX-home-light.png`, fullPage: false });

  await page.getByRole('link', { name: 'Projets' }).first().click();
  await page.waitForLoadState('networkidle');
  assert.equal(await page.locator('.site-root').getAttribute('data-theme'), 'light');
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('.site-root').getAttribute('data-theme'), 'light');
  report.checks.persistence = { navigation: true, refresh: true };

  await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
  await page.locator('.lab-section').scrollIntoViewIfNeeded();
  const labLight = await snapshot(page, '.lab-3d-scene');
  const labPanelLight = await snapshot(page, '.lab-flow-label');
  assert.notEqual(labLight.background, 'rgb(7, 17, 31)');
  assert.notEqual(labPanelLight.background, 'rgba(7, 17, 31, 0.82)');
  await page.getByRole('button', { name: 'Explorer le système' }).click();
  await page.getByRole('button', { name: 'Plein écran' }).click();
  await page.waitForTimeout(250);
  const expanded = await page.locator('.lab-3d-scene').evaluate((element) => element.classList.contains('is-expanded') || document.fullscreenElement === element);
  assert.equal(expanded, true);
  await page.screenshot({ path: `${shots}/THEME-FIX-cube-light-fullscreen.png`, fullPage: false });
  await page.keyboard.press('Escape');
  report.checks.lab = { themed: true, fullscreen: expanded, scene: labLight, panel: labPanelLight };

  await page.goto(`${base}/fr/tools/readme-generator`, { waitUntil: 'networkidle' });
  const readme = await snapshot(page, '.readme-output');
  assert.notEqual(readme.background, 'rgb(8, 10, 16)');
  await page.goto(`${base}/fr/tools/meme-generator`, { waitUntil: 'networkidle' });
  const meme = await snapshot(page, '.meme-preview');
  assert.notEqual(meme.background, 'rgb(21, 24, 32)');
  report.checks.tools = { readme, meme };

  await page.goto(`${base}/fr`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Diffuser le mode sombre/ }).click();
  await page.waitForTimeout(170);
  const darkRadius = Number(await page.locator('.theme-fluid-blob').first().getAttribute('r'));
  assert.ok(darkRadius > 0);
  await page.waitForTimeout(1100);
  assert.equal(await page.locator('.site-root').getAttribute('data-theme'), 'dark');
  assert.equal(await page.evaluate(() => localStorage.getItem('cherif-portfolio-theme')), 'dark');
  const dark = await page.evaluate(() => {
    const site = document.querySelector('.site-root');
    const heading = document.querySelector('h1');
    return { background: getComputedStyle(site).backgroundColor, heading: getComputedStyle(heading).color };
  });
  assert.ok(contrast(dark.heading, dark.background) >= 7);
  await page.getByRole('button', { name: /Diffuser le mode clair/ }).click();
  await page.waitForTimeout(170);
  const lightRadius = Number(await page.locator('.theme-fluid-blob').first().getAttribute('r'));
  assert.ok(lightRadius > 0);
  await page.waitForTimeout(1100);
  report.checks.transitions = { darkRadius, lightRadius, bothDirectionsAnimated: true };
  await page.screenshot({ path: `${shots}/THEME-FIX-home-light-restored.png`, fullPage: false });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await mobile.addInitScript(() => localStorage.setItem('cherif-portfolio-theme', 'light'));
  const mobilePage = await mobile.newPage();
  observe(mobilePage, 'mobile');
  await mobilePage.goto(`${base}/fr`, { waitUntil: 'networkidle' });
  const mobileState = await mobilePage.evaluate(() => {
    const stage = document.querySelector('.dimension-stage').getBoundingClientRect();
    return {
      theme: document.querySelector('.site-root')?.getAttribute('data-theme'),
      dimension: document.querySelector('.dimensional-portrait')?.getAttribute('data-dimension'),
      mode: document.querySelector('.dimensional-portrait')?.getAttribute('data-mode'),
      switcher: getComputedStyle(document.querySelector('.dimension-switcher')).display,
      ratio: Number((stage.width / stage.height).toFixed(2)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  assert.equal(mobileState.theme, 'light');
  assert.equal(mobileState.dimension, '2');
  assert.equal(mobileState.mode, '2d');
  assert.equal(mobileState.switcher, 'none');
  assert.equal(mobileState.ratio, 0.8);
  assert.equal(mobileState.overflow, 0);
  await mobilePage.getByRole('button', { name: 'Interroger Cherif' }).click();
  const closeBox = await mobilePage.getByRole('button', { name: 'Fermer le chat' }).boundingBox();
  assert.ok(closeBox && closeBox.width >= 44 && closeBox.height >= 44);
  report.checks.mobile = { ...mobileState, closeTarget: closeBox };
  await mobilePage.screenshot({ path: `${shots}/THEME-FIX-mobile-chat-light.png`, fullPage: false });
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
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  await browser.close();
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
