import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  navItems: MenuItem[];
  ngOnInit () {
    this.navItems = [
      {
        label: 'Home',
        routerLink: ['/']
      },
      {
        label: 'Products',
        routerLink: ['/products']
      }
    ]
  }
}
