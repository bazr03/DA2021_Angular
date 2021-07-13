import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { RadioButtonModule } from 'primeng/radiobutton';

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
    InputTextareaModule,
    FileUploadModule,
    AvatarModule,
    RadioButtonModule,
  ],
})
export class NgPrimeModule {}
