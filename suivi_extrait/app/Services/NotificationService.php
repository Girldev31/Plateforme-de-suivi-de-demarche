<?php

namespace App\Services;

use App\Jobs\EnvoyerNotificationCitoyen;
use App\Models\Demande;

class NotificationService
{
    public function demandeRecue(Demande $demande): void
    {
        EnvoyerNotificationCitoyen::dispatch($demande->id, 'demande_recue');
    }

    public function statutChange(Demande $demande, string $ancienStatut): void
    {
        EnvoyerNotificationCitoyen::dispatch($demande->id, 'statut_change');
    }

    public function pieceManquante(Demande $demande, string $message): void
    {
        EnvoyerNotificationCitoyen::dispatch($demande->id, 'piece_manquante', $message);
    }

    public function documentPret(Demande $demande): void
    {
        EnvoyerNotificationCitoyen::dispatch($demande->id, 'document_pret');
    }
}