import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IMessage } from '../../../messages/interfaces/IMessage';
import { MessageService } from '../../../_services/message.service';
import { UsersService } from '../../../_services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styles: [],
})
export class UserMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() username: string = '';
  messages: IMessage[] = [];
  messageContent: string = '';

  constructor(
    private messageService: MessageService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  setAlign(sender: string): string {
    const align = sender === this.username ? 'left' : 'right';
    return align;
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .subscribe((message) => {
        this.messages.push(message);
        this.messageForm.reset();
      });
  }
}
