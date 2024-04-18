import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent {

  productDetails: Product [] = [];
  displayedColumns: string[] = ['Product Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price'];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() : void {
    //call get products from this initializer
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
    .subscribe((res: Product[]) => {
      console.log(res);
      this.productDetails = res;
    }, (error: HttpErrorResponse) => {
      console.log(error)
    }
  )
    
  }
}
