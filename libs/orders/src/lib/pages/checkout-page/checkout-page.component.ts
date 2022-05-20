import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private cartService: CartService

  ) { }

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = "62219e47aad388a77d6a7464";

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: [''],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    console.log(cart)
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
  }

  backToCart() {
    this.router.navigate(["/cart"])
  }

  placeOrder() {
    this.isSubmitted = true;
    if(this.checkoutFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      // status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}` 
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      }
    )
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}
