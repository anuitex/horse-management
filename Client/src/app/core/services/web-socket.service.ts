import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { heartStateAction } from 'src/app/management/store/management.actions';
import { RequestStartMonitoringHorseModel, ResponseStartMonitoringHorseModel } from '../models/management';


export const WS_ENDPOINT = environment.ws;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  io: Socket
  socket;
  constructor(
    private store$: Store
  ) {
  }

  setupSocketConnection(): Observable<any> {
    this.socket = io(WS_ENDPOINT, { autoConnect: false }).connect();
    return of()
  }

  public connect(): Observable<any> {
    this.io.connect()
    return of()
  }

  sendMessage(send: RequestStartMonitoringHorseModel): void {
    this.socket.emit('Server/HorseHeartRate', { request: send });
    this.listen()
  }

  listen(): void {
    this.socket.on("Client/HorseHeartRate", (response: ResponseStartMonitoringHorseModel) => {
      this.store$.dispatch(heartStateAction(response));
    });
  }

  public disconnect(): Observable<any> {
    this.socket.disconnect()
    return of()
  }

}
