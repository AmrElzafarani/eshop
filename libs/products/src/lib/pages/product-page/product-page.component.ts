import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@eshop/orders';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  
})
export class ProductPageComponent implements OnInit {

  product!: Product;
  quantity = 1;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid'])
      }
    })
  }

  private _getProduct(productId: string) {
    this.productService.getproductById(productId).subscribe(product => {
      this.product = product
    })

  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }
}
