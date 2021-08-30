import { Component, OnInit } from '@angular/core';
import { loadFromLocalStorage } from './_helpers/helpers';
import { IUser } from './_interfaces/IUser';
import { AuthService } from './_services/auth.service';
import { PrimeNGConfig } from 'primeng/api';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private primeNgConfig: PrimeNGConfig,
    private presence: PresenceService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
    this.primeNgConfig.ripple = true;
  }
  setCurrentUser() {
    const user: IUser = loadFromLocalStorage('datApp_user');
    if (user) {
      this.authService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
