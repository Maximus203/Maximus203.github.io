'use client';

import { create } from 'zustand';

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
  showIntro: true,
  isMobileMenuOpen: false,
  isProjectModalOpen: false,
  projectSearch: '',

  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setShowIntro: (showIntro) => set({ showIntro }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  setProjectModalOpen: (isProjectModalOpen) => set({ isProjectModalOpen }),
  setProjectSearch: (projectSearch) => set({ projectSearch }),
}));

// Initialize theme on client side
if (typeof window !== 'undefined') {
  useAppStore.setState({ theme: getSystemTheme() });
}
