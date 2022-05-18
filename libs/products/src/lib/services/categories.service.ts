import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories'

  constructor(private http: HttpClient) { }

  //Get all categories
   getCategories(): Observable<Category[]> {
    return  this.http.get<Category[]>(this.apiURLCategories)
  }

  //Create category
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, category)
  }

  //Delete Category
  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`)
  }

  //Get Category by ID
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
  }

  //Update Category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category._id}`, category)
  }
}
