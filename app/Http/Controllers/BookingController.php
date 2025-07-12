<?php
// app/Http/Controllers/BookingController.php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response; 


class BookingController extends Controller
{
        public function index(): Response // On type-hint la réponse Inertia pour plus de clarté
    {
        $bookings = Booking::where('user_id', Auth::id())
                            ->latest() // Raccourci pour orderBy('created_at', 'desc')
                            ->get();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }
     public function show(Booking $booking)
    {
        // Sécurité : Vérifier que l'utilisateur authentifié est le propriétaire de la réservation
        if ($booking->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // --- Simulation de la recherche de conducteur ---
        // Si la réservation est en recherche depuis plus de 5 secondes,
        // on simule une chance sur deux de trouver un conducteur.
        if ($booking->status === 'searching' && $booking->updated_at->diffInSeconds(now()) > 5) {
            if (rand(0, 1) === 1) { // 50% de chance
                $booking->status = 'confirmed';
                $booking->save();
            } else {
                // On "touche" le timestamp pour ne pas revérifier à chaque appel
                $booking->touch(); 
            }
        }

        return response()->json($booking);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
     $validatedData = $request->validate([
        'passenger_name' => 'required|string|max:255',
        'passenger_phone' => 'required|string|max:20',
        'start_address' => 'required|string|max:255',
        'destination_address' => 'required|string|max:255',

        // On valide les coordonnées qui sont envoyées par le frontend
        'start_latitude' => 'required|numeric|between:-90,90',
        'start_longitude' => 'required|numeric|between:-180,180',
        'destination_latitude' => 'required|numeric|between:-90,90',
        'destination_longitude' => 'required|numeric|between:-180,180',
    ]);

    // 2. Création de la réservation avec les données validées
    Booking::create([
        'user_id' => Auth::id(),
        'passenger_name' => $validatedData['passenger_name'],
        'passenger_phone' => $validatedData['passenger_phone'],
        'start_address' => $validatedData['start_address'],
        'destination_address' => $validatedData['destination_address'],
        'start_latitude' => $validatedData['start_latitude'], // Utilisation des données du formulaire
        'start_longitude' => $validatedData['start_longitude'], // Utilisation des données du formulaire
        'destination_latitude' => $validatedData['destination_latitude'], // Utilisation des données du formulaire
        'destination_longitude' => $validatedData['destination_longitude'], // Utilisation des données du formulaire
        'status' => 'searching',
    ]);

    return Redirect::route('dashboard')->with('success', 'Réservation enregistrée ! Nous cherchons un conducteur pour vous.');
}
}