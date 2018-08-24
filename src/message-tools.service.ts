import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MessageToolsService {
  constructor() {}

  private messageSend = new Subject<MessageCommunication>();
  messageSend$ = this.messageSend.asObservable();

  private messageReceive = new Subject<MessageCommunication>();
  messageReceive$ = this.messageReceive.asObservable();


  receiveMessage(message: MessageCommunication) {
    this.messageReceive.next(message);
  }

  sendMessage(message: MessageCommunication) {
    this.messageSend.next(message);
    if (window.parent) {
      window.parent.postMessage(message, window.parent.location.href);
    }
  }
}


export interface MessageCommunication {
  type: string;
  id: string;
  content: string;
}
