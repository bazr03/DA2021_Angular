import { Component, Input, OnInit } from '@angular/core';
import { IImage } from '../../interfaces/IImage';

@Component({
  selector: 'app-img-gallery',
  templateUrl: './img-gallery.component.html',
  styles: [],
})
export class ImgGalleryComponent implements OnInit {
  @Input() images: IImage[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
