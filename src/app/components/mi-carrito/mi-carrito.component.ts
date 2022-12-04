import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { any } from 'cypress/types/bluebird';
import { backURI } from 'src/environments/backURI';
@Component({
  selector: 'app-mi-carrito',
  templateUrl: './mi-carrito.component.html',
  styleUrls: ['./mi-carrito.component.css']
})
export class MiCarritoComponent implements OnInit {
  idUser:any
  hayMas: boolean = false;
  noHayProductos: boolean = false;
  newProducts:any
  constructor() { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    if(this.idUser!=null) this.getCart()
  }
  getCart(){
    axios.get(backURI + "cart/"+this.idUser+"/0")
    .then(response => {
      if(response.data.length==0) this.noHayProductos=true
      else{
        this.noHayProductos = false
        this.newProducts = []
        for(let i=0;i<response.data.length;i++){
          this.getProductInfo(response.data[i].product)
        }
      }
      
    })
    .catch(e => {
        // Capturamos los errores
        console.log(e);
    })
  }
  getProductInfo(id:string){
    axios.get(backURI+"products/get/"+id)
        .then(response => {
          // Obtenemos los datos
          this.newProducts.push(response.data)
          
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        })
  }
}
