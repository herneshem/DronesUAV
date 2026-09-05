import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Telemetry } from '../../models/telemetry';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  private client!: Client;
  private telemetrySubject = new BehaviorSubject<Telemetry | null>(null);

  constructor() {

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {

        console.log('WebSocket conectado');
        this.client.subscribe(
          '/topic/telemetry',
          (message: IMessage) => {
            const telemetry: Telemetry =
              JSON.parse(message.body);
            console.log('Telemetría recibida:', telemetry);
            this.telemetrySubject.next(telemetry);

          });
      },

      onStompError: (frame) => {
        console.error(
          'Error STOMP:',
          frame.headers['message'],
          frame.body
        );
      },



      onWebSocketError: (error) => {
        console.error('Error WebSocket:', error);
      }
    });

    this.client.activate();
  }

  getTelemetry(): Observable<Telemetry | null> {
    return this.telemetrySubject.asObservable();

  }
}
