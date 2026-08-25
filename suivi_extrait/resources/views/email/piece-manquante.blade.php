<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #f59e0b; padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; }
    .body { padding: 30px; }
    .body h2 { color: #1a1a1a; font-size: 18px; }
    .body p { color: #555; line-height: 1.7; }
    .warning-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin: 20px 0; }
    .warning-box p { margin: 4px 0; color: #333; font-size: 14px; }
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
      <h1>⚠️ Action requise — SénégalAdmin</h1>
    </div>
    <div class="body">
      <h2>Bonjour {{ $demande->citoyen->user->name }},</h2>
      <p>Votre dossier <strong>{{ $demande->reference }}</strong> nécessite une action de votre part.</p>

      <div class="warning-box">
        <p><strong>⚠️ Pièce(s) manquante(s) détectée(s)</strong></p>
        <p>{{ $message }}</p>
      </div>

      <div class="info-box">
        <p><strong>Document demandé :</strong> {{ $demande->typeDemande->libelle }}</p>
        <p><strong>Référence :</strong> {{ $demande->reference }}</p>
      </div>

      <p>Veuillez vous connecter à votre espace personnel pour compléter votre dossier dans les plus brefs délais.</p>
      <p>Sans réponse de votre part dans les <strong>7 jours</strong>, votre demande sera automatiquement annulée.</p>

      <a href="{{ config('app.url') }}/user/mes-demandes" class="btn">Compléter mon dossier</a>
    </div>
    <div class="footer">
      <p>© {{ date('Y') }} SénégalAdmin — Vos démarches administratives en ligne</p>
    </div>
  </div>
</body>
</html>