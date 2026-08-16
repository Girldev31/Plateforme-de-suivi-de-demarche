<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'demande_id',
        'agent_id',
        'contenu',
        'date_envoi',
        'lu'
    ];

    protected $casts = [
        'date_envoi' => 'datetime',
        'lu' => 'boolean'
    ];

    public function demande()
    {
        return $this->belongsTo(Demande::class);
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }
}
