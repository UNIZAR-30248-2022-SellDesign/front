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
    ,imagesDesign:["https://images.asos-media.com/products/sudadera-gris-carbon-extragrande-con-capucha-y-estampado-en-la-espalda-de-asos-design/202691931-1-darkshadow?$n_240w$&wid=40&fit=constrain"
,"https://images.asos-media.com/products/sudadera-gris-carbon-extragrande-con-capucha-y-estampado-en-la-espalda-de-asos-design/202691931-1-darkshadow?$n_240w$&wid=40&fit=constrain"
,"https://images.asos-media.com/products/sudadera-gris-carbon-extragrande-con-capucha-y-estampado-en-la-espalda-de-asos-design/202691931-1-darkshadow?$n_240w$&wid=40&fit=constrain"
,"https://images.asos-media.com/products/sudadera-gris-carbon-extragrande-con-capucha-y-estampado-en-la-espalda-de-asos-design/202691931-1-darkshadow?$n_240w$&wid=40&fit=constrain"
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
                                ,imagesDesign:["null"]}


  constructor() { }

  ngOnInit(): void {
    this.getMore()
  }

  getMore() {
    this.viewProduct = this.productProfile
    console.log(this.viewProduct)
  }
  addToCart(){
    console.log("Añadido al carrito")
  }
  buy(){
    console.log("Comprado")
  }
  showFavouriteImage(){
    if(this.viewProduct.favourite) document.write("hola")
  }
}