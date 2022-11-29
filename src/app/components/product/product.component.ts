import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductProfile } from '../../models/productProfile';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import {ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
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
  imagesDesignFuncional = [{id:'null',
                            imageDesign : 'null'}]
  designImagePage : any
  constructor(private route: ActivatedRoute,private router: Router) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['idProducto']
      this.imagesDesignFuncional = [{ id:'null',
                                      imageDesign : 'null'}]
      this.getInfo()
    });
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
        this.designImagePage = response.data[0].design.image
        /*const products = new Array(0)
        const ids = new Array(0)*/
        
        for(let i = 0; i < response.data.length && i < 4; i++) {
          if(description !== response.data[i].description){
            //products.push(response.data[i].image);
            //ids.push(response.data[i]._id)
            this.imagesDesignFuncional.push({id:response.data[i]._id,imageDesign:response.data[i].image})
          }  
        }
        this.imagesDesignFuncional.shift()
        /*this.viewProduct.imagesDesign = products
        this.imagesDesignFuncional.imagesDesignId = ids
        this.imagesDesignFuncional.imagesDesignImagess = products*/
      })
      .catch(e => {
        // Capturamos los errores
        console.log(e);
      })
}
sendArgument(argument:String){
  /*console.log(argument)
  this.argumentServicePrivate.sendArgument(argument)
  this.imagesDesignFuncional = [{id:'null',
  imageDesign : 'null'}]
  this.getInfo()*/
}
}