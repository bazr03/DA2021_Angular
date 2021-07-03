import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ILogin } from '../auth/interfaces/ILogin';
import { IUser } from '../_interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _baseUrl: string = environment.baseUrl;
  private _currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this._currentUserSource.asObservable();

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }



  login(model:ILogin){
    const url = `${this._baseUrl}/account/login`;
    return this.http.post<IUser>(url, model)
      .pipe(
        map( (res:IUser) => {
          const user = res;
          if(user){
            localStorage.setItem('datApp_user', JSON.stringify(user));
            this._currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user:IUser){
    this._currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('datApp_user');
    this._currentUserSource.next(undefined);
    this.router.navigateByUrl('/');
  }

  register(model:ILogin){
    const url = `${this._baseUrl}/account/register`;

    return this.http.post<IUser>(url, model)
      .pipe(
        map(user => {
          if(user){
            localStorage.setItem('datApp_user', JSON.stringify(user));
            this._currentUserSource.next(user)
          }
        })
      )
  }


}
