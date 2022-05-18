import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit {

  categories: Category[] = [] 

  constructor(
    private categoriesService: CategoriesService,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    
    this.getCategories();
  }


  private  getCategories() {
     this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories
    })
  }

}
