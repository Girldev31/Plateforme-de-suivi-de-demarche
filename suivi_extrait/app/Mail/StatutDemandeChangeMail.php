<?php

namespace App\Mail;

use App\Models\Demande;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StatutDemandeChangeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Demande $demande,
        public string $ancienStatut
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mise à jour de votre demande — SénégalAdmin'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.statut-change'
        );
    }
}