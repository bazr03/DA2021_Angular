import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from '../_services/users.service';
import { IMember } from './interfaces/IMember';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<IMember[]> {
  constructor(private userService: UsersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMember[]> | IMember[] {
    const users = this.userService.getUsers();
    if (users.length >= 0 && users.length < 10) {
      console.log('users NOT in memory, FETCHING');
      return this.userService.fetchUsers();
    } else {
      console.log('users already in memory');
      return users;
    }
  }
}
