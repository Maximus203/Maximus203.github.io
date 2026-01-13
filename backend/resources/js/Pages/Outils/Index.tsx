import ToolsGrid from '@/Components/ToolsGrid';
import MainLayout from '@/Layouts/MainLayout';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface OutilsProps {
    labels: Record<string, string>;
}

export default function Outils({ labels = {} }: OutilsProps) {
    const handleToolLaunch = (toolId: string) => {
        if (toolId === 'readme') {
            router.visit('/outils/readme-generator');
        } else if (toolId === 'converter') {
            router.visit('/outils/image-converter');
        } else if (toolId === 'meme') {
            router.visit('/outils/meme-generator');
        }
    };

    return (
        <MainLayout>
            <Head>
                <title>{labels.toolsTitle || 'Outils'} - Cherif Diouf</title>
                <meta name="description" content={labels.toolsSubtitle || 'Collection d\'outils pratiques'} />
            </Head>

            <div className="min-h-screen py-20 px-6 bg-[#fafafa] dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                            {labels.toolsTitle || 'Outils'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {labels.toolsSubtitle || 'Collection d\'outils pratiques'}
                        </p>
                    </motion.div>

                    <ToolsGrid labels={labels} onLaunch={handleToolLaunch} />
                </div>
            </div>
        </MainLayout>
    );
}
