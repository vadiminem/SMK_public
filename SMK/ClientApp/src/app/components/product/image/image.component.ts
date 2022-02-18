import { Component, OnInit, Input } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() url: string;
  @Input() number: number;
  isImageLoading: boolean;
  image: any;

  constructor(private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.isImageLoading = true;
    this.imagesService.loadProductImage(`${this.url}/${this.number}`)
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
