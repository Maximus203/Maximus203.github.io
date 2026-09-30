import type { Metadata } from 'next';
import { DimensionalPortrait } from '@/components/dimensional-portrait';
import { PageIntro } from '@/components/page-intro';
import { ProjectCard } from '@/components/project-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Lab3DObject } from '@/components/lab-3d-object';
import { experiences, profile, projects, skills } from '@/lib/site-data';
import { getDictionary, isLocale, languageAlternates, localePath, type Locale } from '@/lib/i18n';

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'fr';
  const [title, description] = getDictionary(locale).seo.home;
  return { title, description, alternates: { canonical: localePath(locale), languages: languageAlternates() }, openGraph: { title, description, url: localePath(locale), images: ['/media/photo.webp'] } };
}

export default async function HomePage({ params }: Params) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : 'fr';
  const copy = getDictionary(locale);
  const home = copy.home;
  return <>
    <section className="home-hero">
      <div className="hero-copy"><span className="eyebrow">{home.eyebrow}</span><h1>{home.title[0]}<br /><em>{home.title[1]}</em><br />{home.title[2]}</h1><p>{home.bio}</p><div className="hero-actions"><a className="button button-primary" href="#projects">{home.primary} ↘</a><a className="button button-ghost" href={localePath(locale, '/tools')}>{home.secondary}</a></div><div className="hero-meta"><span>{home.availability}</span><span>{home.languages}</span></div></div>
      <DimensionalPortrait locale={locale} identity={home.identity} />
    </section>
    <section className="metric-band">{home.metrics.map((metric, index) => <div key={metric}><strong>{index === 0 ? profile.metric : index === 1 ? '80+' : '4'}</strong><span>{metric}</span></div>)}</section>
    <ScrollReveal><section className="split-section proof-section"><div><span className="eyebrow">{home.proofKicker}</span><h2>{home.proofTitle}</h2></div><div><p>{home.proofText}</p><a className="inline-link" href={localePath(locale, '/gallery')}>{home.proofLink} ↗</a></div></section></ScrollReveal>
    <section className="experience-section"><PageIntro index="03" kicker={home.experienceKicker} title={home.experienceTitle} text={home.experienceText} /><div className="timeline">{experiences.map((experience) => <article className="timeline-item" key={`${experience.company}-${experience.role}`}><span className="timeline-period">{experience.period}</span><div className="timeline-marker" /><div className="timeline-content"><div className="company-line">{experience.logo && <img src={experience.logo} alt="" />}<span>{experience.company}</span></div><h3>{experience.role}</h3><p>{experience.summary}</p></div></article>)}</div></section>
    <section className="lab-section"><div className="lab-copy"><span className="eyebrow">{home.labKicker}</span><h2>{home.labTitle}</h2><p>{home.labText}</p><a className="button button-secondary" href={localePath(locale, '/tools')}>{home.labCta} ↗</a></div><div className="lab-map" aria-label={home.labScene}><Lab3DObject locale={locale} /></div></section>
    <section className="skills-section"><PageIntro index="05" kicker={home.skillsKicker} title={home.skillsTitle} text={home.skillsText} /><div className="skills-grid">{skills.map((skill, index) => <article key={skill.label}><span>0{index + 1}</span><h3>{skill.label}</h3><p>{skill.items}</p></article>)}</div></section>
    <section id="projects" className="projects-section"><div className="section-heading"><div><span className="eyebrow">{home.projectsKicker}</span><h2>{home.projectsTitle}</h2></div><a className="inline-link" href={localePath(locale, '/projects')}>{home.projectsLink} ↗</a></div><div className="projects-grid">{projects.slice(0, 8).map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></section>
  </>;
}
