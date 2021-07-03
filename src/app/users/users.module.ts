import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { WithLoadingPipe } from '../_pipes/with-loading.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import {ImagePipe} from '../_pipes/image.pipe';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
    WithLoadingPipe,
    UserCardComponent,
    ImagePipe,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgPrimeModule,
    FormsModule
  ]
})
export class UsersModule { }
