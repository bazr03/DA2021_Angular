import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMember } from '../interfaces/IMember';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() member!: IMember;
  @Input() _onlineUsers: string[] = [];

  constructor(
    private userService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  addLike(member: IMember) {
    this.userService.addLike(member.username).subscribe(() => {
      this.messageService.add({
        key: 'tr',
        severity: 'success',
        summary: `Like Completed`,
        detail: `You have liked ${member.knownAs}`,
      });
    });
  }

  isOnline(member: IMember) {
    const online = this._onlineUsers.includes(member.username);
    return this._onlineUsers.includes(member.username);
  }
}
