import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DemandeService } from '../../../core/demande';

@Component({
  selector: 'app-detail-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './detail-demande.html',
  styleUrl: './detail-demande.scss'
})
export class DetailDemande implements OnInit {
  demandeId = 0;
  observation = '';
  messageNotif = '';
  statutSelectionne = '';
  statuts = ['soumise', 'en_instruction', 'a_completer', 'validee', 'rejetee', 'expediee'];
  demande: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandeService: DemandeService
  ) {}

  ngOnInit() {
    this.demandeId = +this.route.snapshot.params['id'];
    this.chargerDemande();
  }

  chargerDemande() {
    this.demandeService.getDemandeById(this.demandeId).subscribe({
      next: (res: any) => {
        this.demande = res;
        this.statutSelectionne = res.statut;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  validerDemande() {
    this.demandeService.validerDemande(this.demandeId, {
      observation: this.observation
    }).subscribe({
      next: () => { this.chargerDemande(); },
      error: (err) => { this.error = err.error?.message; }
    });
  }

  rejeterDemande() {
    if (!this.observation) {
      this.error = 'Veuillez ajouter une observation pour le rejet.';
      return;
    }
    this.demandeService.rejeterDemande(this.demandeId, {
      observation: this.observation
    }).subscribe({
      next: () => { this.chargerDemande(); },
      error: (err) => { this.error = err.error?.message; }
    });
  }

  modifierStatut() {
    this.demandeService.updateStatut(this.demandeId, {
      statut: this.statutSelectionne,
      observation: this.observation
    }).subscribe({
      next: () => { this.chargerDemande(); },
      error: (err) => { this.error = err.error?.message; }
    });
  }

  demanderPieces() {
    if (!this.messageNotif) return;
    this.demandeService.demanderPieces(this.demandeId, {
      contenu: this.messageNotif
    }).subscribe({
      next: () => {
        this.messageNotif = '';
        this.chargerDemande();
      },
      error: (err) => { this.error = err.error?.message; }
    });
  }

  getStatutColor(statut: string): string {
    const colors: any = {
      'soumise': 'blue',
      'en_instruction': 'orange',
      'a_completer': 'red',
      'validee': 'green',
      'rejetee': 'red',
      'expediee': 'green'
    };
    return colors[statut] || 'blue';
  }

  retour() {
    this.router.navigate(['/agent/demandes']);
  }
}