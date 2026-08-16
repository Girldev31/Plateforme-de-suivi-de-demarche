import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DemandeService } from '../../../core/demande';

@Component({
  selector: 'app-mes-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mes-demandes.html',
  styleUrl: './mes-demandes.scss'
})
export class MesDemandes implements OnInit {
  search = '';
  activeFilter = 'Toutes';
  filters = ['Toutes', 'soumise', 'en_instruction', 'a_completer', 'expediee', 'recue'];
  demandes: any[] = [];
  loading = false;

  constructor(
    private demandeService: DemandeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.demandeService.getMesDemandes().subscribe({
      next: (res: any) => {
        this.demandes = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  get filteredDemandes() {
    return this.demandes.filter(d => {
      const matchFilter = this.activeFilter === 'Toutes' || d.statut === this.activeFilter;
      const matchSearch = !this.search ||
        d.type_demande?.libelle?.toLowerCase().includes(this.search.toLowerCase()) ||
        d.reference?.toLowerCase().includes(this.search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }

  setFilter(f: string) { this.activeFilter = f; }

  getStatutColor(statut: string): string {
    const colors: any = {
      'soumise': 'blue',
      'en_instruction': 'orange',
      'a_completer': 'red',
      'validee': 'green',
      'expediee': 'green',
      'recue': 'green',
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