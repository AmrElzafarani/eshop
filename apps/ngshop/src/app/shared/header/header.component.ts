import { Component, OnInit } from '@angular/core';
import { CartService } from '@eshop/orders';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private cartService: CartService) { 

  }

  ngOnInit(): void { }

}
