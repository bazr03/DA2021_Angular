import { IUser } from '../_interfaces/IUser';
export class UserParams {
  gender: string = '';
  minAge: number = 18;
  maxAge: number = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor(user: IUser) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
