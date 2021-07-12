import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../interfaces/IMember';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { FileUploadService } from '../../_services/file-upload.service';
import { IPhoto } from '../interfaces/IPhoto';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styles: [],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: IMember;
  @ViewChild('fileUpload') fileUpload: any;
  url: string = environment.baseUrl + '/users/add-photo';
  uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private fileUploadService: FileUploadService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.uploadImages();
  }

  uploadImages() {
    this.fileUploadService
      .uploadFiles(this.uploadedFiles)
      .subscribe((photos) => {
        photos.forEach((photo) => {
          this.member.photos.push(photo);
        });

        this.messageService.add({
          key: 'tr',
          severity: 'success',
          summary: 'Success',
          detail: 'Images uploaded succesfully!',
        });
        this.uploadedFiles = [];
        this.clear();
      });
  }

  clear() {
    this.fileUpload.clear();
  }

  setMainPhoto(photo: IPhoto) {
    this.usersService.setMainPhoto(photo).subscribe(() => {
      this.member.photoUrl = photo.url;

      this.member.photos.forEach((p) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });

      this.messageService.add({
        key: 'tr',
        severity: 'success',
        summary: 'Success',
        detail: 'Main Photo Updated successfully',
      });
    });
  }

  deletePhoto(photoId: number) {
    this.usersService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter((f) => f.id !== photoId);
      this.messageService.add({
        key: 'tr',
        severity: 'success',
        summary: 'Success',
        detail: 'Photo deleted successfully',
      });
    });
  }
}
