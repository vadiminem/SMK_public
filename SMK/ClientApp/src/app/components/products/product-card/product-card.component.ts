import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  imageUrl: string;
  image: any;
  isImageLoading: boolean;

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.isImageLoading = true;
    this.imagesService.loadProductImage(this.product.imagesPath)
      .subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
      });
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
