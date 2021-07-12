import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // AuthGuard se suscribira automaticamente al Observer ReplaySubject<IUser> definido en
  // el servicio auth.service.ts, en general se suscribe a cualquier Observable

  constructor(
    private authService:AuthService,
    private messageService: MessageService
    ) {}
  canActivate(): Observable<boolean>  {
    return this.authService.currentUser$
      .pipe(
        map(user => {
          if(user) return true;

          this.messageService.add({
            key: 'br',
            severity:'error',
            summary:'Error',
            detail:'You shall not pass!'});
          return false;
        })
      )
  }

}
