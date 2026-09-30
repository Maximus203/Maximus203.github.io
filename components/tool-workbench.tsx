'use client';

import { useState } from 'react';
import { getDictionary, type Locale } from '@/lib/i18n';

export function ImageConverterTool({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).image;
  const [preview, setPreview] = useState<string | null>(null);
  const [download, setDownload] = useState<string | null>(null);
  return <section className="workbench"><label className="file-drop"><span>{copy.drop}</span><input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setPreview(String(reader.result)); reader.readAsDataURL(file); }} /></label>{preview && <><img className="tool-preview" src={preview} alt="Selected image preview" /><button className="button button-primary" type="button" onClick={() => { const image = new window.Image(); image.onload = () => { const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height; canvas.getContext('2d')?.drawImage(image, 0, 0); setDownload(canvas.toDataURL('image/webp', 0.82)); }; image.src = preview; }}>{copy.convert}</button>{download && <a className="button button-secondary" href={download} download="converted.webp">{copy.download} ↗</a>}</>}</section>;
}

export function MemeGeneratorTool({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).meme;
  const [top, setTop] = useState('UNE IDÉE');
  const [bottom, setBottom] = useState('UN SYSTÈME');
  return <section className="workbench"><div className="meme-preview"><div className="meme-background" aria-hidden="true" /><strong>{top}</strong><strong>{bottom}</strong></div><div className="form-grid"><label htmlFor="meme-top">{copy.top}<input id="meme-top" value={top} onChange={(event) => setTop(event.target.value)} /></label><label htmlFor="meme-bottom">{copy.bottom}<input id="meme-bottom" value={bottom} onChange={(event) => setBottom(event.target.value)} /></label></div><p className="muted">{copy.note}</p></section>;
}

export function ReadmeGeneratorTool({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).readme;
  const [name, setName] = useState('mon-projet');
  const [description, setDescription] = useState('Une courte description utile.');
  const output = `# ${name}\n\n${description}\n\n## Démarrage\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\``;
  return <section className="workbench"><div className="form-grid"><label htmlFor="readme-project-name">{copy.name}<input id="readme-project-name" value={name} onInput={(event) => setName(event.currentTarget.value)} /></label><label htmlFor="readme-description">{copy.description}<textarea id="readme-description" value={description} onInput={(event) => setDescription(event.currentTarget.value)} rows={3} /></label></div><pre className="readme-output"><code>{output}</code></pre><button className="button button-primary" type="button" onClick={() => navigator.clipboard?.writeText(output)}>{copy.copy}</button></section>;
}
