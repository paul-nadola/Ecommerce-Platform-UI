import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  //TWO WAY BINDING
  product: Product = {
    productName:"",
    productDescription:"",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor (
    private productService: ProductService,
    //injecting a DOM sanitizer to use in creating a file url for preview purposes
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit (): void {}

  addProduct(productForm: NgForm){
    const productFormData = this.prepareFormData(this.product);
    // console.log(this.product)
    this.productService.addProduct(productFormData)
      .subscribe(
        (response:Product) => {
          // console.log(response)
          productForm.reset();
        },
        (error:HttpErrorResponse) => {
          console.log(error)
        }
        )
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type:'application/json'})
    );
    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
    return formData;
  }

  onFileSelected(event: any) {
    // console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file, // first file is a key used in the file handle model and the second file is the above variable
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle)
    }
  }
  removeImage(i: number) {
    this.product.productImages.splice(i, 1)
  }
  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }

}
