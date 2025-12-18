import { Link } from '@inertiajs/react';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [theme, setTheme] = useState<Theme>('system');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Charger le thème depuis localStorage
        const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Projets', href: '/projets' },
        { name: 'Galerie', href: '/galerie' },
        { name: 'Outils', href: '/outils' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            CD
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Theme Switcher */}
                            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                <button
                                    onClick={() => handleThemeChange('light')}
                                    className={`p-2 rounded-md transition-colors ${theme === 'light'
                                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                    aria-label="Mode clair"
                                >
                                    <Sun size={18} />
                                </button>
                                <button
                                    onClick={() => handleThemeChange('dark')}
                                    className={`p-2 rounded-md transition-colors ${theme === 'dark'
                                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                    aria-label="Mode sombre"
                                >
                                    <Moon size={18} />
                                </button>
                                <button
                                    onClick={() => handleThemeChange('system')}
                                    className={`p-2 rounded-md transition-colors ${theme === 'system'
                                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                    aria-label="Mode système"
                                >
                                    <Monitor size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex flex-col space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium px-2 py-1"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Mobile Theme Switcher */}
                                <div className="flex items-center space-x-2 pt-2">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Thème :</span>
                                    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                        <button
                                            onClick={() => handleThemeChange('light')}
                                            className={`p-2 rounded-md transition-colors ${theme === 'light'
                                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                                    : 'text-slate-500'
                                                }`}
                                        >
                                            <Sun size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleThemeChange('dark')}
                                            className={`p-2 rounded-md transition-colors ${theme === 'dark'
                                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                                    : 'text-slate-500'
                                                }`}
                                        >
                                            <Moon size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleThemeChange('system')}
                                            className={`p-2 rounded-md transition-colors ${theme === 'system'
                                                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                                    : 'text-slate-500'
                                                }`}
                                        >
                                            <Monitor size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="min-h-[calc(100vh-4rem-12rem)]">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                Cherif Diouf
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Développeur Full Stack passionné par la création d'applications web modernes et performantes.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                Navigation
                            </h3>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                                Me suivre
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/Maximus203"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://linkedin.com/in/cherif-diouf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            &copy; 2025 Cherif Diouf. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
