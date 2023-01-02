import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit {

  categories: Category[] = [];
  responsiveOptions; 

  constructor(
    private categoriesService: CategoriesService,
    ) { 
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 4,
            numScroll: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '560px',
            numVisible: 2,
            numScroll: 2
        }
    ];
    }

  ngOnInit(): void {
    
    this.getCategories();
  }


  private  getCategories() {
     this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories.message
    })
  }

}
