import { create } from 'zustand';
import { Language } from './types';

interface AppState {
  // Configuration State
  theme: 'light' | 'dark';
  lang: Language;
  
  // Navigation & UI State
  view: 'home' | 'gallery' | 'tools' | 'readme_generator' | 'converter' | 'meme';
  showIntro: boolean;
  isMobileMenuOpen: boolean;
  isProjectModalOpen: boolean;
  projectSearch: string;

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
  setView: (view: AppState['view']) => void;
  setShowIntro: (show: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setProjectModalOpen: (open: boolean) => void;
  setProjectSearch: (search: string) => void;
}

// Detect system preference
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useAppStore = create<AppState>((set) => ({
  // Initial Values
  theme: systemTheme,
  lang: 'fr',
  view: 'home',
  showIntro: true,
  isMobileMenuOpen: false,
  isProjectModalOpen: false,
  projectSearch: '',

  // Setters
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setLang: (lang) => set({ lang }),
  setView: (view) => set({ view }),
  setShowIntro: (showIntro) => set({ showIntro }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setProjectModalOpen: (isProjectModalOpen) => set({ isProjectModalOpen }),
  setProjectSearch: (projectSearch) => set({ projectSearch }),
}));