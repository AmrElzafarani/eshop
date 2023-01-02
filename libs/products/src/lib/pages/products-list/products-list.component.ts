import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  totalProductsCount = 0;
  productsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 15, 20, 30];
  isCategoryPage!: boolean;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter, this.productsPerPage, this.currentPage).subscribe((products) => {
      this.products = products.message;
      this.totalProductsCount = products.total;

    })
  }
  handlePagination (pageDate: any) {
    this.currentPage = pageDate.page + 1;
    this.productsPerPage = pageDate.rows;
    this._getProducts();
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories.message
    })
  }

  categoryFilter() {

     const selectedCategories = this.categories
     .filter((category) => category.checked)
     .map((category) => category._id)
    console.log(selectedCategories)
    
      this._getProducts(selectedCategories)
  }

}
