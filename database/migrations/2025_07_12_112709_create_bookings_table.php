<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // Lien vers l'utilisateur qui a fait la réservation
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Informations du passager (même si c'est l'utilisateur, on les stocke pour l'historique)
            $table->string('passenger_name');
            $table->string('passenger_phone');

            // Adresses de départ et de destination
            $table->string('start_address');
            $table->string('destination_address');

            // Coordonnées géographiques pour la carte
            // La précision 10, 7 est idéale pour les coordonnées GPS (ex: -4.3250000)
            $table->decimal('start_latitude', 10, 7);
            $table->decimal('start_longitude', 10, 7);
            $table->decimal('destination_latitude', 10, 7);
            $table->decimal('destination_longitude', 10, 7);

            // Statut de la réservation
            $table->enum('status', ['pending', 'searching', 'confirmed', 'completed', 'cancelled'])->default('pending');

            $table->timestamps(); // Crée les colonnes created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};