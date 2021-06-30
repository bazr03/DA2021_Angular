import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {NgPrimeModule} from '../ng-prime/ng-prime.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from 'primeng/api';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    WelcomeRoutingModule,
  ]
})
export class WelcomeModule { }
