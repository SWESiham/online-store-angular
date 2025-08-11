import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
declare const bootstrap: any;
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('toastElement', { static: false }) toastElementRef!: ElementRef;
  toastMessage: string = '';
    constructor (public cartService:CartService){}
   
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  product: any | null = null;
  error: string | null = null;
  productId: number = 0;
  count: number = 1;
  ngOnInit() {
   
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Route ID parameter:', id);
      
      if (id && !isNaN(+id)) {
        this.productId = +id;
        this.loadProductDetails(this.productId);
      } else {
        this.error = 'Invalid product ID';
      }
    });
  }
  // Add this method to test connection
  // testConnection() {
  //   console.log('Testing connection to JSON server...');
  //   this.productService.getAllProducts().subscribe({
  //     next: (products) => {
  //       console.log('Connection successful! Found products:', products);
  //     },
  //     error: (error) => {
  //       console.error('Connection failed:', error);
  //     }
  //   });
  // }

  loadProductDetails(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        console.log('Product loaded:', product);
        this.product = product;
      
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = error.message || 'Failed to load product';
        
      }
    });
  }
  addToCart(product: any): void {
    this.toastMessage = `${product.title} added to cart!`;

    const toastElement = this.toastElementRef.nativeElement;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    this.cartService.addToCart(product);
  }

  goBack() {
    this.router.navigate(['/product']);
  }
  decrement() {
    if(this.count>1){
      this.count--;
    }
    
  }
  increment() {
    this.count++;
  }
 
}