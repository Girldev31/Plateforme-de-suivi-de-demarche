import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique.html',
  styleUrl: './historique.scss'
})
export class Historique {
  historique = [
    {
      id: 'TD-2026-Z11A1',
      titre: 'Extrait de naissance',
      citoyen: 'Seydou Ba',
      statut: 'Validée',
      statutColor: 'green',
      date: '01/07/2026',
      agent: 'Agent Diallo'
    },
    {
      id: 'TD-2026-Y22B2',
      titre: 'Casier judiciaire',
      citoyen: 'Rokhaya Gueye',
      statut: 'Rejetée',
      statutColor: 'red',
      date: '30/06/2026',
      agent: 'Agent Diallo'
    },
    {
      id: 'TD-2026-X33C3',
      titre: 'Certificat de résidence',
      citoyen: 'Amadou Ly',
      statut: 'Validée',
      statutColor: 'green',
      date: '29/06/2026',
      agent: 'Agent Diallo'
    }
  ];
}
