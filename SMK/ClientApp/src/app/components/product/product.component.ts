import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImagesService } from 'src/app/services/images.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  images: any[];
  id: number;
  product: Product;
  isImageLoading: boolean;
  imagesNumber: number;
  chosenImage: number = 0;
  toggleFullscreenGallery: boolean = false;
  currentFullscreenImage: number = 0;

  private subscription: Subscription;

  constructor(private imagesService: ImagesService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) {
    this.subscription = activatedRoute.params.subscribe(params => this.id = params['id']);
   }

  ngOnInit(): void {
    this.productsService.loadProduct(this.id).subscribe(x => {
      this.product = x;
      if (this.product) {
        this.imagesService.getImagesCount(`imagesCount/${this.product.imagesPath}`)
          .subscribe(p => {
            this.imagesNumber = p;
            if (this.imagesNumber > 0) {
              this.images = new Array(this.imagesNumber);
              for (let i = 0; i < this.imagesNumber; i++) {
                this.imagesService.loadProductImage(`${this.product.imagesPath}/${i}`).subscribe(data => {
                  this.createImageFromBlob(data, i);
                });
              }
            }
        });
      }
    }, err => {
      this.router.navigate(['']);
    });
  }

  loadImage(url) {
    this.isImageLoading = true;
    this.imagesService.loadProductImage(this.product.imagesPath + '/' + url)
      .subscribe(data => {
        // this.createImageFromBlob(data);
        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
      });

  }

  chooseImage(index: number): void {
    this.currentFullscreenImage = this.chosenImage = index;
  }

  comeBack() {
    this.location.back();
  }

  isAuthorized() {
    return localStorage.getItem('token');
  }

  deleteProduct() {
    if (this.isAuthorized() && this.product) {
      this.productsService.deleteProduct(this.product.id).subscribe(suc => {
        this.router.navigate(['']);
      }, err => {
      });
    }
  }

  openFullscreenImage() {
    this.currentFullscreenImage = this.chosenImage;
    this.toggleFullscreenGallery = true;
  }

  closeFullscreenGallery() {
    this.toggleFullscreenGallery = false;
  }

  previousFullscreenImage() {
    this.currentFullscreenImage--;
    if (this.currentFullscreenImage < 0) {
      this.currentFullscreenImage = this.images.length - 1;
    }
  }

  nextFullscreenImage() {
    this.currentFullscreenImage++;
    if (this.currentFullscreenImage >= this.images.length) {
      this.currentFullscreenImage = 0;
    }
  }

  private createImageFromBlob(image: Blob, index: number) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.images[index] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
