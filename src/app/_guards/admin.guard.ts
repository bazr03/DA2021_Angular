import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { MessageService } from 'primeng/api';
import { IUser } from '../_interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user: IUser) => {
        if (user.roles.includes('Admin') || user.roles.includes('Moderator')) {
          return true;
        }
        this.messageService.add({
          key: 'br',
          severity: 'error',
          summary: 'Error',
          detail: 'You cannot enter this area!',
        });
        return false;
      })
    );
  }
}
