import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

interface GalleryImage {
    id: number;
    url: string;
    title: string;
    category: string;
}

interface GalerieProps {
    images: GalleryImage[];
    categories: string[];
}

export default function Galerie({ images = [], categories: _categories = [] }: GalerieProps) {
    return (
        <MainLayout>
            <Head>
                <title>Galerie - Cherif Diouf</title>
                <meta name="description" content="Galerie de mes créations et projets visuels" />
            </Head>

            <div className="min-h-screen py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Galerie
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Découvrez mes créations et réalisations visuelles
                        </p>
                    </div>

                    {images.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-600 dark:text-slate-400">
                                Aucune image disponible pour le moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-bold text-lg">
                                                {image.title}
                                            </h3>
                                            <p className="text-slate-200 text-sm">
                                                {image.category}
                                            </p>
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
