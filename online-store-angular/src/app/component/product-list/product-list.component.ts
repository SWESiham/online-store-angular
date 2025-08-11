import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';
declare const bootstrap: any;
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  allProducts: any[] = [];
  products: any;         
  pagedProducts: any[] = [];   
  cPage: number = 1;
  iPage: number = 10;
  Math = Math;
  @ViewChild('toastElement', { static: false }) toastElementRef!: ElementRef;
  toastMessage: string = '';
  constructor (public service:ProductService,public router:Router,public ActivatedRoute:ActivatedRoute,public cartService:CartService){}
 
  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: (product) => {
        this.products = product
        this.allProducts = this.products;
        this.loadProducts();
      },
      error: (err) => {
        console.log(err)
      },
      complete() {
        console.log("completed")
      }
    })
  }

  isDropdownOpen: boolean = true; 
  
  categories:any = [
    {id:1,name: 'All'},
    {id:2,name: 'Men'},
    {id:3,name:'Women'},
    {id:4,name:'Electronics'},
    {id:5,name:'jewelery'}
  ];
  searchName: string = '';
  searchByName(): void {
    if (this.searchName === '') {
      this.products = this.allProducts;
    }
    this.products = this.products.filter((p: any) =>
      p.title.toLowerCase().includes(this.searchName.toLowerCase())
    );
    this.cPage = 1;
    this.loadProducts();
  }

  selectedCategory: any | null = null;

  filterByCategory(categoryName: string): void {
    // this.selectedCategory = categoryName;
    // console.log('Selected category:', categoryName);
    if (categoryName === '' || categoryName === 'All') {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter((p: any) => {
      if(categoryName === 'Men') {
        return p.category.toLowerCase() === "men's clothing"
      }
      else if(categoryName === 'Women') {
        return p.category.toLowerCase() === "women's clothing"
      }
      else if(categoryName === 'Electronics') {
        return p.category.toLowerCase() === "electronics"
      }
      else if(categoryName === 'jewelery') {
        return p.category.toLowerCase() === "jewelery"
      }
      else {
        return p.category.toLowerCase() === categoryName.toLowerCase()
      }
    });
    }
    this.cPage = 1;
    this.loadProducts();
  }
  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  loadProducts() {
    const sIdx = (this.cPage - 1) * this.iPage;
    const eIdx = sIdx + this.iPage;
    this.pagedProducts = this.products.slice(sIdx, eIdx);
  }
  gotoPage(page: number) {
    this.cPage = page;
    this.loadProducts();
  }

  
  addToCart(product: any): void {
    this.toastMessage = `${product.title} added to cart!`;

    const toastElement = this.toastElementRef.nativeElement;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    this.cartService.addToCart(product);
  }
  
  viewProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
