import { NgModule } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {BadgeModule} from 'primeng/badge';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {GalleriaModule} from 'primeng/galleria';
import {InputTextareaModule} from 'primeng/inputtextarea';





@NgModule({
  exports: [
    MenubarModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
    BadgeModule,
    SplitButtonModule,
    InputTextModule,
    CardModule,
    TabViewModule,
    GalleriaModule,
    InputTextareaModule
  ]
})
export class NgPrimeModule { }
