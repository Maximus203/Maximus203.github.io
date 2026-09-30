export function PageIntro({ index, kicker, title, text, action }: { index: string; kicker: string; title: string; text: string; action?: { label: string; href: string } }) {
  return <section className="page-intro"><span className="section-number">{index}</span><div><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p>{action && <a className="button button-primary" href={action.href}>{action.label} ↗</a>}</div></section>;
}
