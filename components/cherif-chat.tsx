'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '@/lib/site-data';
import { getPortfolioData } from '@/lib/portfolio-content';
import { getDictionary, localePath, type Locale } from '@/lib/i18n';
import { assetUrl } from '@/lib/assets';

type Message = { role: 'assistant' | 'user'; text: string; sources?: string[] };
type Answer = { text: string; sources: string[] };

function answerFor(question: string, locale: Locale): Answer {
  const copy = getDictionary(locale);
  const { profile, projects, experiences, skills } = getPortfolioData(locale);
  const query = question.toLocaleLowerCase();
  const publicProjects = projects.filter((project) => project.link).map((project) => project.title).join(', ');
  const responses = {
    fr: {
      path: `${profile.role}, basé à ${profile.location}. Son parcours relie ${experiences.slice(0, 3).map((item) => `${item.company} (${item.period})`).join(' · ')}.`,
      projects: `Les projets avec un lien public incluent ${publicProjects}. Consultez les fiches pour connaître les sources et les limites de chaque présentation.`,
      skills: `Cherif maintient une bibliothèque privée de 80 compétences IA spécialisées. ${skills.map((group) => `${group.label} : ${group.items}`).join(' | ')}`,
      atlas: projects.find((project) => /Atlas|homelab/i.test(project.title))?.description || profile.bio,
      telegram: projects.find((project) => /Telegram/i.test(project.title))?.description || profile.bio,
      contact: `Pour collaborer, écrivez à ${profile.email}. ${profile.bio}`,
      tools: 'Trois applications sont disponibles : conversion de fichiers, studio de mèmes et générateur de README GitHub. Les fichiers sont traités localement ; les aperçus README externes sont facultatifs.',
      fallback: `Je peux vous renseigner sur le parcours, les projets publics, la bibliothèque de Skills, Atlas, les bots Telegram, les outils ou le contact de ${profile.shortName}.`,
    },
    en: {
      path: `Cherif is a Full-Stack Engineer and educator based in ${profile.location}. His path connects ${experiences.slice(0, 3).map((item) => `${item.company} (${item.period})`).join(' · ')}.`,
      projects: `Projects with public links include ${publicProjects}. Each project card explains its sources and presentation limits.`,
      skills: `Cherif maintains a private library of 80 specialized AI skills. ${skills.map((group) => group.items).join(' | ')}`,
      atlas: projects.find((project) => /Atlas|homelab/i.test(project.title))?.description || profile.bio,
      telegram: projects.find((project) => /Telegram/i.test(project.title))?.description || profile.bio,
      contact: `To collaborate, write to ${profile.email}. He designs systems that save time, reduce operating costs and make expertise transferable.`,
      tools: 'Three applications are available: file conversion, meme creation and GitHub README generation. Files are processed locally; external README previews are optional.',
      fallback: `Ask me about Cherif’s path, public projects, Skills library, Atlas, Telegram bots, tools or contact details.`,
    },
    zh: {
      path: `Cherif 是一位常驻 ${profile.location} 的全栈工程师与培训师。他的经历包括 ${experiences.slice(0, 3).map((item) => `${item.company}（${item.period}）`).join(' · ')}。`,
      projects: `提供公开链接的项目包括 ${publicProjects}。项目卡片说明各自的信息来源和展示范围。`,
      skills: `Cherif 维护一个包含 80 项专业 AI Skills 的私有库。${skills.map((group) => group.items).join(' | ')}`,
      atlas: projects.find((project) => /Atlas|homelab/i.test(project.title))?.description || profile.bio,
      telegram: projects.find((project) => /Telegram/i.test(project.title))?.description || profile.bio,
      contact: `如需合作，请联系 ${profile.email}。`,
      tools: '提供文件转换、表情包制作和 GitHub README 生成三个应用。文件在本地处理，外部 README 预览由用户选择启用。',
      fallback: '你可以询问 Cherif 的经历、公开项目、Skills 库、Atlas、Telegram 机器人、工具或联系方式。',
    },
    ja: {
      path: `Cherif は ${profile.location} を拠点とするフルスタックエンジニア兼講師です。経歴は ${experiences.slice(0, 3).map((item) => `${item.company}（${item.period}）`).join(' · ')} につながっています。`,
      projects: `公開リンクのあるプロジェクトは ${publicProjects} です。各カードに情報源と紹介範囲を示しています。`,
      skills: `Cherif は 80の専門的な AI Skills をまとめた非公開ライブラリを運用しています。${skills.map((group) => group.items).join(' | ')}`,
      atlas: projects.find((project) => /Atlas|homelab/i.test(project.title))?.description || profile.bio,
      telegram: projects.find((project) => /Telegram/i.test(project.title))?.description || profile.bio,
      contact: `協業については ${profile.email} までご連絡ください。`,
      tools: 'ファイル変換、ミーム作成、GitHub README 作成の3つのアプリがあります。ファイルはローカル処理で、外部プレビューは任意です。',
      fallback: 'Cherif の経歴、公開プロジェクト、Skills ライブラリ、Atlas、Telegram ボット、ツール、連絡先について質問できます。',
    },
  }[locale];
  if (/atlas|homelab|serveur|infrastructure|基础设施|インフラ/.test(query)) return { text: responses.atlas, sources: [copy.chat.sourceProjects, copy.chat.sourceSkills] };
  if (/telegram|bot|notification|alerte|机器人|通知|ボット/.test(query)) return { text: responses.telegram, sources: [copy.chat.sourceProjects] };
  if (/compétence|skill|stack|tech|技能|スキル/.test(query)) return { text: responses.skills, sources: [copy.chat.sourceSkills] };
  if (/parcours|expérience|experience|career|经历|経歴/.test(query)) return { text: responses.path, sources: [copy.chat.sourceExperience] };
  if (/projet|project|public|portfolio|项目|プロジェクト/.test(query)) return { text: responses.projects, sources: [copy.chat.sourceProjects] };
  if (/contact|mail|travailler|collabor|合作|連絡/.test(query)) return { text: responses.contact, sources: [copy.chat.sourceProfile] };
  if (/application|outil|tool|webp|mème|meme|readme|工具|应用|ツール|アプリ/.test(query)) return { text: responses.tools, sources: [copy.chat.sourceTools] };
  return { text: responses.fallback, sources: [copy.chat.sourceProfile, copy.chat.sourceProjects] };
}

