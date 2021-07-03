import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../users/interfaces/IMember';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(member: IMember): string {
    const photoUrl = member.photoUrl ? member.photoUrl: './assets/user.png';
    return photoUrl;
  }
}
