import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(private productService: ProductService) {}

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
}
