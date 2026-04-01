'use client';

import { Briefcase, BookOpen, ChevronDown, Code2, FolderGit2, GraduationCap, Home, Image as ImageIcon, LayoutList, User, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '@/types';

interface DesktopNavProps {
  lang: Language;
  labels: Record<string, string>;
}

export default function DesktopNav({ lang, labels }: DesktopNavProps) {
  const pathname = usePathname();
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isGallery = pathname.startsWith(`/${lang}/gallery`);
  const isTools = pathname.startsWith(`/${lang}/tools`);
  const isStudents = pathname.startsWith(`/${lang}/students`);

  const sectionItems = [
    { id: 'about',      label: labels.about,      icon: <User size={14} /> },
    { id: 'experience', label: labels.experience,  icon: <Briefcase size={14} /> },
    { id: 'projects',   label: labels.projects,    icon: <FolderGit2 size={14} /> },
    { id: 'skills',     label: labels.skills,      icon: <Code2 size={14} /> },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSectionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setSectionsOpen(false);
  }, [pathname]);

  return (
    <div className="hidden lg:flex items-center gap-5 mb-12 text-sm font-medium text-gray-500 dark:text-gray-400 flex-wrap">

      {/* Home */}
      <Link
        href={`/${lang}/`}
        className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${isHome ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Home size={15} />
        {labels.home}
      </Link>

      {/* Sections dropdown — visible only on home page */}
      {isHome && (
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setSectionsOpen((v) => !v)}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-gray-900 dark:hover:text-gray-200 ${sectionsOpen ? 'text-gray-900 dark:text-gray-200' : ''}`}
          >
            <LayoutList size={15} />
            {labels.sections}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${sectionsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {sectionsOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/30 py-1.5 z-50">
              {sectionItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/${lang}/#${item.id}`}
                  onClick={() => setSectionsOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Separator */}
      <div className="w-px h-4 bg-gray-200 dark:bg-slate-700" />

      {/* Gallery */}
      <Link
        href={`/${lang}/gallery/`}
        className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${isGallery ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <ImageIcon size={15} />
        {labels.gallery}
      </Link>

      {/* Tools */}
      <Link
        href={`/${lang}/tools/`}
        className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${isTools ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <Wrench size={15} />
        {labels.tools}
      </Link>

      {/* Students */}
      <Link
        href={`/${lang}/students/`}
        className={`flex items-center gap-1.5 transition-colors whitespace-nowrap ${isStudents ? 'text-indigo-600 dark:text-indigo-400' : 'hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        <GraduationCap size={15} />
        {labels.students}
      </Link>

      {/* Publications — hidden until content is ready */}
      <Link
        href={`/${lang}/publications/`}
        className="hidden items-center gap-1.5 transition-colors whitespace-nowrap hover:text-gray-900 dark:hover:text-gray-200"
      >
        <BookOpen size={15} />
        {labels.publications}
      </Link>
    </div>
  );
}
