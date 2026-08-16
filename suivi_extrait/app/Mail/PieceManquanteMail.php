<?php

namespace App\Mail;

use App\Models\Demande;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PieceManquanteMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Demande $demande,
        public string $message
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pièce manquante sur votre demande — SénégalAdmin'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.piece-manquante'
        );
    }
}