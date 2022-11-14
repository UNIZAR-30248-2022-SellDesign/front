import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { backURI } from 'src/environments/backURI';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit {

  nombreProducto: string = "";
  descripcion: string = "";
  precio: Number = 0;
  imagen: string = "";
  imagenDiseno: string = "";
  idUser: any
  tipo: Number = 0
  nombreTipo: string = '';
  esEditar:boolean = false
  esSubir:boolean = false
  idProducto: string = ''
  diseno = {image: ''}


  constructor(public modalRef: MdbModalRef<ModalEditProductComponent>) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUsuario')
    console.log(this.nombreTipo);
    console.log(this.diseno);
    if(this.esEditar){
      this.imagenDiseno = this.diseno.image
    }else{
      this.imagenDiseno = this.imagen

    }
  }

  asignarTipo(tipo: Number){
    switch(tipo){
      case 1:
        this.tipo = 1
        this.nombreTipo = 'Camiseta'
        break
      case 2:
        this.tipo = 2
        this.nombreTipo = 'Pantalón'
        break
      case 3:
        this.tipo = 3
        this.nombreTipo = 'Sudadera'
        break
    }
  }
  guardarDatos(foto: string, nombre: string, precio: Number, descripcion: string){
    console.log('guardando diseño...')
    //post
    console.log(foto);
    console.log(nombre);
    console.log(precio);
    console.log(descripcion);
    console.log(this.tipo);

    axios.post(backURI + "products/new", {
      design: '637269ae83eae85fb6649afe', //id de un diseño random
      price: precio,
      type: this.tipo,
      image: foto,
      description: descripcion,
      seller: this.idUser
    })
      .then((res) => {
        console.log('guardarDatos:')
        console.log(res)

        this.modalRef.close([{
          flag: 0
        }])

      }).catch((error) => {
        console.log(error);
      })

      
  }

  actualizarDatos(foto: string, nombre: string, idProducto: string, precio: Number, descripcion: string){
    console.log('actualizando diseño...')
    //put
    axios.put(backURI + "products/update", {
      // design: nombre,  ????
      price: precio,
      type: this.tipo,
      image: foto,
      description: descripcion,
      _id: idProducto
    })
      .then((res) => {
        console.log('actualizarDatos res:')
        console.log(res)

        this.modalRef.close([{
          flag: 1,
        }])
        
      }).catch((error) => {
        console.log(error);
      })
  }

  eliminarDatos(idProducto: string){
    console.log('eliminando diseño...')
    //delete
    axios.delete(backURI + "products/delete/" + this.idUser + '/' + idProducto)
      .then((res) => {
        console.log('eliminarDatos:')
        console.log(res)
        
      }).catch((error) => {
        console.log(error);
      })

    this.modalRef.close([{
      flag: 2,
      _id: idProducto,
    }])
  }

}
