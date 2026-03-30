'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Language } from '@/types';

interface LangSwitcherProps {
  currentLang: Language;
  variant?: 'mobile' | 'desktop';
}

export default function LangSwitcher({ currentLang, variant = 'desktop' }: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = (newLang: Language) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
  };

  const langs: Language[] = ['fr', 'en', 'zh', 'ja'];

  if (variant === 'mobile') {
    return (
      <div className="flex bg-gray-50 dark:bg-slate-800 rounded-lg p-1 border border-gray-100 dark:border-slate-700">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => switchLang(l)}
            className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${currentLang === l ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-slate-700">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => switchLang(l)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${currentLang === l ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
