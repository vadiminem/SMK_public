import {Component, OnInit} from '@angular/core';
import {ProductsService} from 'src/app/services/products.service';
import {Product} from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];


  id: string;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.products.subscribe(p => {
      this.products = p;
    });
    this.productsService.changeCategory(this.productsService.category);
  }

  getCurrentCategory() {
    switch (this.productsService.category) {
      case 'HorizontalBar':
        return 'Турники';
      case 'ClimbingFrame':
        return 'Шведские стенки'
      default:
        return 'Все товары';
    }
  }
}
