import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Categories } from '../../models/categories.enum';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  //formModel = this.formBuilder.group({
  //  Title: ['', Validators.required],
  //  Description: [''],
  //  Price: [''],
  //  Category: [''],
  //  Files: ['']
  //});

  formCategories = Object.keys(Categories);
  files: string[] = [];
  formModel: FormGroup;
  title: FormControl;
  description: FormControl;
  price: FormControl;
  category: FormControl;

  constructor(
    public productsService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.title = new FormControl();
    this.description = new FormControl();
    this.price = new FormControl();
    this.category = new FormControl();

    this.formModel = new FormGroup({
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category
    });

  }

  onFilesChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onSubmit() {
    const formData = new FormData();

    for (const key of Object.keys(this.formModel.value)) {
      const value = this.formModel.value[key];
      formData.append(key, value);
    }

    for (let i = 0; i < this.files.length; i++) {
      formData.append('Files[]', this.files[i]);
    }


    this.productsService.uploadProduct(formData).subscribe((res: Product) => {
      this.router.navigate(['/products/' + res.id]);
    }, err => {
    });
  }

}
