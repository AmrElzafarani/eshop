import { Component, OnInit } from '@angular/core';
import { Brand, BrandsService } from '@eshop/products';

@Component({
  selector: 'admin-brands-list',
  templateUrl: './brands-list.component.html',
  styles: [
  ]
})
export class BrandsListComponent implements OnInit {

  brands: Brand[] = [];
  totalBrandsCount = 0;
  brandsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 30];

  constructor(
    private brandsService: BrandsService
  ) { }

  ngOnInit(): void {

    this.getBrands();
  }

  private getBrands() {
    this.brandsService.getBrands(this.brandsPerPage, this.currentPage)
    .subscribe(res => {
      this.brands = res.message;
      this.totalBrandsCount = res.total;
    })
  }

  handlePagination (pageDate: any) {
    console.log(pageDate);

    this.currentPage = pageDate.page + 1;
    this.brandsPerPage = pageDate.rows;
    this.getBrands();
  }

}
