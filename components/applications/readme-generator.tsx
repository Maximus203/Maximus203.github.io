'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { AlignCenter, AlignLeft, AlignRight, Braces, Check, ChevronRight, Code2, Copy, Download, Eye, FileCode2, Globe, ImageOff, Layers, Link2, LockKeyhole, Palette, Search, ShieldCheck, Sparkles, Terminal, UserRound } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { readmeCopy, type ReadmeCopy } from '@/lib/applications/readme-copy';
import { createReadmeData, generateReadme, generateSnakeWorkflow, getReadmeErrors, getReadmeImageHosts, getReadmeImages, getReadmeLinks, getReadmeTheme, README_FONTS, README_SERVICE_DOCS, README_THEMES, selectedReadmeSkills, SKILL_CATEGORIES, SKILLS, validGithubUsername, WIDGET_KEYS, type ReadmeData, type ReadmeImage, type UrlField } from '@/lib/applications/readme';
import styles from './readme-generator.module.css';

// GitHub's Octocat mark (Simple Icons, CC0); bundled locally so the editor does not phone home.
function GitHubMark({ size = 24 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.467-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.647 1.653.242 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
}

type EditorSection = 'profile' | 'skills' | 'appearance';
type OutputSection = 'preview' | 'source' | 'workflow';
type TextFieldKey = 'title' | 'subtitle' | 'about' | 'location' | 'typingLines' | UrlField;

function RemoteImage({ item, enabled, copy }: { item: ReadmeImage; enabled: boolean; copy: ReadmeCopy }) {
  const [failed, setFailed] = useState(false);
  if (!enabled || failed) return <div className={`${styles.imagePlaceholder} ${item.kind === 'skill' ? styles.skillPlaceholder : ''}`}>
    <ImageOff size={17} aria-hidden="true" />
    <span><strong>{item.alt}</strong><small>{failed ? copy.imageFailed : copy.imageBlocked}</small></span>
  </div>;
  return <img className={`${styles.remoteImage} ${item.kind === 'avatar' ? styles.avatar : ''}`} src={item.src} alt={item.alt} width={item.width} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

export function ReadmeGenerator({ locale }: { locale: Locale }) {
  const copy = readmeCopy[locale];
  const id = useId();
  const [data, setData] = useState<ReadmeData>(createReadmeData);
  const [editorSection, setEditorSection] = useState<EditorSection>('profile');
  const [outputSection, setOutputSection] = useState<OutputSection>('preview');
  const [skillSearch, setSkillSearch] = useState('');
  const [approvedSources, setApprovedSources] = useState<string[]>([]);
  const [previewAttempt, setPreviewAttempt] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [copying, setCopying] = useState(false);
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const manualCopySource = useRef<string | null>(null);
  const editorRevision = useRef(0);
  const copyOperation = useRef(0);
  const pendingCopy = useRef(false);
  useEffect(() => () => { editorRevision.current += 1; copyOperation.current += 1; }, []);
  const errors = getReadmeErrors(data);
  const validUsername = validGithubUsername(data.username);
  const markdown = generateReadme(data, locale);
  const workflow = data.widgets.snake ? generateSnakeWorkflow(data.username) : '';
  const source = outputSection === 'workflow' ? workflow : markdown;
  const filename = outputSection === 'workflow' ? 'snake.yml' : 'README.md';
  const images = getReadmeImages(data, locale);
  const hosts = getReadmeImageHosts(data, locale);
  const selectedSkills = selectedReadmeSkills(data);
  const theme = getReadmeTheme(data.theme);
  const links = getReadmeLinks(data, locale);
  const hasBlockedImages = images.some((item) => !approvedSources.includes(item.src));
  const hasApprovedImages = images.some((item) => approvedSources.includes(item.src));
  const canExport = errors.length === 0 && Boolean(source);
  const visibleSkills = SKILLS.filter((skill) => skill.name.toLowerCase().includes(skillSearch.trim().toLowerCase()));
  const hasProfileContent = Boolean(data.title.trim() || data.subtitle.trim() || data.about.trim() || data.location.trim() || images.length || links.length);

  function invalidatePendingCopy() {
    editorRevision.current += 1;
    copyOperation.current += 1;
    pendingCopy.current = false;
    manualCopySource.current = null;
    setCopying(false);
  }
  function update<K extends keyof ReadmeData>(key: K, value: ReadmeData[K]) {
    invalidatePendingCopy();
    setData((previous) => ({ ...previous, [key]: value }));
    setFeedback('');
  }
  function changeOutput(section: OutputSection) { invalidatePendingCopy(); setOutputSection(section); setFeedback(''); }
  function toggleSkill(name: string) { update('skills', data.skills.includes(name) ? data.skills.filter((skill) => skill !== name) : [...data.skills, name]); }
  function loadImages() {
    setApprovedSources(images.map((item) => item.src));
    setPreviewAttempt((attempt) => attempt + 1);
  }
  async function copySource() {
    if (!canExport || pendingCopy.current) return;
    const content = source;
    const revision = editorRevision.current;
    const operation = ++copyOperation.current;
    const isCurrent = () => revision === editorRevision.current && operation === copyOperation.current;
    pendingCopy.current = true;
    setCopying(true);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(content);
      if (!isCurrent()) return;
      setFeedback(copy.copied);
    } catch {
      if (!isCurrent()) return;
      manualCopySource.current = content;
      setOutputSection(outputSection === 'workflow' ? 'workflow' : 'source');
      setFeedback(copy.copyFailed);
      // The callback ref below selects after React has mounted the source view.
      if (sourceRef.current) { sourceRef.current.focus(); sourceRef.current.select(); }
    } finally {
      // An old request must not clear the busy state of a newer copy operation.
      if (isCurrent()) { pendingCopy.current = false; setCopying(false); }
    }
  }
  function downloadSource() {
    if (!canExport) return;
    invalidatePendingCopy();
    try {
      const blob = new Blob([source], { type: outputSection === 'workflow' ? 'application/yaml;charset=utf-8' : 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url; anchor.download = filename;
      document.body.appendChild(anchor); anchor.click(); anchor.remove();
      // Give the browser time to consume the URL before releasing the object.
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      setFeedback(`${filename} · ${copy.downloaded}`);
    } catch { setFeedback(copy.downloadFailed); }
  }
  function reset() {
    if (!window.confirm(copy.resetConfirm)) return;
    invalidatePendingCopy();
    setData(createReadmeData()); setApprovedSources([]); setSkillSearch(''); setFeedback('');
    setEditorSection('profile'); setOutputSection('preview');
  }
  function field(key: TextFieldKey, label: string, placeholder = '', multiline = false, hint?: string) {
    const error = errors.includes(key as UrlField);
    const inputId = `${id}-${key}`;
    return <div className={styles.field} key={key}>
      <label htmlFor={inputId}>{label} <span>{copy.optional}</span></label>
      {multiline ? <textarea id={inputId} value={data[key]} rows={4} maxLength={1500} placeholder={placeholder} onChange={(event) => update(key, event.target.value)} /> : <input id={inputId} type={key.endsWith('Url') ? 'url' : 'text'} value={data[key]} maxLength={key.endsWith('Url') ? 2048 : 300} placeholder={placeholder} onChange={(event) => update(key, event.target.value)} aria-invalid={error || undefined} aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined} />}
      {hint && <p className={styles.hint} id={`${inputId}-hint`}>{hint}</p>}
      {error && <p className={styles.error} id={`${inputId}-error`}>{copy.invalidUrl}</p>}
    </div>;
  }
  function sectionHeading(icon: ReactNode, label: string, detail?: string) { return <div className={styles.sectionHeading}>{icon}<h3>{label}</h3>{detail && <span>{detail}</span>}</div>; }
  function previewImages(kind: ReadmeImage['kind']) {
    return images.filter((item) => item.kind === kind).map((item) => <RemoteImage key={`${item.src}-${previewAttempt}`} item={item} enabled={approvedSources.includes(item.src)} copy={copy} />);
  }

  return <section className={styles.builder} data-testid="readme-workbench" aria-label={copy.builder}>
    <div className={styles.identityBar}>
      <div className={styles.identityIcon}><GitHubMark size={27} aria-hidden="true" /></div>
      <div className={styles.usernameField}>
        <label htmlFor={`${id}-username`}>{copy.username}</label>
        <div className={styles.usernameInput}><span aria-hidden="true">github.com/</span><input id={`${id}-username`} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={39} placeholder="your-username" value={data.username} onChange={(event) => update('username', event.target.value)} aria-invalid={errors.includes('username') || undefined} aria-describedby={`${id}-username-help${errors.includes('username') ? ` ${id}-username-error` : ''}`} /></div>
        <p id={`${id}-username-help`}>{copy.usernameHelp}</p>
        {errors.includes('username') && <p className={styles.error} id={`${id}-username-error`}>{copy.usernameError}</p>}
      </div>
      <span className={styles.privacyBadge}><ShieldCheck size={16} aria-hidden="true" />{copy.local}</span>
    </div>

    <div className={styles.workspace}>
      <div className={styles.editor}>
        <div className={styles.editorNav} role="group" aria-label={copy.builder}>
          {([['profile', UserRound], ['skills', Layers], ['appearance', Palette]] as const).map(([section, Icon], index) => <button type="button" key={section} aria-pressed={editorSection === section} onClick={() => setEditorSection(section)}><Icon size={17} aria-hidden="true" /><span>{copy[section]}</span><small aria-hidden="true">0{index + 1}</small></button>)}
        </div>
        <div className={styles.editorBody}>
          {editorSection === 'profile' && <>
            {sectionHeading(<UserRound size={18} aria-hidden="true" />, copy.profile)}
            {field('title', copy.title, copy.titlePlaceholder)}
            {field('subtitle', copy.subtitle, copy.subtitlePlaceholder)}
            {field('about', copy.about, copy.aboutPlaceholder, true)}
            {field('location', copy.location, copy.locationPlaceholder)}
            {field('avatarUrl', copy.avatar, copy.urlPlaceholder)}
            <div className={styles.divider} />
            {sectionHeading(<Link2 size={18} aria-hidden="true" />, copy.links)}
            {field('portfolioUrl', copy.portfolio, copy.urlPlaceholder)}
            {field('linkedinUrl', copy.linkedin, 'https://www.linkedin.com/in/…')}
            {field('resumeUrl', copy.resume, copy.urlPlaceholder)}
            <div className={styles.divider} />
            {sectionHeading(<Sparkles size={18} aria-hidden="true" />, copy.typing)}
            {field('typingLines', copy.typing, copy.typingPlaceholder, false, copy.typingHelp)}
          </>}
          {editorSection === 'skills' && <>
            {sectionHeading(<Layers size={18} aria-hidden="true" />, copy.skills, `${selectedSkills.length} ${copy.selected}`)}
            <fieldset className={styles.options}><legend>{copy.skillStyle}</legend><div className={styles.segmented}>{(['badges', 'icons'] as const).map((style) => <button type="button" key={style} aria-pressed={data.skillStyle === style} onClick={() => update('skillStyle', style)}>{style === 'badges' ? <Braces size={16} aria-hidden="true" /> : <Layers size={16} aria-hidden="true" />}{copy[style]}</button>)}</div></fieldset>
            <div className={styles.field}><label htmlFor={`${id}-skill-search`}>{copy.skillSearch}</label><div className={styles.searchInput}><Search size={17} aria-hidden="true" /><input id={`${id}-skill-search`} type="search" placeholder={copy.skillSearchPlaceholder} value={skillSearch} onChange={(event) => setSkillSearch(event.target.value)} /></div></div>
            {selectedSkills.length > 0 && <div className={styles.selectedSkills}><div>{selectedSkills.map((skill) => <button type="button" key={skill.name} onClick={() => toggleSkill(skill.name)} aria-label={`${copy.clearSkills}: ${skill.name}`}>{skill.name}<span aria-hidden="true">×</span></button>)}</div><button type="button" className={styles.textButton} onClick={() => update('skills', [])}>{copy.clearSkills}</button></div>}
            <p className={styles.hint}>{copy.noSkills}</p>
            {SKILL_CATEGORIES.map((category) => {
              const skills = visibleSkills.filter((skill) => skill.category === category);
              return skills.length > 0 && <fieldset className={styles.skillGroup} key={category}><legend>{copy[category]}</legend><div>{skills.map((skill) => <button type="button" key={skill.name} aria-pressed={data.skills.includes(skill.name)} onClick={() => toggleSkill(skill.name)}><i style={{ backgroundColor: `#${skill.color}` }} aria-hidden="true" />{skill.name}{data.skills.includes(skill.name) && <Check size={13} aria-hidden="true" />}</button>)}</div></fieldset>;
            })}
            {visibleSkills.length === 0 && <p role="status">{copy.noResults}</p>}
          </>}
          {editorSection === 'appearance' && <>
            {sectionHeading(<Palette size={18} aria-hidden="true" />, copy.appearance)}
            <fieldset className={styles.options}><legend>{copy.theme}</legend><div className={styles.themeGrid}>{README_THEMES.map((item) => <button type="button" key={item.id} aria-pressed={data.theme === item.id} onClick={() => update('theme', item.id)}><span className={styles.themeSample} style={{ backgroundColor: `#${item.background}`, color: `#${item.accent}` }} aria-hidden="true">Aa<i style={{ backgroundColor: `#${item.accent}` }} /></span><span>{item.id}</span>{data.theme === item.id && <Check size={13} aria-hidden="true" />}</button>)}</div></fieldset>
            <p className={styles.hint}>{copy.themeHelp}</p>
            <div className={styles.field}><label htmlFor={`${id}-font`}>{copy.font}</label><select id={`${id}-font`} value={data.font} onChange={(event) => update('font', event.target.value as ReadmeData['font'])}>{README_FONTS.map((font) => <option key={font} value={font}>{font}</option>)}</select></div>
            <fieldset className={styles.options}><legend>{copy.alignment}</legend><div className={styles.segmented}>{([['left', AlignLeft], ['center', AlignCenter], ['right', AlignRight]] as const).map(([alignment, Icon]) => <button type="button" key={alignment} aria-pressed={data.alignment === alignment} onClick={() => update('alignment', alignment)}><Icon size={17} aria-hidden="true" />{copy[alignment]}</button>)}</div></fieldset>
            <div className={styles.divider} />
            {sectionHeading(<GitHubMark size={18} aria-hidden="true" />, copy.widgets)}
            <p className={styles.hint}>{copy.widgetHelp}</p>
            {!validUsername && <p className={styles.notice}>{copy.usernameRequired}</p>}
            <div className={styles.widgetList}>{WIDGET_KEYS.map((widget) => <label key={widget} className={`${styles.widget} ${data.widgets[widget] ? styles.widgetSelected : ''}`}><input type="checkbox" checked={data.widgets[widget]} onChange={(event) => update('widgets', { ...data.widgets, [widget]: event.target.checked })} /><span>{copy[widget]}{widget === 'snake' && <small>{copy.snakeHelp}</small>}{widget === 'visitors' && <small>{copy.visitorsHelp}</small>}</span></label>)}</div>
          </>}
        </div>
        <div className={styles.editorFooter}><LockKeyhole size={14} aria-hidden="true" /><p>{copy.footer}</p><button type="button" className={styles.textButton} onClick={reset}>{copy.reset}</button></div>
      </div>

      <div className={styles.output}>
        <div className={styles.outputHeader}><span><FileCode2 size={19} aria-hidden="true" />{copy.output}</span><small>{validUsername ? `${data.username.trim()}/README.md` : 'README.md'}</small></div>
        <div className={styles.outputNav} role="group" aria-label={copy.output}>
          {([['preview', Eye], ['source', Code2], ['workflow', Terminal]] as const).map(([section, Icon]) => <button type="button" key={section} aria-pressed={outputSection === section} onClick={() => changeOutput(section)}><Icon size={15} aria-hidden="true" />{copy[section]}{section === 'workflow' && data.widgets.snake && <i aria-hidden="true" />}</button>)}
        </div>

        {outputSection === 'preview' ? <>
          <div className={styles.previewPrivacy}><div><ShieldCheck size={17} aria-hidden="true" /><strong>{copy.safePreview}</strong></div><p>{copy.previewHelp}</p>
            {images.length > 0 && <><p>{copy.remoteNotice}</p><details className={styles.hosts}><summary>{copy.providers} ({hosts.length})</summary><ul>{hosts.map((host) => <li key={host}>{host}</li>)}</ul></details><div className={styles.remoteActions}>
              <button type="button" className={styles.smallButton} onClick={loadImages}><Globe size={14} aria-hidden="true" />{hasBlockedImages ? copy.loadImages : copy.retryImages}</button>
              {hasApprovedImages && <button type="button" className={styles.textButton} onClick={() => setApprovedSources([])}>{copy.hideImages}</button>}
            </div></>}
          </div>
          <div className={styles.profilePreview} data-readme-preview data-testid="readme-preview" style={{ '--readme-bg': `#${theme.background}`, '--readme-text': `#${theme.foreground}`, '--readme-accent': `#${theme.accent}`, textAlign: data.alignment, alignItems: data.alignment === 'center' ? 'center' : data.alignment === 'right' ? 'flex-end' : 'flex-start' } as CSSProperties}>
            {!hasProfileContent && <div className={styles.emptyPreview}><div><GitHubMark size={44} aria-hidden="true" /></div><h3>{copy.emptyPreview}</h3><span>README.md</span></div>}
            {previewImages('avatar')}
            {data.title.trim() && <h2>{data.title}</h2>}
            {data.subtitle.trim() && <p className={styles.previewSubtitle}>{data.subtitle}</p>}
            {previewImages('typing')}
            {data.location.trim() && <p className={styles.previewLocation}><Globe size={13} aria-hidden="true" />{data.location}</p>}
            {data.about.trim() && <p className={styles.previewAbout}>{data.about}</p>}
            {links.length > 0 && <div className={styles.previewLinks}>{links.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{link.label}<ChevronRight size={13} aria-hidden="true" /></a>)}</div>}
            {selectedSkills.length > 0 && <div className={styles.previewSection}><h3>{copy.skillsHeading}</h3><div className={`${styles.previewSkills} ${data.skillStyle === 'icons' ? styles.iconSkills : ''}`} style={{ justifyContent: data.alignment === 'center' ? 'center' : data.alignment === 'right' ? 'flex-end' : 'flex-start' }}>{previewImages('skill')}</div></div>}
            {images.some((item) => item.kind === 'widget') && <div className={styles.previewSection}><h3>{copy.activityHeading}</h3><div className={styles.previewWidgets}>{previewImages('widget')}</div></div>}
            {data.widgets.snake && <p className={styles.snakePreviewNote}>{copy.snakeHelp}</p>}
          </div>
        </> : <div className={styles.sourcePanel}>
          <div className={styles.sourceFilename}><span aria-hidden="true">{outputSection === 'workflow' ? '$' : '#'} </span>{outputSection === 'workflow' ? '.github/workflows/snake.yml' : 'README.md'}</div>
          {source ? <textarea ref={(element) => { sourceRef.current = element; if (element && manualCopySource.current === source) { element.focus(); element.select(); manualCopySource.current = null; } }} aria-label={outputSection === 'workflow' ? copy.workflow : copy.source} data-testid="readme-source" className={styles.sourceCode} value={source} readOnly spellCheck={false} /> : <p className={styles.workflowEmpty}><Terminal size={30} aria-hidden="true" />{copy.workflowUnavailable}<button className={styles.smallButton} type="button" onClick={() => setEditorSection('appearance')}>{copy.appearance}<ChevronRight size={14} aria-hidden="true" /></button></p>}
        </div>}

        {outputSection === 'workflow' && workflow && <div className={styles.workflowInstructions}><h3>{copy.snakeSetup}</h3><ol>{copy.snakeSteps.map((step) => <li key={step}>{step.replace(/USERNAME/g, data.username.trim())}</li>)}</ol><p>{copy.snakePermission}</p></div>}
        <div className={styles.exportBar}>
          <div><button type="button" className={styles.primaryButton} data-testid="readme-copy" onClick={copySource} disabled={!canExport || copying}>{feedback === copy.copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copying ? copy.copying : copy.copy}</button><button type="button" className={styles.smallButton} data-testid="readme-download" onClick={downloadSource} disabled={!canExport}><Download size={16} aria-hidden="true" />{copy.download} {filename}</button></div>
          <p className={styles.feedback} role="status" aria-live="polite" aria-label={copy.status}>{errors.length > 0 ? copy.invalidFields : feedback}</p>
        </div>
        <div className={styles.publishHelp}><p>{copy.publishHelp}</p><a href="https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme" target="_blank" rel="noopener noreferrer">{copy.documentation}<ChevronRight size={13} aria-hidden="true" /></a><details><summary>{copy.services}</summary><ul>{README_SERVICE_DOCS.map((service) => <li key={service.name}><a href={service.url} target="_blank" rel="noopener noreferrer">{service.name} ↗</a></li>)}</ul></details></div>
      </div>
    </div>
  </section>;
}

export default ReadmeGenerator;
