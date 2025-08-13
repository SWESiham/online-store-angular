import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  couponCode = '';
  discountAmount = 0;
  isVaild = false;
  couponApplied = false;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.total = this.total;
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get subtotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get discount() {
    return (this.subtotal * this.discountAmount) / 100;
  }

  get total() {
    return this.subtotal - this.discount;
  }

  updateQuantity(index: number, change: number) {
    const item = this.cartItems[index];
    const newQty = item.quantity + change;
    if (newQty < 1) return;
    item.quantity = newQty;
    localStorage.setItem('user_cart_v1', JSON.stringify(this.cartItems));
    this.cartService.total = this.total;
    this.cartService.saveCart();
  }
  applyCoupon() {
    this.couponApplied = true;
    const code = this.couponCode?.trim().toUpperCase();
    if (!code) {
      alert('Enter coupon code');
      return;
    }
    if (code === 'D10') {
      this.discountAmount = 10;
      this.isVaild = true;
    }
    else if (code === 'SAVE20') {
      this.discountAmount = 20;
      this.isVaild = true;
    }
    else if (code === 'D30') {
      this.discountAmount = 30;
      this.isVaild = true;
    }
    else if (code === 'SAVE50') {
      this.discountAmount = 50;
      this.isVaild = true;
    }
    else {
      this.discountAmount = 0;
      this.isVaild = false;
    }
  }
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('user_cart_v1', JSON.stringify(this.cartItems));
    this.cartService.total = this.total;
    this.cartService.saveCart();
  }
}
