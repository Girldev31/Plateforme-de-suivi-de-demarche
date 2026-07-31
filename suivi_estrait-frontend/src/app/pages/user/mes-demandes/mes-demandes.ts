import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Demande {
  icon: string;
  titre: string;
  statut: string;
  statutColor: string;
  ref: string;
  nom: string;
  date: string;
  prix: string;
  paye: boolean;
}

@Component({
  selector: 'app-mes-demandes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mes-demandes.html',
  styleUrl: './mes-demandes.scss'
})
export class MesDemandes {
  search = '';
  activeFilter = 'Toutes';
  filters = ['Toutes', 'Soumise', 'En instruction', 'À compléter', 'Expédiée', 'Reçue'];

  demandes: Demande[] = [
  {
    icon: 'description',
    titre: 'Extrait de naissance',
    statut: 'Expédiée',
    statutColor: 'green',
    ref: 'TD-2026-A41C8',
    nom: 'Awa Diop',
    date: '02/06/2026',
    prix: '5 000 FCFA',
    paye: true
  },
  {
    icon: 'gavel',
    titre: 'Casier judiciaire (Bulletin n°3)',
    statut: 'En instruction',
    statutColor: 'blue',
    ref: 'TD-2026-B72F1',
    nom: 'Ibrahima Sarr',
    date: '10/06/2026',
    prix: '7 500 FCFA',
    paye: true
  },
  {
    icon: 'home',
    titre: 'Certificat de résidence',
    statut: 'À compléter',
    statutColor: 'orange',
    ref: 'TD-2026-C09K4',
    nom: 'Mariama Faye',
    date: '12/06/2026',
    prix: '3 500 FCFA',
    paye: false
  }
];
   

  get filteredDemandes() {
    return this.demandes.filter(d => {
      const matchFilter = this.activeFilter === 'Toutes' || d.statut === this.activeFilter;
      const matchSearch = d.titre.toLowerCase().includes(this.search.toLowerCase()) ||
                          d.ref.toLowerCase().includes(this.search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }

  setFilter(f: string) {
    this.activeFilter = f;
  }
}