'use client';

import ImageConverter from '@/components/tools/ImageConverter';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

export default function ImageConverterClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);
  return <ImageConverter lang={lang} labels={labels} />;
}
