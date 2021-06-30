import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ILogin } from '../interfaces/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .login{
      width:100%;
      min-height:80vh;
    }
    .box{
      padding: 50px 55px;
      background-color: var(--surface-a)
    }
    .login__redirect{
      font-size: 0.8rem;
      color: var(--surface-500);
    }
    .login__redirect a {
      color:var(--surface-700);
    }
  `
  ]
})
export class LoginComponent implements OnInit {
  model: ILogin = {
    username: '',
    password:''
  };
  loggedIn: boolean = false;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.model)
      .subscribe( res => {
        console.log(res);
        this.loggedIn = true;
      },
      err => {
        console.log(err);
      });
  }

}
