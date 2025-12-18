import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, ImagePlus, Smile } from 'lucide-react';

export default function Outils() {
    const tools = [
        {
            name: 'Générateur README',
            description: 'Créez facilement des fichiers README professionnels pour vos projets GitHub',
            icon: FileText,
            href: '/outils/readme-generator',
            color: 'indigo',
        },
        {
            name: 'Convertisseur d\'images',
            description: 'Convertissez vos images entre différents formats (PNG, JPG, WEBP, etc.)',
            icon: ImagePlus,
            href: '/outils/image-converter',
            color: 'purple',
        },
        {
            name: 'Générateur de Memes',
            description: 'Créez des memes personnalisés avec vos propres images et textes',
            icon: Smile,
            href: '/outils/meme-generator',
            color: 'pink',
        },
    ];

    return (
        <MainLayout>
            <Head>
                <title>Outils - Cherif Diouf</title>
                <meta name="description" content="Outils en ligne gratuits pour développeurs et créateurs" />
            </Head>

            <div className="min-h-screen py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Outils
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Une collection d'outils gratuits pour faciliter votre travail
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-4 rounded-lg bg-${tool.color}-100 dark:bg-${tool.color}-900/30 mb-4`}>
                                    <tool.icon className={`w-8 h-8 text-${tool.color}-600 dark:text-${tool.color}-400`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {tool.description}
                                </p>
                                <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                                    Utiliser l'outil
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
