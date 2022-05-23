import { Component, OnInit } from '@angular/core';
import { CartService } from '@eshop/orders';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ngshop';

  constructor(private cartService: CartService){}

ngOnInit(): void {
    this.cartService.initCartLocalStorage();
}
}

