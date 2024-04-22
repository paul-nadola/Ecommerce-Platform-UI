import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../image-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  productDetails: Product[] = [];
  constructor (
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i: any) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe((res: Product[]) => {
        console.log(res);
        this.productDetails = res;
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
      )

  }
}
