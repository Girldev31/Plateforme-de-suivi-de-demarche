<?php

namespace App\Http\Controllers;

use App\Models\Citoyen;
use Illuminate\Http\Request;

class CitoyenController extends Controller
{
    public function profil(Request $request)
    {
        $citoyen = $request->user()->citoyen;
        return response()->json($citoyen->load('user'));
    }

    public function updateProfil(Request $request)
    {
        $request->validate([
            'pays_residence'   => 'nullable|string',
            'numero_passeport' => 'nullable|string',
            'telephone'        => 'nullable|string',
            'adresse'          => 'nullable|string',
            'name'             => 'nullable|string'
        ]);

        $user = $request->user();
        $citoyen = $user->citoyen;

        if ($request->name) {
            $user->update(['name' => $request->name]);
        }

        $citoyen->update($request->only([
            'pays_residence',
            'numero_passeport',
            'telephone',
            'adresse'
        ]));

        return response()->json([
            'message' => 'Profil mis à jour.',
            'citoyen' => $citoyen->load('user')
        ]);
    }

    public function mesDemandes(Request $request)
    {
        $citoyen = $request->user()->citoyen;
        $demandes = $citoyen->demandes()
            ->with(['typeDemande', 'paiement', 'pieces', 'messages'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($demandes);
    }

    public function mesMessages(Request $request)
{
    $citoyen = $request->user()->citoyen;
    $messages = \App\Models\Message::whereHas('demande', function($q) use ($citoyen) {
        $q->where('citoyen_id', $citoyen->id);
    })
    ->with('agent.user')
    ->orderBy('date_envoi', 'desc')
    ->get();

    return response()->json($messages);
}
}