<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;
use App\Models\Booking;


Route::get('/bookings/{booking}', [BookingController::class, 'show'])
    ->middleware(['auth', 'verified'])->name('bookings.show');

Route::get('/', function () {
   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/bookings', [BookingController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('bookings.index');

Route::post('/bookings', [BookingController::class, 'store'])
    ->middleware(['auth', 'verified'])->name('bookings.store');

Route::get('/dashboard', function () {
    // On cherche la dernière réservation qui n'est ni 'completed' ni 'cancelled'
    $activeBooking = Booking::where('user_id', Auth::id())
                            ->whereNotIn('status', ['completed', 'cancelled'])
                            ->latest()
                            ->first();

    return Inertia::render('Dashboard', [
        'activeBooking' => $activeBooking
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
