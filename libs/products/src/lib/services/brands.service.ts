import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Brand, brandsResponse } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  apiUrl = environment.apiURL + 'brands';

  constructor(private http: HttpClient) { }

   //Get All Brands
   getBrands(brandsPerpage?: number, currentPage?: number): Observable<brandsResponse> {
    const queryParams = `?pagesize=${brandsPerpage}&page=${currentPage}`;
    return this.http.get<brandsResponse>(`${this.apiUrl}${queryParams}`)
  }

  //Create Brand
  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand)
  }

  //Search By Brand Name
  serachByBrandName = (name: string): Observable<brandsResponse> => {
    return this.http.post<brandsResponse>(`${this.apiUrl}/searchByBrandName`, {name})
  }
}
