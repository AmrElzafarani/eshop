import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialsService } from '@eshop/products';
import { Material } from 'libs/products/src/lib/models/material';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-materials-list',
  templateUrl: './materials-list.component.html',
  styles: [
  ]
})
export class MaterialsListComponent implements OnInit {

  materials: Material[] = [];
  totalMaterialsCount = 0;
  materialsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 30];

  constructor(
    private materialsService: MaterialsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMaterials();
  }

  private getMaterials() {
    this.materialsService.getMaterials(this.materialsPerPage, this.currentPage)
    .subscribe(res => {
      console.log(res)
      this.materials = res.message;
      this.totalMaterialsCount = res.total
    })
  }

  handlePagination (pageData: any) {
    this.currentPage = pageData.page + 1;
    this.materialsPerPage = pageData.rows;
    this.getMaterials();
  }

}
