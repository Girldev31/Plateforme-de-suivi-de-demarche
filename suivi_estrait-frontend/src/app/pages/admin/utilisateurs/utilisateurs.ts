import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/admin';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss'
})
export class Utilisateurs implements OnInit {
  utilisateurs: any[] = [];
  loading = false;
  showForm = false;
  error = '';
  success = '';

  stats: any = {
    total_demandes: 0,
    demandes_soumises: 0,
    demandes_validees: 0,
    demandes_rejetees: 0,
    total_citoyens: 0,
    total_agents: 0
  };

  nouvelAgent = {
    name: '',
    email: '',
    password: '',
    matricule: '',
    service: ''
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerDashboard();
    this.chargerUtilisateurs();
  }

  chargerDashboard() {
    this.adminService.getDashboard().subscribe({
      next: (res: any) => {
        this.stats = res;
        this.cdr.markForCheck();
      }
    });
  }

  chargerUtilisateurs() {
    this.loading = true;
    this.adminService.getUtilisateurs().subscribe({
      next: (res: any) => {
        this.utilisateurs = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  creerAgent() {
    this.adminService.creerAgent(this.nouvelAgent).subscribe({
      next: () => {
        this.success = 'Agent créé avec succès.';
        this.showForm = false;
        this.chargerUtilisateurs();
        this.nouvelAgent = { name: '', email: '', password: '', matricule: '', service: '' };
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur.';
        this.cdr.markForCheck();
      }
    });
  }

  bloquer(id: number) {
    this.adminService.bloquerUtilisateur(id).subscribe({
      next: () => { this.chargerUtilisateurs(); }
    });
  }

  debloquer(id: number) {
    this.adminService.debloquerUtilisateur(id).subscribe({
      next: () => { this.chargerUtilisateurs(); }
    });
  }

  getRole(user: any): string {
    if (user.agent) return 'agent';
    if (user.citoyen) return 'utilisateur';
    return 'admin';
  }
}