'use client';

import ImageConverter from '@/components/tools/ImageConverter';
import type { Language } from '@/types';

export default function ImageConverterClient({ lang }: { lang: Language }) {
  return <ImageConverter lang={lang} />;
}
