import { ILogin } from './ILogin';

export interface IRegister extends ILogin {
  gender: string;
  knownAs: string;
  dateOfBirth: Date;
  city: string;
  country: string;
}
