import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../users/interfaces/IMember';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;
  private readonly _membersSource = new BehaviorSubject<IMember[]>([]);
  public readonly members$ = this._membersSource.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  private _setUsers(users:IMember[]){
    this._membersSource.next(users);
  }

  fetchUsers(){
    const url = `${this.baseUrl}/users`;
    return this.http.get<IMember[]>(url)
      .pipe(
        tap( fmembers => {
          const users = this.getUsers();
          let updatedUsers: IMember[] = [];
          if(users.length > 0){
            console.log('combinando users :(');
            updatedUsers = fmembers.map( fuser => {
              const user = users.find(u => u.id === fuser.id);
              return user? user: fuser;
            } )
          }else {
            updatedUsers = fmembers;
          }
          this._membersSource.next(updatedUsers);
        }

      ))

  }

  fetchUser(username:string){
    const url = `${this.baseUrl}/users/${username}`;

    return this.http.get<IMember>(url)
      .pipe(
        tap(user => {
          console.log('actualizando usersss from tap')
          const updatedUsers = this.updatelocalMember(user);
          this._setUsers(updatedUsers);
        })
      )


  }

  getUser(username:string){
    const users = this.getUsers();
    return users.find( u => u.username == username);

    // return this.fetchUser(username);

  }

  // Get last value without subscribing to the users$ observable (syncronously)
  getUsers(): IMember[] {
    return this._membersSource.getValue();
  }

  updateMember(member:IMember){
    const url = `${this.baseUrl}/users`;
    return this.http.put(url, member)
      .pipe(
        map(() => {
          const updatedUsers = this.updatelocalMember(member);
          this._setUsers(updatedUsers);
        })
      )
  }

  private updatelocalMember(member:IMember):IMember[]{
    const users = this.getUsers();
    const updatedUsers = users.map(user => {
      return user.id === member.id ? member:user;
    })
    return updatedUsers;
  }
}
