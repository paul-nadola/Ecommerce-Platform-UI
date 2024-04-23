import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.scss']
})
export class ProductViewDetailsComponent {

  selectedProductIndex = 0;

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
  constructor (
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit ():void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

}
