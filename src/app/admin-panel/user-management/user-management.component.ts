import { Component, OnInit } from '@angular/core';
import { IUser } from '../../_interfaces/IUser';
import { AdminService } from '../../_services/admin.service';

interface IRoles {
  name: string;
  key: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users!: Partial<IUser[]>;
  displayModal: boolean = false;
  selectedUser!: IUser;
  availableRoles: IRoles[] = [
    { name: 'Admin', key: 'admin' },
    { name: 'Moderator', key: 'Mod' },
    { name: 'Member', key: 'Mem' },
  ];
  selectedRoles: IRoles[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users) => {
      this.users = users;
    });
  }

  showDialog(user: IUser) {
    this.selectedUser = user;
    this.selectedRoles = [];
    this.getRolesArray(user);
    this.displayModal = true;
  }

  isDisabled() {
    let isAdmin = false;
    this.selectedRoles.forEach((role) => {
      if (role.name === 'Admin') {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

  updateSelectedRoles() {
    const roles: string[] = [];
    this.selectedRoles.forEach((role) => {
      roles.push(role.name);
    });

    this.adminService
      .updateUserRoles(this.selectedUser.username, roles)
      .subscribe(() => {
        this.selectedUser.roles = [...roles];
        this.updateUsers(this.selectedUser);
        this.displayModal = false;
      });
  }

  hideModal() {
    this.displayModal = false;
  }

  private getRolesArray(user: IUser) {
    const userRoles = user.roles;

    this.availableRoles.forEach((role) => {
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          this.selectedRoles.push(role);
        }
      }
    });
  }

  private updateUsers(user: IUser) {
    this.users = this.users.map((usr) => {
      return usr?.username === user.username ? user : usr;
    });
  }
}
