import ProjectCard from '@/Components/ProjectCard';
import MainLayout from '@/Layouts/MainLayout';
import { Project } from '@/types';
import { Head } from '@inertiajs/react';

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

            <div className="min-h-screen py-20 px-6 bg-[#fafafa] dark:bg-slate-950">
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
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
