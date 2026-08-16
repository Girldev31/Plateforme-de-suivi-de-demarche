import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatbotService } from '../../core/chatbot';

interface Message {
  text: string;
  isUser: boolean;
  time: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class Chatbot implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  userInput = '';
  isTyping = false;
  messages: Message[] = [];

  suggestions = [
    'Comment ça marche ?',
    'Quels documents puis-je obtenir ?',
    'Combien ça coûte ?',
    'Quel est le délai de traitement ?',
    'Comment suivre ma demande ?'
  ];

  constructor(
    private router: Router,
    private chatbotService: ChatbotService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.messages.push({
        text: '👋 Bonjour ! Je suis Abdoul, votre assistant SénégalAdmin. Comment puis-je vous aider aujourd\'hui ?',
        isUser: false,
        time: this.getTime()
      });
      this.cdr.markForCheck();
    }, 500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(e) {}
  }

  getTime(): string {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  sendSuggestion(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  sendMessage() {
  if (!this.userInput.trim()) return;

  const userMsg = this.userInput.trim();

  this.messages.push({
    text: userMsg,
    isUser: true,
    time: this.getTime()
  });

  this.userInput = '';
  this.isTyping = true;
  this.cdr.markForCheck();

  this.chatbotService.envoyer(userMsg).subscribe({
    next: (res: any) => {
      this.isTyping = false;
      this.messages.push({
        text: res.reponse,
        isUser: false,
        time: this.getTime()
      });
      this.cdr.markForCheck();
    },
    error: () => {
      this.isTyping = false;
      this.messages.push({
        text: 'Je suis temporairement indisponible. Veuillez réessayer.',
        isUser: false,
        time: this.getTime()
      });
      this.cdr.markForCheck();
    }
  });
}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  close() {
    this.router.navigate(['/']);
  }
}
