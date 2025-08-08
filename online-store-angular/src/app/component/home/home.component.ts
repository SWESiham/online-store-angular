import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  searchName: string = '';
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((data: any) => {
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
