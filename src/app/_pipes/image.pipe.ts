import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../users/interfaces/IMember';
import { IUser } from '../_interfaces/IUser';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(member: IMember | IUser): string {
    return member.photoUrl ? member.photoUrl : './assets/user.png';
  }
}
