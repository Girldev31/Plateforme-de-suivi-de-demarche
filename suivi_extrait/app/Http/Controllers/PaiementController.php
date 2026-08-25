<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaiementController extends Controller
{
    public function initierPaiement(Request $request)
    {
        Log::info('initierPaiement appelé', $request->all());

        $request->validate([
            'demande_id'     => 'required|exists:demandes,id',
            'moyen_paiement' => 'required|in:wave,orange_money,carte'
        ]);

        $demande = Demande::with('typeDemande', 'citoyen.user')->findOrFail($request->demande_id);

        $params = [
            'item_name'    => $demande->typeDemande->libelle,
            'item_price'   => $demande->typeDemande->frais,
            'currency'     => 'XOF',
            'ref_command'  => $demande->reference,
            'command_name' => 'Paiement demande ' . $demande->reference,
            'env'          => env('PAYTECH_ENV', 'test'),
            'ipn_url'      => url('/api/paiements/callback'),
            'success_url'  => env('APP_FRONTEND_URL', 'http://localhost:4200') . '/user/mes-demandes?paiement=success',
            'cancel_url'   => env('APP_FRONTEND_URL', 'http://localhost:4200') . '/user/mes-demandes?paiement=cancel',
            'custom_field' => json_encode([
                'demande_id'     => $demande->id,
                'moyen_paiement' => $request->moyen_paiement
            ])
        ];

        $response = $this->appelPaytech($params);

        Log::info('PayTech response reçue', ['response' => $response]);

        if ($response && isset($response['success']) && $response['success'] == 1) {
            Paiement::create([
                'demande_id'            => $demande->id,
                'montant'               => $demande->typeDemande->frais,
                'moyen_paiement'        => $request->moyen_paiement,
                'statut'                => 'en_attente',
                'reference_transaction' => $demande->reference,
                'date_transaction'      => now()
            ]);

            return response()->json([
                'success'      => true,
                'redirect_url' => $response['redirect_url']
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de l\'initialisation du paiement'
        ], 500);
    }

    public function callback(Request $request)
    {
        Log::info('PayTech callback reçu', $request->all());

        $customField = json_decode($request->custom_field, true);
        $demandeId = $customField['demande_id'] ?? null;
        $moyenPaiement = $customField['moyen_paiement'] ?? 'wave';

        if (!$demandeId) {
            return response()->json(['message' => 'Demande introuvable'], 404);
        }

        $paiement = Paiement::where('demande_id', $demandeId)->first();

        if ($paiement) {
            $paiement->update([
                'statut'                => 'confirme',
                'moyen_paiement'        => $moyenPaiement,
                'reference_transaction' => $request->ref_command ?? $paiement->reference_transaction,
                'date_transaction'      => now()
            ]);

            $demande = Demande::findOrFail($demandeId);
            $demande->update(['statut' => 'en_instruction']);

            $demande->load('citoyen.user', 'typeDemande');
            (new \App\Services\NotificationService())->statutChange($demande, 'soumise');
        }

        return response()->json(['message' => 'Paiement confirmé']);
    }

    public function confirmer($id)
    {
        $paiement = Paiement::findOrFail($id);
        $paiement->update(['statut' => 'confirme']);
        $paiement->demande->update(['statut' => 'en_instruction']);

        return response()->json([
            'message'  => 'Paiement confirmé.',
            'paiement' => $paiement
        ]);
    }

    private function appelPaytech(array $params): ?array
    {
        $url = 'https://paytech.sn/api/payment/request-payment';

        $headers = [
            'API_KEY: '    . env('PAYTECH_API_KEY'),
            'API_SECRET: ' . env('PAYTECH_API_SECRET'),
            'Content-Type: application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        Log::info('PayTech raw response: ' . $result);
        Log::info('PayTech curl error: ' . $error);

        return json_decode($result, true);
    }
}