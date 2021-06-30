import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';



@NgModule({
  declarations: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,

  ],
  exports: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent
  ]
})
export class SharedModule { }
