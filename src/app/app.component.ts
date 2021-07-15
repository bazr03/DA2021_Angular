import { Component, OnInit } from '@angular/core';
import { loadFromLocalStorage } from './_helpers/helpers';
import { IUser } from './_interfaces/IUser';
import { AuthService } from './_services/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private primeNgConfig: PrimeNGConfig
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
    this.primeNgConfig.ripple = true;
  }
  setCurrentUser() {
    const user: IUser = loadFromLocalStorage('datApp_user');
    console.log('current user from app-componente', user);
    this.authService.setCurrentUser(user);
  }
}
