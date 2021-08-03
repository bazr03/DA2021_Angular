import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/users/interfaces/IPagination';
import { IMember } from '../../../users/interfaces/IMember';
import { UsersService } from '../../../_services/users.service';

interface IDisplay {
  value: string;
  display: string;
}

@Component({
  selector: 'app-matches-home-page',
  templateUrl: './matches-home-page.component.html',
  styles: [],
})
export class MatchesHomePageComponent implements OnInit {
  members!: Partial<IMember[]>;

  likes!: IDisplay[];
  selectedValue: string = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination!: IPagination;

  constructor(private userService: UsersService) {
    this.likes = [
      { value: 'liked', display: 'Members I like' },
      { value: 'likedBy', display: 'Members who like me' },
    ];
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.userService
      .getLikes(this.selectedValue, this.pageNumber, this.pageSize)
      .subscribe((res) => {
        const members = res.result;
        if (members) {
          this.members = members;
          this.pagination = res.pagination;
        }
      });
  }

  onPageChange(event: any) {
    this.pageNumber = +event.page + 1;
    this.loadLikes();
  }
}
