import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';
import { IMember } from '../interfaces/IMember';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
})
export class UserEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member$!: Observable<IMember>;
  member!: IMember;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.member$ = this.authService.currentUser$.pipe(
      switchMap((user) => this.usersService.fetchUser(user.username)),
      tap((member) => {
        this.member = member;
      })
    );
  }

  updateMember() {
    this.usersService.updateMember(this.member).subscribe(
      () => {
        this.messageService.add({
          key: 'tr',
          severity: 'success',
          summary: `Updated Completed`,
          detail: `Profile update successfully`,
        });

        this.editForm.reset(this.member);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
