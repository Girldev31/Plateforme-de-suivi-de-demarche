<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PieceJustificative extends Model
{
    protected $table = 'pieces_justificatives';

    protected $fillable = [
        'demande_id',
        'nom_fichier',
        'chemin_fichier',
        'type',
        'est_valide',
        'commentaire'
    ];

    protected $casts = [
        'est_valide' => 'boolean'
    ];

    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }
}