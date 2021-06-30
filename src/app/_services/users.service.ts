import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = environment.baseUrl;
  private readonly _usersSource = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this._usersSource.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  fetchUsers(){
    const url = `${this.baseUrl}/users`;
    this.http.get<IUser[]>(url)
      .subscribe(users => {
        this._usersSource.next(users);
      })
  }

  // Get last value without subscribing to the users$ observable (syncronously)
  getUsers(): IUser[] {
    return this._usersSource.getValue();
  }
}
