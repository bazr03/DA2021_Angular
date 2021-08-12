import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import {
  getPaginationHeaders,
  getPaginatedResult,
} from '../_helpers/paginationHelper';
import { IMessage } from '../messages/interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

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

  sendMessage(username: string, content: string) {
    const url = `${this.baseUrl}/messages`;

    return this.http.post<IMessage>(url, {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: number) {
    const url = `${this.baseUrl}/messages/${id}`;

    return this.http.delete(url);
  }
}
