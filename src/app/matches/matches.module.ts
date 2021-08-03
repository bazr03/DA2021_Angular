import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesHomePageComponent } from './pages/matches-home-page/matches-home-page.component';
import { MatchesRoutingModule } from './matches-routing.module';

import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [MatchesHomePageComponent],
  imports: [CommonModule, MatchesRoutingModule, NgPrimeModule, UsersModule],
})
export class MatchesModule {}
