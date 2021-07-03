import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { UsersService } from 'src/app/_services/users.service';
import { IMember } from '../interfaces/IMember';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ]
})
export class UserEditComponent implements OnInit {
  member$!: Observable<IMember>;
  member!: IMember;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.member$ = this.authService.currentUser$
                      .pipe(
                        switchMap(user => this.usersService.fetchUser(user.username)),
                        tap( member => {
                          this.member = member;
                        })
                      );
  }

  updateMember(){
    console.log('click')
    console.log(this.member);
    this.messageService.add({
      key: 'tr',
      severity:'success',
      summary:`Updated Completed`,
      detail:`Profile update successfully`});
  }

}
