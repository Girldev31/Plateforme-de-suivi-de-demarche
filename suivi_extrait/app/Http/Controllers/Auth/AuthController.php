<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Citoyen;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|unique:users',
            'password'         => 'required|string|min:8|confirmed',
            'telephone'        => 'nullable|string',
            'pays_residence'   => 'nullable|string',
            'numero_passeport' => 'nullable|string',
            'adresse'          => 'nullable|string',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'statut'   => 'actif'
        ]);

        $user->assignRole('utilisateur');

        Citoyen::create([
            'user_id'          => $user->id,
            'pays_residence'   => $request->pays_residence,
            'numero_passeport' => $request->numero_passeport,
            'telephone'        => $request->telephone,
            'adresse'          => $request->adresse
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user->load('citoyen'),
            'token' => $token,
            'role'  => $user->getRoleNames()->first()
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        if ($user->statut !== 'actif') {
            return response()->json([
                'message' => 'Votre compte est suspendu ou inactif.'
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user->load('citoyen', 'agent'),
            'token' => $token,
            'role'  => $user->getRoleNames()->first()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load('citoyen', 'agent'),
            'role' => $request->user()->getRoleNames()->first()
        ]);
    }
}