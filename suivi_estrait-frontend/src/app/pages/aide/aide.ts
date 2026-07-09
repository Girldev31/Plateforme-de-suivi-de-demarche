import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aide.html',
  styleUrl: './aide.scss'
})
export class Aide {
  faqs = [
    {
      question: 'Comment puis-je payer mes frais ?',
      answer: 'Règlement par carte bancaire (Visa, Mastercard) ou Mobile Money (Wave, Orange Money).',
      open: false
    },
    {
      question: 'Quels documents dois-je fournir ?',
      answer: 'Règlement par carte bancaire (Visa, Mastercard) ou Mobile Money (Wave, Orange Money).',
      open: false
    },
    {
      question: 'Comment puis-je suivre ma demande ?',
      answer: 'Règlement par carte bancaire (Visa, Mastercard) ou Mobile Money (Wave, Orange Money).',
      open: false
    },
    {
      question: 'Quel est le délai de traitement ?',
      answer: 'Règlement par carte bancaire (Visa, Mastercard) ou Mobile Money (Wave, Orange Money).',
      open: false
    },
    {
      question: 'Comment puis-je contacter le support ?',
      answer: 'Règlement par carte bancaire (Visa, Mastercard) ou Mobile Money (Wave, Orange Money).',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
