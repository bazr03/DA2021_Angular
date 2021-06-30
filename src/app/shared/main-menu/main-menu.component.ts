import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styles: [
  ]
})
export class MainMenuComponent implements OnInit {

  items: MenuItem[] = [];
  loggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  this.showMenus();
  }

  showMenus(){
    if(this.loggedIn){
      this.items = [
        {
          label:'DattingApp'
        },
        {
          label:'Matches',
          icon: 'pi pi-users'
        },
        {
          label:'Lists',
          icon:'pi pi-list'
        },
        {
          label:'Messages',
          icon:'pi pi-envelope'
        }
      ]
    } else {
      this.items = [
        {
          label:'DattingApp'
        }
      ]
    }
  }

}
