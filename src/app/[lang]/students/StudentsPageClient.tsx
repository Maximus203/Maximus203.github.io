'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GraduationCap } from 'lucide-react';
import { getLabels } from '@/lib/i18n';
import type { Language } from '@/types';

interface Student {
  name: string;
  url: string;
  photo: string;
  color: string;
}

const STUDENTS: Student[] = [
  {
    name: 'Mouhamed Gaye',
    url: 'https://mouhamedgaye.github.io/Mon-portefolio/',
    photo: 'https://mouhamedgaye.github.io/Mon-portefolio/Picture/ma_photo.jpeg',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'El Hadji Ismael Diallo',
    url: 'https://portofolio-eljah.netlify.app/',
    photo: 'https://portofolio-eljah.netlify.app/image/iso.png',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Mamadou Dieye',
    url: 'https://mamado886.github.io/Mamadou-Dieye/',
    photo: 'https://mamado886.github.io/Mamadou-Dieye/image/IMG_5134.jpeg',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Fatou Kine Dione',
    url: 'https://kine54.github.io/Mon-portofolio/',
    photo: 'https://kine54.github.io/Mon-portofolio/images/ma-photo.jpeg',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Adja Abibatou Diop',
    url: 'https://adjaabibatoudiop-bit.github.io/Abibatou-Portfolio/',
    photo: 'https://github.com/adjaabibatoudiop-bit/Ma.page.html/blob/main/aby%27pic.jpg?raw=true',
    color: 'from-cyan-500 to-blue-600',
  },
];

export default function StudentsPageClient({ lang }: { lang: Language }) {
  const labels = getLabels(lang);

  return (
    <motion.div
      key="students"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {labels.studentsTitle}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {labels.studentsSubtitle}
        </p>
      </div>

      {/* Stats Banner */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
        <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-800/40">
          <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="font-bold text-indigo-900 dark:text-indigo-300 text-lg">
            {STUDENTS.length} {labels.studentsCount}
          </p>
          <p className="text-indigo-600/70 dark:text-indigo-400/70 text-sm">
            {labels.studentsHighlight}
          </p>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STUDENTS.map((student, index) => (
          <motion.a
            key={student.name}
            href={student.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/20"
          >
            {/* Gradient top bar */}
            <div className={`h-1.5 bg-gradient-to-r ${student.color}`} />

            <div className="p-6 flex items-center gap-5">
              {/* Student photo */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${student.color} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 overflow-hidden`}>
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {student.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
                  {student.url.replace('https://', '').replace(/\/$/, '')}
                </p>
              </div>

              {/* External link icon */}
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all flex-shrink-0">
                <ExternalLink size={18} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
