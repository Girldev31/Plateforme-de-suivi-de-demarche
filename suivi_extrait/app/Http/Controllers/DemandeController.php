<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use App\Models\TypeDemande;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DemandeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $role = $user->getRoleNames()->first();

        if ($role === 'utilisateur') {
            $demandes = Demande::where('citoyen_id', $user->citoyen->id)
                ->with(['typeDemande', 'paiement', 'agent.user'])
                ->orderBy('created_at', 'desc')
                ->get();
        } elseif ($role === 'agent') {
            $demandes = Demande::where('agent_id', $user->agent->id)
                ->with(['typeDemande', 'paiement', 'citoyen.user'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $demandes = Demande::with(['typeDemande', 'paiement', 'citoyen.user', 'agent.user'])
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($demandes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type_demande_id' => 'required|exists:type_demandes,id',
            'informations'    => 'required|array',
        ]);

        $user = $request->user();

        $demande = Demande::create([
            'reference'       => 'TD-' . date('Y') . '-' . strtoupper(Str::random(5)),
            'citoyen_id'      => $user->citoyen->id,
            'type_demande_id' => $request->type_demande_id,
            'statut'          => 'soumise',
            'date_soumission' => now(),
            'informations'    => $request->informations
        ]);

        $demande->load('citoyen.user', 'typeDemande');
        (new NotificationService())->demandeRecue($demande);

        return response()->json([
            'message' => 'Demande soumise avec succès.',
            'demande' => $demande
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $demande = Demande::with([
            'typeDemande',
            'paiement',
            'pieces',
            'messages.agent.user',
            'citoyen.user',
            'agent.user'
        ])->findOrFail($id);

        return response()->json($demande);
    }

    public function updateStatut(Request $request, $id)
    {
        $request->validate([
            'statut'      => 'required|in:soumise,en_instruction,a_completer,validee,rejetee,expediee,recue',
            'observation' => 'nullable|string'
        ]);

        $demande = Demande::findOrFail($id);
        $ancienStatut = $demande->statut;

        $demande->update([
            'statut'      => $request->statut,
            'observation' => $request->observation,
            'agent_id'    => $request->user()->agent->id ?? $demande->agent_id
        ]);

        $demande->load('citoyen.user', 'typeDemande');
        (new NotificationService())->statutChange($demande, $ancienStatut);

        if ($request->statut === 'validee') {
            (new NotificationService())->documentPret($demande);
        }

        return response()->json([
            'message' => 'Statut mis à jour.',
            'demande' => $demande->load('typeDemande', 'citoyen.user')
        ]);
    }

    public function mesDemandesEnAttente()
    {
        $demandes = Demande::whereNull('agent_id')
            ->orWhere('statut', 'soumise')
            ->with(['typeDemande', 'citoyen.user'])
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($demandes);
    }
}