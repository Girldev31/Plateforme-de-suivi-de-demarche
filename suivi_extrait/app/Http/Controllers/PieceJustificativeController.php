<?php

namespace App\Http\Controllers;

use App\Models\PieceJustificative;
use Illuminate\Http\Request;

class PieceJustificativeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'demande_id' => 'required|exists:demandes,id',
            'fichier'    => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240'
        ]);

        $fichier = $request->file('fichier');
        $nomFichier = time() . '_' . $fichier->getClientOriginalName();
        $chemin = $fichier->storeAs('pieces', $nomFichier, 'private');

        $piece = PieceJustificative::create([
            'demande_id'    => $request->demande_id,
            'nom_fichier'   => $fichier->getClientOriginalName(),
            'chemin_fichier' => $chemin,
            'type'          => $fichier->getClientMimeType(),
            'est_valide'    => false
        ]);

        return response()->json([
            'message' => 'Pièce uploadée.',
            'piece'   => $piece
        ], 201);
    }

    public function valider(Request $request, $id)
    {
        $piece = PieceJustificative::findOrFail($id);
        $piece->update([
            'est_valide'  => true,
            'commentaire' => $request->commentaire
        ]);

        return response()->json(['message' => 'Pièce validée.']);
    }

    public function rejeter(Request $request, $id)
    {
        $piece = PieceJustificative::findOrFail($id);
        $piece->update([
            'est_valide'  => false,
            'commentaire' => $request->commentaire
        ]);

        return response()->json(['message' => 'Pièce rejetée.']);
    }
}