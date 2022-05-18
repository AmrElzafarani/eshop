import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  endSubscription$: Subject<any> = new Subject();


  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endSubscription$.next;
    this.endSubscription$.complete();
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId)
          .pipe(takeUntil(this.endSubscription$))
          .subscribe(
            () => {
              this._getOrders()
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Order  is deleted`
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted'
              });

            }
          );
      },
      key: "positionDialog"

    });
  }
  showOrderDetails(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  //Get Orders
  private _getOrders() {
    this.ordersService.getOrders()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((orders) => {
        this.orders = orders
      })
  }

}
