<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #00d084; padding: 30px; text-align: center; }
    .header img { height: 40px; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 10px 0 0; }
    .body { padding: 30px; }
    .body h2 { color: #1a1a1a; font-size: 18px; }
    .body p { color: #555; line-height: 1.7; }
    .steps { display: flex; justify-content: space-between; margin: 24px 0; }
    .step { text-align: center; flex: 1; }
    .step-circle { width: 48px; height: 48px; border-radius: 50%; background: #00d084; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; }
    .step-circle.inactive { background: #ddd; }
    .step-label { font-size: 12px; color: #555; font-weight: bold; }
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
      <p>Bonne nouvelle ! Votre demande de <strong>{{ $demande->typeDemande->libelle }}</strong> a bien été reçue et enregistrée sur notre plateforme.</p>

      <div class="info-box">
        <p><strong>Référence :</strong> {{ $demande->reference }}</p>
        <p><strong>Document :</strong> {{ $demande->typeDemande->libelle }}</p>
        <p><strong>Date de soumission :</strong> {{ $demande->date_soumission->format('d/m/Y à H:i') }}</p>
        <p><strong>Délai estimé :</strong> {{ $demande->typeDemande->delai_traitement }} jours ouvrés</p>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding: 0 8px;">
                  <div style="width:48px;height:48px;border-radius:50%;background:#00d084;display:inline-block;line-height:48px;text-align:center;color:#fff;font-weight:bold;">✓</div>
                  <p style="font-size:11px;color:#555;margin:4px 0;">Soumise</p>
                </td>
                <td style="width:40px;border-top:2px solid #ddd;"></td>
                <td align="center" style="padding: 0 8px;">
                  <div style="width:48px;height:48px;border-radius:50%;background:#ddd;display:inline-block;line-height:48px;text-align:center;color:#fff;font-weight:bold;">2</div>
                  <p style="font-size:11px;color:#555;margin:4px 0;">En traitement</p>
                </td>
                <td style="width:40px;border-top:2px solid #ddd;"></td>
                <td align="center" style="padding: 0 8px;">
                  <div style="width:48px;height:48px;border-radius:50%;background:#ddd;display:inline-block;line-height:48px;text-align:center;color:#fff;font-weight:bold;">3</div>
                  <p style="font-size:11px;color:#555;margin:4px 0;">Validée</p>
                </td>
                <td style="width:40px;border-top:2px solid #ddd;"></td>
                <td align="center" style="padding: 0 8px;">
                  <div style="width:48px;height:48px;border-radius:50%;background:#ddd;display:inline-block;line-height:48px;text-align:center;color:#fff;font-weight:bold;">4</div>
                  <p style="font-size:11px;color:#555;margin:4px 0;">Disponible</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p>Vous recevrez un email à chaque étape du traitement de votre dossier.</p>
      <a href="{{ config('app.url') }}/user/mes-demandes" class="btn">Suivre ma demande</a>
    </div>
    <div class="footer">
      <p>© {{ date('Y') }} SénégalAdmin — Vos démarches administratives en ligne</p>
    </div>
  </div>
</body>
</html>