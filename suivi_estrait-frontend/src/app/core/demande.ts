import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DemandeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMesDemandes() {
    return this.http.get(`${this.apiUrl}/demandes`);
  }

  getDemandeById(id: number) {
    return this.http.get(`${this.apiUrl}/demandes/${id}`);
  }

  soumettreDemande(data: any) {
    return this.http.post(`${this.apiUrl}/demandes`, data);
  }

  getTypesdemandes() {
    return this.http.get(`${this.apiUrl}/types-demandes`);
  }

  updateStatut(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/demandes/${id}/statut`, data);
  }

  // Agent
  getDemandesEnAttente() {
    return this.http.get(`${this.apiUrl}/agent/demandes/en-attente`);
  }

  getDemandesAssignees() {
    return this.http.get(`${this.apiUrl}/agent/demandes/assignees`);
  }

  prendreEnCharge(id: number) {
    return this.http.put(`${this.apiUrl}/agent/demandes/${id}/prendre-en-charge`, {});
  }

  validerDemande(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/agent/demandes/${id}/valider`, data);
  }

  rejeterDemande(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/agent/demandes/${id}/rejeter`, data);
  }

  demanderPieces(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/agent/demandes/${id}/completer`, data);
  }
  getToutesDemandesAgent() {
  return this.http.get(`${this.apiUrl}/demandes`);
 }
 initierPaiement(data: any) {
  return this.http.post(`${this.apiUrl}/paiements/initier`, data);
  }
}
