import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { ChatbotIcon } from './shared/chatbot-icon/chatbot-icon';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ChatbotIcon, CommonModule],
  template: `
    <app-navbar *ngIf="showLayout"></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="showLayout"></app-footer>
    <app-chatbot-icon *ngIf="showLayout"></app-chatbot-icon>
  `
})
export class AppComponent {
  showLayout = false;
  hideOn = ['/login', '/register', '/chatbot', '/user', '/agent', '/admin'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showLayout = !this.hideOn.some(path => e.url.startsWith(path));
      });
  }
}