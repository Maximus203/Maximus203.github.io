'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Briefcase, ChevronRight, Code2, FolderGit2, GraduationCap, Home, Image as ImageIcon, Menu, User, Wrench, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/store';
import LangSwitcher from '@/components/shared/LangSwitcher';
import ThemeToggle from '@/components/shared/ThemeToggle';
import type { Language } from '@/types';

interface NavbarProps {
  lang: Language;
  labels: Record<string, string>;
}

export default function Navbar({ lang, labels }: NavbarProps) {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useAppStore();
  const pathname = usePathname();

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isGallery = pathname.startsWith(`/${lang}/gallery`);
  const isTools = pathname.startsWith(`/${lang}/tools`);
  const isStudents = pathname.startsWith(`/${lang}/students`);

  const sectionItems = [
    { id: 'about', label: labels.about, icon: <User size={18} /> },
    { id: 'experience', label: labels.experience, icon: <Briefcase size={18} /> },
    { id: 'projects', label: labels.projects, icon: <FolderGit2 size={18} /> },
    { id: 'skills', label: labels.skills, icon: <Code2 size={18} /> },
  ];

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] as const } },
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({ x: 0, opacity: 1, transition: { delay: i * 0.05 + 0.1, duration: 0.3 } }),
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg z-50 border-b border-gray-100 dark:border-slate-800 lg:hidden px-4 py-3 flex justify-between items-center transition-colors duration-300">
        <Link
          href={`/${lang}/`}
          className="font-bold text-lg tracking-tight text-gray-900 dark:text-white flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Code2 size={18} />
          </div>
          <span>Cherif.<span className="text-indigo-600 dark:text-indigo-400">Dev</span></span>
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700"
          aria-label="Toggle menu"
        >
          <motion.div initial={false} animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-[64px] left-0 right-0 bg-white dark:bg-slate-900 z-40 lg:hidden border-b border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden rounded-b-3xl"
            >
              <div className="flex flex-col p-4 pb-6 space-y-1">
                <motion.div custom={0} variants={menuItemVariants}>
                  <Link
                    href={`/${lang}/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${isHome ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <Home size={18} />
                    {labels.home}
                    {isHome && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </Link>
                </motion.div>

                {sectionItems.map((item, idx) => (
                  <motion.div key={item.id} custom={idx + 1} variants={menuItemVariants}>
                    <Link
                      href={`/${lang}/#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div custom={5} variants={menuItemVariants}>
                  <Link
                    href={`/${lang}/gallery/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${isGallery ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <ImageIcon size={18} />
                    {labels.gallery}
                    {isGallery && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </Link>
                </motion.div>

                <motion.div custom={6} variants={menuItemVariants}>
                  <Link
                    href={`/${lang}/tools/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${isTools ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <Wrench size={18} />
                    {labels.tools}
                    {isTools && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </Link>
                </motion.div>

                <motion.div custom={7} variants={menuItemVariants}>
                  <Link
                    href={`/${lang}/students/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${isStudents ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                  >
                    <GraduationCap size={18} />
                    {labels.students}
                    {isStudents && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </Link>
                </motion.div>

                {/* Publications — hidden until content is ready */}
                <motion.div custom={8} variants={menuItemVariants} className="hidden">
                  <Link
                    href={`/${lang}/publications/`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <BookOpen size={18} />
                    {labels.publications}
                  </Link>
                </motion.div>

                <motion.div custom={9} variants={menuItemVariants} className="h-px bg-gray-100 dark:bg-slate-800 my-4" />

                <motion.div custom={10} variants={menuItemVariants} className="flex items-center justify-between px-2">
                  <ThemeToggle variant="button" />
                  <LangSwitcher currentLang={lang} variant="mobile" />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
