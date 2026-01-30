import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ArrowRightIcon, MapPinIcon, ShieldCheckIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';


const Feature = ({ icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => {
    const Icon = icon;
    return (
        <div className="text-center p-6 bg-white dark:bg-gray-800/50 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto mb-4">
                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{children}</p>
        </div>
    );
};

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Bienvenue chez Mwinda" />
            <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
                {/* Header */}
                <header className="fixed w-full z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                                    MwindaUpdated
                                </Link>
                            </div>
                            {/* Navigation Links */}
                            <nav>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                    >
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <div className="space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                        >
                                            Connexion
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                        >
                                            S'inscrire
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero Section */}
                    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/90"></div>
                        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-6">
                                Votre ville, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">à portée de main.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                                Mwinda vous connecte à des conducteurs fiables pour des trajets rapides, sûrs et abordables. Découvrez une nouvelle façon de vous déplacer.
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                Commencer mon premier trajet <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </section>
                    
                    {/* Features Section */}
                    <section className="py-20 bg-gray-100 dark:bg-gray-800">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Pourquoi choisir Mwinda ?</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">La sérénité à chaque étape de votre voyage.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <Feature icon={MapPinIcon} title="Trajets instantanés">
                                    Trouvez un conducteur près de vous en quelques secondes, à toute heure du jour et de la nuit.
                                </Feature>
                                <Feature icon={ShieldCheckIcon} title="Sécurité avant tout">
                                    Nos conducteurs sont vérifiés et vos trajets sont suivis en temps réel pour une tranquillité d'esprit totale.
                                </Feature>
                                <Feature icon={ClockIcon} title="Prix transparents">
                                    Connaissez le coût de votre trajet avant de commander. Pas de surprises, juste de la simplicité.
                                </Feature>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="py-20">
                         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Simple comme 1, 2, 3</h2>
                            <div className="space-y-10">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="text-6xl font-black text-blue-200 dark:text-blue-800 mr-6 mb-4 md:mb-0">1.</div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Créez votre demande</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Entrez votre destination sur notre carte interactive et confirmez votre point de départ.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="text-6xl font-black text-blue-200 dark:text-blue-800 mr-6 mb-4 md:mb-0">2.</div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirmez votre conducteur</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Nous vous mettons en relation avec le conducteur le plus proche. Suivez son arrivée en temps réel.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="text-6xl font-black text-blue-200 dark:text-blue-800 mr-6 mb-4 md:mb-0">3.</div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Voyagez et notez</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Profitez de votre trajet. À l'arrivée, payez facilement et laissez une évaluation.</p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </section>

                    {/* Call to Action (CTA) Section */}
                    <section className="bg-blue-700">
                        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                Prêt à bouger ?
                            </h2>
                            <p className="mt-4 text-lg text-blue-200">
                                Rejoignez des milliers d'utilisateurs satisfaits. Votre prochaine destination vous attend.
                            </p>
                            <Link
                                href={route('register')}
                                className="mt-8 w-full inline-flex items-center justify-center px-6 py-4 border border-transparent rounded-full shadow-sm text-base font-bold text-blue-600 bg-white hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 sm:w-auto"
                            >
                                Créer mon compte
                            </Link>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Mwinda. Tous droits réservés.</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Un projet Construit par Daniel Assani ce samedi 12/07/2025.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}