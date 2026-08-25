<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #00d084; padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; }
    .body { padding: 30px; }
    .body h2 { color: #1a1a1a; font-size: 18px; }
    .body p { color: #555; line-height: 1.7; }
    .statut-badge { display: inline-block; background: #00d084; color: #000; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 14px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #00d084; padding: 16px; border-radius: 4px; margin: 20px 0; }
    .info-box p { margin: 4px 0; color: #333; font-size: 14px; }
    .btn { display: block; width: fit-content; margin: 24px auto; background: #00d084; color: #ffffff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; }
    .footer { background: #0a0e1a; padding: 20px; text-align: center; }
    .footer p { color: #9ca3af; font-size: 12px; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SénégalAdmin</h1>
    </div>
    <div class="body">
      <h2>Bonjour {{ $demande->citoyen->user->name }},</h2>
      <p>Le statut de votre demande <strong>{{ $demande->reference }}</strong> vient d'être mis à jour.</p>

      <div class="info-box">
        <p><strong>Document :</strong> {{ $demande->typeDemande->libelle }}</p>
        <p><strong>Ancien statut :</strong> {{ $ancienStatut }}</p>
        <p><strong>Nouveau statut :</strong> <span class="statut-badge">{{ $demande->statut }}</span></p>
        @if($demande->observation)
        <p><strong>Observation :</strong> {{ $demande->observation }}</p>
        @endif
      </div>

      @if($demande->statut === 'validee')
      <p>🎉 Félicitations ! Votre document est en cours de préparation. Vous serez notifié dès qu'il sera disponible.</p>
      @elseif($demande->statut === 'rejetee')
      <p>Votre demande a malheureusement été rejetée. Veuillez consulter l'observation ci-dessus pour plus de détails.</p>
      @elseif($demande->statut === 'en_instruction')
      <p>Votre dossier est actuellement en cours de traitement par nos agents. Nous reviendrons vers vous très prochainement.</p>
      @endif

      <a href="{{ config('app.url') }}/user/mes-demandes" class="btn">Voir ma demande</a>
    </div>
    <div class="footer">
      <p>© {{ date('Y') }} SénégalAdmin — Vos démarches administratives en ligne</p>
    </div>
  </div>
</body>
</html>