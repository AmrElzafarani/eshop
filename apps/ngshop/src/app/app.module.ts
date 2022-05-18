import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProductsModule } from '@eshop/products';
import { UiModule } from '@eshop/ui';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';
import { OrdersModule } from '@eshop/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent, 
    FooterComponent,
    HeaderComponent, 
    NavComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(routes),
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule

  ],
   
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [
    MessagesComponent
  ],
})
export class AppModule {}
