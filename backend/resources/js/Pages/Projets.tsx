import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
}

interface ProjetsProps {
    projects: Project[];
    categories: string[];
}

export default function Projets({ projects = [], categories: _categories = [] }: ProjetsProps) {
    return (
        <MainLayout>
            <Head>
                <title>Mes Projets - Cherif Diouf</title>
                <meta name="description" content="Découvrez mes projets de développement web et mobile" />
            </Head>

            <div className="min-h-screen py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Mes Projets
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Une sélection de mes réalisations en développement web et mobile
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-600 dark:text-slate-400">
                                Aucun projet disponible pour le moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
