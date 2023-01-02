import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule,
    CarouselModule
  ],
  declarations: [
    BannerComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    GalleryComponent
  ]
})
export class UiModule { }
