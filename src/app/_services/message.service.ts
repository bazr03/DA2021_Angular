import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  getPaginationHeaders,
  getPaginatedResult,
} from '../_helpers/paginationHelper';
import { IMessage } from '../messages/interfaces/IMessage';
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUser } from '../_interfaces/IUser';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { IGroup } from '../_interfaces/IGroup';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl: string = environment.baseUrl;
  hubUrl = environment.hubUrl;
  private hubConnecion!: HubConnection;
  private messageThreadSource = new BehaviorSubject<IMessage[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  createHubConnection(user: IUser, otherUsername: string) {
    const url = `${this.hubUrl}/message?user=${otherUsername}`;
    this.hubConnecion = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnecion.start().catch((error) => console.log(error));

    this.hubConnecion.on('ReceivedMessageThread', (mesages) => {
      this.messageThreadSource.next(mesages);
    });

    this.hubConnecion.on('NewMessage', (msg) => {
      this.messageThread$.pipe(take(1)).subscribe((msgs) => {
        this.messageThreadSource.next([...msgs, msg]);
      });
    });

    this.hubConnecion.on('UpdatedGroup', (group: IGroup) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe((msgs) => {
          msgs.forEach((msg) => {
            if (!msg.dateRead) {
              msg.dateRead = new Date(Date.now());
            }
          });
          this.messageThreadSource.next([...msgs]);
        });
      }
    });
  }

  stopHubConnection() {
    if (this.hubConnecion) {
      this.hubConnecion.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    const url = `${this.baseUrl}/messages`;
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('Container', container);

    return getPaginatedResult<IMessage[]>(url, params, this.http);
  }

  getMessageThread(username: string) {
    const url = `${this.baseUrl}/messages/thread/${username}`;

    return this.http.get<IMessage[]>(url);
  }

  async sendMessage(username: string, content: string) {
    // const url = `${this.baseUrl}/messages`;

    // return this.http.post<IMessage>(url, {
    //   recipientUsername: username,
    //   content,
    // });

    return this.hubConnecion
      .invoke('SendMessage', { recipientUsername: username, content })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: number) {
    const url = `${this.baseUrl}/messages/${id}`;

    return this.http.delete(url);
  }
}
