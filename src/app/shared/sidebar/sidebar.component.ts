import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
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
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarVisible: boolean = false;
  items: MenuItem[] = [];
  isAdmin: boolean = false;
  isModerator: boolean = false;
  user!: IUser | undefined;
  userSubscription!: Subscription;

  constructor(private authService: AuthService) {}

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

    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isAdmin = this.authService.userHasRole('Admin');
        this.isModerator = this.authService.userHasRole('Moderator');
      }
    });
  }

  showSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.user = undefined;
    this.authService.logout();
  }

  isAdminAndModerator() {
    return this.isAdmin && this.isModerator;
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
