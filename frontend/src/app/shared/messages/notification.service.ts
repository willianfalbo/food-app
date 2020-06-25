import { EventEmitter } from '@angular/core';

export class NotificationService {
  notifier = new EventEmitter<any>();

  constructor() { }

  notify(message: string) {
    this.notifier.emit(message)
  }

}
