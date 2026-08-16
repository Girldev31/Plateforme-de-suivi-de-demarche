import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  encapsulation: ViewEncapsulation.None
})
export class Dashboard implements OnInit {
  showNotifs = false;
  messages: any[] = [];
  notifCount = 0;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chargerMessages();
  }

  chargerMessages() {
    this.http.get(`${environment.apiUrl}/agent/demandes/en-attente`).subscribe({
      next: (res: any) => {
        this.notifCount = res.filter((d: any) => d.statut === 'soumise').length;
        this.messages = res.filter((d: any) => d.statut === 'soumise');
        this.cdr.markForCheck();
      },
      error: () => {}
    });
  }

  toggleNotifs() {
    this.showNotifs = !this.showNotifs;
    this.cdr.markForCheck();
  }
}