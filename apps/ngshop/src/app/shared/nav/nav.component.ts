import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() { 
    this.items = [
      {label:'Home'}
    ]
  }
}
