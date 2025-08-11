import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false;
  productId!: string;
  categories = ["men's clothing", 'jewelery', 'electronics', "women's clothing"];
  apiUrl = 'http://localhost:3000/products';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/)]],
      rating: this.fb.group({
        rate: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
        count: [0, [Validators.required, Validators.min(0)]]
      })
    });

    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.isEdit = true;
      this.http.get<any>(`${this.apiUrl}/${this.productId}`).subscribe(data => {
        this.productForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isEdit) {
      this.http.put(`${this.apiUrl}/${this.productId}`, this.productForm.value).subscribe(() => {
        this.router.navigate(['/admin-panel']);
      });
    } else {
      this.http.get<any[]>(this.apiUrl).subscribe(products => {
        const lastId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        const newId:string=String(lastId+1)
        const newProduct = { id: newId, ...this.productForm.value };
        this.http.post(this.apiUrl, newProduct).subscribe(() => {
          this.router.navigate(['/admin-panel']);
        });
      });
    }
  }
}
