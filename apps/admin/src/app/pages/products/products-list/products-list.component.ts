import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@eshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  endSubscription$: Subject<any> = new Subject();


  constructor(
    private productsServeice: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  private _getProducts() {
    this.productsServeice.getProducts()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(products => {
        this.products = products;
      });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`/products/form/${productId}`)
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsServeice.deleteProduct(productId)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
            (product: Product) => {
              this._getProducts()
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Product ${product.name} is deleted`
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted'
              });

            }
          );
      },
      key: "positionDialog"

    });
  }

}
