import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
apiurl: string = '';

  constructor(public http:HttpClient) {
    this.apiurl = 'http://localhost:3000/products';
  }

  getAll() {
    return this.http.get(this.apiurl);
  }
  
}
