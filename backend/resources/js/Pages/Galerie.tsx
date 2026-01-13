import GalleryCarousel from '@/Components/GalleryCarousel';
import GalleryGrid from '@/Components/GalleryGrid';
import MainLayout from '@/Layouts/MainLayout';
import { GalleryItem } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface GalerieProps {
    featuredItems: GalleryItem[];
    gridItems: GalleryItem[];
    labels: Record<string, string>;
}

export default function Galerie({ featuredItems = [], gridItems = [], labels = {} }: GalerieProps) {
    return (
        <MainLayout>
            <Head>
                <title>{labels.galleryTitle || 'Galerie'} - Cherif Diouf</title>
                <meta name="description" content={labels.gallerySubtitle || 'Moments marquants'} />
            </Head>

            <div className="min-h-screen py-20 px-6 bg-[#fafafa] dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                            {labels.galleryTitle || 'Galerie'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {labels.gallerySubtitle || 'Moments marquants de mon parcours'}
                        </p>
                    </motion.div>

                    {/* Carousel for Featured Items */}
                    {featuredItems.length > 0 && (
                        <GalleryCarousel items={featuredItems} />
                    )}

                    {/* Grid for other items */}
                    {gridItems.length > 0 && (
                        <>
                            <div className="flex items-center gap-2 mb-4 mt-12">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Plus de moments</h2>
                                <div className="h-px bg-gray-200 dark:bg-slate-800 flex-grow" />
                            </div>
                            <GalleryGrid items={gridItems} />
                        </>
                    )}

                    {featuredItems.length === 0 && gridItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-600 dark:text-slate-400">
                                Aucune image disponible pour le moment.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
