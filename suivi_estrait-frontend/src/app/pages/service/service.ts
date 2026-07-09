import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './service.html',
  styleUrl: './service.scss'
})
export class Service {
  searchQuery = '';
  activeCategory = 'Tous';

  categories = ['Tous', 'Etat Civil', 'Justice', 'Administratif', 'Nationalité', 'Légalisation'];

  services = [
    {
      icon: '📄',
      title: 'Acte de Naissance',
      description: 'Copie intégrale ou extrait de naissance certifié conforme.',
      price: '2 500 F CFA',
      delai: '4h',
      category: 'Etat Civil'
    },
    {
      icon: '⚖️',
      title: 'Casier Judiciaire',
      description: 'Bulletin n°3 extrait du casier national pour vos dossiers.',
      price: '2 500 F CFA',
      delai: '6 jours',
      category: 'Justice'
    },
    {
      icon: '💍',
      title: 'Certificat de mariage',
      description: 'Copie intégrale ou extrait avec ou sans filiation du mariage civil.',
      price: '5 000 F CFA',
      delai: '4h',
      category: 'Etat Civil'
    },
    {
      icon: '🏠',
      title: 'Certificat de résidence',
      description: 'Document attestant votre lieu de résidence au Sénégal, souvent demandé pour banques, écoles, démarches.',
      price: '2 500 F CFA',
      delai: '6 jours',
      category: 'Administratif'
    },
    {
      icon: '💍',
      title: 'Certificat de mariage',
      description: 'Copie intégrale ou extrait avec ou sans filiation du mariage civil.',
      price: '5 000 F CFA',
      delai: '4h',
      category: 'Etat Civil'
    },
    {
      icon: '🏠',
      title: 'Certificat de résidence',
      description: 'Document attestant votre lieu de résidence au Sénégal, souvent demandé pour banques, écoles, démarches.',
      price: '2 500 F CFA',
      delai: '6 jours',
      category: 'Administratif'
    }
  ];

  get filteredServices() {
    return this.services.filter(s => {
      const matchCategory = this.activeCategory === 'Tous' || s.category === this.activeCategory;
      const matchSearch = s.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
