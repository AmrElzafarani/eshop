import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@eshop/orders';
import { ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics: number[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
    .pipe(takeUntil(this.endSubscription$))
    .subscribe((values) => {
      this.statistics = values;
    });
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

}
