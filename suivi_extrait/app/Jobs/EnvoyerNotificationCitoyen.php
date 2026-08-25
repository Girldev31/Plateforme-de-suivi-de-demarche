<?php

namespace App\Jobs;

use App\Models\Demande;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EnvoyerNotificationCitoyen implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $demandeId,
        public string $type,
        public string $message = ''
    ) {}

    public function handle(): void
    {
        $demande = Demande::with('citoyen.user', 'typeDemande')->find($this->demandeId);

        if (!$demande || !$demande->citoyen?->user) return;

        $citoyen = $demande->citoyen->user;
        $this->envoyerMail($demande, $citoyen);
    }

    private function envoyerMail(Demande $demande, $citoyen): void
    {
        try {
            $sujet = $this->getSujet();
            $contenu = $this->getContenu($demande, $citoyen);

            Mail::raw($contenu, function ($m) use ($citoyen, $sujet) {
                $m->to($citoyen->email)->subject($sujet);
            });

            Log::info("Mail envoyé à {$citoyen->email} pour demande {$demande->reference}");

        } catch (\Exception $e) {
            Log::error('Échec envoi mail : ' . $e->getMessage());
        }
    }

    private function getSujet(): string
    {
        return match($this->type) {
            'demande_recue'   => 'SénégalAdmin — Votre demande a été reçue',
            'statut_change'   => 'SénégalAdmin — Mise à jour de votre demande',
            'piece_manquante' => 'SénégalAdmin — Action requise sur votre dossier',
            'document_pret'   => 'SénégalAdmin — Votre document est prêt',
            default           => 'SénégalAdmin — Notification'
        };
    }

    private function getContenu(Demande $demande, $citoyen): string
    {
        $nom = $citoyen->name;
        $ref = $demande->reference;
        $doc = $demande->typeDemande->libelle;
        $url = config('app.url') . '/user/mes-demandes';

        return match($this->type) {
            'demande_recue' =>
"Bonjour {$nom},

Votre demande de {$doc} a bien été reçue et enregistrée sur SénégalAdmin.

Référence : {$ref}
Délai estimé : {$demande->typeDemande->delai_traitement} jours ouvrés

Un agent va prendre en charge votre dossier prochainement.

Suivez l'avancement sur : {$url}

Cordialement,
L'équipe SénégalAdmin",

            'statut_change' =>
"Bonjour {$nom},

Le statut de votre demande {$ref} ({$doc}) vient d'être mis à jour.

" . match($demande->statut) {
    'en_instruction' => "✅ Votre demande est en cours de traitement par nos agents. Vous serez notifié dès qu'une décision sera prise.",
    'validee'        => "✅ Votre demande a été validée ! Votre document est en cours de préparation.",
    'rejetee'        => "❌ Votre demande a été rejetée." . ($demande->observation ? "\n\nMotif : {$demande->observation}" : ""),
    'expediee'       => "📦 Votre document a été expédié. Vous le recevrez prochainement.",
    'a_completer'    => "⚠️ Des informations complémentaires sont requises pour votre dossier.",
    default          => "Nouveau statut : {$demande->statut}"
} . "

Consultez votre dossier sur : {$url}

Cordialement,
L'équipe SénégalAdmin",

            'piece_manquante' =>
"Bonjour {$nom},

⚠️ Action requise sur votre dossier {$ref} ({$doc}).

Message de l'agent : {$this->message}

Veuillez compléter votre dossier sur : {$url}

Sans réponse de votre part dans les 7 jours, votre demande sera annulée.

Cordialement,
L'équipe SénégalAdmin",

            'document_pret' =>
"Bonjour {$nom},

🎉 Bonne nouvelle ! Votre {$doc} est maintenant disponible.

Référence : {$ref}

Téléchargez votre document sur : {$url}

Cordialement,
L'équipe SénégalAdmin",

            default =>
"Bonjour {$nom},

Une mise à jour concerne votre dossier {$ref}.

Consultez votre espace sur : {$url}

Cordialement,
L'équipe SénégalAdmin"
        };
    }
}