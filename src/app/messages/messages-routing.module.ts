import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MessagesHomePageComponent } from './pages/messages-home-page/messages-home-page.component';

const routes: Routes = [
  {
    path:'',
    component:MessagesHomePageComponent
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule { }
