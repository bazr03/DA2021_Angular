import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router:Router,
    private messageService:MessageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(error => {
          if(error){
            switch (error.status) {
              case 400:
                const errs = error.error.errors;
                if(errs){
                  const modalStateErrors = [];
                  for(const key in errs){
                    if(errs[key]){
                      modalStateErrors.push(errs[key]);
                    }
                  }
                  throw modalStateErrors.flat();
                } else {
                  this.messageService.add({
                    key: 'br',
                    severity:'error',
                    summary:`${error.status}`,
                    detail:`${error.statusText}`});
                }
                break;

              case 401:
                this.messageService.add({
                  key: 'br',
                  severity:'error',
                  summary:`${error.status}`,
                  detail:`${error.statusText}`});
                  break;

              case 404:
                this.router.navigateByUrl('/404');
                break;

              case 500:
                const navigationExtras: NavigationExtras = {state:{error:error.error}};
                this.router.navigateByUrl('/server-error', navigationExtras);
                break;

              default:
                this.messageService.add({
                  key: 'br',
                  severity:'error',
                  summary:'Error',
                  detail:'Something unespected went wrong!'});
                  console.log(error);
                break;
            }
          }
          return throwError(error);
        })
      );
  }
}
