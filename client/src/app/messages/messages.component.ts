import { Component, OnInit } from '@angular/core';
import { Paginaion } from '../_model/Pagination';
import { Message } from '../_model/message';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Paginaion;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((resp) => {
        this.messages = resp.result;
        this.pagination = resp.pagination;
      });
  }

  pageChanges(event: any) {
    this.pageNumber = event.pageNumber;
    this.loadMessages();
  }
}
