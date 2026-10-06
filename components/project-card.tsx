import Image from 'next/image';
import { getPortfolioData, type Project } from '@/lib/portfolio-content';
import type { Locale } from '@/lib/i18n';

export function ProjectCard({ project, index, locale = 'fr' }: { project: Project; index: number; locale?: Locale }) {
  const copy = getPortfolioData(locale).projectCard;
  // A project description is not a screenshot. Private diagrams and generic
  // placeholders must not be presented as evidence of an application's UI.
  const hasPreview = Boolean(project.image) && !project.image.includes('project-placeholder') && !project.image.includes('/architecture/');
  const isAnimated = project.image.endsWith('.gif');
  return (
    <article className="project-card" data-project={project.id}>
      <div className={`project-image${hasPreview ? '' : ' is-placeholder'}`}>
        {hasPreview ? (
          <Image src={project.image} alt={`${copy.preview} · ${project.title}`} fill sizes="(max-width: 780px) 100vw, 50vw" unoptimized={isAnimated} />
        ) : (
          <div className="project-proof"><span>{copy.overview}</span><strong>{project.title}</strong><span>{copy.noPreview}</span></div>
        )}
      </div>
      <div className="project-card-body">
        <span className="card-index">{String(index + 1).padStart(2, '0')} / {project.access}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {(project.live || project.link) && <div className="project-links">
          {project.live && <a className="inline-link" href={project.live} target="_blank" rel="noreferrer">{copy.live} ↗</a>}
          {project.link && <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">GitHub ↗</a>}
        </div>}
      </div>
    </article>
  );
}
