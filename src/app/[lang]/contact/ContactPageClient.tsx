'use client';

import { motion } from 'framer-motion';
import ProjectRequestModal from '@/components/shared/ProjectRequestModal';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

export default function ContactPageClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{labels.submitProjectTitle}</h1>
        <p className="text-gray-600 dark:text-gray-400">{labels.submitProjectDesc}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
        <ProjectRequestModal isOpen={true} onClose={() => {}} labels={labels} />
      </div>
    </motion.div>
  );
}
