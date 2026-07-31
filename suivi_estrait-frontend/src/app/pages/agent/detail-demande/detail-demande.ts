import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detail-demande.html',
  styleUrl: './detail-demande.scss'
})
export class DetailDemande implements OnInit {
  demandeId = '';
  observation = '';
  messageNotif = '';
  statutSelectionne = 'En cours';
  statuts = ['Nouvelle', 'En cours', 'À compléter', 'Validée', 'Rejetée'];

  demande = {
    id: 'TD-2026-A41C8',
    titre: 'Extrait de naissance',
    icon: 'description',
    statut: 'Nouvelle',
    statutColor: 'blue',
    citoyen: 'Awa Diop',
    email: 'awa.diop@email.com',
    telephone: '+33 6 12 34 56 78',
    pays: 'France',
    date: '02/07/2026',
    prix: '5 000 FCFA',
    paye: true,
    pieces: [
      { nom: 'Pièce d\'identité', fichier: 'CNI_Awa_Diop.pdf', valide: true },
      { nom: 'Justificatif d\'adresse', fichier: 'Facture_EDF.pdf', valide: false }
    ],
    informations: {
      nom: 'Awa Diop',
      dateNaissance: '15/03/1990',
      lieuNaissance: 'Dakar',
      nomPere: 'Moussa Diop',
      nomMere: 'Fatou Sall'
    },
    historique: [
      { date: '02/07/2026 09:15', action: 'Demande soumise par le citoyen', auteur: 'Système' },
      { date: '02/07/2026 10:30', action: 'Paiement confirmé', auteur: 'Système' }
    ]
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.demandeId = this.route.snapshot.params['id'];
    this.statutSelectionne = this.demande.statut;
  }

  validerDemande() {
    this.demande.statut = 'Validée';
    this.demande.statutColor = 'green';
    this.demande.historique.push({
      date: new Date().toLocaleString('fr-FR'),
      action: 'Demande validée par l\'agent',
      auteur: 'Agent'
    });
  }

  rejeterDemande() {
    this.demande.statut = 'Rejetée';
    this.demande.statutColor = 'red';
    this.demande.historique.push({
      date: new Date().toLocaleString('fr-FR'),
      action: 'Demande rejetée par l\'agent',
      auteur: 'Agent'
    });
  }

  modifierStatut() {
    this.demande.statut = this.statutSelectionne;
    this.demande.historique.push({
      date: new Date().toLocaleString('fr-FR'),
      action: `Statut modifié : ${this.statutSelectionne}`,
      auteur: 'Agent'
    });
  }

  ajouterObservation() {
    if (!this.observation.trim()) return;
    this.demande.historique.push({
      date: new Date().toLocaleString('fr-FR'),
      action: `Observation : ${this.observation}`,
      auteur: 'Agent'
    });
    this.observation = '';
  }

  envoyerNotification() {
    if (!this.messageNotif.trim()) return;
    this.demande.historique.push({
      date: new Date().toLocaleString('fr-FR'),
      action: `Notification envoyée : ${this.messageNotif}`,
      auteur: 'Agent'
    });
    this.messageNotif = '';
  }

  retour() {
    this.router.navigate(['/agent/demandes']);
  }
}
