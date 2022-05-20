import { Component } from '@angular/core';
import { CartService } from '@eshop/orders';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private cartService: CartService){
    this.cartService.initCartLocalStorage();
  }
  title = 'ngshop';
}
