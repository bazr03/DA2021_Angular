import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../_services/users.service';
import { IMember } from './interfaces/IMember';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<IMember> {
  constructor(private usersService: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMember> | IMember {
    const username = route.paramMap.get('username') || 'undefined';

    // let user = this.usersService.getMember(username);
    // if(user){
    //   console.log('Usuario ya en memoria');
    //   return user;
    // }

    // console.log('Usuario NO en memoria, FETCHING...');
    return this.usersService.getMember(username);
  }
}
