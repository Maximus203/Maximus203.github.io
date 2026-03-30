'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import DesktopNav from '@/components/layout/DesktopNav';
import Footer from '@/components/layout/Footer';
import StickySidebar from '@/components/layout/StickySidebar';
import LangSwitcher from '@/components/shared/LangSwitcher';
import ThemeToggle from '@/components/shared/ThemeToggle';
import IntroAnimation from '@/components/shared/IntroAnimation';
import ProjectRequestModal from '@/components/shared/ProjectRequestModal';
import { useAppStore } from '@/store/store';
import { getLabels, getResumeData } from '@/lib/i18n';
import type { Language } from '@/types';

interface LangLayoutClientProps {
  lang: Language;
  children: React.ReactNode;
}

export function LangLayoutClient({ lang, children }: LangLayoutClientProps) {
  const { showIntro, setShowIntro, isProjectModalOpen, setProjectModalOpen } = useAppStore();
  const pathname = usePathname();

  const labels = getLabels(lang);
  const data = getResumeData(lang);

  const handleIntroComplete = useCallback(() => setShowIntro(false), [setShowIntro]);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isToolPage = pathname.includes('/tools/readme-generator') || pathname.includes('/tools/image-converter') || pathname.includes('/tools/meme-generator');
  const isFullWidth = !isHome;
  const showFooter = isHome || pathname.includes('/gallery') || pathname === `/${lang}/tools` || pathname === `/${lang}/tools/` || pathname.includes('/students');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <ProjectRequestModal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        labels={labels}
      />

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300 text-gray-900 dark:text-gray-50 flex flex-col"
        >
          <Navbar lang={lang} labels={labels} />

          <div className="max-w-7xl mx-auto px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow w-full">
            <main className={`${isFullWidth ? 'lg:col-span-12' : 'lg:col-span-7'} pt-16 lg:pt-0`}>
              <DesktopNav lang={lang} labels={labels} />
              {children}
            </main>

            {!isFullWidth && (
              <aside className="hidden lg:block lg:col-span-5 relative">
                <div className="sticky top-8 pl-8 max-h-[calc(100vh-2rem)] overflow-y-auto hide-scrollbar pb-4">
                  <div className="flex justify-end mb-6 gap-3">
                    <ThemeToggle />
                    <LangSwitcher currentLang={lang} />
                  </div>
                  <StickySidebar data={data.profile} labels={labels} />
                </div>
              </aside>
            )}
          </div>

          {showFooter && <Footer data={data.profile} labels={labels} lang={lang} />}
        </motion.div>
      )}
    </>
  );
}
