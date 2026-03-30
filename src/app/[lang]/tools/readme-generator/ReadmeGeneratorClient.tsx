'use client';

import ReadmeGenerator from '@/components/tools/ReadmeGenerator';
import type { Language } from '@/types';

export default function ReadmeGeneratorClient({ lang }: { lang: Language }) {
  return <ReadmeGenerator lang={lang} />;
}
