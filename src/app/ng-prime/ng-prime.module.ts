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
import { PaginatorModule } from 'primeng/paginator';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';

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
    PaginatorModule,
    InputNumberModule,
    DropdownModule,
    SelectButtonModule,
  ],
})
export class NgPrimeModule {}
