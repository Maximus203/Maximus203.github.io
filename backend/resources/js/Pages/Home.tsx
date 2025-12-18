import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Code, Palette, Wrench } from 'lucide-react';

export default function Home({ auth: _auth }: PageProps) {
    return (
        <MainLayout>
            <Head>
                <title>Accueil - Cherif Diouf | Développeur Full Stack</title>
                <meta name="description" content="Portfolio de Cherif Diouf, développeur Full Stack spécialisé en Laravel, React et solutions web modernes" />
            </Head>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Cherif Diouf
                            </span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-4">
                            Développeur Full Stack
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                            Passionné par la création d'applications web modernes avec Laravel, React et TypeScript
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/projets"
                                className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Voir mes projets
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <a
                                href="https://github.com/Maximus203"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        Explorez mon portfolio
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link
                            href="/projets"
                            className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="inline-flex p-4 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Projets
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Découvrez mes réalisations en développement web et mobile
                            </p>
                        </Link>

                        <Link
                            href="/galerie"
                            className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="inline-flex p-4 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
                                <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Galerie
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Explorez mes créations visuelles et designs
                            </p>
                        </Link>

                        <Link
                            href="/outils"
                            className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className="inline-flex p-4 rounded-lg bg-pink-100 dark:bg-pink-900/30 mb-4">
                                <Wrench className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Outils
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Utilisez mes outils gratuits pour développeurs
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
