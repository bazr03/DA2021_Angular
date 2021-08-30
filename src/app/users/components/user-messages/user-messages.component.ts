import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { IMessage } from '../../../messages/interfaces/IMessage';
import { MessageService } from '../../../_services/message.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { IUser } from '../../../_interfaces/IUser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styles: [],
})
export class UserMessagesComponent implements OnInit, OnDestroy {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() username: string = '';
  messages: IMessage[] = [];
  messageContent: string = '';

  constructor(
    public messageService: MessageService,
    private authService: AuthService
  ) {
    // this.authService.currentUser$.pipe(take(1)).subscribe(usr => this.user = usr);
  }

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe((usr) => {
      this.messageService.createHubConnection(usr, this.username);
    });
    // this.messageService.createHubConnection(this.user, this.username);
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
      .then(() => {
        this.messageForm.reset();
      });
  }

  ngOnDestroy(): void {
    console.log('user-messages.component DESTROY!!');
    this.messageService.stopHubConnection();
  }
}
