import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../interfaces/IMember';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() member!:IMember;

  constructor() { }

  ngOnInit(): void {
  }

}
