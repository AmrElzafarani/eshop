import { Component, OnInit } from '@angular/core';
import { CartService } from '@eshop/orders';
import { UsersService } from '@eshop/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ngshop';

  constructor(private cartService: CartService, private usersService: UsersService){}

ngOnInit(): void {
    this.cartService.initCartLocalStorage();
    this.usersService.initAppSession();

}
}

