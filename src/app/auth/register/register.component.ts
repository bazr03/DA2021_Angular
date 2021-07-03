import { Component, OnInit } from '@angular/core';
import { IRegister } from '../interfaces/IRegister';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  .register{
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
export class RegisterComponent implements OnInit {
  model: IRegister = {
    username: '',
    password:'',
    confirmPassword: ''
  }
  error: string = '';
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }
  onSumbit(){

    if(this.model.password.trim() !== this.model.confirmPassword.trim()){
      this.error = 'El password no coincide';
      return;
    }

    this.authService.register({
      username:this.model.username,
      password:this.model.password
    })
      .subscribe(user => {
        // aqui debemos redireccionar a homeComponent??
      })
  }

}
