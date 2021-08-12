import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IImage } from '../interfaces/IImage';
import { IMember } from '../interfaces/IMember';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit {
  member!: IMember;
  images: IImage[] = [];
  activeIndex: number = 0;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.member = data['member'];
      this.setImages();
    });

    this.route.queryParams.subscribe((params) => {
      if (params.tab) {
        this.setTab(params.tab);
      }
    });
  }
  setImages() {
    this.member.photos.forEach((photo) => {
      if (photo?.url) {
        this.images.push({
          previewImageSrc: `${photo?.url}`,
          thumbnailImageSrc: `${photo?.url}`,
          alt: `photo of ${this.member.knownAs}`,
          title: `${this.member.knownAs}`,
        });
      }
    });
  }

  setTab(tab: string) {
    if (!tab) {
      return;
    }
    switch (tab) {
      case 'messages':
        this.activeIndex = 3;
        break;
      case 'about':
        this.activeIndex = 0;
        break;
      case 'interests':
        this.activeIndex = 1;
        break;
      case 'photos':
        this.activeIndex = 2;
        break;
      default:
        this.activeIndex = 0;
        break;
    }
  }
}
