import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@eshop/products';
import { CartService } from '../../services/cart.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = []
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
    ) { }

  ngOnInit(): void {
    this._getCartDetails();
    console.log(this.cartItemsDetailed)
  }

  ngOnDestroy() {
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(resCart => {
      this.cartItemsDetailed = [];
      this.cartCount = resCart?.items.length ?? 0;
      resCart.items.forEach(cartItem => {
        this.productService.getproductById(cartItem.productId)
        .subscribe(resProduct => {
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
         })
      })
    })
  }

  backToShop(){
    this.router.navigate(["/products"])
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product._id);
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    console.log(event.value)
    this.cartService.setCartItem({
      productId: cartItem.product._id,
      quantity: event.value
    },true
    );
  }

}
