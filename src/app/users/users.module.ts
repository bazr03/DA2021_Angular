import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { WithLoadingPipe } from '../_pipes/with-loading.pipe';
import { UserCardComponent } from './user-card/user-card.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { ImgGalleryComponent } from './components/img-gallery/img-gallery.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
    WithLoadingPipe,
    UserCardComponent,
    UserEditComponent,
    PhotoEditorComponent,
    ImgGalleryComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgPrimeModule,
    FormsModule,
    SharedModule,
  ],
  exports: [UserCardComponent],
})
export class UsersModule {}
