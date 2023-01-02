/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { BannerImage } from '../../models/bannerImage';
import { BannerImagesService } from '../../services/banner-images.service';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent implements OnInit {

  bannerImage!: BannerImage;

  constructor(private bannerImageService: BannerImagesService) { }


  ngOnInit(): void {
    this._getbannerImage();
  }

  private _getbannerImage() {
    this.bannerImageService.getBannerImage(1).subscribe(image => {
      console.log(image.image)
      this.bannerImage = image;
      // console.log(this.bannerImage.image)
    })
  }
}
