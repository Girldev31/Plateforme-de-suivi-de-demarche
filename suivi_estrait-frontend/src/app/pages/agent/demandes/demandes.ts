import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Demande {
  id: string;
  icon: string;
  titre: string;
  statut: string;
  statutColor: string;
  citoyen: string;
  pays: string;
  date: string;
  prix: string;
  priorite: string;
}

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes.html',
  styleUrl: './demandes.scss'
})
export class Demandes {
  search = '';
  activeFilter = 'Toutes';
  filters = ['Toutes', 'Nouvelle', 'En cours', 'À compléter', 'Validée', 'Rejetée'];

  demandes: Demande[] = [
    {
      id: 'TD-2026-A41C8',
      icon: 'description',
      titre: 'Extrait de naissance',
      statut: 'Nouvelle',
      statutColor: 'blue',
      citoyen: 'Awa Diop',
      pays: 'France',
      date: '02/07/2026',
      prix: '5 000 FCFA',
      priorite: 'haute'
    },
    {
      id: 'TD-2026-B72F1',
      icon: 'gavel',
      titre: 'Casier judiciaire (Bulletin n°3)',
      statut: 'En cours',
      statutColor: 'orange',
      citoyen: 'Ibrahima Sarr',
      pays: 'USA',
      date: '01/07/2026',
      prix: '7 500 FCFA',
      priorite: 'normale'
    },
    {
      id: 'TD-2026-C09K4',
      icon: 'home',
      titre: 'Certificat de résidence',
      statut: 'À compléter',
      statutColor: 'red',
      citoyen: 'Mariama Faye',
      pays: 'Canada',
      date: '30/06/2026',
      prix: '3 500 FCFA',
      priorite: 'haute'
    },
    {
      id: 'TD-2026-D55R2',
      icon: 'favorite',
      titre: 'Certificat de mariage',
      statut: 'Nouvelle',
      statutColor: 'blue',
      citoyen: 'Moussa Diallo',
      pays: 'Italie',
      date: '03/07/2026',
      prix: '6 000 FCFA',
      priorite: 'normale'
    },
    {
      id: 'TD-2026-E88P3',
      icon: 'badge',
      titre: 'Certificat de nationalité',
      statut: 'En cours',
      statutColor: 'orange',
      citoyen: 'Fatou Ndiaye',
      pays: 'Allemagne',
      date: '29/06/2026',
      prix: '3 500 FCFA',
      priorite: 'normale'
    }
  ];

  constructor(private router: Router) {}

  get filteredDemandes() {
    return this.demandes.filter(d => {
      const matchFilter = this.activeFilter === 'Toutes' || d.statut === this.activeFilter;
      const matchSearch = d.titre.toLowerCase().includes(this.search.toLowerCase()) ||
                          d.id.toLowerCase().includes(this.search.toLowerCase()) ||
                          d.citoyen.toLowerCase().includes(this.search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }

  get stats() {
    return {
      total: this.demandes.length,
      nouvelles: this.demandes.filter(d => d.statut === 'Nouvelle').length,
      enCours: this.demandes.filter(d => d.statut === 'En cours').length,
      aCompleter: this.demandes.filter(d => d.statut === 'À compléter').length
    };
  }

  setFilter(f: string) { this.activeFilter = f; }

  voirDetail(id: string) {
    this.router.navigate(['/agent/demande', id]);
  }
}
