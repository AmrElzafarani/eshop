import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { map, Observable, switchMap } from "rxjs";
import { Order, OrdersResponse } from "../models/order";
import { OrderItem } from "../models/order-item";
import { StripeService } from 'ngx-stripe';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders';
  apiURLProducts = environment.apiURL + 'products';


  constructor(private http: HttpClient, private stripeService: StripeService) { }

  //Get all Orders
  getOrders(ordersPerPage: number, currentPage: number): Observable<OrdersResponse> {
    const queryParams = `?pagesize=${ordersPerPage}&page=${currentPage}`;
    return this.http.get<OrdersResponse>(`${this.apiURLOrders}${queryParams}`)
  }

  //Get order by ID
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  //Create Order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  //Delete Order
  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  //get orders count
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  //get total sales of orders
  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  //Get product by ID
  getproductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`)
  }

  //Get session Id for Payment
  createCheckoutSession(orderItems: OrderItem[]) {
    return this.http.post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItems)
      .pipe(switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id })
      }));
  }

  //Add Order in local storage
  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  //Get order from local storage
  getCachedOrderData(): Order {
    const orderDataJsonString: string = localStorage.getItem('orderData') || '{}'
    const orderData: Order = JSON.parse(orderDataJsonString)
    return orderData
  }

  //Remove cached Data
  removeCachedData() {
    localStorage.removeItem('orderData');
  }

}
