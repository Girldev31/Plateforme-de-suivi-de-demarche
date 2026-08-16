import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-dashboard',
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
    this.http.get(`${environment.apiUrl}/citoyen/messages`).subscribe({
      next: (res: any) => {
        this.messages = res;
        this.notifCount = res.filter((m: any) => !m.lu).length;
        this.cdr.markForCheck();
      },
      error: () => {}
    });
  }

  toggleNotifs() {
    this.showNotifs = !this.showNotifs;
    this.cdr.markForCheck();
  }

  marquerToutLu() {
    this.notifCount = 0;
    this.showNotifs = false;
    this.cdr.markForCheck();
  }
}