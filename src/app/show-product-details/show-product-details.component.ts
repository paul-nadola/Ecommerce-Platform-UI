import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent {

  productDetails: Product [] = [];
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price', 'Images', 'Edit','Delete'];

  constructor(
    private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService
  ) {}

  ngOnInit() : void {
    //call get products from this initializer
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i:any) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe((res: Product[]) => {
      console.log(res);
      this.productDetails = res;
    }, (error: HttpErrorResponse) => {
      console.log(error)
    }
  )
    
  }
  deleteProduct(productId: number) {
    // console.log(productId)
    this.productService.deleteProduct(productId)
    .subscribe(
      (res) => {
        // console.log(res)
        this.getAllProducts();
      },
      (err:HttpErrorResponse) => {
        console.log(err)
      }
    )
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }
}
