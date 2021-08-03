import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/_services/users.service';
import { IMember } from '../interfaces/IMember';
import { IPagination } from '../interfaces/IPagination';
import { UserParams } from '../../_helpers/userParams';
import { IUser } from '../../_interfaces/IUser';

interface IDisplay {
  value: string;
  display: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  members: IMember[] = [];
  users$!: Observable<IMember[]>;
  pagination!: IPagination;
  userParams!: UserParams;
  user!: IUser;
  genderList!: IDisplay[];
  userActivity!: IDisplay[];

  constructor(private usersService: UsersService) {
    this.genderList = [
      { value: 'male', display: 'Males' },
      { value: 'female', display: 'Females' },
    ];
    this.userActivity = [
      { value: 'lastActive', display: 'Last Active' },
      { value: 'created', display: 'Newest Members' },
    ];
    this.userParams = this.usersService.getUserParams();
  }

  ngOnInit(): void {
    // this.usersService.fetchUsers();
    // this.users$ = this.usersService.members$;

    this.loadMembers();
  }

  onPageChange(event: any) {
    this.userParams.pageNumber = +event.page + 1;
    this.loadMembers();
  }

  loadMembers() {
    this.usersService.setUserParams(this.userParams);
    this.usersService.fetchUsers2(this.userParams).subscribe((res) => {
      this.members = res.result;
      this.pagination = res.pagination;
    });
  }

  resetFilters() {
    this.userParams = this.usersService.resetUserParams();
    this.usersService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
