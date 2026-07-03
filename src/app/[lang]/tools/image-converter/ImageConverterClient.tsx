'use client';

import ImageConverter from '@/components/tools/ImageConverter';
import { UI_LABELS } from '@/lib/constants/ui-labels';
import type { Language } from '@/types';

export default function ImageConverterClient({ lang }: { lang: Language }) {
  const labels = UI_LABELS[lang];
  return <ImageConverter lang={lang} labels={labels} />;
}
