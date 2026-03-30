'use client';

import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store/store';

interface ThemeToggleProps {
  variant?: 'icon' | 'button';
}

export default function ThemeToggle({ variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useAppStore();

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-100 dark:border-slate-700"
      >
        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        <span>{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
      title="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
