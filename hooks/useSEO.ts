import { useEffect } from 'react';
import { UI_LABELS } from '../constants';
import { useAppStore } from '../store';

export const useSEO = () => {
  const { view, lang } = useAppStore();
  const labels = UI_LABELS[lang];

  useEffect(() => {
    let title = labels.seoHomeTitle;
    let description = labels.seoHomeDesc;
    let canonicalUrl = 'https://maximus203.github.io/';

    switch (view) {
      case 'gallery':
        title = labels.seoGalleryTitle;
        description = labels.seoGalleryDesc;
        canonicalUrl = 'https://maximus203.github.io/#gallery';
        break;
      case 'tools':
        title = labels.seoToolsTitle;
        description = labels.seoToolsDesc;
        canonicalUrl = 'https://maximus203.github.io/#tools';
        break;
      case 'readme_generator':
        title = `${labels.toolReadme} | ${labels.seoToolsTitle}`;
        description = labels.toolReadmeDesc;
        canonicalUrl = 'https://maximus203.github.io/#readme-generator';
        break;
      case 'converter':
        title = `${labels.toolConverter} | ${labels.seoToolsTitle}`;
        description = labels.toolConverterDesc;
        canonicalUrl = 'https://maximus203.github.io/#image-converter';
        break;
      case 'meme':
        title = `${labels.toolMeme} | ${labels.seoToolsTitle}`;
        description = labels.toolMemeDesc;
        canonicalUrl = 'https://maximus203.github.io/#meme-generator';
        break;
      case 'home':
      default:
        title = labels.seoHomeTitle;
        description = labels.seoHomeDesc;
        canonicalUrl = 'https://maximus203.github.io/';
        break;
    }

    // Update Title
    document.title = title;

    // Update or Create Meta Description
    const updateOrCreateMeta = (selector: string, attribute: string, value: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.setAttribute(attribute, value);
      } else {
        meta = document.createElement('meta');
        const attrName = selector.includes('[name=') ? 'name' : 'property';
        const attrValue = selector.match(/["']([^"']+)["']/)?.[1] || '';
        meta.setAttribute(attrName, attrValue);
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }
    };

    // Update Basic Meta Tags
    updateOrCreateMeta('meta[name="description"]', 'content', description);

    // Update Open Graph Tags
    updateOrCreateMeta('meta[property="og:title"]', 'content', title);
    updateOrCreateMeta('meta[property="og:description"]', 'content', description);
    updateOrCreateMeta('meta[property="og:url"]', 'content', canonicalUrl);

    // Update Twitter Card Tags
    updateOrCreateMeta('meta[name="twitter:title"]', 'content', title);
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', description);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Update HTML lang attribute based on selected language
    document.documentElement.lang = lang;

  }, [view, lang, labels]);
};