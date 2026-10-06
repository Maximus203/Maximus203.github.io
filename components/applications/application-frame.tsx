import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { getApplicationCopy, type ApplicationId } from '@/lib/applications/catalog';
import { localePath, type Locale } from '@/lib/i18n';
export function ApplicationFrame({ locale, id, children }: { locale: Locale; id: ApplicationId; children: React.ReactNode }) {
  const copy = getApplicationCopy(locale); const app = copy.apps[id];
  return <div className="content-page application-workspace"><a className="application-back" href={localePath(locale, '/applications')}><ArrowLeft size={16} aria-hidden="true" />{copy.back}</a><header className="application-heading"><div><span className="eyebrow">{copy.label} / {copy.categories[app.category]}</span><h1>{app.name}</h1><p>{app.description}</p></div><span className="application-local"><ShieldCheck size={17} aria-hidden="true" />{copy.local}</span></header>{children}</div>;
}
