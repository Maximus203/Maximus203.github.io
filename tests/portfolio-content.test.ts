import test from 'node:test';
import assert from 'node:assert/strict';
import { getPortfolioData } from '../lib/portfolio-content';
import { locales } from '../lib/i18n';

const preserved = ['image-converter', 'my-event', 'nanobrowser-bridge', 'sap-commercial', 'archive-estm', 'momentum', 'cynoia-spaces', 'ai-skills-library', 'artist-digital', 'atlas-automation', 'telegram-ops', 'murabbi-landing', 'les-chats', 'mbaye-chatbot'];
test('all portfolio locales preserve projects, teaching experience and education', () => {
  const fr = getPortfolioData('fr');
  for (const locale of locales) {
    const data = getPortfolioData(locale);
    assert.equal(data.projects.length, 17);
    assert.equal(data.experiences.length, 8);
    assert.equal(data.education.length, 4);
    for (const id of preserved) assert.ok(data.projects.some(p => p.id === id), `${locale}: lost ${id}`);
    for (const title of ['Ndougalma', 'Murabbi', 'UpgradeTech']) assert.ok(data.projects.some(p => p.title === title));
    for (const company of ['ESTM', 'ISM', 'ESCOA']) assert.ok(data.experiences.some(p => p.company === company));
    if (locale !== 'fr') {
      assert.notEqual(data.projects[0].description, fr.projects[0].description);
      assert.notEqual(data.skills[0].label, fr.skills[0].label);
      assert.notEqual(data.experiences[0].summary, fr.experiences[0].summary);
    }
    const upgrade = data.projects.find(p => p.title === 'UpgradeTech')!;
    assert.equal(upgrade.link, undefined);
    assert.equal(upgrade.live, undefined);
    assert.doesNotMatch(upgrade.description, /\d+\s*%/);
    assert.ok(data.education.some(e => e.period.includes('2025')));
    assert.ok(data.experiences.some(e => e.company === 'TérangaDev' && e.period.includes('2024') && e.period.includes('2026')));
    assert.ok(data.projects.every(p => !p.image.includes('/architecture/')));
  }
});

test('public portfolio data does not expose credential-shaped fields or private diagrams', () => {
  for (const locale of locales) {
    const data = getPortfolioData(locale);
    assert.doesNotMatch(JSON.stringify(data), /SSH_|api[_-]?key|access[_-]?token/);
    assert.ok(data.projects.every(project => !project.image.includes('/architecture/')));
  }
});
