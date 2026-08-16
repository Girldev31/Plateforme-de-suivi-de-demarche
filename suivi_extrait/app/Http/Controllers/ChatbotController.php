<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function repondre(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $systemPrompt = "Tu es Abdoul, l'assistant virtuel de la plateforme SénégalAdmin. 
Tu aides les citoyens sénégalais de la diaspora à effectuer leurs démarches administratives en ligne.
Tu réponds toujours en français de manière claire, concise et professionnelle.
Tu connais les services suivants :
- Extrait de naissance : 5 000 FCFA, délai 5 à 10 jours
- Casier judiciaire : 7 500 FCFA, délai 5 à 8 jours
- Certificat de mariage : 6 000 FCFA, délai 7 à 14 jours
- Certificat de résidence : 3 500 FCFA, délai 3 à 7 jours

Pour soumettre une demande :
1. Créer un compte sur la plateforme
2. Aller dans Nouvelle demande
3. Choisir le document, remplir le formulaire, joindre les pièces
4. Confirmer le paiement via Wave, Orange Money ou carte bancaire
5. Suivre l'avancement dans Mes demandes

Tu ne réponds qu'aux questions liées aux démarches administratives sénégalaises.";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
                'Content-Type'  => 'application/json'
            ])->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama-3.1-8b-instant',
                'max_tokens' => 1024,
                'messages'   => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user',   'content' => $request->message]
                ]
            ]);

            $data = $response->json();

            $texte = $data['choices'][0]['message']['content']
                ?? 'Je suis désolé, je n\'ai pas pu traiter votre demande.';

            return response()->json(['reponse' => $texte]);

        } catch (\Exception $e) {
            return response()->json([
                'reponse' => 'Je suis temporairement indisponible. Veuillez réessayer.'
            ], 500);
        }
    }
}