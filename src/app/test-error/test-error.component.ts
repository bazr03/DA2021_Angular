import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styles: [
  ]
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.baseUrl;

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl+'/buggy/not-found')
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
  }
  get400Error(){
    this.http.get(this.baseUrl+'/buggy/bad-request')
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
  }
  get500Error(){
    this.http.get(this.baseUrl+'/buggy/server-error')
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
  }
  get401Error(){
    this.http.get(this.baseUrl+'/buggy/auth')
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
  }

  get400ValidationError(){
    this.http.post(this.baseUrl+'/account/register', {})
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      })
  }

}
