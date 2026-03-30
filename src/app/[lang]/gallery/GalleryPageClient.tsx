'use client';

import { motion } from 'framer-motion';
import GalleryCarousel from '@/components/gallery/GalleryCarousel';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getLabels, getResumeData } from '@/lib/i18n';
import type { Language } from '@/types';

export default function GalleryPageClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);
  const data = getResumeData(lang);

  const featuredGalleryItems = data.gallery.filter((item) => item.featured);
  const gridGalleryItems = data.gallery.filter((item) => !item.featured);

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{labels.galleryTitle}</h1>
        <p className="text-gray-600 dark:text-gray-400">{labels.gallerySubtitle}</p>
      </div>

      <GalleryCarousel items={featuredGalleryItems} />

      {gridGalleryItems.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4 mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">More moments</h2>
            <div className="h-px bg-gray-200 dark:bg-slate-800 flex-grow" />
          </div>
          <GalleryGrid items={gridGalleryItems} />
        </>
      )}
    </motion.div>
  );
}
