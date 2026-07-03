'use client';

import ReadmeGenerator from '@/components/tools/ReadmeGenerator';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

export default function ReadmeGeneratorClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);
  return <ReadmeGenerator lang={lang} labels={labels} />;
}
