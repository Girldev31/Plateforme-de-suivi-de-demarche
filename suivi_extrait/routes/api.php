<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\TypeDemandeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PieceJustificativeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CitoyenController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\ChatbotController;
use Illuminate\Support\Facades\Mail;

// Auth
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });
});

// Types de demande (public)
Route::get('/types-demandes', [TypeDemandeController::class, 'index']);

// TEST MAIL — route publique temporaire
Route::get('/test-mail', function () {
    try {
        Mail::raw('Test email SénégalAdmin', function ($message) {
            $message->to('test@test.com')
                    ->subject('Test SénégalAdmin');
        });
        return response()->json(['message' => 'Email envoyé — vérifie Mailtrap']);
    } catch (\Exception $e) {
        return response()->json(['erreur' => $e->getMessage()], 500);
    }
});

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {

    // Demandes
    Route::get('/demandes',                    [DemandeController::class, 'index']);
    Route::post('/demandes',                   [DemandeController::class, 'store']);
    Route::get('/demandes/{id}',               [DemandeController::class, 'show']);
    Route::put('/demandes/{id}/statut',        [DemandeController::class, 'updateStatut']);
    Route::get('/demandes/en-attente',         [DemandeController::class, 'mesDemandesEnAttente']);

    // Paiements
    Route::post('/paiements',                  [PaiementController::class, 'store']);
    Route::put('/paiements/{id}/confirmer',    [PaiementController::class, 'confirmer']);

    // Messages
    Route::get('/demandes/{id}/messages',      [MessageController::class, 'index']);
    Route::post('/messages',                   [MessageController::class, 'store']);
    Route::put('/messages/{id}/lu',            [MessageController::class, 'marquerLu']);

    // Pièces justificatives
    Route::post('/pieces',                     [PieceJustificativeController::class, 'store']);
    Route::put('/pieces/{id}/valider',         [PieceJustificativeController::class, 'valider']);
    Route::put('/pieces/{id}/rejeter',         [PieceJustificativeController::class, 'rejeter']);

    // Admin
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard',               [AdminController::class, 'dashboard']);
        Route::get('/utilisateurs',            [AdminController::class, 'listerUtilisateurs']);
        Route::post('/agents',                 [AdminController::class, 'creerAgent']);
        Route::put('/utilisateurs/{id}/bloquer',   [AdminController::class, 'bloquerUtilisateur']);
        Route::put('/utilisateurs/{id}/debloquer', [AdminController::class, 'debloquerUtilisateur']);
        Route::post('/types-demandes',         [TypeDemandeController::class, 'store']);
        Route::put('/types-demandes/{id}',     [TypeDemandeController::class, 'update']);
        Route::delete('/types-demandes/{id}',  [TypeDemandeController::class, 'destroy']);
    });

    // Citoyen
    Route::middleware('role:utilisateur')->prefix('citoyen')->group(function () {
        Route::get('/profil',    [CitoyenController::class, 'profil']);
        Route::put('/profil',    [CitoyenController::class, 'updateProfil']);
        Route::get('/demandes',  [CitoyenController::class, 'mesDemandes']);
    });

    // Agent
    Route::middleware('role:agent')->prefix('agent')->group(function () {
        Route::get('/profil',                           [AgentController::class, 'profil']);
        Route::get('/demandes/assignees',               [AgentController::class, 'demandesAssignees']);
        Route::get('/demandes/en-attente',              [AgentController::class, 'demandesEnAttente']);
        Route::put('/demandes/{id}/prendre-en-charge',  [AgentController::class, 'prendreEnCharge']);
        Route::put('/demandes/{id}/valider',            [AgentController::class, 'validerDemande']);
        Route::put('/demandes/{id}/rejeter',            [AgentController::class, 'rejeterDemande']);
        Route::put('/demandes/{id}/completer',          [AgentController::class, 'demanderPiecesComplementaires']);
    });

    Route::middleware('role:utilisateur')->prefix('citoyen')->group(function () {
    Route::get('/profil',    [CitoyenController::class, 'profil']);
    Route::put('/profil',    [CitoyenController::class, 'updateProfil']);
    Route::get('/demandes',  [CitoyenController::class, 'mesDemandes']);
    Route::get('/messages',  [CitoyenController::class, 'mesMessages']); // ajoute cette ligne
    });

    Route::post('/paiements/initier',           [PaiementController::class, 'initierPaiement']);
    Route::post('/paiements/callback',          [PaiementController::class, 'callback']);
    Route::put('/paiements/{id}/confirmer',     [PaiementController::class, 'confirmer']);
    Route::post('/chatbot', [App\Http\Controllers\ChatbotController::class, 'repondre']);
});