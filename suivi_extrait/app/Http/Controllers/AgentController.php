<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Demande;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function profil(Request $request)
    {
        $agent = $request->user()->agent;
        return response()->json($agent->load('user'));
    }

    public function demandesAssignees(Request $request)
    {
        $agent = $request->user()->agent;
        $demandes = $agent->demandes()
            ->with(['typeDemande', 'citoyen.user', 'paiement', 'pieces'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($demandes);
    }

    public function demandesEnAttente()
    {
        $demandes = Demande::where('statut', 'soumise')
            ->whereNull('agent_id')
            ->with(['typeDemande', 'citoyen.user', 'paiement'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($demandes);
    }

    public function prendreEnCharge(Request $request, $id)
    {
        $agent = $request->user()->agent;
        $demande = Demande::findOrFail($id);

        if ($demande->agent_id) {
            return response()->json([
                'message' => 'Cette demande est déjà prise en charge.'
            ], 400);
        }

        $demande->update([
            'agent_id' => $agent->id,
            'statut'   => 'en_instruction'
        ]);

        return response()->json([
            'message' => 'Demande prise en charge.',
            'demande' => $demande->load('typeDemande', 'citoyen.user')
        ]);
    }

    public function validerDemande(Request $request, $id)
    {
        $request->validate([
            'observation' => 'nullable|string'
        ]);

        $demande = Demande::findOrFail($id);
        $demande->update([
            'statut'      => 'validee',
            'observation' => $request->observation
        ]);

        return response()->json([
            'message' => 'Demande validée.',
            'demande' => $demande->load('typeDemande', 'citoyen.user')
        ]);
    }

    public function rejeterDemande(Request $request, $id)
    {
        $request->validate([
            'observation' => 'required|string'
        ]);

        $demande = Demande::findOrFail($id);
        $demande->update([
            'statut'      => 'rejetee',
            'observation' => $request->observation
        ]);

        return response()->json([
            'message' => 'Demande rejetée.',
            'demande' => $demande->load('typeDemande', 'citoyen.user')
        ]);
    }

    public function demanderPiecesComplementaires(Request $request, $id)
    {
        $request->validate([
            'contenu' => 'required|string'
        ]);

        $agent = $request->user()->agent;
        $demande = Demande::findOrFail($id);

        $demande->update(['statut' => 'a_completer']);

        $message = \App\Models\Message::create([
            'demande_id' => $demande->id,
            'agent_id'   => $agent->id,
            'contenu'    => $request->contenu,
            'date_envoi' => now()
        ]);
        
        
        $demande->load('citoyen.user', 'typeDemande');
        (new \App\Services\NotificationService())->pieceManquante($demande, $request->contenu);

        return response()->json([
            'message' => 'Demande mise à compléter et message envoyé.',
            'data'    => $message->load('agent.user')
        ]);
    }
}