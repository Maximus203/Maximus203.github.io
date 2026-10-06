/** Public file contracts and security invariants from the Applications acceptance strategy. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ConversionError, EXT, MIME, MAX_IMAGE_BYTES, MAX_BATCH_INPUT_BYTES, MAX_BATCH_OUTPUT_BYTES, MAX_DATA_OUTPUT_CHARS, convertData, csvToJson, imageFormats,
  imageSignature, jsonToCsv, outputName, parseCsv, uniqueName, validateImage, wrapCaption,
} from '../lib/applications/conversion';
import { applicationCopy, applicationIds } from '../lib/applications/catalog';
import { languageAlternates, locales } from '../lib/i18n';

function errorCode(code: string) {
  return (error: unknown) => error instanceof ConversionError && error.code === code;
}

test('supported image outputs have honest extensions and MIME types', () => {
  assert.deepEqual(imageFormats, ['webp', 'jpeg', 'png', 'pdf']);
  assert.deepEqual(EXT, { webp: 'webp', jpeg: 'jpg', png: 'png', pdf: 'pdf' });
  assert.deepEqual(MIME, { webp: 'image/webp', jpeg: 'image/jpeg', png: 'image/png', pdf: 'application/pdf' });
});

test('image signatures recognize bytes rather than trusting a supplied extension or MIME', () => {
  const fixture: Record<string, number[]> = {
    png: [137, 80, 78, 71, 13, 10, 26, 10], jpeg: [255, 216, 255],
    webp: [82, 73, 70, 70, 42, 0, 0, 0, 87, 69, 66, 80],
    gif: [71, 73, 70, 56, 57, 97], bmp: [66, 77, ...Array(12).fill(0)],
  };
  for (const [format, bytes] of Object.entries(fixture)) {
    assert.equal(imageSignature(new Uint8Array(bytes)), format);
    const mutated = Uint8Array.from(bytes); mutated[0] ^= 1;
    assert.equal(imageSignature(mutated), null, `mutated ${format} signature must fail`);
  }
  assert.equal(imageSignature(new TextEncoder().encode('<svg onload="alert(1)"></svg>')), null);
  assert.equal(imageSignature(new Uint8Array()), null);
});

test('input limits and spoofed image files fail with actionable error codes', async () => {
  await assert.rejects(validateImage(new Blob()), errorCode('empty'));
  await assert.rejects(validateImage(new Blob(['not a PNG'], { type: 'image/png' })), errorCode('unsupported'));
  await assert.rejects(validateImage(new Blob([new Uint8Array(MAX_IMAGE_BYTES + 1)])), errorCode('tooLarge'));
});

test('download names strip unsafe characters and de-duplicate case-insensitively', () => {
  assert.equal(outputName('../a:test?.png', 'jpg'), '-a-test-.jpg');
  assert.equal(outputName('.png', 'webp'), 'converted.webp');
  assert.equal(outputName('東京.png', 'pdf'), '東京.pdf');
  const used = new Set<string>();
  assert.equal(uniqueName('photo.png', used), 'photo.png');
  assert.equal(uniqueName('PHOTO.png', used), 'PHOTO-2.png');
  assert.equal(uniqueName('photo.png', used), 'photo-3.png');
});

test('CSV round trips quoted commas, embedded newlines, quotes, empty strings and Unicode', () => {
  const csv = '\ufeffname,note,empty\r\n"Zoë","hello, \"\"世界\"\"\nnext line",\r\n';
  const records = JSON.parse(csvToJson(csv));
  assert.deepEqual(records, [{ name: 'Zoë', note: 'hello, "世界"\nnext line', empty: '' }]);
  assert.deepEqual(JSON.parse(csvToJson(jsonToCsv(JSON.stringify(records)))), records);
});

test('malformed CSV and ambiguous columns are rejected', () => {
  for (const value of ['a,b\n"unclosed,x', 'a,b\nhello"world,x', 'a,b\n"closed"junk,x']) assert.throws(() => parseCsv(value), errorCode('csv'));
  for (const value of ['a,a\nx,y', 'a,\nx,y', ',b\nx,y']) assert.throws(() => parseCsv(value), errorCode('headers'));
  assert.throws(() => parseCsv('a,b\nonly-one'), errorCode('rows'));
});

test('JSON CSV export protects spreadsheet formulas and handles heterogeneous records', () => {
  const records = [{ name: '=HYPERLINK("bad")', value: '@SUM(A1)' }, { name: '  +cmd', other: 2 }];
  const rows = parseCsv(jsonToCsv(JSON.stringify(records)));
  assert.deepEqual(rows[0], ['name', 'value', 'other']);
  assert.equal(rows[1][0], "'=HYPERLINK(\"bad\")");
  assert.equal(rows[1][1], "'@SUM(A1)");
  assert.equal(rows[2][0], "'  +cmd");
  assert.equal(rows[2][2], '2');
  assert.equal(parseCsv(jsonToCsv('[{"v":"=1+1"}]', false))[1][0], '=1+1');
});

test('JSON conversion rejects malformed, nested and non-record data and accepts format modes', () => {
  assert.throws(() => jsonToCsv('{'), errorCode('json'));
  for (const value of ['[]', '{}', '[1]', '[null]', '[[1]]']) assert.throws(() => jsonToCsv(value), errorCode('records'));
  assert.throws(() => jsonToCsv('[{"a":{"nested":true}}]'), errorCode('nested'));
  assert.equal(convertData('{"hello": "世界"}', 'json-compact'), '{"hello":"世界"}');
  assert.equal(convertData('\ufeff{"ok":true}', 'json-pretty'), '{\n  "ok": true\n}');
  assert.throws(() => convertData(' ', 'csv-json'), errorCode('empty'));
});

test('prototype-like column names remain data without prototype mutation', () => {
  const records = JSON.parse(csvToJson('__proto__,constructor\nx,y'));
  assert.equal(Object.hasOwn(records[0], '__proto__'), true);
  assert.equal(records[0].__proto__, 'x');
  assert.equal(records[0].constructor, 'y');
  assert.equal(({} as Record<string, unknown>).polluted, undefined);
});

test('caption wrapping preserves Unicode graphemes and explicit blank lines', () => {
  const measure = { measureText: (value: string) => ({ width: [...value].length * 10 } as TextMetrics) };
  assert.deepEqual(wrapCaption(measure, 'abcdef', 20), ['ab', 'cd', 'ef']);
  assert.deepEqual(wrapCaption(measure, '東京日本', 20), ['東京', '日本']);
  assert.deepEqual(wrapCaption(measure, 'a\n\nb', 20), ['a', '', 'b']);
  const joined = wrapCaption(measure, '👨‍👩‍👧‍👦x', 20).join('');
  assert.equal(joined, '👨‍👩‍👧‍👦x');
});

function keys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix];
  return Object.entries(value).flatMap(([key, item]) => keys(item, `${prefix}/${key}`));
}

test('every application and locale has a complete translated catalog and locale-safe URLs', () => {
  const expectedKeys = keys(applicationCopy.fr);
  for (const locale of locales) {
    const copy = applicationCopy[locale];
    assert.deepEqual(keys(copy), expectedKeys, `${locale} catalog shape`);
    assert.equal(copy.apps['file-converter'].category, 'files');
    assert.equal(copy.apps['meme-generator'].category, 'creative');
    assert.equal(copy.apps['readme-generator'].category, 'developer');
    for (const id of applicationIds) assert.ok(copy.apps[id].name.length > 0);
    assert.ok(copy.privacy.length > 0);
  }
  assert.deepEqual(languageAlternates('/applications'), { fr: '/fr/applications', en: '/en/applications', zh: '/zh/applications', ja: '/ja/applications' });
});

import {
  createReadmeData, escapeHtml, generateReadme, generateSnakeWorkflow, getReadmeErrors,
  getReadmeImages, getReadmeImageHosts, safeExternalUrl, selectedReadmeSkills, SKILLS,
  validGithubUsername,
} from '../lib/applications/readme';
import { readmeCopy } from '../lib/applications/readme-copy';
import { appCopy } from '../lib/applications/conversion-copy';

test('README URL validation excludes executable, credential, local, IP and malformed URLs', () => {
  const unsafe = ['javascript:alert(1)', 'data:image/svg+xml,<svg/>', 'http://example.com',
    'https://user:pass@example.com', 'https://localhost/', 'https://127.0.0.1/', 'https://[::1]/',
    'https://10.0.0.1/', 'https://2130706433/', 'https://example.local/', 'https://example.internal/',
    'https://example.com:444/', 'https://example.com/"onload="x', 'https://example.com/\\x',
    'https://example.com/\nx', 'https://example.com/a b'];
  for (const url of unsafe) assert.equal(safeExternalUrl(url), null, url);
  assert.equal(safeExternalUrl('https://example.com/profile?a=1&b=2'), 'https://example.com/profile?a=1&b=2');
  assert.equal(safeExternalUrl('https://github.com/octocat'), 'https://github.com/octocat');
  assert.equal(safeExternalUrl(''), null);
});

test('README input is escaped without turning hostile Markdown or HTML into active markup', () => {
  const data = createReadmeData();
  data.title = '<script>alert("x")</script>';
  data.about = '[click](javascript:alert(1))\n<img src=x onerror=alert(1)>';
  data.location = '</p><iframe src="https://example.com"></iframe>';
  data.portfolioUrl = 'javascript:alert(1)';
  data.avatarUrl = 'data:image/svg+xml,<svg onload="alert(1)"/>';
  const source = generateReadme(data, 'en');
  assert.ok(source.includes('&lt;script&gt;'));
  assert.ok(!source.includes('<script'));
  assert.ok(!source.includes('<iframe'));
  assert.ok(!source.includes('<img'));
  assert.ok(!source.includes('href="javascript:'));
  assert.ok(!source.includes('[click]'));
  assert.deepEqual(getReadmeErrors(data), ['avatarUrl', 'portfolioUrl']);
  assert.equal(escapeHtml('<"&\'>'), '&lt;&quot;&amp;&#39;&gt;');
});

test('README and workflow start empty without unsolicited third-party images', () => {
  const data = createReadmeData();
  assert.deepEqual(getReadmeImages(data, 'en'), []);
  assert.deepEqual(getReadmeImageHosts(data, 'en'), []);
  assert.equal(generateSnakeWorkflow(''), '');
  assert.ok(!generateReadme(data, 'en').includes('<img'));
  assert.ok(Object.values(data.widgets).every(enabled => !enabled));
});

test('README skills use real distinct identifiers and ignore unrecognized skill payloads', () => {
  const data = createReadmeData();
  data.skills = ['Next.js', 'Tailwind CSS', 'PostgreSQL', '<script>'];
  assert.deepEqual(selectedReadmeSkills(data).map(skill => skill.name), ['Next.js', 'Tailwind CSS', 'PostgreSQL']);
  const images = getReadmeImages(data, 'en');
  assert.equal(images.length, 3);
  assert.equal(new URL(images[0].src).searchParams.get('logo'), 'nextdotjs');
  assert.equal(new URL(images[1].src).searchParams.get('logo'), 'tailwindcss');
  assert.equal(new URL(images[2].src).searchParams.get('logo'), 'postgresql');
  data.skillStyle = 'icons';
  assert.equal(new URL(getReadmeImages(data, 'en')[0].src).searchParams.get('i'), 'nextjs,tailwind,postgres');
  assert.equal(new Set(SKILLS.map(skill => skill.name)).size, SKILLS.length);
});

test('README widgets require safe usernames and construct encoded third-party URLs', () => {
  const data = createReadmeData();
  for (const key of Object.keys(data.widgets)) data.widgets[key as keyof typeof data.widgets] = true;
  data.username = 'bad\nusername';
  assert.deepEqual(getReadmeImages(data, 'en'), []);
  data.username = 'octocat';
  const images = getReadmeImages(data, 'ja');
  assert.equal(images.length, 7);
  assert.ok(images.every(image => new URL(image.src).protocol === 'https:'));
  assert.ok(images.find(image => image.id === 'snake')?.src.includes('/octocat/octocat/snake-output/'));
  data.typingLines = 'hello&theme=malicious;世界';
  const typing = getReadmeImages(data, 'en').find(image => image.kind === 'typing')!;
  const query = new URL(typing.src).searchParams;
  assert.equal(query.get('lines'), data.typingLines);
  assert.equal(query.get('theme'), null);
});

test('snake workflow rejects YAML injection and publishes only to its dedicated branch', () => {
  for (const username of ['', '-bad', 'bad-', 'bad--name', 'a'.repeat(40), 'name\nrun: curl x', '${{ secrets.X }}', 'user/name']) {
    assert.equal(validGithubUsername(username), false, username);
    assert.equal(generateSnakeWorkflow(username), '', username);
  }
  assert.ok(validGithubUsername('octocat'));
  assert.ok(validGithubUsername('a'.repeat(39)));
  const source = generateSnakeWorkflow('octocat');
  assert.ok(source.includes('github_user_name: "octocat"'));
  assert.ok(source.includes('workflow_dispatch:'));
  assert.ok(source.includes('target_branch: snake-output'));
  assert.ok(source.includes('contents: read'));
  assert.ok(source.includes('contents: write'));
  assert.ok(source.includes('${{ secrets.GITHUB_TOKEN }}'));
  assert.ok(!/target_branch:\s*(main|master)/.test(source));
  assert.ok(!/\brun:/.test(source));
});

test('workbench dictionaries expose equal translated controls and error states in all locales', () => {
  for (const locale of locales) {
    assert.deepEqual(keys(appCopy[locale]), keys(appCopy.en), `${locale} conversion/meme controls`);
    assert.deepEqual(keys(readmeCopy[locale]), keys(readmeCopy.en), `${locale} README controls`);
    const data = createReadmeData(); data.title = '安全 <test>'; data.skills = ['React'];
    assert.ok(generateReadme(data, locale).includes('&lt;test&gt;'));
  }
});

test('structured-data limits stop sparse record amplification before huge CSV expansion', () => {
  const sparse = Array.from({ length: 3000 }, (_, index) => ({ [`column${index % 500}`]: 'x' }));
  assert.throws(() => jsonToCsv(JSON.stringify(sparse)), errorCode('dataLimit'));
  const tooWide = Object.fromEntries(Array.from({ length: 501 }, (_, index) => [`column${index}`, index]));
  assert.throws(() => jsonToCsv(JSON.stringify([tooWide])), errorCode('dataLimit'));
});

test('structured-data limits stop repeated long headers and excessive CSV rows or columns', () => {
  const longHeader = 'a'.repeat(100_000);
  const tinyInputHugeOutput = `${longHeader}\n${Array(500).fill('x').join('\n')}`;
  assert.ok(tinyInputHugeOutput.length < 110_000);
  assert.throws(() => csvToJson(tinyInputHugeOutput), errorCode('dataLimit'));
  const tooManyRows = `a\n${Array(50_001).fill('x').join('\n')}`;
  assert.throws(() => parseCsv(tooManyRows), errorCode('dataLimit'));
  assert.throws(() => parseCsv(Array.from({ length: 501 }, (_, index) => `a${index}`).join(',')), errorCode('dataLimit'));
});

test('image and generated-data memory budgets remain explicitly bounded', () => {
  assert.equal(MAX_BATCH_INPUT_BYTES, 100 * 1024 * 1024);
  assert.equal(MAX_BATCH_OUTPUT_BYTES, 150 * 1024 * 1024);
  assert.equal(MAX_DATA_OUTPUT_CHARS, 20 * 1024 * 1024);
  assert.ok(MAX_IMAGE_BYTES < MAX_BATCH_INPUT_BYTES);
});

test('JSON formatting and compaction reject deeply nested expansion attacks', () => {
  const hostile = '['.repeat(3500) + '0' + ']'.repeat(3500);
  assert.equal(hostile.length, 7001);
  for (const mode of ['json-pretty', 'json-compact'] as const) {
    assert.throws(() => convertData(hostile, mode), errorCode('dataLimit'));
    assert.throws(() => convertData('['.repeat(101) + '0' + ']'.repeat(101), mode), errorCode('dataLimit'));
  }
});

test('bounded JSON formatting preserves ordinary nested values and allowed depth', () => {
  const value = { title: '東京', nested: [{ ok: true, empty: [] }, null, 4, { escaped: 'line\n"quote"' }], object: {} };
  const input = JSON.stringify(value);
  assert.equal(convertData(input, 'json-pretty'), JSON.stringify(value, null, 2));
  assert.equal(convertData(input, 'json-compact'), input);
  const deepest = '['.repeat(100) + '0' + ']'.repeat(100);
  assert.equal(convertData(deepest, 'json-compact'), deepest);
  assert.deepEqual(JSON.parse(convertData(deepest, 'json-pretty')), JSON.parse(deepest));
});
