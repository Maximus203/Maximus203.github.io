import { useEffect } from 'react';
import { useAppStore } from '../store';
import { UI_LABELS } from '../constants';

export const useSEO = () => {
  const { view, lang } = useAppStore();
  const labels = UI_LABELS[lang];

  useEffect(() => {
    let title = labels.seoHomeTitle;
    let description = labels.seoHomeDesc;

    switch (view) {
      case 'gallery':
        title = labels.seoGalleryTitle;
        description = labels.seoGalleryDesc;
        break;
      case 'tools':
        title = labels.seoToolsTitle;
        description = labels.seoToolsDesc;
        break;
      case 'readme_generator':
        title = `${labels.toolReadme} | ${labels.seoToolsTitle}`;
        description = labels.toolReadmeDesc;
        break;
      case 'converter':
        title = `${labels.toolConverter} | ${labels.seoToolsTitle}`;
        description = labels.toolConverterDesc;
        break;
      case 'meme':
        title = `${labels.toolMeme} | ${labels.seoToolsTitle}`;
        description = labels.toolMemeDesc;
        break;
      case 'home':
      default:
        title = labels.seoHomeTitle;
        description = labels.seoHomeDesc;
        break;
    }

    // Update Title
    document.title = title;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Optional: Update Open Graph tags if they existed, but for now basic SEO is requested.

  }, [view, lang, labels]);
};