import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesHomePageComponent } from './pages/messages-home-page/messages-home-page.component';
import { MessagesRoutingModule } from './messages-routing.module';



@NgModule({
  declarations: [
    MessagesHomePageComponent
  ],
  imports: [
    CommonModule, MessagesRoutingModule
  ]
})
export class MessagesModule { }
