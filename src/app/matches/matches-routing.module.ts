import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesHomePageComponent } from './pages/matches-home-page/matches-home-page.component';

const routes: Routes = [
  {
    path:'',
    component:MatchesHomePageComponent
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
export class MatchesRoutingModule { }
