import {Component} from '@angular/core';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    private productsService: ProductsService,
  ) {
  }

  changeFilter(filter?: string) {
    this.productsService.changeCategory(filter);
  }

  getFilter(): string {
    return this.productsService.category;
  }
}
