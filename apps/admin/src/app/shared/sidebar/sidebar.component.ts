import { Component } from '@angular/core';
import { AuthService } from '@eshop/users';
import {sidebarData} from '../../shared/sidebar-data';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  items = sidebarData;

  constructor(private authService: AuthService) { }

  logoutUser() {
    console.log("delete")
    this.authService.logout();
  }

}
