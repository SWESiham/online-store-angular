import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  discountPercent = 10; // ✅ Automatically applied
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get subtotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get discount() {
    return (this.subtotal * this.discountPercent) / 100;
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
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('user_cart_v1', JSON.stringify(this.cartItems));
  }
}
