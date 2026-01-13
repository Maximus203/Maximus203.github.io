import ReadmeGenerator from '@/Components/ReadmeGenerator';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ReadmeGeneratorPage() {
    return (
        <MainLayout>
            <Head>
                <title>Readme Generator - Cherif Diouf</title>
                <meta name="description" content="Générez des fichiers README professionnels pour vos projets GitHub" />
            </Head>

            <div className="min-h-screen py-20 px-6 bg-[#fafafa] dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                            Readme Generator
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Créez des fichiers README professionnels pour vos projets GitHub
                        </p>
                    </motion.div>

                    <ReadmeGenerator />
                </div>
            </div>
        </MainLayout>
    );
}
