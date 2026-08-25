<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    protected $fillable = [
        'reference',
        'citoyen_id',
        'agent_id',
        'type_demande_id',
        'statut',
        'date_soumission',
        'date_retrait',
        'observation',
        'informations'
    ];

    protected $casts = [
        'informations' => 'array',
        'date_soumission' => 'datetime',
        'date_retrait' => 'datetime'
    ];

    public function citoyen()
    {
        return $this->belongsTo(Citoyen::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function typeDemande()
    {
        return $this->belongsTo(TypeDemande::class);
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class);
    }

    public function pieces()
    {
        return $this->hasMany(PieceJustificative::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
