import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  products: any[] = [];
  loading = true;
  error: string | null = null;

  // Form model
  newProduct = { id: null, title: '', price: 0, image: '' };
  editingProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  addProduct() {
    if (!this.newProduct.title || !this.newProduct.price || !this.newProduct.image) {
      alert('Please fill all fields');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { id: null, title: '', price: 0, image: '' };
      },
      error: (err) => console.error('Error adding product', err)
    });
  }

  editProduct(product: any) {
    this.editingProductId = product.id;
    this.newProduct = { ...product }; // copy data
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProductId!, this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.cancelEdit();
      },
      error: (err) => console.error('Error updating product', err)
    });
  }

  cancelEdit() {
    this.editingProductId = null;
    this.newProduct = { id: null, title: '', price: 0, image: '' };
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err: any) => console.error('Error deleting product', err)
      });
    }
  }
}