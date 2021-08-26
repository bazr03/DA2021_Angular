import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { PhotoManagementComponent } from './photo-management/photo-management.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';

@NgModule({
  declarations: [
    PanelComponent,
    UserManagementComponent,
    PhotoManagementComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, NgPrimeModule],
})
export class AdminPanelModule {}
