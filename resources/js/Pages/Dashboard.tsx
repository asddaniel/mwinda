import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps, Booking } from '@/types';
import BookingMap, { Coordinates } from '@/Components/BookingMap'; 
import { FormEventHandler, useState, useEffect } from 'react';



interface BookingFormData {
    passenger_name: string;
    passenger_phone: string;
    start_address: string;
    destination_address: string;
    start_latitude: number | string;
    start_longitude: number | string;
    destination_latitude: number | string;
    destination_longitude: number | string;
}

const SearchingOverlay = ({ booking }: { booking: Booking }) => {
    let statusMessage = "Nous cherchons un conducteur pour vous...";
    if (booking.status === 'confirmed') {
        statusMessage = "Conducteur trouvé ! Votre trajet est confirmé.";
    }

    return (
        <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 z-10 flex flex-col items-center justify-center text-center p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{statusMessage}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                De: {booking.start_address} <br />
                À: {booking.destination_address}
            </p>
            {booking.status === 'confirmed' && (
                 <button
                    onClick={() => router.get(route('dashboard'))}
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    Génial !
                </button>
            )}
        </div>
    );
};


export default function ({ auth, flash, activeBooking: initialActiveBooking }: PageProps<{ activeBooking?: Booking }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        passenger_name: auth.user.name,
        passenger_phone: '',
        start_address: '',
        destination_address: '',
        start_latitude: '',
        start_longitude: '',
        destination_latitude: '',
        destination_longitude: '',
    });

    // Callback pour mettre à jour le point de départ
    const handleStartLocated = (name: string, coords: Coordinates) => {
        setData((currentData) => ({
            ...currentData,
            start_address: name,
            start_latitude: coords.lat,
            start_longitude: coords.lng,
        } as any));
    };

    // Callback pour mettre à jour la destination
    const handleEndLocated = (name: string, coords: Coordinates) => {
        setData(currentData => ({
            ...currentData,
            destination_address: name,
            destination_latitude: coords.lat,
            destination_longitude: coords.lng,
        } as any));
    };
    const [activeBooking, setActiveBooking] = useState(initialActiveBooking);
      useEffect(() => {
        if (activeBooking?.status === 'searching') {
           const interval = setInterval(async () => {
    try {
        const response = await fetch(route('bookings.show', activeBooking.id), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Ajoute un header CSRF si nécessaire pour Laravel
                // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedBooking: Booking = await response.json();

        if (updatedBooking.status !== 'searching') {
            setActiveBooking(updatedBooking); // Mettre à jour l'état local
            clearInterval(interval); // Arrêter le polling
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du statut:", error);
        clearInterval(interval); // Arrêter en cas d'erreur
    }
}, 3000);
 // Vérifie toutes les 3 secondes

            return () => clearInterval(interval); // Nettoyer l'intervalle si le composant est démonté
        }
    }, [activeBooking]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => reset('passenger_phone', 'start_address', 'destination_address', 'start_latitude', 'start_longitude', 'destination_latitude', 'destination_longitude'),
        });
    };

    // Créer les objets de points pour la carte, en s'assurant qu'ils sont valides
    const startPoint = data.start_latitude && data.start_longitude ? { lat: +data.start_latitude, lng: +data.start_longitude } : null;
    const endPoint = data.destination_latitude && data.destination_longitude ? { lat: +data.destination_latitude, lng: +data.destination_longitude } : null;

    return (
        <AuthenticatedLayout
            // user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mwinda - Réservez un trajet</h2>}
        >
            <Head title="Réservation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col md:flex-row">
                            {/* Formulaire qui est maintenant synchronisé avec la carte */}
                            <div className="w-full md:w-1/3 p-6 text-gray-900 dark:text-gray-100 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold mb-4">Détails du trajet</h3>
                                <form onSubmit={submit} className="space-y-6">
                                    {/* ... champs nom et téléphone inchangés ... */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet</label>
                                        <input id="name" type="text" value={data.passenger_name} onChange={(e) => setData('passenger_name', e.target.value)} className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" required />
                                        {errors.passenger_name && <p className="text-sm text-red-600 mt-2">{errors.passenger_name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Numéro de téléphone</label>
                                        <input id="phone" type="tel" value={data.passenger_phone} onChange={(e) => setData('passenger_phone', e.target.value)} placeholder="+243 000 000 000" className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" required />
                                        {errors.passenger_phone && <p className="text-sm text-red-600 mt-2">{errors.passenger_phone}</p>}
                                    </div>
                                    {/* Champs d'adresse maintenant en lecture seule, mis à jour par la carte */}
                                    <div>
                                        <label htmlFor="start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Départ</label>
                                        <input id="start" type="text" value={data.start_address} className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm" readOnly placeholder="Choisissez sur la carte"/>
                                        {errors.start_address && <p className="text-sm text-red-600 mt-2">{errors.start_address}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Destination</label>
                                        <input id="destination" type="text" value={data.destination_address} className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md shadow-sm" readOnly placeholder="Choisissez sur la carte"/>
                                        {errors.destination_address && <p className="text-sm text-red-600 mt-2">{errors.destination_address}</p>}
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed" disabled={processing || !startPoint || !endPoint}>
                                            {processing ? 'Recherche en cours...' : 'Chercher un conducteur'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            {/* La carte, qui contrôle maintenant les adresses */}
                            <div className="relative w-full md:w-2/3 h-96 md:h-auto min-h-[400px]">
                                <BookingMap
                                    startPoint={startPoint}
                                    endPoint={endPoint}
                                    onStartLocated={handleStartLocated}
                                    onEndLocated={handleEndLocated}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}