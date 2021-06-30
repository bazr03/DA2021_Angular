import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {BadgeModule} from 'primeng/badge';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  exports: [
    MenubarModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    BadgeModule,
    SplitButtonModule,
    InputTextModule
  ]
})
export class NgPrimeModule { }
