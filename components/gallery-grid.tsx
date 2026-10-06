'use client';

import { useEffect, useState } from 'react';
import { galleryItems as sourceGalleryItems } from '@/lib/site-data';
import { getDictionary, type Locale } from '@/lib/i18n';

const galleryCopy = {
  fr: { open: 'Ouvrir la photo entière', close: 'Fermer la photo', photo: 'Photo', graduation: 'Remise de diplômes ESTM', workshop: 'Atelier ESTM' },
  en: { open: 'Open full photo', close: 'Close photo', photo: 'Photo', graduation: 'ESTM graduation', workshop: 'ESTM workshop' },
  zh: { open: '打开完整照片', close: '关闭照片', photo: '照片', graduation: 'ESTM 毕业典礼', workshop: 'ESTM 工作坊' },
  ja: { open: '写真を全体表示', close: '写真を閉じる', photo: '写真', graduation: 'ESTM 卒業式', workshop: 'ESTM ワークショップ' },
} as const;

export function GalleryGrid({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).gallery;
  const labels = galleryCopy[locale];
  const galleryItems = sourceGalleryItems.map((item, index) => { const title = item.title === 'Graduation ESTM' ? labels.graduation : item.title === 'Atelier ESTM' ? labels.workshop : item.title; return { ...item, title, alt: locale === 'fr' ? item.alt : `${title} · ${labels.photo} ${index + 1}` }; });
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<(typeof galleryItems)[number] | null>(null);
  const categories = ['all', ...new Set(galleryItems.map((item) => item.category))];
  const visible = filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter);
  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', closeOnEscape); };
  }, [selected]);

  return <>
    <div className="filter-row" aria-label={copy.filter}>{categories.map((category) => <button key={category} className={filter === category ? 'is-active' : ''} type="button" onClick={() => setFilter(category)}>{category === 'all' ? copy.all : copy.categories[category as keyof typeof copy.categories]}</button>)}</div>
    <div className="gallery-grid">{visible.map((item) => <figure key={item.image} className="gallery-item"><button type="button" className="gallery-image-button" onClick={() => setSelected(item)} aria-label={`${item.title} — ${labels.open}`}><img src={item.image} alt={item.alt} loading="lazy" /></button><figcaption><strong>{item.title}</strong><span>{copy.categories[item.category as keyof typeof copy.categories]}</span></figcaption></figure>)}</div>
    {selected && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}><button type="button" className="gallery-lightbox-close" autoFocus onClick={() => setSelected(null)} aria-label={labels.close}>×</button><figure onClick={(event) => event.stopPropagation()}><img src={selected.image} alt={selected.alt} /><figcaption><strong>{selected.title}</strong><span>{copy.categories[selected.category as keyof typeof copy.categories]}</span></figcaption></figure></div>}
  </>;
}
