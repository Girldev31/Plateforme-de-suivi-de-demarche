<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeDemande extends Model
{
    protected $fillable = [
        'libelle',
        'description',
        'frais',
        'delai_traitement',
        'actif'
    ];

    public function demandes()
    {
        return $this->hasMany(Demande::class);
    }
}