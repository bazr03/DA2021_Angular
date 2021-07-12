import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from '../users/interfaces/IPhoto';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  uploadImages(filesToUpload: any[]) {
    const url = `${this.baseUrl}/users/add-photo`;

    const formData: FormData = new FormData();

    for (let file of filesToUpload) {
      formData.append('file', file, file.name);
    }

    return this.http.post<IPhoto>(url, formData);
  }

  uploadFiles(filesToUpload: any[]) {
    const observableList$ = [];

    for (let file of filesToUpload) {
      observableList$.push(this.uploadImage(file));
    }

    return forkJoin(observableList$);
  }

  private uploadImage(file: any) {
    const url = `${this.baseUrl}/users/add-photo`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<IPhoto>(url, formData);
  }
}
