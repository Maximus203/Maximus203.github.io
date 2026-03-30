'use client';

import MemeGenerator from '@/components/tools/MemeGenerator';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

export default function MemeGeneratorClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);
  return <MemeGenerator lang={lang} labels={labels} />;
}
