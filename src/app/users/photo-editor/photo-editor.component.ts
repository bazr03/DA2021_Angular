import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../interfaces/IMember';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styles: [],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: IMember;
  url: string = environment.baseUrl + '/users/add-photo';
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}
