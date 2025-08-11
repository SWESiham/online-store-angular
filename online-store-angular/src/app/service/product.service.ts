import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = ""
  //httpClient btrg3 observable so we lazem nrg3 b return
  constructor(private http: HttpClient) {
    this.apiUrl = "http://localhost:3000"
  }
  getAllProducts() {
    return this.http.get(this.apiUrl + "/products")
  }
  getProductById(id: number) {
    return this.http.get(this.apiUrl + "/products/" + id)
  }
  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl + "/products", product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(this.apiUrl + "/products/" + id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/products/" + id);
  }
}
