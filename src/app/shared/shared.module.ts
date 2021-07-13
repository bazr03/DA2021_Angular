import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgPrimeModule } from '../ng-prime/ng-prime.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ImagePipe } from '../_pipes/image.pipe';
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DateInputComponent } from './date-input/date-input.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent,
    ImagePipe,
    TextInputComponent,
    DateInputComponent,
  ],
  imports: [CommonModule, NgPrimeModule, ReactiveFormsModule, CalendarModule],
  exports: [
    MainMenuComponent,
    SidebarComponent,
    MainToolbarComponent,
    ImagePipe,
    TextInputComponent,
    ReactiveFormsModule,
    DateInputComponent,
  ],
})
export class SharedModule {}
