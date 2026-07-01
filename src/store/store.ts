'use client';

import { create } from 'zustand';

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Check if intro has been shown this session
const getInitialShowIntro = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    return !sessionStorage.getItem('introShown');
  } catch {
    return true;
  }
};

interface AppState {
  theme: 'light' | 'dark';
  showIntro: boolean;
  isMobileMenuOpen: boolean;
  isProjectModalOpen: boolean;
  projectSearch: string;

  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setShowIntro: (show: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setProjectModalOpen: (open: boolean) => void;
  setProjectSearch: (search: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  showIntro: true, // Default to true, will be overridden by client-side init
  isMobileMenuOpen: false,
  isProjectModalOpen: false,
  projectSearch: '',

  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setShowIntro: (showIntro) => {
    if (typeof window !== 'undefined' && !showIntro) {
      try {
        sessionStorage.setItem('introShown', 'true');
      } catch {
        // storage unavailable (private browsing, restricted context) — non-fatal
      }
    }
    set({ showIntro });
  },
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setProjectModalOpen: (isProjectModalOpen) => set({ isProjectModalOpen }),
  setProjectSearch: (projectSearch) => set({ projectSearch }),
}));

// Initialize theme and intro state on client side
if (typeof window !== 'undefined') {
  useAppStore.setState({ theme: getSystemTheme() });
  useAppStore.setState({ showIntro: getInitialShowIntro() });
}
