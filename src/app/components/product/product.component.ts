import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductProfile } from '../../models/productProfile';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ArgumentService } from 'src/app/services/argument.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MdbModalService],
  queries: {
    "tabsContentRef": new ViewChild("tabsContentRef")
  }
})
export class ProductComponent implements OnInit{
  id:any

  viewProduct: ProductProfile = {
                                productName:"null"
                                ,designName:"null"
                                ,description:"null"
                                ,price:0
                                ,mainImage:"null"
                                ,favourite:false
                                ,favouriteImage:"null"
                                ,designerName:"null"
                                ,imagesDesign:['null']}

  constructor(private argumentService: ArgumentService) {
    
  }

  ngOnInit(): void {
    this.argumentService.currentargument.subscribe(message => this.id = message);
    this.getInfo()
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
  getInfo(){
    axios.get(backURI+"products/get/"+this.id)
        .then(response => {
          // Obtenemos los datos
          this.viewProduct.description=response.data.description
          this.viewProduct.productName=response.data.name
          this.viewProduct.mainImage=response.data.image
          this.viewProduct.price=response.data.price
          this.viewProduct.designName=response.data.design.name
          this.getInfoDesigner(response.data.design.designer)
          this.getImagesOfDesign(response.data.design._id,response.data.description)
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
getInfoDesigner(id: String){
  axios.get(backURI+"users/id/"+id)
    .then(response => {
      // Obtenemos los datos
      this.viewProduct.designerName=response.data.username
    })
    .catch(e => {
      // Capturamos los errores
      console.log(e);
    })
}
getImagesOfDesign(designName:String, description:String){
  axios.get(backURI+"products/design/"+designName)
      .then(response => {
        // Obtenemos los datos
        const products = new Array(0)
        
        for(let i = 0; i < response.data.length && i < 4; i++) {
          if(description !== response.data[i].description){
            products.push(response.data[i].image);
          }  
        }
        this.viewProduct.imagesDesign = products
      })
      .catch(e => {
        // Capturamos los errores
        console.log(e);
      })
}
}