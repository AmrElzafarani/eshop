import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BannerImage } from '../models/bannerImage';

@Injectable({
  providedIn: 'root'
})
export class BannerImagesService {

  apiUrl = environment.apiURL + 'bannerImage'

  constructor(private http: HttpClient) { }

  getBannerImage(count: number): Observable<BannerImage>{
    return this.http.get<BannerImage>(`${this.apiUrl}/image/${count}`)
  }

}
