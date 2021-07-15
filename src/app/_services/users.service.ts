import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../users/interfaces/IMember';
import { AuthService } from './auth.service';
import { IPhoto } from '../users/interfaces/IPhoto';
import { IUser } from '../_interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;
  private readonly _membersSource$ = new BehaviorSubject<IMember[]>([]);
  public readonly members$ = this._membersSource$.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private _setUsers(users: IMember[]) {
    this._membersSource$.next(users);
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
