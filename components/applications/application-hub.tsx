'use client';
import { useState } from 'react';
import { ArrowRight, FileImage, Search, Smile, CodeXml, ShieldCheck, Layers3, Sparkles, Files, Gamepad2 } from 'lucide-react';
import { applicationIds, getApplicationCopy, type ApplicationCategory } from '@/lib/applications/catalog';
import { localePath, type Locale } from '@/lib/i18n';

const icons = { 'file-converter': FileImage, 'meme-generator': Smile, 'readme-generator': CodeXml, 'tic-tac-toe': Gamepad2 };
const categoryIcons = { all: Layers3, files: Files, creative: Sparkles, developer: CodeXml, games: Gamepad2 };
export function ApplicationHub({ locale }: { locale: Locale }) {
  const copy = getApplicationCopy(locale);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ApplicationCategory>('all');
  const needle = query.trim().toLocaleLowerCase(locale);
  const matches = applicationIds.filter(id => {
    const app = copy.apps[id];
    return (category === 'all' || app.category === category) && `${app.name} ${app.description} ${app.tags.join(' ')}`.toLocaleLowerCase(locale).includes(needle);
  });
  return <>
    <div className="application-discovery">
      <div className="application-search"><Search aria-hidden="true" size={20} /><label className="sr-only" htmlFor="application-search">{copy.search}</label><input id="application-search" type="search" placeholder={copy.searchHint} value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="application-categories" aria-label={copy.label}>{(Object.keys(copy.categories) as ApplicationCategory[]).map(id => { const Icon = categoryIcons[id]; return <button key={id} type="button" aria-pressed={category === id} onClick={() => setCategory(id)}><Icon size={17} aria-hidden="true" />{copy.categories[id]}</button>; })}</div>
    </div>
    <div className="application-grid" aria-live="polite">{matches.map(id => {
      const app = copy.apps[id]; const Icon = icons[id];
      return <a className={`application-card application-${id}`} href={localePath(locale, `/applications/${id}`)} key={id}>
        <div className="application-art" aria-hidden="true"><Icon size={58} strokeWidth={1.3} /><span>{id === 'file-converter' ? '01' : id === 'meme-generator' ? '02' : id === 'readme-generator' ? '03' : '04'}</span></div>
        <div className="application-card-content"><span className="application-category">{copy.categories[app.category]}</span><h2>{app.name}</h2><p>{app.description}</p><ul className="application-tags">{app.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><span className="application-open">{copy.open}<ArrowRight size={18} aria-hidden="true" /></span></div>
      </a>;
    })}</div>
    {!matches.length && <div className="application-empty"><p>{copy.noResults}</p><button className="button" type="button" onClick={() => { setQuery(''); setCategory('all'); }}>{copy.reset}</button></div>}
    <aside className="application-privacy"><ShieldCheck size={22} aria-hidden="true" /><p>{copy.privacy}</p><span>{copy.free}</span></aside>
    <section className="application-capabilities"><span className="eyebrow">{copy.support}</span><h2>{copy.capabilities}</h2><div><p><strong>{copy.available}</strong><br />JPEG · PNG · WebP → JPEG / PNG / WebP / PDF<br />CSV ↔ JSON · PNG · Markdown · YAML</p><p><strong>{copy.unsupported}</strong><br />{copy.limit}</p></div></section>
  </>;
}
