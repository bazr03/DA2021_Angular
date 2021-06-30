import { Component, OnInit } from '@angular/core';
import { loadFromLocalStorage } from './_helpers/helpers';
import { IUser } from './_interfaces/IUser';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    private authService:AuthService
  ) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser(){
    const user:IUser = loadFromLocalStorage('datApp_user');
    this.authService.setCurrentUser(user);
  }
}
