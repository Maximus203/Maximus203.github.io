'use client';

import { motion } from 'framer-motion';
import ToolsGrid from '@/components/tools/ToolsGrid';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

export default function ToolsPageClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);

  return (
    <motion.div
      key="tools"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{labels.toolsTitle}</h1>
        <p className="text-gray-600 dark:text-gray-400">{labels.toolsSubtitle}</p>
      </div>

      <ToolsGrid labels={labels} lang={lang} />
    </motion.div>
  );
}
