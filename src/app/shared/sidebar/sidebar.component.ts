import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/_interfaces/IUser';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .brand {
        font-size: 1.3rem;
      }
      ,
      .fixed {
        position: fixed;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = false;
  items: MenuItem[] = [];
  isAdmin: boolean = false;
  isModerator: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Edit Profile',
        icon: 'pi pi-refresh',
        routerLink: '/members/edit',
      },
      {
        label: 'Logout',
        icon: 'pi pi-times',
        command: () => this.logout(),
      },
      {
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload',
      },
    ];

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.isAdmin = this.authService.userHasRole('Admin');
        this.isModerator = this.authService.userHasRole('Moderator');
      }
    });
  }

  showSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.authService.logout();
  }

  isAdminAndModerator() {
    return this.isAdmin && this.isModerator;
  }
}
