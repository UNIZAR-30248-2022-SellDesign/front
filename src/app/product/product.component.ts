import { Component, OnInit } from '@angular/core';
import { ProductProfile } from '../models/productProfile';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{



  productProfile: ProductProfile = 
    {productName:"Sudadera"
    ,designName:"molongo"
    ,description:"Esta sudadera fue construida con poliester 100% Esta sudadera fue construida con poliester 100% Esta sudadera fue construida con poliester 100% Esta sudadera fue construida con poliester 100%Esta sudadera fue construida con poliester 100% Esta sudadera fue construida con poliester 100% Esta sudadera fue construida con poliester 100%"
    ,price:10.99
    ,favourite:true
    ,favouriteImage: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
    ,mainImage:"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"
    ,designerName:"Alfred Marley"
    ,images:["https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"
,"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"
,"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"
,"https://static.pullandbear.net/2/photos/2022/I/0/2/p/8591/513/800/8591513800_1_1_3.jpg?t=1664869588530"
]};

  viewProduct: ProductProfile = {
                                productName:"null"
                                ,designName:"null"
                                ,description:"null"
                                ,price:0
                                ,mainImage:"null"
                                ,favourite:false
                                ,favouriteImage:"null"
                                ,designerName:"null"
                                ,images:["null"]}


  constructor() { }

  ngOnInit(): void {
    this.getMore()
  }

  getMore() {
    this.viewProduct = this.productProfile
    console.log(this.viewProduct)
  }
}