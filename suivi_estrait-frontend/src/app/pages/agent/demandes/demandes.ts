import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from '../../../core/demande';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes.html',
  styleUrl: './demandes.scss'
})
export class Demandes implements OnInit {
  search = '';
  activeFilter = 'Toutes';
  filters = ['Toutes', 'soumise', 'en_instruction', 'a_completer', 'validee', 'rejetee'];
  demandes: any[] = [];
  loading = false;

  constructor(
    private demandeService: DemandeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerDemandes();
  }

  chargerDemandes() {
    this.loading = true;
    this.demandeService.getDemandesEnAttente().subscribe({
      next: (res: any) => {
        this.demandes = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  get stats() {
    return {
      total: this.demandes.length,
      nouvelles: this.demandes.filter(d => d.statut === 'soumise').length,
      enCours: this.demandes.filter(d => d.statut === 'en_instruction').length,
      aCompleter: this.demandes.filter(d => d.statut === 'a_completer').length
    };
  }

  get filteredDemandes() {
    return this.demandes.filter(d => {
      const matchFilter = this.activeFilter === 'Toutes' || d.statut === this.activeFilter;
      const matchSearch = !this.search ||
        d.type_demande?.libelle?.toLowerCase().includes(this.search.toLowerCase()) ||
        d.reference?.toLowerCase().includes(this.search.toLowerCase()) ||
        d.citoyen?.user?.name?.toLowerCase().includes(this.search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }

  setFilter(f: string) {
    this.activeFilter = f;
    this.cdr.markForCheck();
  }

  voirDetail(id: number) {
    this.router.navigate(['/agent/demande', id]);
  }

  getStatutColor(statut: string): string {
    const colors: any = {
      'soumise': 'blue',
      'en_instruction': 'orange',
      'a_completer': 'red',
      'validee': 'green',
      'rejetee': 'red'
    };
    return colors[statut] || 'blue';
  }

  getIcon(libelle: string): string {
    if (libelle?.includes('naissance')) return 'description';
    if (libelle?.includes('mariage')) return 'favorite';
    if (libelle?.includes('judiciaire')) return 'gavel';
    if (libelle?.includes('résidence')) return 'home';
    return 'description';
  }
}