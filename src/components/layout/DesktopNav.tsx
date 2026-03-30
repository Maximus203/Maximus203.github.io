'use client';

import { Briefcase, Code2, FolderGit2, Home, Image as ImageIcon, User, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Language } from '@/types';

interface DesktopNavProps {
  lang: Language;
  labels: Record<string, string>;
}

export default function DesktopNav({ lang, labels }: DesktopNavProps) {
  const pathname = usePathname();

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isGallery = pathname.startsWith(`/${lang}/gallery`);
  const isTools = pathname.startsWith(`/${lang}/tools`);

  const sectionItems = [
    { id: 'about', label: labels.about, icon: <User size={16} /> },
    { id: 'experience', label: labels.experience, icon: <Briefcase size={16} /> },
    { id: 'projects', label: labels.projects, icon: <FolderGit2 size={16} /> },
    { id: 'skills', label: labels.skills, icon: <Code2 size={16} /> },
  ];

  return (
    <div className="hidden lg:flex items-center gap-6 mb-12 text-sm font-medium text-gray-500 dark:text-gray-400">
      <Link
        href={`/${lang}/`}
        className={`flex items-center gap-2 transition-colors ${isHome ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Home size={16} />
        {labels.home}
      </Link>

      {isHome && sectionItems.map((item) => (
        <Link
          key={item.id}
          href={`/${lang}/#${item.id}`}
          className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          {item.label}
        </Link>
      ))}

      <Link
        href={`/${lang}/gallery/`}
        className={`flex items-center gap-2 transition-colors ${isGallery ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <ImageIcon size={16} />
        {labels.gallery}
      </Link>

      <Link
        href={`/${lang}/tools/`}
        className={`flex items-center gap-2 transition-colors ${isTools ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Wrench size={16} />
        {labels.tools}
      </Link>
    </div>
  );
}
