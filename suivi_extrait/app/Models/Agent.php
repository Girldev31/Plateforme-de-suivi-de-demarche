<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    protected $fillable = [
        'user_id',
        'matricule',
        'service'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function demandes()
    {
        return $this->hasMany(Demande::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
