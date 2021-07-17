import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-changes.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserResolver } from './user.resolver';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersResolver } from './users.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    // resolve: {members:UsersResolver}
  },
  {
    path: 'edit',
    component: UserEditComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: ':username',
    component: UserDetailComponent,
    resolve: { member: UserResolver },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
