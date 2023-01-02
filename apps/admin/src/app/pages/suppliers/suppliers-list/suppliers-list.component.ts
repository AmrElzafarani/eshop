import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '@eshop/products';
import { Supplier } from 'libs/products/src/lib/models/supplier';

@Component({
  selector: 'admin-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styles: [
  ]
})
export class SuppliersListComponent implements OnInit {

  suppliers: Supplier[] = [];
  totalSuppliersCount = 0;
  suppliersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 30];
  constructor(
    private suppliersService: SuppliersService
  ) { }

  ngOnInit(): void {
    this.getSuppliers()
  }

  private getSuppliers() {
    this.suppliersService.getSuppliers(this.suppliersPerPage, this.currentPage)
    .subscribe(res => {
      console.log(res)
      this.suppliers = res.message;
      this.totalSuppliersCount = res.total
    })
  }

  handlePagination(pageData: any) {
    this.currentPage = pageData.page + 1;
    this.suppliersPerPage = pageData.rows;
    this.getSuppliers();
  }

}
