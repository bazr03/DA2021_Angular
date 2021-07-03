import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-server',
  templateUrl: './error-server.component.html',
  styles: [
  ]
})
export class ErrorServerComponent implements OnInit {
  error: any;
  constructor(
    private router:Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
  }

  ngOnInit(): void {
  }

}
