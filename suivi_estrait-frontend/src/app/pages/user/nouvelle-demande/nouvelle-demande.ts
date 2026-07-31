import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nouvelle-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nouvelle-demande.html',
  styleUrl: './nouvelle-demande.scss'
})
export class NouvelleDemande {
  currentStep = 1;
  totalSteps = 5;
    Math = Math;  // ajoute cette ligne
 

  selectedDocument: any = null;
  paymentMethod = 'wave';
  nom = '';
  dateNaissance = '';
  lieuNaissance = '';
  nomPere = '';
  nomMere = '';

  documents = [
  {
    icone: 'description',
    titre: 'Extrait de naissance',
    description: 'Acte délivré par votre commune de naissance',
    prix: '5 000 FCFA',
    delai: '5 à 10 jours'
  },
  {
    icone: 'favorite',
    titre: 'Certificat de mariage',
    description: 'Acte délivré par la commune du mariage',
    prix: '6 000 FCFA',
    delai: '7 à 14 jours'
  },
  {
    icone: 'gavel',
    titre: 'Casier judiciaire (Bulletin n°3)',
    description: 'Extrait du casier national',
    prix: '7 500 FCFA',
    delai: '5 à 8 jours'
  },
  {
    icone: 'home',
    titre: 'Certificat de résidence',
    description: 'Attestation de votre lieu de résidence',
    prix: '3 500 FCFA',
    delai: '3 à 7 jours'
  }
];

  steps = [
    'Service',
    'Informations',
    'Pièces',
    'Paiement',
    'Confirmation'
  ];

  selectDocument(doc: any) {
    this.selectedDocument = doc;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getStepProgress(step: number): string {
    return step <= this.currentStep ? 'done' : 'pending';
  }
}
