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
  total: number = 0;
  constructor() {
    this.loadFromStorage();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
    this.calculateTotal();
    }

  getCartItems() {
    return this.cartItems;
  }

  updateStorage() {
    this.saveToStorage();
    this.calculateTotal();
  }
  saveCart() {
    localStorage.setItem('user_cart_v1', JSON.stringify(this.cartItems));
    this.calculateTotal(); 
  }
}
