import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductProfile } from '../../models/productProfile';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { MdbModalRef,MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../payment/payment.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  modalRef: MdbModalRef<ModalComponent> | null = null;
  id:any
  viewProduct: ProductProfile = {
                                productName:"null"
                                ,designName:"null"
                                ,description:"null"
                                ,price:0
                                ,mainImage:""
                                ,favourite:false
                                ,favouriteImage:"null"
                                ,designerName:"null"
                                ,type:""
                                ,imagesDesign:['null']}
  imagesDesignFuncional = [{id:'',
                            imageDesign : '',type:''}]
  idUser : any
  designImagePage : any
  cart : any
  constructor(private route: ActivatedRoute,private router: Router,private modalService: MdbModalService) {  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    this.route.params.subscribe((params: Params) => {
      this.id = params['idProducto']
      this.imagesDesignFuncional = [{ id:'',
                                      imageDesign : '',type:''}]
      this.getInfo()
      this.getFavorite()
    });
    if(this.idUser!=null && this.id != null) this.getFavorite()
  }
  getFavorite(){
    axios.get(backURI+"perfil/fav/"+this.idUser+"/"+this.id)
        .then(response => {
          if (response.data.length!=0) this.viewProduct.favourite = true
          else  this.viewProduct.favourite = false
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
  addToCart(){
    this.cart=true
    window.setTimeout(() => {
      this.cart = false;
    }, 2000);
    axios.post(backURI+"cart/"+this.idUser+"/"+this.id)
    .then(response => {
      console.log(response)
    })
    .catch(e => {
      // Capturamos los errores
      console.log(e);
    })
  }
  
  buy(){
    this.modalRef = this.modalService.open(ModalComponent)
  }

  getInfo(){
    axios.get(backURI+"products/get/"+this.id)
        .then(response => {
          // Obtenemos los datos
          this.viewProduct.description=response.data.description
          this.viewProduct.productName=response.data.name
          this.viewProduct.mainImage=response.data.image
          this.viewProduct.price=response.data.price
          this.viewProduct.type=response.data.type
          this.viewProduct.designName=response.data.design.name
          this.getInfoDesigner(response.data.design.designer)
          this.getImagesOfDesign(response.data.design._id)
          
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
getImagesOfDesign(designName:String){
  axios.get(backURI+"products/design/"+designName)
      .then(response => {
        // Obtenemos los datos
        this.designImagePage = response.data[0].design.image
        
        for(let i = 0; i < response.data.length && i < 4; i++) {
          if(this.id !== response.data[i]._id){
            this.imagesDesignFuncional.push({id:response.data[i]._id,imageDesign:response.data[i].image,type:response.data[i].type})
          }  
        }
        this.imagesDesignFuncional.shift()
      })
      .catch(e => {
        // Capturamos los errores
        console.log(e);
      })
}
actualizarFavorito(){
  if(this.viewProduct.favourite){

    axios.delete(backURI+"perfil/fav/"+this.idUser+"/"+this.id)
        .then(response => {
          this.getFavorite()
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }else{
    axios.post(backURI+"perfil/fav/"+this.idUser+"/"+this.id)
        .then(response => {
          this.getFavorite()
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
  
}
contains(name:string){
  return name.includes("Pantalon")
}
}