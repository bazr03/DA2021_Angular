import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesHomePageComponent } from './pages/matches-home-page/matches-home-page.component';
import { MatchesRoutingModule } from './matches-routing.module';



@NgModule({
  declarations: [
    MatchesHomePageComponent
  ],
  imports: [
    CommonModule,
    MatchesRoutingModule
  ]
})
export class MatchesModule { }
