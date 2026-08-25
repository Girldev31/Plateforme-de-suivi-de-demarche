<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Demande;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index($demandeId)
    {
        $messages = Message::where('demande_id', $demandeId)
            ->with('agent.user')
            ->orderBy('date_envoi', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'demande_id' => 'required|exists:demandes,id',
            'contenu'    => 'required|string'
        ]);

        $message = Message::create([
            'demande_id' => $request->demande_id,
            'agent_id'   => $request->user()->agent->id,
            'contenu'    => $request->contenu,
            'date_envoi' => now()
        ]);

        return response()->json([
            'message' => 'Message envoyé.',
            'data'    => $message->load('agent.user')
        ], 201);
    }

    public function marquerLu($id)
    {
        $message = Message::findOrFail($id);
        $message->update(['lu' => true]);

        return response()->json(['message' => 'Message marqué comme lu.']);
    }
}
