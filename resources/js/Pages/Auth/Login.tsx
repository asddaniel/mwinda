import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';
// import { FormEventHandler } from 'react';

// export default function Login({
//     status,
//     canResetPassword,
// }: {
//     status?: string;
//     canResetPassword: boolean;
// }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false as boolean,
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();

//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Log in" />

//             {status && (
//                 <div className="mb-4 text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         isFocused={true}
//                         onChange={(e) => setData('email', e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4 block">
//                     <label className="flex items-center">
//                         <Checkbox
//                             name="remember"
//                             checked={data.remember}
//                             onChange={(e) =>
//                                 setData(
//                                     'remember',
//                                     (e.target.checked || false) as false,
//                                 )
//                             }
//                         />
//                         <span className="ms-2 text-sm text-gray-600">
//                             Remember me
//                         </span>
//                     </label>
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     {canResetPassword && (
//                         <Link
//                             href={route('password.request')}
//                             className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             Forgot your password?
//                         </Link>
//                     )}

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Log in
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

// resources/js/Pages/Auth/Login.tsx

import { useEffect, FormEventHandler, ChangeEvent, BaseSyntheticEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

// Le layout invité qui englobera nos pages
const AuthLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-5xl m-4 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl flex overflow-hidden">
                    {/* Colonne de gauche : Formulaire */}
                    <div className="w-full md:w-1/2 p-8 sm:p-12">
                        {children}
                    </div>

                    {/* Colonne de droite : Image */}
                    <div
                        className="hidden md:block md:w-1/2 bg-cover bg-center"
                       style={{ backgroundImage: `url(${location.origin}/circulation.jpg)` }}
                    >
                        <div className="h-full w-full bg-indigo-900 bg-opacity-50"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AuthLayout title="Connexion">
            <div className="flex flex-col h-full justify-center">
                <Link href="/" className="mb-8 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 self-start">
                    Mwinda
                </Link>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bon retour parmi nous !</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Connectez-vous pour continuer votre aventure.</p>

                {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e:BaseSyntheticEvent) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e:BaseSyntheticEvent) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e:BaseSyntheticEvent) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center flex-col gap-4">
                        <PrimaryButton className="w-full justify-center text-lg py-3" disabled={processing}>
                            Se connecter
                        </PrimaryButton>
                        
                        <Link
                            href={route('register')}
                            className="w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Pas encore de compte ? <span className="font-bold underline">S'inscrire</span>
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}