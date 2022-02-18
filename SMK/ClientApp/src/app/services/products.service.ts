import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {environment} from 'src/environments/environment';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiPath = environment.apiUrl + 'Products';
  category: string;
  loadedProducts: Product[];
  products: Subject<Product[]>;

  constructor(private http: HttpClient) {
    this.products = new Subject<Product[]>();
    this.loadProducts();
  }

  changeCategory(category?: string) {
    this.category = category;
    if (this.category) {
      this.products.next(this.loadedProducts.filter(p => p.category === this.category));
    } else {
      this.products.next(this.loadedProducts);
    }
  }

  loadProducts() {
    const url = this.apiPath;
    this.http.get<Product[]>(url).subscribe(products => {
      this.loadedProducts = products;
      this.products.next(this.loadedProducts);
    });
  }

  loadProduct(id) {
    const url = this.apiPath + '/' + id;
    return this.http.get<Product>(url);
  }

  uploadProduct(body) {
    return this.http.post(this.apiPath, body);
  }

  deleteProduct(id) {
    return this.http.delete(this.apiPath + '/' + id);
  }
}
