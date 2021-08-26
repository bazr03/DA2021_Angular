import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../_interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    const url = `${this.baseUrl}/admin/users-with-roles`;

    return this.http.get<Partial<IUser[]>>(url);
  }

  updateUserRoles(username: string, roles: string[]) {
    const url = `${this.baseUrl}/admin/edit-roles/${username}?roles=${roles}`;

    return this.http.post(url, {});
  }
}
