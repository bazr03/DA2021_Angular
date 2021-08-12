import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../users/interfaces/IMember';
import { AuthService } from './auth.service';
import { IPhoto } from '../users/interfaces/IPhoto';
import { IUser } from '../_interfaces/IUser';
import { PaginatedResult } from '../users/interfaces/IPagination';
import { UserParams } from '../_helpers/userParams';
import {
  getPaginatedResult,
  getPaginationHeaders,
} from '../_helpers/paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;
  private readonly _membersSource$ = new BehaviorSubject<IMember[]>([]);
  public readonly members$ = this._membersSource$.asObservable();

  private memberCache = new Map();
  user!: IUser;
  userParams!: UserParams;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  private _setUsers(users: IMember[]) {
    this._membersSource$.next(users);
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  addLike(username: string) {
    const url = `${this.baseUrl}/likes/${username}`;

    return this.http.post(url, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    // const url = `${this.baseUrl}/likes?predicate=${predicate}`;
    const url = `${this.baseUrl}/likes`;
    // return this.http.get<Partial<IMember[]>>(url);
    return getPaginatedResult<Partial<IMember[]>>(url, params, this.http);
  }

  fetchUsers() {
    const url = `${this.baseUrl}/users`;
    return this.http.get<IMember[]>(url).pipe(
      tap((fmembers) => {
        const users = this.getUsers();
        let updatedUsers: IMember[] = [];
        if (users.length > 0) {
          updatedUsers = fmembers.map((fuser) => {
            const user = users.find((u) => u.id === fuser.id);
            return user ? user : fuser;
          });
        } else {
          updatedUsers = fmembers;
        }
        this._membersSource$.next(updatedUsers);
      })
    );
  }

  fetchUsers2(userParams: UserParams) {
    const key = Object.values(userParams).join('-');
    const response = this.memberCache.get(key);

    if (response) {
      return of(response);
    }
    const url = `${this.baseUrl}/users`;
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<IMember[]>(url, params, this.http).pipe(
      map((res) => {
        this.memberCache.set(key, res);
        return res;
      })
    );
  }

  fetchUser(username: string) {
    const url = `${this.baseUrl}/users/${username}`;

    return this.http.get<IMember>(url).pipe(
      tap((user) => {
        const updatedUsers = this.updatelocalMember(user);
        this._setUsers(updatedUsers);
      })
    );
  }

  getUser(username: string) {
    const users = this.getUsers();
    return users.find((u) => u.username == username);

    // return this.fetchUser(username);
  }

  getMember(username: string) {
    const url = `${this.baseUrl}/users/${username}`;
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: IMember) => member.username === username);
    if (member) {
      console.log('Usuario YA EN MEMORIA');
      return of(member);
    }
    console.log('Usuario NO EN MEMORIA, FETCHING');
    return this.http.get<IMember>(url);
  }

  // Get last value without subscribing to the users$ observable (syncronously)
  getUsers(): IMember[] {
    return this._membersSource$.getValue();
  }

  updateMember(member: IMember) {
    const url = `${this.baseUrl}/users`;
    return this.http.put(url, member).pipe(
      map(() => {
        const updatedUsers = this.updatelocalMember(member);
        this._setUsers(updatedUsers);
      })
    );
  }

  setMainPhoto(photo: IPhoto) {
    let currentUser!: IUser;
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = { ...user };
    });

    const url = `${this.baseUrl}/users/set-main-photo/${photo.id}`;
    return this.http.put(url, {}).pipe(
      tap(() => {
        currentUser.photoUrl = photo.url;
        this.authService.setCurrentUser(currentUser);
      })
    );
  }

  deletePhoto(photoId: number) {
    const url = `${this.baseUrl}/users/delete-photo/${photoId}`;

    return this.http.delete(url);
  }

  private updatelocalMember(member: IMember): IMember[] {
    const users = this.getUsers();
    const updatedUsers = users.map((user) => {
      return user.id === member.id ? member : user;
    });
    return updatedUsers;
  }
}
