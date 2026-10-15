import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Telemetry } from '../../models/telemetry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  private client!: Client;

  constructor() { }

  connect(): Observable<Telemetry> {

    return new Observable<Telemetry>((observer) => {
      this.client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        debug: (message) => console.log('{STOMP}', message)
      });

      this.client.onConnect = () => {

        console.log('Conectado al WebSocket');

        this.client.subscribe('/topic/telemetry', (message) => {

          const telemetry: Telemetry = JSON.parse(message.body);

          observer.next(telemetry);

        });

      };

      this.client.onStompError = (frame) => {
        console.error('Error STOMP', frame);
        observer.error(frame);
      };

      this.client.activate();


    });
  }
}