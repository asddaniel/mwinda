<?php

// database/seeders/BookingSeeder.php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Crée un utilisateur de test spécifique si il n'existe pas
        $testUser = User::firstOrCreate(
            ['email' => 'test@mwinda.com'],
            [
                'name' => 'Utilisateur de Test',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Créer plusieurs réservations pour cet utilisateur
        $bookings = [
            [
                'passenger_name' => $testUser->name,
                'passenger_phone' => '+243810000001',
                'start_address' => 'Place de la Victoire, ',
                'destination_address' => 'Stade des Kibasa Maliba',
                'start_latitude' => -11.3316,
                'start_longitude' => 27.3138,
                'destination_latitude' => -11.3056,
                'destination_longitude' => 27.3197,
                'status' => 'completed',
                'created_at' => now()->subDays(2),
            ],
            [
                'passenger_name' => $testUser->name,
                'passenger_phone' => '+243810000001',
                'start_address' => 'Place Kin Marché',
                'destination_address' => 'Luapula, Kamalondo',
                'start_latitude' => -11.3857,
                'start_longitude' => 27.4447,
                'destination_latitude' => -11.3125,
                'destination_longitude' => 27.3044,
                'status' => 'cancelled',
                'created_at' => now()->subDays(5),
            ],
            [
                'passenger_name' => $testUser->name,
                'passenger_phone' => '+243810000001',
                'start_address' => 'Université de Lubumbashi',
                'destination_address' => 'KilobeLobe, C/annexe',
                'start_latitude' => -11.4172,
                'start_longitude' => 27.2892,
                'destination_latitude' => -11.3217,
                'destination_longitude' => 27.2829,
                'status' => 'confirmed',
                'created_at' => now()->subHours(3),
            ]
        ];

        foreach ($bookings as $bookingData) {
            $testUser->bookings()->create($bookingData);
        }
    }
}