import { Component, Input, OnInit } from '@angular/core';
import { CartService, CartItem } from '@eshop/orders';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product

  constructor(private cartService: CartService, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.localstorageService.isValidToken();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)
  }

}
