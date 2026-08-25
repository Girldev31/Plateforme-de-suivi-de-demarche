import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './service.html',
  styleUrl: './service.scss'
})
export class Service implements OnInit {
  searchQuery = '';
  activeCategory = 'Tous';
  categories = ['Tous', 'Etat Civil', 'Justice', 'Administratif', 'Nationalité', 'Légalisation'];
  services: any[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.http.get(`${environment.apiUrl}/types-demandes`).subscribe({
      next: (res: any) => {
        this.services = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => { this.loading = false; }
    });
  }

  get filteredServices() {
    return this.services.filter(s => {
      const matchSearch = s.libelle.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchSearch;
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  selectedService: any = null;

  voirDetail(service: any) {
    this.selectedService = service;
    this.cdr.markForCheck();
  }

  fermerDetail() {
    this.selectedService = null;
    this.cdr.markForCheck();
  }
}