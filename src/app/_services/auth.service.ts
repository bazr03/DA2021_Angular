import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILogin } from '../auth/interfaces/ILogin';
import { IUser } from '../_interfaces/IUser';
import { IRegister } from '../auth/interfaces/IRegister';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _baseUrl: string = environment.baseUrl;
  private _currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this._currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private presenceService: PresenceService
  ) {}

  login(model: ILogin) {
    const url = `${this._baseUrl}/account/login`;
    return this.http.post<IUser>(url, model).pipe(
      map((res: IUser) => {
        const user = res;
        if (user) {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user: IUser) {
    if (user !== undefined) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
      localStorage.setItem('datApp_user', JSON.stringify(user));
      this._currentUserSource.next(user);
    } else {
      this._currentUserSource.next(undefined);
    }
  }

  logout() {
    localStorage.removeItem('datApp_user');
    this._currentUserSource.next(undefined);
    this.router.navigateByUrl('/');
    this.presenceService.stopHubConnection();
  }

  register(model: IRegister) {
    const url = `${this._baseUrl}/account/register`;

    return this.http.post<IUser>(url, model).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  userHasRole(role: string) {
    let userRole: boolean = false;
    this.currentUser$.pipe(take(1)).subscribe((user) => {
      userRole = this.userRole(user, role);
    });

    return userRole;
  }

  private userRole(user: IUser, role: string): boolean {
    return user.roles.includes(role);
  }
}
