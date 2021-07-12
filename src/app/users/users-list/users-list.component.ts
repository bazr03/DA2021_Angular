import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from 'src/app/_services/users.service';
import { IMember } from '../interfaces/IMember';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  members: IMember[] = [];
  users$!: Observable<IMember[]>;


  constructor(
    private usersService:UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.fetchUsers();
    this.users$ = this.usersService.members$;
  }

}
