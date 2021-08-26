import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { IUser } from '../../_interfaces/IUser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: [],
})
export class PanelComponent implements OnInit {
  user!: IUser;
  isAdmin: boolean = false;
  isModerator: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.userHasRole('Admin');
    this.isModerator = this.authService.userHasRole('Moderator');
  }
}
