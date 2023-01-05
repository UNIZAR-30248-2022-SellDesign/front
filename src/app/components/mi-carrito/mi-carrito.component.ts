import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { backURI } from 'src/environments/backURI';
import { MdbModalRef,MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../payment/payment.component';


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
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    if(this.idUser!=null) this.getCart()
  }
  getCart(){
    axios.get(backURI + "cart/"+this.idUser+"/0")
    .then(response => {
      if(response.data.length==0){
        this.noHayProductos=true
      } 
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
  eliminarProducto(idProducto:string){
    axios.delete(backURI+"cart/"+this.idUser+"/"+idProducto)
    .then(response=>{
      for(let i=0;i<this.newProducts.length;i++){
        if(this.newProducts[i]._id === idProducto) {
          this.newProducts.splice(i , 1)
          
        }
      }      
    })
    .catch(e => {
      console.log(e)
    })
  }
  vaciarTodo(){
    axios.delete(backURI+"cart/"+this.idUser)
    .then(response=>{
      this.newProducts.splice(0,this.newProducts.length)
    })
    .catch(e => {
      console.log(e)
    })
  }
  totalprice(){
    let price = 0
    for(let i=0;i<this.newProducts.length;i++){
      price+=this.newProducts[i].price
    }
    return price
  }
  comprar(){
    this.modalRef = this.modalService.open(ModalComponent)
  }
  contains(name:string){
    return name.includes("Pantalon")
  }
}
