import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getPaginatedResults, getPaginationHeader } from './paginationHelper';
import { Message } from '../_model/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(pageNumber, pageSize, container) {
    let params = getPaginationHeader(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResults<Message[]>(
      this.baseUrl + 'messages',
      params,
      this.http
    );
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }
}