function sourceHref(source: string, locale: Locale, copy: ReturnType<typeof getDictionary>) {
  if (source === copy.chat.sourceProfile) return profile.linkedin;
  if (source === copy.chat.sourceProjects) return profile.github;
  if (source === copy.chat.sourceExperience) return assetUrl('/documents/CV-Cherif-Diouf.pdf');
  if (source === copy.chat.sourceTools) return localePath(locale, '/applications');
  if (source === copy.chat.sourceSkills) return `${localePath(locale)}#projects`;
}

export function CherifChat({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: copy.chat.initial, sources: [copy.chat.sourceProfile, copy.chat.sourceProjects] },
  ]);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!panelRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(panelRef.current, { y: 18, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: .35, ease: 'power3.out' });
  }, [open]);

  const ask = (question: string) => {
    const clean = question.trim();
    if (!clean) return;
    const answer = answerFor(clean, locale);
    setMessages((current) => [...current, { role: 'user', text: clean }, { role: 'assistant', text: answer.text, sources: answer.sources }]);
    setDraft('');
  };

  return <>
    <button className={`chat-launcher ${open ? 'is-open' : ''}`} type="button" aria-expanded={open} aria-controls="cherif-chat-panel" onClick={() => setOpen((value) => !value)}>
      <span>+</span> {copy.chat.title}
    </button>
    {open && <section className="chat-panel" id="cherif-chat-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="cherif-chat-title">
      <div className="chat-panel-head"><div className="chat-identity"><img src={assetUrl('/media/photo.webp')} alt="" /><div><span className="chat-status"><i /> {copy.chat.available}</span><strong id="cherif-chat-title">{copy.chat.title}</strong><small>{copy.chat.local} · CV · GitHub · projets</small></div></div><button type="button" aria-label={copy.chat.close} onClick={() => setOpen(false)}>×</button></div>
      <div className="chat-messages" aria-live="polite">{messages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><span className="chat-avatar" aria-hidden="true">{message.role === 'assistant' ? <img src={assetUrl('/media/photo.webp')} alt="" /> : '→'}</span><div className="chat-message-body"><p>{message.text}</p>{message.sources && <div className="chat-sources"><small>{copy.chat.source}</small>{message.sources.map((source) => { const href = sourceHref(source, locale, copy); return href ? <a href={href} key={source} target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{source} ↗</a> : <span key={source}>{source}</span>; })}</div>}</div></div>)}</div>
      <div className="chat-suggestions">{copy.chat.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>
      <form className="chat-form" onSubmit={(event) => { event.preventDefault(); ask(draft); }}><input aria-label={copy.chat.placeholder} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={copy.chat.placeholder} /><button type="submit" aria-label={copy.chat.send}>↗</button></form>
      <small>{copy.chat.local} · {copy.chat.sourceProfile}</small>
    </section>}
  </>;
}
