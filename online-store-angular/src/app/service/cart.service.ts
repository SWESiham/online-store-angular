import { Injectable } from '@angular/core';

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const STORAGE_KEY = 'user_cart_v1';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cartItems));
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    this.cartItems = raw ? JSON.parse(raw) : [];
  }

  private uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  addToCart(product: { image: string; title: string; price: number }) {
    const existing = this.cartItems.find(it => it.name === product.title);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({
        id: this.uid(),
        image: product.image,
        name: product.title,
        price: product.price,
        quantity: 1
      });
    }
    this.saveToStorage();
  }

  getCartItems() {
    return this.cartItems;
  }

  updateStorage() {
    this.saveToStorage();
  }
}
