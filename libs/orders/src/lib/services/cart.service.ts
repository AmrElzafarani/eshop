/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';

export const CART_KEY = "cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: []
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  emptyCart() {
    const intialCart = {
      items: []
    }
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart)
  }


  getCart(): Cart {
    const cartJsonString: string = (localStorage.getItem(CART_KEY)!);
    console.log(cartJsonString);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;

  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart: Cart = this.getCart();
    const cartItemExist = cart?.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }
        }
        return item;
      })
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== productId);

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);

  }

  //   setCartItem(cartItem: CartItem): Cart {
  //     // const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '');
  //     const cart = this.getCart();
  //     cart?.items?.push(cartItem);
  //     const cartJson = JSON.stringify(cart);
  //     localStorage.setItem(CART_KEY, cartJson);
  //     return cart;
  // }



}

