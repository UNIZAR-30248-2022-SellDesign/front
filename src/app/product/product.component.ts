import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductProfile } from '../models/productProfile';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{



  productProfile: ProductProfile = 
    {productName:"Sudadera",designName:"buah",price:10,mainImage:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530",images:[]};

  viewProduct: ProductProfile = {productName:"null",designName:"null",price:0,mainImage:"null",images:["null"]}

  constructor() { }

  ngOnInit(): void {
    this.getMore()
  }

  getMore() {
    this.viewProduct = this.productProfile
    console.log(this.viewProduct)
  }
}