import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly messages: MessageService) {}

  success(message: string, summary = 'Success'): void {
    this.messages.add({ severity: 'success', summary, detail: message, life: 4000 });
  }

  error(message: string, summary = 'Error'): void {
    this.messages.add({ severity: 'error', summary, detail: message, life: 6000 });
  }

  warning(message: string, summary = 'Warning'): void {
    this.messages.add({ severity: 'warn', summary, detail: message, life: 5000 });
  }

  info(message: string, summary = 'Information'): void {
    this.messages.add({ severity: 'info', summary, detail: message, life: 4000 });
  }
}
