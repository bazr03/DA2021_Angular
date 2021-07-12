import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ImagePipe } from '../_pipes/image.pipe';

@NgModule({
  declarations: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent,
    ImagePipe,
  ],
  imports: [CommonModule, NgPrimeModule],
  exports: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent,
    ImagePipe,
  ],
})
export class SharedModule {}
