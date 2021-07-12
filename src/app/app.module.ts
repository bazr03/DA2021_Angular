import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TestErrorComponent } from './test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ErrorServerComponent } from './error-server/error-server.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent, TestErrorComponent, ErrorServerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
