import { EventEmitter } from "@angular/core";

export class NotificationService {

    constructor() { }

    notifier = new EventEmitter<any>()

    notify(message: string) {
        this.notifier.emit(message)
    }

}