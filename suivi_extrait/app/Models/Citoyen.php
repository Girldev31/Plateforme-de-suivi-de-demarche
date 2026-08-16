<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Citoyen extends Model
{
    
    protected $fillable = [
        'user_id',
        'pays_residence',
        'numero_passeport',
        'telephone',
        'adresse'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function demandes()
    {
        return $this->hasMany(Demande::class);
    }
}