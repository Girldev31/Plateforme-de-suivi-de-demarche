import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get(`${this.apiUrl}/admin/dashboard`);
  }

  getUtilisateurs() {
    return this.http.get(`${this.apiUrl}/admin/utilisateurs`);
  }

  creerAgent(data: any) {
    return this.http.post(`${this.apiUrl}/admin/agents`, data);
  }

  bloquerUtilisateur(id: number) {
    return this.http.put(`${this.apiUrl}/admin/utilisateurs/${id}/bloquer`, {});
  }

  debloquerUtilisateur(id: number) {
    return this.http.put(`${this.apiUrl}/admin/utilisateurs/${id}/debloquer`, {});
  }

  getTypesDemandes() {
    return this.http.get(`${this.apiUrl}/types-demandes`);
  }

  creerTypeDemande(data: any) {
    return this.http.post(`${this.apiUrl}/admin/types-demandes`, data);
  }

  updateTypeDemande(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/admin/types-demandes/${id}`, data);
  }
}
