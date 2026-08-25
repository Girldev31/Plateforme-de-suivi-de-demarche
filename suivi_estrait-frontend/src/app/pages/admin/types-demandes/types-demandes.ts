import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/admin';

@Component({
  selector: 'app-types-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './types-demandes.html',
  styleUrl: './types-demandes.scss'
})
export class TypesDemandes implements OnInit {
  types: any[] = [];
  loading = false;
  showForm = false;
  error = '';
  success = '';

  nouveauType = {
    libelle: '',
    description: '',
    frais: 0,
    delai_traitement: 0
  };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerTypes();
  }

  chargerTypes() {
    this.loading = true;
    this.adminService.getTypesDemandes().subscribe({
      next: (res: any) => {
        this.types = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  creerType() {
    this.adminService.creerTypeDemande(this.nouveauType).subscribe({
      next: () => {
        this.success = 'Type créé avec succès.';
        this.showForm = false;
        this.chargerTypes();
        this.nouveauType = { libelle: '', description: '', frais: 0, delai_traitement: 0 };
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur.';
        this.cdr.markForCheck();
      }
    });
  }

  modifierType(type: any) {
    this.adminService.updateTypeDemande(type.id, type).subscribe({
      next: () => {
        this.success = 'Type modifié.';
        this.cdr.markForCheck();
      }
    });
  }
}