import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';

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
    productActualPrice: 0
  }

  constructor () {}

  ngOnInit (): void {}

  addProduct(productForm: NgForm){
    console.log(this.product)
  }

}
