import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order!: Order;
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getOrderById();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  private _getOrderById() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderService.getOrderById(params['id'])
          .pipe(takeUntil(this.endSubscription$))
          .subscribe((order) => {
            this.order = order;
            console.log(order)

          })

      }
    })
  }
}
