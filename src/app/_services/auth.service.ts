import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ILogin } from '../auth/interfaces/login';
import { IUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  private loggedIn: boolean = false;
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  login(model:ILogin){
    const url = `${this.baseUrl}/account/login`;
    return this.http.post<IUser>(url, model)
      .pipe(
        map( (res:IUser) => {
          const user = res;
          if(user){
            localStorage.setItem('datApp_user', JSON.stringify(user));
            this.loggedIn = true;
            this.currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user:IUser){
    this.currentUserSource.next(user);
    this.loggedIn = true;
  }

  logout(){
    localStorage.removeItem('datApp_user');
    this.currentUserSource.next(undefined);
    this.loggedIn = false;
  }

  get isLoogedIn():boolean {
    return this.loggedIn;
  }


}
