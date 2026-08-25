<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
    'demande_id',
    'montant',
    'moyen_paiement',
    'statut',
    'reference_transaction',
    'date_transaction'
];
}
