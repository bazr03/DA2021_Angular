import { Component, OnInit } from '@angular/core';
import { IRegister } from '../interfaces/IRegister';
import { AuthService } from 'src/app/_services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// import * as moment from 'moment';

// TODO: Revisar Calendar de PrimeNg

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .register {
        width: 100%;
        min-height: 80vh;
      }
      .box {
        padding: 50px 55px;
        background-color: var(--surface-a);
      }
      .login__redirect {
        font-size: 0.8rem;
        color: var(--surface-500);
      }
      .login__redirect a {
        color: var(--surface-700);
      }
    `,
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  es: any;
  birthDate!: Date;
  maxDate!: Date;
  yearRange: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.birthDate = new Date();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.yearRange = `1960:${this.maxDate.getFullYear()}`;
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [this.maxDate, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.doPasswordMatch('password')],
      ],
    });

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  doPasswordMatch(matchTo: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const passw = c.parent?.get(matchTo)?.value;
      return c?.value === passw ? null : { isMatching: true };
    };
  }

  onSumbit() {
    console.log(this.registerForm.value);
  }
}
