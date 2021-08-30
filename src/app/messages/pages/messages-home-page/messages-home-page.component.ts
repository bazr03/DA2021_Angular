import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMessage } from '../../interfaces/IMessage';
import { IPagination } from '../../../users/interfaces/IPagination';
import { MessageService } from '../../../_services/message.service';
import { AuthService } from '../../../_services/auth.service';
import { IUser } from '../../../_interfaces/IUser';
import { take } from 'rxjs/operators';

interface IDisplay {
  value: string;
  display: string;
  icon: string;
}

@Component({
  selector: 'app-messages-home-page',
  templateUrl: './messages-home-page.component.html',
  styles: [],
})
export class MessagesHomePageComponent implements OnInit, OnDestroy {
  messages: IMessage[] = [];
  pagination!: IPagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  messageOptions!: IDisplay[];
  loading = false;
  user!: IUser;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe((usr) => (this.user = usr));
  }

  ngOnInit(): void {
    this.messageOptions = [
      { value: 'Unread', display: 'Unread', icon: 'pi pi-envelope' },
      { value: 'Inbox', display: 'Inbox', icon: 'pi pi-inbox' },
      { value: 'Outbox', display: 'Outbox', icon: 'pi pi-send' },
    ];

    this.loadMessages();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((res) => {
        this.messages = res.result;
        this.pagination = res.pagination;
        this.loading = false;
      });
  }

  onPageChange(event: any) {
    this.pageNumber = +event.page + 1;
    this.loadMessages();
  }

  showPagination(): boolean {
    const messageLength = this.messages.length;
    if (this.pagination && !this.loading && messageLength) {
      return true;
    }

    return false;
  }
  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe(() => {
      const messageIndex = this.messages.findIndex((m) => m.id === id);
      this.messages.splice(messageIndex, 1);
    });
  }
}
