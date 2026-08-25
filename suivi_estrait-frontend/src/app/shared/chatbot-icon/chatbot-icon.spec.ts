import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotIcon } from './chatbot-icon';

describe('ChatbotIcon', () => {
  let component: ChatbotIcon;
  let fixture: ComponentFixture<ChatbotIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
