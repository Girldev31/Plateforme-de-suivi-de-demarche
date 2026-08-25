<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Agent;
use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'total_demandes'    => Demande::count(),
            'demandes_soumises' => Demande::where('statut', 'soumise')->count(),
            'demandes_validees' => Demande::where('statut', 'validee')->count(),
            'demandes_rejetees' => Demande::where('statut', 'rejetee')->count(),
            'total_citoyens'    => User::role('utilisateur')->count(),
            'total_agents'      => User::role('agent')->count()
        ]);
    }

    public function listerUtilisateurs()
    {
        return response()->json(
            User::with('citoyen', 'agent')
                ->whereDoesntHave('roles', fn($q) => $q->where('name', 'admin'))
                ->get()
        );
    }

    public function creerAgent(Request $request)
    {
        $request->validate([
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|string|min:8',
            'matricule' => 'required|string|unique:agents',
            'service'   => 'nullable|string'
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'statut'   => 'actif'
        ]);

        $user->assignRole('agent');

        Agent::create([
            'user_id'   => $user->id,
            'matricule' => $request->matricule,
            'service'   => $request->service
        ]);

        return response()->json([
            'message' => 'Agent créé.',
            'user'    => $user->load('agent')
        ], 201);
    }

    public function bloquerUtilisateur($id)
    {
        $user = User::findOrFail($id);
        $user->update(['statut' => 'suspendu']);

        return response()->json(['message' => 'Utilisateur suspendu.']);
    }

    public function debloquerUtilisateur($id)
    {
        $user = User::findOrFail($id);
        $user->update(['statut' => 'actif']);

        return response()->json(['message' => 'Utilisateur réactivé.']);
    }
}