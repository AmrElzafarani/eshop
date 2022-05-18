import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable, ObservedValueOf } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.apiURL + 'products'

  constructor(private http: HttpClient) { }

  //Get all Products
  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(this.apiURLProducts, {params: params})
  }

  //Create Product
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiURLProducts}/create-product`, productData)
  }

    //Delete Product
    deleteProduct(productId: string): Observable<Product> {
      return this.http.delete<Product>(`${this.apiURLProducts}/${productId}`)
    }

    //Get product by ID
    getproductById(productId: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
    }

  //Update Product
  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData)
  }

  //Get Products count
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCounts));
  }

  //Get featured products
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`)
  }
}
