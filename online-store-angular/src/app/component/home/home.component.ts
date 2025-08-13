import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
declare const bootstrap: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  searchName: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductService,private cartService:CartService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = Array.from(new Set(data.map((p: any) => p.category)));
    });
  }

  searchByName(): void {
    this.filteredProducts = this.products.filter((p: any) =>
      p.title.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  filterByCategory(): void {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (p: any) => p.category === this.selectedCategory
      );
    }
  }
  
 @ViewChild('toastElement', { static: false }) toastElementRef!: ElementRef;
  toastMessage: string = '';
  addToCart(product: any): void {
    this.toastMessage = `${product.title} added to cart!`;

    const toastElement = this.toastElementRef.nativeElement;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    this.cartService.addToCart(product);
  }
}
