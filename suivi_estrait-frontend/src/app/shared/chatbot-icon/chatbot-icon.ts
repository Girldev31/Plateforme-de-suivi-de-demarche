import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-icon.html',
  styleUrl: './chatbot-icon.scss'
})
export class ChatbotIcon implements OnInit {
  showBubble = false;
  bubbleDismissed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      if (!this.bubbleDismissed) {
        this.showBubble = true;
      }
    }, 2000);
  }

  openChatbot() {
    this.showBubble = false;
    this.bubbleDismissed = true;
    this.router.navigate(['/chatbot']);
  }

  dismissBubble() {
    this.showBubble = false;
    this.bubbleDismissed = true;
  }

  toggleBubble() {
    if (!this.bubbleDismissed) {
      this.showBubble = !this.showBubble;
    } else {
      this.showBubble = !this.showBubble;
    }
  }
}