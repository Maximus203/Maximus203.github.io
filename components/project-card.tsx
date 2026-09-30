import Image from 'next/image';
import type { Project } from '@/lib/site-data';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPlaceholder = project.image.includes('project-placeholder');
  const isDiagram = project.image.includes('/architecture/');
  const isAnimated = project.image.endsWith('.gif');
  return (
    <article className="project-card">
      <div className={`project-image ${isPlaceholder ? 'is-placeholder' : ''} ${isDiagram ? 'is-diagram' : ''}`}><Image src={project.image} alt={isPlaceholder ? `Aperçu non disponible du projet ${project.title}` : isDiagram ? `Schéma d’architecture du projet ${project.title}` : `Aperçu réel du projet ${project.title}`} fill sizes="(max-width: 780px) 100vw, 50vw" unoptimized={isAnimated} /></div>
      <div className="project-card-body"><span className="card-index">{String(index + 1).padStart(2, '0')} / {project.access}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.live && <a className="inline-link" href={project.live} target="_blank" rel="noreferrer">Démo publique ↗</a>}{project.link && <a className="inline-link" href={project.link} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div>
    </article>
  );
}
