import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessageToolsService {
  constructor(private readonly winInstance: Window) {}

  private messageSend = new Subject<MessageCommunication>();
  messageSend$ = this.messageSend.asObservable();

  private messageReceive = new Subject<MessageCommunication>();
  messageReceive$ = this.messageReceive.asObservable();


  receiveMessage(message: MessageCommunication) {
    this.messageReceive.next(message);
  }

  sendMessage(message: MessageCommunication) {
    this.messageSend.next(message);

    this.winInstance.postMessage(message, window.location.href);

    return this.messageSend$.pipe(filter(obj => obj.id === message.id));
  }
}


export interface MessageCommunication {
  type: string;
  id: string;
  content: string;
}
