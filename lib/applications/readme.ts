import type { Locale } from '@/lib/i18n';
import { readmeCopy } from './readme-copy';

export const SKILL_CATEGORIES = ['languages', 'frontend', 'backend', 'mobile', 'databases', 'devops', 'tools'] as const;
export type SkillCategory = typeof SKILL_CATEGORIES[number];
export type Skill = { name: string; category: SkillCategory; icon: string; logo: string; color: string; logoColor?: string };
// Skill Icons IDs and Shields / Simple Icons identifiers are independent. In particular,
// nextjs, tailwind and postgres are not their Simple Icons identifiers.
export const SKILLS: Skill[] = [
  { name: 'JavaScript', category: 'languages', icon: 'js', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
  { name: 'TypeScript', category: 'languages', icon: 'ts', logo: 'typescript', color: '3178C6' },
  { name: 'Python', category: 'languages', icon: 'python', logo: 'python', color: '3776AB' },
  { name: 'PHP', category: 'languages', icon: 'php', logo: 'php', color: '777BB4' },
  { name: 'Java', category: 'languages', icon: 'java', logo: 'openjdk', color: 'ED8B00' },
  { name: 'C++', category: 'languages', icon: 'cpp', logo: 'cplusplus', color: '00599C' },
  { name: 'Go', category: 'languages', icon: 'go', logo: 'go', color: '00ADD8', logoColor: 'black' },
  { name: 'Rust', category: 'languages', icon: 'rust', logo: 'rust', color: '000000' },
  { name: 'Swift', category: 'languages', icon: 'swift', logo: 'swift', color: 'F05138' },
  { name: 'Kotlin', category: 'languages', icon: 'kotlin', logo: 'kotlin', color: '7F52FF' },
  { name: 'Dart', category: 'languages', icon: 'dart', logo: 'dart', color: '0175C2' },
  { name: 'React', category: 'frontend', icon: 'react', logo: 'react', color: '20232A', logoColor: '61DAFB' },
  { name: 'Vue', category: 'frontend', icon: 'vue', logo: 'vuedotjs', color: '35495E', logoColor: '4FC08D' },
  { name: 'Angular', category: 'frontend', icon: 'angular', logo: 'angular', color: 'DD0031' },
  { name: 'Svelte', category: 'frontend', icon: 'svelte', logo: 'svelte', color: 'FF3E00' },
  { name: 'Next.js', category: 'frontend', icon: 'nextjs', logo: 'nextdotjs', color: '000000' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind', logo: 'tailwindcss', color: '0F172A', logoColor: '38BDF8' },
  { name: 'Bootstrap', category: 'frontend', icon: 'bootstrap', logo: 'bootstrap', color: '7952B3' },
  { name: 'HTML5', category: 'frontend', icon: 'html', logo: 'html5', color: 'E34F26' },
  { name: 'CSS', category: 'frontend', icon: 'css', logo: 'css', color: '663399' },
  { name: 'Node.js', category: 'backend', icon: 'nodejs', logo: 'nodedotjs', color: '339933' },
  { name: 'Laravel', category: 'backend', icon: 'laravel', logo: 'laravel', color: 'FF2D20' },
  { name: 'Symfony', category: 'backend', icon: 'symfony', logo: 'symfony', color: '000000' },
  { name: 'Django', category: 'backend', icon: 'django', logo: 'django', color: '092E20' },
  { name: 'Spring', category: 'backend', icon: 'spring', logo: 'spring', color: '6DB33F', logoColor: 'black' },
  { name: 'Express', category: 'backend', icon: 'express', logo: 'express', color: '000000' },
  { name: 'NestJS', category: 'backend', icon: 'nestjs', logo: 'nestjs', color: 'E0234E' },
  { name: 'Flutter', category: 'mobile', icon: 'flutter', logo: 'flutter', color: '02569B' },
  { name: 'React Native', category: 'mobile', icon: 'react', logo: 'react', color: '20232A', logoColor: '61DAFB' },
  { name: 'Android Studio', category: 'mobile', icon: 'androidstudio', logo: 'androidstudio', color: '3DDC84', logoColor: 'black' },
  { name: 'iOS', category: 'mobile', icon: 'apple', logo: 'ios', color: '000000' },
  { name: 'MySQL', category: 'databases', icon: 'mysql', logo: 'mysql', color: '4479A1' },
  { name: 'PostgreSQL', category: 'databases', icon: 'postgres', logo: 'postgresql', color: '4169E1' },
  { name: 'MongoDB', category: 'databases', icon: 'mongodb', logo: 'mongodb', color: '47A248', logoColor: 'black' },
  { name: 'Redis', category: 'databases', icon: 'redis', logo: 'redis', color: 'DC382D' },
  { name: 'SQLite', category: 'databases', icon: 'sqlite', logo: 'sqlite', color: '003B57' },
  { name: 'Docker', category: 'devops', icon: 'docker', logo: 'docker', color: '2496ED' },
  { name: 'Kubernetes', category: 'devops', icon: 'kubernetes', logo: 'kubernetes', color: '326CE5' },
  { name: 'AWS', category: 'devops', icon: 'aws', logo: '', color: '232F3E' },
  { name: 'Azure', category: 'devops', icon: 'azure', logo: '', color: '0078D4' },
  { name: 'Google Cloud', category: 'devops', icon: 'gcp', logo: 'googlecloud', color: '4285F4' },
  { name: 'GitHub Actions', category: 'devops', icon: 'githubactions', logo: 'githubactions', color: '2088FF' },
  { name: 'Linux', category: 'devops', icon: 'linux', logo: 'linux', color: 'FCC624', logoColor: 'black' },
  { name: 'Git', category: 'tools', icon: 'git', logo: 'git', color: 'F05032' },
  { name: 'Figma', category: 'tools', icon: 'figma', logo: 'figma', color: 'F24E1E' },
  { name: 'Postman', category: 'tools', icon: 'postman', logo: 'postman', color: 'FF6C37', logoColor: 'black' },
  { name: 'VS Code', category: 'tools', icon: 'vscode', logo: '', color: '007ACC' },
];

export const README_THEMES = [
  { id: 'default', background: 'ffffff', foreground: '24292f', accent: '0969da', trophy: 'flat', light: true },
  { id: 'dark', background: '151515', foreground: 'eeeeee', accent: '58a6ff', trophy: 'darkhub', light: false },
  { id: 'radical', background: '141321', foreground: 'a9fef7', accent: 'fe428e', trophy: 'radical', light: false },
  { id: 'tokyonight', background: '1a1b27', foreground: 'a9b1d6', accent: '70a5fd', trophy: 'tokyonight', light: false },
  { id: 'dracula', background: '282a36', foreground: 'f8f8f2', accent: 'bd93f9', trophy: 'dracula', light: false },
  { id: 'gruvbox', background: '282828', foreground: 'ebdbb2', accent: 'fabd2f', trophy: 'gruvbox', light: false },
  { id: 'onedark', background: '282c34', foreground: 'abb2bf', accent: 'e4bf7a', trophy: 'onedark', light: false },
  { id: 'monokai', background: '272822', foreground: 'f8f8f2', accent: 'eb1f6a', trophy: 'monokai', light: false },
  { id: 'nord', background: '2e3440', foreground: 'd8dee9', accent: '88c0d0', trophy: 'nord', light: false },
  { id: 'solarized-light', background: 'fdf6e3', foreground: '586e75', accent: '268bd2', trophy: 'flat', light: true },
] as const;
export type ReadmeTheme = typeof README_THEMES[number]['id'];
export const README_FONTS = ['Fira Code', 'Inter', 'Roboto', 'JetBrains Mono', 'Noto Sans', 'Lexend'] as const;
export const WIDGET_KEYS = ['stats', 'streaks', 'topLanguages', 'trophies', 'visitors', 'activity', 'snake'] as const;
export type WidgetKey = typeof WIDGET_KEYS[number];
export type ReadmeData = {
  username: string; title: string; subtitle: string; about: string; location: string;
  avatarUrl: string; portfolioUrl: string; linkedinUrl: string; resumeUrl: string; typingLines: string;
  alignment: 'left' | 'center' | 'right'; theme: ReadmeTheme; font: typeof README_FONTS[number];
  skillStyle: 'badges' | 'icons'; skills: string[]; widgets: Record<WidgetKey, boolean>;
};
export const URL_FIELDS = ['avatarUrl', 'portfolioUrl', 'linkedinUrl', 'resumeUrl'] as const;
export type UrlField = typeof URL_FIELDS[number];
export type ReadmeImage = { id: string; src: string; alt: string; kind: 'avatar' | 'typing' | 'skill' | 'widget'; width?: number };

export function createReadmeData(): ReadmeData {
  return { username: '', title: '', subtitle: '', about: '', location: '', avatarUrl: '', portfolioUrl: '', linkedinUrl: '', resumeUrl: '', typingLines: '', alignment: 'center', theme: 'tokyonight', font: 'Fira Code', skillStyle: 'badges', skills: [], widgets: { stats: false, streaks: false, topLanguages: false, trophies: false, visitors: false, activity: false, snake: false } };
}
export function validGithubUsername(value: string): boolean {
  const username = value.trim();
  return username.length <= 39 && /^[a-z\d]+(?:-[a-z\d]+)*$/i.test(username);
}
/** Public HTTPS only: no executable schemes, credentials, private hosts or control characters. */
export function safeExternalUrl(value: string): string | null {
  const input = value.trim();
  if (!input || input.length > 2048 || /[\u0000-\u0020\u007f<>"'\\]/.test(input)) return null;
  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase().replace(/\.$/, '');
    if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) return null;
    if (!host.includes('.') || /(^|\.)(localhost|local|internal|lan|test|invalid)$/.test(host) || /^[\d.]+$/.test(host) || host.includes(':')) return null;
    return url.href;
  } catch { return null; }
}
export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
export function escapeMarkdown(value: string): string {
  return escapeHtml(value).replace(/[\\`*_{}[\]()#+.!|~-]/g, (character) => `&#${character.charCodeAt(0)};`).replace(/\r?\n/g, '<br />');
}
export function getReadmeErrors(data: ReadmeData): Array<'username' | UrlField> {
  const errors: Array<'username' | UrlField> = [];
  if (data.username.trim() && !validGithubUsername(data.username)) errors.push('username');
  for (const field of URL_FIELDS) if (data[field].trim() && !safeExternalUrl(data[field])) errors.push(field);
  return errors;
}
export function getReadmeTheme(theme: string) { return README_THEMES.find((item) => item.id === theme) ?? README_THEMES[3]; }
export function selectedReadmeSkills(data: ReadmeData): Skill[] { return SKILLS.filter((skill) => data.skills.includes(skill.name)); }
export function skillBadgeUrl(skill: Skill): string {
  const query = new URLSearchParams({ style: 'for-the-badge', logoColor: skill.logoColor ?? 'white' });
  if (skill.logo) query.set('logo', skill.logo);
  return `https://img.shields.io/badge/${encodeURIComponent(skill.name.replace(/-/g, '--').replace(/_/g, '__'))}-${skill.color}?${query}`;
}
function serviceUrl(base: string, parameters: Record<string, string>): string { return `${base}?${new URLSearchParams(parameters)}`; }
export function getReadmeLinks(data: ReadmeData, locale: Locale) {
  const copy = readmeCopy[locale];
  return [
    { label: copy.portfolio, url: safeExternalUrl(data.portfolioUrl) },
    { label: copy.linkedin, url: safeExternalUrl(data.linkedinUrl) },
    { label: copy.resume, url: safeExternalUrl(data.resumeUrl) },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url));
}
export function getReadmeImages(data: ReadmeData, locale: Locale): ReadmeImage[] {
  const copy = readmeCopy[locale];
  const theme = getReadmeTheme(data.theme);
  const images: ReadmeImage[] = [];
  const avatar = safeExternalUrl(data.avatarUrl);
  if (avatar) images.push({ id: 'avatar', src: avatar, alt: copy.avatarAlt, kind: 'avatar', width: 112 });
  if (data.typingLines.trim()) images.push({ id: 'typing', kind: 'typing', alt: copy.typingAlt, src: serviceUrl('https://readme-typing-svg.demolab.com/', { font: README_FONTS.includes(data.font) ? data.font : 'Fira Code', size: '22', pause: '1200', color: theme.accent, center: String(data.alignment === 'center'), vCenter: 'true', width: '600', lines: data.typingLines.trim().slice(0, 300) }) });
  const skills = selectedReadmeSkills(data);
  if (data.skillStyle === 'badges') {
    for (const skill of skills) images.push({ id: `skill-${skill.name}`, kind: 'skill', alt: skill.name, src: skillBadgeUrl(skill) });
  } else {
    for (let index = 0; index < skills.length; index += 8) {
      const group = skills.slice(index, index + 8);
      images.push({ id: `skills-${index}`, kind: 'skill', alt: group.map((skill) => skill.name).join(', '), src: serviceUrl('https://skillicons.dev/icons', { i: group.map((skill) => skill.icon).join(','), theme: theme.light ? 'light' : 'dark', perline: '8' }) });
    }
  }
  if (!validGithubUsername(data.username)) return images;
  const username = data.username.trim();
  const urls: Record<WidgetKey, string> = {
    stats: serviceUrl('https://github-stats-extended.vercel.app/api', { username, show_icons: 'true', theme: theme.id, locale: locale === 'zh' ? 'cn' : locale }),
    topLanguages: serviceUrl('https://github-stats-extended.vercel.app/api/top-langs/', { username, layout: 'compact', theme: theme.id, locale: locale === 'zh' ? 'cn' : locale }),
    streaks: serviceUrl('https://streak-stats.demolab.com/', { user: username, theme: theme.id, locale: locale === 'zh' ? 'zh_Hans' : locale }),
    trophies: serviceUrl('https://github-profile-trophy.vercel.app/', { username, theme: theme.trophy, column: '3', 'margin-w': '10', 'margin-h': '10' }),
    visitors: serviceUrl('https://visitor-badge.laobi.icu/badge', { page_id: `${username}.${username}` }),
    activity: serviceUrl('https://github-readme-activity-graph.vercel.app/graph', { username, bg_color: theme.background, color: theme.foreground, line: theme.accent, point: theme.accent, hide_border: 'true' }),
    snake: `https://raw.githubusercontent.com/${username}/${username}/snake-output/github-contribution-grid-snake${theme.light ? '' : '-dark'}.svg`,
  };
  for (const key of WIDGET_KEYS) if (data.widgets[key]) images.push({ id: key, src: urls[key], alt: key === 'snake' ? copy.snakeAlt : copy[key], kind: 'widget' });
  return images;
}
export function getReadmeImageHosts(data: ReadmeData, locale: Locale): string[] {
  return Array.from(new Set(getReadmeImages(data, locale).map((image) => new URL(image.src).hostname)));
}
function imageHtml(image: ReadmeImage): string {
  return `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}"${image.width ? ` width="${image.width}"` : ''} />`;
}
/** HTML blocks are deliberately generated from validated fields; user HTML/Markdown is never parsed. */
export function generateReadme(data: ReadmeData, locale: Locale): string {
  const copy = readmeCopy[locale];
  const alignment = ['left', 'center', 'right'].includes(data.alignment) ? data.alignment : 'center';
  const images = getReadmeImages(data, locale);
  const parts = [`<div align="${alignment}">`, ''];
  const avatar = images.find((image) => image.kind === 'avatar');
  if (avatar) parts.push(imageHtml(avatar), '');
  if (data.title.trim()) parts.push(`<h1>${escapeMarkdown(data.title.trim())}</h1>`, '');
  if (data.subtitle.trim()) parts.push(`<h3>${escapeMarkdown(data.subtitle.trim())}</h3>`, '');
  const typing = images.find((image) => image.kind === 'typing');
  if (typing) parts.push(imageHtml(typing), '');
  if (data.location.trim()) parts.push(`<p>${escapeMarkdown(data.location.trim())}</p>`, '');
  if (data.about.trim()) parts.push(`<p>${escapeMarkdown(data.about.trim())}</p>`, '');
  const links = getReadmeLinks(data, locale);
  if (links.length) parts.push(`<p>${links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join(' · ')}</p>`, '');
  const skills = images.filter((image) => image.kind === 'skill');
  if (skills.length) parts.push(`<h2>${escapeHtml(copy.skillsHeading)}</h2>`, '<p>', ...skills.map(imageHtml), '</p>', '');
  const widgets = images.filter((image) => image.kind === 'widget');
  if (widgets.length) parts.push(`<h2>${escapeHtml(copy.activityHeading)}</h2>`, ...widgets.map((image) => `<p>${imageHtml(image)}</p>`), '');
  if (parts.length === 2) parts.push(`<!-- ${copy.emptySource} -->`, '');
  parts.push('</div>', '');
  return parts.join('\n');
}

/** Only a syntactically valid username enters YAML. No user-provided shell commands or secrets. */
export function generateSnakeWorkflow(username: string): string {
  if (!validGithubUsername(username)) return '';
  return `name: Generate contribution snake

on:
  workflow_dispatch:
  schedule:
    - cron: "17 3 * * *"

concurrency:
  group: contribution-snake
  cancel-in-progress: false

permissions:
  contents: read

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: write
    steps:
      # Review third-party actions before enabling this workflow.
      # For stricter supply-chain controls, pin reviewed versions to full commit SHAs.
      - name: Generate SVGs from public contributions
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: "${username.trim()}"
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      # This dedicated branch must contain generated files only.
      - name: Publish SVGs to snake-output
        uses: crazy-max/ghaction-github-pages@v5
        with:
          target_branch: snake-output
          build_dir: dist
          keep_history: true
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
}
export const README_SERVICE_DOCS = [
  { name: 'Shields', url: 'https://shields.io/badges/static-badge' },
  { name: 'Skill Icons', url: 'https://github.com/tandpfun/skill-icons' },
  { name: 'GitHub Stats Extended', url: 'https://github.com/stats-organization/github-stats-extended' },
  { name: 'Streak Stats', url: 'https://github.com/DenverCoder1/github-readme-streak-stats' },
  { name: 'Typing SVG', url: 'https://github.com/DenverCoder1/readme-typing-svg' },
  { name: 'Profile Trophy', url: 'https://github.com/ryo-ma/github-profile-trophy' },
  { name: 'Activity Graph', url: 'https://github.com/Ashutosh00710/github-readme-activity-graph' },
  { name: 'Contribution Snake', url: 'https://github.com/Platane/snk' },
  { name: 'SVG branch publisher', url: 'https://github.com/crazy-max/ghaction-github-pages' },
];
