import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesHomePageComponent } from './pages/messages-home-page/messages-home-page.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessagesHomePageComponent],
  imports: [CommonModule, MessagesRoutingModule, NgPrimeModule, SharedModule],
})
export class MessagesModule {}
