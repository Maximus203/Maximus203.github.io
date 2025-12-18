import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Accueil" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="text-center px-6">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Laravel 12 + Inertia.js
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
                        Portfolio de Cherif Diouf
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-500">
                        🎉 Phase 0 - Configuration réussie !
                    </p>

                    {auth.user && (
                        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                            Connecté en tant que: {auth.user.name}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
