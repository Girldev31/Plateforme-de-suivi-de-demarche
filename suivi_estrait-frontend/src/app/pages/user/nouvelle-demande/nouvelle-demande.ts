import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { DemandeService } from '../../../core/demande';
import { UploadService } from '../../../core/upload';

@Component({
  selector: 'app-nouvelle-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nouvelle-demande.html',
  styleUrl: './nouvelle-demande.scss'
})
export class NouvelleDemande implements OnInit {
  Math = Math;
  currentStep = 1;
  totalSteps = 5;
  loading = false;
  error = '';
  demandeCreee: any = null;
  uploadSuccess = false;
  uploadError = '';
  fichiersSelectionnes: File[] = [];

  selectedDocument: any = null;
  paymentMethod = 'wave';
  nom = '';
  dateNaissance = '';
  lieuNaissance = '';
  nomPere = '';
  nomMere = '';

  documents: any[] = [];
  steps = ['Service', 'Informations', 'Pièces', 'Paiement', 'Confirmation'];

  constructor(
    private demandeService: DemandeService,
    private uploadService: UploadService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.demandeService.getTypesdemandes().subscribe({
      next: (res: any) => {
        this.documents = res;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Erreur lors du chargement des services.';
        this.cdr.markForCheck();
      }
    });
  }

  selectDocument(doc: any) { this.selectedDocument = doc; }

  onFichierChange(event: any) {
    this.fichiersSelectionnes = Array.from(event.target.files);
    this.cdr.markForCheck();
  }

  uploadFichiers() {
    if (!this.demandeCreee || this.fichiersSelectionnes.length === 0) {
      this.nextStepDirect();
      return;
    }

    this.loading = true;
    let uploaded = 0;

    this.fichiersSelectionnes.forEach(fichier => {
      this.uploadService.uploadPiece(this.demandeCreee.id, fichier).subscribe({
        next: () => {
          uploaded++;
          if (uploaded === this.fichiersSelectionnes.length) {
            this.loading = false;
            this.uploadSuccess = true;
            this.nextStepDirect();
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          this.loading = false;
          this.uploadError = 'Erreur lors de l\'upload : ' + (err.error?.message || 'Erreur inconnue');
          this.cdr.markForCheck();
        }
      });
    });
  }

   payerDemande() {
    if (!this.demandeCreee) return;

    this.loading = true;
    this.demandeService.initierPaiement({
      demande_id: this.demandeCreee.id,
      moyen_paiement: this.paymentMethod
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success && res.redirect_url) {
          window.location.href = res.redirect_url;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors du paiement.';
        this.cdr.markForCheck();
      }
    });
  }

  nextStep() {
    if (this.currentStep === 2) {
      this.soumettreDemandeEtPasser();
    } else if (this.currentStep === 3) {
      this.uploadFichiers();
    } else {
      this.nextStepDirect();
    }
  }
  
  nextStepDirect() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.cdr.markForCheck();
    }
  }

  soumettreDemandeEtPasser() {
    if (!this.selectedDocument) return;

    this.loading = true;
    this.demandeService.soumettreDemande({
      type_demande_id: this.selectedDocument.id,
      informations: {
        nom: this.nom,
        date_naissance: this.dateNaissance,
        lieu_naissance: this.lieuNaissance,
        nom_pere: this.nomPere,
        nom_mere: this.nomMere
      }
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.demandeCreee = res.demande;
        this.currentStep++;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors de la soumission.';
        this.cdr.markForCheck();
      }
    });
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  getStatutLabel(statut: string): string {
    const labels: any = {
      'soumise': 'Soumise',
      'en_instruction': 'En instruction',
      'a_completer': 'À compléter',
      'validee': 'Validée',
      'rejetee': 'Rejetée',
      'expediee': 'Expédiée',
      'recue': 'Reçue'
    };
    return labels[statut] || statut;
  }
}