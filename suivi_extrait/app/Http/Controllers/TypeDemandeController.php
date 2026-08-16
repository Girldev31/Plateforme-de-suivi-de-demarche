<?php

namespace App\Http\Controllers;

use App\Models\TypeDemande;
use Illuminate\Http\Request;

class TypeDemandeController extends Controller
{
    public function index()
    {
        return response()->json(TypeDemande::where('actif', true)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle'          => 'required|string',
            'description'      => 'nullable|string',
            'frais'            => 'required|numeric',
            'delai_traitement' => 'required|integer'
        ]);

        $type = TypeDemande::create($request->all());

        return response()->json($type, 201);
    }

    public function update(Request $request, $id)
    {
        $type = TypeDemande::findOrFail($id);
        $type->update($request->all());

        return response()->json($type);
    }

    public function destroy($id)
    {
        $type = TypeDemande::findOrFail($id);
        $type->update(['actif' => false]);

        return response()->json(['message' => 'Type désactivé.']);
    }
}